/**
 * Paragon Editor - Theming System
 * 
 * This module provides a comprehensive theming system for the markdown editor.
 * Themes can be applied by setting CSS variables on the editor container.
 * 
 * DESIGN: Dark Mode Craftsman
 * Multi-layer dark theme with depth through layering
 * Glassmorphic elements with backdrop blur
 * Vibrant cyan accent for interactive elements
 */

export interface EditorTheme {
  name: string;
  description: string;
  variables: Record<string, string>;
}

// Dark theme - Default (GitHub Dark inspired)
export const darkTheme: EditorTheme = {
  name: 'dark',
  description: 'Dark theme inspired by VS Code and GitHub Dark',
  variables: {
    // Base colors
    '--editor-bg': 'oklch(0.13 0.01 250)',
    '--editor-fg': 'oklch(0.93 0.01 250)',
    '--editor-border': 'oklch(0.28 0.01 250)',
    
    // Primary accent
    '--editor-primary': 'oklch(0.7 0.15 220)',
    '--editor-primary-fg': 'oklch(0.13 0.01 250)',
    
    // Secondary
    '--editor-secondary': 'oklch(0.22 0.01 250)',
    '--editor-secondary-fg': 'oklch(0.75 0.02 250)',
    
    // Muted
    '--editor-muted': 'oklch(0.25 0.01 250)',
    '--editor-muted-fg': 'oklch(0.6 0.02 250)',
    
    // Selection
    '--editor-selection': 'oklch(0.35 0.08 220 / 0.4)',
    '--editor-cursor': 'oklch(0.7 0.15 220)',
    
    // Code block
    '--editor-code-bg': 'oklch(0.17 0.01 250)',
    '--editor-line-number': 'oklch(0.45 0.02 250)',
    
    // Callouts
    '--editor-callout-info': 'oklch(0.5 0.12 220)',
    '--editor-callout-warning': 'oklch(0.6 0.15 70)',
    '--editor-callout-error': 'oklch(0.5 0.15 25)',
    '--editor-callout-success': 'oklch(0.5 0.12 160)',
    '--editor-callout-note': 'oklch(0.5 0.12 280)',
    
    // Syntax highlighting
    '--syntax-keyword': 'oklch(0.7 0.18 320)',
    '--syntax-string': 'oklch(0.7 0.12 160)',
    '--syntax-number': 'oklch(0.75 0.12 70)',
    '--syntax-comment': 'oklch(0.5 0.02 250)',
    '--syntax-function': 'oklch(0.75 0.15 280)',
    '--syntax-variable': 'oklch(0.8 0.1 220)',
  },
};

// Light theme
export const lightTheme: EditorTheme = {
  name: 'light',
  description: 'Light theme for bright environments',
  variables: {
    // Base colors
    '--editor-bg': 'oklch(0.99 0.005 250)',
    '--editor-fg': 'oklch(0.2 0.01 250)',
    '--editor-border': 'oklch(0.88 0.01 250)',
    
    // Primary accent
    '--editor-primary': 'oklch(0.55 0.2 220)',
    '--editor-primary-fg': 'oklch(0.99 0.005 250)',
    
    // Secondary
    '--editor-secondary': 'oklch(0.95 0.01 250)',
    '--editor-secondary-fg': 'oklch(0.4 0.02 250)',
    
    // Muted
    '--editor-muted': 'oklch(0.92 0.01 250)',
    '--editor-muted-fg': 'oklch(0.5 0.02 250)',
    
    // Selection
    '--editor-selection': 'oklch(0.7 0.12 220 / 0.3)',
    '--editor-cursor': 'oklch(0.55 0.2 220)',
    
    // Code block
    '--editor-code-bg': 'oklch(0.96 0.005 250)',
    '--editor-line-number': 'oklch(0.6 0.02 250)',
    
    // Callouts
    '--editor-callout-info': 'oklch(0.6 0.15 220)',
    '--editor-callout-warning': 'oklch(0.7 0.18 70)',
    '--editor-callout-error': 'oklch(0.6 0.18 25)',
    '--editor-callout-success': 'oklch(0.6 0.15 160)',
    '--editor-callout-note': 'oklch(0.6 0.15 280)',
    
    // Syntax highlighting
    '--syntax-keyword': 'oklch(0.5 0.2 320)',
    '--syntax-string': 'oklch(0.45 0.15 160)',
    '--syntax-number': 'oklch(0.5 0.15 70)',
    '--syntax-comment': 'oklch(0.55 0.02 250)',
    '--syntax-function': 'oklch(0.5 0.18 280)',
    '--syntax-variable': 'oklch(0.45 0.12 220)',
  },
};

// Sepia theme (for reading comfort)
export const sepiaTheme: EditorTheme = {
  name: 'sepia',
  description: 'Warm sepia tones for comfortable reading',
  variables: {
    // Base colors
    '--editor-bg': 'oklch(0.95 0.02 80)',
    '--editor-fg': 'oklch(0.25 0.02 60)',
    '--editor-border': 'oklch(0.85 0.03 70)',
    
    // Primary accent
    '--editor-primary': 'oklch(0.55 0.15 50)',
    '--editor-primary-fg': 'oklch(0.98 0.01 80)',
    
    // Secondary
    '--editor-secondary': 'oklch(0.9 0.025 75)',
    '--editor-secondary-fg': 'oklch(0.4 0.02 60)',
    
    // Muted
    '--editor-muted': 'oklch(0.88 0.02 75)',
    '--editor-muted-fg': 'oklch(0.5 0.02 60)',
    
    // Selection
    '--editor-selection': 'oklch(0.7 0.1 50 / 0.3)',
    '--editor-cursor': 'oklch(0.55 0.15 50)',
    
    // Code block
    '--editor-code-bg': 'oklch(0.92 0.02 75)',
    '--editor-line-number': 'oklch(0.6 0.02 60)',
    
    // Callouts
    '--editor-callout-info': 'oklch(0.55 0.12 220)',
    '--editor-callout-warning': 'oklch(0.65 0.15 50)',
    '--editor-callout-error': 'oklch(0.55 0.15 25)',
    '--editor-callout-success': 'oklch(0.55 0.12 160)',
    '--editor-callout-note': 'oklch(0.55 0.12 280)',
    
    // Syntax highlighting
    '--syntax-keyword': 'oklch(0.5 0.15 320)',
    '--syntax-string': 'oklch(0.45 0.12 160)',
    '--syntax-number': 'oklch(0.5 0.12 50)',
    '--syntax-comment': 'oklch(0.55 0.02 60)',
    '--syntax-function': 'oklch(0.5 0.15 280)',
    '--syntax-variable': 'oklch(0.45 0.1 220)',
  },
};

// Nord theme (popular dark theme)
export const nordTheme: EditorTheme = {
  name: 'nord',
  description: 'Arctic, north-bluish color palette',
  variables: {
    // Base colors (Nord Polar Night)
    '--editor-bg': 'oklch(0.23 0.02 240)',
    '--editor-fg': 'oklch(0.9 0.01 230)',
    '--editor-border': 'oklch(0.32 0.02 240)',
    
    // Primary accent (Nord Frost)
    '--editor-primary': 'oklch(0.72 0.1 210)',
    '--editor-primary-fg': 'oklch(0.23 0.02 240)',
    
    // Secondary
    '--editor-secondary': 'oklch(0.28 0.02 240)',
    '--editor-secondary-fg': 'oklch(0.75 0.01 230)',
    
    // Muted
    '--editor-muted': 'oklch(0.35 0.02 240)',
    '--editor-muted-fg': 'oklch(0.6 0.01 230)',
    
    // Selection
    '--editor-selection': 'oklch(0.5 0.08 210 / 0.4)',
    '--editor-cursor': 'oklch(0.72 0.1 210)',
    
    // Code block
    '--editor-code-bg': 'oklch(0.26 0.02 240)',
    '--editor-line-number': 'oklch(0.5 0.01 230)',
    
    // Callouts (Nord Aurora)
    '--editor-callout-info': 'oklch(0.68 0.12 210)',
    '--editor-callout-warning': 'oklch(0.75 0.12 80)',
    '--editor-callout-error': 'oklch(0.65 0.15 15)',
    '--editor-callout-success': 'oklch(0.7 0.12 150)',
    '--editor-callout-note': 'oklch(0.7 0.1 280)',
    
    // Syntax highlighting
    '--syntax-keyword': 'oklch(0.7 0.12 280)',
    '--syntax-string': 'oklch(0.7 0.1 150)',
    '--syntax-number': 'oklch(0.75 0.1 280)',
    '--syntax-comment': 'oklch(0.55 0.01 230)',
    '--syntax-function': 'oklch(0.72 0.1 210)',
    '--syntax-variable': 'oklch(0.9 0.01 230)',
  },
};

// All available themes
export const themes: Record<string, EditorTheme> = {
  dark: darkTheme,
  light: lightTheme,
  sepia: sepiaTheme,
  nord: nordTheme,
};

/**
 * Apply a theme to an element by setting CSS variables
 */
export function applyTheme(element: HTMLElement, theme: EditorTheme): void {
  Object.entries(theme.variables).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
}

/**
 * Create a custom theme by extending an existing theme
 */
export function createCustomTheme(
  baseName: string,
  name: string,
  description: string,
  overrides: Record<string, string>
): EditorTheme {
  const baseTheme = themes[baseName] || darkTheme;
  return {
    name,
    description,
    variables: {
      ...baseTheme.variables,
      ...overrides,
    },
  };
}

export default themes;
