/**
 * useOnlineStatus — Manages online/offline detection and offline queue flushing.
 *
 * Extracted from ServerMomentumContext to reduce the monolithic provider's size.
 * The main provider calls this hook and spreads its return values into the context.
 *
 * Uses a ref-based callback for `refreshCounts` to break the circular dependency:
 * refreshCounts is defined after this hook is called in the provider, so we accept
 * a mutable ref that the provider populates once refreshCounts is created.
 */
import { useState, useCallback, useEffect, useRef } from 'react';
import { apiQuery } from '@/lib/db';
import { toast } from '@/lib/toast';
import { clearSearchCache } from '@/lib/serverSearch';
import * as offlineQueue from '@/lib/offlineQueue';
import type { QueueEntry } from '@/lib/offlineQueue';

export interface UseOnlineStatusReturn {
  isOnline: boolean;
  pendingOfflineCount: number;
  isSyncingOffline: boolean;
  isOnlineRef: React.MutableRefObject<boolean>;
  flushOfflineQueue: () => Promise<void>;
  enqueueOffline: (entry: Omit<QueueEntry, 'id' | 'retries' | 'createdAt'>) => void;
}

/**
 * @param refreshCountsRef - A mutable ref whose `.current` is the refreshCounts callback.
 *   The provider sets this ref after defining refreshCounts, so it's always available
 *   by the time flushOfflineQueue actually runs (which is async / event-driven).
 */
export function useOnlineStatus(
  refreshCountsRef: React.MutableRefObject<() => void>,
): UseOnlineStatusReturn {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingOfflineCount, setPendingOfflineCount] = useState(offlineQueue.count());
  const [isSyncingOffline, setIsSyncingOffline] = useState(false);
  const isOnlineRef = useRef(navigator.onLine);

  // Listen for online/offline browser events
  useEffect(() => {
    const handleOnline = () => {
      isOnlineRef.current = true;
      setIsOnline(true);
    };
    const handleOffline = () => {
      isOnlineRef.current = false;
      setIsOnline(false);
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ---- Offline queue flush ----
  const flushOfflineQueue = useCallback(async () => {
    const entries = offlineQueue.getAll();
    if (entries.length === 0) return;
    if (!navigator.onLine) return;

    setIsSyncingOffline(true);
    let successCount = 0;
    let failCount = 0;

    // Non-retryable error codes — dequeue instead of retrying
    const NON_RETRYABLE_CODES = [
      '23505', // unique_violation (duplicate key)
      '23503', // foreign_key_violation (referenced row missing)
      '22003', // numeric_value_out_of_range
      '42P01', // undefined_table
      '42703', // undefined_column
      'PGRST116', // row not found
    ];

    for (const entry of entries) {
      try {
        const body: any = {
          action: entry.mutationType,
          table: entry.table,
          data: entry.payload,
        };

        if (entry.filterColumn && entry.filterValue) {
          body.filters = { [entry.filterColumn]: entry.filterValue };
        }

        const result = await apiQuery(body);

        if (result?.error) {
          const errCode = result.error.code;
          const errMsg = result.error.message || 'Unknown error';

          // If the error is non-retryable, dequeue it silently
          if (NON_RETRYABLE_CODES.includes(errCode)) {
            console.warn(
              `[OfflineQueue] Dropping non-retryable entry ${entry.id} (${entry.mutationType} ${entry.table}): [${errCode}] ${errMsg}`
            );
            offlineQueue.dequeue(entry.id);
            successCount++;
            continue;
          }

          throw result.error;
        }

        offlineQueue.dequeue(entry.id);
        successCount++;
      } catch (e: any) {
        const errorDetail = e?.message || e?.code || JSON.stringify(e);
        console.error(
          `[OfflineQueue] Failed to flush entry ${entry.id} (${entry.mutationType} ${entry.table}):`,
          errorDetail
        );
        offlineQueue.incrementRetry(entry.id);
        failCount++;
      }
    }

    // Prune entries that exceeded max retries
    const stale = offlineQueue.pruneStale();
    if (stale.length > 0) {
      console.warn(
        `[OfflineQueue] Pruned ${stale.length} stale entries after max retries:`,
        stale.map(s => `${s.mutationType} ${s.table} (${s.filterValue || 'no-filter'})`).join(', ')
      );
    }

    setPendingOfflineCount(offlineQueue.count());
    setIsSyncingOffline(false);

    if (successCount > 0) {
      toast.success(`Synced ${successCount} offline change${successCount > 1 ? 's' : ''}`);
      clearSearchCache();
      refreshCountsRef.current();
    }
    if (failCount > 0) {
      toast.error(`${failCount} change${failCount > 1 ? 's' : ''} failed to sync`);
    }
  }, [refreshCountsRef]);

  // Auto-flush offline queue when coming back online
  useEffect(() => {
    if (isOnline && pendingOfflineCount > 0) {
      flushOfflineQueue();
    }
  }, [isOnline, pendingOfflineCount, flushOfflineQueue]);

  /** Helper: enqueue a mutation for offline retry and update the count */
  const enqueueOffline = useCallback((entry: Omit<QueueEntry, 'id' | 'retries' | 'createdAt'>) => {
    offlineQueue.enqueue(entry);
    setPendingOfflineCount(offlineQueue.count());
  }, []);

  return {
    isOnline,
    pendingOfflineCount,
    isSyncingOffline,
    isOnlineRef,
    flushOfflineQueue,
    enqueueOffline,
  };
}
