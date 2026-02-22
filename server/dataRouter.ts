/**
 * Supabase Compatibility REST API
 * 
 * This Express router provides a REST API that mimics Supabase's query builder
 * patterns, allowing the existing frontend code to work with minimal changes.
 * All queries are routed through Drizzle ORM to the Manus database.
 */
import { Router, Request, Response } from 'express';
import { eq, and, isNull, isNotNull, like, or, sql, desc, asc, inArray, ne } from 'drizzle-orm';
import { getDb } from './db';
import { items, tags, lists, itemTags, userSettings, viewSortPreferences } from '../drizzle/schema';
import { sdk } from './_core/sdk';
import type { Request as ExpressRequest } from 'express';

const router = Router();

// Middleware to get authenticated user
async function getUser(req: ExpressRequest): Promise<{ id: number } | null> {
  try {
    const user = await sdk.authenticateRequest(req as any);
    return user;
  } catch {
    return null;
  }
}

// Table mapping
const tableMap: Record<string, any> = {
  items,
  tags,
  lists,
  item_tags: itemTags,
  itemTags: itemTags,
  user_settings: userSettings,
  userSettings: userSettings,
  view_sort_preferences: viewSortPreferences,
  viewSortPreferences: viewSortPreferences,
};

// Column mapping (camelCase to snake_case and vice versa)
function mapColumns(table: string, data: any): any {
  if (!data) return data;
  
  const columnMaps: Record<string, Record<string, string>> = {
    items: {
      user_id: 'userId',
      is_pinned: 'isPinned',
      is_completed: 'isCompleted',
      sort_order: 'sortOrder',
      due_date: 'dueDate',
      list_id: 'listId',
      has_uncompleted_todos: 'hasUncompletedTodos',
      deleted_at: 'deletedAt',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      search_content: 'searchContent',
    },
    tags: {
      user_id: 'userId',
    },
    lists: {
      user_id: 'userId',
      sort_order: 'sortOrder',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
    },
    item_tags: {
      item_id: 'itemId',
      tag_id: 'tagId',
    },
    user_settings: {
      user_id: 'userId',
      auto_reorder_checklist: 'autoReorderChecklist',
      tasks_enabled: 'tasksEnabled',
      editor_font_family: 'editorFontFamily',
      editor_font_size: 'editorFontSize',
      editor_line_height: 'editorLineHeight',
    },
    view_sort_preferences: {
      user_id: 'userId',
      view_key: 'viewKey',
      sort_order: 'sortOrder',
      sort_direction: 'sortDirection',
    },
  };

  // Timestamp columns that need Date conversion per table
  const dateColumns: Record<string, Set<string>> = {
    items: new Set(['createdAt', 'updatedAt', 'deletedAt', 'dueDate', 'created_at', 'updated_at', 'deleted_at', 'due_date']),
    lists: new Set(['createdAt', 'updatedAt', 'created_at', 'updated_at']),
    tags: new Set([]),
    item_tags: new Set([]),
    user_settings: new Set([]),
    view_sort_preferences: new Set([]),
  };

  const dateCols = dateColumns[table] || new Set();
  const map = columnMaps[table] || {};
  const mapped: any = {};
  
  for (const [key, value] of Object.entries(data)) {
    const mappedKey = map[key] || key;
    // Convert ISO date strings to Date objects for timestamp columns
    if (value && typeof value === 'string' && (dateCols.has(key) || dateCols.has(mappedKey))) {
      const d = new Date(value);
      mapped[mappedKey] = isNaN(d.getTime()) ? value : d;
    } else if (value === null && (dateCols.has(key) || dateCols.has(mappedKey))) {
      mapped[mappedKey] = null;
    } else {
      mapped[mappedKey] = value;
    }
  }
  
  return mapped;
}

// Reverse column mapping (camelCase back to snake_case for response)
function unmapColumns(table: string, data: any): any {
  if (!data) return data;
  
  const reverseMaps: Record<string, Record<string, string>> = {
    items: {
      userId: 'user_id',
      isPinned: 'is_pinned',
      isCompleted: 'is_completed',
      sortOrder: 'sort_order',
      dueDate: 'due_date',
      listId: 'list_id',
      hasUncompletedTodos: 'has_uncompleted_todos',
      deletedAt: 'deleted_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      searchContent: 'search_content',
    },
    tags: {
      userId: 'user_id',
    },
    lists: {
      userId: 'user_id',
      sortOrder: 'sort_order',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    item_tags: {
      itemId: 'item_id',
      tagId: 'tag_id',
    },
    user_settings: {
      userId: 'user_id',
      autoReorderChecklist: 'auto_reorder_checklist',
      tasksEnabled: 'tasks_enabled',
      editorFontFamily: 'editor_font_family',
      editorFontSize: 'editor_font_size',
      editorLineHeight: 'editor_line_height',
    },
    view_sort_preferences: {
      userId: 'user_id',
      viewKey: 'view_key',
      sortOrder: 'sort_order',
      sortDirection: 'sort_direction',
    },
  };

  const map = reverseMaps[table] || {};
  
  if (Array.isArray(data)) {
    return data.map(item => unmapSingle(item, map));
  }
  return unmapSingle(data, map);
}

function unmapSingle(data: any, map: Record<string, string>): any {
  if (!data) return data;
  const result: any = {};
  for (const [key, value] of Object.entries(data)) {
    const mappedKey = map[key] || key;
    result[mappedKey] = value;
  }
  return result;
}

// Main query endpoint
router.post('/', async (req: Request, res: Response) => {
  const user = await getUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const db = await getDb();
  if (!db) {
    return res.status(500).json({ error: 'Database not available' });
  }

  const { action, table: tableName, data, filters, select, order, limit: limitVal, offset: offsetVal, range, single, maybeSingle } = req.body;

  const tableRef = tableMap[tableName];
  if (!tableRef) {
    return res.status(400).json({ error: `Unknown table: ${tableName}` });
  }

  try {
    if (action === 'insert') {
      // Handle both single objects and arrays of objects
      const isArray = Array.isArray(data);
      const dataArray = isArray ? data : [data];
      const mappedArray = dataArray.map((item: any) => {
        const mapped = mapColumns(tableName, item);
        // Add userId for user-scoped tables
        if (tableName !== 'item_tags' && tableName !== 'itemTags') {
          mapped.userId = user.id;
        }
        // Handle date fields
        if (mapped.deletedAt && typeof mapped.deletedAt === 'string') {
          mapped.deletedAt = new Date(mapped.deletedAt);
        }
        return mapped;
      });
      
      await db.insert(tableRef).values(mappedArray);
      
      // Return the inserted data
      const results = mappedArray.map((m: any) => unmapColumns(tableName, m));
      if (!isArray && (single || maybeSingle)) {
        return res.json({ data: results[0] });
      }
      return res.json({ data: results });
    }

    if (action === 'update') {
      const mappedData = mapColumns(tableName, data);
      const conditions = buildConditions(tableRef, tableName, filters || {}, user.id);
      
      // Handle date fields
      if (mappedData.deletedAt !== undefined) {
        mappedData.deletedAt = mappedData.deletedAt ? new Date(mappedData.deletedAt) : null;
      }
      
      console.log('[DataRouter] UPDATE', tableName, 'filters:', JSON.stringify(filters), 'data keys:', JSON.stringify(Object.keys(mappedData)), 'content:', typeof mappedData.content === 'string' ? mappedData.content.substring(0, 80) : mappedData.content);
      
      const result = await db.update(tableRef).set(mappedData).where(and(...conditions));
      console.log('[DataRouter] UPDATE result:', JSON.stringify(result));
      
      // Return the updated row
      if (filters?.id) {
        const rows = await db.select().from(tableRef).where(eq(tableRef.id, filters.id)).limit(1);
        const updated = rows[0] ? unmapColumns(tableName, rows[0]) : null;
        return res.json({ data: single || maybeSingle ? updated : updated ? [updated] : null });
      }
      return res.json({ data: null });
    }

    if (action === 'delete') {
      const conditions = buildConditions(tableRef, tableName, filters || {}, user.id);
      await db.delete(tableRef).where(and(...conditions));
      return res.json({ data: null });
    }

    if (action === 'upsert') {
      // Handle both single objects and arrays of objects
      const isArray = Array.isArray(data);
      const dataArray = isArray ? data : [data];
      const mappedArray = dataArray.map((item: any) => {
        const mapped = mapColumns(tableName, item);
        if (tableName !== 'item_tags' && tableName !== 'itemTags') {
          mapped.userId = user.id;
        }
        if (mapped.deletedAt && typeof mapped.deletedAt === 'string') {
          mapped.deletedAt = new Date(mapped.deletedAt);
        }
        return mapped;
      });
      
      // Try insert, on conflict update
      for (const mapped of mappedArray) {
        try {
          await db.insert(tableRef).values(mapped).onDuplicateKeyUpdate({ set: mapped });
        } catch {
          // Fallback: try update
          if (mapped.id) {
            await db.update(tableRef).set(mapped).where(eq(tableRef.id, mapped.id));
          }
        }
      }
      
      const results = mappedArray.map((m: any) => unmapColumns(tableName, m));
      if (!isArray && (single || maybeSingle)) {
        return res.json({ data: results[0] });
      }
      return res.json({ data: results });
    }

    // Default: SELECT query
    const conditions = buildConditions(tableRef, tableName, filters || {}, user.id);
    
    let query = db.select().from(tableRef).where(and(...conditions));

    // Handle select with joins (e.g., "*, item_tags(tag_id)")
    // For items with item_tags, we need to do a separate query
    const needsItemTags = select && select.includes('item_tags');

    if (order) {
      const col = getColumn(tableRef, tableName, order.column);
      if (col) {
        query = query.orderBy(order.ascending ? asc(col) : desc(col)) as any;
      }
    }

    if (offsetVal) {
      query = query.offset(offsetVal) as any;
    }

    if (limitVal) {
      query = query.limit(limitVal) as any;
    }

    // Get total count for pagination when select includes 'count'
    let totalCount: number | undefined;
    if (select && select.includes('count')) {
      const countQuery = db.select({ count: sql<number>`count(*)` }).from(tableRef).where(and(...conditions));
      const countResult = await countQuery;
      totalCount = Number(countResult[0]?.count ?? 0);
    }

    let rows = await query;
    
    // If we need item_tags, fetch them separately and attach
    if (needsItemTags && tableName === 'items') {
      const itemIds = rows.map((r: any) => r.id);
      if (itemIds.length > 0) {
        const tagRows = await db.select().from(itemTags).where(inArray(itemTags.itemId, itemIds));
        const tagMap: Record<string, Array<{ tag_id: string }>> = {};
        for (const tr of tagRows) {
          if (!tagMap[tr.itemId]) tagMap[tr.itemId] = [];
          tagMap[tr.itemId].push({ tag_id: tr.tagId });
        }
        rows = rows.map((r: any) => ({
          ...r,
          item_tags: tagMap[r.id] || [],
        }));
      } else {
        rows = rows.map((r: any) => ({ ...r, item_tags: [] }));
      }
    }

    // Unmap columns for response
    const unmappedRows = rows.map((r: any) => unmapColumns(tableName, r));

    if (single) {
      return res.json({ data: unmappedRows[0] || null });
    }
    if (maybeSingle) {
      return res.json({ data: unmappedRows[0] || null });
    }
    return res.json({ data: unmappedRows, count: totalCount });
  } catch (error: any) {
    console.error('[SupabaseCompat] Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// RPC endpoint
router.post('/rpc', async (req: Request, res: Response) => {
  const user = await getUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const db = await getDb();
  if (!db) {
    return res.status(500).json({ error: 'Database not available' });
  }

  const { function: funcName, params } = req.body;

  try {
    if (funcName === 'get_sidebar_counts') {
      // Compute sidebar counts
      const allItems = await db.select().from(items).where(eq(items.userId, user.id));
      const active = allItems.filter(i => !i.deletedAt);
      const deleted = allItems.filter(i => i.deletedAt);
      // Completed items only count toward the 'completed' counter;
      // all other counters (all, tasks, notes, pinned, misc, todo, tags, lists) exclude them.
      const nonCompleted = active.filter(i => !i.isCompleted);

      // Tag counts (excluding completed items)
      const nonCompletedIds = nonCompleted.map(i => i.id);
      let tagCountsMap: Record<string, number> = {};
      let listCountsMap: Record<string, number> = {};
      if (nonCompletedIds.length > 0) {
        const tagRows = await db.select().from(itemTags).where(inArray(itemTags.itemId, nonCompletedIds));
        for (const tr of tagRows) {
          tagCountsMap[tr.tagId] = (tagCountsMap[tr.tagId] || 0) + 1;
        }
      }
      // List counts (excluding completed items)
      for (const item of nonCompleted) {
        if (item.listId) {
          listCountsMap[item.listId] = (listCountsMap[item.listId] || 0) + 1;
        }
      }

      const result = {
        all: nonCompleted.length,
        tasks: nonCompleted.filter(i => i.type === 'task').length,
        notes: nonCompleted.filter(i => i.type === 'note').length,
        pinned: nonCompleted.filter(i => i.isPinned).length,
        completed: active.filter(i => i.isCompleted).length,
        trash: deleted.length,
        miscellaneous: nonCompleted.filter(i => !i.listId).length,
        todo: nonCompleted.filter(i => i.type === 'task' && i.section !== 'completed').length,
        tag_counts: tagCountsMap,
        list_counts: listCountsMap,
      };

      return res.json({ data: result });
    }

    if (funcName === 'search_items' || funcName === 'search_items_fuzzy') {
      const searchText = params?.search_text || params?.search_query || '';
      const searchTerm = `%${searchText}%`;
      const maxResults = params?.max_results || 50;
      const filterListId = params?.filter_list_id;
      const filterTagId = params?.filter_tag_id;

      // Build conditions
      const searchConditions: any[] = [
        eq(items.userId, user.id),
        isNull(items.deletedAt),
        or(
          like(items.title, searchTerm),
          like(items.content, searchTerm),
          like(items.searchContent, searchTerm)
        ),
      ];

      // Apply optional filters
      if (filterListId) {
        searchConditions.push(eq(items.listId, filterListId));
      }

      // If tag filter, get item IDs first
      let tagFilterItemIds: string[] | null = null;
      if (filterTagId) {
        const tagItemRows = await db.select().from(itemTags).where(eq(itemTags.tagId, filterTagId));
        tagFilterItemIds = tagItemRows.map(r => r.itemId);
        if (tagFilterItemIds.length === 0) {
          return res.json({ data: [] });
        }
        searchConditions.push(inArray(items.id, tagFilterItemIds));
      }

      const rows = await db.select().from(items).where(
        and(...searchConditions)
      ).orderBy(desc(items.updatedAt)).limit(maxResults);

      // Attach item_tags
      const itemIds = rows.map(r => r.id);
      let tagMap: Record<string, Array<{ tag_id: string }>> = {};
      if (itemIds.length > 0) {
        const tagRows = await db.select().from(itemTags).where(inArray(itemTags.itemId, itemIds));
        for (const tr of tagRows) {
          if (!tagMap[tr.itemId]) tagMap[tr.itemId] = [];
          tagMap[tr.itemId].push({ tag_id: tr.tagId });
        }
      }

      // Generate highlight snippets
      const lowerSearch = searchText.toLowerCase();
      const unmapped = rows.map(r => {
        const base = unmapColumns('items', r);
        // Generate title highlight
        let titleHighlight = r.title || '';
        const titleIdx = titleHighlight.toLowerCase().indexOf(lowerSearch);
        if (titleIdx >= 0) {
          titleHighlight = titleHighlight.substring(0, titleIdx) +
            '<b>' + titleHighlight.substring(titleIdx, titleIdx + searchText.length) + '</b>' +
            titleHighlight.substring(titleIdx + searchText.length);
        }
        // Generate content highlight
        let contentHighlight = '';
        const content = r.content || r.searchContent || '';
        const contentIdx = content.toLowerCase().indexOf(lowerSearch);
        if (contentIdx >= 0) {
          const start = Math.max(0, contentIdx - 40);
          const end = Math.min(content.length, contentIdx + searchText.length + 40);
          const snippet = (start > 0 ? '...' : '') +
            content.substring(start, contentIdx) +
            '<b>' + content.substring(contentIdx, contentIdx + searchText.length) + '</b>' +
            content.substring(contentIdx + searchText.length, end) +
            (end < content.length ? '...' : '');
          contentHighlight = snippet;
        }
        return {
          ...base,
          rank: 1,
          title_highlight: titleHighlight,
          content_highlight: contentHighlight,
          item_tags: tagMap[r.id] || [],
        };
      });

      return res.json({ data: unmapped });
    }

    return res.status(400).json({ error: `Unknown RPC function: ${funcName}` });
  } catch (error: any) {
    console.error('[SupabaseCompat RPC] Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Helper: Build Drizzle conditions from filter params
function buildConditions(tableRef: any, tableName: string, filters: Record<string, any>, userId: number) {
  const conditions: any[] = [];
  
  // Always scope to user (except for junction tables)
  if (tableName !== 'item_tags' && tableName !== 'itemTags' && tableRef.userId) {
    conditions.push(eq(tableRef.userId, userId));
  }

  for (const [key, value] of Object.entries(filters)) {
    if (key === '__or') continue; // Skip complex OR conditions for now
    
    if (key.endsWith('__is')) {
      const col = getColumn(tableRef, tableName, key.replace('__is', ''));
      if (col) {
        if (value === null) {
          conditions.push(isNull(col));
        }
      }
    } else if (key.endsWith('__not_is')) {
      const col = getColumn(tableRef, tableName, key.replace('__not_is', ''));
      if (col) {
        if (value === null) {
          conditions.push(isNotNull(col));
        }
      }
    } else if (key.endsWith('__in')) {
      const col = getColumn(tableRef, tableName, key.replace('__in', ''));
      if (col && Array.isArray(value) && value.length > 0) {
        conditions.push(inArray(col, value));
      }
    } else if (key.endsWith('__neq')) {
      const col = getColumn(tableRef, tableName, key.replace('__neq', ''));
      if (col) {
        conditions.push(ne(col, value));
      }
    } else if (key.endsWith('__ilike')) {
      const col = getColumn(tableRef, tableName, key.replace('__ilike', ''));
      if (col) {
        conditions.push(like(col, value));
      }
    } else {
      const col = getColumn(tableRef, tableName, key);
      if (col) {
        conditions.push(eq(col, value));
      }
    }
  }

  return conditions.length > 0 ? conditions : [sql`1=1`];
}

// Helper: Get a Drizzle column reference from a column name
function getColumn(tableRef: any, tableName: string, columnName: string) {
  // Map snake_case to camelCase
  const columnMaps: Record<string, Record<string, string>> = {
    items: {
      user_id: 'userId', is_pinned: 'isPinned', is_completed: 'isCompleted',
      sort_order: 'sortOrder', due_date: 'dueDate', list_id: 'listId',
      has_uncompleted_todos: 'hasUncompletedTodos', deleted_at: 'deletedAt',
      created_at: 'createdAt', updated_at: 'updatedAt', search_content: 'searchContent',
    },
    tags: { user_id: 'userId' },
    lists: { user_id: 'userId', sort_order: 'sortOrder', created_at: 'createdAt', updated_at: 'updatedAt' },
    item_tags: { item_id: 'itemId', tag_id: 'tagId' },
    user_settings: {
      user_id: 'userId', auto_reorder_checklist: 'autoReorderChecklist',
      tasks_enabled: 'tasksEnabled', editor_font_family: 'editorFontFamily',
      editor_font_size: 'editorFontSize', editor_line_height: 'editorLineHeight',
    },
    view_sort_preferences: {
      user_id: 'userId', view_key: 'viewKey', sort_order: 'sortOrder', sort_direction: 'sortDirection',
    },
  };

  const map = columnMaps[tableName] || {};
  const camelName = map[columnName] || columnName;
  
  return tableRef[camelName] || tableRef[columnName] || null;
}

export default router;
