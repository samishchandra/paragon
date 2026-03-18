import { Editor } from '@tiptap/react';
export interface AutoSaveOptions {
    /** Unique key for localStorage (default: 'paragon-editor-content') */
    storageKey?: string;
    /** Debounce delay in milliseconds (default: 1000) */
    debounceMs?: number;
    /** Whether auto-save is enabled (default: true) */
    enabled?: boolean;
    /** Callback when content is saved */
    onSave?: (content: string) => void;
    /** Callback when content is recovered */
    onRecover?: (content: string) => void;
}
export interface AutoSaveState {
    /** Current save status */
    status: 'idle' | 'saving' | 'saved' | 'error';
    /** Last save timestamp */
    lastSaved: Date | null;
    /** Whether there's recoverable content */
    hasRecoverableContent: boolean;
    /** Error message if save failed */
    error: string | null;
}
export interface AutoSaveReturn extends AutoSaveState {
    /** Manually trigger a save */
    save: () => void;
    /** Clear saved content from localStorage */
    clear: () => void;
    /** Recover content from localStorage */
    recover: () => string | null;
    /** Dismiss recovery prompt */
    dismissRecovery: () => void;
}
export declare function useAutoSave(editor: Editor | null, options?: AutoSaveOptions): AutoSaveReturn;
export default useAutoSave;
