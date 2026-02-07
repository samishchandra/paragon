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
 * Features:
 * - Visual highlighting via ProseMirror decorations
 * - Batch mark toggle (bold, italic, underline, strikethrough)
 * - Batch delete
 * - Batch replace-with-typed-text (intercepts keystrokes to replace all occurrences)
 * - Regex-based matching support
 * - Floating action bar integration via storage state
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
  useRegex: boolean;
  wholeWord: boolean;
  /** Tracks accumulated typed text for batch replace preview */
  typedBuffer: string;
  /** Whether we are in "typing replacement" mode */
  isTypingReplace: boolean;
}

const selectAllOccurrencesPluginKey = new PluginKey('selectAllOccurrences');

/**
 * Helper: find all matches of a search term in the document.
 */
function findAllMatches(
  doc: any,
  searchTerm: string,
  caseSensitive: boolean,
  useRegex: boolean,
  wholeWord: boolean,
): OccurrenceRange[] {
  const ranges: OccurrenceRange[] = [];
  if (!searchTerm) return ranges;

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
    return ranges;
  }

  doc.descendants((node: any, pos: number) => {
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

  return ranges;
}

/**
 * Helper: refresh ranges in storage and update decorations.
 */
function refreshRangesAndDecorations(
  editor: any,
  storage: SelectAllOccurrencesStorage,
  newSearchTerm?: string,
) {
  const term = newSearchTerm ?? storage.searchTerm;
  const newRanges = findAllMatches(
    editor.state.doc,
    term,
    storage.caseSensitive,
    storage.useRegex,
    storage.wholeWord,
  );
  storage.ranges = newRanges;
  if (newSearchTerm !== undefined) {
    storage.searchTerm = term;
  }
  if (newRanges.length === 0) {
    storage.isActive = false;
    storage.isTypingReplace = false;
    storage.typedBuffer = '';
  }
  const { tr } = editor.state;
  editor.view.dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { refresh: true }));
}

export const SelectAllOccurrences = Extension.create<{}, SelectAllOccurrencesStorage>({
  name: 'selectAllOccurrences',

  addStorage() {
    return {
      isActive: false,
      ranges: [],
      searchTerm: '',
      caseSensitive: false,
      useRegex: false,
      wholeWord: false,
      typedBuffer: '',
      isTypingReplace: false,
    };
  },

  addCommands() {
    return {
      /**
       * Activate "Select All Occurrences" mode.
       */
      selectAllOccurrences: (options: {
        searchTerm: string;
        caseSensitive?: boolean;
        useRegex?: boolean;
        wholeWord?: boolean;
      }) => ({ editor, tr, dispatch }) => {
        const {
          searchTerm,
          caseSensitive = false,
          useRegex = false,
          wholeWord = false,
        } = options;

        if (!searchTerm) return false;

        const ranges = findAllMatches(editor.state.doc, searchTerm, caseSensitive, useRegex, wholeWord);
        if (ranges.length === 0) return false;

        // Store state
        this.storage.isActive = true;
        this.storage.ranges = ranges;
        this.storage.searchTerm = searchTerm;
        this.storage.caseSensitive = caseSensitive;
        this.storage.useRegex = useRegex;
        this.storage.wholeWord = wholeWord;
        this.storage.typedBuffer = '';
        this.storage.isTypingReplace = false;

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
        this.storage.typedBuffer = '';
        this.storage.isTypingReplace = false;

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
        setTimeout(() => {
          try {
            refreshRangesAndDecorations(editor, this.storage);
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
          const sortedRanges = [...this.storage.ranges].sort((a, b) => b.from - a.from);
          for (const range of sortedRanges) {
            tr.delete(range.from, range.to);
          }
          dispatch(tr);
        }

        this.storage.isActive = false;
        this.storage.ranges = [];
        this.storage.typedBuffer = '';
        this.storage.isTypingReplace = false;

        return true;
      },

      /**
       * Replace all selected occurrences with new text.
       */
      replaceAllOccurrences: (newText: string) => ({ editor, tr, dispatch }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return false;

        if (dispatch) {
          const sortedRanges = [...this.storage.ranges].sort((a, b) => b.from - a.from);
          for (const range of sortedRanges) {
            tr.replaceWith(range.from, range.to, editor.schema.text(newText));
          }
          dispatch(tr);
        }

        if (newText) {
          setTimeout(() => {
            try {
              refreshRangesAndDecorations(editor, this.storage, newText);
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

            if (meta?.deactivate || !storage.isActive) {
              return DecorationSet.empty;
            }

            if (meta?.activate || meta?.refresh) {
              const decorations: Decoration[] = storage.ranges.map(range => {
                return Decoration.inline(range.from, range.to, {
                  class: 'select-all-occurrence-highlight',
                  'data-occurrence': 'true',
                });
              });
              return DecorationSet.create(newState.doc, decorations);
            }

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

            const isInsideRange = storage.ranges.some(
              range => pos >= range.from && pos <= range.to
            );

            if (!isInsideRange) {
              storage.isActive = false;
              storage.ranges = [];
              storage.searchTerm = '';
              storage.typedBuffer = '';
              storage.isTypingReplace = false;

              const { tr } = view.state;
              view.dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
            }

            return false;
          },

          /**
           * Intercept keystrokes when Select All mode is active.
           * - Escape: exit mode
           * - Backspace: delete one char from typed buffer, or delete all occurrences if buffer empty
           * - Printable characters: start batch replace mode, accumulate typed text
           * - Formatting shortcuts (Cmd+B, Cmd+I, etc.): let them through for batch formatting
           */
          handleKeyDown(view, event) {
            if (!storage.isActive) return false;

            // Escape: exit mode
            if (event.key === 'Escape') {
              storage.isActive = false;
              storage.ranges = [];
              storage.searchTerm = '';
              storage.typedBuffer = '';
              storage.isTypingReplace = false;

              const { tr } = view.state;
              view.dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
              return true;
            }

            // Let formatting shortcuts through (Cmd+B, Cmd+I, Cmd+U, Cmd+Shift+X)
            if (event.metaKey || event.ctrlKey) {
              return false;
            }

            // Backspace handling
            if (event.key === 'Backspace') {
              event.preventDefault();

              if (storage.isTypingReplace && storage.typedBuffer.length > 0) {
                // Remove last char from typed buffer and replace all occurrences
                storage.typedBuffer = storage.typedBuffer.slice(0, -1);

                if (storage.typedBuffer.length === 0) {
                  // Buffer is empty — restore original search term in all positions
                  // We need to replace current content with original search term
                  const sortedRanges = [...storage.ranges].sort((a, b) => b.from - a.from);
                  const { tr } = view.state;
                  const originalText = storage.searchTerm;
                  for (const range of sortedRanges) {
                    tr.replaceWith(range.from, range.to, view.state.schema.text(originalText));
                  }
                  view.dispatch(tr);
                  storage.isTypingReplace = false;

                  // Refresh ranges
                  setTimeout(() => {
                    const newRanges = findAllMatches(
                      view.state.doc,
                      storage.searchTerm,
                      storage.caseSensitive,
                      storage.useRegex,
                      storage.wholeWord,
                    );
                    storage.ranges = newRanges;
                    if (newRanges.length === 0) {
                      storage.isActive = false;
                    }
                    const { tr: rTr } = view.state;
                    view.dispatch(rTr.setMeta(selectAllOccurrencesPluginKey, { refresh: true }));
                  }, 10);
                } else {
                  // Replace all occurrences with the shorter buffer
                  const sortedRanges = [...storage.ranges].sort((a, b) => b.from - a.from);
                  const { tr } = view.state;
                  for (const range of sortedRanges) {
                    tr.replaceWith(range.from, range.to, view.state.schema.text(storage.typedBuffer));
                  }
                  view.dispatch(tr);

                  // Refresh ranges with new text
                  setTimeout(() => {
                    const escaped = storage.typedBuffer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const pattern = new RegExp(escaped, storage.caseSensitive ? 'g' : 'gi');
                    const newRanges: OccurrenceRange[] = [];
                    view.state.doc.descendants((node: any, pos: number) => {
                      if (node.isText && node.text) {
                        let m;
                        while ((m = pattern.exec(node.text)) !== null) {
                          newRanges.push({ from: pos + m.index, to: pos + m.index + m[0].length, text: m[0] });
                        }
                      }
                      return true;
                    });
                    storage.ranges = newRanges;
                    if (newRanges.length === 0) {
                      storage.isActive = false;
                      storage.isTypingReplace = false;
                    }
                    const { tr: rTr } = view.state;
                    view.dispatch(rTr.setMeta(selectAllOccurrencesPluginKey, { refresh: true }));
                  }, 10);
                }
              } else if (!storage.isTypingReplace) {
                // Not in typing mode — delete all occurrences
                const sortedRanges = [...storage.ranges].sort((a, b) => b.from - a.from);
                const { tr } = view.state;
                for (const range of sortedRanges) {
                  tr.delete(range.from, range.to);
                }
                view.dispatch(tr);

                storage.isActive = false;
                storage.ranges = [];
                storage.typedBuffer = '';
                storage.isTypingReplace = false;

                const { tr: clearTr } = view.state;
                view.dispatch(clearTr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
              }

              return true;
            }

            // Delete key: delete all occurrences
            if (event.key === 'Delete') {
              event.preventDefault();

              const sortedRanges = [...storage.ranges].sort((a, b) => b.from - a.from);
              const { tr } = view.state;
              for (const range of sortedRanges) {
                tr.delete(range.from, range.to);
              }
              view.dispatch(tr);

              storage.isActive = false;
              storage.ranges = [];
              storage.typedBuffer = '';
              storage.isTypingReplace = false;

              const { tr: clearTr } = view.state;
              view.dispatch(clearTr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
              return true;
            }

            // Arrow keys, Tab, etc. — exit mode
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Home', 'End'].includes(event.key)) {
              storage.isActive = false;
              storage.ranges = [];
              storage.searchTerm = '';
              storage.typedBuffer = '';
              storage.isTypingReplace = false;

              const { tr } = view.state;
              view.dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
              return false; // Let the key event propagate for cursor movement
            }

            // Enter: exit mode and insert newline normally
            if (event.key === 'Enter') {
              storage.isActive = false;
              storage.ranges = [];
              storage.searchTerm = '';
              storage.typedBuffer = '';
              storage.isTypingReplace = false;

              const { tr } = view.state;
              view.dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
              return false;
            }

            return false;
          },

          /**
           * Intercept text input (typed characters) for batch replacement.
           * This fires for printable characters and handles the actual text insertion.
           */
          handleTextInput(view, _from, _to, text) {
            if (!storage.isActive) return false;
            if (!text) return false;

            // First character typed: replace all occurrences with this character
            if (!storage.isTypingReplace) {
              storage.isTypingReplace = true;
              storage.typedBuffer = text;
            } else {
              storage.typedBuffer += text;
            }

            // Replace all occurrences with the accumulated buffer
            const sortedRanges = [...storage.ranges].sort((a, b) => b.from - a.from);
            const { tr } = view.state;
            for (const range of sortedRanges) {
              tr.replaceWith(range.from, range.to, view.state.schema.text(storage.typedBuffer));
            }
            view.dispatch(tr);

            // Refresh ranges with the new text
            setTimeout(() => {
              const escaped = storage.typedBuffer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              const pattern = new RegExp(escaped, storage.caseSensitive ? 'g' : 'gi');
              const newRanges: OccurrenceRange[] = [];
              view.state.doc.descendants((node: any, pos: number) => {
                if (node.isText && node.text) {
                  let m;
                  while ((m = pattern.exec(node.text)) !== null) {
                    newRanges.push({ from: pos + m.index, to: pos + m.index + m[0].length, text: m[0] });
                  }
                }
                return true;
              });
              storage.ranges = newRanges;
              if (newRanges.length === 0) {
                storage.isActive = false;
                storage.isTypingReplace = false;
              }
              const { tr: rTr } = view.state;
              view.dispatch(rTr.setMeta(selectAllOccurrencesPluginKey, { refresh: true }));
            }, 10);

            return true; // Prevent default text insertion
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
