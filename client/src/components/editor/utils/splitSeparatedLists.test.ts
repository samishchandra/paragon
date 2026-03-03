/**
 * Tests for splitSeparatedLists
 * 
 * This function pre-processes markdown to split consecutive list blocks
 * separated by blank lines into truly separate lists by inserting
 * <!-- list-break --> markers.
 * 
 * Co-located with the source module for maintainability.
 */

import { describe, it, expect } from 'vitest';
import { splitSeparatedLists } from './splitSeparatedLists';

describe('splitSeparatedLists', () => {
  // ============================================================
  // Basic behavior — no modification needed
  // ============================================================

  it('should return unchanged markdown when there are no lists', () => {
    const md = '# Hello\n\nSome paragraph text.\n\nAnother paragraph.';
    expect(splitSeparatedLists(md)).toBe(md);
  });

  it('should return unchanged markdown for a single contiguous bullet list', () => {
    const md = '- item 1\n- item 2\n- item 3';
    expect(splitSeparatedLists(md)).toBe(md);
  });

  it('should return unchanged markdown for a single contiguous task list', () => {
    const md = '- [ ] task 1\n- [x] task 2\n- [ ] task 3';
    expect(splitSeparatedLists(md)).toBe(md);
  });

  it('should return unchanged markdown for a single contiguous ordered list', () => {
    const md = '1. first\n2. second\n3. third';
    expect(splitSeparatedLists(md)).toBe(md);
  });

  it('should handle empty input', () => {
    expect(splitSeparatedLists('')).toBe('');
  });

  // ============================================================
  // Splitting same-type lists separated by blank lines
  // ============================================================

  it('should insert list-break between two bullet lists separated by a blank line', () => {
    const md = '- item A\n\n- item B';
    const result = splitSeparatedLists(md);
    expect(result).toContain('<!-- list-break -->');
    expect(result).toContain('- item A');
    expect(result).toContain('- item B');
  });

  it('should insert list-break between two task lists separated by a blank line', () => {
    const md = '- [ ] task A\n\n- [x] task B';
    const result = splitSeparatedLists(md);
    expect(result).toContain('<!-- list-break -->');
  });

  it('should insert list-break between two ordered lists separated by a blank line', () => {
    const md = '1. first\n\n1. second';
    const result = splitSeparatedLists(md);
    expect(result).toContain('<!-- list-break -->');
  });

  it('should handle multiple blank lines between lists', () => {
    const md = '- item A\n\n\n- item B';
    const result = splitSeparatedLists(md);
    expect(result).toContain('<!-- list-break -->');
  });

  // ============================================================
  // Splitting different-type lists separated by blank lines
  // ============================================================

  it('should insert list-break between bullet and task list', () => {
    const md = '- bullet item\n\n- [ ] task item';
    const result = splitSeparatedLists(md);
    expect(result).toContain('<!-- list-break -->');
  });

  it('should insert list-break between task and bullet list', () => {
    const md = '- [ ] task item\n\n- bullet item';
    const result = splitSeparatedLists(md);
    expect(result).toContain('<!-- list-break -->');
  });

  it('should insert list-break between ordered and bullet list', () => {
    const md = '1. ordered item\n\n- bullet item';
    const result = splitSeparatedLists(md);
    expect(result).toContain('<!-- list-break -->');
  });

  it('should insert list-break between bullet and ordered list', () => {
    const md = '- bullet item\n\n1. ordered item';
    const result = splitSeparatedLists(md);
    expect(result).toContain('<!-- list-break -->');
  });

  // ============================================================
  // Multiple separations in a single document
  // ============================================================

  it('should handle three separate lists', () => {
    const md = '- list 1\n\n- list 2\n\n- list 3';
    const result = splitSeparatedLists(md);
    const breaks = result.match(/<!-- list-break -->/g);
    expect(breaks?.length).toBe(2);
  });

  it('should handle mixed list types across multiple separations', () => {
    const md = '- bullet\n\n- [ ] task\n\n1. ordered';
    const result = splitSeparatedLists(md);
    const breaks = result.match(/<!-- list-break -->/g);
    expect(breaks?.length).toBe(2);
  });

  // ============================================================
  // Continuation lines (indented content)
  // ============================================================

  it('should not split when blank line is between list item and its continuation', () => {
    // A list item with continuation content after a blank line,
    // followed by another list item without a blank line separator
    const md = '- item 1\n  continuation\n- item 2';
    const result = splitSeparatedLists(md);
    expect(result).not.toContain('<!-- list-break -->');
  });

  it('should handle list items with continuation lines before the blank separator', () => {
    const md = '- item 1\n  continuation of item 1\n\n- item 2';
    const result = splitSeparatedLists(md);
    expect(result).toContain('<!-- list-break -->');
  });

  // ============================================================
  // Nested lists — should NOT be split
  // ============================================================

  it('should not insert list-break for nested bullet list with blank line (turndown output)', () => {
    // Turndown produces blank lines between parent and indented child items
    const md = '-   something\n    \n    -   [www.greatgoing.com](http://www.greatgoing.com)';
    const result = splitSeparatedLists(md);
    expect(result).not.toContain('<!-- list-break -->');
    expect(result).toBe(md);
  });

  it('should not insert list-break for nested list with link (4-space indent)', () => {
    const md = '-   parent item\n    \n    -   [link text](http://example.com)';
    const result = splitSeparatedLists(md);
    expect(result).not.toContain('<!-- list-break -->');
  });

  it('should not insert list-break for nested list without blank line', () => {
    const md = '-   parent\n    -   child';
    const result = splitSeparatedLists(md);
    expect(result).not.toContain('<!-- list-break -->');
    expect(result).toBe(md);
  });

  it('should not insert list-break for deeply nested list items with blank lines', () => {
    // 3-level nesting with blank lines between levels
    const md = '-   level 1\n    \n    -   level 2\n        \n        -   level 3';
    const result = splitSeparatedLists(md);
    expect(result).not.toContain('<!-- list-break -->');
  });

  it('should not insert list-break for nested ordered list inside bullet list', () => {
    const md = '-   parent bullet\n    \n    1.  nested ordered item';
    const result = splitSeparatedLists(md);
    expect(result).not.toContain('<!-- list-break -->');
  });

  it('should not insert list-break for nested task list inside bullet list', () => {
    const md = '-   parent bullet\n    \n    - [ ] nested task';
    const result = splitSeparatedLists(md);
    expect(result).not.toContain('<!-- list-break -->');
  });

  it('should still insert list-break for same-indent lists separated by blank line', () => {
    // Two top-level lists separated by a blank line should still be split
    const md = '-   list A item\n\n-   list B item';
    const result = splitSeparatedLists(md);
    expect(result).toContain('<!-- list-break -->');
  });

  it('should handle mixed: nested child preserved but sibling lists split', () => {
    // Parent with nested child, then blank line, then a new top-level list
    const md = '-   parent\n    -   child\n\n-   separate list';
    const result = splitSeparatedLists(md);
    // Should split between the nested list block and the separate list
    expect(result).toContain('<!-- list-break -->');
    // The break should appear before "- separate list", not before "- child"
    const lines = result.split('\n');
    const breakIndex = lines.findIndex(l => l.includes('<!-- list-break -->'));
    const separateIndex = lines.findIndex(l => l.trim() === '-   separate list');
    expect(breakIndex).toBeLessThan(separateIndex);
  });

  // ============================================================
  // Code fences — should not be modified
  // ============================================================

  it('should not insert list-break inside code fences', () => {
    const md = '```\n- item A\n\n- item B\n```';
    const result = splitSeparatedLists(md);
    expect(result).not.toContain('<!-- list-break -->');
  });

  it('should handle code fence followed by a real list separation', () => {
    const md = '```\n- inside code\n```\n\n- real list A\n\n- real list B';
    const result = splitSeparatedLists(md);
    // Should only have one list-break (between the two real lists)
    const breaks = result.match(/<!-- list-break -->/g);
    expect(breaks?.length).toBe(1);
  });

  // ============================================================
  // Different bullet markers
  // ============================================================

  it('should handle * bullet markers', () => {
    const md = '* item A\n\n* item B';
    const result = splitSeparatedLists(md);
    expect(result).toContain('<!-- list-break -->');
  });

  it('should handle + bullet markers', () => {
    const md = '+ item A\n\n+ item B';
    const result = splitSeparatedLists(md);
    expect(result).toContain('<!-- list-break -->');
  });

  it('should handle task lists with * marker', () => {
    const md = '* [ ] task A\n\n* [x] task B';
    const result = splitSeparatedLists(md);
    expect(result).toContain('<!-- list-break -->');
  });

  // ============================================================
  // Edge cases
  // ============================================================

  it('should not split a list followed by a non-list line after blank', () => {
    const md = '- item 1\n\nJust a paragraph';
    const result = splitSeparatedLists(md);
    expect(result).not.toContain('<!-- list-break -->');
  });

  it('should not split when non-list content precedes a list after blank', () => {
    const md = 'A paragraph\n\n- item 1';
    const result = splitSeparatedLists(md);
    expect(result).not.toContain('<!-- list-break -->');
  });

  it('should handle zero-width space as blank line', () => {
    const md = '- item A\n\u200B\n- item B';
    const result = splitSeparatedLists(md);
    expect(result).toContain('<!-- list-break -->');
  });

  it('should preserve all original content in the output', () => {
    const md = '# Title\n\n- item A\n\n- item B\n\nSome text\n\n1. ordered';
    const result = splitSeparatedLists(md);
    expect(result).toContain('# Title');
    expect(result).toContain('- item A');
    expect(result).toContain('- item B');
    expect(result).toContain('Some text');
    expect(result).toContain('1. ordered');
  });
});
