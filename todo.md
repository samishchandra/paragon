# Momentum → Manus Migration TODO

## Backend Infrastructure
- [x] Create database schema (items, tags, lists, item_tags, user_settings, view_sort_preferences)
- [x] Push database migrations
- [x] Build tRPC routers for items CRUD
- [x] Build tRPC routers for tags CRUD
- [x] Build tRPC routers for lists CRUD
- [x] Build tRPC routers for search (FTS + fuzzy)
- [x] Build tRPC routers for sidebar counts
- [x] Build tRPC routers for user settings
- [x] Build tRPC routers for view sort preferences
- [x] Build tRPC routers for wiki links
- [x] Create data REST endpoint on backend (dataRouter.ts)

## Frontend Migration
- [x] Install Momentum frontend dependencies (tiptap, dnd-kit, etc.)
- [x] Copy Momentum frontend source files
- [x] Create apiClient.ts (clean REST API client)
- [x] Rewrite AuthContext to use Manus OAuth
- [x] Rewrite App.tsx for Manus auth flow
- [x] Fix all TypeScript errors (user_metadata, MFA, react-window, etc.)

## Offline-First
- [x] Create IndexedDB offline store (offlineStore.ts)
- [x] Create sync engine (syncEngine.ts)
- [x] Integrate offline-first loading into useDataFetching
- [x] Cache items/tags/lists to IndexedDB after server fetch
- [x] Clear offline data on logout

## Testing & Polish
- [x] Write vitest tests for backend routes (28 tests, all passing)
- [x] Test and fix issues
- [x] Save checkpoint and deliver

## Bug Fixes
- [x] Fix: query.order(...).range is not a function in supabaseClient shim

## Remove Supabase References
- [x] Audit all files that import supabaseClient
- [x] Rewrite queries.ts to use apiClient
- [x] Rewrite offlineQueue.ts / useOnlineStatus.ts
- [x] Rewrite serverSearch.ts
- [x] Rewrite syncEngine.ts
- [x] Rewrite wikiLinkCache.ts
- [x] Rewrite useItemOperations.ts
- [x] Rewrite useTagListOperations.ts
- [x] Rewrite useDataFetching.ts
- [x] Rewrite useVisibilitySync.ts
- [x] Rewrite useSettingsLoader.ts
- [x] Rewrite useSortAndNavigation.ts
- [x] Rewrite useWikiLinks.ts
- [x] Rewrite EditorTabs.tsx
- [x] Rewrite SearchPanel.tsx
- [x] Rewrite Settings.tsx import/export
- [x] Rewrite testDataGenerator.ts
- [x] Rewrite ai/config.ts
- [x] Rewrite autoBackup.ts
- [x] Rewrite dropbox.ts
- [x] Rewrite dropboxBackup.ts
- [x] Rewrite useDropboxBackup.ts
- [x] Delete supabaseClient.ts shim
- [x] Rename supabaseCompat.ts to dataRouter.ts
- [x] Update route registration in server/_core/index.ts

## Service Worker for True Offline Mode
- [x] Create Service Worker with app shell caching strategy
- [x] Register Service Worker in the app
- [x] Handle SW updates and cache versioning
- [x] Test offline mode end-to-end

## Bug Fixes (Round 2)
- [x] Fix: value.toISOString is not a function in offline queue flush
