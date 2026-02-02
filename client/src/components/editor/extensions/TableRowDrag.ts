import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

export interface TableRowDragOptions {
  enableDrag: boolean;
}

export const tableRowDragPluginKey = new PluginKey('tableRowDrag');

interface DragState {
  isDragging: boolean;
  draggedRowPos: number | null;
  draggedRowIndex: number | null;
  tablePos: number | null;
  dropTargetIndex: number | null;
}

export const TableRowDrag = Extension.create<TableRowDragOptions>({
  name: 'tableRowDrag',

  addOptions() {
    return {
      enableDrag: true,
    };
  },

  addProseMirrorPlugins() {
    const { editor } = this;
    
    let dragState: DragState = {
      isDragging: false,
      draggedRowPos: null,
      draggedRowIndex: null,
      tablePos: null,
      dropTargetIndex: null,
    };

    // Create drag handle element
    const createDragHandle = (rowPos: number, rowIndex: number, tablePos: number) => {
      const handle = document.createElement('div');
      handle.className = 'table-row-drag-handle';
      handle.innerHTML = '⋮⋮';
      handle.setAttribute('data-row-pos', String(rowPos));
      handle.setAttribute('data-row-index', String(rowIndex));
      handle.setAttribute('data-table-pos', String(tablePos));
      handle.setAttribute('contenteditable', 'false');
      handle.style.cssText = `
        position: absolute;
        left: -1.25rem;
        top: 0;
        bottom: 0;
        width: 1.25rem;
        cursor: grab;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--muted-foreground);
        font-size: 0.7rem;
        letter-spacing: -3px;
        opacity: 0;
        transition: opacity 0.15s ease;
        user-select: none;
      `;
      return handle;
    };

    return [
      new Plugin({
        key: tableRowDragPluginKey,
        state: {
          init() {
            return { dragState };
          },
          apply(tr, value) {
            const meta = tr.getMeta(tableRowDragPluginKey);
            if (meta) {
              return { dragState: meta.dragState };
            }
            return value;
          },
        },
        props: {
          decorations(state) {
            const { doc } = state;
            const decorations: Decoration[] = [];
            const pluginState = tableRowDragPluginKey.getState(state);
            const currentDragState = pluginState?.dragState || dragState;

            // Add decorations to all table rows
            doc.descendants((node, pos) => {
              if (node.type.name === 'tableRow') {
                // Find the table position
                const $pos = doc.resolve(pos);
                let tablePos = -1;
                for (let d = $pos.depth; d > 0; d--) {
                  if ($pos.node(d).type.name === 'table') {
                    tablePos = $pos.before(d);
                    break;
                  }
                }

                // Calculate row index
                let rowIndex = 0;
                if (tablePos >= 0) {
                  const table = doc.nodeAt(tablePos);
                  if (table) {
                    let currentPos = tablePos + 1;
                    table.forEach((row, offset, index) => {
                      if (currentPos === pos) {
                        rowIndex = index;
                      }
                      currentPos += row.nodeSize;
                    });
                  }
                }

                // Check if this is a header row (skip drag for headers)
                const isHeaderRow = node.firstChild?.type.name === 'tableHeader';

                const isDragging = currentDragState.isDragging && currentDragState.draggedRowPos === pos;
                const isDropTarget = currentDragState.isDragging && 
                  currentDragState.dropTargetIndex === rowIndex && 
                  currentDragState.tablePos === tablePos;

                const classes = [
                  'table-row-draggable',
                  isDragging ? 'dragging' : '',
                  isDropTarget ? 'drop-target' : '',
                  isHeaderRow ? 'header-row' : '',
                ].filter(Boolean).join(' ');

                decorations.push(
                  Decoration.node(pos, pos + node.nodeSize, {
                    class: classes,
                    'data-row-pos': String(pos),
                    'data-row-index': String(rowIndex),
                    'data-table-pos': String(tablePos),
                    'data-is-header': String(isHeaderRow),
                  })
                );
              }
            });

            return DecorationSet.create(doc, decorations);
          },

          handleDOMEvents: {
            mousedown(view, event) {
              // Skip on mobile devices to prevent issues
              if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                return false;
              }

              const target = event.target as HTMLElement;
              if (!target) return false;
              
              // Check if clicking on a drag handle or the first cell area
              const row = target.closest('tr.table-row-draggable');
              if (!row) return false;

              // Only trigger on the left edge of the first cell
              const firstCell = row.querySelector('td, th');
              if (!firstCell) return false;

              const cellRect = firstCell.getBoundingClientRect();
              const clickX = event.clientX;
              
              // Check if click is in the drag handle area (left of the cell)
              if (clickX > cellRect.left) return false;

              // Don't drag header rows
              if (row.getAttribute('data-is-header') === 'true') return false;

              const rowPos = parseInt(row.getAttribute('data-row-pos') || '-1');
              const rowIndex = parseInt(row.getAttribute('data-row-index') || '-1');
              const tablePos = parseInt(row.getAttribute('data-table-pos') || '-1');

              if (rowPos < 0 || tablePos < 0) return false;

              dragState = {
                isDragging: true,
                draggedRowPos: rowPos,
                draggedRowIndex: rowIndex,
                tablePos: tablePos,
                dropTargetIndex: null,
              };

              const { tr } = view.state;
              tr.setMeta(tableRowDragPluginKey, { dragState });
              view.dispatch(tr);

              // Add visual feedback
              document.body.style.cursor = 'grabbing';

              // Add global mouse event listeners
              const handleMouseMove = (e: MouseEvent) => {
                const targetElement = document.elementFromPoint(e.clientX, e.clientY);
                const targetRow = targetElement?.closest('tr.table-row-draggable');
                
                if (targetRow) {
                  const targetIndex = parseInt(targetRow.getAttribute('data-row-index') || '-1');
                  const targetTablePos = parseInt(targetRow.getAttribute('data-table-pos') || '-1');
                  const isHeader = targetRow.getAttribute('data-is-header') === 'true';
                  
                  // Don't allow dropping on header rows or same row
                  if (!isHeader && targetTablePos === dragState.tablePos && targetIndex !== dragState.dropTargetIndex) {
                    dragState = { ...dragState, dropTargetIndex: targetIndex };
                    const { tr } = view.state;
                    tr.setMeta(tableRowDragPluginKey, { dragState });
                    view.dispatch(tr);
                  }
                }
              };

              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.body.style.cursor = '';

                if (dragState.isDragging && dragState.dropTargetIndex !== null && 
                    dragState.dropTargetIndex !== dragState.draggedRowIndex &&
                    dragState.tablePos !== null) {
                  // Perform the row swap
                  const { state } = view;
                  const table = state.doc.nodeAt(dragState.tablePos);
                  
                  if (table) {
                    const rows: { node: any; isHeader: boolean }[] = [];
                    table.forEach((row) => {
                      const isHeader = row.firstChild?.type.name === 'tableHeader';
                      rows.push({ node: row, isHeader });
                    });

                    // Don't allow dragging header rows
                    if (rows[dragState.draggedRowIndex!]?.isHeader) {
                      resetDragState();
                      return;
                    }

                    // Reorder rows
                    const draggedRow = rows.splice(dragState.draggedRowIndex!, 1)[0];
                    let targetIndex = dragState.dropTargetIndex!;
                    
                    // Adjust target index if dragging down
                    if (dragState.draggedRowIndex! < targetIndex) {
                      targetIndex--;
                    }
                    
                    rows.splice(targetIndex, 0, draggedRow);

                    // Create new table with reordered rows
                    const tableType = state.schema.nodes.table;
                    const newTable = tableType.create(table.attrs, rows.map(r => r.node));

                    const { tr } = view.state;
                    tr.replaceWith(dragState.tablePos!, dragState.tablePos! + table.nodeSize, newTable);
                    tr.setMeta(tableRowDragPluginKey, { 
                      dragState: {
                        isDragging: false,
                        draggedRowPos: null,
                        draggedRowIndex: null,
                        tablePos: null,
                        dropTargetIndex: null,
                      }
                    });
                    view.dispatch(tr);
                    return;
                  }
                }

                resetDragState();

                function resetDragState() {
                  dragState = {
                    isDragging: false,
                    draggedRowPos: null,
                    draggedRowIndex: null,
                    tablePos: null,
                    dropTargetIndex: null,
                  };
                  const { tr } = view.state;
                  tr.setMeta(tableRowDragPluginKey, { dragState });
                  view.dispatch(tr);
                }
              };

              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);

              event.preventDefault();
              return true;
            },
          },
        },
      }),
    ];
  },
});

export default TableRowDrag;
