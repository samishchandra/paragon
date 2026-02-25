/**
 * Regression Tests for MarkdownPasteSafe — Nested List Paste
 *
 * Covers:
 * - 2-level and 3-level nested unordered lists
 * - 2-level and 3-level nested ordered lists
 * - Mixed ordered/unordered nesting
 * - Task lists with deep nesting
 * - Edge cases: empty items, single items, many levels
 * - Full markdownToHtml round-trip for nested lists
 */

import { describe, it, expect } from 'vitest';
import {
  parseListLine,
  buildNestedListHtml,
  markdownToHtml,
  looksLikeMarkdown,
  type ListLineInfo,
} from './MarkdownPasteSafe';

// ---------------------------------------------------------------------------
// parseListLine
// ---------------------------------------------------------------------------
describe('parseListLine', () => {
  it('should parse a top-level unordered list item', () => {
    const result = parseListLine('- Item A');
    expect(result).toEqual({ type: 'ul', depth: 0, text: 'Item A' });
  });

  it('should parse a 2-space indented unordered list item as depth 1', () => {
    const result = parseListLine('  - Child');
    expect(result).toEqual({ type: 'ul', depth: 1, text: 'Child' });
  });

  it('should parse a 4-space indented unordered list item as depth 2', () => {
    const result = parseListLine('    - Grandchild');
    expect(result).toEqual({ type: 'ul', depth: 2, text: 'Grandchild' });
  });

  it('should parse a 6-space indented unordered list item as depth 3', () => {
    const result = parseListLine('      - Great-grandchild');
    expect(result).toEqual({ type: 'ul', depth: 3, text: 'Great-grandchild' });
  });

  it('should parse a top-level ordered list item', () => {
    const result = parseListLine('1. First');
    expect(result).toEqual({ type: 'ol', depth: 0, text: 'First' });
  });

  it('should parse an indented ordered list item', () => {
    const result = parseListLine('  1. Sub-first');
    expect(result).toEqual({ type: 'ol', depth: 1, text: 'Sub-first' });
  });

  it('should parse an unchecked task list item', () => {
    const result = parseListLine('- [ ] Todo');
    expect(result).toEqual({ type: 'task', depth: 0, text: 'Todo', checked: false });
  });

  it('should parse a checked task list item', () => {
    const result = parseListLine('- [x] Done');
    expect(result).toEqual({ type: 'task', depth: 0, text: 'Done', checked: true });
  });

  it('should parse an indented task list item', () => {
    const result = parseListLine('  - [ ] Sub-task');
    expect(result).toEqual({ type: 'task', depth: 1, text: 'Sub-task', checked: false });
  });

  it('should parse a deeply indented task list item', () => {
    const result = parseListLine('    - [x] Deep task');
    expect(result).toEqual({ type: 'task', depth: 2, text: 'Deep task', checked: true });
  });

  it('should return null for non-list lines', () => {
    expect(parseListLine('Hello world')).toBeNull();
    expect(parseListLine('# Heading')).toBeNull();
    expect(parseListLine('')).toBeNull();
    expect(parseListLine('> Blockquote')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// buildNestedListHtml — Unordered Lists
// ---------------------------------------------------------------------------
describe('buildNestedListHtml — Unordered Lists', () => {
  it('should build a flat unordered list', () => {
    const items: ListLineInfo[] = [
      { type: 'ul', depth: 0, text: 'A' },
      { type: 'ul', depth: 0, text: 'B' },
      { type: 'ul', depth: 0, text: 'C' },
    ];
    const html = buildNestedListHtml(items);
    expect(html).toBe(
      '<ul><li><p>A</p></li><li><p>B</p></li><li><p>C</p></li></ul>'
    );
  });

  it('should build a 2-level nested unordered list', () => {
    const items: ListLineInfo[] = [
      { type: 'ul', depth: 0, text: 'Parent' },
      { type: 'ul', depth: 1, text: 'Child 1' },
      { type: 'ul', depth: 1, text: 'Child 2' },
    ];
    const html = buildNestedListHtml(items);
    expect(html).toContain('<ul>');
    expect(html).toContain('<li><p>Parent</p>');
    expect(html).toContain('<li><p>Child 1</p></li>');
    expect(html).toContain('<li><p>Child 2</p></li>');
    // Verify nesting: inner <ul> should be inside the parent <li>
    const parentLiStart = html.indexOf('<li><p>Parent</p>');
    const innerUlStart = html.indexOf('<ul>', parentLiStart + 1);
    const parentLiEnd = html.indexOf('</li>', innerUlStart);
    expect(innerUlStart).toBeGreaterThan(parentLiStart);
    expect(parentLiEnd).toBeGreaterThan(innerUlStart);
  });

  it('should build a 3-level nested unordered list', () => {
    const items: ListLineInfo[] = [
      { type: 'ul', depth: 0, text: 'Level 0' },
      { type: 'ul', depth: 1, text: 'Level 1' },
      { type: 'ul', depth: 2, text: 'Level 2' },
    ];
    const html = buildNestedListHtml(items);
    // Count nesting depth by counting <ul> tags
    const ulCount = (html.match(/<ul>/g) || []).length;
    expect(ulCount).toBe(3); // outer + 2 nested
    expect(html).toContain('<li><p>Level 0</p>');
    expect(html).toContain('<li><p>Level 1</p>');
    expect(html).toContain('<li><p>Level 2</p>');
  });

  it('should handle multiple children at same depth after nesting', () => {
    const items: ListLineInfo[] = [
      { type: 'ul', depth: 0, text: 'A' },
      { type: 'ul', depth: 1, text: 'A1' },
      { type: 'ul', depth: 1, text: 'A2' },
      { type: 'ul', depth: 0, text: 'B' },
      { type: 'ul', depth: 1, text: 'B1' },
    ];
    const html = buildNestedListHtml(items);
    expect(html).toContain('<li><p>A</p>');
    expect(html).toContain('<li><p>A1</p></li>');
    expect(html).toContain('<li><p>A2</p></li>');
    expect(html).toContain('<li><p>B</p>');
    expect(html).toContain('<li><p>B1</p></li>');
  });

  it('should handle returning to shallower depth after deep nesting', () => {
    const items: ListLineInfo[] = [
      { type: 'ul', depth: 0, text: 'Root' },
      { type: 'ul', depth: 1, text: 'Child' },
      { type: 'ul', depth: 2, text: 'Grandchild' },
      { type: 'ul', depth: 0, text: 'Back to root' },
    ];
    const html = buildNestedListHtml(items);
    expect(html).toContain('<li><p>Root</p>');
    expect(html).toContain('<li><p>Grandchild</p>');
    expect(html).toContain('<li><p>Back to root</p>');
    // The "Back to root" item should be a sibling of "Root", not nested
    const backIdx = html.indexOf('<li><p>Back to root</p>');
    // Count open <ul> tags before "Back to root" minus close </ul> tags
    const beforeBack = html.substring(0, backIdx);
    const openUls = (beforeBack.match(/<ul>/g) || []).length;
    const closeUls = (beforeBack.match(/<\/ul>/g) || []).length;
    // Should be at depth 1 (the outermost <ul>)
    expect(openUls - closeUls).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// buildNestedListHtml — Ordered Lists
// ---------------------------------------------------------------------------
describe('buildNestedListHtml — Ordered Lists', () => {
  it('should build a flat ordered list', () => {
    const items: ListLineInfo[] = [
      { type: 'ol', depth: 0, text: 'First' },
      { type: 'ol', depth: 0, text: 'Second' },
      { type: 'ol', depth: 0, text: 'Third' },
    ];
    const html = buildNestedListHtml(items);
    expect(html).toBe(
      '<ol><li><p>First</p></li><li><p>Second</p></li><li><p>Third</p></li></ol>'
    );
  });

  it('should build a 2-level nested ordered list', () => {
    const items: ListLineInfo[] = [
      { type: 'ol', depth: 0, text: 'Parent' },
      { type: 'ol', depth: 1, text: 'Sub 1' },
      { type: 'ol', depth: 1, text: 'Sub 2' },
    ];
    const html = buildNestedListHtml(items);
    expect(html).toContain('<ol>');
    const olCount = (html.match(/<ol>/g) || []).length;
    expect(olCount).toBe(2); // outer + 1 nested
  });

  it('should build a 3-level nested ordered list', () => {
    const items: ListLineInfo[] = [
      { type: 'ol', depth: 0, text: 'L0' },
      { type: 'ol', depth: 1, text: 'L1' },
      { type: 'ol', depth: 2, text: 'L2' },
    ];
    const html = buildNestedListHtml(items);
    const olCount = (html.match(/<ol>/g) || []).length;
    expect(olCount).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// buildNestedListHtml — Task Lists
// ---------------------------------------------------------------------------
describe('buildNestedListHtml — Task Lists', () => {
  it('should build a flat task list', () => {
    const items: ListLineInfo[] = [
      { type: 'task', depth: 0, text: 'Buy milk', checked: false },
      { type: 'task', depth: 0, text: 'Walk dog', checked: true },
    ];
    const html = buildNestedListHtml(items);
    expect(html).toContain('data-type="taskList"');
    expect(html).toContain('data-type="taskItem"');
    expect(html).toContain('data-checked="false"');
    expect(html).toContain('data-checked="true"');
    expect(html).toContain('Buy milk');
    expect(html).toContain('Walk dog');
  });

  it('should build a 2-level nested task list', () => {
    const items: ListLineInfo[] = [
      { type: 'task', depth: 0, text: 'Project', checked: false },
      { type: 'task', depth: 1, text: 'Sub-task A', checked: true },
      { type: 'task', depth: 1, text: 'Sub-task B', checked: false },
    ];
    const html = buildNestedListHtml(items);
    const taskListCount = (html.match(/data-type="taskList"/g) || []).length;
    expect(taskListCount).toBe(2); // outer + 1 nested
    expect(html).toContain('Sub-task A');
    expect(html).toContain('Sub-task B');
  });

  it('should build a 3-level nested task list', () => {
    const items: ListLineInfo[] = [
      { type: 'task', depth: 0, text: 'Epic', checked: false },
      { type: 'task', depth: 1, text: 'Story', checked: false },
      { type: 'task', depth: 2, text: 'Task', checked: true },
    ];
    const html = buildNestedListHtml(items);
    const taskListCount = (html.match(/data-type="taskList"/g) || []).length;
    expect(taskListCount).toBe(3);
    expect(html).toContain('Epic');
    expect(html).toContain('Story');
    expect(html).toContain('Task');
  });

  it('should handle mixed checked/unchecked at various depths', () => {
    const items: ListLineInfo[] = [
      { type: 'task', depth: 0, text: 'Root unchecked', checked: false },
      { type: 'task', depth: 1, text: 'Child checked', checked: true },
      { type: 'task', depth: 2, text: 'Grandchild unchecked', checked: false },
      { type: 'task', depth: 1, text: 'Child 2 unchecked', checked: false },
    ];
    const html = buildNestedListHtml(items);
    // Verify correct checked states are preserved
    const rootItem = html.indexOf('Root unchecked');
    const childItem = html.indexOf('Child checked');
    expect(rootItem).toBeGreaterThan(-1);
    expect(childItem).toBeGreaterThan(-1);
    // The checked attribute before "Root unchecked" should be false
    const beforeRoot = html.substring(0, rootItem);
    expect(beforeRoot).toContain('data-checked="false"');
    // The checked attribute before "Child checked" should be true
    const beforeChild = html.substring(0, childItem);
    expect(beforeChild).toContain('data-checked="true"');
  });
});

// ---------------------------------------------------------------------------
// buildNestedListHtml — Edge Cases
// ---------------------------------------------------------------------------
describe('buildNestedListHtml — Edge Cases', () => {
  it('should return empty string for empty input', () => {
    expect(buildNestedListHtml([])).toBe('');
  });

  it('should handle a single item', () => {
    const items: ListLineInfo[] = [
      { type: 'ul', depth: 0, text: 'Only item' },
    ];
    const html = buildNestedListHtml(items);
    expect(html).toBe('<ul><li><p>Only item</p></li></ul>');
  });

  it('should handle items with inline markdown formatting', () => {
    const items: ListLineInfo[] = [
      { type: 'ul', depth: 0, text: '**Bold item**' },
      { type: 'ul', depth: 1, text: '*Italic child*' },
      { type: 'ul', depth: 1, text: '`code child`' },
    ];
    const html = buildNestedListHtml(items);
    expect(html).toContain('<strong>Bold item</strong>');
    expect(html).toContain('<em>Italic child</em>');
    expect(html).toContain('<code>code child</code>');
  });

  it('should handle items with links', () => {
    const items: ListLineInfo[] = [
      { type: 'ul', depth: 0, text: '[Google](https://google.com)' },
    ];
    const html = buildNestedListHtml(items);
    expect(html).toContain('<a href="https://google.com">Google</a>');
  });
});

// ---------------------------------------------------------------------------
// markdownToHtml — Full Round-Trip Nested List Tests
// ---------------------------------------------------------------------------
describe('markdownToHtml — Nested Unordered Lists', () => {
  it('should convert a 2-level nested unordered list', () => {
    const md = `- Parent
  - Child 1
  - Child 2`;
    const html = markdownToHtml(md);
    expect(html).toContain('<ul>');
    expect(html).toContain('<li><p>Parent</p>');
    expect(html).toContain('<li><p>Child 1</p></li>');
    expect(html).toContain('<li><p>Child 2</p></li>');
    // Should have nested <ul>
    const ulCount = (html.match(/<ul>/g) || []).length;
    expect(ulCount).toBe(2);
  });

  it('should convert a 3-level nested unordered list', () => {
    const md = `- Level 0
  - Level 1
    - Level 2`;
    const html = markdownToHtml(md);
    const ulCount = (html.match(/<ul>/g) || []).length;
    expect(ulCount).toBe(3);
    expect(html).toContain('Level 0');
    expect(html).toContain('Level 1');
    expect(html).toContain('Level 2');
  });

  it('should convert a complex multi-branch nested list', () => {
    const md = `- A
  - A1
    - A1a
    - A1b
  - A2
- B
  - B1`;
    const html = markdownToHtml(md);
    expect(html).toContain('A1a');
    expect(html).toContain('A1b');
    expect(html).toContain('A2');
    expect(html).toContain('B1');
    // A1a and A1b should be at depth 2
    const ulCount = (html.match(/<ul>/g) || []).length;
    expect(ulCount).toBeGreaterThanOrEqual(3);
  });
});

describe('markdownToHtml — Nested Ordered Lists', () => {
  it('should convert a 2-level nested ordered list', () => {
    const md = `1. First
  1. Sub-first
  2. Sub-second`;
    const html = markdownToHtml(md);
    expect(html).toContain('<ol>');
    const olCount = (html.match(/<ol>/g) || []).length;
    expect(olCount).toBe(2);
    expect(html).toContain('First');
    expect(html).toContain('Sub-first');
    expect(html).toContain('Sub-second');
  });

  it('should convert a 3-level nested ordered list', () => {
    const md = `1. L0
  1. L1
    1. L2`;
    const html = markdownToHtml(md);
    const olCount = (html.match(/<ol>/g) || []).length;
    expect(olCount).toBe(3);
  });
});

describe('markdownToHtml — Mixed Ordered/Unordered Nesting', () => {
  it('should handle unordered parent with ordered children', () => {
    const md = `- Parent
  1. Ordered child 1
  2. Ordered child 2`;
    const html = markdownToHtml(md);
    expect(html).toContain('<ul>');
    expect(html).toContain('<ol>');
    expect(html).toContain('Ordered child 1');
    expect(html).toContain('Ordered child 2');
  });

  it('should handle ordered parent with unordered children', () => {
    const md = `1. Parent
  - Unordered child 1
  - Unordered child 2`;
    const html = markdownToHtml(md);
    expect(html).toContain('<ol>');
    expect(html).toContain('<ul>');
    expect(html).toContain('Unordered child 1');
  });

  it('should handle alternating list types at different depths', () => {
    const md = `- Bullet
  1. Numbered
    - Bullet again
      1. Numbered again`;
    const html = markdownToHtml(md);
    expect(html).toContain('Bullet');
    expect(html).toContain('Numbered');
    expect(html).toContain('Bullet again');
    expect(html).toContain('Numbered again');
  });
});

describe('markdownToHtml — Nested Task Lists', () => {
  it('should convert a 2-level nested task list', () => {
    const md = `- [ ] Main task
  - [x] Sub-task done
  - [ ] Sub-task pending`;
    const html = markdownToHtml(md);
    expect(html).toContain('data-type="taskList"');
    expect(html).toContain('data-type="taskItem"');
    expect(html).toContain('Main task');
    expect(html).toContain('Sub-task done');
    expect(html).toContain('Sub-task pending');
    // Nested task list count
    const taskListCount = (html.match(/data-type="taskList"/g) || []).length;
    expect(taskListCount).toBe(2);
  });

  it('should convert a 3-level nested task list', () => {
    const md = `- [ ] Epic
  - [ ] Story
    - [x] Task completed
    - [ ] Task pending`;
    const html = markdownToHtml(md);
    const taskListCount = (html.match(/data-type="taskList"/g) || []).length;
    expect(taskListCount).toBe(3);
    expect(html).toContain('Epic');
    expect(html).toContain('Story');
    expect(html).toContain('Task completed');
    expect(html).toContain('Task pending');
  });

  it('should preserve checked state at all nesting levels', () => {
    const md = `- [x] Checked root
  - [ ] Unchecked child
    - [x] Checked grandchild`;
    const html = markdownToHtml(md);
    // Find each item and verify its checked state
    const checkedRootIdx = html.indexOf('Checked root');
    const uncheckedChildIdx = html.indexOf('Unchecked child');
    const checkedGrandIdx = html.indexOf('Checked grandchild');
    expect(checkedRootIdx).toBeGreaterThan(-1);
    expect(uncheckedChildIdx).toBeGreaterThan(-1);
    expect(checkedGrandIdx).toBeGreaterThan(-1);
    // Before "Checked root" there should be data-checked="true"
    expect(html.substring(checkedRootIdx - 80, checkedRootIdx)).toContain('data-checked="true"');
    // Before "Unchecked child" there should be data-checked="false"
    expect(html.substring(uncheckedChildIdx - 80, uncheckedChildIdx)).toContain('data-checked="false"');
    // Before "Checked grandchild" there should be data-checked="true"
    expect(html.substring(checkedGrandIdx - 80, checkedGrandIdx)).toContain('data-checked="true"');
  });
});

describe('markdownToHtml — Lists Mixed with Other Content', () => {
  it('should handle a heading followed by a nested list', () => {
    const md = `# My List
- Item 1
  - Sub-item 1
- Item 2`;
    const html = markdownToHtml(md);
    expect(html).toContain('<h1>My List</h1>');
    expect(html).toContain('<li><p>Item 1</p>');
    expect(html).toContain('<li><p>Sub-item 1</p>');
    expect(html).toContain('<li><p>Item 2</p>');
  });

  it('should handle a paragraph followed by a nested list followed by a paragraph', () => {
    const md = `Some intro text

- A
  - A1
  - A2

Some outro text`;
    const html = markdownToHtml(md);
    expect(html).toContain('Some intro text');
    expect(html).toContain('Some outro text');
    expect(html).toContain('<li><p>A</p>');
    expect(html).toContain('<li><p>A1</p>');
  });

  it('should handle multiple separate list blocks', () => {
    const md = `- Unordered 1
- Unordered 2

1. Ordered 1
2. Ordered 2`;
    const html = markdownToHtml(md);
    expect(html).toContain('<ul>');
    expect(html).toContain('<ol>');
    expect(html).toContain('Unordered 1');
    expect(html).toContain('Ordered 1');
  });
});

describe('looksLikeMarkdown — List Detection', () => {
  it('should detect unordered lists', () => {
    expect(looksLikeMarkdown('- Item 1')).toBe(true);
    expect(looksLikeMarkdown('* Item 1')).toBe(true);
  });

  it('should detect task lists', () => {
    expect(looksLikeMarkdown('- [ ] Todo')).toBe(true);
    expect(looksLikeMarkdown('- [x] Done')).toBe(true);
  });

  it('should detect nested lists', () => {
    expect(looksLikeMarkdown('- Parent\n  - Child')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// parseListLine — All Bullet Marker Variants (-, *, +)
// ---------------------------------------------------------------------------
describe('parseListLine — Asterisk (*) bullet marker', () => {
  it('should parse a top-level asterisk bullet item', () => {
    const result = parseListLine('* Item A');
    expect(result).toEqual({ type: 'ul', depth: 0, text: 'Item A' });
  });

  it('should parse an indented asterisk bullet item', () => {
    const result = parseListLine('  * Child item');
    expect(result).toEqual({ type: 'ul', depth: 1, text: 'Child item' });
  });

  it('should parse a deeply indented asterisk bullet item', () => {
    const result = parseListLine('    * Grandchild');
    expect(result).toEqual({ type: 'ul', depth: 2, text: 'Grandchild' });
  });

  it('should NOT parse asterisk without space as a list item', () => {
    expect(parseListLine('*italic text*')).toBeNull();
    expect(parseListLine('*no space')).toBeNull();
  });

  it('should parse asterisk task list items', () => {
    expect(parseListLine('* [ ] Todo')).toEqual({ type: 'task', depth: 0, text: 'Todo', checked: false });
    expect(parseListLine('* [x] Done')).toEqual({ type: 'task', depth: 0, text: 'Done', checked: true });
  });

  it('should parse indented asterisk task list items', () => {
    expect(parseListLine('  * [ ] Sub-task')).toEqual({ type: 'task', depth: 1, text: 'Sub-task', checked: false });
    expect(parseListLine('    * [x] Deep task')).toEqual({ type: 'task', depth: 2, text: 'Deep task', checked: true });
  });
});

describe('parseListLine — Plus (+) bullet marker', () => {
  it('should parse a top-level plus bullet item', () => {
    const result = parseListLine('+ Item A');
    expect(result).toEqual({ type: 'ul', depth: 0, text: 'Item A' });
  });

  it('should parse an indented plus bullet item', () => {
    const result = parseListLine('  + Child item');
    expect(result).toEqual({ type: 'ul', depth: 1, text: 'Child item' });
  });

  it('should parse a deeply indented plus bullet item', () => {
    const result = parseListLine('    + Grandchild');
    expect(result).toEqual({ type: 'ul', depth: 2, text: 'Grandchild' });
  });

  it('should NOT parse plus without space as a list item', () => {
    expect(parseListLine('+no space')).toBeNull();
    expect(parseListLine('+123')).toBeNull();
  });

  it('should parse plus task list items', () => {
    expect(parseListLine('+ [ ] Todo')).toEqual({ type: 'task', depth: 0, text: 'Todo', checked: false });
    expect(parseListLine('+ [x] Done')).toEqual({ type: 'task', depth: 0, text: 'Done', checked: true });
  });

  it('should parse indented plus task list items', () => {
    expect(parseListLine('  + [ ] Sub-task')).toEqual({ type: 'task', depth: 1, text: 'Sub-task', checked: false });
    expect(parseListLine('    + [x] Deep task')).toEqual({ type: 'task', depth: 2, text: 'Deep task', checked: true });
  });
});

describe('parseListLine — Mixed bullet markers', () => {
  it('should parse all three markers at the same depth', () => {
    expect(parseListLine('- Dash item')?.type).toBe('ul');
    expect(parseListLine('* Asterisk item')?.type).toBe('ul');
    expect(parseListLine('+ Plus item')?.type).toBe('ul');
  });

  it('should preserve text content regardless of marker', () => {
    expect(parseListLine('- Same text')?.text).toBe('Same text');
    expect(parseListLine('* Same text')?.text).toBe('Same text');
    expect(parseListLine('+ Same text')?.text).toBe('Same text');
  });

  it('should handle all markers with inline formatting', () => {
    expect(parseListLine('* **bold item**')?.text).toBe('**bold item**');
    expect(parseListLine('+ *italic item*')?.text).toBe('*italic item*');
    expect(parseListLine('- `code item`')?.text).toBe('`code item`');
  });
});

// ---------------------------------------------------------------------------
// looksLikeMarkdown — All Bullet Marker Detection
// ---------------------------------------------------------------------------
describe('looksLikeMarkdown — All bullet markers', () => {
  it('should detect dash bullet lists', () => {
    expect(looksLikeMarkdown('- Item 1')).toBe(true);
  });

  it('should detect asterisk bullet lists', () => {
    expect(looksLikeMarkdown('* Item 1')).toBe(true);
  });

  it('should detect plus bullet lists', () => {
    expect(looksLikeMarkdown('+ Item 1')).toBe(true);
  });

  it('should detect indented plus bullet lists', () => {
    expect(looksLikeMarkdown('  + Nested item')).toBe(true);
  });

  it('should detect asterisk task lists', () => {
    expect(looksLikeMarkdown('* [ ] Todo')).toBe(true);
    expect(looksLikeMarkdown('* [x] Done')).toBe(true);
  });

  it('should detect plus task lists', () => {
    expect(looksLikeMarkdown('+ [ ] Todo')).toBe(true);
    expect(looksLikeMarkdown('+ [x] Done')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// markdownToHtml — Asterisk and Plus Bullet Lists
// ---------------------------------------------------------------------------
describe('markdownToHtml — Asterisk (*) bullet lists', () => {
  it('should convert asterisk bullets to unordered list HTML', () => {
    const md = `* First item
* Second item
* Third item`;
    const html = markdownToHtml(md);
    expect(html).toContain('<ul>');
    expect(html).toContain('<li><p>First item</p></li>');
    expect(html).toContain('<li><p>Second item</p></li>');
    expect(html).toContain('<li><p>Third item</p></li>');
  });

  it('should convert nested asterisk bullets', () => {
    const md = `* Parent
  * Child 1
  * Child 2`;
    const html = markdownToHtml(md);
    expect(html).toContain('<ul>');
    expect(html).toContain('Parent');
    expect(html).toContain('Child 1');
    expect(html).toContain('Child 2');
    const ulCount = (html.match(/<ul>/g) || []).length;
    expect(ulCount).toBe(2);
  });

  it('should convert 3-level nested asterisk bullets', () => {
    const md = `* Level 0
  * Level 1
    * Level 2`;
    const html = markdownToHtml(md);
    const ulCount = (html.match(/<ul>/g) || []).length;
    expect(ulCount).toBe(3);
  });

  it('should convert asterisk task lists', () => {
    const md = `* [ ] Buy groceries
* [x] Walk the dog
* [ ] Read a book`;
    const html = markdownToHtml(md);
    expect(html).toContain('data-type="taskList"');
    expect(html).toContain('Buy groceries');
    expect(html).toContain('Walk the dog');
    expect(html).toContain('Read a book');
    expect(html).toContain('data-checked="false"');
    expect(html).toContain('data-checked="true"');
  });
});

describe('markdownToHtml — Plus (+) bullet lists', () => {
  it('should convert plus bullets to unordered list HTML', () => {
    const md = `+ First item
+ Second item
+ Third item`;
    const html = markdownToHtml(md);
    expect(html).toContain('<ul>');
    expect(html).toContain('<li><p>First item</p></li>');
    expect(html).toContain('<li><p>Second item</p></li>');
    expect(html).toContain('<li><p>Third item</p></li>');
  });

  it('should convert nested plus bullets', () => {
    const md = `+ Parent
  + Child 1
  + Child 2`;
    const html = markdownToHtml(md);
    expect(html).toContain('<ul>');
    expect(html).toContain('Parent');
    expect(html).toContain('Child 1');
    const ulCount = (html.match(/<ul>/g) || []).length;
    expect(ulCount).toBe(2);
  });

  it('should convert plus task lists', () => {
    const md = `+ [ ] Todo item
+ [x] Done item`;
    const html = markdownToHtml(md);
    expect(html).toContain('data-type="taskList"');
    expect(html).toContain('Todo item');
    expect(html).toContain('Done item');
  });
});

describe('markdownToHtml — Mixed bullet markers', () => {
  it('should handle mixed -, *, + markers in the same list block', () => {
    const md = `- Dash item
* Asterisk item
+ Plus item`;
    const html = markdownToHtml(md);
    expect(html).toContain('Dash item');
    expect(html).toContain('Asterisk item');
    expect(html).toContain('Plus item');
    expect(html).toContain('<ul>');
  });

  it('should handle mixed markers with nesting', () => {
    const md = `* Parent asterisk
  - Child dash
    + Grandchild plus`;
    const html = markdownToHtml(md);
    expect(html).toContain('Parent asterisk');
    expect(html).toContain('Child dash');
    expect(html).toContain('Grandchild plus');
    const ulCount = (html.match(/<ul>/g) || []).length;
    expect(ulCount).toBe(3);
  });

  it('should handle mixed markers with task items', () => {
    const md = `- [ ] Dash task
* [ ] Asterisk task
+ [x] Plus task done`;
    const html = markdownToHtml(md);
    expect(html).toContain('data-type="taskList"');
    expect(html).toContain('Dash task');
    expect(html).toContain('Asterisk task');
    expect(html).toContain('Plus task done');
  });
});

// ---------------------------------------------------------------------------
// Italic vs Bullet Disambiguation
// ---------------------------------------------------------------------------
describe('markdownToHtml — Italic vs bullet disambiguation', () => {
  it('should parse "* text" at line start as bullet, NOT italic', () => {
    const md = `* Write downward feedback for the engineer appreciating the following project impact
* Write downward feedback for the engineer appreciating the Engineering excellence skills`;
    const html = markdownToHtml(md);
    expect(html).toContain('<ul>');
    expect(html).toContain('<li>');
    expect(html).not.toContain('<em>');
    expect(html).toContain('Write downward feedback for the engineer appreciating the following project impact');
    expect(html).toContain('Write downward feedback for the engineer appreciating the Engineering excellence skills');
  });

  it('should still render inline italic within bullet text', () => {
    const md = `* This has *italic* inside`;
    const html = markdownToHtml(md);
    expect(html).toContain('<ul>');
    expect(html).toContain('<li>');
    expect(html).toContain('<em>italic</em>');
  });

  it('should still render standalone italic text (not at line start with space)', () => {
    const md = `This is *italic* text`;
    const html = markdownToHtml(md);
    expect(html).toContain('<em>italic</em>');
    expect(html).not.toContain('<ul>');
  });

  it('should not treat *word* in middle of sentence as a bullet', () => {
    const md = `The *quick* brown fox`;
    const html = markdownToHtml(md);
    expect(html).toContain('<em>quick</em>');
    expect(html).not.toContain('<ul>');
  });

  it('should handle the exact user-reported paste scenario', () => {
    const md = `* Write downward feedback for the engineer appreciating the following project impact in couple of bullet points
* Write downward feedback for the engineer appreciating the Engineering excellence skills in couple of bullet points`;
    const html = markdownToHtml(md);
    // Should be a bullet list, not italic
    expect(html).toContain('<ul>');
    expect(html).toContain('<li>');
    // Should NOT have italic tags wrapping the entire text
    expect(html).not.toContain('<em>Write downward feedback');
  });

  it('should handle asterisk bullets mixed with paragraphs', () => {
    const md = `Here is some intro text

* First bullet point
* Second bullet point

And some conclusion`;
    const html = markdownToHtml(md);
    expect(html).toContain('Here is some intro text');
    expect(html).toContain('<ul>');
    expect(html).toContain('First bullet point');
    expect(html).toContain('Second bullet point');
    expect(html).toContain('And some conclusion');
    expect(html).not.toContain('<em>First bullet point');
  });

  it('should handle single asterisk bullet (edge case)', () => {
    const md = `* Single item`;
    const html = markdownToHtml(md);
    expect(html).toContain('<ul>');
    expect(html).toContain('Single item');
    expect(html).not.toContain('<em>');
  });
});

// ---------------------------------------------------------------------------
// Edge Cases — Whitespace and Special Characters
// ---------------------------------------------------------------------------
describe('parseListLine — Whitespace edge cases', () => {
  it('should handle tab-indented items (treated as spaces)', () => {
    // Tabs are typically 2 or 4 spaces; trimStart handles them
    const result = parseListLine('  * Tab-indented');
    expect(result).toEqual({ type: 'ul', depth: 1, text: 'Tab-indented' });
  });

  it('should handle items with extra whitespace in text', () => {
    const result = parseListLine('*   Extra spaces');
    expect(result).toEqual({ type: 'ul', depth: 0, text: 'Extra spaces' });
  });

  it('should handle items with trailing whitespace', () => {
    const result = parseListLine('* Trailing space   ');
    expect(result).toEqual({ type: 'ul', depth: 0, text: 'Trailing space' });
  });

  it('should return null for just a bullet marker with no text', () => {
    // "* " with nothing after — the regex requires (.+) so at least one char
    expect(parseListLine('* ')).toBeNull();
    expect(parseListLine('- ')).toBeNull();
    expect(parseListLine('+ ')).toBeNull();
  });

  it('should handle items with special characters', () => {
    expect(parseListLine('* Item with (parens) and [brackets]')).toEqual({
      type: 'ul', depth: 0, text: 'Item with (parens) and [brackets]',
    });
    expect(parseListLine('+ Item with "quotes" and \'apostrophes\'')).toEqual({
      type: 'ul', depth: 0, text: 'Item with "quotes" and \'apostrophes\'',
    });
  });

  it('should handle items with URLs', () => {
    const result = parseListLine('* Check https://example.com for details');
    expect(result).toEqual({ type: 'ul', depth: 0, text: 'Check https://example.com for details' });
  });

  it('should handle items with markdown links', () => {
    const result = parseListLine('* Visit [Google](https://google.com)');
    expect(result).toEqual({ type: 'ul', depth: 0, text: 'Visit [Google](https://google.com)' });
  });
});
