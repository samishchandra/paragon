import './PerformanceProfiler.css';
import type { Editor } from '@tiptap/react';
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
    getWordCount: () => {
        words: number;
        characters: number;
        charactersWithSpaces: number;
    };
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
    insertCallout: (type?: 'info' | 'warning' | 'error' | 'success' | 'note') => void;
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
    getTableOfContents: () => {
        id: string;
        text: string;
        level: number;
        pos: number;
    }[];
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
    onSelectionChange?: (selection: {
        from: number;
        to: number;
        empty: boolean;
    }) => void;
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
    renderFooter?: (wordCount: {
        words: number;
        characters: number;
    }, autoSaveStatus: string, defaultFooter: React.ReactNode) => React.ReactNode;
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
    onTocItemClick?: (item: {
        id: string;
        text: string;
        level: number;
        pos: number;
    }) => void;
    /** Custom render function for TOC items */
    renderTocItem?: (item: {
        id: string;
        text: string;
        level: number;
        pos: number;
    }, isActive: boolean, onClick: () => void) => React.ReactNode;
    /** Show TOC toggle button (default: true) */
    tocShowToggleButton?: boolean;
    /** Whether the performance profiler panel is visible. Fully controlled by the embedding application. (default: false) */
    showPerformanceProfiler?: boolean;
    /** Callback when the user clicks the close button inside the profiler. The embedding app should set showPerformanceProfiler to false. */
    onPerformanceProfilerClose?: () => void;
}
export declare const MarkdownEditor: import("react").ForwardRefExoticComponent<MarkdownEditorProps & import("react").RefAttributes<MarkdownEditorRef>>;
export default MarkdownEditor;
