/**
 * ListPill Component
 * 
 * Displays a list pill with icon and name.
 * Clicking opens a popover to move the item to a different list.
 */

import { useState, memo } from 'react';
import { useMomentum } from "@/contexts/ServerMomentumContext";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ListIcon } from '@/components/icons/ListIcon';
import { List, ListType, ListIconName } from '@/types';
import { cn } from '@/lib/utils';
import { Check, Plus, FolderOpen } from 'lucide-react';
import { Pill, PillButton } from '@/components/ui/pill';
import { EditListDialog } from '@/components/EditListDialog';

interface ListPillProps {
  listId?: string;
  itemId: string;
  itemType: 'task' | 'note';
  className?: string;
  showRemove?: boolean;
  size?: 'default' | 'sm' | 'lg';
}

export const ListPill = memo(function ListPill({ listId, itemId, itemType, className, showRemove = false, size = 'default' }: ListPillProps) {
  const { state, setItemList, removeItemFromList, addList } = useMomentum();
  const [open, setOpen] = useState(false);
  const [createListOpen, setCreateListOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const list = listId ? state.lists.find(l => l.id === listId) : null;

  // Filter lists by item type - tasks can only go in task lists, notes in note lists
  const compatibleLists = state.lists.filter(l => l.type === itemType);

  const handleSelectList = (selectedListId: string) => {
    // If clicking the same list, remove from list (toggle behavior)
    if (selectedListId === listId) {
      removeItemFromList(itemId);
    } else {
      setItemList(itemId, selectedListId);
    }
    setOpen(false);
    setSearchQuery('');
  };

  const handleCreateList = () => {
    if (!searchQuery.trim()) return;
    
    // Generate a random color for the new list
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const icons: ListIconName[] = ['folder', 'star', 'bookmark', 'heart', 'flag', 'briefcase', 'lightbulb', 'target'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    
    const newListId = crypto.randomUUID();
    const newList = {
      id: newListId,
      name: searchQuery.trim(),
      color: randomColor,
      icon: randomIcon,
      type: itemType as ListType,
      order: compatibleLists.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    addList(newList);
    setItemList(itemId, newListId);
    setOpen(false);
    setSearchQuery('');
  };

  // Filter lists based on search query
  const filteredLists = searchQuery.trim()
    ? compatibleLists.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : compatibleLists;

  // Check if there's an exact match for the search query
  const exactMatch = compatibleLists.some(l => l.name.toLowerCase() === searchQuery.trim().toLowerCase());
  const showCreateOption = searchQuery.trim() && !exactMatch;

  const popoverContent = (
    <div className="space-y-1">
      {/* Search/Create input */}
      <div className="flex items-center gap-1 px-1 pb-2 border-b mb-1">
        <FolderOpen className="w-3 h-3 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (showCreateOption) {
                handleCreateList();
              } else if (filteredLists.length === 1) {
                handleSelectList(filteredLists[0].id);
              }
            }
          }}
          placeholder="Search or create list..."
          className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-muted-foreground/50"
          autoFocus
        />
      </div>

      {/* Create new list option */}
      {showCreateOption && (
        <button
          onClick={handleCreateList}
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors hover:bg-accent text-primary"
        >
          <Plus className="w-3 h-3" />
          <span>Create "{searchQuery.trim()}"</span>
        </button>
      )}

      {/* List options */}
      {filteredLists.length > 0 ? (
        filteredLists.map(listItem => (
          <button
            key={listItem.id}
            onClick={() => handleSelectList(listItem.id)}
            className={cn(
              'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors hover:bg-accent',
              listId === listItem.id && 'bg-accent'
            )}
          >
            <ListIcon name={listItem.icon} color={listItem.color} className="w-4 h-4" />
            <span className="flex-1 text-left truncate" style={{ color: listItem.color }}>
              {listItem.name}
            </span>
            {listId === listItem.id && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </button>
        ))
      ) : !showCreateOption ? (
        <div className="px-2 py-2 text-xs text-muted-foreground/70 italic">
          {searchQuery.trim() ? 'No matching lists' : `No ${itemType} lists yet`}
        </div>
      ) : null}
    </div>
  );

  // If no list assigned, show a subtle "Add to list" button
  if (!list) {
    return (
      <Popover open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) setSearchQuery('');
      }}>
        <PopoverTrigger asChild>
          <PillButton
            onClick={(e) => e.stopPropagation()}
            variant="placeholder"
            size={size}
            className={className}
            title="Add to list"
          >
            <Plus className={size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
            List
          </PillButton>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="start">
          {popoverContent}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) setSearchQuery('');
    }}>
      <PopoverTrigger asChild>
        <Pill
          onClick={(e) => e.stopPropagation()}
          variant="filled"
          size={size}
          color={list.color}
          className={cn('group/pill', className)}
          title="Click to change list"
        >
          <ListIcon name={list.icon} color={list.color} className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          {list.name}
        </Pill>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="start">
        {popoverContent}
      </PopoverContent>
    </Popover>
  );
});
