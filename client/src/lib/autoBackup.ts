/**
 * Auto-Backup Service — Local Folder
 *
 * Automatically backs up items to a local folder in the background when:
 * - An item is updated (debounced, batched)
 * - The user navigates away from an item
 * - The browser tab loses focus or goes idle
 * - After a bulk import completes
 *
 * Design principles:
 * - Zero performance impact on the main UI thread (uses requestIdleCallback / setTimeout)
 * - Debounced: item changes are queued and flushed in batches
 * - Per-item backup status tracking for footer indicators
 * - Singleton pattern: only one backup operation runs at a time
 */

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
import { apiQuery } from './apiClient';
import { logAutoBackup, logBackupError } from './backupLog';

// ── Per-item backup status ──

export type ItemBackupStatus = 'synced' | 'pending' | 'backing-up' | 'error';

type StatusListener = (itemId: string, status: ItemBackupStatus) => void;
type GlobalListener = () => void;

const itemStatusMap = new Map<string, ItemBackupStatus>();
const statusListeners = new Set<StatusListener>();
const globalListeners = new Set<GlobalListener>();

export function getItemBackupStatus(itemId: string): ItemBackupStatus {
  return itemStatusMap.get(itemId) || 'synced';
}

function setItemStatus(itemId: string, status: ItemBackupStatus) {
  const prev = itemStatusMap.get(itemId);
  if (prev === status) return;
  itemStatusMap.set(itemId, status);
  Array.from(statusListeners).forEach(listener => {
    try { listener(itemId, status); } catch { /* ignore */ }
  });
  Array.from(globalListeners).forEach(listener => {
    try { listener(); } catch { /* ignore */ }
  });
}

export function onItemBackupStatusChange(listener: StatusListener): () => void {
  statusListeners.add(listener);
  return () => { statusListeners.delete(listener); };
}

export function onGlobalBackupStatusChange(listener: GlobalListener): () => void {
  globalListeners.add(listener);
  return () => { globalListeners.delete(listener); };
}

/** Returns true if there are any items pending or currently backing up */
export function hasUnsyncedItems(): boolean {
  const values = Array.from(itemStatusMap.values());
  for (let i = 0; i < values.length; i++) {
    if (values[i] === 'pending' || values[i] === 'backing-up') return true;
  }
  return false;
}

/** Returns count of pending items */
export function getPendingCount(): number {
  let count = 0;
  const values = Array.from(itemStatusMap.values());
  for (let i = 0; i < values.length; i++) {
    if (values[i] === 'pending') count++;
  }
  return count;
}

// ── Dirty item queue ──

const dirtyItemIds = new Set<string>();
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let isBackingUp = false;
let autoBackupEnabled = false;
let _userId = '';

const FLUSH_DEBOUNCE_MS = 10_000;
const MIN_FLUSH_INTERVAL_MS = 15_000;
let lastFlushTime = 0;

/**
 * Mark an item as dirty (needs backup).
 */
export function markItemDirty(itemId: string) {
  if (!autoBackupEnabled || !isConnected()) return;
  dirtyItemIds.add(itemId);
  setItemStatus(itemId, 'pending');
  scheduleFlush();
}

/**
 * Mark multiple items as dirty (e.g., after bulk import).
 */
export function markItemsDirty(itemIds: string[]) {
  if (!autoBackupEnabled || !isConnected()) return;
  for (const id of itemIds) {
    dirtyItemIds.add(id);
    setItemStatus(id, 'pending');
  }
  scheduleFlush(3_000);
}

function scheduleFlush(delay = FLUSH_DEBOUNCE_MS) {
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flushDirtyItems();
  }, delay);
}

/**
 * Immediately flush all dirty items.
 */
export function flushNow() {
  if (!autoBackupEnabled || !isConnected()) return;
  if (dirtyItemIds.size === 0) return;

  const timeSinceLastFlush = Date.now() - lastFlushTime;
  if (timeSinceLastFlush < MIN_FLUSH_INTERVAL_MS && isBackingUp) {
    scheduleFlush(MIN_FLUSH_INTERVAL_MS - timeSinceLastFlush);
    return;
  }

  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  flushDirtyItems();
}

/**
 * Run a full backup. Marks all items dirty and flushes.
 */
export async function triggerFullBackup() {
  if (!autoBackupEnabled || !isConnected()) return;

  try {
    const { data: items } = await apiQuery({
      table: 'items',
      select: 'id',
      filters: { user_id: _userId, deleted_at: null },
    });

    if (items && items.length > 0) {
      const ids = items.map((i: any) => i.id);
      markItemsDirty(ids);
    }
  } catch (err) {
    console.error('[AutoBackup] Failed to trigger full backup:', err);
  }
}

/**
 * Enable/disable auto-backup.
 */
export function setAutoBackupEnabled(enabled: boolean, userId?: string) {
  autoBackupEnabled = enabled;
  if (userId) _userId = userId;
  if (!enabled) {
    if (flushTimer) {
      clearTimeout(flushTimer);
      flushTimer = null;
    }
    dirtyItemIds.clear();
    itemStatusMap.clear();
    Array.from(globalListeners).forEach(listener => {
      try { listener(); } catch { /* ignore */ }
    });
  }
}

export function isAutoBackupEnabled(): boolean {
  return autoBackupEnabled && isConnected();
}

/**
 * Immediately backup a single item.
 */
export function backupItemNow(itemId: string) {
  if (!isConnected()) return;
  dirtyItemIds.add(itemId);
  setItemStatus(itemId, 'pending');
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  flushDirtyItems();
}

// ── Core backup logic ──

async function flushDirtyItems() {
  if (isBackingUp || dirtyItemIds.size === 0) return;
  if (!isConnected()) return;

  isBackingUp = true;
  lastFlushTime = Date.now();

  const itemIdsToBackup = Array.from(dirtyItemIds);
  dirtyItemIds.clear();

  for (const id of itemIdsToBackup) {
    setItemStatus(id, 'backing-up');
  }

  try {
    const previousState = getBackupState();
    const newState: BackupState = {
      lastBackupAt: new Date().toISOString(),
      files: { ...(previousState?.files || {}) },
    };

    // Fetch items from the database
    const { data: items, error: itemsErr } = await apiQuery({
      table: 'items',
      select: 'id, type, title, content, section, is_completed, is_pinned, due_date, list_id, created_at, updated_at, deleted_at',
      filters: { user_id: _userId, 'id__in': itemIdsToBackup },
    });

    if (itemsErr) {
      console.error('[AutoBackup] Failed to fetch items:', itemsErr);
      logBackupError(`Failed to fetch items: ${itemsErr.message}`);
      for (const id of itemIdsToBackup) {
        dirtyItemIds.add(id);
        setItemStatus(id, 'error');
      }
      isBackingUp = false;
      return;
    }

    // Fetch lists and tags for metadata
    const { data: lists } = await apiQuery({ table: 'lists', select: 'id, name', filters: { user_id: _userId } });
    const listMap = new Map<string, string>();
    (lists || []).forEach((l: any) => listMap.set(l.id, l.name));

    const { data: tags } = await apiQuery({ table: 'tags', select: 'id, name', filters: { user_id: _userId } });
    const tagMap = new Map<string, string>();
    (tags || []).forEach((t: any) => tagMap.set(t.id, t.name));

    const { data: itemTags } = await apiQuery({
      table: 'item_tags',
      select: 'item_id, tag_id',
      filters: { 'item_id__in': itemIdsToBackup },
    });
    const itemTagMap = new Map<string, string[]>();
    (itemTags || []).forEach((it: any) => {
      const arr = itemTagMap.get(it.item_id) || [];
      const tagName = tagMap.get(it.tag_id);
      if (tagName) arr.push(tagName);
      itemTagMap.set(it.item_id, arr);
    });

    const enrichedItems = (items || []).map((item: any) => ({
      ...item,
      list_name: item.list_id ? listMap.get(item.list_id) || null : null,
      tag_names: itemTagMap.get(item.id) || [],
    }));

    const deletedItems = enrichedItems.filter((i: any) => i.deleted_at);
    const activeItems = enrichedItems.filter((i: any) => !i.deleted_at);

    const fetchedIds = new Set(enrichedItems.map((i: any) => i.id));
    const missingIds = itemIdsToBackup.filter(id => !fetchedIds.has(id));

    // Write active items to local folder
    for (const item of activeItems) {
      try {
        const markdown = generateMarkdownForItem(item);
        const hash = await contentHash(markdown);
        const folderName = sanitizeFilename(item.list_name || 'Miscellaneous');
        const fileName = sanitizeFilename(item.title || 'Untitled') + '.md';
        const path = `${folderName}/${fileName}`;

        const prev = newState.files[item.id];
        if (prev && prev.contentHash === hash && prev.path === path) {
          setItemStatus(item.id, 'synced');
          continue;
        }

        // If path changed, delete old file
        if (prev && prev.path !== path) {
          try { await deleteFileByPath(prev.path); } catch { /* ignore */ }
        }

        await writeFile(folderName, fileName, markdown);
        newState.files[item.id] = { path, updatedAt: item.updated_at, contentHash: hash };
        setItemStatus(item.id, 'synced');
      } catch (err) {
        console.error(`[AutoBackup] Failed to backup item ${item.id}:`, err);
        setItemStatus(item.id, 'error');
        dirtyItemIds.add(item.id);
      }
    }

    // Delete removed/deleted items from local folder
    for (const item of deletedItems) {
      const prev = newState.files[item.id];
      if (prev) {
        try {
          await deleteFileByPath(prev.path);
          delete newState.files[item.id];
        } catch { /* ignore */ }
      }
      setItemStatus(item.id, 'synced');
    }

    // Handle permanently deleted items
    for (const id of missingIds) {
      const prev = newState.files[id];
      if (prev) {
        try {
          await deleteFileByPath(prev.path);
          delete newState.files[id];
        } catch { /* ignore */ }
      }
      itemStatusMap.delete(id);
    }

    setBackupState(newState);

    const uploadedCount = activeItems.filter((i: any) => {
      const s = getItemBackupStatus(i.id);
      return s === 'synced';
    }).length;
    const deletedCount = deletedItems.length + missingIds.length;
    const errorItems = activeItems.filter((i: any) => getItemBackupStatus(i.id) === 'error');
    logAutoBackup(
      uploadedCount,
      deletedCount,
      errorItems.map((i: any) => `Failed: ${i.title || 'Untitled'}`)
    );

  } catch (err) {
    console.error('[AutoBackup] Flush failed:', err);
    logBackupError(`Auto-backup failed: ${err instanceof Error ? err.message : String(err)}`);
    for (let i = 0; i < itemIdsToBackup.length; i++) {
      const id = itemIdsToBackup[i];
      if (getItemBackupStatus(id) === 'backing-up') {
        setItemStatus(id, 'error');
        dirtyItemIds.add(id);
      }
    }
  } finally {
    isBackingUp = false;
    if (dirtyItemIds.size > 0) {
      scheduleFlush(3_000);
    }
  }
}

// ── Helpers ──

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

// ── Visibility / Idle listeners ──

let visibilityCleanup: (() => void) | null = null;
let idleTimer: ReturnType<typeof setTimeout> | null = null;
const IDLE_TIMEOUT_MS = 60_000;

function resetIdleTimer() {
  if (idleTimer) clearTimeout(idleTimer);
  if (!autoBackupEnabled) return;
  idleTimer = setTimeout(() => {
    flushNow();
  }, IDLE_TIMEOUT_MS);
}

/**
 * Initialize the auto-backup event listeners.
 * Call once on app mount. Returns a cleanup function.
 */
export function initAutoBackupListeners(): () => void {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      flushNow();
    }
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);

  const handleBeforeUnload = () => {
    if (dirtyItemIds.size > 0 && isConnected()) {
      try {
        const pending = Array.from(dirtyItemIds);
        localStorage.setItem('momentum_autobackup_pending', JSON.stringify(pending));
      } catch { /* ignore */ }
    }
  };
  window.addEventListener('beforeunload', handleBeforeUnload);

  const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
  const handleActivity = () => resetIdleTimer();
  for (const evt of activityEvents) {
    document.addEventListener(evt, handleActivity, { passive: true });
  }
  resetIdleTimer();

  // Restore pending items from previous session
  try {
    const pendingJson = localStorage.getItem('momentum_autobackup_pending');
    if (pendingJson) {
      const pending = JSON.parse(pendingJson) as string[];
      if (pending.length > 0 && isConnected()) {
        markItemsDirty(pending);
      }
      localStorage.removeItem('momentum_autobackup_pending');
    }
  } catch { /* ignore */ }

  visibilityCleanup = () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('beforeunload', handleBeforeUnload);
    for (const evt of activityEvents) {
      document.removeEventListener(evt, handleActivity);
    }
    if (idleTimer) clearTimeout(idleTimer);
    if (flushTimer) clearTimeout(flushTimer);
  };

  return visibilityCleanup;
}
