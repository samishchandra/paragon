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
  MoreHorizontal,
} from 'lucide-react';
import { useCallback, useState, useEffect, useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

/*
 * DESIGN: Dark Mode Craftsman
 * Mobile-responsive floating toolbar
 * Touch-friendly buttons with proper sizing
 * Collapsible groups on smaller screens
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
      let left = ((start.left + end.left) / 2) - editorRect.left;
      const top = start.top - editorRect.top - 55; // Position above selection

      // Ensure toolbar stays within editor bounds on mobile
      const toolbarWidth = toolbarRef.current?.offsetWidth || 300;
      const minLeft = toolbarWidth / 2 + 10;
      const maxLeft = editorRect.width - toolbarWidth / 2 - 10;
      left = Math.max(minLeft, Math.min(maxLeft, left));

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
      {/* Primary text formatting - Always visible */}
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
      
      {/* Desktop: Show more buttons */}
      <div className="hidden sm:flex items-center">
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
      </div>

      <ToolbarButton
        onMouseDown={handleLinkClick}
        isActive={editor.isActive('link')}
        title="Link (Ctrl+K)"
      >
        <Link size={18} className="sm:w-4 sm:h-4" />
      </ToolbarButton>

      <Divider />

      {/* Desktop: Headings */}
      <div className="hidden md:flex items-center">
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

      {/* Mobile/Tablet: More options dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-md
              bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80
              transition-all duration-100 ease-out touch-manipulation"
            onMouseDown={(e) => e.preventDefault()}
          >
            <MoreHorizontal size={18} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {/* Mobile-only formatting options */}
          <div className="sm:hidden">
            <DropdownMenuItem onSelect={() => editor.chain().focus().toggleStrike().run()}>
              <Strikethrough size={16} className="mr-2" /> Strikethrough
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => editor.chain().focus().toggleCode().run()}>
              <Code size={16} className="mr-2" /> Inline Code
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => editor.chain().focus().toggleHighlight().run()}>
              <Highlighter size={16} className="mr-2" /> Highlight
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </div>
          
          <DropdownMenuItem onSelect={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            <Heading1 size={16} className="mr-2" /> Heading 1
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <Heading2 size={16} className="mr-2" /> Heading 2
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            <Heading3 size={16} className="mr-2" /> Heading 3
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => editor.chain().focus().toggleBlockquote().run()}>
            <Quote size={16} className="mr-2" /> Quote
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => editor.chain().focus().toggleBulletList().run()}>
            <List size={16} className="mr-2" /> Bullet List
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => editor.chain().focus().toggleOrderedList().run()}>
            <ListOrdered size={16} className="mr-2" /> Numbered List
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => editor.chain().focus().toggleTaskList().run()}>
            <CheckSquare size={16} className="mr-2" /> Task List
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => editor.chain().focus().setTextAlign('left').run()}>
            <AlignLeft size={16} className="mr-2" /> Align Left
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => editor.chain().focus().setTextAlign('center').run()}>
            <AlignCenter size={16} className="mr-2" /> Align Center
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => editor.chain().focus().setTextAlign('right').run()}>
            <AlignRight size={16} className="mr-2" /> Align Right
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default FloatingToolbar;
