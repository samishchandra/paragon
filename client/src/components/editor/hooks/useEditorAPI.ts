/**
 * useEditorAPI — Exposes the imperative API for the MarkdownEditor ref.
 *
 * Extracted from MarkdownEditor.tsx to reduce component size.
 * Wraps `useImperativeHandle` so the parent component just calls
 * `useEditorAPI(ref, deps)` instead of inlining ~130 lines.
 */
import { useImperativeHandle, type Ref } from 'react';
import type { Editor } from '@tiptap/core';
// Re-use the shared TurndownLike interface (accepts both TurndownService
// and the LazyTurndownService wrapper from useTurndownService).
import type { TurndownLike } from './useHandleModeSwitch';
import type { MarkdownEditorRef } from '../MarkdownEditor';
import { insertHorizontalRuleClean } from '../utils/insertHorizontalRule';
import { stripZWSP } from '../utils/stripZWSP';
import { transformCalloutsToHeadings } from '../utils/transformCalloutsToHeadings';
import { showCopyToast } from '../utils/showCopyToast';
import { DOMSerializer } from '@tiptap/pm/model';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UseEditorAPIDeps {
  editor: Editor | null;
  turndownService: TurndownLike;
  editorModeRef: React.MutableRefObject<'wysiwyg' | 'markdown'>;
  handleModeSwitch: (mode: 'wysiwyg' | 'markdown') => void;
  wordCount: { words: number; characters: number; charactersWithSpaces: number };
  autoSaveState: { save: () => void; clear: () => void };
  setIsFindReplaceOpen: (open: boolean) => void;
  setFindReplaceFocusTrigger: React.Dispatch<React.SetStateAction<number>>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useEditorAPI(
  ref: Ref<MarkdownEditorRef>,
  {
    editor,
    turndownService,
    editorModeRef,
    handleModeSwitch,
    wordCount,
    autoSaveState,
    setIsFindReplaceOpen,
    setFindReplaceFocusTrigger,
  }: UseEditorAPIDeps,
) {
  useImperativeHandle(ref, () => ({
    getEditor: () => editor,
    getHTML: () => editor?.getHTML() || '',
    getMarkdown: () => {
      if (!editor) return '';
      return stripZWSP(turndownService.turndown(editor.getHTML()));
    },
    getText: () => editor?.getText() || '',
    setContent: (content: string) => {
      if (editor && !editor.isDestroyed) {
        queueMicrotask(() => {
          editor.commands.setContent(content);
        });
      }
    },
    clearContent: () => {
      if (editor && !editor.isDestroyed) {
        editor.commands.clearContent();
      }
    },
    focus: (position) => {
      if (editor && !editor.isDestroyed) {
        editor.commands.focus(position);
      }
    },
    blur: () => {
      if (editor && !editor.isDestroyed) {
        editor.commands.blur();
      }
    },
    isEmpty: () => editor?.isEmpty || true,
    isFocused: () => editor?.isFocused || false,
    getMode: () => editorModeRef.current,
    setMode: (mode) => handleModeSwitch(mode),
    toggleMode: () => {
      const newMode = editorModeRef.current === 'wysiwyg' ? 'markdown' : 'wysiwyg';
      handleModeSwitch(newMode);
      return newMode;
    },
    getWordCount: () => ({
      words: wordCount.words,
      characters: wordCount.characters,
      charactersWithSpaces: wordCount.charactersWithSpaces,
    }),
    undo: () => editor?.commands.undo(),
    redo: () => editor?.commands.redo(),
    canUndo: () => editor?.can().undo() || false,
    canRedo: () => editor?.can().redo() || false,
    insertContent: (content) => editor?.commands.insertContent(content),
    insertImage: (src, alt = '') => editor?.commands.setImage({ src, alt }),
    insertTable: (rows = 3, cols = 3) => editor?.commands.insertTable({ rows, cols, withHeaderRow: true }),
    insertCodeBlock: (language) => {
      if (language) {
        editor?.commands.setCodeBlock({ language });
      } else {
        editor?.commands.setCodeBlock();
      }
    },
    insertCallout: (type = 'info') => editor?.commands.insertCallout?.({ type: type as 'info' | 'note' | 'prompt' | 'resources' | 'todo' }),
    insertHorizontalRule: () => {
      if (editor) insertHorizontalRuleClean(editor, editor.state.selection.from, editor.state.selection.from);
    },
    toggleBold: () => editor?.commands.toggleBold(),
    toggleItalic: () => editor?.commands.toggleItalic(),
    toggleUnderline: () => editor?.commands.toggleUnderline(),
    toggleStrike: () => editor?.commands.toggleStrike(),
    toggleCode: () => editor?.commands.toggleCode(),
    toggleHighlight: () => editor?.commands.toggleHighlight(),
    setHeading: (level) => {
      if (level === 0) {
        editor?.commands.setParagraph();
      } else {
        editor?.commands.setHeading({ level });
      }
    },
    toggleBulletList: () => editor?.commands.toggleBulletList(),
    toggleOrderedList: () => editor?.commands.toggleOrderedList(),
    toggleTaskList: () => editor?.commands.toggleTaskList(),
    toggleBlockquote: () => editor?.commands.toggleBlockquote(),
    setLink: (url) => editor?.commands.setLink({ href: url }),
    unsetLink: () => editor?.commands.unsetLink(),
    openFindReplace: () => {
      setIsFindReplaceOpen(true);
      setFindReplaceFocusTrigger(prev => prev + 1);
    },
    closeFindReplace: () => setIsFindReplaceOpen(false),
    save: () => autoSaveState.save(),
    clearSavedContent: () => autoSaveState.clear(),
    getSelectedText: () => {
      if (!editor) return '';
      const { from, to } = editor.state.selection;
      return editor.state.doc.textBetween(from, to, ' ');
    },
    isEditable: () => editor?.isEditable || false,
    setEditable: (editable) => editor?.setEditable(editable),
    /** Get the table of contents headings */
    getTableOfContents: () => {
      if (!editor) return [];
      const headings: { id: string; text: string; level: number; pos: number }[] = [];
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'heading') {
          const level = node.attrs.level as number;
          const text = node.textContent.trim();
          if (text) {
            headings.push({ id: `toc-heading-${pos}`, text, level, pos });
          }
        }
      });
      return headings;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (pos: number) => {
      if (!editor || editor.isDestroyed) return;
      try {
        const resolvedPos = editor.state.doc.resolve(pos);
        const dom = editor.view.nodeDOM(resolvedPos.before(resolvedPos.depth + 1));
        if (dom instanceof HTMLElement) {
          const scrollContainer = editor.view.dom.closest('.editor-content-wrapper') as HTMLElement;
          if (scrollContainer) {
            const containerRect = scrollContainer.getBoundingClientRect();
            const elementRect = dom.getBoundingClientRect();
            const relativeTop = elementRect.top - containerRect.top + scrollContainer.scrollTop;
            scrollContainer.scrollTo({ top: relativeTop - 20, behavior: 'smooth' });
          } else {
            dom.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        editor.commands.setTextSelection(pos + 1);
      } catch { /* position might be invalid */ }
    },
    copyAsMarkdown: async () => {
      if (!editor) return '';
      const { from, to, empty } = editor.state.selection;
      let html: string;
      let fallbackText: string;
      if (empty) {
        html = editor.getHTML();
        fallbackText = editor.getText();
      } else {
        const slice = editor.state.doc.slice(from, to);
        const serializer = DOMSerializer.fromSchema(editor.schema);
        const div = document.createElement('div');
        const domFragment = serializer.serializeFragment(slice.content);
        div.appendChild(domFragment);
        html = div.innerHTML;
        fallbackText = editor.state.doc.textBetween(from, to, '\n');
      }
      let md = stripZWSP(turndownService.turndown(html));
      if (empty) md = transformCalloutsToHeadings(md);
      try {
        await navigator.clipboard.writeText(md);
        showCopyToast(empty ? 'Document copied as Markdown' : 'Selection copied as Markdown');
      } catch {
        try {
          await navigator.clipboard.writeText(fallbackText);
          showCopyToast(empty ? 'Document copied' : 'Selection copied');
        } catch { /* clipboard write failed */ }
      }
      return md;
    },
    getMarkdownForExport: () => {
      if (!editor) return '';
      const md = stripZWSP(turndownService.turndown(editor.getHTML()));
      return transformCalloutsToHeadings(md);
    },
  }), [editor, turndownService, handleModeSwitch, wordCount, autoSaveState, setIsFindReplaceOpen]);
}
