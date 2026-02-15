export interface PerformanceProfilerProps {
    /** Whether the profiler panel is visible. Fully controlled by the embedding application. */
    visible: boolean;
    /** Callback when the user clicks the close button inside the profiler. The embedding app should set `visible` to false. */
    onClose?: () => void;
    /** The TipTap editor instance to monitor transactions. */
    editor?: any;
}
export declare function incrementRenderCount(): void;
export declare function recordTransaction(duration: number): void;
export declare const PerformanceProfiler: import("react").NamedExoticComponent<PerformanceProfilerProps>;
export default PerformanceProfiler;
