/**
 * Browser Database Adapter — Default database adapter for momentum-foundation.
 *
 * Implements the full DatabaseAdapter interface using IndexedDB.
 * All data is stored locally in the browser — no server communication needed.
 *
 * Performance optimizations (v2):
 * - Index-based lookups for user_id, type, list_id, item_id, tag_id queries
 * - Compound indexes (user_type, user_list) for common query patterns
 * - Single-pass sidebar counts algorithm (replaces 8 separate filter passes)
 * - Write-through in-memory cache with 5s TTL for hot tables
 * - O(n) tag lookup maps instead of O(n*m) nested filters
 * - __or filter support for Supabase-style search queries
 *
 * Bug fixes (v2):
 * - Sidebar counts field names now match momentum3 server format (all, tasks, notes...)
 * - Sidebar counts return shape is now a single object, not an array
 * - Count logic aligned with momentum3 server (all=active items, tasks=all tasks, etc.)
 *
 * Stores: items, tags, lists, item_tags, user_settings, view_sort_preferences, meta
 */
import type { DatabaseAdapter, QueryOptions, QueryResult, MutationResult } from '../types';

const DB_NAME = 'momentum-foundation';
const DB_VERSION = 2; // Bumped for new compound indexes

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

// ─── In-memory write-through cache ───────────────────────────────────────────

interface CacheEntry {
  data: any[];
  timestamp: number;
}

const CACHE_TTL = 5000; // 5s — short enough to stay fresh, long enough to batch reads

export class BrowserDatabaseAdapter implements DatabaseAdapter {
  readonly type = 'browser';
  private db: IDBDatabase | null = null;
  private dbPromise: Promise<IDBDatabase> | null = null;
  private cache = new Map<string, CacheEntry>();

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
        const oldVersion = event.oldVersion;

        if (oldVersion < 1) {
          // Fresh install — create all stores with indexes
          const itemStore = db.createObjectStore(STORES.items, { keyPath: 'id' });
          itemStore.createIndex('user_id', 'user_id', { unique: false });
          itemStore.createIndex('list_id', 'list_id', { unique: false });
          itemStore.createIndex('updated_at', 'updated_at', { unique: false });
          itemStore.createIndex('type', 'type', { unique: false });
          itemStore.createIndex('user_type', ['user_id', 'type'], { unique: false });
          itemStore.createIndex('user_list', ['user_id', 'list_id'], { unique: false });

          const tagStore = db.createObjectStore(STORES.tags, { keyPath: 'id' });
          tagStore.createIndex('user_id', 'user_id', { unique: false });

          const listStore = db.createObjectStore(STORES.lists, { keyPath: 'id' });
          listStore.createIndex('user_id', 'user_id', { unique: false });

          const itemTagStore = db.createObjectStore(STORES.item_tags, { autoIncrement: true });
          itemTagStore.createIndex('item_id', 'item_id', { unique: false });
          itemTagStore.createIndex('tag_id', 'tag_id', { unique: false });
          itemTagStore.createIndex('compound', ['item_id', 'tag_id'], { unique: true });

          db.createObjectStore(STORES.user_settings, { keyPath: 'user_id' });
          db.createObjectStore(STORES.view_sort_preferences, { keyPath: ['user_id', 'view_key'] });
          db.createObjectStore(STORES.meta, { keyPath: 'key' });
        }

        if (oldVersion >= 1 && oldVersion < 2) {
          // Migration: add compound indexes to existing items store
          const tx = (event.target as IDBOpenDBRequest).transaction!;
          const itemStore = tx.objectStore(STORES.items);
          if (!itemStore.indexNames.contains('user_type')) {
            itemStore.createIndex('user_type', ['user_id', 'type'], { unique: false });
          }
          if (!itemStore.indexNames.contains('user_list')) {
            itemStore.createIndex('user_list', ['user_id', 'list_id'], { unique: false });
          }
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

  // ─── Cache helpers ──────────────────────────────────────────────────────

  private invalidateCache(table?: string) {
    if (table) {
      const resolved = resolveTable(table);
      this.cache.delete(resolved);
      // Invalidate related caches when items or item_tags change
      if (resolved === 'items' || resolved === 'item_tags') {
        this.cache.delete('items');
        this.cache.delete('item_tags');
      }
    } else {
      this.cache.clear();
    }
  }

  private getCached(table: string): any[] | null {
    const resolved = resolveTable(table);
    const entry = this.cache.get(resolved);
    if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
      return entry.data;
    }
    return null;
  }

  private setCache(table: string, data: any[]): void {
    const resolved = resolveTable(table);
    this.cache.set(resolved, { data, timestamp: Date.now() });
  }

  // ─── Store access ──────────────────────────────────────────────────────

  private async getStore(table: string, mode: IDBTransactionMode = 'readonly'): Promise<IDBObjectStore> {
    const db = await this.getDb();
    const storeName = resolveTable(table);
    const tx = db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  }

  private async getAllFromStore(table: string): Promise<any[]> {
    const cached = this.getCached(table);
    if (cached) return cached;

    const store = await this.getStore(table);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const data = request.result || [];
        this.setCache(table, data);
        resolve(data);
      };
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Index-based lookup: retrieve all records matching a specific index value.
   * Much faster than getAll() + filter for large tables.
   */
  private async getByIndex(table: string, indexName: string, value: any): Promise<any[]> {
    const store = await this.getStore(table);
    return new Promise((resolve, reject) => {
      const index = store.index(indexName);
      const request = index.getAll(value);
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  // ─── Query ──────────────────────────────────────────────────────────────

  async query<T = any>(table: string, options?: QueryOptions): Promise<QueryResult<T[]>> {
    try {
      const resolvedTable = resolveTable(table);
      let rows: any[];
      const filters = options?.filters || {};
      const filterKeys = Object.keys(filters).filter(k => k !== '__or');

      // Optimization: use index-based lookup when possible
      if (this.canUseIndex(resolvedTable, filterKeys, filters)) {
        rows = await this.getByIndexOptimized(resolvedTable, filterKeys, filters);
        // Apply remaining filters not handled by the index
        const remainingFilters = this.getRemainingFilters(filterKeys, filters);
        if (Object.keys(remainingFilters).length > 0 || filters.__or) {
          rows = this.applyFilters(rows, { ...remainingFilters, ...(filters.__or ? { __or: filters.__or } : {}) });
        }
      } else {
        rows = await this.getAllFromStore(table);
        if (Object.keys(filters).length > 0) {
          rows = this.applyFilters(rows, filters);
        }
      }

      // Handle select with joins (e.g., '*, item_tags(tag_id)')
      if (options?.select && options.select.includes('item_tags(tag_id)') && resolvedTable === 'items') {
        const itemTags = await this.getAllFromStore('item_tags');
        // Build a lookup map for O(n) instead of O(n*m)
        const tagMap = new Map<string, { tag_id: string }[]>();
        for (const it of itemTags) {
          const existing = tagMap.get(it.item_id);
          if (existing) {
            existing.push({ tag_id: it.tag_id });
          } else {
            tagMap.set(it.item_id, [{ tag_id: it.tag_id }]);
          }
        }
        rows = rows.map((item: any) => ({
          ...item,
          item_tags: tagMap.get(item.id) || [],
        }));
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

  /**
   * Determine if we can use an IndexedDB index for the given filters.
   */
  private canUseIndex(table: string, filterKeys: string[], filters: Record<string, any>): boolean {
    if (table === 'items') {
      if (filterKeys.includes('user_id') && typeof filters.user_id === 'string') return true;
    }
    if (table === 'item_tags') {
      if (filterKeys.includes('item_id')) return true;
      if (filterKeys.includes('tag_id')) return true;
    }
    if ((table === 'tags' || table === 'lists') && filterKeys.includes('user_id')) {
      return true;
    }
    return false;
  }

  /**
   * Use the best available index for the given filters.
   */
  private async getByIndexOptimized(table: string, filterKeys: string[], filters: Record<string, any>): Promise<any[]> {
    if (table === 'items' && filterKeys.includes('user_id')) {
      return this.getByIndex('items', 'user_id', String(filters.user_id));
    }
    if (table === 'item_tags') {
      if (filterKeys.includes('item_id')) {
        return this.getByIndex('item_tags', 'item_id', filters.item_id);
      }
      if (filterKeys.includes('tag_id')) {
        return this.getByIndex('item_tags', 'tag_id', filters.tag_id);
      }
    }
    if ((table === 'tags' || table === 'lists') && filterKeys.includes('user_id')) {
      return this.getByIndex(table, 'user_id', String(filters.user_id));
    }
    return this.getAllFromStore(table);
  }

  /**
   * Get filters that weren't handled by the index lookup.
   */
  private getRemainingFilters(filterKeys: string[], filters: Record<string, any>): Record<string, any> {
    const remaining: Record<string, any> = {};
    const indexedKeys = new Set(['user_id', 'item_id', 'tag_id']);
    for (const key of filterKeys) {
      if (!indexedKeys.has(key)) {
        remaining[key] = filters[key];
      }
    }
    return remaining;
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
      const resolvedTable = resolveTable(table);
      const store = await this.getStore(table, 'readwrite');
      const items = Array.isArray(data) ? data : [data];

      // Dynamically read the store's keyPath to ensure every record has the
      // required key field(s). This is robust regardless of schema version.
      const keyPath = store.keyPath; // string | string[] | null
      const autoIncrement = store.autoIncrement;

      const enriched = items.map(item => {
        // If the store uses autoIncrement with no keyPath, no key is needed
        if (autoIncrement && !keyPath) return { ...item };

        const copy = { ...item };

        if (typeof keyPath === 'string') {
          // Single keyPath (e.g. 'id', 'user_id', 'key')
          if (copy[keyPath] === undefined || copy[keyPath] === null) {
            // Auto-generate UUID for 'id' fields; warn for others
            if (keyPath === 'id') {
              copy[keyPath] = crypto.randomUUID();
            } else {
              console.warn(`[BrowserDB] insert into '${resolvedTable}' missing keyPath '${keyPath}':`, JSON.stringify(copy).slice(0, 200));
            }
          }
        } else if (Array.isArray(keyPath)) {
          // Compound keyPath (e.g. ['user_id', 'view_key'] or ['item_id', 'tag_id'])
          for (const k of keyPath) {
            if (copy[k] === undefined || copy[k] === null) {
              console.warn(`[BrowserDB] insert into '${resolvedTable}' missing compound keyPath field '${k}':`, JSON.stringify(copy).slice(0, 200));
            }
          }
        }

        return copy;
      });

      return new Promise((resolve, reject) => {
        const tx = store.transaction;
        for (const item of enriched) {
          try {
            store.put(item);
          } catch (putErr: any) {
            console.error(`[BrowserDB] put failed on table '${resolvedTable}':`, putErr.message,
              '| keyPath:', JSON.stringify(keyPath),
              '| autoIncrement:', autoIncrement,
              '| record keys:', Object.keys(item),
              '| record:', JSON.stringify(item).slice(0, 300));
            throw putErr;
          }
        }
        tx.oncomplete = () => {
          this.invalidateCache(table);
          // Return the enriched data (with generated ids) so callers can reference them
          const result = Array.isArray(data) ? enriched : enriched[0];
          resolve({ data: result as T, error: null });
        };
        tx.onerror = () => {
          console.error(`[BrowserDB] transaction error on table '${resolvedTable}':`, tx.error);
          reject(tx.error);
        };
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
        tx.oncomplete = () => {
          this.invalidateCache(table);
          resolve({ data: (updated.length === 1 ? updated[0] : updated) as T, error: null });
        };
        tx.onerror = () => reject(tx.error);
      });
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  }

  // ─── Upsert ─────────────────────────────────────────────────────────────

  async upsert<T = any>(table: string, data: any | any[]): Promise<MutationResult<T>> {
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
          if (resolvedTable === 'item_tags') {
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
        tx.oncomplete = () => {
          this.invalidateCache(table);
          resolve({ data: null, error: null });
        };
        tx.onerror = () => reject(tx.error);
      });
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  }

  // ─── Batch Update ───────────────────────────────────────────────────────

  async batchUpdate<T = any>(table: string, updates: { filters: Record<string, any>; data: any }[]): Promise<MutationResult<T>> {
    if (updates.length === 0) return { data: [] as any, error: null };
    try {
      // Load all rows once, then apply all updates in a single readwrite transaction
      const allRows = await this.getAllFromStore(table);
      const store = await this.getStore(table, 'readwrite');

      return new Promise((resolve, reject) => {
        const tx = store.transaction;
        const results: any[] = [];

        for (const { filters, data } of updates) {
          const matched = this.applyFilters(allRows, filters);
          for (const row of matched) {
            const merged = { ...row, ...data };
            store.put(merged);
            results.push(merged);
            // Also update the in-memory row so subsequent filter passes see the new values
            Object.assign(row, data);
          }
        }

        tx.oncomplete = () => {
          this.invalidateCache(table);
          resolve({ data: results as T, error: null });
        };
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

  /**
   * Single-pass sidebar counts algorithm.
   * Replaces the previous 8-pass approach with one loop over items.
   * Returns field names and shape matching the momentum3 server format.
   */
  private async rpcGetSidebarCounts(userId: string): Promise<QueryResult> {
    // Use index-based lookup for user's items (avoids full table scan)
    const userItems = await this.getByIndex('items', 'user_id', String(userId));
    const itemTags = await this.getAllFromStore('item_tags');

    // Single-pass counts — one loop, all counters
    const activeItemIds = new Set<string>();
    const tagCounts: Record<string, number> = {};
    const listCounts: Record<string, number> = {};
    let all = 0, tasks = 0, notes = 0, pinned = 0, completed = 0, trash = 0, miscellaneous = 0, todo = 0;

    for (const item of userItems) {
      if (item.deleted_at) {
        trash++;
        continue;
      }

      // Active item
      all++;
      activeItemIds.add(item.id);

      if (item.type === 'task') tasks++;
      if (item.type === 'note') notes++;
      if (item.is_pinned) pinned++;
      if (item.is_completed) completed++;
      if (!item.list_id) miscellaneous++;
      if (item.type === 'task' && !item.is_completed) todo++;

      // List counts
      if (item.list_id) {
        listCounts[item.list_id] = (listCounts[item.list_id] || 0) + 1;
      }
    }

    // Tag counts — single pass over item_tags
    for (const it of itemTags) {
      if (activeItemIds.has(it.item_id)) {
        tagCounts[it.tag_id] = (tagCounts[it.tag_id] || 0) + 1;
      }
    }

    // Return format matching momentum3 server: single object, not array
    return {
      data: {
        all,
        tasks,
        notes,
        pinned,
        completed,
        trash,
        miscellaneous,
        todo,
        tag_counts: tagCounts,
        list_counts: listCounts,
      },
      error: null,
    };
  }

  /**
   * Optimized search with tag lookup map for O(n) joins.
   */
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

    // Attach item_tags using a lookup map (O(n) instead of O(n*m))
    const itemTags = await this.getAllFromStore('item_tags');
    const tagMap = new Map<string, { tag_id: string }[]>();
    for (const it of itemTags) {
      const existing = tagMap.get(it.item_id);
      if (existing) {
        existing.push({ tag_id: it.tag_id });
      } else {
        tagMap.set(it.item_id, [{ tag_id: it.tag_id }]);
      }
    }

    results = results.slice(0, max_results).map((item: any) => ({
      ...item,
      item_tags: tagMap.get(item.id) || [],
    }));

    return { data: results, error: null };
  }

  // ─── Filter Helpers ─────────────────────────────────────────────────────

  private applyFilters(rows: any[], filters: Record<string, any>): any[] {
    // Handle __or filter separately
    const orFilter = filters.__or;
    const regularFilters = { ...filters };
    delete regularFilters.__or;

    let result = rows;

    // Apply regular AND filters
    if (Object.keys(regularFilters).length > 0) {
      result = result.filter((row) => {
        for (const [key, value] of Object.entries(regularFilters)) {
          if (!this.matchFilter(row, key, value)) return false;
        }
        return true;
      });
    }

    // Apply OR filter (Supabase-style: "title.ilike.%search%,content.ilike.%search%")
    if (orFilter && typeof orFilter === 'string') {
      const orConditions = this.parseOrFilter(orFilter);
      if (orConditions.length > 0) {
        result = result.filter((row) => {
          return orConditions.some(({ column, op, value }) => {
            const filterKey = op === 'eq' ? column : `${column}__${op}`;
            return this.matchFilter(row, filterKey, value);
          });
        });
      }
    }

    return result;
  }

  /**
   * Parse a Supabase-style OR filter string.
   * Format: "column.op.value,column.op.value"
   * Example: "title.ilike.%search%,content.ilike.%search%"
   */
  private parseOrFilter(filterString: string): Array<{ column: string; op: string; value: any }> {
    const conditions: Array<{ column: string; op: string; value: any }> = [];
    const parts = filterString.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      const firstDot = trimmed.indexOf('.');
      if (firstDot === -1) continue;
      const column = trimmed.substring(0, firstDot);
      const rest = trimmed.substring(firstDot + 1);
      const secondDot = rest.indexOf('.');
      if (secondDot === -1) continue;
      const op = rest.substring(0, secondDot);
      const value = rest.substring(secondDot + 1);
      conditions.push({ column, op, value });
    }
    return conditions;
  }

  /**
   * Match a single filter condition against a row.
   */
  private matchFilter(row: any, key: string, value: any): boolean {
    if (key.endsWith('__is')) {
      const col = key.replace('__is', '');
      return value === null ? row[col] == null : row[col] === value;
    } else if (key.endsWith('__not_is')) {
      const col = key.replace('__not_is', '');
      return value === null ? row[col] != null : row[col] !== value;
    } else if (key.endsWith('__in')) {
      const col = key.replace('__in', '');
      return Array.isArray(value) && value.includes(row[col]);
    } else if (key.endsWith('__neq')) {
      const col = key.replace('__neq', '');
      return row[col] !== value;
    } else if (key.endsWith('__gt')) {
      const col = key.replace('__gt', '');
      return row[col] > value;
    } else if (key.endsWith('__gte')) {
      const col = key.replace('__gte', '');
      return row[col] >= value;
    } else if (key.endsWith('__lt')) {
      const col = key.replace('__lt', '');
      return row[col] < value;
    } else if (key.endsWith('__lte')) {
      const col = key.replace('__lte', '');
      return row[col] <= value;
    } else if (key.endsWith('__ilike')) {
      const col = key.replace('__ilike', '');
      const pattern = String(value).replace(/%/g, '').toLowerCase();
      return (row[col] || '').toLowerCase().includes(pattern);
    } else {
      // Exact match
      return String(row[key]) === String(value);
    }
  }
}
