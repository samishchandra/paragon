import { Extension } from '@tiptap/core';
import { Plugin, PluginKey, TextSelection, AllSelection } from '@tiptap/pm/state';

/*
 * ExpandSelection Extension
 * 
 * Provides progressive "Expand Selection" functionality on Cmd+A / Ctrl+A.
 * Instead of immediately selecting all content, each press progressively
 * expands the selection to the next parent node in the ProseMirror document tree.
 * 
 * Progression example for a list item:
 *   Press 1: Select current text node / inline content
 *   Press 2: Select entire paragraph inside the list item
 *   Press 3: Select the full list item (including bullet/checkbox)
 *   Press 4: Select the entire list (all items)
 *   Press 5: Select the entire document
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
  /** Current expansion depth (0 = not expanding, 1+ = depth levels expanded) */
  expansionDepth: number;
  /** The selection range after the last expansion (to detect external changes) */
  lastExpandedFrom: number;
  lastExpandedTo: number;
  /** Whether the last transaction was triggered by this extension */
  isExpanding: boolean;
}

const expandSelectionPluginKey = new PluginKey('expandSelection');

/**
 * Get the initial expansion — select the content of the current node (paragraph/textblock).
 * This selects all text within the immediate parent textblock.
 */
function selectCurrentNodeContent(doc: any, from: number, to: number): { from: number; to: number } | null {
  const $from = doc.resolve(from);
  
  // Find the closest textblock parent
  for (let d = $from.depth; d >= 1; d--) {
    const node = $from.node(d);
    if (node.isTextblock) {
      const start = $from.start(d);
      const end = $from.end(d);
      // Only return if this actually expands the selection
      if (start < from || end > to) {
        return { from: start, to: end };
      }
    }
  }
  return null;
}

/**
 * Find the next expansion range by walking up the document tree.
 * Returns the smallest range that is strictly larger than the current selection.
 */
function findNextExpansion(doc: any, from: number, to: number): { from: number; to: number } | null {
  const $from = doc.resolve(from);
  const $to = doc.resolve(to);
  
  // Try each depth from deepest to shallowest
  // We want the smallest parent that fully contains and is larger than the current selection
  const maxDepth = Math.max($from.depth, $to.depth);
  
  for (let depth = maxDepth; depth >= 1; depth--) {
    // Get the range at this depth, ensuring we never go below depth 1
    // (depth 0 is the doc level, and before(0)/after(0) throws)
    const fromDepth = Math.max(1, Math.min(depth, $from.depth));
    const toDepth = Math.max(1, Math.min(depth, $to.depth));
    
    // Skip if the resolved position doesn't have this depth
    if (fromDepth > $from.depth || toDepth > $to.depth) continue;
    
    const rangeFrom = $from.before(fromDepth);
    const rangeTo = $to.after(toDepth);
    
    // Only return if this is strictly larger than current selection
    if (rangeFrom < from || rangeTo > to) {
      return { from: rangeFrom, to: rangeTo };
    }
  }
  
  // Final fallback: select entire document
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
      expansionDepth: 0,
      lastExpandedFrom: -1,
      lastExpandedTo: -1,
      isExpanding: false,
    };
  },

  addKeyboardShortcuts() {
    return {
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
            storage.expansionDepth = 1;
            storage.lastExpandedFrom = textblockRange.from;
            storage.lastExpandedTo = textblockRange.to;
            storage.isExpanding = true;

            editor.commands.setTextSelection({
              from: textblockRange.from,
              to: textblockRange.to,
            });

            storage.isExpanding = false;
            return true;
          }
          // If textblock content is already selected, move to next level
          storage.expansionDepth = 1;
        }

        // Progressive expansion: find the next larger range
        const nextRange = findNextExpansion(doc, from, to);
        if (nextRange) {
          storage.expansionDepth++;
          storage.lastExpandedFrom = nextRange.from;
          storage.lastExpandedTo = nextRange.to;
          storage.isExpanding = true;

          if (nextRange.from === 0 && nextRange.to === doc.content.size) {
            // Use selectAll for full document
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
        storage.expansionDepth++;
        storage.lastExpandedFrom = 0;
        storage.lastExpandedTo = doc.content.size;
        storage.isExpanding = true;

        editor.commands.selectAll();

        storage.isExpanding = false;
        return true;
      },
    };
  },

  addProseMirrorPlugins() {
    const storage = this.storage;

    // State-reset plugin that clears expansion on click/type/other keys
    return [
      new Plugin({
        key: expandSelectionPluginKey,

        props: {
          handleClick() {
            storage.expansionDepth = 0;
            storage.lastExpandedFrom = -1;
            storage.lastExpandedTo = -1;
            return false;
          },

          handleTextInput() {
            storage.expansionDepth = 0;
            storage.lastExpandedFrom = -1;
            storage.lastExpandedTo = -1;
            return false;
          },

          handleKeyDown(_view, event) {
            // Don't reset on Cmd/Ctrl+A
            if ((event.metaKey || event.ctrlKey) && event.key === 'a') {
              return false;
            }
            // Don't reset on modifier keys alone
            if (['Meta', 'Control', 'Alt', 'Shift'].includes(event.key)) {
              return false;
            }
            // Reset on Escape or any other key
            if (storage.expansionDepth > 0 && !storage.isExpanding) {
              storage.expansionDepth = 0;
              storage.lastExpandedFrom = -1;
              storage.lastExpandedTo = -1;
            }
            return false;
          },
        },
      }),
    ];
  },
});
