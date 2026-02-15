import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Editor } from '@tiptap/react';
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
 * DESIGN: Table Cell Menu Component
 * A 3-dot menu that appears on table cells with context menu options
 * for table manipulation (insert/delete rows/columns, copy table, etc.)
 * Uses React portal to escape overflow containers.
 */

interface TableCellMenuProps {
  editor: Editor;
}

export function TableCellMenu({ editor }: TableCellMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number; flipped: boolean }>({ top: 0, left: 0, flipped: false });
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Update dropdown position when open
  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const dropdownHeight = 320; // estimated max height
    const dropdownWidth = 200;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const padding = 8;

    // Check if there's enough space below
    const spaceBelow = viewportHeight - rect.bottom;
    const flipped = spaceBelow < dropdownHeight + padding && rect.top > dropdownHeight + padding;

    let top = flipped ? rect.top - dropdownHeight - 4 : rect.bottom + 4;
    let left = rect.left;

    // Keep within horizontal bounds
    if (left + dropdownWidth > viewportWidth - padding) {
      left = viewportWidth - dropdownWidth - padding;
    }
    if (left < padding) {
      left = padding;
    }

    // Keep within vertical bounds
    top = Math.max(padding, Math.min(viewportHeight - dropdownHeight - padding, top));

    setDropdownPos({ top, left, flipped });
  }, []);

  // Reposition on scroll/resize
  useEffect(() => {
    if (!isOpen) return;
    updatePosition();

    const handleReposition = () => {
      requestAnimationFrame(updatePosition);
    };

    window.addEventListener('scroll', handleReposition, true);
    window.addEventListener('resize', handleReposition);

    return () => {
      window.removeEventListener('scroll', handleReposition, true);
      window.removeEventListener('resize', handleReposition);
    };
  }, [isOpen, updatePosition]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
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

  const insertColumnBefore = useCallback(() => {
    handleMenuAction(() => editor.chain().focus().addColumnBefore().run());
  }, [editor, handleMenuAction]);

  const insertColumnAfter = useCallback(() => {
    handleMenuAction(() => editor.chain().focus().addColumnAfter().run());
  }, [editor, handleMenuAction]);

  const insertRowBefore = useCallback(() => {
    handleMenuAction(() => editor.chain().focus().addRowBefore().run());
  }, [editor, handleMenuAction]);

  const insertRowAfter = useCallback(() => {
    handleMenuAction(() => editor.chain().focus().addRowAfter().run());
  }, [editor, handleMenuAction]);

  const deleteColumn = useCallback(() => {
    handleMenuAction(() => editor.chain().focus().deleteColumn().run());
  }, [editor, handleMenuAction]);

  const deleteRow = useCallback(() => {
    handleMenuAction(() => editor.chain().focus().deleteRow().run());
  }, [editor, handleMenuAction]);

  const deleteTable = useCallback(() => {
    handleMenuAction(() => editor.chain().focus().deleteTable().run());
  }, [editor, handleMenuAction]);

  const copyTable = useCallback(() => {
    const { state } = editor;
    const { selection } = state;
    
    let tablePos = -1;
    
    state.doc.descendants((node, pos) => {
      if (node.type.name === 'table') {
        if (pos <= selection.from && pos + node.nodeSize >= selection.to) {
          tablePos = pos;
          return false;
        }
      }
      return true;
    });

    if (tablePos >= 0) {
      const tableElement = editor.view.domAtPos(tablePos + 1).node as HTMLElement;
      const table = tableElement.closest('table');
      
      if (table) {
        const clonedTable = table.cloneNode(true) as HTMLTableElement;
        clonedTable.removeAttribute('data-pm-slice');
        clonedTable.querySelectorAll('[data-node-view-wrapper]').forEach(el => {
          el.removeAttribute('data-node-view-wrapper');
        });
        
        const htmlContent = clonedTable.outerHTML;
        
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

        navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([htmlContent], { type: 'text/html' }),
            'text/plain': new Blob([plainText], { type: 'text/plain' }),
          })
        ]).catch(() => {
          navigator.clipboard.writeText(plainText);
        });
      }
    }
    
    setIsOpen(false);
  }, [editor]);

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
          setIsOpen(!isOpen);
        }}
        className="table-cell-menu-button"
        title="Table options"
      >
        <MoreVertical size={14} />
      </button>
      
      {isOpen && createPortal(
        <div 
          ref={menuRef}
          className="table-cell-menu-dropdown"
          style={{
            position: 'fixed',
            top: `${dropdownPos.top}px`,
            left: `${dropdownPos.left}px`,
            zIndex: 99999,
            pointerEvents: 'auto',
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
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

export default TableCellMenu;
