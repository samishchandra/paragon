import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { lazy, Suspense, useEffect, useRef } from "react";
import { getLoginUrl } from "./const";

// Lazy-load the entire authenticated app shell
const AuthenticatedApp = lazy(() => import("@/AuthenticatedApp"));

/**
 * Minimal loading spinner shown while AuthenticatedApp chunk loads.
 * Prevents blank screen if the lazy import takes time on slow mobile networks.
 */
function AppLoadingFallback() {
  return (
    <div className="h-dvh w-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    </div>
  );
}

function AuthGate() {
  const { user, isLoading } = useAuth();
  const redirectingRef = useRef(false);

  useEffect(() => {
    if (!isLoading && !user && !redirectingRef.current) {
      redirectingRef.current = true;
      // Not authenticated — redirect to Manus OAuth login
      window.location.href = getLoginUrl();
    }
  }, [isLoading, user]);

  if (isLoading) {
    // Show a visible loading state instead of null.
    // Even though the splash screen covers this, returning null can cause
    // a blank screen if the splash auto-dismisses before auth completes.
    return (
      <div className="h-dvh w-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect is in progress — show a visible state instead of blank.
    // This prevents the blank screen if the redirect takes time on mobile,
    // or if cookies are blocked and the redirect loops.
    return (
      <div className="h-dvh w-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Redirecting to login...</span>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<AppLoadingFallback />}>
      <AuthenticatedApp userId={user.id} />
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <AuthProvider>
          <AuthGate />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
