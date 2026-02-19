/**
 * Shared helpers used across sub-reducers.
 */

export const MAX_OPEN_TABS = 15;

/**
 * Enforce the tab limit by evicting the least-recently-used tab.
 * The openTabIds array is ordered by recency: index 0 = oldest, last = newest.
 * When adding a new tab would exceed MAX_OPEN_TABS, we evict the oldest tab
 * that isn't the currently selected item.
 */
export function enforceTabLimit(tabs: string[], selectedItemId: string | null): string[] {
  if (tabs.length <= MAX_OPEN_TABS) return tabs;
  // Find the oldest tab that isn't the selected one
  const evictIndex = tabs.findIndex(id => id !== selectedItemId);
  if (evictIndex === -1) return tabs.slice(-MAX_OPEN_TABS); // fallback: just keep newest
  return [...tabs.slice(0, evictIndex), ...tabs.slice(evictIndex + 1)];
}
