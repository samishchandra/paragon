import { useEffect, useState, useCallback, useRef, useMemo, memo } from 'react';
import { Editor } from '@tiptap/react';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { throttle } from './utils/performance';

/**
 * DragHandleOverlay Component
 * 
 * Renders drag handles as an overlay on top of list items.
 * Uses mouse events (not native drag/drop) to avoid text insertion bugs.
 * List items are treated as atomic blocks that can only be reordered.
 * 
 * Key fix: Uses node.copy() to create a deep clone of the entire node,
 * ensuring all content (including nested lists) moves together.
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
  nodeSize: number;
  nodeType: string;
  element: Element;
  domIndex: number;
}

interface DropTarget {
  targetItem: ListItemPosition;
  insertBefore: boolean;
  indicatorTop: number;
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

const MAX_VISIBLE_HANDLES = 100;
const POSITION_UPDATE_THROTTLE = 100;

/**
 * Safely move a list item from one position to another.
 * This function ensures the entire node (including nested content) moves as one unit.
 */
function moveListItem(
  editor: Editor,
  sourcePos: number,
  targetPos: number,
  insertBefore: boolean
): boolean {
  const { state, view } = editor;
  const { doc, tr } = state;
  
  // Get the source node
  const sourceNode = doc.nodeAt(sourcePos);
  if (!sourceNode) {
    console.error('Source node not found at position', sourcePos);
    return false;
  }
  
  // Get the target node
  const targetNode = doc.nodeAt(targetPos);
  if (!targetNode) {
    console.error('Target node not found at position', targetPos);
    return false;
  }
  
  const sourceEnd = sourcePos + sourceNode.nodeSize;
  
  // Calculate the actual insert position
  let insertPos: number;
  if (insertBefore) {
    insertPos = targetPos;
  } else {
    insertPos = targetPos + targetNode.nodeSize;
  }
  
  // Don't move if we're dropping at the same position
  if (insertPos === sourcePos || insertPos === sourceEnd) {
    return false;
  }
  
  // Check if we're trying to drop within the source node itself
  if (insertPos > sourcePos && insertPos < sourceEnd) {
    return false;
  }
  
  try {
    // Create a deep copy of the source node
    // This ensures all nested content is preserved
    const nodeCopy = sourceNode.copy(sourceNode.content);
    
    // Determine if we're moving up or down
    const movingDown = sourcePos < insertPos;
    
    if (movingDown) {
      // When moving down:
      // 1. First insert the copy at the target position
      // 2. Then delete the original (position doesn't shift because insert is after)
      const adjustedInsertPos = insertPos - sourceNode.nodeSize;
      
      // Delete the source first
      tr.delete(sourcePos, sourceEnd);
      // Insert at adjusted position (since we deleted before it)
      tr.insert(adjustedInsertPos, nodeCopy);
    } else {
      // When moving up:
      // 1. First insert the copy at the target position
      // 2. Then delete the original (which has shifted by the inserted size)
      
      // Insert the copy first
      tr.insert(insertPos, nodeCopy);
      // Delete the original (now shifted by the size of the inserted node)
      const adjustedSourcePos = sourcePos + sourceNode.nodeSize;
      const adjustedSourceEnd = adjustedSourcePos + sourceNode.nodeSize;
      tr.delete(adjustedSourcePos, adjustedSourceEnd);
    }
    
    // Dispatch the transaction
    view.dispatch(tr);
    return true;
  } catch (error) {
    console.error('Error moving list item:', error);
    return false;
  }
}

export function DragHandleOverlay({ editor, containerRef }: DragHandleOverlayProps) {
  const [listItems, setListItems] = useState<ListItemPosition[]>([]);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);
  
  const dragStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggedItemRef = useRef<ListItemPosition | null>(null);
  const lastItemCountRef = useRef<number>(0);

  // Update list item positions
  const updatePositions = useCallback(() => {
    if (!containerRef.current || !editor || editor.isDestroyed) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const scrollTop = container.scrollTop;
    const viewportHeight = container.clientHeight;

    const items: ListItemPosition[] = [];
    const proseMirror = container.querySelector('.ProseMirror');
    if (!proseMirror) return;

    const listItemElements = proseMirror.querySelectorAll('li');
    
    if (listItemElements.length === 0) {
      if (lastItemCountRef.current !== 0) {
        setListItems([]);
        lastItemCountRef.current = 0;
      }
      return;
    }

    const { state } = editor;
    let domIndex = 0;
    let visibleCount = 0;

    const viewportTop = scrollTop - viewportHeight;
    const viewportBottom = scrollTop + viewportHeight * 2;

    state.doc.descendants((node, pos) => {
      if (node.type.name === 'listItem' || node.type.name === 'taskItem') {
        const domElement = listItemElements[domIndex];
        if (domElement) {
          const rect = domElement.getBoundingClientRect();
          const itemTop = rect.top - containerRect.top + scrollTop;
          
          if (itemTop >= viewportTop && itemTop <= viewportBottom) {
            items.push({
              id: `item-${domIndex}`,
              top: itemTop,
              left: rect.left - containerRect.left,
              height: rect.height,
              pos,
              nodeSize: node.nodeSize,
              nodeType: node.type.name,
              element: domElement,
              domIndex,
            });
            visibleCount++;
            
            if (visibleCount >= MAX_VISIBLE_HANDLES) {
              return false;
            }
          }
        }
        domIndex++;
      }
    });

    if (items.length !== lastItemCountRef.current || 
        (items.length > 0 && items[0].top !== listItems[0]?.top)) {
      setListItems(items);
      lastItemCountRef.current = items.length;
    }
  }, [editor, containerRef, listItems]);

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
    requestAnimationFrame(updatePositions);

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleUpdate, { passive: true });
    }
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

  // Track mouse position for hover
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) return;
      
      const containerRect = container.getBoundingClientRect();
      const mouseY = e.clientY - containerRect.top + container.scrollTop;
      const mouseX = e.clientX - containerRect.left;
      
      let foundItem: string | null = null;
      for (const item of listItems) {
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
      if (!isDragging) {
        setHoveredItemId(null);
      }
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef, listItems, hoveredItemId, isDragging]);

  // Handle mouse down on drag handle - start potential drag
  const handleMouseDown = useCallback((e: React.MouseEvent, item: ListItemPosition) => {
    e.preventDefault();
    e.stopPropagation();
    
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    draggedItemRef.current = item;
    setDraggedItemId(item.id);
    
    // Add dragging class
    item.element.classList.add('is-dragging');
  }, []);

  // Handle global mouse move for dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!dragStartPosRef.current || !draggedItemRef.current) return;
      
      const container = containerRef.current;
      if (!container) return;
      
      // Check if we've moved enough to start dragging
      const dx = e.clientX - dragStartPosRef.current.x;
      const dy = e.clientY - dragStartPosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5 && !isDragging) {
        setIsDragging(true);
      }
      
      if (!isDragging && distance <= 5) return;
      
      // Calculate drop target
      const containerRect = container.getBoundingClientRect();
      const mouseY = e.clientY - containerRect.top + container.scrollTop;
      
      let newDropTarget: DropTarget | null = null;
      const draggedItem = draggedItemRef.current;
      
      // Find the closest item to drop near
      for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];
        
        // Skip the dragged item itself
        if (item.id === draggedItem.id) continue;
        
        const itemMiddle = item.top + item.height / 2;
        
        // Check if mouse is within range of this item
        if (mouseY >= item.top - 10 && mouseY <= item.top + item.height + 10) {
          if (mouseY < itemMiddle) {
            // Drop before this item
            newDropTarget = {
              targetItem: item,
              insertBefore: true,
              indicatorTop: item.top,
            };
          } else {
            // Drop after this item
            newDropTarget = {
              targetItem: item,
              insertBefore: false,
              indicatorTop: item.top + item.height,
            };
          }
          break;
        }
      }
      
      // If no target found, check if we're above the first item or below the last
      if (!newDropTarget && listItems.length > 0) {
        const firstItem = listItems.find(item => item.id !== draggedItem.id);
        const lastItem = [...listItems].reverse().find(item => item.id !== draggedItem.id);
        
        if (firstItem && mouseY < firstItem.top) {
          newDropTarget = {
            targetItem: firstItem,
            insertBefore: true,
            indicatorTop: firstItem.top,
          };
        } else if (lastItem && mouseY > lastItem.top + lastItem.height) {
          newDropTarget = {
            targetItem: lastItem,
            insertBefore: false,
            indicatorTop: lastItem.top + lastItem.height,
          };
        }
      }
      
      setDropTarget(newDropTarget);
    };

    const handleGlobalMouseUp = () => {
      if (!draggedItemRef.current || !editor || editor.isDestroyed) {
        cleanup();
        return;
      }
      
      if (isDragging && dropTarget) {
        const sourceItem = draggedItemRef.current;
        
        // Perform the move using our robust function
        const success = moveListItem(
          editor,
          sourceItem.pos,
          dropTarget.targetItem.pos,
          dropTarget.insertBefore
        );
        
        if (!success) {
          console.log('Move was not performed (same position or invalid)');
        }
      }
      
      cleanup();
    };

    const cleanup = () => {
      // Remove dragging class from all items
      listItems.forEach(item => {
        item.element.classList.remove('is-dragging');
      });
      
      dragStartPosRef.current = null;
      draggedItemRef.current = null;
      setIsDragging(false);
      setDraggedItemId(null);
      setDropTarget(null);
    };

    if (draggedItemId) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [draggedItemId, isDragging, dropTarget, listItems, editor, containerRef]);

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
      {isDragging && dropTarget && (
        <div
          className="drop-indicator"
          style={{
            position: 'absolute',
            top: dropTarget.indicatorTop - 2,
            left: listItems[0]?.left - 10 || 0,
            width: 300,
            height: 3,
            backgroundColor: 'var(--primary)',
            borderRadius: 2,
            pointerEvents: 'none',
            zIndex: 10,
            boxShadow: '0 0 8px var(--primary)',
          }}
        />
      )}
      
      {listItems.map((item) => {
        const isHovered = hoveredItemId === item.id;
        const isBeingDragged = draggedItemId === item.id;
        const isVisible = isHovered || isBeingDragged || isDragging;
        
        return (
          <div
            key={item.id}
            className={`list-drag-handle-wrapper ${isBeingDragged ? 'is-dragging' : ''}`}
            style={{
              position: 'absolute',
              top: item.top + 2,
              left: item.left - 28,
              pointerEvents: 'auto',
              opacity: isVisible ? (isHovered || isBeingDragged ? 1 : 0.4) : 0,
              transition: isDragging ? 'none' : 'opacity 0.15s ease',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={(e) => handleMouseDown(e, item)}
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
