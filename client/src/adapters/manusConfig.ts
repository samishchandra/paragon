/**
 * Manus Adapter Configuration
 *
 * Configures the foundation adapter registry for the Manus platform:
 * - Database: REST API adapter (/api/data)
 * - Auth: NoAuth (Manus handles auth separately via OAuth)
 * - AI: Disabled (Manus has its own AI integration via tRPC)
 * - Backup: None (Manus uses its own local backup system)
 * - Theme: Green accent for momentum3
 */
import { configureAdapters } from '@/adapters/registry';
import { ManusDatabaseAdapter } from './manusDatabaseAdapter';
import { NoAuthAdapter } from '@/adapters/auth/noAuth';
import { DisabledAIAdapter } from '@/adapters/ai/disabled';
import { NoBackupAdapter } from '@/adapters/backup/none';
import type { ThemeConfig } from '@/adapters/types';

const momentum3Theme: ThemeConfig = {
  accentColor: '#008948',
  appName: 'Momentum Notes',
  appIconUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/NZmQsfhbCmKNvHui.png',
  appIconSmallUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/NZmQsfhbCmKNvHui.png',
  appIconLargeUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/AHAWWKQnAGRFaBpX.png',
  pwaIcon192Url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/QzBngxBiEWBxxiys.png',
  pwaIcon512Url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/AHAWWKQnAGRFaBpX.png',
  pwaThemeColor: '#059669',
  lightCssVariables: {
    '--primary': 'oklch(0.55 0.15 155)',
    '--primary-foreground': 'oklch(0.98 0.02 155)',
    '--sidebar-primary': 'oklch(0.55 0.15 155)',
    '--sidebar-primary-foreground': 'oklch(0.98 0.02 155)',
    '--ring': 'oklch(0.55 0.15 155)',
    '--sidebar-ring': 'oklch(0.55 0.15 155)',
    '--chart-1': 'oklch(0.75 0.12 155)',
    '--chart-2': 'oklch(0.65 0.15 155)',
    '--chart-3': 'oklch(0.55 0.15 155)',
    '--chart-4': 'oklch(0.45 0.12 155)',
    '--chart-5': 'oklch(0.38 0.10 155)',
  },
  darkCssVariables: {
    '--primary': 'oklch(0.65 0.15 155)',
    '--primary-foreground': 'oklch(0.98 0.02 155)',
    '--sidebar-primary': 'oklch(0.65 0.15 155)',
    '--sidebar-primary-foreground': 'oklch(0.98 0.02 155)',
    '--ring': 'oklch(0.65 0.15 155)',
    '--sidebar-ring': 'oklch(0.65 0.15 155)',
    '--chart-1': 'oklch(0.75 0.12 155)',
    '--chart-2': 'oklch(0.65 0.15 155)',
    '--chart-3': 'oklch(0.55 0.15 155)',
    '--chart-4': 'oklch(0.45 0.12 155)',
    '--chart-5': 'oklch(0.38 0.10 155)',
  },
};

export function initializeManusAdapters(): void {
  configureAdapters({
    auth: new NoAuthAdapter(),
    database: new ManusDatabaseAdapter(),
    ai: new DisabledAIAdapter(),
    backup: new NoBackupAdapter(),
    theme: momentum3Theme,
  });
}
