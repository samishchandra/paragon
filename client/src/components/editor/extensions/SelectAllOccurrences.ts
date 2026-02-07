import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

/*
 * SelectAllOccurrences Extension
 * 
 * Provides "Select All Occurrences" functionality similar to VS Code's Cmd+Shift+L.
 * When activated, all matching text ranges are highlighted and any formatting
 * operation (bold, italic, etc.) is applied to ALL matches in a single transaction.
 * 
 * Architecture:
 * - Uses ProseMirror decorations for visual highlighting (not native selection)
 * - Stores matched ranges in plugin storage
 * - Intercepts mark toggle commands to apply across all ranges
 * - Supports batch delete and batch text replacement
 */

export interface OccurrenceRange {
  from: number;
  to: number;
  text: string;
}

export interface SelectAllOccurrencesStorage {
  isActive: boolean;
  ranges: OccurrenceRange[];
  searchTerm: string;
  caseSensitive: boolean;
}

const selectAllOccurrencesPluginKey = new PluginKey('selectAllOccurrences');

export const SelectAllOccurrences = Extension.create<{}, SelectAllOccurrencesStorage>({
  name: 'selectAllOccurrences',

  addStorage() {
    return {
      isActive: false,
      ranges: [],
      searchTerm: '',
      caseSensitive: false,
    };
  },

  addCommands() {
    return {
      /**
       * Activate "Select All Occurrences" mode.
       * Finds all matches of the given search term and highlights them.
       */
      selectAllOccurrences: (options: {
        searchTerm: string;
        caseSensitive?: boolean;
        useRegex?: boolean;
        wholeWord?: boolean;
      }) => ({ editor, tr, dispatch }) => {
        const { searchTerm, caseSensitive = false, useRegex = false, wholeWord = false } = options;
        
        if (!searchTerm) return false;

        // Build search pattern
        let searchPattern: RegExp;
        try {
          if (useRegex) {
            searchPattern = new RegExp(searchTerm, caseSensitive ? 'g' : 'gi');
          } else {
            let escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            if (wholeWord) {
              escaped = `\\b${escaped}\\b`;
            }
            searchPattern = new RegExp(escaped, caseSensitive ? 'g' : 'gi');
          }
        } catch {
          return false;
        }

        // Find all matches
        const ranges: OccurrenceRange[] = [];
        editor.state.doc.descendants((node, pos) => {
          if (node.isText && node.text) {
            let match;
            while ((match = searchPattern.exec(node.text)) !== null) {
              ranges.push({
                from: pos + match.index,
                to: pos + match.index + match[0].length,
                text: match[0],
              });
            }
          }
          return true;
        });

        if (ranges.length === 0) return false;

        // Store state
        this.storage.isActive = true;
        this.storage.ranges = ranges;
        this.storage.searchTerm = searchTerm;
        this.storage.caseSensitive = caseSensitive;

        // Trigger decoration update
        if (dispatch) {
          dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { activate: true }));
        }

        return true;
      },

      /**
       * Deactivate "Select All Occurrences" mode and clear highlights.
       */
      clearAllOccurrences: () => ({ tr, dispatch }) => {
        this.storage.isActive = false;
        this.storage.ranges = [];
        this.storage.searchTerm = '';

        if (dispatch) {
          dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
        }

        return true;
      },

      /**
       * Apply a mark (bold, italic, etc.) to all selected occurrences in one transaction.
       */
      toggleMarkOnAllOccurrences: (markName: string) => ({ editor, tr, dispatch }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return false;

        const markType = editor.schema.marks[markName];
        if (!markType) return false;

        const { ranges } = this.storage;

        // Check if ALL ranges already have this mark
        const allHaveMark = ranges.every(range => {
          let hasMark = true;
          editor.state.doc.nodesBetween(range.from, range.to, (node) => {
            if (node.isText && !markType.isInSet(node.marks)) {
              hasMark = false;
            }
          });
          return hasMark;
        });

        if (dispatch) {
          // Apply or remove mark on all ranges in a single transaction
          for (const range of ranges) {
            if (allHaveMark) {
              tr.removeMark(range.from, range.to, markType);
            } else {
              tr.addMark(range.from, range.to, markType.create());
            }
          }
          dispatch(tr);
        }

        // Refresh ranges after document change
        const storageRef1 = this.storage;
        const searchTerm1 = storageRef1.searchTerm;
        const caseSensitive1 = storageRef1.caseSensitive;
        setTimeout(() => {
          try {
            const escaped = searchTerm1.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const pattern = new RegExp(escaped, caseSensitive1 ? 'g' : 'gi');
            const newRanges: OccurrenceRange[] = [];
            editor.state.doc.descendants((node: any, pos: number) => {
              if (node.isText && node.text) {
                let m;
                while ((m = pattern.exec(node.text)) !== null) {
                  newRanges.push({ from: pos + m.index, to: pos + m.index + m[0].length, text: m[0] });
                }
              }
              return true;
            });
            storageRef1.ranges = newRanges;
            if (newRanges.length === 0) storageRef1.isActive = false;
            const { tr: refreshTr } = editor.state;
            editor.view.dispatch(refreshTr.setMeta(selectAllOccurrencesPluginKey, { refresh: true }));
          } catch { /* ignore */ }
        }, 10);

        return true;
      },

      /**
       * Delete all selected occurrences.
       */
      deleteAllOccurrences: () => ({ editor, tr, dispatch }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return false;

        if (dispatch) {
          // Delete in reverse order to preserve positions
          const sortedRanges = [...this.storage.ranges].sort((a, b) => b.from - a.from);
          for (const range of sortedRanges) {
            tr.delete(range.from, range.to);
          }
          dispatch(tr);
        }

        // Clear the mode after deletion
        this.storage.isActive = false;
        this.storage.ranges = [];

        return true;
      },

      /**
       * Replace all selected occurrences with new text.
       */
      replaceAllOccurrences: (newText: string) => ({ editor, tr, dispatch }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return false;

        if (dispatch) {
          // Replace in reverse order to preserve positions
          const sortedRanges = [...this.storage.ranges].sort((a, b) => b.from - a.from);
          for (const range of sortedRanges) {
            tr.replaceWith(range.from, range.to, editor.schema.text(newText));
          }
          dispatch(tr);
        }

        // Refresh ranges after document change
        if (newText) {
          const storageRef2 = this.storage;
          const searchTerm2 = newText;
          setTimeout(() => {
            try {
              const escaped = searchTerm2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              const pattern = new RegExp(escaped, 'gi');
              const newRanges: OccurrenceRange[] = [];
              editor.state.doc.descendants((node: any, pos: number) => {
                if (node.isText && node.text) {
                  let m;
                  while ((m = pattern.exec(node.text)) !== null) {
                    newRanges.push({ from: pos + m.index, to: pos + m.index + m[0].length, text: m[0] });
                  }
                }
                return true;
              });
              storageRef2.ranges = newRanges;
              storageRef2.searchTerm = newText;
              if (newRanges.length === 0) storageRef2.isActive = false;
              const { tr: refreshTr } = editor.state;
              editor.view.dispatch(refreshTr.setMeta(selectAllOccurrencesPluginKey, { refresh: true }));
            } catch { /* ignore */ }
          }, 10);
        } else {
          this.storage.isActive = false;
          this.storage.ranges = [];
        }

        return true;
      },

      /**
       * Get the current state of Select All Occurrences mode.
       * Note: Returns true as command success; access storage directly for state.
       */
      getOccurrencesState: () => () => {
        return true;
      },
    };
  },

  addProseMirrorPlugins() {
    const storage = this.storage;

    return [
      new Plugin({
        key: selectAllOccurrencesPluginKey,
        state: {
          init() {
            return DecorationSet.empty;
          },
          apply(tr, oldDecorations, _oldState, newState) {
            const meta = tr.getMeta(selectAllOccurrencesPluginKey);

            // Deactivate — clear all decorations
            if (meta?.deactivate || !storage.isActive) {
              return DecorationSet.empty;
            }

            // Activate or refresh — rebuild decorations from stored ranges
            if (meta?.activate || meta?.refresh) {
              const decorations: Decoration[] = storage.ranges.map(range => {
                return Decoration.inline(range.from, range.to, {
                  class: 'select-all-occurrence-highlight',
                  'data-occurrence': 'true',
                });
              });
              return DecorationSet.create(newState.doc, decorations);
            }

            // Document changed — remap decorations
            if (tr.docChanged) {
              return oldDecorations.map(tr.mapping, newState.doc);
            }

            return oldDecorations;
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
          // Clicking outside the highlighted ranges exits the mode
          handleClick(view, pos) {
            if (!storage.isActive) return false;
            
            // Check if click is inside any of the ranges
            const isInsideRange = storage.ranges.some(
              range => pos >= range.from && pos <= range.to
            );
            
            if (!isInsideRange) {
              // Exit select-all-occurrences mode
              storage.isActive = false;
              storage.ranges = [];
              storage.searchTerm = '';
              
              const { tr } = view.state;
              view.dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
            }
            
            return false;
          },
          // Escape key exits the mode
          handleKeyDown(view, event) {
            if (!storage.isActive) return false;
            
            if (event.key === 'Escape') {
              storage.isActive = false;
              storage.ranges = [];
              storage.searchTerm = '';
              
              const { tr } = view.state;
              view.dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
              return true;
            }
            
            return false;
          },
        },
      }),
    ];
  },
});

// Extend TipTap commands type
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    selectAllOccurrences: {
      selectAllOccurrences: (options: {
        searchTerm: string;
        caseSensitive?: boolean;
        useRegex?: boolean;
        wholeWord?: boolean;
      }) => ReturnType;
      clearAllOccurrences: () => ReturnType;
      toggleMarkOnAllOccurrences: (markName: string) => ReturnType;
      deleteAllOccurrences: () => ReturnType;
      replaceAllOccurrences: (newText: string) => ReturnType;
      getOccurrencesState: () => ReturnType;
    };
  }
}
