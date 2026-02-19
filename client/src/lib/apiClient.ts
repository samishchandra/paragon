/**
 * API Client
 *
 * Direct REST client for the Manus backend.
 * Replaces the Supabase client shim with clean, typed API calls.
 */

const BASE = '/api/data';

async function post<T = any>(path: string, body: any): Promise<{ data: T | null; error: any; count?: number }> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const result = await res.json();
    if (!res.ok) {
      return { data: null, error: { message: result.error || 'Request failed' } };
    }
    return { data: result.data, error: null, count: result.count };
  } catch (error: any) {
    return { data: null, error: { message: error.message } };
  }
}

// ─── Items ───────────────────────────────────────────────────────────────────

export interface FetchItemsParams {
  userId: string | number;
  filters: Record<string, any>;
  order?: { column: string; ascending: boolean };
  offset?: number;
  limit?: number;
  select?: string;
}

export async function apiSelectItems(params: FetchItemsParams) {
  return post('', {
    table: 'items',
    select: params.select || '*, item_tags(tag_id)',
    filters: params.filters,
    order: params.order,
    offset: params.offset,
    limit: params.limit,
  });
}

export async function apiInsertItem(data: any) {
  return post('', { action: 'insert', table: 'items', data });
}

export async function apiUpdateItem(id: string, data: any) {
  return post('', { action: 'update', table: 'items', data, filters: { id } });
}

export async function apiDeleteItem(filters: Record<string, any>) {
  return post('', { action: 'delete', table: 'items', filters });
}

export async function apiUpsertItem(data: any) {
  return post('', { action: 'upsert', table: 'items', data });
}

// ─── Tags ────────────────────────────────────────────────────────────────────

export async function apiSelectTags(userId: string | number) {
  return post('', {
    table: 'tags',
    select: '*',
    filters: { user_id: userId },
    order: { column: 'name', ascending: true },
  });
}

export async function apiInsertTag(data: any) {
  return post('', { action: 'insert', table: 'tags', data });
}

export async function apiUpdateTag(id: string, data: any) {
  return post('', { action: 'update', table: 'tags', data, filters: { id } });
}

export async function apiDeleteTag(filters: Record<string, any>) {
  return post('', { action: 'delete', table: 'tags', filters });
}

// ─── Lists ───────────────────────────────────────────────────────────────────

export async function apiSelectLists(userId: string | number) {
  return post('', {
    table: 'lists',
    select: '*',
    filters: { user_id: userId },
    order: { column: 'sort_order', ascending: true },
  });
}

export async function apiInsertList(data: any) {
  return post('', { action: 'insert', table: 'lists', data });
}

export async function apiUpdateList(id: string, data: any) {
  return post('', { action: 'update', table: 'lists', data, filters: { id } });
}

export async function apiDeleteList(filters: Record<string, any>) {
  return post('', { action: 'delete', table: 'lists', filters });
}

// ─── Item Tags ───────────────────────────────────────────────────────────────

export async function apiSelectItemTags(filters: Record<string, any>) {
  return post('', { table: 'item_tags', select: '*', filters });
}

export async function apiInsertItemTags(data: any) {
  return post('', { action: 'insert', table: 'item_tags', data });
}

export async function apiDeleteItemTags(filters: Record<string, any>) {
  return post('', { action: 'delete', table: 'item_tags', filters });
}

// ─── User Settings ──────────────────────────────────────────────────────────

export async function apiSelectUserSettings(userId: string | number) {
  return post('', {
    table: 'user_settings',
    select: '*',
    filters: { user_id: userId },
    limit: 1,
    single: true,
  });
}

export async function apiUpdateUserSettings(userId: string | number, data: any) {
  return post('', { action: 'update', table: 'user_settings', data, filters: { user_id: userId } });
}

export async function apiInsertUserSettings(data: any) {
  return post('', { action: 'insert', table: 'user_settings', data });
}

// ─── View Sort Preferences ──────────────────────────────────────────────────

export async function apiSelectViewSortPrefs(userId: string | number) {
  return post('', {
    table: 'view_sort_preferences',
    select: '*',
    filters: { user_id: userId },
  });
}

export async function apiUpsertViewSortPref(data: any) {
  return post('', { action: 'upsert', table: 'view_sort_preferences', data });
}

// ─── RPC (Search, Sidebar Counts) ───────────────────────────────────────────

export async function apiRpc(functionName: string, params?: any) {
  return post('/rpc', { function: functionName, params });
}

// ─── Generic query (for backward compat during migration) ───────────────────

export async function apiQuery(body: any) {
  return post('', body);
}
