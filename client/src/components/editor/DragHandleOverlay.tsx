import { useEffect, useState, useCallback, useRef, useMemo, memo } from 'react';
import { Editor } from '@tiptap/react';
import { throttle } from './utils/performance';

/**
 * DragHandleOverlay Component (Performance Optimized)
 * 
 * Renders drag handles as an overlay on top of list items.
 * Handles show only on hover over the specific list item.
 * Uses throttled position updates and viewport-based virtualization.
 */

interface DragHandleOverlayProps {
  editor: Editor | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface ListItemPosition {
  id: string;
  top: number;
  left: number;
  height: number;
  pos: number;
  nodeType: string;
  element: Element;
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

// Maximum number of list items to render handles for (performance limit)
const MAX_VISIBLE_HANDLES = 100;

// Throttle delay for position updates (ms)
const POSITION_UPDATE_THROTTLE = 100;

export function DragHandleOverlay({ editor, containerRef }: DragHandleOverlayProps) {
  const [listItems, setListItems] = useState<ListItemPosition[]>([]);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragDataRef = useRef<{ pos: number; nodeType: string; nodeSize: number } | null>(null);
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
              height: rect.height,
              pos,
              nodeType: node.type.name,
              element: domElement,
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

  // Track mouse position to detect hover on list items
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (draggingId) return; // Don't update hover during drag
      
      const containerRect = container.getBoundingClientRect();
      const mouseY = e.clientY - containerRect.top + container.scrollTop;
      const mouseX = e.clientX - containerRect.left;
      
      // Find which list item the mouse is over (with some left margin for the handle)
      let foundItem: string | null = null;
      for (const item of listItems) {
        // Check if mouse is within the item's vertical bounds and near the left edge
        if (mouseY >= item.top && mouseY <= item.top + item.height && mouseX < item.left + 50) {
          foundItem = item.id;
          break;
        }
      }
      
      if (foundItem !== hoveredItemId) {
        setHoveredItemId(foundItem);
      }
    };

    const handleMouseLeave = () => {
      if (!draggingId) {
        setHoveredItemId(null);
      }
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef, listItems, hoveredItemId, draggingId]);

  // Handle drag start
  const handleDragStart = useCallback((e: React.DragEvent, item: ListItemPosition) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item.id);
    
    // Get the node size for proper deletion
    const node = editor?.state.doc.nodeAt(item.pos);
    if (node) {
      dragDataRef.current = { pos: item.pos, nodeType: item.nodeType, nodeSize: node.nodeSize };
    }
    
    setDraggingId(item.id);
    
    // Add visual feedback to the dragged element
    setTimeout(() => {
      item.element.classList.add('is-dragging');
    }, 0);
  }, [editor]);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    // Remove dragging class from all elements
    listItems.forEach(item => {
      item.element.classList.remove('is-dragging');
    });
    
    setDraggingId(null);
    setDragOverId(null);
    dragDataRef.current = null;
  }, [listItems]);

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent, item: ListItemPosition) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (item.id !== draggingId) {
      setDragOverId(item.id);
      // Add visual feedback
      item.element.classList.add('drag-over');
    }
  }, [draggingId]);

  // Handle drag leave
  const handleDragLeave = useCallback((item: ListItemPosition) => {
    item.element.classList.remove('drag-over');
    setDragOverId(null);
  }, []);

  // Handle drop - reorder list items
  const handleDrop = useCallback((e: React.DragEvent, targetItem: ListItemPosition) => {
    e.preventDefault();
    
    // Remove visual feedback
    listItems.forEach(item => {
      item.element.classList.remove('is-dragging', 'drag-over');
    });
    
    if (!editor || editor.isDestroyed || !dragDataRef.current) {
      handleDragEnd();
      return;
    }
    
    const { pos: fromPos, nodeSize } = dragDataRef.current;
    const targetPos = targetItem.pos;
    
    // Don't move to the same position
    if (fromPos === targetPos) {
      handleDragEnd();
      return;
    }

    try {
      const { state } = editor;
      const fromNode = state.doc.nodeAt(fromPos);
      
      if (!fromNode) {
        handleDragEnd();
        return;
      }

      // Use a chain of commands for atomic operation
      editor.chain()
        .focus()
        .command(({ tr, dispatch }) => {
          if (!dispatch) return false;
          
          const fromEnd = fromPos + nodeSize;
          
          // Create a copy of the node to move
          const nodeToMove = fromNode.copy(fromNode.content);
          
          if (targetPos > fromPos) {
            // Moving down: insert first, then delete
            // Adjust target position since we'll delete content before it
            const adjustedTargetPos = targetPos - nodeSize;
            tr.delete(fromPos, fromEnd);
            tr.insert(adjustedTargetPos, nodeToMove);
          } else {
            // Moving up: delete first, then insert
            tr.delete(fromPos, fromEnd);
            tr.insert(targetPos, nodeToMove);
          }
          
          return true;
        })
        .run();
    } catch (error) {
      console.error('Drop error:', error);
    }

    handleDragEnd();
  }, [editor, handleDragEnd, listItems]);

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
        contain: 'layout style',
      }}
    >
      {listItems.map((item) => {
        const isHovered = hoveredItemId === item.id;
        const isDragging = draggingId === item.id;
        const isDragOver = dragOverId === item.id;
        const isVisible = isHovered || isDragging || isDragOver || draggingId !== null;
        
        return (
          <div
            key={item.id}
            className={`list-drag-handle-wrapper ${isDragging ? 'is-dragging' : ''} ${isDragOver ? 'drag-over' : ''}`}
            style={{
              position: 'absolute',
              top: item.top + 2,
              left: item.left - 28,
              pointerEvents: 'auto',
              opacity: isVisible ? (isHovered || isDragOver ? 1 : 0.4) : 0,
              transition: 'opacity 0.15s ease',
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, item)}
            onDragLeave={() => handleDragLeave(item)}
            onDrop={(e) => handleDrop(e, item)}
            onMouseEnter={() => setHoveredItemId(item.id)}
            onMouseLeave={() => {
              if (!draggingId) setHoveredItemId(null);
            }}
          >
            <div className="list-drag-handle">
              <DragHandleIcon />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(DragHandleOverlay);
