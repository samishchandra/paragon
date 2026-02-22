/**
 * Foundation Theme — Default theme for momentum-foundation.
 *
 * Uses a coral/rose accent color (#EF476F) to distinguish from
 * momentum (blue #0079BF) and momentum3 (green #008948).
 *
 * Defines the COMPLETE light and dark palettes so that index.css
 * only needs structural defaults (no hardcoded colors).
 */
import type { ThemeConfig, ThemePalette } from '../types';

const lightPalette: ThemePalette = {
  '--primary': 'oklch(0.59 0.22 12)',
  '--primary-foreground': 'oklch(0.98 0.01 12)',
  '--background': 'oklch(1 0 0)',
  '--foreground': 'oklch(0.235 0.015 65)',
  '--card': 'oklch(1 0 0)',
  '--card-foreground': 'oklch(0.235 0.015 65)',
  '--popover': 'oklch(1 0 0)',
  '--popover-foreground': 'oklch(0.235 0.015 65)',
  '--secondary': 'oklch(0.98 0.001 286.375)',
  '--secondary-foreground': 'oklch(0.4 0.015 65)',
  '--muted': 'oklch(0.967 0.001 286.375)',
  '--muted-foreground': 'oklch(0.552 0.016 285.938)',
  '--accent': 'oklch(0.967 0.001 286.375)',
  '--accent-foreground': 'oklch(0.141 0.005 285.823)',
  '--destructive': 'oklch(0.577 0.245 27.325)',
  '--destructive-foreground': 'oklch(0.985 0 0)',
  '--border': 'oklch(0.92 0.004 286.32)',
  '--input': 'oklch(0.92 0.004 286.32)',
  '--ring': 'oklch(0.59 0.22 12)',
  '--chart-1': 'oklch(0.75 0.15 12)',
  '--chart-2': 'oklch(0.65 0.20 12)',
  '--chart-3': 'oklch(0.59 0.22 12)',
  '--chart-4': 'oklch(0.50 0.20 12)',
  '--chart-5': 'oklch(0.42 0.18 12)',
  '--sidebar': 'oklch(0.98 0.002 250)',
  '--sidebar-foreground': 'oklch(0.235 0.015 65)',
  '--sidebar-primary': 'oklch(0.59 0.22 12)',
  '--sidebar-primary-foreground': 'oklch(0.98 0.01 12)',
  '--sidebar-accent': 'oklch(0.967 0.001 286.375)',
  '--sidebar-accent-foreground': 'oklch(0.141 0.005 285.823)',
  '--sidebar-border': 'oklch(0.92 0.004 286.32)',
  '--sidebar-ring': 'oklch(0.59 0.22 12)',
};

const darkPalette: ThemePalette = {
  '--primary': 'oklch(0.59 0.22 12)',
  '--primary-foreground': 'oklch(0.98 0.01 12)',
  '--background': 'oklch(0.141 0.005 285.823)',
  '--foreground': 'oklch(0.85 0.005 65)',
  '--card': 'oklch(0.21 0.006 285.885)',
  '--card-foreground': 'oklch(0.85 0.005 65)',
  '--popover': 'oklch(0.21 0.006 285.885)',
  '--popover-foreground': 'oklch(0.85 0.005 65)',
  '--secondary': 'oklch(0.24 0.006 286.033)',
  '--secondary-foreground': 'oklch(0.7 0.005 65)',
  '--muted': 'oklch(0.274 0.006 286.033)',
  '--muted-foreground': 'oklch(0.705 0.015 286.067)',
  '--accent': 'oklch(0.274 0.006 286.033)',
  '--accent-foreground': 'oklch(0.92 0.005 65)',
  '--destructive': 'oklch(0.704 0.191 22.216)',
  '--destructive-foreground': 'oklch(0.985 0 0)',
  '--border': 'oklch(1 0 0 / 10%)',
  '--input': 'oklch(1 0 0 / 15%)',
  '--ring': 'oklch(0.59 0.22 12)',
  '--chart-1': 'oklch(0.75 0.15 12)',
  '--chart-2': 'oklch(0.65 0.20 12)',
  '--chart-3': 'oklch(0.59 0.22 12)',
  '--chart-4': 'oklch(0.50 0.20 12)',
  '--chart-5': 'oklch(0.42 0.18 12)',
  '--sidebar': 'oklch(0.21 0.006 285.885)',
  '--sidebar-foreground': 'oklch(0.85 0.005 65)',
  '--sidebar-primary': 'oklch(0.65 0.20 12)',
  '--sidebar-primary-foreground': 'oklch(0.98 0.01 12)',
  '--sidebar-accent': 'oklch(0.274 0.006 286.033)',
  '--sidebar-accent-foreground': 'oklch(0.985 0 0)',
  '--sidebar-border': 'oklch(1 0 0 / 10%)',
  '--sidebar-ring': 'oklch(0.59 0.22 12)',
};

export const foundationTheme: ThemeConfig = {
  accentColor: '#EF476F',
  appName: 'Momentum Notes',
  appIconUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/SvJskrJzbNhaoqXN.png',
  appIconSmallUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/yfyiMUqozWteWFSv.png',
  appIconLargeUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/SvJskrJzbNhaoqXN.png',
  pwaIcon192Url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/KiQVnEVDeMualGKv.png',
  pwaIcon512Url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/orQLsFHiyVWFPpEE.png',
  pwaThemeColor: '#EF476F',
  lightPalette,
  darkPalette,
};

// Alias for backward compatibility
export const FOUNDATION_THEME = foundationTheme;
