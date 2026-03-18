/**
 * Convert marked's standard checkbox list HTML to TipTap's task list format.
 * Uses DOM parsing for robust handling of nested/mixed lists with inline formatting.
 *
 * marked outputs: <ul><li><input disabled="" type="checkbox"> text</li></ul>
 * TipTap expects: <ul data-type="taskList"><li data-type="taskItem" data-checked="true/false"><p>text</p></li></ul>
 *
 * Handles:
 * - Nested lists (bullet inside task, task inside bullet)
 * - Mixed lists (some items are checkboxes, some are regular bullets)
 * - Inline formatting (bold, italic, strikethrough) inside list items
 * - Various attribute orderings from marked
 */
export declare function convertCheckboxListsToTaskLists(html: string): string;
