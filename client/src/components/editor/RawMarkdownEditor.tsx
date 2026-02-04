import { useCallback, useEffect, useRef } from 'react';

/*
 * DESIGN: Raw Markdown Editor
 * A simple textarea for editing raw markdown text
 * Provides precise text editing without WYSIWYG formatting
 */

interface RawMarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  editable?: boolean;
  autofocus?: boolean;
  className?: string;
}

export function RawMarkdownEditor({
  content,
  onChange,
  placeholder = 'Write your markdown here...',
  editable = true,
  autofocus = false,
  className = '',
}: RawMarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea to fit content
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(textarea.scrollHeight, 200)}px`;
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
        // Outdent: remove leading spaces/tabs from selected lines
        const beforeSelection = value.substring(0, start);
        const selection = value.substring(start, end);
        const afterSelection = value.substring(end);
        
        const lastNewline = beforeSelection.lastIndexOf('\n');
        const lineStart = lastNewline + 1;
        const linesBefore = beforeSelection.substring(0, lineStart);
        const currentLineStart = beforeSelection.substring(lineStart);
        
        // Remove indentation from current line and selected lines
        const lines = (currentLineStart + selection).split('\n');
        const outdentedLines = lines.map(line => {
          if (line.startsWith('  ')) return line.substring(2);
          if (line.startsWith('\t')) return line.substring(1);
          return line;
        });
        
        const newContent = linesBefore + outdentedLines.join('\n') + afterSelection;
        onChange(newContent);
        
        // Adjust cursor position
        setTimeout(() => {
          const removedChars = (currentLineStart + selection).length - outdentedLines.join('\n').length;
          textarea.selectionStart = Math.max(lineStart, start - (lines[0].length - outdentedLines[0].length));
          textarea.selectionEnd = end - removedChars;
        }, 0);
      } else {
        // Indent: add spaces at cursor or to selected lines
        if (start === end) {
          // No selection - insert spaces at cursor
          const newContent = value.substring(0, start) + '  ' + value.substring(end);
          onChange(newContent);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + 2;
          }, 0);
        } else {
          // Selection - indent all selected lines
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
    <div className={`raw-markdown-editor ${className}`}>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={!editable}
        className="raw-markdown-textarea"
        spellCheck={false}
      />
    </div>
  );
}

export default RawMarkdownEditor;
