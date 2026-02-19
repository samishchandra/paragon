# E2E Test Log

## Test Results

| Test | Status | Notes |
|------|--------|-------|
| Note Creation | PASS | New notes created successfully |
| Content Persistence | PASS | Content survives page refresh |
| Tag Creation | PASS | Tags created with color |
| Tag Assignment | PASS (after fix) | item_tags insert now works |
| List Creation | PASS | Work Projects list created |
| List Assignment | PASS | Assigned to Work Projects |
| Search | PASS (after fix) | Shows results with highlights |
| Delete | PASS | Soft delete to trash works |
| Restore | PASS | Restored from trash successfully |
| Pin/Unpin | PASS | Pin shows in PINNED section, Unpin works |
| Settings - Account | PASS | Profile, account details, MFA, sign out |
| Settings - General | PASS | Sync status, Enable Tasks toggle |
| Settings - Editor | PASS | Font, size, line height, auto-reorder |
| Settings - Data | PASS (after fix) | Data overview with correct counts |
| Settings - Backup | PASS | Dropbox integration UI renders |
| Task Creation | PASS | New Task button creates task type |
| Due Date | PASS | Calendar picker, date assigned (Feb 23) |
| Task Complete/Uncomplete | PASS | Toggle works, sidebar counts update |
| Sidebar Counts | PASS (after fix) | All counts now accurate |
| Manus OAuth | PASS | Login works, user identified |
| No Supabase References | PASS | Zero Supabase SDK imports remain |

## Bugs Found & Fixed
1. toISOString error — date strings not converted to Date objects (FIXED)
2. item_tags insert — array data not mapped through mapColumns (FIXED)
3. Search — wrong param name (search_query vs search_text) + missing highlights (FIXED)
4. Sidebar counts all showing 0 — key mismatch (all_count vs all) (FIXED)
5. Tag counts and list counts not returned from sidebar_counts RPC (FIXED)
