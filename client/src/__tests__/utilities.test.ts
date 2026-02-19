/**
 * Utility Functions — Unit Tests
 *
 * Covers:
 * - SearchIndex (add, remove, search, rebuild, prefix matching, scoring)
 * - offlineQueue (enqueue, dequeue, deduplication, retry, prune, clear)
 * - highlightText (single term, multi-term, special chars, edge cases)
 * - getMatchSnippet (context window, ellipsis, edge cases)
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SearchIndex, highlightMatches } from '@/lib/searchIndex';
import * as offlineQueue from '@/lib/offlineQueue';
import { highlightText, getMatchSnippet } from '@/lib/highlightText';

// ═══════════════════════════════════════════════════════════════════
// SEARCH INDEX
// ═══════════════════════════════════════════════════════════════════

describe('SearchIndex', () => {
  let index: SearchIndex;

  beforeEach(() => {
    index = new SearchIndex();
  });

  describe('addItem / removeItem', () => {
    it('adds an item and makes it searchable by title', () => {
      index.addItem({ id: '1', title: 'Meeting Notes', content: 'Discuss roadmap' });
      const results = index.search('meeting');
      expect(results).toHaveLength(1);
      expect(results[0].item.id).toBe('1');
    });

    it('adds an item and makes it searchable by content', () => {
      index.addItem({ id: '1', title: 'Notes', content: 'Discuss the quarterly roadmap' });
      const results = index.search('roadmap');
      expect(results).toHaveLength(1);
    });

    it('removes an item so it is no longer searchable', () => {
      index.addItem({ id: '1', title: 'Meeting Notes', content: '' });
      index.removeItem('1');
      const results = index.search('meeting');
      expect(results).toHaveLength(0);
    });

    it('removing non-existent item does not throw', () => {
      expect(() => index.removeItem('nonexistent')).not.toThrow();
    });
  });

  describe('search scoring', () => {
    it('title matches score higher than content matches', () => {
      index.addItem({ id: '1', title: 'React Guide', content: 'A guide about React' });
      index.addItem({ id: '2', title: 'JavaScript Basics', content: 'React is a library' });
      const results = index.search('react');
      // Item 1 has "React" in title (10 pts) + content (5 pts) = 15
      // Item 2 has "React" in content only (5 pts) = 5
      expect(results[0].item.id).toBe('1');
    });

    it('prefix matches work for partial typing', () => {
      index.addItem({ id: '1', title: 'Performance optimization', content: '' });
      const results = index.search('perf');
      expect(results).toHaveLength(1);
      expect(results[0].item.id).toBe('1');
    });

    it('returns empty array for empty query', () => {
      index.addItem({ id: '1', title: 'Test', content: '' });
      expect(index.search('')).toEqual([]);
      expect(index.search('   ')).toEqual([]);
    });

    it('respects the limit parameter', () => {
      for (let i = 0; i < 30; i++) {
        index.addItem({ id: `${i}`, title: `Item ${i} test`, content: '' });
      }
      const results = index.search('test', 5);
      expect(results.length).toBeLessThanOrEqual(5);
    });
  });

  describe('rebuild', () => {
    it('clears and rebuilds the index from a new set of items', () => {
      index.addItem({ id: '1', title: 'Old Item', content: '' });
      index.rebuild([
        { id: '2', title: 'New Item A', content: '' },
        { id: '3', title: 'New Item B', content: '' },
      ]);
      expect(index.search('old')).toHaveLength(0);
      expect(index.search('new')).toHaveLength(2);
    });

    it('getStats reflects the rebuilt index', () => {
      index.rebuild([
        { id: '1', title: 'A', content: '' },
        { id: '2', title: 'B', content: '' },
      ]);
      expect(index.getStats().itemCount).toBe(2);
    });
  });

  describe('updateItem (remove + re-add)', () => {
    it('updates an existing item in the index via remove + add', () => {
      index.addItem({ id: '1', title: 'Old Title', content: '' });
      index.removeItem('1');
      index.addItem({ id: '1', title: 'New Title', content: '' });
      expect(index.search('old')).toHaveLength(0);
      expect(index.search('new')).toHaveLength(1);
    });
  });

  describe('match indices', () => {
    it('returns match indices for highlighting', () => {
      index.addItem({ id: '1', title: 'Hello World', content: 'World peace' });
      const results = index.search('world');
      expect(results[0].matches.length).toBeGreaterThan(0);
      const titleMatch = results[0].matches.find(m => m.field === 'title');
      expect(titleMatch).toBeDefined();
    });
  });
});

describe('highlightMatches', () => {
  it('returns unhighlighted text when no indices', () => {
    const result = highlightMatches('Hello World', []);
    expect(result).toEqual([{ text: 'Hello World', highlighted: false }]);
  });

  it('highlights a single match', () => {
    const result = highlightMatches('Hello World', [[6, 11]]);
    expect(result).toEqual([
      { text: 'Hello ', highlighted: false },
      { text: 'World', highlighted: true },
    ]);
  });

  it('merges overlapping indices', () => {
    const result = highlightMatches('Hello World', [[0, 5], [3, 8]]);
    expect(result).toEqual([
      { text: 'Hello Wo', highlighted: true },
      { text: 'rld', highlighted: false },
    ]);
  });

  it('handles match at start of text', () => {
    const result = highlightMatches('Hello', [[0, 5]]);
    expect(result).toEqual([{ text: 'Hello', highlighted: true }]);
  });
});

// ═══════════════════════════════════════════════════════════════════
// OFFLINE QUEUE
// ═══════════════════════════════════════════════════════════════════

describe('offlineQueue', () => {
  beforeEach(() => {
    offlineQueue.clear();
  });

  describe('enqueue / getAll / count', () => {
    it('enqueues an entry and retrieves it', () => {
      offlineQueue.enqueue({
        mutationType: 'insert',
        table: 'items',
        payload: { title: 'Test' },
      });
      expect(offlineQueue.count()).toBe(1);
      const all = offlineQueue.getAll();
      expect(all[0].table).toBe('items');
      expect(all[0].retries).toBe(0);
      expect(all[0].id).toBeDefined();
      expect(all[0].createdAt).toBeDefined();
    });

    it('enqueues multiple entries', () => {
      offlineQueue.enqueue({ mutationType: 'insert', table: 'items', payload: { title: 'A' } });
      offlineQueue.enqueue({ mutationType: 'insert', table: 'items', payload: { title: 'B' } });
      expect(offlineQueue.count()).toBe(2);
    });
  });

  describe('deduplication', () => {
    it('deduplicates updates for the same table + filterValue', () => {
      offlineQueue.enqueue({
        mutationType: 'update',
        table: 'items',
        payload: { title: 'First' },
        filterColumn: 'id',
        filterValue: 'item-1',
      });
      offlineQueue.enqueue({
        mutationType: 'update',
        table: 'items',
        payload: { title: 'Second' },
        filterColumn: 'id',
        filterValue: 'item-1',
      });
      expect(offlineQueue.count()).toBe(1);
      expect(offlineQueue.getAll()[0].payload.title).toBe('Second'); // last write wins
    });

    it('does NOT deduplicate different filterValues', () => {
      offlineQueue.enqueue({
        mutationType: 'update',
        table: 'items',
        payload: { title: 'A' },
        filterColumn: 'id',
        filterValue: 'item-1',
      });
      offlineQueue.enqueue({
        mutationType: 'update',
        table: 'items',
        payload: { title: 'B' },
        filterColumn: 'id',
        filterValue: 'item-2',
      });
      expect(offlineQueue.count()).toBe(2);
    });

    it('does NOT deduplicate inserts without filterValue', () => {
      offlineQueue.enqueue({ mutationType: 'insert', table: 'items', payload: { title: 'A' } });
      offlineQueue.enqueue({ mutationType: 'insert', table: 'items', payload: { title: 'B' } });
      expect(offlineQueue.count()).toBe(2);
    });
  });

  describe('dequeue', () => {
    it('removes a specific entry by id', () => {
      offlineQueue.enqueue({ mutationType: 'insert', table: 'items', payload: { title: 'A' } });
      offlineQueue.enqueue({ mutationType: 'insert', table: 'items', payload: { title: 'B' } });
      const all = offlineQueue.getAll();
      offlineQueue.dequeue(all[0].id);
      expect(offlineQueue.count()).toBe(1);
      expect(offlineQueue.getAll()[0].payload.title).toBe('B');
    });
  });

  describe('incrementRetry', () => {
    it('increments the retry count for an entry', () => {
      offlineQueue.enqueue({ mutationType: 'insert', table: 'items', payload: {} });
      const id = offlineQueue.getAll()[0].id;
      offlineQueue.incrementRetry(id);
      offlineQueue.incrementRetry(id);
      expect(offlineQueue.getAll()[0].retries).toBe(2);
    });
  });

  describe('pruneStale', () => {
    it('removes entries that have exceeded MAX_RETRIES (5) and returns them', () => {
      offlineQueue.enqueue({ mutationType: 'insert', table: 'items', payload: { title: 'Fresh' } });
      offlineQueue.enqueue({ mutationType: 'insert', table: 'items', payload: { title: 'Stale' } });
      const all = offlineQueue.getAll();
      // Increment the second entry to 5 retries
      for (let i = 0; i < 5; i++) {
        offlineQueue.incrementRetry(all[1].id);
      }
      const stale = offlineQueue.pruneStale();
      expect(stale).toHaveLength(1);
      expect(stale[0].payload.title).toBe('Stale');
      expect(offlineQueue.count()).toBe(1); // only fresh remains
    });
  });

  describe('clear', () => {
    it('removes all entries', () => {
      offlineQueue.enqueue({ mutationType: 'insert', table: 'items', payload: {} });
      offlineQueue.enqueue({ mutationType: 'insert', table: 'items', payload: {} });
      offlineQueue.clear();
      expect(offlineQueue.count()).toBe(0);
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// HIGHLIGHT TEXT
// ═══════════════════════════════════════════════════════════════════

describe('highlightText', () => {
  it('returns plain text when query is empty', () => {
    expect(highlightText('Hello World', '')).toBe('Hello World');
  });

  it('returns plain text when text is empty', () => {
    expect(highlightText('', 'query')).toBe('');
  });

  it('returns plain text when no matches found', () => {
    expect(highlightText('Hello World', 'xyz')).toBe('Hello World');
  });

  it('highlights a single matching term (case-insensitive)', () => {
    const result = highlightText('Hello World', 'world');
    // Result should be a React element with highlighted "World"
    expect(result).not.toBe('Hello World');
  });

  it('handles special regex characters in query safely', () => {
    // Should not throw even with regex special chars
    expect(() => highlightText('Price is $100.00', '$100.00')).not.toThrow();
  });

  it('handles multi-word queries', () => {
    const result = highlightText('Hello beautiful World', 'hello world');
    expect(result).not.toBe('Hello beautiful World'); // should highlight both
  });
});

describe('getMatchSnippet', () => {
  it('returns beginning of text when query is empty', () => {
    const text = 'A'.repeat(200);
    const snippet = getMatchSnippet(text, '', 100);
    expect(snippet.length).toBeLessThanOrEqual(100);
  });

  it('returns beginning of text when no match found', () => {
    const text = 'Hello World, this is a test document with some content.';
    const snippet = getMatchSnippet(text, 'xyz', 50);
    expect(snippet).toBe(text.slice(0, 50));
  });

  it('centers snippet around the first match', () => {
    const text = 'A'.repeat(50) + ' TARGET ' + 'B'.repeat(50);
    const snippet = getMatchSnippet(text, 'target', 60);
    expect(snippet.toLowerCase()).toContain('target');
  });

  it('adds leading ellipsis when match is not at the start', () => {
    const text = 'A'.repeat(100) + ' TARGET ' + 'B'.repeat(100);
    const snippet = getMatchSnippet(text, 'target', 60);
    expect(snippet.startsWith('...')).toBe(true);
  });

  it('adds trailing ellipsis when text continues after snippet', () => {
    const text = 'TARGET ' + 'A'.repeat(200);
    const snippet = getMatchSnippet(text, 'target', 50);
    expect(snippet.endsWith('...')).toBe(true);
  });

  it('returns full text without ellipsis if text fits in maxLength', () => {
    const text = 'Short text with TARGET in it';
    const snippet = getMatchSnippet(text, 'target', 200);
    expect(snippet).toBe(text);
    expect(snippet).not.toContain('...');
  });
});
