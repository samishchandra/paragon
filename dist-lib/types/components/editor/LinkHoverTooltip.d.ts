import { Editor } from '@tiptap/react';
export interface LinkHoverTooltipProps {
    editor: Editor;
    onEditLink: () => void;
}
export interface TooltipState {
    isVisible: boolean;
    url: string;
    position: {
        top: number;
        left: number;
    };
    linkElement: HTMLElement | null;
}
export declare function LinkHoverTooltip({ editor, onEditLink }: LinkHoverTooltipProps): import("react").JSX.Element | null;
export default LinkHoverTooltip;
