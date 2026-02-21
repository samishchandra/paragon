# Momentum Foundation — Submodule Integration Summary

## Architecture Overview

All three Momentum repositories now share a common codebase through git submodules:

```
momentum-foundation (182 shared files)
├── UI components (94 files)
├── Contexts, hooks, reducers (28 files)
├── Library utilities (32 files)
├── Adapter interfaces (8 files)
└── Types, styles, config (20 files)

momentum (67 repo-specific files)
├── foundation/ ← git submodule
├── Supabase auth + database
├── Dropbox + local backup
├── Multi-provider AI (Gemini, OpenAI, Anthropic)
├── Blue #0079BF theme
└── Vercel hosting config

momentum3 (63 repo-specific files)
├── foundation/ ← git submodule
├── Manus auth + database
├── Sync engine + API client
├── Manus built-in AI
├── Green #008948 theme
└── Manus hosting config
```

## How the Submodule Resolution Works

A custom Vite plugin (`vite-plugin-foundation-resolve.ts`) implements cascading `@/` resolution:

1. When any file imports `@/components/LeftSidebar`, the plugin first checks `client/src/components/LeftSidebar.tsx` (repo-specific)
2. If not found locally, it falls back to `foundation/client/src/components/LeftSidebar.tsx` (shared)
3. TypeScript's `paths` in `tsconfig.json` mirrors this: `"@/*": ["./client/src/*", "./foundation/client/src/*"]`

This means:
- **Foundation files are used by default** for all shared UI, hooks, reducers, types, and utilities
- **Repo-specific files automatically override** foundation files when placed at the same relative path
- **No import changes needed** — all files continue using `@/` imports

## File Distribution

| Category | Foundation | momentum (overrides) | momentum3 (overrides) |
|----------|-----------|---------------------|----------------------|
| UI Components | 94 | 0 | 7 |
| Contexts/Hooks | 28 | 8 | 12 |
| Library Utils | 32 | 15 | 14 |
| Adapters | 8 | 0 | 0 |
| Platform-specific | 0 | 44 | 30 |
| **Total** | **182** | **67** | **63** |

## TypeScript Compilation Results

| Repository | Errors | Notes |
|------------|--------|-------|
| momentum-foundation | 0 | Clean |
| momentum | 1 | Pre-existing test file issue (TS2367 in components.test.tsx) |
| momentum3 | 0 | Clean |

## Propagating Foundation Changes

When you update the foundation:

```bash
# In momentum-foundation
git add . && git commit -m "fix: ..." && git push

# In momentum or momentum3
cd foundation
git pull origin master
cd ..
git add foundation
git commit -m "chore: update foundation submodule"
git push
```

## Key Files in Each Repo

### momentum (Supabase/Vercel)
- `client/src/lib/supabaseClient.ts` — Supabase client init
- `client/src/contexts/AuthContext.tsx` — Supabase/GitHub auth
- `client/src/lib/queries.ts` — Supabase query layer
- `client/src/lib/ai/config.ts` — Multi-provider AI config
- `client/src/lib/dropbox.ts` — Dropbox OAuth
- `client/src/lib/dropboxBackup.ts` — Dropbox sync
- `client/src/index.css` — Blue theme CSS variables

### momentum3 (Manus)
- `client/src/lib/apiClient.ts` — Manus API client
- `client/src/lib/trpc.ts` — tRPC client setup
- `client/src/contexts/AuthContext.tsx` — Manus OAuth
- `client/src/lib/queries.ts` — Manus query layer
- `client/src/lib/syncEngine.ts` — Manus sync engine
- `client/src/components/AIChatBox.tsx` — Manus AI chat
- `client/src/index.css` — Green theme CSS variables
