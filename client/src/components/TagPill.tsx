/**
 * TagPill Component
 * 
 * Displays a tag pill with icon and name.
 * Clicking opens a popover to manage tags for the item.
 */

import { useState, memo } from 'react';
import { useMomentum } from "@/contexts/ServerMomentumContext";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TagIcon } from '@/components/icons/TagIcon';
import { Tag } from '@/types';
import { cn } from '@/lib/utils';
import { X, Plus } from 'lucide-react';
import { Pill, PillButton } from '@/components/ui/pill';

interface TagPillProps {
  tag: Tag;
  itemId: string;
  className?: string;
  size?: 'default' | 'sm' | 'lg';
  readOnly?: boolean;
}

export const TagPill = memo(function TagPill({ tag, itemId, className, size = 'default', readOnly = false }: TagPillProps) {
  const { state, updateItem, addTag } = useMomentum();
  const [open, setOpen] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  const item = state.items.find(i => i.id === itemId);
  const itemTags = item?.tags || [];

  const handleTagToggle = (tagId: string) => {
    if (!item) return;
    const currentTags = item.tags || [];
    const newTags = currentTags.includes(tagId)
      ? currentTags.filter(t => t !== tagId)
      : [...currentTags, tagId];
    updateItem({ ...item, tags: newTags });
  };

  const handleCreateTag = () => {
    if (!newTagName.trim() || !item) return;
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newTagId = crypto.randomUUID();
    const newTag = { id: newTagId, name: newTagName.trim(), color: randomColor };
    addTag(newTag);
    const currentTags = item.tags || [];
    updateItem({ ...item, tags: [...currentTags, newTagId] });
    setNewTagName('');
  };

  // ReadOnly mode: display-only pill without popover
  if (readOnly) {
    return (
      <Pill
        variant="filled"
        size={size}
        color={tag.color}
        className={className}
      >
        <TagIcon className={size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} color={tag.color} />
        {tag.name}
      </Pill>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Pill
          onClick={(e) => e.stopPropagation()}
          variant="filled"
          size={size}
          color={tag.color}
          className={cn('cursor-pointer', className)}
          title="Click to manage tags"
        >
          <TagIcon className={size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} color={tag.color} />
          {tag.name}
        </Pill>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="start">
        <div className="space-y-1">
          {/* Search/Create tag input */}
          <div className="flex items-center gap-1 px-1 pb-2 border-b mb-1">
            <TagIcon className="w-3 h-3" filled={false} />
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCreateTag();
                }
              }}
              placeholder="Search or create tag..."
              className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-muted-foreground/50"
              autoFocus
            />
          </div>
          
          {/* Filtered existing tags list */}
          {(() => {
            const searchTerm = newTagName.trim().toLowerCase();
            const filteredTags = searchTerm 
              ? state.tags.filter(t => t.name.toLowerCase().includes(searchTerm))
              : state.tags;
            const exactMatch = state.tags.some(t => t.name.toLowerCase() === searchTerm);
            const showCreateOption = searchTerm && !exactMatch;
            
            return (
              <>
                {/* Create new tag option */}
                {showCreateOption && (
                  <button
                    onClick={handleCreateTag}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors hover:bg-accent text-primary"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Create "{newTagName.trim()}"</span>
                  </button>
                )}
                
                {/* Filtered tags as pills */}
                {filteredTags.length > 0 && (
                  <div className="text-xs font-medium text-muted-foreground px-2 py-1">
                    {searchTerm ? 'Matching tags' : 'Existing tags'}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 px-1 py-1">
                  {filteredTags.map(t => {
                    const isSelected = itemTags.includes(t.id);
                    return (
                      <PillButton
                        key={t.id}
                        onClick={() => handleTagToggle(t.id)}
                        variant="filled"
                        size="sm"
                        color={t.color}
                        className={cn(
                          isSelected
                            ? "ring-2 ring-offset-1"
                            : "hover:opacity-80"
                        )}
                        style={isSelected ? { '--tw-ring-color': t.color } as React.CSSProperties : {}}
                      >
                        <TagIcon className="w-2.5 h-2.5" color={t.color} />
                        <span className="truncate max-w-[100px]">{t.name}</span>
                        {isSelected && <X className="w-2.5 h-2.5 ml-0.5" />}
                      </PillButton>
                    );
                  })}
                </div>
                
                {/* Empty states */}
                {filteredTags.length === 0 && !showCreateOption && (
                  <p className="text-xs text-muted-foreground text-center py-2">
                    {searchTerm ? 'No matching tags' : 'Type to search or create a tag'}
                  </p>
                )}
              </>
            );
          })()}
        </div>
      </PopoverContent>
    </Popover>
  );
});
