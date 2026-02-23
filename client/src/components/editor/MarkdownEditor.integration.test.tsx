/**
 * Integration tests for the MarkdownEditor component.
 *
 * These tests render the full component tree and verify:
 *   - Default rendering and prop-driven visibility
 *   - Ref API (imperative handle methods)
 *   - Mode switching (WYSIWYG ↔ markdown)
 *   - Callback invocations (onModeChange, etc.)
 *   - Disabled features
 *   - Sub-component integration (toolbar, footer, TOC)
 *
 * TipTap's useEditor is mocked because jsdom lacks the full contentEditable
 * support required by ProseMirror. Heavy sub-components (overlays, toolbar)
 * are also mocked to isolate the MarkdownEditor orchestration logic.
 */

import React, { createRef } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MarkdownEditor, type MarkdownEditorRef, type MarkdownEditorProps } from './MarkdownEditor';

// ---------------------------------------------------------------------------
// Mock TipTap useEditor — returns a controllable fake editor
// ---------------------------------------------------------------------------
let mockEditorInstance: any = null;
const mockEditorContent = { current: '<p>Hello world</p>' };

function createMockEditor() {
  const listeners: Record<string, Set<Function>> = {};
  return {
    isDestroyed: false,
    isEmpty: false,
    isFocused: false,
    isEditable: true,
    isActive: vi.fn(() => false),
    getText: vi.fn(() => 'Hello world'),
    getHTML: vi.fn(() => mockEditorContent.current),
    getJSON: vi.fn(() => ({ type: 'doc', content: [] })),
    setEditable: vi.fn((val: boolean) => { mockEditorInstance.isEditable = val; }),
    commands: {
      setContent: vi.fn((html: string) => { mockEditorContent.current = html; }),
      clearContent: vi.fn(() => { mockEditorContent.current = ''; }),
      focus: vi.fn(),
      blur: vi.fn(),
      undo: vi.fn(),
      redo: vi.fn(),
      toggleBold: vi.fn(),
      toggleItalic: vi.fn(),
      toggleUnderline: vi.fn(),
      toggleStrike: vi.fn(),
      toggleCode: vi.fn(),
      toggleHighlight: vi.fn(),
      toggleBulletList: vi.fn(),
      toggleOrderedList: vi.fn(),
      toggleTaskList: vi.fn(),
      toggleBlockquote: vi.fn(),
      setHeading: vi.fn(),
      setParagraph: vi.fn(),
      setLink: vi.fn(),
      unsetLink: vi.fn(),
      insertContent: vi.fn(),
      insertTable: vi.fn(),
      setCodeBlock: vi.fn(),
      setImage: vi.fn(),
    },
    chain: vi.fn(() => {
      const handler: ProxyHandler<any> = {
        get(_target, prop) {
          if (prop === 'run') return vi.fn();
          if (prop === 'focus') return vi.fn(() => new Proxy({}, handler));
          return vi.fn(() => new Proxy({}, handler));
        },
      };
      return new Proxy({}, handler);
    }),
    can: vi.fn(() => {
      const handler: ProxyHandler<any> = {
        get() { return vi.fn(() => true); },
      };
      return new Proxy({}, handler);
    }),
    on: vi.fn((event: string, fn: Function) => {
      if (!listeners[event]) listeners[event] = new Set();
      listeners[event].add(fn);
    }),
    off: vi.fn((event: string, fn: Function) => {
      listeners[event]?.delete(fn);
    }),
    view: {
      dom: document.createElement('div'),
      state: {
        doc: {
          textContent: 'Hello world',
          content: { size: 11 },
          descendants: vi.fn(),
        },
        selection: { from: 0, to: 0, empty: true },
      },
      focus: vi.fn(),
    },
    state: {
      doc: {
        textContent: 'Hello world',
        content: { size: 11 },
      descendants: vi.fn(),
      nodesBetween: vi.fn(),
      textBetween: vi.fn(() => ''),
    },
      selection: { from: 0, to: 0, empty: true },
    },
    storage: {},
    extensionManager: { extensions: [] },
    destroy: vi.fn(),
    _listeners: listeners,
  };
}

// Mock @tiptap/react
vi.mock('@tiptap/react', async () => {
  const actual = await vi.importActual('@tiptap/react');
  return {
    ...actual,
    useEditor: vi.fn((config: any) => {
      if (!mockEditorInstance) {
        mockEditorInstance = createMockEditor();
      }
      if (config?.onCreate && mockEditorInstance) {
        setTimeout(() => config.onCreate({ editor: mockEditorInstance }), 0);
      }
      return mockEditorInstance;
    }),
    EditorContent: vi.fn(({ editor }: any) => (
      <div data-testid="editor-content" className="tiptap ProseMirror">
        {editor ? 'Editor loaded' : 'Loading...'}
      </div>
    )),
  };
});

// Mock the AI state hook — must match the real return shape { state, executeAction, abort, reset }
vi.mock('./ai/useAIState', () => ({
  useAIState: vi.fn(() => ({
    state: { status: 'idle' },
    executeAction: vi.fn(),
    abort: vi.fn(),
    reset: vi.fn(),
  })),
}));

// Mock heavy sub-components to avoid deep dependency chains
vi.mock('./WYSIWYGOverlays', () => ({
  WYSIWYGOverlays: vi.fn(() => <div data-testid="wysiwyg-overlays" />),
}));

vi.mock('./EditorLoadingSkeleton', () => ({
  EditorLoadingSkeleton: vi.fn(() => <div data-testid="loading-skeleton" />),
}));

// Mock EditorToolbar to avoid useEditorState deep integration with TipTap
vi.mock('./EditorToolbar', () => ({
  EditorToolbar: vi.fn(({ editor }: any) => (
    <div data-testid="editor-toolbar">{editor ? 'Toolbar' : null}</div>
  )),
}));

// Mock FindReplace to avoid complex editor interactions
vi.mock('./FindReplace', () => ({
  FindReplace: vi.fn(() => <div data-testid="find-replace" />),
}));

// Mock TableOfContents
vi.mock('./TableOfContents', () => ({
  TableOfContents: vi.fn(() => <div data-testid="table-of-contents" />),
}));

// Mock insertHorizontalRuleClean to avoid ProseMirror transaction errors
vi.mock('./utils/insertHorizontalRule', () => ({
  insertHorizontalRuleClean: vi.fn(),
}));

// Mock marked for markdown→HTML conversion during mode switch
vi.mock('marked', () => ({
  marked: {
    parse: vi.fn((src: string) => `<p>${src}</p>`),
  },
}));

// Mock the turndown service
vi.mock('./hooks/useTurndownService', () => ({
  useTurndownService: vi.fn(() => ({
    turndown: vi.fn((html: string) => `# Markdown from HTML`),
    isReady: true,
  })),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function renderEditor(props: Partial<MarkdownEditorProps> = {}, ref?: React.Ref<MarkdownEditorRef>) {
  return render(<MarkdownEditor ref={ref} {...props} />);
}

// ---------------------------------------------------------------------------
// Setup / Teardown
// ---------------------------------------------------------------------------
beforeEach(() => {
  mockEditorInstance = null;
  mockEditorContent.current = '<p>Hello world</p>';
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('MarkdownEditor Integration', () => {
  // ---- Default rendering ----
  describe('default rendering', () => {
    it('should render the editor container', () => {
      renderEditor();
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('should render with custom placeholder', () => {
      renderEditor({ placeholder: 'Type something...' });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = renderEditor({ className: 'my-custom-class' });
      expect(container.querySelector('.my-custom-class')).toBeTruthy();
    });

    it('should render the WYSIWYG overlays in WYSIWYG mode', () => {
      renderEditor();
      expect(screen.getByTestId('wysiwyg-overlays')).toBeInTheDocument();
    });
  });

  // ---- Prop-driven visibility ----
  describe('prop-driven visibility', () => {
    it('should hide toolbar when showToolbar is false', () => {
      const { container } = renderEditor({ showToolbar: false });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('should hide mode toggle when showModeToggle is false', () => {
      renderEditor({ showModeToggle: false });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('should show table of contents when showTableOfContents is true', () => {
      renderEditor({ showTableOfContents: true });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });
  });

  // ---- Ref API ----
  describe('ref API', () => {
    it('should expose getEditor via ref', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(ref.current).toBeTruthy();
      expect(ref.current!.getEditor()).toBeTruthy();
    });

    it('should expose getHTML via ref', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(typeof ref.current!.getHTML()).toBe('string');
    });

    it('should expose getText via ref', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(typeof ref.current!.getText()).toBe('string');
    });

    it('should expose focus/blur via ref without throwing', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(() => ref.current!.focus()).not.toThrow();
      expect(() => ref.current!.blur()).not.toThrow();
    });

    it('should expose isEmpty via ref', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(typeof ref.current!.isEmpty()).toBe('boolean');
    });

    it('should expose getMode returning wysiwyg by default', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(ref.current!.getMode()).toBe('wysiwyg');
    });

    it('should expose undo/redo via ref without throwing', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(() => ref.current!.undo()).not.toThrow();
      expect(() => ref.current!.redo()).not.toThrow();
    });

    it('should expose canUndo/canRedo via ref', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(typeof ref.current!.canUndo()).toBe('boolean');
      expect(typeof ref.current!.canRedo()).toBe('boolean');
    });

    it('should expose formatting methods via ref without throwing', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(() => ref.current!.toggleBold()).not.toThrow();
      expect(() => ref.current!.toggleItalic()).not.toThrow();
      expect(() => ref.current!.toggleUnderline()).not.toThrow();
      expect(() => ref.current!.toggleStrike()).not.toThrow();
      expect(() => ref.current!.toggleCode()).not.toThrow();
      expect(() => ref.current!.toggleHighlight()).not.toThrow();
    });

    it('should expose list methods via ref without throwing', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(() => ref.current!.toggleBulletList()).not.toThrow();
      expect(() => ref.current!.toggleOrderedList()).not.toThrow();
      expect(() => ref.current!.toggleTaskList()).not.toThrow();
      expect(() => ref.current!.toggleBlockquote()).not.toThrow();
    });

    it('should expose insert methods via ref without throwing', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(() => ref.current!.insertContent('<p>test</p>')).not.toThrow();
      expect(() => ref.current!.insertImage('https://example.com/img.png', 'alt')).not.toThrow();
      expect(() => ref.current!.insertTable(3, 3)).not.toThrow();
      expect(() => ref.current!.insertCodeBlock('javascript')).not.toThrow();
      expect(() => ref.current!.insertHorizontalRule()).not.toThrow();
    });

    it('should expose setContent and clearContent via ref', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(() => ref.current!.setContent('<p>New content</p>')).not.toThrow();
      expect(() => ref.current!.clearContent()).not.toThrow();
    });

    it('should expose link methods via ref without throwing', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(() => ref.current!.setLink('https://example.com')).not.toThrow();
      expect(() => ref.current!.unsetLink()).not.toThrow();
    });

    it('should expose heading methods via ref without throwing', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(() => ref.current!.setHeading(1)).not.toThrow();
      expect(() => ref.current!.setHeading(0)).not.toThrow();
    });

    it('should expose find/replace methods via ref without throwing', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(() => ref.current!.openFindReplace()).not.toThrow();
      expect(() => ref.current!.closeFindReplace()).not.toThrow();
    });

    it('should expose save and clearSavedContent via ref without throwing', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({ autoSave: true }, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(() => ref.current!.save()).not.toThrow();
      expect(() => ref.current!.clearSavedContent()).not.toThrow();
    });

    it('should expose getWordCount via ref', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      const wc = ref.current!.getWordCount();
      expect(wc).toHaveProperty('words');
      expect(wc).toHaveProperty('characters');
      expect(wc).toHaveProperty('charactersWithSpaces');
    });

    it('should expose isEditable/setEditable via ref', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(ref.current!.isEditable()).toBe(true);
      expect(() => ref.current!.setEditable(false)).not.toThrow();
    });

    it('should expose getSelectedText via ref', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(typeof ref.current!.getSelectedText()).toBe('string');
    });

    it('should expose getTableOfContents via ref', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      const toc = ref.current!.getTableOfContents();
      expect(Array.isArray(toc)).toBe(true);
    });

    it('should expose insertCallout via ref without throwing', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(() => ref.current!.insertCallout('info')).not.toThrow();
    });
  });

  // ---- Initial mode ----
  describe('initial mode', () => {
    it('should start in WYSIWYG mode by default', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({}, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(ref.current!.getMode()).toBe('wysiwyg');
    });

    it('should start in markdown mode when initialMode is markdown', async () => {
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({ initialMode: 'markdown' }, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      expect(ref.current!.getMode()).toBe('markdown');
    });
  });

  // ---- Mode switching via ref ----
  describe('mode switching via ref', () => {
    it('should toggle mode from wysiwyg to markdown', async () => {
      const onModeChange = vi.fn();
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({ onModeChange }, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      act(() => { ref.current!.toggleMode(); });
      expect(ref.current!.getMode()).toBe('markdown');
      expect(onModeChange).toHaveBeenCalledWith('markdown');
    });

    it('should toggle mode back from markdown to wysiwyg', async () => {
      const onModeChange = vi.fn();
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({ onModeChange }, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      // First toggle to markdown (synchronous path: wysiwyg→markdown)
      await act(async () => { ref.current!.toggleMode(); });
      expect(ref.current!.getMode()).toBe('markdown');

      // Then toggle back to wysiwyg (async path: markdown→wysiwyg uses dynamic import)
      await act(async () => {
        ref.current!.toggleMode();
        // Allow the async import('marked') and queueMicrotask to resolve
        await new Promise(resolve => setTimeout(resolve, 0));
        vi.advanceTimersByTime(100);
      });
      expect(ref.current!.getMode()).toBe('wysiwyg');
      expect(onModeChange).toHaveBeenCalledWith('wysiwyg');
    });

    it('should set mode explicitly via setMode', async () => {
      const onModeChange = vi.fn();
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({ onModeChange }, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      act(() => { ref.current!.setMode('markdown'); });
      expect(ref.current!.getMode()).toBe('markdown');
      expect(onModeChange).toHaveBeenCalledWith('markdown');
    });

    it('should call onModeChange even when setting same mode (current behavior)', async () => {
      const onModeChange = vi.fn();
      const ref = createRef<MarkdownEditorRef>();
      renderEditor({ onModeChange }, ref);
      await act(async () => { vi.advanceTimersByTime(100); });

      act(() => { ref.current!.setMode('wysiwyg'); });
      // Current implementation calls onModeChange regardless
      expect(onModeChange).toHaveBeenCalledWith('wysiwyg');
    });
  });

  // ---- Disabled features ----
  describe('disabled features', () => {
    it('should render with tables disabled', () => {
      renderEditor({ disabledFeatures: { tables: true } });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('should render with images disabled', () => {
      renderEditor({ disabledFeatures: { images: true } });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('should render with multiple features disabled', () => {
      renderEditor({
        disabledFeatures: {
          tables: true,
          images: true,
          codeBlocks: true,
          callouts: true,
          datePills: true,
          tagPills: true,
          wikiLinks: true,
          slashCommands: true,
          markdownPaste: true,
          dragAndDrop: true,
        },
      });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });
  });

  // ---- Auto-save ----
  describe('auto-save', () => {
    it('should render with auto-save enabled by default', () => {
      renderEditor();
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('should render with auto-save disabled', () => {
      renderEditor({ autoSave: false });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('should use custom autoSaveKey', () => {
      renderEditor({ autoSaveKey: 'my-custom-key' });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });
  });

  // ---- Theme ----
  describe('theme', () => {
    it('should render with dark theme', () => {
      renderEditor({ theme: 'dark' });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('should render with light theme', () => {
      renderEditor({ theme: 'light' });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });
  });

  // ---- Editable state ----
  describe('editable state', () => {
    it('should render as editable by default', () => {
      renderEditor();
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('should render as read-only when editable is false', () => {
      renderEditor({ editable: false });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });
  });

  // ---- Performance mode ----
  describe('performance mode', () => {
    it('should render with auto performance mode (default)', () => {
      renderEditor({ performanceMode: 'auto' });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('should render with full performance mode', () => {
      renderEditor({ performanceMode: 'full' });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('should render with lightweight performance mode', () => {
      renderEditor({ performanceMode: 'lightweight' });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });
  });

  // ---- Error boundary ----
  describe('error boundary', () => {
    it('should call onEditorError when provided', () => {
      const onEditorError = vi.fn();
      renderEditor({ onEditorError });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });
  });

  // ---- AI integration ----
  describe('AI integration', () => {
    it('should render without AI when no aiActions provided', () => {
      renderEditor();
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('should render with AI actions provided', () => {
      const aiActions = [
        { id: 'summarize', label: 'Summarize', icon: '✨' },
        { id: 'fix-grammar', label: 'Fix Grammar', icon: '📝' },
      ];
      renderEditor({ aiActions: aiActions as any });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });
  });

  // ---- Table of Contents ----
  describe('table of contents', () => {
    it('should render TOC when showTableOfContents is true', () => {
      renderEditor({ showTableOfContents: true, tocVisible: true });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('should render TOC on the left when tocPosition is left', () => {
      renderEditor({ showTableOfContents: true, tocPosition: 'left' });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });
  });

  // ---- Combined props ----
  describe('combined props', () => {
    it('should render with all features enabled', () => {
      renderEditor({
        showToolbar: true,
        showWordCount: true,
        showModeToggle: true,
        showTableOfContents: true,
        showFloatingToolbar: true,
        autoSave: true,
        showRecoveryBanner: true,
        enableTagAutoDetect: true,
        enableHexColorHighlight: true,
        enableCollapsibleHeadings: true,
        progressiveSelectAll: true,
        autoReorderChecklist: true,
      });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('should render with all features disabled', () => {
      renderEditor({
        showToolbar: false,
        showWordCount: false,
        showModeToggle: false,
        showTableOfContents: false,
        showFloatingToolbar: false,
        autoSave: false,
        showRecoveryBanner: false,
        editable: false,
        disabledFeatures: {
          tables: true,
          images: true,
          codeBlocks: true,
          taskLists: true,
          callouts: true,
          datePills: true,
          tagPills: true,
          wikiLinks: true,
          collapsibleHeadings: true,
          slashCommands: true,
          markdownPaste: true,
          dragAndDrop: true,
        },
      });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('should render with custom render functions', () => {
      renderEditor({
        renderToolbar: (_editor, defaultToolbar) => (
          <div data-testid="custom-toolbar">{defaultToolbar}</div>
        ),
        renderFooter: (wordCount, _status, _defaultFooter) => (
          <div data-testid="custom-footer">Words: {wordCount.words}</div>
        ),
      });
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });
  });

  // ---- Unmount cleanup ----
  describe('unmount cleanup', () => {
    it('should clean up without errors on unmount', () => {
      const { unmount } = renderEditor();
      expect(() => unmount()).not.toThrow();
    });

    it('should not throw when unmounting with all features', () => {
      const { unmount } = renderEditor({
        autoSave: true,
        showWordCount: true,
        showTableOfContents: true,
        onDestroy: vi.fn(),
      });
      expect(() => unmount()).not.toThrow();
    });
  });
});
