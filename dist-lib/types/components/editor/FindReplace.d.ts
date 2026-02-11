import { Editor } from '@tiptap/react';
interface FindReplaceProps {
    editor: Editor;
    isOpen: boolean;
    onClose: () => void;
    focusTrigger?: number;
    initialSearchQuery?: string;
}
export declare function FindReplace({ editor, isOpen, onClose, focusTrigger, initialSearchQuery }: FindReplaceProps): import("react").JSX.Element | null;
export default FindReplace;
