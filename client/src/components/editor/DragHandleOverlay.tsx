import { useEffect, useState, useCallback, useRef } from 'react';
import { Editor } from '@tiptap/react';

/**
 * DragHandleOverlay Component
 * 
 * Renders drag handles as an overlay on top of list items.
 * Uses actual DOM positions to place handles correctly.
 */

interface DragHandleOverlayProps {
  editor: Editor | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface ListItemPosition {
  id: string;
  top: number;
  left: number;
  pos: number;
  nodeType: string;
}

// SVG icon for the drag handle (6-dot grip pattern)
const DragHandleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="9" cy="5" r="1.5"/>
    <circle cx="9" cy="12" r="1.5"/>
    <circle cx="9" cy="19" r="1.5"/>
    <circle cx="15" cy="5" r="1.5"/>
    <circle cx="15" cy="12" r="1.5"/>
    <circle cx="15" cy="19" r="1.5"/>
  </svg>
);

export function DragHandleOverlay({ editor, containerRef }: DragHandleOverlayProps) {
  const [listItems, setListItems] = useState<ListItemPosition[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragDataRef = useRef<{ pos: number; nodeType: string } | null>(null);

  // Update list item positions
  const updatePositions = useCallback(() => {
    if (!containerRef.current || !editor) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const scrollTop = container.scrollTop;

    const items: ListItemPosition[] = [];
    const proseMirror = container.querySelector('.ProseMirror');
    if (!proseMirror) return;

    // Get all list items from the DOM
    const listItemElements = proseMirror.querySelectorAll('li');
    
    // Map DOM elements to ProseMirror positions
    const { state } = editor;
    let domIndex = 0;

    state.doc.descendants((node, pos) => {
      if (node.type.name === 'listItem' || node.type.name === 'taskItem') {
        const domElement = listItemElements[domIndex];
        if (domElement) {
          const rect = domElement.getBoundingClientRect();
          items.push({
            id: `item-${pos}`,
            top: rect.top - containerRect.top + scrollTop,
            left: rect.left - containerRect.left,
            pos,
            nodeType: node.type.name,
          });
        }
        domIndex++;
      }
    });

    setListItems(items);
  }, [editor, containerRef]);

  // Update positions on editor changes and scroll
  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      requestAnimationFrame(updatePositions);
    };

    editor.on('update', handleUpdate);
    editor.on('selectionUpdate', handleUpdate);

    // Initial update
    handleUpdate();

    // Update on scroll
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleUpdate);
    }

    // Update on window resize
    window.addEventListener('resize', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
      editor.off('selectionUpdate', handleUpdate);
      if (container) {
        container.removeEventListener('scroll', handleUpdate);
      }
      window.removeEventListener('resize', handleUpdate);
    };
  }, [editor, updatePositions, containerRef]);

  // Handle drag start
  const handleDragStart = useCallback((e: React.DragEvent, item: ListItemPosition) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', '');
    dragDataRef.current = { pos: item.pos, nodeType: item.nodeType };
    setDraggingId(item.id);
  }, []);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    setDragOverId(null);
    dragDataRef.current = null;
  }, []);

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent, item: ListItemPosition) => {
    e.preventDefault();
    if (item.id !== draggingId) {
      setDragOverId(item.id);
    }
  }, [draggingId]);

  // Handle drag leave
  const handleDragLeave = useCallback(() => {
    setDragOverId(null);
  }, []);

  // Handle drop
  const handleDrop = useCallback((e: React.DragEvent, targetItem: ListItemPosition) => {
    e.preventDefault();
    
    if (!editor || !dragDataRef.current) return;
    
    const { pos: fromPos } = dragDataRef.current;
    const targetPos = targetItem.pos;
    
    // Don't move to the same position
    if (fromPos === targetPos) {
      handleDragEnd();
      return;
    }

    const { state, dispatch } = editor.view;
    const fromNode = state.doc.nodeAt(fromPos);
    
    if (!fromNode) {
      handleDragEnd();
      return;
    }

    try {
      const fromEnd = fromPos + fromNode.nodeSize;
      let tr = state.tr;
      
      // If moving down, we need to adjust positions
      if (targetPos > fromPos) {
        // Insert at target first, then delete from source
        tr = tr.insert(targetPos, fromNode);
        tr = tr.delete(fromPos, fromEnd);
      } else {
        // Delete from source first, then insert at target
        tr = tr.delete(fromPos, fromEnd);
        tr = tr.insert(targetPos, fromNode);
      }

      dispatch(tr);
    } catch (error) {
      console.error('Drop error:', error);
    }

    handleDragEnd();
  }, [editor, handleDragEnd]);

  if (!editor || listItems.length === 0) return null;

  return (
    <div className="drag-handle-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 5 }}>
      {listItems.map((item) => (
        <div
          key={item.id}
          className={`list-drag-handle-wrapper ${draggingId === item.id ? 'is-dragging' : ''} ${dragOverId === item.id ? 'drag-over' : ''}`}
          style={{
            position: 'absolute',
            top: item.top + 2,
            left: item.left - 28,
            pointerEvents: 'auto',
          }}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, item)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, item)}
        >
          <div className="list-drag-handle">
            <DragHandleIcon />
          </div>
        </div>
      ))}
    </div>
  );
}

export default DragHandleOverlay;
