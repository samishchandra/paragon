/**
 * Offline Queue — localStorage-backed mutation queue
 * 
 * When the network is unavailable, mutations are queued locally.
 * When connectivity returns, the queue is flushed in order.
 * Each entry has a retry counter; after MAX_RETRIES it is pruned.
 */

const STORAGE_KEY = 'momentum-offline-queue';
const MAX_RETRIES = 5;

export interface QueueEntry {
  id: string;
  mutationType: 'insert' | 'update' | 'delete' | 'upsert';
  table: string;
  payload: Record<string, any>;
  /** For update/delete: the filter column (usually 'id') */
  filterColumn?: string;
  /** For update/delete: the filter value */
  filterValue?: string;
  retries: number;
  createdAt: string;
}

function readQueue(): QueueEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeQueue(queue: QueueEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  } catch (e) {
    console.error('[OfflineQueue] Failed to write queue:', e);
  }
}

/** Get all pending entries */
export function getAll(): QueueEntry[] {
  return readQueue();
}

/** Count pending entries */
export function count(): number {
  return readQueue().length;
}

/** Add a mutation to the queue */
export function enqueue(entry: Omit<QueueEntry, 'id' | 'retries' | 'createdAt'>): void {
  const queue = readQueue();

  // Deduplicate: if there's already a pending entry for the same table + filterValue,
  // replace it with the newer one (last-write-wins for updates)
  const dedupeKey = entry.filterValue
    ? `${entry.table}:${entry.mutationType}:${entry.filterValue}`
    : null;

  const filtered = dedupeKey
    ? queue.filter(e => {
        const eKey = e.filterValue
          ? `${e.table}:${e.mutationType}:${e.filterValue}`
          : null;
        return eKey !== dedupeKey;
      })
    : queue;

  filtered.push({
    ...entry,
    id: crypto.randomUUID(),
    retries: 0,
    createdAt: new Date().toISOString(),
  });

  writeQueue(filtered);
}

/** Remove a specific entry by id */
export function dequeue(id: string): void {
  const queue = readQueue().filter(e => e.id !== id);
  writeQueue(queue);
}

/** Increment retry count for an entry */
export function incrementRetry(id: string): void {
  const queue = readQueue().map(e =>
    e.id === id ? { ...e, retries: e.retries + 1 } : e
  );
  writeQueue(queue);
}

/** Remove entries that have exceeded MAX_RETRIES */
export function pruneStale(): QueueEntry[] {
  const queue = readQueue();
  const stale = queue.filter(e => e.retries >= MAX_RETRIES);
  const fresh = queue.filter(e => e.retries < MAX_RETRIES);
  writeQueue(fresh);
  return stale;
}

/** Clear the entire queue */
export function clear(): void {
  localStorage.removeItem(STORAGE_KEY);
}
