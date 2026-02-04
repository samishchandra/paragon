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
// Using custom CodeBlockWithFeatures instead of CodeBlockLowlight
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Typography from '@tiptap/extension-typography';
import { CodeBlockWithFeatures } from './extensions/CodeBlockWithFeatures';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { LinkPopover } from './LinkPopover';
import { LinkHoverTooltip } from './LinkHoverTooltip';
import { FloatingToolbar } from './FloatingToolbar';
import { Callout } from './extensions/Callout';
import { ResizableImage } from './extensions/ResizableImage';
import { DatePill } from './extensions/DatePill';
import { SlashCommands } from './SlashCommands';
import { EditorToolbar } from './EditorToolbar';
import { FindReplace } from './FindReplace';
import { useAutoSave } from './hooks/useAutoSave';
import { useWordCount } from './hooks/useWordCount';
import { AutoSaveIndicator } from './AutoSaveIndicator';
import { RecoveryBanner } from './RecoveryBanner';
import { WikiLinkSafe } from './extensions/WikiLinkSafe';
import { MarkdownPasteSafe } from './extensions/MarkdownPasteSafe';
// DragHandleOverlay removed - drag and reorder functionality disabled
import { CollapsibleHeading } from './extensions/CollapsibleHeading';
import { MarkdownLinkInputRule } from './extensions/MarkdownLinkInputRule';
import { SearchHighlight } from './extensions/SearchHighlight';
import { TabIndent } from './extensions/TabIndent';

/*
 * DESIGN: Dark Mode Craftsman
 * Professional markdown editor inspired by VS Code and Obsidian
 * Multi-layer dark theme with depth through layering
 * Glassmorphic floating toolbar with backdrop blur
 */



// Detect if we're on a mobile/touch device
// Note: maxTouchPoints can be > 0 on desktop browsers with touch simulation
// So we prioritize checking for actual touch events and screen width
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  // Check for actual touch events first
  const hasTouchEvents = 'ontouchstart' in window;
  // Check for mobile user agent
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  // Check for small screen (typical mobile width)
  const isSmallScreen = window.innerWidth < 768;
  // Only consider it mobile if it has touch events AND (mobile UA OR small screen)
  // This prevents desktop browsers with touch simulation from being detected as mobile
  return (hasTouchEvents && (isMobileUA || isSmallScreen)) || (isMobileUA && isSmallScreen);
};



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
  /** Enable auto-save to localStorage (default: true) */
  autoSave?: boolean;
  /** Storage key for auto-save (default: 'manus-editor-content') */
  autoSaveKey?: string;
  /** Auto-save debounce delay in ms (default: 1000) */
  autoSaveDelay?: number;
  /** Show recovery banner when unsaved content is found (default: true) */
  showRecoveryBanner?: boolean;
  /** Show floating toolbar on text selection (default: true) */
  showFloatingToolbar?: boolean;
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
  autoSave = true,
  autoSaveKey = 'manus-editor-content',
  autoSaveDelay = 1000,
  showRecoveryBanner = true,
  showFloatingToolbar = true,
}: MarkdownEditorProps) {
  // Check if mobile on mount
  const [isMobile] = useState(() => isMobileDevice());
  
  // Ref for the editor content wrapper (for drag handle overlay)
  const editorContentRef = useRef<HTMLDivElement>(null);

  // Build extensions array - conditionally include problematic extensions on mobile
  const extensions = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const baseExtensions: any[] = [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        codeBlock: false, // We use CodeBlockLowlight instead
        dropcursor: {
          color: 'var(--primary)',
          width: 2,
        },
        // Disable extensions that we configure separately to avoid duplicates
        link: false, // We configure Link separately with custom options
        underline: false, // We add Underline separately
        bold: {
          HTMLAttributes: {
            class: 'font-bold',
          },
        },
        italic: {
          HTMLAttributes: {
            class: 'italic',
          },
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
      // Use standard table extensions for better mobile compatibility
      Table.configure({
        resizable: !isMobile, // Disable resize on mobile
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
      CodeBlockWithFeatures,
      Underline,
      Subscript,
      Superscript,
      Typography,
      Callout,
      CollapsibleHeading.configure({
        levels: [1, 2, 3],
      }),
      MarkdownLinkInputRule,
      SearchHighlight,
      TabIndent,
      ResizableImage.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
    ];

    // Only add DatePill on desktop
    if (!isMobile) {
      baseExtensions.push(
        DatePill.configure({
          HTMLAttributes: {
            class: 'date-pill',
          },
        })
      );
    }

    // Add mobile-safe versions of WikiLink and MarkdownPaste
    // These use simpler approaches that work on both desktop and mobile
    baseExtensions.push(
      WikiLinkSafe.configure({
        onWikiLinkClick: (pageName) => {
          console.log('WikiLink clicked:', pageName);
          // You can customize this callback to navigate to the linked page
        },
      }),
      MarkdownPasteSafe.configure({
        enableMarkdownPaste: true,
      })
    );

    return baseExtensions;
  }, [placeholder, isMobile]);

  const editor = useEditor({
    // @ts-ignore - Expose editor globally for debugging
    onCreate: ({ editor }) => {
      (window as any).__tiptapEditor = editor;
      console.log('TipTap editor created and exposed globally as window.__tiptapEditor');
    },
    extensions,
    content,
    editable,
    autofocus,
    editorProps: {
      attributes: {
        class: 'tiptap-editor outline-none min-h-full',
      },

    },
    onUpdate: ({ editor }) => {
      // Only call getHTML once for performance
      if (onChange || onHTMLChange) {
        const html = editor.getHTML();
        onChange?.(html);
        onHTMLChange?.(html);
      }
    },
  });

  // State for link popover
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
  
  // State for find/replace panel
  const [isFindReplaceOpen, setIsFindReplaceOpen] = useState(false);
  const [findReplaceFocusTrigger, setFindReplaceFocusTrigger] = useState(0);

  // Auto-save functionality
  const autoSaveState = useAutoSave(editor, {
    storageKey: autoSaveKey,
    debounceMs: autoSaveDelay,
    enabled: autoSave,
  });

  // Handle keyboard shortcuts for markdown auto-detection
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if editor is destroyed
      if (editor.isDestroyed) return;
      
// Cmd/Ctrl+K for link popover
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsLinkPopoverOpen(true);
        return;
      }
      
      // Cmd/Ctrl+F for find/replace (desktop only)
      if (!isMobile && (event.metaKey || event.ctrlKey) && event.key === 'f') {
        event.preventDefault();
        setIsFindReplaceOpen(true);
        // Always increment focus trigger to refocus search input even if already open
        setFindReplaceFocusTrigger(prev => prev + 1);
        return;
      }
      
      // Cmd/Ctrl+H for find/replace with replace panel open (desktop only)
      if (!isMobile && (event.metaKey || event.ctrlKey) && event.key === 'h') {
        event.preventDefault();
        setIsFindReplaceOpen(true);
        return;
      }

      
      // Auto-detect markdown shortcuts on space
      if (event.key === ' ') {
        try {
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
          
          // Ordered list
          if (/^\d+\.$/.test(textBefore)) {
            event.preventDefault();
            editor.chain().focus().deleteRange({ from: $from.pos - textBefore.length, to: $from.pos }).toggleOrderedList().run();
            return;
          }
          
          // Task list
          if (textBefore === '[]' || textBefore === '[ ]') {
            event.preventDefault();
            editor.chain().focus().deleteRange({ from: $from.pos - textBefore.length, to: $from.pos }).toggleTaskList().run();
            return;
          }
          
          // Blockquote
          if (textBefore === '>') {
            event.preventDefault();
            editor.chain().focus().deleteRange({ from: $from.pos - 1, to: $from.pos }).toggleBlockquote().run();
            return;
          }
          
          // Code block
          if (textBefore === '```') {
            event.preventDefault();
            editor.chain().focus().deleteRange({ from: $from.pos - 3, to: $from.pos }).toggleCodeBlock().run();
            return;
          }
          
          // Horizontal rule
          if (textBefore === '---' || textBefore === '***') {
            event.preventDefault();
            editor.chain().focus().deleteRange({ from: $from.pos - 3, to: $from.pos }).setHorizontalRule().run();
            return;
          }
        } catch (error) {
          console.warn('Space shortcut error:', error);
        }
      }
    };

    // Use capture: true to intercept Tab key before browser default behavior
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [editor, isMobile]);

// Word count calculation (debounced for performance with large documents)
  const wordCount = useWordCount(editor, {
    debounceMs: 500,
    extendedStats: false,
    enabled: showWordCount,
  });


  if (!editor) {
    return (
      <div className={`markdown-editor-container ${className}`}>
        <div className="editor-loading">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className={`markdown-editor-container ${className}`}>
      {/* Recovery banner for auto-saved content */}
      {autoSave && showRecoveryBanner && autoSaveState.hasRecoverableContent && (
        <RecoveryBanner
          onRecover={() => {
            autoSaveState.recover();
          }}
          onDismiss={autoSaveState.dismissRecovery}
        />
      )}
      
      {/* Top toolbar */}
      {showToolbar && (
        <EditorToolbar 
          editor={editor} 
          onOpenLinkPopover={() => setIsLinkPopoverOpen(true)}
        />
      )}
      
      {/* Find and replace panel (desktop only) */}
      {!isMobile && (
        <FindReplace
          editor={editor}
          isOpen={isFindReplaceOpen}
          onClose={() => setIsFindReplaceOpen(false)}
          focusTrigger={findReplaceFocusTrigger}
        />
      )}
      
      {/* Main editor area */}
      <div className="editor-content-wrapper" ref={editorContentRef}>
        <EditorContent editor={editor} className="editor-content" />
        
        {/* Drag handle overlay removed - drag and reorder functionality disabled */}
        
        {/* Floating toolbar on text selection (desktop only) */}
        {!isMobile && showFloatingToolbar && <FloatingToolbar editor={editor} />}
        
        {/* Slash commands */}
        <SlashCommands editor={editor} />
        
        {/* Link popover */}
        <LinkPopover
          editor={editor}
          isOpen={isLinkPopoverOpen}
          onClose={() => setIsLinkPopoverOpen(false)}
        />
        
        {/* Link hover tooltip (desktop only) */}
        {!isMobile && (
          <LinkHoverTooltip 
            editor={editor} 
            onEditLink={() => setIsLinkPopoverOpen(true)}
          />
        )}
      </div>
      
      {/* Footer with word count and auto-save status */}
      {showWordCount && (
        <div className="editor-footer">
          <div className="word-count">
            <span>{wordCount.words} words</span>
            <span>{wordCount.characters} characters</span>
          </div>
          {autoSave && (
            <AutoSaveIndicator 
              status={autoSaveState.status} 
              lastSaved={autoSaveState.lastSaved}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default MarkdownEditor;
