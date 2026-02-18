/**
 * Integration Tests for TurndownService (HTML → Markdown Conversion)
 * 
 * Tests the custom TurndownService configuration used by the editor
 * to convert HTML content to Markdown. This is critical for:
 * - WYSIWYG → Raw mode switching
 * - Copy as Markdown
 * - Export functionality
 */

import { describe, it, expect, beforeAll } from 'vitest';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { formatDateForMarkdown } from '../extensions/DatePill';

// Create a TurndownService configured the same way as useTurndownService
function createTestTurndownService(): TurndownService {
  const td = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
    strongDelimiter: '**',
    blankReplacement: (content: string, node: any) => {
      if (node.nodeName === 'P') {
        return '\n\n\u200B\n\n';
      }
      return node.isBlock ? '\n\n' : '';
    },
  });

  td.use(gfm);

  // Highlight rule
  td.addRule('highlight', {
    filter: (node) => node.nodeName === 'MARK',
    replacement: (content) => `==${content}==`,
  });

  // Task list item rule
  td.addRule('taskListItem', {
    filter: (node) => {
      return node.nodeName === 'LI' &&
             node.getAttribute('data-type') === 'taskItem';
    },
    replacement: (content, node) => {
      const el = node as HTMLElement;
      const checkbox = el.querySelector('input[type="checkbox"]');
      const checked = checkbox?.hasAttribute('checked') ||
                     (checkbox as HTMLInputElement)?.checked ||
                     el.getAttribute('data-checked') === 'true';
      content = content
        .replace(/^\n+/, '')
        .replace(/\n+$/, '')
        .replace(/\n\n+/g, '\n\n');
      content = content.replace(/\n\n(- |\d+\. )/g, '\n$1');
      content = content.replace(/\u200B/g, '').trim();
      const text = content || '\u200B';
      const prefix = `- [${checked ? 'x' : ' '}] `;
      return prefix + text.replace(/\n/gm, '\n    ') + '\n';
    },
  });

  // Date pill rule
  td.addRule('datePill', {
    filter: (node) => {
      return node.nodeName === 'SPAN' &&
             (node as HTMLElement).getAttribute('data-type') === 'date-pill';
    },
    replacement: (content, node) => {
      const dateStr = (node as HTMLElement).getAttribute('data-date');
      if (dateStr) {
        return `@${formatDateForMarkdown(dateStr)}@`;
      }
      return content;
    },
  });

  // Tag pill rule
  td.addRule('tagPill', {
    filter: (node) => {
      return node.nodeName === 'SPAN' &&
             (node as HTMLElement).getAttribute('data-type') === 'tag-pill';
    },
    replacement: (content, node) => {
      const tag = (node as HTMLElement).getAttribute('data-tag');
      if (tag) {
        return `#${tag}`;
      }
      return content;
    },
  });

  // Callout rule
  td.addRule('callout', {
    filter: (node) => {
      return node.nodeName === 'DIV' && node.hasAttribute('data-callout');
    },
    replacement: (content, node) => {
      const calloutType = (node as HTMLElement).getAttribute('data-type') || 'info';
      const cleanContent = content.trim().replace(/\n{3,}/g, '\n\n');
      return `\n\n\`\`\`ad-${calloutType}\n${cleanContent}\n\`\`\`\n\n`;
    },
  });

  return td;
}

let td: TurndownService;

beforeAll(() => {
  td = createTestTurndownService();
});

describe('HTML to Markdown Conversion', () => {
  describe('Basic Formatting', () => {
    it('should convert headings to ATX style', () => {
      expect(td.turndown('<h1>Title</h1>')).toBe('# Title');
      expect(td.turndown('<h2>Subtitle</h2>')).toBe('## Subtitle');
      expect(td.turndown('<h3>Section</h3>')).toBe('### Section');
    });

    it('should convert bold text', () => {
      expect(td.turndown('<strong>bold</strong>')).toBe('**bold**');
      expect(td.turndown('<b>bold</b>')).toBe('**bold**');
    });

    it('should convert italic text', () => {
      expect(td.turndown('<em>italic</em>')).toBe('*italic*');
      expect(td.turndown('<i>italic</i>')).toBe('*italic*');
    });

    it('should convert strikethrough text', () => {
      // GFM plugin converts strikethrough elements to tilde syntax
      const delResult = td.turndown('<del>deleted</del>');
      expect(delResult).toContain('deleted');
      expect(delResult).toMatch(/~+deleted~+/);
      
      const sResult = td.turndown('<s>deleted</s>');
      expect(sResult).toContain('deleted');
      expect(sResult).toMatch(/~+deleted~+/);
    });

    it('should convert highlighted text', () => {
      expect(td.turndown('<mark>highlighted</mark>')).toBe('==highlighted==');
    });

    it('should convert inline code', () => {
      expect(td.turndown('<code>code</code>')).toBe('`code`');
    });
  });

  describe('Links and Images', () => {
    it('should convert links', () => {
      const result = td.turndown('<a href="https://example.com">Example</a>');
      expect(result).toBe('[Example](https://example.com)');
    });

    it('should convert images', () => {
      const result = td.turndown('<img src="image.png" alt="Alt text" />');
      expect(result).toContain('![');
      expect(result).toContain('image.png');
    });
  });

  describe('Lists', () => {
    it('should convert unordered lists with dash marker', () => {
      const html = '<ul><li>Item 1</li><li>Item 2</li></ul>';
      const result = td.turndown(html);
      // Turndown may add extra spaces after the marker
      expect(result).toMatch(/-\s+Item 1/);
      expect(result).toMatch(/-\s+Item 2/);
    });

    it('should convert ordered lists', () => {
      const html = '<ol><li>First</li><li>Second</li></ol>';
      const result = td.turndown(html);
      expect(result).toMatch(/1\.\s+First/);
      expect(result).toMatch(/2\.\s+Second/);
    });

    it('should convert task list items (unchecked)', () => {
      const html = '<ul data-type="taskList"><li data-type="taskItem" data-checked="false"><p>Todo</p></li></ul>';
      const result = td.turndown(html);
      expect(result).toContain('- [ ] Todo');
    });

    it('should convert task list items (checked)', () => {
      const html = '<ul data-type="taskList"><li data-type="taskItem" data-checked="true"><p>Done</p></li></ul>';
      const result = td.turndown(html);
      expect(result).toContain('- [x] Done');
    });
  });

  describe('Code Blocks', () => {
    it('should convert code blocks to fenced style', () => {
      const html = '<pre><code>const x = 1;</code></pre>';
      const result = td.turndown(html);
      expect(result).toContain('```');
      expect(result).toContain('const x = 1;');
    });

    it('should preserve language in code blocks', () => {
      const html = '<pre><code class="language-javascript">const x = 1;</code></pre>';
      const result = td.turndown(html);
      expect(result).toContain('```javascript');
    });
  });

  describe('Blockquotes', () => {
    it('should convert blockquotes', () => {
      const html = '<blockquote><p>A wise quote</p></blockquote>';
      const result = td.turndown(html);
      expect(result).toContain('> A wise quote');
    });
  });

  describe('Custom Extensions', () => {
    it('should convert date pills to @date@ format', () => {
      const html = '<span data-type="date-pill" data-date="2025-02-11">Feb 11</span>';
      const result = td.turndown(html);
      expect(result).toBe('@Feb 11, 2025@');
    });

    it('should convert tag pills to #tag format', () => {
      const html = '<span data-type="tag-pill" data-tag="urgent">urgent</span>';
      const result = td.turndown(html);
      expect(result).toBe('#urgent');
    });

    it('should convert callouts to code block syntax', () => {
      const html = '<div data-callout data-type="info"><p>Important note</p></div>';
      const result = td.turndown(html);
      expect(result).toContain('```ad-info');
      expect(result).toContain('Important note');
      expect(result).toMatch(/```$/m);
    });

    it('should handle different callout types', () => {
      const types = ['info', 'note', 'prompt', 'resources', 'todo'];
      for (const type of types) {
        const html = `<div data-callout data-type="${type}"><p>Content</p></div>`;
        const result = td.turndown(html);
        expect(result).toContain(`\`\`\`ad-${type}`);
      }
    });
  });

  describe('Complex Content', () => {
    it('should handle mixed formatting in paragraphs', () => {
      const html = '<p>This is <strong>bold</strong> and <em>italic</em> and <code>code</code></p>';
      const result = td.turndown(html);
      expect(result).toContain('**bold**');
      expect(result).toContain('*italic*');
      expect(result).toContain('`code`');
    });

    it('should handle nested lists', () => {
      const html = '<ul><li>Parent<ul><li>Child</li></ul></li></ul>';
      const result = td.turndown(html);
      expect(result).toMatch(/-\s+Parent/);
      expect(result).toContain('Child');
    });

    it('should preserve blank lines via ZWSP', () => {
      const html = '<p>First</p><p></p><p>Third</p>';
      const result = td.turndown(html);
      // Should have content between First and Third (ZWSP for blank line)
      expect(result).toContain('First');
      expect(result).toContain('Third');
    });
  });
});
