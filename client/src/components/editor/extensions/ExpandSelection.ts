import { Extension } from '@tiptap/core';
import { Plugin, PluginKey, AllSelection, TextSelection } from '@tiptap/pm/state';
import { Node as PMNode } from '@tiptap/pm/model';

/*
 * ExpandSelection Extension
 * 
 * Provides progressive "Expand Selection" functionality on Cmd+A / Ctrl+A.
 * 
 * Instead of immediately selecting all content, each Cmd+A press progressively
 * expands the selection to the next meaningful content boundary, skipping
 * intermediate wrapper nodes (listItem, bulletList, orderedList, etc.) that
 * are not user-facing.
 * 
 * Progression example:
 *   Given:
 *     ## Header 2
 *     ### Header 3
 *     * something great is going on
 *     * everything wonderful
 * 
 *   Cursor at "something":
 *     Cmd+A 1: Select text "something great is going on" (current line/textblock)
 *     Cmd+A 2: Select all list items text (content of the entire list)
 *     Cmd+A 3: Select entire Header 3 section (heading + all content until next same-or-higher heading)
 *     Cmd+A 4: Select entire Header 2 section (heading + all nested content)
 *     Cmd+A 5: Select the entire document
 * 
 * For tables:
 *   Cursor in a cell:
 *     Cmd+A 1: Select text in current cell
 *     Cmd+A 2: Select entire row content
 *     Cmd+A 3: Select entire table content
 *     Cmd+A 4: Heading sections / document
 * 
 * For callouts:
 *   Cursor in a callout:
 *     Cmd+A 1: Select text in current textblock inside callout
 *     Cmd+A 2: Select entire callout content
 *     Cmd+A 3: Heading sections / document
 * 
 * The expansion state resets when:
 *   - The user clicks somewhere
 *   - The user types
 *   - The user presses Escape
 *   - The selection changes by any means other than this extension
 * 
 * Enabled via the `progressiveSelectAll` prop on MarkdownEditor.
 */

export interface ExpandSelectionStorage {
  /** The selection range after the last expansion (to detect external changes) */
  lastExpandedFrom: number;
  lastExpandedTo: number;
  /** Current expansion depth counter */
  expansionDepth: number;
  /** Whether the last transaction was triggered by this extension */
  isExpanding: boolean;
}

const expandSelectionPluginKey = new PluginKey('expandSelection');

/**
 * Reset the expansion state in storage.
 */
function resetStorage(storage: ExpandSelectionStorage) {
  storage.lastExpandedFrom = -1;
  storage.lastExpandedTo = -1;
  storage.expansionDepth = 0;
  storage.isExpanding = false;
}

// Node types that are list containers (the outermost list wrapper)
const LIST_CONTAINER_TYPES = new Set([
  'bulletList',
  'orderedList',
  'taskList',
  'mixedList',
]);

// Complex block node types that should get their own expansion step
const COMPLEX_BLOCK_TYPES = new Set([
  'table',
  'callout',
  'codeBlock',
  'blockquote',
]);

// Table-related node types
const TABLE_ROW_TYPE = 'tableRow';
const TABLE_CELL_TYPES = new Set(['tableCell', 'tableHeader']);

/**
 * Get the initial expansion — select the content of the current textblock (paragraph/heading).
 */
function selectCurrentTextblock(doc: PMNode, from: number, to: number): { from: number; to: number } | null {
  const $from = doc.resolve(from);

  for (let d = $from.depth; d >= 1; d--) {
    const node = $from.node(d);
    if (node.isTextblock) {
      const start = $from.start(d);
      const end = $from.end(d);
      if (start < from || end > to) {
        return { from: start, to: end };
      }
    }
  }
  return null;
}

/**
 * Find the table cell that contains the current selection.
 * Returns the content range of the cell.
 */
function findTableCellRange(doc: PMNode, from: number, to: number): { from: number; to: number } | null {
  const $from = doc.resolve(from);

  for (let d = $from.depth; d >= 1; d--) {
    const node = $from.node(d);
    if (TABLE_CELL_TYPES.has(node.type.name)) {
      const start = $from.start(d);
      const end = $from.end(d);
      if (start < from || end > to) {
        return { from: start, to: end };
      }
    }
  }
  return null;
}

/**
 * Find the table row that contains the current selection.
 * Returns the content range of the row.
 */
function findTableRowRange(doc: PMNode, from: number, to: number): { from: number; to: number } | null {
  const $from = doc.resolve(from);

  for (let d = $from.depth; d >= 1; d--) {
    const node = $from.node(d);
    if (node.type.name === TABLE_ROW_TYPE) {
      const start = $from.start(d);
      const end = $from.end(d);
      if (start < from || end > to) {
        return { from: start, to: end };
      }
    }
  }
  return null;
}

/**
 * Find a complex block node (table, callout, codeBlock, blockquote) that contains the selection.
 * Returns the content range of the block.
 */
function findComplexBlockRange(doc: PMNode, from: number, to: number): { from: number; to: number } | null {
  const $from = doc.resolve(from);

  for (let d = $from.depth; d >= 1; d--) {
    const node = $from.node(d);
    if (COMPLEX_BLOCK_TYPES.has(node.type.name)) {
      const start = $from.start(d);
      const end = $from.end(d);
      if (start < from || end > to) {
        return { from: start, to: end };
      }
    }
  }
  return null;
}

/**
 * Find the outermost list container that contains the current selection.
 * Returns the content range of the list (all list items' text content).
 */
function findListContentRange(doc: PMNode, from: number, to: number): { from: number; to: number } | null {
  const $from = doc.resolve(from);

  // Walk up to find the outermost list container
  let listDepth = -1;
  for (let d = $from.depth; d >= 1; d--) {
    const node = $from.node(d);
    if (LIST_CONTAINER_TYPES.has(node.type.name)) {
      listDepth = d;
      // Don't break — keep going up to find the outermost list
      // (in case of nested lists, we want the top-level one)
    }
  }

  if (listDepth === -1) return null;

  // Get the range that covers the entire list container's content
  const listStart = $from.start(listDepth);
  const listEnd = $from.end(listDepth);

  // Only return if this actually expands the selection
  if (listStart < from || listEnd > to) {
    return { from: listStart, to: listEnd };
  }

  return null;
}

/**
 * Represents a heading section in the document: from the heading node
 * to just before the next heading of equal or higher level (or end of doc).
 */
interface HeadingSection {
  level: number;
  from: number;  // Start of the heading node
  to: number;    // End of the section (before next same-or-higher heading, or end of doc)
}

/**
 * Build a flat list of heading sections from the document.
 * Each section spans from the heading to just before the next heading
 * of the same or higher level.
 */
function buildHeadingSections(doc: PMNode): HeadingSection[] {
  const headings: { level: number; from: number }[] = [];

  doc.forEach((node, offset) => {
    if (node.type.name === 'heading') {
      headings.push({ level: node.attrs.level, from: offset });
    }
  });

  if (headings.length === 0) return [];

  const sections: HeadingSection[] = [];

  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    // Find the end: next heading of same or higher (lower number) level
    let sectionEnd = doc.content.size;
    for (let j = i + 1; j < headings.length; j++) {
      if (headings[j].level <= heading.level) {
        sectionEnd = headings[j].from;
        break;
      }
    }
    sections.push({
      level: heading.level,
      from: heading.from,
      to: sectionEnd,
    });
  }

  return sections;
}

/**
 * Find the smallest heading section that fully contains the given range.
 * Returns sections in order from smallest to largest.
 */
function findContainingHeadingSections(
  sections: HeadingSection[],
  from: number,
  to: number
): HeadingSection[] {
  // Filter sections that fully contain the range
  const containing = sections.filter(s => s.from <= from && s.to >= to);
  // Sort by size (smallest first) — the most specific section first
  containing.sort((a, b) => (a.to - a.from) - (b.to - b.from));
  return containing;
}

/**
 * Check if the cursor is inside a table.
 */
function isInsideTable(doc: PMNode, from: number): boolean {
  const $from = doc.resolve(from);
  for (let d = $from.depth; d >= 1; d--) {
    if ($from.node(d).type.name === 'table') return true;
  }
  return false;
}

/**
 * Check if a range crosses a complex block boundary (callout, blockquote, etc.).
 * This happens when the selection would need to span from outside a complex block
 * to inside it (or vice versa), which ProseMirror's TextSelection cannot handle
 * properly for nodes with `defining: true`.
 */
function rangeContainsComplexBlock(doc: PMNode, from: number, to: number): boolean {
  let found = false;
  doc.nodesBetween(from, to, (node) => {
    if (COMPLEX_BLOCK_TYPES.has(node.type.name)) {
      found = true;
      return false; // Stop descending
    }
    return true;
  });
  return found;
}

/**
 * Build the ordered list of expansion steps from the current selection.
 * 
 * Steps (contextual):
 * 1. Current textblock content (line text / cell text)
 * 2a. If in table: table cell → table row → entire table
 * 2b. If in list: list content (all list items)
 * 2c. If in callout/blockquote/codeBlock: entire block content
 * 3. Heading sections (smallest to largest)
 * 4. Entire document
 * 
 * Each step is only included if it actually expands beyond the previous step.
 */
function buildExpansionSteps(
  doc: PMNode,
  initialFrom: number,
  initialTo: number
): Array<{ from: number; to: number; useSelectAll?: boolean }> {
  const steps: Array<{ from: number; to: number; useSelectAll?: boolean }> = [];
  let currentFrom = initialFrom;
  let currentTo = initialTo;

  // Helper to add a step if it expands the selection
  const addStep = (range: { from: number; to: number; useSelectAll?: boolean } | null): boolean => {
    if (range && (range.from < currentFrom || range.to > currentTo)) {
      steps.push(range);
      currentFrom = range.from;
      currentTo = range.to;
      return true;
    }
    return false;
  };

  // Step 1: Current textblock content
  addStep(selectCurrentTextblock(doc, currentFrom, currentTo));

  // Step 2: Context-specific expansion
  if (isInsideTable(doc, initialFrom)) {
    // Table: cell → row → table
    addStep(findTableCellRange(doc, currentFrom, currentTo));
    addStep(findTableRowRange(doc, currentFrom, currentTo));
  }

  // List content (works both inside and outside tables)
  addStep(findListContentRange(doc, currentFrom, currentTo));

  // Complex block (table, callout, codeBlock, blockquote) — select entire block
  addStep(findComplexBlockRange(doc, currentFrom, currentTo));

  // Step 3: Heading sections (smallest to largest)
  const sections = buildHeadingSections(doc);
  if (sections.length > 0) {
    const containingSections = findContainingHeadingSections(sections, currentFrom, currentTo);
    for (const section of containingSections) {
      // Check if this heading section range would cross a complex block boundary.
      // If so, we need to use selectAll instead of setTextSelection, because
      // ProseMirror's TextSelection cannot span across defining node boundaries
      // (like callouts). In this case, mark the step to use selectAll if it
      // covers the entire document, or skip to the next larger section.
      const crossesComplexBlock = rangeContainsComplexBlock(doc, section.from, section.to);
      if (crossesComplexBlock) {
        // If this section spans the whole doc, use selectAll
        if (section.from === 0 && section.to === doc.content.size) {
          addStep({ from: 0, to: doc.content.size, useSelectAll: true });
        } else {
          // The heading section contains a complex block but doesn't cover the
          // whole document. We still add it but mark it to use selectAll-style
          // selection (which uses AllSelection or a workaround).
          addStep({ from: section.from, to: section.to, useSelectAll: true });
        }
      } else {
        addStep({ from: section.from, to: section.to });
      }
    }
  }

  // Step 4: Entire document
  if (currentFrom > 0 || currentTo < doc.content.size) {
    steps.push({ from: 0, to: doc.content.size, useSelectAll: true });
  }

  return steps;
}

export const ExpandSelection = Extension.create<{}, ExpandSelectionStorage>({
  name: 'expandSelection',
  priority: 1000,

  addStorage() {
    return {
      lastExpandedFrom: -1,
      lastExpandedTo: -1,
      expansionDepth: 0,
      isExpanding: false,
    };
  },

  addKeyboardShortcuts() {
    return {
      // Expand selection (Cmd+A / Ctrl+A)
      // Move cursor to beginning of document (Cmd+Up / Ctrl+Up)
      'Mod-ArrowUp': ({ editor }) => {
        editor.commands.setTextSelection(0);
        // Scroll to top
        const view = editor.view;
        view.dispatch(view.state.tr.scrollIntoView());
        return true;
      },

      // Move cursor to end of document (Cmd+Down / Ctrl+Down)
      'Mod-ArrowDown': ({ editor }) => {
        const endPos = editor.state.doc.content.size;
        editor.commands.setTextSelection(endPos);
        // Scroll to bottom
        const view = editor.view;
        view.dispatch(view.state.tr.scrollIntoView());
        return true;
      },

      'Mod-a': ({ editor }) => {
        const storage = this.storage;
        const { doc, selection } = editor.state;
        const { from, to } = selection;

        // Check if the current selection matches our last expansion
        const selectionMatchesLastExpansion =
          storage.expansionDepth > 0 &&
          from === storage.lastExpandedFrom &&
          to === storage.lastExpandedTo;

        if (!selectionMatchesLastExpansion) {
          // Reset and start fresh
          storage.expansionDepth = 0;
        }

        // If already selecting everything, consume the event
        if (selection instanceof AllSelection) {
          return true;
        }
        if (from === 0 && to === doc.content.size) {
          return true;
        }

        // Build all expansion steps from the current position
        const steps = buildExpansionSteps(doc, from, to);

        // Find the next step that actually expands beyond current selection
        let nextStep: { from: number; to: number; useSelectAll?: boolean } | null = null;
        for (const step of steps) {
          if (step.from < from || step.to > to) {
            nextStep = step;
            break;
          }
        }

        if (nextStep) {
          storage.isExpanding = true;

          if (nextStep.from === 0 && nextStep.to === doc.content.size) {
            // Full document — use selectAll for reliable cross-boundary selection
            editor.commands.selectAll();
            storage.lastExpandedFrom = 0;
            storage.lastExpandedTo = doc.content.size;
          } else if (nextStep.useSelectAll) {
            // Range crosses complex block boundaries — use TextSelection.create
            // directly on the transaction to avoid the clamping that
            // editor.commands.setTextSelection does internally.
            try {
              const $from = doc.resolve(nextStep.from);
              const $to = doc.resolve(nextStep.to);
              const tr = editor.state.tr;
              const sel = TextSelection.between($from, $to);
              editor.view.dispatch(tr.setSelection(sel).scrollIntoView());
              // Store the actual resulting selection (may differ from requested)
              const resultSel = editor.state.selection;
              storage.lastExpandedFrom = resultSel.from;
              storage.lastExpandedTo = resultSel.to;
            } catch {
              // If TextSelection.between fails, fall back to selectAll
              editor.commands.selectAll();
              storage.lastExpandedFrom = 0;
              storage.lastExpandedTo = doc.content.size;
            }
          } else {
            editor.commands.setTextSelection({
              from: nextStep.from,
              to: nextStep.to,
            });
            // Verify the selection was actually set correctly
            const resultSel = editor.state.selection;
            if (resultSel.from !== nextStep.from || resultSel.to !== nextStep.to) {
              // Selection was clamped by ProseMirror — the range crosses a
              // defining node boundary. Fall back to selectAll.
              editor.commands.selectAll();
              storage.lastExpandedFrom = 0;
              storage.lastExpandedTo = doc.content.size;
            } else {
              storage.lastExpandedFrom = nextStep.from;
              storage.lastExpandedTo = nextStep.to;
            }
          }

          storage.expansionDepth++;
          storage.isExpanding = false;
          return true;
        }

        // Fallback: select all
        storage.lastExpandedFrom = 0;
        storage.lastExpandedTo = doc.content.size;
        storage.expansionDepth++;
        storage.isExpanding = true;

        editor.commands.selectAll();

        storage.isExpanding = false;
        return true;
      },
    };
  },

  addProseMirrorPlugins() {
    const storage = this.storage;

    return [
      new Plugin({
        key: expandSelectionPluginKey,

        props: {
          handleClick() {
            resetStorage(storage);
            return false;
          },

          handleTextInput() {
            resetStorage(storage);
            return false;
          },

          handleKeyDown(_view, event) {
            // Don't reset on Cmd/Ctrl+A (expand)
            if ((event.metaKey || event.ctrlKey) && (event.key === 'a' || event.key === 'A') && !event.shiftKey) {
              return false;
            }
            // Don't reset on modifier keys alone
            if (['Meta', 'Control', 'Alt', 'Shift'].includes(event.key)) {
              return false;
            }
            // Reset on Escape or any other key
            if (storage.expansionDepth > 0 && !storage.isExpanding) {
              resetStorage(storage);
            }
            return false;
          },
        },
      }),
    ];
  },
});
