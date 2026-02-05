import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

/*
 * DESIGN: Table Cell with Menu Extension
 * Uses a ProseMirror plugin to add menu buttons to table cells
 * Uses CSS :hover for showing buttons (no JS event listeners needed)
 */

// Create a plugin that adds menu buttons to table cells
const tableCellMenuPluginKey = new PluginKey('tableCellMenu');

function createTableCellMenuPlugin(editor: any) {
  return new Plugin({
    key: tableCellMenuPluginKey,
    props: {
      decorations(state) {
        const { doc } = state;
        const decorations: Decoration[] = [];
        
        doc.descendants((node, pos) => {
          if (node.type.name === 'tableCell' || node.type.name === 'tableHeader') {
            // Add a widget decoration for the menu button
            const widget = Decoration.widget(pos + 1, (view) => {
              const wrapper = document.createElement('div');
              wrapper.className = 'table-cell-menu-wrapper ProseMirror-widget';
              wrapper.setAttribute('contenteditable', 'false');
              
              const button = document.createElement('button');
              button.className = 'table-cell-menu-btn';
              button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>`;
              button.title = 'Table options';
              button.type = 'button';
              
              button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Capture button position BEFORE any editor operations
                // (setTextSelection can cause decorations to be recreated)
                const buttonRect = button.getBoundingClientRect();
                
                // Focus the cell first
                editor.chain().focus().setTextSelection(pos + 1).run();
                
                // Show the dropdown menu with pre-captured position
                showTableMenu(e, editor, pos, buttonRect);
              });
              
              wrapper.appendChild(button);
              return wrapper;
            }, { side: -1 });
            
            decorations.push(widget);
          }
        });
        
        return DecorationSet.create(doc, decorations);
      },
    },
  });
}

// Show the dropdown menu
function showTableMenu(event: MouseEvent, editor: any, pos: number, buttonRect: DOMRect) {
  // Remove any existing menu
  const existingMenu = document.querySelector('.table-cell-menu-dropdown');
  if (existingMenu) {
    existingMenu.remove();
  }
  
  // Create the dropdown menu
  const dropdown = document.createElement('div');
  dropdown.className = 'table-cell-menu-dropdown';
  
  // Calculate position based on button position
  const dropdownWidth = 170;
  const dropdownHeight = 280;
  
  // Position dropdown below the button, aligned to the right edge
  let viewportTop = buttonRect.bottom + 4;
  let viewportLeft = buttonRect.left - dropdownWidth + buttonRect.width + 8;
  
  // Adjust for viewport bounds - keep dropdown within viewport
  // Right edge check
  if (viewportLeft + dropdownWidth > window.innerWidth - 12) {
    viewportLeft = window.innerWidth - dropdownWidth - 12;
  }
  // Left edge check
  if (viewportLeft < 12) {
    viewportLeft = 12;
  }
  // Bottom edge check - show above if not enough space below
  if (viewportTop + dropdownHeight > window.innerHeight - 12) {
    viewportTop = buttonRect.top - dropdownHeight - 4;
  }
  // Top edge check
  if (viewportTop < 12) {
    viewportTop = 12;
  }
  
  dropdown.style.cssText = `
    position: fixed;
    top: ${viewportTop}px;
    left: ${viewportLeft}px;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 160px;
    max-width: 200px;
    width: auto;
    padding: 4px;
    background: hsl(var(--popover));
    border: 1px solid hsl(var(--border));
    border-radius: 6px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08);
  `;
  
  const menuItems = [
    { label: 'Insert Column Left', icon: 'col-left', action: () => editor.chain().focus().addColumnBefore().run() },
    { label: 'Insert Column Right', icon: 'col-right', action: () => editor.chain().focus().addColumnAfter().run() },
    { label: 'Insert Row Above', icon: 'row-up', action: () => editor.chain().focus().addRowBefore().run() },
    { label: 'Insert Row Below', icon: 'row-down', action: () => editor.chain().focus().addRowAfter().run() },
    { label: 'divider' },
    { label: 'Delete Column', icon: 'delete', action: () => editor.chain().focus().deleteColumn().run(), destructive: true },
    { label: 'Delete Row', icon: 'delete', action: () => editor.chain().focus().deleteRow().run(), destructive: true },
    { label: 'Delete Table', icon: 'table-delete', action: () => editor.chain().focus().deleteTable().run(), destructive: true },
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
  };
  
  menuItems.forEach((item) => {
    if (item.label === 'divider') {
      const divider = document.createElement('div');
      divider.className = 'tcm-divider';
      dropdown.appendChild(divider);
    } else {
      const menuButton = document.createElement('button');
      menuButton.className = 'tcm-item' + (item.destructive ? ' tcm-destructive' : '');
      menuButton.type = 'button';
      menuButton.innerHTML = `
        <span class="tcm-icon">${icons[item.icon || ''] || ''}</span>
        <span class="tcm-label">${item.label}</span>
      `;
      menuButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        item.action?.();
        dropdown.remove();
      });
      dropdown.appendChild(menuButton);
    }
  });
  
  document.body.appendChild(dropdown);
  
  // Close on click outside
  const closeMenu = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!dropdown.contains(target) && !target.classList.contains('table-cell-menu-btn')) {
      dropdown.remove();
      document.removeEventListener('mousedown', closeMenu);
      document.removeEventListener('keydown', closeOnEscape);
    }
  };
  
  // Close on escape
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

// Copy table to clipboard
function copyTable(editor: any) {
  const { state } = editor;
  const { selection } = state;
  
  // Find the table node
  let tableNode = null;
  
  state.doc.descendants((node: any, pos: number) => {
    if (node.type.name === 'table') {
      // Check if selection is within this table
      if (pos <= selection.from && pos + node.nodeSize >= selection.to) {
        tableNode = node;
        return false;
      }
    }
  });
  
  if (tableNode) {
    // Build table HTML from node
    const buildTableHTML = (node: any): string => {
      if (node.type.name === 'table') {
        return `<table>${node.content.content.map(buildTableHTML).join('')}</table>`;
      }
      if (node.type.name === 'tableRow') {
        return `<tr>${node.content.content.map(buildTableHTML).join('')}</tr>`;
      }
      if (node.type.name === 'tableCell') {
        const attrs = node.attrs;
        const colspan = attrs.colspan > 1 ? ` colspan="${attrs.colspan}"` : '';
        const rowspan = attrs.rowspan > 1 ? ` rowspan="${attrs.rowspan}"` : '';
        return `<td${colspan}${rowspan}>${node.textContent}</td>`;
      }
      if (node.type.name === 'tableHeader') {
        const attrs = node.attrs;
        const colspan = attrs.colspan > 1 ? ` colspan="${attrs.colspan}"` : '';
        const rowspan = attrs.rowspan > 1 ? ` rowspan="${attrs.rowspan}"` : '';
        return `<th${colspan}${rowspan}>${node.textContent}</th>`;
      }
      return node.textContent || '';
    };
    
    const tableHTML = buildTableHTML(tableNode);
    
    // Copy to clipboard
    navigator.clipboard.writeText(tableHTML).then(() => {
      // Show toast notification
      const toast = document.createElement('div');
      toast.className = 'tcm-toast';
      toast.textContent = 'Table copied to clipboard';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    });
  }
}

// Extended TableCell with menu plugin
export const TableCellWithMenu = TableCell.extend({
  addProseMirrorPlugins() {
    return [
      createTableCellMenuPlugin(this.editor),
    ];
  },
});

// Extended TableHeader with menu plugin (uses same styling)
export const TableHeaderWithMenu = TableHeader.extend({
  addProseMirrorPlugins() {
    return [
      // TableHeader uses the same plugin as TableCell
      // The plugin handles both tableCell and tableHeader nodes
    ];
  },
});
