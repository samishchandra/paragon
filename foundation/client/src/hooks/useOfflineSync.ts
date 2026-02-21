/**
 * useOfflineSync - Stub for Supabase version
 */

export type SyncStatus = 'idle' | 'syncing' | 'error' | 'success';

export function useOfflineSync() {
  return {
    syncStatus: 'idle' as SyncStatus,
    pendingCount: 0,
    isSyncing: false,
    lastSyncError: null as string | null,
    retrySyncOffline: () => {},
  };
}
