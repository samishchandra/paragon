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

/**
 * Extended BulletList that accepts both listItem and taskItem children
 */
export const MixedBulletList = BulletList.extend({
  content: '(listItem | taskItem)+',
});

/**
 * Extended OrderedList that accepts both listItem and taskItem children
 */
export const MixedOrderedList = OrderedList.extend({
  content: '(listItem | taskItem)+',
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

        // Not in any list — need to wrap selected paragraphs in a taskList
        // Strategy: Use bulletList toggle first (which handles multi-paragraph),
        // then convert to taskList
        const canWrapBullet = can().toggleBulletList();
        
        if (canWrapBullet) {
          // First wrap in bullet list
          const success = chain().toggleBulletList().run();
          if (!success) return false;
          
          // Now we need to convert the newly created bulletList to taskList
          // Get fresh state after the bullet list toggle
          const newState = editor.state;
          const newTr = newState.tr;
          const { $from: newFrom } = newState.selection;
          
          // Find the bulletList we just created
          let bListPos = -1;
          for (let d = newFrom.depth; d > 0; d--) {
            const node = newFrom.node(d);
            if (node.type === bulletListType) {
              bListPos = newFrom.before(d);
              break;
            }
          }

          if (bListPos >= 0) {
            const bListNode = newTr.doc.nodeAt(bListPos);
            if (bListNode) {
              // Convert bulletList to taskList
              newTr.setNodeMarkup(bListPos, taskListType, bListNode.attrs);

              // Convert listItems to taskItems
              const updatedNode = newTr.doc.nodeAt(bListPos);
              if (updatedNode) {
                const itemPositions: number[] = [];
                updatedNode.forEach((child, childOffset) => {
                  if (child.type === listItemType) {
                    itemPositions.push(bListPos + 1 + childOffset);
                  }
                });

                for (let i = itemPositions.length - 1; i >= 0; i--) {
                  const pos = itemPositions[i];
                  const node = newTr.doc.nodeAt(pos);
                  if (node && node.type === listItemType) {
                    newTr.setNodeMarkup(pos, taskItemType, { checked: false });
                  }
                }
              }

              editor.view.dispatch(newTr);
            }
          }

          return true;
        }

        // Fallback: try the default toggleList behavior
        return commands.toggleList(this.name, this.options.itemTypeName);
      },
    };
  },
});

/**
 * Extended TaskItem with nested content always enabled for mixed list support
 */
export const MixedTaskItem = TaskItem.extend({
  content: 'paragraph block*',
});

/**
 * Extended ListItem that ensures block* content for nesting support
 */
export const MixedListItem = ListItem.extend({
  content: 'paragraph block*',
});
