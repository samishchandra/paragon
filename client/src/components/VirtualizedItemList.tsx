/**
 * Virtualized Item List Component
 * 
 * Uses react-window v2 for efficient rendering of large lists.
 * Only renders items that are visible in the viewport.
 * 
 * Uses useDynamicRowHeight for variable-height rows that adapt
 * to content (title length, content preview, number of tags/pills).
 * 
 * Row rendering delegates to the shared ItemCardContent component
 * so UI changes only need to be made in one place.
 * 
 * Supports native HTML drag for drag-to-sidebar (assign list/tag).
 * 
 * Performance: Uses AutoSizer renderProp (not ChildComponent) to avoid
 * remounting the List on every prop change. react-window v2's internal
 * `de()` stabilizer + `ue()` memo comparator handle row-level memoization.
 */

import { useEffect, useCallback, useRef, ReactElement, ReactNode, KeyboardEvent } from 'react';
import { List, useListRef, useDynamicRowHeight } from 'react-window';
import { AutoSizer } from 'react-virtualized-auto-sizer';
import { Item, SectionType, Task, Tag } from '@/types';
import { cn } from '@/lib/utils';
import { ITEM_SELECTED, ITEM_HOVER } from '@/lib/styles';
import { Clock, Loader2 } from 'lucide-react';
import { ItemCardContent } from '@/components/middle-panel/ItemCardContent';

// Default estimated row height — used as initial estimate before measurement
const DEFAULT_ROW_HEIGHT = 90;

export interface VirtualizedItemListProps {
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
  onTagClick?: (id: string) => void;
  hideListPill?: boolean;
  className?: string;
  /** Custom empty state ReactNode. If not provided, a default empty state is shown. */
  emptyState?: ReactNode;
  // Multi-select support
  isMultiSelectMode?: boolean;
  selectedItemIds?: string[];
  onToggleMultiSelect?: (id: string) => void;
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
  onTagClick?: (id: string) => void;
  hideListPill?: boolean;
  isMultiSelectMode?: boolean;
  selectedItemIds?: string[];
  onToggleMultiSelect?: (id: string) => void;
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

// Row component for react-window v2 — delegates inner rendering to ItemCardContent.
// The outer div uses react-window's style (position:absolute, top, width) for positioning.
// The inner content renders naturally — useDynamicRowHeight's ResizeObserver
// will measure the actual height and update the list accordingly.
function Row({ 
  index, 
  style,
  items,
  selectedItemId,
  tags,
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
  onTagClick,
  hideListPill,
  isMultiSelectMode,
  selectedItemIds,
  onToggleMultiSelect,
}: RowComponentProps & RowProps): ReactElement | null {
  const item = items[index];
  if (!item) return null;

  const isSelected = selectedItemId === item.id;
  const isTask = item.type === 'task';
  const isCompleted = isTask && (item as Task).isCompleted;
  const itemTags = tags.filter((tag: Tag) => item.tags?.includes(tag.id));
  const isMultiSelected = isMultiSelectMode && selectedItemIds?.includes(item.id);

  // Native drag start for cross-panel dragging (to sidebar tags/lists)
  const handleNativeDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ itemId: item.id }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleClick = () => {
    if (isMultiSelectMode && onToggleMultiSelect) {
      onToggleMultiSelect(item.id);
    } else {
      onSelect(item.id);
    }
  };

  return (
    <div style={style}>
      <div
        className={cn(
          "group relative py-3 pr-3 pl-3 transition-colors duration-150 cursor-pointer select-none border-b border-border/30",
          isSelected
            ? ITEM_SELECTED
            : isMultiSelected
              ? 'bg-primary/10'
              : 'bg-transparent ' + ITEM_HOVER,
        )}
        onClick={handleClick}
        draggable={!isMultiSelectMode}
        onDragStart={handleNativeDragStart}
      >
        {/* Multi-select checkbox */}
        {isMultiSelectMode && (
          <div className="absolute left-1 top-1/2 -translate-y-1/2 z-10">
            <div className={cn(
              "w-4 h-4 rounded border-2 flex items-center justify-center transition-colors",
              isMultiSelected
                ? "bg-primary border-primary text-primary-foreground"
                : "border-muted-foreground/40 hover:border-primary"
            )}>
              {isMultiSelected && (
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </div>
        )}
        <div className={isMultiSelectMode ? "ml-5" : ""}>
          <ItemCardContent
            item={item}
            isCompleted={isCompleted}
            isTask={isTask}
            itemTags={itemTags}
            searchQuery={searchQuery}
            hideListPill={hideListPill}
            onComplete={onComplete}
            onUncomplete={onUncomplete}
            onPin={onPin}
            onDelete={onDelete}
            onMove={onMove}
            onMoveToTop={onMoveToTop}
            onDuplicate={onDuplicate}
            onDateChange={onDateChange}
          />
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
  onTagClick,
  hideListPill,
  className,
  emptyState,
  isMultiSelectMode,
  selectedItemIds,
  onToggleMultiSelect,
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

  // Keyboard arrow-key navigation
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (items.length === 0) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIndex = selectedItemId
        ? items.findIndex(i => i.id === selectedItemId)
        : -1;

      let nextIndex: number;
      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : currentIndex;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      }

      if (nextIndex !== currentIndex || currentIndex === -1) {
        const nextItem = items[nextIndex];
        if (nextItem) {
          onSelect(nextItem.id);
        }
      }
    }
  }, [items, selectedItemId, onSelect]);

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
    onTagClick,
    hideListPill,
    isMultiSelectMode,
    selectedItemIds,
    onToggleMultiSelect,
  };

  if (items.length === 0) {
    if (emptyState) return <>{emptyState}</>;
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
    <div
      className={cn("h-full flex flex-col", className)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ outline: 'none' }}
    >
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
