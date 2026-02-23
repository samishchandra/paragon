import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHandleModeSwitch, type UseHandleModeSwitchDeps } from './useHandleModeSwitch';

// ---------------------------------------------------------------------------
// Mock the dynamic import of 'marked'
// ---------------------------------------------------------------------------
const mockMarkedParse = vi.fn((src: string) => `<p>${src}</p>`);
vi.mock('marked', () => ({
  marked: {
    parse: (src: string, _opts: any) => mockMarkedParse(src),
  },
}));

// ---------------------------------------------------------------------------
// Mock markdownToHtml from utils barrel
// ---------------------------------------------------------------------------
const mockMarkdownToHtml = vi.fn((_md: string, _parse: any, _opts: any) => '<p>converted html</p>');
vi.mock('../utils', () => ({
  markdownToHtml: (...args: any[]) => mockMarkdownToHtml(...args),
}));

// ---------------------------------------------------------------------------
// Mock DatePill and TagPill extensions
// ---------------------------------------------------------------------------
vi.mock('../extensions/DatePill', () => ({
  parseDateFromMarkdown: vi.fn(),
  getDateVariant: vi.fn(),
}));

vi.mock('../extensions/TagPill', () => ({
  isValidTag: vi.fn(),
  normalizeTag: vi.fn(),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createMockEditor(overrides: Record<string, any> = {}) {
  return {
    getHTML: vi.fn(() => '<p>Hello World</p>'),
    isDestroyed: false,
    commands: {
      setContent: vi.fn(),
    },
    ...overrides,
  } as any;
}

function createMockTurndown() {
  return {
    turndown: vi.fn((html: string) => `# Markdown from ${html.slice(0, 20)}`),
  };
}

function createDeps(overrides: Partial<UseHandleModeSwitchDeps> = {}): UseHandleModeSwitchDeps {
  return {
    editor: createMockEditor(),
    turndownService: createMockTurndown(),
    editorModeRef: { current: 'wysiwyg' },
    rawMarkdownRef: { current: '' },
    setEditorMode: vi.fn(),
    setRawMarkdown: vi.fn(),
    onModeChange: vi.fn(),
    enableTagAutoDetect: false,
    disabledFeatures: {},
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useHandleModeSwitch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMarkedParse.mockImplementation((src: string) => `<p>${src}</p>`);
    mockMarkdownToHtml.mockImplementation(() => '<p>converted html</p>');
  });

  describe('returns a function', () => {
    it('should return a callback function', () => {
      const deps = createDeps();
      const { result } = renderHook(() => useHandleModeSwitch(deps));
      expect(typeof result.current).toBe('function');
    });
  });

  describe('null editor guard', () => {
    it('should do nothing when editor is null', async () => {
      const deps = createDeps({ editor: null });
      const { result } = renderHook(() => useHandleModeSwitch(deps));

      await act(async () => {
        await result.current('markdown');
      });

      // Should still set mode even with null editor? No — the function returns early.
      // Actually, looking at the code: `if (!editor) return;` — so setEditorMode is NOT called.
      expect(deps.setEditorMode).not.toHaveBeenCalled();
      expect(deps.onModeChange).not.toHaveBeenCalled();
    });
  });

  describe('WYSIWYG → Markdown (HTML→Markdown conversion)', () => {
    it('should convert HTML to markdown via turndown', async () => {
      const deps = createDeps();
      deps.editorModeRef.current = 'wysiwyg';
      const { result } = renderHook(() => useHandleModeSwitch(deps));

      await act(async () => {
        await result.current('markdown');
      });

      expect(deps.editor!.getHTML).toHaveBeenCalled();
      expect(deps.turndownService.turndown).toHaveBeenCalledWith('<p>Hello World</p>');
    });

    it('should update rawMarkdown state and ref', async () => {
      const deps = createDeps();
      deps.editorModeRef.current = 'wysiwyg';
      const { result } = renderHook(() => useHandleModeSwitch(deps));

      await act(async () => {
        await result.current('markdown');
      });

      const expectedMarkdown = deps.turndownService.turndown('<p>Hello World</p>');
      expect(deps.setRawMarkdown).toHaveBeenCalledWith(expectedMarkdown);
      expect(deps.rawMarkdownRef.current).toBe(expectedMarkdown);
    });

    it('should update editorMode state and ref', async () => {
      const deps = createDeps();
      deps.editorModeRef.current = 'wysiwyg';
      const { result } = renderHook(() => useHandleModeSwitch(deps));

      await act(async () => {
        await result.current('markdown');
      });

      expect(deps.setEditorMode).toHaveBeenCalledWith('markdown');
      expect(deps.editorModeRef.current).toBe('markdown');
    });

    it('should call onModeChange with the new mode', async () => {
      const deps = createDeps();
      deps.editorModeRef.current = 'wysiwyg';
      const { result } = renderHook(() => useHandleModeSwitch(deps));

      await act(async () => {
        await result.current('markdown');
      });

      expect(deps.onModeChange).toHaveBeenCalledWith('markdown');
    });
  });

  describe('Markdown → WYSIWYG (Markdown→HTML conversion)', () => {
    it('should call markdownToHtml with rawMarkdownRef content', async () => {
      const deps = createDeps();
      deps.editorModeRef.current = 'markdown';
      deps.rawMarkdownRef.current = '# Hello\n\nWorld';
      const { result } = renderHook(() => useHandleModeSwitch(deps));

      await act(async () => {
        await result.current('wysiwyg');
      });

      expect(mockMarkdownToHtml).toHaveBeenCalledWith(
        '# Hello\n\nWorld',
        expect.any(Function),
        expect.objectContaining({
          enableTagAutoDetect: false,
          disableTagPills: false,
        })
      );
    });

    it('should set editor content via queueMicrotask', async () => {
      const deps = createDeps();
      deps.editorModeRef.current = 'markdown';
      deps.rawMarkdownRef.current = '# Test';
      const { result } = renderHook(() => useHandleModeSwitch(deps));

      await act(async () => {
        await result.current('wysiwyg');
        // Wait for queueMicrotask to flush
        await new Promise(resolve => setTimeout(resolve, 10));
      });

      expect(deps.editor!.commands.setContent).toHaveBeenCalledWith('<p>converted html</p>');
    });

    it('should not set content if editor is destroyed during microtask', async () => {
      const editor = createMockEditor();
      const deps = createDeps({ editor });
      deps.editorModeRef.current = 'markdown';

      const { result } = renderHook(() => useHandleModeSwitch(deps));

      // Destroy editor before microtask runs
      await act(async () => {
        const promise = result.current('wysiwyg');
        editor.isDestroyed = true;
        await promise;
        await new Promise(resolve => setTimeout(resolve, 10));
      });

      expect(editor.commands.setContent).not.toHaveBeenCalled();
    });

    it('should update editorMode state and ref', async () => {
      const deps = createDeps();
      deps.editorModeRef.current = 'markdown';
      const { result } = renderHook(() => useHandleModeSwitch(deps));

      await act(async () => {
        await result.current('wysiwyg');
      });

      expect(deps.setEditorMode).toHaveBeenCalledWith('wysiwyg');
      expect(deps.editorModeRef.current).toBe('wysiwyg');
    });

    it('should call onModeChange with the new mode', async () => {
      const deps = createDeps();
      deps.editorModeRef.current = 'markdown';
      const { result } = renderHook(() => useHandleModeSwitch(deps));

      await act(async () => {
        await result.current('wysiwyg');
      });

      expect(deps.onModeChange).toHaveBeenCalledWith('wysiwyg');
    });

    it('should pass enableTagAutoDetect to pipeline options', async () => {
      const deps = createDeps({ enableTagAutoDetect: true });
      deps.editorModeRef.current = 'markdown';
      const { result } = renderHook(() => useHandleModeSwitch(deps));

      await act(async () => {
        await result.current('wysiwyg');
      });

      expect(mockMarkdownToHtml).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Function),
        expect.objectContaining({ enableTagAutoDetect: true })
      );
    });

    it('should pass disableTagPills when tagPills is disabled', async () => {
      const deps = createDeps({ disabledFeatures: { tagPills: true } });
      deps.editorModeRef.current = 'markdown';
      const { result } = renderHook(() => useHandleModeSwitch(deps));

      await act(async () => {
        await result.current('wysiwyg');
      });

      expect(mockMarkdownToHtml).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Function),
        expect.objectContaining({ disableTagPills: true })
      );
    });
  });

  describe('same-mode switch (no-op conversion)', () => {
    it('should not convert when switching wysiwyg → wysiwyg', async () => {
      const deps = createDeps();
      deps.editorModeRef.current = 'wysiwyg';
      const { result } = renderHook(() => useHandleModeSwitch(deps));

      await act(async () => {
        await result.current('wysiwyg');
      });

      expect(deps.editor!.getHTML).not.toHaveBeenCalled();
      expect(deps.turndownService.turndown).not.toHaveBeenCalled();
      expect(mockMarkdownToHtml).not.toHaveBeenCalled();
      // Should still update mode state
      expect(deps.setEditorMode).toHaveBeenCalledWith('wysiwyg');
    });

    it('should not convert when switching markdown → markdown', async () => {
      const deps = createDeps();
      deps.editorModeRef.current = 'markdown';
      const { result } = renderHook(() => useHandleModeSwitch(deps));

      await act(async () => {
        await result.current('markdown');
      });

      expect(deps.editor!.getHTML).not.toHaveBeenCalled();
      expect(deps.turndownService.turndown).not.toHaveBeenCalled();
      expect(mockMarkdownToHtml).not.toHaveBeenCalled();
      expect(deps.setEditorMode).toHaveBeenCalledWith('markdown');
    });
  });

  describe('onModeChange callback', () => {
    it('should work without onModeChange callback', async () => {
      const deps = createDeps({ onModeChange: undefined });
      deps.editorModeRef.current = 'wysiwyg';
      const { result } = renderHook(() => useHandleModeSwitch(deps));

      // Should not throw
      await act(async () => {
        await result.current('markdown');
      });

      expect(deps.setEditorMode).toHaveBeenCalledWith('markdown');
    });
  });
});
