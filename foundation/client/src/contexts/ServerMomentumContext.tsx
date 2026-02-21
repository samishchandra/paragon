/**
 * ServerMomentumContext — Split-context architecture for reduced re-renders.
 *
 * Two internal contexts:
 * 1. MomentumStableContext — Holds all callback/operation references that are
 *    stabilized via useCallback (CRUD, tag/list ops, sort, navigation, wiki links).
 *    This context value rarely changes, so consumers that only need operations
 *    won't re-render when items/state change.
 *
 * 2. MomentumDataContext — Holds frequently-changing data: state, dispatch,
 *    selectedItem, sidebar counts, sync status, preferences, computed getters.
 *    Only consumers that read data will re-render when state changes.
 *
 * The public API remains unchanged:
 * - useMomentum() returns the full merged value (backward-compatible)
 * - useMomentumOps() returns only stable operations (new, for perf-sensitive components)
 * - useMomentumData() returns only data (new, for read-only components)
 */

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useProviderState } from '@/contexts/hooks/useProviderState';
import type { ServerMomentumContextValue } from '@/types/context';

// ─── Stable operations context (callbacks that rarely change) ──────────────

interface MomentumStableValue {
  userId: string;
  createTask: ServerMomentumContextValue['createTask'];
  createNote: ServerMomentumContextValue['createNote'];
  duplicateItem: ServerMomentumContextValue['duplicateItem'];
  updateItem: ServerMomentumContextValue['updateItem'];
  deleteItem: ServerMomentumContextValue['deleteItem'];
  softDeleteItem: ServerMomentumContextValue['softDeleteItem'];
  restoreItem: ServerMomentumContextValue['restoreItem'];
  permanentDeleteItem: ServerMomentumContextValue['permanentDeleteItem'];
  emptyTrash: ServerMomentumContextValue['emptyTrash'];
  getTrashItems: ServerMomentumContextValue['getTrashItems'];
  undoLastDelete: ServerMomentumContextValue['undoLastDelete'];
  selectItem: ServerMomentumContextValue['selectItem'];
  fetchAndSelectItem: ServerMomentumContextValue['fetchAndSelectItem'];
  togglePin: ServerMomentumContextValue['togglePin'];
  completeTask: ServerMomentumContextValue['completeTask'];
  uncompleteTask: ServerMomentumContextValue['uncompleteTask'];
  moveItem: ServerMomentumContextValue['moveItem'];
  reorderItems: ServerMomentumContextValue['reorderItems'];
  bulkAddTag: ServerMomentumContextValue['bulkAddTag'];
  bulkRemoveTag: ServerMomentumContextValue['bulkRemoveTag'];
  bulkDeleteItems: ServerMomentumContextValue['bulkDeleteItems'];
  bulkSetList: ServerMomentumContextValue['bulkSetList'];
  addTag: ServerMomentumContextValue['addTag'];
  updateTag: ServerMomentumContextValue['updateTag'];
  deleteTag: ServerMomentumContextValue['deleteTag'];
  mergeTags: ServerMomentumContextValue['mergeTags'];
  addList: ServerMomentumContextValue['addList'];
  updateList: ServerMomentumContextValue['updateList'];
  deleteList: ServerMomentumContextValue['deleteList'];
  reorderLists: ServerMomentumContextValue['reorderLists'];
  setItemList: ServerMomentumContextValue['setItemList'];
  removeItemFromList: ServerMomentumContextValue['removeItemFromList'];
  setSortOrder: ServerMomentumContextValue['setSortOrder'];
  setSortDirection: ServerMomentumContextValue['setSortDirection'];
  selectNextItem: ServerMomentumContextValue['selectNextItem'];
  selectPreviousItem: ServerMomentumContextValue['selectPreviousItem'];
  loadMore: ServerMomentumContextValue['loadMore'];
  refetchItems: ServerMomentumContextValue['refetchItems'];
  refreshData: ServerMomentumContextValue['refreshData'];
  loadTestData: ServerMomentumContextValue['loadTestData'];
  loadLargeTestData: ServerMomentumContextValue['loadLargeTestData'];
  clearAllData: ServerMomentumContextValue['clearAllData'];
  toggleSectionForView: ServerMomentumContextValue['toggleSectionForView'];
  addRecentItem: ServerMomentumContextValue['addRecentItem'];
  clearNewlyCreatedFlag: ServerMomentumContextValue['clearNewlyCreatedFlag'];
  setTasksEnabled: ServerMomentumContextValue['setTasksEnabled'];
  setEditorPreferences: ServerMomentumContextValue['setEditorPreferences'];
  retrySyncOffline: ServerMomentumContextValue['retrySyncOffline'];
  searchItemTitles: ServerMomentumContextValue['searchItemTitles'];
  findItemByTitle: ServerMomentumContextValue['findItemByTitle'];
  validateWikiLink: ServerMomentumContextValue['validateWikiLink'];
  updateWikiLinksOnRename: ServerMomentumContextValue['updateWikiLinksOnRename'];
}

// ─── Data context (changes when state/data changes) ────────────────────────

interface MomentumDataValue {
  state: ServerMomentumContextValue['state'];
  dispatch: ServerMomentumContextValue['dispatch'];
  selectedItem: ServerMomentumContextValue['selectedItem'];
  isNewlyCreatedItem: ServerMomentumContextValue['isNewlyCreatedItem'];
  sidebarCounts: ServerMomentumContextValue['sidebarCounts'];
  sidebarTagCounts: ServerMomentumContextValue['sidebarTagCounts'];
  sidebarListCounts: ServerMomentumContextValue['sidebarListCounts'];
  isFetching: ServerMomentumContextValue['isFetching'];
  isFetchingItem: ServerMomentumContextValue['isFetchingItem'];
  isSyncingCatchUp: ServerMomentumContextValue['isSyncingCatchUp'];
  lastSyncedAt: ServerMomentumContextValue['lastSyncedAt'];
  isOnline: ServerMomentumContextValue['isOnline'];
  pendingOfflineCount: ServerMomentumContextValue['pendingOfflineCount'];
  isSyncingOffline: ServerMomentumContextValue['isSyncingOffline'];
  autoReorderChecklist: ServerMomentumContextValue['autoReorderChecklist'];
  tasksEnabled: ServerMomentumContextValue['tasksEnabled'];
  editorPreferences: ServerMomentumContextValue['editorPreferences'];
  getListCounts: ServerMomentumContextValue['getListCounts'];
  getFilteredItems: ServerMomentumContextValue['getFilteredItems'];
  getItemsBySection: ServerMomentumContextValue['getItemsBySection'];
  getTagCounts: ServerMomentumContextValue['getTagCounts'];
  getTodoCounts: ServerMomentumContextValue['getTodoCounts'];
  getPinnedItems: ServerMomentumContextValue['getPinnedItems'];
  getRecentItems: ServerMomentumContextValue['getRecentItems'];
  getVisibleItems: ServerMomentumContextValue['getVisibleItems'];
  getViewKey: ServerMomentumContextValue['getViewKey'];
  isSectionCollapsedForView: ServerMomentumContextValue['isSectionCollapsedForView'];
}

const MomentumStableContext = createContext<MomentumStableValue | null>(null);
const MomentumDataContext = createContext<MomentumDataValue | null>(null);

// ─── Provider ──────────────────────────────────────────────────────────────

export function ServerMomentumProvider({ children, userId }: { children: ReactNode; userId: string }) {
  const ctx = useProviderState(userId);

  // Stable operations — only changes when callback references change
  // (which is rare since they use refs internally)
  const stableValue = useMemo<MomentumStableValue>(() => ({
    userId: ctx.userId,
    createTask: ctx.createTask,
    createNote: ctx.createNote,
    duplicateItem: ctx.duplicateItem,
    updateItem: ctx.updateItem,
    deleteItem: ctx.deleteItem,
    softDeleteItem: ctx.softDeleteItem,
    restoreItem: ctx.restoreItem,
    permanentDeleteItem: ctx.permanentDeleteItem,
    emptyTrash: ctx.emptyTrash,
    getTrashItems: ctx.getTrashItems,
    undoLastDelete: ctx.undoLastDelete,
    selectItem: ctx.selectItem,
    fetchAndSelectItem: ctx.fetchAndSelectItem,
    togglePin: ctx.togglePin,
    completeTask: ctx.completeTask,
    uncompleteTask: ctx.uncompleteTask,
    moveItem: ctx.moveItem,
    reorderItems: ctx.reorderItems,
    bulkAddTag: ctx.bulkAddTag,
    bulkRemoveTag: ctx.bulkRemoveTag,
    bulkDeleteItems: ctx.bulkDeleteItems,
    bulkSetList: ctx.bulkSetList,
    addTag: ctx.addTag,
    updateTag: ctx.updateTag,
    deleteTag: ctx.deleteTag,
    mergeTags: ctx.mergeTags,
    addList: ctx.addList,
    updateList: ctx.updateList,
    deleteList: ctx.deleteList,
    reorderLists: ctx.reorderLists,
    setItemList: ctx.setItemList,
    removeItemFromList: ctx.removeItemFromList,
    setSortOrder: ctx.setSortOrder,
    setSortDirection: ctx.setSortDirection,
    selectNextItem: ctx.selectNextItem,
    selectPreviousItem: ctx.selectPreviousItem,
    loadMore: ctx.loadMore,
    refetchItems: ctx.refetchItems,
    refreshData: ctx.refreshData,
    loadTestData: ctx.loadTestData,
    loadLargeTestData: ctx.loadLargeTestData,
    clearAllData: ctx.clearAllData,
    toggleSectionForView: ctx.toggleSectionForView,
    addRecentItem: ctx.addRecentItem,
    clearNewlyCreatedFlag: ctx.clearNewlyCreatedFlag,
    setTasksEnabled: ctx.setTasksEnabled,
    setEditorPreferences: ctx.setEditorPreferences,
    retrySyncOffline: ctx.retrySyncOffline,
    searchItemTitles: ctx.searchItemTitles,
    findItemByTitle: ctx.findItemByTitle,
    validateWikiLink: ctx.validateWikiLink,
    updateWikiLinksOnRename: ctx.updateWikiLinksOnRename,
  }), [
    ctx.userId,
    ctx.createTask, ctx.createNote, ctx.duplicateItem, ctx.updateItem, ctx.deleteItem,
    ctx.softDeleteItem, ctx.restoreItem, ctx.permanentDeleteItem, ctx.emptyTrash,
    ctx.getTrashItems, ctx.undoLastDelete, ctx.selectItem, ctx.fetchAndSelectItem,
    ctx.togglePin, ctx.completeTask, ctx.uncompleteTask, ctx.moveItem, ctx.reorderItems,
    ctx.bulkAddTag, ctx.bulkRemoveTag, ctx.bulkDeleteItems, ctx.bulkSetList,
    ctx.addTag, ctx.updateTag, ctx.deleteTag, ctx.mergeTags,
    ctx.addList, ctx.updateList, ctx.deleteList, ctx.reorderLists,
    ctx.setItemList, ctx.removeItemFromList,
    ctx.setSortOrder, ctx.setSortDirection, ctx.selectNextItem, ctx.selectPreviousItem,
    ctx.loadMore, ctx.refetchItems, ctx.refreshData,
    ctx.loadTestData, ctx.loadLargeTestData, ctx.clearAllData,
    ctx.toggleSectionForView, ctx.addRecentItem, ctx.clearNewlyCreatedFlag,
    ctx.setTasksEnabled, ctx.setEditorPreferences, ctx.retrySyncOffline,
    ctx.searchItemTitles, ctx.findItemByTitle, ctx.validateWikiLink, ctx.updateWikiLinksOnRename,
  ]);

  // Data — changes when state, sidebar counts, or sync status change
  const dataValue = useMemo<MomentumDataValue>(() => ({
    state: ctx.state,
    dispatch: ctx.dispatch,
    selectedItem: ctx.selectedItem,
    isNewlyCreatedItem: ctx.isNewlyCreatedItem,
    sidebarCounts: ctx.sidebarCounts,
    sidebarTagCounts: ctx.sidebarTagCounts,
    sidebarListCounts: ctx.sidebarListCounts,
    isFetching: ctx.isFetching,
    isFetchingItem: ctx.isFetchingItem,
    isSyncingCatchUp: ctx.isSyncingCatchUp,
    lastSyncedAt: ctx.lastSyncedAt,
    isOnline: ctx.isOnline,
    pendingOfflineCount: ctx.pendingOfflineCount,
    isSyncingOffline: ctx.isSyncingOffline,
    autoReorderChecklist: ctx.autoReorderChecklist,
    tasksEnabled: ctx.tasksEnabled,
    editorPreferences: ctx.editorPreferences,
    getListCounts: ctx.getListCounts,
    getFilteredItems: ctx.getFilteredItems,
    getItemsBySection: ctx.getItemsBySection,
    getTagCounts: ctx.getTagCounts,
    getTodoCounts: ctx.getTodoCounts,
    getPinnedItems: ctx.getPinnedItems,
    getRecentItems: ctx.getRecentItems,
    getVisibleItems: ctx.getVisibleItems,
    getViewKey: ctx.getViewKey,
    isSectionCollapsedForView: ctx.isSectionCollapsedForView,
  }), [
    ctx.state, ctx.dispatch, ctx.selectedItem, ctx.isNewlyCreatedItem,
    ctx.sidebarCounts, ctx.sidebarTagCounts, ctx.sidebarListCounts,
    ctx.isFetching, ctx.isFetchingItem, ctx.isSyncingCatchUp,
    ctx.lastSyncedAt, ctx.isOnline, ctx.pendingOfflineCount, ctx.isSyncingOffline,
    ctx.autoReorderChecklist, ctx.tasksEnabled, ctx.editorPreferences,
    ctx.getListCounts, ctx.getFilteredItems, ctx.getItemsBySection,
    ctx.getTagCounts, ctx.getTodoCounts, ctx.getPinnedItems, ctx.getRecentItems,
    ctx.getVisibleItems, ctx.getViewKey, ctx.isSectionCollapsedForView,
  ]);

  return (
    <MomentumStableContext.Provider value={stableValue}>
      <MomentumDataContext.Provider value={dataValue}>
        {children}
      </MomentumDataContext.Provider>
    </MomentumStableContext.Provider>
  );
}

// ─── Consumer hooks ────────────────────────────────────────────────────────

/**
 * Use only stable operation callbacks. Components using this hook
 * will NOT re-render when items/state change.
 */
export function useMomentumOps(): MomentumStableValue {
  const ctx = useContext(MomentumStableContext);
  if (!ctx) throw new Error('useMomentumOps must be used within ServerMomentumProvider');
  return ctx;
}

/**
 * Use only data/state. Components using this hook will re-render
 * when state changes but won't be affected by operation reference changes.
 */
export function useMomentumData(): MomentumDataValue {
  const ctx = useContext(MomentumDataContext);
  if (!ctx) throw new Error('useMomentumData must be used within ServerMomentumProvider');
  return ctx;
}

/**
 * Full backward-compatible hook — merges both contexts.
 * Components using this will re-render on any change.
 * Prefer useMomentumOps() or useMomentumData() for better performance.
 */
export function useServerMomentum(): ServerMomentumContextValue {
  const ops = useContext(MomentumStableContext);
  const data = useContext(MomentumDataContext);
  if (!ops || !data) {
    throw new Error('useServerMomentum must be used within a ServerMomentumProvider');
  }
  // Merge both contexts into the full value
  return { ...ops, ...data } as ServerMomentumContextValue;
}

// Re-export as useMomentum for compatibility
export { useServerMomentum as useMomentum };
