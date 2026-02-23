/**
 * Tests for convertCheckboxListsToTaskLists
 * 
 * This function converts standard HTML checkbox lists to TipTap's taskList format.
 * Co-located with the source module for maintainability.
 */

import { describe, it, expect } from 'vitest';
import { convertCheckboxListsToTaskLists } from './convertCheckboxLists';

describe('convertCheckboxListsToTaskLists', () => {
  it('should convert unchecked checkbox list items to task items', () => {
    const html = '<ul><li><input type="checkbox"> Task 1</li></ul>';
    const result = convertCheckboxListsToTaskLists(html);
    expect(result).toContain('data-type="taskList"');
    expect(result).toContain('data-type="taskItem"');
    expect(result).toContain('data-checked="false"');
    expect(result).not.toContain('<input');
  });

  it('should convert checked checkbox list items to task items', () => {
    const html = '<ul><li><input type="checkbox" checked> Done task</li></ul>';
    const result = convertCheckboxListsToTaskLists(html);
    expect(result).toContain('data-checked="true"');
  });

  it('should not modify lists without checkboxes', () => {
    const html = '<ul><li>Regular item</li></ul>';
    const result = convertCheckboxListsToTaskLists(html);
    expect(result).not.toContain('data-type="taskList"');
    expect(result).not.toContain('data-type="taskItem"');
  });

  it('should handle mixed lists (checkbox + regular items)', () => {
    const html = '<ul><li><input type="checkbox"> Task</li><li>Regular</li></ul>';
    const result = convertCheckboxListsToTaskLists(html);
    // Mixed: should NOT set data-type="taskList" on the ul
    expect(result).toContain('data-type="taskItem"');
    // The ul should not have data-type="taskList" because it's mixed
    const parser = new DOMParser();
    const doc = parser.parseFromString(result, 'text/html');
    const ul = doc.querySelector('ul');
    expect(ul?.getAttribute('data-type')).not.toBe('taskList');
  });

  it('should handle empty input', () => {
    const result = convertCheckboxListsToTaskLists('');
    expect(result).toBe('');
  });

  it('should handle HTML without lists', () => {
    const html = '<p>Just a paragraph</p>';
    const result = convertCheckboxListsToTaskLists(html);
    expect(result).toContain('Just a paragraph');
  });

  it('should wrap inline content in <p> tags', () => {
    const html = '<ul><li><input type="checkbox"> Task text</li></ul>';
    const result = convertCheckboxListsToTaskLists(html);
    expect(result).toContain('<p>Task text</p>');
  });

  it('should trim leading whitespace from task text', () => {
    const html = '<ul><li><input type="checkbox">   Spaced task</li></ul>';
    const result = convertCheckboxListsToTaskLists(html);
    expect(result).toContain('Spaced task');
    // Should not have leading spaces
    const parser = new DOMParser();
    const doc = parser.parseFromString(result, 'text/html');
    const p = doc.querySelector('p');
    expect(p?.textContent?.startsWith(' ')).toBe(false);
  });

  // ============================================================
  // Checkbox inside <p> wrapper (multi-line content)
  // When marked parses task list items with continuation content
  // (images, code blocks, multiple paragraphs), it wraps the
  // checkbox inside a <p> tag instead of leaving it as a direct
  // child of <li>. The findCheckbox helper must detect these.
  // ============================================================

  it('should find checkbox inside <p> wrapper (marked multi-line output)', () => {
    // This is the exact HTML structure marked produces for:
    // - [ ] first\n    \n    ![img](url)\n- [ ] second
    const html = '<ul><li><input type="checkbox"> <p>first</p><p><img src="img.jpg"></p></li>' +
      '<li><p><input type="checkbox"> second</p></li></ul>';
    const result = convertCheckboxListsToTaskLists(html);
    expect(result).toContain('data-type="taskList"');
    // Both items should be converted to taskItems
    const matches = result.match(/data-type="taskItem"/g);
    expect(matches?.length).toBe(2);
  });

  it('should handle all checkboxes inside <p> wrappers', () => {
    // All items have checkboxes inside <p>
    const html = '<ul>' +
      '<li><p><input type="checkbox"> first</p></li>' +
      '<li><p><input type="checkbox"> second</p></li>' +
      '<li><p><input type="checkbox"> third</p></li>' +
      '</ul>';
    const result = convertCheckboxListsToTaskLists(html);
    expect(result).toContain('data-type="taskList"');
    const matches = result.match(/data-type="taskItem"/g);
    expect(matches?.length).toBe(3);
  });

  it('should preserve checked state when checkbox is inside <p>', () => {
    const html = '<ul>' +
      '<li><p><input type="checkbox" checked> done</p></li>' +
      '<li><p><input type="checkbox"> pending</p></li>' +
      '</ul>';
    const result = convertCheckboxListsToTaskLists(html);
    expect(result).toContain('data-checked="true"');
    expect(result).toContain('data-checked="false"');
  });

  it('should clean up leading whitespace after removing checkbox from <p>', () => {
    const html = '<ul><li><p><input type="checkbox">   spaced text</p></li></ul>';
    const result = convertCheckboxListsToTaskLists(html);
    expect(result).toContain('data-type="taskItem"');
    // The text should not have leading whitespace
    const parser = new DOMParser();
    const doc = parser.parseFromString(result, 'text/html');
    const p = doc.querySelector('[data-type="taskItem"] p');
    expect(p?.textContent?.startsWith(' ')).toBe(false);
  });

  it('should handle mixed direct-child and p-wrapped checkboxes', () => {
    // First item has direct checkbox, second has it inside <p>
    const html = '<ul>' +
      '<li><input type="checkbox"> direct</li>' +
      '<li><p><input type="checkbox"> wrapped</p></li>' +
      '</ul>';
    const result = convertCheckboxListsToTaskLists(html);
    expect(result).toContain('data-type="taskList"');
    const matches = result.match(/data-type="taskItem"/g);
    expect(matches?.length).toBe(2);
  });

  it('should preserve block content (images) alongside p-wrapped checkbox', () => {
    const html = '<ul>' +
      '<li><input type="checkbox"> <p>text</p><p><img src="photo.jpg" alt="photo"></p></li>' +
      '</ul>';
    const result = convertCheckboxListsToTaskLists(html);
    expect(result).toContain('data-type="taskItem"');
    expect(result).toContain('img');
    expect(result).toContain('photo.jpg');
  });

  it('should handle nested lists with p-wrapped checkboxes', () => {
    const html = '<ul>' +
      '<li><p><input type="checkbox"> parent</p>' +
      '<ul><li><input type="checkbox"> child</li></ul>' +
      '</li></ul>';
    const result = convertCheckboxListsToTaskLists(html);
    // Both parent and child should be task items
    const matches = result.match(/data-type="taskItem"/g);
    expect(matches?.length).toBeGreaterThanOrEqual(2);
  });

  it('should not convert when checkbox is deeply nested (not direct child or first-p child)', () => {
    // Checkbox inside a <div> inside <li> — should NOT be detected
    const html = '<ul><li><div><input type="checkbox"> hidden</div></li></ul>';
    const result = convertCheckboxListsToTaskLists(html);
    expect(result).not.toContain('data-type="taskList"');
  });

  it('should handle three items where middle one has continuation content', () => {
    // Simulates: - [ ] first\n- [ ] second\n\n    continuation\n\n- [ ] third
    // marked wraps the second and third items differently
    const html = '<ul>' +
      '<li><input type="checkbox"> first</li>' +
      '<li><input type="checkbox"> <p>second</p><p>continuation</p></li>' +
      '<li><p><input type="checkbox"> third</p></li>' +
      '</ul>';
    const result = convertCheckboxListsToTaskLists(html);
    expect(result).toContain('data-type="taskList"');
    const matches = result.match(/data-type="taskItem"/g);
    expect(matches?.length).toBe(3);
  });

  // ============================================================
  // REGRESSION: Empty first line in task list items
  // When marked outputs task list items where the checkbox is a
  // direct child of <li> followed by <p>-wrapped content, or the
  // checkbox is inside a <p> wrapper, removing the checkbox left
  // behind an empty <p> (or whitespace-only text node wrapped in
  // a new <p>), rendering as a blank line between the checkbox
  // and the text content.
  // ============================================================

  it('REGRESSION: should not produce empty <p> as first child when checkbox is direct child with <p>-wrapped content', () => {
    // This is the exact HTML structure marked produces for:
    // - [ ] What are changes...\n    Momentum key changes...\n\n    Are there any other things...
    // The checkbox is a direct child of <li>, followed by a space text node,
    // then <p>-wrapped content blocks.
    const html = '<ul>' +
      '<li><input type="checkbox"> ' +
      '<p>What are changes / overrides we made to local foundation files compared to <code>momentum-foundation</code>. How can we make the changes minimal and make merging easier without conflicts.<br>  Momentum key changes should be in: Hosting, Auth, Database, AI Provider, Cloud backup</p>' +
      '<p>  Are there any other things that Momentum does on top of <code>momentum-foundation</code></p>' +
      '</li></ul>';
    const result = convertCheckboxListsToTaskLists(html);
    const parser = new DOMParser();
    const doc = parser.parseFromString(result, 'text/html');
    const li = doc.querySelector('[data-type="taskItem"]');
    expect(li).not.toBeNull();
    // The first child <p> should NOT be empty
    const firstP = li!.querySelector('p');
    expect(firstP).not.toBeNull();
    expect(firstP!.textContent?.trim()).not.toBe('');
  });

  it('REGRESSION: should not produce empty <p> when checkbox is inside <p> wrapper (checked items)', () => {
    // This is the exact HTML structure marked produces for:
    // - [x] Remove the localAutoBackupModule adapter slot...
    // The checkbox is inside a <p> wrapper.
    const html = '<ul>' +
      '<li><p><input checked="" disabled="" type="checkbox"> Remove the localAutoBackupModule adapter slot \u2014 since autoBackup.ts is now generic via setBackupStorageEngine, the localAutoBackupModule indirection in useLocalBackup.ts could be simplified to always use @/lib/autoBackup directly.</p></li>' +
      '</ul>';
    const result = convertCheckboxListsToTaskLists(html);
    const parser = new DOMParser();
    const doc = parser.parseFromString(result, 'text/html');
    const li = doc.querySelector('[data-type="taskItem"]');
    expect(li).not.toBeNull();
    // Should have exactly one <p> child with the text content, no empty <p>
    const paragraphs = li!.querySelectorAll('p');
    paragraphs.forEach(p => {
      expect(p.textContent?.trim()).not.toBe('');
    });
    expect(li!.getAttribute('data-checked')).toBe('true');
  });

  it('REGRESSION: full task list with mixed unchecked/checked items and multi-paragraph content should have no empty <p> tags', () => {
    // This is the exact HTML that marked produces for the user's sample markdown:
    // - [ ] What are changes...\n    Momentum key changes...\n\n    Are there any other things...
    // - [x] Remove the localAutoBackupModule...
    // - [x] For item cards...
    const html = '<ul>' +
      '<li><input disabled="" type="checkbox"> ' +
      '<p>What are changes / overrides we made to local foundation files compared to <code>momentum-foundation</code>. How can we make the changes minimal and make merging easier without conflicts.<br>  Momentum key changes should be in: Hosting, Auth, Database, AI Provider, Cloud backup</p>' +
      '<p>  Are there any other things that Momentum does on top of <code>momentum-foundation</code></p>' +
      '</li>' +
      '<li><p><input checked="" disabled="" type="checkbox"> Remove the localAutoBackupModule adapter slot \u2014 since autoBackup.ts is now generic via setBackupStorageEngine, the localAutoBackupModule indirection in useLocalBackup.ts could be simplified to always use @/lib/autoBackup directly.</p></li>' +
      '<li><p><input checked="" disabled="" type="checkbox"> For item cards, in middle-panel the pin icon and 3-dot menu icon are shown with animation on hover. Reserve the space for icons rendering on hover so that title doesn\u2019t wrap on hover.</p></li>' +
      '</ul>';
    const result = convertCheckboxListsToTaskLists(html);
    const parser = new DOMParser();
    const doc = parser.parseFromString(result, 'text/html');

    // Should have 3 task items
    const taskItems = doc.querySelectorAll('[data-type="taskItem"]');
    expect(taskItems.length).toBe(3);

    // First item: unchecked, should have 2 non-empty <p> tags
    expect(taskItems[0].getAttribute('data-checked')).toBe('false');
    const item1Paragraphs = taskItems[0].querySelectorAll('p');
    item1Paragraphs.forEach(p => {
      expect(p.textContent?.trim()).not.toBe('');
    });
    expect(item1Paragraphs.length).toBe(2);

    // Second item: checked
    expect(taskItems[1].getAttribute('data-checked')).toBe('true');
    const item2Paragraphs = taskItems[1].querySelectorAll('p');
    item2Paragraphs.forEach(p => {
      expect(p.textContent?.trim()).not.toBe('');
    });
    expect(item2Paragraphs.length).toBe(1);

    // Third item: checked
    expect(taskItems[2].getAttribute('data-checked')).toBe('true');
    const item3Paragraphs = taskItems[2].querySelectorAll('p');
    item3Paragraphs.forEach(p => {
      expect(p.textContent?.trim()).not.toBe('');
    });
    expect(item3Paragraphs.length).toBe(1);

    // The entire ul should be a taskList
    const ul = doc.querySelector('ul');
    expect(ul?.getAttribute('data-type')).toBe('taskList');
  });
});
