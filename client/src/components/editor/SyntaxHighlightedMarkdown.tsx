import { useCallback, useEffect, useRef, useState, useMemo } from 'react';

/*
 * DESIGN: Syntax Highlighted Markdown Editor
 * A textarea with an overlay that provides syntax highlighting for markdown
 * Supports headers, bold, italic, links, code, lists, and more
 */

interface SyntaxHighlightedMarkdownProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  editable?: boolean;
  autofocus?: boolean;
  className?: string;
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
    let linePos = 0;
    let lastEnd = 0;
    const inlineTokens: Token[] = [];

    // Process inline patterns
    const inlinePatterns = [
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

    // Add remaining text
    if (lastEnd < line.length) {
      tokens.push({
        type: 'text',
        content: line.substring(lastEnd),
        start: lineStart + lastEnd,
        end: lineStart + line.length,
      });
    }

    // If no inline tokens were added, add the whole line as text
    if (nonOverlapping.length === 0 && line.length > 0) {
      tokens.push({
        type: 'text',
        content: line,
        start: lineStart,
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

// Render highlighted HTML from tokens
function renderHighlightedHtml(content: string, tokens: Token[]): string {
  if (tokens.length === 0) {
    return escapeHtml(content);
  }

  let html = '';
  let lastEnd = 0;
  const lines = content.split('\n');
  let currentLine = 0;
  let lineStart = 0;

  // Group tokens by line for proper newline handling
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineEnd = lineStart + line.length;
    
    // Find tokens for this line
    const lineTokens = tokens.filter(t => t.start >= lineStart && t.start < lineEnd);
    
    let linePos = lineStart;
    for (const token of lineTokens) {
      // Add any gap before this token
      if (token.start > linePos) {
        html += escapeHtml(content.substring(linePos, token.start));
      }
      // Add the token with highlighting
      html += `<span class="${getTokenClass(token.type)}">${escapeHtml(token.content)}</span>`;
      linePos = token.end;
    }
    
    // Add remaining content on this line
    if (linePos < lineEnd) {
      html += escapeHtml(content.substring(linePos, lineEnd));
    }
    
    // Add newline (except for last line)
    if (i < lines.length - 1) {
      html += '\n';
    }
    
    lineStart = lineEnd + 1;
  }

  return html;
}

export function SyntaxHighlightedMarkdown({
  content,
  onChange,
  placeholder = 'Write your markdown here...',
  editable = true,
  autofocus = false,
  className = '',
}: SyntaxHighlightedMarkdownProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tokenize and render highlighted content
  const highlightedHtml = useMemo(() => {
    const tokens = tokenizeMarkdown(content);
    return renderHighlightedHtml(content, tokens);
  }, [content]);

  // Auto-resize textarea to fit content
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    const highlight = highlightRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.max(textarea.scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
      if (highlight) {
        highlight.style.height = `${newHeight}px`;
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

  // Handle tab key for indentation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      
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
        onChange(newContent);
        
        setTimeout(() => {
          const removedChars = (currentLineStart + selection).length - outdentedLines.join('\n').length;
          textarea.selectionStart = Math.max(lineStart, start - (lines[0].length - outdentedLines[0].length));
          textarea.selectionEnd = end - removedChars;
        }, 0);
      } else {
        if (start === end) {
          const newContent = value.substring(0, start) + '  ' + value.substring(end);
          onChange(newContent);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + 2;
          }, 0);
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
          onChange(newContent);
          
          setTimeout(() => {
            textarea.selectionStart = start + 2;
            textarea.selectionEnd = end + (lines.length * 2);
          }, 0);
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
        onChange={(e) => onChange(e.target.value)}
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
