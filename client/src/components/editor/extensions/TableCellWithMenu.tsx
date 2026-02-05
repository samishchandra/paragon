import { Node, mergeAttributes } from '@tiptap/core';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

/*
 * DESIGN: Table Cell with Menu Extension
 * Uses a ProseMirror plugin to add menu buttons to table cells
 * This approach avoids DOM nesting issues with NodeView
 */

// Create a plugin that adds menu buttons to table cells
const tableCellMenuPluginKey = new PluginKey('tableCellMenu');

function createTableCellMenuPlugin(editor: any) {
  return new Plugin({
    key: tableCellMenuPluginKey,
    props: {
      decorations(state) {
        const { doc, selection } = state;
        const decorations: Decoration[] = [];
        
        doc.descendants((node, pos) => {
          if (node.type.name === 'tableCell' || node.type.name === 'tableHeader') {
            // Add a widget decoration for the menu button
            const widget = Decoration.widget(pos + 1, () => {
              const button = document.createElement('button');
              button.className = 'table-cell-menu-button';
              button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>`;
              button.title = 'Table options';
              button.contentEditable = 'false';
              
              button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Focus the cell first
                editor.chain().focus().setTextSelection(pos + 1).run();
                
                // Show the dropdown menu
                showTableMenu(e, editor, pos);
              });
              
              return button;
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
function showTableMenu(event: MouseEvent, editor: any, pos: number) {
  // Remove any existing menu
  const existingMenu = document.querySelector('.table-cell-menu-dropdown');
  if (existingMenu) {
    existingMenu.remove();
  }
  
  // Use click event coordinates for positioning (works correctly in scrollable containers)
  const clickX = event.clientX;
  const clickY = event.clientY;
  
  // Create the dropdown menu
  const dropdown = document.createElement('div');
  dropdown.className = 'table-cell-menu-dropdown';
  
  // Calculate position based on click coordinates
  const dropdownWidth = 180;
  const dropdownHeight = 320;
  
  // Position dropdown below and to the right of click
  let viewportTop = clickY + 8;
  let viewportLeft = clickX - dropdownWidth / 2;
  
  // Adjust for viewport bounds
  if (viewportLeft + dropdownWidth > window.innerWidth - 8) {
    viewportLeft = window.innerWidth - dropdownWidth - 8;
  }
  if (viewportLeft < 8) {
    viewportLeft = 8;
  }
  if (viewportTop + dropdownHeight > window.innerHeight - 8) {
    viewportTop = clickY - dropdownHeight - 8;
  }
  if (viewportTop < 8) {
    viewportTop = 8;
  }
  
  // Final clamp to ensure dropdown is always visible
  viewportTop = Math.max(8, Math.min(viewportTop, window.innerHeight - dropdownHeight - 8));
  viewportLeft = Math.max(8, Math.min(viewportLeft, window.innerWidth - dropdownWidth - 8));
  
  dropdown.style.cssText = `
    position: fixed;
    top: ${viewportTop}px;
    left: ${viewportLeft}px;
    z-index: 99999;
  `;
  
  const menuItems = [
    { label: 'Insert Column Left', icon: 'arrow-left', action: () => editor.chain().focus().addColumnBefore().run() },
    { label: 'Insert Column Right', icon: 'arrow-right', action: () => editor.chain().focus().addColumnAfter().run() },
    { label: 'Insert Row Above', icon: 'arrow-up', action: () => editor.chain().focus().addRowBefore().run() },
    { label: 'Insert Row Below', icon: 'arrow-down', action: () => editor.chain().focus().addRowAfter().run() },
    { label: 'divider' },
    { label: 'Delete Column', icon: 'trash', action: () => editor.chain().focus().deleteColumn().run() },
    { label: 'Delete Row', icon: 'trash', action: () => editor.chain().focus().deleteRow().run() },
    { label: 'Delete Table', icon: 'table', action: () => editor.chain().focus().deleteTable().run() },
    { label: 'divider' },
    { label: 'Copy Table', icon: 'copy', action: () => copyTable(editor) },
  ];
  
  const icons: Record<string, string> = {
    'arrow-left': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8L7 4M3 8L7 12M3 8H21"/></svg>',
    'arrow-right': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8L17 4M21 8L17 12M21 8H3"/></svg>',
    'arrow-up': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3L4 7M8 3L12 7M8 3V21"/></svg>',
    'arrow-down': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21L4 17M8 21L12 17M8 21V3"/></svg>',
    'trash': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    'table': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>',
    'copy': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
  };
  
  menuItems.forEach((item) => {
    if (item.label === 'divider') {
      const divider = document.createElement('div');
      divider.className = 'table-cell-menu-divider';
      dropdown.appendChild(divider);
    } else {
      const menuButton = document.createElement('button');
      menuButton.className = 'table-cell-menu-item';
      menuButton.innerHTML = `
        <span class="table-cell-menu-icon">${icons[item.icon || ''] || ''}</span>
        <span>${item.label}</span>
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
    if (!dropdown.contains(target) && !target.classList.contains('table-cell-menu-button')) {
      dropdown.remove();
      document.removeEventListener('mousedown', closeMenu);
    }
  };
  
  // Close on escape
  const closeOnEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      dropdown.remove();
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
  let tablePos = 0;
  
  state.doc.descendants((node: any, pos: number) => {
    if (node.type.name === 'table') {
      // Check if selection is within this table
      if (pos <= selection.from && pos + node.nodeSize >= selection.to) {
        tableNode = node;
        tablePos = pos;
        return false;
      }
    }
  });
  
  if (tableNode) {
    // Get the HTML of the table
    const tempDiv = document.createElement('div');
    const tableElement = document.createElement('table');
    
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
      return '';
    };
    
    const tableHTML = buildTableHTML(tableNode);
    
    // Copy to clipboard
    navigator.clipboard.writeText(tableHTML).then(() => {
      // Show toast or notification
      const toast = document.createElement('div');
      toast.className = 'table-copy-toast';
      toast.textContent = 'Table copied to clipboard';
      toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: hsl(var(--foreground));
        color: hsl(var(--background));
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 99999;
        animation: fadeInOut 2s ease-in-out;
      `;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    }).catch(err => {
      console.error('Failed to copy table:', err);
    });
  }
}

// Extended TableCell with menu plugin
export const TableCellWithMenu = TableCell.extend({
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
  
  addProseMirrorPlugins() {
    return [
      createTableCellMenuPlugin(this.editor),
    ];
  },
});

// Extended TableHeader with menu (inherits plugin from TableCell)
export const TableHeaderWithMenu = TableHeader.extend({
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

export default TableCellWithMenu;
