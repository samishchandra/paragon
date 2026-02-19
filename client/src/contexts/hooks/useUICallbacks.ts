/**
 * useUICallbacks — owns the remaining inline UI callbacks and guard effects
 * that were left in the provider after all domain hooks were extracted.
 *
 * Includes:
 *  - toggleSectionForView / isSectionCollapsedForView
 *  - addRecentItem
 *  - selectedItem (derived)
 *  - clearNewlyCreatedFlag
 *  - Guard effect: redirect 'notes' filter when tasks disabled
 *  - Guard effect: redirect when sidebar count drops to 0
 */
import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { Item, FilterType, SectionType, DisplaySectionType } from '@/types';
import type { State, Action } from '@/contexts/reducers';

export interface UICallbacksDeps {
  dispatch: React.Dispatch<Action>;
  state: State;
  pinnedItems: Item[];
  tasksEnabled: boolean;
  sidebarCounts: { all: number; tasks: number; notes: number; pinned: number; completed: number; trash: number; miscellaneous: number; todo: number } | null;
}

export function useUICallbacks({
  dispatch,
  state,
  pinnedItems,
  tasksEnabled,
  sidebarCounts,
}: UICallbacksDeps) {
  // ---- Section collapse per view ----
  const toggleSectionForView = useCallback((viewKey: string, sectionId: SectionType | DisplaySectionType) => {
    dispatch({ type: 'TOGGLE_SECTION_FOR_VIEW', payload: { viewKey, sectionId } });
  }, []);

  const isSectionCollapsedForView = useCallback((viewKey: string, sectionId: SectionType | DisplaySectionType) => {
    const collapsed = state.collapsedSectionsPerView[viewKey] || [];
    return collapsed.includes(sectionId);
  }, [state.collapsedSectionsPerView]);

  // ---- Recent item tracking ----
  const addRecentItem = useCallback((itemId: string) => {
    dispatch({ type: 'ADD_RECENT_ITEM', payload: itemId });
  }, []);

  // ---- Selected item (derived) ----
  const selectedItem = useMemo(
    () => {
      if (!state.selectedItemId) return null;
      const fromItems = state.items.find((item) => item.id === state.selectedItemId);
      if (fromItems) return fromItems;
      const fromPinned = pinnedItems.find((item) => item.id === state.selectedItemId);
      if (fromPinned) return fromPinned;
      return null;
    },
    [state.selectedItemId, state.items, pinnedItems]
  );

  // ---- Clear newly-created flag ----
  const clearNewlyCreatedFlag = useCallback(
    () => dispatch({ type: 'SELECT_ITEM', payload: state.selectedItemId }),
    [state.selectedItemId]
  );

  // ---- Guard: redirect 'notes' filter when tasks disabled ----
  useEffect(() => {
    if (!tasksEnabled && state.activeFilter.type === 'notes') {
      dispatch({ type: 'SET_FILTER', payload: { type: 'all' } });
    }
  }, [tasksEnabled, state.activeFilter.type]);

  // ---- Guard: redirect when sidebar count drops to 0 ----
  const prevSidebarCountsRef = useRef(sidebarCounts);
  useEffect(() => {
    const prev = prevSidebarCountsRef.current;
    prevSidebarCountsRef.current = sidebarCounts;
    if (!sidebarCounts || !prev) return;
    const fallback: FilterType = { type: 'all' };
    const filterType = state.activeFilter.type;
    if (filterType === 'todo' && prev.todo > 0 && sidebarCounts.todo === 0) {
      dispatch({ type: 'SET_FILTER', payload: fallback });
    } else if (filterType === 'completed' && prev.completed > 0 && sidebarCounts.completed === 0) {
      dispatch({ type: 'SET_FILTER', payload: fallback });
    } else if (filterType === 'tasks' && prev.tasks > 0 && sidebarCounts.tasks === 0) {
      dispatch({ type: 'SET_FILTER', payload: fallback });
    }
  }, [sidebarCounts, state.activeFilter.type, tasksEnabled]);

  return {
    toggleSectionForView,
    isSectionCollapsedForView,
    addRecentItem,
    selectedItem,
    clearNewlyCreatedFlag,
  };
}
