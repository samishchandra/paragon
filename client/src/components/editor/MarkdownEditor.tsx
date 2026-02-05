import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import { TableCellWithMenu, TableHeaderWithMenu } from './extensions/TableCellWithMenu';
import { TableSorting } from './extensions/TableSorting';
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
import { ImageUpload } from './extensions/ImageUpload';
import { ImageDropZone } from './ImageDropZone';
import { ImageEditPopover } from './ImageEditPopover';
import { SyntaxHighlightedMarkdown } from './SyntaxHighlightedMarkdown';
import { FileText, Eye } from 'lucide-react';
import TurndownService from 'turndown';
import { gfm, tables, strikethrough, taskListItems } from 'turndown-plugin-gfm';
import { marked } from 'marked';

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
  /** Maximum image file size in bytes (default: 5MB) */
  maxImageSize?: number;
  /** Callback when image upload starts */
  onImageUploadStart?: () => void;
  /** Callback when image upload completes */
  onImageUploadComplete?: () => void;
  /** Callback when image upload fails */
  onImageUploadError?: (error: string) => void;
  /** Show mode toggle to switch between WYSIWYG and raw markdown (default: true) */
  showModeToggle?: boolean;
  /** Callback when raw markdown content changes */
  onMarkdownChange?: (markdown: string) => void;
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
  maxImageSize = 5 * 1024 * 1024,
  onImageUploadStart,
  onImageUploadComplete,
  onImageUploadError,
  showModeToggle = true,
  onMarkdownChange,
}: MarkdownEditorProps) {
  // Check if mobile on mount
  const [isMobile] = useState(() => isMobileDevice());
  
  // Editor mode: 'wysiwyg' or 'markdown'
  const [editorMode, setEditorMode] = useState<'wysiwyg' | 'markdown'>('wysiwyg');
  
  // Raw markdown content for markdown mode
  const [rawMarkdown, setRawMarkdown] = useState('');
  
  // Refs to track current values for the API (avoids closure issues)
  const editorModeRef = useRef<'wysiwyg' | 'markdown'>('wysiwyg');
  const rawMarkdownRef = useRef<string>('');
  
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
      TableCellWithMenu,
      TableHeaderWithMenu,
      TableSorting,
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
        onImageClick: (attrs) => {
          setImageEditState({
            isOpen: true,
            src: attrs.src,
            alt: attrs.alt,
            pos: attrs.pos,
            position: { x: attrs.rect.left + attrs.rect.width / 2, y: attrs.rect.bottom },
          });
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
      }),
      // Image upload via drag-and-drop and paste
      ImageUpload.configure({
        maxFileSize: maxImageSize,
        onUploadStart: onImageUploadStart,
        onUploadComplete: onImageUploadComplete,
        onUploadError: onImageUploadError,
      })
    );

    return baseExtensions;
  }, [placeholder, isMobile, maxImageSize, onImageUploadStart, onImageUploadComplete, onImageUploadError]);

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
  
  // State for image edit popover
  const [imageEditState, setImageEditState] = useState<{
    isOpen: boolean;
    src: string;
    alt: string;
    pos: number;
    position: { x: number; y: number };
  } | null>(null);
  
  // State for find/replace panel
  const [isFindReplaceOpen, setIsFindReplaceOpen] = useState(false);
  const [findReplaceFocusTrigger, setFindReplaceFocusTrigger] = useState(0);

  // Auto-save functionality
  const autoSaveState = useAutoSave(editor, {
    storageKey: autoSaveKey,
    debounceMs: autoSaveDelay,
    enabled: autoSave,
  });

  // Create TurndownService for HTML to Markdown conversion
  const turndownService = useMemo(() => {
    const td = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      emDelimiter: '*',
      strongDelimiter: '**',
    });
    
    // Use GFM plugin for tables, strikethrough, and task lists
    td.use(gfm);
    
    // Add custom rules for better markdown output
    td.addRule('highlight', {
      filter: (node) => node.nodeName === 'MARK',
      replacement: (content) => `==${content}==`,
    });
    
    // Custom image rule to preserve width attribute
    td.addRule('resizableImage', {
      filter: 'img',
      replacement: (content, node) => {
        const img = node as HTMLImageElement;
        const src = img.getAttribute('src') || '';
        const alt = img.getAttribute('alt') || '';
        const width = img.getAttribute('width') || img.style.width?.replace('px', '');
        
        // If width is set, use HTML img tag to preserve it
        if (width) {
          return `<img src="${src}" alt="${alt}" width="${width}" />`;
        }
        
        // Otherwise use standard markdown syntax
        return `![${alt}](${src})`;
      },
    });
    
    td.addRule('taskListItem', {
      filter: (node) => {
        return node.nodeName === 'LI' && 
               node.getAttribute('data-type') === 'taskItem';
      },
      replacement: (content, node) => {
        const checkbox = (node as HTMLElement).querySelector('input[type="checkbox"]');
        const checked = checkbox?.hasAttribute('checked') || (checkbox as HTMLInputElement)?.checked;
        return `- [${checked ? 'x' : ' '}] ${content.trim()}\n`;
      },
    });
    
    // Custom table rule to handle TipTap's table structure
    td.addRule('table', {
      filter: 'table',
      replacement: function(content, node) {
        const table = node as HTMLTableElement;
        const rows = Array.from(table.querySelectorAll('tr'));
        if (rows.length === 0) return '';
        
        const result: string[] = [];
        
        rows.forEach((row, rowIndex) => {
          const cells = Array.from(row.querySelectorAll('th, td'));
          const cellContents = cells.map(cell => {
            // Get text content, handling nested p tags
            const text = cell.textContent?.trim() || '';
            return text.replace(/\|/g, '\\|'); // Escape pipes
          });
          
          result.push('| ' + cellContents.join(' | ') + ' |');
          
          // Add separator after header row
          if (rowIndex === 0) {
            const separator = cells.map(() => '---').join(' | ');
            result.push('| ' + separator + ' |');
          }
        });
        
        return '\n\n' + result.join('\n') + '\n\n';
      }
    });
    
    // Skip th and td since they're handled by the table rule
    td.addRule('tableCell', {
      filter: ['th', 'td'],
      replacement: function(content) {
        return content;
      }
    });
    
    return td;
  }, []);

  // Handle mode switching
  const handleModeSwitch = useCallback((newMode: 'wysiwyg' | 'markdown') => {
    if (!editor) return;
    
    if (newMode === 'markdown' && editorModeRef.current === 'wysiwyg') {
      // Convert HTML to Markdown
      const html = editor.getHTML();
      const markdown = turndownService.turndown(html);
      setRawMarkdown(markdown);
      rawMarkdownRef.current = markdown;
    } else if (newMode === 'wysiwyg' && editorModeRef.current === 'markdown') {
      // Convert Markdown back to HTML and set in editor using marked
      const html = marked.parse(rawMarkdownRef.current, { async: false }) as string;
      editor.commands.setContent(html);
    }
    
    setEditorMode(newMode);
    editorModeRef.current = newMode;
  }, [editor, turndownService]);

  // Handle raw markdown changes
  const handleRawMarkdownChange = useCallback((markdown: string) => {
    setRawMarkdown(markdown);
    rawMarkdownRef.current = markdown;
    onMarkdownChange?.(markdown);
  }, [onMarkdownChange]);

  // Expose Editor Mode API globally for external applications
  // Using refs to avoid closure issues - the API always reads the latest values
  useEffect(() => {
    // Create the API object using refs for current values
    const editorModeAPI = {
      /**
       * Get the current editor mode
       * @returns {'wysiwyg' | 'markdown'} The current mode
       */
      getMode: () => editorModeRef.current,
      
      /**
       * Set the editor mode
       * @param mode {'wysiwyg' | 'markdown'} The mode to switch to
       */
      setMode: (mode: 'wysiwyg' | 'markdown') => {
        if (mode !== 'wysiwyg' && mode !== 'markdown') {
          console.error('Invalid mode. Use "wysiwyg" or "markdown"');
          return;
        }
        handleModeSwitch(mode);
      },
      
      /**
       * Toggle between wysiwyg and markdown modes
       * @returns {'wysiwyg' | 'markdown'} The new mode after toggle
       */
      toggleMode: () => {
        const newMode = editorModeRef.current === 'wysiwyg' ? 'markdown' : 'wysiwyg';
        handleModeSwitch(newMode);
        return newMode;
      },
      
      /**
       * Switch to visual (WYSIWYG) mode
       */
      switchToVisual: () => {
        handleModeSwitch('wysiwyg');
      },
      
      /**
       * Switch to raw markdown mode
       */
      switchToMarkdown: () => {
        handleModeSwitch('markdown');
      },
      
      /**
       * Check if currently in visual mode
       * @returns {boolean}
       */
      isVisualMode: () => editorModeRef.current === 'wysiwyg',
      
      /**
       * Check if currently in markdown mode
       * @returns {boolean}
       */
      isMarkdownMode: () => editorModeRef.current === 'markdown',
      
      /**
       * Get the raw markdown content (only available in markdown mode)
       * @returns {string | null} The raw markdown or null if in visual mode
       */
      getRawMarkdown: () => editorModeRef.current === 'markdown' ? rawMarkdownRef.current : null,
      
      /**
       * Subscribe to mode changes
       * @param callback Function to call when mode changes
       * @returns Function to unsubscribe
       */
      onModeChange: (callback: (mode: 'wysiwyg' | 'markdown') => void) => {
        const handler = (event: Event) => {
          const customEvent = event as CustomEvent<{ mode: 'wysiwyg' | 'markdown' }>;
          callback(customEvent.detail.mode);
        };
        window.addEventListener('manus-editor-mode-change', handler);
        return () => window.removeEventListener('manus-editor-mode-change', handler);
      },
    };
    
    // Expose the API globally (only once on mount)
    (window as any).__manusEditorModeAPI = editorModeAPI;
    
    console.log('Manus Editor Mode API exposed globally as window.__manusEditorModeAPI');
    console.log('Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)');
    
    return () => {
      // Cleanup on unmount
      delete (window as any).__manusEditorModeAPI;
    };
  }, [handleModeSwitch]);
  
  // Dispatch event when mode changes (separate effect to avoid recreating the API)
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('manus-editor-mode-change', { detail: { mode: editorMode } }));
  }, [editorMode]);

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
      
      {/* Top toolbar with mode toggle */}
      {showToolbar && (
        <div className="flex items-center border-b border-border bg-card/50">
          <EditorToolbar 
            editor={editor} 
            onOpenLinkPopover={() => setIsLinkPopoverOpen(true)}
            className="flex-1 border-b-0"
          />
          {showModeToggle && (
            <div className="editor-mode-toggle mr-2 sm:mr-3">
              <button
                onClick={() => handleModeSwitch('wysiwyg')}
                className={`editor-mode-toggle-btn ${editorMode === 'wysiwyg' ? 'active' : ''}`}
                title="Visual Editor"
              >
                <Eye />
              </button>
              <button
                onClick={() => handleModeSwitch('markdown')}
                className={`editor-mode-toggle-btn ${editorMode === 'markdown' ? 'active' : ''}`}
                title="Raw Markdown"
              >
                <FileText />
              </button>
            </div>
          )}
        </div>
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
        {editorMode === 'wysiwyg' ? (
          <>
            <EditorContent editor={editor} className="editor-content" />
            
            {/* Image drop zone overlay */}
            <ImageDropZone containerRef={editorContentRef} enabled={editable} />
            
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
            
            {/* Image edit popover */}
            {imageEditState?.isOpen && (
              <ImageEditPopover
                src={imageEditState.src}
                alt={imageEditState.alt}
                position={imageEditState.position}
                onSave={(newSrc, newAlt) => {
                  // Update the image at the stored position
                  editor.chain().focus().setNodeSelection(imageEditState.pos).updateAttributes('resizableImage', {
                    src: newSrc,
                    alt: newAlt,
                  }).run();
                  setImageEditState(null);
                }}
                onDelete={() => {
                  // Delete the image at the stored position
                  editor.chain().focus().setNodeSelection(imageEditState.pos).deleteSelection().run();
                  setImageEditState(null);
                }}
                onClose={() => setImageEditState(null)}
              />
            )}
          </>
        ) : (
          <SyntaxHighlightedMarkdown
            content={rawMarkdown}
            onChange={handleRawMarkdownChange}
            placeholder="Write your markdown here..."
            editable={editable}
            autofocus
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
