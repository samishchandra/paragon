import { Editor } from '@tiptap/react';
interface SlashCommandsProps {
    editor: Editor;
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
export declare function SlashCommands({ editor }: SlashCommandsProps): import("react").JSX.Element | null;
export default SlashCommands;
