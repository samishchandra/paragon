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
  /** The original search term length, used for position tracking */
  originalTermLength: number;
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
 * Helper: rebuild ranges after a batch replacement by reading the actual
 * text at tracked positions. We use the decoration positions (which are
 * automatically mapped by ProseMirror) to know where the replaced text is.
 */
function rebuildRangesFromDecorations(
  view: any,
  storage: SelectAllOccurrencesStorage,
): OccurrenceRange[] {
  const pluginState = selectAllOccurrencesPluginKey.getState(view.state);
  if (!pluginState) return [];

  const ranges: OccurrenceRange[] = [];
  pluginState.find().forEach((deco: any) => {
    const text = view.state.doc.textBetween(deco.from, deco.to, '');
    ranges.push({ from: deco.from, to: deco.to, text });
  });
  return ranges;
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
      originalTermLength: 0,
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
        this.storage.originalTermLength = searchTerm.length;

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

        // Refresh ranges after document change — use decoration mapping
        setTimeout(() => {
          try {
            const view = (editor as any).view;
            if (view) {
              const newRanges = rebuildRangesFromDecorations(view, this.storage);
              this.storage.ranges = newRanges;
              if (newRanges.length === 0) {
                this.storage.isActive = false;
                this.storage.isTypingReplace = false;
                this.storage.typedBuffer = '';
              }
            }
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
          // Refresh via decoration mapping
          setTimeout(() => {
            try {
              const view = (editor as any).view;
              if (view) {
                const newRanges = rebuildRangesFromDecorations(view, this.storage);
                this.storage.ranges = newRanges;
                this.storage.searchTerm = newText;
                if (newRanges.length === 0) {
                  this.storage.isActive = false;
                }
              }
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

            // When the doc changes (e.g., from batch replace), map decorations
            // to their new positions. This is the key to tracking ranges correctly.
            if (tr.docChanged) {
              const mapped = oldDecorations.map(tr.mapping, newState.doc);
              return mapped;
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
                // Remove last char from typed buffer
                storage.typedBuffer = storage.typedBuffer.slice(0, -1);

                // Get current positions from decorations
                const currentRanges = rebuildRangesFromDecorations(view, storage);
                if (currentRanges.length === 0) {
                  storage.isActive = false;
                  storage.isTypingReplace = false;
                  const { tr } = view.state;
                  view.dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
                  return true;
                }

                const newText = storage.typedBuffer.length > 0
                  ? storage.typedBuffer
                  : storage.searchTerm; // Restore original if buffer empty

                // Replace all at current decoration positions
                const sortedRanges = [...currentRanges].sort((a, b) => b.from - a.from);
                const { tr } = view.state;
                for (const range of sortedRanges) {
                  tr.replaceWith(range.from, range.to, view.state.schema.text(newText));
                }
                view.dispatch(tr);

                if (storage.typedBuffer.length === 0) {
                  storage.isTypingReplace = false;
                }

                // Rebuild ranges from mapped decorations
                setTimeout(() => {
                  const newRanges = rebuildRangesFromDecorations(view, storage);
                  storage.ranges = newRanges;
                  if (newRanges.length === 0) {
                    storage.isActive = false;
                    storage.isTypingReplace = false;
                  }
                }, 10);

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
           * 
           * KEY FIX: Instead of re-searching the document after replacement (which
           * would find false matches), we rely on ProseMirror's decoration mapping
           * to track where the replaced text lives. After replacing text at all
           * decoration positions, the decorations automatically map to the new
           * positions in the next transaction.
           */
          handleTextInput(view, _from, _to, text) {
            if (!storage.isActive) return false;
            if (!text) return false;

            // Get current positions from decorations (these are always accurate
            // because ProseMirror maps them through transactions)
            const currentRanges = rebuildRangesFromDecorations(view, storage);
            if (currentRanges.length === 0) {
              storage.isActive = false;
              storage.isTypingReplace = false;
              storage.typedBuffer = '';
              const { tr } = view.state;
              view.dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
              return true;
            }

            // Accumulate typed text
            if (!storage.isTypingReplace) {
              storage.isTypingReplace = true;
              storage.typedBuffer = text;
            } else {
              storage.typedBuffer += text;
            }

            // Replace all occurrences at their current decoration positions
            // with the accumulated buffer. Sort in reverse to preserve positions.
            const sortedRanges = [...currentRanges].sort((a, b) => b.from - a.from);
            const { tr } = view.state;
            for (const range of sortedRanges) {
              tr.replaceWith(range.from, range.to, view.state.schema.text(storage.typedBuffer));
            }
            view.dispatch(tr);

            // After the transaction, decorations are automatically mapped.
            // Rebuild storage.ranges from the mapped decorations.
            setTimeout(() => {
              const newRanges = rebuildRangesFromDecorations(view, storage);
              storage.ranges = newRanges;
              if (newRanges.length === 0) {
                storage.isActive = false;
                storage.isTypingReplace = false;
                storage.typedBuffer = '';
              }
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
