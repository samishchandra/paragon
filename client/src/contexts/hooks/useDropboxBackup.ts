/**
 * useDropboxBackup — Dropbox connection, OAuth callback, and auto-backup initialization.
 *
 * Owns:
 *   - Dropbox OAuth callback handling (code exchange, folder setup)
 *   - Loading Dropbox credentials from Supabase (cross-device)
 *   - Enabling auto-backup when Dropbox is connected
 *   - Listening for connection changes (connect/disconnect from Settings)
 *   - Auto-backup event listeners lifecycle
 */
import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';
import { setAutoBackupEnabled, initAutoBackupListeners } from '@/lib/autoBackup';
import {
  isConnected as isDropboxConnected,
  loadCredentialsFromSupabase as loadDropboxCredentials,
  handleAuthCallback as handleDropboxAuthCallback,
  getAppKey as getDropboxAppKey,
  onConnectionChange as onDropboxConnectionChange,
  generateDefaultBackupFolder,
  getBackupFolder as getDropboxBackupFolder,
  setBackupFolder as setDropboxBackupFolder,
  syncCredentialsToSupabase as syncDropboxToSupabase,
} from '@/lib/dropbox';

export function useDropboxBackup(userId: string) {
  useEffect(() => {
    let cancelled = false;

    async function initDropbox() {
      // 1. Handle OAuth callback if there's a ?code= parameter
      // Only process if code_verifier exists in localStorage — this proves the user
      // initiated a Dropbox auth flow (not a GitHub/Supabase OAuth redirect which also uses ?code=)
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      const hasDropboxCodeVerifier = !!localStorage.getItem('momentum_dropbox_code_verifier');
      if (code && getDropboxAppKey() && hasDropboxCodeVerifier) {
        url.searchParams.delete('code');
        window.history.replaceState({}, '', url.pathname);
        const ok = await handleDropboxAuthCallback(code);
        if (ok) {
          // Set user-specific default folder on first connection
          const currentFolder = getDropboxBackupFolder();
          if (currentFolder === '/MomentumBackup') {
            try {
              const { data: { user: authUser } } = await supabase.auth.getUser();
              if (authUser) {
                const userSpecific = generateDefaultBackupFolder(authUser);
                if (userSpecific !== '/MomentumBackup') {
                  setDropboxBackupFolder(userSpecific);
                  syncDropboxToSupabase();
                }
              }
            } catch { /* ignore - will be set when user opens settings */ }
          }
          toast.success('Dropbox connected successfully');
        } else {
          toast.error('Dropbox connection failed');
        }
      }

      // 2. If not connected locally, try loading credentials from Supabase
      if (!isDropboxConnected()) {
        await loadDropboxCredentials();
      }

      // 3. Enable auto-backup if connected
      if (!cancelled) {
        setAutoBackupEnabled(isDropboxConnected(), userId);
      }
    }

    initDropbox();

    // Listen for connection changes (connect/disconnect from Settings)
    const unsubConnection = onDropboxConnectionChange((connected) => {
      setAutoBackupEnabled(connected, userId);
    });

    const cleanupListeners = initAutoBackupListeners();

    return () => {
      cancelled = true;
      unsubConnection();
      cleanupListeners();
    };
  }, []);
}
