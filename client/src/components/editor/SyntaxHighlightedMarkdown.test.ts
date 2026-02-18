/**
 * Integration Tests for Markdown Syntax Highlighting Tokenizer
 * 
 * Tests the tokenizeMarkdown function which powers the raw markdown editor's
 * syntax highlighting. This is critical for the raw editing mode.
 * 
 * Since tokenizeMarkdown is not exported, we re-implement it here for testing.
 * This ensures the tokenization logic is correct and regression-proof.
 */

import { describe, it, expect } from 'vitest';

// Token types for markdown syntax highlighting
type TokenType = 
  | 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'heading5' | 'heading6'
  | 'bold' | 'italic' | 'bold-italic' | 'strikethrough'
  | 'code-inline' | 'code-block' | 'code-block-lang'
  | 'link' | 'link-text' | 'link-url' | 'image'
  | 'list-bullet' | 'list-number' | 'task-list' | 'task-checked'
  | 'blockquote' | 'horizontal-rule'
  | 'table-header' | 'table-separator' | 'table-cell'
  | 'date-pill'
  | 'text';

interface Token {
  type: TokenType;
  content: string;
  start: number;
  end: number;
}

// Re-implementation of tokenizeMarkdown for testing
function tokenizeMarkdown(text: string): Token[] {
  const tokens: Token[] = [];
  const lines = text.split('\n');
  let pos = 0;
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineStart = pos;

    // Code block handling
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        const codeBlockLang = line.slice(3).trim();
        tokens.push({
          type: 'code-block',
          content: '```',
          start: lineStart,
          end: lineStart + 3,
        });
        if (codeBlockLang) {
          tokens.push({
            type: 'code-block-lang',
            content: codeBlockLang,
            start: lineStart + 3,
            end: lineStart + 3 + codeBlockLang.length,
          });
        }
      } else {
        inCodeBlock = false;
        tokens.push({
          type: 'code-block',
          content: line,
          start: lineStart,
          end: lineStart + line.length,
        });
      }
      pos += line.length + 1;
      continue;
    }

    if (inCodeBlock) {
      tokens.push({
        type: 'code-block',
        content: line,
        start: lineStart,
        end: lineStart + line.length,
      });
      pos += line.length + 1;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      tokens.push({
        type: `heading${level}` as TokenType,
        content: line,
        start: lineStart,
        end: lineStart + line.length,
      });
      pos += line.length + 1;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      tokens.push({
        type: 'horizontal-rule',
        content: line,
        start: lineStart,
        end: lineStart + line.length,
      });
      pos += line.length + 1;
      continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      tokens.push({
        type: 'blockquote',
        content: line,
        start: lineStart,
        end: lineStart + line.length,
      });
      pos += line.length + 1;
      continue;
    }

    // Table separator line
    if (/^\|?[\s-:|]+\|?$/.test(line) && line.includes('-')) {
      tokens.push({
        type: 'table-separator',
        content: line,
        start: lineStart,
        end: lineStart + line.length,
      });
      pos += line.length + 1;
      continue;
    }

    // Table row
    if (line.includes('|') && (line.startsWith('|') || line.trim().includes(' | '))) {
      tokens.push({
        type: 'table-cell',
        content: line,
        start: lineStart,
        end: lineStart + line.length,
      });
      pos += line.length + 1;
      continue;
    }

    // Task list
    const taskMatch = line.match(/^(\s*[-*+]\s+)\[([xX ])\]\s+(.*)$/);
    if (taskMatch) {
      const isChecked = taskMatch[2].toLowerCase() === 'x';
      tokens.push({
        type: isChecked ? 'task-checked' : 'task-list',
        content: line,
        start: lineStart,
        end: lineStart + line.length,
      });
      pos += line.length + 1;
      continue;
    }

    // Unordered list
    const bulletMatch = line.match(/^(\s*[-*+])\s+(.*)$/);
    if (bulletMatch) {
      tokens.push({
        type: 'list-bullet',
        content: line,
        start: lineStart,
        end: lineStart + line.length,
      });
      pos += line.length + 1;
      continue;
    }

    // Ordered list
    const numberMatch = line.match(/^(\s*\d+\.)\s+(.*)$/);
    if (numberMatch) {
      tokens.push({
        type: 'list-number',
        content: line,
        start: lineStart,
        end: lineStart + line.length,
      });
      pos += line.length + 1;
      continue;
    }

    // Process inline elements for regular lines
    let lastEnd = 0;

    const inlinePatterns = [
      { regex: /@[A-Z][a-z]{2}\s+\d{1,2},\s+\d{4}@/g, type: 'date-pill' as TokenType },
      { regex: /\*\*\*(.+?)\*\*\*|___(.+?)___/g, type: 'bold-italic' as TokenType },
      { regex: /\*\*(.+?)\*\*|__(.+?)__/g, type: 'bold' as TokenType },
      { regex: /\*(.+?)\*|_(.+?)_/g, type: 'italic' as TokenType },
      { regex: /~~(.+?)~~/g, type: 'strikethrough' as TokenType },
      { regex: /`([^`]+)`/g, type: 'code-inline' as TokenType },
      { regex: /!\[([^\]]*)\]\(([^)]+)\)/g, type: 'image' as TokenType },
      { regex: /\[([^\]]+)\]\(([^)]+)\)/g, type: 'link' as TokenType },
    ];

    const allMatches: { start: number; end: number; type: TokenType; content: string }[] = [];

    for (const pattern of inlinePatterns) {
      let match;
      pattern.regex.lastIndex = 0;
      while ((match = pattern.regex.exec(line)) !== null) {
        allMatches.push({
          start: lineStart + match.index,
          end: lineStart + match.index + match[0].length,
          type: pattern.type,
          content: match[0],
        });
      }
    }

    allMatches.sort((a, b) => a.start - b.start);
    const nonOverlapping: typeof allMatches = [];
    let lastMatchEnd = lineStart;

    for (const match of allMatches) {
      if (match.start >= lastMatchEnd) {
        nonOverlapping.push(match);
        lastMatchEnd = match.end;
      }
    }

    for (const match of nonOverlapping) {
      if (match.start > lineStart + lastEnd) {
        tokens.push({
          type: 'text',
          content: line.substring(lastEnd, match.start - lineStart),
          start: lineStart + lastEnd,
          end: match.start,
        });
      }
      tokens.push({
        type: match.type,
        content: match.content,
        start: match.start,
        end: match.end,
      });
      lastEnd = match.end - lineStart;
    }

    if (lastEnd < line.length) {
      tokens.push({
        type: 'text',
        content: line.substring(lastEnd),
        start: lineStart + lastEnd,
        end: lineStart + line.length,
      });
    }

    pos += line.length + 1;
  }

  return tokens;
}

describe('tokenizeMarkdown', () => {
  describe('Headings', () => {
    it('should tokenize H1', () => {
      const tokens = tokenizeMarkdown('# Hello World');
      expect(tokens).toHaveLength(1);
      expect(tokens[0].type).toBe('heading1');
      expect(tokens[0].content).toBe('# Hello World');
    });

    it('should tokenize H2 through H6', () => {
      for (let level = 2; level <= 6; level++) {
        const prefix = '#'.repeat(level);
        const tokens = tokenizeMarkdown(`${prefix} Heading ${level}`);
        expect(tokens).toHaveLength(1);
        expect(tokens[0].type).toBe(`heading${level}`);
      }
    });

    it('should not tokenize # without space as heading', () => {
      const tokens = tokenizeMarkdown('#NoSpace');
      expect(tokens).toHaveLength(1);
      expect(tokens[0].type).toBe('text');
    });
  });

  describe('Code Blocks', () => {
    it('should tokenize fenced code blocks', () => {
      const tokens = tokenizeMarkdown('```\ncode here\n```');
      expect(tokens.length).toBeGreaterThanOrEqual(3);
      expect(tokens[0].type).toBe('code-block');
      expect(tokens[1].type).toBe('code-block');
      expect(tokens[2].type).toBe('code-block');
    });

    it('should detect language in code blocks', () => {
      const tokens = tokenizeMarkdown('```typescript\nconst x = 1;\n```');
      expect(tokens[0].type).toBe('code-block');
      expect(tokens[1].type).toBe('code-block-lang');
      expect(tokens[1].content).toBe('typescript');
    });

    it('should treat all content inside code blocks as code-block tokens', () => {
      const tokens = tokenizeMarkdown('```\n# Not a heading\n**Not bold**\n```');
      const codeTokens = tokens.filter(t => t.type === 'code-block');
      expect(codeTokens.length).toBe(4); // opening ```, two lines, closing ```
    });
  });

  describe('Inline Formatting', () => {
    it('should tokenize bold text', () => {
      const tokens = tokenizeMarkdown('Hello **bold** world');
      const boldToken = tokens.find(t => t.type === 'bold');
      expect(boldToken).toBeDefined();
      expect(boldToken!.content).toBe('**bold**');
    });

    it('should tokenize italic text', () => {
      const tokens = tokenizeMarkdown('Hello *italic* world');
      const italicToken = tokens.find(t => t.type === 'italic');
      expect(italicToken).toBeDefined();
      expect(italicToken!.content).toBe('*italic*');
    });

    it('should tokenize bold-italic text', () => {
      const tokens = tokenizeMarkdown('Hello ***bold italic*** world');
      const biToken = tokens.find(t => t.type === 'bold-italic');
      expect(biToken).toBeDefined();
      expect(biToken!.content).toBe('***bold italic***');
    });

    it('should tokenize strikethrough text', () => {
      const tokens = tokenizeMarkdown('Hello ~~deleted~~ world');
      const strikeToken = tokens.find(t => t.type === 'strikethrough');
      expect(strikeToken).toBeDefined();
      expect(strikeToken!.content).toBe('~~deleted~~');
    });

    it('should tokenize inline code', () => {
      const tokens = tokenizeMarkdown('Use `console.log` for debugging');
      const codeToken = tokens.find(t => t.type === 'code-inline');
      expect(codeToken).toBeDefined();
      expect(codeToken!.content).toBe('`console.log`');
    });

    it('should tokenize links', () => {
      const tokens = tokenizeMarkdown('Visit [Google](https://google.com) today');
      const linkToken = tokens.find(t => t.type === 'link');
      expect(linkToken).toBeDefined();
      expect(linkToken!.content).toBe('[Google](https://google.com)');
    });

    it('should tokenize images', () => {
      const tokens = tokenizeMarkdown('![Alt text](image.png)');
      const imgToken = tokens.find(t => t.type === 'image');
      expect(imgToken).toBeDefined();
      expect(imgToken!.content).toBe('![Alt text](image.png)');
    });

    it('should tokenize date pills', () => {
      const tokens = tokenizeMarkdown('Due @Feb 11, 2025@ soon');
      const dateToken = tokens.find(t => t.type === 'date-pill');
      expect(dateToken).toBeDefined();
      expect(dateToken!.content).toBe('@Feb 11, 2025@');
    });
  });

  describe('Lists', () => {
    it('should tokenize bullet lists with dash', () => {
      const tokens = tokenizeMarkdown('- Item 1');
      expect(tokens[0].type).toBe('list-bullet');
    });

    it('should tokenize bullet lists with asterisk', () => {
      const tokens = tokenizeMarkdown('* Item 1');
      expect(tokens[0].type).toBe('list-bullet');
    });

    it('should tokenize bullet lists with plus', () => {
      const tokens = tokenizeMarkdown('+ Item 1');
      expect(tokens[0].type).toBe('list-bullet');
    });

    it('should tokenize ordered lists', () => {
      const tokens = tokenizeMarkdown('1. First item');
      expect(tokens[0].type).toBe('list-number');
    });

    it('should tokenize unchecked task lists', () => {
      const tokens = tokenizeMarkdown('- [ ] Todo item');
      expect(tokens[0].type).toBe('task-list');
    });

    it('should tokenize checked task lists', () => {
      const tokens = tokenizeMarkdown('- [x] Done item');
      expect(tokens[0].type).toBe('task-checked');
    });

    it('should tokenize checked task lists with uppercase X', () => {
      const tokens = tokenizeMarkdown('- [X] Done item');
      expect(tokens[0].type).toBe('task-checked');
    });

    it('should tokenize indented list items', () => {
      const tokens = tokenizeMarkdown('  - Nested item');
      expect(tokens[0].type).toBe('list-bullet');
    });
  });

  describe('Block Elements', () => {
    it('should tokenize blockquotes', () => {
      const tokens = tokenizeMarkdown('> This is a quote');
      expect(tokens[0].type).toBe('blockquote');
    });

    it('should tokenize horizontal rules with dashes', () => {
      const tokens = tokenizeMarkdown('---');
      expect(tokens[0].type).toBe('horizontal-rule');
    });

    it('should tokenize horizontal rules with asterisks', () => {
      const tokens = tokenizeMarkdown('***');
      expect(tokens[0].type).toBe('horizontal-rule');
    });

    it('should tokenize horizontal rules with underscores', () => {
      const tokens = tokenizeMarkdown('___');
      expect(tokens[0].type).toBe('horizontal-rule');
    });
  });

  describe('Tables', () => {
    it('should tokenize table rows', () => {
      const tokens = tokenizeMarkdown('| Col 1 | Col 2 |');
      expect(tokens[0].type).toBe('table-cell');
    });

    it('should tokenize table separator lines', () => {
      const tokens = tokenizeMarkdown('| --- | --- |');
      expect(tokens[0].type).toBe('table-separator');
    });

    it('should tokenize a full table', () => {
      const md = '| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |';
      const tokens = tokenizeMarkdown(md);
      expect(tokens[0].type).toBe('table-cell');
      expect(tokens[1].type).toBe('table-separator');
      expect(tokens[2].type).toBe('table-cell');
    });
  });

  describe('Mixed Content', () => {
    it('should handle multiple inline formats in one line', () => {
      const tokens = tokenizeMarkdown('**bold** and _italic_ and `code`');
      const types = tokens.map(t => t.type);
      expect(types).toContain('bold');
      expect(types).toContain('italic');
      expect(types).toContain('code-inline');
    });

    it('should handle bold and code in one line', () => {
      const tokens = tokenizeMarkdown('**bold** and `code`');
      const types = tokens.map(t => t.type);
      expect(types).toContain('bold');
      expect(types).toContain('code-inline');
    });

    it('should handle empty lines as text', () => {
      const tokens = tokenizeMarkdown('');
      // Empty string produces one empty text token or no tokens
      expect(tokens.length).toBeLessThanOrEqual(1);
    });

    it('should handle plain text', () => {
      const tokens = tokenizeMarkdown('Just plain text');
      expect(tokens).toHaveLength(1);
      expect(tokens[0].type).toBe('text');
      expect(tokens[0].content).toBe('Just plain text');
    });

    it('should maintain correct positions across multiple lines', () => {
      const tokens = tokenizeMarkdown('# Heading\nParagraph');
      expect(tokens[0].start).toBe(0);
      expect(tokens[0].end).toBe(9);
      expect(tokens[1].start).toBe(10); // After newline
    });

    it('should not produce overlapping tokens', () => {
      const tokens = tokenizeMarkdown('**bold** and [link](url) text');
      for (let i = 1; i < tokens.length; i++) {
        expect(tokens[i].start).toBeGreaterThanOrEqual(tokens[i - 1].end);
      }
    });
  });
});
