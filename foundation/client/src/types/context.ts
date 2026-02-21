/**
 * ServerMomentumContextValue — the public API surface of the Momentum context.
 * Extracted to its own file so the provider is purely about wiring hooks together.
 */
import type {
  Item,
  Tag,
  List,
  SectionType,
  DisplaySectionType,
  SortOrder,
} from '@/types';
import type { State, Action } from '@/contexts/reducers';

export interface ServerMomentumContextValue {
  userId: string;
  state: State;
  dispatch: React.Dispatch<Action>;
  createTask: (listId?: string, tagIds?: string[]) => void;
  createNote: (listId?: string, title?: string, content?: string, tagNames?: string[]) => string;
  duplicateItem: (id: string) => void;
  updateItem: (item: Item) => void;
  deleteItem: (id: string) => void;
  softDeleteItem: (id: string) => void;
  restoreItem: (id: string) => void;
  permanentDeleteItem: (id: string) => void;
  emptyTrash: () => void;
  getTrashItems: () => Item[];
  bulkAddTag: (itemIds: string[], tagId: string) => void;
  bulkRemoveTag: (itemIds: string[], tagId: string) => void;
  bulkDeleteItems: (itemIds: string[]) => void;
  bulkSetList: (itemIds: string[], listId: string | null) => void;
  selectItem: (id: string | null) => void;
  fetchAndSelectItem: (id: string) => Promise<void>;
  togglePin: (id: string) => void;
  completeTask: (id: string) => void;
  uncompleteTask: (id: string) => void;
  moveItem: (itemId: string, section: SectionType, newOrder?: number) => void;
  reorderItems: (section: SectionType, itemIds: string[]) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  setSortDirection: (direction: 'asc' | 'desc') => void;
  addTag: (tag: Tag) => void;
  updateTag: (id: string, updates: Partial<Tag>) => void;
  deleteTag: (id: string) => void;
  mergeTags: (sourceTagId: string, targetTagId: string) => void;
  addList: (list: List) => void;
  updateList: (id: string, updates: Partial<List>) => void;
  deleteList: (id: string) => void;
  reorderLists: (lists: List[]) => Promise<void>;
  setItemList: (itemId: string, listId: string) => void;
  removeItemFromList: (itemId: string) => void;
  getListCounts: () => Map<string, number>;
  getFilteredItems: () => Item[];
  getItemsBySection: (section: SectionType) => Item[];
  getTagCounts: () => Map<string, number>;
  getTodoCounts: () => { total: number; completed: number };
  getPinnedItems: () => Item[];
  getRecentItems: () => Item[];
  toggleSectionForView: (viewKey: string, sectionId: SectionType | DisplaySectionType) => void;
  isSectionCollapsedForView: (viewKey: string, sectionId: SectionType | DisplaySectionType) => boolean;
  getViewKey: () => string;
  addRecentItem: (itemId: string) => void;
  loadTestData: () => void;
  loadLargeTestData: () => void;
  clearAllData: () => void;
  selectedItem: Item | null;
  isNewlyCreatedItem: boolean;
  clearNewlyCreatedFlag: () => void;
  undoLastDelete: () => void;
  selectNextItem: () => void;
  selectPreviousItem: () => void;
  getVisibleItems: () => Item[];
  loadMore: () => void;
  refetchItems: () => void;
  refreshData: () => void;
  sidebarCounts: { all: number; tasks: number; notes: number; pinned: number; completed: number; trash: number; miscellaneous: number; todo: number } | null;
  sidebarTagCounts: Record<string, number> | null;
  sidebarListCounts: Record<string, number> | null;
  isFetching: boolean;
  isFetchingItem: boolean;
  isSyncingCatchUp: boolean;
  lastSyncedAt: Date | null;
  isOnline: boolean;
  pendingOfflineCount: number;
  isSyncingOffline: boolean;
  retrySyncOffline: () => void;
  autoReorderChecklist: boolean;
  tasksEnabled: boolean;
  setTasksEnabled: (enabled: boolean) => void;
  editorPreferences: { fontFamily: string; fontSize: number; lineHeight: string };
  setEditorPreferences: (prefs: Partial<{ fontFamily: string; fontSize: number; lineHeight: string }>) => void;
  // Wiki link / backlink functions
  searchItemTitles: (query: string) => Promise<{id: string; title: string; type: string}[]>;
  findItemByTitle: (title: string) => Promise<{id: string; title: string; type: string} | null>;
  validateWikiLink: (pageName: string) => boolean;
  updateWikiLinksOnRename: (oldTitle: string, newTitle: string) => Promise<void>;
}
