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

## End-to-End Testing
- [x] Test: Create a new note and verify content saves
- [x] Test: Edit note title and content, verify persistence after refresh
- [x] Test: Create a new task and verify it appears
- [x] Test: Complete a task and verify status change
- [x] Test: Create a tag and assign it to an item
- [x] Test: Create a list and add items to it
- [x] Test: Search for items
- [x] Test: Delete an item and restore from trash
- [x] Test: Pin an item
- [x] Test: Settings page loads correctly
- [x] Test: Check all console/network errors and fix
- [x] Test: Due date assignment for tasks
- [x] Test: Task complete/uncomplete toggle
- [x] Test: Enable Tasks toggle in Settings

## Bug Fixes (Round 3)
- [x] Fix: Sidebar counts key mismatch (all_count vs all) — keys now match frontend expectations
- [x] Fix: Tag counts and list counts not returned from get_sidebar_counts RPC
- [x] Fix: Data Overview in Settings showing all zeros

## AI Assistant Integration
- [x] Audit current AI settings and frontend AI code
- [x] Create backend tRPC procedures for AI features (summarize, suggest tasks, improve writing, continue writing)
- [x] Remove provider/API key/temperature settings from AI Settings UI
- [x] Wire up frontend AI features to backend LLM procedures
- [x] Write vitest tests for AI procedures
- [x] End-to-end test AI features

## Local Folder Backup (Replace Dropbox)
- [x] Remove Dropbox backup functionality and references
- [x] Implement local folder backup using File System Access API
- [x] One-way sync: app creates/updates/deletes reflected in filesystem
- [x] Filesystem changes do NOT reflect back in the app
- [x] Update Settings Backup tab UI for local folder selection
- [x] Replace Dropbox image upload with S3 storage
- [x] Add /api/images/upload REST endpoint with multer

## Settings Panel Fix
- [x] Fix Settings right-panel doesn't scroll

## Upstream Momentum Fixes
- [x] Pull latest fixes from original Momentum repo
- [x] Review and apply relevant upstream changes (MiddlePanel bulk refresh fix, LeftSidebar click handlers applied; all other fixes already present)

## Apply Upstream Commits
- [x] Apply commit f858e689d159970da5a75f2ccfe1901717401a86 (profile area revert, list/tag pills in search)
- [x] Apply commit fed52e95f0d16a70159efb80ac482cca2a0f8b86 (readOnly prop for ListPill/TagPill in search)

## Test Updates from Original Repo
- [x] Audit test files in original Momentum repo (12 files found, skip 2 Dropbox tests, port 10)
- [x] Compare with existing tests and identify gaps
- [x] Port and adapt upstream tests to work with Manus backend (10 test files ported)
- [x] Fix any test failures (Dropbox→Local Backup assertion, TS direction type, @testing-library/react installed)

## Local Folder Backup Integration Tests
- [x] Review localBackup.ts, autoBackup.ts, localBackupSync.ts modules
- [x] Create mock File System Access API (showDirectoryPicker, FileSystemDirectoryHandle, FileSystemFileHandle)
- [x] Test: pickFolder connects and stores folder handle
- [x] Test: writeFile creates/updates files in the chosen folder
- [x] Test: deleteFile removes files from the chosen folder
- [x] Test: runBackup syncs all items (creates new, updates changed, deletes removed)
- [x] Test: runFullBackup writes all items to the folder
- [x] Test: autoBackup triggers on item changes when connected
- [x] Test: disconnect clears the folder handle and state
- [x] Run all tests and verify they pass — 418 tests across 15 files, all passing

## Google Drive Backup Integration
- [ ] Explore Google Drive MCP tools and understand the API
- [ ] Design Google Drive backup architecture
- [ ] Implement backend endpoints for Google Drive backup (create folder, write files, delete files)
- [ ] Update Settings Backup UI to support both local folder and Google Drive options
- [ ] Wire up frontend to backend Google Drive backup flow
- [ ] Write vitest tests for Google Drive backup
- [ ] End-to-end test Google Drive backup

## Green Theme Update (Work Instance)
- [x] Audit current theme colors, favicon, PWA manifest, and accent usage
- [x] Generate new green-themed favicon and PWA icons (uploaded to CDN)
- [x] Update CSS theme variables and accent colors from blue to green
- [x] Update all hardcoded blue Tailwind classes to emerald/green equivalents
- [x] Update PWA manifest theme color and meta tags
- [x] Update favicon, PWA icons, OG image, splash screen, sidebar logos to green versions
- [x] Remove stale Supabase preconnect from index.html
- [x] Test the green theme visually — all UI elements confirmed green
- [x] Run all 418 tests — all passing after theme changes

## Bug Fixes (Green Theme Round 2)
- [x] Fix: Loading/splash icon — added border-radius:16px to splash CSS, regenerated all icons with clean rounded corners (no gray border artifacts), uploaded to CDN
- [x] Fix: Sidebar "All Items" sparkle icon — changed accentColor from text-[#1F80E5] to text-emerald-500
- [x] Fix: Tab bar bottom border — verified border-b-2 border-b-primary is present on selected tab (renders green via --primary CSS variable)

## Mobile Layout Fix
- [x] Add bottom padding to right panel (editor) to account for mobile bottom tab bar and safe area — replaced safe-area-tab-offset padding with mobile-tab-bottom-offset absolute bottom offset on all four mobile panel wrappers
