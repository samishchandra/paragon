/**
 * dropboxBackup.ts — Stub module for backward compatibility.
 *
 * In momentum-foundation, cloud backup is disabled by default.
 */

export interface BackupProgress {
  phase: string;
  current: number;
  total: number;
  message?: string;
}

export function setBackupUserId(_userId: string): void {
  // No-op
}

export async function runBackup(_onProgress?: (p: BackupProgress) => void): Promise<void> {
  // No-op
}

export async function runFullBackup(_onProgress?: (p: BackupProgress) => void): Promise<void> {
  // No-op
}
