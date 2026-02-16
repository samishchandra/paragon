import { Editor } from '@tiptap/react';
interface LinkHoverTooltipProps {
    editor: Editor;
    onEditLink: () => void;
}
export declare function LinkHoverTooltip({ editor, onEditLink }: LinkHoverTooltipProps): import("react").JSX.Element | null;
export default LinkHoverTooltip;
