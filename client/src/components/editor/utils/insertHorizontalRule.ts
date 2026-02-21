import { TextSelection } from '@tiptap/pm/state';
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
export function insertHorizontalRuleClean(
  editor: Editor,
  deleteFrom: number,
  deleteTo: number
): void {
  const { state } = editor;
  const { tr } = state;

  // Delete the trigger text (e.g. "---") if any
  if (deleteFrom !== deleteTo) {
    tr.delete(deleteFrom, deleteTo);
  }

  // Resolve position after deletion
  const $pos = tr.doc.resolve(deleteFrom);
  const hrNode = state.schema.nodes.horizontalRule.create();

  // Replace the current paragraph block with the HR
  const blockStart = $pos.before($pos.depth);
  const blockEnd = $pos.after($pos.depth);
  tr.replaceWith(blockStart, blockEnd, hrNode);

  // Position right after the HR node
  const posAfterHR = blockStart + hrNode.nodeSize;

  // Check if there's already content after the HR
  if (posAfterHR < tr.doc.content.size) {
    const $afterHR = tr.doc.resolve(posAfterHR);
    if ($afterHR.nodeAfter && $afterHR.nodeAfter.isTextblock) {
      // Place cursor at start of existing next block
      tr.setSelection(TextSelection.create(tr.doc, posAfterHR + 1));
    } else if ($afterHR.nodeAfter) {
      // Next node exists but isn't a textblock - try to find nearest text position
      tr.setSelection(TextSelection.near(tr.doc.resolve(posAfterHR)));
    }
  } else {
    // At end of document - add a paragraph and place cursor in it
    const paragraphType = state.schema.nodes.paragraph;
    const newParagraph = paragraphType.create();
    tr.insert(posAfterHR, newParagraph);
    tr.setSelection(TextSelection.create(tr.doc, posAfterHR + 1));
  }

  tr.scrollIntoView();
  editor.view.dispatch(tr);
}
