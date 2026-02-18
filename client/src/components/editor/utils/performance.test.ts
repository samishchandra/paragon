/**
 * Unit Tests for Performance Utilities
 * 
 * Tests: debounce, throttle, rafThrottle, measurePerformance,
 *        lazy, DOMBatcher, isLargeDocument, isVeryLargeDocument
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  debounce,
  throttle,
  lazy,
  DOMBatcher,
  isLargeDocument,
  isVeryLargeDocument,
} from './performance';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should delay function execution by the specified wait time', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 200);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should reset the timer on subsequent calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 200);

    debounced();
    vi.advanceTimersByTime(150);
    debounced(); // Reset timer
    vi.advanceTimersByTime(150);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments to the debounced function', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('hello', 42);
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('hello', 42);
  });

  it('should only call with the latest arguments', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('first');
    debounced('second');
    debounced('third');
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('third');
  });
});

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should execute immediately on first call', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 200);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should not execute again within the wait period', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 200);

    throttled();
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should execute trailing call after wait period', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 200);

    throttled();
    throttled(); // This should be queued
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should pass arguments correctly', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 200);

    throttled('arg1');
    expect(fn).toHaveBeenCalledWith('arg1');
  });
});

describe('lazy', () => {
  it('should compute the value only once', () => {
    const factory = vi.fn(() => 42);
    const getValue = lazy(factory);

    expect(getValue()).toBe(42);
    expect(getValue()).toBe(42);
    expect(getValue()).toBe(42);
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('should return the same reference for objects', () => {
    const obj = { key: 'value' };
    const factory = vi.fn(() => obj);
    const getValue = lazy(factory);

    expect(getValue()).toBe(obj);
    expect(getValue()).toBe(obj);
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('should handle factory returning falsy values', () => {
    const factory = vi.fn(() => 0);
    const getValue = lazy(factory);

    expect(getValue()).toBe(0);
    expect(getValue()).toBe(0);
    expect(factory).toHaveBeenCalledTimes(1);
  });
});

describe('DOMBatcher', () => {
  it('should execute queued operations', () => {
    const readFn = vi.fn();
    const writeFn = vi.fn();
    const batcher = new DOMBatcher();

    // With our synchronous rAF mock, the first schedule triggers an immediate flush.
    // The batcher's flush() runs reads first, then writes from the queue at that moment.
    batcher.read(readFn);
    batcher.write(writeFn);

    // Both should have been called since rAF is synchronous in tests
    expect(readFn).toHaveBeenCalledTimes(1);
    expect(writeFn).toHaveBeenCalledTimes(1);
  });

  it('should call read and write functions', () => {
    const results: string[] = [];
    const batcher = new DOMBatcher();

    batcher.read(() => results.push('read'));
    batcher.write(() => results.push('write'));

    expect(results).toContain('read');
    expect(results).toContain('write');
  });
});

describe('isLargeDocument', () => {
  it('should return false for small documents', () => {
    expect(isLargeDocument(0)).toBe(false);
    expect(isLargeDocument(1000)).toBe(false);
    expect(isLargeDocument(49999)).toBe(false);
  });

  it('should return false for documents at the threshold', () => {
    expect(isLargeDocument(50000)).toBe(false);
  });

  it('should return true for documents above the threshold', () => {
    expect(isLargeDocument(50001)).toBe(true);
    expect(isLargeDocument(100000)).toBe(true);
  });
});

describe('isVeryLargeDocument', () => {
  it('should return false for documents below 100k', () => {
    expect(isVeryLargeDocument(0)).toBe(false);
    expect(isVeryLargeDocument(50000)).toBe(false);
    expect(isVeryLargeDocument(99999)).toBe(false);
  });

  it('should return false for documents at the threshold', () => {
    expect(isVeryLargeDocument(100000)).toBe(false);
  });

  it('should return true for documents above 100k', () => {
    expect(isVeryLargeDocument(100001)).toBe(true);
    expect(isVeryLargeDocument(500000)).toBe(true);
  });
});
