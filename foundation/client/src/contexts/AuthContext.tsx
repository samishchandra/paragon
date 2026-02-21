/**
 * AuthContext — Adapter-based Authentication Provider
 *
 * Delegates to the registered AuthAdapter. For foundation (NoAuth),
 * the user is always authenticated as a local anonymous user.
 * Embedding repos provide their own AuthAdapter (Supabase, Manus, etc.).
 */
import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { getAuthAdapter } from '@/adapters/registry';
import type { AuthUser } from '@/adapters/types';

interface AuthContextValue {
  user: AuthUser | null;
  session: null;
  isLoading: boolean;
  isPasswordRecovery: boolean;
  mfaRequired: boolean;
  mfaVerified: () => void;
  signInWithGithub: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  signUpWithEmail: (email: string, password: string, name?: string) => Promise<{ error: string | null; needsConfirmation: boolean }>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  clearPasswordRecovery: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const authAdapter = getAuthAdapter();

  useEffect(() => {
    // Initialize user from the adapter
    authAdapter.getUser().then((u) => {
      setUser(u);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });

    // Subscribe to auth state changes
    const unsubscribe = authAdapter.onAuthStateChange((u) => {
      setUser(u);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [authAdapter]);

  const signInWithGithub = useCallback(async () => {
    if (authAdapter.signInWithOAuth) {
      await authAdapter.signInWithOAuth('github');
    } else {
      await authAdapter.signIn({ provider: 'github' });
    }
  }, [authAdapter]);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    if (authAdapter.signInWithEmail) {
      return authAdapter.signInWithEmail(email, password);
    }
    return authAdapter.signIn({ email, password });
  }, [authAdapter]);

  const signUpWithEmail = useCallback(async (email: string, password: string, name?: string) => {
    if (authAdapter.signUpWithEmail) {
      return authAdapter.signUpWithEmail(email, password, name);
    }
    return { error: 'Sign up not supported', needsConfirmation: false };
  }, [authAdapter]);

  const resetPassword = useCallback(async (email: string) => {
    if (authAdapter.resetPassword) {
      return authAdapter.resetPassword(email);
    }
    return { error: 'Password reset not supported' };
  }, [authAdapter]);

  const updatePassword = useCallback(async (newPassword: string) => {
    if (authAdapter.updatePassword) {
      return authAdapter.updatePassword(newPassword);
    }
    return { error: 'Password update not supported' };
  }, [authAdapter]);

  const signOut = useCallback(async () => {
    await authAdapter.signOut();
    setUser(null);
    // Clear app-specific localStorage keys
    const keysToRemove = [
      'momentum-offline-queue',
      'momentum-ui-state-server',
      'momentum-open-tabs-server',
      'momentum-panel-widths',
      'momentum-sidebar-recent',
      'momentum-sidebar-pinned',
      'momentum-sidebar-tags',
      'momentum-sidebar-lists',
      'momentum_search_history',
      'momentum_backup_activity_log',
      'momentum_autobackup_pending',
    ];
    keysToRemove.forEach(key => localStorage.removeItem(key));
    try { indexedDB.deleteDatabase('momentum-ai-config'); } catch {}
    try { indexedDB.deleteDatabase('momentum-image-cache'); } catch {}
  }, [authAdapter]);

  const clearPasswordRecovery = useCallback(() => {}, []);
  const mfaVerified = useCallback(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        user: user ? {
          id: user.id,
          email: user.email,
          name: user.name,
          avatarUrl: user.avatarUrl,
        } : null,
        session: null,
        isLoading,
        isPasswordRecovery: false,
        mfaRequired: false,
        mfaVerified,
        signInWithGithub,
        signInWithEmail,
        signUpWithEmail,
        resetPassword,
        updatePassword,
        signOut,
        clearPasswordRecovery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
