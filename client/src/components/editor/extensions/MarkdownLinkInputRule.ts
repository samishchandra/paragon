import { Extension } from '@tiptap/core';
import { InputRule } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

/**
 * Extension to automatically convert markdown link syntax [text](url) to actual links
 * Also handles pasting URLs to auto-create links
 */

// Regex to match markdown link syntax: [text](url)
// This matches when the user types the closing parenthesis
const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)$/;

// Regex to detect URLs
const urlRegex = /^(https?:\/\/|www\.)[^\s]+$/i;

export const MarkdownLinkInputRule = Extension.create({
  name: 'markdownLinkInputRule',

  addInputRules() {
    return [
      new InputRule({
        find: markdownLinkRegex,
        handler: ({ state, range, match, chain }) => {
          const linkText = match[1];
          let linkUrl = match[2];
          
          // Ensure URL has protocol
          if (linkUrl && !linkUrl.startsWith('http://') && !linkUrl.startsWith('https://')) {
            if (linkUrl.startsWith('www.')) {
              linkUrl = 'https://' + linkUrl;
            } else {
              linkUrl = 'https://' + linkUrl;
            }
          }

          // Use chain to delete the markdown syntax and insert linked text
          chain()
            .deleteRange(range)
            .insertContent({
              type: 'text',
              text: linkText,
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: linkUrl,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  },
                },
              ],
            })
            .run();
        },
      }),
    ];
  },

  addProseMirrorPlugins() {
    const editor = this.editor;
    
    return [
      new Plugin({
        key: new PluginKey('pasteUrlAsLink'),
        props: {
          handlePaste(view, event) {
            const clipboardData = event.clipboardData;
            if (!clipboardData) return false;

            const text = clipboardData.getData('text/plain');
            if (!text) return false;

            // Check if the pasted text is a URL
            const trimmedText = text.trim();
            if (!urlRegex.test(trimmedText)) return false;

            // Get the current selection
            const { state } = view;
            const { selection } = state;
            const { from, to, empty } = selection;

            // Ensure URL has protocol
            let url = trimmedText;
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
              if (url.startsWith('www.')) {
                url = 'https://' + url;
              } else {
                url = 'https://' + url;
              }
            }

            // If there's selected text, convert it to a link
            if (!empty) {
              const selectedText = state.doc.textBetween(from, to);
              if (selectedText) {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange('link')
                  .setLink({ href: url })
                  .run();
                return true;
              }
            }

            // If no selection, insert the URL as a clickable link
            const linkMark = state.schema.marks.link.create({ href: url });
            const tr = state.tr;
            
            // Insert the URL text with link mark
            tr.insertText(url, from, to);
            tr.addMark(from, from + url.length, linkMark);
            
            view.dispatch(tr);
            return true;
          },
        },
      }),
    ];
  },
});
