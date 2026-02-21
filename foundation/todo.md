# Offline-First Implementation Plan

## Current State
- [x] Service worker (vite-plugin-pwa) caches app shell + fonts + CDN images
- [x] Supabase API calls cached with NetworkFirst strategy (5s timeout)
- [x] Offline queue exists for mutations (localStorage-backed)
- [x] Online/offline detection with auto-flush on reconnect
- [x] Item operations already enqueue offline when !isOnline
- [ ] **MISSING**: No local database — items/tags/lists only exist in Supabase + in-memory state
- [ ] **MISSING**: When offline, app loads with empty state (no cached items to display)
- [ ] **MISSING**: No full data persistence across page reloads when offline

## Implementation Tasks

### Phase 1: IndexedDB Local Storage Layer
- [ ] Install `idb` package (lightweight IndexedDB wrapper)
- [ ] Create `client/src/lib/offlineDb.ts` with IndexedDB schema:
  - `items` store (keyed by id)
  - `tags` store (keyed by id)
  - `lists` store (keyed by id)
  - `item_tags` store (keyed by compound key)
  - `sidebar_counts` store (single entry)
  - `meta` store (lastSyncedAt, userId)
- [ ] Implement CRUD helpers: putItems, getItems, putTags, getTags, putLists, getLists, etc.

### Phase 2: Offline-First Data Flow
- [ ] Modify `useDataFetching` to:
  - On mount: load from IndexedDB first (instant), then fetch from server
  - After server fetch: update IndexedDB with fresh data
  - When offline: serve from IndexedDB only
- [ ] Modify metadata loading (tags, lists, settings) to use IndexedDB cache
- [ ] Modify sidebar counts to cache in IndexedDB
- [ ] Modify `useItemOperations` to write to IndexedDB on every local mutation

### Phase 3: Sync on Reconnect
- [ ] When coming back online: flush offline queue, then do a full refresh
- [ ] Show sync status indicator during background sync
- [ ] Handle conflict resolution (server wins for non-queued changes)

### Phase 4: Testing
- [ ] Test offline note creation and editing
- [ ] Test page reload while offline (should show cached data)
- [ ] Test reconnection sync
- [ ] Run existing test suite
