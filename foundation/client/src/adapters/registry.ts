/**
 * Adapter Registry — Central singleton that holds all adapter instances.
 *
 * Embedding repos configure this at app startup before rendering React.
 * The foundation provides sensible defaults (NoAuth, BrowserDB, etc.).
 */
import type { AdapterConfig, AuthAdapter, DatabaseAdapter, AIAdapter, BackupAdapter, ThemeConfig, SearchAdapter } from './types';

let _config: AdapterConfig | null = null;
let _initialized = false;

/**
 * Configure all adapters. Must be called once at app startup.
 * Subsequent calls will override the configuration.
 */
export function configureAdapters(config: AdapterConfig): void {
  _config = config;
  _initialized = true;
}

/**
 * Check if adapters have been configured.
 */
export function isConfigured(): boolean {
  return _initialized;
}

function ensureConfigured(): AdapterConfig {
  if (!_config) {
    throw new Error(
      '[AdapterRegistry] Adapters not configured. Call configureAdapters() before using any adapter.'
    );
  }
  return _config;
}

/**
 * Get the auth adapter.
 */
export function getAuthAdapter(): AuthAdapter {
  return ensureConfigured().auth;
}

/**
 * Get the database adapter.
 */
export function getDatabaseAdapter(): DatabaseAdapter {
  return ensureConfigured().database;
}

/**
 * Get the AI adapter.
 */
export function getAIAdapter(): AIAdapter {
  return ensureConfigured().ai;
}

/**
 * Get the backup adapter.
 */
export function getBackupAdapter(): BackupAdapter {
  return ensureConfigured().backup;
}

/**
 * Get the theme configuration.
 */
export function getThemeConfig(): ThemeConfig {
  return ensureConfigured().theme;
}

/**
 * Get the search adapter.
 */
export function getSearchAdapter(): SearchAdapter {
  return ensureConfigured().search;
}

/**
 * Get additional backup initialization hooks.
 * Returns an empty array if none are registered.
 */
export function getBackupInitHooks(): Array<(userId: string) => void> {
  return ensureConfigured().backupInitHooks ?? [];
}

/**
 * Get the full adapter configuration.
 */
export function getAdapterConfig(): AdapterConfig {
  return ensureConfigured();
}
