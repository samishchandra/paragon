import type { Editor } from '@tiptap/react';
/**
 * Insert a horizontal rule at the current cursor position without adding
 * an extra empty paragraph after it. The default TipTap setHorizontalRule
 * command always creates a new paragraph node when the HR is at the end
 * of the document, which results in an unwanted blank line.
 *
 * This custom implementation:
 * 1. Optionally deletes trigger text (e.g. "---") if deleteFrom !== deleteTo
 * 2. Replaces the current (now empty) paragraph with an <hr> node
 * 3. Places the cursor in the next existing block, or creates a single
 *    paragraph if the HR is at the end of the document
 *
 * @param editor - The TipTap editor instance
 * @param deleteFrom - Start position of text to delete (same as deleteTo for toolbar/slash)
 * @param deleteTo - End position of text to delete (same as deleteFrom for toolbar/slash)
 */
export declare function insertHorizontalRuleClean(editor: Editor, deleteFrom: number, deleteTo: number): void;
