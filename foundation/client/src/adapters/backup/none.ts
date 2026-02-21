/**
 * No Backup Adapter — Default backup adapter for momentum-foundation.
 *
 * Cloud backup is completely disabled. UI elements that depend on backup
 * should check isEnabled() and hide themselves.
 */
import type { BackupAdapter, BackupData, BackupResult, BackupStatus } from '../types';

export class NoBackupAdapter implements BackupAdapter {
  readonly type = 'none';

  isEnabled(): boolean {
    return false;
  }

  isConnected(): boolean {
    return false;
  }

  async connect(): Promise<boolean> {
    return false;
  }

  async disconnect(): Promise<void> {
    // No-op
  }

  async backup(_data: BackupData): Promise<BackupResult> {
    return { uploaded: 0, deleted: 0, unchanged: 0, errors: ['Backup not available'] };
  }

  getStatus(): BackupStatus {
    return { isConnected: false };
  }

  onConnectionChange(_callback: (connected: boolean) => void): () => void {
    // No-op — backup is always disconnected
    return () => {};
  }
}
