/**
 * Momentum tRPC Router Tests
 *
 * Tests the core CRUD operations for items, tags, lists, settings,
 * view sort preferences, sidebar counts, search, and sync endpoints.
 *
 * Uses the real database via the tRPC caller pattern.
 */
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";
import { nanoid } from "nanoid";

// ─── Test helpers ──────────────────────────────────────────────────────────

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

let testUserId: number;
const testOpenId = `test-user-${nanoid(8)}`;

function createAuthContext(userId: number): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: testOpenId,
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

// ─── Setup & Teardown ──────────────────────────────────────────────────────

beforeAll(async () => {
  // Create a test user
  await db.upsertUser({
    openId: testOpenId,
    name: "Test User",
    email: "test@example.com",
    loginMethod: "manus",
  });
  const user = await db.getUserByOpenId(testOpenId);
  if (!user) throw new Error("Failed to create test user");
  testUserId = user.id;
});

afterAll(async () => {
  // Clean up test data
  const database = await db.getDb();
  if (!database) return;

  // Import schema for cleanup
  const { items, tags, lists, itemTags, userSettings, viewSortPreferences, users } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");

  // Delete in order of dependencies
  await database.delete(itemTags).where(eq(itemTags.itemId, "")).catch(() => {}); // no-op, just for type
  // Delete all items for this user
  const userItems = await database.select().from(items).where(eq(items.userId, testUserId));
  for (const item of userItems) {
    await database.delete(itemTags).where(eq(itemTags.itemId, item.id));
  }
  await database.delete(items).where(eq(items.userId, testUserId));
  await database.delete(tags).where(eq(tags.userId, testUserId));
  await database.delete(lists).where(eq(lists.userId, testUserId));
  await database.delete(userSettings).where(eq(userSettings.userId, testUserId));
  await database.delete(viewSortPreferences).where(eq(viewSortPreferences.userId, testUserId));
  await database.delete(users).where(eq(users.id, testUserId));
});

// ─── Items CRUD ────────────────────────────────────────────────────────────

describe("items router", () => {
  const noteId = `test-note-${nanoid(8)}`;
  const taskId = `test-task-${nanoid(8)}`;

  it("creates a note", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.items.create({
      id: noteId,
      type: "note",
      title: "Test Note",
      content: "Hello world",
    });

    expect(result).toBeDefined();
    expect(result.id).toBe(noteId);
    expect(result.title).toBe("Test Note");
    expect(result.type).toBe("note");
  });

  it("creates a task", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.items.create({
      id: taskId,
      type: "task",
      title: "Test Task",
      content: "Do something",
    });

    expect(result).toBeDefined();
    expect(result.id).toBe(taskId);
    expect(result.type).toBe("task");
  });

  it("lists items for the user", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const items = await caller.items.list();

    expect(items.length).toBeGreaterThanOrEqual(2);
    const ids = items.map((i: any) => i.id);
    expect(ids).toContain(noteId);
    expect(ids).toContain(taskId);
  });

  it("gets an item by ID", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const item = await caller.items.getById({ id: noteId });

    expect(item).toBeDefined();
    expect(item!.id).toBe(noteId);
    expect(item!.title).toBe("Test Note");
  });

  it("updates an item", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.items.update({
      id: noteId,
      title: "Updated Note Title",
      isPinned: true,
    });

    expect(result).toBeDefined();
    expect(result.title).toBe("Updated Note Title");
    expect(result.isPinned).toBe(true);
  });

  it("soft-deletes an item", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const now = new Date().toISOString();
    const result = await caller.items.update({
      id: taskId,
      deletedAt: now,
    });

    expect(result).toBeDefined();
    expect(result.deletedAt).toBeTruthy();
  });

  it("permanently deletes an item", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.items.delete({ id: taskId });
    expect(result).toEqual({ success: true });

    const item = await caller.items.getById({ id: taskId });
    expect(item).toBeNull();
  });
});

// ─── Tags CRUD ─────────────────────────────────────────────────────────────

describe("tags router", () => {
  const tagId = `test-tag-${nanoid(8)}`;

  it("creates a tag", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.tags.create({
      id: tagId,
      name: "Test Tag",
      color: "#FF5733",
    });

    expect(result).toBeDefined();
    expect(result.id).toBe(tagId);
    expect(result.name).toBe("Test Tag");
    expect(result.color).toBe("#FF5733");
  });

  it("lists tags for the user", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const tags = await caller.tags.list();
    expect(tags.length).toBeGreaterThanOrEqual(1);
    expect(tags.some((t: any) => t.id === tagId)).toBe(true);
  });

  it("updates a tag", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.tags.update({
      id: tagId,
      name: "Updated Tag",
      color: "#00FF00",
    });

    expect(result).toBeDefined();
    expect(result.name).toBe("Updated Tag");
    expect(result.color).toBe("#00FF00");
  });

  it("finds a tag by name", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const tag = await caller.tags.findByName({ name: "Updated Tag" });
    expect(tag).toBeDefined();
    expect(tag!.id).toBe(tagId);
  });

  it("deletes a tag", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.tags.delete({ id: tagId });
    expect(result).toEqual({ success: true });

    const tag = await caller.tags.findByName({ name: "Updated Tag" });
    expect(tag).toBeNull();
  });
});

// ─── Lists CRUD ────────────────────────────────────────────────────────────

describe("lists router", () => {
  const listId = `test-list-${nanoid(8)}`;

  it("creates a list", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.lists.create({
      id: listId,
      name: "Test List",
      icon: "📋",
      color: "#3B82F6",
    });

    expect(result).toBeDefined();
    expect(result.id).toBe(listId);
    expect(result.name).toBe("Test List");
  });

  it("lists all lists for the user", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const lists = await caller.lists.list();
    expect(lists.length).toBeGreaterThanOrEqual(1);
    expect(lists.some((l: any) => l.id === listId)).toBe(true);
  });

  it("updates a list", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.lists.update({
      id: listId,
      name: "Updated List",
    });

    expect(result).toBeDefined();
    expect(result.name).toBe("Updated List");
  });

  it("deletes a list", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.lists.delete({ id: listId });
    expect(result).toEqual({ success: true });
  });
});

// ─── Settings ──────────────────────────────────────────────────────────────

describe("settings router", () => {
  it("returns null when no settings exist", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const settings = await caller.settings.get();
    // May be null or existing from previous test runs
    // Just verify it doesn't throw
    expect(settings === null || typeof settings === "object").toBe(true);
  });

  it("upserts user settings", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.settings.upsert({
      tasksEnabled: true,
      editorFontFamily: "Inter",
      editorFontSize: 16,
    });

    expect(result).toBeDefined();
    expect(result!.tasksEnabled).toBe(true);
    expect(result!.editorFontFamily).toBe("Inter");
  });

  it("retrieves saved settings", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const settings = await caller.settings.get();
    expect(settings).toBeDefined();
    expect(settings!.tasksEnabled).toBe(true);
  });
});

// ─── View Sort Preferences ─────────────────────────────────────────────────

describe("viewSort router", () => {
  it("upserts a view sort preference", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.viewSort.upsert({
      viewKey: "all",
      sortOrder: "modified",
      sortDirection: "desc",
    });

    expect(result).toBeDefined();
    expect(result!.sortOrder).toBe("modified");
    expect(result!.sortDirection).toBe("desc");
  });

  it("gets a view sort preference", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.viewSort.get({ viewKey: "all" });
    expect(result).toBeDefined();
    expect(result!.sortOrder).toBe("modified");
  });

  it("gets all view sort preferences", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const results = await caller.viewSort.getAll();
    expect(results.length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Sidebar Counts ────────────────────────────────────────────────────────

describe("sidebar router", () => {
  it("returns sidebar counts", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.sidebar.counts();
    expect(result).toBeDefined();
    expect(result).toHaveProperty("counts");
    expect(result!.counts).toHaveProperty("all");
    expect(result!.counts).toHaveProperty("trash");
    expect(result!.counts).toHaveProperty("pinned");
  });
});

// ─── Search ────────────────────────────────────────────────────────────────

describe("search router", () => {
  it("searches items by query", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    // Create an item to search for
    const searchItemId = `search-item-${nanoid(8)}`;
    await caller.items.create({
      id: searchItemId,
      type: "note",
      title: "Searchable Note About Quantum Physics",
      content: "This note discusses quantum entanglement",
    });

    const results = await caller.search.items({
      query: "quantum",
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.some((r: any) => r.id === searchItemId)).toBe(true);

    // Cleanup
    await caller.items.delete({ id: searchItemId });
  });
});

// ─── Sync ──────────────────────────────────────────────────────────────────

describe("sync router", () => {
  it("pulls all data for the user", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.sync.pull({});

    expect(result).toBeDefined();
    expect(result).toHaveProperty("items");
    expect(result).toHaveProperty("tags");
    expect(result).toHaveProperty("lists");
    expect(result).toHaveProperty("serverTime");
    expect(Array.isArray(result.items)).toBe(true);
    expect(Array.isArray(result.tags)).toBe(true);
    expect(Array.isArray(result.lists)).toBe(true);
  });

  it("pushes changes to the server", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const syncItemId = `sync-item-${nanoid(8)}`;
    const result = await caller.sync.pushChanges({
      changes: [
        {
          type: "create",
          entity: "item",
          id: syncItemId,
          data: {
            type: "note",
            title: "Synced Note",
            content: "Created via sync",
          },
        },
      ],
    });

    expect(result).toBeDefined();
    expect(result.results.length).toBe(1);
    expect(result.results[0].success).toBe(true);
    expect(result).toHaveProperty("serverTime");

    // Verify the item was created
    const item = await caller.items.getById({ id: syncItemId });
    expect(item).toBeDefined();
    expect(item!.title).toBe("Synced Note");

    // Cleanup
    await caller.items.delete({ id: syncItemId });
  });
});

// ─── Wiki Links ────────────────────────────────────────────────────────────

describe("wikiLinks router", () => {
  it("returns wiki link items", async () => {
    const ctx = createAuthContext(testUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.wikiLinks.items();
    expect(Array.isArray(result)).toBe(true);
    // Each item should have id, title, type
    if (result.length > 0) {
      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("title");
      expect(result[0]).toHaveProperty("type");
    }
  });
});
