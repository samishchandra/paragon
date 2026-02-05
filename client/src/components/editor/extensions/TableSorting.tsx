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

// Cache for table positions to avoid unnecessary decoration rebuilds
let lastDocVersion = -1;
let cachedDecorations: DecorationSet | null = null;

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
  
  // Invalidate decoration cache since sort state changed
  cachedDecorations = null;
  
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

function createSortButton(direction: 'asc' | 'desc' | null, tablePos: number, columnIndex: number, editor: any): HTMLSpanElement {
  // Create an inline span that sits next to the header text
  const wrapper = document.createElement('span');
  wrapper.className = 'table-sort-btn-inline';
  wrapper.setAttribute('contenteditable', 'false');
  wrapper.style.cssText = 'display:inline-flex;align-items:center;margin-left:4px;vertical-align:middle;pointer-events:auto;';
  
  const button = document.createElement('button');
  button.className = 'table-sort-btn';
  button.setAttribute('contenteditable', 'false');
  button.type = 'button';
  
  const isDark = document.documentElement.classList.contains('dark');
  const activeColor = isDark ? '#60a5fa' : '#3b82f6';
  const inactiveColor = isDark ? '#666' : '#aaa';
  const hoverBg = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
  
  button.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;font-size:10px;color:' + (direction ? activeColor : inactiveColor) + ';background:transparent;border:none;border-radius:3px;cursor:pointer;user-select:none;transition:all 0.15s ease;opacity:' + (direction ? '1' : '0.5') + ';pointer-events:auto;vertical-align:middle;';
  
  // Add hover effect
  button.addEventListener('mouseenter', () => {
    button.style.background = hoverBg;
    button.style.opacity = '1';
    button.style.color = activeColor;
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.background = 'transparent';
    button.style.opacity = direction ? '1' : '0.5';
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
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>';
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
      apply(tr, oldState, _oldEditorState, newEditorState) {
        // Check if we need to rebuild decorations
        const meta = tr.getMeta(tableSortingPluginKey);
        const docChanged = tr.docChanged;
        
        // If document hasn't changed and no sort update, try to map existing decorations
        if (!docChanged && !meta?.updated && cachedDecorations) {
          return cachedDecorations.map(tr.mapping, tr.doc);
        }
        
        // Rebuild decorations if document changed or sort state updated
        cachedDecorations = buildDecorations(newEditorState.doc, editor);
        return cachedDecorations;
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
          let cellOffset = 0;
          
          rowNode.forEach((cellNode: any, offset: number) => {
            if (cellNode.type.name === 'tableHeader') {
              // Find the end of the text content inside the header cell
              // We want to place the sort button after the text, inside the paragraph
              const cellPos = pos + 1 + rowOffset + 1 + cellOffset;
              
              // Find the paragraph inside the cell and place at the end of its content
              let decorationPos = cellPos + 1; // Default: start of cell content
              
              cellNode.forEach((childNode: any, childOffset: number) => {
                if (childNode.type.name === 'paragraph') {
                  // Place at the end of the paragraph content (before closing tag)
                  decorationPos = cellPos + 1 + childOffset + childNode.nodeSize - 1;
                }
              });
              
              // Check if this column is currently sorted
              const isActive = currentSortState?.tablePos === tablePos && currentSortState?.columnIndex === currentCol;
              const direction = isActive ? currentSortState!.direction : null;
              
              const colForClosure = currentCol;
              const tablePosForClosure = tablePos;
              
              // Use widget decoration at the end of the paragraph content
              const widget = Decoration.widget(decorationPos, () => {
                return createSortButton(direction, tablePosForClosure, colForClosure, editor);
              }, { side: 1, key: 'sort-' + tablePos + '-' + colForClosure });
              
              decorations.push(widget);
            }
            cellOffset += cellNode.nodeSize;
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
