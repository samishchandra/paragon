/**
 * Unit Tests for Editor Themes
 * 
 * Tests: theme definitions, applyTheme, createCustomTheme
 */

import { describe, it, expect } from 'vitest';
import {
  themes,
  darkTheme,
  lightTheme,
  sepiaTheme,
  nordTheme,
  applyTheme,
  createCustomTheme,
  type EditorTheme,
} from './index';

describe('Theme Definitions', () => {
  const requiredVariables = [
    '--editor-bg',
    '--editor-fg',
    '--editor-border',
    '--editor-primary',
    '--editor-primary-fg',
    '--editor-secondary',
    '--editor-secondary-fg',
    '--editor-muted',
    '--editor-muted-fg',
    '--editor-selection',
    '--editor-cursor',
    '--editor-code-bg',
    '--editor-line-number',
  ];

  const allThemes: [string, EditorTheme][] = [
    ['dark', darkTheme],
    ['light', lightTheme],
    ['sepia', sepiaTheme],
    ['nord', nordTheme],
  ];

  it('should export all four themes', () => {
    expect(Object.keys(themes)).toHaveLength(4);
    expect(themes.dark).toBeDefined();
    expect(themes.light).toBeDefined();
    expect(themes.sepia).toBeDefined();
    expect(themes.nord).toBeDefined();
  });

  it.each(allThemes)('theme "%s" should have a name and description', (name, theme) => {
    expect(theme.name).toBe(name);
    expect(theme.description).toBeTruthy();
    expect(typeof theme.description).toBe('string');
  });

  it.each(allThemes)('theme "%s" should have all required CSS variables', (name, theme) => {
    for (const variable of requiredVariables) {
      expect(theme.variables).toHaveProperty(variable);
      expect(typeof theme.variables[variable]).toBe('string');
      expect(theme.variables[variable].length).toBeGreaterThan(0);
    }
  });

  it.each(allThemes)('theme "%s" should have syntax highlighting variables', (name, theme) => {
    const syntaxVars = [
      '--syntax-keyword',
      '--syntax-string',
      '--syntax-number',
      '--syntax-comment',
      '--syntax-function',
      '--syntax-variable',
    ];
    for (const variable of syntaxVars) {
      expect(theme.variables).toHaveProperty(variable);
    }
  });

  it.each(allThemes)('theme "%s" should have callout variables', (name, theme) => {
    const calloutVars = [
      '--editor-callout-info',
      '--editor-callout-warning',
      '--editor-callout-error',
      '--editor-callout-success',
      '--editor-callout-note',
    ];
    for (const variable of calloutVars) {
      expect(theme.variables).toHaveProperty(variable);
    }
  });

  it.each(allThemes)('theme "%s" should use oklch color format', (name, theme) => {
    for (const [key, value] of Object.entries(theme.variables)) {
      expect(value).toMatch(/oklch/);
    }
  });
});

describe('applyTheme', () => {
  it('should set CSS variables on the element', () => {
    const element = document.createElement('div');
    applyTheme(element, darkTheme);

    expect(element.style.getPropertyValue('--editor-bg')).toBe(darkTheme.variables['--editor-bg']);
    expect(element.style.getPropertyValue('--editor-fg')).toBe(darkTheme.variables['--editor-fg']);
  });

  it('should apply all theme variables', () => {
    const element = document.createElement('div');
    applyTheme(element, lightTheme);

    for (const [key, value] of Object.entries(lightTheme.variables)) {
      expect(element.style.getPropertyValue(key)).toBe(value);
    }
  });

  it('should override previous theme variables', () => {
    const element = document.createElement('div');
    applyTheme(element, darkTheme);
    applyTheme(element, lightTheme);

    expect(element.style.getPropertyValue('--editor-bg')).toBe(lightTheme.variables['--editor-bg']);
  });
});

describe('createCustomTheme', () => {
  it('should create a theme extending the base theme', () => {
    const custom = createCustomTheme('dark', 'custom-dark', 'Custom dark theme', {
      '--editor-bg': 'oklch(0.1 0.01 250)',
    });

    expect(custom.name).toBe('custom-dark');
    expect(custom.description).toBe('Custom dark theme');
    expect(custom.variables['--editor-bg']).toBe('oklch(0.1 0.01 250)');
    // Other variables should come from the base
    expect(custom.variables['--editor-fg']).toBe(darkTheme.variables['--editor-fg']);
  });

  it('should fall back to dark theme for unknown base', () => {
    const custom = createCustomTheme('nonexistent', 'test', 'Test', {});
    expect(custom.variables['--editor-bg']).toBe(darkTheme.variables['--editor-bg']);
  });

  it('should not modify the original theme', () => {
    const originalBg = darkTheme.variables['--editor-bg'];
    createCustomTheme('dark', 'custom', 'Custom', {
      '--editor-bg': 'oklch(0 0 0)',
    });
    expect(darkTheme.variables['--editor-bg']).toBe(originalBg);
  });

  it('should allow overriding multiple variables', () => {
    const overrides = {
      '--editor-bg': 'oklch(0.1 0 0)',
      '--editor-fg': 'oklch(0.9 0 0)',
      '--editor-primary': 'oklch(0.5 0.2 120)',
    };
    const custom = createCustomTheme('light', 'green', 'Green theme', overrides);

    for (const [key, value] of Object.entries(overrides)) {
      expect(custom.variables[key]).toBe(value);
    }
  });
});
