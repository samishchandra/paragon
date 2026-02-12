import { useCallback, useEffect, useRef, useState, useMemo } from 'react';

/*
 * DESIGN: Syntax Highlighted Markdown Editor
 * A textarea with an overlay that provides syntax highlighting for markdown
 * Supports headers, bold, italic, links, code, lists, and more
 * 
 * CRITICAL: The overlay and textarea MUST have identical font metrics.
 * Never apply font-size changes to overlay tokens — this causes cursor/text misalignment.
 */

interface SearchMatch {
  from: number;
  to: number;
}

interface SyntaxHighlightedMarkdownProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  editable?: boolean;
  autofocus?: boolean;
  className?: string;
  /** Search matches to highlight in the overlay */
  searchMatches?: SearchMatch[];
  /** Index of the current active match (highlighted differently) */
  currentMatchIndex?: number;
}

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

// Tokenize markdown content for syntax highlighting
function tokenizeMarkdown(text: string): Token[] {
  const tokens: Token[] = [];
  const lines = text.split('\n');
  let pos = 0;
  let inCodeBlock = false;
  let codeBlockLang = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineStart = pos;
    
    // Code block handling
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLang = line.slice(3).trim();
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

    // Table row (with pipes)
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

    // Process inline patterns
    const inlinePatterns = [
      // Date pills (@Mon DD, YYYY@)
      { regex: /@[A-Z][a-z]{2}\s+\d{1,2},\s+\d{4}@/g, type: 'date-pill' as TokenType },
      // Bold italic (must come before bold and italic)
      { regex: /\*\*\*(.+?)\*\*\*|___(.+?)___/g, type: 'bold-italic' as TokenType },
      // Bold
      { regex: /\*\*(.+?)\*\*|__(.+?)__/g, type: 'bold' as TokenType },
      // Italic
      { regex: /\*(.+?)\*|_(.+?)_/g, type: 'italic' as TokenType },
      // Strikethrough
      { regex: /~~(.+?)~~/g, type: 'strikethrough' as TokenType },
      // Inline code
      { regex: /`([^`]+)`/g, type: 'code-inline' as TokenType },
      // Images (must come before links)
      { regex: /!\[([^\]]*)\]\(([^)]+)\)/g, type: 'image' as TokenType },
      // Links
      { regex: /\[([^\]]+)\]\(([^)]+)\)/g, type: 'link' as TokenType },
    ];

    // Collect all inline matches
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

    // Sort by position and remove overlaps
    allMatches.sort((a, b) => a.start - b.start);
    const nonOverlapping: typeof allMatches = [];
    let lastMatchEnd = lineStart;
    
    for (const match of allMatches) {
      if (match.start >= lastMatchEnd) {
        nonOverlapping.push(match);
        lastMatchEnd = match.end;
      }
    }

    // Add tokens for inline matches
    for (const match of nonOverlapping) {
      if (match.start > lineStart + lastEnd) {
        // Add text token before this match
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

    // Add remaining text after the last inline match
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

// Get CSS class for token type
function getTokenClass(type: TokenType): string {
  const classMap: Record<TokenType, string> = {
    'heading1': 'md-heading md-h1',
    'heading2': 'md-heading md-h2',
    'heading3': 'md-heading md-h3',
    'heading4': 'md-heading md-h4',
    'heading5': 'md-heading md-h5',
    'heading6': 'md-heading md-h6',
    'bold': 'md-bold',
    'italic': 'md-italic',
    'bold-italic': 'md-bold-italic',
    'strikethrough': 'md-strikethrough',
    'code-inline': 'md-code-inline',
    'code-block': 'md-code-block',
    'code-block-lang': 'md-code-lang',
    'link': 'md-link',
    'link-text': 'md-link-text',
    'link-url': 'md-link-url',
    'image': 'md-image',
    'list-bullet': 'md-list-bullet',
    'list-number': 'md-list-number',
    'task-list': 'md-task',
    'task-checked': 'md-task-checked',
    'blockquote': 'md-blockquote',
    'horizontal-rule': 'md-hr',
    'table-header': 'md-table-header',
    'table-separator': 'md-table-separator',
    'table-cell': 'md-table-cell',
    'date-pill': 'md-date-pill',
    'text': 'md-text',
  };
  return classMap[type] || 'md-text';
}

// Escape HTML entities
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Wrap a segment of text with search highlight markup
function wrapSearchHighlight(text: string, isCurrentMatch: boolean): string {
  const cls = isCurrentMatch ? 'search-highlight search-highlight-current' : 'search-highlight';
  return `<mark class="${cls}">${text}</mark>`;
}

// Render highlighted HTML from tokens, with optional search match overlays
function renderHighlightedHtml(
  content: string,
  tokens: Token[],
  searchMatches?: SearchMatch[],
  currentMatchIndex?: number
): string {
  if (tokens.length === 0 && (!searchMatches || searchMatches.length === 0)) {
    return escapeHtml(content);
  }

  // Build a flat list of segments with their classes
  // First pass: render with syntax tokens
  let html = '';
  const lines = content.split('\n');
  let lineStart = 0;

  // If no search matches, use the simple token-only rendering
  if (!searchMatches || searchMatches.length === 0) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineEnd = lineStart + line.length;
      const lineTokens = tokens.filter(t => t.start >= lineStart && t.start < lineEnd);
      let linePos = lineStart;
      for (const token of lineTokens) {
        if (token.start > linePos) {
          html += escapeHtml(content.substring(linePos, token.start));
        }
        html += `<span class="${getTokenClass(token.type)}">${escapeHtml(token.content)}</span>`;
        linePos = token.end;
      }
      if (linePos < lineEnd) {
        html += escapeHtml(content.substring(linePos, lineEnd));
      }
      if (i < lines.length - 1) {
        html += '\n';
      }
      lineStart = lineEnd + 1;
    }
    return html;
  }

  // With search matches: render character by character awareness
  // Build a map of search match ranges
  const searchMap = new Map<number, { matchIdx: number; isCurrent: boolean }>();
  searchMatches.forEach((match, idx) => {
    for (let pos = match.from; pos < match.to; pos++) {
      searchMap.set(pos, { matchIdx: idx, isCurrent: idx === currentMatchIndex });
    }
  });

  lineStart = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineEnd = lineStart + line.length;
    const lineTokens = tokens.filter(t => t.start >= lineStart && t.start < lineEnd);

    // Process the line character by character, respecting both tokens and search matches
    let linePos = lineStart;
    for (const token of lineTokens) {
      // Gap before token
      if (token.start > linePos) {
        html += renderSegmentWithSearch(content, linePos, token.start, null, searchMap);
      }
      // Token content
      html += renderSegmentWithSearch(content, token.start, token.end, getTokenClass(token.type), searchMap);
      linePos = token.end;
    }
    // Remaining text after last token
    if (linePos < lineEnd) {
      html += renderSegmentWithSearch(content, linePos, lineEnd, null, searchMap);
    }
    if (i < lines.length - 1) {
      html += '\n';
    }
    lineStart = lineEnd + 1;
  }

  return html;
}

// Render a segment of text, splitting it into search-highlighted and non-highlighted parts
function renderSegmentWithSearch(
  content: string,
  from: number,
  to: number,
  tokenClass: string | null,
  searchMap: Map<number, { matchIdx: number; isCurrent: boolean }>
): string {
  let result = '';
  let pos = from;

  while (pos < to) {
    const searchInfo = searchMap.get(pos);
    if (searchInfo) {
      // Collect consecutive chars in the same search match
      const matchStart = pos;
      while (pos < to && searchMap.get(pos)?.matchIdx === searchInfo.matchIdx) {
        pos++;
      }
      const text = escapeHtml(content.substring(matchStart, pos));
      const highlightCls = searchInfo.isCurrent ? 'search-highlight search-highlight-current' : 'search-highlight';
      if (tokenClass) {
        result += `<span class="${tokenClass}"><mark class="${highlightCls}">${text}</mark></span>`;
      } else {
        result += `<mark class="${highlightCls}">${text}</mark>`;
      }
    } else {
      // Collect consecutive non-search chars
      const start = pos;
      while (pos < to && !searchMap.has(pos)) {
        pos++;
      }
      const text = escapeHtml(content.substring(start, pos));
      if (tokenClass) {
        result += `<span class="${tokenClass}">${text}</span>`;
      } else {
        result += text;
      }
    }
  }

  return result;
}

export function SyntaxHighlightedMarkdown({
  content,
  onChange,
  placeholder = 'Write your markdown here...',
  editable = true,
  autofocus = false,
  className = '',
  searchMatches,
  currentMatchIndex,
}: SyntaxHighlightedMarkdownProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pendingCursorRef = useRef<{ start: number; end: number } | null>(null);

  // Tokenize and render highlighted content (with optional search highlights)
  const highlightedHtml = useMemo(() => {
    const tokens = tokenizeMarkdown(content);
    return renderHighlightedHtml(content, tokens, searchMatches, currentMatchIndex);
  }, [content, searchMatches, currentMatchIndex]);

  // Auto-resize textarea to fit content
  // CRITICAL: Save and restore scrollTop to prevent cursor jumps
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    const highlight = highlightRef.current;
    const container = containerRef.current;
    if (textarea) {
      const savedScrollTop = textarea.scrollTop;
      const savedSelectionStart = textarea.selectionStart;
      const savedSelectionEnd = textarea.selectionEnd;
      
      // Use the container's height as the minimum so the textarea fills the available space
      const containerHeight = container ? container.clientHeight : 200;
      textarea.style.height = 'auto';
      const newHeight = Math.max(textarea.scrollHeight, containerHeight, 200);
      textarea.style.height = `${newHeight}px`;
      if (highlight) {
        highlight.style.height = `${newHeight}px`;
      }
      
      // Restore scroll position and selection after height adjustment
      textarea.scrollTop = savedScrollTop;
      if (highlight) {
        highlight.scrollTop = savedScrollTop;
      }
    }
  }, []);

  // Sync scroll between textarea and highlight overlay
  const syncScroll = useCallback(() => {
    const textarea = textareaRef.current;
    const highlight = highlightRef.current;
    if (textarea && highlight) {
      highlight.scrollTop = textarea.scrollTop;
      highlight.scrollLeft = textarea.scrollLeft;
    }
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [content, adjustHeight]);

  useEffect(() => {
    if (autofocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autofocus]);

  // Restore cursor position after React commits the re-render
  useEffect(() => {
    if (pendingCursorRef.current && textareaRef.current) {
      const { start, end } = pendingCursorRef.current;
      textareaRef.current.selectionStart = start;
      textareaRef.current.selectionEnd = end;
      pendingCursorRef.current = null;
    }
  }, [content]);

  // Handle input changes - save cursor position for restoration after re-render
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    pendingCursorRef.current = {
      start: textarea.selectionStart,
      end: textarea.selectionEnd,
    };
    onChange(textarea.value);
  }, [onChange]);

  // Handle markdown autocomplete and tab key
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const hasSelection = start !== end;

    // --- Markdown autocomplete pairs ---

    // Backtick: auto-close ` or wrap selection
    if (e.key === '`' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      if (hasSelection) {
        const selected = value.substring(start, end);
        const newContent = value.substring(0, start) + '`' + selected + '`' + value.substring(end);
        pendingCursorRef.current = { start: start + 1, end: end + 1 };
        onChange(newContent);
      } else {
        // Check if we're already inside backticks and the next char is a backtick — skip over it
        if (value[start] === '`') {
          pendingCursorRef.current = { start: start + 1, end: start + 1 };
          onChange(value); // trigger re-render to restore cursor
          // Actually just move cursor
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        } else {
          const newContent = value.substring(0, start) + '``' + value.substring(end);
          pendingCursorRef.current = { start: start + 1, end: start + 1 };
          onChange(newContent);
        }
      }
      return;
    }

    // Asterisk (*): auto-close * or ** or wrap selection
    if (e.key === '*' && !e.ctrlKey && !e.metaKey) {
      // Check if previous char is also * (making it **)
      const prevChar = value[start - 1];
      if (prevChar === '*' && value[start] === '*') {
        // We just typed the second * and there's already a closing * — we're inside **|**
        // The auto-close already added the pair, just skip
        // Actually this case is handled by the skip-over logic below
      }

      if (hasSelection) {
        e.preventDefault();
        const selected = value.substring(start, end);
        // If shift is held, use single *; otherwise check if prev char is * for **
        const newContent = value.substring(0, start) + '*' + selected + '*' + value.substring(end);
        pendingCursorRef.current = { start: start + 1, end: end + 1 };
        onChange(newContent);
        return;
      }

      // Skip over closing * if next char is *
      if (value[start] === '*') {
        e.preventDefault();
        pendingCursorRef.current = { start: start + 1, end: start + 1 };
        // Force re-render to apply cursor
        onChange(value.substring(0, start) + value.substring(start));
        return;
      }

      // Auto-close: insert ** and place cursor between
      e.preventDefault();
      const newContent = value.substring(0, start) + '**' + value.substring(end);
      pendingCursorRef.current = { start: start + 1, end: start + 1 };
      onChange(newContent);
      return;
    }

    // Underscore (_): auto-close _ or __ or wrap selection
    if (e.key === '_' && !e.ctrlKey && !e.metaKey) {
      if (hasSelection) {
        e.preventDefault();
        const selected = value.substring(start, end);
        const newContent = value.substring(0, start) + '_' + selected + '_' + value.substring(end);
        pendingCursorRef.current = { start: start + 1, end: end + 1 };
        onChange(newContent);
        return;
      }

      // Skip over closing _
      if (value[start] === '_') {
        e.preventDefault();
        pendingCursorRef.current = { start: start + 1, end: start + 1 };
        onChange(value.substring(0, start) + value.substring(start));
        return;
      }

      // Auto-close
      e.preventDefault();
      const newContent = value.substring(0, start) + '__' + value.substring(end);
      pendingCursorRef.current = { start: start + 1, end: start + 1 };
      onChange(newContent);
      return;
    }

    // Tilde (~): auto-close ~~ for strikethrough or wrap selection
    if (e.key === '~' && !e.ctrlKey && !e.metaKey) {
      if (hasSelection) {
        e.preventDefault();
        const selected = value.substring(start, end);
        const newContent = value.substring(0, start) + '~' + selected + '~' + value.substring(end);
        pendingCursorRef.current = { start: start + 1, end: end + 1 };
        onChange(newContent);
        return;
      }

      // Skip over closing ~
      if (value[start] === '~') {
        e.preventDefault();
        pendingCursorRef.current = { start: start + 1, end: start + 1 };
        onChange(value.substring(0, start) + value.substring(start));
        return;
      }

      // Auto-close
      e.preventDefault();
      const newContent = value.substring(0, start) + '~~' + value.substring(end);
      pendingCursorRef.current = { start: start + 1, end: start + 1 };
      onChange(newContent);
      return;
    }

    // Open bracket [: auto-close []() for links or wrap selection
    if (e.key === '[' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      if (hasSelection) {
        const selected = value.substring(start, end);
        const newContent = value.substring(0, start) + '[' + selected + ']()' + value.substring(end);
        // Place cursor inside the () for the URL
        pendingCursorRef.current = { start: end + 3, end: end + 3 };
        onChange(newContent);
      } else {
        const newContent = value.substring(0, start) + '[]()' + value.substring(end);
        // Place cursor inside the [] for the link text
        pendingCursorRef.current = { start: start + 1, end: start + 1 };
        onChange(newContent);
      }
      return;
    }

    // Close bracket ]: skip over if next char is ]
    if (e.key === ']' && !e.ctrlKey && !e.metaKey && value[start] === ']') {
      e.preventDefault();
      pendingCursorRef.current = { start: start + 1, end: start + 1 };
      onChange(value.substring(0, start) + value.substring(start));
      return;
    }

    // Close paren ): skip over if next char is )
    if (e.key === ')' && !e.ctrlKey && !e.metaKey && value[start] === ')') {
      e.preventDefault();
      pendingCursorRef.current = { start: start + 1, end: start + 1 };
      onChange(value.substring(0, start) + value.substring(start));
      return;
    }

    // Backspace: delete both characters of an empty pair
    if (e.key === 'Backspace' && !hasSelection && start > 0) {
      const prevChar = value[start - 1];
      const nextChar = value[start];
      const emptyPairs = [
        ['`', '`'],
        ['*', '*'],
        ['_', '_'],
        ['~', '~'],
        ['[', ']'],
      ];
      for (const [open, close] of emptyPairs) {
        if (prevChar === open && nextChar === close) {
          e.preventDefault();
          const newContent = value.substring(0, start - 1) + value.substring(start + 1);
          pendingCursorRef.current = { start: start - 1, end: start - 1 };
          onChange(newContent);
          return;
        }
      }
      // Special case: delete empty []() link
      if (prevChar === '[' && value.substring(start, start + 3) === ']()') {
        e.preventDefault();
        const newContent = value.substring(0, start - 1) + value.substring(start + 3);
        pendingCursorRef.current = { start: start - 1, end: start - 1 };
        onChange(newContent);
        return;
      }
    }

    // --- Tab key for indentation ---
    if (e.key === 'Tab') {
      e.preventDefault();
      
      if (e.shiftKey) {
        // Outdent
        const beforeSelection = value.substring(0, start);
        const selection = value.substring(start, end);
        const afterSelection = value.substring(end);
        
        const lastNewline = beforeSelection.lastIndexOf('\n');
        const lineStart = lastNewline + 1;
        const linesBefore = beforeSelection.substring(0, lineStart);
        const currentLineStart = beforeSelection.substring(lineStart);
        
        const lines = (currentLineStart + selection).split('\n');
        const outdentedLines = lines.map(line => {
          if (line.startsWith('  ')) return line.substring(2);
          if (line.startsWith('\t')) return line.substring(1);
          return line;
        });
        
        const newContent = linesBefore + outdentedLines.join('\n') + afterSelection;
        const removedChars = (currentLineStart + selection).length - outdentedLines.join('\n').length;
        pendingCursorRef.current = {
          start: Math.max(lineStart, start - (lines[0].length - outdentedLines[0].length)),
          end: end - removedChars,
        };
        onChange(newContent);
      } else {
        if (start === end) {
          const newContent = value.substring(0, start) + '  ' + value.substring(end);
          pendingCursorRef.current = { start: start + 2, end: start + 2 };
          onChange(newContent);
        } else {
          const beforeSelection = value.substring(0, start);
          const selection = value.substring(start, end);
          const afterSelection = value.substring(end);
          
          const lastNewline = beforeSelection.lastIndexOf('\n');
          const lineStart = lastNewline + 1;
          const linesBefore = beforeSelection.substring(0, lineStart);
          const currentLineStart = beforeSelection.substring(lineStart);
          
          const lines = (currentLineStart + selection).split('\n');
          const indentedLines = lines.map(line => '  ' + line);
          
          const newContent = linesBefore + indentedLines.join('\n') + afterSelection;
          pendingCursorRef.current = {
            start: start + 2,
            end: end + (lines.length * 2),
          };
          onChange(newContent);
        }
      }
    }
  }, [onChange]);

  return (
    <div ref={containerRef} className={`syntax-highlighted-editor ${className}`}>
      <div 
        ref={highlightRef}
        className="syntax-highlight-overlay"
        dangerouslySetInnerHTML={{ __html: highlightedHtml || `<span class="md-placeholder">${escapeHtml(placeholder)}</span>` }}
        aria-hidden="true"
      />
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onScroll={syncScroll}
        placeholder=""
        disabled={!editable}
        className="syntax-textarea"
        spellCheck={false}
      />
    </div>
  );
}

export default SyntaxHighlightedMarkdown;
