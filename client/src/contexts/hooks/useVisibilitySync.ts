/**
 * useVisibilitySync — Catch-up sync when the browser tab becomes visible or the window gains focus.
 *
 * When the user switches back to the tab (or the window regains focus after
 * e.g. switching monitors), this hook re-fetches items, sidebar counts,
 * open-tab items, tags, lists, settings, and view-sort preferences so that
 * changes made on other devices are picked up.
 *
 * A minimum interval (15 s) prevents query storms from rapid tab switching.
 */
import { useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { clearSearchCache } from '@/lib/serverSearch';
import type { SortOrder } from '@/types';
import { fetchTags, fetchLists } from '@/lib/queries';

export interface VisibilitySyncDeps {
  /** Re-fetch the current view's items (with merge logic preserving local edits) */
  loadItems: () => Promise<void>;
  /** Refresh sidebar counts */
  refreshCounts: () => Promise<void>;
  /** Refresh server versions of items currently open in tabs */
  refreshOpenTabItems: () => Promise<void>;
  /** Apply user settings received from the server */
  applySettingsFromServer: (data: any) => void;
  /** React dispatch */
  dispatch: React.Dispatch<any>;
  /** Current user id */
  userId: string;
  /** Set the isSyncingCatchUp loading flag */
  setIsSyncingCatchUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const VISIBILITY_SYNC_MIN_INTERVAL = 15_000; // 15 seconds

export function useVisibilitySync(deps: VisibilitySyncDeps) {
  const {
    loadItems,
    refreshCounts,
    refreshOpenTabItems,
    applySettingsFromServer,
    dispatch,
    userId,
    setIsSyncingCatchUp,
  } = deps;

  const lastVisibilitySyncRef = useRef<number>(Date.now());

  const performCatchUpSync = useCallback(async () => {
    const now = Date.now();
    const elapsed = now - lastVisibilitySyncRef.current;
    if (elapsed < VISIBILITY_SYNC_MIN_INTERVAL) return;
    lastVisibilitySyncRef.current = now;
    setIsSyncingCatchUp(true);
    try {
      await Promise.all([
        loadItems(),
        refreshCounts(),
        refreshOpenTabItems(),
        fetchTags(userId).then(tags => dispatch({ type: 'SET_TAGS', payload: tags })),
        fetchLists(userId).then(lists => dispatch({ type: 'SET_LISTS', payload: lists })),
        // Refresh user settings
        supabase.from('user_settings').select('*').eq('user_id', userId).limit(1).single().then(({ data }) => {
          if (data) {
            applySettingsFromServer(data);
          }
        }),
        // Refresh view sort preferences
        supabase.from('view_sort_preferences').select('*').eq('user_id', userId).then(({ data }) => {
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
        }),
      ]);
      clearSearchCache();
    } catch (err) {
      console.error('Catch-up sync failed:', err);
    } finally {
      setIsSyncingCatchUp(false);
    }
  }, [loadItems, refreshCounts, refreshOpenTabItems, userId]);

  // Register visibility and focus listeners
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        performCatchUpSync();
      }
    };

    const handleWindowFocus = () => {
      // Fallback for cases where visibilitychange doesn't fire
      // (e.g., switching between monitors on the same desktop)
      performCatchUpSync();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [performCatchUpSync]);

  return { performCatchUpSync };
}
