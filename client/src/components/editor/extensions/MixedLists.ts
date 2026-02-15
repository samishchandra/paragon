/**
 * MixedLists Extension
 * 
 * Extends TipTap's default list behavior to allow inter-mixing of different
 * list item types within the same list. For example:
 * - A bullet list can contain task items (checkboxes)
 * - A task list can contain regular list items (bullets)
 * - An ordered list can contain task items
 * - Deep nesting across different list types is supported
 * 
 * This is achieved by overriding the `content` property of each list type
 * to accept both `listItem` and `taskItem` as children.
 * 
 * Usage: In MarkdownEditor.tsx, disable the default list extensions from
 * StarterKit and add these mixed versions instead.
 */

import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { InputRule } from '@tiptap/core';
import { findWrapping } from '@tiptap/pm/transform';
import { canJoin } from '@tiptap/pm/transform';
import { Plugin, PluginKey } from '@tiptap/pm/state';

/**
 * Helper: Convert a list at a given position from one type to another,
 * also converting child item types (taskItem <-> listItem).
 */
function convertListType(
  tr: any,
  listPos: number,
  targetListType: any,
  targetItemType: any,
  sourceItemType: any,
  targetItemAttrs: Record<string, any> = {},
): boolean {
  const listNode = tr.doc.nodeAt(listPos);
  if (!listNode) return false;

  // Change the list type
  tr.setNodeMarkup(listPos, targetListType, listNode.attrs);

  // Convert child items that need conversion
  const updatedListNode = tr.doc.nodeAt(listPos);
  if (!updatedListNode) return false;

  const positions: number[] = [];
  updatedListNode.forEach((child: any, childOffset: number) => {
    if (child.type === sourceItemType) {
      positions.push(listPos + 1 + childOffset);
    }
  });

  // Apply in reverse to preserve positions
  for (let i = positions.length - 1; i >= 0; i--) {
    const pos = positions[i];
    const node = tr.doc.nodeAt(pos);
    if (node && node.type === sourceItemType) {
      tr.setNodeMarkup(pos, targetItemType, targetItemAttrs);
    }
  }

  return true;
}

/**
 * Extended BulletList that accepts both listItem and taskItem children.
 * 
 * Overrides toggleBulletList to properly convert taskItem children to listItem
 * when switching from a taskList. The default toggleList uses setNodeMarkup
 * which changes the list type but leaves taskItem children unconverted.
 */
export const MixedBulletList = BulletList.extend({
  content: '(listItem | taskItem)+',

  addCommands() {
    return {
      toggleBulletList: () => ({ commands, state, tr, dispatch }) => {
        const { selection } = state;
        const { $from } = selection;
        
        const bulletListType = state.schema.nodes.bulletList;
        const taskListType = state.schema.nodes.taskList;
        const orderedListType = state.schema.nodes.orderedList;
        const listItemType = state.schema.nodes.listItem;
        const taskItemType = state.schema.nodes.taskItem;

        // Find the parent list
        let parentListType = null;
        let parentListPos = -1;
        for (let d = $from.depth; d > 0; d--) {
          const node = $from.node(d);
          if (node.type === bulletListType || node.type === taskListType || node.type === orderedListType) {
            parentListType = node.type;
            parentListPos = $from.before(d);
            break;
          }
        }

        // If already in a bulletList, lift out (toggle off)
        if (parentListType === bulletListType) {
          return commands.liftListItem('listItem');
        }

        // If in a taskList or orderedList, convert to bulletList and convert items
        if (parentListType === taskListType || parentListType === orderedListType) {
          if (!dispatch) return true;
          const success = convertListType(tr, parentListPos, bulletListType, listItemType, taskItemType, {});
          if (success) {
            dispatch(tr);
            return true;
          }
        }

        // Not in any list — use default behavior
        return commands.toggleList(this.name, this.options.itemTypeName);
      },
    };
  },
});

/**
 * Extended OrderedList that accepts both listItem and taskItem children.
 * 
 * Overrides toggleOrderedList to properly convert taskItem children to listItem
 * when switching from a taskList.
 */
export const MixedOrderedList = OrderedList.extend({
  content: '(listItem | taskItem)+',

  addCommands() {
    return {
      toggleOrderedList: () => ({ commands, state, tr, dispatch }) => {
        const { selection } = state;
        const { $from } = selection;
        
        const bulletListType = state.schema.nodes.bulletList;
        const taskListType = state.schema.nodes.taskList;
        const orderedListType = state.schema.nodes.orderedList;
        const listItemType = state.schema.nodes.listItem;
        const taskItemType = state.schema.nodes.taskItem;

        // Find the parent list
        let parentListType = null;
        let parentListPos = -1;
        for (let d = $from.depth; d > 0; d--) {
          const node = $from.node(d);
          if (node.type === bulletListType || node.type === taskListType || node.type === orderedListType) {
            parentListType = node.type;
            parentListPos = $from.before(d);
            break;
          }
        }

        // If already in an orderedList, lift out (toggle off)
        if (parentListType === orderedListType) {
          return commands.liftListItem('listItem');
        }

        // If in a taskList or bulletList, convert to orderedList and convert items
        if (parentListType === taskListType || parentListType === bulletListType) {
          if (!dispatch) return true;
          const success = convertListType(tr, parentListPos, orderedListType, listItemType, taskItemType, {});
          if (success) {
            dispatch(tr);
            return true;
          }
        }

        // Not in any list — use default behavior
        return commands.toggleList(this.name, this.options.itemTypeName);
      },
    };
  },
});

/**
 * Extended TaskList that accepts both taskItem and listItem children.
 * 
 * Overrides toggleTaskList to handle multi-paragraph selection properly.
 * The default toggleList + wrapInList from ProseMirror fails when the
 * content spec is "(taskItem | listItem)+" because wrapInList can't
 * determine which item type to use for wrapping. We fix this by:
 * 1. First wrapping in a bulletList (which always works with listItem)
 * 2. Then converting the bulletList to a taskList and listItems to taskItems
 */
export const MixedTaskList = TaskList.extend({
  content: '(taskItem | listItem)+',

  addCommands() {
    return {
      toggleTaskList: () => ({ editor, commands, state, tr, dispatch, chain, can }) => {
        const { selection } = state;
        const { $from, $to } = selection;
        const range = $from.blockRange($to);
        
        if (!range) {
          return false;
        }

        // Check if we're already in a taskList — if so, lift out (toggle off)
        const taskListType = state.schema.nodes.taskList;
        const taskItemType = state.schema.nodes.taskItem;
        
        // Find if we're inside a taskList
        let isInTaskList = false;
        let taskListPos = -1;
        for (let d = $from.depth; d > 0; d--) {
          const node = $from.node(d);
          if (node.type === taskListType) {
            isInTaskList = true;
            taskListPos = $from.before(d);
            break;
          }
        }

        if (isInTaskList) {
          // Already in a task list — lift items out
          return commands.liftListItem('taskItem');
        }

        // Check if we're in another list type (bulletList or orderedList)
        const bulletListType = state.schema.nodes.bulletList;
        const orderedListType = state.schema.nodes.orderedList;
        const listItemType = state.schema.nodes.listItem;
        
        let parentListNode = null;
        let parentListPos = -1;
        let parentListDepth = -1;
        for (let d = $from.depth; d > 0; d--) {
          const node = $from.node(d);
          if (node.type === bulletListType || node.type === orderedListType) {
            parentListNode = node;
            parentListPos = $from.before(d);
            parentListDepth = d;
            break;
          }
        }

        if (parentListNode) {
          // We're in a bulletList or orderedList — convert to taskList
          // First convert the list type, then convert listItem children to taskItem
          if (!dispatch) return true;

          // Convert listItems to taskItems within this list
          const listStart = parentListPos;
          const listNode = tr.doc.nodeAt(listStart);
          if (!listNode) return false;

          // Change the list type to taskList
          tr.setNodeMarkup(listStart, taskListType, listNode.attrs);

          // Now convert all direct listItem children to taskItem
          let offset = 1; // skip the list node opening
          const updatedListNode = tr.doc.nodeAt(listStart);
          if (!updatedListNode) return false;
          
          const positions: number[] = [];
          updatedListNode.forEach((child, childOffset) => {
            if (child.type === listItemType) {
              positions.push(listStart + 1 + childOffset);
            }
          });

          // Apply in reverse to preserve positions
          for (let i = positions.length - 1; i >= 0; i--) {
            const pos = positions[i];
            const node = tr.doc.nodeAt(pos);
            if (node && node.type === listItemType) {
              tr.setNodeMarkup(pos, taskItemType, { checked: false });
            }
          }

          dispatch(tr);
          return true;
        }

        // Not in any list — wrap selected paragraphs in a taskList using a single transaction.
        // Previously used a two-step approach (bulletList then convert) which created two
        // transactions, breaking undo and causing a brief bullet list flash.
        if (!dispatch) return true; // can() check — just report we can handle it

        // Use findWrapping to determine how to wrap the range in a taskList
        const wrapping = findWrapping(range, taskListType);
        if (wrapping) {
          // findWrapping returns wrapping with listItem by default; we need taskItem
          // Apply the wrap, then convert listItems to taskItems
          tr.wrap(range, wrapping);
          
          // After wrapping, find the taskList we just created and convert any listItems to taskItems
          const { $from: newFrom } = tr.selection;
          let newTaskListPos = -1;
          for (let d = newFrom.depth; d > 0; d--) {
            const node = newFrom.node(d);
            if (node.type === taskListType) {
              newTaskListPos = newFrom.before(d);
              break;
            }
          }
          
          if (newTaskListPos >= 0) {
            const taskListNode = tr.doc.nodeAt(newTaskListPos);
            if (taskListNode) {
              const itemPositions: number[] = [];
              taskListNode.forEach((child, childOffset) => {
                if (child.type === listItemType) {
                  itemPositions.push(newTaskListPos + 1 + childOffset);
                }
              });
              for (let i = itemPositions.length - 1; i >= 0; i--) {
                const pos = itemPositions[i];
                const node = tr.doc.nodeAt(pos);
                if (node && node.type === listItemType) {
                  tr.setNodeMarkup(pos, taskItemType, { checked: false });
                }
              }
            }
          }
          
          dispatch(tr);
          return true;
        }

        // Fallback: try wrapping via bulletList first, then convert in same transaction
        const bulletWrapping = findWrapping(range, bulletListType);
        if (bulletWrapping) {
          tr.wrap(range, bulletWrapping);
          
          // Find the bulletList and convert it + its children to taskList/taskItem
          const { $from: newFrom } = tr.selection;
          let bListPos = -1;
          for (let d = newFrom.depth; d > 0; d--) {
            const node = newFrom.node(d);
            if (node.type === bulletListType) {
              bListPos = newFrom.before(d);
              break;
            }
          }
          
          if (bListPos >= 0) {
            convertListType(tr, bListPos, taskListType, taskItemType, listItemType, { checked: false });
          }
          
          dispatch(tr);
          return true;
        }

        // Last resort fallback
        return commands.toggleList(this.name, this.options.itemTypeName);
      },
    };
  },
});

/**
 * Extended TaskItem with nested content always enabled for mixed list support.
 * 
 * Overrides addInputRules to explicitly wrap in taskList when typing []<space>.
 * The default wrappingInputRule uses findWrapping which, with mixed content specs,
 * may find bulletList as a valid wrapper for taskItem (since MixedBulletList accepts
 * taskItem children). We fix this by explicitly specifying the taskList wrapping.
 */
export const MixedTaskItem = TaskItem.extend({
  content: 'paragraph block*',

  addInputRules() {
    // Return empty array - task item input rules are handled by the document-level
    // handleKeyDown in MarkdownEditor.tsx, which intercepts space key presses and
    // directly creates taskList > taskItem using ProseMirror transactions.
    // The default wrappingInputRule from the base TaskItem uses findWrapping which
    // picks bulletList (since MixedBulletList accepts taskItem children).
    return [];
  },

  addProseMirrorPlugins() {
    // Backup ProseMirror plugin for task item creation via handleTextInput.
    // The primary handler is the document-level handleKeyDown in MarkdownEditor.tsx.
    // This plugin serves as a fallback for cases where text input reaches ProseMirror
    // (e.g., paste, IME composition, or if the document handler is bypassed).
    const taskItemType = this.type;
    const taskListType = this.editor.schema.nodes.taskList;
    
    return [
      new Plugin({
        key: new PluginKey('taskItemInputRule'),
        props: {
          handleTextInput(view, from, to, text) {
            if (text !== ' ') return false;
            
            const { state } = view;
            const $from = state.doc.resolve(from);
            
            const textBefore = $from.parent.textBetween(
              0,
              $from.parentOffset,
              undefined,
              '\ufffc'
            );
            
            // Match patterns: [] , [ ] , [x] , - [] , - [ ] , - [x]
            const inputRegex = /^\s*(-\s*)?\[([( |x])?\]$/;
            const match = inputRegex.exec(textBefore);
            
            if (!match) return false;
            
            const checked = match[2] === 'x';
            
            const matchStart = $from.start() + (match.index || 0);
            const matchEnd = from;
            
            const tr = state.tr;
            tr.delete(matchStart, matchEnd);
            
            const $start = tr.doc.resolve(matchStart);
            const blockRange = $start.blockRange();
            
            if (!blockRange || !taskListType || !taskItemType) return false;
            
            const wrapping = [
              { type: taskListType, attrs: {} },
              { type: taskItemType, attrs: { checked } },
            ];
            
            tr.wrap(blockRange, wrapping);
            
            if (matchStart > 1) {
              const before = tr.doc.resolve(matchStart - 1).nodeBefore;
              if (before && before.type === taskListType && canJoin(tr.doc, matchStart - 1)) {
                tr.join(matchStart - 1);
              }
            }
            
            view.dispatch(tr);
            return true;
          },
        },
      }),
    ];
  },
});

/**
 * Extended ListItem that ensures block* content for nesting support
 */
export const MixedListItem = ListItem.extend({
  content: 'paragraph block*',
});
