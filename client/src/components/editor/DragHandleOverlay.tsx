import { useEffect, useState, useCallback, useRef, useMemo, memo } from 'react';
import { Editor } from '@tiptap/react';
import { throttle } from './utils/performance';

/**
 * DragHandleOverlay Component (Performance Optimized)
 * 
 * Renders drag handles as an overlay on top of list items.
 * Uses throttled position updates and viewport-based virtualization
 * for smooth performance with large documents.
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

// Memoized SVG icon for the drag handle (6-dot grip pattern)
const DragHandleIcon = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="9" cy="5" r="1.5"/>
    <circle cx="9" cy="12" r="1.5"/>
    <circle cx="9" cy="19" r="1.5"/>
    <circle cx="15" cy="5" r="1.5"/>
    <circle cx="15" cy="12" r="1.5"/>
    <circle cx="15" cy="19" r="1.5"/>
  </svg>
));
DragHandleIcon.displayName = 'DragHandleIcon';

// Memoized drag handle item component
const DragHandleItem = memo(({ 
  item, 
  isDragging, 
  isDragOver,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
}: {
  item: ListItemPosition;
  isDragging: boolean;
  isDragOver: boolean;
  onDragStart: (e: React.DragEvent, item: ListItemPosition) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent, item: ListItemPosition) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, item: ListItemPosition) => void;
}) => (
  <div
    className={`list-drag-handle-wrapper ${isDragging ? 'is-dragging' : ''} ${isDragOver ? 'drag-over' : ''}`}
    style={{
      position: 'absolute',
      top: item.top + 2,
      left: item.left - 28,
      pointerEvents: 'auto',
    }}
    draggable
    onDragStart={(e) => onDragStart(e, item)}
    onDragEnd={onDragEnd}
    onDragOver={(e) => onDragOver(e, item)}
    onDragLeave={onDragLeave}
    onDrop={(e) => onDrop(e, item)}
  >
    <div className="list-drag-handle">
      <DragHandleIcon />
    </div>
  </div>
));
DragHandleItem.displayName = 'DragHandleItem';

// Maximum number of list items to render handles for (performance limit)
const MAX_VISIBLE_HANDLES = 100;

// Throttle delay for position updates (ms)
const POSITION_UPDATE_THROTTLE = 100;

export function DragHandleOverlay({ editor, containerRef }: DragHandleOverlayProps) {
  const [listItems, setListItems] = useState<ListItemPosition[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragDataRef = useRef<{ pos: number; nodeType: string } | null>(null);
  const lastItemCountRef = useRef<number>(0);

  // Update list item positions with performance optimizations
  const updatePositions = useCallback(() => {
    if (!containerRef.current || !editor || editor.isDestroyed) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const scrollTop = container.scrollTop;
    const viewportHeight = container.clientHeight;

    const items: ListItemPosition[] = [];
    const proseMirror = container.querySelector('.ProseMirror');
    if (!proseMirror) return;

    // Get all list items from the DOM
    const listItemElements = proseMirror.querySelectorAll('li');
    
    // Early exit if no list items
    if (listItemElements.length === 0) {
      if (lastItemCountRef.current !== 0) {
        setListItems([]);
        lastItemCountRef.current = 0;
      }
      return;
    }

    // Map DOM elements to ProseMirror positions
    // Only process items within or near the viewport for large documents
    const { state } = editor;
    let domIndex = 0;
    let visibleCount = 0;

    // Calculate viewport bounds with buffer for smooth scrolling
    const viewportTop = scrollTop - viewportHeight;
    const viewportBottom = scrollTop + viewportHeight * 2;

    state.doc.descendants((node, pos) => {
      if (node.type.name === 'listItem' || node.type.name === 'taskItem') {
        const domElement = listItemElements[domIndex];
        if (domElement) {
          const rect = domElement.getBoundingClientRect();
          const itemTop = rect.top - containerRect.top + scrollTop;
          
          // Only include items within or near the viewport (virtualization)
          if (itemTop >= viewportTop && itemTop <= viewportBottom) {
            items.push({
              id: `item-${pos}`,
              top: itemTop,
              left: rect.left - containerRect.left,
              pos,
              nodeType: node.type.name,
            });
            visibleCount++;
            
            // Limit number of handles for very large documents
            if (visibleCount >= MAX_VISIBLE_HANDLES) {
              return false; // Stop traversal
            }
          }
        }
        domIndex++;
      }
    });

    // Only update state if items changed
    if (items.length !== lastItemCountRef.current || 
        (items.length > 0 && items[0].top !== listItems[0]?.top)) {
      setListItems(items);
      lastItemCountRef.current = items.length;
    }
  }, [editor, containerRef, listItems]);

  // Create throttled version of updatePositions
  const throttledUpdatePositions = useMemo(
    () => throttle(updatePositions, POSITION_UPDATE_THROTTLE),
    [updatePositions]
  );

  // Update positions on editor changes and scroll
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;

    const handleUpdate = () => {
      // Use requestAnimationFrame for smooth updates
      requestAnimationFrame(throttledUpdatePositions);
    };

    editor.on('update', handleUpdate);
    editor.on('selectionUpdate', handleUpdate);

    // Initial update (immediate, not throttled)
    requestAnimationFrame(updatePositions);

    // Update on scroll (throttled)
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleUpdate, { passive: true });
    }

    // Update on window resize (throttled)
    window.addEventListener('resize', handleUpdate, { passive: true });

    return () => {
      editor.off('update', handleUpdate);
      editor.off('selectionUpdate', handleUpdate);
      if (container) {
        container.removeEventListener('scroll', handleUpdate);
      }
      window.removeEventListener('resize', handleUpdate);
    };
  }, [editor, throttledUpdatePositions, updatePositions, containerRef]);

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
    
    if (!editor || editor.isDestroyed || !dragDataRef.current) return;
    
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

  // Don't render if no editor or no items
  if (!editor || editor.isDestroyed || listItems.length === 0) return null;

  return (
    <div 
      className="drag-handle-overlay" 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        pointerEvents: 'none', 
        zIndex: 5,
        // Use CSS containment for better performance
        contain: 'layout style',
      }}
    >
      {listItems.map((item) => (
        <DragHandleItem
          key={item.id}
          item={item}
          isDragging={draggingId === item.id}
          isDragOver={dragOverId === item.id}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}

export default memo(DragHandleOverlay);
