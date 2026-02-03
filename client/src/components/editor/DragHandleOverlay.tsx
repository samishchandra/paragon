import { useEffect, useState, useCallback, useRef, useMemo, memo } from 'react';
import { Editor } from '@tiptap/react';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { throttle } from './utils/performance';

/**
 * DragHandleOverlay Component (Performance Optimized)
 * 
 * Renders drag handles as an overlay on top of list items.
 * Handles show only on hover over the specific list item.
 * Uses throttled position updates and viewport-based virtualization.
 * 
 * IMPORTANT: List items are treated as atomic blocks - they cannot be split
 * and can only be dropped before or after other list items, not inside them.
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
  parentListPos: number; // Position of the parent list
  depth: number; // Nesting depth
}

interface DropIndicator {
  top: number;
  left: number;
  width: number;
  position: 'before' | 'after';
  targetId: string;
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
  const [dropIndicator, setDropIndicator] = useState<DropIndicator | null>(null);
  const dragDataRef = useRef<{ 
    pos: number; 
    nodeType: string; 
    nodeSize: number;
    node: ProseMirrorNode;
    parentListPos: number;
  } | null>(null);
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

    // Track parent list positions for each item
    const parentStack: { pos: number; depth: number }[] = [];

    state.doc.descendants((node, pos, parent) => {
      // Track list containers
      if (node.type.name === 'bulletList' || node.type.name === 'orderedList' || node.type.name === 'taskList') {
        const depth = parentStack.length;
        parentStack.push({ pos, depth });
      }

      if (node.type.name === 'listItem' || node.type.name === 'taskItem') {
        const domElement = listItemElements[domIndex];
        if (domElement) {
          const rect = domElement.getBoundingClientRect();
          const itemTop = rect.top - containerRect.top + scrollTop;
          
          // Find the parent list position
          let parentListPos = 0;
          let depth = 0;
          for (let i = parentStack.length - 1; i >= 0; i--) {
            const parentInfo = parentStack[i];
            if (parentInfo.pos < pos) {
              parentListPos = parentInfo.pos;
              depth = parentInfo.depth;
              break;
            }
          }
          
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
              parentListPos,
              depth,
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
    
    // Get the node and its full size for proper movement
    const node = editor?.state.doc.nodeAt(item.pos);
    if (node) {
      dragDataRef.current = { 
        pos: item.pos, 
        nodeType: item.nodeType, 
        nodeSize: node.nodeSize,
        node: node,
        parentListPos: item.parentListPos,
      };
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
      item.element.classList.remove('is-dragging', 'drag-over-before', 'drag-over-after');
    });
    
    setDraggingId(null);
    setDropIndicator(null);
    dragDataRef.current = null;
  }, [listItems]);

  // Calculate drop position (before or after target item)
  const calculateDropPosition = useCallback((e: React.DragEvent, targetItem: ListItemPosition): 'before' | 'after' => {
    const container = containerRef.current;
    if (!container) return 'after';
    
    const containerRect = container.getBoundingClientRect();
    const mouseY = e.clientY - containerRect.top + container.scrollTop;
    const itemMiddle = targetItem.top + targetItem.height / 2;
    
    return mouseY < itemMiddle ? 'before' : 'after';
  }, [containerRef]);

  // Handle drag over - show drop indicator
  const handleDragOver = useCallback((e: React.DragEvent, item: ListItemPosition) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    // Don't allow dropping on the same item
    if (item.id === draggingId) {
      setDropIndicator(null);
      return;
    }
    
    const position = calculateDropPosition(e, item);
    
    // Update drop indicator
    const indicatorTop = position === 'before' ? item.top - 2 : item.top + item.height - 2;
    
    setDropIndicator({
      top: indicatorTop,
      left: item.left - 10,
      width: 300,
      position,
      targetId: item.id,
    });
    
    // Update visual feedback on the target element
    listItems.forEach(listItem => {
      listItem.element.classList.remove('drag-over-before', 'drag-over-after');
    });
    
    if (position === 'before') {
      item.element.classList.add('drag-over-before');
    } else {
      item.element.classList.add('drag-over-after');
    }
  }, [draggingId, calculateDropPosition, listItems]);

  // Handle drag leave
  const handleDragLeave = useCallback((item: ListItemPosition) => {
    item.element.classList.remove('drag-over-before', 'drag-over-after');
  }, []);

  // Handle drop - reorder list items as atomic blocks
  const handleDrop = useCallback((e: React.DragEvent, targetItem: ListItemPosition) => {
    e.preventDefault();
    
    // Remove visual feedback
    listItems.forEach(item => {
      item.element.classList.remove('is-dragging', 'drag-over-before', 'drag-over-after');
    });
    
    if (!editor || editor.isDestroyed || !dragDataRef.current) {
      handleDragEnd();
      return;
    }
    
    const { pos: fromPos, nodeSize, node: draggedNode } = dragDataRef.current;
    const targetPos = targetItem.pos;
    
    // Don't move to the same position
    if (fromPos === targetPos) {
      handleDragEnd();
      return;
    }

    const dropPosition = calculateDropPosition(e, targetItem);

    try {
      const { state } = editor;
      const targetNode = state.doc.nodeAt(targetPos);
      
      if (!draggedNode || !targetNode) {
        handleDragEnd();
        return;
      }

      // Calculate the actual insertion position
      // For 'before': insert at targetPos
      // For 'after': insert at targetPos + targetNode.nodeSize
      let insertPos: number;
      if (dropPosition === 'before') {
        insertPos = targetPos;
      } else {
        insertPos = targetPos + targetNode.nodeSize;
      }

      // Use a transaction to move the entire node atomically
      editor.chain()
        .focus()
        .command(({ tr, dispatch }) => {
          if (!dispatch) return false;
          
          const fromEnd = fromPos + nodeSize;
          
          // Create a deep copy of the node to preserve all content
          const nodeToMove = draggedNode.copy(draggedNode.content);
          
          // Determine the order of operations based on positions
          if (insertPos > fromPos) {
            // Moving down: We need to adjust the insert position after deletion
            // Delete first, then insert at adjusted position
            const adjustedInsertPos = insertPos - nodeSize;
            tr.delete(fromPos, fromEnd);
            tr.insert(adjustedInsertPos, nodeToMove);
          } else {
            // Moving up: Insert first, then delete at adjusted position
            tr.insert(insertPos, nodeToMove);
            // After insertion, the original node position shifts by the size of inserted node
            const adjustedFromPos = fromPos + nodeSize;
            tr.delete(adjustedFromPos, adjustedFromPos + nodeSize);
          }
          
          return true;
        })
        .run();
    } catch (error) {
      console.error('Drop error:', error);
    }

    handleDragEnd();
  }, [editor, handleDragEnd, listItems, calculateDropPosition]);

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
      {/* Drop indicator line */}
      {dropIndicator && (
        <div
          className="drop-indicator"
          style={{
            position: 'absolute',
            top: dropIndicator.top,
            left: dropIndicator.left,
            width: dropIndicator.width,
            height: 3,
            backgroundColor: 'var(--primary)',
            borderRadius: 2,
            pointerEvents: 'none',
            zIndex: 10,
            boxShadow: '0 0 4px var(--primary)',
          }}
        />
      )}
      
      {listItems.map((item) => {
        const isHovered = hoveredItemId === item.id;
        const isDragging = draggingId === item.id;
        const isVisible = isHovered || isDragging || draggingId !== null;
        
        return (
          <div
            key={item.id}
            className={`list-drag-handle-wrapper ${isDragging ? 'is-dragging' : ''}`}
            style={{
              position: 'absolute',
              top: item.top + 2,
              left: item.left - 28,
              pointerEvents: 'auto',
              opacity: isVisible ? (isHovered ? 1 : 0.4) : 0,
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
