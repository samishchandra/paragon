/**
 * syncEngine — Orchestrates offline-first data loading and background sync.
 *
 * Strategy:
 * 1. On app load, read from IndexedDB (instant) → render immediately
 * 2. If online, fetch from server in background → merge & update IndexedDB
 * 3. On mutations, write to IndexedDB immediately + queue for server
 * 4. On reconnect, flush offline queue + do a full sync
 *
 * This module provides hooks and helpers that the existing data-fetching
 * hooks can call to get offline-first behavior with minimal changes.
 */

import {
  getCachedItems,
  getCachedTags,
  getCachedLists,
  getCachedItemTags,
  putCachedItems,
  putCachedTags,
  putCachedLists,
  putCachedItemTags,
  putCachedItem,
  putCachedTag,
  putCachedList,
  deleteCachedItem,
  deleteCachedTag,
  deleteCachedList,
  getCachedUserSettings,
  putCachedUserSettings,
  getCachedViewSortPrefs,
  putCachedViewSortPrefs,
  setLastSyncTimestamp,
  getLastSyncTimestamp,
  replaceAllCachedData,
  clearAllCachedData,
} from './offlineStore';

import { supabase } from './supabaseClient';

// ---- Types ----

export interface SyncResult<T> {
  data: T;
  source: 'cache' | 'server' | 'empty';
}

// ---- Cached data loaders (offline-first) ----

/**
 * Load items: try IndexedDB first, then fetch from server if online.
 * Returns cached data immediately, then calls onServerData when server responds.
 */
export async function loadItemsOfflineFirst(
  userId: string,
  onCachedData?: (items: any[]) => void,
  onServerData?: (items: any[]) => void,
): Promise<any[]> {
  // 1. Load from cache
  const cached = await getCachedItems();
  const userCached = cached.filter((i: any) => String(i.user_id) === String(userId));

  if (userCached.length > 0 && onCachedData) {
    onCachedData(userCached);
  }

  // 2. If online, fetch from server in background
  if (navigator.onLine) {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*, item_tags(tag_id)')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (!error && data) {
        // Update cache
        await putCachedItems(data);
        await setLastSyncTimestamp(new Date().toISOString());

        if (onServerData) {
          onServerData(data);
        }
        return data;
      }
    } catch (e) {
      console.warn('[SyncEngine] Failed to fetch items from server:', e);
    }
  }

  return userCached;
}

/**
 * Load tags with offline-first strategy.
 */
export async function loadTagsOfflineFirst(
  userId: string,
  onCachedData?: (tags: any[]) => void,
  onServerData?: (tags: any[]) => void,
): Promise<any[]> {
  const cached = await getCachedTags();
  const userCached = cached.filter((t: any) => String(t.user_id) === String(userId));

  if (userCached.length > 0 && onCachedData) {
    onCachedData(userCached);
  }

  if (navigator.onLine) {
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .eq('user_id', userId);

      if (!error && data) {
        await putCachedTags(data);
        if (onServerData) onServerData(data);
        return data;
      }
    } catch (e) {
      console.warn('[SyncEngine] Failed to fetch tags from server:', e);
    }
  }

  return userCached;
}

/**
 * Load lists with offline-first strategy.
 */
export async function loadListsOfflineFirst(
  userId: string,
  onCachedData?: (lists: any[]) => void,
  onServerData?: (lists: any[]) => void,
): Promise<any[]> {
  const cached = await getCachedLists();
  const userCached = cached.filter((l: any) => String(l.user_id) === String(userId));

  if (userCached.length > 0 && onCachedData) {
    onCachedData(userCached);
  }

  if (navigator.onLine) {
    try {
      const { data, error } = await supabase
        .from('lists')
        .select('*')
        .eq('user_id', userId)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        await putCachedLists(data);
        if (onServerData) onServerData(data);
        return data;
      }
    } catch (e) {
      console.warn('[SyncEngine] Failed to fetch lists from server:', e);
    }
  }

  return userCached;
}

// ---- Mutation helpers (write-through to cache) ----

/**
 * After a successful insert/update to the server (or when queuing offline),
 * also update the IndexedDB cache so the local view stays fresh.
 */
export async function cacheItemMutation(
  action: 'put' | 'delete',
  item: any,
): Promise<void> {
  try {
    if (action === 'put') {
      await putCachedItem(item);
    } else {
      await deleteCachedItem(item.id || item);
    }
  } catch (e) {
    console.warn('[SyncEngine] Cache mutation failed:', e);
  }
}

export async function cacheTagMutation(
  action: 'put' | 'delete',
  tag: any,
): Promise<void> {
  try {
    if (action === 'put') {
      await putCachedTag(tag);
    } else {
      await deleteCachedTag(tag.id || tag);
    }
  } catch (e) {
    console.warn('[SyncEngine] Cache tag mutation failed:', e);
  }
}

export async function cacheListMutation(
  action: 'put' | 'delete',
  list: any,
): Promise<void> {
  try {
    if (action === 'put') {
      await putCachedList(list);
    } else {
      await deleteCachedList(list.id || list);
    }
  } catch (e) {
    console.warn('[SyncEngine] Cache list mutation failed:', e);
  }
}

// ---- Settings cache ----

export async function loadSettingsOfflineFirst(
  userId: string,
): Promise<any | null> {
  const cached = await getCachedUserSettings(userId);

  if (navigator.onLine) {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (!error && data) {
        await putCachedUserSettings(data);
        return data;
      }
    } catch (e) {
      console.warn('[SyncEngine] Failed to fetch settings from server:', e);
    }
  }

  return cached;
}

export async function cacheSettings(settings: any): Promise<void> {
  try {
    await putCachedUserSettings(settings);
  } catch (e) {
    console.warn('[SyncEngine] Failed to cache settings:', e);
  }
}

// ---- View sort prefs cache ----

export async function loadViewSortPrefsOfflineFirst(
  userId: string,
): Promise<any[]> {
  const cached = await getCachedViewSortPrefs();
  const userCached = cached.filter((p: any) => String(p.user_id) === String(userId));

  if (navigator.onLine) {
    try {
      const { data, error } = await supabase
        .from('view_sort_preferences')
        .select('*')
        .eq('user_id', userId);

      if (!error && data) {
        await putCachedViewSortPrefs(data);
        return data;
      }
    } catch (e) {
      console.warn('[SyncEngine] Failed to fetch view sort prefs from server:', e);
    }
  }

  return userCached;
}

// ---- Full sync (used after reconnect) ----

export async function fullSync(userId: string): Promise<{
  items: any[];
  tags: any[];
  lists: any[];
} | null> {
  if (!navigator.onLine) return null;

  try {
    const [itemsRes, tagsRes, listsRes, itemTagsRes] = await Promise.all([
      supabase.from('items').select('*, item_tags(tag_id)').eq('user_id', userId),
      supabase.from('tags').select('*').eq('user_id', userId),
      supabase.from('lists').select('*').eq('user_id', userId).order('sort_order', { ascending: true }),
      supabase.from('item_tags').select('*'),
    ]);

    const items = itemsRes.data || [];
    const tags = tagsRes.data || [];
    const lists = listsRes.data || [];
    const itemTags = itemTagsRes.data || [];

    await replaceAllCachedData({ items, tags, lists, itemTags });
    await setLastSyncTimestamp(new Date().toISOString());

    return { items, tags, lists };
  } catch (e) {
    console.warn('[SyncEngine] Full sync failed:', e);
    return null;
  }
}

// ---- Cleanup ----

export async function clearOfflineData(): Promise<void> {
  await clearAllCachedData();
}

export { getLastSyncTimestamp };
