/**
 * ItemCard Component — Outer wrapper for a single item row.
 * 
 * Handles:
 * - Selected / hover background styling
 * - Swipe-to-reveal actions (mobile)
 * - Multi-select checkbox
 * - Native drag start for cross-panel dragging (to sidebar tags/lists)
 * - DragOverlay appearance
 * 
 * Delegates ALL inner rendering (icon, title, pills, menus) to ItemCardContent.
 */
import { useState, useEffect, memo } from 'react';
import {
  MoreHorizontal,
  Trash2,
  Pin,
  Copy,
  ArrowUp,
  ArrowRight,
  Sun,
  Clock,
  CheckCircle2,
  CheckSquare,
  Square,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ITEM_SELECTED, ITEM_HOVER, ITEM_DRAGGING } from '@/lib/styles';
import { Item, SectionType, Task } from '@/types';
import { useSwipeable } from 'react-swipeable';
import { ItemCardContent } from './ItemCardContent';

export interface ItemCardProps {
  item: Item;
  isSelected: boolean;
  onSelect?: () => void;
  onComplete?: () => void;
  onUncomplete?: () => void;
  onTitleChange?: (newTitle: string) => void;
  onDelete?: () => void;
  onMove?: (section: SectionType) => void;
  onPin?: () => void;
  onMoveToTop?: () => void;
  onDuplicate?: () => void;
  onDueDateChange?: (date: Date | undefined) => void;
  onTagClick?: () => void;
  isDragging?: boolean;
  tags: { id: string; name: string; color: string }[];
  dragHandleProps?: Record<string, unknown>;
  isDragDisabled?: boolean;
  searchQuery?: string;
  hideListPill?: boolean;
  isMultiSelectMode?: boolean;
  isMultiSelected?: boolean;
  selectedItemIds?: string[];
  onToggleMultiSelect?: () => void;
}

export function itemCardAreEqual(prev: ItemCardProps, next: ItemCardProps): boolean {
  if (prev.item !== next.item) {
    const p = prev.item;
    const n = next.item;
    if (
      p.id !== n.id ||
      p.title !== n.title ||
      p.type !== n.type ||
      p.section !== n.section ||
      p.isPinned !== n.isPinned ||
      p.order !== n.order ||
      p.updatedAt !== n.updatedAt ||
      p.content !== n.content ||
      p.listId !== n.listId
    ) return false;
    if (p.type === 'task' && n.type === 'task') {
      const pt = p as any;
      const nt = n as any;
      if (pt.isCompleted !== nt.isCompleted || pt.dueDate !== nt.dueDate) return false;
    }
    const pTags = (p as any).tagIds || p.tags || [];
    const nTags = (n as any).tagIds || n.tags || [];
    if (pTags.length !== nTags.length || pTags.some((t: string, i: number) => t !== nTags[i])) return false;
  }
  return (
    prev.isSelected === next.isSelected &&
    prev.isDragging === next.isDragging &&
    prev.isDragDisabled === next.isDragDisabled &&
    prev.searchQuery === next.searchQuery &&
    prev.hideListPill === next.hideListPill &&
    prev.isMultiSelectMode === next.isMultiSelectMode &&
    prev.selectedItemIds === next.selectedItemIds &&
    prev.isMultiSelected === next.isMultiSelected &&
    prev.tags === next.tags
  );
}

export const ItemCard = memo(function ItemCard({
  item,
  isSelected,
  onSelect,
  onComplete,
  onUncomplete,
  onTitleChange,
  onDelete,
  onMove,
  onPin,
  onMoveToTop,
  onDuplicate,
  onDueDateChange,
  onTagClick,
  isDragging,
  tags,
  dragHandleProps,
  isDragDisabled,
  searchQuery,
  hideListPill,
  isMultiSelectMode,
  isMultiSelected,
  selectedItemIds,
  onToggleMultiSelect,
}: ItemCardProps) {
  const itemTags = tags.filter((tag) => item.tags?.includes(tag.id));
  const isTask = item.type === 'task';
  const isCompleted = isTask && (item as Task).isCompleted;

  // Swipe state for mobile
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwipeRevealed, setIsSwipeRevealed] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const SWIPE_THRESHOLD = 80;

  const swipeHandlers = useSwipeable({
    onSwiping: (e) => {
      if (e.dir === 'Left') {
        setSwipeOffset(Math.min(e.deltaX * -1, 160));
      } else if (e.dir === 'Right' && isSwipeRevealed) {
        setSwipeOffset(Math.max(160 - e.deltaX, 0));
      }
    },
    onSwipedLeft: (e) => {
      if (Math.abs(e.deltaX) > SWIPE_THRESHOLD) {
        setSwipeOffset(160);
        setIsSwipeRevealed(true);
      } else {
        setSwipeOffset(0);
        setIsSwipeRevealed(false);
      }
    },
    onSwipedRight: () => {
      setSwipeOffset(0);
      setIsSwipeRevealed(false);
    },
    trackMouse: false,
    trackTouch: true,
    preventScrollOnSwipe: false,
    delta: 10,
    swipeDuration: 500,
  });

  // Reset swipe when deselected
  useEffect(() => {
    if (!isSelected) {
      setSwipeOffset(0);
      setIsSwipeRevealed(false);
    }
  }, [isSelected]);

  // Handle native drag start for cross-panel dragging (to sidebar tags/lists)
  const handleNativeDragStart = (e: React.DragEvent) => {
    // If in multi-select mode and this item is selected, drag all selected items
    if (isMultiSelectMode && isMultiSelected && selectedItemIds && selectedItemIds.length > 1) {
      e.dataTransfer.setData('application/json', JSON.stringify({ itemIds: selectedItemIds }));
    } else {
      e.dataTransfer.setData('application/json', JSON.stringify({ itemIds: [item.id] }));
    }
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="relative overflow-hidden border-b border-border/30">
      {/* Swipe action buttons (revealed on swipe left - mobile only) */}
      {swipeOffset > 0 && (
        <div
          className="absolute right-0 top-0 bottom-0 flex items-stretch z-0"
          style={{ width: `${swipeOffset}px` }}
        >
          <DropdownMenu open={showMobileMenu} onOpenChange={setShowMobileMenu}>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMobileMenu(true);
                }}
                className="flex-1 flex flex-col items-center justify-center gap-1 bg-muted hover:bg-muted/80 transition-colors"
                title="More options"
              >
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">More</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onPin?.();
                  setSwipeOffset(0);
                  setIsSwipeRevealed(false);
                  setShowMobileMenu(false);
                }}
              >
                <Pin className="w-4 h-4 mr-2" />
                {item.isPinned ? 'Unpin' : 'Pin'}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate?.();
                  setSwipeOffset(0);
                  setIsSwipeRevealed(false);
                  setShowMobileMenu(false);
                }}
              >
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveToTop?.();
                  setSwipeOffset(0);
                  setIsSwipeRevealed(false);
                  setShowMobileMenu(false);
                }}
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Move to top
              </DropdownMenuItem>
              {item.type === 'task' && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Move to
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => {
                        onMove?.('now');
                        setSwipeOffset(0);
                        setIsSwipeRevealed(false);
                        setShowMobileMenu(false);
                      }}>
                        <Sun className="w-4 h-4 mr-2 text-amber-500" />
                        Do
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        onMove?.('later');
                        setSwipeOffset(0);
                        setIsSwipeRevealed(false);
                        setShowMobileMenu(false);
                      }}>
                        <Clock className="w-4 h-4 mr-2 text-sky-500" />
                        Later
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        onMove?.('completed');
                        setSwipeOffset(0);
                        setIsSwipeRevealed(false);
                        setShowMobileMenu(false);
                      }}>
                        <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />
                        Completed
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.();
                  setSwipeOffset(0);
                  setIsSwipeRevealed(false);
                  setShowMobileMenu(false);
                }}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
              setSwipeOffset(0);
              setIsSwipeRevealed(false);
            }}
            className="flex-1 flex flex-col items-center justify-center gap-1 bg-destructive hover:bg-destructive/90 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-5 h-5 text-destructive-foreground" />
            <span className="text-xs text-destructive-foreground">Delete</span>
          </button>
        </div>
      )}

      {/* Main content with swipe transform */}
      <div
        {...swipeHandlers}
        onClick={onSelect}
        draggable={isDragDisabled || (isMultiSelectMode && isMultiSelected)}
        onDragStart={(isDragDisabled || (isMultiSelectMode && isMultiSelected)) ? handleNativeDragStart : undefined}
        {...(!isDragDisabled ? dragHandleProps : {})}
        style={{
          transform: `translateX(-${swipeOffset}px)`,
          transition: swipeOffset === 0 || swipeOffset === 160 ? 'transform 0.2s ease-out' : 'none',
        }}
        className={cn(
          'group relative py-3 pr-3 pl-3 transition-colors duration-150 cursor-pointer select-none bg-background',
          isSelected
            ? ITEM_SELECTED
            : 'bg-transparent ' + ITEM_HOVER,
          isDragging && ITEM_DRAGGING
        )}
      >
        <div className="flex items-start gap-0">
          {/* Multi-select checkbox */}
          {isMultiSelectMode && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleMultiSelect?.();
              }}
              className="shrink-0 mt-0.5 mr-2"
            >
              {isMultiSelected ? (
                <CheckSquare className="w-4 h-4 text-primary" />
              ) : (
                <Square className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
              )}
            </button>
          )}

          {/* Shared inner content */}
          <ItemCardContent
            item={item}
            isCompleted={isCompleted}
            isTask={isTask}
            itemTags={itemTags}
            searchQuery={searchQuery}
            hideListPill={hideListPill}
            onComplete={onComplete ? () => onComplete() : undefined}
            onUncomplete={onUncomplete ? () => onUncomplete() : undefined}
            onPin={onPin ? () => onPin() : undefined}
            onDelete={onDelete ? () => onDelete() : undefined}
            onMove={onMove ? (_id, section) => onMove(section) : undefined}
            onMoveToTop={onMoveToTop ? () => onMoveToTop() : undefined}
            onDuplicate={onDuplicate ? () => onDuplicate() : undefined}
            onDateChange={onDueDateChange ? (_id, date) => onDueDateChange(date ? new Date(date) : undefined) : undefined}
            onTitleChange={onTitleChange ? (_id, title) => onTitleChange(title) : undefined}
            allowInlineEdit={true}
          />
        </div>
      </div>
    </div>
  );
}, itemCardAreEqual);
