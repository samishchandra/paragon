import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Typography from '@tiptap/extension-typography';
import { common, createLowlight } from 'lowlight';
import { useCallback, useEffect, useMemo } from 'react';
import { FloatingToolbar } from './FloatingToolbar';
import { Callout } from './extensions/Callout';
import { ResizableImage } from './extensions/ResizableImage';
import { SlashCommands } from './SlashCommands';
import { EditorToolbar } from './EditorToolbar';

/*
 * DESIGN: Dark Mode Craftsman
 * Professional markdown editor inspired by VS Code and Obsidian
 * Multi-layer dark theme with depth through layering
 * Glassmorphic floating toolbar with backdrop blur
 */

// Initialize lowlight with common languages
const lowlight = createLowlight(common);

export interface MarkdownEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  onHTMLChange?: (html: string) => void;
  placeholder?: string;
  editable?: boolean;
  autofocus?: boolean;
  className?: string;
  showToolbar?: boolean;
  showWordCount?: boolean;
  theme?: 'dark' | 'light';
}

export function MarkdownEditor({
  content = '',
  onChange,
  onHTMLChange,
  placeholder = 'Start writing... Use "/" for commands',
  editable = true,
  autofocus = false,
  className = '',
  showToolbar = true,
  showWordCount = true,
}: MarkdownEditorProps) {
  const extensions = useMemo(() => [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4, 5, 6],
      },
      codeBlock: false, // We use CodeBlockLowlight instead
      dropcursor: {
        color: 'var(--primary)',
        width: 2,
      },
    }),
    Placeholder.configure({
      placeholder,
      emptyEditorClass: 'is-editor-empty',
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Highlight.configure({
      multicolor: true,
    }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      linkOnPaste: true,
      HTMLAttributes: {
        rel: 'noopener noreferrer',
        target: '_blank',
      },
    }),
    Table.configure({
      resizable: true,
      HTMLAttributes: {
        class: 'editor-table',
      },
    }),
    TableRow,
    TableCell,
    TableHeader,
    TaskList.configure({
      HTMLAttributes: {
        class: 'task-list',
      },
    }),
    TaskItem.configure({
      nested: true,
      HTMLAttributes: {
        class: 'task-item',
      },
    }),
    CodeBlockLowlight.configure({
      lowlight,
      defaultLanguage: 'plaintext',
      HTMLAttributes: {
        class: 'code-block',
      },
    }),
    Underline,
    Subscript,
    Superscript,
    Typography,
    Callout,
    ResizableImage.configure({
      allowBase64: true,
      HTMLAttributes: {
        class: 'editor-image',
      },
    }),
  ], [placeholder]);

  const editor = useEditor({
    extensions,
    content,
    editable,
    autofocus,
    editorProps: {
      attributes: {
        class: 'tiptap-editor outline-none min-h-full',
      },
      // Handle paste to convert markdown
      handlePaste: (_view, event) => {
        const text = event.clipboardData?.getData('text/plain');
        if (text) {
          // Check for markdown patterns and convert
          const markdownPatterns = [
            /^#{1,6}\s/, // Headings
            /^\*\s|\-\s/, // Bullet lists
            /^\d+\.\s/, // Ordered lists
            /^\*\*.*\*\*/, // Bold
            /^\*.*\*/, // Italic
            /^```/, // Code blocks
            /^\[.*\]\(.*\)/, // Links
            /^>\s/, // Blockquotes
            /^\* \[ \]|\* \[x\]/, // Task lists
          ];
          
          const hasMarkdown = markdownPatterns.some(pattern => pattern.test(text));
          
          if (hasMarkdown) {
            // Let TipTap handle markdown conversion
            return false;
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        // Get content as HTML (can be converted to markdown on the consumer side)
        const html = editor.getHTML();
        onChange(html);
      }
      if (onHTMLChange) {
        onHTMLChange(editor.getHTML());
      }
    },
  });

  // Handle keyboard shortcuts for markdown auto-detection
  useEffect(() => {
    if (!editor) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Auto-detect markdown shortcuts on space
      if (event.key === ' ') {
        const { state } = editor;
        const { selection } = state;
        const { $from } = selection;
        const textBefore = $from.nodeBefore?.textContent || '';
        
        // Heading shortcuts
        if (textBefore === '#') {
          event.preventDefault();
          editor.chain().focus().deleteRange({ from: $from.pos - 1, to: $from.pos }).setHeading({ level: 1 }).run();
          return;
        }
        if (textBefore === '##') {
          event.preventDefault();
          editor.chain().focus().deleteRange({ from: $from.pos - 2, to: $from.pos }).setHeading({ level: 2 }).run();
          return;
        }
        if (textBefore === '###') {
          event.preventDefault();
          editor.chain().focus().deleteRange({ from: $from.pos - 3, to: $from.pos }).setHeading({ level: 3 }).run();
          return;
        }
        
        // List shortcuts
        if (textBefore === '-' || textBefore === '*') {
          event.preventDefault();
          editor.chain().focus().deleteRange({ from: $from.pos - 1, to: $from.pos }).toggleBulletList().run();
          return;
        }
        if (textBefore === '1.') {
          event.preventDefault();
          editor.chain().focus().deleteRange({ from: $from.pos - 2, to: $from.pos }).toggleOrderedList().run();
          return;
        }
        
        // Task list shortcut
        if (textBefore === '[]' || textBefore === '[ ]') {
          event.preventDefault();
          const len = textBefore.length;
          editor.chain().focus().deleteRange({ from: $from.pos - len, to: $from.pos }).toggleTaskList().run();
          return;
        }
        
        // Blockquote shortcut
        if (textBefore === '>') {
          event.preventDefault();
          editor.chain().focus().deleteRange({ from: $from.pos - 1, to: $from.pos }).toggleBlockquote().run();
          return;
        }
        
        // Horizontal rule shortcut
        if (textBefore === '---' || textBefore === '***') {
          event.preventDefault();
          editor.chain().focus().deleteRange({ from: $from.pos - 3, to: $from.pos }).setHorizontalRule().run();
          return;
        }
        
        // Code block shortcut
        if (textBefore === '```') {
          event.preventDefault();
          editor.chain().focus().deleteRange({ from: $from.pos - 3, to: $from.pos }).toggleCodeBlock().run();
          return;
        }
      }
    };

    // Add event listener to the editor DOM
    const editorElement = editor.view.dom;
    editorElement.addEventListener('keydown', handleKeyDown);

    return () => {
      editorElement.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor]);

  // Word and character count
  const wordCount = useMemo(() => {
    if (!editor) return { words: 0, characters: 0 };
    const text = editor.getText();
    const words = text.split(/\s+/).filter(word => word.length > 0).length;
    const characters = text.length;
    return { words, characters };
  }, [editor?.getText()]);

  // Copy content as markdown
  const copyAsMarkdown = useCallback(() => {
    if (!editor) return;
    const html = editor.getHTML();
    // Simple HTML to Markdown conversion for common elements
    let markdown = html
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
      .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
      .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
      .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n')
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
      .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
      .replace(/<s[^>]*>(.*?)<\/s>/gi, '~~$1~~')
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n')
      .replace(/<hr[^>]*>/gi, '---\n\n')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
      .replace(/<br[^>]*>/gi, '\n')
      .replace(/<[^>]+>/g, '');
    
    navigator.clipboard.writeText(markdown.trim());
  }, [editor]);

  if (!editor) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full bg-background rounded-lg border border-border overflow-hidden ${className}`}>
      {/* Top Toolbar */}
      {showToolbar && <EditorToolbar editor={editor} onCopyMarkdown={copyAsMarkdown} />}
      
      {/* Editor Content */}
      <div className="flex-1 overflow-auto relative">
        <EditorContent 
          editor={editor} 
          className="h-full"
        />
        
        {/* Floating Toolbar on Selection */}
        <FloatingToolbar editor={editor} />
        
        {/* Slash Commands */}
        <SlashCommands editor={editor} />
      </div>
      
      {/* Word Count Footer */}
      {showWordCount && (
        <div className="word-count">
          <span>{wordCount.words} words</span>
          <span>{wordCount.characters} characters</span>
        </div>
      )}
    </div>
  );
}

export default MarkdownEditor;
