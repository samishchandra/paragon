/**
 * useWikiLinks — Wiki-link cache initialization, search, and rename propagation.
 *
 * Owns:
 *   - Initializing the wiki-link title cache on mount (one-time server fetch)
 *   - Event-driven cache rebuild when items change (replaces 30s polling)
 *   - searchItemTitles (server-side title search for autocomplete)
 *   - findItemByTitle (cache-first lookup with server fallback)
 *   - validateWikiLinkFn (check if a page name exists)
 *   - updateWikiLinksOnRename (propagate title renames across backlinks)
 */
import { useCallback, useEffect, useRef } from 'react';
import { apiQuery } from '@/lib/db';
import { wikiLinkCache } from '@/lib/wikiLinkCache';
import type { Item } from '@/types';

export interface WikiLinksDeps {
  userId: string;
  items: Item[];
  dispatch: React.Dispatch<any>;
}

export function useWikiLinks(deps: WikiLinksDeps) {
  const { userId, items, dispatch } = deps;

  // Initialize wiki link title cache on mount (one-time server fetch)
  useEffect(() => {
    if (userId) {
      wikiLinkCache.refresh(userId);
    }
  }, [userId]);

  // Rebuild cache from items whenever the items array changes.
  // This replaces the 30s polling interval — the cache stays in sync
  // with server data through SET_ITEMS dispatches (loadItems, catch-up sync,
  // refreshOpenTabItems, refetchItems) and local mutations (create/rename/delete
  // already call the individual mutation hooks in useItemOperations).
  const prevItemsLenRef = useRef(0);
  const prevItemsRef = useRef(items);
  useEffect(() => {
    // Skip the initial render (cache is populated by the refresh() call above)
    if (!wikiLinkCache.isReady()) return;
    // Only rebuild when items actually changed (length or reference)
    if (items === prevItemsRef.current) return;
    prevItemsRef.current = items;
    // Rebuild the cache from the current in-memory items — no server call needed
    wikiLinkCache.rebuildFromItems(items);
  }, [items]);

  const searchItemTitles = useCallback(async (query: string) => {
    if (!query.trim()) return [];
    const { data } = await apiQuery({
      table: 'items',
      select: 'id, title, type',
      filters: { user_id: userId, deleted_at: null, 'title__ilike': `%${query.trim()}%` },
      order: { column: 'updated_at', ascending: false },
      limit: 10,
    });
    return (data || []) as {id: string; title: string; type: string}[];
  }, [userId]);

  const findItemByTitle = useCallback(async (title: string) => {
    // Try client-side cache first
    const cachedId = wikiLinkCache.getItemId(title);
    if (cachedId) {
      // Verify it still exists and get type
      const localItem = items.find(i => i.id === cachedId && !i.deletedAt);
      if (localItem) {
        return { id: localItem.id, title: localItem.title, type: localItem.type };
      }
    }
    // Fallback to server query
    const { data } = await apiQuery({
      table: 'items',
      select: 'id, title, type',
      filters: { user_id: userId, deleted_at: null, 'title__ilike': title.trim() },
      order: { column: 'updated_at', ascending: false },
      limit: 1,
    });
    return data && data.length > 0 ? data[0] as {id: string; title: string; type: string} : null;
  }, [userId, items]);

  const validateWikiLinkFn = useCallback((pageName: string): boolean => {
    if (!wikiLinkCache.isReady()) return true; // Assume valid until cache loads
    return wikiLinkCache.validate(pageName);
  }, []);

  const updateWikiLinksOnRename = useCallback(async (oldTitle: string, newTitle: string) => {
    if (!oldTitle || !newTitle || oldTitle.trim() === newTitle.trim()) return;

    // Update the cache immediately
    const itemId = wikiLinkCache.getItemId(oldTitle);
    if (itemId) {
      wikiLinkCache.onItemRenamed(oldTitle, newTitle, itemId);
    }

    // Find all items containing [[oldTitle]] in their content
    const escapedTitle = oldTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const { data: affectedItems } = await apiQuery({
      table: 'items',
      select: 'id, content',
      filters: { user_id: userId, deleted_at: null, 'content__ilike': `%[[${oldTitle}]]%` },
    });

    if (!affectedItems || affectedItems.length === 0) return;

    // Update each item's content
    const updates = affectedItems.map(async (item: any) => {
      const updatedContent = item.content.replace(
        new RegExp(`\\[\\[${escapedTitle}\\]\\]`, 'g'),
        `[[${newTitle}]]`
      );
      await apiQuery({
        action: 'update',
        table: 'items',
        data: { content: updatedContent, updated_at: new Date().toISOString() },
        filters: { id: item.id },
      });

      // Update local state if item is loaded
      const localItem = items.find(i => i.id === item.id);
      if (localItem) {
        dispatch({ type: 'UPDATE_ITEM', payload: { ...localItem, content: updatedContent } });
      }
    });

    await Promise.all(updates);
    if (affectedItems.length > 0) {
      const { toast } = await import('sonner');
      toast.success(`Updated ${affectedItems.length} backlink${affectedItems.length > 1 ? 's' : ''}`);
    }
  }, [userId, items, dispatch]);

  return {
    searchItemTitles,
    findItemByTitle,
    validateWikiLinkFn,
    updateWikiLinksOnRename,
  };
}
