export interface TableCellOptions {
    HTMLAttributes: Record<string, any>;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        tableCell: {
            /**
             * Set the background color of the selected cells
             */
            setCellBackground: (color: string) => ReturnType;
            /**
             * Unset the background color of the selected cells
             */
            unsetCellBackground: () => ReturnType;
        };
    }
}
export declare const CustomTableCell: import("@tiptap/core").Node<TableCellOptions, any>;
export default CustomTableCell;
