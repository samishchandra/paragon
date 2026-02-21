/**
 * useSortAndNavigation — Sort preferences, item navigation, pagination, and data refresh.
 *
 * Owns:
 *   - setSortOrder (set sort + persist to Supabase per view)
 *   - setSortDirection (set direction + persist to Supabase per view)
 *   - selectNextItem / selectPreviousItem (keyboard navigation through visible items)
 *   - loadMore (paginated loading of next page)
 *   - refetchItems (reload items + sidebar counts)
 *   - refreshAllData (reload everything: items, counts, tabs, tags, lists)
 *   - loadTestData / loadLargeTestData / clearAllData (stubs)
 */
import { useCallback } from 'react';
import { apiQuery } from '@/lib/db';
import { toast } from 'sonner';
import type { Item, FilterType, SortOrder } from '@/types';
import { fetchItems, searchItems, fetchTags, fetchLists } from '@/lib/queries';

export interface SortAndNavigationDeps {
  dispatch: React.Dispatch<any>;
  userId: string;
  computeViewKey: () => string;
  getVisibleItems: () => Item[];
  loadItems: () => void;
  refreshCounts: () => void;
  refreshOpenTabItems: () => Promise<void>;
  /** State fields */
  sortOrder: SortOrder;
  sortDirection: 'asc' | 'desc';
  viewSortPrefs: Record<string, any>;
  selectedItemId: string | null;
  hasMore: boolean;
  isLoadingMore: boolean;
  offset: number;
  activeFilter: FilterType;
  searchQuery: string;
}

export function useSortAndNavigation(deps: SortAndNavigationDeps) {
  const {
    dispatch,
    userId,
    computeViewKey,
    getVisibleItems,
    loadItems,
    refreshCounts,
    refreshOpenTabItems,
    sortOrder,
    sortDirection,
    viewSortPrefs,
    selectedItemId,
    hasMore,
    isLoadingMore,
    offset,
    activeFilter,
    searchQuery,
  } = deps;

  const setSortOrder = useCallback((newSortOrder: SortOrder) => {
    dispatch({ type: 'SET_SORT_ORDER', payload: newSortOrder });
    const viewKey = computeViewKey();
    dispatch({ type: 'SET_VIEW_SORT_PREFS', payload: {
      ...viewSortPrefs,
      [viewKey]: { sortOrder: newSortOrder, sortDirection },
    }});
    apiQuery({ action: 'upsert', table: 'view_sort_preferences', data: {
      view_key: viewKey,
      sort_order: newSortOrder,
      sort_direction: sortDirection,
      user_id: userId,
    } });
  }, [computeViewKey, sortDirection, viewSortPrefs, userId]);

  const setSortDirection = useCallback((direction: 'asc' | 'desc') => {
    dispatch({ type: 'SET_SORT_DIRECTION', payload: direction });
    const viewKey = computeViewKey();
    dispatch({ type: 'SET_VIEW_SORT_PREFS', payload: {
      ...viewSortPrefs,
      [viewKey]: { sortOrder, sortDirection: direction },
    }});
    apiQuery({ action: 'upsert', table: 'view_sort_preferences', data: {
      view_key: viewKey,
      sort_order: sortOrder,
      sort_direction: direction,
      user_id: userId,
    } });
  }, [computeViewKey, sortOrder, viewSortPrefs, userId]);

  const selectNextItem = useCallback(() => {
    const visibleItems = getVisibleItems();
    if (visibleItems.length === 0) return;
    const currentIndex = selectedItemId
      ? visibleItems.findIndex((item) => item.id === selectedItemId)
      : -1;
    const nextIndex = currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0;
    dispatch({ type: 'SELECT_ITEM', payload: visibleItems[nextIndex].id });
  }, [getVisibleItems, selectedItemId]);

  const selectPreviousItem = useCallback(() => {
    const visibleItems = getVisibleItems();
    if (visibleItems.length === 0) return;
    const currentIndex = selectedItemId
      ? visibleItems.findIndex((item) => item.id === selectedItemId)
      : visibleItems.length;
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1;
    dispatch({ type: 'SELECT_ITEM', payload: visibleItems[prevIndex].id });
  }, [getVisibleItems, selectedItemId]);

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return;

    dispatch({ type: 'SET_LOADING_MORE', payload: true });

    try {
      let result;
      if (searchQuery.length > 0) {
        result = await searchItems(searchQuery, userId, offset);
      } else {
        result = await fetchItems(activeFilter, sortOrder, sortDirection, userId, offset);
      }

      dispatch({
        type: 'SET_ITEMS',
        payload: {
          items: result.items,
          total: result.total,
          hasMore: result.hasMore,
          append: true,
        },
      });
    } catch (error) {
      console.error('Failed to load more items:', error);
      toast.error('Failed to load more items');
    } finally {
      dispatch({ type: 'SET_LOADING_MORE', payload: false });
    }
  }, [hasMore, isLoadingMore, offset, activeFilter, sortOrder, sortDirection, searchQuery]);

  const refetchItems = useCallback(() => {
    loadItems();
    refreshCounts();
  }, [loadItems, refreshCounts]);

  const refreshAllData = useCallback(() => {
    loadItems();
    refreshCounts();
    refreshOpenTabItems();
    fetchTags(userId).then(tags => dispatch({ type: 'SET_TAGS', payload: tags })).catch(() => {});
    fetchLists(userId).then(lists => dispatch({ type: 'SET_LISTS', payload: lists })).catch(() => {});
  }, [loadItems, refreshCounts, refreshOpenTabItems, userId]);

  const loadTestData = useCallback(() => {
    toast.info('Test data loading is not available');
  }, []);

  const loadLargeTestData = useCallback(() => {
    toast.info('Large test data loading is not available');
  }, []);

  const clearAllData = useCallback(() => {
    toast.info('Clear all data is not available');
  }, []);

  return {
    setSortOrder,
    setSortDirection,
    selectNextItem,
    selectPreviousItem,
    loadMore,
    refetchItems,
    refreshAllData,
    loadTestData,
    loadLargeTestData,
    clearAllData,
  };
}
