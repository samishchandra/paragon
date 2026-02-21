/**
 * Shared types for the reducer system.
 * State, Action, and helper types used across all sub-reducers.
 */
import type {
  Item,
  Tag,
  List,
  FilterType,
  SectionType,
  DisplaySectionType,
  SortOrder,
} from '@/types';

// Per-view collapsed sections map: viewKey -> array of collapsed section ids
export type CollapsedSectionsMap = Record<string, (SectionType | DisplaySectionType)[]>;

export interface State {
  items: Item[];
  tags: Tag[];
  lists: List[];
  selectedItemId: string | null;
  isNewlyCreatedItem: boolean;
  activeFilter: FilterType;
  searchQuery: string;
  sortOrder: SortOrder;
  sortDirection: 'asc' | 'desc';
  leftPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;
  collapsedSections: (SectionType | DisplaySectionType)[];
  collapsedSectionsPerView: CollapsedSectionsMap;
  recentItemIds: string[];
  isLoading: boolean;
  tagPopoverOpen: boolean;
  selectedItemIds: string[];
  isMultiSelectMode: boolean;
  openTabIds: string[];
  hasMore: boolean;
  total: number;
  offset: number;
  isLoadingMore: boolean;
  cursor: string | null;
  viewSortPrefs: Record<string, { sortOrder: SortOrder; sortDirection: 'asc' | 'desc' }>;
  /** IDs of items fetched on-demand (e.g. from search/pinned click) that should NOT appear in the current view's middle panel list */
  injectedItemIds: Set<string>;
}

// ---- Action types grouped by domain ----

export type ItemAction =
  | { type: 'SET_ITEMS'; payload: { items: Item[]; total: number; hasMore: boolean; append?: boolean } }
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'UPDATE_ITEM'; payload: Item }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'SOFT_DELETE_ITEM'; payload: string }
  | { type: 'RESTORE_ITEM'; payload: string }
  | { type: 'PERMANENT_DELETE_ITEM'; payload: string }
  | { type: 'EMPTY_TRASH' }
  | { type: 'TOGGLE_PIN'; payload: string }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'UNCOMPLETE_TASK'; payload: string }
  | { type: 'MOVE_ITEM'; payload: { itemId: string; section: SectionType; newOrder?: number } }
  | { type: 'REORDER_ITEMS'; payload: { section: SectionType; itemIds: string[] } }
  | { type: 'SET_ITEM_LIST'; payload: { itemId: string; listId: string } }
  | { type: 'REMOVE_ITEM_FROM_LIST'; payload: string }
  | { type: 'BULK_DELETE_ITEMS'; payload: string[] }
  | { type: 'BULK_SET_LIST'; payload: { itemIds: string[]; listId: string | null } }
  | { type: 'BULK_ADD_TAG'; payload: { itemIds: string[]; tagId: string } }
  | { type: 'BULK_REMOVE_TAG'; payload: { itemIds: string[]; tagId: string } }
  | { type: 'INJECT_ITEM'; payload: Item }
  | { type: 'PREFETCH_TAB_ITEMS'; payload: Item[] }
  | { type: 'REFRESH_TAB_ITEMS'; payload: Item[] };

export type TagAction =
  | { type: 'SET_TAGS'; payload: Tag[] }
  | { type: 'ADD_TAG'; payload: Tag }
  | { type: 'UPDATE_TAG'; payload: { id: string; updates: Partial<Tag> } }
  | { type: 'DELETE_TAG'; payload: string };

export type ListAction =
  | { type: 'SET_LISTS'; payload: List[] }
  | { type: 'ADD_LIST'; payload: List }
  | { type: 'UPDATE_LIST'; payload: { id: string; updates: Partial<List> } }
  | { type: 'DELETE_LIST'; payload: string }
  | { type: 'REORDER_LISTS'; payload: List[] };

export type UIAction =
  | { type: 'SELECT_ITEM'; payload: string | null }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_SORT_ORDER'; payload: SortOrder }
  | { type: 'SET_SORT_DIRECTION'; payload: 'asc' | 'desc' }
  | { type: 'TOGGLE_LEFT_PANEL' }
  | { type: 'TOGGLE_RIGHT_PANEL' }
  | { type: 'TOGGLE_SECTION'; payload: SectionType | DisplaySectionType }
  | { type: 'TOGGLE_SECTION_FOR_VIEW'; payload: { viewKey: string; sectionId: SectionType | DisplaySectionType } }
  | { type: 'ADD_RECENT_ITEM'; payload: string }
  | { type: 'LOAD_STATE'; payload: Partial<State> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'OPEN_TAG_POPOVER' }
  | { type: 'CLOSE_TAG_POPOVER' }
  | { type: 'TOGGLE_MULTI_SELECT_MODE' }
  | { type: 'TOGGLE_ITEM_SELECTION'; payload: string }
  | { type: 'SELECT_ALL_ITEMS'; payload: string[] }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'OPEN_TAB'; payload: string }
  | { type: 'CLOSE_TAB'; payload: string }
  | { type: 'REORDER_TABS'; payload: string[] }
  | { type: 'SET_OFFSET'; payload: number }
  | { type: 'SET_LOADING_MORE'; payload: boolean }
  | { type: 'SET_CURSOR'; payload: string | null }
  | { type: 'SET_VIEW_SORT_PREFS'; payload: Record<string, { sortOrder: SortOrder; sortDirection: 'asc' | 'desc' }> };

export type Action = ItemAction | TagAction | ListAction | UIAction;
