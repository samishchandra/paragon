/**
 * Performance Utilities for Large Document Handling
 * 
 * Provides debounce, throttle, and other performance optimization utilities
 * to ensure smooth editing experience with large notes.
 */

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, wait);
  };
}

/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds.
 * Uses requestAnimationFrame for smooth visual updates.
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let lastTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = wait - (now - lastTime);

    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastTime = now;
      func.apply(this, args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastTime = Date.now();
        timeoutId = null;
        func.apply(this, args);
      }, remaining);
    }
  };
}

/**
 * Creates a throttled function that uses requestAnimationFrame for visual updates.
 * Ideal for scroll handlers and position calculations.
 */
export function rafThrottle<T extends (...args: unknown[]) => unknown>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    lastArgs = args;

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (lastArgs) {
          func.apply(this, lastArgs);
        }
        rafId = null;
      });
    }
  };
}

/**
 * Measures the execution time of a function for performance profiling.
 */
export function measurePerformance<T extends (...args: unknown[]) => unknown>(
  name: string,
  func: T
): T {
  return function (this: unknown, ...args: Parameters<T>) {
    const start = performance.now();
    const result = func.apply(this, args);
    const end = performance.now();
    
    if (end - start > 16) { // Log if takes more than one frame (16ms)
      console.warn(`[Performance] ${name} took ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
  } as T;
}

/**
 * Creates a lazy initializer that only computes the value once.
 */
export function lazy<T>(factory: () => T): () => T {
  let value: T | undefined;
  let initialized = false;

  return () => {
    if (!initialized) {
      value = factory();
      initialized = true;
    }
    return value as T;
  };
}

/**
 * Batches multiple DOM reads/writes to avoid layout thrashing.
 * Reads are executed first, then writes.
 */
export class DOMBatcher {
  private reads: (() => void)[] = [];
  private writes: (() => void)[] = [];
  private scheduled = false;

  read(fn: () => void): void {
    this.reads.push(fn);
    this.schedule();
  }

  write(fn: () => void): void {
    this.writes.push(fn);
    this.schedule();
  }

  private schedule(): void {
    if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(() => this.flush());
    }
  }

  private flush(): void {
    // Execute all reads first
    const reads = this.reads;
    this.reads = [];
    reads.forEach(fn => fn());

    // Then execute all writes
    const writes = this.writes;
    this.writes = [];
    writes.forEach(fn => fn());

    this.scheduled = false;
  }
}

// Singleton DOM batcher instance
export const domBatcher = new DOMBatcher();

/**
 * Checks if the document is considered "large" based on content length.
 * Used to enable/disable certain features for performance.
 */
export function isLargeDocument(charCount: number): boolean {
  return charCount > 50000; // 50k characters threshold
}

/**
 * Checks if the document is considered "very large" and needs aggressive optimizations.
 */
export function isVeryLargeDocument(charCount: number): boolean {
  return charCount > 100000; // 100k characters threshold
}
