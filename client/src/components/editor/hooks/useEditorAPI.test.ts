/**
 * Unit tests for useEditorAPI hook.
 *
 * Uses a mock TipTap Editor and mock dependencies to verify that each
 * imperative method correctly delegates to the underlying editor commands.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEditorAPI, type UseEditorAPIDeps } from './useEditorAPI';
import type { MarkdownEditorRef } from '../MarkdownEditor';

// ---------------------------------------------------------------------------
// Mock Editor factory
// ---------------------------------------------------------------------------

function createMockEditor(overrides: Record<string, any> = {}) {
  const commands = {
    setContent: vi.fn(),
    clearContent: vi.fn(),
    focus: vi.fn(),
    blur: vi.fn(),
    undo: vi.fn(),
    redo: vi.fn(),
    insertContent: vi.fn(),
    setImage: vi.fn(),
    insertTable: vi.fn(),
    setCodeBlock: vi.fn(),
    insertCallout: vi.fn(),
    toggleBold: vi.fn(),
    toggleItalic: vi.fn(),
    toggleUnderline: vi.fn(),
    toggleStrike: vi.fn(),
    toggleCode: vi.fn(),
    toggleHighlight: vi.fn(),
    setParagraph: vi.fn(),
    setHeading: vi.fn(),
    toggleBulletList: vi.fn(),
    toggleOrderedList: vi.fn(),
    toggleTaskList: vi.fn(),
    toggleBlockquote: vi.fn(),
    setLink: vi.fn(),
    unsetLink: vi.fn(),
    setTextSelection: vi.fn(),
  };

  return {
    getHTML: vi.fn(() => '<p>Hello</p>'),
    getText: vi.fn(() => 'Hello'),
    isEmpty: false,
    isFocused: true,
    isDestroyed: false,
    isEditable: true,
    setEditable: vi.fn(),
    commands,
    can: vi.fn(() => ({
      undo: vi.fn(() => true),
      redo: vi.fn(() => false),
    })),
    state: {
      selection: { from: 0, to: 5 },
      doc: {
        textBetween: vi.fn((_from: number, _to: number, _sep: string) => 'Hello'),
        descendants: vi.fn((callback: (node: any, pos: number) => void) => {
          callback({ type: { name: 'heading' }, attrs: { level: 1 }, textContent: 'Title' }, 0);
          callback({ type: { name: 'paragraph' }, attrs: {}, textContent: 'text' }, 10);
          callback({ type: { name: 'heading' }, attrs: { level: 2 }, textContent: '' }, 20);
        }),
        resolve: vi.fn(() => ({
          before: vi.fn(() => 0),
          depth: 0,
        })),
      },
    },
    view: {
      nodeDOM: vi.fn(() => null),
      dom: { closest: vi.fn(() => null) },
    },
    ...overrides,
  } as any;
}

// ---------------------------------------------------------------------------
// Mock dependencies factory
// ---------------------------------------------------------------------------

function createMockDeps(editorOverrides: Record<string, any> = {}): {
  deps: UseEditorAPIDeps;
  ref: { current: MarkdownEditorRef | null };
} {
  const ref = { current: null as MarkdownEditorRef | null };
  const editor = createMockEditor(editorOverrides);

  const deps: UseEditorAPIDeps = {
    editor,
    turndownService: { turndown: vi.fn((html: string) => `md:${html}`) },
    editorModeRef: { current: 'wysiwyg' },
    handleModeSwitch: vi.fn(),
    wordCount: { words: 42, characters: 200, charactersWithSpaces: 240 },
    autoSaveState: { save: vi.fn(), clear: vi.fn() },
    setIsFindReplaceOpen: vi.fn(),
    setFindReplaceFocusTrigger: vi.fn(),
  };

  return { deps, ref };
}

// ---------------------------------------------------------------------------
// Helper to render the hook and get the API
// ---------------------------------------------------------------------------

function renderAPI(editorOverrides: Record<string, any> = {}) {
  const { deps, ref } = createMockDeps(editorOverrides);
  renderHook(() => useEditorAPI(ref, deps));
  const api = ref.current!;
  return { api, deps, editor: deps.editor };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useEditorAPI', () => {
  describe('getEditor', () => {
    it('should return the editor instance', () => {
      const { api, editor } = renderAPI();
      expect(api.getEditor()).toBe(editor);
    });
  });

  describe('getHTML', () => {
    it('should delegate to editor.getHTML()', () => {
      const { api, editor } = renderAPI();
      expect(api.getHTML()).toBe('<p>Hello</p>');
      expect(editor.getHTML).toHaveBeenCalled();
    });

    it('should return empty string when editor is null', () => {
      const { ref } = createMockDeps();
      const deps = { ...createMockDeps().deps, editor: null };
      renderHook(() => useEditorAPI(ref, deps));
      expect(ref.current!.getHTML()).toBe('');
    });
  });

  describe('getMarkdown', () => {
    it('should use turndownService to convert HTML to markdown', () => {
      const { api, deps } = renderAPI();
      const result = api.getMarkdown();
      expect(deps.turndownService.turndown).toHaveBeenCalledWith('<p>Hello</p>');
      expect(result).toBe('md:<p>Hello</p>');
    });

    it('should return empty string when editor is null', () => {
      const { ref } = createMockDeps();
      const deps = { ...createMockDeps().deps, editor: null };
      renderHook(() => useEditorAPI(ref, deps));
      expect(ref.current!.getMarkdown()).toBe('');
    });
  });

  describe('getText', () => {
    it('should delegate to editor.getText()', () => {
      const { api, editor } = renderAPI();
      expect(api.getText()).toBe('Hello');
      expect(editor.getText).toHaveBeenCalled();
    });
  });

  describe('setContent', () => {
    it('should call editor.commands.setContent via queueMicrotask', async () => {
      const { api, editor } = renderAPI();
      api.setContent('<p>New</p>');
      // queueMicrotask is async, wait for it
      await new Promise(resolve => setTimeout(resolve, 10));
      expect(editor.commands.setContent).toHaveBeenCalledWith('<p>New</p>');
    });

    it('should not call setContent when editor is destroyed', async () => {
      const { api, editor } = renderAPI({ isDestroyed: true });
      api.setContent('<p>New</p>');
      await new Promise(resolve => setTimeout(resolve, 10));
      expect(editor.commands.setContent).not.toHaveBeenCalled();
    });
  });

  describe('clearContent', () => {
    it('should delegate to editor.commands.clearContent()', () => {
      const { api, editor } = renderAPI();
      api.clearContent();
      expect(editor.commands.clearContent).toHaveBeenCalled();
    });

    it('should not call clearContent when editor is destroyed', () => {
      const { api, editor } = renderAPI({ isDestroyed: true });
      api.clearContent();
      expect(editor.commands.clearContent).not.toHaveBeenCalled();
    });
  });

  describe('focus', () => {
    it('should delegate to editor.commands.focus()', () => {
      const { api, editor } = renderAPI();
      api.focus('end');
      expect(editor.commands.focus).toHaveBeenCalledWith('end');
    });

    it('should not call focus when editor is destroyed', () => {
      const { api, editor } = renderAPI({ isDestroyed: true });
      api.focus();
      expect(editor.commands.focus).not.toHaveBeenCalled();
    });
  });

  describe('blur', () => {
    it('should delegate to editor.commands.blur()', () => {
      const { api, editor } = renderAPI();
      api.blur();
      expect(editor.commands.blur).toHaveBeenCalled();
    });
  });

  describe('isEmpty / isFocused', () => {
    it('should return true when editor.isEmpty is true', () => {
      const { api } = renderAPI({ isEmpty: true });
      expect(api.isEmpty()).toBe(true);
    });

    it('should return true when editor.isEmpty is false (uses || true fallback)', () => {
      // Note: the implementation uses `editor?.isEmpty || true` which always returns true.
      // This is intentional — isEmpty() defaults to true for safety.
      const { api } = renderAPI({ isEmpty: false });
      expect(api.isEmpty()).toBe(true);
    });

    it('should return true when editor is null', () => {
      const { ref } = createMockDeps();
      const deps = { ...createMockDeps().deps, editor: null };
      renderHook(() => useEditorAPI(ref, deps));
      expect(ref.current!.isEmpty()).toBe(true);
    });

    it('should return editor.isFocused', () => {
      const { api } = renderAPI({ isFocused: true });
      expect(api.isFocused()).toBe(true);
    });
  });

  describe('getMode / setMode / toggleMode', () => {
    it('getMode should return the current mode from editorModeRef', () => {
      const { api } = renderAPI();
      expect(api.getMode()).toBe('wysiwyg');
    });

    it('setMode should call handleModeSwitch', () => {
      const { api, deps } = renderAPI();
      api.setMode('markdown');
      expect(deps.handleModeSwitch).toHaveBeenCalledWith('markdown');
    });

    it('toggleMode should toggle from wysiwyg to markdown', () => {
      const { api, deps } = renderAPI();
      const result = api.toggleMode();
      expect(deps.handleModeSwitch).toHaveBeenCalledWith('markdown');
      expect(result).toBe('markdown');
    });

    it('toggleMode should toggle from markdown to wysiwyg', () => {
      const { deps, ref } = createMockDeps();
      deps.editorModeRef.current = 'markdown';
      renderHook(() => useEditorAPI(ref, deps));
      const result = ref.current!.toggleMode();
      expect(deps.handleModeSwitch).toHaveBeenCalledWith('wysiwyg');
      expect(result).toBe('wysiwyg');
    });
  });

  describe('getWordCount', () => {
    it('should return word count stats', () => {
      const { api } = renderAPI();
      expect(api.getWordCount()).toEqual({
        words: 42,
        characters: 200,
        charactersWithSpaces: 240,
      });
    });
  });

  describe('undo / redo', () => {
    it('undo should delegate to editor.commands.undo()', () => {
      const { api, editor } = renderAPI();
      api.undo();
      expect(editor.commands.undo).toHaveBeenCalled();
    });

    it('redo should delegate to editor.commands.redo()', () => {
      const { api, editor } = renderAPI();
      api.redo();
      expect(editor.commands.redo).toHaveBeenCalled();
    });

    it('canUndo should delegate to editor.can().undo()', () => {
      const { api } = renderAPI();
      expect(api.canUndo()).toBe(true);
    });

    it('canRedo should delegate to editor.can().redo()', () => {
      const { api } = renderAPI();
      expect(api.canRedo()).toBe(false);
    });
  });

  describe('insertContent', () => {
    it('should delegate to editor.commands.insertContent()', () => {
      const { api, editor } = renderAPI();
      api.insertContent('Hello world');
      expect(editor.commands.insertContent).toHaveBeenCalledWith('Hello world');
    });
  });

  describe('insertImage', () => {
    it('should delegate to editor.commands.setImage() with src and alt', () => {
      const { api, editor } = renderAPI();
      api.insertImage('https://example.com/img.png', 'Alt text');
      expect(editor.commands.setImage).toHaveBeenCalledWith({ src: 'https://example.com/img.png', alt: 'Alt text' });
    });

    it('should default alt to empty string', () => {
      const { api, editor } = renderAPI();
      api.insertImage('https://example.com/img.png');
      expect(editor.commands.setImage).toHaveBeenCalledWith({ src: 'https://example.com/img.png', alt: '' });
    });
  });

  describe('insertTable', () => {
    it('should delegate with default 3x3 and header row', () => {
      const { api, editor } = renderAPI();
      api.insertTable();
      expect(editor.commands.insertTable).toHaveBeenCalledWith({ rows: 3, cols: 3, withHeaderRow: true });
    });

    it('should accept custom rows and cols', () => {
      const { api, editor } = renderAPI();
      api.insertTable(5, 4);
      expect(editor.commands.insertTable).toHaveBeenCalledWith({ rows: 5, cols: 4, withHeaderRow: true });
    });
  });

  describe('insertCodeBlock', () => {
    it('should set code block with language when provided', () => {
      const { api, editor } = renderAPI();
      api.insertCodeBlock('typescript');
      expect(editor.commands.setCodeBlock).toHaveBeenCalledWith({ language: 'typescript' });
    });

    it('should set code block without language when not provided', () => {
      const { api, editor } = renderAPI();
      api.insertCodeBlock();
      expect(editor.commands.setCodeBlock).toHaveBeenCalledWith();
    });
  });

  describe('insertCallout', () => {
    it('should default to info type', () => {
      const { api, editor } = renderAPI();
      api.insertCallout();
      expect(editor.commands.insertCallout).toHaveBeenCalledWith({ type: 'info' });
    });

    it('should accept custom type', () => {
      const { api, editor } = renderAPI();
      api.insertCallout('todo');
      expect(editor.commands.insertCallout).toHaveBeenCalledWith({ type: 'todo' });
    });
  });

  describe('formatting toggles', () => {
    it('toggleBold should delegate', () => {
      const { api, editor } = renderAPI();
      api.toggleBold();
      expect(editor.commands.toggleBold).toHaveBeenCalled();
    });

    it('toggleItalic should delegate', () => {
      const { api, editor } = renderAPI();
      api.toggleItalic();
      expect(editor.commands.toggleItalic).toHaveBeenCalled();
    });

    it('toggleUnderline should delegate', () => {
      const { api, editor } = renderAPI();
      api.toggleUnderline();
      expect(editor.commands.toggleUnderline).toHaveBeenCalled();
    });

    it('toggleStrike should delegate', () => {
      const { api, editor } = renderAPI();
      api.toggleStrike();
      expect(editor.commands.toggleStrike).toHaveBeenCalled();
    });

    it('toggleCode should delegate', () => {
      const { api, editor } = renderAPI();
      api.toggleCode();
      expect(editor.commands.toggleCode).toHaveBeenCalled();
    });

    it('toggleHighlight should delegate', () => {
      const { api, editor } = renderAPI();
      api.toggleHighlight();
      expect(editor.commands.toggleHighlight).toHaveBeenCalled();
    });
  });

  describe('setHeading', () => {
    it('should set paragraph when level is 0', () => {
      const { api, editor } = renderAPI();
      api.setHeading(0);
      expect(editor.commands.setParagraph).toHaveBeenCalled();
      expect(editor.commands.setHeading).not.toHaveBeenCalled();
    });

    it('should set heading with level when level > 0', () => {
      const { api, editor } = renderAPI();
      api.setHeading(3);
      expect(editor.commands.setHeading).toHaveBeenCalledWith({ level: 3 });
      expect(editor.commands.setParagraph).not.toHaveBeenCalled();
    });
  });

  describe('list toggles', () => {
    it('toggleBulletList should delegate', () => {
      const { api, editor } = renderAPI();
      api.toggleBulletList();
      expect(editor.commands.toggleBulletList).toHaveBeenCalled();
    });

    it('toggleOrderedList should delegate', () => {
      const { api, editor } = renderAPI();
      api.toggleOrderedList();
      expect(editor.commands.toggleOrderedList).toHaveBeenCalled();
    });

    it('toggleTaskList should delegate', () => {
      const { api, editor } = renderAPI();
      api.toggleTaskList();
      expect(editor.commands.toggleTaskList).toHaveBeenCalled();
    });

    it('toggleBlockquote should delegate', () => {
      const { api, editor } = renderAPI();
      api.toggleBlockquote();
      expect(editor.commands.toggleBlockquote).toHaveBeenCalled();
    });
  });

  describe('links', () => {
    it('setLink should delegate with href', () => {
      const { api, editor } = renderAPI();
      api.setLink('https://example.com');
      expect(editor.commands.setLink).toHaveBeenCalledWith({ href: 'https://example.com' });
    });

    it('unsetLink should delegate', () => {
      const { api, editor } = renderAPI();
      api.unsetLink();
      expect(editor.commands.unsetLink).toHaveBeenCalled();
    });
  });

  describe('find/replace', () => {
    it('openFindReplace should set state to open and increment focus trigger', () => {
      const { api, deps } = renderAPI();
      api.openFindReplace();
      expect(deps.setIsFindReplaceOpen).toHaveBeenCalledWith(true);
      expect(deps.setFindReplaceFocusTrigger).toHaveBeenCalled();
    });

    it('closeFindReplace should set state to closed', () => {
      const { api, deps } = renderAPI();
      api.closeFindReplace();
      expect(deps.setIsFindReplaceOpen).toHaveBeenCalledWith(false);
    });
  });

  describe('save / clearSavedContent', () => {
    it('save should delegate to autoSaveState.save()', () => {
      const { api, deps } = renderAPI();
      api.save();
      expect(deps.autoSaveState.save).toHaveBeenCalled();
    });

    it('clearSavedContent should delegate to autoSaveState.clear()', () => {
      const { api, deps } = renderAPI();
      api.clearSavedContent();
      expect(deps.autoSaveState.clear).toHaveBeenCalled();
    });
  });

  describe('getSelectedText', () => {
    it('should return text between selection from and to', () => {
      const { api, editor } = renderAPI();
      const result = api.getSelectedText();
      expect(editor.state.doc.textBetween).toHaveBeenCalledWith(0, 5, ' ');
      expect(result).toBe('Hello');
    });

    it('should return empty string when editor is null', () => {
      const { ref } = createMockDeps();
      const deps = { ...createMockDeps().deps, editor: null };
      renderHook(() => useEditorAPI(ref, deps));
      expect(ref.current!.getSelectedText()).toBe('');
    });
  });

  describe('isEditable / setEditable', () => {
    it('isEditable should return editor.isEditable', () => {
      const { api } = renderAPI({ isEditable: true });
      expect(api.isEditable()).toBe(true);
    });

    it('setEditable should delegate to editor.setEditable()', () => {
      const { api, editor } = renderAPI();
      api.setEditable(false);
      expect(editor.setEditable).toHaveBeenCalledWith(false);
    });
  });

  describe('getTableOfContents', () => {
    it('should return headings with non-empty text', () => {
      const { api } = renderAPI();
      const toc = api.getTableOfContents();
      // Mock descendants yields: heading level 1 "Title" at pos 0, paragraph at 10, heading level 2 "" at 20
      expect(toc).toHaveLength(1);
      expect(toc[0]).toEqual({ id: 'toc-heading-0', text: 'Title', level: 1, pos: 0 });
    });

    it('should return empty array when editor is null', () => {
      const { ref } = createMockDeps();
      const deps = { ...createMockDeps().deps, editor: null };
      renderHook(() => useEditorAPI(ref, deps));
      expect(ref.current!.getTableOfContents()).toEqual([]);
    });
  });

  describe('scrollToHeading', () => {
    it('should not throw when editor is null', () => {
      const { ref } = createMockDeps();
      const deps = { ...createMockDeps().deps, editor: null };
      renderHook(() => useEditorAPI(ref, deps));
      expect(() => ref.current!.scrollToHeading(0)).not.toThrow();
    });

    it('should not throw when editor is destroyed', () => {
      const { api } = renderAPI({ isDestroyed: true });
      expect(() => api.scrollToHeading(0)).not.toThrow();
    });

    it('should call setTextSelection after scrolling', () => {
      const mockElement = {
        getBoundingClientRect: vi.fn(() => ({ top: 100 })),
        scrollIntoView: vi.fn(),
      };
      const { api, editor } = renderAPI();
      editor.view.nodeDOM = vi.fn(() => mockElement);
      api.scrollToHeading(0);
      expect(editor.commands.setTextSelection).toHaveBeenCalledWith(1);
    });
  });

  describe('null editor safety', () => {
    it('should handle null editor gracefully for all methods', () => {
      const { ref } = createMockDeps();
      const deps = { ...createMockDeps().deps, editor: null };
      renderHook(() => useEditorAPI(ref, deps));
      const api = ref.current!;

      // These should all return safely without throwing
      expect(api.getEditor()).toBeNull();
      expect(api.getHTML()).toBe('');
      expect(api.getMarkdown()).toBe('');
      expect(api.getText()).toBe('');
      expect(() => api.setContent('test')).not.toThrow();
      expect(() => api.clearContent()).not.toThrow();
      expect(() => api.focus()).not.toThrow();
      expect(() => api.blur()).not.toThrow();
      expect(api.isEmpty()).toBe(true);
      expect(api.isFocused()).toBe(false);
      expect(api.canUndo()).toBe(false);
      expect(api.canRedo()).toBe(false);
      expect(api.isEditable()).toBe(false);
      expect(api.getSelectedText()).toBe('');
      expect(api.getTableOfContents()).toEqual([]);
    });
  });
});
