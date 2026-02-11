import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import type { EditorState } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';
import { sinkListItem, liftListItem } from '@tiptap/pm/schema-list';

/**
 * TabIndent Extension
 * Handles Tab and Shift+Tab for nesting/unnesting list items
 * 
 * Key behavior:
 * - Tab in list: Nest the current list item (make it a child of the previous item)
 * - Shift+Tab in list: Unnest the current list item (move it up one level)
 * - Tab outside list: Prevent default browser behavior (no focus change)
 * - Shift+Tab outside list: Prevent default browser behavior
 * 
 * Uses ProseMirror's native sinkListItem/liftListItem commands directly
 * (not TipTap's chain().sinkListItem() which can cause item duplication
 * in mixed list contexts).
 * 
 * IMPORTANT: In mixed lists (MixedLists extension), a taskList can contain
 * listItem children and a bulletList can contain taskItem children. We must
 * detect the IMMEDIATE list item type (listItem vs taskItem) rather than
 * the parent list type, because sinkListItem/liftListItem operate on the
 * node type of the item itself.
 */

const tabIndentPluginKey = new PluginKey('tabIndent');

/**
 * Find the immediate list item node type at the cursor position.
 * Walks up from the cursor to find the first taskItem or listItem ancestor.
 * Returns the node type name, or null if not in a list.
 */
function getListItemTypeName(state: EditorState): 'taskItem' | 'listItem' | null {
  const { $from } = state.selection;
  
  for (let depth = $from.depth; depth >= 0; depth--) {
    const node = $from.node(depth);
    if (node.type.name === 'taskItem') {
      return 'taskItem';
    }
    if (node.type.name === 'listItem') {
      return 'listItem';
    }
  }
  
  return null;
}

export const TabIndent = Extension.create({
  name: 'tabIndent',

  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1000,

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: tabIndentPluginKey,
        props: {
          handleKeyDown(view: EditorView, event: KeyboardEvent) {
            // Only handle Tab and Shift+Tab
            if (event.key !== 'Tab') return false;
            
            const { state, dispatch } = view;
            const itemTypeName = getListItemTypeName(state);
            
            if (!itemTypeName) {
              // Not in a list - still prevent default Tab behavior
              event.preventDefault();
              return true;
            }
            
            event.preventDefault();
            
            const nodeType = state.schema.nodes[itemTypeName];
            if (!nodeType) return true;
            
            if (event.shiftKey) {
              // Shift+Tab: lift (outdent)
              const cmd = liftListItem(nodeType);
              const result = cmd(state, dispatch);
              
              if (!result) {
                // Fallback: try the other item type
                const fallbackName = itemTypeName === 'taskItem' ? 'listItem' : 'taskItem';
                const fallbackType = state.schema.nodes[fallbackName];
                if (fallbackType) {
                  liftListItem(fallbackType)(state, dispatch);
                }
              }
            } else {
              // Tab: sink (indent)
              const cmd = sinkListItem(nodeType);
              const result = cmd(state, dispatch);
              
              if (!result) {
                // Fallback: try the other item type
                const fallbackName = itemTypeName === 'taskItem' ? 'listItem' : 'taskItem';
                const fallbackType = state.schema.nodes[fallbackName];
                if (fallbackType) {
                  sinkListItem(fallbackType)(state, dispatch);
                }
              }
            }
            
            return true;
          },
        },
      }),
    ];
  },
});
