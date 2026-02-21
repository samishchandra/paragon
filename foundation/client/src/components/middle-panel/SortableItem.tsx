/**
 * SortableItem Component — Wraps ItemCard with dnd-kit sortable functionality.
 * Handles drag transforms, layout animations, drop indicators, and exit animations.
 */
import { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'motion/react';
import { Item, SectionType } from '@/types';
import { ItemCard } from './ItemCard';

export interface SortableItemProps {
  item: Item;
  isSelected: boolean;
  onSelect: () => void;
  onComplete: () => void;
  onTitleChange: (newTitle: string) => void;
  onDelete: () => void;
  onMove: (section: SectionType) => void;
  onPin: () => void;
  onMoveToTop: () => void;
  onDuplicate: () => void;
  onDueDateChange: (date: Date | undefined) => void;
  onTagClick: () => void;
  tags: { id: string; name: string; color: string }[];
  isDragDisabled?: boolean;
  showDropIndicator?: 'before' | 'after' | null;
  searchQuery?: string;
  hideListPill?: boolean;
  isMultiSelectMode?: boolean;
  isMultiSelected?: boolean;
  onToggleMultiSelect?: () => void;
  suppressLayout?: boolean;
}

function sortableItemAreEqual(prev: SortableItemProps, next: SortableItemProps): boolean {
  return (
    prev.item === next.item &&
    prev.isSelected === next.isSelected &&
    prev.isDragDisabled === next.isDragDisabled &&
    prev.showDropIndicator === next.showDropIndicator &&
    prev.searchQuery === next.searchQuery &&
    prev.hideListPill === next.hideListPill &&
    prev.isMultiSelectMode === next.isMultiSelectMode &&
    prev.isMultiSelected === next.isMultiSelected &&
    prev.tags === next.tags &&
    prev.suppressLayout === next.suppressLayout
  );
}

export const SortableItem = memo(function SortableItem({ item, isSelected, onSelect, onComplete, onTitleChange, onDelete, onMove, onPin, onMoveToTop, onDuplicate, onDueDateChange, onTagClick, tags, isDragDisabled, showDropIndicator, searchQuery, hideListPill, isMultiSelectMode, isMultiSelected, onToggleMultiSelect, suppressLayout }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: item.id,
    disabled: isDragDisabled,
  });
  // Combine dnd-kit transform with smooth layout transitions
  // When drag is disabled (non-custom sort), let Framer Motion handle layout animations
  // When drag is enabled, dnd-kit manages transforms directly
  const style: React.CSSProperties = isDragDisabled
    ? {
        opacity: 1,
      }
    : {
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? transition : `${transition || ''}, opacity 0.25s ease`.replace(/^, /, ''),
        opacity: isDragging ? 0.4 : 1,
        pointerEvents: isDragging ? 'none' : 'auto',
      };
  // Drop indicator line component
  const DropIndicator = () => (
    <div className="h-0.5 bg-primary rounded-full mx-2 my-1 shadow-sm shadow-primary/50" />
  );
  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="touch-manipulation"
      layout={isDragDisabled && !suppressLayout ? 'position' : false}
      initial={false}
      animate={{ opacity: isDragging ? 0.4 : 1 }}
      exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, overflow: 'hidden' }}
      transition={{
        layout: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 },
        height: { duration: 0.2 },
      }}
    >
      {showDropIndicator === 'before' && <DropIndicator />}
      <ItemCard
        item={item}
        isSelected={isSelected}
        onSelect={onSelect}
        onComplete={onComplete}
        onTitleChange={onTitleChange}
        onDelete={onDelete}
        onMove={onMove}
        onPin={onPin}
        onMoveToTop={onMoveToTop}
        onDuplicate={onDuplicate}
        onDueDateChange={onDueDateChange}
        onTagClick={onTagClick}
        tags={tags}
        dragHandleProps={isDragDisabled ? undefined : { ...attributes, ...listeners }}
        isDragDisabled={isDragDisabled}
        searchQuery={searchQuery}
        hideListPill={hideListPill}
        isMultiSelectMode={isMultiSelectMode}
        isMultiSelected={isMultiSelected}
        onToggleMultiSelect={onToggleMultiSelect}
      />
      {showDropIndicator === 'after' && <DropIndicator />}
     </motion.div>
  );
}, sortableItemAreEqual);
