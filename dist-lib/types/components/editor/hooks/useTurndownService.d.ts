/**
 * A wrapper that provides a synchronous .turndown() interface.
 * On first call, if the service hasn't loaded yet, it triggers a synchronous
 * fallback (returns empty string) and logs a warning. In practice, the
 * background preload ensures the service is ready before any user action.
 */
export interface LazyTurndownService {
    turndown(html: string): string;
    /** Check if the underlying service is ready */
    isReady(): boolean;
    /** Wait for the service to be ready */
    ready(): Promise<void>;
}
/**
 * Hook that returns a lazy TurndownService wrapper.
 * The actual library is loaded in the background on first mount.
 * The returned object has a synchronous .turndown() method that works
 * identically to the original TurndownService.
 */
export declare function useTurndownService(): LazyTurndownService;
