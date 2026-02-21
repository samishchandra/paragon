/**
 * Foundation Theme — Default theme for momentum-foundation.
 *
 * Uses a coral/rose accent color (#EF476F) to distinguish from
 * momentum (blue #0079BF) and momentum3 (green #008948).
 */
import type { ThemeConfig } from '../types';

export const foundationTheme: ThemeConfig = {
  accentColor: '#EF476F',
  appName: 'Momentum Notes',
  appIconUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/SvJskrJzbNhaoqXN.png',
  appIconSmallUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/yfyiMUqozWteWFSv.png',
  appIconLargeUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/SvJskrJzbNhaoqXN.png',
  pwaIcon192Url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/KiQVnEVDeMualGKv.png',
  pwaIcon512Url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/orQLsFHiyVWFPpEE.png',
  pwaThemeColor: '#EF476F',
  lightCssVariables: {
    '--primary': 'oklch(0.59 0.22 12)',        // #EF476F in oklch
    '--primary-foreground': 'oklch(0.98 0.01 12)',
    '--sidebar-primary': 'oklch(0.59 0.22 12)',
    '--sidebar-primary-foreground': 'oklch(0.98 0.01 12)',
    '--ring': 'oklch(0.59 0.22 12)',
    '--sidebar-ring': 'oklch(0.59 0.22 12)',
    '--chart-1': 'oklch(0.75 0.15 12)',
    '--chart-2': 'oklch(0.65 0.20 12)',
    '--chart-3': 'oklch(0.59 0.22 12)',
    '--chart-4': 'oklch(0.50 0.20 12)',
    '--chart-5': 'oklch(0.42 0.18 12)',
  },
  darkCssVariables: {
    '--primary': 'oklch(0.59 0.22 12)',
    '--primary-foreground': 'oklch(0.98 0.01 12)',
    '--sidebar-primary': 'oklch(0.65 0.20 12)',
    '--sidebar-primary-foreground': 'oklch(0.98 0.01 12)',
    '--ring': 'oklch(0.59 0.22 12)',
    '--sidebar-ring': 'oklch(0.59 0.22 12)',
    '--chart-1': 'oklch(0.75 0.15 12)',
    '--chart-2': 'oklch(0.65 0.20 12)',
    '--chart-3': 'oklch(0.59 0.22 12)',
    '--chart-4': 'oklch(0.50 0.20 12)',
    '--chart-5': 'oklch(0.42 0.18 12)',
  },
};

// Alias for backward compatibility
export const FOUNDATION_THEME = foundationTheme;
