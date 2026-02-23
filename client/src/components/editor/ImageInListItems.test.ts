/**
 * Integration tests for images inside list items — verifies that
 * convertCheckboxListsToTaskLists correctly handles images in task items.
 *
 * Note: structureImagesInListItems unit tests have been moved to
 * utils/structureImagesInListItems.test.ts (co-located with source).
 */
import { describe, it, expect } from 'vitest';
import { convertCheckboxListsToTaskLists } from './utils';

describe('convertCheckboxListsToTaskLists with images', () => {
  it('should treat IMG as block content in task items', () => {
    const input = '<ul><li><input disabled="" type="checkbox"> <img src="https://example.com/img.jpg" alt="test" data-align="left" width="132"></li></ul>';
    const result = convertCheckboxListsToTaskLists(input);
    expect(result).toContain('data-type="taskItem"');
    expect(result).toContain('<figure class="image-resizer"');
    // Image should be inside a <figure>, not directly inside a <p>
    expect(result).toMatch(/<figure[^>]*>\s*<img/);
    expect(result).not.toMatch(/<p>[^<]*<img/);
  });

  it('should handle task item with text and nested image', () => {
    const input = '<ul><li><input disabled="" type="checkbox"> First bullet<ul><li><input disabled="" type="checkbox"> <img src="https://example.com/img.jpg" alt="test" data-align="left" width="132"></li></ul></li></ul>';
    const result = convertCheckboxListsToTaskLists(input);
    expect(result).toContain('data-type="taskList"');
    // Both items should be task items
    const taskItems = result.match(/data-type="taskItem"/g);
    expect(taskItems?.length).toBe(2);
    // The nested item should have the image in a figure
    expect(result).toContain('<figure class="image-resizer"');
  });

  it('should preserve text before image in task items', () => {
    const input = '<ul><li><input disabled="" type="checkbox"> Some text <img src="https://example.com/img.jpg" alt="test"></li></ul>';
    const result = convertCheckboxListsToTaskLists(input);
    expect(result).toContain('Some text');
    expect(result).toContain('<figure class="image-resizer"');
  });
});
