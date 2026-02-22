/**
 * offlineStore — IndexedDB-backed offline data cache for Momentum.
 *
 * Provides a full local cache of items, tags, lists, item_tags, user_settings,
 * and view_sort_preferences. The app reads from IndexedDB first (instant) and
 * then syncs from the server in the background.
 *
 * Uses a simple open/upgrade pattern without idb-keyval to keep dependencies minimal.
 */

const DB_NAME = 'momentum-offline';
const DB_VERSION = 2;

// Store names
const STORES = {
  items: 'items',
  tags: 'tags',
  lists: 'lists',
  itemTags: 'item_tags',
  userSettings: 'user_settings',
  viewSortPrefs: 'view_sort_preferences',
  meta: 'meta', // for sync timestamps
} as const;

let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains(STORES.items)) {
        const store = db.createObjectStore(STORES.items, { keyPath: 'id' });
        store.createIndex('userId', 'user_id', { unique: false });
        store.createIndex('listId', 'list_id', { unique: false });
        store.createIndex('updatedAt', 'updated_at', { unique: false });
      }
      if (!db.objectStoreNames.contains(STORES.tags)) {
        db.createObjectStore(STORES.tags, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.lists)) {
        db.createObjectStore(STORES.lists, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.itemTags)) {
        const store = db.createObjectStore(STORES.itemTags, { keyPath: ['item_id', 'tag_id'] });
        store.createIndex('itemId', 'item_id', { unique: false });
        store.createIndex('tagId', 'tag_id', { unique: false });
      }
      if (!db.objectStoreNames.contains(STORES.userSettings)) {
        db.createObjectStore(STORES.userSettings, { keyPath: 'user_id' });
      }
      if (!db.objectStoreNames.contains(STORES.viewSortPrefs)) {
        db.createObjectStore(STORES.viewSortPrefs, { keyPath: ['user_id', 'view_key'] });
      }
      if (!db.objectStoreNames.contains(STORES.meta)) {
        db.createObjectStore(STORES.meta, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      console.error('[OfflineStore] Failed to open IndexedDB:', request.error);
      reject(request.error);
    };
  });

  return dbPromise;
}

// ---- Generic helpers ----

async function getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): Promise<IDBObjectStore> {
  const db = await openDB();
  const tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
}

async function getAllFromStore<T>(storeName: string): Promise<T[]> {
  const store = await getStore(storeName);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as T[]);
    request.onerror = () => reject(request.error);
  });
}

async function putToStore(storeName: string, data: any): Promise<void> {
  const store = await getStore(storeName, 'readwrite');
  return new Promise((resolve, reject) => {
    const request = store.put(data);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function putManyToStore(storeName: string, items: any[]): Promise<void> {
  if (items.length === 0) return;
  const db = await openDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);

  return new Promise((resolve, reject) => {
    for (const item of items) {
      store.put(item);
    }
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function deleteFromStore(storeName: string, key: any): Promise<void> {
  const store = await getStore(storeName, 'readwrite');
  return new Promise((resolve, reject) => {
    const request = store.delete(key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function clearStore(storeName: string): Promise<void> {
  const store = await getStore(storeName, 'readwrite');
  return new Promise((resolve, reject) => {
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// ---- Items ----

export async function getCachedItems(): Promise<any[]> {
  try {
    return await getAllFromStore(STORES.items);
  } catch {
    return [];
  }
}

export async function putCachedItems(items: any[]): Promise<void> {
  try {
    await putManyToStore(STORES.items, items);
  } catch (e) {
    console.warn('[OfflineStore] Failed to cache items:', e);
  }
}

export async function putCachedItem(item: any): Promise<void> {
  try {
    await putToStore(STORES.items, item);
  } catch (e) {
    console.warn('[OfflineStore] Failed to cache item:', e);
  }
}

export async function deleteCachedItem(id: string): Promise<void> {
  try {
    await deleteFromStore(STORES.items, id);
  } catch (e) {
    console.warn('[OfflineStore] Failed to delete cached item:', e);
  }
}

// ---- Tags ----

export async function getCachedTags(): Promise<any[]> {
  try {
    return await getAllFromStore(STORES.tags);
  } catch {
    return [];
  }
}

export async function putCachedTags(tags: any[]): Promise<void> {
  try {
    await clearStore(STORES.tags);
    await putManyToStore(STORES.tags, tags);
  } catch (e) {
    console.warn('[OfflineStore] Failed to cache tags:', e);
  }
}

export async function putCachedTag(tag: any): Promise<void> {
  try {
    await putToStore(STORES.tags, tag);
  } catch (e) {
    console.warn('[OfflineStore] Failed to cache tag:', e);
  }
}

export async function deleteCachedTag(id: string): Promise<void> {
  try {
    await deleteFromStore(STORES.tags, id);
  } catch (e) {
    console.warn('[OfflineStore] Failed to delete cached tag:', e);
  }
}

// ---- Lists ----

export async function getCachedLists(): Promise<any[]> {
  try {
    return await getAllFromStore(STORES.lists);
  } catch {
    return [];
  }
}

export async function putCachedLists(lists: any[]): Promise<void> {
  try {
    await clearStore(STORES.lists);
    await putManyToStore(STORES.lists, lists);
  } catch (e) {
    console.warn('[OfflineStore] Failed to cache lists:', e);
  }
}

export async function putCachedList(list: any): Promise<void> {
  try {
    await putToStore(STORES.lists, list);
  } catch (e) {
    console.warn('[OfflineStore] Failed to cache list:', e);
  }
}

export async function deleteCachedList(id: string): Promise<void> {
  try {
    await deleteFromStore(STORES.lists, id);
  } catch (e) {
    console.warn('[OfflineStore] Failed to delete cached list:', e);
  }
}

// ---- Item Tags ----

export async function getCachedItemTags(): Promise<any[]> {
  try {
    return await getAllFromStore(STORES.itemTags);
  } catch {
    return [];
  }
}

export async function putCachedItemTags(itemTags: any[]): Promise<void> {
  try {
    await clearStore(STORES.itemTags);
    await putManyToStore(STORES.itemTags, itemTags);
  } catch (e) {
    console.warn('[OfflineStore] Failed to cache item tags:', e);
  }
}

// ---- User Settings ----

export async function getCachedUserSettings(userId: string): Promise<any | null> {
  try {
    const store = await getStore(STORES.userSettings);
    return new Promise((resolve, reject) => {
      const request = store.get(userId);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return null;
  }
}

export async function putCachedUserSettings(settings: any): Promise<void> {
  try {
    await putToStore(STORES.userSettings, settings);
  } catch (e) {
    console.warn('[OfflineStore] Failed to cache user settings:', e);
  }
}

// ---- View Sort Preferences ----

export async function getCachedViewSortPrefs(): Promise<any[]> {
  try {
    return await getAllFromStore(STORES.viewSortPrefs);
  } catch {
    return [];
  }
}

export async function putCachedViewSortPrefs(prefs: any[]): Promise<void> {
  try {
    await clearStore(STORES.viewSortPrefs);
    await putManyToStore(STORES.viewSortPrefs, prefs);
  } catch (e) {
    console.warn('[OfflineStore] Failed to cache view sort prefs:', e);
  }
}

// ---- Meta / Sync timestamps ----

export async function getLastSyncTimestamp(): Promise<string | null> {
  try {
    const store = await getStore(STORES.meta);
    return new Promise((resolve, reject) => {
      const request = store.get('lastSync');
      request.onsuccess = () => resolve(request.result?.value || null);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return null;
  }
}

export async function setLastSyncTimestamp(timestamp: string): Promise<void> {
  try {
    await putToStore(STORES.meta, { key: 'lastSync', value: timestamp });
  } catch (e) {
    console.warn('[OfflineStore] Failed to set sync timestamp:', e);
  }
}

// ---- Bulk operations ----

/**
 * Replace all cached data for a user. Used after a full sync from the server.
 */
export async function replaceAllCachedData(data: {
  items: any[];
  tags: any[];
  lists: any[];
  itemTags: any[];
}): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(
      [STORES.items, STORES.tags, STORES.lists, STORES.itemTags],
      'readwrite'
    );

    // Clear all stores
    tx.objectStore(STORES.items).clear();
    tx.objectStore(STORES.tags).clear();
    tx.objectStore(STORES.lists).clear();
    tx.objectStore(STORES.itemTags).clear();

    // Put all new data
    for (const item of data.items) {
      tx.objectStore(STORES.items).put(item);
    }
    for (const tag of data.tags) {
      tx.objectStore(STORES.tags).put(tag);
    }
    for (const list of data.lists) {
      tx.objectStore(STORES.lists).put(list);
    }
    for (const itemTag of data.itemTags) {
      tx.objectStore(STORES.itemTags).put(itemTag);
    }

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.warn('[OfflineStore] Failed to replace all cached data:', e);
  }
}

// ---- Local Search ----

/**
 * Search items locally from IndexedDB by matching query against title and content.
 * Used for instant search results while server search is loading.
 */
export async function searchItemsLocally(
  query: string,
  userId: string,
  maxResults = 20
): Promise<any[]> {
  try {
    const allItems = await getCachedItems();
    const lowerQuery = query.toLowerCase();
    const results: any[] = [];

    for (const item of allItems) {
      // Skip items from other users
      if (String(item.user_id) !== String(userId)) continue;
      // Skip deleted items
      if (item.deleted_at) continue;

      const titleMatch = (item.title || '').toLowerCase().includes(lowerQuery);
      const contentMatch = (item.content || '').toLowerCase().includes(lowerQuery);

      if (titleMatch || contentMatch) {
        results.push(item);
        if (results.length >= maxResults) break;
      }
    }

    return results;
  } catch {
    return [];
  }
}

// ---- Local Sidebar Counts ----

/**
 * Compute sidebar counts locally from IndexedDB items.
 * Used for instant sidebar counts on mount and when offline.
 */
export async function computeSidebarCountsLocally(userId: string): Promise<{
  counts: Record<string, number>;
  tagCounts: Record<string, number>;
  listCounts: Record<string, number>;
}> {
  const [allItems, allTags] = await Promise.all([
    getCachedItems(),
    getCachedTags(),
  ]);

  let all = 0, tasks = 0, notes = 0, pinned = 0, completed = 0, trash = 0, miscellaneous = 0, todo = 0;
  const tagCounts: Record<string, number> = {};
  const listCounts: Record<string, number> = {};

  // Initialize tag counts to 0
  const userTags = allTags.filter((t: any) => String(t.user_id) === String(userId));
  for (const tag of userTags) {
    tagCounts[tag.id] = 0;
  }

  // Get item_tags for tag counting
  let itemTagMap: Record<string, string[]> = {};
  try {
    const allItemTags = await getCachedItemTags();
    for (const it of allItemTags) {
      const itemId = it.item_id;
      if (!itemTagMap[itemId]) itemTagMap[itemId] = [];
      itemTagMap[itemId].push(it.tag_id);
    }
  } catch {
    // If item_tags aren't cached, skip tag counting
  }

  for (const item of allItems) {
    // Skip items from other users
    if (String(item.user_id) !== String(userId)) continue;

    if (item.deleted_at) {
      trash++;
      continue;
    }

    // Active (non-deleted) item
    // Completed items only count toward the 'completed' counter;
    // all other counters (all, tasks, notes, pinned, misc, todo, tags, lists) exclude them.
    if (item.is_completed) {
      completed++;
      continue;
    }

    all++;
    if (item.type === 'task') tasks++;
    if (item.type === 'note') notes++;
    if (item.is_pinned) pinned++;
    if (!item.list_id) miscellaneous++;
    if (item.has_uncompleted_todos) todo++;

    // Count tags (excluding completed items)
    const itemTags = itemTagMap[item.id] || [];
    for (const tagId of itemTags) {
      tagCounts[tagId] = (tagCounts[tagId] || 0) + 1;
    }

    // Count lists (excluding completed items)
    if (item.list_id) {
      listCounts[item.list_id] = (listCounts[item.list_id] || 0) + 1;
    }
  }

  return {
    counts: { all, tasks, notes, pinned, completed, trash, miscellaneous, todo },
    tagCounts,
    listCounts,
  };
}

// ---- Pre-warm ----

/** Pre-warm the IndexedDB connection (call early in app lifecycle) */
export function preWarm(): void {
  openDB().catch(() => {});
}

/**
 * Clear all offline data (used on logout).
 */
export async function clearAllCachedData(): Promise<void> {
  try {
    const db = await openDB();
    const storeNames = Object.values(STORES);
    const tx = db.transaction(storeNames, 'readwrite');
    for (const name of storeNames) {
      tx.objectStore(name).clear();
    }
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.warn('[OfflineStore] Failed to clear all cached data:', e);
  }
}

// ---- User-filtered convenience methods ----
// These methods filter cached data by user_id and return domain-ready rows.
// They allow hooks to work with user-scoped data without needing a separate adapter layer.

/**
 * Get all cached items for a specific user.
 */
export async function getItemsForUser(userId: string): Promise<any[]> {
  const allItems = await getCachedItems();
  return allItems.filter((item: any) => String(item.user_id) === String(userId));
}

/**
 * Get all cached tags for a specific user.
 */
export async function getTagsForUser(userId: string): Promise<any[]> {
  const allTags = await getCachedTags();
  return allTags.filter((tag: any) => String(tag.user_id) === String(userId));
}

/**
 * Get all cached lists for a specific user.
 */
export async function getListsForUser(userId: string): Promise<any[]> {
  const allLists = await getCachedLists();
  return allLists.filter((list: any) => String(list.user_id) === String(userId));
}

/**
 * Check if there is any cached data for a specific user.
 */
export async function hasCachedDataForUser(userId: string): Promise<boolean> {
  const allItems = await getCachedItems();
  return allItems.some((item: any) => String(item.user_id) === String(userId));
}
