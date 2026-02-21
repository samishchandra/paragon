/**
 * Adapters — Public API
 *
 * Re-exports all adapter types, the registry, and default implementations.
 */

// Types
export type {
  AuthAdapter,
  AuthUser,
  DatabaseAdapter,
  QueryOptions,
  QueryResult,
  MutationResult,
  AIAdapter,
  AIProviderType,
  AIProviderConfig,
  AIStreamChunk,
  BackupAdapter,
  BackupData,
  BackupResult,
  BackupStatus,
  ThemeConfig,
  AdapterConfig,
} from './types';

// Registry
export {
  configureAdapters,
  isConfigured,
  getAuthAdapter,
  getDatabaseAdapter,
  getAIAdapter,
  getBackupAdapter,
  getThemeConfig,
  getAdapterConfig,
} from './registry';

// Default implementations
export { NoAuthAdapter } from './auth/noAuth';
export { DisabledAIAdapter } from './ai/disabled';
export { NoBackupAdapter } from './backup/none';
export { FOUNDATION_THEME } from './theme/foundation';
// BrowserDatabaseAdapter is exported from ./database/browser
