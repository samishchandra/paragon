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
import { Plugin, PluginKey } from '@tiptap/pm/state';

const linkBoundaryPluginKey = new PluginKey('linkBoundary');

export const LinkBoundary = Extension.create({
  name: 'linkBoundary',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: linkBoundaryPluginKey,

        appendTransaction(transactions, _oldState, newState) {
          const { selection, schema } = newState;
          const linkMarkType = schema.marks.link;
          if (!linkMarkType) return null;

          // Only act on collapsed cursor (not a range selection)
          if (!selection.empty) return null;

          const { $from } = selection;

          // Check if the cursor is at the start of a textblock
          if ($from.parentOffset !== 0) return null;

          // Check if the parent is a textblock
          if (!$from.parent.isTextblock) return null;

          // Check if the first child of the textblock has a link mark
          const firstChild = $from.parent.firstChild;
          if (!firstChild || !firstChild.isText) return null;

          const linkMark = linkMarkType.isInSet(firstChild.marks);
          if (!linkMark) return null;

          // The cursor is at position 0 of a textblock whose first content
          // is a link. Set storedMarks to exclude the link mark so that
          // any typed text will NOT inherit the link.
          // We keep all other marks that might be active.
          const currentStoredMarks = newState.storedMarks || $from.marks();
          const marksWithoutLink = currentStoredMarks.filter(
            mark => mark.type !== linkMarkType
          );

          // Only create a transaction if we actually need to change storedMarks
          // (i.e., the current stored marks include a link mark)
          const hasLinkInStored = currentStoredMarks.some(
            mark => mark.type === linkMarkType
          );
          if (!hasLinkInStored) return null;

          const { tr } = newState;
          tr.setStoredMarks(marksWithoutLink);
          return tr;
        },
      }),
    ];
  },
});
