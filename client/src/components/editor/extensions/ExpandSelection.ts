import { Extension } from '@tiptap/core';
import { Plugin, PluginKey, AllSelection } from '@tiptap/pm/state';
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

// Node types that are individual list item wrappers
const LIST_ITEM_TYPES = new Set([
  'listItem',
  'taskItem',
]);

// All wrapper types that should be skipped in the generic parent walk
const WRAPPER_TYPES = new Set([
  'listItem',
  'bulletList',
  'orderedList',
  'taskList',
  'taskItem',
  'mixedList',
]);

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
 * Find the outermost list container that contains the current selection.
 * Returns the content range of the list (all list items' text content).
 * This selects from the start of the first list item's content to the end
 * of the last list item's content, effectively selecting "all list items text".
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
 * Build the ordered list of expansion steps from the current selection.
 * 
 * Steps:
 * 1. Current textblock content (line text)
 * 2. List content (all list items) — only if cursor is inside a list
 * 3. Heading sections (smallest to largest)
 * 4. Entire document
 * 
 * Each step is only included if it actually expands beyond the previous step.
 */
function buildExpansionSteps(
  doc: PMNode,
  initialFrom: number,
  initialTo: number
): Array<{ from: number; to: number }> {
  const steps: Array<{ from: number; to: number }> = [];
  let currentFrom = initialFrom;
  let currentTo = initialTo;

  // Step 1: Current textblock content
  const textblockRange = selectCurrentTextblock(doc, currentFrom, currentTo);
  if (textblockRange && (textblockRange.from < currentFrom || textblockRange.to > currentTo)) {
    steps.push(textblockRange);
    currentFrom = textblockRange.from;
    currentTo = textblockRange.to;
  }

  // Step 2: List content (all items in the list)
  const listRange = findListContentRange(doc, currentFrom, currentTo);
  if (listRange && (listRange.from < currentFrom || listRange.to > currentTo)) {
    steps.push(listRange);
    currentFrom = listRange.from;
    currentTo = listRange.to;
  }

  // Step 3: Heading sections (smallest to largest)
  const sections = buildHeadingSections(doc);
  if (sections.length > 0) {
    const containingSections = findContainingHeadingSections(sections, currentFrom, currentTo);
    for (const section of containingSections) {
      if (section.from < currentFrom || section.to > currentTo) {
        steps.push({ from: section.from, to: section.to });
        currentFrom = section.from;
        currentTo = section.to;
      }
    }
  }

  // Step 4: Entire document
  if (currentFrom > 0 || currentTo < doc.content.size) {
    steps.push({ from: 0, to: doc.content.size });
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
        let nextStep: { from: number; to: number } | null = null;
        for (const step of steps) {
          if (step.from < from || step.to > to) {
            nextStep = step;
            break;
          }
        }

        if (nextStep) {
          storage.lastExpandedFrom = nextStep.from;
          storage.lastExpandedTo = nextStep.to;
          storage.expansionDepth++;
          storage.isExpanding = true;

          if (nextStep.from === 0 && nextStep.to === doc.content.size) {
            editor.commands.selectAll();
          } else {
            editor.commands.setTextSelection({
              from: nextStep.from,
              to: nextStep.to,
            });
          }

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
