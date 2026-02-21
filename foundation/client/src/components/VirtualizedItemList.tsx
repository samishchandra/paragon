/**
 * Virtualized Item List Component
 * 
 * Uses react-window v2 for efficient rendering of large lists.
 * Only renders items that are visible in the viewport.
 */

import { memo, useEffect, ReactElement } from 'react';
import { List, useListRef, ListImperativeAPI } from 'react-window';
import { AutoSizer } from 'react-virtualized-auto-sizer';
import { Item, SectionType, Task, Tag } from '@/types';
import { cn } from '@/lib/utils';
import {
  Check,
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
  Calendar,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { TagIcon } from '@/components/icons/TagIcon';
import { highlightText } from '@/lib/highlightText';
import { linkifyTitle, extractFirstLineLink, renderFirstLineLink } from '@/lib/linkifyTitle';
import { isPast, isToday, isTomorrow, parseISO, startOfDay, format } from 'date-fns';

// Item height for virtual list
const ITEM_HEIGHT = 72;

// Date status colors
const DATE_COLORS = {
  overdue: '#EF4444',
  today: '#F59E0B',
  tomorrow: '#3B82F6',
  upcoming: '#6B7280',
} as const;

function getDateDisplay(dueDate: string): { color: string; label: string } {
  const date = parseISO(dueDate);
  const today = startOfDay(new Date());
  const dateOnly = startOfDay(date);

  if (isPast(dateOnly) && !isToday(date)) {
    return { color: DATE_COLORS.overdue, label: format(date, 'MMM d') };
  }
  if (isToday(date)) {
    return { color: DATE_COLORS.today, label: 'Today' };
  }
  if (isTomorrow(date)) {
    return { color: DATE_COLORS.tomorrow, label: 'Tomorrow' };
  }
  return { color: DATE_COLORS.upcoming, label: format(date, 'MMM d') };
}

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

// Row component for react-window v2
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

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompleted) {
      onUncomplete(item.id);
    } else {
      onComplete(item.id);
    }
  };

  return (
    <div style={style} className="px-1">
      <div
        className={cn(
          "group h-[68px] px-3 py-2 rounded-lg transition-colors cursor-pointer",
          "hover:bg-muted/50 border border-transparent hover:border-border/30",
          isSelected && "bg-muted/70 border-border/50"
        )}
        onClick={() => onSelect(item.id)}
      >
        <div className="flex items-start gap-3 h-full">
          {/* Checkbox or Note icon */}
          <div className="shrink-0 flex items-center h-[22px]">
            {isTask ? (
              <button
                onClick={handleComplete}
                className="flex items-center justify-center"
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500" />
                ) : (
                  <Circle className="w-[18px] h-[18px] text-muted-foreground/60 hover:text-primary transition-colors" />
                )}
              </button>
            ) : (
              <FileText className="w-[18px] h-[18px] text-muted-foreground/60" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            {/* Title */}
            <div className="flex items-center gap-2">
              {item.isPinned && (
                <Pin className="w-3 h-3 text-amber-500 shrink-0" />
              )}
              <span
                className={cn(
                  "text-sm font-medium truncate",
                  isCompleted && "text-muted-foreground line-through"
                )}
              >
                {searchQuery ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightText(
                        item.title || (isTask ? 'Untitled Task' : 'Untitled Note'),
                        searchQuery
                      ) as string,
                    }}
                  />
                ) : (
                  item.title ? linkifyTitle(item.title).elements : (isTask ? 'Untitled Task' : 'Untitled Note')
                )}
              </span>
            </div>

            {/* First-line content link */}
            {(() => {
              const firstLink = extractFirstLineLink(item.content);
              if (firstLink) {
                return (
                  <div className="mt-0.5">
                    {renderFirstLineLink(firstLink)}
                  </div>
                );
              }
              return null;
            })()}

            {/* Metadata row */}
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              {/* Due date - simple display */}
              {dueDate && (() => {
                const { color, label } = getDateDisplay(dueDate);
                return (
                  <span 
                    className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md"
                    style={{ 
                      color: color,
                      backgroundColor: `${color}15`
                    }}
                  >
                    <Calendar className="w-2.5 h-2.5" />
                    {label}
                  </span>
                );
              })()}
              
              {/* Tags - simple display */}
              {itemTags.slice(0, 2).map((tag: Tag) => (
                <span 
                  key={tag.id}
                  className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md"
                  style={{ 
                    color: tag.color,
                    backgroundColor: `${tag.color}15`
                  }}
                >
                  <TagIcon className="w-2.5 h-2.5" color={tag.color} />
                  {tag.name}
                </span>
              ))}
              {itemTags.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{itemTags.length - 2}
                </span>
              )}
              
              {/* List name - simple display */}
              {!hideListPill && itemList && (
                <span 
                  className="text-xs px-1.5 py-0.5 rounded-md"
                  style={{ 
                    color: itemList.color,
                    backgroundColor: `${itemList.color}15`
                  }}
                >
                  {itemList.name}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
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
                  className="text-red-500"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inner list component that receives AutoSizer dimensions
function InnerList({ 
  height, 
  width,
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
  hideListPill,
  listRef,
  onScroll,
}: { 
  height: number | undefined; 
  width: number | undefined;
  listRef: React.RefObject<ListImperativeAPI | null>;
  onScroll?: (scrollTop: number, scrollHeight: number, clientHeight: number) => void;
} & RowProps) {
  if (!height || !width) return null;

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
    hideListPill,
  };

  // Handle scroll events from the list
  const handleListScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (onScroll && height) {
      const target = event.currentTarget;
      const scrollHeight = items.length * ITEM_HEIGHT;
      onScroll(target.scrollTop, scrollHeight, height);
    }
  };

  return (
    <List
      listRef={listRef}
      style={{ height, width }}
      rowCount={items.length}
      rowHeight={ITEM_HEIGHT}
      rowComponent={Row}
      rowProps={rowProps}
      overscanCount={5}
      onScroll={handleListScroll}
    />
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
  hideListPill,
  className,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
  total,
}: VirtualizedItemListProps) {
  const listRef = useListRef(null);

  // Scroll to selected item when it changes
  useEffect(() => {
    if (selectedItemId && listRef.current) {
      const index = items.findIndex((item) => item.id === selectedItemId);
      if (index >= 0) {
        listRef.current.scrollToRow({ index, align: 'smart' });
      }
    }
  }, [selectedItemId, items, listRef]);

  // Handle scroll to detect when near bottom for infinite loading
  const handleScroll = (scrollTop: number, scrollHeight: number, clientHeight: number) => {
    if (!hasMore || isLoadingMore || !onLoadMore) return;
    
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const threshold = 200; // Load more when within 200px of bottom
    
    if (distanceFromBottom < threshold) {
      onLoadMore();
    }
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
        <AutoSizer
          ChildComponent={({ height, width }) => (
            <InnerList
              height={height}
              width={width}
              items={items}
              selectedItemId={selectedItemId}
              tags={tags}
              lists={lists}
              searchQuery={searchQuery}
              onSelect={onSelect}
              onComplete={onComplete}
              onUncomplete={onUncomplete}
              onDelete={onDelete}
              onMove={onMove}
              onPin={onPin}
              onMoveToTop={onMoveToTop}
              onDuplicate={onDuplicate}
              hideListPill={hideListPill}
              listRef={listRef}
              onScroll={handleScroll}
            />
          )}
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

export { ITEM_HEIGHT };
