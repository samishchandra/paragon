/**
 * EditorErrorBoundary - Catches editor crashes and provides recovery options
 * 
 * Unlike the global ErrorBoundary (which reloads the whole page), this one:
 * - Only wraps the editor area, keeping sidebar and item list functional
 * - Offers "Retry" to remount the editor with the same content
 * - Offers "Clear Content & Retry" as a last resort for malformed content
 * - Shows the error details in a collapsible section for debugging
 */

import { Component, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EditorErrorBoundaryProps {
  children: ReactNode;
  /** Current editor type — used to offer "switch editor" recovery */
  editorType?: string;
  /** Called when user wants to retry with the same editor */
  onRetry?: () => void;
  /** Called when user wants to clear content and retry */
  onClearContent?: () => void;
  /** Unique key for the current item — reset boundary when item changes */
  itemId?: string;
}

interface EditorErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  showDetails: boolean;
  retryCount: number;
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
    };
  }

  static getDerivedStateFromError(error: Error): Partial<EditorErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    // Log the error for debugging
    console.error('[EditorErrorBoundary] Editor crashed:', error, errorInfo);
  }

  // Reset the error state when the item changes
  componentDidUpdate(prevProps: EditorErrorBoundaryProps) {
    if (prevProps.itemId !== this.props.itemId && this.state.hasError) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        showDetails: false,
        retryCount: 0,
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
    });
    this.props.onClearContent?.();
  };

  toggleDetails = () => {
    this.setState(prev => ({ showDetails: !prev.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      const { error, showDetails, retryCount } = this.state;
      const hasRetriedMultipleTimes = retryCount >= 2;

      return (
        <div className="flex-1 flex items-center justify-center p-6">
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
                  ? 'The editor keeps crashing. Try switching to a different editor or clearing the content.'
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
                Retry
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
