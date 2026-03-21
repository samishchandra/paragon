/**
 * Transform callout code blocks into H4 headings followed by the callout content.
 * Used for full-document copy/export (not partial selections).
 *
 * Example: ```ad-resources\nSome content\n``` becomes #### Resources\nSome content
 */
export declare function transformCalloutsToHeadings(md: string): string;
