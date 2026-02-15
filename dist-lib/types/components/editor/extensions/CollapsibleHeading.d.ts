import { Extension } from '@tiptap/core';
export interface CollapsibleHeadingOptions {
    levels: number[];
}
export interface CollapsibleHeadingStorage {
    collapsedHeadings: Set<string>;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        collapsibleHeading: {
            toggleHeadingCollapse: (pos: number) => ReturnType;
            expandAllHeadings: () => ReturnType;
            collapseAllHeadings: () => ReturnType;
        };
    }
}
export declare const CollapsibleHeading: Extension<CollapsibleHeadingOptions, CollapsibleHeadingStorage>;
export default CollapsibleHeading;
