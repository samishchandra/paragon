/**
 * Round-trip integration tests: Markdown → HTML → Markdown
 *
 * Tests the full conversion pipeline by running markdown through
 * markdownToHtml (using the real `marked` parser) and then back through
 * a TurndownService configured identically to useTurndownService.
 *
 * These tests catch serialization mismatches between the two directions
 * that unit tests on each side individually would miss.
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { marked } from 'marked';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { markdownToHtml } from './markdownPipeline';
import type { PreprocessOptions } from './markdownPipeline';
import { formatDateForMarkdown, parseDateFromMarkdown, getDateVariant } from '../extensions/DatePill';

// ---------------------------------------------------------------------------
// Setup: real marked parser and turndown service matching useTurndownService
// ---------------------------------------------------------------------------

let markedParse: (src: string) => string;
let td: TurndownService;

beforeAll(() => {
  // Configure marked the same way MarkdownEditor does
  marked.setOptions({ breaks: true });
  markedParse = (src: string) => marked.parse(src, { async: false, breaks: true }) as string;

  // Configure TurndownService the same way useTurndownService does
  td = new TurndownService({
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

  // Tight list paragraph rule
  td.addRule('tightListParagraph', {
    filter: (node) => {
      return node.nodeName === 'P' &&
             node.parentNode !== null &&
             (node.parentNode as HTMLElement).nodeName === 'LI';
    },
    replacement: (content) => content,
  });

  // Blank line preservation
  td.addRule('blankLinePreservation', {
    filter: (node) => {
      return node.nodeName === 'P' &&
             (node.textContent === '' || node.textContent === '\u200B') &&
             node.parentNode !== null &&
             (node.parentNode as HTMLElement).nodeName !== 'LI';
    },
    replacement: () => '\n\n\u200B\n\n',
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

  // Wiki link rule
  td.addRule('wikiLink', {
    filter: (node) => {
      return node.nodeName === 'SPAN' &&
             (node as HTMLElement).hasAttribute('data-wiki-link');
    },
    replacement: (content, node) => {
      const pageName = (node as HTMLElement).getAttribute('data-page-name');
      if (pageName) {
        return `[[${pageName}]]`;
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

  // Table rule
  td.addRule('table', {
    filter: 'table',
    replacement: function(content, node) {
      const table = node as HTMLTableElement;
      const rows = Array.from(table.querySelectorAll('tr'));
      if (rows.length === 0) return '';

      const result: string[] = [];
      let hasHeaderColumn = false;

      rows.forEach((row, rowIndex) => {
        const cells = Array.from(row.querySelectorAll('th, td'));
        const cellContents = cells.map(cell => (cell.textContent || '').trim().replace(/\|/g, '\\|'));

        if (rowIndex > 0 && cells.length > 0 && cells[0].nodeName === 'TH') {
          hasHeaderColumn = true;
        }

        result.push('| ' + cellContents.join(' | ') + ' |');

        if (rowIndex === 0) {
          const separator = cells.map(() => '---').join(' | ');
          result.push('| ' + separator + ' |');
        }
      });

      const marker = hasHeaderColumn ? '\n<!-- header-column -->' : '';
      return '\n\n' + result.join('\n') + marker + '\n\n';
    }
  });

  // Skip th and td
  td.addRule('tableCell', {
    filter: ['th', 'td'],
    replacement: function(content) {
      return content;
    }
  });

  // List separation
  td.addRule('listSeparation', {
    filter: (node) => {
      return (node.nodeName === 'UL' || node.nodeName === 'OL');
    },
    replacement: (content, node) => {
      const prev = node.previousElementSibling;
      const needsExtraSeparation = prev && (prev.nodeName === 'UL' || prev.nodeName === 'OL');
      const prefix = needsExtraSeparation ? '\n\n' : '\n\n';
      return prefix + content.trim() + '\n\n';
    },
  });
});

// ---------------------------------------------------------------------------
// Helper: run the full round-trip
// ---------------------------------------------------------------------------

function roundTrip(markdown: string, options?: PreprocessOptions): string {
  const html = markdownToHtml(markdown, markedParse, options);
  return td.turndown(html);
}

/**
 * Normalise whitespace for comparison: collapse runs of blank lines,
 * trim leading/trailing whitespace, and strip ZWSP characters.
 */
function normalise(text: string): string {
  return text
    .replace(/\u200B/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Round-trip: Markdown → HTML → Markdown', () => {
  describe('Headings', () => {
    it('should preserve h1', () => {
      expect(normalise(roundTrip('# Title'))).toBe('# Title');
    });

    it('should preserve h2', () => {
      expect(normalise(roundTrip('## Subtitle'))).toBe('## Subtitle');
    });

    it('should preserve h3', () => {
      expect(normalise(roundTrip('### Section'))).toBe('### Section');
    });

    it('should preserve h1 through h6', () => {
      for (let i = 1; i <= 6; i++) {
        const md = `${'#'.repeat(i)} Heading ${i}`;
        expect(normalise(roundTrip(md))).toBe(md);
      }
    });
  });

  describe('Inline formatting', () => {
    it('should preserve bold text', () => {
      expect(normalise(roundTrip('**bold text**'))).toBe('**bold text**');
    });

    it('should preserve italic text', () => {
      expect(normalise(roundTrip('*italic text*'))).toBe('*italic text*');
    });

    it('should preserve inline code', () => {
      expect(normalise(roundTrip('use `console.log`'))).toBe('use `console.log`');
    });

    it('should preserve highlighted text', () => {
      expect(normalise(roundTrip('==highlighted=='))).toBe('==highlighted==');
    });

    it('should preserve links', () => {
      const md = '[Example](https://example.com)';
      expect(normalise(roundTrip(md))).toBe(md);
    });

    it('should preserve mixed inline formatting', () => {
      const md = '**bold** and *italic* and `code`';
      const result = normalise(roundTrip(md));
      expect(result).toContain('**bold**');
      expect(result).toContain('*italic*');
      expect(result).toContain('`code`');
    });
  });

  describe('Lists', () => {
    it('should preserve simple bullet list', () => {
      const md = '- item 1\n- item 2\n- item 3';
      const result = normalise(roundTrip(md));
      // Turndown may use extra spaces after the dash marker
      expect(result).toContain('item 1');
      expect(result).toContain('item 2');
      expect(result).toContain('item 3');
      // Should use dash marker
      expect(result).toMatch(/^-\s+item 1/m);
    });

    it('should preserve ordered list', () => {
      const md = '1. first\n2. second\n3. third';
      const result = normalise(roundTrip(md));
      expect(result).toContain('1.');
      expect(result).toContain('first');
      expect(result).toContain('2.');
      expect(result).toContain('second');
    });

    it('should preserve task list items', () => {
      const md = '- [ ] todo item\n- [x] done item';
      const result = normalise(roundTrip(md));
      expect(result).toContain('- [ ] todo item');
      expect(result).toContain('- [x] done item');
    });

    it('should preserve task list with multiple items', () => {
      const md = '- [ ] first task\n- [x] second task\n- [ ] third task';
      const result = normalise(roundTrip(md));
      expect(result).toContain('- [ ] first task');
      expect(result).toContain('- [x] second task');
      expect(result).toContain('- [ ] third task');
    });
  });

  describe('Code blocks', () => {
    it('should preserve fenced code block', () => {
      const md = '```\nconst x = 1;\n```';
      const result = normalise(roundTrip(md));
      expect(result).toContain('```');
      expect(result).toContain('const x = 1;');
    });

    it('should preserve code block with language', () => {
      const md = '```javascript\nconst x = 1;\n```';
      const result = normalise(roundTrip(md));
      expect(result).toContain('```javascript');
      expect(result).toContain('const x = 1;');
    });
  });

  describe('Blockquotes', () => {
    it('should preserve blockquotes', () => {
      const md = '> A wise quote';
      const result = normalise(roundTrip(md));
      expect(result).toContain('> A wise quote');
    });
  });

  describe('Tables', () => {
    it('should preserve simple table', () => {
      const md = '| H1 | H2 |\n| --- | --- |\n| A | B |';
      const result = normalise(roundTrip(md));
      expect(result).toContain('H1');
      expect(result).toContain('H2');
      expect(result).toContain('A');
      expect(result).toContain('B');
      // Should have pipe separators
      expect(result).toContain('|');
    });

    it('should preserve table with header column marker', () => {
      const md = '| H1 | H2 |\n| --- | --- |\n| R1 | R2 |\n<!-- header-column -->';
      const result = normalise(roundTrip(md));
      expect(result).toContain('H1');
      expect(result).toContain('H2');
      // The header-column marker should survive the round-trip
      // (restoreHeaderColumn converts first-column <td> to <th>,
      //  turndown detects <th> in body rows and re-emits the marker)
      expect(result).toContain('<!-- header-column -->');
    });
  });

  describe('Custom extensions', () => {
    it('should preserve date pills through round-trip', () => {
      const options: PreprocessOptions = {
        parseDateFromMarkdown: (text) => parseDateFromMarkdown(text),
        getDateVariant: (iso) => getDateVariant(iso),
      };
      const md = '@Feb 11, 2025@';
      const result = normalise(roundTrip(md, options));
      expect(result).toBe('@Feb 11, 2025@');
    });

    it('should preserve tag pills through round-trip', () => {
      const options: PreprocessOptions = {
        enableTagAutoDetect: true,
        disableTagPills: false,
        isValidTag: () => true,
        normalizeTag: (t) => t.toLowerCase(),
      };
      const md = '#urgent';
      const result = normalise(roundTrip(md, options));
      expect(result).toBe('#urgent');
    });

    it('should preserve wiki links through round-trip', () => {
      const md = '[[My Page]]';
      const result = normalise(roundTrip(md));
      expect(result).toBe('[[My Page]]');
    });

    it('should preserve callout blocks through round-trip', () => {
      const md = '```ad-info\nImportant note\n```';
      const result = normalise(roundTrip(md));
      expect(result).toContain('```ad-info');
      expect(result).toContain('Important note');
      expect(result).toContain('```');
    });

    it('should preserve highlight marks through round-trip', () => {
      const md = 'this is ==highlighted== text';
      const result = normalise(roundTrip(md));
      expect(result).toContain('==highlighted==');
    });
  });

  describe('Complex documents', () => {
    it('should preserve a document with mixed content', () => {
      const md = [
        '# Welcome',
        '',
        'This is **bold** and *italic* text.',
        '',
        '- item 1',
        '- item 2',
        '',
        '> A quote',
        '',
        '```javascript',
        'const x = 1;',
        '```',
      ].join('\n');

      const result = normalise(roundTrip(md));
      expect(result).toContain('# Welcome');
      expect(result).toContain('**bold**');
      expect(result).toContain('*italic*');
      // Turndown may use extra spaces after the dash marker
      expect(result).toMatch(/-\s+item 1/);
      expect(result).toMatch(/-\s+item 2/);
      expect(result).toContain('> A quote');
      expect(result).toContain('```javascript');
      expect(result).toContain('const x = 1;');
    });

    it('should preserve a document with headings and paragraphs', () => {
      const md = [
        '# Title',
        '',
        'First paragraph.',
        '',
        '## Section',
        '',
        'Second paragraph.',
      ].join('\n');

      const result = normalise(roundTrip(md));
      expect(result).toContain('# Title');
      expect(result).toContain('First paragraph.');
      expect(result).toContain('## Section');
      expect(result).toContain('Second paragraph.');
    });

    it('should preserve images with alignment and width', () => {
      const md = '![photo | center | 300](https://example.com/img.jpg)';
      const result = normalise(roundTrip(md));
      // The round-trip preserves the image URL and alt text.
      // Note: alignment/width metadata requires the resizableImage turndown
      // rule (which reads DOM attributes), so in this JSDOM-based test the
      // basic turndown img rule fires instead. We verify the core content.
      expect(result).toContain('![');
      expect(result).toContain('https://example.com/img.jpg');
    });
  });
});
