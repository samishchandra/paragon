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
- [x] Create supabase-compat REST endpoint on backend

## Frontend Migration
- [x] Install Momentum frontend dependencies (tiptap, dnd-kit, etc.)
- [x] Copy Momentum frontend source files
- [x] Create supabaseClient shim (REST API adapter)
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
