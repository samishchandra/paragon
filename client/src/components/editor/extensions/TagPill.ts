import { Node, mergeAttributes, InputRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { TagPillComponent } from '../TagPillComponent';

/*
 * TagPill Extension
 * Creates inline tag pills with rounded corners for hashtag-style tags.
 * Stores tags as plain strings (without the # prefix).
 * Markdown format: #tagname (e.g., #mem, #work, #urgent)
 *
 * Auto-detection triggers:
 * 1. Typing: #tagname followed by a space (space-terminated)
 * 2. Pasting: text containing #tag patterns is auto-converted
 *
 * Tag rules:
 * - Must start with # followed by at least 1 alphanumeric character
 * - Can contain letters, numbers, hyphens, and underscores
 * - Cannot be purely numeric (to avoid matching issue numbers like #123)
 */

export interface TagPillOptions {
  HTMLAttributes: Record<string, unknown>;
  /** Callback when a tag pill is clicked */
  onTagClick?: (tag: string) => void;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tagPill: {
      /** Insert a tag pill */
      insertTagPill: (tag: string) => ReturnType;
    };
  }
}

/** Validate a tag string: must contain at least one letter */
export function isValidTag(tag: string): boolean {
  // Must have at least one letter (not purely numeric)
  return /[a-zA-Z]/.test(tag) && /^[a-zA-Z0-9_-]+$/.test(tag);
}

/** Normalize a tag: lowercase, trim */
export function normalizeTag(tag: string): string {
  return tag.toLowerCase().trim();
}

/** Plugin key for the tag pill paste handler */
const tagPillPastePluginKey = new PluginKey('tagPillPaste');

export const TagPill = Node.create<TagPillOptions>({
  name: 'tagPill',
  group: 'inline',
  inline: true,
  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      onTagClick: undefined,
    };
  },

  addAttributes() {
    return {
      tag: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-tag'),
        renderHTML: (attributes) => ({ 'data-tag': attributes.tag }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-type="tag-pill"]' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const tag = node.attrs.tag;

    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': 'tag-pill',
        class: 'tag-pill',
      }),
      ['span', { class: 'tag-icon' }, '#'],
      ['span', { class: 'tag-text' }, tag],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TagPillComponent, {
      stopEvent: ({ event }) => {
        if (event.type === 'click' || event.type === 'mousedown') {
          return true;
        }
        return false;
      },
    });
  },

  addCommands() {
    return {
      insertTagPill:
        (tag: string) =>
        ({ commands }) => {
          const normalized = normalizeTag(tag);
          if (!isValidTag(normalized)) return false;
          return commands.insertContent({
            type: this.name,
            attrs: { tag: normalized },
          });
        },
    };
  },

  addInputRules() {
    // Match #tagname followed by a space
    // Tag must contain at least one letter (not purely numeric)
    // Negative lookbehind for word characters to avoid matching mid-word
    const tagRule = new InputRule({
      find: /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)\s$/,
      handler: ({ range, chain, match }) => {
        const tag = normalizeTag(match[1]);
        if (isValidTag(tag)) {
          // Adjust range to keep the leading space/start if present
          const fullMatch = match[0];
          const leadingSpace = fullMatch.startsWith(' ') ? 1 : 0;
          const adjustedFrom = range.from + leadingSpace;
          chain()
            .deleteRange({ from: adjustedFrom, to: range.to })
            .insertTagPill(tag)
            .run();
        }
      },
    });

    return [tagRule];
  },

  addProseMirrorPlugins() {
    const tagPillType = this.type;

    return [
      new Plugin({
        key: tagPillPastePluginKey,
        props: {
          handlePaste(view, event) {
            const clipboardData = event.clipboardData;
            if (!clipboardData) return false;

            const text = clipboardData.getData('text/plain');
            const html = clipboardData.getData('text/html');

            // If there's HTML with tag pills already, let the default handler process it
            if (html && html.includes('data-type="tag-pill"')) return false;

            // Check if the pasted text contains #tag patterns
            // Match #tag that is preceded by start-of-string or whitespace
            const tagPattern = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let hasTagPatterns = false;
            let testMatch: RegExpExecArray | null;

            const tempRegex = new RegExp(tagPattern.source, tagPattern.flags);
            while ((testMatch = tempRegex.exec(text)) !== null) {
              if (isValidTag(testMatch[1])) {
                hasTagPatterns = true;
                break;
              }
            }

            if (!hasTagPatterns) return false;

            // Build content array: split text by #tag patterns and create
            // alternating text nodes and tag pill nodes
            const { state } = view;
            const { tr, schema } = state;
            const contentNodes: any[] = [];
            let lastIndex = 0;

            const splitRegex = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let match: RegExpExecArray | null;

            while ((match = splitRegex.exec(text)) !== null) {
              const tag = normalizeTag(match[1]);

              if (isValidTag(tag)) {
                // The match may include a leading space
                const fullMatch = match[0];
                const leadingSpace = fullMatch.startsWith(' ') || fullMatch.startsWith('\n') ? 1 : 0;

                // Add text before the tag pattern (including leading whitespace)
                const beforeText = text.slice(lastIndex, match.index + leadingSpace);
                if (beforeText) {
                  contentNodes.push(schema.text(beforeText));
                }
                // Add tag pill node
                contentNodes.push(tagPillType.create({ tag }));
                lastIndex = match.index + fullMatch.length;
              }
            }

            // Add remaining text after the last match
            const remainingText = text.slice(lastIndex);
            if (remainingText) {
              contentNodes.push(schema.text(remainingText));
            }

            if (contentNodes.length === 0) return false;

            // If pasting into an existing paragraph, insert inline
            const { $from } = state.selection;
            if ($from.parent.type.name === 'paragraph') {
              const insertTr = tr;
              let insertPos = state.selection.from;
              for (const node of contentNodes) {
                insertTr.insert(insertPos, node);
                insertPos += node.nodeSize;
              }
              insertTr.delete(state.selection.from, state.selection.to);
              view.dispatch(insertTr);
            } else {
              // Create a paragraph with the content
              const fragment = schema.nodes.doc.create(
                null,
                schema.nodes.paragraph.create(null, contentNodes)
              );
              tr.replaceSelectionWith(fragment);
              view.dispatch(tr);
            }

            event.preventDefault();
            return true;
          },
        },
      }),
    ];
  },
});

export default TagPill;
