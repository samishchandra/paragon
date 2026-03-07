/**
 * useEditorExtensions — Builds the TipTap extensions array.
 *
 * Extracted from MarkdownEditor.tsx to reduce component size.
 * The hook wraps the extensions in a `useMemo` that only recomputes
 * when primitive/stable dependencies change.  Callback props are
 * accessed via refs passed in from the parent so they never trigger
 * a recompute.
 */
import { type MutableRefObject } from 'react';
export interface DisabledFeatures {
    tables?: boolean;
    images?: boolean;
    codeBlocks?: boolean;
    taskLists?: boolean;
    callouts?: boolean;
    datePills?: boolean;
    tagPills?: boolean;
    wikiLinks?: boolean;
    collapsibleHeadings?: boolean;
    slashCommands?: boolean;
    markdownPaste?: boolean;
    dragAndDrop?: boolean;
}
export interface ImageEditState {
    isOpen: boolean;
    src: string;
    alt: string;
    pos: number;
    position: {
        x: number;
        y: number;
    };
}
/** Refs for callback props — avoids recreating extensions on every parent render. */
export interface ExtensionCallbackRefs {
    onImageUploadStart: MutableRefObject<(() => void) | undefined>;
    onImageUploadComplete: MutableRefObject<(() => void) | undefined>;
    onImageUploadError: MutableRefObject<((error: string) => void) | undefined>;
    onImageUpload: MutableRefObject<((file: File, options: {
        fileName: string;
        mimeType: string;
        fileSize: number;
        uploadId: string;
    }) => Promise<string>) | undefined>;
    resolveImageSrc: MutableRefObject<((src: string) => Promise<string>) | undefined>;
    onWikiLinkClick: MutableRefObject<((pageName: string) => void) | undefined>;
    validateWikiLink: MutableRefObject<((pageName: string) => boolean) | undefined>;
}
export interface UseEditorExtensionsOptions {
    placeholder: string;
    isMobile: boolean;
    maxImageSize: number;
    headingLevels: (1 | 2 | 3 | 4 | 5 | 6)[];
    collapsibleHeadingLevels: (1 | 2 | 3 | 4 | 5 | 6)[];
    disabledFeatures: DisabledFeatures;
    progressiveSelectAll: boolean;
    enableCollapsibleHeadings: boolean;
    enableCollapsibleLists: boolean;
    enableTagAutoDetect: boolean;
    enableHexColorHighlight: boolean;
    isLightweight: boolean;
    /** Setter for image edit popover state — called from ResizableImage onImageClick */
    setImageEditState: (state: ImageEditState | null) => void;
    /** Callback refs for image upload, wiki links, etc. */
    callbackRefs: ExtensionCallbackRefs;
}
export declare function useEditorExtensions({ placeholder, isMobile, maxImageSize, headingLevels, collapsibleHeadingLevels, disabledFeatures, progressiveSelectAll, enableCollapsibleHeadings, enableCollapsibleLists, enableTagAutoDetect, enableHexColorHighlight, isLightweight, setImageEditState, callbackRefs, }: UseEditorExtensionsOptions): any[];
