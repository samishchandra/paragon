/**
 * useLocalBackup — Local folder backup initialization and lifecycle.
 *
 * Owns:
 *   - Restoring a previously selected folder handle on mount
 *   - Enabling auto-backup when a folder is connected
 *   - Listening for connection changes (connect/disconnect from Settings)
 *   - Auto-backup event listeners lifecycle
 */
import { useEffect } from 'react';
import { setAutoBackupEnabled, initAutoBackupListeners } from '@/lib/autoBackup';
import {
  isConnected,
  restoreFolder,
  onConnectionChange,
} from '@/lib/localBackup';

export function useLocalBackup(userId: string) {
  useEffect(() => {
    let cancelled = false;

    async function initLocalBackup() {
      // Try to restore a previously saved folder handle
      if (!isConnected()) {
        await restoreFolder();
      }

      // Enable auto-backup if connected
      if (!cancelled) {
        setAutoBackupEnabled(isConnected(), userId);
      }
    }

    initLocalBackup();

    // Listen for connection changes (connect/disconnect from Settings)
    const unsubConnection = onConnectionChange((connected) => {
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
