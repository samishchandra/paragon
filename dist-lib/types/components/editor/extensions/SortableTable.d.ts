import { Extension } from '@tiptap/core';
import { PluginKey } from '@tiptap/pm/state';
export interface SortableTableOptions {
    enableSorting: boolean;
}
export declare const sortableTablePluginKey: PluginKey<any>;
export declare const SortableTable: Extension<SortableTableOptions, any>;
export default SortableTable;
