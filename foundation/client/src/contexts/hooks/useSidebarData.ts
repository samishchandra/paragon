/**
 * useSidebarData — Manages sidebar counts, tag counts, list counts, pinned items, and recent items.
 *
 * Extracted from ServerMomentumContext to reduce the monolithic provider's size.
 * The main provider calls this hook and spreads its return values into the context.
 *
 * The hook owns the state and the refreshCounts function. The provider calls
 * refreshCounts after every mutation and during catch-up sync.
 *
 * On mount, sidebar counts are computed locally from IndexedDB first (instant),
 * then refined with server data in the background.
 */
import { useState, useCallback, useEffect, useRef } from 'react';
import type { Item } from '@/types';
import { fetchAllSidebarData, fetchPinnedItems } from '@/lib/queries';
import { computeSidebarCountsLocally } from '@/lib/offlineStore';
import { formatError } from '@/lib/utils';

// Sidebar counts shape (matches the context value type)
export type SidebarCounts = {
  all: number;
  tasks: number;
  notes: number;
  pinned: number;
  completed: number;
  trash: number;
  miscellaneous: number;
  todo: number;
} | null;

export interface UseSidebarDataReturn {
  sidebarCounts: SidebarCounts;
  setSidebarCounts: React.Dispatch<React.SetStateAction<SidebarCounts>>;
  sidebarTagCounts: Record<string, number> | null;
  setSidebarTagCounts: React.Dispatch<React.SetStateAction<Record<string, number> | null>>;
  sidebarListCounts: Record<string, number> | null;
  setSidebarListCounts: React.Dispatch<React.SetStateAction<Record<string, number> | null>>;
  pinnedItems: Item[];
  setPinnedItems: React.Dispatch<React.SetStateAction<Item[]>>;
  recentItemsData: Item[];
  setRecentItemsData: React.Dispatch<React.SetStateAction<Item[]>>;
  refreshCounts: () => Promise<void>;
}

/**
 * @param userId - Current user ID
 */
export function useSidebarData(userId: string): UseSidebarDataReturn {
  const [sidebarCounts, setSidebarCounts] = useState<SidebarCounts>(null);
  const [sidebarTagCounts, setSidebarTagCounts] = useState<Record<string, number> | null>(null);
  const [sidebarListCounts, setSidebarListCounts] = useState<Record<string, number> | null>(null);
  const [pinnedItems, setPinnedItems] = useState<Item[]>([]);
  const [recentItemsData, setRecentItemsData] = useState<Item[]>([]);
  const localCountsLoadedRef = useRef(false);

  const refreshCounts = useCallback(async () => {
    try {
      const [sidebarData, pinned] = await Promise.all([
        fetchAllSidebarData(userId),
        fetchPinnedItems(userId),
      ]);
      setSidebarCounts(sidebarData.counts);
      setSidebarTagCounts(sidebarData.tagCounts);
      setSidebarListCounts(sidebarData.listCounts);
      setPinnedItems(pinned);
    } catch (error) {
      console.error('Failed to refresh counts:', formatError(error));
    }
  }, [userId]);

  // Load local counts from IndexedDB immediately on mount (instant, no server needed)
  useEffect(() => {
    if (localCountsLoadedRef.current) return;
    localCountsLoadedRef.current = true;

    computeSidebarCountsLocally(userId).then(({ counts, tagCounts, listCounts }) => {
      // Only set if we don't already have server data
      setSidebarCounts(prev => {
        if (prev !== null) return prev; // Server already responded
        return counts as SidebarCounts;
      });
      setSidebarTagCounts(prev => {
        if (prev !== null) return prev;
        return tagCounts;
      });
      setSidebarListCounts(prev => {
        if (prev !== null) return prev;
        return listCounts;
      });
    }).catch(() => {
      // IndexedDB not available, will wait for server
    });
  }, [userId]);

  // Deferred initial load — sidebar counts are visible but not blocking main content
  useEffect(() => {
    const id = typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback(() => refreshCounts(), { timeout: 2000 })
      : setTimeout(() => refreshCounts(), 100) as unknown as number;
    return () => {
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(id);
      else clearTimeout(id);
    };
    // No polling interval — counts are refreshed after every mutation (create, delete, move, complete, etc.)
    // and during catch-up sync on tab focus. This eliminates ~2,640 unnecessary queries/hour.
  }, [refreshCounts]);

  return {
    sidebarCounts,
    setSidebarCounts,
    sidebarTagCounts,
    setSidebarTagCounts,
    sidebarListCounts,
    setSidebarListCounts,
    pinnedItems,
    setPinnedItems,
    recentItemsData,
    setRecentItemsData,
    refreshCounts,
  };
}
