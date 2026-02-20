/**
 * Editor font configuration — maps font keys to CSS font-family values
 * and Google Fonts URLs for dynamic loading.
 */

export interface FontConfig {
  /** CSS font-family value */
  family: string;
  /** Google Fonts URL (null for system/built-in fonts) */
  googleFontsUrl: string | null;
}

const FONT_MAP: Record<string, FontConfig> = {
  system: {
    family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    googleFontsUrl: null,
  },
  inter: {
    family: '"Inter", sans-serif',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  },
  georgia: {
    family: '"Georgia", serif',
    googleFontsUrl: null,
  },
  merriweather: {
    family: '"Merriweather", serif',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap',
  },
  lora: {
    family: '"Lora", serif',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap',
  },
  'source-sans': {
    family: '"Source Sans 3", sans-serif',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&display=swap',
  },
  'jetbrains-mono': {
    family: '"JetBrains Mono", monospace',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap',
  },
  'fira-code': {
    family: '"Fira Code", monospace',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap',
  },
  'ibm-plex-sans': {
    family: '"IBM Plex Sans", sans-serif',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap',
  },
  nunito: {
    family: '"Nunito", sans-serif',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap',
  },
  'open-sans': {
    family: '"Open Sans", sans-serif',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap',
  },
  roboto: {
    family: '"Roboto", sans-serif',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
  },
};

/** Get font config for a given key. Falls back to system. */
export function getFontConfig(key: string): FontConfig {
  return FONT_MAP[key] || FONT_MAP.system;
}

/** Loaded font URLs tracker to avoid duplicate <link> tags */
const loadedFonts = new Set<string>();

/**
 * Dynamically load a Google Font by injecting a <link> element.
 * No-op if the font is already loaded or doesn't need Google Fonts.
 */
export function loadGoogleFont(key: string): void {
  const config = getFontConfig(key);
  if (!config.googleFontsUrl) return;
  if (loadedFonts.has(config.googleFontsUrl)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = config.googleFontsUrl;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
  loadedFonts.add(config.googleFontsUrl);
}
