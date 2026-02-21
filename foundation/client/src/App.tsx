/**
 * App.tsx — Root component for momentum-foundation.
 *
 * Uses the adapter registry to determine auth behavior:
 * - If auth is required (requiresAuth=true), shows login or redirects.
 * - If auth is not required (NoAuth), skips straight to the authenticated app.
 */
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { lazy, Suspense, useEffect } from "react";
import { getAuthAdapter } from "./adapters/registry";

// Lazy-load the entire authenticated app shell
const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));

function AuthGate() {
  const { user, isLoading } = useAuth();
  const authAdapter = getAuthAdapter();

  useEffect(() => {
    if (!isLoading && !user && authAdapter.requiresAuth) {
      // Auth required but not authenticated — trigger sign-in
      authAdapter.signIn();
    }
  }, [isLoading, user, authAdapter]);

  if (isLoading) {
    // Keep the HTML splash screen visible while auth loads
    return null;
  }

  if (!user && authAdapter.requiresAuth) {
    // Will redirect to login, show nothing
    return null;
  }

  // For NoAuth adapter, user.id is 'local-user'
  const userId = user?.id || 'local-user';

  return (
    <Suspense fallback={null}>
      <AuthenticatedApp userId={userId} />
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
