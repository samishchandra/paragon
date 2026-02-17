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
 *     Cmd+A 2: Select entire Header 3 section (heading + all content until next same-or-higher heading)
 *     Cmd+A 3: Select entire Header 2 section (heading + all nested content)
 *     Cmd+A 4: Select the entire document
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

// Node types that are considered intermediate wrappers (not user-facing boundaries)
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
 * Find the next meaningful expansion range.
 * 
 * Strategy:
 * 1. First, try to expand to the nearest parent that is NOT a wrapper type
 *    (skipping listItem, bulletList, etc.)
 * 2. Then, expand to heading sections (smallest containing section first)
 * 3. Finally, select all
 */
function findNextMeaningfulExpansion(
  doc: PMNode,
  from: number,
  to: number
): { from: number; to: number } | null {
  const $from = doc.resolve(from);
  const $to = doc.resolve(to);

  // Step 1: Try expanding to the next non-wrapper parent node
  // Walk up from the current selection, skipping wrapper types
  const maxDepth = Math.max($from.depth, $to.depth);

  for (let depth = maxDepth; depth >= 1; depth--) {
    const fromDepth = Math.min(depth, $from.depth);
    const toDepth = Math.min(depth, $to.depth);

    if (fromDepth < 1 || toDepth < 1) continue;

    const rangeFrom = $from.before(fromDepth);
    const rangeTo = $to.after(toDepth);

    // Skip if this doesn't actually expand the selection
    if (rangeFrom >= from && rangeTo <= to) continue;

    // Check if the node at this depth is a wrapper type
    const nodeAtDepth = $from.node(fromDepth);
    if (WRAPPER_TYPES.has(nodeAtDepth.type.name)) {
      // Skip this wrapper — don't offer it as an expansion step
      continue;
    }

    // This is a meaningful non-wrapper expansion
    return { from: rangeFrom, to: rangeTo };
  }

  // Step 2: Try heading-section-based expansion
  const sections = buildHeadingSections(doc);
  if (sections.length > 0) {
    const containingSections = findContainingHeadingSections(sections, from, to);

    for (const section of containingSections) {
      // Only offer this section if it actually expands the selection
      if (section.from < from || section.to > to) {
        return { from: section.from, to: section.to };
      }
    }
  }

  // Step 3: Select all
  if (from > 0 || to < doc.content.size) {
    return { from: 0, to: doc.content.size };
  }

  return null;
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

        // First expansion: select the content of the current textblock
        if (storage.expansionDepth === 0) {
          const textblockRange = selectCurrentTextblock(doc, from, to);
          if (textblockRange && (textblockRange.from < from || textblockRange.to > to)) {
            storage.lastExpandedFrom = textblockRange.from;
            storage.lastExpandedTo = textblockRange.to;
            storage.expansionDepth = 1;
            storage.isExpanding = true;

            editor.commands.setTextSelection({
              from: textblockRange.from,
              to: textblockRange.to,
            });

            storage.isExpanding = false;
            return true;
          }
        }

        // Progressive expansion: find the next meaningful range (skipping wrappers)
        const nextRange = findNextMeaningfulExpansion(doc, from, to);
        if (nextRange) {
          storage.lastExpandedFrom = nextRange.from;
          storage.lastExpandedTo = nextRange.to;
          storage.expansionDepth++;
          storage.isExpanding = true;

          if (nextRange.from === 0 && nextRange.to === doc.content.size) {
            editor.commands.selectAll();
          } else {
            editor.commands.setTextSelection({
              from: nextRange.from,
              to: nextRange.to,
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
