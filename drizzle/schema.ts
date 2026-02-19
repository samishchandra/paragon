import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  boolean,
  primaryKey,
  index,
  mediumtext,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Items table — stores both tasks and notes.
 * Uses UUID strings as primary keys (generated client-side for offline-first).
 */
export const items = mysqlTable(
  "items",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: int("userId").notNull(),
    type: mysqlEnum("type", ["task", "note"]).notNull(),
    title: text("title"),
    content: mediumtext("content"),
    searchContent: mediumtext("searchContent"),
    isPinned: boolean("isPinned").default(false).notNull(),
    isCompleted: boolean("isCompleted").default(false).notNull(),
    section: mysqlEnum("section", ["now", "later", "completed"]).default("now").notNull(),
    sortOrder: int("sortOrder").default(0).notNull(),
    dueDate: varchar("dueDate", { length: 32 }),
    listId: varchar("listId", { length: 36 }),
    hasUncompletedTodos: boolean("hasUncompletedTodos").default(false).notNull(),
    deletedAt: timestamp("deletedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => [
    index("items_userId_idx").on(table.userId),
    index("items_userId_type_idx").on(table.userId, table.type),
    index("items_userId_listId_idx").on(table.userId, table.listId),
    index("items_userId_deletedAt_idx").on(table.userId, table.deletedAt),
    index("items_userId_isPinned_idx").on(table.userId, table.isPinned),
    index("items_userId_isCompleted_idx").on(table.userId, table.isCompleted),
  ]
);

export type Item = typeof items.$inferSelect;
export type InsertItem = typeof items.$inferInsert;

/**
 * Tags table — user-defined labels for items.
 */
export const tags = mysqlTable(
  "tags",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: int("userId").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    color: varchar("color", { length: 32 }).notNull(),
  },
  (table) => [
    index("tags_userId_idx").on(table.userId),
  ]
);

export type Tag = typeof tags.$inferSelect;
export type InsertTag = typeof tags.$inferInsert;

/**
 * Lists table — folders/collections for organizing items.
 */
export const lists = mysqlTable(
  "lists",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: int("userId").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    icon: varchar("icon", { length: 64 }).default("folder").notNull(),
    color: varchar("color", { length: 32 }).default("#3B82F6").notNull(),
    type: mysqlEnum("type", ["task", "note"]).default("task").notNull(),
    sortOrder: int("sortOrder").default(0).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => [
    index("lists_userId_idx").on(table.userId),
  ]
);

export type List = typeof lists.$inferSelect;
export type InsertList = typeof lists.$inferInsert;

/**
 * Item-Tag junction table — many-to-many relationship.
 */
export const itemTags = mysqlTable(
  "itemTags",
  {
    itemId: varchar("itemId", { length: 36 }).notNull(),
    tagId: varchar("tagId", { length: 36 }).notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.itemId, table.tagId] }),
    index("itemTags_tagId_idx").on(table.tagId),
  ]
);

export type ItemTag = typeof itemTags.$inferSelect;
export type InsertItemTag = typeof itemTags.$inferInsert;

/**
 * User settings table — per-user preferences.
 */
export const userSettings = mysqlTable(
  "userSettings",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull().unique(),
    autoReorderChecklist: boolean("autoReorderChecklist").default(true).notNull(),
    tasksEnabled: boolean("tasksEnabled").default(true).notNull(),
    editorFontFamily: varchar("editorFontFamily", { length: 128 }).default("default"),
    editorFontSize: int("editorFontSize").default(16),
    editorLineHeight: varchar("editorLineHeight", { length: 16 }).default("1.75"),
  }
);

export type UserSettings = typeof userSettings.$inferSelect;
export type InsertUserSettings = typeof userSettings.$inferInsert;

/**
 * View sort preferences — per-view sort order/direction.
 */
export const viewSortPreferences = mysqlTable(
  "viewSortPreferences",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    viewKey: varchar("viewKey", { length: 128 }).notNull(),
    sortOrder: varchar("sortOrder", { length: 32 }).default("modified").notNull(),
    sortDirection: varchar("sortDirection", { length: 8 }).default("desc").notNull(),
  },
  (table) => [
    index("viewSortPrefs_userId_viewKey_idx").on(table.userId, table.viewKey),
  ]
);

export type ViewSortPreference = typeof viewSortPreferences.$inferSelect;
export type InsertViewSortPreference = typeof viewSortPreferences.$inferInsert;
