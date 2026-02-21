/**
 * Virtualized Item List Component
 * 
 * Uses react-window v2 for efficient rendering of large lists.
 * Only renders items that are visible in the viewport.
 * 
 * Uses useDynamicRowHeight for variable-height rows that adapt
 * to content (title length, content preview, number of tags/pills).
 * 
 * Row rendering matches the rich ItemCard style:
 * - Title with pin/3-dot icons on hover (right-aligned)
 * - Content preview (1-2 lines)
 * - TagPill, ListPill, DatePill components for consistent styling
 * 
 * Performance: Uses AutoSizer renderProp (not ChildComponent) to avoid
 * remounting the List on every prop change. react-window v2's internal
 * `de()` stabilizer + `ue()` memo comparator handle row-level memoization.
 */

import { useEffect, useCallback, useRef, ReactElement } from 'react';
import { List, useListRef, useDynamicRowHeight, ListImperativeAPI } from 'react-window';
import { AutoSizer } from 'react-virtualized-auto-sizer';
import { Item, SectionType, Task, Tag } from '@/types';
import { cn } from '@/lib/utils';
import { ITEM_SELECTED, ITEM_HOVER } from '@/lib/styles';
import {
  CheckCircle2,
  Circle,
  Copy,
  FileText,
  Pin,
  MoreHorizontal,
  Trash2,
  ArrowRight,
  ArrowUp,
  Sun,
  Clock,
  Loader2,
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
import { TagPill } from '@/components/TagPill';
import { ListPill } from '@/components/ListPill';
import { DatePill } from '@/components/DatePill';
import { highlightText, getMatchSnippet } from '@/lib/highlightText';
import { linkifyTitle, extractFirstLineLink, renderFirstLineLink } from '@/lib/linkifyTitle';

// Default estimated row height — used as initial estimate before measurement
const DEFAULT_ROW_HEIGHT = 90;

interface VirtualizedItemListProps {
  items: Item[];
  selectedItemId: string | null;
  tags: Tag[];
  lists: { id: string; name: string; color: string; icon: string }[];
  searchQuery?: string;
  onSelect: (id: string) => void;
  onComplete: (id: string) => void;
  onUncomplete: (id: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, section: SectionType) => void;
  onPin: (id: string) => void;
  onMoveToTop: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDateChange?: (id: string, date: string | null) => void;
  hideListPill?: boolean;
  className?: string;
  // Infinite scroll props
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
  total?: number;
}

interface RowProps {
  items: Item[];
  selectedItemId: string | null;
  tags: Tag[];
  lists: { id: string; name: string; color: string; icon: string }[];
  searchQuery?: string;
  onSelect: (id: string) => void;
  onComplete: (id: string) => void;
  onUncomplete: (id: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, section: SectionType) => void;
  onPin: (id: string) => void;
  onMoveToTop: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDateChange?: (id: string, date: string | null) => void;
  hideListPill?: boolean;
}

interface RowComponentProps {
  index: number;
  style: React.CSSProperties;
  ariaAttributes: {
    'aria-posinset': number;
    'aria-setsize': number;
    role: 'listitem';
  };
}

// Row component for react-window v2 — rich rendering matching ItemCard
// With dynamic heights, the outer div uses style from react-window (position:absolute, top, width)
// but the inner content renders naturally without height constraints.
function Row({ 
  index, 
  style,
  items,
  selectedItemId,
  tags,
  lists,
  searchQuery,
  onSelect,
  onComplete,
  onUncomplete,
  onDelete,
  onMove,
  onPin,
  onMoveToTop,
  onDuplicate,
  onDateChange,
  hideListPill,
}: RowComponentProps & RowProps): ReactElement | null {
  const item = items[index];
  if (!item) return null;

  const isSelected = selectedItemId === item.id;
  const isTask = item.type === 'task';
  const isCompleted = isTask && (item as Task).isCompleted;
  const itemTags = tags.filter((tag: Tag) => item.tags?.includes(tag.id));
  const itemList = item.listId ? lists.find((l) => l.id === item.listId) : null;
  const dueDate = isTask && (item as Task).dueDate ? (item as Task).dueDate : null;
  const firstLink = extractFirstLineLink(item.content);

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompleted) {
      onUncomplete(item.id);
    } else {
      onComplete(item.id);
    }
  };

  // The outer div uses react-window's style (position, top, width) for positioning.
  // The inner content renders naturally — useDynamicRowHeight's ResizeObserver
  // will measure the actual height and update the list accordingly.
  return (
    <div style={style}>
      <div
        className={cn(
          "group relative py-3 pr-3 pl-3 transition-colors duration-150 cursor-pointer select-none border-b border-border/30",
          isSelected
            ? ITEM_SELECTED
            : 'bg-transparent ' + ITEM_HOVER,
        )}
        onClick={() => onSelect(item.id)}
      >
        {/* Flexbox layout for icon and content */}
        <div className="flex items-start gap-2">
          {/* Checkbox or Note icon — aligned with first line of title */}
          <div className="shrink-0 flex items-center h-[22px]">
            {isTask ? (
              <button
                onClick={handleComplete}
                className="flex items-center justify-center"
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500" />
                ) : (
                  <Circle className="w-[18px] h-[18px] text-muted-foreground hover:text-primary transition-colors" />
                )}
              </button>
            ) : (
              <FileText className="w-[18px] h-[18px] text-muted-foreground" />
            )}
          </div>

          {/* Content — starts after icon */}
          <div className="min-w-0 flex-1 flex flex-col gap-1">
            {/* Title row with pin and 3-dot icons overlaid */}
            <div className="relative">
              {/* Title — max 2 lines, pr-12 reserves space for icons */}
              <h4
                className={cn(
                  'text-sm font-medium line-clamp-2 pr-12',
                  isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'
                )}
              >
                {searchQuery
                  ? highlightText(item.title || (isTask ? 'Untitled Task' : 'Untitled Note'), searchQuery)
                  : (item.title ? linkifyTitle(item.title).elements : (isTask ? 'Untitled Task' : 'Untitled Note'))}
              </h4>

              {/* Right side: Pin icon → 3-dot menu (absolutely positioned, won't affect title reflow) */}
              <div className="absolute top-0 right-0 flex items-center">
                {/* Pin icon — hidden by default, expands on hover */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPin(item.id);
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

                {/* 3-dot menu — hidden by default, appears on hover, rightmost */}
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
                        onPin(item.id);
                      }}
                    >
                      <Pin className="w-4 h-4 mr-2" />
                      {item.isPinned ? 'Unpin' : 'Pin'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicate(item.id);
                      }}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveToTop(item.id);
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
                            <DropdownMenuItem onClick={() => onMove(item.id, 'now')}>
                              <Sun className="w-4 h-4 mr-2 text-amber-500" />
                              Do
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onMove(item.id, 'later')}>
                              <Clock className="w-4 h-4 mr-2 text-sky-500" />
                              Later
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onMove(item.id, 'completed')}>
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
                        onDelete(item.id);
                      }}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* First-line content link */}
            {firstLink ? (
              <div className="mt-0.5">
                {renderFirstLineLink(firstLink)}
              </div>
            ) : item.content ? (
              /* Content preview — 1-2 lines of note content */
              <p className="text-xs text-muted-foreground line-clamp-2">
                {searchQuery 
                  ? highlightText(getMatchSnippet(item.content.replace(/<[^>]*>/g, ''), searchQuery, 100), searchQuery)
                  : item.content.replace(/<[^>]*>/g, '').slice(0, 100)}
              </p>
            ) : null}

            {/* Bottom row: Date pill, List pill, Tag pills */}
            {(dueDate || (itemList && !hideListPill) || itemTags.length > 0) && (
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Date pill */}
                {dueDate && (
                  <DatePill
                    dueDate={dueDate}
                    onDateChange={(newDate) => onDateChange?.(item.id, newDate ? newDate.toISOString() : null)}
                    size="sm"
                    showPlaceholder={false}
                  />
                )}
                {/* List pill — hidden when viewing a specific list */}
                {!hideListPill && itemList && (
                  <ListPill
                    listId={item.listId}
                    itemId={item.id}
                    itemType={item.type}
                    size="sm"
                  />
                )}
                {/* Tag pills — clickable to open inline tag popover */}
                {itemTags.slice(0, 3).map((tag: Tag) => (
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
      </div>
    </div>
  );
}

export function VirtualizedItemList({
  items,
  selectedItemId,
  tags,
  lists,
  searchQuery,
  onSelect,
  onComplete,
  onUncomplete,
  onDelete,
  onMove,
  onPin,
  onMoveToTop,
  onDuplicate,
  onDateChange,
  hideListPill,
  className,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
  total,
}: VirtualizedItemListProps) {
  const listRef = useListRef(null);

  // Use dynamic row heights — react-window v2 will measure each row via ResizeObserver
  // and adjust the list layout accordingly. defaultRowHeight is the initial estimate.
  const rowHeight = useDynamicRowHeight({
    defaultRowHeight: DEFAULT_ROW_HEIGHT,
  });

  // Track the previous selectedItemId to avoid unnecessary scrollToRow calls
  const prevSelectedIdRef = useRef<string | null>(null);

  // Scroll to selected item only when it changes (not on every re-render)
  // and only if the item was selected programmatically (e.g., keyboard nav).
  // Clicking an item already scrolls it into view naturally.
  useEffect(() => {
    if (selectedItemId && selectedItemId !== prevSelectedIdRef.current && listRef.current) {
      const index = items.findIndex((item) => item.id === selectedItemId);
      if (index >= 0) {
        listRef.current.scrollToRow({ index, align: 'smart' });
      }
    }
    prevSelectedIdRef.current = selectedItemId;
  }, [selectedItemId, items, listRef]);

  // Stable scroll handler for infinite loading
  const handleScroll = useCallback((scrollTop: number, scrollHeight: number, clientHeight: number) => {
    if (!hasMore || isLoadingMore || !onLoadMore) return;
    
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const threshold = 200; // Load more when within 200px of bottom
    
    if (distanceFromBottom < threshold) {
      onLoadMore();
    }
  }, [hasMore, isLoadingMore, onLoadMore]);

  // Stable scroll event handler for the List component
  const handleListScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    handleScroll(target.scrollTop, target.scrollHeight, target.clientHeight);
  }, [handleScroll]);

  // Build rowProps object — react-window v2's internal `de()` stabilizer
  // uses useMemo with Object.values() as deps, so it only creates a new
  // reference when actual values change (not just object identity).
  const rowProps: RowProps = {
    items,
    selectedItemId,
    tags,
    lists,
    searchQuery,
    onSelect,
    onComplete,
    onUncomplete,
    onDelete,
    onMove,
    onPin,
    onMoveToTop,
    onDuplicate,
    onDateChange,
    hideListPill,
  };

  if (items.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <Clock className="w-12 h-12 opacity-30" />
        <div className="text-center">
          <p className="text-sm font-medium">No items yet</p>
          <p className="text-xs mt-1 opacity-70">Create a task or note to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("h-full flex flex-col", className)}>
      <div className="flex-1 min-h-0">
        {/* 
         * IMPORTANT: Use renderProp instead of ChildComponent to avoid remounting.
         * 
         * AutoSizer wraps ChildComponent in useMemo(() => React.memo(Child), [Child]).
         * When ChildComponent is an inline function, it creates a NEW function reference
         * on every render, causing AutoSizer to create a brand new memoized component,
         * which unmounts the old List and mounts a new one — causing visible flicker.
         * 
         * renderProp avoids this because it returns ReactNode directly (not a component
         * reference), so React reconciles by element type (List) which stays stable.
         */}
        <AutoSizer
          renderProp={({ height, width }) => {
            if (!height || !width) return null;
            return (
              <List
                listRef={listRef}
                className="hidden-scrollbar"
                style={{ height, width }}
                rowCount={items.length}
                rowHeight={rowHeight}
                rowComponent={Row}
                rowProps={rowProps}
                overscanCount={5}
                onScroll={handleListScroll}
              />
            );
          }}
        />
      </div>
      
      {/* Loading indicator and status */}
      {(isLoadingMore || hasMore) && (
        <div className="py-3 flex items-center justify-center gap-2 text-sm text-muted-foreground border-t border-border/50">
          {isLoadingMore ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading more items...</span>
            </>
          ) : hasMore ? (
            <span className="text-xs">
              Showing {items.length} of {total ?? 'many'} items
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}

// Export DEFAULT_ROW_HEIGHT for backward compatibility (used as estimate)
export { DEFAULT_ROW_HEIGHT as ITEM_HEIGHT };
