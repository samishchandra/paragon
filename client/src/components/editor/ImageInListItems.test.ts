/**
 * Tests for images inside list items — verifies the markdown→HTML parsing
 * and HTML→markdown serialization pipelines handle images correctly.
 *
 * Covers:
 * - Nested bullet list with image child
 * - Nested task list with image child
 * - Image as continuation content in a bullet list item
 * - structureImagesInListItems post-processing
 * - convertCheckboxListsToTaskLists with images
 */
import { describe, it, expect } from 'vitest';
import { structureImagesInListItems } from './utils/structureImagesInListItems';
import { convertCheckboxListsToTaskLists } from './utils/convertCheckboxLists';

describe('Images inside list items', () => {
  describe('structureImagesInListItems', () => {
    it('should wrap bare <img> inside <li> with <figure>', () => {
      const input = '<ul><li><img src="https://example.com/img.jpg" alt="test" data-align="left" width="132"></li></ul>';
      const result = structureImagesInListItems(input);
      expect(result).toContain('<figure class="image-resizer"');
      expect(result).toContain('<img src="https://example.com/img.jpg"');
      expect(result).not.toContain('<li><img'); // img should not be bare inside li
    });

    it('should separate text and image in same <li>', () => {
      const input = '<ul><li>First bullet<img src="https://example.com/img.jpg" alt="test" data-align="left" width="132"></li></ul>';
      const result = structureImagesInListItems(input);
      expect(result).toContain('<p>First bullet</p>');
      expect(result).toContain('<figure class="image-resizer"');
    });

    it('should handle nested bullet with image', () => {
      const input = '<ul><li>First bullet<ul><li><img src="https://example.com/img.jpg" alt="test" data-align="left" width="132"></li></ul></li></ul>';
      const result = structureImagesInListItems(input);
      // The nested li should have the image wrapped in figure
      expect(result).toContain('<figure class="image-resizer"');
    });

    it('should extract image from <p> inside <li>', () => {
      const input = '<ul><li><p>First bullet</p><p><img src="https://example.com/img.jpg" alt="test" data-align="left" width="132"></p></li></ul>';
      const result = structureImagesInListItems(input);
      expect(result).toContain('<p>First bullet</p>');
      expect(result).toContain('<figure class="image-resizer"');
      // Image should not be inside a <p> anymore
      expect(result).not.toContain('<p><img');
    });

    it('should preserve existing <figure> wrappers', () => {
      const input = '<ul><li><p>Text</p><figure class="image-resizer"><img src="https://example.com/img.jpg" alt="test"></figure></li></ul>';
      const result = structureImagesInListItems(input);
      expect(result).toContain('<figure class="image-resizer"');
      expect(result).toContain('<p>Text</p>');
    });

    it('should not modify list items without images', () => {
      const input = '<ul><li>Just text</li><li>More text</li></ul>';
      const result = structureImagesInListItems(input);
      expect(result).toBe(input);
    });

    it('should skip task items (handled by convertCheckboxListsToTaskLists)', () => {
      const input = '<ul data-type="taskList"><li data-type="taskItem" data-checked="false"><p>Task</p><img src="https://example.com/img.jpg" alt="test"></li></ul>';
      const result = structureImagesInListItems(input);
      // Task items should be left unchanged
      expect(result).toBe(input);
    });

    it('should handle center-aligned images', () => {
      const input = '<ul><li><img src="https://example.com/img.jpg" alt="test" data-align="center" width="200"></li></ul>';
      const result = structureImagesInListItems(input);
      expect(result).toContain('margin-left: auto; margin-right: auto;');
    });

    it('should handle right-aligned images', () => {
      const input = '<ul><li><img src="https://example.com/img.jpg" alt="test" data-align="right" width="200"></li></ul>';
      const result = structureImagesInListItems(input);
      expect(result).toContain('margin-left: auto;');
    });

    it('should handle mixed text and image in <p>', () => {
      const input = '<ul><li><p>Before <img src="https://example.com/img.jpg" alt="test" data-align="left"> After</p></li></ul>';
      const result = structureImagesInListItems(input);
      expect(result).toContain('<figure class="image-resizer"');
      // Text before and after should be preserved
      expect(result).toContain('Before');
      expect(result).toContain('After');
    });
  });

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
});
