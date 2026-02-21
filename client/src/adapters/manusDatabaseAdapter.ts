/**
 * Manus Database Adapter
 *
 * Implements the foundation DatabaseAdapter interface by delegating
 * to the Manus REST API (/api/data). This allows foundation code
 * that uses the adapter registry (e.g., useVisibilitySync, useDataFetching
 * loaded via relative imports from useProviderState) to work correctly.
 */
import type { DatabaseAdapter, QueryOptions, QueryResult, MutationResult } from '@/adapters/types';

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

export class ManusDatabaseAdapter implements DatabaseAdapter {
  readonly type = 'manus-rest';

  async initialize(): Promise<void> {
    // No initialization needed — the REST API is always available
  }

  isAvailable(): boolean {
    return true;
  }

  isLocal(): boolean {
    return false; // Server-backed
  }

  async query<T = any>(table: string, options?: QueryOptions): Promise<QueryResult<T[]>> {
    const body: any = {
      table,
      select: options?.select || '*',
    };
    if (options?.filters) body.filters = options.filters;
    if (options?.order) body.order = options.order;
    if (options?.offset !== undefined) body.offset = options.offset;
    if (options?.limit !== undefined) body.limit = options.limit;
    if (options?.count) body.count = options.count;

    const result = await post<T[]>('', body);
    return {
      data: result.data,
      error: result.error,
      count: result.count,
    };
  }

  async querySingle<T = any>(table: string, options?: QueryOptions): Promise<QueryResult<T>> {
    const body: any = {
      table,
      select: options?.select || '*',
      single: true,
      limit: 1,
    };
    if (options?.filters) body.filters = options.filters;
    if (options?.order) body.order = options.order;

    const result = await post<T>('', body);
    return {
      data: result.data,
      error: result.error,
    };
  }

  async insert<T = any>(table: string, data: any | any[]): Promise<MutationResult<T>> {
    const result = await post<T>('', { action: 'insert', table, data });
    return { data: result.data, error: result.error };
  }

  async update<T = any>(table: string, filters: Record<string, any>, data: any): Promise<MutationResult<T>> {
    const result = await post<T>('', { action: 'update', table, data, filters });
    return { data: result.data, error: result.error };
  }

  async upsert<T = any>(table: string, data: any | any[]): Promise<MutationResult<T>> {
    const result = await post<T>('', { action: 'upsert', table, data });
    return { data: result.data, error: result.error };
  }

  async delete(table: string, filters: Record<string, any>): Promise<MutationResult> {
    const result = await post('', { action: 'delete', table, filters });
    return { data: result.data, error: result.error };
  }

  async rpc<T = any>(functionName: string, params?: Record<string, any>): Promise<QueryResult<T>> {
    const result = await post<T>('/rpc', { function: functionName, params });
    return { data: result.data, error: result.error };
  }
}
