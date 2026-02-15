import { Editor } from '@tiptap/react';
/**
 * useWordCount Hook
 *
 * Provides debounced word and character count calculation for performance.
 * Only recalculates after a delay to avoid blocking the main thread during typing.
 */
export interface WordCountResult {
    words: number;
    characters: number;
    charactersWithSpaces: number;
    paragraphs: number;
    sentences: number;
    readingTime: number;
    isCalculating: boolean;
}
export interface UseWordCountOptions {
    /** Debounce delay in milliseconds (default: 500) */
    debounceMs?: number;
    /** Whether to calculate extended stats like sentences (default: false for performance) */
    extendedStats?: boolean;
    /** Whether the hook is enabled (default: true) */
    enabled?: boolean;
}
export declare function useWordCount(editor: Editor | null, options?: UseWordCountOptions): WordCountResult;
export default useWordCount;
