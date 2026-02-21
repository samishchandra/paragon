import { useState } from 'react';
import { X, Trash2, FolderInput, Tag, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { useMomentum } from "@/contexts/ServerMomentumContext";
import { ListIcon } from '@/components/icons/ListIcon';
import { toast } from '@/lib/toast';

interface BulkActionToolbarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
}

export function BulkActionToolbar({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
}: BulkActionToolbarProps) {
  const { state, dispatch, bulkAddTag, bulkRemoveTag, bulkDeleteItems, bulkSetList } = useMomentum();
  const { lists, tags, selectedItemIds } = state;
  
  const [listSearchQuery, setListSearchQuery] = useState('');
  const [tagSearchQuery, setTagSearchQuery] = useState('');
  const [listPopoverOpen, setListPopoverOpen] = useState(false);
  const [tagPopoverOpen, setTagPopoverOpen] = useState(false);

  const filteredLists = lists.filter(list =>
    list.name.toLowerCase().includes(listSearchQuery.toLowerCase())
  );

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(tagSearchQuery.toLowerCase())
  );

  const handleBulkDelete = () => {
    bulkDeleteItems(selectedItemIds);
    toast.success(`${selectedCount} item${selectedCount > 1 ? 's' : ''} moved to trash`);
  };

  const handleBulkSetList = (listId: string | null) => {
    bulkSetList(selectedItemIds, listId);
    const listName = listId ? lists.find(l => l.id === listId)?.name : 'No list';
    toast.success(`${selectedCount} item${selectedCount > 1 ? 's' : ''} moved to ${listName}`);
    setListPopoverOpen(false);
  };

  const handleBulkAddTag = (tagId: string) => {
    bulkAddTag(selectedItemIds, tagId);
    const tagName = tags.find(t => t.id === tagId)?.name;
    toast.success(`Tag "${tagName}" added to ${selectedCount} item${selectedCount > 1 ? 's' : ''}`);
    setTagPopoverOpen(false);
  };

  const handleBulkRemoveTag = (tagId: string) => {
    bulkRemoveTag(selectedItemIds, tagId);
    const tagName = tags.find(t => t.id === tagId)?.name;
    toast.success(`Tag "${tagName}" removed from ${selectedCount} item${selectedCount > 1 ? 's' : ''}`);
    setTagPopoverOpen(false);
  };

  const allSelected = selectedCount === totalCount && totalCount > 0;

  return (
    <div className="flex items-center gap-1 px-3 py-1.5 bg-primary/5 border-b border-border">
      {/* Select All / Deselect All - icon only */}
      <Button
        variant="ghost"
        size="icon"
        onClick={allSelected ? onClearSelection : onSelectAll}
        className="h-8 w-8"
        title={allSelected ? 'Deselect All' : 'Select All'}
      >
        {allSelected ? (
          <CheckSquare className="h-4 w-4" />
        ) : (
          <Square className="h-4 w-4" />
        )}
      </Button>

      {/* Selected count */}
      {selectedCount > 0 && (
        <span className="text-xs text-muted-foreground tabular-nums">
          {selectedCount}
        </span>
      )}

      <div className="flex-1" />

      {/* Bulk Actions */}
      {selectedCount > 0 && (
        <>
          {/* Move to List - "List" label only */}
          <Popover open={listPopoverOpen} onOpenChange={setListPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2 gap-1.5">
                <FolderInput className="h-4 w-4" />
                <span className="text-sm">List</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2" align="end">
              <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
                <FolderInput className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search lists..."
                  value={listSearchQuery}
                  onChange={(e) => setListSearchQuery(e.target.value)}
                  className="h-7 text-sm border-0 bg-transparent focus-visible:ring-0 p-0"
                />
              </div>
              <div className="max-h-48 overflow-y-auto space-y-0.5">
                {/* No List option */}
                <button
                  onClick={() => handleBulkSetList(null)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent text-left"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                  <span>No List</span>
                </button>
                {filteredLists.map((list) => (
                  <button
                    key={list.id}
                    onClick={() => handleBulkSetList(list.id)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent text-left"
                    style={{ color: list.color }}
                  >
                    <ListIcon name={list.icon} className="h-4 w-4" />
                    <span>{list.name}</span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Add/Remove Tag */}
          <Popover open={tagPopoverOpen} onOpenChange={setTagPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2 gap-1.5">
                <Tag className="h-4 w-4" />
                <span className="text-sm">Tags</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2" align="end">
              <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tags..."
                  value={tagSearchQuery}
                  onChange={(e) => setTagSearchQuery(e.target.value)}
                  className="h-7 text-sm border-0 bg-transparent focus-visible:ring-0 p-0"
                />
              </div>
              <div className="text-xs text-muted-foreground px-2 py-1 mb-1">
                Click to add, Shift+Click to remove
              </div>
              <div className="max-h-48 overflow-y-auto space-y-0.5">
                {filteredTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={(e) => {
                      if (e.shiftKey) {
                        handleBulkRemoveTag(tag.id);
                      } else {
                        handleBulkAddTag(tag.id);
                      }
                    }}
                    className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent text-left"
                    style={{ color: tag.color }}
                  >
                    <Tag className="h-4 w-4" />
                    <span>{tag.name}</span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Delete - icon only */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBulkDelete}
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            title="Delete selected items"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Close multi-select mode */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => dispatch({ type: 'CLEAR_SELECTION' })}
        className="h-8 w-8"
        title="Exit multi-select mode"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
