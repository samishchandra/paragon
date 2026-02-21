/**
 * ItemCardContent — Shared rendering logic for item rows.
 * Used by both the virtualized Row (VirtualizedItemList) and the
 * non-virtualized ItemCard / DragOverlay so UI changes only need
 * to be applied in one place.
 *
 * This component renders the inner content of an item row:
 * - Checkbox / note icon
 * - Title (with search highlighting, linkification)
 * - Pin + 3-dot menu (hover-reveal, absolutely positioned)
 * - Content preview / first-line link
 * - Date pill, List pill, Tag pills
 *
 * It does NOT handle:
 * - Outer wrapper styling (selected/hover bg, border, padding)
 * - Drag transforms or layout animations
 * - Swipe-to-reveal (mobile)
 * - Multi-select checkbox
 *
 * Those concerns stay in the caller (VirtualizedItemList Row, ItemCard, etc.)
 */
import { memo, useState, useRef, useEffect, ReactElement } from 'react';
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
import { highlightText, getMatchSnippet } from '@/lib/highlightText';
import { Item, SectionType, Task, Tag } from '@/types';
import { TagPill } from '@/components/TagPill';
import { ListPill } from '@/components/ListPill';
import { DatePill } from '@/components/DatePill';
import { CheckConfetti } from '@/components/CheckConfetti';
import { linkifyTitle, extractFirstLineLink, renderFirstLineLink } from '@/lib/linkifyTitle';
import { motion } from 'motion/react';

export interface ItemCardContentProps {
  item: Item;
  isCompleted: boolean;
  isTask: boolean;
  itemTags: Tag[];
  searchQuery?: string;
  hideListPill?: boolean;
  // Callbacks — all receive itemId so the parent doesn't need closures per-row
  onComplete?: (id: string) => void;
  onUncomplete?: (id: string) => void;
  onPin?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMove?: (id: string, section: SectionType) => void;
  onMoveToTop?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDateChange?: (id: string, date: string | null) => void;
  onTitleChange?: (id: string, newTitle: string) => void;
  /** If true, show inline title editing on double-click */
  allowInlineEdit?: boolean;
}

/** Shallow comparison for memo — compares data props, skips callbacks */
export function itemCardContentAreEqual(
  prev: ItemCardContentProps,
  next: ItemCardContentProps,
): boolean {
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
    )
      return false;
    if (p.type === 'task' && n.type === 'task') {
      const pt = p as Task;
      const nt = n as Task;
      if (pt.isCompleted !== nt.isCompleted || pt.dueDate !== nt.dueDate)
        return false;
    }
    const pTags = (p as any).tagIds || p.tags || [];
    const nTags = (n as any).tagIds || n.tags || [];
    if (
      pTags.length !== nTags.length ||
      pTags.some((t: string, i: number) => t !== nTags[i])
    )
      return false;
  }
  return (
    prev.isCompleted === next.isCompleted &&
    prev.isTask === next.isTask &&
    prev.searchQuery === next.searchQuery &&
    prev.hideListPill === next.hideListPill &&
    prev.itemTags === next.itemTags &&
    prev.allowInlineEdit === next.allowInlineEdit
  );
}

export const ItemCardContent = memo(function ItemCardContent({
  item,
  isCompleted,
  isTask,
  itemTags,
  searchQuery,
  hideListPill,
  onComplete,
  onUncomplete,
  onPin,
  onDelete,
  onMove,
  onMoveToTop,
  onDuplicate,
  onDateChange,
  onTitleChange,
  allowInlineEdit,
}: ItemCardContentProps): ReactElement {
  const dueDate = isTask && (item as Task).dueDate ? (item as Task).dueDate : null;
  const firstLink = extractFirstLineLink(item.content);

  // Inline editing state (only used when allowInlineEdit is true)
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const inputRef = useRef<HTMLInputElement>(null);

  // Confetti state
  const [showConfetti, setShowConfetti] = useState(false);
  const prevCompletedRef = useRef(isCompleted);

  useEffect(() => {
    if (isTask && isCompleted && !prevCompletedRef.current) {
      setShowConfetti(true);
    }
    prevCompletedRef.current = isCompleted;
  }, [isCompleted, isTask]);

  useEffect(() => {
    setEditTitle(item.title);
  }, [item.title]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleTitleSubmit = () => {
    if (editTitle.trim() && editTitle !== item.title) {
      onTitleChange?.(item.id, editTitle.trim());
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
    if (!allowInlineEdit) return;
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompleted) {
      onUncomplete?.(item.id);
    } else {
      onComplete?.(item.id);
    }
  };

  return (
    <div className="flex items-start gap-2">
      {/* Checkbox or Note icon — aligned with first line of title */}
      <div className="shrink-0 flex items-center h-[22px] relative">
        {isTask ? (
          <button
            onClick={handleComplete}
            className="flex items-center justify-center relative"
          >
            {isCompleted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
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

      {/* Content — starts after icon */}
      <div className="min-w-0 flex-1">
        {/* Title row with pin and 3-dot icons overlaid */}
        <div className="flex items-start justify-between gap-2">
          {/* Title — max 2 lines */}
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
                  isCompleted ? 'text-muted-foreground' : 'text-foreground',
                )}
              />
            ) : (
              <h4
                onDoubleClick={handleDoubleClick}
                className={cn(
                  'text-sm font-medium line-clamp-2',
                  isCompleted
                    ? 'line-through text-muted-foreground'
                    : 'text-foreground',
                )}
              >
                {searchQuery
                  ? highlightText(
                      item.title || (isTask ? 'Untitled Task' : 'Untitled Note'),
                      searchQuery,
                    )
                  : item.title
                    ? linkifyTitle(item.title).elements
                    : isTask
                      ? 'Untitled Task'
                      : 'Untitled Note'}
              </h4>
            )}
          </div>

          {/* Right side: Pin icon → 3-dot menu (rightmost) */}
          <div className="flex items-center shrink-0">
            {/* Pin icon — hidden by default, expands on hover */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPin?.(item.id);
              }}
              className={cn(
                'h-5 shrink-0 rounded transition-all duration-200 overflow-hidden flex items-center justify-center',
                item.isPinned
                  ? 'w-5 opacity-100 text-primary hover:bg-muted'
                  : 'w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-muted-foreground hover:text-primary hover:bg-muted',
              )}
              title={item.isPinned ? 'Unpin' : 'Pin'}
            >
              <Pin
                className={cn(
                  'w-3.5 h-3.5',
                  !item.isPinned && 'rotate-45',
                )}
              />
            </button>

            {/* 3-dot menu — hidden by default, appears on hover, rightmost */}
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
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onPin?.(item.id);
                    }}
                  >
                    <Pin className="w-4 h-4 mr-2" />
                    {item.isPinned ? 'Unpin' : 'Pin'}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicate?.(item.id);
                    }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveToTop?.(item.id);
                    }}
                  >
                    <ArrowUp className="w-4 h-4 mr-2" />
                    Move to top
                  </DropdownMenuItem>
                  {isTask && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Move to
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            onClick={() => onMove?.(item.id, 'now')}
                          >
                            <Sun className="w-4 h-4 mr-2 text-amber-500" />
                            Do
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onMove?.(item.id, 'later')}
                          >
                            <Clock className="w-4 h-4 mr-2 text-sky-500" />
                            Later
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onMove?.(item.id, 'completed')}
                          >
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
                      onDelete?.(item.id);
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
        {firstLink ? (
          <div className="mt-1">{renderFirstLineLink(firstLink)}</div>
        ) : item.content && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {searchQuery
              ? highlightText(
                  getMatchSnippet(
                    item.content.replace(/<[^>]*>/g, ''),
                    searchQuery,
                    100,
                  ),
                  searchQuery,
                )
              : item.content.replace(/<[^>]*>/g, '').slice(0, 100)}
          </p>
        )}

        {/* Bottom row: Date pill, List pill, Tag pills */}
        {(dueDate ||
          (item.listId && !hideListPill) ||
          itemTags.length > 0) && (
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {dueDate && (
              <DatePill
                dueDate={dueDate}
                onDateChange={(date) =>
                  onDateChange?.(item.id, date ? date.toISOString() : null)
                }
                size="sm"
                showPlaceholder={false}
              />
            )}
            {item.listId && !hideListPill && (
              <ListPill
                listId={item.listId}
                itemId={item.id}
                itemType={item.type}
                size="sm"
              />
            )}
            {itemTags.slice(0, 3).map((tag) => (
              <TagPill
                key={tag.id}
                tag={tag}
                itemId={item.id}
                size="sm"
              />
            ))}
            {itemTags.length > 3 && (
              <span className="text-[10px] text-muted-foreground shrink-0">
                +{itemTags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}, itemCardContentAreEqual);
