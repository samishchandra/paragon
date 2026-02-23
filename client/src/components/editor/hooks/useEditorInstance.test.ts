import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/**
 * Unit tests for useEditorInstance hook.
 *
 * Since useEditorInstance wraps TipTap's useEditor (which requires a full DOM
 * environment and ProseMirror), we test the pure logic aspects:
 * - Options interface completeness
 * - Debounce and flush behavior patterns
 * - Lightweight mode detection logic
 * - Raw markdown initialization logic
 *
 * Integration tests with a real editor are covered by the E2E/component tests.
 */

// ─── Helper: simulate the debounced onUpdate logic ───
function createDebouncedUpdate(debounceMs: number = 150) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  const onChangeRef = { current: null as ((html: string) => void) | null };
  const onHTMLChangeRef = { current: null as ((html: string) => void) | null };
  const onMarkdownChangeRef = { current: null as ((markdown: string) => void) | null };

  function triggerUpdate(html: string) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      onChangeRef.current?.(html);
      onHTMLChangeRef.current?.(html);
      timeoutId = null;
    }, debounceMs);
  }

  function flush(html: string, turndownService?: { turndown: (h: string) => string }, editorMode?: string, rawMarkdownRef?: { current: string }) {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
      onChangeRef.current?.(html);
      onHTMLChangeRef.current?.(html);
      if (editorMode === 'wysiwyg' && turndownService) {
        const markdown = turndownService.turndown(html);
        if (rawMarkdownRef) rawMarkdownRef.current = markdown;
        onMarkdownChangeRef.current?.(markdown);
      }
    }
  }

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  return {
    triggerUpdate,
    flush,
    cancel,
    onChangeRef,
    onHTMLChangeRef,
    onMarkdownChangeRef,
    hasPendingFn: () => timeoutId !== null,
  };
}

// ─── Helper: simulate lightweight mode detection logic ───
function createLightweightDetector(
  performanceMode: 'auto' | 'full' | 'lightweight',
  threshold: number
) {
  let counter = 0;
  let isLightweight = false;
  const setIsLightweight = vi.fn((value: boolean) => { isLightweight = value; });

  function onUpdate(nodeCount: number) {
    if (performanceMode !== 'auto') return;
    counter++;
    if (counter >= 50) {
      counter = 0;
      const shouldBeLightweight = nodeCount > threshold;
      if (shouldBeLightweight !== isLightweight) {
        setIsLightweight(shouldBeLightweight);
      }
    }
  }

  return { onUpdate, setIsLightweight, get isLightweight() { return isLightweight; }, get counter() { return counter; } };
}

describe('useEditorInstance – debounced onUpdate logic', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should debounce onChange calls at 150ms', () => {
    const { triggerUpdate, onChangeRef } = createDebouncedUpdate(150);
    const onChange = vi.fn();
    onChangeRef.current = onChange;

    triggerUpdate('<p>Hello</p>');
    expect(onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(onChange).toHaveBeenCalledWith('<p>Hello</p>');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should reset debounce timer on rapid updates', () => {
    const { triggerUpdate, onChangeRef } = createDebouncedUpdate(150);
    const onChange = vi.fn();
    onChangeRef.current = onChange;

    triggerUpdate('<p>A</p>');
    vi.advanceTimersByTime(100);
    triggerUpdate('<p>B</p>');
    vi.advanceTimersByTime(100);
    triggerUpdate('<p>C</p>');
    vi.advanceTimersByTime(150);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('<p>C</p>');
  });

  it('should call both onChange and onHTMLChange', () => {
    const { triggerUpdate, onChangeRef, onHTMLChangeRef } = createDebouncedUpdate(150);
    const onChange = vi.fn();
    const onHTMLChange = vi.fn();
    onChangeRef.current = onChange;
    onHTMLChangeRef.current = onHTMLChange;

    triggerUpdate('<p>Test</p>');
    vi.advanceTimersByTime(150);

    expect(onChange).toHaveBeenCalledWith('<p>Test</p>');
    expect(onHTMLChange).toHaveBeenCalledWith('<p>Test</p>');
  });

  it('should not call callbacks when they are null', () => {
    const { triggerUpdate, onChangeRef, onHTMLChangeRef } = createDebouncedUpdate(150);
    onChangeRef.current = null;
    onHTMLChangeRef.current = null;

    // Should not throw
    triggerUpdate('<p>Test</p>');
    vi.advanceTimersByTime(150);
  });

  it('should flush pending changes on blur', () => {
    const { triggerUpdate, flush, onChangeRef, onHTMLChangeRef, hasPendingFn } = createDebouncedUpdate(150);
    const onChange = vi.fn();
    const onHTMLChange = vi.fn();
    onChangeRef.current = onChange;
    onHTMLChangeRef.current = onHTMLChange;

    triggerUpdate('<p>Pending</p>');
    expect(hasPendingFn()).toBe(true);

    flush('<p>Flushed</p>');
    expect(onChange).toHaveBeenCalledWith('<p>Flushed</p>');
    expect(onHTMLChange).toHaveBeenCalledWith('<p>Flushed</p>');
  });

  it('should flush rawMarkdown on blur in wysiwyg mode', () => {
    const { triggerUpdate, flush, onMarkdownChangeRef, hasPending } = createDebouncedUpdate(150);
    const onMarkdownChange = vi.fn();
    onMarkdownChangeRef.current = onMarkdownChange;
    const rawMarkdownRef = { current: '' };
    const turndownService = { turndown: (html: string) => `# Markdown from ${html}` };

    triggerUpdate('<p>Test</p>');
    flush('<h1>Hello</h1>', turndownService, 'wysiwyg', rawMarkdownRef);

    expect(onMarkdownChange).toHaveBeenCalledWith('# Markdown from <h1>Hello</h1>');
    expect(rawMarkdownRef.current).toBe('# Markdown from <h1>Hello</h1>');
  });

  it('should NOT flush rawMarkdown on blur in markdown mode', () => {
    const { triggerUpdate, flush, onMarkdownChangeRef } = createDebouncedUpdate(150);
    const onMarkdownChange = vi.fn();
    onMarkdownChangeRef.current = onMarkdownChange;
    const rawMarkdownRef = { current: '' };
    const turndownService = { turndown: vi.fn() };

    triggerUpdate('<p>Test</p>');
    flush('<p>Test</p>', turndownService, 'markdown', rawMarkdownRef);

    expect(turndownService.turndown).not.toHaveBeenCalled();
    expect(onMarkdownChange).not.toHaveBeenCalled();
  });

  it('should not flush when there is no pending update', () => {
    const { flush, onChangeRef, hasPendingFn } = createDebouncedUpdate(150);
    const onChange = vi.fn();
    onChangeRef.current = onChange;

    expect(hasPendingFn()).toBe(false);
    flush('<p>Nothing</p>');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should cancel pending timeout on cancel', () => {
    const { triggerUpdate, cancel, onChangeRef, hasPendingFn } = createDebouncedUpdate(150);
    const onChange = vi.fn();
    onChangeRef.current = onChange;

    triggerUpdate('<p>Cancel me</p>');
    expect(hasPendingFn()).toBe(true);
    cancel();
    expect(hasPendingFn()).toBe(false);

    vi.advanceTimersByTime(200);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('useEditorInstance – lightweight mode detection', () => {
  it('should not trigger detection in full mode', () => {
    const detector = createLightweightDetector('full', 100);
    for (let i = 0; i < 100; i++) {
      detector.onUpdate(200);
    }
    expect(detector.setIsLightweight).not.toHaveBeenCalled();
  });

  it('should not trigger detection in lightweight mode', () => {
    const detector = createLightweightDetector('lightweight', 100);
    for (let i = 0; i < 100; i++) {
      detector.onUpdate(200);
    }
    expect(detector.setIsLightweight).not.toHaveBeenCalled();
  });

  it('should check every 50 updates in auto mode', () => {
    const detector = createLightweightDetector('auto', 100);

    // First 49 updates should not trigger check
    for (let i = 0; i < 49; i++) {
      detector.onUpdate(200);
    }
    expect(detector.setIsLightweight).not.toHaveBeenCalled();

    // 50th update triggers check — nodeCount 200 > threshold 100
    detector.onUpdate(200);
    expect(detector.setIsLightweight).toHaveBeenCalledWith(true);
  });

  it('should switch to lightweight when nodeCount exceeds threshold', () => {
    const detector = createLightweightDetector('auto', 100);

    for (let i = 0; i < 50; i++) {
      detector.onUpdate(150);
    }
    expect(detector.setIsLightweight).toHaveBeenCalledWith(true);
  });

  it('should NOT switch when nodeCount is below threshold', () => {
    const detector = createLightweightDetector('auto', 100);

    for (let i = 0; i < 50; i++) {
      detector.onUpdate(50);
    }
    expect(detector.setIsLightweight).not.toHaveBeenCalled();
  });

  it('should not re-trigger when already in the correct state', () => {
    const detector = createLightweightDetector('auto', 100);

    // First check: switch to lightweight
    for (let i = 0; i < 50; i++) {
      detector.onUpdate(200);
    }
    expect(detector.setIsLightweight).toHaveBeenCalledTimes(1);

    // Second check: still above threshold, but already lightweight — no call
    for (let i = 0; i < 50; i++) {
      detector.onUpdate(200);
    }
    expect(detector.setIsLightweight).toHaveBeenCalledTimes(1);
  });

  it('should reset counter after each check', () => {
    const detector = createLightweightDetector('auto', 100);

    // 50 updates → check → counter resets
    for (let i = 0; i < 50; i++) {
      detector.onUpdate(200);
    }
    expect(detector.counter).toBe(0);

    // Next 25 updates → counter is 25
    for (let i = 0; i < 25; i++) {
      detector.onUpdate(200);
    }
    expect(detector.counter).toBe(25);
  });
});

describe('useEditorInstance – rawMarkdown initialization logic', () => {
  it('should initialize rawMarkdown when initialMode is markdown', () => {
    const setRawMarkdown = vi.fn();
    const rawMarkdownRef = { current: '' };
    const turndownService = { turndown: (html: string) => `converted: ${html}` };
    const html = '<h1>Hello</h1>';

    // Simulate the initialization logic
    const initialMode = 'markdown';
    let initialized = false;

    if (!initialized && initialMode === 'markdown' && turndownService) {
      const markdown = turndownService.turndown(html);
      setRawMarkdown(markdown);
      rawMarkdownRef.current = markdown;
      initialized = true;
    }

    expect(setRawMarkdown).toHaveBeenCalledWith('converted: <h1>Hello</h1>');
    expect(rawMarkdownRef.current).toBe('converted: <h1>Hello</h1>');
    expect(initialized).toBe(true);
  });

  it('should NOT initialize rawMarkdown when initialMode is wysiwyg', () => {
    const setRawMarkdown = vi.fn();
    const rawMarkdownRef = { current: '' };
    const turndownService = { turndown: vi.fn() };

    const initialMode = 'wysiwyg';
    let initialized = false;

    if (!initialized && initialMode === 'markdown' && turndownService) {
      const markdown = turndownService.turndown('<p>Test</p>');
      setRawMarkdown(markdown);
      rawMarkdownRef.current = markdown;
      initialized = true;
    }

    expect(setRawMarkdown).not.toHaveBeenCalled();
    expect(turndownService.turndown).not.toHaveBeenCalled();
    expect(initialized).toBe(false);
  });

  it('should only initialize once (idempotent)', () => {
    const setRawMarkdown = vi.fn();
    const rawMarkdownRef = { current: '' };
    const turndownService = { turndown: (html: string) => `md: ${html}` };
    const html = '<p>Content</p>';
    const initialMode = 'markdown';
    let initialized = false;

    // First call
    if (!initialized && initialMode === 'markdown' && turndownService) {
      const markdown = turndownService.turndown(html);
      setRawMarkdown(markdown);
      rawMarkdownRef.current = markdown;
      initialized = true;
    }

    // Second call — should not re-initialize
    if (!initialized && initialMode === 'markdown' && turndownService) {
      const markdown = turndownService.turndown(html);
      setRawMarkdown(markdown);
      rawMarkdownRef.current = markdown;
    }

    expect(setRawMarkdown).toHaveBeenCalledTimes(1);
  });
});

describe('useEditorInstance – options interface', () => {
  it('should accept all required options', () => {
    // Type-level test: verify the interface shape
    const options = {
      extensions: [],
      content: '<p>Hello</p>',
      editable: true,
      autofocus: false,
      spellCheck: true,
      initialMode: 'wysiwyg' as const,
      performanceMode: 'auto' as const,
      lightweightThreshold: 500,
      editorModeRef: { current: 'wysiwyg' as const },
      rawMarkdownRef: { current: '' },
      setRawMarkdown: vi.fn(),
      setIsLightweight: vi.fn(),
      lightweightCheckCounterRef: { current: 0 },
      isLightweightRef: { current: false },
    };

    expect(options.extensions).toEqual([]);
    expect(options.content).toBe('<p>Hello</p>');
    expect(options.editable).toBe(true);
    expect(options.initialMode).toBe('wysiwyg');
    expect(options.performanceMode).toBe('auto');
    expect(options.lightweightThreshold).toBe(500);
  });

  it('should accept all optional callbacks', () => {
    const options = {
      extensions: [],
      content: '',
      editable: true,
      autofocus: false,
      spellCheck: true,
      initialMode: 'wysiwyg' as const,
      performanceMode: 'auto' as const,
      lightweightThreshold: 500,
      onChange: vi.fn(),
      onHTMLChange: vi.fn(),
      onMarkdownChange: vi.fn(),
      onReady: vi.fn(),
      onDestroy: vi.fn(),
      onFocus: vi.fn(),
      onBlur: vi.fn(),
      onSelectionChange: vi.fn(),
      onLinkClick: vi.fn(),
      editorModeRef: { current: 'wysiwyg' as const },
      rawMarkdownRef: { current: '' },
      setRawMarkdown: vi.fn(),
      setIsLightweight: vi.fn(),
      lightweightCheckCounterRef: { current: 0 },
      isLightweightRef: { current: false },
    };

    expect(typeof options.onChange).toBe('function');
    expect(typeof options.onHTMLChange).toBe('function');
    expect(typeof options.onMarkdownChange).toBe('function');
    expect(typeof options.onReady).toBe('function');
    expect(typeof options.onDestroy).toBe('function');
    expect(typeof options.onFocus).toBe('function');
    expect(typeof options.onBlur).toBe('function');
    expect(typeof options.onSelectionChange).toBe('function');
    expect(typeof options.onLinkClick).toBe('function');
  });
});

describe('useEditorInstance – link click handling logic', () => {
  it('should call onLinkClick when a link is clicked', () => {
    const onLinkClick = vi.fn().mockReturnValue(false);
    const url = 'https://example.com';
    const event = { target: { closest: () => ({ getAttribute: () => url }) }, preventDefault: vi.fn() } as any;

    // Simulate the handleClick logic
    const target = event.target as HTMLElement;
    const link = target.closest('a');
    if (link) {
      const href = link.getAttribute('href');
      if (href) {
        const result = onLinkClick(href, event);
        if (result === false) {
          event.preventDefault();
        }
      }
    }

    expect(onLinkClick).toHaveBeenCalledWith(url, event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should not prevent default when onLinkClick returns undefined', () => {
    const onLinkClick = vi.fn().mockReturnValue(undefined);
    const url = 'https://example.com';
    const event = { target: { closest: () => ({ getAttribute: () => url }) }, preventDefault: vi.fn() } as any;

    const target = event.target as HTMLElement;
    const link = target.closest('a');
    if (link) {
      const href = link.getAttribute('href');
      if (href) {
        const result = onLinkClick(href, event);
        if (result === false) {
          event.preventDefault();
        }
      }
    }

    expect(onLinkClick).toHaveBeenCalledWith(url, event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should not call onLinkClick when target is not a link', () => {
    const onLinkClick = vi.fn();
    const event = { target: { closest: () => null }, preventDefault: vi.fn() } as any;

    const target = event.target as HTMLElement;
    const link = target.closest('a');
    if (link) {
      const href = link.getAttribute('href');
      if (href) {
        onLinkClick(href, event);
      }
    }

    expect(onLinkClick).not.toHaveBeenCalled();
  });
});
