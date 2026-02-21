import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ToastContainer } from "./components/ToastContainer";
import { lazy, Suspense, useEffect } from "react";
import { getLoginUrl } from "./const";

// Lazy-load the entire authenticated app shell
const AuthenticatedApp = lazy(() => import("@/AuthenticatedApp"));

function AuthGate() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      // Not authenticated — redirect to Manus OAuth login
      window.location.href = getLoginUrl();
    }
  }, [isLoading, user]);

  if (isLoading) {
    // Keep the HTML splash screen visible while auth loads
    return null;
  }

  if (!user) {
    // Will redirect to login, show nothing
    return null;
  }

  return (
    <Suspense fallback={null}>
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
