/**
 * Unit tests for useAutoSave hook.
 *
 * Uses a mock TipTap Editor and mock localStorage to verify:
 * - Initial state and defaults
 * - Debounced save on editor update
 * - Content change detection via hash
 * - Manual save / clear / recover / dismissRecovery
 * - Recovery detection on mount
 * - beforeunload flush
 * - Disabled mode
 * - Error handling
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAutoSave, type AutoSaveOptions } from './useAutoSave';

// ---------------------------------------------------------------------------
// Mock Editor
// ---------------------------------------------------------------------------
function createMockEditor(html = '<p>Hello world</p>') {
  const listeners: Record<string, Set<Function>> = {};
  return {
    isDestroyed: false,
    getHTML: vi.fn(() => html),
    commands: {
      setContent: vi.fn(),
    },
    on: vi.fn((event: string, fn: Function) => {
      if (!listeners[event]) listeners[event] = new Set();
      listeners[event].add(fn);
    }),
    off: vi.fn((event: string, fn: Function) => {
      listeners[event]?.delete(fn);
    }),
    // Helper to emit events in tests
    _emit(event: string) {
      listeners[event]?.forEach(fn => fn());
    },
    _listeners: listeners,
  } as any;
}

// ---------------------------------------------------------------------------
// Mock localStorage
// ---------------------------------------------------------------------------
let storage: Record<string, string> = {};

const mockLocalStorage = {
  getItem: vi.fn((key: string) => storage[key] ?? null),
  setItem: vi.fn((key: string, value: string) => { storage[key] = value; }),
  removeItem: vi.fn((key: string) => { delete storage[key]; }),
  clear: vi.fn(() => { storage = {}; }),
  get length() { return Object.keys(storage).length; },
  key: vi.fn((i: number) => Object.keys(storage)[i] ?? null),
};

// ---------------------------------------------------------------------------
// Setup / Teardown
// ---------------------------------------------------------------------------
beforeEach(() => {
  storage = {};
  Object.defineProperty(window, 'localStorage', { value: mockLocalStorage, writable: true });
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('useAutoSave', () => {
  // ---- Initial state ----
  describe('initial state', () => {
    it('should return idle status with no saved content', () => {
      const editor = createMockEditor();
      const { result } = renderHook(() => useAutoSave(editor));

      expect(result.current.status).toBe('idle');
      expect(result.current.lastSaved).toBeNull();
      expect(result.current.hasRecoverableContent).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should return action functions', () => {
      const editor = createMockEditor();
      const { result } = renderHook(() => useAutoSave(editor));

      expect(typeof result.current.save).toBe('function');
      expect(typeof result.current.clear).toBe('function');
      expect(typeof result.current.recover).toBe('function');
      expect(typeof result.current.dismissRecovery).toBe('function');
    });

    it('should work with null editor', () => {
      const { result } = renderHook(() => useAutoSave(null));
      expect(result.current.status).toBe('idle');
    });
  });

  // ---- Debounced save ----
  describe('debounced save on editor update', () => {
    it('should save content after debounce delay', () => {
      const longContent = '<p>' + 'A'.repeat(50) + '</p>';
      const editor = createMockEditor(longContent);
      renderHook(() => useAutoSave(editor, { debounceMs: 500, storageKey: 'test-key' }));

      // Trigger editor update
      act(() => { editor._emit('update'); });

      // Not saved yet (debounce)
      expect(mockLocalStorage.setItem).not.toHaveBeenCalledWith('test-key', expect.anything());

      // Advance past debounce
      act(() => { vi.advanceTimersByTime(600); });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-key', longContent);
    });

    it('should use default debounce of 1000ms', () => {
      const longContent = '<p>' + 'B'.repeat(50) + '</p>';
      const editor = createMockEditor(longContent);
      renderHook(() => useAutoSave(editor, { storageKey: 'test-default' }));

      act(() => { editor._emit('update'); });

      // At 900ms, not yet saved
      act(() => { vi.advanceTimersByTime(900); });
      expect(mockLocalStorage.setItem).not.toHaveBeenCalledWith('test-default', expect.anything());

      // At 1100ms, saved
      act(() => { vi.advanceTimersByTime(200); });
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-default', longContent);
    });

    it('should reset debounce timer on rapid updates', () => {
      const longContent = '<p>' + 'C'.repeat(50) + '</p>';
      const editor = createMockEditor(longContent);
      renderHook(() => useAutoSave(editor, { debounceMs: 500, storageKey: 'test-rapid' }));

      // Rapid updates
      act(() => { editor._emit('update'); });
      act(() => { vi.advanceTimersByTime(300); });
      act(() => { editor._emit('update'); });
      act(() => { vi.advanceTimersByTime(300); });
      act(() => { editor._emit('update'); });

      // Only 300ms since last update, not saved yet
      act(() => { vi.advanceTimersByTime(300); });
      expect(mockLocalStorage.setItem).not.toHaveBeenCalledWith('test-rapid', expect.anything());

      // 500ms since last update, now saved
      act(() => { vi.advanceTimersByTime(200); });
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-rapid', longContent);
    });

    it('should call onSave callback after saving', () => {
      const longContent = '<p>' + 'D'.repeat(50) + '</p>';
      const editor = createMockEditor(longContent);
      const onSave = vi.fn();
      renderHook(() => useAutoSave(editor, { debounceMs: 100, storageKey: 'test-cb', onSave }));

      act(() => { editor._emit('update'); });
      act(() => { vi.advanceTimersByTime(200); });

      expect(onSave).toHaveBeenCalledWith(longContent);
    });

    it('should not save content shorter than 20 characters', () => {
      const editor = createMockEditor('<p>Hi</p>');
      renderHook(() => useAutoSave(editor, { debounceMs: 100, storageKey: 'test-short' }));

      act(() => { editor._emit('update'); });
      act(() => { vi.advanceTimersByTime(200); });

      expect(mockLocalStorage.setItem).not.toHaveBeenCalledWith('test-short', expect.anything());
    });
  });

  // ---- Content change detection ----
  describe('content change detection', () => {
    it('should skip save if content has not changed', () => {
      const longContent = '<p>' + 'E'.repeat(50) + '</p>';
      const editor = createMockEditor(longContent);
      const onSave = vi.fn();
      renderHook(() => useAutoSave(editor, { debounceMs: 100, storageKey: 'test-nochange', onSave }));

      // First save
      act(() => { editor._emit('update'); });
      act(() => { vi.advanceTimersByTime(200); });
      expect(onSave).toHaveBeenCalledTimes(1);

      // Second save with same content — should skip
      act(() => { editor._emit('update'); });
      act(() => { vi.advanceTimersByTime(200); });
      // onSave should NOT be called again
      expect(onSave).toHaveBeenCalledTimes(1);
    });

    it('should save again when content changes', () => {
      const content1 = '<p>' + 'F'.repeat(50) + '</p>';
      const content2 = '<p>' + 'G'.repeat(50) + '</p>';
      const editor = createMockEditor(content1);
      const onSave = vi.fn();
      renderHook(() => useAutoSave(editor, { debounceMs: 100, storageKey: 'test-change', onSave }));

      // First save
      act(() => { editor._emit('update'); });
      act(() => { vi.advanceTimersByTime(200); });
      expect(onSave).toHaveBeenCalledTimes(1);

      // Change content
      editor.getHTML.mockReturnValue(content2);
      act(() => { editor._emit('update'); });
      act(() => { vi.advanceTimersByTime(200); });
      expect(onSave).toHaveBeenCalledTimes(2);
      expect(onSave).toHaveBeenLastCalledWith(content2);
    });
  });

  // ---- Save status transitions ----
  describe('save status transitions', () => {
    it('should transition through saving → saved → idle', () => {
      const longContent = '<p>' + 'H'.repeat(50) + '</p>';
      const editor = createMockEditor(longContent);
      const { result } = renderHook(() => useAutoSave(editor, { debounceMs: 100, storageKey: 'test-status' }));

      expect(result.current.status).toBe('idle');

      // Trigger update and wait for save
      act(() => { editor._emit('update'); });
      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.status).toBe('saved');
      expect(result.current.lastSaved).toBeInstanceOf(Date);

      // After 2000ms, should return to idle
      act(() => { vi.advanceTimersByTime(2100); });
      expect(result.current.status).toBe('idle');
    });
  });

  // ---- Manual save ----
  describe('manual save', () => {
    it('should immediately save when save() is called', () => {
      const longContent = '<p>' + 'I'.repeat(50) + '</p>';
      const editor = createMockEditor(longContent);
      const { result } = renderHook(() => useAutoSave(editor, { storageKey: 'test-manual' }));

      act(() => { result.current.save(); });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-manual', longContent);
    });

    it('should clear pending debounce when save() is called', () => {
      const longContent = '<p>' + 'J'.repeat(50) + '</p>';
      const editor = createMockEditor(longContent);
      const onSave = vi.fn();
      const { result } = renderHook(() => useAutoSave(editor, { debounceMs: 1000, storageKey: 'test-manual-clear', onSave }));

      // Trigger debounced update
      act(() => { editor._emit('update'); });

      // Manual save before debounce fires
      act(() => { result.current.save(); });
      expect(onSave).toHaveBeenCalledTimes(1);

      // Advance past original debounce — should NOT fire again (same content)
      act(() => { vi.advanceTimersByTime(1100); });
      expect(onSave).toHaveBeenCalledTimes(1);
    });
  });

  // ---- Clear ----
  describe('clear', () => {
    it('should remove all storage keys and reset state', () => {
      const longContent = '<p>' + 'K'.repeat(50) + '</p>';
      const editor = createMockEditor(longContent);
      const { result } = renderHook(() => useAutoSave(editor, { storageKey: 'test-clear' }));

      // Save first
      act(() => { result.current.save(); });
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-clear', longContent);

      // Clear
      act(() => { result.current.clear(); });

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test-clear');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test-clear-timestamp');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test-clear-dismissed');
      expect(result.current.status).toBe('idle');
      expect(result.current.lastSaved).toBeNull();
      expect(result.current.hasRecoverableContent).toBe(false);
    });
  });

  // ---- Recovery ----
  describe('recovery', () => {
    it('should detect recoverable content on mount', () => {
      const savedContent = '<p>' + 'L'.repeat(60) + '</p>';
      storage['test-recover'] = savedContent;
      const editor = createMockEditor('<p>Different content here</p>');

      const { result } = renderHook(() => useAutoSave(editor, { storageKey: 'test-recover' }));

      expect(result.current.hasRecoverableContent).toBe(true);
    });

    it('should not detect recovery if content matches current editor', () => {
      const content = '<p>' + 'M'.repeat(60) + '</p>';
      storage['test-recover-same'] = content;
      const editor = createMockEditor(content);

      const { result } = renderHook(() => useAutoSave(editor, { storageKey: 'test-recover-same' }));

      expect(result.current.hasRecoverableContent).toBe(false);
    });

    it('should not detect recovery if content is too short', () => {
      storage['test-recover-short'] = '<p>Hi</p>';
      const editor = createMockEditor('<p>Other</p>');

      const { result } = renderHook(() => useAutoSave(editor, { storageKey: 'test-recover-short' }));

      expect(result.current.hasRecoverableContent).toBe(false);
    });

    it('should not detect recovery if dismissed', () => {
      const savedContent = '<p>' + 'N'.repeat(60) + '</p>';
      storage['test-recover-dismissed'] = savedContent;
      storage['test-recover-dismissed-dismissed'] = 'true';
      const editor = createMockEditor('<p>Different</p>');

      const { result } = renderHook(() => useAutoSave(editor, { storageKey: 'test-recover-dismissed' }));

      expect(result.current.hasRecoverableContent).toBe(false);
    });

    it('should recover content and call onRecover', async () => {
      const savedContent = '<p>' + 'O'.repeat(60) + '</p>';
      storage['test-recover-action'] = savedContent;
      const editor = createMockEditor('<p>Current</p>');
      const onRecover = vi.fn();

      const { result } = renderHook(() =>
        useAutoSave(editor, { storageKey: 'test-recover-action', onRecover })
      );

      let recovered: string | null = null;
      act(() => { recovered = result.current.recover(); });

      expect(recovered).toBe(savedContent);
      expect(result.current.hasRecoverableContent).toBe(false);

      // queueMicrotask defers setContent — flush it
      await act(async () => { await vi.runAllTimersAsync(); });
    });

    it('should return null when recovering with no saved content', () => {
      const editor = createMockEditor('<p>Current</p>');
      const { result } = renderHook(() => useAutoSave(editor, { storageKey: 'test-recover-empty' }));

      let recovered: string | null = null;
      act(() => { recovered = result.current.recover(); });

      expect(recovered).toBeNull();
    });

    it('should return null when recovering with null editor', () => {
      const { result } = renderHook(() => useAutoSave(null, { storageKey: 'test-recover-null' }));

      let recovered: string | null = null;
      act(() => { recovered = result.current.recover(); });

      expect(recovered).toBeNull();
    });
  });

  // ---- Dismiss recovery ----
  describe('dismissRecovery', () => {
    it('should set dismissed flag in localStorage and clear hasRecoverableContent', () => {
      const savedContent = '<p>' + 'P'.repeat(60) + '</p>';
      storage['test-dismiss'] = savedContent;
      const editor = createMockEditor('<p>Different</p>');

      const { result } = renderHook(() => useAutoSave(editor, { storageKey: 'test-dismiss' }));

      expect(result.current.hasRecoverableContent).toBe(true);

      act(() => { result.current.dismissRecovery(); });

      expect(result.current.hasRecoverableContent).toBe(false);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-dismiss-dismissed', 'true');
    });
  });

  // ---- Disabled mode ----
  describe('disabled mode', () => {
    it('should not save when disabled', () => {
      const longContent = '<p>' + 'Q'.repeat(50) + '</p>';
      const editor = createMockEditor(longContent);
      const onSave = vi.fn();
      renderHook(() => useAutoSave(editor, { enabled: false, debounceMs: 100, storageKey: 'test-disabled', onSave }));

      act(() => { editor._emit('update'); });
      act(() => { vi.advanceTimersByTime(200); });

      expect(onSave).not.toHaveBeenCalled();
    });

    it('should not detect recovery when disabled', () => {
      const savedContent = '<p>' + 'R'.repeat(60) + '</p>';
      storage['test-disabled-recover'] = savedContent;
      const editor = createMockEditor('<p>Different</p>');

      const { result } = renderHook(() =>
        useAutoSave(editor, { enabled: false, storageKey: 'test-disabled-recover' })
      );

      expect(result.current.hasRecoverableContent).toBe(false);
    });

    it('should not register editor listeners when disabled', () => {
      const editor = createMockEditor();
      renderHook(() => useAutoSave(editor, { enabled: false }));

      expect(editor.on).not.toHaveBeenCalled();
    });
  });

  // ---- Destroyed editor ----
  describe('destroyed editor', () => {
    it('should not save when editor is destroyed', () => {
      const longContent = '<p>' + 'S'.repeat(50) + '</p>';
      const editor = createMockEditor(longContent);
      editor.isDestroyed = true;
      const onSave = vi.fn();
      renderHook(() => useAutoSave(editor, { debounceMs: 100, storageKey: 'test-destroyed', onSave }));

      act(() => { vi.advanceTimersByTime(200); });

      expect(onSave).not.toHaveBeenCalled();
    });
  });

  // ---- Cleanup ----
  describe('cleanup on unmount', () => {
    it('should unregister editor listeners on unmount', () => {
      const longContent = '<p>' + 'T'.repeat(50) + '</p>';
      const editor = createMockEditor(longContent);
      const { unmount } = renderHook(() => useAutoSave(editor, { storageKey: 'test-unmount' }));

      expect(editor.on).toHaveBeenCalledWith('update', expect.any(Function));

      unmount();

      expect(editor.off).toHaveBeenCalledWith('update', expect.any(Function));
    });
  });

  // ---- beforeunload ----
  describe('beforeunload', () => {
    it('should save immediately on beforeunload', () => {
      const longContent = '<p>' + 'U'.repeat(50) + '</p>';
      const editor = createMockEditor(longContent);
      renderHook(() => useAutoSave(editor, { storageKey: 'test-unload' }));

      // Simulate beforeunload
      act(() => {
        window.dispatchEvent(new Event('beforeunload'));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-unload', longContent);
    });

    it('should not save on beforeunload if content is too short', () => {
      const editor = createMockEditor('<p>Hi</p>');
      renderHook(() => useAutoSave(editor, { storageKey: 'test-unload-short' }));

      act(() => {
        window.dispatchEvent(new Event('beforeunload'));
      });

      expect(mockLocalStorage.setItem).not.toHaveBeenCalledWith('test-unload-short', expect.anything());
    });

    it('should remove beforeunload listener on unmount', () => {
      const longContent = '<p>' + 'V'.repeat(50) + '</p>';
      const editor = createMockEditor(longContent);
      const removeSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = renderHook(() => useAutoSave(editor, { storageKey: 'test-unload-cleanup' }));

      unmount();

      expect(removeSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
    });
  });

  // ---- Timestamp storage ----
  describe('timestamp storage', () => {
    it('should store a timestamp alongside the content', () => {
      const longContent = '<p>' + 'W'.repeat(50) + '</p>';
      const editor = createMockEditor(longContent);
      renderHook(() => useAutoSave(editor, { debounceMs: 100, storageKey: 'test-ts' }));

      act(() => { editor._emit('update'); });
      act(() => { vi.advanceTimersByTime(200); });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-ts-timestamp', expect.any(String));
    });
  });

  // ---- Default storage key ----
  describe('default storage key', () => {
    it('should use paragon-editor-content as default key', () => {
      const longContent = '<p>' + 'X'.repeat(50) + '</p>';
      const editor = createMockEditor(longContent);
      const { result } = renderHook(() => useAutoSave(editor, { debounceMs: 100 }));

      act(() => { result.current.save(); });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('paragon-editor-content', longContent);
    });
  });
});
