/**
 * LinkBoundary – ProseMirror plugin that prevents typed text from being
 * absorbed into a link mark when the cursor is at the very start of a
 * textblock whose first inline content is a link.
 *
 * Problem: TipTap's Link extension sets `inclusive: true` when `autolink`
 * is enabled, so any text typed at the boundary of a link inherits the
 * link mark. This is desirable when extending a link at the end (e.g.
 * typing more characters after an auto-detected URL), but undesirable
 * when the cursor is placed *before* a link at the beginning of a line
 * or list item — the user expects plain text, not linked text.
 *
 * Solution: An `appendTransaction` plugin that watches for cursor
 * movements. When the cursor lands at position 0 of a textblock and
 * the first inline content is a link, it sets `storedMarks` to the
 * current marks minus the link mark. This tells ProseMirror to use
 * those marks for the next typed character instead of inheriting from
 * the adjacent link.
 *
 * Safety:
 * - Only modifies storedMarks (not the document)
 * - Only triggers when cursor is at position 0 of a textblock with a link
 * - Does not modify the Link extension's schema or configuration
 * - Self-contained: can be removed without side effects
 */
import { Extension } from '@tiptap/core';
export declare const LinkBoundary: Extension<any, any>;
