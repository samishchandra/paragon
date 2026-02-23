/**
 * Unit tests for useWordCount hook.
 *
 * Uses a mock TipTap Editor to verify:
 * - Initial state and defaults
 * - Word, character, and reading time calculation
 * - Extended stats (paragraphs, sentences)
 * - Debounced recalculation on editor update
 * - Skip recalculation when text hasn't changed
 * - Disabled mode
 * - Cleanup on unmount
 * - Edge cases (empty text, single word, whitespace-only)
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWordCount, type UseWordCountOptions } from './useWordCount';

// ---------------------------------------------------------------------------
// Mock Editor
// ---------------------------------------------------------------------------
function createMockEditor(text = 'Hello world') {
  const listeners: Record<string, Set<Function>> = {};
  return {
    isDestroyed: false,
    getText: vi.fn(() => text),
    on: vi.fn((event: string, fn: Function) => {
      if (!listeners[event]) listeners[event] = new Set();
      listeners[event].add(fn);
    }),
    off: vi.fn((event: string, fn: Function) => {
      listeners[event]?.delete(fn);
    }),
    _emit(event: string) {
      listeners[event]?.forEach(fn => fn());
    },
    _listeners: listeners,
  } as any;
}

// ---------------------------------------------------------------------------
// Setup / Teardown
// ---------------------------------------------------------------------------
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('useWordCount', () => {
  // ---- Initial state ----
  describe('initial state', () => {
    it('should return zero counts before calculation completes', () => {
      const editor = createMockEditor('Hello world');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 500 }));

      // Before debounce fires, counts are still zero but isCalculating may be true
      expect(result.current.words).toBe(0);
      expect(result.current.characters).toBe(0);
    });

    it('should work with null editor', () => {
      const { result } = renderHook(() => useWordCount(null));
      expect(result.current.words).toBe(0);
      expect(result.current.characters).toBe(0);
      expect(result.current.isCalculating).toBe(false);
    });
  });

  // ---- Basic word count ----
  describe('basic word count', () => {
    it('should count words correctly after debounce', () => {
      const editor = createMockEditor('Hello world foo bar');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.words).toBe(4);
      expect(result.current.isCalculating).toBe(false);
    });

    it('should count a single word', () => {
      const editor = createMockEditor('Hello');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.words).toBe(1);
    });

    it('should return 0 words for empty text', () => {
      const editor = createMockEditor('');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.words).toBe(0);
    });

    it('should return 0 words for whitespace-only text', () => {
      const editor = createMockEditor('   \n\t  ');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.words).toBe(0);
    });

    it('should handle text with multiple spaces between words', () => {
      const editor = createMockEditor('Hello    world   foo');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.words).toBe(3);
    });

    it('should handle text with newlines', () => {
      const editor = createMockEditor('Hello\nworld\nfoo');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.words).toBe(3);
    });
  });

  // ---- Character count ----
  describe('character count', () => {
    it('should count characters without spaces', () => {
      const editor = createMockEditor('Hello world');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      // "Helloworld" = 10 characters (no spaces)
      expect(result.current.characters).toBe(10);
    });

    it('should count characters with spaces', () => {
      const editor = createMockEditor('Hello world');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      // "Hello world" = 11 characters (with space)
      expect(result.current.charactersWithSpaces).toBe(11);
    });

    it('should return 0 characters for empty text', () => {
      const editor = createMockEditor('');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.characters).toBe(0);
      expect(result.current.charactersWithSpaces).toBe(0);
    });
  });

  // ---- Reading time ----
  describe('reading time', () => {
    it('should calculate reading time (minimum 1 minute)', () => {
      const editor = createMockEditor('Hello world');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      // 2 words / 200 wpm = 0.01 min → ceil → 1 min minimum
      expect(result.current.readingTime).toBe(1);
    });

    it('should calculate reading time for longer text', () => {
      // 400 words → 400/200 = 2 minutes
      const words = Array(400).fill('word').join(' ');
      const editor = createMockEditor(words);
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.readingTime).toBe(2);
    });

    it('should round up reading time', () => {
      // 250 words → 250/200 = 1.25 → ceil → 2 minutes
      const words = Array(250).fill('word').join(' ');
      const editor = createMockEditor(words);
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.readingTime).toBe(2);
    });
  });

  // ---- Extended stats ----
  describe('extended stats', () => {
    it('should not calculate paragraphs and sentences by default', () => {
      const editor = createMockEditor('First paragraph.\n\nSecond paragraph.');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.paragraphs).toBe(0);
      expect(result.current.sentences).toBe(0);
    });

    it('should count paragraphs when extendedStats is enabled', () => {
      const editor = createMockEditor('First paragraph.\n\nSecond paragraph.\n\nThird paragraph.');
      const { result } = renderHook(() =>
        useWordCount(editor, { debounceMs: 100, extendedStats: true })
      );

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.paragraphs).toBe(3);
    });

    it('should count sentences when extendedStats is enabled', () => {
      const editor = createMockEditor('Hello world. How are you? I am fine! Great.');
      const { result } = renderHook(() =>
        useWordCount(editor, { debounceMs: 100, extendedStats: true })
      );

      act(() => { vi.advanceTimersByTime(200); });

      // 4 sentence-ending punctuation marks: . ? ! .
      expect(result.current.sentences).toBe(4);
    });

    it('should return 0 paragraphs for empty text with extendedStats', () => {
      const editor = createMockEditor('');
      const { result } = renderHook(() =>
        useWordCount(editor, { debounceMs: 100, extendedStats: true })
      );

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.paragraphs).toBe(0);
      expect(result.current.sentences).toBe(0);
    });

    it('should handle single paragraph with no double newlines', () => {
      const editor = createMockEditor('Just one paragraph with some text.');
      const { result } = renderHook(() =>
        useWordCount(editor, { debounceMs: 100, extendedStats: true })
      );

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.paragraphs).toBe(1);
      expect(result.current.sentences).toBe(1);
    });
  });

  // ---- Debounced recalculation ----
  describe('debounced recalculation', () => {
    it('should recalculate on editor update after debounce', () => {
      const editor = createMockEditor('Hello world');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 200 }));

      // Initial calculation
      act(() => { vi.advanceTimersByTime(300); });
      expect(result.current.words).toBe(2);

      // Update content
      editor.getText.mockReturnValue('Hello world foo bar baz');
      act(() => { editor._emit('update'); });

      // Before debounce, still calculating
      expect(result.current.isCalculating).toBe(true);

      act(() => { vi.advanceTimersByTime(300); });
      expect(result.current.words).toBe(5);
      expect(result.current.isCalculating).toBe(false);
    });

    it('should use default debounce of 500ms', () => {
      const editor = createMockEditor('Hello world');
      const { result } = renderHook(() => useWordCount(editor));

      // At 400ms, not yet calculated
      act(() => { vi.advanceTimersByTime(400); });
      expect(result.current.words).toBe(0);

      // At 600ms, calculated
      act(() => { vi.advanceTimersByTime(200); });
      expect(result.current.words).toBe(2);
    });

    it('should reset debounce timer on rapid updates', () => {
      const editor = createMockEditor('Hello');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 300 }));

      // Rapid updates
      act(() => { vi.advanceTimersByTime(200); });
      editor.getText.mockReturnValue('Hello world');
      act(() => { editor._emit('update'); });
      act(() => { vi.advanceTimersByTime(200); });
      editor.getText.mockReturnValue('Hello world foo');
      act(() => { editor._emit('update'); });

      // Only 200ms since last update, not yet recalculated
      act(() => { vi.advanceTimersByTime(200); });
      // The initial calculation may have fired, but the latest update hasn't
      // After full debounce from last update:
      act(() => { vi.advanceTimersByTime(200); });
      expect(result.current.words).toBe(3);
    });
  });

  // ---- Skip unchanged text ----
  describe('skip unchanged text', () => {
    it('should skip recalculation if text has not changed', () => {
      const editor = createMockEditor('Hello world');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      // Initial calculation
      act(() => { vi.advanceTimersByTime(200); });
      expect(result.current.words).toBe(2);

      const getTextCallCount = editor.getText.mock.calls.length;

      // Trigger update with same text
      act(() => { editor._emit('update'); });
      act(() => { vi.advanceTimersByTime(200); });

      // getText was called again but result should be the same
      expect(result.current.words).toBe(2);
    });
  });

  // ---- Disabled mode ----
  describe('disabled mode', () => {
    it('should not calculate when disabled', () => {
      const editor = createMockEditor('Hello world');
      const { result } = renderHook(() =>
        useWordCount(editor, { enabled: false, debounceMs: 100 })
      );

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.words).toBe(0);
      expect(result.current.isCalculating).toBe(false);
    });

    it('should not register editor listeners when disabled', () => {
      const editor = createMockEditor('Hello world');
      renderHook(() => useWordCount(editor, { enabled: false }));

      expect(editor.on).not.toHaveBeenCalled();
    });
  });

  // ---- Cleanup on unmount ----
  describe('cleanup on unmount', () => {
    it('should unregister editor listeners on unmount', () => {
      const editor = createMockEditor('Hello world');
      const { unmount } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      expect(editor.on).toHaveBeenCalledWith('update', expect.any(Function));

      unmount();

      expect(editor.off).toHaveBeenCalledWith('update', expect.any(Function));
    });
  });

  // ---- Edge cases ----
  describe('edge cases', () => {
    it('should handle text with only punctuation', () => {
      const editor = createMockEditor('...');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.words).toBe(1); // "..." is one "word" token
      expect(result.current.characters).toBe(3);
    });

    it('should handle very long text', () => {
      const longText = Array(1000).fill('word').join(' ');
      const editor = createMockEditor(longText);
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.words).toBe(1000);
      expect(result.current.readingTime).toBe(5); // 1000/200 = 5 min
    });

    it('should handle text with leading/trailing whitespace', () => {
      const editor = createMockEditor('  Hello world  ');
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.words).toBe(2);
      expect(result.current.characters).toBe(10); // trimmed, no spaces
      expect(result.current.charactersWithSpaces).toBe(15); // full length including leading/trailing
    });

    it('should handle text with tabs and mixed whitespace', () => {
      const editor = createMockEditor("Hello\t\tworld\n\nfoo");
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      act(() => { vi.advanceTimersByTime(200); });

      expect(result.current.words).toBe(3);
    });

    it('should handle editor.getText throwing an error', () => {
      const editor = createMockEditor('Hello');
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { result } = renderHook(() => useWordCount(editor, { debounceMs: 100 }));

      // Make getText throw on the next call
      editor.getText.mockImplementation(() => { throw new Error('Editor error'); });
      act(() => { editor._emit('update'); });
      act(() => { vi.advanceTimersByTime(200); });

      // Should not crash, isCalculating should be false
      expect(result.current.isCalculating).toBe(false);
      consoleSpy.mockRestore();
    });
  });
});
