/**
 * Supabase Client Shim
 * 
 * This module provides a compatibility layer that mimics the Supabase client API
 * but routes all operations through the Manus backend API (tRPC).
 * 
 * This allows the existing Momentum code to work with minimal changes
 * while we progressively migrate to direct tRPC calls.
 */

// Helper to make API calls to our tRPC backend
async function apiCall(path: string, options?: RequestInit) {
  const res = await fetch(`/api/trpc/${path}`, {
    credentials: 'include',
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API call failed: ${res.status}`);
  }
  return res.json();
}

// Build a chainable query builder that mimics Supabase's API
function createQueryBuilder(table: string) {
  let queryParams: Record<string, any> = { table };
  let method = 'GET';
  let body: any = null;

  const builder: any = {
    select: (columns?: string) => {
      queryParams.select = columns || '*';
      return builder;
    },
    insert: (data: any) => {
      method = 'POST';
      body = { action: 'insert', table, data };
      return builder;
    },
    update: (data: any) => {
      method = 'POST';
      body = { action: 'update', table, data, filters: {} };
      return builder;
    },
    delete: () => {
      method = 'POST';
      body = { action: 'delete', table, filters: {} };
      return builder;
    },
    upsert: (data: any) => {
      method = 'POST';
      body = { action: 'upsert', table, data };
      return builder;
    },
    eq: (column: string, value: any) => {
      if (!queryParams.filters) queryParams.filters = {};
      queryParams.filters[column] = value;
      if (body && body.filters) body.filters[column] = value;
      return builder;
    },
    neq: (column: string, value: any) => {
      if (!queryParams.filters) queryParams.filters = {};
      queryParams.filters[`${column}__neq`] = value;
      return builder;
    },
    in: (column: string, values: any[]) => {
      if (!queryParams.filters) queryParams.filters = {};
      queryParams.filters[`${column}__in`] = values;
      return builder;
    },
    is: (column: string, value: any) => {
      if (!queryParams.filters) queryParams.filters = {};
      queryParams.filters[`${column}__is`] = value;
      return builder;
    },
    not: (column: string, operator: string, value: any) => {
      if (!queryParams.filters) queryParams.filters = {};
      queryParams.filters[`${column}__not_${operator}`] = value;
      return builder;
    },
    ilike: (column: string, value: string) => {
      if (!queryParams.filters) queryParams.filters = {};
      queryParams.filters[`${column}__ilike`] = value;
      return builder;
    },
    or: (conditions: string) => {
      if (!queryParams.filters) queryParams.filters = {};
      queryParams.filters.__or = conditions;
      return builder;
    },
    order: (column: string, options?: { ascending?: boolean }) => {
      queryParams.order = { column, ascending: options?.ascending ?? true };
      return builder;
    },
    range: (from: number, to: number) => {
      queryParams.range = { from, to };
      queryParams.limit = to - from + 1;
      queryParams.offset = from;
      return builder;
    },
    limit: (count: number) => {
      queryParams.limit = count;
      return builder;
    },
    single: () => {
      queryParams.single = true;
      return builder;
    },
    maybeSingle: () => {
      queryParams.maybeSingle = true;
      return builder;
    },
    then: (resolve: any, reject?: any) => {
      // Execute the query via our REST API
      const promise = executeQuery(method, body || queryParams);
      return promise.then(resolve, reject);
    },
  };

  return builder;
}

async function executeQuery(method: string, params: any): Promise<{ data: any; error: any; count?: number }> {
  try {
    const res = await fetch('/api/supabase-compat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(params),
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

// Create the supabase-like client
export const supabase = {
  from: (table: string) => createQueryBuilder(table),
  rpc: async (functionName: string, params?: any) => {
    try {
      const res = await fetch('/api/supabase-compat/rpc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ function: functionName, params }),
      });
      const result = await res.json();
      if (!res.ok) {
        return { data: null, error: { message: result.error || 'RPC failed' } };
      }
      return { data: result.data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  },
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: (_callback: any) => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
    signOut: async () => ({ error: null }),
    mfa: {
      getAuthenticatorAssuranceLevel: async () => ({
        data: { currentLevel: 'aal1', nextLevel: 'aal1' },
        error: null,
      }),
      listFactors: async () => ({ data: { totp: [] }, error: null }),
      enroll: async (_params: any) => ({ data: null, error: { message: 'MFA not supported' } }),
      challenge: async (_params: any) => ({ data: null, error: { message: 'MFA not supported' } }),
      verify: async (_params: any) => ({ data: null, error: { message: 'MFA not supported' } }),
      unenroll: async (_params: any) => ({ data: null, error: { message: 'MFA not supported' } }),
    },
  },
};
