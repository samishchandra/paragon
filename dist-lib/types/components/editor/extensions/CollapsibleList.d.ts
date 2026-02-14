import { Extension } from '@tiptap/core';
export interface CollapsibleListOptions {
    /** List item types that can be collapsed */
    listItemTypes: string[];
}
export interface CollapsibleListStorage {
    collapsedItems: Set<string>;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        collapsibleList: {
            toggleListItemCollapse: (pos: number) => ReturnType;
            expandAllListItems: () => ReturnType;
            collapseAllListItems: () => ReturnType;
        };
    }
}
export declare const CollapsibleList: Extension<CollapsibleListOptions, CollapsibleListStorage>;
export default CollapsibleList;
