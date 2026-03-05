/**
 * InputDispatcher Extension
 *
 * PERFORMANCE OPTIMIZATION (R5 + R6 from PERFORMANCE_REPORT.md)
 *
 * Consolidates multiple stateless handleTextInput and handleKeyDown ProseMirror
 * plugin hooks into a single dispatcher plugin. Instead of ProseMirror iterating
 * through N separate plugins via someProp() on every keystroke, this single plugin
 * dispatches to the appropriate handler with early-exit checks.
 *
 * Consolidated handlers:
 *
 * handleTextInput:
 *   1. MixedLists/taskItem — detects [] + space to create task items
 *
 * handleKeyDown:
 *   1. TabIndent — handles Tab/Shift+Tab for list indent/outdent (highest priority)
 *   2. CalloutInputRule — detects ```info + Enter to create callout blocks
 *   3. CodeBlockEnterShortcut — detects ``` + Enter to create code blocks
 *
 * NOT consolidated (stateful, need their own plugin for state management):
 *   - ExpandSelection (manages expansionDepth state)
 *   - SelectAllOccurrences (manages complex batch-replace state machine)
 *
 * NOT consolidated (uses InputRules instead of handleTextInput):
 *   - WikiLinkSafe (mobile-safe InputRules-based implementation)
 */

import { Extension } from '@tiptap/core';
import { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';
import { Fragment } from '@tiptap/pm/model';
import { canJoin } from '@tiptap/pm/transform';
import { liftListItem, sinkListItem } from '@tiptap/pm/schema-list';

export const inputDispatcherPluginKey = new PluginKey('inputDispatcher');

// ─── Callout types (from CalloutInputRule.ts) ──────────────────────────────
const CALLOUT_TYPES = ['info', 'note', 'prompt', 'resources', 'todo'] as const;

// ─── Tab indent helpers (from TabIndent.ts) ────────────────────────────────

/**
 * Find the immediate list item node type at the cursor position.
 * Walks up from the cursor to find the first taskItem or listItem ancestor.
 * Returns the node type name, or null if not in a list.
 */
function getListItemTypeName(state: EditorState): 'taskItem' | 'listItem' | null {
  const { $from } = state.selection;
  for (let depth = $from.depth; depth >= 0; depth--) {
    const node = $from.node(depth);
    if (node.type.name === 'taskItem') return 'taskItem';
    if (node.type.name === 'listItem') return 'listItem';
  }
  return null;
}

/**
 * After a successful sinkListItem, check if the newly created nested list
 * is an orderedList and convert it to a bulletList. This makes indented
 * items inside ordered lists appear as bullets instead of nested numbers.
 *
 * ProseMirror's sinkListItem creates the nested list using `parent.type`,
 * so indenting inside an orderedList creates a nested orderedList. We
 * post-process the transaction to convert it.
 */
function convertNestedOrderedToBullet(
  state: EditorState,
  dispatch: ((tr: Transaction) => void) | undefined,
): boolean {
  const { $from } = state.selection;
  const orderedListType = state.schema.nodes.orderedList;
  const bulletListType = state.schema.nodes.bulletList;

  if (!orderedListType || !bulletListType) return false;

  // Walk up from the cursor to find the immediate parent list.
  // After sinkListItem, the cursor is inside the nested list item,
  // so the nearest list ancestor is the newly created nested list.
  for (let depth = $from.depth; depth >= 0; depth--) {
    const node = $from.node(depth);
    if (node.type === orderedListType) {
      // Check if this orderedList is itself nested inside another list item.
      // If depth > 1, look at the grandparent to see if we're nested.
      if (depth >= 2) {
        const grandparent = $from.node(depth - 1);
        if (
          grandparent.type.name === 'listItem' ||
          grandparent.type.name === 'taskItem'
        ) {
          // This is a nested orderedList inside a list item — convert to bulletList
          if (dispatch) {
            const pos = $from.before(depth);
            const tr = state.tr.setNodeMarkup(pos, bulletListType, node.attrs);
            dispatch(tr);
          }
          return true;
        }
      }
      break;
    }
    // If we hit a bulletList or taskList first, no conversion needed
    if (node.type.name === 'bulletList' || node.type.name === 'taskList') {
      break;
    }
  }

  return false;
}

export const InputDispatcher = Extension.create({
  name: 'inputDispatcher',

  // Higher priority to ensure Tab handling runs before other extensions
  priority: 1000,

  addProseMirrorPlugins() {
    const editor = this.editor;

    return [
      new Plugin({
        key: inputDispatcherPluginKey,
        props: {
          // ─── Consolidated handleTextInput ───────────────────────────
          // Replaces the separate MixedLists/taskItemInputRule plugin.
          // Runs once per character typed instead of through multiple plugins.
          handleTextInput(view: EditorView, from: number, to: number, text: string) {
            // Early exit: only space triggers task item creation
            if (text !== ' ') return false;

            const { state } = view;
            const $from = state.doc.resolve(from);
            const textBefore = $from.parent.textBetween(
              0,
              $from.parentOffset,
              undefined,
              '\ufffc'
            );

            // Match patterns: [] , [ ] , [x] , - [] , - [ ] , - [x]
            const inputRegex = /^\s*(-\s*)?\[([( |x])?\]$/;
            const taskMatch = inputRegex.exec(textBefore);

            if (!taskMatch) return false;

            const taskItemType = state.schema.nodes.taskItem;
            const taskListType = state.schema.nodes.taskList;
            if (!taskItemType || !taskListType) return false;

            const checked = taskMatch[2] === 'x';
            const matchStart = $from.start() + (taskMatch.index || 0);
            const matchEnd = from;

            const tr = state.tr;
            tr.delete(matchStart, matchEnd);

            const $start = tr.doc.resolve(matchStart);
            const blockRange = $start.blockRange();

            if (!blockRange) return false;

            const wrapping = [
              { type: taskListType, attrs: {} },
              { type: taskItemType, attrs: { checked } },
            ];
            tr.wrap(blockRange, wrapping);

            if (matchStart > 1) {
              const before = tr.doc.resolve(matchStart - 1).nodeBefore;
              if (before && before.type === taskListType && canJoin(tr.doc, matchStart - 1)) {
                tr.join(matchStart - 1);
              }
            }

            view.dispatch(tr);
            return true;
          },

          // ─── Consolidated handleKeyDown ─────────────────────────────
          // Replaces TabIndent, CalloutInputRule, and CodeBlockEnterShortcut plugins.
          // Runs once per key press instead of through multiple plugins.
          handleKeyDown(view: EditorView, event: KeyboardEvent) {
            // ── 1. TabIndent: handle Tab/Shift+Tab ─────────────────
            // Highest priority — check first.
            if (event.key === 'Tab') {
              const { state, dispatch } = view;
              const itemTypeName = getListItemTypeName(state);

              if (!itemTypeName) {
                // Not in a list — still prevent default Tab behavior
                event.preventDefault();
                return true;
              }

              event.preventDefault();

              const nodeType = state.schema.nodes[itemTypeName];
              if (!nodeType) return true;

              if (event.shiftKey) {
                // Shift+Tab: lift (outdent)
                const cmd = liftListItem(nodeType);
                const result = cmd(state, dispatch);

                if (!result) {
                  const fallbackName = itemTypeName === 'taskItem' ? 'listItem' : 'taskItem';
                  const fallbackType = state.schema.nodes[fallbackName];
                  if (fallbackType) {
                    liftListItem(fallbackType)(state, dispatch);
                  }
                }
              } else {
                // Tab: sink (indent)
                const cmd = sinkListItem(nodeType);
                const result = cmd(state, dispatch);

                if (result) {
                  // After successful sink, convert nested orderedList to bulletList
                  // Use the updated state from the view (after dispatch)
                  convertNestedOrderedToBullet(view.state, dispatch);
                } else {
                  const fallbackName = itemTypeName === 'taskItem' ? 'listItem' : 'taskItem';
                  const fallbackType = state.schema.nodes[fallbackName];
                  if (fallbackType) {
                    const fallbackResult = sinkListItem(fallbackType)(state, dispatch);
                    if (fallbackResult) {
                      convertNestedOrderedToBullet(view.state, dispatch);
                    }
                  }
                }
              }

              return true;
            }

            // ── Enter-key handlers ─────────────────────────────────
            if (event.key === 'Enter') {
              const { state } = view;
              const { $from } = state.selection;

              // Get the current line text for pattern matching
              const lineStart = $from.start();
              const lineText = state.doc.textBetween(lineStart, $from.pos, '');
              const trimmedLine = lineText.trim();

              // ── 2. CalloutInputRule: detect ```type + Enter ──────
              for (const type of CALLOUT_TYPES) {
                if (trimmedLine === `\`\`\`${type}`) {
                  event.preventDefault();

                  const tr = state.tr;
                  const patternStart = lineStart + lineText.indexOf('```');
                  tr.delete(patternStart, $from.pos);

                  const calloutType = editor.schema.nodes.callout;
                  const paragraphType = editor.schema.nodes.paragraph;

                  if (calloutType && paragraphType) {
                    const paragraph = paragraphType.create();
                    const callout = calloutType.create({ type }, Fragment.from(paragraph));
                    tr.insert(patternStart, callout);

                    const newPos = tr.doc.resolve(patternStart + 2);
                    tr.setSelection(TextSelection.near(newPos));
                    view.dispatch(tr);
                  }

                  return true;
                }
              }

              // ── 3. CodeBlockEnterShortcut: detect ``` + Enter ────
              const { empty } = state.selection;
              if (empty && !$from.parent.type.spec.code) {
                const textBefore = $from.parent.textBetween(
                  0,
                  $from.parentOffset,
                  undefined,
                  '\ufffc'
                );

                const codeMatch = textBefore.match(/^```([a-zA-Z]*)$/);
                if (codeMatch) {
                  event.preventDefault();
                  const language = codeMatch[1] || null;

                  const codeBlockType = state.schema.nodes.codeBlock;
                  const paragraphType = state.schema.nodes.paragraph;

                  if (codeBlockType && paragraphType) {
                    const tr = state.tr;
                    const codeBlock = codeBlockType.create({ language }, undefined);
                    const replaceFrom = $from.before($from.depth);
                    const replaceTo = $from.after($from.depth);

                    const paragraph = paragraphType.create();
                    tr.replaceWith(replaceFrom, replaceTo, [codeBlock, paragraph]);

                    const cursorPos = replaceFrom + 1;
                    tr.setSelection(TextSelection.create(tr.doc, cursorPos));

                    view.dispatch(tr);
                  }

                  return true;
                }
              }
            }

            return false;
          },
        },
      }),
    ];
  },
});

export default InputDispatcher;
