import { Extension } from '@tiptap/core';
export interface ExpandSelectionStorage {
    /** Current expansion depth (0 = not expanding, 1+ = depth levels expanded) */
    expansionDepth: number;
    /** The selection range after the last expansion (to detect external changes) */
    lastExpandedFrom: number;
    lastExpandedTo: number;
    /** Whether the last transaction was triggered by this extension */
    isExpanding: boolean;
}
export declare const ExpandSelection: Extension<{}, ExpandSelectionStorage>;
