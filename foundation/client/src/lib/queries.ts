/**
 * queries.ts — Data query helpers for items, tags, lists, and sidebar data.
 *
 * These are pure, stateless functions that talk to the Manus backend API
 * and return domain objects. Extracted from ServerMomentumContext so hooks
 * and other modules can import them directly without circular dependencies.
 */
import {
  apiSelectItems,
  apiSelectTags,
  apiSelectLists,
  apiSelectItemTags,
  apiInsertItemTags,
  apiDeleteItemTags,
  apiDeleteTag,
  apiRpc,
  apiQuery,
} from '@/lib/db';
import { formatError } from '@/lib/utils';
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

  // Build filters object
  const filters: Record<string, any> = { user_id: userId };

  switch (filter.type) {
    case 'all':
      filters['deleted_at__is'] = null;
      filters['is_completed'] = false;
      break;
    case 'tasks':
      filters['type'] = 'task';
      filters['deleted_at__is'] = null;
      filters['is_completed'] = false;
      break;
    case 'notes':
      filters['type'] = 'note';
      filters['deleted_at__is'] = null;
      break;
    case 'todo':
      filters['has_uncompleted_todos'] = true;
      filters['deleted_at__is'] = null;
      break;
    case 'miscellaneous':
      filters['list_id__is'] = null;
      filters['deleted_at__is'] = null;
      filters['is_completed'] = false;
      break;
    case 'list':
      filters['list_id'] = (filter as any).listId;
      filters['deleted_at__is'] = null;
      break;
    case 'tag': {
      const tagId = (filter as any).tagId;
      const { data: tagItemIds } = await apiSelectItemTags({ tag_id: tagId });
      const ids = tagItemIds?.map((r: any) => r.item_id) || [];
      if (ids.length === 0) return { items: [], total: 0, hasMore: false };
      filters['id__in'] = ids;
      filters['deleted_at__is'] = null;
      break;
    }
    case 'pinned':
      filters['is_pinned'] = true;
      filters['deleted_at__is'] = null;
      break;
    case 'completed':
      filters['is_completed'] = true;
      filters['deleted_at__is'] = null;
      break;
    case 'trash':
      filters['deleted_at__not_is'] = null;
      break;
  }

  const { data, error, count } = await apiSelectItems({
    userId,
    filters,
    order: { column: sortField, ascending: sortDirection === 'asc' },
    offset,
    limit,
    select: '*, item_tags(tag_id)',
  });

  if (error) throw error;

  const items = (data || []).map(dbRowToItem);
  const total = count || 0;
  return { items, total, hasMore: offset + limit < total };
}

export async function fetchTags(userId: string) {
  const { data, error } = await apiSelectTags(userId);
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
      const { data: junctions } = await apiSelectItemTags({ tag_id: tag.id });
      if (junctions && junctions.length > 0) {
        for (const j of junctions) {
          await apiInsertItemTags({ item_id: j.item_id, tag_id: keepTag.id });
        }
      }
      // Delete old junction entries and the duplicate tag
      await apiDeleteItemTags({ tag_id: tag.id });
      await apiDeleteTag({ id: tag.id });
    }
  }

  return Array.from(seen.values());
}

export async function fetchLists(userId: string) {
  const { data, error } = await apiSelectLists(userId);
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
  const { data, error } = await apiRpc('get_sidebar_counts', { p_user_id: userId });
  if (error) {
    console.error('Error fetching sidebar counts via RPC:', formatError(error));
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
  const { data, error } = await apiQuery({
    table: 'items',
    select: '*, item_tags(tag_id)',
    filters: {
      user_id: userId,
      'id__in': ids,
      'deleted_at__is': null,
    },
  });
  
  if (error) throw error;
  const itemsMap = new Map((data || []).map(dbRowToItem).map((item: any) => [item.id, item]));
  return ids.map(id => itemsMap.get(id)).filter((item): item is Item => item !== undefined);
}

export async function fetchPinnedItems(userId: string) {
  const { data, error } = await apiQuery({
    table: 'items',
    select: '*, item_tags(tag_id)',
    filters: {
      user_id: userId,
      is_pinned: true,
      'deleted_at__is': null,
    },
    order: { column: 'updated_at', ascending: false },
  });
  
  if (error) throw error;
  return (data || []).map(dbRowToItem);
}

export async function searchItems(query: string, userId: string, offset = 0, limit = PAGE_SIZE) {
  const searchTerm = `%${query}%`;
  const { data, error, count } = await apiQuery({
    table: 'items',
    select: '*, item_tags(tag_id)',
    filters: {
      user_id: userId,
      'deleted_at__is': null,
      __or: `title.ilike.${searchTerm},content.ilike.${searchTerm},search_content.ilike.${searchTerm}`,
    },
    order: { column: 'updated_at', ascending: false },
    offset,
    limit,
  });
  
  if (error) throw error;
  const items = (data || []).map(dbRowToItem);
  const total = count || 0;
  return { items, total, hasMore: offset + limit < total };
}
