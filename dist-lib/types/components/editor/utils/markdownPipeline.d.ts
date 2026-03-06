/**
 * Markdown ↔ HTML conversion pipeline.
 *
 * Extracts the pre-processing (markdown → intermediate) and post-processing
 * (HTML → TipTap-compatible HTML) steps from MarkdownEditor so they can be
 * tested and maintained independently.
 *
 * The pipeline is split into two phases:
 *   1. **Pre-process** (`preprocessMarkdown`): transforms raw markdown before
 *      it is handed to `marked.parse()`.
 *   2. **Post-process** (`postprocessHtml`): transforms the HTML that
 *      `marked.parse()` returns into the structure TipTap expects.
 *
 * A convenience function `markdownToHtml` orchestrates both phases plus the
 * `marked.parse()` call itself.
 */
/** Options that control which pre-processing steps run. */
export interface PreprocessOptions {
    /** When true, #tag tokens are converted to tag-pill HTML. */
    enableTagAutoDetect?: boolean;
    /** When true, tag pill processing is skipped regardless of enableTagAutoDetect. */
    disableTagPills?: boolean;
    /** Function to validate a normalised tag string. */
    isValidTag?: (tag: string) => boolean;
    /** Function to normalise a tag string (e.g. lowercase + trim). */
    normalizeTag?: (tag: string) => string;
    /** Function to parse a date string from markdown @date@ syntax. Returns ISO string or null. */
    parseDateFromMarkdown?: (text: string) => string | null;
    /** Function to compute the date-pill variant class from an ISO date string. */
    getDateVariant?: (isoDate: string) => string;
}
/**
 * Convert inline markdown formatting to HTML.
 * Handles: **bold**, *italic*, ~~strike~~, `code`, ==highlight==, [link](url)
 */
export declare function inlineMarkdownToHtml(text: string): string;
/**
 * Wrap an `<img>` tag in a `<figure class="image-resizer">` with alignment styling.
 */
export declare function imgToFigure(imgTag: string): string;
/**
 * Convert a single line that may contain images into HTML block(s).
 */
export declare function lineToBlocks(line: string): string;
export type ListLineInfo = {
    type: 'ul' | 'ol' | 'task';
    depth: number;
    text: string;
    checked?: boolean;
    index?: number;
};
/** Parse a single line into list-line metadata, or null if not a list line. */
export declare function parseListLine(rawLine: string): ListLineInfo | null;
/** Build nested list HTML from a sequence of parsed list lines. */
export declare function buildNestedListHtml(items: ListLineInfo[]): string;
/**
 * Reconstruct rich content inside table cells.
 *
 * Handles images (→ `<figure>`), lists with nesting, ordered lists,
 * task lists, and mixed content. The turndown serialiser encodes multi-line
 * content with `<br>` separators; nested lists use 2-space indentation.
 */
export declare function reconstructTableCells(html: string): string;
/**
 * Pre-process raw markdown before handing it to `marked.parse()`.
 *
 * This handles custom syntax that `marked` does not understand natively:
 * callout code blocks, image metadata, highlight marks, date pills,
 * tag pills, and wiki links.
 *
 * The `markedParse` callback is injected so this module does not need to
 * import `marked` directly (it is lazy-loaded by the caller).
 */
export declare function preprocessMarkdown(markdown: string, markedParse: (src: string) => string, options?: PreprocessOptions): string;
/**
 * Post-process the HTML returned by `marked.parse()` into the structure
 * that TipTap expects.
 *
 * Steps: list-break separators → task lists → image structure → header
 * column restoration → table-cell reconstruction.
 */
export declare function postprocessHtml(html: string): string;
/**
 * Convert raw markdown to TipTap-compatible HTML.
 *
 * Orchestrates pre-processing, `marked.parse()`, and post-processing.
 *
 * @param markdown - Raw markdown string
 * @param markedParse - A callback wrapping `marked.parse(src, { async: false, breaks: true })`
 * @param options - Feature flags and extension helpers
 */
export declare function markdownToHtml(markdown: string, markedParse: (src: string) => string, options?: PreprocessOptions): string;
