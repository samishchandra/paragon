import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

/*
 * DESIGN: Dark Mode Craftsman
 * Search highlight extension to show all matches in the document
 * Uses decorations to highlight matches without modifying content
 */

export interface SearchHighlightOptions {
  searchTerm: string;
  caseSensitive: boolean;
  useRegex: boolean;
  currentMatchIndex: number;
}

export interface SearchHighlightStorage {
  searchTerm: string;
  caseSensitive: boolean;
  useRegex: boolean;
  currentMatchIndex: number;
}

const searchHighlightPluginKey = new PluginKey('searchHighlight');

export const SearchHighlight = Extension.create<SearchHighlightOptions, SearchHighlightStorage>({
  name: 'searchHighlight',

  addOptions() {
    return {
      searchTerm: '',
      caseSensitive: false,
      useRegex: false,
      currentMatchIndex: 0,
    };
  },

  addStorage() {
    return {
      searchTerm: '',
      caseSensitive: false,
      useRegex: false,
      currentMatchIndex: 0,
    };
  },

  addCommands() {
    return {
      setSearchHighlight: (options: Partial<SearchHighlightOptions>) => ({ editor, tr, dispatch }) => {
        this.storage.searchTerm = options.searchTerm ?? this.storage.searchTerm;
        this.storage.caseSensitive = options.caseSensitive ?? this.storage.caseSensitive;
        this.storage.useRegex = options.useRegex ?? this.storage.useRegex;
        this.storage.currentMatchIndex = options.currentMatchIndex ?? this.storage.currentMatchIndex;
        
        // Use setMeta to trigger plugin state update without modifying document
        if (dispatch) {
          dispatch(tr.setMeta(searchHighlightPluginKey, { update: true }));
        }
        return true;
      },
      clearSearchHighlight: () => ({ editor, tr, dispatch }) => {
        this.storage.searchTerm = '';
        this.storage.caseSensitive = false;
        this.storage.useRegex = false;
        this.storage.currentMatchIndex = 0;
        
        // Use setMeta to trigger plugin state update without modifying document
        if (dispatch) {
          dispatch(tr.setMeta(searchHighlightPluginKey, { update: true }));
        }
        return true;
      },
    };
  },

  addProseMirrorPlugins() {
    const storage = this.storage;

    return [
      new Plugin({
        key: searchHighlightPluginKey,
        state: {
          init() {
            return DecorationSet.empty;
          },
          apply(tr, oldDecorations, oldState, newState) {
            const { searchTerm, caseSensitive, useRegex, currentMatchIndex } = storage;

            // Check if we need to update (either document changed or meta was set)
            const meta = tr.getMeta(searchHighlightPluginKey);
            const docChanged = tr.docChanged;
            
            // If no search term, return empty
            if (!searchTerm) {
              return DecorationSet.empty;
            }

            // If document didn't change and no meta update, map old decorations
            if (!docChanged && !meta) {
              return oldDecorations.map(tr.mapping, newState.doc);
            }

            const decorations: Decoration[] = [];
            let matchIndex = 0;

            try {
              let searchPattern: RegExp;
              if (useRegex) {
                searchPattern = new RegExp(searchTerm, caseSensitive ? 'g' : 'gi');
              } else {
                const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                searchPattern = new RegExp(escaped, caseSensitive ? 'g' : 'gi');
              }

              newState.doc.descendants((node, pos) => {
                if (node.isText && node.text) {
                  let match;
                  while ((match = searchPattern.exec(node.text)) !== null) {
                    const from = pos + match.index;
                    const to = pos + match.index + match[0].length;
                    
                    // Check if this is the current match
                    const isCurrentMatch = matchIndex === currentMatchIndex;
                    
                    decorations.push(
                      Decoration.inline(from, to, {
                        class: isCurrentMatch ? 'search-highlight-current' : 'search-highlight',
                      })
                    );
                    
                    matchIndex++;
                  }
                }
                return true;
              });
            } catch {
              // Invalid regex, return empty decorations
              return DecorationSet.empty;
            }

            return DecorationSet.create(newState.doc, decorations);
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

// Extend TipTap commands type
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    searchHighlight: {
      setSearchHighlight: (options: Partial<SearchHighlightOptions>) => ReturnType;
      clearSearchHighlight: () => ReturnType;
    };
  }
}
