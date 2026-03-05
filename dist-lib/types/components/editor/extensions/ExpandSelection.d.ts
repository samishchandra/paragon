import { Extension } from '@tiptap/core';
export interface ExpandSelectionStorage {
    /** The selection range after the last expansion (to detect external changes) */
    lastExpandedFrom: number;
    lastExpandedTo: number;
    /** Current expansion depth counter */
    expansionDepth: number;
    /** Whether the last transaction was triggered by this extension */
    isExpanding: boolean;
}
export declare const ExpandSelection: Extension<{}, ExpandSelectionStorage>;
