import type { Editor } from '@tiptap/core';
/** Accepts any object with a turndown() method (TurndownService or LazyTurndownService). */
export interface TurndownLike {
    turndown(html: string): string;
}
export interface UseHandleModeSwitchDeps {
    editor: Editor | null;
    turndownService: TurndownLike;
    editorModeRef: React.MutableRefObject<'wysiwyg' | 'markdown'>;
    rawMarkdownRef: React.MutableRefObject<string>;
    setEditorMode: React.Dispatch<React.SetStateAction<'wysiwyg' | 'markdown'>>;
    setRawMarkdown: React.Dispatch<React.SetStateAction<string>>;
    onModeChange?: (mode: 'wysiwyg' | 'markdown') => void;
    enableTagAutoDetect: boolean;
    disabledFeatures: Record<string, boolean | undefined>;
}
export declare function useHandleModeSwitch({ editor, turndownService, editorModeRef, rawMarkdownRef, setEditorMode, setRawMarkdown, onModeChange, enableTagAutoDetect, disabledFeatures, }: UseHandleModeSwitchDeps): (newMode: "wysiwyg" | "markdown") => Promise<void>;
