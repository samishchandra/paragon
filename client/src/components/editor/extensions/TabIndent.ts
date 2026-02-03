import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { keymap } from '@tiptap/pm/keymap';

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
 * Uses ProseMirror keymap plugin for reliable Tab key interception
 */
export const TabIndent = Extension.create({
  name: 'tabIndent',

  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1000,

  addProseMirrorPlugins() {
    const editor = this.editor;
    
    return [
      keymap({
        'Tab': (state, dispatch) => {
          const { $from } = state.selection;
          
          // Check if we're in a list by looking at the parent nodes
          let inList = false;
          let isTaskList = false;
          
          for (let depth = $from.depth; depth >= 0; depth--) {
            const node = $from.node(depth);
            if (node.type.name === 'taskList') {
              inList = true;
              isTaskList = true;
              break;
            }
            if (node.type.name === 'bulletList' || node.type.name === 'orderedList') {
              inList = true;
              break;
            }
          }
          
          if (inList) {
            // Tab: Nest (sink list item)
            if (isTaskList) {
              editor.chain().focus().sinkListItem('taskItem').run();
            } else {
              editor.chain().focus().sinkListItem('listItem').run();
            }
          }
          
          // Always return true to prevent browser default Tab behavior
          return true;
        },
        'Shift-Tab': (state, dispatch) => {
          const { $from } = state.selection;
          
          // Check if we're in a list by looking at the parent nodes
          let inList = false;
          let isTaskList = false;
          
          for (let depth = $from.depth; depth >= 0; depth--) {
            const node = $from.node(depth);
            if (node.type.name === 'taskList') {
              inList = true;
              isTaskList = true;
              break;
            }
            if (node.type.name === 'bulletList' || node.type.name === 'orderedList') {
              inList = true;
              break;
            }
          }
          
          if (inList) {
            // Shift+Tab: Unnest (lift list item)
            if (isTaskList) {
              editor.chain().focus().liftListItem('taskItem').run();
            } else {
              editor.chain().focus().liftListItem('listItem').run();
            }
          }
          
          // Always return true to prevent browser default Shift+Tab behavior
          return true;
        },
      }),
    ];
  },
});
