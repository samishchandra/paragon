import { Editor } from '@tiptap/react';
interface EditorToolbarProps {
    editor: Editor;
    onCopyMarkdown?: () => void;
    onOpenLinkPopover?: () => void;
    onOpenFindReplace?: () => void;
    className?: string;
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
    autoReorderChecklist?: boolean;
    /** Whether AI features are available (shows sparkles button) */
    aiEnabled?: boolean;
    /** Called when the sparkles button is clicked, with the button element for positioning */
    onAISparklesClick?: (anchorEl: HTMLElement) => void;
}
export declare const EditorToolbar: import("react").NamedExoticComponent<EditorToolbarProps>;
export default EditorToolbar;
