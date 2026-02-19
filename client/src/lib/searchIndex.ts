// Search Index for efficient full-text search
// Version tracking for schema changes

export const SEARCH_INDEX_VERSION = 1;

export interface SearchableItem {
  id: string;
  type: 'task' | 'note';
  title: string;
  content: string;
  listId: string | null;
  tagIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  item: SearchableItem;
  score: number;
  matches: {
    field: 'title' | 'content';
    indices: [number, number][];
  }[];
}

// Tokenize text into searchable terms
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 0);
}

// Build inverted index for fast lookups
export class SearchIndex {
  private items: Map<string, SearchableItem> = new Map();
  private titleIndex: Map<string, Set<string>> = new Map();
  private contentIndex: Map<string, Set<string>> = new Map();
  private version: number = SEARCH_INDEX_VERSION;

  constructor() {}

  // Add or update an item in the index
  addItem(item: SearchableItem): void {
    // Remove old entry if exists
    if (this.items.has(item.id)) {
      this.removeItem(item.id);
    }

    this.items.set(item.id, item);

    // Index title
    const titleTokens = tokenize(item.title);
    for (const token of titleTokens) {
      if (!this.titleIndex.has(token)) {
        this.titleIndex.set(token, new Set());
      }
      this.titleIndex.get(token)!.add(item.id);
    }

    // Index content
    const contentTokens = tokenize(item.content);
    for (const token of contentTokens) {
      if (!this.contentIndex.has(token)) {
        this.contentIndex.set(token, new Set());
      }
      this.contentIndex.get(token)!.add(item.id);
    }
  }

  // Remove an item from the index
  removeItem(id: string): void {
    const item = this.items.get(id);
    if (!item) return;

    // Remove from title index
    const titleTokens = tokenize(item.title);
    for (const token of titleTokens) {
      this.titleIndex.get(token)?.delete(id);
      if (this.titleIndex.get(token)?.size === 0) {
        this.titleIndex.delete(token);
      }
    }

    // Remove from content index
    const contentTokens = tokenize(item.content);
    for (const token of contentTokens) {
      this.contentIndex.get(token)?.delete(id);
      if (this.contentIndex.get(token)?.size === 0) {
        this.contentIndex.delete(token);
      }
    }

    this.items.delete(id);
  }

  // Search for items matching the query
  search(query: string, limit: number = 50): SearchResult[] {
    if (!query.trim()) return [];

    const queryLower = query.toLowerCase();
    const queryTokens = tokenize(query);
    const results: Map<string, SearchResult> = new Map();

    // Find matching items
    for (const token of queryTokens) {
      // Exact token matches in title (higher weight)
      const titleMatches = this.titleIndex.get(token);
      if (titleMatches) {
        for (const id of Array.from(titleMatches)) {
          if (!results.has(id)) {
            results.set(id, {
              item: this.items.get(id)!,
              score: 0,
              matches: []
            });
          }
          results.get(id)!.score += 10;
        }
      }

      // Exact token matches in content
      const contentMatches = this.contentIndex.get(token);
      if (contentMatches) {
        for (const id of Array.from(contentMatches)) {
          if (!results.has(id)) {
            results.set(id, {
              item: this.items.get(id)!,
              score: 0,
              matches: []
            });
          }
          results.get(id)!.score += 5;
        }
      }

      // Prefix matches for partial typing
      for (const [indexToken, ids] of Array.from(this.titleIndex.entries())) {
        if (indexToken.startsWith(token) && indexToken !== token) {
          for (const id of Array.from(ids)) {
            if (!results.has(id)) {
              results.set(id, {
                item: this.items.get(id)!,
                score: 0,
                matches: []
              });
            }
            results.get(id)!.score += 3;
          }
        }
      }

      for (const [indexToken, ids] of Array.from(this.contentIndex.entries())) {
        if (indexToken.startsWith(token) && indexToken !== token) {
          for (const id of Array.from(ids)) {
            if (!results.has(id)) {
              results.set(id, {
                item: this.items.get(id)!,
                score: 0,
                matches: []
              });
            }
            results.get(id)!.score += 1;
          }
        }
      }
    }

    // Calculate match indices for highlighting
    for (const result of Array.from(results.values())) {
      // Find matches in title
      const titleIndices = findMatchIndices(result.item.title, queryLower);
      if (titleIndices.length > 0) {
        result.matches.push({ field: 'title', indices: titleIndices });
      }

      // Find matches in content
      const contentIndices = findMatchIndices(result.item.content, queryLower);
      if (contentIndices.length > 0) {
        result.matches.push({ field: 'content', indices: contentIndices });
      }
    }

    // Sort by score and return top results
    return Array.from(results.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  // Rebuild index from items array
  rebuild(items: SearchableItem[]): void {
    this.items.clear();
    this.titleIndex.clear();
    this.contentIndex.clear();

    for (const item of items) {
      this.addItem(item);
    }
  }

  // Get index stats
  getStats(): { itemCount: number; version: number } {
    return {
      itemCount: this.items.size,
      version: this.version
    };
  }
}

// Find all occurrences of query in text (case-insensitive)
function findMatchIndices(text: string, query: string): [number, number][] {
  const indices: [number, number][] = [];
  const textLower = text.toLowerCase();
  let startIndex = 0;

  while (startIndex < textLower.length) {
    const index = textLower.indexOf(query, startIndex);
    if (index === -1) break;
    indices.push([index, index + query.length]);
    startIndex = index + 1;
  }

  return indices;
}

// Highlight text with matches
export function highlightMatches(
  text: string,
  indices: [number, number][]
): { text: string; highlighted: boolean }[] {
  if (indices.length === 0) {
    return [{ text, highlighted: false }];
  }

  // Sort and merge overlapping indices
  const sorted = [...indices].sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  
  for (const [start, end] of sorted) {
    if (merged.length === 0 || start > merged[merged.length - 1][1]) {
      merged.push([start, end]);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], end);
    }
  }

  const result: { text: string; highlighted: boolean }[] = [];
  let lastEnd = 0;

  for (const [start, end] of merged) {
    if (start > lastEnd) {
      result.push({ text: text.slice(lastEnd, start), highlighted: false });
    }
    result.push({ text: text.slice(start, end), highlighted: true });
    lastEnd = end;
  }

  if (lastEnd < text.length) {
    result.push({ text: text.slice(lastEnd), highlighted: false });
  }

  return result;
}

// Global search index instance
export const searchIndex = new SearchIndex();
