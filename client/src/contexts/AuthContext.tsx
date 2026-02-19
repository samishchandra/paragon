/**
 * AuthContext - Manus OAuth Authentication Provider
 * 
 * Replaces the Supabase auth with Manus OAuth.
 * Provides the same interface expected by the rest of the app.
 */
import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { trpc } from '@/lib/trpc';
import { getLoginUrl } from '@/const';
import { clearAllCachedData } from '@/lib/offlineStore';

interface AuthContextValue {
  user: { id: string; email?: string; name?: string } | null;
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
  const [isLoading, setIsLoading] = useState(true);
  
  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const logoutMutation = trpc.auth.logout.useMutation();

  // Map Manus user to the format expected by the app
  const user = meQuery.data
    ? {
        id: String(meQuery.data.id),
        email: meQuery.data.email ?? undefined,
        name: meQuery.data.name ?? undefined,
      }
    : null;

  useEffect(() => {
    if (!meQuery.isLoading) {
      setIsLoading(false);
    }
  }, [meQuery.isLoading]);

  const signInWithGithub = useCallback(async () => {
    window.location.href = getLoginUrl();
  }, []);

  const signInWithEmail = useCallback(async (_email: string, _password: string) => {
    window.location.href = getLoginUrl();
    return { error: null };
  }, []);

  const signUpWithEmail = useCallback(async (_email: string, _password: string, _name?: string) => {
    window.location.href = getLoginUrl();
    return { error: null, needsConfirmation: false };
  }, []);

  const resetPassword = useCallback(async (_email: string) => {
    return { error: 'Password reset is not available with Manus OAuth' };
  }, []);

  const updatePassword = useCallback(async (_newPassword: string) => {
    return { error: 'Password update is not available with Manus OAuth' };
  }, []);

  const signOut = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      // Ignore errors
    }
    // Clear all app-specific localStorage keys
    const keysToRemove = [
      'momentum_dropbox_app_key',
      'momentum_dropbox_access_token',
      'momentum_dropbox_refresh_token',
      'momentum_dropbox_token_expiry',
      'momentum_dropbox_code_verifier',
      'momentum_dropbox_backup_state',
      'momentum_dropbox_backup_folder',
      'momentum_backup_activity_log',
      'momentum_autobackup_pending',
      'momentum-offline-queue',
      'momentum-ui-state-server',
      'momentum-open-tabs-server',
      'momentum-panel-widths',
      'momentum-sidebar-recent',
      'momentum-sidebar-pinned',
      'momentum-sidebar-tags',
      'momentum-sidebar-lists',
      'momentum_search_history',
    ];
    keysToRemove.forEach(key => localStorage.removeItem(key));
    try { indexedDB.deleteDatabase('momentum-ai-config'); } catch {}
    try { indexedDB.deleteDatabase('momentum-image-cache'); } catch {}
    try { await clearAllCachedData(); } catch {}
    window.location.href = getLoginUrl();
  }, [logoutMutation]);

  const clearPasswordRecovery = useCallback(() => {}, []);
  const mfaVerified = useCallback(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
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
