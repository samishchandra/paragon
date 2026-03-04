/**
 * WYSIWYGOverlays — Groups all floating overlays rendered in WYSIWYG mode.
 *
 * Includes: FloatingToolbar, AIDropdownMenu, AIResultPopover, SlashCommands,
 * WikiLinkAutocomplete, LinkPopover, LinkHoverTooltip, ImageEditPopover.
 */
import type { Editor } from '@tiptap/core';
import type { AIActionDefinition } from './ai/types';
export interface AIDropdownState {
    scope: 'selection' | 'document';
    position: {
        top: number;
        left: number;
    };
}
export interface AIPopoverPositionState {
    selectionTop: number;
    selectionBottom: number;
    selectionCenterX: number;
}
export interface ImageEditState {
    isOpen: boolean;
    src: string;
    alt: string;
    position: {
        x: number;
        y: number;
    };
    pos: number;
}
export interface WYSIWYGOverlaysProps {
    editor: Editor;
    isMobile: boolean;
    disabledFeatures: Record<string, boolean | undefined>;
    containerRef: React.RefObject<HTMLElement>;
    editable: boolean;
    showFloatingToolbar: boolean;
    isLinkPopoverOpen: boolean;
    aiEnabled: boolean;
    onAISetupRequired?: () => void;
    onAISparklesClick: (anchorEl?: HTMLElement) => void;
    onCopySelectionAsMarkdown?: () => void;
    aiDropdown: AIDropdownState | null;
    aiActions?: AIActionDefinition[];
    onAIActionSelect: (actionId: string, customPrompt?: string) => void;
    onAIDropdownClose: () => void;
    aiState: {
        status: string;
        [key: string]: any;
    };
    aiPopoverPosition: AIPopoverPositionState;
    onAIReplace: () => void;
    onAIInsert: () => void;
    onAIRetry: () => void;
    onAIDiscard: () => void;
    onLinkPopoverClose: () => void;
    onEditLink: () => void;
    onWikiLinkSearch?: ((query: string) => Promise<Array<{
        id: string;
        title: string;
        type: string;
    }>>) | null;
    imageEditState: ImageEditState | null;
    onImageSave: (newSrc: string, newAlt: string) => void;
    onImageDelete: () => void;
    onImageEditClose: () => void;
}
export declare function WYSIWYGOverlays({ editor, isMobile, disabledFeatures, containerRef, editable, showFloatingToolbar, isLinkPopoverOpen, aiEnabled, onAISetupRequired, onAISparklesClick, onCopySelectionAsMarkdown, aiDropdown, aiActions, onAIActionSelect, onAIDropdownClose, aiState, aiPopoverPosition, onAIReplace, onAIInsert, onAIRetry, onAIDiscard, onLinkPopoverClose, onEditLink, onWikiLinkSearch, imageEditState, onImageSave, onImageDelete, onImageEditClose, }: WYSIWYGOverlaysProps): import("react").JSX.Element;
