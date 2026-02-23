/**
 * Unit tests for useGlobalEditorAPI hook.
 *
 * Verifies that window.__paragonEditorModeAPI is correctly exposed and cleaned up,
 * that all API methods delegate properly, and that mode change events are dispatched.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGlobalEditorAPI, type UseGlobalEditorAPIDeps } from './useGlobalEditorAPI';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createDeps(overrides: Partial<UseGlobalEditorAPIDeps> = {}): UseGlobalEditorAPIDeps {
  return {
    editorModeRef: { current: 'wysiwyg' },
    rawMarkdownRef: { current: '# Hello' },
    editorMode: 'wysiwyg',
    handleModeSwitch: vi.fn(),
    setIsFindReplaceOpen: vi.fn(),
    setFindReplaceFocusTrigger: vi.fn(),
    ...overrides,
  };
}

function getAPI(): any {
  return (window as any).__paragonEditorModeAPI;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useGlobalEditorAPI', () => {
  beforeEach(() => {
    // Ensure clean state
    delete (window as any).__paragonEditorModeAPI;
  });

  afterEach(() => {
    delete (window as any).__paragonEditorModeAPI;
  });

  // -------------------------------------------------------------------------
  // Lifecycle: expose and cleanup
  // -------------------------------------------------------------------------

  describe('lifecycle', () => {
    it('should expose the API on window.__paragonEditorModeAPI on mount', () => {
      const deps = createDeps();
      renderHook(() => useGlobalEditorAPI(deps));
      expect(getAPI()).toBeDefined();
      expect(typeof getAPI().getMode).toBe('function');
    });

    it('should remove the API from window on unmount', () => {
      const deps = createDeps();
      const { unmount } = renderHook(() => useGlobalEditorAPI(deps));
      expect(getAPI()).toBeDefined();
      unmount();
      expect(getAPI()).toBeUndefined();
    });

    it('should expose all expected methods', () => {
      const deps = createDeps();
      renderHook(() => useGlobalEditorAPI(deps));
      const api = getAPI();
      const expectedMethods = [
        'getMode', 'setMode', 'toggleMode',
        'switchToVisual', 'switchToMarkdown',
        'isVisualMode', 'isMarkdownMode',
        'getRawMarkdown', 'onModeChange',
      ];
      for (const method of expectedMethods) {
        expect(typeof api[method]).toBe('function');
      }
    });
  });

  // -------------------------------------------------------------------------
  // getMode
  // -------------------------------------------------------------------------

  describe('getMode', () => {
    it('should return the current mode from editorModeRef', () => {
      const deps = createDeps({ editorModeRef: { current: 'wysiwyg' } });
      renderHook(() => useGlobalEditorAPI(deps));
      expect(getAPI().getMode()).toBe('wysiwyg');
    });

    it('should reflect ref updates without re-render', () => {
      const deps = createDeps();
      renderHook(() => useGlobalEditorAPI(deps));
      expect(getAPI().getMode()).toBe('wysiwyg');
      // Mutate the ref directly (simulates mode change)
      deps.editorModeRef.current = 'markdown';
      expect(getAPI().getMode()).toBe('markdown');
    });
  });

  // -------------------------------------------------------------------------
  // setMode
  // -------------------------------------------------------------------------

  describe('setMode', () => {
    it('should call handleModeSwitch with valid mode "wysiwyg"', () => {
      const deps = createDeps();
      renderHook(() => useGlobalEditorAPI(deps));
      getAPI().setMode('wysiwyg');
      expect(deps.handleModeSwitch).toHaveBeenCalledWith('wysiwyg');
    });

    it('should call handleModeSwitch with valid mode "markdown"', () => {
      const deps = createDeps();
      renderHook(() => useGlobalEditorAPI(deps));
      getAPI().setMode('markdown');
      expect(deps.handleModeSwitch).toHaveBeenCalledWith('markdown');
    });

    it('should not call handleModeSwitch with invalid mode', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const deps = createDeps();
      renderHook(() => useGlobalEditorAPI(deps));
      getAPI().setMode('invalid');
      expect(deps.handleModeSwitch).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('Invalid mode. Use "wysiwyg" or "markdown"');
      consoleSpy.mockRestore();
    });
  });

  // -------------------------------------------------------------------------
  // toggleMode
  // -------------------------------------------------------------------------

  describe('toggleMode', () => {
    it('should toggle from wysiwyg to markdown', () => {
      const deps = createDeps({ editorModeRef: { current: 'wysiwyg' } });
      renderHook(() => useGlobalEditorAPI(deps));
      const result = getAPI().toggleMode();
      expect(deps.handleModeSwitch).toHaveBeenCalledWith('markdown');
      expect(result).toBe('markdown');
    });

    it('should toggle from markdown to wysiwyg', () => {
      const deps = createDeps({ editorModeRef: { current: 'markdown' } });
      renderHook(() => useGlobalEditorAPI(deps));
      const result = getAPI().toggleMode();
      expect(deps.handleModeSwitch).toHaveBeenCalledWith('wysiwyg');
      expect(result).toBe('wysiwyg');
    });
  });

  // -------------------------------------------------------------------------
  // switchToVisual / switchToMarkdown
  // -------------------------------------------------------------------------

  describe('switchToVisual / switchToMarkdown', () => {
    it('switchToVisual should call handleModeSwitch with "wysiwyg"', () => {
      const deps = createDeps();
      renderHook(() => useGlobalEditorAPI(deps));
      getAPI().switchToVisual();
      expect(deps.handleModeSwitch).toHaveBeenCalledWith('wysiwyg');
    });

    it('switchToMarkdown should call handleModeSwitch with "markdown"', () => {
      const deps = createDeps();
      renderHook(() => useGlobalEditorAPI(deps));
      getAPI().switchToMarkdown();
      expect(deps.handleModeSwitch).toHaveBeenCalledWith('markdown');
    });
  });

  // -------------------------------------------------------------------------
  // isVisualMode / isMarkdownMode
  // -------------------------------------------------------------------------

  describe('isVisualMode / isMarkdownMode', () => {
    it('isVisualMode should return true when in wysiwyg mode', () => {
      const deps = createDeps({ editorModeRef: { current: 'wysiwyg' } });
      renderHook(() => useGlobalEditorAPI(deps));
      expect(getAPI().isVisualMode()).toBe(true);
      expect(getAPI().isMarkdownMode()).toBe(false);
    });

    it('isMarkdownMode should return true when in markdown mode', () => {
      const deps = createDeps({ editorModeRef: { current: 'markdown' } });
      renderHook(() => useGlobalEditorAPI(deps));
      expect(getAPI().isVisualMode()).toBe(false);
      expect(getAPI().isMarkdownMode()).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // getRawMarkdown
  // -------------------------------------------------------------------------

  describe('getRawMarkdown', () => {
    it('should return raw markdown when in markdown mode', () => {
      const deps = createDeps({
        editorModeRef: { current: 'markdown' },
        rawMarkdownRef: { current: '# Hello World' },
      });
      renderHook(() => useGlobalEditorAPI(deps));
      expect(getAPI().getRawMarkdown()).toBe('# Hello World');
    });

    it('should return null when in wysiwyg mode', () => {
      const deps = createDeps({
        editorModeRef: { current: 'wysiwyg' },
        rawMarkdownRef: { current: '# Hello World' },
      });
      renderHook(() => useGlobalEditorAPI(deps));
      expect(getAPI().getRawMarkdown()).toBeNull();
    });

    it('should reflect ref updates without re-render', () => {
      const deps = createDeps({
        editorModeRef: { current: 'markdown' },
        rawMarkdownRef: { current: 'initial' },
      });
      renderHook(() => useGlobalEditorAPI(deps));
      expect(getAPI().getRawMarkdown()).toBe('initial');
      deps.rawMarkdownRef.current = 'updated';
      expect(getAPI().getRawMarkdown()).toBe('updated');
    });
  });

  // -------------------------------------------------------------------------
  // onModeChange (event subscription)
  // -------------------------------------------------------------------------

  describe('onModeChange', () => {
    it('should subscribe to paragon-editor-mode-change events', () => {
      const deps = createDeps();
      renderHook(() => useGlobalEditorAPI(deps));
      const callback = vi.fn();
      getAPI().onModeChange(callback);

      window.dispatchEvent(
        new CustomEvent('paragon-editor-mode-change', { detail: { mode: 'markdown' } })
      );

      expect(callback).toHaveBeenCalledWith('markdown');
    });

    it('should return an unsubscribe function', () => {
      const deps = createDeps();
      renderHook(() => useGlobalEditorAPI(deps));
      const callback = vi.fn();
      const unsubscribe = getAPI().onModeChange(callback);

      // Unsubscribe
      unsubscribe();

      // Dispatch event — callback should NOT be called
      window.dispatchEvent(
        new CustomEvent('paragon-editor-mode-change', { detail: { mode: 'markdown' } })
      );

      expect(callback).not.toHaveBeenCalled();
    });

    it('should support multiple subscribers', () => {
      const deps = createDeps();
      renderHook(() => useGlobalEditorAPI(deps));
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      getAPI().onModeChange(callback1);
      getAPI().onModeChange(callback2);

      window.dispatchEvent(
        new CustomEvent('paragon-editor-mode-change', { detail: { mode: 'wysiwyg' } })
      );

      expect(callback1).toHaveBeenCalledWith('wysiwyg');
      expect(callback2).toHaveBeenCalledWith('wysiwyg');
    });
  });

  // -------------------------------------------------------------------------
  // Mode change event dispatch
  // -------------------------------------------------------------------------

  describe('mode change event dispatch', () => {
    it('should dispatch paragon-editor-mode-change event when editorMode changes', () => {
      const listener = vi.fn();
      window.addEventListener('paragon-editor-mode-change', listener);

      const deps = createDeps({ editorMode: 'wysiwyg' });
      const { rerender } = renderHook(
        ({ deps }) => useGlobalEditorAPI(deps),
        { initialProps: { deps } },
      );

      // Clear the initial dispatch
      listener.mockClear();

      // Re-render with new mode
      const newDeps = { ...deps, editorMode: 'markdown' as const };
      rerender({ deps: newDeps });

      expect(listener).toHaveBeenCalled();
      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.detail.mode).toBe('markdown');

      window.removeEventListener('paragon-editor-mode-change', listener);
    });

    it('should dispatch event on initial render with current mode', () => {
      const listener = vi.fn();
      window.addEventListener('paragon-editor-mode-change', listener);

      const deps = createDeps({ editorMode: 'markdown' });
      renderHook(() => useGlobalEditorAPI(deps));

      expect(listener).toHaveBeenCalled();
      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.detail.mode).toBe('markdown');

      window.removeEventListener('paragon-editor-mode-change', listener);
    });
  });

  // -------------------------------------------------------------------------
  // Console logging
  // -------------------------------------------------------------------------

  describe('console logging', () => {
    it('should log API availability on mount', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const deps = createDeps();
      renderHook(() => useGlobalEditorAPI(deps));
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Paragon Editor Mode API exposed globally')
      );
      consoleSpy.mockRestore();
    });
  });
});
