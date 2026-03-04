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
 *   For code blocks, this means plain text. For callouts, this means
 *   the selected paragraphs, list items, etc. without the callout wrapper.
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
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Slice } from '@tiptap/pm/model';
import type { EditorView } from '@tiptap/pm/view';

const smartCopyPastePluginKey = new PluginKey('smartCopyPaste');

/** Node type names that should be unwrapped on partial copy */
const CONTAINER_TYPES = new Set(['codeBlock', 'callout']);

/**
 * Determine if the current selection covers the ENTIRE content of a
 * container node (code block or callout).
 *
 * "Full content" means:
 * - For code blocks: the selection covers all text from position 0 to the end
 * - For callouts: the selection spans from the very start of the first child
 *   to the very end of the last child (i.e., all block children are fully covered)
 *
 * The tricky part: when you "select all" inside a callout, the selection
 * positions are inside the first and last child nodes (e.g., inside paragraphs),
 * not at the callout's own content boundaries. So we need to check whether
 * the selection reaches the first text position of the first child and the
 * last text position of the last child.
 */
function analyzeSelection(view: EditorView): { isFullContainer: boolean; containerType: string | null } {
  const { state } = view;
  const { selection } = state;
  const { $from, $to } = selection;

  // Walk up from $from to find the nearest container ancestor
  for (let depth = $from.depth; depth > 0; depth--) {
    const node = $from.node(depth);
    if (!CONTAINER_TYPES.has(node.type.name)) continue;

    // Found a container. Check if the selection covers its entire content.
    const containerContentStart = $from.start(depth);
    const containerContentEnd = $from.end(depth);

    // Check that $to is also inside the same container
    const toDepth = $to.depth;
    let toIsInSameContainer = false;
    for (let d = toDepth; d > 0; d--) {
      if ($to.start(d) === containerContentStart && $to.node(d) === node) {
        toIsInSameContainer = true;
        break;
      }
    }

    if (!toIsInSameContainer) {
      // Selection extends beyond this container — not our concern
      return { isFullContainer: false, containerType: null };
    }

    // Check if selection covers the entire content.
    //
    // For code blocks (content: "text*"):
    //   containerContentStart is right after the opening of the code block.
    //   containerContentEnd is right before the closing.
    //   A full selection means from === containerContentStart and to === containerContentEnd.
    //
    // For callouts (content: "block+"):
    //   The callout contains child blocks (paragraphs, lists, etc.).
    //   containerContentStart is right after the opening of the callout.
    //   containerContentEnd is right before the closing.
    //   When you "select all" inside a callout, the cursor starts inside
    //   the first child (e.g., first paragraph) and ends inside the last child.
    //   So selection.from > containerContentStart and selection.to < containerContentEnd.
    //
    //   To detect "full content", we check:
    //   - The selection starts at or before the first text position of the first child
    //   - The selection ends at or after the last text position of the last child
    //
    //   The first text position of the first child is containerContentStart + 1
    //   (entering the first child block). For a paragraph, the text starts at +1.
    //   The last text position of the last child is containerContentEnd - 1
    //   (just before the closing of the last child block).
    //
    //   But we need to handle deeply nested structures too. The safest approach:
    //   resolve the "deepest first position" and "deepest last position" inside
    //   the container and check if the selection covers those.

    const selFrom = selection.from;
    const selTo = selection.to;

    let isFullContent: boolean;

    if (node.type.name === 'codeBlock') {
      // Code block: simple text content, direct comparison
      isFullContent = selFrom <= containerContentStart && selTo >= containerContentEnd;
    } else {
      // Callout (or other block containers): check if selection covers
      // from the first leaf position to the last leaf position.
      //
      // The first "enterable" position inside the container is the position
      // just inside the first child. For a callout with paragraphs:
      //   callout pos = containerContentStart - 1
      //   first paragraph opens at containerContentStart
      //   first text position = containerContentStart + 1
      //
      // The last "enterable" position is just inside the last child:
      //   last paragraph closes at containerContentEnd
      //   last text position = containerContentEnd - 1
      //
      // If the first child is a list (which has list items, which have paragraphs),
      // the nesting goes deeper, but the first/last text positions are still
      // the deepest positions reachable from the container boundaries.

      // Use ProseMirror's resolve to find the deepest positions
      const firstInnerPos = containerContentStart + 1; // enter first child
      const lastInnerPos = containerContentEnd - 1; // enter last child

      // Check if selection reaches from the start of the first child's content
      // to the end of the last child's content
      // We need to check that $from is at or before the first child's content start
      // and $to is at or after the last child's content end.

      // For the first child: its content starts at containerContentStart + 1
      // (the position just inside the first child node)
      // For the last child: its content ends at containerContentEnd - 1

      // But for nested structures (list > listItem > paragraph), we need
      // to go deeper. The simplest reliable check: the selection must include
      // ALL direct children of the container.

      // Check: does the selection start within the first child and end within the last child,
      // AND cover all children in between?
      const firstChild = node.firstChild;
      const lastChild = node.lastChild;

      if (!firstChild || !lastChild) {
        isFullContent = false;
      } else {
        // First child starts at containerContentStart, ends at containerContentStart + firstChild.nodeSize
        // Last child starts at containerContentEnd - lastChild.nodeSize, ends at containerContentEnd

        // The selection must start at or before the first text position of the first child
        // and end at or after the last text position of the last child.
        // First text position of first child = containerContentStart + 1 (entering the child)
        // Last text position of last child = containerContentEnd - 1 (just before closing the child)

        // For the selection to cover "all content", it must:
        // 1. Start at position <= containerContentStart + 1 (at or before first child's content)
        // 2. End at position >= containerContentEnd - 1 (at or after last child's content)
        isFullContent = selFrom <= containerContentStart + 1 && selTo >= containerContentEnd - 1;
      }
    }

    return {
      isFullContainer: isFullContent,
      containerType: node.type.name,
    };
  }

  return { isFullContainer: false, containerType: null };
}

export const SmartCopyPaste = Extension.create({
  name: 'smartCopyPaste',

  addProseMirrorPlugins() {
    // We store the analysis result so transformCopied can read it
    let lastAnalysis: { isFullContainer: boolean; containerType: string | null } = {
      isFullContainer: false,
      containerType: null,
    };

    return [
      new Plugin({
        key: smartCopyPastePluginKey,

        props: {
          handleDOMEvents: {
            // Analyze the selection right before copy/cut happens
            copy(view: EditorView) {
              lastAnalysis = analyzeSelection(view);
              // Return false to let ProseMirror handle the copy normally
              return false;
            },
            cut(view: EditorView) {
              lastAnalysis = analyzeSelection(view);
              return false;
            },
          },

          /**
           * transformCopied is called after the slice is created from the
           * selection but before it's serialized to the clipboard.
           * We use the analysis from the handleDOMEvents.copy/cut handler.
           */
          transformCopied(slice: Slice): Slice {
            const { containerType, isFullContainer } = lastAnalysis;

            // Reset for next copy
            lastAnalysis = { isFullContainer: false, containerType: null };

            // If not inside a container, or it's a full container selection,
            // leave the slice as-is (preserve the wrapper)
            if (!containerType || isFullContainer) {
              return slice;
            }

            // Partial selection inside a container — unwrap it
            const { content, openStart, openEnd } = slice;

            // The slice should have exactly one child (the container node)
            // with openStart > 0 indicating we're inside it
            if (content.childCount !== 1 || openStart === 0) {
              return slice;
            }

            const outerNode = content.firstChild;
            if (!outerNode || !CONTAINER_TYPES.has(outerNode.type.name)) {
              return slice;
            }

            // Unwrap: extract the inner content and reduce open depth by 1
            // For code blocks (content: "text*"):
            //   The inner content is text nodes. openStart was 1 (inside code block).
            //   After unwrap, openStart becomes 0 and content is the text fragment.
            // For callouts (content: "block+"):
            //   The inner content is block nodes (paragraphs, lists, etc.).
            //   openStart was 1+ (inside callout, possibly inside a paragraph).
            //   After unwrap, openStart decreases by 1.
            const innerContent = outerNode.content;
            const newOpenStart = Math.max(0, openStart - 1);
            const newOpenEnd = Math.max(0, openEnd - 1);

            return new Slice(innerContent, newOpenStart, newOpenEnd);
          },
        },
      }),
    ];
  },
});

export default SmartCopyPaste;
