/**
 * Server-Side Search Service
 *
 * Orchestrates search with:
 * - Debounced queries (200ms) to avoid firing on every keystroke
 * - AbortController to cancel in-flight requests when user types more
 * - LRU cache (50 entries, 30s TTL) for instant repeat queries
 * - Stale-while-revalidate pattern for perceived speed
 * - Delegates to the registered SearchAdapter for actual search execution
 *
 * Re-exports SearchResult, SearchFilters, SearchState from adapter types
 * for backward compatibility.
 */

import { getSearchAdapter } from '@/adapters/registry';
import type { SearchResult, SearchFilters, SearchState } from '@/adapters/types';

// Re-export types for backward compatibility
export type { SearchResult, SearchFilters, SearchState };

// Keep the old name as an alias
export type ServerSearchResult = SearchResult;

// --- LRU Cache ---

interface CacheEntry {
  results: SearchResult[];
  timestamp: number;
}

class SearchCache {
  private cache = new Map<string, CacheEntry>();
  private maxSize: number;
  private ttlMs: number;

  constructor(maxSize = 50, ttlSeconds = 30) {
    this.maxSize = maxSize;
    this.ttlMs = ttlSeconds * 1000;
  }

  get(key: string): SearchResult[] | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check TTL
    if (Date.now() - entry.timestamp > this.ttlMs) {
      this.cache.delete(key);
      return null;
    }

    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.results;
  }

  set(key: string, results: SearchResult[]): void {
    // Evict oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
    this.cache.set(key, { results, timestamp: Date.now() });
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.cache.clear();
  }
}

// --- Search Service ---

const searchCache = new SearchCache(50, 30);
let currentAbortController: AbortController | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Debounced search with caching, abort, and stale-while-revalidate.
 *
 * @param query - The search query string
 * @param onUpdate - Callback fired with search state updates
 * @param debounceMs - Debounce delay in milliseconds (default 200ms)
 */
export function debouncedSearch(
  query: string,
  onUpdate: (state: SearchState) => void,
  debounceMs = 200,
  filters?: SearchFilters,
  userId?: string
): void {
  // Clear any pending debounce
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }

  // Cancel any in-flight request
  if (currentAbortController) {
    currentAbortController.abort();
    currentAbortController = null;
  }

  const trimmed = query.trim();

  // Empty query — return immediately
  if (!trimmed) {
    onUpdate({ results: [], isLoading: false, query: '', fromCache: false, error: null });
    return;
  }

  const filterSuffix = filters ? `|list:${filters.listId || ''}|tag:${filters.tagId || ''}` : '';
  const cacheKey = trimmed.toLowerCase() + filterSuffix;

  // Check cache — return immediately if hit (stale-while-revalidate)
  const cached = searchCache.get(cacheKey);
  if (cached) {
    onUpdate({ results: cached, isLoading: false, query: trimmed, fromCache: true, error: null });
  }

  // Show loading state (with cached results if available)
  if (!cached) {
    // Instant local search from IndexedDB — show results immediately while server loads
    if (userId) {
      onUpdate({ results: [], isLoading: true, query: trimmed, fromCache: false, error: null });
      const searchAdapter = getSearchAdapter();
      searchAdapter.searchLocally(trimmed, userId, 20).then(localResults => {
        if (localResults.length > 0) {
          // Only show local results if server hasn't responded yet
          onUpdate({ results: localResults, isLoading: true, query: trimmed, fromCache: true, error: null });
        }
      }).catch(() => {});
    } else {
      onUpdate({ results: [], isLoading: true, query: trimmed, fromCache: false, error: null });
    }
  }

  // Debounce the actual server request
  debounceTimer = setTimeout(async () => {
    const controller = new AbortController();
    currentAbortController = controller;

    try {
      // If we had a cache hit, mark as loading for background revalidation
      if (cached) {
        onUpdate({ results: cached, isLoading: true, query: trimmed, fromCache: true, error: null });
      }

      const searchAdapter = getSearchAdapter();
      const results = await searchAdapter.search(trimmed, 20, filters);

      // Only update if this request wasn't aborted
      if (!controller.signal.aborted) {
        searchCache.set(cacheKey, results);
        onUpdate({ results, isLoading: false, query: trimmed, fromCache: false, error: null });
      }
    } catch (err: any) {
      if (!controller.signal.aborted) {
        onUpdate({
          results: cached || [],
          isLoading: false,
          query: trimmed,
          fromCache: !!cached,
          error: err.message || 'Search failed',
        });
      }
    } finally {
      if (currentAbortController === controller) {
        currentAbortController = null;
      }
    }
  }, cached ? 500 : debounceMs); // Longer debounce for revalidation, shorter for fresh queries
}

/**
 * Browse items with active filters but no search query.
 * Delegates to the SearchAdapter.browse() method.
 */
export async function browseFilteredItems(
  filters: SearchFilters,
  maxResults = 20
): Promise<SearchResult[]> {
  const searchAdapter = getSearchAdapter();
  return searchAdapter.browse(filters, maxResults);
}

/**
 * Cancel any pending search operations.
 */
export function cancelSearch(): void {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
  if (currentAbortController) {
    currentAbortController.abort();
    currentAbortController = null;
  }
}

/**
 * Clear the search cache (e.g., after bulk operations that change data).
 * Also clears the adapter's own cache if it has one.
 */
export function clearSearchCache(): void {
  searchCache.clear();
  try {
    const searchAdapter = getSearchAdapter();
    searchAdapter.clearCache();
  } catch {
    // Adapter not configured yet — ignore
  }
}

/**
 * Parse HTML highlight markup from ts_headline into React-friendly segments.
 * Handles both `<mark>text</mark>` (custom StartSel/StopSel) and `<b>text</b>`
 * (PostgreSQL default) tags.
 */
export function parseHighlight(html: string): { text: string; highlighted: boolean }[] {
  if (!html) return [{ text: '', highlighted: false }];

  const segments: { text: string; highlighted: boolean }[] = [];
  let remaining = html;

  while (remaining.length > 0) {
    // Find the earliest highlight tag — either <mark> or <b>
    const markStart = remaining.indexOf('<mark>');
    const bStart = remaining.indexOf('<b>');

    let tagStart: number;
    let openTag: string;
    let closeTag: string;

    if (markStart === -1 && bStart === -1) {
      // No more highlight tags
      if (remaining) segments.push({ text: remaining, highlighted: false });
      break;
    } else if (markStart === -1) {
      tagStart = bStart;
      openTag = '<b>';
      closeTag = '</b>';
    } else if (bStart === -1) {
      tagStart = markStart;
      openTag = '<mark>';
      closeTag = '</mark>';
    } else {
      // Both found — use whichever comes first
      if (markStart <= bStart) {
        tagStart = markStart;
        openTag = '<mark>';
        closeTag = '</mark>';
      } else {
        tagStart = bStart;
        openTag = '<b>';
        closeTag = '</b>';
      }
    }

    // Add text before the tag
    if (tagStart > 0) {
      segments.push({ text: remaining.slice(0, tagStart), highlighted: false });
    }

    // Find closing tag
    const closeStart = remaining.indexOf(closeTag, tagStart + openTag.length);
    if (closeStart === -1) {
      // Malformed — treat rest as plain text
      segments.push({ text: remaining.slice(tagStart), highlighted: false });
      break;
    }

    // Add highlighted text
    const highlightedText = remaining.slice(tagStart + openTag.length, closeStart);
    segments.push({ text: highlightedText, highlighted: true });

    remaining = remaining.slice(closeStart + closeTag.length);
  }

  return segments;
}


/**
 * Client-side substring highlighting for search results.
 * Splits query into individual words and highlights all occurrences.
 */
export function highlightSubstring(
  text: string,
  query: string
): { text: string; highlighted: boolean }[] {
  if (!query || !text) return [{ text: text || '', highlighted: false }];
  // Split query into individual words for multi-word matching
  const words = query.trim().split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return [{ text, highlighted: false }];
  const lowerText = text.toLowerCase();
  // Build a boolean array marking which character positions should be highlighted
  const highlights = new Array(text.length).fill(false);
  for (const word of words) {
    const lowerWord = word.toLowerCase();
    let pos = lowerText.indexOf(lowerWord);
    while (pos !== -1) {
      for (let j = pos; j < pos + lowerWord.length && j < text.length; j++) {
        highlights[j] = true;
      }
      pos = lowerText.indexOf(lowerWord, pos + 1);
    }
  }
  // Convert the boolean array into segments
  const segments: { text: string; highlighted: boolean }[] = [];
  let i = 0;
  while (i < text.length) {
    const isHighlighted = highlights[i];
    let j = i;
    while (j < text.length && highlights[j] === isHighlighted) j++;
    segments.push({ text: text.slice(i, j), highlighted: isHighlighted });
    i = j;
  }
  return segments.length > 0 ? segments : [{ text, highlighted: false }];
}
