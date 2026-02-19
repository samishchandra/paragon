import { eq, and, isNull, isNotNull, like, or, sql, desc, asc, inArray, ne } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  items,
  tags,
  lists,
  itemTags,
  userSettings,
  viewSortPreferences,
  type InsertItem,
  type InsertTag,
  type InsertList,
  type InsertItemTag,
  type InsertUserSettings,
  type InsertViewSortPreference,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── User helpers ───────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Items helpers ──────────────────────────────────────────────────────────

export async function getItems(userId: number) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db
    .select()
    .from(items)
    .where(eq(items.userId, userId))
    .orderBy(desc(items.updatedAt));
  return rows;
}

export async function getItemById(userId: number, itemId: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db
    .select()
    .from(items)
    .where(and(eq(items.id, itemId), eq(items.userId, userId)))
    .limit(1);
  return rows[0] ?? null;
}

export async function getItemsByIds(userId: number, itemIds: string[]) {
  const db = await getDb();
  if (!db) return [];
  if (itemIds.length === 0) return [];
  const rows = await db
    .select()
    .from(items)
    .where(and(eq(items.userId, userId), inArray(items.id, itemIds)));
  return rows;
}

export async function createItem(data: InsertItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(items).values(data);
  const rows = await db.select().from(items).where(eq(items.id, data.id)).limit(1);
  return rows[0];
}

export async function updateItem(userId: number, itemId: string, data: Partial<InsertItem>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { id, userId: _, ...updateData } = data;
  await db
    .update(items)
    .set(updateData)
    .where(and(eq(items.id, itemId), eq(items.userId, userId)));
  const rows = await db.select().from(items).where(eq(items.id, itemId)).limit(1);
  return rows[0];
}

export async function deleteItemPermanently(userId: number, itemId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Delete item_tags first
  await db.delete(itemTags).where(eq(itemTags.itemId, itemId));
  await db.delete(items).where(and(eq(items.id, itemId), eq(items.userId, userId)));
}

export async function batchUpdateItems(userId: number, updates: Array<{ id: string; data: Partial<InsertItem> }>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  for (const update of updates) {
    const { id: _id, userId: _uid, ...updateData } = update.data;
    await db
      .update(items)
      .set(updateData)
      .where(and(eq(items.id, update.id), eq(items.userId, userId)));
  }
}

// ─── Item Tags helpers ──────────────────────────────────────────────────────

export async function getItemTags(itemId: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(itemTags).where(eq(itemTags.itemId, itemId));
}

export async function getItemTagsForUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  // Join with items to filter by user
  const rows = await db
    .select({ itemId: itemTags.itemId, tagId: itemTags.tagId })
    .from(itemTags)
    .innerJoin(items, eq(itemTags.itemId, items.id))
    .where(eq(items.userId, userId));
  return rows;
}

export async function setItemTags(itemId: string, tagIds: string[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Delete existing
  await db.delete(itemTags).where(eq(itemTags.itemId, itemId));
  // Insert new
  if (tagIds.length > 0) {
    await db.insert(itemTags).values(tagIds.map((tagId) => ({ itemId, tagId })));
  }
}

// ─── Tags helpers ───────────────────────────────────────────────────────────

export async function getTags(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tags).where(eq(tags.userId, userId));
}

export async function createTag(data: InsertTag) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(tags).values(data);
  const rows = await db.select().from(tags).where(eq(tags.id, data.id)).limit(1);
  return rows[0];
}

export async function updateTag(userId: number, tagId: string, data: Partial<InsertTag>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { id: _, userId: __, ...updateData } = data;
  await db.update(tags).set(updateData).where(and(eq(tags.id, tagId), eq(tags.userId, userId)));
  const rows = await db.select().from(tags).where(eq(tags.id, tagId)).limit(1);
  return rows[0];
}

export async function deleteTag(userId: number, tagId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Remove from item_tags
  await db.delete(itemTags).where(eq(itemTags.tagId, tagId));
  await db.delete(tags).where(and(eq(tags.id, tagId), eq(tags.userId, userId)));
}

export async function findTagByName(userId: number, name: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db
    .select()
    .from(tags)
    .where(and(eq(tags.userId, userId), eq(tags.name, name)))
    .limit(1);
  return rows[0] ?? null;
}

// ─── Lists helpers ──────────────────────────────────────────────────────────

export async function getLists(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(lists).where(eq(lists.userId, userId)).orderBy(asc(lists.sortOrder));
}

export async function createList(data: InsertList) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(lists).values(data);
  const rows = await db.select().from(lists).where(eq(lists.id, data.id)).limit(1);
  return rows[0];
}

export async function updateList(userId: number, listId: string, data: Partial<InsertList>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { id: _, userId: __, ...updateData } = data;
  await db.update(lists).set(updateData).where(and(eq(lists.id, listId), eq(lists.userId, userId)));
  const rows = await db.select().from(lists).where(eq(lists.id, listId)).limit(1);
  return rows[0];
}

export async function deleteList(userId: number, listId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Unassign items from this list
  await db
    .update(items)
    .set({ listId: null })
    .where(and(eq(items.userId, userId), eq(items.listId, listId)));
  await db.delete(lists).where(and(eq(lists.id, listId), eq(lists.userId, userId)));
}

export async function findListByName(userId: number, name: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db
    .select()
    .from(lists)
    .where(and(eq(lists.userId, userId), eq(lists.name, name)))
    .limit(1);
  return rows[0] ?? null;
}

// ─── Search helpers ─────────────────────────────────────────────────────────

export async function searchItems(userId: number, query: string, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  const searchTerm = `%${query}%`;
  const rows = await db
    .select()
    .from(items)
    .where(
      and(
        eq(items.userId, userId),
        isNull(items.deletedAt),
        or(
          like(items.title, searchTerm),
          like(items.content, searchTerm),
          like(items.searchContent, searchTerm)
        )
      )
    )
    .orderBy(desc(items.updatedAt))
    .limit(limit);
  return rows;
}

// ─── Sidebar counts helpers ─────────────────────────────────────────────────

export async function getSidebarCounts(userId: number) {
  const db = await getDb();
  if (!db) return null;

  // Get all items for this user
  const allItems = await db
    .select({
      id: items.id,
      type: items.type,
      isPinned: items.isPinned,
      isCompleted: items.isCompleted,
      section: items.section,
      deletedAt: items.deletedAt,
      listId: items.listId,
    })
    .from(items)
    .where(eq(items.userId, userId));

  const active = allItems.filter((i) => !i.deletedAt);
  const deleted = allItems.filter((i) => i.deletedAt);

  const counts = {
    all: active.length,
    tasks: active.filter((i) => i.type === "task").length,
    notes: active.filter((i) => i.type === "note").length,
    pinned: active.filter((i) => i.isPinned).length,
    completed: active.filter((i) => i.isCompleted).length,
    trash: deleted.length,
    miscellaneous: active.filter((i) => !i.listId).length,
    todo: active.filter((i) => i.type === "task" && !i.isCompleted && i.section !== "completed").length,
  };

  // Get tag counts
  const allItemTags = await db
    .select({ itemId: itemTags.itemId, tagId: itemTags.tagId })
    .from(itemTags)
    .innerJoin(items, eq(itemTags.itemId, items.id))
    .where(and(eq(items.userId, userId), isNull(items.deletedAt)));

  const tagCounts: Record<string, number> = {};
  for (const it of allItemTags) {
    tagCounts[it.tagId] = (tagCounts[it.tagId] || 0) + 1;
  }

  // Get list counts
  const listCounts: Record<string, number> = {};
  for (const item of active) {
    if (item.listId) {
      listCounts[item.listId] = (listCounts[item.listId] || 0) + 1;
    }
  }

  return { counts, tagCounts, listCounts };
}

// ─── Pinned items ───────────────────────────────────────────────────────────

export async function getPinnedItems(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(items)
    .where(and(eq(items.userId, userId), eq(items.isPinned, true), isNull(items.deletedAt)))
    .orderBy(desc(items.updatedAt));
}

// ─── User Settings helpers ──────────────────────────────────────────────────

export async function getUserSettings(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(userSettings).where(eq(userSettings.userId, userId)).limit(1);
  return rows[0] ?? null;
}

export async function upsertUserSettings(userId: number, data: Partial<InsertUserSettings>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getUserSettings(userId);
  if (existing) {
    const { id: _, userId: __, ...updateData } = data;
    await db.update(userSettings).set(updateData).where(eq(userSettings.userId, userId));
  } else {
    await db.insert(userSettings).values({ ...data, userId });
  }
  return getUserSettings(userId);
}

// ─── View Sort Preferences helpers ──────────────────────────────────────────

export async function getViewSortPreference(userId: number, viewKey: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db
    .select()
    .from(viewSortPreferences)
    .where(and(eq(viewSortPreferences.userId, userId), eq(viewSortPreferences.viewKey, viewKey)))
    .limit(1);
  return rows[0] ?? null;
}

export async function getAllViewSortPreferences(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(viewSortPreferences).where(eq(viewSortPreferences.userId, userId));
}

export async function upsertViewSortPreference(
  userId: number,
  viewKey: string,
  sortOrder: string,
  sortDirection: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getViewSortPreference(userId, viewKey);
  if (existing) {
    await db
      .update(viewSortPreferences)
      .set({ sortOrder, sortDirection })
      .where(and(eq(viewSortPreferences.userId, userId), eq(viewSortPreferences.viewKey, viewKey)));
  } else {
    await db.insert(viewSortPreferences).values({ userId, viewKey, sortOrder, sortDirection });
  }
  return getViewSortPreference(userId, viewKey);
}

// ─── Wiki Links helper ──────────────────────────────────────────────────────

export async function getWikiLinkItems(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({ id: items.id, title: items.title, type: items.type })
    .from(items)
    .where(and(eq(items.userId, userId), isNull(items.deletedAt)));
}

// ─── Bulk sync helper (for offline-first) ───────────────────────────────────

export async function getItemsUpdatedSince(userId: number, since: Date) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(items)
    .where(and(eq(items.userId, userId), sql`${items.updatedAt} > ${since}`))
    .orderBy(desc(items.updatedAt));
}

export async function getTagsForUser(userId: number) {
  return getTags(userId);
}

export async function getListsForUser(userId: number) {
  return getLists(userId);
}
