import { Mark, mergeAttributes } from '@tiptap/core';
import { InputRule } from '@tiptap/core';

/*
 * WikiLink Extension (Mobile-Safe Version)
 * Supports [[page name]] wiki-style internal links
 * Uses InputRules instead of handleTextInput for better mobile compatibility
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

// Regex to match [[page name]] pattern
const wikiLinkRegex = /\[\[([^\[\]]+)\]\]$/;

export const WikiLinkSafe = Mark.create<WikiLinkOptions>({
  name: 'wikiLink',

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

  addInputRules() {
    const markType = this.type;
    
    return [
      new InputRule({
        find: wikiLinkRegex,
        handler: ({ state, range, match }) => {
          try {
            const pageName = match[1];
            if (!pageName) return;

            const { tr } = state;
            const start = range.from;
            const end = range.to;
            
            // Delete the [[pageName]] text and insert just the page name with the mark
            tr.delete(start, end);
            
            // Create the marked content
            const mark = markType.create({ pageName });
            const textNode = state.schema.text(pageName, [mark]);
            tr.insert(start, textNode);
            
            // Dispatch the transaction
            this.editor.view.dispatch(tr);
          } catch (error) {
            console.warn('WikiLinkSafe: Error in input rule', error);
          }
        },
      }),
    ];
  },

  // Handle clicks on wiki links using native event delegation
  onCreate() {
    const { onWikiLinkClick } = this.options;
    if (!onWikiLinkClick) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.hasAttribute('data-wiki-link')) {
        const pageName = target.getAttribute('data-page-name');
        if (pageName) {
          event.preventDefault();
          onWikiLinkClick(pageName);
        }
      }
    };

    // Use event delegation on the editor element
    this.editor.view.dom.addEventListener('click', handleClick);
    
    // Store cleanup function
    (this as any)._clickHandler = handleClick;
  },

  onDestroy() {
    const handleClick = (this as any)._clickHandler;
    if (handleClick) {
      this.editor.view.dom.removeEventListener('click', handleClick);
    }
  },
});

export default WikiLinkSafe;
