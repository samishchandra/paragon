/**
 * Adapter Interfaces — Momentum Foundation
 *
 * These interfaces define the contracts that platform-specific adapters must implement.
 * The foundation ships with browser-only defaults (NoAuth, BrowserDB, DisabledAI, NoBackup).
 * Embedding repos (momentum, momentum3) provide their own implementations.
 */

// ─── Auth Adapter ────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  avatarUrl?: string;
  provider?: string;
  /** Supabase-compatible metadata fields for backward compat */
  user_metadata?: Record<string, any>;
  app_metadata?: Record<string, any>;
  created_at?: string;
}

export interface AuthAdapter {
  readonly type: string;

  /** Get the current authenticated user (null if not signed in) */
  getUser(): Promise<AuthUser | null>;

  /** Subscribe to auth state changes. Returns an unsubscribe function. */
  onAuthStateChange(callback: (user: AuthUser | null) => void): () => void;

  /** Initiate sign-in (implementation varies by adapter) */
  signIn(options?: Record<string, any>): Promise<{ error: string | null }>;

  /** Sign out the current user */
  signOut(): Promise<void>;

  /** Whether the user is currently authenticated */
  isAuthenticated(): boolean;

  // ── Optional capabilities ──
  /** Whether this adapter supports email/password auth */
  supportsEmailAuth?: boolean;
  /** Whether this adapter supports OAuth providers */
  supportsOAuth?: boolean;
  /** Whether this adapter supports MFA */
  supportsMFA?: boolean;
  /** Whether auth is required to use the app */
  requiresAuth: boolean;

  // ── Optional extended methods ──
  signInWithEmail?(email: string, password: string): Promise<{ error: string | null }>;
  signUpWithEmail?(email: string, password: string, name?: string): Promise<{ error: string | null; needsConfirmation: boolean }>;
  signInWithOAuth?(provider: string): Promise<{ error: string | null }>;
  resetPassword?(email: string): Promise<{ error: string | null }>;
  updatePassword?(newPassword: string): Promise<{ error: string | null }>;

  // ── MFA methods (optional, used when supportsMFA is true) ──
  /** Check if MFA is required for the current user */
  checkMFARequired?(): Promise<boolean>;
  /** Verify MFA has been completed (called after TOTP verification) */
  verifyMFA?(): void;

  // ── Auth event methods (optional) ──
  /** Enhanced auth state change with event type */
  onAuthStateChangeWithEvent?(callback: (event: string, user: AuthUser | null) => void): () => void;

  // ── Cleanup methods (optional) ──
  /** Additional localStorage keys to clear on sign-out (beyond the defaults) */
  getAdditionalCleanupKeys?(): string[];
  /** Additional IndexedDB databases to delete on sign-out */
  getAdditionalCleanupDatabases?(): string[];
}

// ─── Database Adapter ────────────────────────────────────────────────────────

export interface QueryOptions {
  select?: string;
  filters?: Record<string, any>;
  order?: { column: string; ascending: boolean };
  offset?: number;
  limit?: number;
  single?: boolean;
  count?: 'exact' | 'planned' | 'estimated';
}

export interface QueryResult<T = any> {
  data: T | null;
  error: { message: string; code?: string } | null;
  count?: number | null | undefined;
}

export interface MutationResult<T = any> {
  data: T | null;
  error: { message: string; code?: string } | null;
}

export interface DatabaseAdapter {
  readonly type: string;

  /** Initialize the database (open connections, create tables, etc.) */
  initialize(): Promise<void>;

  /** Whether the database is available and ready */
  isAvailable(): boolean;

  /** Whether this is a local-only database (no server sync) */
  isLocal(): boolean;

  /** Query data from a table */
  query<T = any>(table: string, options?: QueryOptions): Promise<QueryResult<T[]>>;

  /** Query a single row from a table */
  querySingle<T = any>(table: string, options?: QueryOptions): Promise<QueryResult<T>>;

  /** Insert one or more rows */
  insert<T = any>(table: string, data: any | any[]): Promise<MutationResult<T>>;

  /** Update rows matching filters */
  update<T = any>(table: string, filters: Record<string, any>, data: any): Promise<MutationResult<T>>;

  /** Upsert (insert or update on conflict) */
  upsert<T = any>(table: string, data: any | any[]): Promise<MutationResult<T>>;

  /** Delete rows matching filters */
  delete(table: string, filters: Record<string, any>): Promise<MutationResult>;

  /**
   * Batch-update multiple rows in a single transaction.
   * Each entry specifies its own filters and data to merge.
   * Falls back to sequential updates if not implemented by the adapter.
   */
  batchUpdate?<T = any>(table: string, updates: { filters: Record<string, any>; data: any }[]): Promise<MutationResult<T>>;

  /** Call a stored procedure / RPC function */
  rpc<T = any>(functionName: string, params?: Record<string, any>): Promise<QueryResult<T>>;
}

// ─── AI Adapter ──────────────────────────────────────────────────────────────

export type AIProviderType = 'gemini' | 'openai' | 'anthropic' | 'custom' | 'builtin' | 'disabled';

export interface AIProviderConfig {
  provider: AIProviderType;
  apiKey: string;
  model?: string;
  baseUrl?: string;
  temperature?: number;
}

export interface AIStreamChunk {
  text: string;
  done: boolean;
}

export interface AIAdapter {
  readonly type: string;

  /** Whether AI features are available */
  isAvailable(): boolean;

  /** Stream a completion for an AI action */
  stream(actionId: string, text: string, customPrompt?: string): AsyncIterable<AIStreamChunk>;

  /** Non-streaming completion */
  complete(actionId: string, text: string, customPrompt?: string): Promise<string>;

  /** Get AI service status */
  getStatus(): Promise<{ available: boolean; provider?: string; model?: string }>;

  /** Get current AI configuration */
  getConfig(): Promise<AIProviderConfig | null>;

  /** Save AI configuration */
  saveConfig(config: AIProviderConfig): Promise<void>;

  /** Clear AI configuration */
  clearConfig(): Promise<void>;

  /** Whether this adapter supports user-configurable settings */
  supportsConfiguration: boolean;
}

// ─── Backup Adapter ──────────────────────────────────────────────────────────

export interface BackupData {
  items: any[];
  tags: any[];
  lists: any[];
}

export interface BackupResult {
  uploaded: number;
  deleted: number;
  unchanged: number;
  errors: string[];
}

export interface BackupStatus {
  isConnected: boolean;
  lastBackupAt?: string;
  backupFolder?: string;
  autoBackupEnabled?: boolean;
}

export interface BackupAdapter {
  readonly type: string;

  /** Whether backup is enabled */
  isEnabled(): boolean;

  /** Whether currently connected to the backup service */
  isConnected(): boolean;

  /** Connect to the backup service (may trigger OAuth flow) */
  connect(): Promise<boolean>;

  /** Disconnect from the backup service */
  disconnect(): Promise<void>;

  /** Run a backup */
  backup(data: BackupData): Promise<BackupResult>;

  /** Get current backup status */
  getStatus(): BackupStatus;

  /** Set the backup folder path */
  setBackupFolder?(folder: string): void;

  /** Get the backup folder path */
  getBackupFolder?(): string;

  /** Subscribe to connection state changes */
  onConnectionChange(callback: (connected: boolean) => void): () => void;
}

// ─── Theme Config ────────────────────────────────────────────────────────────

/**
 * Full CSS variable palette for a theme mode (light or dark).
 * Every variable here maps to a CSS custom property on :root / .dark.
 * Values must be in OKLCH format (e.g., 'oklch(0.59 0.22 12)').
 */
export interface ThemePalette {
  '--primary': string;
  '--primary-foreground': string;
  '--background': string;
  '--foreground': string;
  '--card': string;
  '--card-foreground': string;
  '--popover': string;
  '--popover-foreground': string;
  '--secondary': string;
  '--secondary-foreground': string;
  '--muted': string;
  '--muted-foreground': string;
  '--accent': string;
  '--accent-foreground': string;
  '--destructive': string;
  '--destructive-foreground': string;
  '--border': string;
  '--input': string;
  '--ring': string;
  '--chart-1': string;
  '--chart-2': string;
  '--chart-3': string;
  '--chart-4': string;
  '--chart-5': string;
  '--sidebar': string;
  '--sidebar-foreground': string;
  '--sidebar-primary': string;
  '--sidebar-primary-foreground': string;
  '--sidebar-accent': string;
  '--sidebar-accent-foreground': string;
  '--sidebar-border': string;
  '--sidebar-ring': string;
  /** Additional custom variables (e.g., '--radius') */
  [key: `--${string}`]: string;
}

export interface ThemeConfig {
  /** Primary accent color hex (e.g., '#EF476F') */
  accentColor: string;
  /** App display name */
  appName: string;
  /** URL to app icon (used in sidebar header, settings, etc.) */
  appIconUrl: string;
  /** URL to small icon variant (sidebar, mobile nav) — falls back to appIconUrl */
  appIconSmallUrl?: string;
  /** URL to large icon variant (login page) — falls back to appIconUrl */
  appIconLargeUrl?: string;
  /** URL to 192x192 PWA icon */
  pwaIcon192Url?: string;
  /** URL to 512x512 PWA icon */
  pwaIcon512Url?: string;
  /** PWA theme color for browser tab bar */
  pwaThemeColor: string;
  /**
   * Complete light-mode palette. When provided, themeInit.ts applies every
   * variable to :root, replacing the CSS defaults entirely.
   */
  lightPalette?: ThemePalette;
  /**
   * Complete dark-mode palette. When provided, themeInit.ts injects a
   * <style>.dark { ... }</style> block that replaces the CSS defaults.
   */
  darkPalette?: ThemePalette;
  /**
   * @deprecated Use lightPalette / darkPalette instead.
   * Partial CSS variable overrides for light theme (accent-only).
   */
  lightCssVariables?: Record<string, string>;
  /**
   * @deprecated Use lightPalette / darkPalette instead.
   * Partial CSS variable overrides for dark theme (accent-only).
   */
  darkCssVariables?: Record<string, string>;
}

// ─── Search Adapter ─────────────────────────────────────────────────────────

export interface SearchResult {
  id: string;
  type: 'task' | 'note';
  title: string;
  content: string;
  isPinned: boolean;
  isCompleted: boolean;
  dueDate: string | null;
  listId: string | null;
  section: string;
  sortOrder: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  rank: number;
  titleHighlight: string;
  contentHighlight: string;
}

export interface SearchFilters {
  listId?: string | null;
  tagId?: string | null;
}

export interface SearchState {
  results: SearchResult[];
  isLoading: boolean;
  query: string;
  fromCache: boolean;
  error: string | null;
  filters?: SearchFilters;
}

export interface SearchAdapter {
  readonly type: string;

  /**
   * Execute a full-text search. Returns results ranked by relevance.
   * Implementations may use server-side FTS (Supabase RPC), a local
   * inverted index, or any other strategy.
   */
  search(query: string, maxResults?: number, filters?: SearchFilters): Promise<SearchResult[]>;

  /**
   * Browse items matching filters without a search query.
   * Returns items sorted by updated_at descending.
   */
  browse(filters: SearchFilters, maxResults?: number): Promise<SearchResult[]>;

  /**
   * Search the local offline cache (IndexedDB) for instant results.
   * Returns empty array if offline search is not supported.
   */
  searchLocally(query: string, userId: string, maxResults?: number): Promise<SearchResult[]>;

  /** Clear any in-memory search caches (e.g., after bulk data changes). */
  clearCache(): void;
}

// ─── Adapter Registry ────────────────────────────────────────────────────────

export interface AdapterConfig {
  auth: AuthAdapter;
  database: DatabaseAdapter;
  ai: AIAdapter;
  backup: BackupAdapter;
  theme: ThemeConfig;
  search: SearchAdapter;
}
