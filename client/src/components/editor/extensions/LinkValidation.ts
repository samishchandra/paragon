import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

/*
 * LinkValidation Extension
 * Validates URLs and shows visual feedback for invalid/broken links
 * Adds red border styling to invalid links
 * 
 * PERFORMANCE: Uses plugin state with incremental decoration mapping.
 * On each transaction, only changed ranges are re-scanned for link marks.
 * Unchanged decorations are mapped through the transaction's mapping to
 * their new positions. This avoids O(n) full-document traversal on every
 * keystroke or cursor movement.
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

const linkValidationPluginKey = new PluginKey('linkValidation');

/** Build decorations for invalid links within a specific range */
function buildDecorationsInRange(
  doc: any,
  from: number,
  to: number,
  validator: (url: string) => boolean,
  invalidLinkClass: string
): Decoration[] {
  const decorations: Decoration[] = [];
  
  doc.nodesBetween(from, to, (node: any, pos: number) => {
    if (node.isText) {
      const linkMark = node.marks.find((m: any) => m.type.name === 'link');
      if (linkMark) {
        const href = linkMark.attrs.href;
        const isValid = validator(href);
        
        if (!isValid) {
          const decorFrom = pos;
          const decorTo = pos + node.nodeSize;
          // Only include decorations that overlap with the requested range
          if (decorTo >= from && decorFrom <= to) {
            decorations.push(
              Decoration.inline(decorFrom, decorTo, {
                class: invalidLinkClass,
              })
            );
          }
        }
      }
    }
    return true;
  });
  
  return decorations;
}

/** Build decorations for the entire document (used on init) */
function buildAllDecorations(
  doc: any,
  validator: (url: string) => boolean,
  invalidLinkClass: string
): DecorationSet {
  const decorations = buildDecorationsInRange(doc, 0, doc.content.size, validator, invalidLinkClass);
  return DecorationSet.create(doc, decorations);
}

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
    const validator = (url: string): boolean => {
      const result = (validateUrl || defaultValidateUrl)(url);
      // Only support synchronous validation in the decoration plugin
      return typeof result === 'boolean' ? result : true;
    };
    const linkClass = invalidLinkClass || 'link-invalid';

    return [
      new Plugin({
        key: linkValidationPluginKey,
        state: {
          init(_, { doc }) {
            if (!validateOnChange) return DecorationSet.empty;
            return buildAllDecorations(doc, validator, linkClass);
          },
          apply(tr, oldDecorations) {
            if (!validateOnChange) return DecorationSet.empty;
            
            if (!tr.docChanged) {
              return oldDecorations;
            }
            
            // Map existing decorations through the transaction
            let decorations = oldDecorations.map(tr.mapping, tr.doc);
            
            // Collect changed ranges
            const changedRanges: Array<{ from: number; to: number }> = [];
            tr.mapping.maps.forEach((stepMap) => {
              stepMap.forEach((_oldStart: number, _oldEnd: number, newStart: number, newEnd: number) => {
                const from = Math.max(0, newStart);
                const to = Math.min(tr.doc.content.size, newEnd);
                changedRanges.push({ from, to });
              });
            });
            
            if (changedRanges.length === 0) {
              return decorations;
            }
            
            // Merge overlapping ranges
            changedRanges.sort((a, b) => a.from - b.from);
            const merged: Array<{ from: number; to: number }> = [changedRanges[0]];
            for (let i = 1; i < changedRanges.length; i++) {
              const last = merged[merged.length - 1];
              if (changedRanges[i].from <= last.to) {
                last.to = Math.max(last.to, changedRanges[i].to);
              } else {
                merged.push(changedRanges[i]);
              }
            }
            
            // For each changed range: remove old decorations, add new ones
            for (const range of merged) {
              decorations = decorations.remove(
                decorations.find(range.from, range.to)
              );
              
              const newDecorations = buildDecorationsInRange(
                tr.doc, range.from, range.to, validator, linkClass
              );
              if (newDecorations.length > 0) {
                decorations = decorations.add(tr.doc, newDecorations);
              }
            }
            
            return decorations;
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      }),
    ];
  },
});

export default LinkValidation;
