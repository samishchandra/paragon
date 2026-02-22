/**
 * Tests for newline preservation in markdown content.
 *
 * With breaks:true in marked.parse, single newlines should be converted to <br> tags,
 * which TipTap renders as hardBreak nodes. This ensures continuation lines in list items
 * and paragraphs are preserved visually.
 */
import { describe, it, expect } from 'vitest';
import { marked } from 'marked';

describe('Newline Preservation (breaks:true)', () => {
  describe('List items with continuation lines', () => {
    it('should convert newlines in list items to <br> tags', () => {
      const md = '- first\n  great\n  fine\n- second';
      const html = marked.parse(md, { breaks: true, async: false }) as string;
      expect(html).toContain('first<br>great<br>fine');
      expect(html).toContain('<li>second</li>');
    });

    it('should handle single continuation line', () => {
      const md = '- first\n  continued\n- second';
      const html = marked.parse(md, { breaks: true, async: false }) as string;
      expect(html).toContain('first<br>continued');
    });

    it('should handle multiple list items with continuations', () => {
      const md = '- first\n  line2\n- second\n  line2b\n- third';
      const html = marked.parse(md, { breaks: true, async: false }) as string;
      expect(html).toContain('first<br>line2');
      expect(html).toContain('second<br>line2b');
    });

    it('should handle ordered list continuation lines', () => {
      const md = '1. first\n   great\n   fine\n2. second';
      const html = marked.parse(md, { breaks: true, async: false }) as string;
      expect(html).toContain('first<br>great<br>fine');
    });

    it('should handle task list continuation lines', () => {
      const md = '- [ ] first\n  great\n  fine\n- [ ] second';
      const html = marked.parse(md, { breaks: true, async: false }) as string;
      expect(html).toContain('first<br>great<br>fine');
    });
  });

  describe('Paragraphs with continuation lines', () => {
    it('should convert newlines in paragraphs to <br> tags', () => {
      const md = 'line one\nline two\nline three';
      const html = marked.parse(md, { breaks: true, async: false }) as string;
      expect(html).toContain('line one<br>line two<br>line three');
    });

    it('should still separate paragraphs with double newlines', () => {
      const md = 'paragraph one\n\nparagraph two';
      const html = marked.parse(md, { breaks: true, async: false }) as string;
      expect(html).toContain('<p>paragraph one</p>');
      expect(html).toContain('<p>paragraph two</p>');
    });
  });

  describe('Blockquotes with continuation lines', () => {
    it('should convert newlines in blockquotes to <br> tags', () => {
      const md = '> line one\n> line two';
      const html = marked.parse(md, { breaks: true, async: false }) as string;
      expect(html).toContain('line one<br>line two');
    });
  });

  describe('Round-trip: trailing double-space format', () => {
    it('should produce <br> from trailing double-space even without breaks:true', () => {
      // Turndown outputs trailing double-space for br tags
      const md = '-   first  \n    great  \n    fine\n-   second';
      const html = marked.parse(md, { async: false }) as string;
      expect(html).toContain('first<br>great<br>fine');
    });

    it('should also work with breaks:true on turndown output', () => {
      const md = '-   first  \n    great  \n    fine\n-   second';
      const html = marked.parse(md, { breaks: true, async: false }) as string;
      expect(html).toContain('first<br>great<br>fine');
    });
  });

  describe('Code blocks should NOT be affected', () => {
    it('should not add <br> inside code blocks', () => {
      const md = '```\nline one\nline two\n```';
      const html = marked.parse(md, { breaks: true, async: false }) as string;
      expect(html).not.toContain('<br>');
      expect(html).toContain('line one\nline two');
    });
  });
});
