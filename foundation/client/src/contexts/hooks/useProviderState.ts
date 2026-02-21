/**
 * useProviderState — Orchestrator hook that wires all extracted hooks together.
 *
 * This hook owns:
 *   - The useReducer call (state + dispatch)
 *   - All ref bridges between hooks
 *   - The call order of every extracted hook
 *   - The final contextValue useMemo assembly
 *
 * The ServerMomentumProvider becomes a pure render wrapper that calls this hook
 * and passes the result to the context provider.
 */
import { useReducer, useMemo, useRef } from 'react';
import { useOnlineStatus } from './useOnlineStatus';
import { usePreferences } from './usePreferences';
import { useSyncStatus } from './useSyncStatus';
import { useSidebarData } from './useSidebarData';
import { useItemOperations } from './useItemOperations';
import { useVisibilitySync } from './useVisibilitySync';
import { useTagListOperations } from './useTagListOperations';
import { useDataFetching } from './useDataFetching';
import { useLocalBackup } from './useLocalBackup';
import { useLocalStoragePersistence } from './useLocalStoragePersistence';
import { useComputedData } from './useComputedData';
import { useWikiLinks } from './useWikiLinks';
import { useSortAndNavigation } from './useSortAndNavigation';
import { useSettingsLoader } from './useSettingsLoader';
import { useUICallbacks } from './useUICallbacks';
import { reducer, initialState } from '@/contexts/reducers';
import type { Item } from '@/types';
import type { ServerMomentumContextValue } from '@/types/context';

export function useProviderState(userId: string): ServerMomentumContextValue {
  const [state, dispatch] = useReducer(reducer, initialState);
  const undoStackRef = useRef<{ item: Item; timestamp: number }[]>([]);

  // ── LocalStorage persistence ──
  const { isLoadingRef } = useLocalStoragePersistence({
    dispatch,
    sortOrder: state.sortOrder,
    sortDirection: state.sortDirection,
    collapsedSectionsPerView: state.collapsedSectionsPerView,
    recentItemIds: state.recentItemIds,
    activeFilter: state.activeFilter,
    leftPanelCollapsed: state.leftPanelCollapsed,
    rightPanelCollapsed: state.rightPanelCollapsed,
    openTabIds: state.openTabIds,
    selectedItemId: state.selectedItemId,
  });

  // ── Sync / fetching indicators ──
  const {
    isFetching, setIsFetching,
    isFetchingItem, setIsFetchingItem,
    isSyncingCatchUp, setIsSyncingCatchUp,
    lastSyncedAt, setLastSyncedAt,
  } = useSyncStatus();

  // ── Sidebar data ──
  const {
    sidebarCounts, setSidebarCounts,
    sidebarTagCounts, setSidebarTagCounts,
    sidebarListCounts, setSidebarListCounts,
    pinnedItems, setPinnedItems,
    recentItemsData, setRecentItemsData,
    refreshCounts,
  } = useSidebarData(userId);

  // ── Ref bridges (keep refs in sync with latest state) ──
  const pendingUpdatesRef = useRef<Set<string>>(new Set());
  const itemsRef = useRef(state.items);
  itemsRef.current = state.items;
  const injectedItemIdsRef = useRef(state.injectedItemIds);
  injectedItemIdsRef.current = state.injectedItemIds;
  const tagsRef = useRef(state.tags);
  tagsRef.current = state.tags;
  const selectedItemIdRef = useRef(state.selectedItemId);
  selectedItemIdRef.current = state.selectedItemId;

  // ── User settings ──
  const {
    autoReorderChecklist,
    tasksEnabled,
    setTasksEnabled,
    editorPreferences,
    setEditorPreferences,
    applySettingsFromServer,
  } = usePreferences();

  const pendingTagsRef = useRef<Map<string, import('@/types').Tag>>(new Map());

  // ── Online / offline status + offline queue ──
  const refreshCountsRef = useRef<() => void>(() => {});
  const {
    isOnline,
    pendingOfflineCount,
    isSyncingOffline,
    isOnlineRef,
    flushOfflineQueue,
    enqueueOffline,
  } = useOnlineStatus(refreshCountsRef);

  // ── Item CRUD operations ──
  const {
    getTopSortOrder,
    flushPendingSave,
    latestItemData,
    debouncedSaveTimers,
    createTask,
    createNote,
    duplicateItem,
    updateItem,
    softDeleteItem,
    deleteItem,
    restoreItem,
    permanentDeleteItem,
    emptyTrash,
    getTrashItems,
    undoLastDelete,
    selectItem,
    fetchAndSelectItem,
    togglePin,
    completeTask,
    uncompleteTask,
    moveItem,
    reorderItems,
    bulkAddTag,
    bulkRemoveTag,
    bulkDeleteItems,
    bulkSetList,
  } = useItemOperations({
    dispatch,
    userId,
    itemsRef,
    tagsRef,
    selectedItemIdRef,
    pendingUpdatesRef,
    pendingTagsRef,
    undoStackRef,
    injectedItemIdsRef,
    isOnlineRef,
    enqueueOffline,
    refreshCounts,
    setSidebarCounts,
    setIsFetchingItem,
  });

  // ── Data fetching ──
  const {
    loadItems,
    refreshOpenTabItems,
    getFilterCacheKey,
  } = useDataFetching({
    dispatch,
    userId,
    activeFilter: state.activeFilter,
    sortOrder: state.sortOrder,
    sortDirection: state.sortDirection,
    searchQuery: state.searchQuery,
    selectedItemId: state.selectedItemId,
    openTabIds: state.openTabIds,
    recentItemIds: state.recentItemIds,
    itemsRef,
    injectedItemIdsRef,
    pendingUpdatesRef,
    latestItemData,
    setIsFetching,
    setLastSyncedAt,
    setRecentItemsData,
    applySettingsFromServer,
    isLoadingRef,
  });

  // ── Auto-backup initialization ──
  useLocalBackup(userId);

  // ── Visibility & focus-based catch-up sync ──
  useVisibilitySync({
    loadItems,
    refreshCounts,
    refreshOpenTabItems,
    applySettingsFromServer,
    dispatch,
    userId,
    setIsSyncingCatchUp,
  });

  // ── View sort preferences loading ──
  useSettingsLoader({
    dispatch,
    userId,
    activeFilter: state.activeFilter,
    viewSortPrefs: state.viewSortPrefs,
  });

  // ── Computed getters ──
  const {
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
  } = useComputedData({
    items: state.items,
    activeFilter: state.activeFilter,
    injectedItemIds: state.injectedItemIds,
    recentItemIds: state.recentItemIds,
    pinnedItems,
    recentItemsData,
  });

  // ── Sort, navigation, pagination, and refresh ──
  const {
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
  } = useSortAndNavigation({
    dispatch,
    userId,
    computeViewKey,
    getVisibleItems,
    loadItems,
    refreshCounts,
    refreshOpenTabItems,
    sortOrder: state.sortOrder,
    sortDirection: state.sortDirection,
    viewSortPrefs: state.viewSortPrefs,
    selectedItemId: state.selectedItemId,
    hasMore: state.hasMore,
    isLoadingMore: state.isLoadingMore,
    offset: state.offset,
    activeFilter: state.activeFilter,
    searchQuery: state.searchQuery,
  });

  // ── Tag & list operations ──
  const {
    addTag, updateTag, deleteTag, mergeTags,
    addList, updateList, deleteList, reorderLists,
    setItemList, removeItemFromList,
  } = useTagListOperations({
    dispatch,
    userId,
    isOnlineRef,
    enqueueOffline,
    updateItem,
    refreshCounts,
    items: state.items,
  });

  // ── UI callbacks & guard effects ──
  const {
    toggleSectionForView,
    isSectionCollapsedForView,
    addRecentItem,
    selectedItem,
    clearNewlyCreatedFlag,
  } = useUICallbacks({
    dispatch,
    state,
    pinnedItems,
    tasksEnabled,
    sidebarCounts,
  });

  // ── Wiki Link / Backlink functions ──
  const {
    searchItemTitles,
    findItemByTitle,
    validateWikiLinkFn,
    updateWikiLinksOnRename,
  } = useWikiLinks({
    userId,
    items: state.items,
    dispatch,
  });

  // Wire up refreshCountsRef after refreshCounts is available
  refreshCountsRef.current = refreshCounts;

  // ── Assemble the context value ──
  const contextValue = useMemo<ServerMomentumContextValue>(
    () => ({
      userId,
      state,
      dispatch,
      createTask,
      createNote,
      duplicateItem,
      updateItem,
      deleteItem,
      softDeleteItem,
      restoreItem,
      permanentDeleteItem,
      emptyTrash,
      getTrashItems,
      bulkAddTag,
      bulkRemoveTag,
      bulkDeleteItems,
      bulkSetList,
      selectItem,
      fetchAndSelectItem,
      togglePin,
      completeTask,
      uncompleteTask,
      moveItem,
      reorderItems,
      setSortOrder,
      setSortDirection,
      addTag,
      updateTag,
      deleteTag,
      mergeTags,
      addList,
      updateList,
      deleteList,
      reorderLists,
      setItemList,
      removeItemFromList,
      getListCounts,
      getFilteredItems,
      getItemsBySection,
      getTagCounts,
      getTodoCounts,
      getPinnedItems,
      getRecentItems,
      toggleSectionForView,
      isSectionCollapsedForView,
      getViewKey,
      addRecentItem,
      loadTestData,
      loadLargeTestData,
      clearAllData,
      selectedItem,
      isNewlyCreatedItem: state.isNewlyCreatedItem,
      clearNewlyCreatedFlag,
      undoLastDelete,
      selectNextItem,
      selectPreviousItem,
      getVisibleItems,
      loadMore,
      refetchItems,
      refreshData: refreshAllData,
      sidebarCounts,
      sidebarTagCounts,
      sidebarListCounts,
      isFetching,
      isFetchingItem,
      isSyncingCatchUp,
      lastSyncedAt,
      isOnline,
      pendingOfflineCount,
      isSyncingOffline,
      retrySyncOffline: flushOfflineQueue,
      autoReorderChecklist,
      tasksEnabled,
      setTasksEnabled,
      editorPreferences,
      setEditorPreferences,
      searchItemTitles,
      findItemByTitle,
      validateWikiLink: validateWikiLinkFn,
      updateWikiLinksOnRename,
    }),
    [
      userId, state, createTask, createNote, duplicateItem, updateItem, deleteItem,
      softDeleteItem, restoreItem, permanentDeleteItem, emptyTrash, getTrashItems,
      bulkAddTag, bulkRemoveTag, bulkDeleteItems, bulkSetList,
      selectItem, fetchAndSelectItem, togglePin, completeTask, uncompleteTask, moveItem, reorderItems,
      setSortOrder, setSortDirection, addTag, updateTag, deleteTag, mergeTags,
      addList, updateList, deleteList, reorderLists, setItemList, removeItemFromList,
      getListCounts, getFilteredItems, getItemsBySection, getTagCounts, getTodoCounts,
      getPinnedItems, getRecentItems, toggleSectionForView, isSectionCollapsedForView,
      getViewKey, addRecentItem, selectedItem, clearNewlyCreatedFlag, undoLastDelete,
      selectNextItem, selectPreviousItem, getVisibleItems, loadMore, refetchItems,
      sidebarCounts, sidebarTagCounts, sidebarListCounts, isFetching, isFetchingItem, isSyncingCatchUp,
      lastSyncedAt, isOnline, pendingOfflineCount, isSyncingOffline, flushOfflineQueue,
      autoReorderChecklist, tasksEnabled, setTasksEnabled, editorPreferences, setEditorPreferences,
      searchItemTitles, findItemByTitle, validateWikiLinkFn, updateWikiLinksOnRename,
    ]
  );

  return contextValue;
}
