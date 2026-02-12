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
import { MixedBulletList, MixedOrderedList, MixedTaskList, MixedTaskItem, MixedListItem } from './extensions/MixedLists';
import { CollapsibleList } from './extensions/CollapsibleList';
// Using custom CodeBlockWithFeatures instead of CodeBlockLowlight
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Typography from '@tiptap/extension-typography';
import { CodeBlockWithFeatures } from './extensions/CodeBlockWithFeatures';
import { useCallback, useEffect, useMemo, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { LinkPopover } from './LinkPopover';
import { LinkHoverTooltip } from './LinkHoverTooltip';
import { FloatingToolbar } from './FloatingToolbar';
import { CalloutWithMenu } from './extensions/CalloutWithMenu';
import { ResizableImage } from './extensions/ResizableImage';
import { DatePill, formatDateForMarkdown, parseDateFromMarkdown, getDateVariant } from './extensions/DatePill';
import { SlashCommands } from './SlashCommands';
import { EditorToolbar } from './EditorToolbar';
import { FindReplace, type SearchMatch } from './FindReplace';
import { SelectAllActionBar } from './SelectAllActionBar';
import { useAutoSave } from './hooks/useAutoSave';
import { useWordCount } from './hooks/useWordCount';
import { AutoSaveIndicator } from './AutoSaveIndicator';
import { RecoveryBanner } from './RecoveryBanner';
import { WikiLinkSafe } from './extensions/WikiLinkSafe';
import { MarkdownPasteSafe } from './extensions/MarkdownPasteSafe';
// DragHandleOverlay removed - drag and reorder functionality disabled
import { CollapsibleHeading } from './extensions/CollapsibleHeading';
import { MarkdownLinkInputRule } from './extensions/MarkdownLinkInputRule';
import { CalloutInputRule } from './extensions/CalloutInputRule';
import { SearchHighlight } from './extensions/SearchHighlight';
import { TabIndent } from './extensions/TabIndent';
import { SelectAllOccurrences } from './extensions/SelectAllOccurrences';
import { ImageUpload } from './extensions/ImageUpload';
import { ImageDropZone } from './ImageDropZone';
import { ImageEditPopover } from './ImageEditPopover';
import { SyntaxHighlightedMarkdown } from './SyntaxHighlightedMarkdown';
import { PerformanceProfiler } from './PerformanceProfiler';
import { EditorErrorBoundary } from './EditorErrorBoundary';
import CustomScrollbar from './CustomScrollbar';
import './PerformanceProfiler.css';
import { FileText, Eye } from 'lucide-react';
import { TableOfContents } from './TableOfContents';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { marked } from 'marked';
import type { Editor } from '@tiptap/react';

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

/**
 * Editor ref handle - methods exposed via ref for external control
 */
export interface MarkdownEditorRef {
  /** Get the underlying TipTap editor instance */
  getEditor: () => Editor | null;
  /** Get the current HTML content */
  getHTML: () => string;
  /** Get the current markdown content */
  getMarkdown: () => string;
  /** Get plain text content */
  getText: () => string;
  /** Set content (HTML string) */
  setContent: (content: string) => void;
  /** Clear all content */
  clearContent: () => void;
  /** Focus the editor */
  focus: (position?: 'start' | 'end' | 'all' | number | boolean) => void;
  /** Blur the editor */
  blur: () => void;
  /** Check if editor is empty */
  isEmpty: () => boolean;
  /** Check if editor is focused */
  isFocused: () => boolean;
  /** Get current editor mode */
  getMode: () => 'wysiwyg' | 'markdown';
  /** Set editor mode */
  setMode: (mode: 'wysiwyg' | 'markdown') => void;
  /** Toggle between modes */
  toggleMode: () => 'wysiwyg' | 'markdown';
  /** Get word count stats */
  getWordCount: () => { words: number; characters: number; charactersWithSpaces: number };
  /** Undo last action */
  undo: () => void;
  /** Redo last undone action */
  redo: () => void;
  /** Check if can undo */
  canUndo: () => boolean;
  /** Check if can redo */
  canRedo: () => boolean;
  /** Insert content at cursor position */
  insertContent: (content: string) => void;
  /** Insert image at cursor position */
  insertImage: (src: string, alt?: string) => void;
  /** Insert table at cursor position */
  insertTable: (rows?: number, cols?: number) => void;
  /** Insert code block at cursor position */
  insertCodeBlock: (language?: string) => void;
  /** Insert callout at cursor position */
  insertCallout: (type?: 'info' | 'note' | 'prompt' | 'resources' | 'todo') => void;
  /** Insert horizontal rule at cursor position */
  insertHorizontalRule: () => void;
  /** Toggle bold on selection */
  toggleBold: () => void;
  /** Toggle italic on selection */
  toggleItalic: () => void;
  /** Toggle underline on selection */
  toggleUnderline: () => void;
  /** Toggle strikethrough on selection */
  toggleStrike: () => void;
  /** Toggle code on selection */
  toggleCode: () => void;
  /** Toggle highlight on selection */
  toggleHighlight: () => void;
  /** Set heading level (1-6) or 0 for paragraph */
  setHeading: (level: 0 | 1 | 2 | 3 | 4 | 5 | 6) => void;
  /** Toggle bullet list */
  toggleBulletList: () => void;
  /** Toggle numbered list */
  toggleOrderedList: () => void;
  /** Toggle task list */
  toggleTaskList: () => void;
  /** Toggle blockquote */
  toggleBlockquote: () => void;
  /** Set link on selection */
  setLink: (url: string) => void;
  /** Remove link from selection */
  unsetLink: () => void;
  /** Open find/replace panel */
  openFindReplace: () => void;
  /** Close find/replace panel */
  closeFindReplace: () => void;
  /** Trigger manual save */
  save: () => void;
  /** Clear saved content from storage */
  clearSavedContent: () => void;
  /** Get selection text */
  getSelectedText: () => string;
  /** Check if editor is editable */
  isEditable: () => boolean;
  /** Set editable state */
  setEditable: (editable: boolean) => void;
  /** Get the table of contents headings */
  getTableOfContents: () => { id: string; text: string; level: number; pos: number }[];
  /** Scroll to a heading by position */
  scrollToHeading: (pos: number) => void;
}

export interface MarkdownEditorProps {
  /** Initial HTML content */
  content?: string;
  /** Callback when content changes (HTML) */
  onChange?: (content: string) => void;
  /** Callback when HTML content changes (alias for onChange) */
  onHTMLChange?: (html: string) => void;
  /** Callback when raw markdown content changes */
  onMarkdownChange?: (markdown: string) => void;
  /** Placeholder text when editor is empty */
  placeholder?: string;
  /** Whether the editor is editable */
  editable?: boolean;
  /** Whether to autofocus the editor on mount */
  autofocus?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Show top toolbar (default: true) */
  showToolbar?: boolean;
  /** Show word count in footer (default: true) */
  showWordCount?: boolean;
  /** Theme mode - controls dark/light styling of the editor */
  theme?: 'dark' | 'light';
  /** Enable auto-save to localStorage (default: true) */
  autoSave?: boolean;
  /** Storage key for auto-save (default: 'paragon-editor-content') */
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
  
  // === NEW PROPS FOR EXTERNAL INTEGRATION ===
  
  /** Initial editor mode (default: 'wysiwyg') */
  initialMode?: 'wysiwyg' | 'markdown';
  /** Callback when editor mode changes */
  onModeChange?: (mode: 'wysiwyg' | 'markdown') => void;
  /** Callback when editor is ready with the editor instance */
  onReady?: (editor: Editor) => void;
  /** Callback when editor is focused */
  onFocus?: () => void;
  /** Callback when editor loses focus */
  onBlur?: () => void;
  /** Callback when selection changes */
  onSelectionChange?: (selection: { from: number; to: number; empty: boolean }) => void;
  /** Callback when editor is destroyed */
  onDestroy?: () => void;
  /** Callback when content is saved (auto-save or manual) */
  onSave?: (content: string) => void;
  /** Callback when content is recovered from storage */
  onRecover?: (content: string) => void;
  /** Callback when a wiki link is clicked */
  onWikiLinkClick?: (pageName: string) => void;
  /** Callback when a link is clicked (return false to prevent default) */
  onLinkClick?: (url: string, event: MouseEvent) => boolean | void;
  /** Show find/replace panel (default: false) - controlled mode */
  findReplaceOpen?: boolean;
  /** Callback when find/replace panel state changes */
  onFindReplaceChange?: (isOpen: boolean) => void;
  /** Custom toolbar render function - allows replacing or extending toolbar */
  renderToolbar?: (editor: Editor, defaultToolbar: React.ReactNode) => React.ReactNode;
  /** Custom footer render function - allows replacing or extending footer */
  renderFooter?: (wordCount: { words: number; characters: number }, autoSaveStatus: string, defaultFooter: React.ReactNode) => React.ReactNode;
  /** Disable specific features */
  disabledFeatures?: {
    tables?: boolean;
    images?: boolean;
    codeBlocks?: boolean;
    taskLists?: boolean;
    callouts?: boolean;
    datePills?: boolean;
    wikiLinks?: boolean;
    collapsibleHeadings?: boolean;
    slashCommands?: boolean;
    markdownPaste?: boolean;
    dragAndDrop?: boolean;
  };
  /** Minimum height of the editor (default: '200px') */
  minHeight?: string;
  /** Maximum height of the editor (default: none) */
  maxHeight?: string;
  /** Enable spellcheck (default: true) */
  spellCheck?: boolean;
  /** Heading levels to enable (default: [1, 2, 3, 4, 5, 6]) */
  headingLevels?: (1 | 2 | 3 | 4 | 5 | 6)[];
  /** Collapsible heading levels (default: [1, 2, 3]) */
  collapsibleHeadingLevels?: (1 | 2 | 3 | 4 | 5 | 6)[];
  
  // === TABLE OF CONTENTS PROPS ===
  
  /** Show table of contents sidebar (default: false) */
  showTableOfContents?: boolean;
  /** Initial visibility of the TOC sidebar (default: true) */
  tocVisible?: boolean;
  /** Callback when TOC visibility changes */
  onTocVisibilityChange?: (visible: boolean) => void;
  /** TOC sidebar title (default: 'Table of Contents') */
  tocTitle?: string;
  /** Minimum heading level to include in TOC (default: 1) */
  tocMinLevel?: number;
  /** Maximum heading level to include in TOC (default: 4) */
  tocMaxLevel?: number;
  /** Show heading level indicators in TOC (default: true) */
  tocShowLevelIndicators?: boolean;
  /** Highlight active heading in TOC (default: true) */
  tocHighlightActive?: boolean;
  /** Use tree view with collapsible sections (default: false) */
  tocTreeView?: boolean;
  /** TOC sidebar width (default: '240px') */
  tocWidth?: string;
  /** TOC sidebar position (default: 'right') */
  tocPosition?: 'left' | 'right';
  /** Scroll offset when clicking a TOC item (default: 20) */
  tocScrollOffset?: number;
  /** Callback when a TOC item is clicked */
  onTocItemClick?: (item: { id: string; text: string; level: number; pos: number }) => void;
  /** Custom render function for TOC items */
  renderTocItem?: (item: { id: string; text: string; level: number; pos: number }, isActive: boolean, onClick: () => void) => React.ReactNode;
  /** Show TOC toggle button (default: true) */
  tocShowToggleButton?: boolean;
  
  // === PERFORMANCE PROFILER ===
  
  /** Whether the performance profiler panel is visible. Fully controlled by the embedding application. (default: false) */
  showPerformanceProfiler?: boolean;
  
  /** Callback when the user clicks the close button inside the profiler. The embedding app should set showPerformanceProfiler to false. */
  onPerformanceProfilerClose?: () => void;
  
  // === CHECKLIST REORDER ===
  
  /** Automatically reorder checklist items when toggled: move completed to bottom, preserving relative order within each group (default: false) */
  autoReorderChecklist?: boolean;
  
  // === ERROR BOUNDARY ===
  
  /** Callback when the editor crashes — useful for external error reporting */
  onEditorError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export const MarkdownEditor = forwardRef<MarkdownEditorRef, MarkdownEditorProps>(function MarkdownEditor({
  content = '',
  onChange,
  onHTMLChange,
  onMarkdownChange,
  placeholder = 'Start writing... Use "/" for commands',
  editable = true,
  autofocus = false,
  className = '',
  showToolbar = true,
  showWordCount = true,
  theme,
  autoSave = true,
  autoSaveKey = 'paragon-editor-content',
  autoSaveDelay = 1000,
  showRecoveryBanner = true,
  showFloatingToolbar = true,
  maxImageSize = 5 * 1024 * 1024,
  onImageUploadStart,
  onImageUploadComplete,
  onImageUploadError,
  showModeToggle = true,
  // New props
  initialMode = 'wysiwyg',
  onModeChange,
  onReady,
  onFocus,
  onBlur,
  onSelectionChange,
  onDestroy,
  onSave,
  onRecover,
  onWikiLinkClick,
  onLinkClick,
  findReplaceOpen,
  onFindReplaceChange,
  renderToolbar,
  renderFooter,
  disabledFeatures = {},
  minHeight = '200px',
  maxHeight,
  spellCheck = true,
  headingLevels = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels = [1, 2, 3],
  // TOC props
  showTableOfContents = false,
  tocVisible = true,
  onTocVisibilityChange,
  tocTitle = '',
  tocMinLevel = 1,
  tocMaxLevel = 4,
  tocShowLevelIndicators = false,
  tocHighlightActive = true,
  tocTreeView = false,
  tocWidth = '240px',
  tocPosition = 'right',
  tocScrollOffset = 20,
  onTocItemClick,
  renderTocItem,
  tocShowToggleButton = true,
  // Performance profiler
  showPerformanceProfiler = false,
  onPerformanceProfilerClose,
  // Auto reorder checklist
  autoReorderChecklist = false,
  // Error boundary
  onEditorError,
}, ref) {
  // Check if mobile on mount
  const [isMobile] = useState(() => isMobileDevice());
  
  // Editor mode: 'wysiwyg' or 'markdown'
  const [editorMode, setEditorMode] = useState<'wysiwyg' | 'markdown'>(initialMode);
  
  // Raw markdown content for markdown mode
  const [rawMarkdown, setRawMarkdown] = useState('');
  
  // Refs to track current values for the API (avoids closure issues)
  const editorModeRef = useRef<'wysiwyg' | 'markdown'>(initialMode);
  const rawMarkdownRef = useRef<string>('');
  
  // Ref for the editor content wrapper (for drag handle overlay)
  const editorContentRef = useRef<HTMLDivElement>(null);
  
  // Error boundary remount key — incremented to force re-render of editor content
  const [editorErrorKey, setEditorErrorKey] = useState(0);
  const [rawSearchMatches, setRawSearchMatches] = useState<SearchMatch[]>([]);
  const [rawSearchCurrentIndex, setRawSearchCurrentIndex] = useState(0);
  const handleSearchMatchesChange = useCallback((matches: SearchMatch[], currentIndex: number) => {
    setRawSearchMatches(matches);
    setRawSearchCurrentIndex(currentIndex);
  }, []);

  // Old scroll-triggered scrollbar via CSS class removed — replaced by CustomScrollbar component

  // Build extensions array - conditionally include problematic extensions on mobile
  const extensions = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const baseExtensions: any[] = [
      StarterKit.configure({
        heading: {
          levels: headingLevels,
        },
        codeBlock: false, // We use CodeBlockLowlight instead
        dropcursor: {
          color: 'var(--primary)',
          width: 2,
        },
        // Disable default list extensions - we use MixedLists instead
        bulletList: false,
        orderedList: false,
        listItem: false,
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
      // Mixed list extensions - allow inter-mixing of bullet, ordered, and task list items
      MixedBulletList,
      MixedOrderedList,
      MixedListItem,
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
      Underline,
      Subscript,
      Superscript,
      Typography,
      MarkdownLinkInputRule,
      SearchHighlight,
      SelectAllOccurrences,
      TabIndent,
    ];

    // Conditionally add tables
    if (!disabledFeatures.tables) {
      baseExtensions.push(
        Table.configure({
          resizable: !isMobile, // Disable resize on mobile
          HTMLAttributes: {
            class: 'editor-table',
          },
        }),
        TableRow,
        TableCellWithMenu,
        TableHeaderWithMenu,
        TableSorting
      );
    }

    // Conditionally add task lists (using mixed variants)
    if (!disabledFeatures.taskLists) {
      baseExtensions.push(
        MixedTaskList.configure({
          HTMLAttributes: {
            class: 'task-list',
          },
        }),
        MixedTaskItem.configure({
          nested: true,
          HTMLAttributes: {
            class: 'task-item',
          },
        })
      );
    }

    // Collapsible list items (desktop only)
    if (!isMobile) {
      baseExtensions.push(
        CollapsibleList.configure({
          listItemTypes: ['listItem', 'taskItem'],
        })
      );
    }

    // Conditionally add code blocks
    if (!disabledFeatures.codeBlocks) {
      baseExtensions.push(CodeBlockWithFeatures);
    }

    // Conditionally add callouts
    if (!disabledFeatures.callouts) {
      baseExtensions.push(CalloutWithMenu, CalloutInputRule);
    }

    // Conditionally add collapsible headings
    if (!disabledFeatures.collapsibleHeadings) {
      baseExtensions.push(
        CollapsibleHeading.configure({
          levels: collapsibleHeadingLevels,
        })
      );
    }

    // Conditionally add images
    if (!disabledFeatures.images) {
      baseExtensions.push(
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
        ImageUpload.configure({
          maxFileSize: maxImageSize,
          onUploadStart: onImageUploadStart,
          onUploadComplete: onImageUploadComplete,
          onUploadError: onImageUploadError,
        })
      );
    }

    // Only add DatePill on desktop and if not disabled
    if (!isMobile && !disabledFeatures.datePills) {
      baseExtensions.push(
        DatePill.configure({
          HTMLAttributes: {
            class: 'date-pill',
          },
        })
      );
    }

    // Conditionally add wiki links
    if (!disabledFeatures.wikiLinks) {
      baseExtensions.push(
        WikiLinkSafe.configure({
          onWikiLinkClick: (pageName) => {
            console.log('WikiLink clicked:', pageName);
            onWikiLinkClick?.(pageName);
          },
        })
      );
    }

    // Conditionally add markdown paste
    if (!disabledFeatures.markdownPaste) {
      baseExtensions.push(
        MarkdownPasteSafe.configure({
          enableMarkdownPaste: true,
        })
      );
    }

    return baseExtensions;
  }, [placeholder, isMobile, maxImageSize, onImageUploadStart, onImageUploadComplete, onImageUploadError, headingLevels, collapsibleHeadingLevels, disabledFeatures, onWikiLinkClick]);

  // Debounced onUpdate ref for HTML serialization performance
  const onUpdateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onChangeRef = useRef(onChange);
  const onHTMLChangeRef = useRef(onHTMLChange);
  const onMarkdownChangeRef = useRef(onMarkdownChange);
  // Ref for turndownService so onUpdate callback can access it (turndownService is created after useEditor)
  const turndownServiceRef = useRef<TurndownService | null>(null);
  onChangeRef.current = onChange;
  onHTMLChangeRef.current = onHTMLChange;
  onMarkdownChangeRef.current = onMarkdownChange;

  const editor = useEditor({
    /**
     * Performance: Render immediately without waiting for next tick
     */
    immediatelyRender: false,
    /**
     * Performance: Prevent React re-renders on every ProseMirror transaction.
     * The editor DOM updates are handled by ProseMirror directly.
     * Only toolbar state and other React UI need selective re-renders via useEditorState.
     */
    shouldRerenderOnTransaction: false,
    // @ts-ignore - Expose editor globally for debugging
    onCreate: ({ editor }) => {
      (window as any).__tiptapEditor = editor;
      onReady?.(editor);
    },
    onDestroy: () => {
      onDestroy?.();
    },
    extensions,
    content,
    editable,
    autofocus,
    editorProps: {
      attributes: {
        class: 'tiptap-editor outline-none min-h-full',
        spellcheck: spellCheck ? 'true' : 'false',
      },
      handleClick: (view, pos, event) => {
        // Handle link clicks
        if (onLinkClick) {
          const target = event.target as HTMLElement;
          const link = target.closest('a');
          if (link) {
            const url = link.getAttribute('href');
            if (url) {
              const result = onLinkClick(url, event);
              if (result === false) {
                event.preventDefault();
                return true;
              }
            }
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      // Performance: Debounce HTML serialization to avoid calling getHTML() on every keystroke
      // getHTML() serializes the entire document - expensive for large docs
      if (onUpdateTimeoutRef.current) {
        clearTimeout(onUpdateTimeoutRef.current);
      }
      onUpdateTimeoutRef.current = setTimeout(() => {
        if (editor.isDestroyed) return;
        const html = editor.getHTML();
        if (onChangeRef.current || onHTMLChangeRef.current) {
          onChangeRef.current?.(html);
          onHTMLChangeRef.current?.(html);
        }
        // Keep rawMarkdown in sync with WYSIWYG changes (e.g., image resize)
        // Only sync when in WYSIWYG mode to avoid overwriting user's raw edits
        if (editorModeRef.current === 'wysiwyg' && turndownServiceRef.current) {
          const markdown = turndownServiceRef.current.turndown(html);
          rawMarkdownRef.current = markdown;
          onMarkdownChangeRef.current?.(markdown);
        }
      }, 150);
    },
    onFocus: () => {
      onFocus?.();
    },
    onBlur: () => {
      // Flush any pending debounced onChange immediately on blur
      // This prevents data loss when user switches apps (especially on mobile)
      if (onUpdateTimeoutRef.current) {
        clearTimeout(onUpdateTimeoutRef.current);
        onUpdateTimeoutRef.current = null;
        if (editor && !editor.isDestroyed) {
          const html = editor.getHTML();
          if (onChangeRef.current || onHTMLChangeRef.current) {
            onChangeRef.current?.(html);
            onHTMLChangeRef.current?.(html);
          }
          // Flush rawMarkdown sync on blur too
          if (editorModeRef.current === 'wysiwyg' && turndownServiceRef.current) {
            const markdown = turndownServiceRef.current.turndown(html);
            rawMarkdownRef.current = markdown;
            onMarkdownChangeRef.current?.(markdown);
          }
        }
      }
      onBlur?.();
    },
    onSelectionUpdate: ({ editor }) => {
      if (onSelectionChange) {
        const { from, to, empty } = editor.state.selection;
        onSelectionChange({ from, to, empty });
      }
    },
  });

  // Cleanup debounced onUpdate timeout - flush pending changes on unmount
  // This ensures image resize and other pending changes are saved when navigating away
  useEffect(() => {
    return () => {
      if (onUpdateTimeoutRef.current) {
        clearTimeout(onUpdateTimeoutRef.current);
        onUpdateTimeoutRef.current = null;
        // Flush the pending onChange before unmount
        if (editor && !editor.isDestroyed) {
          const html = editor.getHTML();
          if (onChangeRef.current || onHTMLChangeRef.current) {
            onChangeRef.current?.(html);
            onHTMLChangeRef.current?.(html);
          }
          // Flush rawMarkdown sync on unmount too
          if (editorModeRef.current === 'wysiwyg' && turndownServiceRef.current) {
            const markdown = turndownServiceRef.current.turndown(html);
            rawMarkdownRef.current = markdown;
            onMarkdownChangeRef.current?.(markdown);
          }
        }
      }
    };
  }, []);

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
  
  // State for find/replace panel - support both controlled and uncontrolled modes
  const [internalFindReplaceOpen, setInternalFindReplaceOpen] = useState(false);
  const isFindReplaceOpen = findReplaceOpen !== undefined ? findReplaceOpen : internalFindReplaceOpen;
  const setIsFindReplaceOpen = useCallback((open: boolean) => {
    setInternalFindReplaceOpen(open);
    onFindReplaceChange?.(open);
  }, [onFindReplaceChange]);
  
  const [findReplaceFocusTrigger, setFindReplaceFocusTrigger] = useState(0);
  const [findReplaceInitialQuery, setFindReplaceInitialQuery] = useState('');

  // Auto-save functionality
  const autoSaveState = useAutoSave(editor, {
    storageKey: autoSaveKey,
    debounceMs: autoSaveDelay,
    enabled: autoSave,
    onSave: (content) => {
      onSave?.(content);
    },
    onRecover: (content) => {
      onRecover?.(content);
    },
  });

  // Create TurndownService for HTML to Markdown conversion
  const turndownService = useMemo(() => {
    const td = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      emDelimiter: '*',
      strongDelimiter: '**',
      // CRITICAL: Handle empty elements that Turndown considers "blank".
      // TipTap's getHTML() can produce <p></p> (no children) for empty lines.
      // Turndown's custom rules only run for non-blank nodes.
      // Blank nodes (empty textContent, no meaningful children) go through
      // blankReplacement instead. Without this, empty paragraphs are silently
      // dropped, causing user-intentional blank lines to disappear on reload.
      blankReplacement: (content: string, node: any) => {
        if (node.nodeName === 'P') {
          return '\n\n\u200B\n\n';
        }
        return node.isBlock ? '\n\n' : '';
      },
    });
    
    // Use GFM plugin for tables, strikethrough, and task lists
    td.use(gfm);
    
    // Add custom rules for better markdown output
    td.addRule('highlight', {
      filter: (node) => node.nodeName === 'MARK',
      replacement: (content) => `==${content}==`,
    });
    
    // Custom image rule to preserve width attribute using ![alt | width](url) format
    td.addRule('resizableImage', {
      filter: 'img',
      replacement: (content, node) => {
        const img = node as HTMLImageElement;
        const src = img.getAttribute('src') || '';
        const alt = img.getAttribute('alt') || '';
        const width = img.getAttribute('width') || img.style.width?.replace('px', '');
        
        // Use ![alt | width](url) format to preserve width in markdown
        if (width) {
          return `![${alt} | ${width}](${src})`;
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
        const el = node as HTMLElement;
        const checkbox = el.querySelector('input[type="checkbox"]');
        // Check both the checkbox state and the data-checked attribute (TipTap fallback)
        const checked = checkbox?.hasAttribute('checked') || 
                       (checkbox as HTMLInputElement)?.checked ||
                       el.getAttribute('data-checked') === 'true';
        // Strip extra blank lines from <p> wrappers inside list items
        content = content
          .replace(/^\n+/, '')
          .replace(/\n+$/, '')
          .replace(/\n\n+/g, '\n\n');
        // Collapse blank line between text and nested list marker
        content = content.replace(/\n\n(- |\d+\. )/g, '\n$1');
        // Strip ZWSP and trim
        content = content.replace(/\u200B/g, '').trim();
        // Add ZWSP after empty checkboxes so marked parses them correctly
        const text = content || '\u200B';
        const prefix = `- [${checked ? 'x' : ' '}] `;
        return prefix + text.replace(/\n/gm, '\n    ') + '\n';
      },
    });
    
    // Tight lists: strip extra blank lines from <p> wrappers inside <li>
    td.addRule('tightListParagraph', {
      filter: (node) => {
        return node.nodeName === 'P' && 
               node.parentNode !== null &&
               (node.parentNode as HTMLElement).nodeName === 'LI';
      },
      replacement: (content) => {
        return content;
      },
    });
    
    // Blank line preservation: empty paragraphs emit ZWSP so blank lines survive round-trip
    td.addRule('blankLinePreservation', {
      filter: (node) => {
        return node.nodeName === 'P' && 
               (node.textContent === '' || node.textContent === '\u200B') &&
               node.parentNode !== null &&
               (node.parentNode as HTMLElement).nodeName !== 'LI';
      },
      replacement: () => {
        return '\n\n\u200B\n\n';
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
    
    // Date pill rule: serialize as @Feb 11, 2025@ markdown format
    td.addRule('datePill', {
      filter: (node) => {
        return node.nodeName === 'SPAN' && 
               (node as HTMLElement).getAttribute('data-type') === 'date-pill';
      },
      replacement: (content, node) => {
        const dateStr = (node as HTMLElement).getAttribute('data-date');
        if (dateStr) {
          return `@${formatDateForMarkdown(dateStr)}@`;
        }
        return content;
      },
    });
    
    // Custom callout rule to convert callouts to markdown code block syntax
    // e.g., ```ad-info\ncontent\n```
    td.addRule('callout', {
      filter: (node) => {
        return node.nodeName === 'DIV' && node.hasAttribute('data-callout');
      },
      replacement: (content, node) => {
        const calloutType = (node as HTMLElement).getAttribute('data-type') || 'info';
        // Clean up the content - remove leading/trailing whitespace and normalize newlines
        const cleanContent = content.trim().replace(/\n{3,}/g, '\n\n');
        return `\n\n\`\`\`ad-${calloutType}\n${cleanContent}\n\`\`\`\n\n`;
      },
    });
    
    return td;
  }, []);

  // Keep turndownServiceRef in sync so the onUpdate callback can access it
  turndownServiceRef.current = turndownService;

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
      // Use queueMicrotask to avoid flushSync error when ReactNodeViewRenderer is used
      // This defers the setContent call to after React's render cycle completes
      
      // First, convert callout code blocks to callout HTML before parsing
      // Matches ```ad-info, ```ad-note, ```ad-prompt, ```ad-resources, ```ad-todo code blocks
      // Also supports legacy format without ad- prefix
      const calloutTypes = ['info', 'note', 'prompt', 'resources', 'todo'];
      let processedMarkdown = rawMarkdownRef.current;
      
      // Replace callout code blocks with callout HTML (ad- prefix format)
      calloutTypes.forEach(type => {
        const regex = new RegExp(`\`\`\`ad-${type}\\s*\\n([\\s\\S]*?)\`\`\``, 'g');
        processedMarkdown = processedMarkdown.replace(regex, (match, content) => {
          const innerHtml = marked.parse(content.trim(), { async: false }) as string;
          return `<div data-callout="" data-type="${type}" class="callout callout-${type}">${innerHtml}</div>`;
        });
      });
      // Also support legacy format without ad- prefix
      calloutTypes.forEach(type => {
        const regex = new RegExp(`\`\`\`${type}\\s*\\n([\\s\\S]*?)\`\`\``, 'g');
        processedMarkdown = processedMarkdown.replace(regex, (match, content) => {
          const innerHtml = marked.parse(content.trim(), { async: false }) as string;
          return `<div data-callout="" data-type="${type}" class="callout callout-${type}">${innerHtml}</div>`;
        });
      });
      
      // Convert ![alt | width](url) image format to HTML img tags with width attribute
      // This preserves image dimensions across mode switches
      processedMarkdown = processedMarkdown.replace(/!\[([^\]]*)\s*\|\s*(\d+)\]\(([^)]+)\)/g, (match, alt, width, src) => {
        return `<img src="${src.trim()}" alt="${alt.trim()}" width="${width.trim()}" style="width: ${width.trim()}px" />`;
      });
      
      // Convert ==text== highlight format to <mark> tags
      // Must be done before marked.parse() since marked doesn't support == syntax natively
      // Use negative lookbehind/lookahead to avoid matching inside code blocks or URLs
      processedMarkdown = processedMarkdown.replace(/(?<!`)==((?:(?!==)[^\n])+)==(?!`)/g, '<mark>$1</mark>');

      // Convert date pill markdown format @Mon DD, YYYY@ back to date pill HTML
      // Matches @Today@, @Tomorrow@, @Yesterday@, @Next Monday@, @Feb 11, 2025@, etc.
      processedMarkdown = processedMarkdown.replace(/@([^@\n]+)@/g, (match, dateText) => {
        const parsed = parseDateFromMarkdown(dateText);
        if (parsed) {
          const variant = getDateVariant(parsed);
          return `<span data-type="date-pill" data-date="${parsed}" class="date-pill ${variant}"><span class="date-icon">📅</span><span class="date-text">${dateText.trim()}</span></span>`;
        }
        return match; // Not a valid date, leave as-is
      });
      
      const html = marked.parse(processedMarkdown, { async: false }) as string;
      queueMicrotask(() => {
        if (!editor.isDestroyed) {
          editor.commands.setContent(html);
        }
      });
    }
    
    setEditorMode(newMode);
    editorModeRef.current = newMode;
    onModeChange?.(newMode);
  }, [editor, turndownService, onModeChange]);

  // Handle raw markdown changes
  const handleRawMarkdownChange = useCallback((markdown: string) => {
    setRawMarkdown(markdown);
    rawMarkdownRef.current = markdown;
    onMarkdownChange?.(markdown);
  }, [onMarkdownChange]);

  // Word count calculation (debounced for performance with large documents)
  const wordCount = useWordCount(editor, {
    debounceMs: 500,
    extendedStats: false,
    enabled: showWordCount,
  });

  // Expose imperative handle for ref
  useImperativeHandle(ref, () => ({
    getEditor: () => editor,
    getHTML: () => editor?.getHTML() || '',
    getMarkdown: () => {
      if (!editor) return '';
      return turndownService.turndown(editor.getHTML());
    },
    getText: () => editor?.getText() || '',
    setContent: (content: string) => {
      if (editor && !editor.isDestroyed) {
        queueMicrotask(() => {
          editor.commands.setContent(content);
        });
      }
    },
    clearContent: () => {
      if (editor && !editor.isDestroyed) {
        editor.commands.clearContent();
      }
    },
    focus: (position) => {
      if (editor && !editor.isDestroyed) {
        editor.commands.focus(position);
      }
    },
    blur: () => {
      if (editor && !editor.isDestroyed) {
        editor.commands.blur();
      }
    },
    isEmpty: () => editor?.isEmpty || true,
    isFocused: () => editor?.isFocused || false,
    getMode: () => editorModeRef.current,
    setMode: (mode) => handleModeSwitch(mode),
    toggleMode: () => {
      const newMode = editorModeRef.current === 'wysiwyg' ? 'markdown' : 'wysiwyg';
      handleModeSwitch(newMode);
      return newMode;
    },
    getWordCount: () => ({
      words: wordCount.words,
      characters: wordCount.characters,
      charactersWithSpaces: wordCount.charactersWithSpaces,
    }),
    undo: () => editor?.commands.undo(),
    redo: () => editor?.commands.redo(),
    canUndo: () => editor?.can().undo() || false,
    canRedo: () => editor?.can().redo() || false,
    insertContent: (content) => editor?.commands.insertContent(content),
    insertImage: (src, alt = '') => editor?.commands.setImage({ src, alt }),
    insertTable: (rows = 3, cols = 3) => editor?.commands.insertTable({ rows, cols, withHeaderRow: true }),
    insertCodeBlock: (language) => {
      if (language) {
        editor?.commands.setCodeBlock({ language });
      } else {
        editor?.commands.setCodeBlock();
      }
    },
    insertCallout: (type = 'info') => editor?.commands.insertCallout?.({ type: type as 'info' | 'note' | 'prompt' | 'resources' | 'todo' }),
    insertHorizontalRule: () => editor?.commands.setHorizontalRule(),
    toggleBold: () => editor?.commands.toggleBold(),
    toggleItalic: () => editor?.commands.toggleItalic(),
    toggleUnderline: () => editor?.commands.toggleUnderline(),
    toggleStrike: () => editor?.commands.toggleStrike(),
    toggleCode: () => editor?.commands.toggleCode(),
    toggleHighlight: () => editor?.commands.toggleHighlight(),
    setHeading: (level) => {
      if (level === 0) {
        editor?.commands.setParagraph();
      } else {
        editor?.commands.setHeading({ level });
      }
    },
    toggleBulletList: () => editor?.commands.toggleBulletList(),
    toggleOrderedList: () => editor?.commands.toggleOrderedList(),
    toggleTaskList: () => editor?.commands.toggleTaskList(),
    toggleBlockquote: () => editor?.commands.toggleBlockquote(),
    setLink: (url) => editor?.commands.setLink({ href: url }),
    unsetLink: () => editor?.commands.unsetLink(),
    openFindReplace: () => {
      setIsFindReplaceOpen(true);
      setFindReplaceFocusTrigger(prev => prev + 1);
    },
    closeFindReplace: () => setIsFindReplaceOpen(false),
    save: () => autoSaveState.save(),
    clearSavedContent: () => autoSaveState.clear(),
    getSelectedText: () => {
      if (!editor) return '';
      const { from, to } = editor.state.selection;
      return editor.state.doc.textBetween(from, to, ' ');
    },
    isEditable: () => editor?.isEditable || false,
    setEditable: (editable) => editor?.setEditable(editable),
    /** Get the table of contents headings */
    getTableOfContents: () => {
      if (!editor) return [];
      const headings: { id: string; text: string; level: number; pos: number }[] = [];
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'heading') {
          const level = node.attrs.level as number;
          const text = node.textContent.trim();
          if (text) {
            headings.push({ id: `toc-heading-${pos}`, text, level, pos });
          }
        }
      });
      return headings;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (pos: number) => {
      if (!editor || editor.isDestroyed) return;
      try {
        const resolvedPos = editor.state.doc.resolve(pos);
        const dom = editor.view.nodeDOM(resolvedPos.before(resolvedPos.depth + 1));
        if (dom instanceof HTMLElement) {
          const scrollContainer = editor.view.dom.closest('.editor-content-wrapper') as HTMLElement;
          if (scrollContainer) {
            const containerRect = scrollContainer.getBoundingClientRect();
            const elementRect = dom.getBoundingClientRect();
            const relativeTop = elementRect.top - containerRect.top + scrollContainer.scrollTop;
            scrollContainer.scrollTo({ top: relativeTop - 20, behavior: 'smooth' });
          } else {
            dom.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        editor.commands.setTextSelection(pos + 1);
      } catch { /* position might be invalid */ }
    },
  }), [editor, turndownService, handleModeSwitch, wordCount, autoSaveState, setIsFindReplaceOpen]);

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
        window.addEventListener('paragon-editor-mode-change', handler);
        return () => window.removeEventListener('paragon-editor-mode-change', handler);
      },
    };
    
    // Expose the API globally (only once on mount)
    (window as any).__paragonEditorModeAPI = editorModeAPI;
    
    console.log('Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI');
    console.log('Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)');
    
    return () => {
      // Cleanup on unmount
      delete (window as any).__paragonEditorModeAPI;
    };
  }, [handleModeSwitch]);
  
  // Dispatch event when mode changes (separate effect to avoid recreating the API)
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('paragon-editor-mode-change', { detail: { mode: editorMode } }));
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
        // Extract selected text to auto-fill the search input
        if (editor) {
          const { state } = editor;
          const { from, to } = state.selection;
          if (from !== to) {
            const selectedText = state.doc.textBetween(from, to, ' ');
            if (selectedText.trim()) {
              setFindReplaceInitialQuery(selectedText.trim());
            }
          }
        }
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
  }, [editor, isMobile, setIsFindReplaceOpen]);

  if (!editor) {
    return (
      <div className={`markdown-editor-container ${className}`} data-theme={theme}>
        <div className="editor-loading" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ height: '1rem', width: '100%', borderRadius: '0.25rem', background: 'var(--color-muted, #e5e7eb)', opacity: 0.5, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          <div style={{ height: '1rem', width: '83%', borderRadius: '0.25rem', background: 'var(--color-muted, #e5e7eb)', opacity: 0.5, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          <div style={{ height: '1rem', width: '66%', borderRadius: '0.25rem', background: 'var(--color-muted, #e5e7eb)', opacity: 0.5, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          <div style={{ height: '0.75rem' }} />
          <div style={{ height: '1rem', width: '100%', borderRadius: '0.25rem', background: 'var(--color-muted, #e5e7eb)', opacity: 0.5, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          <div style={{ height: '1rem', width: '75%', borderRadius: '0.25rem', background: 'var(--color-muted, #e5e7eb)', opacity: 0.5, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
        </div>
      </div>
    );
  }

  // Default toolbar component
  const defaultToolbar = (
    <EditorToolbar 
      editor={editor} 
      onOpenLinkPopover={() => setIsLinkPopoverOpen(true)}
      className="flex-1 border-b-0"
      onOpenFindReplace={() => {
        setIsFindReplaceOpen(true);
        setFindReplaceFocusTrigger(prev => prev + 1);
      }}
      disabledFeatures={disabledFeatures}
      autoReorderChecklist={autoReorderChecklist}
    />
  );

  // Default footer component
  const defaultFooter = (
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
  );

  // Dynamic styles for min/max height
  const editorContentStyle: React.CSSProperties = {
    minHeight,
    ...(maxHeight && { maxHeight, overflowY: 'auto' as const }),
  };

  return (
    <div className={`markdown-editor-container ${className}`} data-theme={theme}>
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
        <div className="flex items-center bg-card/50">
          {renderToolbar ? renderToolbar(editor, defaultToolbar) : defaultToolbar}
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
          initialSearchQuery={findReplaceInitialQuery}
          editorMode={editorMode}
          rawMarkdown={rawMarkdown}
          onRawMarkdownChange={handleRawMarkdownChange}
          onMatchesChange={handleSearchMatchesChange}
        />
      )}
      
      {/* Floating action bar for Select All Occurrences mode */}
      <SelectAllActionBar editor={editor} />
      
      {/* Main editor area with optional TOC sidebar */}
      <div className={`editor-main-area ${showTableOfContents ? 'editor-with-toc' : ''}`}>
      {/* TOC sidebar - left position */}
      {showTableOfContents && tocPosition === 'left' && (
        <TableOfContents
          editor={editor}
          visible={tocVisible}
          onVisibilityChange={onTocVisibilityChange}
          title={tocTitle}
          minLevel={tocMinLevel}
          maxLevel={tocMaxLevel}
          showLevelIndicators={tocShowLevelIndicators}
          highlightActive={tocHighlightActive}
          treeView={tocTreeView}
          width={tocWidth}
          position={tocPosition}
          scrollOffset={tocScrollOffset}
          onItemClick={onTocItemClick}
          renderItem={renderTocItem}
          showToggleButton={tocShowToggleButton}
          scrollContainerRef={editorContentRef as React.RefObject<HTMLElement>}
        />
      )}
      <EditorErrorBoundary
        resetKey={`${content}-${editorErrorKey}`}
        onRetry={() => setEditorErrorKey(k => k + 1)}
        onClearContent={() => {
          // Clear the editor content and remount
          if (editor) {
            editor.commands.clearContent();
          }
          onChange?.('');
          onHTMLChange?.('');
          onMarkdownChange?.('');
          setEditorErrorKey(k => k + 1);
        }}
        onError={onEditorError}
      >
      <div className="editor-content-wrapper" ref={editorContentRef} style={editorContentStyle}>
        {editorMode === 'wysiwyg' ? (
          <>
            <EditorContent editor={editor} className="editor-content" />
            
            {/* Image drop zone overlay */}
            {!disabledFeatures.images && !disabledFeatures.dragAndDrop && (
              <ImageDropZone containerRef={editorContentRef} enabled={editable} />
            )}
            
            {/* Drag handle overlay removed - drag and reorder functionality disabled */}
            
            {/* Floating toolbar on text selection (desktop only) */}
            {!isMobile && showFloatingToolbar && <FloatingToolbar editor={editor} suppressWhenLinkPopoverOpen={isLinkPopoverOpen} />}
            
            {/* Slash commands */}
            {!disabledFeatures.slashCommands && <SlashCommands editor={editor} disabledFeatures={disabledFeatures} />}
            
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
            {!disabledFeatures.images && imageEditState?.isOpen && (
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
            searchMatches={rawSearchMatches}
            currentMatchIndex={rawSearchCurrentIndex}
          />
        )}
      </div>
      <CustomScrollbar scrollContainerRef={editorContentRef} />
      </EditorErrorBoundary>
      {/* TOC sidebar - right position */}
      {showTableOfContents && tocPosition === 'right' && (
        <TableOfContents
          editor={editor}
          visible={tocVisible}
          onVisibilityChange={onTocVisibilityChange}
          title={tocTitle}
          minLevel={tocMinLevel}
          maxLevel={tocMaxLevel}
          showLevelIndicators={tocShowLevelIndicators}
          highlightActive={tocHighlightActive}
          treeView={tocTreeView}
          width={tocWidth}
          position={tocPosition}
          scrollOffset={tocScrollOffset}
          onItemClick={onTocItemClick}
          renderItem={renderTocItem}
          showToggleButton={tocShowToggleButton}
          scrollContainerRef={editorContentRef as React.RefObject<HTMLElement>}
        />
      )}
      </div>
      
      {/* Footer with word count and auto-save status */}
      {showWordCount && (
        renderFooter 
          ? renderFooter(
              { words: wordCount.words, characters: wordCount.characters },
              autoSaveState.status,
              defaultFooter
            )
          : defaultFooter
      )}
      
      {/* Performance Profiler Overlay (dev mode) */}
      <PerformanceProfiler visible={showPerformanceProfiler} onClose={onPerformanceProfilerClose} editor={editor} />
    </div>
  );
});

export default MarkdownEditor;
