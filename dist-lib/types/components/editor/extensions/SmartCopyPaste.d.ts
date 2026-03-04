/**
 * SmartCopyPaste – ProseMirror plugin that implements intelligent
 * copy-paste behavior for code blocks and callouts.
 *
 * Behavior:
 * - **Full selection** (entire content of a code block or callout):
 *   The paste preserves the container wrapper. You get a new code block
 *   or callout with the same content.
 * - **Partial selection** (some content inside a code block or callout):
 *   The paste unwraps the container and pastes only the inner content.
 *   For code blocks, lines are converted to separate paragraphs so
 *   newlines are preserved. For callouts, the selected paragraphs,
 *   list items, etc. are pasted without the callout wrapper.
 *
 * Implementation:
 * Uses a two-part approach:
 * 1. DOM event handlers (copy/cut) analyze the selection before ProseMirror
 *    creates the clipboard slice, storing whether it's a full or partial
 *    container selection.
 * 2. The `transformCopied` hook reads this stored analysis and decides
 *    whether to unwrap the container from the slice.
 *
 * Safety:
 * - Only modifies the clipboard slice, not the document
 * - Only fires during copy/cut operations
 * - Self-contained: can be removed without side effects
 */
import { Extension } from '@tiptap/core';
export declare const SmartCopyPaste: Extension<any, any>;
export default SmartCopyPaste;
