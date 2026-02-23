/**
 * Barrel file verification tests for hooks/index.ts
 *
 * Ensures all expected public hooks and types are re-exported from
 * the barrel file. If a new hook is added but not re-exported, these
 * tests will fail as a reminder to update index.ts.
 */
import { describe, it, expect } from 'vitest';
import * as hooks from './index';

describe('hooks barrel file (index.ts)', () => {
  describe('hook exports', () => {
    const expectedHooks = [
      // useAutoSave.ts
      'useAutoSave',
      // useEditorAPI.ts
      'useEditorAPI',
      // useEditorExtensions.ts
      'useEditorExtensions',
      // useEditorInstance.ts
      'useEditorInstance',
      // useEditorKeyboardShortcuts.ts
      'useEditorKeyboardShortcuts',
      // useGlobalEditorAPI.ts
      'useGlobalEditorAPI',
      // useHandleModeSwitch.ts
      'useHandleModeSwitch',
      // useTurndownService.ts
      'useTurndownService',
      // useWordCount.ts
      'useWordCount',
    ];

    it.each(expectedHooks)('should export %s as a function', (name) => {
      expect(hooks).toHaveProperty(name);
      expect(typeof (hooks as Record<string, unknown>)[name]).toBe('function');
    });

    it('should export exactly the expected number of hooks', () => {
      const hookNames = Object.keys(hooks).filter(
        (key) => typeof (hooks as Record<string, unknown>)[key] === 'function'
      );
      expect(hookNames.length).toBe(expectedHooks.length);
    });
  });

  describe('completeness check', () => {
    it('should have all 9 hooks available', () => {
      const hookNames = Object.keys(hooks).filter(
        (key) => typeof (hooks as Record<string, unknown>)[key] === 'function'
      );
      expect(hookNames).toHaveLength(9);
    });

    it('should not have any unexpected non-function exports', () => {
      // All exports should be functions (hooks) — types are erased at runtime
      const allKeys = Object.keys(hooks);
      allKeys.forEach((key) => {
        expect(typeof (hooks as Record<string, unknown>)[key]).toBe('function');
      });
    });
  });
});
