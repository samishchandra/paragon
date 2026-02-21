import { apiQuery } from '@/lib/db';

/**
 * Lightweight client-side cache of item titles for synchronous wiki link validation.
 * Maps lowercase-trimmed title → item id.
 * Updated event-driven: on app load, after server sync (SET_ITEMS), and
 * on local mutations (create/rename/delete). No periodic polling needed.
 */
class WikiLinkTitleCache {
  private cache = new Map<string, string>(); // lowercase title → item id
  private lastRefresh = 0;
  private refreshPromise: Promise<void> | null = null;

  private normalize(title: string): string {
    return title.toLowerCase().trim();
  }

  /**
   * Refresh the cache from the server.
   * Deduplicates concurrent calls.
   */
  async refresh(userId: string): Promise<void> {
    if (this.refreshPromise) return this.refreshPromise;

    this.refreshPromise = (async () => {
      try {
        const { data } = await apiQuery({
          table: 'items',
          select: 'id, title',
          filters: {
            user_id: userId,
            'deleted_at__is': null,
          },
        });
        this.cache.clear();
        data?.forEach((item: any) => {
          if (item.title) {
            this.cache.set(this.normalize(item.title), item.id);
          }
        });
        this.lastRefresh = Date.now();
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  /**
   * Check if the cache has been populated at least once.
   */
  isReady(): boolean {
    return this.lastRefresh > 0;
  }

  /**
   * Validate whether a wiki link target exists (synchronous).
   */
  validate(title: string): boolean {
    return this.cache.has(this.normalize(title));
  }

  /**
   * Get the item ID for a given title (synchronous).
   */
  getItemId(title: string): string | undefined {
    return this.cache.get(this.normalize(title));
  }

  // --- Mutation hooks to keep cache fresh without server round-trips ---

  onItemCreated(id: string, title: string): void {
    if (title) {
      this.cache.set(this.normalize(title), id);
    }
  }

  onItemRenamed(oldTitle: string, newTitle: string, id: string): void {
    if (oldTitle) {
      this.cache.delete(this.normalize(oldTitle));
    }
    if (newTitle) {
      this.cache.set(this.normalize(newTitle), id);
    }
  }

  onItemDeleted(title: string): void {
    if (title) {
      this.cache.delete(this.normalize(title));
    }
  }

  /**
   * Rebuild the cache from the current in-memory items array.
   * Called whenever items are loaded/synced from the server (SET_ITEMS,
   * catch-up sync, etc.) — replaces periodic polling with event-driven updates.
   * No server query needed since items are already in memory.
   */
  rebuildFromItems(items: { id: string; title: string; deletedAt?: string }[]): void {
    this.cache.clear();
    for (const item of items) {
      if (item.title && !item.deletedAt) {
        this.cache.set(this.normalize(item.title), item.id);
      }
    }
    this.lastRefresh = Date.now();
  }
}

// Singleton instance
export const wikiLinkCache = new WikiLinkTitleCache();
