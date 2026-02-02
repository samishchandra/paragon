import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

/*
 * LinkValidation Extension
 * Validates URLs and shows visual feedback for invalid/broken links
 * Adds red border styling to invalid links
 */

export interface LinkValidationOptions {
  // Custom URL validator function
  validateUrl?: (url: string) => boolean | Promise<boolean>;
  // Class to apply to invalid links
  invalidLinkClass?: string;
  // Whether to validate on every change (can be expensive)
  validateOnChange?: boolean;
}

// Basic URL validation regex
const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
const EMAIL_REGEX = /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i;

// Default URL validator
const defaultValidateUrl = (url: string): boolean => {
  if (!url || url.trim() === '') return false;
  
  // Allow mailto links
  if (EMAIL_REGEX.test(url)) return true;
  
  // Allow relative URLs starting with / or #
  if (url.startsWith('/') || url.startsWith('#')) return true;
  
  // Check for valid URL format
  try {
    // Try to construct URL - if it fails, it's invalid
    if (url.startsWith('http://') || url.startsWith('https://')) {
      new URL(url);
      return true;
    }
    // For URLs without protocol, add https and try
    new URL('https://' + url);
    return URL_REGEX.test(url) || URL_REGEX.test('https://' + url);
  } catch {
    return false;
  }
};

export const LinkValidation = Extension.create<LinkValidationOptions>({
  name: 'linkValidation',

  addOptions() {
    return {
      validateUrl: defaultValidateUrl,
      invalidLinkClass: 'link-invalid',
      validateOnChange: true,
    };
  },

  addProseMirrorPlugins() {
    const { validateUrl, invalidLinkClass, validateOnChange } = this.options;
    const validator = validateUrl || defaultValidateUrl;

    return [
      new Plugin({
        key: new PluginKey('linkValidation'),
        props: {
          decorations: (state) => {
            if (!validateOnChange) return DecorationSet.empty;

            const { doc } = state;
            const decorations: Decoration[] = [];

            doc.descendants((node, pos) => {
              if (node.isText) {
                // Check for link marks
                const linkMark = node.marks.find((m) => m.type.name === 'link');
                if (linkMark) {
                  const href = linkMark.attrs.href;
                  const isValid = validator(href);

                  if (!isValid) {
                    // Add decoration for invalid link
                    decorations.push(
                      Decoration.inline(pos, pos + node.nodeSize, {
                        class: invalidLinkClass,
                      })
                    );
                  }
                }
              }
              return true;
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});

export default LinkValidation;
