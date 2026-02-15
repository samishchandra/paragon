/**
 * EditorErrorBoundary - Catches editor crashes and provides recovery options
 *
 * Adapted from Taskmate's EditorErrorBoundary for the standalone Paragon editor.
 *
 * Key behaviors:
 * - Wraps only the TipTap editor area, keeping the toolbar and footer functional
 * - Offers "Retry" to remount the editor with the same content
 * - Offers "Clear Content & Retry" as a last resort for malformed content (after 2+ retries)
 * - Shows collapsible error details for debugging
 * - Automatically resets when the content prop changes (new document loaded)
 * - Exposes onError callback so embedding apps can log/report crashes
 */
import { Component, ReactNode } from 'react';
export interface EditorErrorBoundaryProps {
    children: ReactNode;
    /** Called when the user clicks "Retry" — the parent should remount the editor */
    onRetry?: () => void;
    /** Called when the user clicks "Clear Content & Retry" — the parent should clear content and remount */
    onClearContent?: () => void;
    /** Called when an error is caught — useful for external error reporting */
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
    /** Unique key that resets the boundary when it changes (e.g., document ID) */
    resetKey?: string;
    /** Custom class name for the error fallback container */
    className?: string;
}
interface EditorErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
    showDetails: boolean;
    retryCount: number;
    copied: boolean;
}
export declare class EditorErrorBoundary extends Component<EditorErrorBoundaryProps, EditorErrorBoundaryState> {
    constructor(props: EditorErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): Partial<EditorErrorBoundaryState>;
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    componentDidUpdate(prevProps: EditorErrorBoundaryProps): void;
    handleRetry: () => void;
    handleClearContent: () => void;
    handleCopyError: () => void;
    toggleDetails: () => void;
    render(): string | number | bigint | boolean | import("react").JSX.Element | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined;
}
export {};
