/**
 * db.ts — Unified database facade for momentum-foundation.
 *
 * This module provides a Supabase-compatible query builder API that delegates
 * to the registered DatabaseAdapter. All existing code that previously imported
 * from `supabaseClient` or `apiClient` should import from this module instead.
 *
 * The API mirrors Supabase's chaining pattern:
 *   db.from('items').select('*').eq('user_id', userId)
 *   db.rpc('search_items', { search_text: query })
 *
 * This is the ONLY integration point between the app code and the database layer.
 */
import { getDatabaseAdapter } from '@/adapters/registry';
import type { DatabaseAdapter, QueryResult, MutationResult } from '@/adapters/types';

// ─── Query Builder ────────────────────────────────────────────────────────────

type FilterOp = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'is' | 'not_is' | 'in' | 'ilike' | 'not';

interface Filter {
  column: string;
  op: FilterOp;
  value: any;
}

interface OrderSpec {
  column: string;
  ascending: boolean;
}

/**
 * Chainable query builder that mimics Supabase's API.
 * Collects filters, ordering, pagination, then executes against the DatabaseAdapter.
 */
class QueryBuilder<T = any> {
  private _table: string;
  private _select: string = '*';
  private _filters: Filter[] = [];
  private _order: OrderSpec | null = null;
  private _offset: number | undefined;
  private _limit: number | undefined;
  private _count: 'exact' | 'planned' | 'estimated' | undefined;
  private _action: 'select' | 'insert' | 'update' | 'delete' | 'upsert' = 'select';
  private _data: any = null;
  private _single = false;
  private _onConflict: string | undefined;
  private _ignoreDuplicates = false;

  constructor(table: string) {
    this._table = table;
  }

  select(columns: string = '*', options?: { count?: 'exact' | 'planned' | 'estimated' }): this {
    this._select = columns;
    this._action = 'select';
    if (options?.count) this._count = options.count;
    return this;
  }

  insert(data: any): this {
    this._action = 'insert';
    this._data = data;
    return this;
  }

  update(data: any): this {
    this._action = 'update';
    this._data = data;
    return this;
  }

  delete(): this {
    this._action = 'delete';
    return this;
  }

  upsert(data: any, options?: { onConflict?: string; ignoreDuplicates?: boolean }): this {
    this._action = 'upsert';
    this._data = data;
    this._onConflict = options?.onConflict;
    this._ignoreDuplicates = options?.ignoreDuplicates || false;
    return this;
  }

  eq(column: string, value: any): this {
    this._filters.push({ column, op: 'eq', value });
    return this;
  }

  neq(column: string, value: any): this {
    this._filters.push({ column, op: 'neq', value });
    return this;
  }

  gt(column: string, value: any): this {
    this._filters.push({ column, op: 'gt', value });
    return this;
  }

  gte(column: string, value: any): this {
    this._filters.push({ column, op: 'gte', value });
    return this;
  }

  lt(column: string, value: any): this {
    this._filters.push({ column, op: 'lt', value });
    return this;
  }

  lte(column: string, value: any): this {
    this._filters.push({ column, op: 'lte', value });
    return this;
  }

  is(column: string, value: any): this {
    this._filters.push({ column, op: 'is', value });
    return this;
  }

  not(column: string, op: string, value: any): this {
    // Supabase .not('deleted_at', 'is', null) → deleted_at IS NOT NULL
    if (op === 'is') {
      this._filters.push({ column, op: 'not_is', value });
    } else {
      this._filters.push({ column, op: 'neq', value });
    }
    return this;
  }

  in(column: string, values: any[]): this {
    this._filters.push({ column, op: 'in', value: values });
    return this;
  }

  ilike(column: string, pattern: string): this {
    this._filters.push({ column, op: 'ilike', value: pattern });
    return this;
  }

  or(filterString: string): this {
    // Parse Supabase-style OR filter string like:
    // "title.ilike.%search%,content.ilike.%search%"
    // Store as a special __or filter
    this._filters.push({ column: '__or', op: 'eq', value: filterString });
    return this;
  }

  order(column: string, options?: { ascending?: boolean }): this {
    this._order = { column, ascending: options?.ascending ?? true };
    return this;
  }

  range(from: number, to: number): this {
    this._offset = from;
    this._limit = to - from + 1;
    return this;
  }

  limit(count: number): this {
    this._limit = count;
    return this;
  }

  single(): this {
    this._single = true;
    return this;
  }

  // ── Execute ─────────────────────────────────────────────────────────────

  async then<TResult1 = QueryResult<T>, TResult2 = never>(
    onfulfilled?: ((value: QueryResult<T>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    try {
      const result = await this.execute();
      return onfulfilled ? onfulfilled(result) : result as any;
    } catch (err) {
      if (onrejected) return onrejected(err);
      throw err;
    }
  }

  private buildFilters(): Record<string, any> {
    const filters: Record<string, any> = {};
    for (const f of this._filters) {
      if (f.column === '__or') {
        filters['__or'] = f.value;
        continue;
      }
      switch (f.op) {
        case 'eq':
          filters[f.column] = f.value;
          break;
        case 'neq':
          filters[`${f.column}__neq`] = f.value;
          break;
        case 'gt':
          filters[`${f.column}__gt`] = f.value;
          break;
        case 'gte':
          filters[`${f.column}__gte`] = f.value;
          break;
        case 'lt':
          filters[`${f.column}__lt`] = f.value;
          break;
        case 'lte':
          filters[`${f.column}__lte`] = f.value;
          break;
        case 'is':
          filters[`${f.column}__is`] = f.value;
          break;
        case 'not_is':
          filters[`${f.column}__not_is`] = f.value;
          break;
        case 'in':
          filters[`${f.column}__in`] = f.value;
          break;
        case 'ilike':
          filters[`${f.column}__ilike`] = f.value;
          break;
      }
    }
    return filters;
  }

  private async execute(): Promise<QueryResult<T>> {
    const adapter = getDatabaseAdapter();
    const filters = this.buildFilters();

    switch (this._action) {
      case 'select': {
        if (this._single) {
          return adapter.querySingle<T>(this._table, {
            select: this._select,
            filters,
            order: this._order || undefined,
            offset: this._offset,
            limit: this._limit,
            count: this._count,
          });
        }
        return adapter.query<T>(this._table, {
          select: this._select,
          filters,
          order: this._order || undefined,
          offset: this._offset,
          limit: this._limit,
          count: this._count,
        }) as Promise<QueryResult<T>>;
      }

      case 'insert': {
        const result = await adapter.insert<T>(this._table, this._data);
        return { data: result.data, error: result.error, count: undefined };
      }

      case 'update': {
        const result = await adapter.update<T>(this._table, filters, this._data);
        return { data: result.data, error: result.error, count: undefined };
      }

      case 'delete': {
        const result = await adapter.delete(this._table, filters);
        return { data: result.data as T, error: result.error, count: undefined };
      }

      case 'upsert': {
        const result = await adapter.upsert<T>(this._table, this._data);
        return { data: result.data, error: result.error, count: undefined };
      }

      default:
        return { data: null, error: { message: `Unknown action: ${this._action}` } };
    }
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * The database facade. Use like Supabase:
 *   db.from('items').select('*').eq('user_id', userId)
 *   db.rpc('search_items', { search_text: query })
 */
export const db = {
  from(table: string): QueryBuilder {
    return new QueryBuilder(table);
  },

  async rpc<T = any>(functionName: string, params?: Record<string, any>): Promise<QueryResult<T>> {
    const adapter = getDatabaseAdapter();
    return adapter.rpc<T>(functionName, params);
  },
};

// ─── Direct adapter access (for apiClient-style calls) ────────────────────────

/**
 * Direct query function matching the apiClient pattern from momentum3.
 * Accepts a body object with table, action, data, filters, etc.
 */
export async function dbQuery(body: {
  table: string;
  action?: 'insert' | 'update' | 'delete' | 'upsert';
  select?: string;
  data?: any;
  filters?: Record<string, any>;
  order?: { column: string; ascending: boolean };
  offset?: number;
  limit?: number;
  single?: boolean;
  count?: 'exact' | 'planned' | 'estimated';
}): Promise<{ data: any; error: any; count?: number | null }> {
  const adapter = getDatabaseAdapter();
  const { table, action, data, filters = {}, order, offset, limit, single, select } = body;

  if (!action) {
    // SELECT query
    if (single) {
      return adapter.querySingle(table, { select, filters, order, offset, limit });
    }
    return adapter.query(table, { select, filters, order, offset, limit, count: 'exact' });
  }

  switch (action) {
    case 'insert':
      return adapter.insert(table, data);
    case 'update':
      return adapter.update(table, filters, data);
    case 'delete':
      return adapter.delete(table, filters);
    case 'upsert':
      return adapter.upsert(table, data);
    default:
      return { data: null, error: { message: `Unknown action: ${action}` } };
  }
}

/**
 * Direct RPC function matching the apiClient pattern from momentum3.
 */
export async function dbRpc(functionName: string, params?: any): Promise<{ data: any; error: any; count?: number | null }> {
  const adapter = getDatabaseAdapter();
  return adapter.rpc(functionName, params);
}

// ─── Convenience helpers (matching apiClient exports) ─────────────────────────

export async function dbSelectItems(params: {
  userId: string | number;
  filters: Record<string, any>;
  order?: { column: string; ascending: boolean };
  offset?: number;
  limit?: number;
  select?: string;
}) {
  return dbQuery({
    table: 'items',
    select: params.select || '*, item_tags(tag_id)',
    filters: params.filters,
    order: params.order,
    offset: params.offset,
    limit: params.limit,
  });
}

export async function dbSelectTags(userId: string | number) {
  return dbQuery({
    table: 'tags',
    select: '*',
    filters: { user_id: userId },
    order: { column: 'name', ascending: true },
  });
}

export async function dbSelectLists(userId: string | number) {
  return dbQuery({
    table: 'lists',
    select: '*',
    filters: { user_id: userId },
    order: { column: 'sort_order', ascending: true },
  });
}

export async function dbSelectItemTags(filters: Record<string, any>) {
  return dbQuery({ table: 'item_tags', select: '*', filters });
}

export async function dbInsertItemTags(data: any) {
  return dbQuery({ action: 'insert', table: 'item_tags', data });
}

export async function dbDeleteItemTags(filters: Record<string, any>) {
  return dbQuery({ action: 'delete', table: 'item_tags', filters });
}

export async function dbDeleteTag(filters: Record<string, any>) {
  return dbQuery({ action: 'delete', table: 'tags', filters });
}

export async function dbSelectUserSettings(userId: string | number) {
  return dbQuery({
    table: 'user_settings',
    select: '*',
    filters: { user_id: userId },
    limit: 1,
    single: true,
  });
}

export async function dbSelectViewSortPrefs(userId: string | number) {
  return dbQuery({
    table: 'view_sort_preferences',
    select: '*',
    filters: { user_id: userId },
  });
}

// ─── Backward compatibility aliases ──────────────────────────────────────────

/**
 * Backward-compatible alias. Files that previously imported `supabase` can
 * switch to importing `supabase` from this module with minimal changes.
 */
export const supabase = db;

/**
 * apiClient-compatible aliases.
 * These match the exports from momentum3's apiClient.ts so that files
 * can import { apiQuery, apiRpc, ... } from '@/lib/db' with no changes.
 */
export const apiQuery = dbQuery;
export const apiRpc = dbRpc;
export const apiSelectItems = dbSelectItems;
export const apiSelectTags = dbSelectTags;
export const apiSelectLists = dbSelectLists;
export const apiSelectItemTags = dbSelectItemTags;
export const apiInsertItemTags = dbInsertItemTags;
export const apiDeleteItemTags = dbDeleteItemTags;
export const apiDeleteTag = dbDeleteTag;
export const apiSelectUserSettings = dbSelectUserSettings;
export const apiSelectViewSortPrefs = dbSelectViewSortPrefs;
