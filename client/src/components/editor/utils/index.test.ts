/**
 * Barrel file verification tests for utils/index.ts
 *
 * Ensures all expected public functions and types are re-exported from
 * the barrel file. If a new utility is added but not re-exported, these
 * tests will fail as a reminder to update index.ts.
 */
import { describe, it, expect } from 'vitest';
import * as utils from './index';

describe('utils barrel file (index.ts)', () => {
  describe('function exports', () => {
    const expectedFunctions = [
      // convertCheckboxLists.ts
      'convertCheckboxListsToTaskLists',
      // splitSeparatedLists.ts
      'splitSeparatedLists',
      // structureImagesInListItems.ts
      'structureImagesInListItems',
      // restoreHeaderColumn.ts
      'restoreHeaderColumn',
      // insertHorizontalRule.ts
      'insertHorizontalRuleClean',
      // markdownPipeline.ts
      'preprocessMarkdown',
      'postprocessHtml',
      'markdownToHtml',
      'reconstructTableCells',
      'inlineMarkdownToHtml',
      'imgToFigure',
      'lineToBlocks',
      'parseListLine',
      'buildNestedListHtml',
    ];

    it.each(expectedFunctions)('should export %s as a function', (name) => {
      expect(utils).toHaveProperty(name);
      expect(typeof (utils as Record<string, unknown>)[name]).toBe('function');
    });

    it('should export exactly the expected number of functions', () => {
      const exportedFunctions = Object.entries(utils).filter(
        ([, value]) => typeof value === 'function',
      );
      expect(exportedFunctions.length).toBe(expectedFunctions.length);
    });
  });

  describe('completeness check', () => {
    it('should not have any unexpected exports beyond functions and types', () => {
      // Types are erased at runtime, so we only check runtime exports
      const allExports = Object.keys(utils);
      const expectedFunctionNames = [
        'convertCheckboxListsToTaskLists',
        'splitSeparatedLists',
        'structureImagesInListItems',
        'restoreHeaderColumn',
        'insertHorizontalRuleClean',
        'preprocessMarkdown',
        'postprocessHtml',
        'markdownToHtml',
        'reconstructTableCells',
        'inlineMarkdownToHtml',
        'imgToFigure',
        'lineToBlocks',
        'parseListLine',
        'buildNestedListHtml',
      ];
      // Every export should be in our expected list
      for (const key of allExports) {
        expect(expectedFunctionNames).toContain(key);
      }
    });
  });
});
