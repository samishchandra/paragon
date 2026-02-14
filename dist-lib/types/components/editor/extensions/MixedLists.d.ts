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
/**
 * Extended BulletList that accepts both listItem and taskItem children
 */
export declare const MixedBulletList: import("@tiptap/core").Node<import("@tiptap/extension-bullet-list").BulletListOptions, any>;
/**
 * Extended OrderedList that accepts both listItem and taskItem children
 */
export declare const MixedOrderedList: import("@tiptap/core").Node<import("@tiptap/extension-ordered-list").OrderedListOptions, any>;
/**
 * Extended TaskList that accepts both taskItem and listItem children
 */
export declare const MixedTaskList: import("@tiptap/core").Node<import("@tiptap/extension-task-list").TaskListOptions, any>;
/**
 * Extended TaskItem with nested content always enabled for mixed list support
 */
export declare const MixedTaskItem: import("@tiptap/core").Node<import("@tiptap/extension-task-item").TaskItemOptions, any>;
/**
 * Extended ListItem that ensures block* content for nesting support
 */
export declare const MixedListItem: import("@tiptap/core").Node<import("@tiptap/extension-list-item").ListItemOptions, any>;
