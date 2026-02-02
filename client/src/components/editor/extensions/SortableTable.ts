import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

export interface SortableTableOptions {
  enableSorting: boolean;
}

export const sortableTablePluginKey = new PluginKey('sortableTable');

interface SortState {
  columnIndex: number;
  direction: 'asc' | 'desc';
  tablePos: number;
}

export const SortableTable = Extension.create<SortableTableOptions>({
  name: 'sortableTable',

  addOptions() {
    return {
      enableSorting: true,
    };
  },

  addProseMirrorPlugins() {
    const { editor } = this;

    return [
      new Plugin({
        key: sortableTablePluginKey,
        state: {
          init() {
            return { sortState: null as SortState | null };
          },
          apply(tr, value) {
            const meta = tr.getMeta(sortableTablePluginKey);
            if (meta) {
              return { sortState: meta.sortState };
            }
            return value;
          },
        },
        props: {
          decorations(state) {
            const { doc } = state;
            const decorations: Decoration[] = [];

            doc.descendants((node, pos) => {
              if (node.type.name === 'tableHeader') {
                // Add sort indicator decoration to header cells
                const sortState = sortableTablePluginKey.getState(state)?.sortState;
                
                // Find the column index of this header
                let columnIndex = 0;
                const $pos = doc.resolve(pos);
                const row = $pos.parent;
                row.forEach((child, offset, index) => {
                  if (offset < $pos.parentOffset) {
                    columnIndex = index + 1;
                  }
                });

                const isSorted = sortState && sortState.columnIndex === columnIndex;
                const direction = isSorted ? sortState.direction : null;

                decorations.push(
                  Decoration.node(pos, pos + node.nodeSize, {
                    class: `sortable-header ${isSorted ? `sorted-${direction}` : ''}`,
                    'data-sortable': 'true',
                    'data-column-index': String(columnIndex),
                    'data-sort-direction': direction || '',
                  })
                );
              }
            });

            return DecorationSet.create(doc, decorations);
          },
          handleClick(view, pos, event) {
            try {
              const target = event.target as HTMLElement;
              if (!target) return false;
              
              const headerCell = target.closest('th[data-sortable="true"]');
              
              if (!headerCell) return false;

            const columnIndex = parseInt(headerCell.getAttribute('data-column-index') || '0');
            const currentDirection = headerCell.getAttribute('data-sort-direction');
            const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';

            // Find the table containing this header
            const $pos = view.state.doc.resolve(pos);
            let tablePos = -1;
            for (let d = $pos.depth; d > 0; d--) {
              if ($pos.node(d).type.name === 'table') {
                tablePos = $pos.before(d);
                break;
              }
            }

            if (tablePos === -1) return false;

            // Sort the table
            const table = view.state.doc.nodeAt(tablePos);
            if (!table) return false;

            const rows: { node: any; pos: number; isHeader: boolean }[] = [];
            table.forEach((row, offset) => {
              const isHeader = row.firstChild?.type.name === 'tableHeader';
              rows.push({ node: row, pos: tablePos + 1 + offset, isHeader });
            });

            // Separate header and body rows
            const headerRows = rows.filter(r => r.isHeader);
            const bodyRows = rows.filter(r => !r.isHeader);

            // Sort body rows based on the column content
            bodyRows.sort((a, b) => {
              const cellA = a.node.child(columnIndex);
              const cellB = b.node.child(columnIndex);
              
              const textA = cellA?.textContent || '';
              const textB = cellB?.textContent || '';

              // Try numeric comparison first
              const numA = parseFloat(textA);
              const numB = parseFloat(textB);
              
              if (!isNaN(numA) && !isNaN(numB)) {
                return newDirection === 'asc' ? numA - numB : numB - numA;
              }

              // Fall back to string comparison
              const comparison = textA.localeCompare(textB, undefined, { numeric: true, sensitivity: 'base' });
              return newDirection === 'asc' ? comparison : -comparison;
            });

            // Rebuild the table with sorted rows
            const { tr } = view.state;
            
            // Update sort state
            tr.setMeta(sortableTablePluginKey, {
              sortState: {
                columnIndex,
                direction: newDirection,
                tablePos,
              },
            });

            // Create new table content
            const sortedRows = [...headerRows, ...bodyRows];
            const tableType = view.state.schema.nodes.table;
            const newTable = tableType.create(table.attrs, sortedRows.map(r => r.node));

            tr.replaceWith(tablePos, tablePos + table.nodeSize, newTable);
            view.dispatch(tr);

            return true;
            } catch (error) {
              console.warn('SortableTable: Error handling click', error);
              return false;
            }
          },
        },
      }),
    ];
  },
});

export default SortableTable;
