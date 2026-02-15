import { Extension } from '@tiptap/core';
import { PluginKey } from '@tiptap/pm/state';
export interface TableRowDragOptions {
    enableDrag: boolean;
}
export declare const tableRowDragPluginKey: PluginKey<any>;
export declare const TableRowDrag: Extension<TableRowDragOptions, any>;
export default TableRowDrag;
