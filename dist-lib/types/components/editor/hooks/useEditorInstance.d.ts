import type { Extensions } from '@tiptap/react';
import type { Editor } from '@tiptap/react';
export interface UseEditorInstanceOptions {
    extensions: Extensions;
    content: string;
    editable: boolean;
    autofocus: boolean;
    spellCheck: boolean;
    initialMode: 'wysiwyg' | 'markdown';
    performanceMode: 'auto' | 'full' | 'lightweight';
    lightweightThreshold: number;
    onChange?: (html: string) => void;
    onHTMLChange?: (html: string) => void;
    onMarkdownChange?: (markdown: string) => void;
    /** Debounce delay for firing onMarkdownChange during WYSIWYG typing (0 = lazy-only) */
    markdownChangeDebounceMs: number;
    onReady?: (editor: Editor) => void;
    onDestroy?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onSelectionChange?: (selection: {
        from: number;
        to: number;
        empty: boolean;
    }) => void;
    onLinkClick?: (url: string, event: MouseEvent) => boolean | void;
    editorModeRef: React.MutableRefObject<'wysiwyg' | 'markdown'>;
    rawMarkdownRef: React.MutableRefObject<string>;
    setRawMarkdown: (markdown: string) => void;
    setIsLightweight: (value: boolean) => void;
    lightweightCheckCounterRef: React.MutableRefObject<number>;
    isLightweightRef: React.MutableRefObject<boolean>;
}
export declare function useEditorInstance(options: UseEditorInstanceOptions): {
    editor: Editor | null;
    turndownService: import("./useTurndownService").LazyTurndownService;
};
