/**
 * UI sub-reducer — handles selection, filtering, sorting, panel toggles,
 * section collapse, multi-select, tabs, pagination, and state loading.
 */
import type { State, UIAction } from './types';
import { enforceTabLimit } from './helpers';

/** UI action type strings for the dispatcher to route correctly */
export const UI_ACTION_TYPES = new Set([
  'SELECT_ITEM', 'SET_FILTER', 'SET_SEARCH', 'SET_SORT_ORDER', 'SET_SORT_DIRECTION',
  'TOGGLE_LEFT_PANEL', 'TOGGLE_RIGHT_PANEL', 'TOGGLE_SECTION', 'TOGGLE_SECTION_FOR_VIEW',
  'ADD_RECENT_ITEM', 'LOAD_STATE', 'SET_LOADING',
  'OPEN_TAG_POPOVER', 'CLOSE_TAG_POPOVER',
  'TOGGLE_MULTI_SELECT_MODE', 'TOGGLE_ITEM_SELECTION', 'SELECT_ALL_ITEMS', 'CLEAR_SELECTION',
  'OPEN_TAB', 'CLOSE_TAB', 'REORDER_TABS',
  'SET_OFFSET', 'SET_LOADING_MORE', 'SET_CURSOR', 'SET_VIEW_SORT_PREFS',
]);

export function uiReducer(state: State, action: UIAction): State {
  switch (action.type) {
    case 'SELECT_ITEM': {
      const newSelectedId = action.payload;
      let selectTabs: string[];
      if (newSelectedId && !state.openTabIds.includes(newSelectedId)) {
        selectTabs = enforceTabLimit(
          [...state.openTabIds, newSelectedId],
          newSelectedId
        );
      } else if (newSelectedId && state.openTabIds.includes(newSelectedId)) {
        // Tab already open — keep it in its current position
        selectTabs = state.openTabIds;
      } else {
        selectTabs = state.openTabIds;
      }
      return {
        ...state,
        selectedItemId: newSelectedId,
        isNewlyCreatedItem: false,
        openTabIds: selectTabs,
      };
    }

    case 'SET_FILTER':
      return { ...state, activeFilter: action.payload, selectedItemId: null, offset: 0, cursor: null, injectedItemIds: new Set<string>() };

    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };

    case 'SET_SORT_ORDER':
      return { ...state, sortOrder: action.payload };

    case 'SET_SORT_DIRECTION':
      return { ...state, sortDirection: action.payload };

    case 'TOGGLE_LEFT_PANEL':
      return { ...state, leftPanelCollapsed: !state.leftPanelCollapsed };

    case 'TOGGLE_RIGHT_PANEL':
      return { ...state, rightPanelCollapsed: !state.rightPanelCollapsed };

    case 'TOGGLE_SECTION':
      return {
        ...state,
        collapsedSections: state.collapsedSections.includes(action.payload)
          ? state.collapsedSections.filter((s) => s !== action.payload)
          : [...state.collapsedSections, action.payload],
      };

    case 'TOGGLE_SECTION_FOR_VIEW': {
      const { viewKey, sectionId } = action.payload;
      const current = state.collapsedSectionsPerView[viewKey] || [];
      const updated = current.includes(sectionId)
        ? current.filter((s) => s !== sectionId)
        : [...current, sectionId];
      return {
        ...state,
        collapsedSectionsPerView: { ...state.collapsedSectionsPerView, [viewKey]: updated },
      };
    }

    case 'ADD_RECENT_ITEM': {
      const newRecentIds = [
        action.payload,
        ...state.recentItemIds.filter((id) => id !== action.payload),
      ].slice(0, 10);
      return { ...state, recentItemIds: newRecentIds };
    }

    case 'LOAD_STATE':
      return { ...state, ...action.payload };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'OPEN_TAG_POPOVER':
      return { ...state, tagPopoverOpen: true };

    case 'CLOSE_TAG_POPOVER':
      return { ...state, tagPopoverOpen: false };

    case 'TOGGLE_MULTI_SELECT_MODE':
      return {
        ...state,
        isMultiSelectMode: !state.isMultiSelectMode,
        selectedItemIds: [],
      };

    case 'TOGGLE_ITEM_SELECTION': {
      const itemId = action.payload;
      const isSelected = state.selectedItemIds.includes(itemId);
      return {
        ...state,
        selectedItemIds: isSelected
          ? state.selectedItemIds.filter((id) => id !== itemId)
          : [...state.selectedItemIds, itemId],
      };
    }

    case 'SELECT_ALL_ITEMS':
      return { ...state, selectedItemIds: action.payload };

    case 'CLEAR_SELECTION':
      return { ...state, selectedItemIds: [], isMultiSelectMode: false };

    case 'OPEN_TAB': {
      // Also track as recent item when a tab is opened
      const newRecentFromTab = [
        action.payload,
        ...state.recentItemIds.filter((id) => id !== action.payload),
      ].slice(0, 10);
      if (state.openTabIds.includes(action.payload)) {
        // Tab already open — keep it in its current position, just update recent
        return {
          ...state,
          recentItemIds: newRecentFromTab,
        };
      }
      const openTabTabs = enforceTabLimit(
        [...state.openTabIds, action.payload],
        state.selectedItemId
      );
      return { ...state, openTabIds: openTabTabs, recentItemIds: newRecentFromTab };
    }

    case 'CLOSE_TAB': {
      const tabId = action.payload;
      return {
        ...state,
        openTabIds: state.openTabIds.filter((id) => id !== tabId),
      };
    }

    case 'REORDER_TABS':
      return { ...state, openTabIds: action.payload };

    case 'SET_OFFSET':
      return { ...state, offset: action.payload };

    case 'SET_LOADING_MORE':
      return { ...state, isLoadingMore: action.payload };

    case 'SET_CURSOR':
      return { ...state, cursor: action.payload };

    case 'SET_VIEW_SORT_PREFS':
      return { ...state, viewSortPrefs: action.payload };

    default:
      return state;
  }
}
