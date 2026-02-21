/**
 * Root reducer — routes actions to domain-specific sub-reducers.
 * Exports State, Action, and initialState for the provider.
 */
export type { State, Action, ItemAction, TagAction, ListAction, UIAction, CollapsedSectionsMap } from './types';

import type { State, Action } from './types';
import { itemsReducer, ITEM_ACTION_TYPES } from './itemsReducer';
import { tagsReducer, TAG_ACTION_TYPES } from './tagsReducer';
import { listsReducer, LIST_ACTION_TYPES } from './listsReducer';
import { uiReducer, UI_ACTION_TYPES } from './uiReducer';

export const initialState: State = {
  items: [],
  tags: [],
  lists: [],
  selectedItemId: null,
  isNewlyCreatedItem: false,
  activeFilter: { type: 'all' },
  searchQuery: '',
  sortOrder: 'modified',
  sortDirection: 'desc',
  leftPanelCollapsed: false,
  rightPanelCollapsed: false,
  collapsedSections: [],
  collapsedSectionsPerView: {},
  recentItemIds: [],
  isLoading: true,
  tagPopoverOpen: false,
  selectedItemIds: [],
  isMultiSelectMode: false,
  openTabIds: [],
  hasMore: false,
  total: 0,
  offset: 0,
  isLoadingMore: false,
  cursor: null,
  viewSortPrefs: {},
  injectedItemIds: new Set<string>(),
};

export function reducer(state: State, action: Action): State {
  if (ITEM_ACTION_TYPES.has(action.type)) {
    return itemsReducer(state, action as any);
  }
  if (TAG_ACTION_TYPES.has(action.type)) {
    return tagsReducer(state, action as any);
  }
  if (LIST_ACTION_TYPES.has(action.type)) {
    return listsReducer(state, action as any);
  }
  if (UI_ACTION_TYPES.has(action.type)) {
    return uiReducer(state, action as any);
  }
  return state;
}
