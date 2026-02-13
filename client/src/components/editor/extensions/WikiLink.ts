import { Mark, mergeAttributes } from '@tiptap/core';
import { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

/*
 * WikiLink Extension
 * Supports [[page name]] wiki-style internal links
 * Used in note-taking apps like Obsidian, Notion, Roam
 */

export interface WikiLinkOptions {
  HTMLAttributes: Record<string, unknown>;
  onWikiLinkClick?: (pageName: string) => void;
  validateLink?: (pageName: string) => boolean;
  linkClass?: string;
  invalidLinkClass?: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    wikiLink: {
      setWikiLink: (attributes: { pageName: string }) => ReturnType;
      unsetWikiLink: () => ReturnType;
    };
  }
}

export const WikiLink = Mark.create<WikiLinkOptions>({
  name: 'wikiLink',

  inclusive: false,

  addOptions() {
    return {
      HTMLAttributes: {},
      onWikiLinkClick: undefined,
      validateLink: undefined,
      linkClass: 'wiki-link',
      invalidLinkClass: 'wiki-link-invalid',
    };
  },

  addAttributes() {
    return {
      pageName: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-page-name'),
        renderHTML: (attributes) => {
          if (!attributes.pageName) {
            return {};
          }
          return {
            'data-page-name': attributes.pageName,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-wiki-link]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const pageName = HTMLAttributes['data-page-name'] || '';
    const isValid = this.options.validateLink ? this.options.validateLink(pageName) : true;
    
    return [
      'span',
      mergeAttributes(
        this.options.HTMLAttributes,
        HTMLAttributes,
        {
          'data-wiki-link': '',
          class: isValid ? this.options.linkClass : `${this.options.linkClass} ${this.options.invalidLinkClass}`,
        }
      ),
      0,
    ];
  },

  addCommands() {
    return {
      setWikiLink:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      unsetWikiLink:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addProseMirrorPlugins() {
    const { onWikiLinkClick } = this.options;

    return [
      // Plugin to handle [[text]] input and convert to wiki links
      new Plugin({
        key: new PluginKey('wikiLinkInput'),
        props: {
          handleTextInput: (view, from, to, text) => {
            try {
              // Check if we're completing a wiki link with ]]
              if (text === ']') {
                const { state } = view;
                const { doc } = state;
                if (from < 0 || from > doc.content.size) return false;
                
                const textBefore = doc.textBetween(Math.max(0, from - 100), from, '\n');
              
              // Check for pattern [[something]
              const match = textBefore.match(/\[\[([^\[\]]+)\]$/);
              if (match) {
                const pageName = match[1];
                const startPos = from - match[0].length;
                
                // Create the wiki link
                const tr = state.tr;
                tr.delete(startPos, from);
                tr.insertText(pageName, startPos);
                
                // Apply the wiki link mark
                const wikiLinkMark = state.schema.marks.wikiLink.create({ pageName });
                tr.addMark(startPos, startPos + pageName.length, wikiLinkMark);
                
                // Move cursor after the link
                const endPos = startPos + pageName.length;
                tr.setSelection(TextSelection.create(tr.doc, endPos));
                
                view.dispatch(tr);
                return true;
              }
              }
              return false;
            } catch (error) {
              console.warn('WikiLink: Error handling text input', error);
              return false;
            }
          },
        },
      }),
      // Plugin to handle clicks on wiki links
      new Plugin({
        key: new PluginKey('wikiLinkClick'),
        props: {
          handleClick: (view, pos, event) => {
            try {
              const { state } = view;
              const { doc } = state;
              if (pos < 0 || pos > doc.content.size) return false;
              
              const $pos = doc.resolve(pos);
              
              // Check if clicked on a wiki link
              const marks = $pos.marks();
              const wikiLinkMark = marks.find((m) => m.type.name === 'wikiLink');
              
              if (wikiLinkMark && onWikiLinkClick) {
                const pageName = wikiLinkMark.attrs.pageName;
                if (pageName) {
                  event.preventDefault();
                  onWikiLinkClick(pageName);
                  return true;
                }
              }
              return false;
            } catch (error) {
              console.warn('WikiLink: Error handling click', error);
              return false;
            }
          },
        },
      }),
    ];
  },
});

export default WikiLink;
