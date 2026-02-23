import { Editor } from '@tiptap/react';
interface FindReplaceProps {
    editor: Editor;
    isOpen: boolean;
    onClose: () => void;
    focusTrigger?: number;
    initialSearchQuery?: string;
    /** Current editor mode - 'wysiwyg' or 'markdown' */
    editorMode?: 'wysiwyg' | 'markdown';
    /** Raw markdown content (for searching in raw mode) */
    rawMarkdown?: string;
    /** Callback to update raw markdown (for replace in raw mode) */
    onRawMarkdownChange?: (content: string) => void;
    /** Callback to report search matches to parent (for visual highlighting in raw mode) */
    onMatchesChange?: (matches: SearchMatch[], currentIndex: number) => void;
}
export interface SearchMatch {
    from: number;
    to: number;
    text: string;
}
export declare function FindReplace({ editor, isOpen, onClose, focusTrigger, initialSearchQuery, editorMode, rawMarkdown, onRawMarkdownChange, onMatchesChange }: FindReplaceProps): import("react").JSX.Element | null;
export default FindReplace;
