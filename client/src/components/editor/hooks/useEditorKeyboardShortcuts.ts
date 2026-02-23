/**
 * useEditorKeyboardShortcuts — Handles keyboard shortcuts for the editor.
 *
 * Extracted from MarkdownEditor.tsx to reduce component size.
 * Handles:
 *   - Cmd/Ctrl+K for link popover
 *   - Cmd/Ctrl+F for find/replace
 *   - Cmd/Ctrl+H for find/replace with replace panel
 *   - Space-triggered markdown shortcuts (headings, lists, task lists,
 *     blockquotes, code blocks, horizontal rules)
 */
import { useEffect } from 'react';
import type { Editor } from '@tiptap/react';
import { insertHorizontalRuleClean } from '../utils';

export interface KeyboardShortcutCallbacks {
  /** Open the link popover */
  openLinkPopover: () => void;
  /** Open find/replace panel */
  openFindReplace: (initialQuery?: string) => void;
  /** Open find/replace with replace visible */
  openFindReplaceWithReplace: () => void;
}

/**
 * Attach keyboard shortcut listeners for the editor.
 *
 * @param editor       The TipTap editor instance (or null while mounting)
 * @param isMobile     Whether the device is mobile (disables Cmd+F/H)
 * @param callbacks    UI callbacks for link popover and find/replace
 */
export function useEditorKeyboardShortcuts(
  editor: Editor | null,
  isMobile: boolean,
  callbacks: KeyboardShortcutCallbacks,
) {
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if editor is destroyed
      if (editor.isDestroyed) return;

      // PERFORMANCE: Early return for keys we don't handle.
      // This avoids extracting text/selection state on every keystroke.
      const key = event.key;
      const hasModifier = event.metaKey || event.ctrlKey;
      if (!hasModifier && key !== ' ') {
        // We only handle modifier combos (Cmd+K, Cmd+F, Cmd+H) and space shortcuts
        return;
      }

      // Cmd/Ctrl+K for link popover
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        callbacks.openLinkPopover();
        return;
      }

      // Cmd/Ctrl+F for find/replace (desktop only)
      if (!isMobile && (event.metaKey || event.ctrlKey) && event.key === 'f') {
        event.preventDefault();
        // Extract selected text to auto-fill the search input
        const { state } = editor;
        const { from, to } = state.selection;
        if (from !== to) {
          const selectedText = state.doc.textBetween(from, to, ' ');
          if (selectedText.trim()) {
            callbacks.openFindReplace(selectedText.trim());
            return;
          }
        }
        callbacks.openFindReplace();
        return;
      }

      // Cmd/Ctrl+H for find/replace with replace panel open (desktop only)
      if (!isMobile && (event.metaKey || event.ctrlKey) && event.key === 'h') {
        event.preventDefault();
        callbacks.openFindReplaceWithReplace();
        return;
      }

      // Auto-detect markdown shortcuts on space
      if (event.key === ' ') {
        try {
          const { state } = editor;
          const { selection } = state;
          const { $from } = selection;
          const textBefore = $from.nodeBefore?.textContent || '';

          // Heading shortcuts (check longest first to avoid partial matches)
          if (textBefore === '#####') {
            event.preventDefault();
            editor.chain().focus().deleteRange({ from: $from.pos - 5, to: $from.pos }).setHeading({ level: 5 }).run();
            return;
          }
          if (textBefore === '####') {
            event.preventDefault();
            editor.chain().focus().deleteRange({ from: $from.pos - 4, to: $from.pos }).setHeading({ level: 4 }).run();
            return;
          }
          if (textBefore === '###') {
            event.preventDefault();
            editor.chain().focus().deleteRange({ from: $from.pos - 3, to: $from.pos }).setHeading({ level: 3 }).run();
            return;
          }
          if (textBefore === '##') {
            event.preventDefault();
            editor.chain().focus().deleteRange({ from: $from.pos - 2, to: $from.pos }).setHeading({ level: 2 }).run();
            return;
          }
          if (textBefore === '#') {
            event.preventDefault();
            editor.chain().focus().deleteRange({ from: $from.pos - 1, to: $from.pos }).setHeading({ level: 1 }).run();
            return;
          }

          // List shortcuts
          if (textBefore === '-' || textBefore === '*') {
            event.preventDefault();
            editor.chain().focus().deleteRange({ from: $from.pos - 1, to: $from.pos }).toggleBulletList().run();
            return;
          }

          // Ordered list
          if (/^\d+\.$/.test(textBefore)) {
            event.preventDefault();
            editor.chain().focus().deleteRange({ from: $from.pos - textBefore.length, to: $from.pos }).toggleOrderedList().run();
            return;
          }

          // Task list shortcut
          // Supports: [], [ ], [x], -[], -[ ], -[x], - [], - [ ], - [x]
          // Uses direct ProseMirror transaction for checked state support,
          // with toggleTaskList() as fallback (now fixed to use single transaction)
          const taskMatch = /^(-\s*)?\[([ x])?\]$/.exec(textBefore);
          if (taskMatch) {
            event.preventDefault();
            const checked = taskMatch[2] === 'x';
            const taskListType = state.schema.nodes.taskList;
            const taskItemType = state.schema.nodes.taskItem;
            if (taskListType && taskItemType) {
              const tr = state.tr;
              const deleteFrom = $from.pos - textBefore.length;
              const deleteTo = $from.pos;
              tr.delete(deleteFrom, deleteTo);
              const $start = tr.doc.resolve(deleteFrom);
              const blockRange = $start.blockRange();
              if (blockRange) {
                const wrapping = [
                  { type: taskListType, attrs: {} },
                  { type: taskItemType, attrs: { checked } },
                ];
                tr.wrap(blockRange, wrapping);
                editor.view.dispatch(tr);
                return;
              }
            }
            // Fallback to toggleTaskList (single-transaction implementation)
            editor.chain().focus().deleteRange({ from: $from.pos - textBefore.length, to: $from.pos }).toggleTaskList().run();
            return;
          }

          // Blockquote
          if (textBefore === '>') {
            event.preventDefault();
            editor.chain().focus().deleteRange({ from: $from.pos - 1, to: $from.pos }).toggleBlockquote().run();
            return;
          }

          // Code block
          if (textBefore === '```') {
            event.preventDefault();
            editor.chain().focus().deleteRange({ from: $from.pos - 3, to: $from.pos }).toggleCodeBlock().run();
            return;
          }

          // Horizontal rule - use custom insertion to avoid extra empty paragraph
          // Typography extension converts dashes: '---' may become '\u2014-' (em dash + dash)
          // or '\u2014' (single em dash) depending on input timing
          if (textBefore === '---' || textBefore === '***') {
            event.preventDefault();
            insertHorizontalRuleClean(editor, $from.pos - 3, $from.pos);
            return;
          }
          if (textBefore === '\u2014-') {
            event.preventDefault();
            insertHorizontalRuleClean(editor, $from.pos - 2, $from.pos);
            return;
          }
          if (textBefore === '\u2014') {
            // Typography converted all 3 dashes to single em dash
            event.preventDefault();
            insertHorizontalRuleClean(editor, $from.pos - 1, $from.pos);
            return;
          }
        } catch (error) {
          console.warn('Space shortcut error:', error);
        }
      }
    };

    // Use capture: true to intercept Tab key before browser default behavior
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [editor, isMobile, callbacks]);
}
