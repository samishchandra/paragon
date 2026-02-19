/**
 * useLocalStoragePersistence — Load/save UI state and tabs to localStorage.
 *
 * Owns:
 *   - Loading UI state (sort, filter, collapsed sections, recent items, panel state) on mount
 *   - Loading open tabs and selected item on mount
 *   - Handling ?reset URL parameter to clear persisted state
 *   - Saving UI state to localStorage on change
 *   - Saving tabs to localStorage on change
 *   - isLoadingRef lifecycle (set to false after initial load)
 */
import { useEffect, useRef } from 'react';

const UI_STATE_STORAGE_KEY = 'momentum-ui-state-server';
const TABS_STORAGE_KEY = 'momentum-open-tabs-server';

export interface LocalStoragePersistenceDeps {
  dispatch: React.Dispatch<any>;
  /** State fields needed for saving */
  sortOrder: string;
  sortDirection: string;
  collapsedSectionsPerView: Record<string, any>;
  recentItemIds: string[];
  activeFilter: any;
  leftPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;
  openTabIds: string[];
  selectedItemId: string | null;
}

export function useLocalStoragePersistence(deps: LocalStoragePersistenceDeps) {
  const {
    dispatch,
    sortOrder,
    sortDirection,
    collapsedSectionsPerView,
    recentItemIds,
    activeFilter,
    leftPanelCollapsed,
    rightPanelCollapsed,
    openTabIds,
    selectedItemId,
  } = deps;

  const isLoadingRef = useRef(true);

  // Load UI state from localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('reset')) {
      localStorage.removeItem(UI_STATE_STORAGE_KEY);
      localStorage.removeItem(TABS_STORAGE_KEY);
      urlParams.delete('reset');
      const newUrl = urlParams.toString()
        ? `${window.location.pathname}?${urlParams.toString()}`
        : window.location.pathname;
      window.history.replaceState({}, '', newUrl);
      isLoadingRef.current = false;
      return;
    }

    const savedUIState = localStorage.getItem(UI_STATE_STORAGE_KEY);
    const savedTabs = localStorage.getItem(TABS_STORAGE_KEY);

    if (savedUIState) {
      try {
        const uiState = JSON.parse(savedUIState);
        dispatch({
          type: 'LOAD_STATE',
          payload: {
            sortOrder: uiState.sortOrder || 'modified',
            sortDirection: uiState.sortDirection || 'desc',
            collapsedSectionsPerView: uiState.collapsedSectionsPerView || {},
            recentItemIds: uiState.recentItemIds || [],
            activeFilter: uiState.activeFilter || { type: 'all' },
            leftPanelCollapsed: uiState.leftPanelCollapsed || false,
            rightPanelCollapsed: uiState.rightPanelCollapsed || false,
          },
        });
      } catch (e) {
        console.error('Failed to load UI state:', e);
      }
    }

    if (savedTabs) {
      try {
        const tabsData = JSON.parse(savedTabs);
        if (Array.isArray(tabsData)) {
          dispatch({ type: 'LOAD_STATE', payload: { openTabIds: tabsData } });
        } else {
          dispatch({ type: 'LOAD_STATE', payload: { openTabIds: tabsData.openTabIds || [] } });
          const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 768;
          if (tabsData.selectedItemId && !isMobileViewport) {
            dispatch({ type: 'SELECT_ITEM', payload: tabsData.selectedItemId });
          }
        }
      } catch (e) {
        console.error('Failed to load tabs:', e);
      }
    }
  }, []);

  // Save UI state to localStorage
  useEffect(() => {
    if (isLoadingRef.current) return;
    const uiState = {
      sortOrder,
      sortDirection,
      collapsedSectionsPerView,
      recentItemIds,
      activeFilter,
      leftPanelCollapsed,
      rightPanelCollapsed,
    };
    localStorage.setItem(UI_STATE_STORAGE_KEY, JSON.stringify(uiState));
  }, [sortOrder, sortDirection, collapsedSectionsPerView, recentItemIds, activeFilter, leftPanelCollapsed, rightPanelCollapsed]);

  // Save tabs to localStorage
  useEffect(() => {
    if (isLoadingRef.current) return;
    localStorage.setItem(TABS_STORAGE_KEY, JSON.stringify({
      openTabIds,
      selectedItemId,
    }));
  }, [openTabIds, selectedItemId]);

  return { isLoadingRef };
}
