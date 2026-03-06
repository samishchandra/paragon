import { Editor } from '@tiptap/react';
export interface FloatingToolbarProps {
    editor: Editor;
    className?: string;
    suppressWhenLinkPopoverOpen?: boolean;
    /** Whether AI features are available (shows sparkles button) */
    aiEnabled?: boolean;
    /** Called when the sparkles button is clicked, with the button element for positioning */
    onAISparklesClick?: (anchorEl: HTMLElement) => void;
    /** Called to copy the current selection as markdown */
    onCopySelectionAsMarkdown?: () => void;
}
export declare const FloatingToolbar: import("react").NamedExoticComponent<FloatingToolbarProps>;
export default FloatingToolbar;
