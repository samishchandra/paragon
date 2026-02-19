/**
 * queries.ts — Supabase query helpers for items, tags, lists, and sidebar data.
 *
 * These are pure, stateless functions that talk to Supabase and return
 * domain objects. Extracted from ServerMomentumContext so hooks and
 * other modules can import them directly without circular dependencies.
 */
import { supabase } from '@/lib/supabaseClient';
import type {
  Item,
  Task,
  Note,
  Tag,
  List,
  FilterType,
  SectionType,
  SortOrder,
} from '@/types';

// ---- Row-to-domain converters ----

function safeISODate(value: any, fallback?: string): string {
  if (!value) return fallback || new Date().toISOString();
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return fallback || new Date().toISOString();
    return d.toISOString();
  } catch {
    return fallback || new Date().toISOString();
  }
}

export function dbRowToItem(row: any): Item {
  const tagIds = row.item_tags?.map((it: any) => it.tag_id) || [];
  
  const base = {
    id: row.id,
    title: row.title || '',
    content: row.content || '',
    tags: tagIds,
    isPinned: row.is_pinned || false,
    section: (row.section || 'now') as SectionType,
    order: row.sort_order || 0,
    createdAt: safeISODate(row.created_at),
    updatedAt: safeISODate(row.updated_at),
    deletedAt: row.deleted_at ? safeISODate(row.deleted_at) : undefined,
    listId: row.list_id || undefined,
  };

  if (row.type === 'task') {
    return {
      ...base,
      type: 'task',
      isCompleted: row.is_completed || false,
      dueDate: row.due_date || undefined,
    } as Task;
  }
  
  return {
    ...base,
    type: 'note',
  } as Note;
}

export function dbRowToTag(row: any): Tag {
  return {
    id: row.id,
    name: row.name,
    color: row.color,
  };
}

export function dbRowToList(row: any): List {
  return {
    id: row.id,
    name: row.name,
    icon: row.icon || 'folder',
    color: row.color || '#3B82F6',
    type: row.type || 'task',
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
    order: row.sort_order || 0,
  };
}

// ---- Query functions ----

export const PAGE_SIZE = 50;

export async function fetchItems(
  filter: FilterType,
  sortOrder: SortOrder,
  sortDirection: 'asc' | 'desc',
  userId: string,
  offset = 0,
  limit = PAGE_SIZE,
) {
  const sortFieldMap: Record<SortOrder, string> = {
    'modified': 'updated_at',
    'custom': 'sort_order',
    'dueDate': 'due_date',
  };
  const sortField = sortFieldMap[sortOrder] || 'updated_at';

  let query = supabase
    .from('items')
    .select('*, item_tags(tag_id)', { count: 'exact' })
    .eq('user_id', userId);

  // Apply filters
  switch (filter.type) {
    case 'all':
      query = query.is('deleted_at', null).eq('is_completed', false);
      break;
    case 'tasks':
      query = query.eq('type', 'task').is('deleted_at', null).eq('is_completed', false);
      break;
    case 'notes':
      query = query.eq('type', 'note').is('deleted_at', null);
      break;
    case 'todo':
      query = query.eq('has_uncompleted_todos', true).is('deleted_at', null);
      break;
    case 'miscellaneous':
      query = query.is('list_id', null).is('deleted_at', null).eq('is_completed', false);
      break;
    case 'list':
      query = query.eq('list_id', (filter as any).listId).is('deleted_at', null);
      break;
    case 'tag': {
      // For tag filter, we need to join through item_tags
      const tagId = (filter as any).tagId;
      const { data: tagItemIds } = await supabase
        .from('item_tags')
        .select('item_id')
        .eq('tag_id', tagId);
      const ids = tagItemIds?.map((r: any) => r.item_id) || [];
      if (ids.length === 0) return { items: [], total: 0, hasMore: false };
      query = query.in('id', ids).is('deleted_at', null);
      break;
    }
    case 'pinned':
      query = query.eq('is_pinned', true).is('deleted_at', null);
      break;
    case 'completed':
      query = query.eq('is_completed', true).is('deleted_at', null);
      break;
    case 'trash':
      query = query.not('deleted_at', 'is', null);
      break;
  }

  query = query.order(sortField, { ascending: sortDirection === 'asc' })
    .range(offset, offset + limit - 1);

  const { data, error, count } = await query;
  if (error) throw error;

  const items = (data || []).map(dbRowToItem);
  const total = count || 0;
  return { items, total, hasMore: offset + limit < total };
}

export async function fetchTags(userId: string) {
  const { data, error } = await supabase.from('tags').select('*').eq('user_id', userId).order('name');
  if (error) throw error;
  const allTags = (data || []).map(dbRowToTag);

  // Deduplicate tags by name (case-insensitive), keeping the first occurrence
  const seen = new Map<string, Tag>();
  const duplicateIds: string[] = [];
  for (const tag of allTags) {
    const lower = tag.name.toLowerCase();
    if (seen.has(lower)) {
      duplicateIds.push(tag.id);
    } else {
      seen.set(lower, tag);
    }
  }

  // If duplicates found, merge item_tags and clean up in background
  if (duplicateIds.length > 0) {
    console.warn(`[fetchTags] Found ${duplicateIds.length} duplicate tag(s), merging...`);
    for (const tag of allTags) {
      if (!duplicateIds.includes(tag.id)) continue;
      const lower = tag.name.toLowerCase();
      const keepTag = seen.get(lower)!;
      // Reassign item_tags from duplicate to the surviving tag
      const { data: junctions } = await supabase.from('item_tags').select('item_id').eq('tag_id', tag.id);
      if (junctions && junctions.length > 0) {
        for (const j of junctions) {
          // Insert the new mapping (ignore conflict if already exists)
          await supabase.from('item_tags').upsert({ item_id: j.item_id, tag_id: keepTag.id }, { onConflict: 'item_id,tag_id', ignoreDuplicates: true });
        }
      }
      // Delete old junction entries and the duplicate tag
      await supabase.from('item_tags').delete().eq('tag_id', tag.id);
      await supabase.from('tags').delete().eq('id', tag.id);
    }
  }

  return Array.from(seen.values());
}

export async function fetchLists(userId: string) {
  const { data, error } = await supabase.from('lists').select('*').eq('user_id', userId).order('sort_order');
  if (error) throw error;
  return (data || []).map(dbRowToList);
}

/**
 * Consolidated sidebar counts — single RPC call replaces 8 individual count queries
 * + tag counts + list counts (was 10+ queries, now 1).
 */
export async function fetchAllSidebarData(userId: string): Promise<{
  counts: { all: number; tasks: number; notes: number; pinned: number; completed: number; trash: number; miscellaneous: number; todo: number };
  tagCounts: Record<string, number>;
  listCounts: Record<string, number>;
}> {
  const { data, error } = await supabase.rpc('get_sidebar_counts', { p_user_id: userId });
  if (error) {
    console.error('Error fetching sidebar counts via RPC:', error);
    // Fallback: return empty counts
    return { counts: { all: 0, tasks: 0, notes: 0, pinned: 0, completed: 0, trash: 0, miscellaneous: 0, todo: 0 }, tagCounts: {}, listCounts: {} };
  }
  const result = data as any;
  return {
    counts: {
      all: Number(result.all) || 0,
      tasks: Number(result.tasks) || 0,
      notes: Number(result.notes) || 0,
      pinned: Number(result.pinned) || 0,
      completed: Number(result.completed) || 0,
      trash: Number(result.trash) || 0,
      miscellaneous: Number(result.miscellaneous) || 0,
      todo: Number(result.todo) || 0,
    },
    tagCounts: result.tag_counts || {},
    listCounts: result.list_counts || {},
  };
}

export async function fetchRecentItemsByIds(ids: string[], userId: string) {
  if (ids.length === 0) return [];
  const { data, error } = await supabase
    .from('items')
    .select('*, item_tags(tag_id)')
    .eq('user_id', userId)
    .in('id', ids)
    .is('deleted_at', null);
  
  if (error) throw error;
  const itemsMap = new Map((data || []).map(dbRowToItem).map(item => [item.id, item]));
  // Return in the same order as the input IDs
  return ids.map(id => itemsMap.get(id)).filter((item): item is Item => item !== undefined);
}

export async function fetchPinnedItems(userId: string) {
  const { data, error } = await supabase
    .from('items')
    .select('*, item_tags(tag_id)')
    .eq('user_id', userId)
    .eq('is_pinned', true)
    .is('deleted_at', null)
    .order('updated_at', { ascending: false });
  
  if (error) throw error;
  return (data || []).map(dbRowToItem);
}

export async function searchItems(query: string, userId: string, offset = 0, limit = PAGE_SIZE) {
  const searchTerm = `%${query}%`;
  const { data, error, count } = await supabase
    .from('items')
    .select('*, item_tags(tag_id)', { count: 'exact' })
    .eq('user_id', userId)
    .is('deleted_at', null)
    .or(`title.ilike.${searchTerm},content.ilike.${searchTerm},search_content.ilike.${searchTerm}`)
    .order('updated_at', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (error) throw error;
  const items = (data || []).map(dbRowToItem);
  const total = count || 0;
  return { items, total, hasMore: offset + limit < total };
}
