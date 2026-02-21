/**
 * dropbox.ts — Stub module for backward compatibility.
 *
 * In momentum-foundation, cloud backup is disabled by default.
 * Embedding repos can provide a BackupAdapter to enable Dropbox or other cloud backup.
 * This stub provides the same exports that other files import, but they all no-op.
 */
import { getBackupAdapter } from '@/adapters/registry';

export function isConnected(): boolean {
  const adapter = getBackupAdapter();
  return adapter.isConnected();
}

export function onConnectionChange(callback: (connected: boolean) => void): () => void {
  const adapter = getBackupAdapter();
  return adapter.onConnectionChange(callback);
}

export function getBackupFolder(): string {
  const adapter = getBackupAdapter();
  return adapter.getBackupFolder?.() ?? '';
}

export function sanitizeFilename(name: string): string {
  return name.replace(/[<>:"/\\|?*]/g, '_').trim() || 'Untitled';
}

export function getAccessToken(): string | null {
  return null;
}

export function connect(): void {
  // No-op in foundation
}

export function disconnect(): void {
  // No-op in foundation
}
