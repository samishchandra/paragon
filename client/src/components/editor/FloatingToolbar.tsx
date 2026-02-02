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
  Pilcrow,
  FileCode,
} from 'lucide-react';
import { useCallback, useState, useEffect, useRef } from 'react';

/*
 * DESIGN: Dark Mode Craftsman
 * Mobile-responsive floating toolbar
 * Touch-friendly buttons with proper sizing
 * Auto-positioning to stay within viewport
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
      flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 rounded-md
      transition-all duration-100 ease-out touch-manipulation
      ${isActive 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
  >
    {children}
  </button>
);

const Divider = () => (
  <div className="w-px h-5 bg-border mx-0.5 hidden sm:block" />
);

export function FloatingToolbar({ editor, className = '' }: FloatingToolbarProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const toolbarRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    if (!editor || editor.isDestroyed) return;
    
    const updateToolbar = () => {
      // Skip if editor is destroyed
      if (editor.isDestroyed) return;
      
      try {
        const { selection } = editor.state;
        const { empty, from, to } = selection;

        // Hide if selection is empty or in code block
        if (empty || editor.isActive('codeBlock')) {
          // Clear any pending show timeout
          if (showTimeoutRef.current) {
            clearTimeout(showTimeoutRef.current);
            showTimeoutRef.current = null;
          }
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
        
        // Calculate toolbar dimensions
        const toolbarWidth = toolbarRef.current?.offsetWidth || 450;
        const toolbarHeight = 45;
        
        // Calculate center position relative to viewport
        let centerX = (start.left + end.left) / 2;
        let topY = start.top - toolbarHeight - 10; // Position above selection
        
        // Ensure toolbar stays within viewport horizontally
        const minX = toolbarWidth / 2 + 10;
        const maxX = window.innerWidth - toolbarWidth / 2 - 10;
        centerX = Math.max(minX, Math.min(maxX, centerX));
        
        // Convert to position relative to editor
        const left = centerX - editorRect.left;
        const top = topY - editorRect.top;

        // Add delay before showing toolbar (200ms)
        if (!isVisible) {
          if (showTimeoutRef.current) {
            clearTimeout(showTimeoutRef.current);
          }
          showTimeoutRef.current = setTimeout(() => {
            setPosition({ top: Math.max(10, top), left });
            setIsVisible(true);
          }, 200);
        } else {
          // Already visible, update position immediately
          setPosition({ top: Math.max(10, top), left });
        }
      } catch (error) {
        console.warn('FloatingToolbar: Error updating position', error);
      }
    };

    editor.on('selectionUpdate', updateToolbar);
    editor.on('transaction', updateToolbar);

    return () => {
      editor.off('selectionUpdate', updateToolbar);
      editor.off('transaction', updateToolbar);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
    };
  }, [editor, isVisible]);

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
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto">
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
              bg-secondary/50 rounded px-3 py-2 sm:py-1
              text-sm text-foreground placeholder:text-muted-foreground
              outline-none border border-border/50
              w-full sm:w-48
            "
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                setLink();
              }}
              className="
                flex-1 sm:flex-none px-4 sm:px-3 py-2 sm:py-1 text-sm sm:text-xs font-medium rounded
                bg-primary text-primary-foreground
                hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation
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
                flex-1 sm:flex-none px-4 sm:px-2 py-2 sm:py-1 text-sm sm:text-xs font-medium rounded
                bg-secondary text-secondary-foreground
                hover:bg-accent active:bg-accent/80 transition-colors touch-manipulation
              "
            >
              Cancel
            </button>
          </div>
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
      {/* Paragraph style - convert to normal paragraph */}
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().setParagraph().run())}
        isActive={editor.isActive('paragraph') && !editor.isActive('heading') && !editor.isActive('bulletList') && !editor.isActive('orderedList') && !editor.isActive('taskList') && !editor.isActive('blockquote') && !editor.isActive('codeBlock')}
        title="Paragraph"
      >
        <Pilcrow size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>

      {/* Headings */}
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleHeading({ level: 1 }).run())}
        isActive={editor.isActive('heading', { level: 1 })}
        title="Heading 1"
      >
        <Heading1 size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleHeading({ level: 2 }).run())}
        isActive={editor.isActive('heading', { level: 2 })}
        title="Heading 2"
      >
        <Heading2 size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleHeading({ level: 3 }).run())}
        isActive={editor.isActive('heading', { level: 3 })}
        title="Heading 3"
      >
        <Heading3 size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>

      <Divider />

      {/* Primary text formatting */}
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleBold().run())}
        isActive={editor.isActive('bold')}
        title="Bold (Ctrl+B)"
      >
        <Bold size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleItalic().run())}
        isActive={editor.isActive('italic')}
        title="Italic (Ctrl+I)"
      >
        <Italic size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleUnderline().run())}
        isActive={editor.isActive('underline')}
        title="Underline (Ctrl+U)"
      >
        <Underline size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleStrike().run())}
        isActive={editor.isActive('strike')}
        title="Strikethrough"
      >
        <Strikethrough size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleCode().run())}
        isActive={editor.isActive('code')}
        title="Inline Code (Ctrl+E)"
      >
        <Code size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleHighlight().run())}
        isActive={editor.isActive('highlight')}
        title="Highlight"
      >
        <Highlighter size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>

      <ToolbarButton
        onMouseDown={handleLinkClick}
        isActive={editor.isActive('link')}
        title="Link (Ctrl+K)"
      >
        <Link size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>

      <Divider />

      {/* Block elements */}
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleBlockquote().run())}
        isActive={editor.isActive('blockquote')}
        title="Quote"
      >
        <Quote size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleBulletList().run())}
        isActive={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <List size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleOrderedList().run())}
        isActive={editor.isActive('orderedList')}
        title="Numbered List"
      >
        <ListOrdered size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleTaskList().run())}
        isActive={editor.isActive('taskList')}
        title="Task List"
      >
        <CheckSquare size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleCodeBlock().run())}
        isActive={editor.isActive('codeBlock')}
        title="Code Block"
      >
        <FileCode size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>

      <Divider />

      {/* Alignment */}
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().setTextAlign('left').run())}
        isActive={editor.isActive({ textAlign: 'left' })}
        title="Align Left"
      >
        <AlignLeft size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().setTextAlign('center').run())}
        isActive={editor.isActive({ textAlign: 'center' })}
        title="Align Center"
      >
        <AlignCenter size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().setTextAlign('right').run())}
        isActive={editor.isActive({ textAlign: 'right' })}
        title="Align Right"
      >
        <AlignRight size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>
    </div>
  );
}

export default FloatingToolbar;
