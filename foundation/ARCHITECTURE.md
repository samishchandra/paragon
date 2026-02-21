# Momentum Foundation — Modular Architecture Design

## Overview

The `momentum-foundation` repo extracts the common core from `momentum` (Supabase/Vercel) and `momentum3` (Manus), providing pluggable adapter interfaces for all platform-specific layers. The foundation itself ships with **browser-only** adapters (no auth, IndexedDB/localStorage DB, no cloud backup) and runs as a standalone app on Manus hosting.

## Extensible Layers

| Layer | Interface | Foundation Default | momentum | momentum3 |
|-------|-----------|-------------------|----------|-----------|
| Auth | `AuthAdapter` | NoAuth (anonymous local user) | Supabase + GitHub OAuth | Manus OAuth |
| Database | `DatabaseAdapter` | Browser IndexedDB | Supabase PostgREST | Manus API + Drizzle |
| AI Provider | `AIAdapter` | Disabled (no AI) | Gemini/OpenAI/Anthropic/Custom | Manus built-in |
| Cloud Backup | `BackupAdapter` | None | Dropbox | Disabled |
| Theme | `ThemeConfig` | #EF476F (coral) | #0079BF (blue) | #008948 (green) |
| Hosting | Build/server config | Manus static | Vercel | Manus full-stack |

## Architecture Pattern

```
momentum-foundation/
├── client/src/
│   ├── adapters/           # Adapter interfaces + default implementations
│   │   ├── types.ts        # All adapter interfaces
│   │   ├── registry.ts     # Central adapter registry (singleton)
│   │   ├── auth/
│   │   │   └── noAuth.ts   # Default: anonymous local user
│   │   ├── database/
│   │   │   └── browser.ts  # Default: IndexedDB-backed database
│   │   ├── ai/
│   │   │   └── disabled.ts # Default: AI disabled
│   │   └── backup/
│   │       └── none.ts     # Default: no cloud backup
│   ├── theme/
│   │   └── config.ts       # Theme configuration (colors, branding)
│   ├── components/         # All shared UI components (from momentum)
│   ├── contexts/           # React contexts (ServerMomentumContext, ThemeContext, etc.)
│   ├── hooks/              # Shared hooks
│   ├── lib/                # Utilities (queries, search, offlineQueue, etc.)
│   ├── pages/              # Home, Settings, Login, NotFound
│   └── types/              # Shared TypeScript types
├── shared/                 # Shared constants
└── server/                 # Minimal static server
```

## Adapter Interfaces

### AuthAdapter
```typescript
interface AuthAdapter {
  type: 'none' | 'supabase' | 'manus' | 'custom';
  getUser(): Promise<AuthUser | null>;
  onAuthStateChange(callback: (user: AuthUser | null) => void): () => void;
  signIn(options?: any): Promise<void>;
  signOut(): Promise<void>;
  isAuthenticated(): boolean;
  // Optional capabilities
  supportsEmailAuth?: boolean;
  supportsOAuth?: boolean;
  supportsMFA?: boolean;
}
```

### DatabaseAdapter
```typescript
interface DatabaseAdapter {
  type: 'browser' | 'supabase' | 'manus' | 'custom';
  // CRUD operations matching the existing query pattern
  query(table: string, options: QueryOptions): Promise<QueryResult>;
  insert(table: string, data: any): Promise<MutationResult>;
  update(table: string, filters: Record<string, any>, data: any): Promise<MutationResult>;
  upsert(table: string, data: any): Promise<MutationResult>;
  delete(table: string, filters: Record<string, any>): Promise<MutationResult>;
  rpc(functionName: string, params?: any): Promise<QueryResult>;
  // Lifecycle
  initialize(): Promise<void>;
  isAvailable(): boolean;
}
```

### AIAdapter
```typescript
interface AIAdapter {
  type: 'disabled' | 'client-side' | 'server-side' | 'custom';
  isAvailable(): boolean;
  stream(actionId: string, text: string, customPrompt?: string): AsyncIterable<{ text: string; done: boolean }>;
  complete(actionId: string, text: string, customPrompt?: string): Promise<string>;
  getStatus(): Promise<{ available: boolean; provider?: string; model?: string }>;
  // Config management
  getConfig(): Promise<AIProviderConfig | null>;
  saveConfig(config: AIProviderConfig): Promise<void>;
  clearConfig(): Promise<void>;
}
```

### BackupAdapter
```typescript
interface BackupAdapter {
  type: 'none' | 'dropbox' | 'custom';
  isEnabled(): boolean;
  isConnected(): boolean;
  connect(): Promise<boolean>;
  disconnect(): Promise<void>;
  backup(data: BackupData): Promise<BackupResult>;
  getStatus(): BackupStatus;
}
```

### ThemeConfig
```typescript
interface ThemeConfig {
  accentColor: string;        // e.g., '#EF476F'
  appName: string;            // e.g., 'Momentum Notes'
  appIcon: string;            // URL to app icon
  splashIcon: string;         // URL to splash screen icon
  pwaThemeColor: string;      // Browser tab bar color
  // CSS variable overrides
  cssVariables: Record<string, string>;
}
```

## Adapter Registry

A central singleton that holds all adapter instances. Embedding repos configure this at app startup:

```typescript
// In momentum-foundation (default):
AdapterRegistry.configure({
  auth: new NoAuthAdapter(),
  database: new BrowserDatabaseAdapter(),
  ai: new DisabledAIAdapter(),
  backup: new NoBackupAdapter(),
  theme: FOUNDATION_THEME,
});

// In momentum (would override):
AdapterRegistry.configure({
  auth: new SupabaseAuthAdapter(supabaseClient),
  database: new SupabaseDatabaseAdapter(supabaseClient),
  ai: new ClientSideAIAdapter(),
  backup: new DropboxBackupAdapter(),
  theme: MOMENTUM_THEME,
});
```

## Key Design Decisions

1. **queries.ts uses DatabaseAdapter** — The existing `queries.ts` (fetchItems, fetchTags, etc.) will be refactored to call `DatabaseAdapter` methods instead of directly calling Supabase or apiClient. This is the main integration point.

2. **AuthContext delegates to AuthAdapter** — The AuthContext will use the registered AuthAdapter. For NoAuth, it auto-creates a local anonymous user with a stable ID stored in localStorage.

3. **AI is optional** — When AI adapter is disabled, AI-related UI elements (sparkles menu, AI settings) are hidden.

4. **Offline queue works with any DatabaseAdapter** — The offline queue stores mutations in localStorage and flushes them through the DatabaseAdapter when online.

5. **Theme is CSS-variable driven** — The ThemeConfig generates CSS variable overrides that are injected at app startup, keeping all theme changes in one place.

## Browser Database Adapter (Foundation Default)

The BrowserDatabaseAdapter implements the full DatabaseAdapter interface using IndexedDB:
- All data stored locally in IndexedDB (items, tags, lists, item_tags, user_settings, view_sort_preferences)
- No server communication needed
- Supports all query patterns (select, insert, update, delete, upsert)
- RPC functions (search, sidebar counts) computed locally
- Data persists across browser sessions
- Anonymous user ID generated and stored in localStorage

## Files to Extract from momentum (source of truth for UI)

### Core UI (copy as-is from momentum):
- All `client/src/components/` (except Editor.tsx which may differ)
- All `client/src/components/ui/` (shadcn components)
- `client/src/types/index.ts`, `client/src/types/context.ts`
- `client/src/contexts/reducers/` (all reducers)
- Most `client/src/contexts/hooks/` (useComputedData, useLocalStoragePersistence, usePreferences, useSortAndNavigation, useUICallbacks, useWikiLinks, useSettingsLoader, useLocalBackup)
- `client/src/hooks/` (useComposition, useInfiniteScroll, useKeyboardShortcuts, useMobile, usePersistFn, useResizablePanels, useSearch)
- `client/src/lib/` utilities (searchIndex, highlightText, linkifyTitle, editorFonts, styles, utils, dateParser, toast, wikiLinkCache, backupLog, testDataGenerator)

### Files to refactor (adapter-aware):
- `client/src/contexts/hooks/useDataFetching.ts` — use DatabaseAdapter
- `client/src/contexts/hooks/useItemOperations.ts` — use DatabaseAdapter
- `client/src/contexts/hooks/useTagListOperations.ts` — use DatabaseAdapter
- `client/src/contexts/hooks/useSidebarData.ts` — use DatabaseAdapter
- `client/src/contexts/hooks/useOnlineStatus.ts` — use DatabaseAdapter for flush
- `client/src/contexts/AuthContext.tsx` — use AuthAdapter
- `client/src/lib/queries.ts` — use DatabaseAdapter
- `client/src/lib/ai/config.ts` — use AIAdapter
- `client/src/pages/Settings.tsx` — conditional sections based on adapters
- `client/src/pages/Login.tsx` — conditional based on AuthAdapter
- `client/src/App.tsx` — use AuthAdapter for auth gate
