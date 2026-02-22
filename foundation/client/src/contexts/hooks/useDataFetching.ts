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
 *   - IndexedDB offline-first: load from local cache first, then sync from server
 */
import { useCallback, useRef, useEffect } from 'react';
import { supabase, apiQuery } from '@/lib/db';
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
  getItemsForUser,
  getTagsForUser,
  getListsForUser,
  hasCachedDataForUser,
  computeSidebarCountsLocally,
} from '@/lib/offlineStore';
import { formatError } from '@/lib/utils';

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
  /** Whether the client is online (optional — defaults to navigator.onLine) */
  isOnlineRef?: React.MutableRefObject<boolean>;
}

/** Default online ref that delegates to navigator.onLine */
const defaultOnlineRef = { get current() { return navigator.onLine; } };

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
    isOnlineRef = defaultOnlineRef,
  } = deps;

  // ── Internal refs ──────────────────────────────────────────────────────
  const prevFilterRef = useRef<FilterType | null>(null);
  const fetchVersionRef = useRef(0);
  const prevActiveFilterRef = useRef<string | null>(null);
  const recentItemsMountedRef = useRef(false);
  const offlineCacheLoadedRef = useRef(false);

  // View-level items cache: stale-while-revalidate pattern.
  const viewItemsCacheRef = useRef<Map<string, { items: Item[]; total: number; hasMore: boolean }>>(new Map());

  /** Compute a stable cache key for a filter */
  const getFilterCacheKey = useCallback((filter: FilterType): string => {
    if (filter.type === 'tag') return `tag-${(filter as any).tagId}`;
    if (filter.type === 'list') return `list-${(filter as any).listId}`;
    return filter.type;
  }, []);

  // ── Helper: apply client-side filtering to cached items ────────────────
  const filterItemsLocally = useCallback((items: Item[], filter: FilterType): Item[] => {
    switch (filter.type) {
      case 'all':
        return items.filter(i => !i.deletedAt && !(i.type === 'task' && (i as any).isCompleted));
      case 'tasks':
        return items.filter(i => i.type === 'task' && !i.deletedAt && !(i as any).isCompleted);
      case 'notes':
        return items.filter(i => i.type === 'note' && !i.deletedAt);
      case 'todo':
        // Can't fully replicate server-side has_uncompleted_todos check, show all non-deleted
        return items.filter(i => !i.deletedAt);
      case 'miscellaneous':
        return items.filter(i => !i.listId && !i.deletedAt && !(i.type === 'task' && (i as any).isCompleted));
      case 'list':
        return items.filter(i => i.listId === (filter as any).listId && !i.deletedAt);
      case 'tag':
        return items.filter(i => i.tags?.includes((filter as any).tagId) && !i.deletedAt);
      case 'pinned':
        return items.filter(i => i.isPinned && !i.deletedAt);
      case 'completed':
        return items.filter(i => i.type === 'task' && (i as any).isCompleted && !i.deletedAt);
      case 'trash':
        return items.filter(i => !!i.deletedAt);
      default:
        return items.filter(i => !i.deletedAt);
    }
  }, []);

  // ── Helper: sort items locally ─────────────────────────────────────────
  const sortItemsLocally = useCallback((items: Item[], order: SortOrder, direction: 'asc' | 'desc'): Item[] => {
    const sorted = [...items];
    sorted.sort((a, b) => {
      let aVal: any, bVal: any;
      if (order === 'modified') {
        aVal = a.updatedAt || '';
        bVal = b.updatedAt || '';
      } else if (order === 'dueDate') {
        aVal = (a as any).dueDate || '';
        bVal = (b as any).dueDate || '';
      } else {
        aVal = a.order || 0;
        bVal = b.order || 0;
      }
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, []);

  // ── Helper: get user items from IndexedDB and convert to domain objects ─
  const getCachedUserItems = useCallback(async (): Promise<Item[]> => {
    const rows = await getItemsForUser(userId);
    return rows.map(dbRowToItem);
  }, [userId]);

  // ── Load from IndexedDB cache on mount (offline-first) ────────────────
  useEffect(() => {
    async function loadFromCache() {
      try {
        const hasData = await hasCachedDataForUser(userId);
        if (!hasData) return;

        const cachedItems = await getCachedUserItems();
        if (cachedItems.length > 0) {
          // Apply local filtering and sorting
          const filtered = filterItemsLocally(cachedItems, activeFilter);
          const sorted = sortItemsLocally(filtered, sortOrder, sortDirection);

          dispatch({
            type: 'SET_ITEMS',
            payload: { items: sorted, total: sorted.length, hasMore: false },
          });
          dispatch({ type: 'SET_LOADING', payload: false });
          offlineCacheLoadedRef.current = true;
          console.log(`[OfflineFirst] Loaded ${sorted.length} items from IndexedDB cache`);
        }
      } catch (err) {
        console.warn('[OfflineFirst] Failed to load from IndexedDB cache:', err);
      }
    }
    loadFromCache();
  }, [userId]); // Only on mount

  // ── loadItems ──────────────────────────────────────────────────────────
  const loadItems = useCallback(async () => {
    const version = ++fetchVersionRef.current;
    setIsFetching(true);

    // If offline, serve from IndexedDB cache
    if (!isOnlineRef.current) {
      try {
        const cachedItems = await getCachedUserItems();
        if (version !== fetchVersionRef.current) return;

        let result: Item[];
        if (searchQuery.length > 0) {
          const q = searchQuery.toLowerCase();
          result = cachedItems.filter(i =>
            !i.deletedAt && (
              i.title.toLowerCase().includes(q) ||
              i.content.toLowerCase().includes(q)
            )
          );
        } else {
          result = filterItemsLocally(cachedItems, activeFilter);
        }
        const sorted = sortItemsLocally(result, sortOrder, sortDirection);

        dispatch({
          type: 'SET_ITEMS',
          payload: { items: sorted, total: sorted.length, hasMore: false },
        });
        dispatch({ type: 'SET_LOADING', payload: false });
        isLoadingRef.current = false;
      } catch (err) {
        console.error('[OfflineFirst] Failed to load from IndexedDB:', formatError(err));
        dispatch({ type: 'SET_LOADING', payload: false });
        isLoadingRef.current = false;
      } finally {
        setIsFetching(false);
      }
      return;
    }

    // Online: fetch from server
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
        const mergedItems = result.items.map((serverItem: any) => {
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

        const serverIds = new Set(result.items.map((i: any) => i.id));
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

      // Persist fetched items to IndexedDB for offline access
      if (result.items.length > 0) {
        putCachedItems(result.items).catch(err =>
          console.warn('[OfflineFirst] Failed to cache items to IndexedDB:', formatError(err))
        );
      }

      dispatch({ type: 'SET_LOADING', payload: false });
      isLoadingRef.current = false;
      setLastSyncedAt(new Date());
    } catch (error) {
      console.error('Failed to fetch items:', formatError(error));

      // On network error, fall back to IndexedDB cache
      if (version === fetchVersionRef.current) {
        try {
          const cachedItems = await getCachedUserItems();
          if (cachedItems.length > 0) {
            const filtered = filterItemsLocally(cachedItems, activeFilter);
            const sorted = sortItemsLocally(filtered, sortOrder, sortDirection);
            dispatch({
              type: 'SET_ITEMS',
              payload: { items: sorted, total: sorted.length, hasMore: false },
            });
            console.log('[OfflineFirst] Fell back to IndexedDB cache after network error');
          }
        } catch (cacheErr) {
          console.warn('[OfflineFirst] IndexedDB fallback also failed:', formatError(cacheErr));
        }
      }

      dispatch({ type: 'SET_LOADING', payload: false });
      isLoadingRef.current = false;
    } finally {
      setIsFetching(false);
    }
  }, [activeFilter, sortOrder, sortDirection, searchQuery, selectedItemId, getFilterCacheKey, filterItemsLocally, sortItemsLocally, getCachedUserItems]);

  // ── Filter-change cache restore ────────────────────────────────────────
  // On filter change, immediately serve from in-memory cache or IndexedDB
  // to eliminate the flash of empty state.
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
        // Instead of showing empty [], immediately load from IndexedDB
        getCachedUserItems().then(cachedItems => {
          // Only apply if filter hasn't changed again
          if (getFilterCacheKey(activeFilter) !== newKey) return;
          // Only apply if the view cache still doesn't have data for this key
          // (the server fetch may have already completed)
          if (viewItemsCacheRef.current.has(newKey)) return;

          const filtered = filterItemsLocally(cachedItems, activeFilter);
          const sorted = sortItemsLocally(filtered, sortOrder, sortDirection);
          if (sorted.length > 0) {
            dispatch({
              type: 'SET_ITEMS',
              payload: { items: sorted, total: sorted.length, hasMore: false },
            });
            console.log(`[OfflineFirst] Filter change: served ${sorted.length} items from IndexedDB`);
          } else {
            dispatch({
              type: 'SET_ITEMS',
              payload: { items: [], total: 0, hasMore: false },
            });
          }
        }).catch(() => {
          // Fallback to empty if IndexedDB fails
          dispatch({
            type: 'SET_ITEMS',
            payload: { items: [], total: 0, hasMore: false },
          });
        });
      }
    }
  }, [activeFilter, getFilterCacheKey, filterItemsLocally, sortItemsLocally, sortOrder, sortDirection, getCachedUserItems]);

  // ── Load items when filter/sort/search changes ─────────────────────────
  useEffect(() => {
    loadItems();
  }, [activeFilter, sortOrder, sortDirection, searchQuery]);

  // ── Load tags, lists, and user settings on mount (offline-first) ───────
  useEffect(() => {
    let cancelled = false;
    async function loadMetadata() {
      if (cancelled) return;

      // Load from IndexedDB cache first (instant)
      try {
        const [cachedTags, cachedLists, cachedSettings] = await Promise.all([
          getTagsForUser(userId),
          getListsForUser(userId),
          getCachedUserSettings(userId),
        ]);
        if (cancelled) return;
        if (cachedTags.length > 0) {
          dispatch({ type: 'SET_TAGS', payload: cachedTags });
          console.log(`[OfflineFirst] Loaded ${cachedTags.length} tags from IndexedDB`);
        }
        if (cachedLists.length > 0) {
          dispatch({ type: 'SET_LISTS', payload: cachedLists });
          console.log(`[OfflineFirst] Loaded ${cachedLists.length} lists from IndexedDB`);
        }
        if (cachedSettings) {
          applySettingsFromServer(cachedSettings);
          console.log('[OfflineFirst] Loaded settings from IndexedDB');
        }
      } catch (err) {
        console.warn('[OfflineFirst] Failed to load cached metadata:', formatError(err));
      }

      // If offline, stop here
      if (!isOnlineRef.current) return;

      // Then fetch from server (background update)
      try {
        const [tags, lists, settingsResult] = await Promise.all([
          fetchTags(userId),
          fetchLists(userId),
          apiQuery({ table: 'user_settings', select: '*', filters: { user_id: userId }, limit: 1, single: true }),
        ]);
        if (cancelled) return;
        dispatch({ type: 'SET_TAGS', payload: tags });
        dispatch({ type: 'SET_LISTS', payload: lists });
        const { data, error } = settingsResult;
        if (!error && data) {
          applySettingsFromServer(data);
        }

        // Persist to IndexedDB for offline access
        putCachedTags(tags).catch(err =>
          console.warn('[OfflineFirst] Failed to cache tags:', formatError(err))
        );
        putCachedLists(lists).catch(err =>
          console.warn('[OfflineFirst] Failed to cache lists:', formatError(err))
        );
        if (!error && data) {
          putCachedUserSettings(data).catch(err =>
            console.warn('[OfflineFirst] Failed to cache settings:', formatError(err))
          );
        }
        setLastSyncTimestamp(new Date().toISOString()).catch(() => {});
      } catch (err) {
        console.error('Failed to load tags/lists/settings from server:', formatError(err));
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

    const doFetch = async () => {
      // Try IndexedDB first for recent items when offline
      if (!isOnlineRef.current) {
        try {
          const cachedItems = await getCachedUserItems();
          const recentSet = new Set(recentItemIds.slice(0, 5));
          const recentItems = cachedItems.filter(i => recentSet.has(i.id) && !i.deletedAt);
          // Preserve order
          const ordered = recentItemIds.slice(0, 5)
            .map(id => recentItems.find(i => i.id === id))
            .filter((i): i is Item => i !== undefined);
          setRecentItemsData(ordered);
        } catch {
          // ignore
        }
        return;
      }

      try {
        const items = await fetchRecentItemsByIds(recentItemIds.slice(0, 5), userId);
        setRecentItemsData(items);
      } catch {
        // Fall back to IndexedDB
        try {
          const cachedItems = await getCachedUserItems();
          const recentSet = new Set(recentItemIds.slice(0, 5));
          const recentItems = cachedItems.filter(i => recentSet.has(i.id) && !i.deletedAt);
          const ordered = recentItemIds.slice(0, 5)
            .map(id => recentItems.find(i => i.id === id))
            .filter((i): i is Item => i !== undefined);
          setRecentItemsData(ordered);
        } catch {
          // ignore
        }
      }
    };

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
  }, [recentItemIds, userId, getCachedUserItems]);

  // ── refreshOpenTabItems (multi-device sync) ────────────────────────────
  const refreshOpenTabItems = useCallback(async () => {
    if (openTabIds.length === 0) return;

    // If offline, load from IndexedDB
    if (!isOnlineRef.current) {
      try {
        const cachedItems = await getCachedUserItems();
        const tabSet = new Set(openTabIds);
        const tabItems = cachedItems.filter(i => tabSet.has(i.id));
        if (tabItems.length > 0) {
          dispatch({ type: 'REFRESH_TAB_ITEMS', payload: tabItems });
        }
      } catch {
        // ignore
      }
      return;
    }

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
        // Cache refreshed tab items
        putCachedItems(serverItems).catch(() => {});
      }
    } catch (err) {
      console.error('Failed to refresh open tab items:', formatError(err));
    }
  }, [openTabIds, userId, dispatch, getCachedUserItems]);

  return {
    loadItems,
    refreshOpenTabItems,
    getFilterCacheKey,
  };
}
