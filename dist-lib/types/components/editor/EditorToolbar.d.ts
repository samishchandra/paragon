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
}
export declare const EditorToolbar: import("react").NamedExoticComponent<EditorToolbarProps>;
export default EditorToolbar;
