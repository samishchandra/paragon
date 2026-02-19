import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  private autoRecoveryTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    // Auto-recover from HMR-induced context errors in development.
    // When Vite hot-updates a context module, the provider reference changes
    // but child components still hold the old context, causing "must be used
    // within a Provider" errors. These are transient — retrying after a short
    // delay allows React to re-render with the new provider.
    const isHmrContextError =
      import.meta.env.DEV &&
      error.message.includes('must be used within a');

    if (isHmrContextError) {
      console.warn('[ErrorBoundary] HMR context error detected, auto-recovering...');
      this.autoRecoveryTimer = setTimeout(() => {
        this.setState({ hasError: false, error: null });
      }, 100);
    }
  }

  componentWillUnmount() {
    if (this.autoRecoveryTimer) {
      clearTimeout(this.autoRecoveryTimer);
    }
  }

  render() {
    if (this.state.hasError) {
      // During HMR auto-recovery, show nothing instead of the error screen
      // to avoid a flash of the error UI.
      const isHmrContextError =
        typeof import.meta !== 'undefined' &&
        import.meta.env?.DEV &&
        this.state.error?.message.includes('must be used within a');

      if (isHmrContextError) {
        return null;
      }

      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-background">
          <div className="flex flex-col items-center w-full max-w-2xl p-8">
            <AlertTriangle
              size={48}
              className="text-destructive mb-6 flex-shrink-0"
            />

            <h2 className="text-xl mb-4">An unexpected error occurred.</h2>

            <div className="p-4 w-full rounded bg-muted overflow-auto mb-6">
              <pre className="text-sm text-muted-foreground whitespace-break-spaces">
                {this.state.error?.stack}
              </pre>
            </div>

            <button
              onClick={() => window.location.reload()}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg",
                "bg-primary text-primary-foreground",
                "hover:opacity-90 cursor-pointer"
              )}
            >
              <RotateCcw size={16} />
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
