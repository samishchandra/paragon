/**
 * NoAuth Adapter — Default auth adapter for momentum-foundation.
 *
 * Provides an anonymous local user with a stable ID stored in localStorage.
 * No sign-in required — the app is immediately usable.
 */
import type { AuthAdapter, AuthUser } from '../types';

const LOCAL_USER_KEY = 'momentum-local-user-id';

function getOrCreateLocalUserId(): string {
  let id = localStorage.getItem(LOCAL_USER_KEY);
  if (!id) {
    id = 'local-' + crypto.randomUUID();
    localStorage.setItem(LOCAL_USER_KEY, id);
  }
  return id;
}

export class NoAuthAdapter implements AuthAdapter {
  readonly type = 'none';
  readonly requiresAuth = false;
  readonly supportsEmailAuth = false;
  readonly supportsOAuth = false;
  readonly supportsMFA = false;

  private user: AuthUser;
  private listeners: Set<(user: AuthUser | null) => void> = new Set();

  constructor() {
    const id = getOrCreateLocalUserId();
    this.user = {
      id,
      name: 'Local User',
      email: undefined,
      provider: 'none',
    };
  }

  async getUser(): Promise<AuthUser | null> {
    return this.user;
  }

  onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
    this.listeners.add(callback);
    // Immediately notify with current user
    setTimeout(() => callback(this.user), 0);
    return () => {
      this.listeners.delete(callback);
    };
  }

  async signIn(): Promise<{ error: string | null }> {
    // No-op for NoAuth — user is always signed in
    return { error: null };
  }

  async signOut(): Promise<void> {
    // No-op for NoAuth
  }

  isAuthenticated(): boolean {
    return true; // Always authenticated
  }
}
