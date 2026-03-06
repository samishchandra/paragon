import { Extension } from '@tiptap/core';
export interface OccurrenceRange {
    from: number;
    to: number;
    text: string;
}
export interface SelectAllOccurrencesStorage {
    isActive: boolean;
    ranges: OccurrenceRange[];
    searchTerm: string;
    caseSensitive: boolean;
    useRegex: boolean;
    wholeWord: boolean;
    /** Tracks accumulated typed text for batch replace preview */
    typedBuffer: string;
    /** Whether we are in "typing replacement" mode */
    isTypingReplace: boolean;
    /** The original search term length, used for position tracking */
    originalTermLength: number;
    /** All matches in the document (for incremental Cmd+D) */
    allMatches: OccurrenceRange[];
    /** Index into allMatches for the next Cmd+D selection */
    nextMatchIndex: number;
    /** Whether we're in incremental (Cmd+D) mode vs select-all mode */
    isIncremental: boolean;
    /** Stack of previous typed buffers for undo tracking */
    undoStack: string[];
    /** Stack of forward typed buffers for redo tracking */
    redoStack: string[];
}
export declare const SelectAllOccurrences: Extension<{}, SelectAllOccurrencesStorage>;
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        selectAllOccurrences: {
            selectAllOccurrences: (options: {
                searchTerm: string;
                caseSensitive?: boolean;
                useRegex?: boolean;
                wholeWord?: boolean;
            }) => ReturnType;
            selectNextOccurrence: () => ReturnType;
            clearAllOccurrences: () => ReturnType;
            toggleMarkOnAllOccurrences: (markName: string) => ReturnType;
            deleteAllOccurrences: () => ReturnType;
            replaceAllOccurrences: (newText: string) => ReturnType;
            getOccurrencesState: () => ReturnType;
        };
    }
}
