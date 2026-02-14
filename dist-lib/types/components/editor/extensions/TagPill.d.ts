import { Node } from '@tiptap/core';
export interface TagPillOptions {
    HTMLAttributes: Record<string, unknown>;
    /** Callback when a tag pill is clicked */
    onTagClick?: (tag: string) => void;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        tagPill: {
            /** Insert a tag pill */
            insertTagPill: (tag: string) => ReturnType;
        };
    }
}
/** Validate a tag string: must contain at least one letter */
export declare function isValidTag(tag: string): boolean;
/** Normalize a tag: lowercase, trim */
export declare function normalizeTag(tag: string): string;
export declare const TagPill: Node<TagPillOptions, any>;
export default TagPill;
