import { Extension } from '@tiptap/core';
export interface MarkdownPasteOptions {
    enableMarkdownPaste: boolean;
}
export declare function looksLikeMarkdown(text: string): boolean;
/**
 * Parse a list line and return its type, depth, and content.
 * Indentation is 2 spaces per level.
 */
export type ListLineInfo = {
    type: 'ul' | 'ol' | 'task';
    depth: number;
    text: string;
    checked?: boolean;
};
export declare function parseListLine(rawLine: string): ListLineInfo | null;
/**
 * Build nested list HTML from a sequence of parsed list lines.
 */
export declare function buildNestedListHtml(items: ListLineInfo[]): string;
export declare function markdownToHtml(markdown: string): string;
export declare const MarkdownPasteSafe: Extension<MarkdownPasteOptions, any>;
export default MarkdownPasteSafe;
