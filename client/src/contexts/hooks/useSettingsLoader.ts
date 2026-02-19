/**
 * useSettingsLoader — Load and apply view sort preferences from Supabase.
 *
 * Owns:
 *   - Loading view_sort_preferences on mount
 *   - Applying per-view sort preference when the active filter changes
 *   - prevViewKeyRef tracking to avoid redundant dispatches
 */
import { useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { FilterType, SortOrder } from '@/types';

export interface SettingsLoaderDeps {
  dispatch: React.Dispatch<any>;
  userId: string;
  activeFilter: FilterType;
  viewSortPrefs: Record<string, { sortOrder: SortOrder; sortDirection: 'asc' | 'desc' }>;
}

export function useSettingsLoader(deps: SettingsLoaderDeps) {
  const { dispatch, userId, activeFilter, viewSortPrefs } = deps;
  const prevViewKeyRef = useRef<string | null>(null);

  // Load view sort preferences on mount
  useEffect(() => {
    async function loadViewSortPrefs() {
      const { data } = await supabase.from('view_sort_preferences').select('*').eq('user_id', userId);
      if (data) {
        const prefsMap: Record<string, { sortOrder: SortOrder; sortDirection: 'asc' | 'desc' }> = {};
        for (const pref of data) {
          prefsMap[pref.view_key] = {
            sortOrder: pref.sort_order as SortOrder,
            sortDirection: pref.sort_direction as 'asc' | 'desc',
          };
        }
        dispatch({ type: 'SET_VIEW_SORT_PREFS', payload: prefsMap });
      }
    }
    loadViewSortPrefs();
  }, []);

  // Apply per-view sort preference when the active filter (view) changes
  useEffect(() => {
    const filter = activeFilter;
    let viewKey: string;
    if (filter.type === 'tag') {
      viewKey = `tag-${(filter as any).tagId}`;
    } else if (filter.type === 'list') {
      viewKey = `list-${(filter as any).listId}`;
    } else {
      viewKey = filter.type;
    }
    if (prevViewKeyRef.current === viewKey) return;
    prevViewKeyRef.current = viewKey;
    const pref = viewSortPrefs[viewKey];
    if (pref) {
      dispatch({ type: 'SET_SORT_ORDER', payload: pref.sortOrder });
      dispatch({ type: 'SET_SORT_DIRECTION', payload: pref.sortDirection });
    } else {
      dispatch({ type: 'SET_SORT_ORDER', payload: 'modified' });
      dispatch({ type: 'SET_SORT_DIRECTION', payload: 'desc' });
    }
  }, [activeFilter, viewSortPrefs]);
}
