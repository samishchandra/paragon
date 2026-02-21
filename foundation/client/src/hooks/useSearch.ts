import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import MiniSearch, { SearchResult } from 'minisearch';
import { Item } from '@/types';

interface SearchOptions {
  fuzzy?: number | boolean;
  prefix?: boolean;
  boost?: Record<string, number>;
}

interface UseSearchReturn {
  search: (query: string) => void;
  results: Item[];
  isSearching: boolean;
  suggestions: string[];
  clearSearch: () => void;
}

const DEFAULT_OPTIONS: SearchOptions = {
  fuzzy: 0.2, // Allow ~20% character difference for fuzzy matching
  prefix: true, // Enable prefix matching (e.g., "tas" matches "task")
  boost: { title: 2 }, // Title matches are worth 2x content matches
};

/**
 * High-performance search hook using MiniSearch
 * Provides fuzzy search, prefix matching, and field boosting
 */
export function useSearch(
  items: Item[],
  options: SearchOptions = DEFAULT_OPTIONS
): UseSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Item[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // Keep a map of items by ID for quick lookup
  const itemsMap = useMemo(() => {
    const map = new Map<string, Item>();
    items.forEach(item => map.set(item.id, item));
    return map;
  }, [items]);

  // Create and maintain the search index
  const searchIndex = useMemo(() => {
    const index = new MiniSearch<Item>({
      fields: ['title', 'content'], // Fields to index for searching
      storeFields: ['id'], // Fields to return with results
      searchOptions: {
        boost: options.boost || DEFAULT_OPTIONS.boost,
        fuzzy: options.fuzzy ?? DEFAULT_OPTIONS.fuzzy,
        prefix: options.prefix ?? DEFAULT_OPTIONS.prefix,
      },
      // Custom tokenizer to handle special characters
      tokenize: (text: string) => {
        // Split on whitespace and common punctuation, keep alphanumeric
        return text
          .toLowerCase()
          .split(/[\s\-_.,;:!?'"()\[\]{}]+/)
          .filter(token => token.length > 0);
      },
      // Process search terms the same way
      processTerm: (term: string) => {
        return term.toLowerCase();
      },
    });

    // Add all items to the index
    if (items.length > 0) {
      index.addAll(items);
    }

    return index;
  }, [items, options.boost, options.fuzzy, options.prefix]);

  // Debounce timer ref
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Perform search with debouncing
  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    
    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // If empty query, clear results immediately
    if (!searchQuery.trim()) {
      setResults([]);
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Debounce the actual search (150ms for responsive feel)
    debounceRef.current = setTimeout(() => {
      try {
        // Perform the search
        const searchResults = searchIndex.search(searchQuery, {
          fuzzy: options.fuzzy ?? DEFAULT_OPTIONS.fuzzy,
          prefix: options.prefix ?? DEFAULT_OPTIONS.prefix,
          boost: options.boost || DEFAULT_OPTIONS.boost,
        });

        // Map results back to full items
        const matchedItems = searchResults
          .map((result: SearchResult) => itemsMap.get(result.id))
          .filter((item): item is Item => item !== undefined);

        setResults(matchedItems);

        // Generate suggestions from top results
        const topSuggestions = searchResults
          .slice(0, 5)
          .map((result: SearchResult) => {
            const item = itemsMap.get(result.id);
            return item?.title || '';
          })
          .filter(title => title.length > 0);

        setSuggestions(topSuggestions);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 150);
  }, [searchIndex, itemsMap, options]);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setSuggestions([]);
    setIsSearching(false);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return {
    search,
    results,
    isSearching,
    suggestions,
    clearSearch,
  };
}

/**
 * Highlight matching terms in text
 * Returns HTML string with <mark> tags around matches
 */
export function highlightMatches(text: string, query: string): string {
  if (!query.trim() || !text) return text;

  const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);
  let result = text;

  terms.forEach(term => {
    // Create a regex that matches the term with fuzzy tolerance
    // This is a simple approach - for more accuracy, use the actual match positions from MiniSearch
    const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
    result = result.replace(regex, '<mark>$1</mark>');
  });

  return result;
}

/**
 * Escape special regex characters
 */
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default useSearch;
