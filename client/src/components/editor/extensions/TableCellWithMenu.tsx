import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { Plugin, PluginKey } from '@tiptap/pm/state';

const tableCellMenuPluginKey = new PluginKey('tableCellMenu');

function createTableCellMenuPlugin(editor: any) {
  return new Plugin({
    key: tableCellMenuPluginKey,
    props: {
      handleDOMEvents: {
        contextmenu(view, event) {
          const target = event.target as HTMLElement;
          const cell = target.closest('td, th') as HTMLElement;
          
          if (cell && cell.closest('.ProseMirror')) {
            event.preventDefault();
            
            // Get the ProseMirror position for this cell
            const pos = view.posAtDOM(cell, 0);
            editor.chain().focus().setTextSelection(pos).run();
            
            // Show context menu at cursor position
            showTableContextMenu(event, editor, pos);
            return true;
          }
          
          return false;
        },
      },
    },
  });
}

function showTableContextMenu(event: MouseEvent, editor: any, pos: number) {
  // Remove any existing menu
  const existingMenu = document.querySelector('.table-cell-menu-dropdown');
  if (existingMenu) existingMenu.remove();
  
  const dropdown = document.createElement('div');
  dropdown.className = 'table-cell-menu-dropdown';
  
  const dropdownWidth = 170;
  const dropdownHeight = 280;
  
  // Position at cursor
  let viewportTop = event.clientY;
  let viewportLeft = event.clientX;
  
  // Adjust horizontal position if it would overflow
  if (viewportLeft + dropdownWidth > window.innerWidth - 12) {
    viewportLeft = window.innerWidth - dropdownWidth - 12;
  }
  if (viewportLeft < 12) viewportLeft = 12;
  
  // Adjust vertical position if it would overflow
  if (viewportTop + dropdownHeight > window.innerHeight - 12) {
    viewportTop = event.clientY - dropdownHeight;
  }
  if (viewportTop < 12) viewportTop = 12;
  
  const isDark = document.documentElement.classList.contains('dark');
  const bgColor = isDark ? '#1f1f1f' : '#ffffff';
  const borderColor = isDark ? '#3a3a3a' : '#e5e5e5';
  const textColor = isDark ? '#e5e5e5' : '#333333';
  
  dropdown.style.cssText = 'position:fixed;top:' + viewportTop + 'px;left:' + viewportLeft + 'px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:' + bgColor + ';border:1px solid ' + borderColor + ';border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:' + textColor + ';font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;';
  
  // Check if the current table has a header row
  const resolvedPos = editor.state.doc.resolve(pos);
  let hasHeaderRow = false;
  for (let d = resolvedPos.depth; d >= 0; d--) {
    if (resolvedPos.node(d).type.name === 'table') {
      const tableNode = resolvedPos.node(d);
      if (tableNode.firstChild?.firstChild?.type.name === 'tableHeader') {
        hasHeaderRow = true;
      }
      break;
    }
  }

  const menuItems = [
    { label: 'Insert Column Left', icon: 'col-left', action: () => editor.chain().focus().setTextSelection(pos).addColumnBefore().run() },
    { label: 'Insert Column Right', icon: 'col-right', action: () => editor.chain().focus().setTextSelection(pos).addColumnAfter().run() },
    { label: 'Insert Row Above', icon: 'row-up', action: () => editor.chain().focus().setTextSelection(pos).addRowBefore().run() },
    { label: 'Insert Row Below', icon: 'row-down', action: () => editor.chain().focus().setTextSelection(pos).addRowAfter().run() },
    { label: 'divider' },
    { label: hasHeaderRow ? '✓ Header Row' : '  Header Row', icon: 'toggle-header', action: () => editor.chain().focus().setTextSelection(pos).toggleHeaderRow().run() },
    { label: 'divider' },
    { label: 'Delete Column', icon: 'delete', action: () => editor.chain().focus().setTextSelection(pos).deleteColumn().run(), destructive: true },
    { label: 'Delete Row', icon: 'delete', action: () => editor.chain().focus().setTextSelection(pos).deleteRow().run(), destructive: true },
    { label: 'Delete Table', icon: 'table-delete', action: () => editor.chain().focus().setTextSelection(pos).deleteTable().run(), destructive: true },
    { label: 'divider' },
    { label: 'Copy Table', icon: 'copy', action: () => copyTable(editor) },
  ];
  
  const icons: Record<string, string> = {
    'col-left': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    'col-right': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    'row-up': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    'row-down': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    'delete': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    'table-delete': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    'copy': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    'toggle-header': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>',
  };
  
  const hoverBgColor = isDark ? '#2a2a2a' : '#f5f5f5';
  const destructiveColor = isDark ? '#ff6b6b' : '#dc2626';
  const iconColor = isDark ? '#999999' : '#666666';
  const dividerColor = isDark ? '#333333' : '#e5e5e5';
  
  menuItems.forEach((item) => {
    if (item.label === 'divider') {
      const divider = document.createElement('div');
      divider.style.cssText = 'height:1px;background:' + dividerColor + ';margin:4px 0;';
      dropdown.appendChild(divider);
    } else {
      const menuButton = document.createElement('button');
      menuButton.type = 'button';
      const itemTextColor = item.destructive ? destructiveColor : textColor;
      menuButton.style.cssText = 'display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:' + itemTextColor + ';background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;';
      const iconHtml = icons[item.icon || ''] || '';
      const iconSpanColor = item.destructive ? destructiveColor : iconColor;
      menuButton.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + iconSpanColor + ';">' + iconHtml + '</span><span style="flex:1;white-space:nowrap;">' + item.label + '</span>';
      
      menuButton.addEventListener('mouseenter', () => {
        menuButton.style.background = item.destructive ? (isDark ? 'rgba(255,107,107,0.15)' : 'rgba(220,38,38,0.1)') : hoverBgColor;
      });
      menuButton.addEventListener('mouseleave', () => {
        menuButton.style.background = 'transparent';
      });
      
      menuButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (item.action) item.action();
        dropdown.remove();
      });
      dropdown.appendChild(menuButton);
    }
  });
  
  document.body.appendChild(dropdown);
  
  const closeMenu = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (dropdown.contains(target)) return;
    dropdown.remove();
    document.removeEventListener('mousedown', closeMenu);
    document.removeEventListener('keydown', closeOnEscape);
  };
  
  const closeOnEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      dropdown.remove();
      document.removeEventListener('mousedown', closeMenu);
      document.removeEventListener('keydown', closeOnEscape);
    }
  };
  
  setTimeout(() => {
    document.addEventListener('mousedown', closeMenu);
    document.addEventListener('keydown', closeOnEscape);
  }, 0);
}

function copyTable(editor: any) {
  const { state } = editor;
  const { selection } = state;
  let tableNode = null;
  
  state.doc.descendants((node: any, pos: number) => {
    if (node.type.name === 'table') {
      if (pos <= selection.from && pos + node.nodeSize >= selection.to) {
        tableNode = node;
        return false;
      }
    }
  });
  
  if (tableNode) {
    const buildTableHTML = (node: any): string => {
      if (node.type.name === 'table') return '<table>' + node.content.content.map(buildTableHTML).join('') + '</table>';
      if (node.type.name === 'tableRow') return '<tr>' + node.content.content.map(buildTableHTML).join('') + '</tr>';
      if (node.type.name === 'tableCell') {
        const attrs = node.attrs;
        const colspan = attrs.colspan > 1 ? ' colspan="' + attrs.colspan + '"' : '';
        const rowspan = attrs.rowspan > 1 ? ' rowspan="' + attrs.rowspan + '"' : '';
        return '<td' + colspan + rowspan + '>' + node.textContent + '</td>';
      }
      if (node.type.name === 'tableHeader') {
        const attrs = node.attrs;
        const colspan = attrs.colspan > 1 ? ' colspan="' + attrs.colspan + '"' : '';
        const rowspan = attrs.rowspan > 1 ? ' rowspan="' + attrs.rowspan + '"' : '';
        return '<th' + colspan + rowspan + '>' + node.textContent + '</th>';
      }
      return node.textContent || '';
    };
    
    const tableHTML = buildTableHTML(tableNode);
    
    navigator.clipboard.writeText(tableHTML).then(() => {
      const toast = document.createElement('div');
      toast.className = 'tcm-toast';
      toast.textContent = 'Table copied to clipboard';
      toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:white;padding:10px 20px;border-radius:6px;font-size:13px;z-index:99999;animation:fadeInOut 2s ease-in-out forwards;';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    });
  }
}

export const TableCellWithMenu = TableCell.extend({
  addProseMirrorPlugins() {
    return [
      ...(this.parent?.() || []),
      createTableCellMenuPlugin(this.editor),
    ];
  },
});

// TableHeaderWithMenu doesn't add the plugin to avoid duplicate registration
export const TableHeaderWithMenu = TableHeader.extend({});
