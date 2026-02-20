/**
 * useDataFetching — Data loading, view-cache, and refresh logic.
 *
 * Owns:
 *   - loadItems (fetch/search with merge logic preserving local edits)
 *   - refreshOpenTabItems (multi-device sync for open tabs)
 *   - View-level items cache (stale-while-revalidate on filter change)
 *   - Filter-change cache restore effect
 *   - Load-on-filter/sort/search-change effect
 *   - Metadata loading (tags, lists, settings) on mount
 *   - Recent items fetch (deferred on mount, immediate on change)
 */
import { useCallback, useRef, useEffect } from 'react';
import { apiQuery } from '@/lib/apiClient';
import type { Item, FilterType, SortOrder } from '@/types';
import { fetchItems, searchItems, fetchTags, fetchLists, fetchRecentItemsByIds, dbRowToItem } from '@/lib/queries';
import {
  getCachedItems,
  getCachedTags,
  getCachedLists,
  putCachedItems,
  putCachedTags,
  putCachedLists,
  putCachedItem,
  getCachedUserSettings,
  putCachedUserSettings,
  setLastSyncTimestamp,
} from '@/lib/offlineStore';

export interface DataFetchingDeps {
  dispatch: React.Dispatch<any>;
  userId: string;
  /** Current active filter from state */
  activeFilter: FilterType;
  /** Current sort order from state */
  sortOrder: SortOrder;
  /** Current sort direction from state */
  sortDirection: 'asc' | 'desc';
  /** Current search query from state */
  searchQuery: string;
  /** Current selected item id from state */
  selectedItemId: string | null;
  /** Current open tab ids from state */
  openTabIds: string[];
  /** Current recent item ids from state */
  recentItemIds: string[];
  /** Ref to current items array (avoids stale closures) */
  itemsRef: React.MutableRefObject<Item[]>;
  /** Ref to injected item ids set */
  injectedItemIdsRef: React.MutableRefObject<Set<string>>;
  /** Ref to pending optimistic updates */
  pendingUpdatesRef: React.MutableRefObject<Set<string>>;
  /** Ref to latest unsaved item data (from debounced saves) */
  latestItemData: React.MutableRefObject<Map<string, any>>;
  /** Set the isFetching loading flag */
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  /** Set the lastSyncedAt timestamp */
  setLastSyncedAt: React.Dispatch<React.SetStateAction<Date | null>>;
  /** Set recent items data */
  setRecentItemsData: React.Dispatch<React.SetStateAction<Item[]>>;
  /** Apply user settings from server */
  applySettingsFromServer: (data: any) => void;
  /** isLoadingRef — shared with localStorage persistence effects */
  isLoadingRef: React.MutableRefObject<boolean>;
}

export function useDataFetching(deps: DataFetchingDeps) {
  const {
    dispatch,
    userId,
    activeFilter,
    sortOrder,
    sortDirection,
    searchQuery,
    selectedItemId,
    openTabIds,
    recentItemIds,
    itemsRef,
    injectedItemIdsRef,
    pendingUpdatesRef,
    latestItemData,
    setIsFetching,
    setLastSyncedAt,
    setRecentItemsData,
    applySettingsFromServer,
    isLoadingRef,
  } = deps;

  // ── Internal refs ──────────────────────────────────────────────────────
  const prevFilterRef = useRef<FilterType | null>(null);
  const fetchVersionRef = useRef(0);
  const prevActiveFilterRef = useRef<string | null>(null);
  const recentItemsMountedRef = useRef(false);

  // View-level items cache: stale-while-revalidate pattern.
  const viewItemsCacheRef = useRef<Map<string, { items: Item[]; total: number; hasMore: boolean }>>(new Map());

  /** Compute a stable cache key for a filter */
  const getFilterCacheKey = useCallback((filter: FilterType): string => {
    if (filter.type === 'tag') return `tag-${(filter as any).tagId}`;
    if (filter.type === 'list') return `list-${(filter as any).listId}`;
    return filter.type;
  }, []);

  // ── loadItems ──────────────────────────────────────────────────────────
  const loadItems = useCallback(async () => {
    const version = ++fetchVersionRef.current;
    setIsFetching(true);
    try {
      let result;
      if (searchQuery.length > 0) {
        result = await searchItems(searchQuery, userId);
      } else {
        result = await fetchItems(activeFilter, sortOrder, sortDirection, userId);
      }

      // Only apply if this is still the latest fetch
      if (version !== fetchVersionRef.current) return;

      const filterChanged = prevFilterRef.current !== null &&
        JSON.stringify(prevFilterRef.current) !== JSON.stringify(activeFilter);
      prevFilterRef.current = activeFilter;

      if (filterChanged) {
        dispatch({
          type: 'SET_ITEMS',
          payload: { items: result.items, total: result.total, hasMore: result.hasMore },
        });
      } else {
        // Merge: preserve local edits for items with pending updates or debounced saves.
        const mergedItems = result.items.map(serverItem => {
          if (pendingUpdatesRef.current.has(serverItem.id)) {
            const localItem = itemsRef.current.find(i => i.id === serverItem.id);
            if (localItem) return localItem;
          }
          if (latestItemData.current.has(serverItem.id)) {
            const localItem = itemsRef.current.find(i => i.id === serverItem.id);
            if (localItem) return localItem;
          }
          return serverItem;
        });

        const serverIds = new Set(result.items.map(i => i.id));
        const now = Date.now();
        const currentItems = itemsRef.current;
        const localOnlyItems = currentItems.filter(i => {
          if (serverIds.has(i.id) || i.deletedAt) return false;
          const createdAt = i.createdAt ? new Date(i.createdAt).getTime() : 0;
          return !isNaN(createdAt) && (now - createdAt) < 30000;
        });

        // Also preserve injected items (fetched on-demand) so they stay accessible via tabs
        const injectedItems = currentItems.filter(i =>
          injectedItemIdsRef.current.has(i.id) && !serverIds.has(i.id)
        );

        dispatch({
          type: 'SET_ITEMS',
          payload: {
            items: [...injectedItems, ...localOnlyItems, ...mergedItems],
            total: result.total + localOnlyItems.length + injectedItems.length,
            hasMore: result.hasMore,
          },
        });
      }

      // Update the view items cache
      const cacheKey = getFilterCacheKey(activeFilter);
      viewItemsCacheRef.current.set(cacheKey, {
        items: result.items,
        total: result.total,
        hasMore: result.hasMore,
      });

      dispatch({ type: 'SET_LOADING', payload: false });
      isLoadingRef.current = false;
      setLastSyncedAt(new Date());

      // Cache items to IndexedDB for offline-first
      if (result.items.length > 0) {
        putCachedItems(result.items).catch(() => {});
      }
    } catch (error) {
      console.error('Failed to fetch items:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      isLoadingRef.current = false;
    } finally {
      setIsFetching(false);
    }
  }, [activeFilter, sortOrder, sortDirection, searchQuery, selectedItemId, getFilterCacheKey]);

  // ── Filter-change cache restore ────────────────────────────────────────
  // On filter change, immediately serve from in-memory cache or IndexedDB cache
  // instead of showing an empty state (which causes a flash).
  useEffect(() => {
    const newKey = getFilterCacheKey(activeFilter);
    const oldKey = prevActiveFilterRef.current;
    prevActiveFilterRef.current = newKey;

    if (oldKey !== null && oldKey !== newKey) {
      const cached = viewItemsCacheRef.current.get(newKey);
      if (cached) {
        dispatch({
          type: 'SET_ITEMS',
          payload: { items: cached.items, total: cached.total, hasMore: cached.hasMore },
        });
      } else {
        // Instead of showing empty [], try to load from IndexedDB cache
        getCachedItems().then(cachedItems => {
          if (cachedItems.length > 0) {
            // Filter cached items by user and convert to app format
            const userItems = cachedItems
              .filter((item: any) => String(item.user_id) === String(userId))
              .filter((item: any) => !item.deleted_at)
              .map(dbRowToItem);
            if (userItems.length > 0) {
              dispatch({
                type: 'SET_ITEMS',
                payload: { items: userItems, total: userItems.length, hasMore: false },
              });
              return;
            }
          }
          // Fallback to empty if IndexedDB also has nothing
          dispatch({
            type: 'SET_ITEMS',
            payload: { items: [], total: 0, hasMore: false },
          });
        }).catch(() => {
          dispatch({
            type: 'SET_ITEMS',
            payload: { items: [], total: 0, hasMore: false },
          });
        });
      }
    }
  }, [activeFilter, getFilterCacheKey]);

  // ── Load items when filter/sort/search changes ─────────────────────────
  useEffect(() => {
    loadItems();
  }, [activeFilter, sortOrder, sortDirection, searchQuery]);

  // ── Load tags, lists, and user settings on mount (offline-first) ───────
  useEffect(() => {
    let cancelled = false;
    async function loadMetadata() {
      if (cancelled) return;

      // 1. Load from IndexedDB cache first (instant)
      try {
        const [cachedTags, cachedLists, cachedSettings] = await Promise.all([
          getCachedTags(),
          getCachedLists(),
          getCachedUserSettings(userId),
        ]);
        if (cancelled) return;
        const userTags = cachedTags.filter((t: any) => String(t.user_id) === String(userId));
        const userLists = cachedLists.filter((l: any) => String(l.user_id) === String(userId));
        if (userTags.length > 0) dispatch({ type: 'SET_TAGS', payload: userTags });
        if (userLists.length > 0) dispatch({ type: 'SET_LISTS', payload: userLists });
        if (cachedSettings) applySettingsFromServer(cachedSettings);
      } catch (e) {
        console.warn('[OfflineFirst] Failed to load cached metadata:', e);
      }

      // 2. Fetch from server if online
      if (!navigator.onLine) return;
      try {
        const [tags, lists, settingsResult] = await Promise.all([
          fetchTags(userId),
          fetchLists(userId),
          apiQuery({ table: 'user_settings', select: '*', filters: { user_id: userId }, limit: 1, single: true }),
        ]);
        if (cancelled) return;
        dispatch({ type: 'SET_TAGS', payload: tags });
        dispatch({ type: 'SET_LISTS', payload: lists });

        // Cache the fresh data
        putCachedTags(tags).catch(() => {});
        putCachedLists(lists).catch(() => {});

        const { data, error } = settingsResult;
        if (!error && data) {
          applySettingsFromServer(data);
          putCachedUserSettings(data).catch(() => {});
        }
        setLastSyncTimestamp(new Date().toISOString()).catch(() => {});
      } catch (err) {
        console.error('Failed to load tags/lists/settings from server:', err);
      }
    }
    loadMetadata();
    return () => { cancelled = true; };
  }, []);

  // ── Fetch recent items ─────────────────────────────────────────────────
  useEffect(() => {
    if (recentItemIds.length === 0) {
      setRecentItemsData([]);
      recentItemsMountedRef.current = true;
      return;
    }
    const doFetch = () => fetchRecentItemsByIds(recentItemIds.slice(0, 5), userId).then(setRecentItemsData).catch(() => {});
    if (!recentItemsMountedRef.current) {
      const id = typeof requestIdleCallback !== 'undefined'
        ? requestIdleCallback(() => doFetch(), { timeout: 3000 })
        : setTimeout(() => doFetch(), 200) as unknown as number;
      recentItemsMountedRef.current = true;
      return () => {
        if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(id);
        else clearTimeout(id);
      };
    }
    doFetch();
  }, [recentItemIds, userId]);

  // ── refreshOpenTabItems (multi-device sync) ────────────────────────────
  const refreshOpenTabItems = useCallback(async () => {
    if (openTabIds.length === 0) return;

    try {
      const { data, error } = await apiQuery({
        table: 'items',
        select: '*, item_tags(tag_id)',
        filters: { user_id: userId, 'id__in': openTabIds },
      });

      if (error || !data || data.length === 0) return;

      const serverItems: Item[] = [];
      for (const row of data) {
        if (pendingUpdatesRef.current.has(row.id)) continue;
        if (latestItemData.current.has(row.id)) continue;
        serverItems.push(dbRowToItem(row));
      }

      if (serverItems.length > 0) {
        dispatch({ type: 'REFRESH_TAB_ITEMS', payload: serverItems });
      }
    } catch (err) {
      console.error('Failed to refresh open tab items:', err);
    }
  }, [openTabIds, userId, dispatch]);

  return {
    loadItems,
    refreshOpenTabItems,
    getFilterCacheKey,
  };
}
