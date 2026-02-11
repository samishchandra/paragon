import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { undo } from '@tiptap/pm/history';

/*
 * SelectAllOccurrences Extension
 * 
 * Provides "Select All Occurrences" functionality similar to VS Code's Cmd+Shift+L,
 * plus "Select Next Occurrence" (Cmd+D) for incremental selection.
 * When activated, all matching text ranges are highlighted and any formatting
 * operation (bold, italic, etc.) is applied to ALL matches in a single transaction.
 * 
 * Features:
 * - Visual highlighting via ProseMirror decorations
 * - Cmd+D incremental selection (add next occurrence one at a time)
 * - Cmd+Shift+L select all occurrences at once
 * - Batch mark toggle (bold, italic, underline, strikethrough)
 * - Batch delete
 * - Batch replace-with-typed-text (intercepts keystrokes to replace all occurrences)
 * - Regex-based matching support
 * - Floating action bar integration via storage state
 * - Proper undo/redo: each keystroke is one undo step, Cmd+Z reverts and re-enters mode
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
  /** All matches in the document (for incremental Cmd+D) */
  allMatches: OccurrenceRange[];
  /** Index into allMatches for the next Cmd+D selection */
  nextMatchIndex: number;
  /** Whether we're in incremental (Cmd+D) mode vs select-all mode */
  isIncremental: boolean;
  /** Stack of previous typed buffers for undo tracking */
  undoStack: string[];
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
  _storage: SelectAllOccurrencesStorage,
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

/**
 * Helper: find the closest match to the current cursor position.
 * Returns the index of the match that is at or after the cursor.
 */
function findClosestMatchIndex(
  matches: OccurrenceRange[],
  cursorPos: number,
): number {
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].from >= cursorPos) return i;
  }
  // Wrap around to the first match
  return 0;
}

/**
 * Helper: deactivate select all mode and clear storage.
 */
function deactivateMode(storage: SelectAllOccurrencesStorage) {
  storage.isActive = false;
  storage.ranges = [];
  storage.searchTerm = '';
  storage.typedBuffer = '';
  storage.isTypingReplace = false;
  storage.allMatches = [];
  storage.nextMatchIndex = 0;
  storage.isIncremental = false;
  storage.undoStack = [];
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
      allMatches: [],
      nextMatchIndex: 0,
      isIncremental: false,
      undoStack: [],
    };
  },

  addCommands() {
    return {
      /**
       * Activate "Select All Occurrences" mode — highlights ALL matches at once.
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
        this.storage.allMatches = ranges;
        this.storage.nextMatchIndex = ranges.length; // All selected
        this.storage.isIncremental = false;
        this.storage.undoStack = [];

        if (dispatch) {
          dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { activate: true }));
        }

        return true;
      },

      /**
       * Select the next occurrence incrementally (Cmd+D behavior).
       * First call: selects the word under cursor or current selection.
       * Subsequent calls: add the next match to the selection.
       */
      selectNextOccurrence: () => ({ editor, tr, dispatch }) => {
        const storage = this.storage;

        if (!storage.isActive) {
          // First invocation: determine search term from selection or word under cursor
          const { state } = editor;
          const { from, to } = state.selection;
          let searchTerm = '';

          if (from !== to) {
            // Use current text selection
            searchTerm = state.doc.textBetween(from, to, '');
          } else {
            // Select the word under cursor
            const $pos = state.doc.resolve(from);
            const textNode = $pos.parent;
            if (textNode.isTextblock) {
              const textContent = textNode.textContent;
              const offset = $pos.parentOffset;
              // Find word boundaries
              let start = offset;
              let end = offset;
              while (start > 0 && /\w/.test(textContent[start - 1])) start--;
              while (end < textContent.length && /\w/.test(textContent[end])) end++;
              if (start < end) {
                searchTerm = textContent.slice(start, end);
              }
            }
          }

          if (!searchTerm) return false;

          // Find all matches
          const allMatches = findAllMatches(state.doc, searchTerm, false, false, false);
          if (allMatches.length === 0) return false;

          // Find the match closest to cursor to start from
          const startIndex = findClosestMatchIndex(allMatches, from);
          const firstMatch = allMatches[startIndex];

          // Activate incremental mode with just the first match
          storage.isActive = true;
          storage.ranges = [firstMatch];
          storage.searchTerm = searchTerm;
          storage.caseSensitive = false;
          storage.useRegex = false;
          storage.wholeWord = false;
          storage.typedBuffer = '';
          storage.isTypingReplace = false;
          storage.originalTermLength = searchTerm.length;
          storage.allMatches = allMatches;
          storage.nextMatchIndex = (startIndex + 1) % allMatches.length;
          storage.isIncremental = true;
          storage.undoStack = [];

          if (dispatch) {
            dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { activate: true }));
          }

          // Scroll to the first match
          setTimeout(() => {
            try {
              const domAtPos = editor.view.domAtPos(firstMatch.from);
              if (domAtPos.node) {
                const element = domAtPos.node.parentElement;
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            } catch { /* ignore */ }
          }, 20);

          return true;
        }

        // Already active in incremental mode: add the next match
        if (storage.isIncremental && storage.allMatches.length > 0) {
          const nextIndex = storage.nextMatchIndex;
          const nextMatch = storage.allMatches[nextIndex];

          // Check if this match is already in our ranges
          const alreadySelected = storage.ranges.some(
            r => r.from === nextMatch.from && r.to === nextMatch.to
          );

          if (alreadySelected) {
            // All matches already selected
            return false;
          }

          // Add the next match
          storage.ranges = [...storage.ranges, nextMatch];
          storage.nextMatchIndex = (nextIndex + 1) % storage.allMatches.length;

          // Check if we've now selected all matches
          if (storage.ranges.length >= storage.allMatches.length) {
            storage.isIncremental = false; // Now in full select-all mode
          }

          if (dispatch) {
            dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { activate: true }));
          }

          // Scroll to the newly added match
          setTimeout(() => {
            try {
              const domAtPos = editor.view.domAtPos(nextMatch.from);
              if (domAtPos.node) {
                const element = domAtPos.node.parentElement;
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            } catch { /* ignore */ }
          }, 20);

          return true;
        }

        return false;
      },

      /**
       * Deactivate "Select All Occurrences" mode and clear highlights.
       */
      clearAllOccurrences: () => ({ tr, dispatch }) => {
        deactivateMode(this.storage);

        if (dispatch) {
          dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
        }

        return true;
      },

      /**
       * Apply a mark (bold, italic, etc.) to all selected occurrences in one transaction.
       * All changes are in a single transaction for proper undo/redo.
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
          // All mark changes go into a single transaction for atomic undo
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
                deactivateMode(this.storage);
              }
            }
          } catch { /* ignore */ }
        }, 10);

        return true;
      },

      /**
       * Delete all selected occurrences in a single transaction.
       */
      deleteAllOccurrences: () => ({ editor, tr, dispatch }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return false;

        if (dispatch) {
          // Sort in reverse order and delete in a single transaction
          const sortedRanges = [...this.storage.ranges].sort((a, b) => b.from - a.from);
          for (const range of sortedRanges) {
            tr.delete(range.from, range.to);
          }
          dispatch(tr);
        }

        deactivateMode(this.storage);

        return true;
      },

      /**
       * Replace all selected occurrences with new text in a single transaction.
       */
      replaceAllOccurrences: (newText: string) => ({ editor, tr, dispatch }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return false;

        if (dispatch) {
          // Sort in reverse order and replace in a single transaction
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
                  deactivateMode(this.storage);
                }
              }
            } catch { /* ignore */ }
          }, 10);
        } else {
          deactivateMode(this.storage);
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

  addKeyboardShortcuts() {
    return {
      // Cmd+D / Ctrl+D: select next occurrence incrementally
      'Mod-d': () => {
        return this.editor.commands.selectNextOccurrence();
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
              deactivateMode(storage);

              const { tr } = view.state;
              view.dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
            }

            return false;
          },

          /**
           * Intercept keystrokes when Select All mode is active.
           * - Escape: exit mode
           * - Backspace: delete one char from typed buffer, or delete all occurrences if buffer empty
           * - Cmd+Z / Ctrl+Z: undo the last batch replacement step
           * - Formatting shortcuts (Cmd+B, Cmd+I, etc.): let them through for batch formatting
           */
          handleKeyDown(view, event) {
            if (!storage.isActive) return false;

            // Escape: exit mode
            if (event.key === 'Escape') {
              deactivateMode(storage);

              const { tr } = view.state;
              view.dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
              return true;
            }

            // Cmd+Z / Ctrl+Z: undo within Select All mode
            if ((event.metaKey || event.ctrlKey) && event.key === 'z' && !event.shiftKey) {
              event.preventDefault();

              if (storage.isTypingReplace && storage.undoStack.length > 0) {
                // Pop the previous buffer state from the undo stack
                const previousBuffer = storage.undoStack.pop()!;

                // Update storage BEFORE calling undo so the action bar reads
                // the correct state when the undo transaction triggers a re-render
                storage.typedBuffer = previousBuffer;
                if (previousBuffer === '') {
                  storage.isTypingReplace = false;
                }

                // Use ProseMirror's undo to revert the last transaction
                undo(view.state, view.dispatch);

                // Rebuild ranges from the (now reverted) decorations
                setTimeout(() => {
                  const newRanges = rebuildRangesFromDecorations(view, storage);
                  storage.ranges = newRanges;
                  if (newRanges.length === 0) {
                    deactivateMode(storage);
                  }
                }, 10);

                return true;
              }

              // If not in typing replace mode, or undo stack is empty,
              // exit select-all mode and let ProseMirror handle undo normally
              deactivateMode(storage);
              const { tr } = view.state;
              view.dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
              return false; // Let default undo proceed
            }

            // Cmd+Shift+Z / Ctrl+Y: redo — let it through
            if ((event.metaKey || event.ctrlKey) && ((event.key === 'z' && event.shiftKey) || event.key === 'y')) {
              return false;
            }

            // Let formatting shortcuts through (Cmd+B, Cmd+I, Cmd+U, Cmd+Shift+X)
            // Also let Cmd+D through for incremental selection
            if (event.metaKey || event.ctrlKey) {
              return false;
            }

            // Backspace handling
            if (event.key === 'Backspace') {
              event.preventDefault();

              if (storage.isTypingReplace && storage.typedBuffer.length > 0) {
                // Push current buffer to undo stack before modifying
                storage.undoStack.push(storage.typedBuffer);

                // Remove last char from typed buffer
                storage.typedBuffer = storage.typedBuffer.slice(0, -1);

                // Get current positions from decorations
                const currentRanges = rebuildRangesFromDecorations(view, storage);
                if (currentRanges.length === 0) {
                  deactivateMode(storage);
                  const { tr } = view.state;
                  view.dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
                  return true;
                }

                const newText = storage.typedBuffer.length > 0
                  ? storage.typedBuffer
                  : storage.searchTerm; // Restore original if buffer empty

                // Replace all at current decoration positions in a single transaction
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
                    deactivateMode(storage);
                  }
                }, 10);

              } else if (!storage.isTypingReplace) {
                // Not in typing mode — delete all occurrences in a single transaction
                const sortedRanges = [...storage.ranges].sort((a, b) => b.from - a.from);
                const { tr } = view.state;
                for (const range of sortedRanges) {
                  tr.delete(range.from, range.to);
                }
                view.dispatch(tr);

                deactivateMode(storage);

                const { tr: clearTr } = view.state;
                view.dispatch(clearTr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
              }

              return true;
            }

            // Delete key: delete all occurrences in a single transaction
            if (event.key === 'Delete') {
              event.preventDefault();

              const sortedRanges = [...storage.ranges].sort((a, b) => b.from - a.from);
              const { tr } = view.state;
              for (const range of sortedRanges) {
                tr.delete(range.from, range.to);
              }
              view.dispatch(tr);

              deactivateMode(storage);

              const { tr: clearTr } = view.state;
              view.dispatch(clearTr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
              return true;
            }

            // Arrow keys, Tab, etc. — exit mode
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Home', 'End'].includes(event.key)) {
              deactivateMode(storage);

              const { tr } = view.state;
              view.dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
              return false; // Let the key event propagate for cursor movement
            }

            // Enter: exit mode and insert newline normally
            if (event.key === 'Enter') {
              deactivateMode(storage);

              const { tr } = view.state;
              view.dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
              return false;
            }

            return false;
          },

          /**
           * Intercept text input (typed characters) for batch replacement.
           * 
           * Each keystroke creates a single transaction that replaces all occurrences,
           * making each step individually undoable via Cmd+Z.
           * 
           * KEY FIX: Instead of re-searching the document after replacement (which
           * would find false matches), we rely on ProseMirror's decoration mapping
           * to track where the replaced text lives.
           */
          handleTextInput(view, _from, _to, text) {
            if (!storage.isActive) return false;
            if (!text) return false;

            // Get current positions from decorations (these are always accurate
            // because ProseMirror maps them through transactions)
            const currentRanges = rebuildRangesFromDecorations(view, storage);
            if (currentRanges.length === 0) {
              deactivateMode(storage);
              const { tr } = view.state;
              view.dispatch(tr.setMeta(selectAllOccurrencesPluginKey, { deactivate: true }));
              return true;
            }

            // Push current buffer state to undo stack before modifying
            storage.undoStack.push(storage.isTypingReplace ? storage.typedBuffer : '');

            // Accumulate typed text
            if (!storage.isTypingReplace) {
              storage.isTypingReplace = true;
              storage.typedBuffer = text;
            } else {
              storage.typedBuffer += text;
            }

            // Replace all occurrences at their current decoration positions
            // with the accumulated buffer in a SINGLE transaction (atomic undo).
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
                deactivateMode(storage);
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
      selectNextOccurrence: () => ReturnType;
      clearAllOccurrences: () => ReturnType;
      toggleMarkOnAllOccurrences: (markName: string) => ReturnType;
      deleteAllOccurrences: () => ReturnType;
      replaceAllOccurrences: (newText: string) => ReturnType;
      getOccurrencesState: () => ReturnType;
    };
  }
}
