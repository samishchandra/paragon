import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  CheckSquare,
} from 'lucide-react';
import { useCallback, useState, useEffect, useRef } from 'react';

/*
 * DESIGN: Dark Mode Craftsman
 * Glassmorphic floating toolbar with backdrop blur
 * Snappy animations (100-200ms)
 * Vibrant cyan accent for active states
 */

interface FloatingToolbarProps {
  editor: Editor;
  className?: string;
}

interface ToolbarButtonProps {
  onMouseDown: (e: React.MouseEvent) => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title?: string;
}

// Use onMouseDown instead of onClick to prevent losing selection
const ToolbarButton = ({ onMouseDown, isActive, disabled, children, title }: ToolbarButtonProps) => (
  <button
    onMouseDown={onMouseDown}
    disabled={disabled}
    title={title}
    className={`
      flex items-center justify-center w-8 h-8 rounded-md
      transition-all duration-100 ease-out
      ${isActive 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-transparent text-foreground hover:bg-secondary'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
  >
    {children}
  </button>
);

const Divider = () => (
  <div className="w-px h-5 bg-border mx-1" />
);

export function FloatingToolbar({ editor, className = '' }: FloatingToolbarProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const toolbarRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setLink = useCallback(() => {
    if (linkUrl) {
      let finalUrl = linkUrl.trim();
      if (!/^https?:\/\//i.test(finalUrl) && !finalUrl.startsWith('mailto:')) {
        finalUrl = 'https://' + finalUrl;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: finalUrl })
        .run();
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }
    setShowLinkInput(false);
    setLinkUrl('');
  }, [editor, linkUrl]);

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const previousUrl = editor.getAttributes('link').href;
    setLinkUrl(previousUrl || '');
    setShowLinkInput(true);
  };

  // Helper to execute editor commands without losing selection
  const executeCommand = useCallback((e: React.MouseEvent, command: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    command();
  }, []);

  // Update toolbar visibility and position based on selection
  useEffect(() => {
    const updateToolbar = () => {
      const { selection } = editor.state;
      const { empty, from, to } = selection;

      // Hide if selection is empty or in code block
      if (empty || editor.isActive('codeBlock')) {
        // Delay hiding to allow button clicks
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
          setShowLinkInput(false);
        }, 150);
        return;
      }

      // Clear any pending hide
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }

      // Get selection coordinates
      const start = editor.view.coordsAtPos(from);
      const end = editor.view.coordsAtPos(to);
      
      // Get editor container bounds
      const editorRect = editor.view.dom.getBoundingClientRect();
      
      // Calculate center position relative to editor
      const left = ((start.left + end.left) / 2) - editorRect.left;
      const top = start.top - editorRect.top - 50; // Position above selection

      setPosition({ top: Math.max(10, top), left });
      setIsVisible(true);
    };

    editor.on('selectionUpdate', updateToolbar);
    editor.on('transaction', updateToolbar);

    return () => {
      editor.off('selectionUpdate', updateToolbar);
      editor.off('transaction', updateToolbar);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [editor]);

  // Keep toolbar visible when interacting with it
  const handleToolbarMouseDown = (e: React.MouseEvent) => {
    // Prevent the toolbar from hiding when clicking on it
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  if (!isVisible) {
    return null;
  }

  if (showLinkInput) {
    return (
      <div
        ref={toolbarRef}
        className={`floating-toolbar absolute z-50 ${className}`}
        style={{ top: position.top, left: position.left, transform: 'translateX(-50%)' }}
        onMouseDown={handleToolbarMouseDown}
      >
        <div className="flex items-center gap-2 px-2">
          <input
            type="url"
            placeholder="Enter URL..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setLink();
              }
              if (e.key === 'Escape') {
                setShowLinkInput(false);
                setLinkUrl('');
              }
            }}
            className="
              bg-transparent border-none outline-none
              text-sm text-foreground placeholder:text-muted-foreground
              w-48
            "
            autoFocus
          />
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              setLink();
            }}
            className="
              px-3 py-1 text-xs font-medium rounded
              bg-primary text-primary-foreground
              hover:opacity-90 transition-opacity
            "
          >
            Apply
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              setShowLinkInput(false);
              setLinkUrl('');
            }}
            className="
              px-2 py-1 text-xs font-medium rounded
              bg-secondary text-secondary-foreground
              hover:bg-accent transition-colors
            "
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={toolbarRef}
      className={`floating-toolbar absolute z-50 ${className}`}
      style={{ top: position.top, left: position.left, transform: 'translateX(-50%)' }}
      onMouseDown={handleToolbarMouseDown}
    >
      {/* Text formatting */}
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleBold().run())}
        isActive={editor.isActive('bold')}
        title="Bold (Ctrl+B)"
      >
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleItalic().run())}
        isActive={editor.isActive('italic')}
        title="Italic (Ctrl+I)"
      >
        <Italic size={16} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleUnderline().run())}
        isActive={editor.isActive('underline')}
        title="Underline (Ctrl+U)"
      >
        <Underline size={16} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleStrike().run())}
        isActive={editor.isActive('strike')}
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleCode().run())}
        isActive={editor.isActive('code')}
        title="Inline Code (Ctrl+E)"
      >
        <Code size={16} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleHighlight().run())}
        isActive={editor.isActive('highlight')}
        title="Highlight"
      >
        <Highlighter size={16} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={handleLinkClick}
        isActive={editor.isActive('link')}
        title="Link (Ctrl+K)"
      >
        <Link size={16} />
      </ToolbarButton>

      <Divider />

      {/* Headings */}
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleHeading({ level: 1 }).run())}
        isActive={editor.isActive('heading', { level: 1 })}
        title="Heading 1"
      >
        <Heading1 size={16} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleHeading({ level: 2 }).run())}
        isActive={editor.isActive('heading', { level: 2 })}
        title="Heading 2"
      >
        <Heading2 size={16} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleHeading({ level: 3 }).run())}
        isActive={editor.isActive('heading', { level: 3 })}
        title="Heading 3"
      >
        <Heading3 size={16} />
      </ToolbarButton>

      <Divider />

      {/* Block elements */}
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleBlockquote().run())}
        isActive={editor.isActive('blockquote')}
        title="Quote"
      >
        <Quote size={16} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleBulletList().run())}
        isActive={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleOrderedList().run())}
        isActive={editor.isActive('orderedList')}
        title="Numbered List"
      >
        <ListOrdered size={16} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleTaskList().run())}
        isActive={editor.isActive('taskList')}
        title="Task List"
      >
        <CheckSquare size={16} />
      </ToolbarButton>

      <Divider />

      {/* Alignment */}
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().setTextAlign('left').run())}
        isActive={editor.isActive({ textAlign: 'left' })}
        title="Align Left"
      >
        <AlignLeft size={16} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().setTextAlign('center').run())}
        isActive={editor.isActive({ textAlign: 'center' })}
        title="Align Center"
      >
        <AlignCenter size={16} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().setTextAlign('right').run())}
        isActive={editor.isActive({ textAlign: 'right' })}
        title="Align Right"
      >
        <AlignRight size={16} />
      </ToolbarButton>
    </div>
  );
}

export default FloatingToolbar;
