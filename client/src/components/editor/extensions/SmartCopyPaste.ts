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
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Slice, Fragment } from '@tiptap/pm/model';
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

    const selFrom = selection.from;
    const selTo = selection.to;

    let isFullContent: boolean;

    if (node.type.name === 'codeBlock') {
      // Code block: simple text content, direct comparison
      isFullContent = selFrom <= containerContentStart && selTo >= containerContentEnd;
    } else {
      // Callout (or other block containers): check if selection covers
      // from the first leaf position to the last leaf position.
      const firstChild = node.firstChild;
      const lastChild = node.lastChild;

      if (!firstChild || !lastChild) {
        isFullContent = false;
      } else {
        // The selection must start at or before the first text position of the first child
        // and end at or after the last text position of the last child.
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
    const editor = this.editor;

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

            if (containerType === 'codeBlock') {
              // Code block special handling:
              // The inner content is a text node with \n for line breaks.
              // We need to split on \n and create separate paragraph nodes
              // so that the pasted content preserves line structure.
              const schema = editor.schema;
              const paragraphType = schema.nodes.paragraph;

              if (!paragraphType) {
                // Fallback: just unwrap without conversion
                const innerContent = outerNode.content;
                return new Slice(innerContent, Math.max(0, openStart - 1), Math.max(0, openEnd - 1));
              }

              // Collect all text from the code block's inner content
              let fullText = '';
              outerNode.content.forEach((node) => {
                fullText += node.text || '';
              });

              // Split by newlines and create paragraph nodes
              const lines = fullText.split('\n');

              // Remove trailing empty line if present (code blocks often end with \n)
              if (lines.length > 1 && lines[lines.length - 1] === '') {
                lines.pop();
              }

              const paragraphs = lines.map((line) => {
                if (line === '') {
                  return paragraphType.create();
                }
                return paragraphType.create(null, schema.text(line));
              });

              const fragment = Fragment.from(paragraphs);
              // openStart=0, openEnd=0: these are complete paragraph nodes
              return new Slice(fragment, 0, 0);
            } else {
              // Callout: unwrap by extracting inner content and reducing open depth
              const innerContent = outerNode.content;
              const newOpenStart = Math.max(0, openStart - 1);
              const newOpenEnd = Math.max(0, openEnd - 1);

              return new Slice(innerContent, newOpenStart, newOpenEnd);
            }
          },
        },
      }),
    ];
  },
});

export default SmartCopyPaste;
