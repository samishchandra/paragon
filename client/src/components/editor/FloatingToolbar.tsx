import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  CheckSquare,
  Pilcrow,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { useCallback, useState, useEffect, useRef, memo } from 'react';
import { createPortal } from 'react-dom';
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

        // Hide if selection is empty or in code block (but show for image node selections)
        const isNodeSelection = 'node' in selection && (selection as any).node;
        const selectedNode = isNodeSelection ? (selection as any).node : editor.state.doc.nodeAt(from);
        const isImageSelected = selectedNode?.type?.name === 'resizableImage';
        
        if ((empty && !isImageSelected) || editor.isActive('codeBlock')) {
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
        
        // Calculate center position of selection in viewport coords
        const selectionCenterX = (start.left + end.left) / 2;
        
        // Position horizontally centered on selection
        let left = selectionCenterX - toolbarWidth / 2;
        
        // Clamp to viewport bounds
        left = Math.max(padding, Math.min(viewportWidth - toolbarWidth - padding, left));
        
        // Position above the selection in viewport coords
        let top = start.top - toolbarHeight - 10;
        
        // If not enough space above, position below
        if (top < padding) {
          top = end.bottom + 10;
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
        zIndex: 9999,
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
        zIndex: 9999,
      }}
      onMouseDown={handleToolbarMouseDown}
    >
      {/* Paragraph style */}
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().setParagraph().run())}
        isActive={!editorState?.isH1 && !editorState?.isH2 && !editorState?.isH3 && !editorState?.isBulletList && !editorState?.isOrderedList && !editorState?.isTaskList && !editorState?.isBlockquote && !editorState?.isCodeBlock}
        title="Paragraph"
      >
        <Pilcrow size={iconSize} />
      </ToolbarButton>

      {/* Headings */}
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleHeading({ level: 1 }).run())}
        isActive={editorState?.isH1}
        title="Heading 1"
      >
        <Heading1 size={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleHeading({ level: 2 }).run())}
        isActive={editorState?.isH2}
        title="Heading 2"
      >
        <Heading2 size={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={(e) => executeCommand(e, () => editor.chain().focus().toggleHeading({ level: 3 }).run())}
        isActive={editorState?.isH3}
        title="Heading 3"
      >
        <Heading3 size={iconSize} />
      </ToolbarButton>

      <Divider />

      {/* Primary text formatting */}
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

      {/* Block elements */}
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
              bg-transparent text-amber-400 hover:bg-secondary active:bg-secondary/80
              hover:text-amber-300
            "
          >
            <Sparkles size={iconSize} />
          </button>
        </>
      )}
    </div>
  );

  return createPortal(toolbarContent, document.body);
});

export default FloatingToolbar;
