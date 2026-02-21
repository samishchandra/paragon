/**
 * useComputedData — Computed getters derived from items state.
 *
 * Owns:
 *   - getListCounts (count of non-deleted items per list)
 *   - getFilteredItems (items filtered by active filter, excluding injected)
 *   - getItemsBySection (filtered items for a given section, sorted by order)
 *   - getTagCounts (count of non-deleted items per tag)
 *   - getTodoCounts (total/completed task counts)
 *   - getPinnedItems (pinned items from sidebar data or fallback)
 *   - getRecentItems (recent items from sidebar data or fallback)
 *   - getVisibleItems (filtered items sorted by order)
 *   - computeViewKey / getViewKey (stable cache key for current filter)
 */
import { useCallback } from 'react';
import type { Item, Task, FilterType, SectionType } from '@/types';

export interface ComputedDataDeps {
  items: Item[];
  activeFilter: FilterType;
  injectedItemIds: Set<string>;
  recentItemIds: string[];
  pinnedItems: Item[];
  recentItemsData: Item[];
}

export function useComputedData(deps: ComputedDataDeps) {
  const {
    items,
    activeFilter,
    injectedItemIds,
    recentItemIds,
    pinnedItems,
    recentItemsData,
  } = deps;

  const computeViewKey = useCallback(() => {
    const filter = activeFilter;
    if (filter.type === 'tag') return `tag-${(filter as any).tagId}`;
    if (filter.type === 'list') return `list-${(filter as any).listId}`;
    return filter.type;
  }, [activeFilter]);

  const getViewKey = computeViewKey;

  const getListCounts = useCallback(() => {
    const counts = new Map<string, number>();
    items.filter((item) => !item.deletedAt).forEach((item) => {
      if (item.listId) {
        counts.set(item.listId, (counts.get(item.listId) || 0) + 1);
      }
    });
    return counts;
  }, [items]);

  const getFilteredItems = useCallback(() => {
    return items.filter((item) => {
      // Always show deleted items in trash view
      if (item.deletedAt && activeFilter.type !== 'trash') return false;
      if (!item.deletedAt && activeFilter.type === 'trash') return true;
      // Exclude injected items (fetched on-demand from search/pinned) that
      // don't naturally belong to the current view's filter.
      if (injectedItemIds.has(item.id)) return false;
      return true;
    });
  }, [items, activeFilter.type, injectedItemIds]);

  const getItemsBySection = useCallback((section: SectionType) => {
    return getFilteredItems()
      .filter((item) => item.section === section)
      .sort((a, b) => a.order - b.order);
  }, [getFilteredItems]);

  const getTagCounts = useCallback(() => {
    const counts = new Map<string, number>();
    items.filter((item) => !item.deletedAt).forEach((item) => {
      item.tags.forEach((tagId) => {
        counts.set(tagId, (counts.get(tagId) || 0) + 1);
      });
    });
    return counts;
  }, [items]);

  const getTodoCounts = useCallback(() => {
    const tasks = items.filter((item) => item.type === 'task' && !item.deletedAt) as Task[];
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.isCompleted).length,
    };
  }, [items]);

  const getPinnedItems = useCallback(() => {
    if (pinnedItems.length > 0) return pinnedItems;
    return items.filter((item) => item.isPinned && !item.deletedAt);
  }, [pinnedItems, items]);

  const getRecentItems = useCallback(() => {
    if (recentItemsData.length > 0) return recentItemsData;
    // Fallback to items lookup when recentItemsData hasn't loaded yet
    return recentItemIds
      .map((id) => items.find((item) => item.id === id))
      .filter((item): item is Item => item !== undefined && !item.deletedAt);
  }, [recentItemsData, items, recentItemIds]);

  const getVisibleItems = useCallback((): Item[] => {
    return getFilteredItems().sort((a, b) => a.order - b.order);
  }, [getFilteredItems]);

  return {
    computeViewKey,
    getViewKey,
    getListCounts,
    getFilteredItems,
    getItemsBySection,
    getTagCounts,
    getTodoCounts,
    getPinnedItems,
    getRecentItems,
    getVisibleItems,
  };
}
