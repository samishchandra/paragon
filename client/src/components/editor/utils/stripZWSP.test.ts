/**
 * Unit tests for stripZWSP utility.
 *
 * stripZWSP removes zero-width space characters (U+200B) from markdown text
 * before exposing it to consumers. It must:
 * 1. Convert ZWSP-only lines to empty lines (preserving blank line structure)
 * 2. Remove ZWSP characters embedded within content
 * 3. Not alter any other characters or whitespace
 */
import { describe, it, expect } from 'vitest';
import { stripZWSP } from './stripZWSP';

describe('stripZWSP', () => {
  describe('basic behavior', () => {
    it('should return empty string unchanged', () => {
      expect(stripZWSP('')).toBe('');
    });

    it('should return plain text unchanged', () => {
      expect(stripZWSP('hello world')).toBe('hello world');
    });

    it('should return markdown without ZWSP unchanged', () => {
      const md = '# Title\n\nSome **bold** text.\n\n- item 1\n- item 2';
      expect(stripZWSP(md)).toBe(md);
    });
  });

  describe('ZWSP-only lines → empty lines', () => {
    it('should convert a standalone ZWSP line to an empty line', () => {
      expect(stripZWSP('\u200B')).toBe('');
    });

    it('should convert ZWSP line between paragraphs to empty line', () => {
      const input = 'paragraph one\n\n\u200B\n\nparagraph two';
      const expected = 'paragraph one\n\n\n\nparagraph two';
      expect(stripZWSP(input)).toBe(expected);
    });

    it('should convert ZWSP line with leading spaces to empty line', () => {
      const input = 'line one\n\n  \u200B\n\nline two';
      const expected = 'line one\n\n\n\nline two';
      expect(stripZWSP(input)).toBe(expected);
    });

    it('should convert ZWSP line with leading tab to empty line', () => {
      const input = 'line one\n\n\t\u200B\n\nline two';
      const expected = 'line one\n\n\n\nline two';
      expect(stripZWSP(input)).toBe(expected);
    });

    it('should convert ZWSP line with trailing spaces to empty line', () => {
      const input = 'line one\n\n\u200B  \n\nline two';
      const expected = 'line one\n\n\n\nline two';
      expect(stripZWSP(input)).toBe(expected);
    });

    it('should handle multiple ZWSP-only lines', () => {
      const input = 'a\n\n\u200B\n\nb\n\n\u200B\n\nc';
      const expected = 'a\n\n\n\nb\n\n\n\nc';
      expect(stripZWSP(input)).toBe(expected);
    });

    it('should handle consecutive ZWSP-only lines', () => {
      const input = 'a\n\u200B\n\u200B\nb';
      const expected = 'a\n\n\nb';
      expect(stripZWSP(input)).toBe(expected);
    });
  });

  describe('ZWSP within content → removed', () => {
    it('should remove ZWSP at the start of a line with text', () => {
      expect(stripZWSP('\u200Bhello')).toBe('hello');
    });

    it('should remove ZWSP at the end of a line with text', () => {
      expect(stripZWSP('hello\u200B')).toBe('hello');
    });

    it('should remove ZWSP in the middle of text', () => {
      expect(stripZWSP('hel\u200Blo')).toBe('hello');
    });

    it('should remove multiple ZWSP characters within one line', () => {
      expect(stripZWSP('\u200Ba\u200Bb\u200Bc\u200B')).toBe('abc');
    });

    it('should remove ZWSP from list item content', () => {
      const input = '-   \u200B\n-   item';
      const expected = '-   \n-   item';
      expect(stripZWSP(input)).toBe(expected);
    });

    it('should remove ZWSP from task list empty items', () => {
      const input = '-   [ ] \u200B\n-   [x] done';
      const expected = '-   [ ] \n-   [x] done';
      expect(stripZWSP(input)).toBe(expected);
    });
  });

  describe('preserves other whitespace and characters', () => {
    it('should not affect regular spaces', () => {
      const input = '  indented  text  ';
      expect(stripZWSP(input)).toBe(input);
    });

    it('should not affect tabs', () => {
      const input = '\tindented\ttext';
      expect(stripZWSP(input)).toBe(input);
    });

    it('should not affect newlines', () => {
      const input = 'line1\nline2\n\nline3';
      expect(stripZWSP(input)).toBe(input);
    });

    it('should not affect non-breaking spaces (U+00A0)', () => {
      const input = 'hello\u00A0world';
      expect(stripZWSP(input)).toBe(input);
    });

    it('should not affect other Unicode characters', () => {
      const input = '日本語テスト émojis 🎉';
      expect(stripZWSP(input)).toBe(input);
    });

    it('should preserve code block content (except ZWSP)', () => {
      const input = '```\nconst x = 1;\n```';
      expect(stripZWSP(input)).toBe(input);
    });
  });

  describe('real-world Turndown output patterns', () => {
    it('should clean blank line preservation pattern: \\n\\n\\u200B\\n\\n', () => {
      const input = '# Title\n\n\u200B\n\nParagraph after blank line.';
      const expected = '# Title\n\n\n\nParagraph after blank line.';
      expect(stripZWSP(input)).toBe(expected);
    });

    it('should clean empty task list item pattern', () => {
      const input = '-   [ ] \u200B\n-   [ ] second task\n-   [x] completed';
      const expected = '-   [ ] \n-   [ ] second task\n-   [x] completed';
      expect(stripZWSP(input)).toBe(expected);
    });

    it('should clean mixed blank lines and content ZWSP', () => {
      const input = 'text\n\n\u200B\n\n-   \u200B\n-   item\n\n\u200B\n\nmore text';
      const expected = 'text\n\n\n\n-   \n-   item\n\n\n\nmore text';
      expect(stripZWSP(input)).toBe(expected);
    });

    it('should handle list with blank line between items (Turndown output)', () => {
      const input = '-   something\n-   finding\n\n\u200B\n\nwonderful\nfine\n\n\u200B\n\n-   great\n-   second';
      const expected = '-   something\n-   finding\n\n\n\nwonderful\nfine\n\n\n\n-   great\n-   second';
      expect(stripZWSP(input)).toBe(expected);
    });
  });
});
