import { Editor } from '@tiptap/react';
interface LinkPopoverProps {
    editor: Editor;
    isOpen: boolean;
    onClose: () => void;
}
export declare function LinkPopover({ editor, isOpen, onClose }: LinkPopoverProps): import("react").JSX.Element | null;
export default LinkPopover;
