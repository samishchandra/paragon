/**
 * stripZWSP — Remove zero-width space characters (U+200B) from markdown text.
 *
 * Turndown uses ZWSP internally to preserve blank lines and empty list items
 * during round-trip conversion. These characters must be stripped before
 * exposing the markdown to the user or consumer.
 *
 * - Lines that are only ZWSP become empty lines (preserving blank line intent)
 * - ZWSP within other content is removed entirely
 */
export declare function stripZWSP(markdown: string): string;
