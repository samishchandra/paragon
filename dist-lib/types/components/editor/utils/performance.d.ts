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
export declare function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds.
 * Uses requestAnimationFrame for smooth visual updates.
 */
export declare function throttle<T extends (...args: unknown[]) => unknown>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Creates a throttled function that uses requestAnimationFrame for visual updates.
 * Ideal for scroll handlers and position calculations.
 */
export declare function rafThrottle<T extends (...args: unknown[]) => unknown>(func: T): (...args: Parameters<T>) => void;
/**
 * Measures the execution time of a function for performance profiling.
 */
export declare function measurePerformance<T extends (...args: unknown[]) => unknown>(name: string, func: T): T;
/**
 * Creates a lazy initializer that only computes the value once.
 */
export declare function lazy<T>(factory: () => T): () => T;
/**
 * Batches multiple DOM reads/writes to avoid layout thrashing.
 * Reads are executed first, then writes.
 */
export declare class DOMBatcher {
    private reads;
    private writes;
    private scheduled;
    read(fn: () => void): void;
    write(fn: () => void): void;
    private schedule;
    private flush;
}
export declare const domBatcher: DOMBatcher;
/**
 * Checks if the document is considered "large" based on content length.
 * Used to enable/disable certain features for performance.
 */
export declare function isLargeDocument(charCount: number): boolean;
/**
 * Checks if the document is considered "very large" and needs aggressive optimizations.
 */
export declare function isVeryLargeDocument(charCount: number): boolean;
