import { Extension } from '@tiptap/core';
import { Plugin, PluginKey, AllSelection } from '@tiptap/pm/state';

/*
 * ExpandSelection Extension
 * 
 * Provides progressive "Expand Selection" functionality on Cmd+A / Ctrl+A.
 * 
 * Instead of immediately selecting all content, each Cmd+A press progressively
 * expands the selection to the next parent node in the ProseMirror document tree.
 * 
 * Progression example for a nested list item:
 *   Cmd+A 1: Select current text node / inline content
 *   Cmd+A 2: Select entire paragraph inside the list item
 *   Cmd+A 3: Select the full list item (including bullet/checkbox)
 *   Cmd+A 4: Select the entire list (all items)
 *   Cmd+A 5: Select the entire document
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

/**
 * Get the initial expansion — select the content of the current node (paragraph/textblock).
 */
function selectCurrentNodeContent(doc: any, from: number, to: number): { from: number; to: number } | null {
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
 * Find the next expansion range by walking up the document tree.
 */
function findNextExpansion(doc: any, from: number, to: number): { from: number; to: number } | null {
  const $from = doc.resolve(from);
  const $to = doc.resolve(to);

  const maxDepth = Math.max($from.depth, $to.depth);

  for (let depth = maxDepth; depth >= 1; depth--) {
    const fromDepth = Math.max(1, Math.min(depth, $from.depth));
    const toDepth = Math.max(1, Math.min(depth, $to.depth));

    if (fromDepth > $from.depth || toDepth > $to.depth) continue;

    const rangeFrom = $from.before(fromDepth);
    const rangeTo = $to.after(toDepth);

    if (rangeFrom < from || rangeTo > to) {
      return { from: rangeFrom, to: rangeTo };
    }
  }

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
          const textblockRange = selectCurrentNodeContent(doc, from, to);
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

        // Progressive expansion: find the next larger range
        const nextRange = findNextExpansion(doc, from, to);
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
