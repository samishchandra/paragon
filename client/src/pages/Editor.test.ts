/**
 * Unit Tests for Editor Page Helper Functions
 * 
 * Tests: parseBool, parseIntSafe
 * These are internal helpers used for query parameter parsing.
 * We test them by extracting the logic.
 */

import { describe, it, expect } from 'vitest';

// Re-implement the pure functions from Editor.tsx for testing
// (They are not exported, so we test the logic directly)

function parseBool(value: string | null, defaultValue: boolean): boolean {
  if (value === null) return defaultValue;
  return value !== 'false' && value !== '0';
}

function parseIntSafe(value: string | null, defaultValue: number, min: number, max: number): number {
  if (value === null) return defaultValue;
  const n = Number(value);
  if (isNaN(n)) return defaultValue;
  return Math.max(min, Math.min(max, Math.floor(n)));
}

describe('parseBool', () => {
  it('should return default value for null', () => {
    expect(parseBool(null, true)).toBe(true);
    expect(parseBool(null, false)).toBe(false);
  });

  it('should return false for "false"', () => {
    expect(parseBool('false', true)).toBe(false);
  });

  it('should return false for "0"', () => {
    expect(parseBool('0', true)).toBe(false);
  });

  it('should return true for "true"', () => {
    expect(parseBool('true', false)).toBe(true);
  });

  it('should return true for "1"', () => {
    expect(parseBool('1', false)).toBe(true);
  });

  it('should return true for any other string', () => {
    expect(parseBool('yes', false)).toBe(true);
    expect(parseBool('anything', false)).toBe(true);
    expect(parseBool('', false)).toBe(true);
  });
});

describe('parseIntSafe', () => {
  it('should return default value for null', () => {
    expect(parseIntSafe(null, 4, 1, 6)).toBe(4);
  });

  it('should parse valid integers', () => {
    expect(parseIntSafe('3', 4, 1, 6)).toBe(3);
    expect(parseIntSafe('1', 4, 1, 6)).toBe(1);
    expect(parseIntSafe('6', 4, 1, 6)).toBe(6);
  });

  it('should clamp to min', () => {
    expect(parseIntSafe('0', 4, 1, 6)).toBe(1);
    expect(parseIntSafe('-5', 4, 1, 6)).toBe(1);
  });

  it('should clamp to max', () => {
    expect(parseIntSafe('10', 4, 1, 6)).toBe(6);
    expect(parseIntSafe('100', 4, 1, 6)).toBe(6);
  });

  it('should floor decimal values', () => {
    expect(parseIntSafe('3.7', 4, 1, 6)).toBe(3);
    expect(parseIntSafe('5.9', 4, 1, 6)).toBe(5);
  });

  it('should return default for NaN', () => {
    expect(parseIntSafe('abc', 4, 1, 6)).toBe(4);
  });

  it('should clamp empty string (Number("") === 0) to min', () => {
    // Number('') === 0, which is valid but below min=1, so clamps to min
    expect(parseIntSafe('', 4, 1, 6)).toBe(1);
  });
});

/**
 * Tests for convertCheckboxListsToTaskLists
 * 
 * This function converts standard HTML checkbox lists to TipTap's taskList format.
 */
describe('convertCheckboxListsToTaskLists', () => {
  // Re-implement the function for testing (it's not exported)
  function convertCheckboxListsToTaskLists(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
    const container = doc.body.firstElementChild as HTMLElement;
    if (!container) return html;

    const processUl = (ul: HTMLUListElement) => {
      const nestedUls = Array.from(ul.querySelectorAll('ul')) as HTMLUListElement[];
      nestedUls.forEach(processUl);

      const items = Array.from(ul.children).filter(el => el.tagName === 'LI') as HTMLLIElement[];
      let hasCheckbox = false;
      let hasRegular = false;

      items.forEach(li => {
        const firstInput = li.querySelector(':scope > input[type="checkbox"]');
        if (firstInput) {
          hasCheckbox = true;
        } else {
          hasRegular = true;
        }
      });

      if (!hasCheckbox) return;

      items.forEach(li => {
        const checkbox = li.querySelector(':scope > input[type="checkbox"]');
        if (checkbox) {
          const isChecked = checkbox.hasAttribute('checked');
          li.setAttribute('data-type', 'taskItem');
          li.setAttribute('data-checked', String(isChecked));
          checkbox.remove();

          const childNodes = Array.from(li.childNodes);
          const inlineContent: Node[] = [];
          const blockContent: Node[] = [];

          childNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node as HTMLElement;
              if (el.tagName === 'UL' || el.tagName === 'OL' || el.tagName === 'P') {
                blockContent.push(node);
              } else {
                inlineContent.push(node);
              }
            } else {
              inlineContent.push(node);
            }
          });

          li.innerHTML = '';

          if (inlineContent.length > 0) {
            const p = doc.createElement('p');
            inlineContent.forEach(node => p.appendChild(node));
            if (p.firstChild && p.firstChild.nodeType === Node.TEXT_NODE) {
              p.firstChild.textContent = (p.firstChild.textContent || '').replace(/^\s+/, '');
            }
            li.appendChild(p);
          }

          blockContent.forEach(node => li.appendChild(node));
        }
      });

      if (hasCheckbox && !hasRegular) {
        ul.setAttribute('data-type', 'taskList');
      }
    };

    const topUls = Array.from(container.querySelectorAll(':scope > ul')) as HTMLUListElement[];
    topUls.forEach(processUl);

    return container.innerHTML;
  }

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
});
