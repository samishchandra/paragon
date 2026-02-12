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
import { AlertTriangle, RotateCcw, Trash2, ChevronDown, ChevronRight, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

export class EditorErrorBoundary extends Component<EditorErrorBoundaryProps, EditorErrorBoundaryState> {
  constructor(props: EditorErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
      retryCount: 0,
      copied: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<EditorErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    console.error('[Paragon EditorErrorBoundary] Editor crashed:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  // Reset the error state when the resetKey changes (e.g., switching documents)
  componentDidUpdate(prevProps: EditorErrorBoundaryProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        showDetails: false,
        retryCount: 0,
        copied: false,
      });
    }
  }

  handleRetry = () => {
    this.setState(prev => ({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
      retryCount: prev.retryCount + 1,
      copied: false,
    }));
    this.props.onRetry?.();
  };

  handleClearContent = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
      retryCount: 0,
      copied: false,
    });
    this.props.onClearContent?.();
  };

  handleCopyError = () => {
    const { error, errorInfo } = this.state;
    if (!error) return;

    const errorText = [
      `Error: ${error.message}`,
      '',
      'Stack trace:',
      error.stack || '(no stack trace)',
      '',
      'Component stack:',
      errorInfo?.componentStack || '(no component stack)',
    ].join('\n');

    navigator.clipboard.writeText(errorText).then(() => {
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    }).catch(() => {
      // Fallback: select text for manual copy
    });
  };

  toggleDetails = () => {
    this.setState(prev => ({ showDetails: !prev.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      const { error, showDetails, retryCount, copied } = this.state;
      const hasRetriedMultipleTimes = retryCount >= 2;

      return (
        <div className={cn("flex-1 flex items-center justify-center p-6", this.props.className)}>
          <div className="flex flex-col items-center max-w-md w-full text-center gap-4">
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>

            {/* Title & Description */}
            <div className="space-y-1.5">
              <h3 className="text-base font-semibold text-foreground">
                Editor encountered an error
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {hasRetriedMultipleTimes
                  ? 'The editor keeps crashing. The content may be malformed — try clearing it to recover.'
                  : 'Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below.'}
              </p>
            </div>

            {/* Recovery Actions */}
            <div className="flex flex-col gap-2 w-full max-w-xs">
              {/* Primary: Retry */}
              <Button
                variant="default"
                size="sm"
                className="w-full gap-2"
                onClick={this.handleRetry}
              >
                <RotateCcw className="w-4 h-4" />
                Retry {retryCount > 0 && `(${retryCount})`}
              </Button>

              {/* Tertiary: Clear Content (shown after multiple retries) */}
              {hasRetriedMultipleTimes && this.props.onClearContent && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={this.handleClearContent}
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Content & Retry
                </Button>
              )}
            </div>

            {/* Error Details (collapsible) */}
            {error && (
              <div className="w-full max-w-xs">
                <button
                  onClick={this.toggleDetails}
                  className={cn(
                    "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                    "cursor-pointer"
                  )}
                >
                  {showDetails ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )}
                  Error details
                </button>

                {showDetails && (
                  <div className="mt-2 p-3 rounded-md bg-muted/50 border border-border text-left overflow-auto max-h-40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">Error</span>
                      <button
                        onClick={this.handleCopyError}
                        className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            <span className="text-green-500">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground break-all">
                      {error.message}
                    </p>
                    {error.stack && (
                      <pre className="text-[10px] font-mono text-muted-foreground/70 mt-2 whitespace-pre-wrap break-all">
                        {error.stack.split('\n').slice(1, 6).join('\n')}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
