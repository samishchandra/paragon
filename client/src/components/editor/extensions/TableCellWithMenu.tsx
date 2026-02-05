import { mergeAttributes, Node } from '@tiptap/core';
import TableCell from '@tiptap/extension-table-cell';
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { 
  MoreVertical, 
  ArrowLeftToLine, 
  ArrowRightToLine, 
  ArrowUpToLine, 
  ArrowDownToLine,
  Trash2,
  Copy,
  Table
} from 'lucide-react';

/*
 * DESIGN: Table Cell with Menu Extension
 * Extends the standard TableCell to include a 3-dot menu
 * for table manipulation operations
 */

interface TableCellMenuProps {
  editor: any;
  getPos: () => number;
}

function TableCellMenuComponent({ editor, getPos }: TableCellMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as HTMLElement) &&
          buttonRef.current && !buttonRef.current.contains(event.target as HTMLElement)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleMenuAction = useCallback((action: () => void) => {
    action();
    setIsOpen(false);
  }, []);

  const focusCell = useCallback(() => {
    const pos = getPos();
    if (pos !== undefined) {
      editor.chain().focus().setTextSelection(pos + 1).run();
    }
  }, [editor, getPos]);

  const insertColumnBefore = useCallback(() => {
    focusCell();
    handleMenuAction(() => editor.chain().focus().addColumnBefore().run());
  }, [editor, handleMenuAction, focusCell]);

  const insertColumnAfter = useCallback(() => {
    focusCell();
    handleMenuAction(() => editor.chain().focus().addColumnAfter().run());
  }, [editor, handleMenuAction, focusCell]);

  const insertRowBefore = useCallback(() => {
    focusCell();
    handleMenuAction(() => editor.chain().focus().addRowBefore().run());
  }, [editor, handleMenuAction, focusCell]);

  const insertRowAfter = useCallback(() => {
    focusCell();
    handleMenuAction(() => editor.chain().focus().addRowAfter().run());
  }, [editor, handleMenuAction, focusCell]);

  const deleteColumn = useCallback(() => {
    focusCell();
    handleMenuAction(() => editor.chain().focus().deleteColumn().run());
  }, [editor, handleMenuAction, focusCell]);

  const deleteRow = useCallback(() => {
    focusCell();
    handleMenuAction(() => editor.chain().focus().deleteRow().run());
  }, [editor, handleMenuAction, focusCell]);

  const deleteTable = useCallback(() => {
    focusCell();
    handleMenuAction(() => editor.chain().focus().deleteTable().run());
  }, [editor, handleMenuAction, focusCell]);

  const copyTable = useCallback(() => {
    focusCell();
    
    // Get the table HTML and copy it to clipboard
    const { state } = editor;
    const pos = getPos();
    
    // Find the table node
    let tableNode = null;
    let tablePos = -1;
    
    state.doc.descendants((node: any, nodePos: number) => {
      if (node.type.name === 'table') {
        // Check if our cell is within this table
        if (nodePos <= pos && nodePos + node.nodeSize >= pos) {
          tableNode = node;
          tablePos = nodePos;
          return false;
        }
      }
      return true;
    });

    if (tableNode && tablePos >= 0) {
      // Get the table element from the DOM
      const tableElement = editor.view.domAtPos(tablePos + 1).node as HTMLElement;
      const table = tableElement.closest('table');
      
      if (table) {
        // Clone the table and clean it up for copying
        const clonedTable = table.cloneNode(true) as HTMLTableElement;
        
        // Remove any editor-specific attributes and classes
        clonedTable.removeAttribute('data-pm-slice');
        clonedTable.querySelectorAll('[data-node-view-wrapper]').forEach(el => {
          el.removeAttribute('data-node-view-wrapper');
        });
        clonedTable.querySelectorAll('.table-cell-menu-button, .table-cell-menu-dropdown').forEach(el => {
          el.remove();
        });
        
        // Copy as both HTML and plain text
        const htmlContent = clonedTable.outerHTML;
        
        // Create plain text version
        let plainText = '';
        const rows = clonedTable.querySelectorAll('tr');
        rows.forEach((row, rowIndex) => {
          const cells = row.querySelectorAll('th, td');
          const cellTexts: string[] = [];
          cells.forEach(cell => {
            cellTexts.push(cell.textContent?.trim() || '');
          });
          plainText += cellTexts.join('\t');
          if (rowIndex < rows.length - 1) {
            plainText += '\n';
          }
        });

        // Use clipboard API
        navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([htmlContent], { type: 'text/html' }),
            'text/plain': new Blob([plainText], { type: 'text/plain' }),
          })
        ]).catch(() => {
          // Fallback to plain text copy
          navigator.clipboard.writeText(plainText);
        });
      }
    }
    
    setIsOpen(false);
  }, [editor, getPos]);

  const menuItems = [
    { label: 'Insert Column Left', icon: ArrowLeftToLine, action: insertColumnBefore, separator: false },
    { label: 'Insert Column Right', icon: ArrowRightToLine, action: insertColumnAfter, separator: false },
    { label: 'Insert Row Above', icon: ArrowUpToLine, action: insertRowBefore, separator: false },
    { label: 'Insert Row Below', icon: ArrowDownToLine, action: insertRowAfter, separator: true },
    { label: 'Delete Column', icon: Trash2, action: deleteColumn, destructive: false, separator: false },
    { label: 'Delete Row', icon: Trash2, action: deleteRow, destructive: false, separator: false },
    { label: 'Delete Table', icon: Table, action: deleteTable, destructive: true, separator: true },
    { label: 'Copy Table', icon: Copy, action: copyTable, separator: false },
  ];

  return (
    <>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const dropdownWidth = 180;
            const dropdownHeight = 320;
            
            // Clamp button position to viewport bounds
            // This handles cases where the button is in a scrollable container
            const clampedTop = Math.max(0, Math.min(rect.top, window.innerHeight));
            const clampedBottom = Math.max(0, Math.min(rect.bottom, window.innerHeight));
            const clampedLeft = Math.max(0, Math.min(rect.left, window.innerWidth));
            const clampedRight = Math.max(0, Math.min(rect.right, window.innerWidth));
            
            // Position dropdown below the button, aligned to the left of the button
            let viewportTop = clampedBottom + 4;
            let viewportLeft = clampedLeft;
            
            // If dropdown would go off the right edge, align right edge with button
            if (viewportLeft + dropdownWidth > window.innerWidth - 8) {
              viewportLeft = clampedRight - dropdownWidth;
            }
            
            // If dropdown would go off the left edge, keep minimum margin
            if (viewportLeft < 8) {
              viewportLeft = 8;
            }
            
            // If dropdown would go off the bottom, position above the button
            if (viewportTop + dropdownHeight > window.innerHeight - 8) {
              viewportTop = clampedTop - dropdownHeight - 4;
            }
            
            // Ensure minimum top position
            if (viewportTop < 8) {
              viewportTop = 8;
            }
            
            // Final clamp to ensure dropdown is always visible
            viewportTop = Math.max(8, Math.min(viewportTop, window.innerHeight - dropdownHeight - 8));
            viewportLeft = Math.max(8, Math.min(viewportLeft, window.innerWidth - dropdownWidth - 8));
            
            setMenuPosition({
              top: viewportTop,
              left: viewportLeft
            });
          }
          setIsOpen(!isOpen);
        }}
        className="table-cell-menu-button"
        title="Table options"
        contentEditable={false}
      >
        <MoreVertical size={14} />
      </button>
      
      {isOpen && createPortal(
        <div 
          ref={menuRef}
          className="table-cell-menu-dropdown"
          contentEditable={false}
          style={{ 
            top: `${menuPosition.top}px`, 
            left: `${menuPosition.left}px`,
            position: 'fixed',
            zIndex: 99999
          }}
        >
          {menuItems.map((item, index) => (
            <div key={item.label}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  item.action();
                }}
                className={`table-cell-menu-item ${item.destructive ? 'destructive' : ''}`}
              >
                <item.icon size={14} />
                <span>{item.label}</span>
              </button>
              {item.separator && index < menuItems.length - 1 && (
                <div className="table-cell-menu-separator" />
              )}
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}

// NodeView component for table cell
function TableCellNodeView(props: any) {
  const { node, editor, getPos } = props;
  
  // Get background color from attributes
  const backgroundColor = node.attrs.backgroundColor;
  const style: React.CSSProperties = {
    position: 'relative',
    ...(backgroundColor ? { backgroundColor } : {})
  };
  
  return (
    <NodeViewWrapper 
      as="td" 
      style={style}
      data-background-color={backgroundColor || undefined}
    >
      <TableCellMenuComponent editor={editor} getPos={getPos} />
      <NodeViewContent />
    </NodeViewWrapper>
  );
}

// NodeView component for table header cell
function TableHeaderNodeView(props: any) {
  const { node, editor, getPos } = props;
  
  // Get background color from attributes
  const backgroundColor = node.attrs.backgroundColor;
  const style: React.CSSProperties = {
    position: 'relative',
    ...(backgroundColor ? { backgroundColor } : {})
  };
  
  return (
    <NodeViewWrapper 
      as="th" 
      style={style}
      data-background-color={backgroundColor || undefined}
    >
      <TableCellMenuComponent editor={editor} getPos={getPos} />
      <NodeViewContent />
    </NodeViewWrapper>
  );
}

// Extended TableCell with menu
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
  
  addNodeView() {
    return ReactNodeViewRenderer(TableCellNodeView);
  },
});

// Extended TableHeader with menu
export const TableHeaderWithMenu = Node.create({
  name: 'tableHeader',
  
  content: 'block+',
  
  tableRole: 'header_cell',
  
  isolating: true,
  
  addAttributes() {
    return {
      colspan: {
        default: 1,
      },
      rowspan: {
        default: 1,
      },
      colwidth: {
        default: null,
        parseHTML: (element) => {
          const colwidth = element.getAttribute('colwidth');
          const value = colwidth ? colwidth.split(',').map((w) => parseInt(w, 10)) : null;
          return value;
        },
      },
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
  
  parseHTML() {
    return [{ tag: 'th' }];
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['th', mergeAttributes(HTMLAttributes), 0];
  },
  
  addNodeView() {
    return ReactNodeViewRenderer(TableHeaderNodeView);
  },
});

export default TableCellWithMenu;
