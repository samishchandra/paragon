/**
 * Offline Queue — Unit Tests
 *
 * Covers: enqueue, dequeue, deduplication, retry counting,
 * pruning stale entries, count, getAll, and clear.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import * as queue from '@/lib/offlineQueue';

beforeEach(() => {
  queue.clear();
});

describe('offlineQueue', () => {
  // ─── enqueue / getAll / count ──────────────────────────────────────
  describe('enqueue', () => {
    it('adds an entry to an empty queue', () => {
      queue.enqueue({ mutationType: 'insert', table: 'items', payload: { title: 'Test' } });
      expect(queue.count()).toBe(1);
      const all = queue.getAll();
      expect(all[0].mutationType).toBe('insert');
      expect(all[0].table).toBe('items');
      expect(all[0].payload.title).toBe('Test');
      expect(all[0].retries).toBe(0);
    });

    it('assigns a unique id and createdAt to each entry', () => {
      queue.enqueue({ mutationType: 'insert', table: 'items', payload: { a: 1 } });
      queue.enqueue({ mutationType: 'insert', table: 'items', payload: { a: 2 } });
      const all = queue.getAll();
      expect(all[0].id).not.toBe(all[1].id);
      expect(all[0].createdAt).toBeTruthy();
      expect(all[1].createdAt).toBeTruthy();
    });

    it('appends multiple entries when no deduplication key matches', () => {
      queue.enqueue({ mutationType: 'insert', table: 'items', payload: { a: 1 } });
      queue.enqueue({ mutationType: 'insert', table: 'tags', payload: { b: 2 } });
      queue.enqueue({ mutationType: 'delete', table: 'lists', payload: {}, filterColumn: 'id', filterValue: 'x' });
      expect(queue.count()).toBe(3);
    });
  });

  // ─── deduplication ─────────────────────────────────────────────────
  describe('deduplication', () => {
    it('replaces an existing entry with the same table + mutationType + filterValue', () => {
      queue.enqueue({ mutationType: 'update', table: 'items', payload: { title: 'v1' }, filterColumn: 'id', filterValue: 'item-1' });
      queue.enqueue({ mutationType: 'update', table: 'items', payload: { title: 'v2' }, filterColumn: 'id', filterValue: 'item-1' });
      expect(queue.count()).toBe(1);
      expect(queue.getAll()[0].payload.title).toBe('v2');
    });

    it('does NOT deduplicate entries with different filterValues', () => {
      queue.enqueue({ mutationType: 'update', table: 'items', payload: { title: 'a' }, filterColumn: 'id', filterValue: 'item-1' });
      queue.enqueue({ mutationType: 'update', table: 'items', payload: { title: 'b' }, filterColumn: 'id', filterValue: 'item-2' });
      expect(queue.count()).toBe(2);
    });

    it('does NOT deduplicate entries with different mutation types', () => {
      queue.enqueue({ mutationType: 'update', table: 'items', payload: { title: 'a' }, filterColumn: 'id', filterValue: 'item-1' });
      queue.enqueue({ mutationType: 'delete', table: 'items', payload: {}, filterColumn: 'id', filterValue: 'item-1' });
      expect(queue.count()).toBe(2);
    });

    it('does NOT deduplicate entries without filterValue', () => {
      queue.enqueue({ mutationType: 'insert', table: 'items', payload: { a: 1 } });
      queue.enqueue({ mutationType: 'insert', table: 'items', payload: { a: 2 } });
      expect(queue.count()).toBe(2);
    });
  });

  // ─── dequeue ───────────────────────────────────────────────────────
  describe('dequeue', () => {
    it('removes a specific entry by id', () => {
      queue.enqueue({ mutationType: 'insert', table: 'items', payload: { a: 1 } });
      queue.enqueue({ mutationType: 'insert', table: 'tags', payload: { b: 2 } });
      const first = queue.getAll()[0];
      queue.dequeue(first.id);
      expect(queue.count()).toBe(1);
      expect(queue.getAll()[0].table).toBe('tags');
    });

    it('is a no-op when id does not exist', () => {
      queue.enqueue({ mutationType: 'insert', table: 'items', payload: {} });
      queue.dequeue('nonexistent-id');
      expect(queue.count()).toBe(1);
    });
  });

  // ─── incrementRetry ────────────────────────────────────────────────
  describe('incrementRetry', () => {
    it('increments the retry counter for a specific entry', () => {
      queue.enqueue({ mutationType: 'insert', table: 'items', payload: {} });
      const entry = queue.getAll()[0];
      expect(entry.retries).toBe(0);

      queue.incrementRetry(entry.id);
      expect(queue.getAll()[0].retries).toBe(1);

      queue.incrementRetry(entry.id);
      expect(queue.getAll()[0].retries).toBe(2);
    });

    it('does not affect other entries', () => {
      queue.enqueue({ mutationType: 'insert', table: 'items', payload: { a: 1 } });
      queue.enqueue({ mutationType: 'insert', table: 'tags', payload: { b: 2 } });
      const [first] = queue.getAll();
      queue.incrementRetry(first.id);
      const all = queue.getAll();
      expect(all[0].retries).toBe(1);
      expect(all[1].retries).toBe(0);
    });
  });

  // ─── pruneStale ────────────────────────────────────────────────────
  describe('pruneStale', () => {
    it('removes entries that have reached MAX_RETRIES (5)', () => {
      queue.enqueue({ mutationType: 'insert', table: 'items', payload: {} });
      const entry = queue.getAll()[0];
      for (let i = 0; i < 5; i++) queue.incrementRetry(entry.id);

      const stale = queue.pruneStale();
      expect(stale.length).toBe(1);
      expect(stale[0].id).toBe(entry.id);
      expect(queue.count()).toBe(0);
    });

    it('keeps entries below MAX_RETRIES', () => {
      queue.enqueue({ mutationType: 'insert', table: 'items', payload: { a: 1 } });
      queue.enqueue({ mutationType: 'insert', table: 'tags', payload: { b: 2 } });
      const [first] = queue.getAll();
      for (let i = 0; i < 4; i++) queue.incrementRetry(first.id);

      const stale = queue.pruneStale();
      expect(stale.length).toBe(0);
      expect(queue.count()).toBe(2);
    });

    it('returns empty array when queue is empty', () => {
      expect(queue.pruneStale()).toEqual([]);
    });
  });

  // ─── clear ─────────────────────────────────────────────────────────
  describe('clear', () => {
    it('removes all entries', () => {
      queue.enqueue({ mutationType: 'insert', table: 'items', payload: {} });
      queue.enqueue({ mutationType: 'insert', table: 'tags', payload: {} });
      queue.clear();
      expect(queue.count()).toBe(0);
      expect(queue.getAll()).toEqual([]);
    });
  });

  // ─── localStorage persistence ──────────────────────────────────────
  describe('localStorage persistence', () => {
    it('persists queue across read/write cycles', () => {
      queue.enqueue({ mutationType: 'update', table: 'items', payload: { title: 'persisted' }, filterColumn: 'id', filterValue: 'p1' });
      // Re-read from localStorage
      const raw = localStorage.getItem('momentum-offline-queue');
      expect(raw).toBeTruthy();
      const parsed = JSON.parse(raw!);
      expect(parsed.length).toBe(1);
      expect(parsed[0].payload.title).toBe('persisted');
    });

    it('handles corrupted localStorage gracefully', () => {
      localStorage.setItem('momentum-offline-queue', '{invalid json');
      expect(queue.getAll()).toEqual([]);
      expect(queue.count()).toBe(0);
    });
  });
});
