import TableHeader from '@tiptap/extension-table-header';

export interface TableHeaderOptions {
  HTMLAttributes: Record<string, any>;
}

export const CustomTableHeader = TableHeader.extend<TableHeaderOptions>({
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
});

export default CustomTableHeader;
