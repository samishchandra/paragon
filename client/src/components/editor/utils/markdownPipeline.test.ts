/**
 * Unit tests for markdownPipeline.ts
 *
 * Tests the markdown-to-HTML conversion pipeline: preprocessMarkdown,
 * postprocessHtml, reconstructTableCells, markdownToHtml, and all
 * helper functions (inlineMarkdownToHtml, imgToFigure, lineToBlocks,
 * parseListLine, buildNestedListHtml).
 */
import { describe, it, expect } from 'vitest';
import {
  inlineMarkdownToHtml,
  imgToFigure,
  lineToBlocks,
  parseListLine,
  buildNestedListHtml,
  reconstructTableCells,
  preprocessMarkdown,
  postprocessHtml,
  markdownToHtml,
} from './markdownPipeline';
import type { ListLineInfo, PreprocessOptions } from './markdownPipeline';

// ---------------------------------------------------------------------------
// Stub markedParse for preprocessMarkdown tests
// (just wraps content in <p> tags like marked would for simple text)
// ---------------------------------------------------------------------------
const stubMarkedParse = (src: string) => `<p>${src}</p>`;

// ---------------------------------------------------------------------------
// inlineMarkdownToHtml
// ---------------------------------------------------------------------------
describe('inlineMarkdownToHtml', () => {
  it('should convert bold **text**', () => {
    expect(inlineMarkdownToHtml('hello **world**')).toBe('hello <strong>world</strong>');
  });

  it('should convert italic *text*', () => {
    expect(inlineMarkdownToHtml('hello *world*')).toBe('hello <em>world</em>');
  });

  it('should convert strikethrough ~~text~~', () => {
    expect(inlineMarkdownToHtml('hello ~~world~~')).toBe('hello <s>world</s>');
  });

  it('should convert inline code `text`', () => {
    expect(inlineMarkdownToHtml('use `console.log`')).toBe('use <code>console.log</code>');
  });

  it('should convert highlight ==text==', () => {
    expect(inlineMarkdownToHtml('this is ==important==')).toBe('this is <mark>important</mark>');
  });

  it('should convert links [text](url)', () => {
    expect(inlineMarkdownToHtml('visit [Google](https://google.com)')).toBe(
      'visit <a href="https://google.com">Google</a>',
    );
  });

  it('should handle multiple formats in one string', () => {
    const input = '**bold** and *italic* and `code`';
    const result = inlineMarkdownToHtml(input);
    expect(result).toContain('<strong>bold</strong>');
    expect(result).toContain('<em>italic</em>');
    expect(result).toContain('<code>code</code>');
  });

  it('should return plain text unchanged', () => {
    expect(inlineMarkdownToHtml('plain text')).toBe('plain text');
  });

  it('should handle empty string', () => {
    expect(inlineMarkdownToHtml('')).toBe('');
  });
});

// ---------------------------------------------------------------------------
// imgToFigure
// ---------------------------------------------------------------------------
describe('imgToFigure', () => {
  it('should wrap img with left alignment (default)', () => {
    const img = '<img src="test.jpg" alt="test" data-align="left" />';
    const result = imgToFigure(img);
    expect(result).toBe(
      '<figure class="image-resizer" style="margin-right: auto;"><img src="test.jpg" alt="test" data-align="left" /></figure>',
    );
  });

  it('should wrap img with center alignment', () => {
    const img = '<img src="test.jpg" alt="test" data-align="center" />';
    const result = imgToFigure(img);
    expect(result).toContain('margin-left: auto; margin-right: auto;');
  });

  it('should wrap img with right alignment', () => {
    const img = '<img src="test.jpg" alt="test" data-align="right" />';
    const result = imgToFigure(img);
    expect(result).toContain('margin-left: auto;');
    expect(result).not.toContain('margin-right: auto;');
  });

  it('should default to left alignment when no data-align', () => {
    const img = '<img src="test.jpg" alt="test" />';
    const result = imgToFigure(img);
    expect(result).toContain('margin-right: auto;');
  });
});

// ---------------------------------------------------------------------------
// lineToBlocks
// ---------------------------------------------------------------------------
describe('lineToBlocks', () => {
  it('should wrap plain text in <p>', () => {
    expect(lineToBlocks('hello world')).toBe('<p>hello world</p>');
  });

  it('should apply inline markdown inside <p>', () => {
    expect(lineToBlocks('**bold** text')).toBe('<p><strong>bold</strong> text</p>');
  });

  it('should convert <img> tag to figure', () => {
    const line = '<img src="test.jpg" alt="test" data-align="left" />';
    const result = lineToBlocks(line);
    expect(result).toContain('<figure class="image-resizer"');
    expect(result).toContain('test.jpg');
  });

  it('should handle mixed text and image', () => {
    const line = 'text before <img src="test.jpg" alt="test" data-align="left" /> text after';
    const result = lineToBlocks(line);
    expect(result).toContain('<p>');
    expect(result).toContain('<figure');
  });

  it('should convert markdown image syntax ![alt](url)', () => {
    const line = '![my image](https://example.com/img.png)';
    const result = lineToBlocks(line);
    expect(result).toContain('<figure class="image-resizer"');
    expect(result).toContain('https://example.com/img.png');
    expect(result).toContain('my image');
  });
});

// ---------------------------------------------------------------------------
// parseListLine
// ---------------------------------------------------------------------------
describe('parseListLine', () => {
  it('should parse unordered list item', () => {
    const result = parseListLine('- hello');
    expect(result).toEqual({ type: 'ul', depth: 0, text: 'hello' });
  });

  it('should parse ordered list item', () => {
    const result = parseListLine('1. first item');
    expect(result).toEqual({ type: 'ol', depth: 0, text: 'first item', index: 1 });
  });

  it('should parse task list item (unchecked)', () => {
    const result = parseListLine('- [ ] todo item');
    expect(result).toEqual({ type: 'task', depth: 0, text: 'todo item', checked: false });
  });

  it('should parse task list item (checked)', () => {
    const result = parseListLine('- [x] done item');
    expect(result).toEqual({ type: 'task', depth: 0, text: 'done item', checked: true });
  });

  it('should calculate depth from indentation (2 spaces per level)', () => {
    expect(parseListLine('  - nested')?.depth).toBe(1);
    expect(parseListLine('    - deep nested')?.depth).toBe(2);
    expect(parseListLine('      - very deep')?.depth).toBe(3);
  });

  it('should return null for non-list lines', () => {
    expect(parseListLine('just text')).toBeNull();
    expect(parseListLine('')).toBeNull();
    expect(parseListLine('  not a list')).toBeNull();
  });

  it('should parse ordered list with custom start number', () => {
    const result = parseListLine('5. fifth item');
    expect(result).toEqual({ type: 'ol', depth: 0, text: 'fifth item', index: 5 });
  });
});

// ---------------------------------------------------------------------------
// buildNestedListHtml
// ---------------------------------------------------------------------------
describe('buildNestedListHtml', () => {
  it('should return empty string for empty array', () => {
    expect(buildNestedListHtml([])).toBe('');
  });

  it('should build a simple unordered list', () => {
    const items: ListLineInfo[] = [
      { type: 'ul', depth: 0, text: 'item 1' },
      { type: 'ul', depth: 0, text: 'item 2' },
    ];
    const result = buildNestedListHtml(items);
    expect(result).toBe('<ul><li><p>item 1</p></li><li><p>item 2</p></li></ul>');
  });

  it('should build a simple ordered list', () => {
    const items: ListLineInfo[] = [
      { type: 'ol', depth: 0, text: 'first', index: 1 },
      { type: 'ol', depth: 0, text: 'second', index: 2 },
    ];
    const result = buildNestedListHtml(items);
    expect(result).toContain('<ol>');
    expect(result).toContain('</ol>');
    expect(result).toContain('first');
    expect(result).toContain('second');
  });

  it('should build a task list', () => {
    const items: ListLineInfo[] = [
      { type: 'task', depth: 0, text: 'todo', checked: false },
      { type: 'task', depth: 0, text: 'done', checked: true },
    ];
    const result = buildNestedListHtml(items);
    expect(result).toContain('data-type="taskList"');
    expect(result).toContain('data-type="taskItem"');
    expect(result).toContain('data-checked="false"');
    expect(result).toContain('data-checked="true"');
  });

  it('should handle nested lists', () => {
    const items: ListLineInfo[] = [
      { type: 'ul', depth: 0, text: 'parent' },
      { type: 'ul', depth: 1, text: 'child' },
    ];
    const result = buildNestedListHtml(items);
    // Should have nested <ul> inside the parent <li>
    expect(result).toMatch(/<li><p>parent<\/p><ul><li><p>child<\/p><\/li><\/ul><\/li>/);
  });

  it('should apply inline markdown in list items', () => {
    const items: ListLineInfo[] = [
      { type: 'ul', depth: 0, text: '**bold** item' },
    ];
    const result = buildNestedListHtml(items);
    expect(result).toContain('<strong>bold</strong>');
  });
});

// ---------------------------------------------------------------------------
// reconstructTableCells
// ---------------------------------------------------------------------------
describe('reconstructTableCells', () => {
  it('should not modify simple text cells', () => {
    const html = '<td>simple text</td>';
    expect(reconstructTableCells(html)).toBe(html);
  });

  it('should reconstruct cell with image', () => {
    const html = '<td><img src="test.jpg" alt="test" data-align="left" /></td>';
    const result = reconstructTableCells(html);
    expect(result).toContain('<figure class="image-resizer"');
  });

  it('should reconstruct cell with br-separated lines', () => {
    const html = '<td>line 1<br>line 2</td>';
    const result = reconstructTableCells(html);
    expect(result).toContain('<p>line 1</p>');
    expect(result).toContain('<p>line 2</p>');
  });

  it('should reconstruct cell with list items', () => {
    const html = '<td>- item 1<br>- item 2</td>';
    const result = reconstructTableCells(html);
    expect(result).toContain('<ul>');
    expect(result).toContain('<li>');
    expect(result).toContain('item 1');
    expect(result).toContain('item 2');
  });

  it('should reconstruct cell with task list items', () => {
    const html = '<td>- [ ] todo<br>- [x] done</td>';
    const result = reconstructTableCells(html);
    expect(result).toContain('data-type="taskList"');
    expect(result).toContain('data-checked="false"');
    expect(result).toContain('data-checked="true"');
  });

  it('should reconstruct cell with ordered list', () => {
    const html = '<td>1. first<br>2. second</td>';
    const result = reconstructTableCells(html);
    expect(result).toContain('<ol>');
    expect(result).toContain('first');
    expect(result).toContain('second');
  });

  it('should reconstruct cell with nested list', () => {
    const html = '<td>- parent<br>  - child</td>';
    const result = reconstructTableCells(html);
    expect(result).toContain('<ul>');
    // Should have nested structure
    const ulCount = (result.match(/<ul>/g) || []).length;
    expect(ulCount).toBe(2); // outer + nested
  });

  it('should handle mixed content: text and list', () => {
    const html = '<td>heading text<br>- item 1<br>- item 2</td>';
    const result = reconstructTableCells(html);
    expect(result).toContain('<p>heading text</p>');
    expect(result).toContain('<ul>');
  });

  it('should handle <th> cells the same as <td>', () => {
    const html = '<th>- item 1<br>- item 2</th>';
    const result = reconstructTableCells(html);
    expect(result).toContain('<ul>');
  });

  it('should strip wrapping <p> tags from cell content', () => {
    const html = '<td><p>line 1<br>line 2</p></td>';
    const result = reconstructTableCells(html);
    expect(result).toContain('<p>line 1</p>');
    expect(result).toContain('<p>line 2</p>');
  });

  it('should flush different list types into separate lists', () => {
    const html = '<td>- bullet<br>1. ordered</td>';
    const result = reconstructTableCells(html);
    expect(result).toContain('<ul>');
    expect(result).toContain('<ol>');
  });
});

// ---------------------------------------------------------------------------
// preprocessMarkdown
// ---------------------------------------------------------------------------
describe('preprocessMarkdown', () => {
  describe('callout code blocks', () => {
    it('should convert ```ad-info code blocks to callout HTML', () => {
      const md = '```ad-info\nThis is info\n```';
      const result = preprocessMarkdown(md, stubMarkedParse);
      expect(result).toContain('data-callout=""');
      expect(result).toContain('data-type="info"');
      expect(result).toContain('class="callout callout-info"');
    });

    it('should convert legacy format without ad- prefix', () => {
      const md = '```note\nThis is a note\n```';
      const result = preprocessMarkdown(md, stubMarkedParse);
      expect(result).toContain('data-type="note"');
    });

    it('should handle all callout types', () => {
      const types = ['info', 'note', 'prompt', 'resources', 'todo'];
      for (const type of types) {
        const md = `\`\`\`ad-${type}\ncontent\n\`\`\``;
        const result = preprocessMarkdown(md, stubMarkedParse);
        expect(result).toContain(`data-type="${type}"`);
      }
    });
  });

  describe('image metadata', () => {
    it('should convert ![alt](url) to <img> tag', () => {
      const md = '![photo](https://example.com/img.jpg)';
      const result = preprocessMarkdown(md, stubMarkedParse);
      expect(result).toContain('<img src="https://example.com/img.jpg"');
      expect(result).toContain('alt="photo"');
      expect(result).toContain('data-align="left"');
    });

    it('should convert ![alt|center](url) with alignment', () => {
      const md = '![photo|center](https://example.com/img.jpg)';
      const result = preprocessMarkdown(md, stubMarkedParse);
      expect(result).toContain('data-align="center"');
    });

    it('should convert ![alt|300](url) with width', () => {
      const md = '![photo|300](https://example.com/img.jpg)';
      const result = preprocessMarkdown(md, stubMarkedParse);
      expect(result).toContain('width="300"');
      expect(result).toContain('style="width: 300px"');
    });

    it('should convert ![alt|center|300](url) with alignment and width', () => {
      const md = '![photo|center|300](https://example.com/img.jpg)';
      const result = preprocessMarkdown(md, stubMarkedParse);
      expect(result).toContain('data-align="center"');
      expect(result).toContain('width="300"');
    });

    it('should handle spaces around pipes: ![alt | center | 300](url)', () => {
      const md = '![photo | center | 300](https://example.com/img.jpg)';
      const result = preprocessMarkdown(md, stubMarkedParse);
      expect(result).toContain('data-align="center"');
      expect(result).toContain('width="300"');
    });

    it('should treat unrecognised 2-part metadata as alt text', () => {
      const md = '![photo|unknown](https://example.com/img.jpg)';
      const result = preprocessMarkdown(md, stubMarkedParse);
      expect(result).toContain('alt="photo|unknown"');
    });

    it('should treat 4+ part metadata as alt text', () => {
      const md = '![a|b|c|d](https://example.com/img.jpg)';
      const result = preprocessMarkdown(md, stubMarkedParse);
      expect(result).toContain('alt="a|b|c|d"');
    });
  });

  describe('highlight marks', () => {
    it('should convert ==text== to <mark> tags', () => {
      const md = 'this is ==highlighted== text';
      const result = preprocessMarkdown(md, stubMarkedParse);
      expect(result).toContain('<mark>highlighted</mark>');
    });

    it('should not convert == inside backticks', () => {
      const md = '`==not highlighted==`';
      const result = preprocessMarkdown(md, stubMarkedParse);
      expect(result).not.toContain('<mark>');
    });
  });

  describe('date pills', () => {
    it('should convert @date@ to date-pill HTML when parseDateFn is provided', () => {
      const options: PreprocessOptions = {
        parseDateFromMarkdown: (text) => text === 'Feb 11, 2025' ? '2025-02-11' : null,
        getDateVariant: () => 'past',
      };
      const md = 'due @Feb 11, 2025@';
      const result = preprocessMarkdown(md, stubMarkedParse, options);
      expect(result).toContain('data-type="date-pill"');
      expect(result).toContain('data-date="2025-02-11"');
      expect(result).toContain('class="date-pill past"');
    });

    it('should leave @text@ unchanged when parseDateFn returns null', () => {
      const options: PreprocessOptions = {
        parseDateFromMarkdown: () => null,
        getDateVariant: () => 'past',
      };
      const md = 'email @user@';
      const result = preprocessMarkdown(md, stubMarkedParse, options);
      expect(result).not.toContain('data-type="date-pill"');
      expect(result).toContain('@user@');
    });

    it('should skip date pills when no parseDateFn provided', () => {
      const md = 'due @Feb 11, 2025@';
      const result = preprocessMarkdown(md, stubMarkedParse);
      expect(result).toContain('@Feb 11, 2025@');
    });
  });

  describe('tag pills', () => {
    it('should convert #tag to tag-pill HTML when enableTagAutoDetect is true', () => {
      const options: PreprocessOptions = {
        enableTagAutoDetect: true,
        disableTagPills: false,
        isValidTag: () => true,
        normalizeTag: (t) => t.toLowerCase(),
      };
      const md = 'tagged #important item';
      const result = preprocessMarkdown(md, stubMarkedParse, options);
      expect(result).toContain('data-type="tag-pill"');
      expect(result).toContain('data-tag="important"');
    });

    it('should not convert #tag when enableTagAutoDetect is false', () => {
      const options: PreprocessOptions = {
        enableTagAutoDetect: false,
        isValidTag: () => true,
        normalizeTag: (t) => t,
      };
      const md = 'tagged #important item';
      const result = preprocessMarkdown(md, stubMarkedParse, options);
      expect(result).not.toContain('data-type="tag-pill"');
    });

    it('should not convert #tag when disableTagPills is true', () => {
      const options: PreprocessOptions = {
        enableTagAutoDetect: true,
        disableTagPills: true,
        isValidTag: () => true,
        normalizeTag: (t) => t,
      };
      const md = 'tagged #important item';
      const result = preprocessMarkdown(md, stubMarkedParse, options);
      expect(result).not.toContain('data-type="tag-pill"');
    });

    it('should not convert invalid tags', () => {
      const options: PreprocessOptions = {
        enableTagAutoDetect: true,
        disableTagPills: false,
        isValidTag: () => false,
        normalizeTag: (t) => t,
      };
      const md = 'tagged #invalid item';
      const result = preprocessMarkdown(md, stubMarkedParse, options);
      expect(result).not.toContain('data-type="tag-pill"');
    });
  });

  describe('wiki links', () => {
    it('should convert [[page name]] to wiki-link HTML', () => {
      const md = 'see [[My Page]]';
      const result = preprocessMarkdown(md, stubMarkedParse);
      expect(result).toContain('data-wiki-link');
      expect(result).toContain('data-page-name="My Page"');
      expect(result).toContain('class="wiki-link"');
    });

    it('should not convert wiki links inside code fences', () => {
      const md = '```\n[[not a link]]\n```';
      const result = preprocessMarkdown(md, stubMarkedParse);
      expect(result).not.toContain('data-wiki-link');
    });

    it('should not convert wiki links inside inline code', () => {
      const md = '`[[not a link]]`';
      const result = preprocessMarkdown(md, stubMarkedParse);
      expect(result).not.toContain('data-wiki-link');
    });

    it('should trim whitespace from page names', () => {
      const md = 'see [[ My Page ]]';
      const result = preprocessMarkdown(md, stubMarkedParse);
      expect(result).toContain('data-page-name="My Page"');
    });
  });
});

// ---------------------------------------------------------------------------
// postprocessHtml
// ---------------------------------------------------------------------------
describe('postprocessHtml', () => {
  it('should convert list-break comments to separator paragraphs', () => {
    const html = '<ul></ul><!-- list-break --><ul></ul>';
    const result = postprocessHtml(html);
    expect(result).toContain('data-list-separator="true"');
    expect(result).toContain('\u200B');
  });

  it('should collapse ZWSP paragraphs adjacent to list-break comments', () => {
    const html = '<p>\u200B</p><!-- list-break --><p>\u200B</p>';
    const result = postprocessHtml(html);
    // Should produce a single separator, not multiple
    const separatorCount = (result.match(/data-list-separator/g) || []).length;
    expect(separatorCount).toBe(1);
  });

  it('should convert checkbox lists to TipTap task lists', () => {
    const html = '<ul>\n<li><input disabled="" type="checkbox"> task item</li>\n</ul>';
    const result = postprocessHtml(html);
    expect(result).toContain('data-type="taskList"');
    expect(result).toContain('data-type="taskItem"');
  });

  it('should structure images inside list items', () => {
    const html = '<ul><li><img src="test.jpg" alt="test" data-align="left"></li></ul>';
    const result = postprocessHtml(html);
    expect(result).toContain('<figure class="image-resizer"');
  });

  it('should restore header column from marker', () => {
    const html = '<table><tr><td>a</td><td>b</td></tr></table>\n<!-- header-column -->';
    const result = postprocessHtml(html);
    // restoreHeaderColumn should process the marker
    expect(result).not.toContain('<!-- header-column -->');
  });

  it('should reconstruct rich table cells', () => {
    const html = '<table><tr><td><p>- item 1<br>- item 2</p></td></tr></table>';
    const result = postprocessHtml(html);
    expect(result).toContain('<ul>');
  });
});

// ---------------------------------------------------------------------------
// markdownToHtml (full pipeline)
// ---------------------------------------------------------------------------
describe('markdownToHtml', () => {
  it('should orchestrate preprocess → parse → postprocess', () => {
    // Use a simple markedParse that just wraps in <p>
    const result = markdownToHtml('hello **world**', stubMarkedParse);
    // preprocessMarkdown doesn't touch bold (that's marked's job)
    // stubMarkedParse wraps in <p>
    // postprocessHtml doesn't modify simple paragraphs
    expect(result).toContain('<p>');
    expect(result).toContain('hello **world**');
  });

  it('should convert callouts through the full pipeline', () => {
    const md = '```ad-info\nImportant note\n```';
    const result = markdownToHtml(md, stubMarkedParse);
    expect(result).toContain('data-callout=""');
    expect(result).toContain('data-type="info"');
  });

  it('should convert images through the full pipeline', () => {
    const md = '![photo|center|300](https://example.com/img.jpg)';
    // markedParse would wrap the <img> in <p>, which is fine
    const result = markdownToHtml(md, stubMarkedParse);
    expect(result).toContain('data-align="center"');
    expect(result).toContain('width="300"');
  });

  it('should convert highlights through the full pipeline', () => {
    const md = 'this is ==highlighted==';
    const result = markdownToHtml(md, stubMarkedParse);
    expect(result).toContain('<mark>highlighted</mark>');
  });

  it('should convert wiki links through the full pipeline', () => {
    const md = 'see [[My Page]]';
    const result = markdownToHtml(md, stubMarkedParse);
    expect(result).toContain('data-wiki-link');
    expect(result).toContain('data-page-name="My Page"');
  });

  it('should pass options through to preprocessMarkdown', () => {
    const options: PreprocessOptions = {
      parseDateFromMarkdown: (text) => text === 'Today' ? '2025-02-23' : null,
      getDateVariant: () => 'today',
    };
    const md = 'due @Today@';
    const result = markdownToHtml(md, stubMarkedParse, options);
    expect(result).toContain('data-type="date-pill"');
  });
});
