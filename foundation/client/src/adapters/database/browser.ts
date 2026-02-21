/**
 * Browser Database Adapter — Default database adapter for momentum-foundation.
 *
 * Implements the full DatabaseAdapter interface using IndexedDB.
 * All data is stored locally in the browser — no server communication needed.
 *
 * Stores: items, tags, lists, item_tags, user_settings, view_sort_preferences, meta
 */
import type { DatabaseAdapter, QueryOptions, QueryResult, MutationResult } from '../types';

const DB_NAME = 'momentum-foundation';
const DB_VERSION = 1;

const STORES = {
  items: 'items',
  tags: 'tags',
  lists: 'lists',
  item_tags: 'item_tags',
  user_settings: 'user_settings',
  view_sort_preferences: 'view_sort_preferences',
  meta: 'meta',
} as const;

// Alias mapping for camelCase table names
const TABLE_ALIASES: Record<string, string> = {
  itemTags: 'item_tags',
  userSettings: 'user_settings',
  viewSortPreferences: 'view_sort_preferences',
};

function resolveTable(table: string): string {
  return TABLE_ALIASES[table] || table;
}

export class BrowserDatabaseAdapter implements DatabaseAdapter {
  readonly type = 'browser';
  private db: IDBDatabase | null = null;
  private dbPromise: Promise<IDBDatabase> | null = null;

  async initialize(): Promise<void> {
    await this.getDb();
  }

  isAvailable(): boolean {
    return typeof indexedDB !== 'undefined';
  }

  isLocal(): boolean {
    return true;
  }

  private getDb(): Promise<IDBDatabase> {
    if (this.db) return Promise.resolve(this.db);
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(STORES.items)) {
          const store = db.createObjectStore(STORES.items, { keyPath: 'id' });
          store.createIndex('user_id', 'user_id', { unique: false });
          store.createIndex('list_id', 'list_id', { unique: false });
          store.createIndex('updated_at', 'updated_at', { unique: false });
          store.createIndex('type', 'type', { unique: false });
        }

        if (!db.objectStoreNames.contains(STORES.tags)) {
          const store = db.createObjectStore(STORES.tags, { keyPath: 'id' });
          store.createIndex('user_id', 'user_id', { unique: false });
        }

        if (!db.objectStoreNames.contains(STORES.lists)) {
          const store = db.createObjectStore(STORES.lists, { keyPath: 'id' });
          store.createIndex('user_id', 'user_id', { unique: false });
        }

        if (!db.objectStoreNames.contains(STORES.item_tags)) {
          const store = db.createObjectStore(STORES.item_tags, { autoIncrement: true });
          store.createIndex('item_id', 'item_id', { unique: false });
          store.createIndex('tag_id', 'tag_id', { unique: false });
          store.createIndex('compound', ['item_id', 'tag_id'], { unique: true });
        }

        if (!db.objectStoreNames.contains(STORES.user_settings)) {
          db.createObjectStore(STORES.user_settings, { keyPath: 'user_id' });
        }

        if (!db.objectStoreNames.contains(STORES.view_sort_preferences)) {
          db.createObjectStore(STORES.view_sort_preferences, { keyPath: ['user_id', 'view_key'] });
        }

        if (!db.objectStoreNames.contains(STORES.meta)) {
          db.createObjectStore(STORES.meta, { keyPath: 'key' });
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onerror = () => {
        console.error('[BrowserDB] Failed to open IndexedDB:', request.error);
        reject(request.error);
      };
    });

    return this.dbPromise;
  }

  private async getStore(table: string, mode: IDBTransactionMode = 'readonly'): Promise<IDBObjectStore> {
    const db = await this.getDb();
    const storeName = resolveTable(table);
    const tx = db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  }

  private async getAllFromStore(table: string): Promise<any[]> {
    const store = await this.getStore(table);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  // ─── Query ──────────────────────────────────────────────────────────────

  async query<T = any>(table: string, options?: QueryOptions): Promise<QueryResult<T[]>> {
    try {
      let rows = await this.getAllFromStore(table);
      const resolvedTable = resolveTable(table);

      // Handle select with joins (e.g., '*, item_tags(tag_id)')
      if (options?.select && options.select.includes('item_tags(tag_id)') && resolvedTable === 'items') {
        const itemTags = await this.getAllFromStore('item_tags');
        rows = rows.map((item: any) => ({
          ...item,
          item_tags: itemTags
            .filter((it: any) => it.item_id === item.id)
            .map((it: any) => ({ tag_id: it.tag_id })),
        }));
      }

      // Apply filters
      if (options?.filters) {
        rows = this.applyFilters(rows, options.filters);
      }

      // Apply ordering
      if (options?.order) {
        const { column, ascending } = options.order;
        rows.sort((a: any, b: any) => {
          const aVal = a[column];
          const bVal = b[column];
          if (aVal == null && bVal == null) return 0;
          if (aVal == null) return ascending ? -1 : 1;
          if (bVal == null) return ascending ? 1 : -1;
          if (aVal < bVal) return ascending ? -1 : 1;
          if (aVal > bVal) return ascending ? 1 : -1;
          return 0;
        });
      }

      const totalCount = rows.length;

      // Apply offset and limit
      if (options?.offset !== undefined || options?.limit !== undefined) {
        const start = options.offset || 0;
        const end = options.limit ? start + options.limit : undefined;
        rows = rows.slice(start, end);
      }

      return {
        data: rows as T[],
        error: null,
        count: options?.count ? totalCount : undefined,
      };
    } catch (err: any) {
      return { data: null, error: { message: err.message }, count: null };
    }
  }

  async querySingle<T = any>(table: string, options?: QueryOptions): Promise<QueryResult<T>> {
    const result = await this.query<T>(table, { ...options, limit: 1 });
    if (result.error) return { data: null, error: result.error };
    const row = result.data && result.data.length > 0 ? result.data[0] : null;
    return { data: row, error: null };
  }

  // ─── Insert ─────────────────────────────────────────────────────────────

  async insert<T = any>(table: string, data: any | any[]): Promise<MutationResult<T>> {
    try {
      const store = await this.getStore(table, 'readwrite');
      const items = Array.isArray(data) ? data : [data];

      return new Promise((resolve, reject) => {
        const tx = store.transaction;
        for (const item of items) {
          store.put(item); // put handles both insert and update
        }
        tx.oncomplete = () => resolve({ data: data as T, error: null });
        tx.onerror = () => reject(tx.error);
      });
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  }

  // ─── Update ─────────────────────────────────────────────────────────────

  async update<T = any>(table: string, filters: Record<string, any>, data: any): Promise<MutationResult<T>> {
    try {
      let rows = await this.getAllFromStore(table);
      rows = this.applyFilters(rows, filters);

      const store = await this.getStore(table, 'readwrite');
      return new Promise((resolve, reject) => {
        const tx = store.transaction;
        const updated: any[] = [];
        for (const row of rows) {
          const merged = { ...row, ...data };
          store.put(merged);
          updated.push(merged);
        }
        tx.oncomplete = () => resolve({ data: (updated.length === 1 ? updated[0] : updated) as T, error: null });
        tx.onerror = () => reject(tx.error);
      });
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  }

  // ─── Upsert ─────────────────────────────────────────────────────────────

  async upsert<T = any>(table: string, data: any | any[]): Promise<MutationResult<T>> {
    // IndexedDB put() is naturally an upsert
    return this.insert<T>(table, data);
  }

  // ─── Delete ─────────────────────────────────────────────────────────────

  async delete(table: string, filters: Record<string, any>): Promise<MutationResult> {
    try {
      let rows = await this.getAllFromStore(table);
      rows = this.applyFilters(rows, filters);

      const resolvedTable = resolveTable(table);
      const store = await this.getStore(table, 'readwrite');

      return new Promise((resolve, reject) => {
        const tx = store.transaction;
        for (const row of rows) {
          // Determine the key based on the store's keyPath
          if (resolvedTable === 'item_tags') {
            // item_tags uses autoIncrement, need to delete by cursor
            const index = store.index('compound');
            const keyRange = IDBKeyRange.only([row.item_id, row.tag_id]);
            const cursorReq = index.openCursor(keyRange);
            cursorReq.onsuccess = () => {
              const cursor = cursorReq.result;
              if (cursor) {
                cursor.delete();
                cursor.continue();
              }
            };
          } else if (resolvedTable === 'view_sort_preferences') {
            store.delete([row.user_id, row.view_key]);
          } else {
            store.delete(row.id || row.user_id || row.key);
          }
        }
        tx.oncomplete = () => resolve({ data: null, error: null });
        tx.onerror = () => reject(tx.error);
      });
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  }

  // ─── RPC ────────────────────────────────────────────────────────────────

  async rpc<T = any>(functionName: string, params?: Record<string, any>): Promise<QueryResult<T>> {
    try {
      switch (functionName) {
        case 'get_sidebar_counts':
          return this.rpcGetSidebarCounts(params?.p_user_id) as Promise<QueryResult<T>>;
        case 'search_items':
        case 'search_items_fuzzy':
          return this.rpcSearchItems(params) as Promise<QueryResult<T>>;
        default:
          return { data: null, error: { message: `Unknown RPC: ${functionName}` } };
      }
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  }

  // ─── RPC Implementations ───────────────────────────────────────────────

  private async rpcGetSidebarCounts(userId: string): Promise<QueryResult> {
    const items = await this.getAllFromStore('items');
    const userItems = items.filter((i: any) => String(i.user_id) === String(userId));

    const active = userItems.filter((i: any) => !i.deleted_at);
    const tasks = active.filter((i: any) => i.type === 'task' && !i.is_completed);
    const notes = active.filter((i: any) => i.type === 'note');
    const pinned = active.filter((i: any) => i.is_pinned);
    const completed = userItems.filter((i: any) => i.type === 'task' && i.is_completed && !i.deleted_at);
    const trash = userItems.filter((i: any) => !!i.deleted_at);
    const miscellaneous = active.filter((i: any) => !i.list_id);
    const todo = active.filter((i: any) => i.has_uncompleted_todos);

    // Tag counts
    const itemTags = await this.getAllFromStore('item_tags');
    const activeItemIds = new Set(active.map((i: any) => i.id));
    const tagCounts: Record<string, number> = {};
    for (const it of itemTags) {
      if (activeItemIds.has(it.item_id)) {
        tagCounts[it.tag_id] = (tagCounts[it.tag_id] || 0) + 1;
      }
    }

    // List counts
    const listCounts: Record<string, number> = {};
    for (const item of active) {
      if (item.list_id) {
        listCounts[item.list_id] = (listCounts[item.list_id] || 0) + 1;
      }
    }

    return {
      data: [{
        all_count: tasks.length + notes.length,
        tasks_count: tasks.length,
        notes_count: notes.length,
        pinned_count: pinned.length,
        completed_count: completed.length,
        trash_count: trash.length,
        miscellaneous_count: miscellaneous.length,
        todo_count: todo.length,
        tag_counts: tagCounts,
        list_counts: listCounts,
      }],
      error: null,
    };
  }

  private async rpcSearchItems(params: any): Promise<QueryResult> {
    const { search_text, max_results = 50, filter_list_id, filter_tag_id } = params || {};
    if (!search_text) return { data: [], error: null };

    const items = await this.getAllFromStore('items');
    const searchLower = search_text.toLowerCase();

    let results = items.filter((item: any) => {
      if (item.deleted_at) return false;
      const titleMatch = (item.title || '').toLowerCase().includes(searchLower);
      const contentMatch = (item.content || '').toLowerCase().includes(searchLower);
      return titleMatch || contentMatch;
    });

    // Apply additional filters
    if (filter_list_id) {
      results = results.filter((i: any) => i.list_id === filter_list_id);
    }

    if (filter_tag_id) {
      const itemTags = await this.getAllFromStore('item_tags');
      const itemIdsWithTag = new Set(
        itemTags.filter((it: any) => it.tag_id === filter_tag_id).map((it: any) => it.item_id)
      );
      results = results.filter((i: any) => itemIdsWithTag.has(i.id));
    }

    // Sort by relevance (title matches first, then by updated_at)
    results.sort((a: any, b: any) => {
      const aTitle = (a.title || '').toLowerCase().includes(searchLower) ? 1 : 0;
      const bTitle = (b.title || '').toLowerCase().includes(searchLower) ? 1 : 0;
      if (aTitle !== bTitle) return bTitle - aTitle;
      return new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime();
    });

    // Attach item_tags
    const itemTags = await this.getAllFromStore('item_tags');
    results = results.slice(0, max_results).map((item: any) => ({
      ...item,
      item_tags: itemTags
        .filter((it: any) => it.item_id === item.id)
        .map((it: any) => ({ tag_id: it.tag_id })),
    }));

    return { data: results, error: null };
  }

  // ─── Filter Helpers ─────────────────────────────────────────────────────

  private applyFilters(rows: any[], filters: Record<string, any>): any[] {
    return rows.filter((row) => {
      for (const [key, value] of Object.entries(filters)) {
        // Handle special filter operators
        if (key.endsWith('__is')) {
          const col = key.replace('__is', '');
          if (value === null) {
            if (row[col] != null) return false;
          } else {
            if (row[col] !== value) return false;
          }
        } else if (key.endsWith('__not_is')) {
          const col = key.replace('__not_is', '');
          if (value === null) {
            if (row[col] == null) return false;
          } else {
            if (row[col] === value) return false;
          }
        } else if (key.endsWith('__in')) {
          const col = key.replace('__in', '');
          if (!Array.isArray(value) || !value.includes(row[col])) return false;
        } else if (key.endsWith('__neq')) {
          const col = key.replace('__neq', '');
          if (row[col] === value) return false;
        } else if (key.endsWith('__gt')) {
          const col = key.replace('__gt', '');
          if (!(row[col] > value)) return false;
        } else if (key.endsWith('__gte')) {
          const col = key.replace('__gte', '');
          if (!(row[col] >= value)) return false;
        } else if (key.endsWith('__lt')) {
          const col = key.replace('__lt', '');
          if (!(row[col] < value)) return false;
        } else if (key.endsWith('__lte')) {
          const col = key.replace('__lte', '');
          if (!(row[col] <= value)) return false;
        } else if (key.endsWith('__ilike')) {
          const col = key.replace('__ilike', '');
          const pattern = String(value).replace(/%/g, '').toLowerCase();
          if (!(row[col] || '').toLowerCase().includes(pattern)) return false;
        } else {
          // Exact match
          if (String(row[key]) !== String(value)) return false;
        }
      }
      return true;
    });
  }
}
