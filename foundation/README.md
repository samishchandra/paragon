# Momentum Foundation

A modular, extensible foundation for the Momentum Notes family of applications. This repo extracts the common core — UI components, data management, offline support, and rich-text editing — from the original [momentum](https://github.com/samishchandra/momentum) and [momentum3](https://github.com/samishchandra/momentum3) repos, while making all platform-specific concerns pluggable through an **adapter pattern**.

## Architecture Overview

The foundation defines **six extensible layers**, each backed by a TypeScript interface. Embedding repos (like `momentum` and `momentum3`) provide their own adapter implementations and register them at startup.

| Layer | Interface | Foundation Default | momentum | momentum3 |
|---|---|---|---|---|
| **Auth** | `AuthAdapter` | NoAuth (anonymous local user) | Supabase + GitHub OAuth | Manus OAuth |
| **Database** | `DatabaseAdapter` | Browser IndexedDB | Supabase PostgREST | Manus API + Drizzle |
| **AI Provider** | `AIAdapter` | Disabled | Gemini / OpenAI / Anthropic / Custom | Manus built-in |
| **Cloud Backup** | `BackupAdapter` | None | Dropbox | Disabled |
| **Theme** | `ThemeConfig` | `#EF476F` (coral) | `#0079BF` (blue) | `#008948` (green) |
| **Hosting** | Build / server config | Manus static | Vercel | Manus full-stack |

## File Structure

```
momentum-foundation/
├── client/src/
│   ├── adapters/              ← Adapter interfaces + default implementations
│   │   ├── types.ts           ← All adapter interfaces (AuthAdapter, DatabaseAdapter, etc.)
│   │   ├── registry.ts        ← Central adapter registry singleton
│   │   ├── index.ts           ← Barrel exports
│   │   ├── auth/
│   │   │   └── noAuth.ts      ← Default: anonymous local user
│   │   ├── database/
│   │   │   └── browser.ts     ← Default: IndexedDB-backed database
│   │   ├── ai/
│   │   │   └── disabled.ts    ← Default: AI features disabled
│   │   ├── backup/
│   │   │   └── none.ts        ← Default: no cloud backup
│   │   └── theme/
│   │       └── foundation.ts  ← Default: coral #EF476F theme
│   ├── components/            ← All shared UI components
│   ├── contexts/              ← React contexts and hooks
│   ├── hooks/                 ← Shared custom hooks
│   ├── lib/                   ← Utilities (queries, search, offline, etc.)
│   ├── pages/                 ← Page components (Home, Settings, Login, NotFound)
│   ├── types/                 ← Shared TypeScript types
│   ├── App.tsx                ← Root component with adapter-aware auth gate
│   ├── main.tsx               ← Entry point — configures adapters, renders app
│   └── index.css              ← Global styles and theme variables
├── shared/                    ← Shared constants
└── server/                    ← Minimal static server
```

## How It Works

### 1. Adapter Registry

All adapters are registered at app startup via `configureAdapters()` in `main.tsx`:

```typescript
import { configureAdapters } from './adapters/registry';
import { NoAuthAdapter } from './adapters/auth/noAuth';
import { BrowserDatabaseAdapter } from './adapters/database/browser';
import { DisabledAIAdapter } from './adapters/ai/disabled';
import { NoBackupAdapter } from './adapters/backup/none';
import { foundationTheme } from './adapters/theme/foundation';

configureAdapters({
  auth: new NoAuthAdapter(),
  database: new BrowserDatabaseAdapter(),
  ai: new DisabledAIAdapter(),
  backup: new NoBackupAdapter(),
  theme: foundationTheme,
});
```

### 2. Database Facade (`lib/db.ts`)

All data access goes through `lib/db.ts`, which provides a Supabase-compatible chainable query builder that delegates to the registered `DatabaseAdapter`:

```typescript
import { supabase } from '@/lib/db';

// These work identically whether the adapter is Browser, Supabase, or Manus
const { data } = await supabase.from('items').select('*').eq('user_id', userId);
const { data: item } = await supabase.from('items').insert({ title: 'New Note' });
```

### 3. Auth Context

The `AuthContext` delegates to the registered `AuthAdapter`. For the foundation (NoAuth), a local anonymous user is auto-created with a stable ID stored in `localStorage`. The auth gate in `App.tsx` conditionally shows a login page only when `adapter.requiresAuth` is `true`.

### 4. Conditional UI

Settings sections (Account, AI, Backup) are conditionally shown based on adapter capabilities. When auth is NoAuth, the Account section is hidden. When AI is disabled, the AI section is hidden. When backup is NoBackup, the Backup section is hidden.

## Adapter Interfaces

### AuthAdapter

```typescript
interface AuthAdapter {
  readonly type: string;
  getUser(): Promise<AuthUser | null>;
  onAuthStateChange(callback: (user: AuthUser | null) => void): () => void;
  signIn(options?: Record<string, any>): Promise<{ error: string | null }>;
  signOut(): Promise<void>;
  isAuthenticated(): boolean;
  requiresAuth: boolean;
  // Optional capabilities
  supportsEmailAuth?: boolean;
  supportsOAuth?: boolean;
  supportsMFA?: boolean;
}
```

### DatabaseAdapter

```typescript
interface DatabaseAdapter {
  readonly type: string;
  initialize(): Promise<void>;
  isAvailable(): boolean;
  isLocal(): boolean;
  query<T>(table: string, options?: QueryOptions): Promise<QueryResult<T[]>>;
  querySingle<T>(table: string, options?: QueryOptions): Promise<QueryResult<T>>;
  insert<T>(table: string, data: any): Promise<MutationResult<T>>;
  update<T>(table: string, filters: Record<string, any>, data: any): Promise<MutationResult<T>>;
  upsert<T>(table: string, data: any): Promise<MutationResult<T>>;
  delete(table: string, filters: Record<string, any>): Promise<MutationResult>;
  rpc<T>(functionName: string, params?: Record<string, any>): Promise<QueryResult<T>>;
}
```

### AIAdapter

```typescript
interface AIAdapter {
  readonly type: string;
  isAvailable(): boolean;
  stream(actionId: string, text: string, customPrompt?: string): AsyncIterable<AIStreamChunk>;
  complete(actionId: string, text: string, customPrompt?: string): Promise<string>;
  getStatus(): Promise<{ available: boolean; provider?: string; model?: string }>;
  getConfig(): Promise<AIProviderConfig | null>;
  saveConfig(config: AIProviderConfig): Promise<void>;
  clearConfig(): Promise<void>;
  supportsConfiguration: boolean;
}
```

### BackupAdapter

```typescript
interface BackupAdapter {
  readonly type: string;
  isEnabled(): boolean;
  isConnected(): boolean;
  connect(): Promise<boolean>;
  disconnect(): Promise<void>;
  backup(data: BackupData): Promise<BackupResult>;
  getStatus(): BackupStatus;
  onConnectionChange(callback: (connected: boolean) => void): () => void;
}
```

### ThemeConfig

```typescript
interface ThemeConfig {
  accentColor: string;       // Primary accent color hex
  appName: string;           // App display name
  appIconUrl: string;        // URL to app icon
  pwaThemeColor: string;     // Browser tab bar color
  lightCssVariables?: Record<string, string>;  // CSS variable overrides (light)
  darkCssVariables?: Record<string, string>;   // CSS variable overrides (dark)
}
```

## Using as a Git Submodule

Embedding repos (`momentum`, `momentum3`) can include this as a git submodule:

```bash
# In the embedding repo
git submodule add https://github.com/samishchandra/momentum-foundation.git foundation

# The embedding repo's main.tsx overrides the adapter configuration:
import { configureAdapters } from './foundation/client/src/adapters/registry';
import { SupabaseAuthAdapter } from './adapters/auth/supabase';
import { SupabaseDatabaseAdapter } from './adapters/database/supabase';
// ... etc.
```

## Creating a New Adapter

To add support for a new platform, implement the relevant interface(s):

```typescript
// Example: Firebase Auth Adapter
import type { AuthAdapter, AuthUser } from 'momentum-foundation/adapters/types';

export class FirebaseAuthAdapter implements AuthAdapter {
  readonly type = 'firebase';
  requiresAuth = true;
  supportsEmailAuth = true;
  supportsOAuth = true;

  async getUser(): Promise<AuthUser | null> {
    const fbUser = firebase.auth().currentUser;
    if (!fbUser) return null;
    return {
      id: fbUser.uid,
      email: fbUser.email ?? undefined,
      name: fbUser.displayName ?? undefined,
      avatarUrl: fbUser.photoURL ?? undefined,
    };
  }
  // ... implement remaining methods
}
```

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Type check
pnpm check

# Build for production
pnpm build
```

## Theme Variants

| Variant | Accent Color | Repo |
|---|---|---|
| Foundation | `#EF476F` (coral/rose) | `momentum-foundation` |
| Momentum | `#0079BF` (blue) | `momentum` |
| Momentum3 | `#008948` (green) | `momentum3` |

## License

MIT
