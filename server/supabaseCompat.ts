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

  const map = columnMaps[table] || {};
  const mapped: any = {};
  
  for (const [key, value] of Object.entries(data)) {
    const mappedKey = map[key] || key;
    mapped[mappedKey] = value;
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
      const mappedData = mapColumns(tableName, data);
      // Add userId for user-scoped tables
      if (tableName !== 'item_tags' && tableName !== 'itemTags') {
        mappedData.userId = user.id;
      }
      // Handle date fields
      if (mappedData.deletedAt && typeof mappedData.deletedAt === 'string') {
        mappedData.deletedAt = new Date(mappedData.deletedAt);
      }
      await db.insert(tableRef).values(mappedData);
      
      // Return the inserted data
      let result;
      if (mappedData.id) {
        const rows = await db.select().from(tableRef).where(eq(tableRef.id, mappedData.id)).limit(1);
        result = rows[0] ? unmapColumns(tableName, rows[0]) : mappedData;
      } else {
        result = unmapColumns(tableName, mappedData);
      }
      
      return res.json({ data: single || maybeSingle ? result : [result] });
    }

    if (action === 'update') {
      const mappedData = mapColumns(tableName, data);
      const conditions = buildConditions(tableRef, tableName, filters || {}, user.id);
      
      // Handle date fields
      if (mappedData.deletedAt !== undefined) {
        mappedData.deletedAt = mappedData.deletedAt ? new Date(mappedData.deletedAt) : null;
      }
      
      await db.update(tableRef).set(mappedData).where(and(...conditions));
      return res.json({ data: null });
    }

    if (action === 'delete') {
      const conditions = buildConditions(tableRef, tableName, filters || {}, user.id);
      await db.delete(tableRef).where(and(...conditions));
      return res.json({ data: null });
    }

    if (action === 'upsert') {
      const mappedData = mapColumns(tableName, data);
      if (tableName !== 'item_tags' && tableName !== 'itemTags') {
        mappedData.userId = user.id;
      }
      if (mappedData.deletedAt && typeof mappedData.deletedAt === 'string') {
        mappedData.deletedAt = new Date(mappedData.deletedAt);
      }
      
      // Try insert, on conflict update
      try {
        await db.insert(tableRef).values(mappedData).onDuplicateKeyUpdate({ set: mappedData });
      } catch {
        // Fallback: try update
        if (mappedData.id) {
          await db.update(tableRef).set(mappedData).where(eq(tableRef.id, mappedData.id));
        }
      }
      
      let result;
      if (mappedData.id) {
        const rows = await db.select().from(tableRef).where(eq(tableRef.id, mappedData.id)).limit(1);
        result = rows[0] ? unmapColumns(tableName, rows[0]) : mappedData;
      } else {
        result = unmapColumns(tableName, mappedData);
      }
      return res.json({ data: single || maybeSingle ? result : [result] });
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

      const result = {
        all_count: active.length,
        task_count: active.filter(i => i.type === 'task').length,
        note_count: active.filter(i => i.type === 'note').length,
        pinned_count: active.filter(i => i.isPinned).length,
        completed_count: active.filter(i => i.isCompleted).length,
        trash_count: deleted.length,
        miscellaneous_count: active.filter(i => !i.listId).length,
        todo_count: active.filter(i => i.type === 'task' && !i.isCompleted && i.section !== 'completed').length,
      };

      return res.json({ data: result });
    }

    if (funcName === 'search_items' || funcName === 'search_items_fuzzy') {
      const searchTerm = `%${params?.search_query || ''}%`;
      const rows = await db.select().from(items).where(
        and(
          eq(items.userId, user.id),
          isNull(items.deletedAt),
          or(
            like(items.title, searchTerm),
            like(items.content, searchTerm),
            like(items.searchContent, searchTerm)
          )
        )
      ).orderBy(desc(items.updatedAt)).limit(params?.max_results || 50);

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

      const unmapped = rows.map(r => ({
        ...unmapColumns('items', r),
        item_tags: tagMap[r.id] || [],
      }));

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
