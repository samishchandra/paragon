/**
 * Local Search Adapter — Default search for momentum-foundation.
 *
 * Delegates to the DatabaseAdapter's rpc() and query() methods,
 * so it works with any database backend (Supabase, browser IndexedDB, etc.).
 * Falls back to local IndexedDB search for instant offline results.
 */
import type { SearchAdapter, SearchResult, SearchFilters } from '../types';
import { getDatabaseAdapter } from '../registry';
import { searchItemsLocally } from '@/lib/offlineStore';

/**
 * Map a raw database row (snake_case) to SearchResult (camelCase).
 */
function mapRow(row: any): SearchResult {
  return {
    id: row.id,
    type: row.type as 'task' | 'note',
    title: row.title,
    content: row.content || '',
    isPinned: row.is_pinned,
    isCompleted: row.is_completed,
    dueDate: row.due_date,
    listId: row.list_id,
    section: row.section,
    sortOrder: row.sort_order,
    deletedAt: row.deleted_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    rank: row.rank ?? 0,
    titleHighlight: row.title_highlight || row.title,
    contentHighlight: row.content_highlight || '',
  };
}

export class LocalSearchAdapter implements SearchAdapter {
  readonly type = 'local';

  async search(
    query: string,
    maxResults = 20,
    filters?: SearchFilters
  ): Promise<SearchResult[]> {
    if (!query.trim()) return [];

    const db = getDatabaseAdapter();

    // Build RPC params with optional filters
    const rpcParams: any = { search_text: query, max_results: maxResults };
    if (filters?.listId) rpcParams.filter_list_id = filters.listId;
    if (filters?.tagId) rpcParams.filter_tag_id = filters.tagId;

    // Try FTS first
    const { data: ftsData, error: ftsError } = await db.rpc('search_items', rpcParams);

    if (ftsError) {
      console.warn('[LocalSearchAdapter] FTS search error:', ftsError.message);
    }

    const ftsResults = (ftsData || []).map(mapRow);
    if (ftsResults.length > 0) return ftsResults;

    // Fallback to fuzzy/ILIKE search for partial matches
    const { data: fuzzyData, error: fuzzyError } = await db.rpc('search_items_fuzzy', rpcParams);

    if (fuzzyError) {
      console.warn('[LocalSearchAdapter] Fuzzy search error:', fuzzyError.message);
      return [];
    }

    return (fuzzyData || []).map(mapRow);
  }

  async browse(filters: SearchFilters, maxResults = 20): Promise<SearchResult[]> {
    const db = getDatabaseAdapter();

    const queryFilters: Record<string, any> = {
      'deleted_at__is': null,
    };

    if (filters.listId) {
      queryFilters['list_id'] = filters.listId;
    }

    if (filters.tagId) {
      // For tag filter, we need to get item IDs from item_tags first
      const { data: tagItems } = await db.query('item_tags', {
        select: 'item_id',
        filters: { tag_id: filters.tagId },
      });

      if (!tagItems || tagItems.length === 0) return [];
      const itemIds = (tagItems as any[]).map((t: any) => t.item_id);
      queryFilters['id__in'] = itemIds;
    }

    const { data, error } = await db.query('items', {
      select: 'id, type, title, content, is_pinned, is_completed, due_date, list_id, section, sort_order, deleted_at, created_at, updated_at',
      filters: queryFilters,
      order: { column: 'updated_at', ascending: false },
      limit: maxResults,
    });

    if (error) {
      console.warn('[LocalSearchAdapter] Browse filtered items error:', error.message);
      return [];
    }

    return (data || []).map((row: any) => ({
      id: row.id,
      type: row.type as 'task' | 'note',
      title: row.title,
      content: row.content || '',
      isPinned: row.is_pinned,
      isCompleted: row.is_completed,
      dueDate: row.due_date,
      listId: row.list_id,
      section: row.section,
      sortOrder: row.sort_order,
      deletedAt: row.deleted_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      rank: 0,
      titleHighlight: row.title,
      contentHighlight: '',
    }));
  }

  async searchLocally(
    query: string,
    userId: string,
    maxResults = 20
  ): Promise<SearchResult[]> {
    const localItems = await searchItemsLocally(query, userId, maxResults);
    return localItems.map((item: any) => ({
      id: item.id,
      type: item.type as 'task' | 'note',
      title: item.title,
      content: item.content || '',
      isPinned: item.is_pinned,
      isCompleted: item.is_completed || false,
      dueDate: item.due_date || null,
      listId: item.list_id || null,
      section: item.section || '',
      sortOrder: item.sort_order || 0,
      deletedAt: item.deleted_at || null,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      rank: 0,
      titleHighlight: item.title,
      contentHighlight: (item.content || '').substring(0, 200),
    }));
  }

  clearCache(): void {
    // No-op for the local adapter — the LRU cache lives in serverSearch.ts
  }
}
