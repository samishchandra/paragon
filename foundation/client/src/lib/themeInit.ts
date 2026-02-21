/**
 * themeInit.ts — Applies ThemeConfig CSS variables to the document root.
 *
 * Called once at app startup from main.tsx, after configureAdapters().
 * This allows each embedding repo to define its own accent color, chart colors, etc.
 * without modifying the shared index.css.
 */
import { getThemeConfig } from '@/adapters/registry';

/**
 * Apply the theme's CSS variable overrides to :root and .dark.
 * Also updates the <meta name="theme-color"> tag for PWA.
 */
export function applyTheme(): void {
  const theme = getThemeConfig();
  const root = document.documentElement;

  // Apply light theme variables to :root
  if (theme.lightCssVariables) {
    for (const [key, value] of Object.entries(theme.lightCssVariables)) {
      root.style.setProperty(key, value);
    }
  }

  // Apply dark theme variables via a <style> tag
  if (theme.darkCssVariables) {
    let darkStyleEl = document.getElementById('theme-dark-overrides');
    if (!darkStyleEl) {
      darkStyleEl = document.createElement('style');
      darkStyleEl.id = 'theme-dark-overrides';
      document.head.appendChild(darkStyleEl);
    }
    const darkVars = Object.entries(theme.darkCssVariables)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n');
    darkStyleEl.textContent = `.dark {\n${darkVars}\n}`;
  }

  // Update PWA theme-color meta tag
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme.pwaThemeColor);
  }

  // Update document title
  if (theme.appName) {
    document.title = theme.appName;
  }

  // Update favicon dynamically from theme icon
  const faviconUrl = theme.appIconSmallUrl || theme.appIconUrl;
  if (faviconUrl) {
    let faviconLink = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.rel = 'icon';
      document.head.appendChild(faviconLink);
    }
    faviconLink.href = faviconUrl;
    faviconLink.type = 'image/png';

    // Also set apple-touch-icon
    let appleTouchIcon = document.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]');
    if (!appleTouchIcon) {
      appleTouchIcon = document.createElement('link');
      appleTouchIcon.rel = 'apple-touch-icon';
      document.head.appendChild(appleTouchIcon);
    }
    appleTouchIcon.href = theme.pwaIcon192Url || theme.appIconUrl;
  }
}
