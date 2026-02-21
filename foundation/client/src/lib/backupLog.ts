/**
 * Backup Activity Log
 *
 * Stores recent backup activity entries in localStorage for display
 * in the Settings Backup section. Keeps the last 50 entries max.
 */

const STORAGE_KEY = 'momentum_backup_activity_log';
const MAX_ENTRIES = 50;

export type BackupLogType = 'auto' | 'manual' | 'full' | 'error' | 'connect' | 'disconnect';

export interface BackupLogEntry {
  id: string;
  timestamp: string; // ISO string
  type: BackupLogType;
  message: string;
  uploaded?: number;
  deleted?: number;
  unchanged?: number;
  errors?: string[];
}

// ── Listeners ──

type LogListener = () => void;
const listeners = new Set<LogListener>();

export function onLogChange(listener: LogListener): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

function notifyListeners() {
  Array.from(listeners).forEach(fn => {
    try { fn(); } catch { /* ignore */ }
  });
}

// ── Storage ──

export function getLog(): BackupLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BackupLogEntry[];
  } catch {
    return [];
  }
}

function saveLog(entries: BackupLogEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch { /* ignore */ }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// ── Public API ──

export function addLogEntry(entry: Omit<BackupLogEntry, 'id' | 'timestamp'>): void {
  const log = getLog();
  log.unshift({
    ...entry,
    id: generateId(),
    timestamp: new Date().toISOString(),
  });
  // Trim to max entries
  if (log.length > MAX_ENTRIES) {
    log.length = MAX_ENTRIES;
  }
  saveLog(log);
  notifyListeners();
}

export function clearLog(): void {
  localStorage.removeItem(STORAGE_KEY);
  notifyListeners();
}

// ── Convenience helpers ──

export function logAutoBackup(uploaded: number, deleted: number, errors: string[]): void {
  if (uploaded === 0 && deleted === 0 && errors.length === 0) return; // skip no-ops
  const hasErrors = errors.length > 0;
  addLogEntry({
    type: hasErrors ? 'error' : 'auto',
    message: hasErrors
      ? `Auto-backup completed with ${errors.length} error(s)`
      : `Auto-backed up ${uploaded} file${uploaded !== 1 ? 's' : ''}${deleted > 0 ? `, removed ${deleted}` : ''}`,
    uploaded,
    deleted,
    unchanged: 0,
    errors: hasErrors ? errors : undefined,
  });
}

export function logManualBackup(uploaded: number, deleted: number, unchanged: number, errors: string[], full: boolean): void {
  const hasErrors = errors.length > 0;
  const typeLabel = full ? 'Full backup' : 'Backup';
  addLogEntry({
    type: hasErrors ? 'error' : (full ? 'full' : 'manual'),
    message: hasErrors
      ? `${typeLabel} completed with ${errors.length} error(s)`
      : unchanged > 0 && uploaded === 0 && deleted === 0
        ? `${typeLabel}: everything up to date (${unchanged} files)`
        : `${typeLabel}: ${uploaded} uploaded, ${deleted} deleted, ${unchanged} unchanged`,
    uploaded,
    deleted,
    unchanged,
    errors: hasErrors ? errors : undefined,
  });
}

export function logBackupError(message: string): void {
  addLogEntry({
    type: 'error',
    message,
    errors: [message],
  });
}

export function logConnection(connected: boolean): void {
  addLogEntry({
    type: connected ? 'connect' : 'disconnect',
    message: connected ? 'Connected to Dropbox' : 'Disconnected from Dropbox',
  });
}
