import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

const tableCellMenuPluginKey = new PluginKey('tableCellMenu');
let eventDelegationSetup = false;

// Cache for decorations to avoid unnecessary rebuilds
let cachedMenuDecorations: DecorationSet | null = null;

function setupEventDelegation() {
  if (eventDelegationSetup) return;
  eventDelegationSetup = true;
  
  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    const cell = target.closest('td, th');
    if (cell && cell.closest('.ProseMirror')) {
      const btn = cell.querySelector('.table-cell-menu-btn') as HTMLElement;
      if (btn) btn.style.opacity = '1';
    }
  }, true);
  
  document.addEventListener('mouseout', (e) => {
    const target = e.target as HTMLElement;
    const relatedTarget = (e as MouseEvent).relatedTarget as HTMLElement;
    const cell = target.closest('td, th');
    if (cell && cell.closest('.ProseMirror')) {
      if (relatedTarget && cell.contains(relatedTarget)) return;
      const dropdown = document.querySelector('.table-cell-menu-dropdown');
      if (dropdown) return;
      const btn = cell.querySelector('.table-cell-menu-btn') as HTMLElement;
      if (btn) btn.style.opacity = '0.15';
    }
  }, true);
}

function createTableCellMenuPlugin(editor: any) {
  setupEventDelegation();
  
  return new Plugin({
    key: tableCellMenuPluginKey,
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, oldState, _oldEditorState, newEditorState) {
        // Only rebuild decorations if document structure changed
        if (!tr.docChanged && cachedMenuDecorations) {
          // Map existing decorations to new positions
          return cachedMenuDecorations.map(tr.mapping, tr.doc);
        }
        
        // Rebuild decorations
        cachedMenuDecorations = buildMenuDecorations(newEditorState.doc, editor);
        return cachedMenuDecorations;
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });
}

function buildMenuDecorations(doc: any, editor: any): DecorationSet {
  const decorations: Decoration[] = [];
  
  doc.descendants((node: any, pos: number) => {
    if (node.type.name === 'tableCell' || node.type.name === 'tableHeader') {
      const widget = Decoration.widget(pos + 1, (view) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-cell-menu-wrapper ProseMirror-widget';
        wrapper.setAttribute('contenteditable', 'false');
        wrapper.style.cssText = 'position:absolute;top:2px;right:2px;z-index:50;pointer-events:auto;';
        
        const button = document.createElement('button');
        button.className = 'table-cell-menu-btn';
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>';
        button.title = 'Table options';
        button.type = 'button';
        
        const isDark = document.documentElement.classList.contains('dark');
        const bgColor = isDark ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)';
        const borderColor = isDark ? 'rgba(60,60,60,0.5)' : 'rgba(200,200,200,0.5)';
        const textColor = isDark ? '#999' : '#666';
        const hoverBgColor = isDark ? '#2a2a2a' : '#f5f5f5';
        
        button.style.cssText = 'width:18px;height:18px;display:flex;align-items:center;justify-content:center;background:' + bgColor + ';border:1px solid ' + borderColor + ';border-radius:4px;cursor:pointer;opacity:0.15;transition:opacity 0.15s ease,background-color 0.15s ease,transform 0.1s ease;color:' + textColor + ';pointer-events:auto;padding:0;';
        
        button.addEventListener('mouseenter', () => {
          button.style.opacity = '1';
          button.style.background = hoverBgColor;
          button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', () => {
          const dropdown = document.querySelector('.table-cell-menu-dropdown');
          button.style.background = bgColor;
          button.style.transform = 'scale(1)';
        });
        
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const buttonRect = button.getBoundingClientRect();
          editor.chain().focus().setTextSelection(pos + 1).run();
          showTableMenu(e, editor, pos, buttonRect);
        });
        
        wrapper.appendChild(button);
        return wrapper;
      }, { side: -1, key: 'menu-' + pos });
      
      decorations.push(widget);
    }
  });
  
  return DecorationSet.create(doc, decorations);
}

function showTableMenu(event: MouseEvent, editor: any, pos: number, buttonRect: DOMRect) {
  const existingMenu = document.querySelector('.table-cell-menu-dropdown');
  if (existingMenu) existingMenu.remove();
  
  const dropdown = document.createElement('div');
  dropdown.className = 'table-cell-menu-dropdown';
  
  const dropdownWidth = 170;
  const dropdownHeight = 280;
  
  // Get the button's position relative to the viewport
  // If button is outside viewport (in scrolled container), clamp to viewport
  let btnTop = Math.max(0, Math.min(buttonRect.top, window.innerHeight));
  let btnBottom = Math.max(0, Math.min(buttonRect.bottom, window.innerHeight));
  let btnLeft = Math.max(0, Math.min(buttonRect.left, window.innerWidth));
  
  // Position dropdown below button, or above if not enough space
  let viewportTop = btnBottom + 4;
  let viewportLeft = btnLeft - dropdownWidth + buttonRect.width + 8;
  
  // Adjust horizontal position
  if (viewportLeft + dropdownWidth > window.innerWidth - 12) viewportLeft = window.innerWidth - dropdownWidth - 12;
  if (viewportLeft < 12) viewportLeft = 12;
  
  // Adjust vertical position - if dropdown would go below viewport, show above button
  if (viewportTop + dropdownHeight > window.innerHeight - 12) {
    viewportTop = btnTop - dropdownHeight - 4;
  }
  // If still outside viewport, clamp to visible area
  if (viewportTop < 12) viewportTop = 12;
  if (viewportTop + dropdownHeight > window.innerHeight - 12) {
    viewportTop = window.innerHeight - dropdownHeight - 12;
  }
  
  const isDark = document.documentElement.classList.contains('dark');
  const bgColor = isDark ? '#1f1f1f' : '#ffffff';
  const borderColor = isDark ? '#3a3a3a' : '#e5e5e5';
  const textColor = isDark ? '#e5e5e5' : '#333333';
  
  dropdown.style.cssText = 'position:fixed;top:' + viewportTop + 'px;left:' + viewportLeft + 'px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:' + bgColor + ';border:1px solid ' + borderColor + ';border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:' + textColor + ';font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;';
  
  const menuItems = [
    { label: 'Insert Column Left', icon: 'col-left', action: () => editor.chain().focus().setTextSelection(pos + 1).addColumnBefore().run() },
    { label: 'Insert Column Right', icon: 'col-right', action: () => editor.chain().focus().setTextSelection(pos + 1).addColumnAfter().run() },
    { label: 'Insert Row Above', icon: 'row-up', action: () => editor.chain().focus().setTextSelection(pos + 1).addRowBefore().run() },
    { label: 'Insert Row Below', icon: 'row-down', action: () => editor.chain().focus().setTextSelection(pos + 1).addRowAfter().run() },
    { label: 'divider' },
    { label: 'Delete Column', icon: 'delete', action: () => editor.chain().focus().setTextSelection(pos + 1).deleteColumn().run(), destructive: true },
    { label: 'Delete Row', icon: 'delete', action: () => editor.chain().focus().setTextSelection(pos + 1).deleteRow().run(), destructive: true },
    { label: 'Delete Table', icon: 'table-delete', action: () => editor.chain().focus().setTextSelection(pos + 1).deleteTable().run(), destructive: true },
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
    // Don't close if clicking inside the dropdown or on the menu button
    if (dropdown.contains(target) || target.classList.contains('table-cell-menu-btn')) {
      return;
    }
    // Don't close if clicking inside a dialog/modal overlay
    const dialog = target.closest('[role="dialog"]');
    if (dialog && dialog.contains(dropdown)) {
      return;
    }
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
