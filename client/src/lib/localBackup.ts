/**
 * Local Folder Backup — File System Access API
 *
 * One-way backup from app → local filesystem.
 * Uses the File System Access API (showDirectoryPicker) to let the user
 * choose a local folder, then writes markdown files with frontmatter.
 *
 * Key design:
 * - One-way: app creates/updates/deletes files in the folder.
 *   Changes in the filesystem do NOT reflect back in the app.
 * - The directory handle is stored in IndexedDB (it survives page reloads
 *   but the user may need to re-grant permission on next session).
 * - Falls back gracefully when the API is not supported (e.g., Firefox).
 */

import { apiQuery } from './apiClient';

// ── Feature detection ──

export function isFileSystemAccessSupported(): boolean {
  return typeof window !== 'undefined' && 'showDirectoryPicker' in window;
}

// ── IndexedDB persistence for directory handle ──

const IDB_NAME = 'momentum_local_backup';
const IDB_STORE = 'handles';
const IDB_KEY = 'backupDir';

function openIDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(IDB_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveHandle(handle: FileSystemDirectoryHandle): Promise<void> {
  const db = await openIDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).put(handle, IDB_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function loadHandle(): Promise<FileSystemDirectoryHandle | null> {
  try {
    const db = await openIDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).get(IDB_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

async function clearHandle(): Promise<void> {
  try {
    const db = await openIDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).delete(IDB_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch { /* ignore */ }
}

// ── Connection state ──

let _dirHandle: FileSystemDirectoryHandle | null = null;
let _folderName: string = '';

type ConnectionChangeListener = (connected: boolean) => void;
const connectionListeners = new Set<ConnectionChangeListener>();

export function onConnectionChange(listener: ConnectionChangeListener): () => void {
  connectionListeners.add(listener);
  return () => { connectionListeners.delete(listener); };
}

function notifyConnectionChange(connected: boolean) {
  Array.from(connectionListeners).forEach(listener => {
    try { listener(connected); } catch { /* ignore */ }
  });
}

export function isConnected(): boolean {
  return _dirHandle !== null;
}

export function getFolderName(): string {
  return _folderName || '';
}

/**
 * Prompt the user to pick a local folder for backup.
 * Returns true if a folder was selected.
 */
export async function pickFolder(): Promise<boolean> {
  if (!isFileSystemAccessSupported()) {
    throw new Error('File System Access API is not supported in this browser');
  }
  try {
    const handle = await (window as any).showDirectoryPicker({ mode: 'readwrite' });
    _dirHandle = handle;
    _folderName = handle.name;
    await saveHandle(handle);
    notifyConnectionChange(true);
    return true;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      // User cancelled the picker
      return false;
    }
    throw err;
  }
}

/**
 * Try to restore a previously saved directory handle.
 * The user may need to re-grant permission.
 * Returns true if the handle was restored and permission granted.
 */
export async function restoreFolder(): Promise<boolean> {
  const handle = await loadHandle();
  if (!handle) return false;

  try {
    // Request permission (may show a prompt)
    const perm = await (handle as any).requestPermission({ mode: 'readwrite' });
    if (perm === 'granted') {
      _dirHandle = handle;
      _folderName = handle.name;
      notifyConnectionChange(true);
      return true;
    }
  } catch {
    // Permission denied or handle is stale
  }
  return false;
}

/**
 * Disconnect from the local folder.
 */
export function disconnect(): void {
  _dirHandle = null;
  _folderName = '';
  clearHandle();
  clearBackupState();
  notifyConnectionChange(false);
}

// ── Backup state (delta tracking) ──

export interface BackupFileState {
  path: string;
  updatedAt: string;
  contentHash: string;
}

export interface BackupState {
  lastBackupAt: string;
  files: Record<string, BackupFileState>;
}

const BACKUP_STATE_KEY = 'momentum_local_backup_state';

export function getBackupState(): BackupState | null {
  const raw = localStorage.getItem(BACKUP_STATE_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function setBackupState(state: BackupState): void {
  localStorage.setItem(BACKUP_STATE_KEY, JSON.stringify(state));
}

export function clearBackupState(): void {
  localStorage.removeItem(BACKUP_STATE_KEY);
}

// ── Content hash ──

async function sha256(text: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  return crypto.subtle.digest('SHA-256', encoder.encode(text));
}

function base64urlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let str = '';
  bytes.forEach((b) => (str += String.fromCharCode(b)));
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function contentHash(text: string): Promise<string> {
  const buffer = await sha256(text);
  return base64urlEncode(buffer);
}

// ── Filename / frontmatter helpers ──

export function sanitizeFilename(name: string): string {
  return name
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '_')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^\.+/, '_')
    .slice(0, 200) || 'Untitled';
}

export function generateFrontmatter(meta: {
  type: string;
  section?: string;
  is_completed?: boolean;
  is_pinned?: boolean;
  due_date?: string | null;
  list_name?: string | null;
  tag_names?: string[];
  created_at?: string;
  updated_at?: string;
}): string {
  const lines = ['---'];
  lines.push(`type: ${meta.type}`);
  if (meta.section) lines.push(`section: ${meta.section}`);
  if (meta.is_completed !== undefined) lines.push(`completed: ${meta.is_completed}`);
  if (meta.is_pinned !== undefined) lines.push(`pinned: ${meta.is_pinned}`);
  if (meta.due_date) lines.push(`due: ${meta.due_date}`);
  if (meta.list_name) lines.push(`list: ${meta.list_name}`);
  if (meta.tag_names && meta.tag_names.length > 0) {
    lines.push(`tags: [${meta.tag_names.join(', ')}]`);
  }
  if (meta.created_at) lines.push(`created: ${meta.created_at}`);
  if (meta.updated_at) lines.push(`updated: ${meta.updated_at}`);
  lines.push('---');
  return lines.join('\n');
}

// ── File system operations ──

/**
 * Get or create a subdirectory inside the backup folder.
 */
async function getSubDir(name: string): Promise<FileSystemDirectoryHandle> {
  if (!_dirHandle) throw new Error('No backup folder selected');
  return _dirHandle.getDirectoryHandle(sanitizeFilename(name), { create: true });
}

/**
 * Write a text file to a subdirectory.
 */
export async function writeFile(subDir: string, fileName: string, content: string): Promise<void> {
  const dir = await getSubDir(subDir);
  const fileHandle = await dir.getFileHandle(sanitizeFilename(fileName), { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
}

/**
 * Delete a file from a subdirectory.
 */
export async function deleteFile(subDir: string, fileName: string): Promise<void> {
  try {
    const dir = await getSubDir(subDir);
    await dir.removeEntry(sanitizeFilename(fileName));
  } catch {
    // File doesn't exist, that's fine
  }
}

/**
 * Delete a file by its full relative path (e.g., "Miscellaneous/MyNote.md").
 */
export async function deleteFileByPath(relativePath: string): Promise<void> {
  if (!_dirHandle) return;
  const parts = relativePath.split('/').filter(Boolean);
  if (parts.length < 2) return;
  const fileName = parts.pop()!;
  const subDir = parts.join('/');
  try {
    let dir: FileSystemDirectoryHandle = _dirHandle;
    for (const part of parts.length > 0 ? [subDir] : []) {
      dir = await dir.getDirectoryHandle(part, { create: false });
    }
    await dir.removeEntry(fileName);
  } catch {
    // File or directory doesn't exist
  }
}

/**
 * Get the directory handle (for external use).
 */
export function getDirHandle(): FileSystemDirectoryHandle | null {
  return _dirHandle;
}
