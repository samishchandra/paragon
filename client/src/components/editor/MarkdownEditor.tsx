import { EditorContent } from '@tiptap/react';
/**
 * MarkdownEditor — main orchestrator component.
 *
 * Architecture overview:
 *
 *   Hooks (./hooks/)
 *     useEditorExtensions   – builds the TipTap extension array
 *     useEditorInstance     – creates the TipTap editor, debounced onUpdate, lightweight mode
 *     useEditorAPI          – exposes imperative methods via forwardRef
 *     useEditorKeyboardShortcuts – space-triggered markdown shortcuts (headings, lists, etc.)
 *     useHandleModeSwitch   – WYSIWYG ↔ markdown mode conversion pipeline
 *     useGlobalEditorAPI    – attaches window.__paragonEditorModeAPI for external control
 *     useTurndownService    – lazy-loaded HTML → markdown (turndown) service
 *     useAutoSave           – debounced auto-save with dirty tracking
 *     useWordCount          – live word/character count
 *
 *   Sub-components
 *     EditorLoadingSkeleton – placeholder shown while the editor initialises
 *     EditorModeToggle      – WYSIWYG / Markdown toggle buttons
 *     WYSIWYGOverlays       – floating toolbar, AI dropdown, slash commands,
 *                             link popover, wiki-link autocomplete, image edit popover
 *     EditorToolbar         – static formatting toolbar
 *     FindReplace           – Cmd+H find-and-replace panel
 *
 *   Utilities (./utils/)
 *     markdownPipeline      – markdown → HTML conversion (preprocessMarkdown, postprocessHtml)
 *     convertCheckboxLists  – transforms <input type="checkbox"> into TipTap task items
 *     splitSeparatedLists   – splits mixed OL/UL/task lists separated by blank lines
 *     structureImagesInListItems – restructures images inside list items for TipTap
 *     restoreHeaderColumn   – restores header-column markers in table HTML
 */
import { useCallback, useMemo, useState, useRef, forwardRef } from 'react';
import { EditorToolbar } from './EditorToolbar';
import { FindReplace, type SearchMatch } from './FindReplace';
import { SelectAllActionBar } from './SelectAllActionBar';
import { useAutoSave } from './hooks/useAutoSave';
import { useWordCount } from './hooks/useWordCount';
import { useEditorAPI } from './hooks/useEditorAPI';
import { useGlobalEditorAPI } from './hooks/useGlobalEditorAPI';
import { AutoSaveIndicator } from './AutoSaveIndicator';
import { RecoveryBanner } from './RecoveryBanner';
import { SyntaxHighlightedMarkdown } from './SyntaxHighlightedMarkdown';
import { PerformanceProfiler } from './PerformanceProfiler';
import { EditorErrorBoundary } from './EditorErrorBoundary';
import { EditorLoadingSkeleton } from './EditorLoadingSkeleton';
import { EditorModeToggle } from './EditorModeToggle';
import { WYSIWYGOverlays } from './WYSIWYGOverlays';
import CustomScrollbar from './CustomScrollbar';
import './PerformanceProfiler.css';
import { Sparkles } from 'lucide-react';
import type { AIActionDefinition, AIActionHandler, AIState } from './ai/types';
import { useAIState } from './ai/useAIState';
import { TableOfContents } from './TableOfContents';
import { useEditorInstance } from './hooks/useEditorInstance';
import { useEditorKeyboardShortcuts } from './hooks/useEditorKeyboardShortcuts';
import { useEditorExtensions } from './hooks/useEditorExtensions';
import { useHandleModeSwitch } from './hooks/useHandleModeSwitch';
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
  /**
   * External image upload handler (REQUIRED for image paste/drop to work).
   * Should return a reference string (e.g. relative path like "../_images/photo.jpg").
   * If not provided, paste/drop of images is silently ignored.
   * If the upload throws, the placeholder image is removed from the editor.
   */
  onImageUpload?: (
    file: File,
    options: { fileName: string; mimeType: string; fileSize: number; uploadId: string }
  ) => Promise<string>;
  /**
   * Resolve an image src reference to a displayable URL.
   * Called for images whose src is not a data: URL, blob: URL, or http(s) URL.
   * Should return a blob: URL or data: URL that the browser can display.
   * If not provided, the src is used as-is.
   */
  resolveImageSrc?: (src: string) => Promise<string>;
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
  /** Validate whether a wiki link target exists (for valid/invalid styling) */
  validateWikiLink?: (pageName: string) => boolean;
  /** Search for wiki link suggestions (for autocomplete dropdown) */
  onWikiLinkSearch?: (query: string) => Promise<{id: string; title: string; type: string}[]>;
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
    tagPills?: boolean;
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
  
  // === RAW MARKDOWN EDITOR ===
  
  /** Enable auto-closing of markdown pairs (backticks, asterisks, brackets, etc.) in the raw markdown editor (default: true) */
  autoClosePairs?: boolean;
  
  // === PERFORMANCE PROFILER ===
  
  /** Whether the performance profiler panel is visible. Fully controlled by the embedding application. (default: false) */
  showPerformanceProfiler?: boolean;
  
  /** Callback when the user clicks the close button inside the profiler. The embedding app should set showPerformanceProfiler to false. */
  onPerformanceProfilerClose?: () => void;
  
  // === CHECKLIST REORDER ===
  
  /** Automatically reorder checklist items when toggled: move completed to bottom, preserving relative order within each group (default: false) */
  autoReorderChecklist?: boolean;
  
  // === EXPAND SELECTION ===
  
  /** Enable progressive Cmd+A / Ctrl+A selection that expands to parent nodes instead of immediately selecting all (default: false) */
  progressiveSelectAll?: boolean;
  
  // === AUTO-DETECTION FEATURE TOGGLES ===
  
  /** Enable auto-detection of #hashtag patterns and conversion to tag pills (default: false) */
  enableTagAutoDetect?: boolean;
  /** Enable auto-detection and highlighting of hex color values like #FF0000 (default: false) */
  enableHexColorHighlight?: boolean;
  /** Enable collapsible headings that can be folded/unfolded (default: false) */
  enableCollapsibleHeadings?: boolean;
  
  // === PERFORMANCE MODE ===
  
  /**
   * Performance mode for large documents.
   * - 'auto': Automatically disables non-essential plugins when document exceeds ~2000 paragraphs (default)
   * - 'full': All plugins always loaded regardless of document size
   * - 'lightweight': Non-essential plugins always disabled for maximum performance
   * 
   * Non-essential plugins disabled in lightweight mode:
   * Typography (auto-character conversion), TableSorting, CollapsibleList,
   * SelectAllOccurrences, CollapsibleHeading, HexColorMark
   */
  performanceMode?: 'auto' | 'full' | 'lightweight';
  
  // === ERROR BOUNDARY ===
  
  /** Callback when the editor crashes — useful for external error reporting */
  onEditorError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  
  // === AI WRITING ASSISTANT (opt-in, lazy-loaded) ===
  
  /**
   * AI actions to show in the sparkles dropdown menu.
   * If not provided, the AI sparkles button is hidden — keeping Paragon lean.
   */
  aiActions?: AIActionDefinition[];
  
  /**
   * Handler called when the user selects an AI action.
   * Should return an AsyncIterable<string> for streaming or Promise<string> for non-streaming.
   * The embedding app is responsible for calling the AI provider.
   */
  onAIAction?: AIActionHandler;
  
  /**
   * Called when the user clicks the sparkles button but AI is not configured.
   * The embedding app should navigate to settings or show a setup dialog.
   */
  onAISetupRequired?: () => void;
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
  onImageUpload,
  resolveImageSrc,
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
  validateWikiLink,
  onWikiLinkSearch,
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
  // Raw markdown editor
  autoClosePairs = true,
  // Performance profiler
  showPerformanceProfiler = false,
  onPerformanceProfilerClose,
  // Auto reorder checklist
  autoReorderChecklist = false,
  // Expand selection
  progressiveSelectAll = false,
  // Auto-detection toggles
  enableTagAutoDetect = false,
  enableHexColorHighlight = false,
  enableCollapsibleHeadings = false,
  // Performance mode
  performanceMode = 'auto',
  // Error boundary
  onEditorError,
  // AI writing assistant
  aiActions,
  onAIAction,
  onAISetupRequired,
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
  
  // === AI Writing Assistant State ===
  const aiEnabled = !!(aiActions && aiActions.length > 0 && onAIAction);
  const { state: aiState, executeAction: executeAIAction, abort: abortAI, reset: resetAI } = useAIState(onAIAction);
  const [aiDropdown, setAIDropdown] = useState<{ scope: 'selection' | 'document'; position: { top: number; left: number } } | null>(null);
  const [aiPopoverPosition, setAIPopoverPosition] = useState<{ selectionTop: number; selectionBottom: number; selectionCenterX: number }>({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 });
  const onAIActionRef = useRef(onAIAction);
  onAIActionRef.current = onAIAction;
  const onAISetupRequiredRef = useRef(onAISetupRequired);
  onAISetupRequiredRef.current = onAISetupRequired;
  const [rawSearchMatches, setRawSearchMatches] = useState<SearchMatch[]>([]);
  const [rawSearchCurrentIndex, setRawSearchCurrentIndex] = useState(0);
  const handleSearchMatchesChange = useCallback((matches: SearchMatch[], currentIndex: number) => {
    setRawSearchMatches(matches);
    setRawSearchCurrentIndex(currentIndex);
  }, []);

  // Old scroll-triggered scrollbar via CSS class removed — replaced by CustomScrollbar component

  // Refs for callback props used in extensions useMemo to avoid recreating the entire
  // TipTap editor when parent re-renders with new callback references.
  // Without these refs, every parent render creates new function references,
  // causing the extensions useMemo to recompute and destroy/recreate the editor.
  const onImageUploadStartRef = useRef(onImageUploadStart);
  const onImageUploadCompleteRef = useRef(onImageUploadComplete);
  const onImageUploadErrorRef = useRef(onImageUploadError);
  const onImageUploadRef = useRef(onImageUpload);
  const resolveImageSrcRef = useRef(resolveImageSrc);
  const onWikiLinkClickRef = useRef(onWikiLinkClick);
  const validateWikiLinkRef = useRef(validateWikiLink);
  const onWikiLinkSearchRef = useRef(onWikiLinkSearch);
  onImageUploadStartRef.current = onImageUploadStart;
  onImageUploadCompleteRef.current = onImageUploadComplete;
  onImageUploadErrorRef.current = onImageUploadError;
  onImageUploadRef.current = onImageUpload;
  resolveImageSrcRef.current = resolveImageSrc;
  onWikiLinkClickRef.current = onWikiLinkClick;
  validateWikiLinkRef.current = validateWikiLink;
  onWikiLinkSearchRef.current = onWikiLinkSearch;

  // === LIGHTWEIGHT MODE ===
  // Determines whether non-essential plugins are disabled for performance.
  // In 'auto' mode, we start with a heuristic based on initial content size,
  // then dynamically switch if the document grows beyond the threshold.
  const LIGHTWEIGHT_THRESHOLD = 2000; // ~2000 top-level nodes
  const [isLightweight, setIsLightweight] = useState(() => {
    if (performanceMode === 'lightweight') return true;
    if (performanceMode === 'full') return false;
    // 'auto': estimate from initial content length (rough heuristic: each paragraph ~80 chars)
    if (content && typeof content === 'string') {
      const estimatedNodes = Math.ceil(content.length / 80);
      return estimatedNodes > LIGHTWEIGHT_THRESHOLD;
    }
    return false;
  });

  // In 'auto' mode, monitor document size and toggle lightweight mode dynamically.
  // We check on every N-th transaction to avoid overhead.
  const lightweightCheckCounterRef = useRef(0);
  const isLightweightRef = useRef(isLightweight);
  isLightweightRef.current = isLightweight;

  // State for image edit popover (declared here so it's available to useEditorExtensions)
  const [imageEditState, setImageEditState] = useState<{
    isOpen: boolean;
    src: string;
    alt: string;
    pos: number;
    position: { x: number; y: number };
  } | null>(null);

  // Build extensions array (extracted to hook for readability)
  const extensions = useEditorExtensions({
    placeholder,
    isMobile,
    maxImageSize,
    headingLevels,
    collapsibleHeadingLevels,
    disabledFeatures,
    progressiveSelectAll,
    enableCollapsibleHeadings,
    enableTagAutoDetect,
    enableHexColorHighlight,
    isLightweight,
    setImageEditState,
    callbackRefs: {
      onImageUploadStart: onImageUploadStartRef,
      onImageUploadComplete: onImageUploadCompleteRef,
      onImageUploadError: onImageUploadErrorRef,
      onImageUpload: onImageUploadRef,
      resolveImageSrc: resolveImageSrcRef,
      onWikiLinkClick: onWikiLinkClickRef,
      validateWikiLink: validateWikiLinkRef,
    },
  });

  // Editor instance with debounced updates, unmount cleanup, and rawMarkdown initialization
  const { editor, turndownService } = useEditorInstance({
    extensions,
    content,
    editable,
    autofocus,
    spellCheck,
    initialMode,
    performanceMode,
    lightweightThreshold: LIGHTWEIGHT_THRESHOLD,
    onChange,
    onHTMLChange,
    onMarkdownChange,
    onReady,
    onDestroy,
    onFocus,
    onBlur,
    onSelectionChange,
    onLinkClick,
    editorModeRef,
    rawMarkdownRef,
    setRawMarkdown,
    setIsLightweight,
    lightweightCheckCounterRef,
    isLightweightRef,
  });

  // State for link popover
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
  
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
  
  // Handle mode switching (extracted to hook)
  const handleModeSwitch = useHandleModeSwitch({
    editor,
    turndownService,
    editorModeRef,
    rawMarkdownRef,
    setEditorMode,
    setRawMarkdown,
    onModeChange,
    enableTagAutoDetect,
    disabledFeatures,
  });

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
  useEditorAPI(ref, {
    editor,
    turndownService,
    editorModeRef,
    handleModeSwitch,
    wordCount,
    autoSaveState,
    setIsFindReplaceOpen,
    setFindReplaceFocusTrigger,
  });

  // Expose Editor Mode API globally for external applications
  useGlobalEditorAPI({
    editorModeRef,
    rawMarkdownRef,
    editorMode,
    handleModeSwitch,
    setIsFindReplaceOpen,
    setFindReplaceFocusTrigger,
  });

  // Handle keyboard shortcuts for markdown auto-detection (extracted to hook)
  const keyboardCallbacks = useMemo(() => ({
    openLinkPopover: () => setIsLinkPopoverOpen(true),
    openFindReplace: (initialQuery?: string) => {
      if (initialQuery) {
        setFindReplaceInitialQuery(initialQuery);
      }
      setIsFindReplaceOpen(true);
      setFindReplaceFocusTrigger(prev => prev + 1);
    },
    openFindReplaceWithReplace: () => {
      setIsFindReplaceOpen(true);
    },
  }), [setIsFindReplaceOpen]);
  useEditorKeyboardShortcuts(editor, isMobile, keyboardCallbacks);

  // === AI Writing Assistant Handlers ===
  // IMPORTANT: These hooks MUST be above the `if (!editor)` early return
  // to satisfy React's Rules of Hooks (same number of hooks every render).
  const handleAISparklesClick = useCallback((scope: 'selection' | 'document', anchorEl?: HTMLElement) => {
    if (!aiEnabled) {
      onAISetupRequiredRef.current?.();
      return;
    }
    if (!editor) return;
    
    // Get position for the dropdown
    let position = { top: 0, left: 0 };
    if (anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      position = { top: rect.bottom + 4, left: rect.left };
    } else {
      const { from, to } = editor.state.selection;
      const start = editor.view.coordsAtPos(from);
      const end = editor.view.coordsAtPos(to);
      position = { top: end.bottom + 8, left: (start.left + end.left) / 2 };
    }
    
    setAIDropdown({ scope, position });
  }, [aiEnabled, editor]);
  
  const handleAIActionSelect = useCallback((actionId: string, customPrompt?: string) => {
    if (!editor || !aiActions) return;
    
    const action = aiActions.find(a => a.id === actionId);
    if (!action) return;
    
    const { from, to } = editor.state.selection;
    const selectedText = from !== to
      ? editor.state.doc.textBetween(from, to, '\n')
      : '';
    
    // For document-scope actions, use the full document text
    const text = action.scope === 'document' || !selectedText
      ? editor.getText()
      : selectedText;
    
    // Position the result popover centered on the selection
    const startCoords = editor.view.coordsAtPos(from);
    const endCoords = editor.view.coordsAtPos(to);
    setAIPopoverPosition({
      selectionTop: startCoords.top,
      selectionBottom: endCoords.bottom,
      selectionCenterX: (startCoords.left + endCoords.right) / 2,
    });
    
    // Close dropdown and start the AI action
    setAIDropdown(null);
    executeAIAction(actionId, action.label, text, { from, to }, customPrompt);
  }, [editor, aiActions, executeAIAction]);
  
  const handleAIReplace = useCallback(() => {
    if (!editor || aiState.status !== 'complete') return;
    const { selectionRange, result } = aiState;
    
    editor.chain()
      .focus()
      .setTextSelection(selectionRange)
      .deleteSelection()
      .insertContent(result)
      .run();
    
    resetAI();
  }, [editor, aiState, resetAI]);
  
  const handleAIInsert = useCallback(() => {
    if (!editor || aiState.status !== 'complete') return;
    const { selectionRange, result } = aiState;
    
    editor.chain()
      .focus()
      .setTextSelection(selectionRange.to)
      .insertContent('\n' + result)
      .run();
    
    resetAI();
  }, [editor, aiState, resetAI]);
  
  const handleAIRetry = useCallback(() => {
    if (aiState.status !== 'complete' && aiState.status !== 'error') return;
    if (aiState.status === 'complete') {
      const { action, actionLabel, inputText, selectionRange } = aiState;
      resetAI();
      executeAIAction(action, actionLabel, inputText, selectionRange);
    } else {
      resetAI();
    }
  }, [aiState, resetAI, executeAIAction]);

  if (!editor) {
    return <EditorLoadingSkeleton className={className} theme={theme} />;
  }

  // Default toolbar component
  const defaultToolbar = (
    <EditorToolbar 
      editor={editor} 
      onOpenLinkPopover={() => setIsLinkPopoverOpen(true)}
      className="flex-1"
      onOpenFindReplace={() => {
        setIsFindReplaceOpen(true);
        setFindReplaceFocusTrigger(prev => prev + 1);
      }}
      disabledFeatures={disabledFeatures}
      autoReorderChecklist={autoReorderChecklist}
      aiEnabled={aiEnabled || !!onAISetupRequired}
      onAISparklesClick={(anchorEl) => handleAISparklesClick('document', anchorEl)}
    />
  );

  // Default footer component
  const defaultFooter = (
    <div className="editor-footer">
      {autoSave && (
        <AutoSaveIndicator 
          status={autoSaveState.status} 
          lastSaved={autoSaveState.lastSaved}
        />
      )}
      <div className="word-count">
        <span>{wordCount.words} words</span>
      </div>
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
        <div className="flex items-center bg-card/50 editor-toolbar-wrapper">
          {renderToolbar ? renderToolbar(editor, defaultToolbar) : defaultToolbar}
          {showModeToggle && (
            <EditorModeToggle editorMode={editorMode} onModeSwitch={handleModeSwitch} />
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
            <WYSIWYGOverlays
              editor={editor}
              isMobile={isMobile}
              disabledFeatures={disabledFeatures}
              containerRef={editorContentRef as React.RefObject<HTMLElement>}
              editable={editable}
              showFloatingToolbar={showFloatingToolbar}
              isLinkPopoverOpen={isLinkPopoverOpen}
              aiEnabled={aiEnabled}
              onAISetupRequired={onAISetupRequired}
              onAISparklesClick={(anchorEl) => handleAISparklesClick('selection', anchorEl)}
              aiDropdown={aiDropdown}
              aiActions={aiActions}
              onAIActionSelect={handleAIActionSelect}
              onAIDropdownClose={() => setAIDropdown(null)}
              aiState={aiState}
              aiPopoverPosition={aiPopoverPosition}
              onAIReplace={handleAIReplace}
              onAIInsert={handleAIInsert}
              onAIRetry={handleAIRetry}
              onAIDiscard={() => { abortAI(); resetAI(); }}
              onLinkPopoverClose={() => setIsLinkPopoverOpen(false)}
              onEditLink={() => setIsLinkPopoverOpen(true)}
              onWikiLinkSearch={onWikiLinkSearchRef.current}
              imageEditState={imageEditState}
              onImageSave={(newSrc, newAlt) => {
                editor.chain().focus().setNodeSelection(imageEditState!.pos).updateAttributes('resizableImage', {
                  src: newSrc,
                  alt: newAlt,
                }).run();
                setImageEditState(null);
              }}
              onImageDelete={() => {
                editor.chain().focus().setNodeSelection(imageEditState!.pos).deleteSelection().run();
                setImageEditState(null);
              }}
              onImageEditClose={() => setImageEditState(null)}
            />
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
            autoClosePairs={autoClosePairs}
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
