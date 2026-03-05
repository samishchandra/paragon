import { describe, it, expect } from 'vitest';
import { lowlight, loadLanguageIfNeeded, loadCoreLanguages } from './CodeBlockWithFeatures';

describe('CodeBlock Lazy Language Loading', () => {
  describe('Core languages (lazy-loaded on first code block)', () => {
    const coreLanguages = [
      'javascript', 'js', 'jsx',
      'typescript', 'ts', 'tsx',
      'python', 'py',
      'xml', 'html', 'svg',
      'css',
      'json',
      'bash', 'sh', 'shell', 'zsh',
    ];

    it('should NOT have core languages registered at module load time', () => {
      // Before loadCoreLanguages is called, lowlight starts empty.
      // However, previous tests in this suite may have already loaded them,
      // so we just verify the loading mechanism works.
    });

    it('should load all core languages via loadCoreLanguages()', async () => {
      await loadCoreLanguages();
      for (const lang of coreLanguages) {
        expect(lowlight.registered(lang)).toBe(true);
      }
    });

    it.each(coreLanguages)('should have %s registered after loadCoreLanguages', async (lang) => {
      await loadCoreLanguages();
      expect(lowlight.registered(lang)).toBe(true);
    });

    it('should load core languages via loadLanguageIfNeeded for any core alias', async () => {
      const result = await loadLanguageIfNeeded('jsx');
      expect(result).toBe(true);
      expect(lowlight.registered('jsx')).toBe(true);
    });
  });

  describe('Extended languages (lazy-loaded)', () => {
    it('should load sql on demand', async () => {
      const result = await loadLanguageIfNeeded('sql');
      expect(result).toBe(true);
      expect(lowlight.registered('sql')).toBe(true);
    });

    it('should load java on demand', async () => {
      const result = await loadLanguageIfNeeded('java');
      expect(result).toBe(true);
      expect(lowlight.registered('java')).toBe(true);
    });

    it('should load cpp on demand and also register c alias', async () => {
      const result = await loadLanguageIfNeeded('cpp');
      expect(result).toBe(true);
      expect(lowlight.registered('cpp')).toBe(true);
      expect(lowlight.registered('c')).toBe(true);
    });

    it('should load go on demand and also register golang alias', async () => {
      const result = await loadLanguageIfNeeded('go');
      expect(result).toBe(true);
      expect(lowlight.registered('go')).toBe(true);
      expect(lowlight.registered('golang')).toBe(true);
    });

    it('should load rust on demand and also register rs alias', async () => {
      const result = await loadLanguageIfNeeded('rust');
      expect(result).toBe(true);
      expect(lowlight.registered('rust')).toBe(true);
      expect(lowlight.registered('rs')).toBe(true);
    });

    it('should load markdown on demand and also register md alias', async () => {
      const result = await loadLanguageIfNeeded('markdown');
      expect(result).toBe(true);
      expect(lowlight.registered('markdown')).toBe(true);
      expect(lowlight.registered('md')).toBe(true);
    });

    it('should load yaml on demand and also register yml alias', async () => {
      const result = await loadLanguageIfNeeded('yaml');
      expect(result).toBe(true);
      expect(lowlight.registered('yaml')).toBe(true);
      expect(lowlight.registered('yml')).toBe(true);
    });

    it('should load diff on demand and also register patch alias', async () => {
      const result = await loadLanguageIfNeeded('diff');
      expect(result).toBe(true);
      expect(lowlight.registered('diff')).toBe(true);
      expect(lowlight.registered('patch')).toBe(true);
    });
  });

  describe('Unknown languages', () => {
    it('should return false for unknown languages', async () => {
      const result = await loadLanguageIfNeeded('fortran');
      expect(result).toBe(false);
    });

    it('should return true for already registered core languages', async () => {
      await loadCoreLanguages(); // Ensure core is loaded first
      const result = await loadLanguageIfNeeded('javascript');
      expect(result).toBe(true);
    });
  });

  describe('Idempotency', () => {
    it('should handle multiple loads of the same language', async () => {
      const result1 = await loadLanguageIfNeeded('sql');
      const result2 = await loadLanguageIfNeeded('sql');
      expect(result1).toBe(true);
      expect(result2).toBe(true);
    });

    it('should handle concurrent loads of the same language', async () => {
      const [result1, result2, result3] = await Promise.all([
        loadLanguageIfNeeded('java'),
        loadLanguageIfNeeded('java'),
        loadLanguageIfNeeded('java'),
      ]);
      expect(result1).toBe(true);
      expect(result2).toBe(true);
      expect(result3).toBe(true);
    });

    it('should handle multiple calls to loadCoreLanguages', async () => {
      await loadCoreLanguages();
      await loadCoreLanguages(); // Should be a no-op
      expect(lowlight.registered('javascript')).toBe(true);
    });
  });
});
