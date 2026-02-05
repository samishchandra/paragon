import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

const tableSortingPluginKey = new PluginKey('tableSorting');

// Track sort state globally
interface SortState {
  tablePos: number;
  columnIndex: number;
  direction: 'asc' | 'desc';
}

let currentSortState: SortState | null = null;

function parseValue(text: string): { type: 'number' | 'date' | 'string'; value: number | Date | string } {
  const num = parseFloat(text.replace(/[,$%]/g, ''));
  if (!isNaN(num) && text.match(/^[\d,.$%\-+]+$/)) {
    return { type: 'number', value: num };
  }
  
  const datePatterns = [/^\d{4}-\d{2}-\d{2}/, /^\d{1,2}\/\d{1,2}\/\d{2,4}/, /^\d{1,2}-\d{1,2}-\d{2,4}/];
  for (const pattern of datePatterns) {
    if (pattern.test(text)) {
      const date = new Date(text);
      if (!isNaN(date.getTime())) {
        return { type: 'date', value: date };
      }
    }
  }
  
  return { type: 'string', value: text.toLowerCase() };
}

function compareValues(a: ReturnType<typeof parseValue>, b: ReturnType<typeof parseValue>, direction: 'asc' | 'desc'): number {
  let result = 0;
  
  if (a.type === 'number' && b.type === 'number') {
    result = (a.value as number) - (b.value as number);
  } else if (a.type === 'date' && b.type === 'date') {
    result = (a.value as Date).getTime() - (b.value as Date).getTime();
  } else {
    result = String(a.value).localeCompare(String(b.value));
  }
  
  return direction === 'asc' ? result : -result;
}

function sortTable(editor: any, tablePos: number, columnIndex: number) {
  const { state, view } = editor;
  
  // Find the table node at the given position
  let tableNode: any = null;
  state.doc.nodesBetween(tablePos, tablePos + 1, (node: any, pos: number) => {
    if (node.type.name === 'table' && pos === tablePos) {
      tableNode = node;
      return false;
    }
  });
  
  if (!tableNode) {
    console.log('Table not found at position', tablePos);
    return;
  }
  
  // Determine new sort direction
  const newDirection: 'asc' | 'desc' = 
    currentSortState?.tablePos === tablePos && 
    currentSortState?.columnIndex === columnIndex && 
    currentSortState?.direction === 'asc' 
      ? 'desc' 
      : 'asc';
  
  // Update sort state
  currentSortState = { tablePos, columnIndex, direction: newDirection };
  
  // Get all rows
  const rows: { node: any; isHeader: boolean }[] = [];
  
  tableNode.forEach((rowNode: any) => {
    if (rowNode.type.name === 'tableRow') {
      let isHeader = false;
      rowNode.forEach((cellNode: any) => {
        if (cellNode.type.name === 'tableHeader') {
          isHeader = true;
        }
      });
      rows.push({ node: rowNode, isHeader });
    }
  });
  
  const headerRows = rows.filter(r => r.isHeader);
  const dataRows = rows.filter(r => !r.isHeader);
  
  if (dataRows.length < 2) {
    showSortToast(columnIndex, newDirection);
    view.dispatch(state.tr.setMeta(tableSortingPluginKey, { updated: true }));
    return;
  }
  
  // Get sort values for each data row
  const rowsWithValues = dataRows.map(row => {
    let cellContent = '';
    let cellIndex = 0;
    
    row.node.forEach((cellNode: any) => {
      if (cellIndex === columnIndex) {
        cellContent = cellNode.textContent || '';
      }
      cellIndex++;
    });
    
    return { ...row, sortValue: parseValue(cellContent) };
  });
  
  // Sort the rows
  const originalOrder = rowsWithValues.map((_, i) => i);
  rowsWithValues.sort((a, b) => compareValues(a.sortValue, b.sortValue, newDirection));
  const newOrder = rowsWithValues.map((r, i) => dataRows.indexOf(r));
  
  // Check if order changed
  const orderChanged = originalOrder.some((idx, i) => idx !== newOrder[i]);
  
  if (orderChanged) {
    // Build new table content
    const newTableContent: any[] = [];
    headerRows.forEach(row => newTableContent.push(row.node));
    rowsWithValues.forEach(row => newTableContent.push(row.node));
    
    // Create new table node
    const newTableNode = tableNode.type.create(tableNode.attrs, newTableContent);
    
    // Replace in document
    const { tr } = state;
    tr.replaceWith(tablePos, tablePos + tableNode.nodeSize, newTableNode);
    tr.setMeta(tableSortingPluginKey, { updated: true });
    view.dispatch(tr);
  } else {
    view.dispatch(state.tr.setMeta(tableSortingPluginKey, { updated: true }));
  }
  
  showSortToast(columnIndex, newDirection);
}

function showSortToast(columnIndex: number, direction: 'asc' | 'desc') {
  const existingToast = document.querySelector('.table-sort-toast');
  if (existingToast) existingToast.remove();
  
  const toast = document.createElement('div');
  toast.className = 'table-sort-toast';
  const directionText = direction === 'asc' ? 'ascending' : 'descending';
  const arrow = direction === 'asc' ? '↑' : '↓';
  toast.innerHTML = '<span style="margin-right:6px;">' + arrow + '</span> Sorted column ' + (columnIndex + 1) + ' ' + directionText;
  
  const isDark = document.documentElement.classList.contains('dark');
  toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:' + (isDark ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)') + ';color:' + (isDark ? '#e5e5e5' : '#333') + ';padding:10px 20px;border-radius:8px;font-size:13px;font-weight:500;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.15);border:1px solid ' + (isDark ? '#3a3a3a' : '#e5e5e5') + ';animation:sortToastIn 0.2s ease;';
  
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'sortToastOut 0.2s ease forwards';
    setTimeout(() => toast.remove(), 200);
  }, 1500);
}

function createSortButton(direction: 'asc' | 'desc' | null, tablePos: number, columnIndex: number, editor: any): HTMLDivElement {
  // Create wrapper positioned absolutely in the header cell
  // Position it to the right of the 3-dot menu button (which is at right: 2px)
  const wrapper = document.createElement('div');
  wrapper.className = 'table-sort-btn-wrapper';
  wrapper.setAttribute('contenteditable', 'false');
  // Position to the left of the 3-dot menu button
  wrapper.style.cssText = 'position:absolute;top:50%;right:24px;transform:translateY(-50%);z-index:49;pointer-events:auto;';
  
  const button = document.createElement('button');
  button.className = 'table-sort-btn';
  button.setAttribute('contenteditable', 'false');
  button.type = 'button';
  
  const isDark = document.documentElement.classList.contains('dark');
  const activeColor = isDark ? '#60a5fa' : '#3b82f6';
  const inactiveColor = isDark ? '#666' : '#aaa';
  const hoverBg = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
  
  button.style.cssText = 'display:flex;align-items:center;justify-content:center;width:18px;height:18px;padding:0;font-size:10px;color:' + (direction ? activeColor : inactiveColor) + ';background:transparent;border:none;border-radius:3px;cursor:pointer;user-select:none;transition:all 0.15s ease;opacity:' + (direction ? '1' : '0.4') + ';pointer-events:auto;';
  
  // Add hover effect
  button.addEventListener('mouseenter', () => {
    button.style.background = hoverBg;
    button.style.opacity = '1';
    button.style.color = activeColor;
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.background = 'transparent';
    button.style.opacity = direction ? '1' : '0.4';
    button.style.color = direction ? activeColor : inactiveColor;
  });
  
  // Add click handler directly to the button
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    sortTable(editor, tablePos, columnIndex);
  });
  
  if (direction === 'asc') {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    button.title = 'Sorted ascending - Click to sort descending';
  } else if (direction === 'desc') {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>';
    button.title = 'Sorted descending - Click to sort ascending';
  } else {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>';
    button.title = 'Click to sort this column';
  }
  
  wrapper.appendChild(button);
  return wrapper;
}

function createTableSortingPlugin(editor: any) {
  return new Plugin({
    key: tableSortingPluginKey,
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, oldState) {
        return buildDecorations(tr.doc, editor);
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });
}

function buildDecorations(doc: any, editor: any): DecorationSet {
  const decorations: Decoration[] = [];
  
  doc.descendants((node: any, pos: number) => {
    if (node.type.name === 'table') {
      const tablePos = pos;
      
      // Find header cells in this table
      node.forEach((rowNode: any, rowOffset: number) => {
        if (rowNode.type.name === 'tableRow') {
          let currentCol = 0;
          
          rowNode.forEach((cellNode: any, offset: number) => {
            if (cellNode.type.name === 'tableHeader') {
              // Calculate the position for the decoration
              // Place at the start of the cell (position 0 inside the cell)
              const cellPos = pos + 1 + rowOffset + 1 + offset;
              
              // Check if this column is currently sorted
              const isActive = currentSortState?.tablePos === tablePos && currentSortState?.columnIndex === currentCol;
              const direction = isActive ? currentSortState!.direction : null;
              
              const colForClosure = currentCol;
              const tablePosForClosure = tablePos;
              
              // Use widget decoration at the start of the cell
              const widget = Decoration.widget(cellPos + 1, () => {
                return createSortButton(direction, tablePosForClosure, colForClosure, editor);
              }, { side: -1, key: 'sort-' + tablePos + '-' + colForClosure });
              
              decorations.push(widget);
            }
            currentCol++;
          });
        }
      });
    }
  });
  
  return DecorationSet.create(doc, decorations);
}

export const TableSorting = Extension.create({
  name: 'tableSorting',
  
  addProseMirrorPlugins() {
    return [createTableSortingPlugin(this.editor)];
  },
});

export default TableSorting;
