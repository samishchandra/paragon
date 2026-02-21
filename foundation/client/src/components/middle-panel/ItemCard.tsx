/**
 * ItemCard Component — Renders a single item (task or note) in the middle panel.
 * Supports inline title editing, swipe-to-reveal actions (mobile), confetti on completion,
 * multi-select mode, drag handle, and context menus.
 */
import { useState, useRef, useEffect, memo } from 'react';
import {
  CheckCircle2,
  Circle,
  FileText,
  Pin,
  MoreHorizontal,
  Trash2,
  ArrowRight,
  ArrowUp,
  Sun,
  Clock,
  Copy,
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
import { highlightText, getMatchSnippet } from '@/lib/highlightText';
import { Item, SectionType, Task } from '@/types';
import { motion } from 'motion/react';
import { useSwipeable } from 'react-swipeable';
import { ListPill } from '@/components/ListPill';
import { TagPill } from '@/components/TagPill';
import { DatePill } from '@/components/DatePill';
import { CheckConfetti } from '@/components/CheckConfetti';
import { linkifyTitle, extractFirstLineLink, renderFirstLineLink } from '@/lib/linkifyTitle';

export interface ItemCardProps {
  item: Item;
  isSelected: boolean;
  onSelect?: () => void;
  onComplete?: () => void;
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
  onToggleMultiSelect?: () => void;
}

export function itemCardAreEqual(prev: ItemCardProps, next: ItemCardProps): boolean {
  // Compare data props that affect rendering, skip callback references
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
    const pTags = (p as any).tagIds || [];
    const nTags = (n as any).tagIds || [];
    if (pTags.length !== nTags.length || pTags.some((t: string, i: number) => t !== nTags[i])) return false;
  }
  return (
    prev.isSelected === next.isSelected &&
    prev.isDragging === next.isDragging &&
    prev.isDragDisabled === next.isDragDisabled &&
    prev.searchQuery === next.searchQuery &&
    prev.hideListPill === next.hideListPill &&
    prev.isMultiSelectMode === next.isMultiSelectMode &&
    prev.isMultiSelected === next.isMultiSelected &&
    prev.tags === next.tags
  );
}

export const ItemCard = memo(function ItemCard({
  item,
  isSelected,
  onSelect,
  onComplete,
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
  onToggleMultiSelect,
}: ItemCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);

  const inputRef = useRef<HTMLInputElement>(null);
  
  const itemTags = tags.filter((tag) => item.tags.includes(tag.id));
  const isTask = item.type === 'task';
  const isCompleted = isTask && (item as Task).isCompleted;
  
  // Confetti state - triggers when task transitions from incomplete to complete
  const [showConfetti, setShowConfetti] = useState(false);
  const prevCompletedRef = useRef(isCompleted);
  
  useEffect(() => {
    if (isTask && isCompleted && !prevCompletedRef.current) {
      setShowConfetti(true);
    }
    prevCompletedRef.current = isCompleted;
  }, [isCompleted, isTask]);
  
  // Swipe state for mobile
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwipeRevealed, setIsSwipeRevealed] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const SWIPE_THRESHOLD = 80; // pixels to reveal actions
  
  const swipeHandlers = useSwipeable({
    onSwiping: (e) => {
      if (e.dir === 'Left') {
        setSwipeOffset(Math.min(e.deltaX * -1, 160)); // Max reveal 160px
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
    preventScrollOnSwipe: false, // Allow vertical scroll, only prevent on horizontal swipe
    delta: 10, // Minimum distance before swipe is detected
    swipeDuration: 500, // Maximum time for swipe gesture
  });
  
  // Reset swipe when item changes or is deselected
  useEffect(() => {
    if (!isSelected) {
      setSwipeOffset(0);
      setIsSwipeRevealed(false);
    }
  }, [isSelected]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditTitle(item.title);
  }, [item.title]);

  const handleTitleSubmit = () => {
    if (editTitle.trim() && editTitle !== item.title) {
      onTitleChange?.(editTitle.trim());
    } else {
      setEditTitle(item.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setEditTitle(item.title);
      setIsEditing(false);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  // Handle native drag start for cross-panel dragging (to tags)
  const handleNativeDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ itemId: item.id }));
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
              {/* Pin/Unpin option */}
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
              {/* Duplicate option */}
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
              {/* Move to top option */}
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
        draggable={isDragDisabled}
        onDragStart={isDragDisabled ? handleNativeDragStart : undefined}
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

      {/* Flexbox layout for icon and content */}
      <div className="flex items-start gap-2">
        {/* Multi-select checkbox */}
        {isMultiSelectMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMultiSelect?.();
            }}
            className="shrink-0 mt-0.5"
          >
            {isMultiSelected ? (
              <CheckSquare className="w-4 h-4 text-primary" />
            ) : (
              <Square className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
            )}
          </button>
        )}
        
        {/* Checkbox or Icon - aligned with first line of title */}
        <div className="shrink-0 flex items-center h-[22px] relative">
          {isTask ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onComplete?.();
              }}
              className="flex items-center justify-center relative"
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className={showConfetti ? 'completion-ring-pulse' : ''}
                >
                  <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500" />
                </motion.div>
              ) : (
                <Circle className="w-[18px] h-[18px] text-muted-foreground hover:text-primary transition-colors" />
              )}
              <CheckConfetti
                trigger={showConfetti}
                onComplete={() => setShowConfetti(false)}
              />
            </button>
          ) : (
            <FileText className="w-[18px] h-[18px] text-muted-foreground" />
          )}
        </div>

        {/* Content - starts after icon, aligned with section title */}
        <div className="min-w-0 flex-1">
          {/* Title row with date pill and action icons on the right */}
          <div className="flex items-start justify-between gap-2">
            {/* Title - max 2 lines */}
            <div className="min-w-0 flex-1">
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={handleTitleSubmit}
                  onKeyDown={handleKeyDown}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    'w-full text-sm font-medium bg-transparent border-b border-primary/50 outline-none px-0 py-0',
                    isCompleted ? 'text-muted-foreground' : 'text-foreground'
                  )}
                />
              ) : (
                <h4
                  onDoubleClick={handleDoubleClick}
                  className={cn(
                    'text-sm font-medium line-clamp-2',
                    isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'
                  )}
                >
                  {searchQuery ? highlightText(item.title || 'Untitled', searchQuery) : (item.title ? linkifyTitle(item.title).elements : 'Untitled')}
                </h4>
              )}
            </div>

            {/* Right side: Pin icon → 3-dot menu (rightmost) */}
            <div className="flex items-center shrink-0">
              {/* Pin icon - hidden by default, expands on hover like Momentum */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPin?.();
                }}
                className={cn(
                  'h-5 shrink-0 rounded transition-all duration-200 overflow-hidden flex items-center justify-center',
                  item.isPinned 
                    ? 'w-5 opacity-100 text-primary hover:bg-muted' 
                    : 'w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-muted-foreground hover:text-primary hover:bg-muted'
                )}
                title={item.isPinned ? 'Unpin' : 'Pin'}
              >
                <Pin className={cn('w-3.5 h-3.5', !item.isPinned && 'rotate-45')} />
              </button>

              {/* 3-dot menu - hidden by default, appears on hover, rightmost */}
              {!isEditing && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="h-5 shrink-0 rounded transition-all duration-200 overflow-hidden flex items-center justify-center w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 hover:bg-muted"
                      title="More options"
                    >
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {/* Pin/Unpin option */}
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onPin?.();
                      }}
                    >
                      <Pin className="w-4 h-4 mr-2" />
                      {item.isPinned ? 'Unpin' : 'Pin'}
                    </DropdownMenuItem>
                    {/* Duplicate option */}
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicate?.();
                      }}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    {/* Move to top option */}
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveToTop?.();
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
                            <DropdownMenuItem onClick={() => onMove?.('now')}>
                              <Sun className="w-4 h-4 mr-2 text-amber-500" />
                              Do
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onMove?.('later')}>
                              <Clock className="w-4 h-4 mr-2 text-sky-500" />
                              Later
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onMove?.('completed')}>
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
                      }}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* First-line content link */}
          {(() => {
            const firstLink = extractFirstLineLink(item.content);
            if (firstLink) {
              return (
                <div className="mt-1">
                  {renderFirstLineLink(firstLink)}
                </div>
              );
            }
            return null;
          })()}

          {/* Preview text */}
          {item.content && !extractFirstLineLink(item.content) && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {searchQuery 
                ? highlightText(getMatchSnippet(item.content.replace(/<[^>]*>/g, ''), searchQuery, 100), searchQuery)
                : item.content.replace(/<[^>]*>/g, '').slice(0, 100)}
            </p>
          )}

          {/* Bottom row: Date pill (right-aligned) then Tags */}
          {(isTask && (item as Task).dueDate) || item.listId || itemTags.length > 0 ? (
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              {/* Date pill - rendered first, positioned at bottom-right via ml-auto if no tags */}
              {isTask && (item as Task).dueDate && (
                <DatePill
                  dueDate={(item as Task).dueDate}
                  onDateChange={(date) => onDueDateChange?.(date)}
                  size="sm"
                  showPlaceholder={false}
                />
              )}
              {/* List pill - hidden when viewing a specific list */}
              {item.listId && !hideListPill && (
                <ListPill
                  listId={item.listId}
                  itemId={item.id}
                  itemType={item.type}
                  size="sm"
                />
              )}
              {/* Tag pills - clickable to open inline tag popover */}
              {itemTags.slice(0, 3).map((tag) => (
                <TagPill
                  key={tag.id}
                  tag={tag}
                  itemId={item.id}
                  size="sm"
                />
              ))}
            </div>
          ) : null}
        </div>
          </div>
      </div>
    </div>
  );
}, itemCardAreEqual);
