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
 * Extended BulletList that accepts both listItem and taskItem children.
 *
 * Overrides toggleBulletList to properly convert taskItem children to listItem
 * when switching from a taskList. The default toggleList uses setNodeMarkup
 * which changes the list type but leaves taskItem children unconverted.
 */
export declare const MixedBulletList: import("@tiptap/core").Node<import("@tiptap/extension-bullet-list").BulletListOptions, any>;
/**
 * Extended OrderedList that accepts both listItem and taskItem children.
 *
 * Overrides toggleOrderedList to properly convert taskItem children to listItem
 * when switching from a taskList.
 */
export declare const MixedOrderedList: import("@tiptap/core").Node<import("@tiptap/extension-ordered-list").OrderedListOptions, any>;
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
export declare const MixedTaskList: import("@tiptap/core").Node<import("@tiptap/extension-task-list").TaskListOptions, any>;
/**
 * Extended TaskItem with nested content always enabled for mixed list support.
 *
 * Overrides addInputRules to explicitly wrap in taskList when typing []<space>.
 * The default wrappingInputRule uses findWrapping which, with mixed content specs,
 * may find bulletList as a valid wrapper for taskItem (since MixedBulletList accepts
 * taskItem children). We fix this by explicitly specifying the taskList wrapping.
 */
export declare const MixedTaskItem: import("@tiptap/core").Node<import("@tiptap/extension-task-item").TaskItemOptions, any>;
/**
 * Extended ListItem that ensures block* content for nesting support
 */
export declare const MixedListItem: import("@tiptap/core").Node<import("@tiptap/extension-list-item").ListItemOptions, any>;
