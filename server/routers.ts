import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Items ──────────────────────────────────────────────────────────────
  items: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const rows = await db.getItems(ctx.user.id);
      const allItemTags = await db.getItemTagsForUser(ctx.user.id);
      // Attach tags to each item
      return rows.map((item) => ({
        ...item,
        item_tags: allItemTags.filter((it) => it.itemId === item.id).map((it) => ({ tag_id: it.tagId })),
      }));
    }),

    getById: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ ctx, input }) => {
        const item = await db.getItemById(ctx.user.id, input.id);
        if (!item) return null;
        const itemTagRows = await db.getItemTags(input.id);
        return {
          ...item,
          item_tags: itemTagRows.map((it) => ({ tag_id: it.tagId })),
        };
      }),

    getByIds: protectedProcedure
      .input(z.object({ ids: z.array(z.string()) }))
      .query(async ({ ctx, input }) => {
        const rows = await db.getItemsByIds(ctx.user.id, input.ids);
        const allItemTags = await db.getItemTagsForUser(ctx.user.id);
        return rows.map((item) => ({
          ...item,
          item_tags: allItemTags.filter((it) => it.itemId === item.id).map((it) => ({ tag_id: it.tagId })),
        }));
      }),

    create: protectedProcedure
      .input(
        z.object({
          id: z.string(),
          type: z.enum(["task", "note"]),
          title: z.string().optional(),
          content: z.string().optional(),
          searchContent: z.string().optional(),
          isPinned: z.boolean().optional(),
          isCompleted: z.boolean().optional(),
          section: z.enum(["now", "later", "completed"]).optional(),
          sortOrder: z.number().optional(),
          dueDate: z.string().nullable().optional(),
          listId: z.string().nullable().optional(),
          hasUncompletedTodos: z.boolean().optional(),
          tagIds: z.array(z.string()).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { tagIds, ...itemData } = input;
        const item = await db.createItem({
          ...itemData,
          userId: ctx.user.id,
        });
        if (tagIds && tagIds.length > 0) {
          await db.setItemTags(input.id, tagIds);
        }
        const itemTagRows = await db.getItemTags(input.id);
        return {
          ...item,
          item_tags: itemTagRows.map((it) => ({ tag_id: it.tagId })),
        };
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.string(),
          title: z.string().optional(),
          content: z.string().optional(),
          searchContent: z.string().optional(),
          isPinned: z.boolean().optional(),
          isCompleted: z.boolean().optional(),
          section: z.enum(["now", "later", "completed"]).optional(),
          sortOrder: z.number().optional(),
          dueDate: z.string().nullable().optional(),
          listId: z.string().nullable().optional(),
          hasUncompletedTodos: z.boolean().optional(),
          deletedAt: z.string().nullable().optional(),
          tagIds: z.array(z.string()).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { id, tagIds, deletedAt, ...updateData } = input;
        const finalUpdate: Record<string, unknown> = { ...updateData };
        if (deletedAt !== undefined) {
          finalUpdate.deletedAt = deletedAt ? new Date(deletedAt) : null;
        }
        const item = await db.updateItem(ctx.user.id, id, finalUpdate as any);
        if (tagIds !== undefined) {
          await db.setItemTags(id, tagIds);
        }
        const itemTagRows = await db.getItemTags(id);
        return {
          ...item,
          item_tags: itemTagRows.map((it) => ({ tag_id: it.tagId })),
        };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        await db.deleteItemPermanently(ctx.user.id, input.id);
        return { success: true };
      }),

    batchUpdate: protectedProcedure
      .input(
        z.object({
          updates: z.array(
            z.object({
              id: z.string(),
              data: z.record(z.string(), z.unknown()),
            })
          ),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.batchUpdateItems(ctx.user.id, input.updates as any);
        return { success: true };
      }),
  }),

  // ─── Tags ───────────────────────────────────────────────────────────────
  tags: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getTags(ctx.user.id);
    }),

    create: protectedProcedure
      .input(
        z.object({
          id: z.string(),
          name: z.string(),
          color: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return db.createTag({ ...input, userId: ctx.user.id });
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.string(),
          name: z.string().optional(),
          color: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        return db.updateTag(ctx.user.id, id, data);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        await db.deleteTag(ctx.user.id, input.id);
        return { success: true };
      }),

    findByName: protectedProcedure
      .input(z.object({ name: z.string() }))
      .query(async ({ ctx, input }) => {
        return db.findTagByName(ctx.user.id, input.name);
      }),
  }),

  // ─── Lists ──────────────────────────────────────────────────────────────
  lists: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getLists(ctx.user.id);
    }),

    create: protectedProcedure
      .input(
        z.object({
          id: z.string(),
          name: z.string(),
          icon: z.string().optional(),
          color: z.string().optional(),
          type: z.enum(["task", "note"]).optional(),
          sortOrder: z.number().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return db.createList({ ...input, userId: ctx.user.id });
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.string(),
          name: z.string().optional(),
          icon: z.string().optional(),
          color: z.string().optional(),
          type: z.enum(["task", "note"]).optional(),
          sortOrder: z.number().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        return db.updateList(ctx.user.id, id, data);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        await db.deleteList(ctx.user.id, input.id);
        return { success: true };
      }),

    findByName: protectedProcedure
      .input(z.object({ name: z.string() }))
      .query(async ({ ctx, input }) => {
        return db.findListByName(ctx.user.id, input.name);
      }),
  }),

  // ─── Search ─────────────────────────────────────────────────────────────
  search: router({
    items: protectedProcedure
      .input(
        z.object({
          query: z.string(),
          limit: z.number().optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        const results = await db.searchItems(ctx.user.id, input.query, input.limit);
        const allItemTags = await db.getItemTagsForUser(ctx.user.id);
        return results.map((item) => ({
          ...item,
          item_tags: allItemTags.filter((it) => it.itemId === item.id).map((it) => ({ tag_id: it.tagId })),
        }));
      }),
  }),

  // ─── Sidebar ────────────────────────────────────────────────────────────
  sidebar: router({
    counts: protectedProcedure.query(async ({ ctx }) => {
      return db.getSidebarCounts(ctx.user.id);
    }),

    pinnedItems: protectedProcedure.query(async ({ ctx }) => {
      const pinned = await db.getPinnedItems(ctx.user.id);
      const allItemTags = await db.getItemTagsForUser(ctx.user.id);
      return pinned.map((item) => ({
        ...item,
        item_tags: allItemTags.filter((it) => it.itemId === item.id).map((it) => ({ tag_id: it.tagId })),
      }));
    }),
  }),

  // ─── Settings ───────────────────────────────────────────────────────────
  settings: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserSettings(ctx.user.id);
    }),

    upsert: protectedProcedure
      .input(
        z.object({
          autoReorderChecklist: z.boolean().optional(),
          tasksEnabled: z.boolean().optional(),
          editorFontFamily: z.string().optional(),
          editorFontSize: z.number().optional(),
          editorLineHeight: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return db.upsertUserSettings(ctx.user.id, input);
      }),
  }),

  // ─── View Sort Preferences ─────────────────────────────────────────────
  viewSort: router({
    get: protectedProcedure
      .input(z.object({ viewKey: z.string() }))
      .query(async ({ ctx, input }) => {
        return db.getViewSortPreference(ctx.user.id, input.viewKey);
      }),

    getAll: protectedProcedure.query(async ({ ctx }) => {
      return db.getAllViewSortPreferences(ctx.user.id);
    }),

    upsert: protectedProcedure
      .input(
        z.object({
          viewKey: z.string(),
          sortOrder: z.string(),
          sortDirection: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return db.upsertViewSortPreference(ctx.user.id, input.viewKey, input.sortOrder, input.sortDirection);
      }),
  }),

  // ─── Wiki Links ─────────────────────────────────────────────────────────
  wikiLinks: router({
    items: protectedProcedure.query(async ({ ctx }) => {
      return db.getWikiLinkItems(ctx.user.id);
    }),
  }),

  // ─── Images ─────────────────────────────────────────────────────────────
  images: router({
    getUploadUrl: protectedProcedure
      .input(z.object({
        fileName: z.string(),
        mimeType: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { storagePut } = await import('./storage');
        // Generate a unique key for the image
        const date = new Date().toISOString().slice(0, 10);
        const random = Math.random().toString(36).substring(2, 10);
        const ext = input.fileName.split('.').pop()?.toLowerCase() || 'png';
        const key = `images/${ctx.user.id}/${date}_${random}.${ext}`;
        // We return the key so the client can upload via a separate endpoint
        return { key, mimeType: input.mimeType };
      }),
  }),

  // ─── Sync (for offline-first) ──────────────────────────────────────────
  sync: router({
    pull: protectedProcedure
      .input(
        z.object({
          since: z.string().optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        const sinceDate = input.since ? new Date(input.since) : new Date(0);
        const [updatedItems, allTags, allLists, allItemTags] = await Promise.all([
          db.getItemsUpdatedSince(ctx.user.id, sinceDate),
          db.getTags(ctx.user.id),
          db.getLists(ctx.user.id),
          db.getItemTagsForUser(ctx.user.id),
        ]);
        return {
          items: updatedItems.map((item) => ({
            ...item,
            item_tags: allItemTags.filter((it) => it.itemId === item.id).map((it) => ({ tag_id: it.tagId })),
          })),
          tags: allTags,
          lists: allLists,
          serverTime: new Date().toISOString(),
        };
      }),

    pushChanges: protectedProcedure
      .input(
        z.object({
          changes: z.array(
            z.object({
              type: z.enum(["create", "update", "delete"]),
              entity: z.enum(["item", "tag", "list"]),
              id: z.string(),
              data: z.record(z.string(), z.unknown()).optional(),
              tagIds: z.array(z.string()).optional(),
            })
          ),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const results: Array<{ id: string; success: boolean; error?: string }> = [];

        for (const change of input.changes) {
          try {
            if (change.entity === "item") {
              if (change.type === "create") {
                const { tagIds: _, ...itemData } = change.data || {};
                await db.createItem({
                  id: change.id,
                  userId: ctx.user.id,
                  type: (itemData as any).type || "note",
                  ...itemData,
                } as any);
                if (change.tagIds && change.tagIds.length > 0) {
                  await db.setItemTags(change.id, change.tagIds);
                }
              } else if (change.type === "update") {
                const { tagIds: _, deletedAt, ...updateData } = change.data || {} as any;
                const finalUpdate: Record<string, unknown> = { ...updateData };
                if (deletedAt !== undefined) {
                  finalUpdate.deletedAt = deletedAt ? new Date(deletedAt as string) : null;
                }
                await db.updateItem(ctx.user.id, change.id, finalUpdate as any);
                if (change.tagIds !== undefined) {
                  await db.setItemTags(change.id, change.tagIds);
                }
              } else if (change.type === "delete") {
                await db.deleteItemPermanently(ctx.user.id, change.id);
              }
            } else if (change.entity === "tag") {
              if (change.type === "create") {
                await db.createTag({
                  id: change.id,
                  userId: ctx.user.id,
                  name: (change.data as any)?.name || "",
                  color: (change.data as any)?.color || "#3B82F6",
                });
              } else if (change.type === "update") {
                await db.updateTag(ctx.user.id, change.id, change.data as any);
              } else if (change.type === "delete") {
                await db.deleteTag(ctx.user.id, change.id);
              }
            } else if (change.entity === "list") {
              if (change.type === "create") {
                await db.createList({
                  id: change.id,
                  userId: ctx.user.id,
                  name: (change.data as any)?.name || "",
                  ...change.data,
                } as any);
              } else if (change.type === "update") {
                await db.updateList(ctx.user.id, change.id, change.data as any);
              } else if (change.type === "delete") {
                await db.deleteList(ctx.user.id, change.id);
              }
            }
            results.push({ id: change.id, success: true });
          } catch (error: any) {
            results.push({ id: change.id, success: false, error: error.message });
          }
        }

        return { results, serverTime: new Date().toISOString() };
      }),
  }),
});

export type AppRouter = typeof appRouter;
