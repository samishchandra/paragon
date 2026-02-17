import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link,
  Highlighter,
  Quote,
  List,
  ListOrdered,
  CheckSquare,
  FileCode,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { useCallback, useState, useEffect, useRef, memo } from 'react';
import { DialogSafePortal } from './DialogSafePortal';
import { useEditorState } from '@tiptap/react';

/*
 * DESIGN: Dark Mode Craftsman
 * Mobile-responsive floating toolbar
 * Touch-friendly buttons with proper sizing
 * Auto-positioning to stay within editor bounds
 * Uses React portal to escape overflow containers.
 */

export interface FloatingToolbarProps {
  editor: Editor;
  className?: string;
  suppressWhenLinkPopoverOpen?: boolean;
  /** Whether AI features are available (shows sparkles button) */
  aiEnabled?: boolean;
  /** Called when the sparkles button is clicked, with the button element for positioning */
  onAISparklesClick?: (anchorEl: HTMLElement) => void;
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
      flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0
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
  <div className="w-px h-5 bg-border mx-0.5 flex-shrink-0" />
);

// Heading style options for the dropdown
const HEADING_STYLES = [
  { label: 'Paragraph', value: 'paragraph', shortLabel: 'P' },
  { label: 'Heading 1', value: 'h1', shortLabel: 'H1' },
  { label: 'Heading 2', value: 'h2', shortLabel: 'H2' },
  { label: 'Heading 3', value: 'h3', shortLabel: 'H3' },
  { label: 'Heading 4', value: 'h4', shortLabel: 'H4' },
  { label: 'Heading 5', value: 'h5', shortLabel: 'H5' },
] as const;

interface HeadingDropdownProps {
  editor: Editor;
  isH1: boolean;
  isH2: boolean;
  isH3: boolean;
  isH4: boolean;
  isH5: boolean;
  executeCommand: (e: React.MouseEvent, command: () => void) => void;
}

const HeadingDropdown = memo(function HeadingDropdown({ editor, isH1, isH2, isH3, isH4, isH5, executeCommand }: HeadingDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine current active style
  const currentStyle = isH1 ? 'h1' : isH2 ? 'h2' : isH3 ? 'h3' : isH4 ? 'h4' : isH5 ? 'h5' : 'paragraph';
  const currentLabel = HEADING_STYLES.find(s => s.value === currentStyle)?.shortLabel || 'P';

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen]);

  const handleSelect = (e: React.MouseEvent, value: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = parseInt(value.replace('h', '')) as 1 | 2 | 3 | 4 | 5;
      editor.chain().focus().toggleHeading({ level }).run();
    }
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative flex-shrink-0">
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        title="Text style"
        className={`
          flex items-center gap-1 h-7 px-2 rounded-md flex-shrink-0
          transition-all duration-100 ease-out touch-manipulation
          text-xs font-normal overflow-visible
          ${currentStyle !== 'paragraph'
            ? 'bg-primary text-primary-foreground'
            : 'bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80'
          }
        `}
      >
        <span className="min-w-[18px] text-center">{currentLabel}</span>
        <ChevronDown size={12} strokeWidth={2.5} className={`flex-shrink-0 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="
            absolute top-full left-0 mt-1.5
            bg-popover text-popover-foreground
            border border-border rounded-lg shadow-lg
            py-1 min-w-[130px] z-[10000]
          "
          style={{ animation: 'slash-fade-in-below 0.12s ease-out' }}
        >
          {HEADING_STYLES.map((style) => {
            const isActive = style.value === currentStyle;
            return (
              <button
                key={style.value}
                onMouseDown={(e) => handleSelect(e, style.value)}
                className={`
                  flex items-center gap-2 w-full px-3 py-1.5 text-left text-sm
                  transition-colors duration-75
                  ${isActive
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'hover:bg-accent/50'
                  }
                `}
              >
                <span className="w-6 text-xs font-normal text-muted-foreground">{style.shortLabel}</span>
                <span>{style.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

export const FloatingToolbar = memo(function FloatingToolbar({ editor, className = '', suppressWhenLinkPopoverOpen = false, aiEnabled = false, onAISparklesClick }: FloatingToolbarProps) {
  const aiButtonRef = useRef<HTMLButtonElement>(null);
  // Performance: Use useEditorState for selective re-renders based on active formatting states
  const editorState = useEditorState({
    editor,
    selector: ({ editor: e }: { editor: Editor }) => ({
      isBold: e.isActive('bold'),
      isItalic: e.isActive('italic'),
      isUnderline: e.isActive('underline'),
      isStrike: e.isActive('strike'),
      isCode: e.isActive('code'),
      isHighlight: e.isActive('highlight'),
      isLink: e.isActive('link'),
      isH1: e.isActive('heading', { level: 1 }),
      isH2: e.isActive('heading', { level: 2 }),
      isH3: e.isActive('heading', { level: 3 }),
      isH4: e.isActive('heading', { level: 4 }),
      isH5: e.isActive('heading', { level: 5 }),
      isBulletList: e.isActive('bulletList'),
      isOrderedList: e.isActive('orderedList'),
      isTaskList: e.isActive('taskList'),
      isBlockquote: e.isActive('blockquote'),
      isCodeBlock: e.isActive('codeBlock'),
    }),
  });
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

        // Hide if selection is empty, in code block, or an image is selected
        // (images have their own 3-dot menu; formatting options don't apply)
        const isNodeSelection = 'node' in selection && (selection as any).node;
        const selectedNode = isNodeSelection ? (selection as any).node : null;
        const isImageSelected = selectedNode?.type?.name === 'resizableImage';
        
        if (empty || isImageSelected || editor.isActive('codeBlock')) {
          if (showTimeoutRef.current) {
            clearTimeout(showTimeoutRef.current);
            showTimeoutRef.current = null;
          }
          if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
          }
          hideTimeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            setShowLinkInput(false);
          }, 150);
          return;
        }

        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }

        // Get selection coordinates in viewport space (fixed positioning)
        const start = editor.view.coordsAtPos(from);
        const end = editor.view.coordsAtPos(to);
        
        const toolbarWidth = toolbarRef.current?.offsetWidth || 500;
        const toolbarHeight = toolbarRef.current?.offsetHeight || 40;
        const padding = 8;
        const viewportWidth = window.innerWidth;
        
        // Detect if inside a transformed container (e.g., Dialog with translate)
        // CSS transforms create a new containing block for fixed-position elements,
        // so we need to compensate for the container's offset
        let offsetX = 0;
        let offsetY = 0;
        if (toolbarRef.current) {
          const el = toolbarRef.current.closest('[data-slot="dialog-content"]') as HTMLElement;
          if (el) {
            const rect = el.getBoundingClientRect();
            offsetX = rect.left;
            offsetY = rect.top;
          }
        }
        
        // Calculate center position of selection in viewport coords
        const selectionCenterX = (start.left + end.left) / 2;
        
        // Position horizontally centered on selection, adjusted for container offset
        let left = selectionCenterX - toolbarWidth / 2 - offsetX;
        
        // Clamp to viewport bounds (adjusted for container)
        const maxWidth = offsetX ? (viewportWidth - offsetX) : viewportWidth;
        left = Math.max(padding, Math.min(maxWidth - toolbarWidth - padding, left));
        
        // Position above the selection in viewport coords, adjusted for container offset
        let top = start.top - toolbarHeight - 10 - offsetY;
        
        // If not enough space above, position below
        if (top < padding) {
          top = end.bottom + 10 - offsetY;
        }

        if (!isVisible) {
          if (showTimeoutRef.current) {
            clearTimeout(showTimeoutRef.current);
          }
          showTimeoutRef.current = setTimeout(() => {
            setPosition({ top: Math.max(padding, top), left });
            setIsVisible(true);
          }, 50);
        } else {
          setPosition({ top: Math.max(padding, top), left });
        }
      } catch (error) {
        console.warn('FloatingToolbar: Error updating position', error);
      }
    };

    editor.on('selectionUpdate', updateToolbar);

    return () => {
      editor.off('selectionUpdate', updateToolbar);
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
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  if (!isVisible || suppressWhenLinkPopoverOpen) {
    return null;
  }

  const iconSize = 15;

  const toolbarContent = showLinkInput ? (
    <div
      ref={toolbarRef}
      className={`floating-toolbar ${className}`}
      style={{ 
        position: 'fixed',
        top: position.top, 
        left: position.left,
      }}
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
  ) : (
    <div
      ref={toolbarRef}
      className={`floating-toolbar ${className}`}
      style={{ 
        position: 'fixed',
        top: position.top, 
        left: position.left,
        }}
      onMouseDown={handleToolbarMouseDown}
    >
      {/* Section 1: Inline text formatting */}
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleBold().run())}
        isActive={editorState?.isBold}
        title="Bold (Ctrl+B)"
      >
        <Bold size={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleItalic().run())}
        isActive={editorState?.isItalic}
        title="Italic (Ctrl+I)"
      >
        <Italic size={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleUnderline().run())}
        isActive={editorState?.isUnderline}
        title="Underline (Ctrl+U)"
      >
        <Underline size={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleStrike().run())}
        isActive={editorState?.isStrike}
        title="Strikethrough"
      >
        <Strikethrough size={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleCode().run())}
        isActive={editorState?.isCode}
        title="Inline Code (Ctrl+E)"
      >
        <Code size={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleHighlight().run())}
        isActive={editorState?.isHighlight}
        title="Highlight"
      >
        <Highlighter size={iconSize} />
      </ToolbarButton>

      <ToolbarButton
        onMouseDown={handleLinkClick}
        isActive={editorState?.isLink}
        title="Link (Ctrl+K)"
      >
        <Link size={iconSize} />
      </ToolbarButton>

      <Divider />

      {/* Section 2: Heading dropdown + block elements */}
      <HeadingDropdown
        editor={editor}
        isH1={editorState?.isH1 ?? false}
        isH2={editorState?.isH2 ?? false}
        isH3={editorState?.isH3 ?? false}
        isH4={editorState?.isH4 ?? false}
        isH5={editorState?.isH5 ?? false}
        executeCommand={executeCommand}
      />
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleBlockquote().run())}
        isActive={editorState?.isBlockquote}
        title="Quote"
      >
        <Quote size={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleBulletList().run())}
        isActive={editorState?.isBulletList}
        title="Bullet List"
      >
        <List size={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleOrderedList().run())}
        isActive={editorState?.isOrderedList}
        title="Numbered List"
      >
        <ListOrdered size={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleTaskList().run())}
        isActive={editorState?.isTaskList}
        title="Task List"
      >
        <CheckSquare size={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleCodeBlock().run())}
        isActive={editorState?.isCodeBlock}
        title="Code Block"
      >
        <FileCode size={iconSize} />
      </ToolbarButton>

      {/* AI Sparkles button (only shown when AI is enabled) */}
      {aiEnabled && (
        <>
          <Divider />
          <button
            ref={aiButtonRef}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (aiButtonRef.current) {
                onAISparklesClick?.(aiButtonRef.current);
              }
            }}
            title="AI Writing Assistant"
            className="
              flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0
              transition-all duration-100 ease-out touch-manipulation
              bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80
              hover:text-foreground
            "
          >
            <Sparkles size={iconSize} />
          </button>
        </>
      )}
    </div>
  );

  return (
    <DialogSafePortal onMouseDown={handleToolbarMouseDown}>
      {toolbarContent}
    </DialogSafePortal>
  );
});

export default FloatingToolbar;
