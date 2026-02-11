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
 * Extended TaskList that accepts both taskItem and listItem children
 */
export const MixedTaskList = TaskList.extend({
  content: '(taskItem | listItem)+',
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
