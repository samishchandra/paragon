import TableCell from '@tiptap/extension-table-cell';

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

export const CustomTableCell = TableCell.extend<TableCellOptions>({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-background-color') || element.style.backgroundColor || null,
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) {
            return {};
          }
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setCellBackground:
        (color: string) =>
        ({ chain }) => {
          return chain()
            .updateAttributes('tableCell', { backgroundColor: color })
            .updateAttributes('tableHeader', { backgroundColor: color })
            .run();
        },
      unsetCellBackground:
        () =>
        ({ chain }) => {
          return chain()
            .updateAttributes('tableCell', { backgroundColor: null })
            .updateAttributes('tableHeader', { backgroundColor: null })
            .run();
        },
    };
  },
});

export default CustomTableCell;
