/**
 * useSyncStatus — Manages sync/fetching indicator state.
 *
 * Extracted from ServerMomentumContext to reduce the monolithic provider's size.
 * The main provider calls this hook and spreads its return values into the context.
 *
 * This hook only owns the state; the actual set* calls are made by the provider's
 * loadItems, fetchAndSelectItem, and performCatchUpSync functions.
 */
import { useState } from 'react';

export interface UseSyncStatusReturn {
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  isFetchingItem: boolean;
  setIsFetchingItem: React.Dispatch<React.SetStateAction<boolean>>;
  isSyncingCatchUp: boolean;
  setIsSyncingCatchUp: React.Dispatch<React.SetStateAction<boolean>>;
  lastSyncedAt: Date | null;
  setLastSyncedAt: React.Dispatch<React.SetStateAction<Date | null>>;
}

export function useSyncStatus(): UseSyncStatusReturn {
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingItem, setIsFetchingItem] = useState(false);
  const [isSyncingCatchUp, setIsSyncingCatchUp] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  return {
    isFetching,
    setIsFetching,
    isFetchingItem,
    setIsFetchingItem,
    isSyncingCatchUp,
    setIsSyncingCatchUp,
    lastSyncedAt,
    setLastSyncedAt,
  };
}
