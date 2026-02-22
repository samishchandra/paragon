/**
 * Manus Adapter Configuration
 *
 * Configures the foundation adapter registry for the Manus platform:
 * - Database: REST API adapter (/api/data)
 * - Auth: NoAuth (Manus handles auth separately via OAuth)
 * - AI: Disabled (Manus has its own AI integration via tRPC)
 * - Backup: None (Manus uses its own local backup system)
 * - Search: Manus REST adapter (delegates to /api/data RPC)
 * - Theme: Green accent for Paragon (#008948)
 */
import { configureAdapters } from '@/adapters/registry';
import { ManusDatabaseAdapter } from './manusDatabaseAdapter';
import { NoAuthAdapter } from '@/adapters/auth/noAuth';
import { DisabledAIAdapter } from '@/adapters/ai/disabled';
import { NoBackupAdapter } from '@/adapters/backup/none';
import { ManusSearchAdapter } from './search/manus';
import { paragonTheme } from './theme/paragon';
import { applyTheme } from '@/lib/themeInit';

export function initializeManusAdapters(): void {
  configureAdapters({
    auth: new NoAuthAdapter(),
    database: new ManusDatabaseAdapter(),
    ai: new DisabledAIAdapter(),
    backup: new NoBackupAdapter(),
    theme: paragonTheme,
    search: new ManusSearchAdapter(),
  });

  // Apply theme CSS variables (palette, favicon, title)
  applyTheme();
}
