import type { Editor } from '@tiptap/react';
export interface KeyboardShortcutCallbacks {
    /** Open the link popover */
    openLinkPopover: () => void;
    /** Open find/replace panel */
    openFindReplace: (initialQuery?: string) => void;
    /** Open find/replace with replace visible */
    openFindReplaceWithReplace: () => void;
}
/**
 * Attach keyboard shortcut listeners for the editor.
 *
 * @param editor       The TipTap editor instance (or null while mounting)
 * @param isMobile     Whether the device is mobile (disables Cmd+F/H)
 * @param callbacks    UI callbacks for link popover and find/replace
 */
export declare function useEditorKeyboardShortcuts(editor: Editor | null, isMobile: boolean, callbacks: KeyboardShortcutCallbacks): void;
