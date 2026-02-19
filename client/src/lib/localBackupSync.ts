/**
 * Local Folder Backup — Manual Sync
 *
 * Provides runBackup() and runFullBackup() for the Settings Backup page.
 * One-way: app → local filesystem. Uses the File System Access API.
 */

import { apiQuery } from './apiClient';
import {
  writeFile,
  deleteFileByPath,
  isConnected,
  getBackupState,
  setBackupState,
  contentHash,
  generateFrontmatter,
  sanitizeFilename,
  type BackupState,
} from './localBackup';

export interface BackupProgress {
  phase: 'fetching' | 'computing' | 'uploading' | 'deleting' | 'cleanup' | 'done';
  current: number;
  total: number;
  message: string;
}

export interface BackupResult {
  uploaded: number;
  deleted: number;
  unchanged: number;
  errors: string[];
}

type ProgressCallback = (progress: BackupProgress) => void;

let _backupUserId = '';

export function setBackupUserId(userId: string) {
  _backupUserId = userId;
}

async function fetchAllItems() {
  const { data: items, error: itemsErr } = await apiQuery({
    table: 'items',
    select: 'id, type, title, content, section, is_completed, is_pinned, due_date, list_id, created_at, updated_at, deleted_at',
    filters: { user_id: _backupUserId },
  });
  if (itemsErr) throw new Error(`Failed to fetch items: ${itemsErr.message}`);

  const { data: lists } = await apiQuery({ table: 'lists', select: 'id, name', filters: { user_id: _backupUserId } });
  const listMap = new Map<string, string>();
  (lists || []).forEach((l: any) => listMap.set(l.id, l.name));

  const { data: tags } = await apiQuery({ table: 'tags', select: 'id, name', filters: { user_id: _backupUserId } });
  const tagMap = new Map<string, string>();
  (tags || []).forEach((t: any) => tagMap.set(t.id, t.name));

  const itemIds = (items || []).map((i: any) => i.id);
  let itemTagMap = new Map<string, string[]>();
  if (itemIds.length > 0) {
    const { data: itemTags } = await apiQuery({
      table: 'item_tags',
      select: 'item_id, tag_id',
      filters: { 'item_id__in': itemIds },
    });
    (itemTags || []).forEach((it: any) => {
      const arr = itemTagMap.get(it.item_id) || [];
      const tagName = tagMap.get(it.tag_id);
      if (tagName) arr.push(tagName);
      itemTagMap.set(it.item_id, arr);
    });
  }

  return (items || []).map((item: any) => ({
    ...item,
    list_name: item.list_id ? listMap.get(item.list_id) || null : null,
    tag_names: itemTagMap.get(item.id) || [],
  }));
}

function generateMarkdownForItem(item: any): string {
  const frontmatter = generateFrontmatter({
    type: item.type,
    section: item.section,
    is_completed: item.is_completed,
    is_pinned: item.is_pinned,
    due_date: item.due_date,
    list_name: item.list_name,
    tag_names: item.tag_names,
    created_at: item.created_at,
    updated_at: item.updated_at,
  });
  const title = item.title || 'Untitled';
  const content = item.content || '';
  return `${frontmatter}\n\n# ${title}\n\n${content}\n`;
}

/**
 * Delta backup — only upload changed items.
 */
export async function runBackup(onProgress?: ProgressCallback): Promise<BackupResult> {
  if (!isConnected()) throw new Error('No backup folder selected');

  const result: BackupResult = { uploaded: 0, deleted: 0, unchanged: 0, errors: [] };

  onProgress?.({ phase: 'fetching', current: 0, total: 0, message: 'Fetching items...' });
  const allItems = await fetchAllItems();

  const activeItems = allItems.filter((i: any) => !i.deleted_at);
  const deletedItems = allItems.filter((i: any) => i.deleted_at);

  const previousState = getBackupState();
  const newState: BackupState = {
    lastBackupAt: new Date().toISOString(),
    files: { ...(previousState?.files || {}) },
  };

  onProgress?.({ phase: 'computing', current: 0, total: activeItems.length, message: 'Computing changes...' });

  // Upload active items
  const total = activeItems.length + deletedItems.length;
  let current = 0;

  for (const item of activeItems) {
    current++;
    try {
      const markdown = generateMarkdownForItem(item);
      const hash = await contentHash(markdown);
      const folderName = sanitizeFilename(item.list_name || 'Miscellaneous');
      const fileName = sanitizeFilename(item.title || 'Untitled') + '.md';
      const path = `${folderName}/${fileName}`;

      const prev = newState.files[item.id];
      if (prev && prev.contentHash === hash && prev.path === path) {
        result.unchanged++;
        continue;
      }

      onProgress?.({ phase: 'uploading', current, total, message: `Backing up: ${item.title || 'Untitled'}` });

      // If path changed, delete old file
      if (prev && prev.path !== path) {
        try { await deleteFileByPath(prev.path); } catch { /* ignore */ }
      }

      await writeFile(folderName, fileName, markdown);
      newState.files[item.id] = { path, updatedAt: item.updated_at, contentHash: hash };
      result.uploaded++;
    } catch (err) {
      result.errors.push(`Failed: ${item.title || 'Untitled'} — ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // Delete removed items
  for (const item of deletedItems) {
    current++;
    const prev = newState.files[item.id];
    if (prev) {
      onProgress?.({ phase: 'deleting', current, total, message: `Removing: ${item.title || 'Untitled'}` });
      try {
        await deleteFileByPath(prev.path);
        delete newState.files[item.id];
        result.deleted++;
      } catch { /* ignore */ }
    }
  }

  // Clean up files for items that no longer exist
  const activeIds = new Set(allItems.map((i: any) => i.id));
  for (const [id, fileState] of Object.entries(newState.files)) {
    if (!activeIds.has(id)) {
      try {
        await deleteFileByPath(fileState.path);
        delete newState.files[id];
        result.deleted++;
      } catch { /* ignore */ }
    }
  }

  setBackupState(newState);

  onProgress?.({
    phase: 'done', current: total, total,
    message: `Done: ${result.uploaded} uploaded, ${result.deleted} deleted, ${result.unchanged} unchanged`,
  });

  return result;
}

/**
 * Full backup — re-upload everything (ignores delta state).
 */
export async function runFullBackup(onProgress?: ProgressCallback): Promise<BackupResult> {
  if (!isConnected()) throw new Error('No backup folder selected');

  const result: BackupResult = { uploaded: 0, deleted: 0, unchanged: 0, errors: [] };

  onProgress?.({ phase: 'fetching', current: 0, total: 0, message: 'Fetching all items...' });
  const allItems = await fetchAllItems();

  const activeItems = allItems.filter((i: any) => !i.deleted_at);
  const newState: BackupState = {
    lastBackupAt: new Date().toISOString(),
    files: {},
  };

  const total = activeItems.length;
  let current = 0;

  for (const item of activeItems) {
    current++;
    try {
      onProgress?.({ phase: 'uploading', current, total, message: `Backing up: ${item.title || 'Untitled'}` });

      const markdown = generateMarkdownForItem(item);
      const hash = await contentHash(markdown);
      const folderName = sanitizeFilename(item.list_name || 'Miscellaneous');
      const fileName = sanitizeFilename(item.title || 'Untitled') + '.md';
      const path = `${folderName}/${fileName}`;

      await writeFile(folderName, fileName, markdown);
      newState.files[item.id] = { path, updatedAt: item.updated_at, contentHash: hash };
      result.uploaded++;
    } catch (err) {
      result.errors.push(`Failed: ${item.title || 'Untitled'} — ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  setBackupState(newState);

  onProgress?.({
    phase: 'done', current: total, total,
    message: `Full backup done: ${result.uploaded} files backed up`,
  });

  return result;
}
