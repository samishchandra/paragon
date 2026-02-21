/**
 * Edit List Dialog Component
 * 
 * Allows creating/editing list name, icon, color, and type (task/note).
 * Shows usage statistics and handles deletion.
 */

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMomentum } from "@/contexts/ServerMomentumContext";
import { List, ListIconName, LIST_ICONS, ListType } from '@/types';
import { ListIcon } from '@/components/icons/ListIcon';
import { Trash2, FileText, ListTodo, ChevronDown } from 'lucide-react';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';

// Predefined color palette (same as tags)
const LIST_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#F97316', // Orange
  '#6366F1', // Indigo
  '#14B8A6', // Teal
  '#A855F7', // Purple
];

interface EditListDialogProps {
  list: List | null; // null for creating new list
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultType?: ListType; // Default type when creating new list
}

export function EditListDialog({ list, open, onOpenChange, defaultType = 'task' }: EditListDialogProps) {
  const { state, addList, updateList, deleteList, getListCounts, tasksEnabled } = useMomentum();
  
  const [name, setName] = useState('');
  const [icon, setIcon] = useState<ListIconName>('folder');
  const [color, setColor] = useState('#3B82F6');
  const [type, setType] = useState<ListType>(defaultType);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [iconPopoverOpen, setIconPopoverOpen] = useState(false);

  const isEditing = !!list;

  // Reset form when list changes or dialog opens
  useEffect(() => {
    if (list) {
      setName(list.name);
      setIcon(list.icon);
      setColor(list.color);
      setType(list.type);
    } else {
      // Reset to defaults for new list
      setName('');
      setIcon('folder');
      setColor('#3B82F6');
      // Force 'note' type when tasks are disabled
      setType(tasksEnabled ? defaultType : 'note');
    }
  }, [list, open, defaultType, tasksEnabled]);

  // Get usage statistics
  const listCounts = getListCounts();
  const usageCount = list ? (listCounts.get(list.id) || 0) : 0;

  const handleSave = () => {
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      toast.error('List name cannot be empty');
      return;
    }

    // Check if name conflicts with another list (case-insensitive)
    const existingList = state.lists.find(
      l => l.id !== list?.id && l.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (existingList) {
      toast.error('A list with this name already exists');
      return;
    }

    if (isEditing && list) {
      // Update existing list
      updateList(list.id, { name: trimmedName, icon, color });
      toast.success('List updated');
    } else {
      // Create new list - order is set to max + 1 to place at end
      const newList: List = {
        id: crypto.randomUUID(),
        name: trimmedName,
        icon,
        color,
        type,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        order: state.lists.length, // Use index-based order to avoid integer overflow
      };
      addList(newList);
      toast.success('List created');
    }
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (list) {
      deleteList(list.id);
      toast.success(`List "${list.name}" deleted`);
      setShowDeleteConfirm(false);
      onOpenChange(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="!max-w-[400px]" style={{ maxWidth: '400px' }} showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ListIcon name={icon} color={color} className="w-5 h-5" />
              {isEditing ? 'Edit List' : 'New List'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Icon + Name Row */}
            <div className="space-y-2">
              <Label>Name</Label>
              <div className="flex gap-2">
                {/* Icon Picker Button */}
                <Popover open={iconPopoverOpen} onOpenChange={setIconPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-12 h-10 px-0 shrink-0"
                      title="Select icon"
                    >
                      <ListIcon name={icon} color={color} className="w-5 h-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-3" align="start">
                    <ScrollArea className="h-64">
                      <div className="grid grid-cols-8 gap-1 pt-1">
                        {LIST_ICONS.map((iconOption) => (
                          <button
                            key={iconOption.name}
                            type="button"
                            onClick={() => {
                              setIcon(iconOption.name);
                              setIconPopoverOpen(false);
                            }}
                            className={cn(
                              'w-8 h-8 rounded-md flex items-center justify-center transition-all',
                              icon === iconOption.name
                                ? 'ring-2 ring-primary bg-primary/10'
                                : 'hover:bg-muted'
                            )}
                            title={iconOption.label}
                          >
                            <ListIcon 
                              name={iconOption.name} 
                              color={icon === iconOption.name ? color : undefined} 
                              className="w-4 h-4"
                            />
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>

                {/* Name Input */}
                <Input
                  id="list-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="List name"
                  autoFocus
                  className="flex-1"
                />
              </div>
            </div>

            {/* List Type (only for new lists, and only show Task option when tasks are enabled) */}
            {!isEditing && tasksEnabled && (
              <div className="space-y-2">
                <Label>Type</Label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setType('task')}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all',
                      type === 'task'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-muted hover:border-muted-foreground/50'
                    )}
                  >
                    <ListTodo className="w-4 h-4" />
                    <span className="text-sm font-medium">Tasks</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('note')}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all',
                      type === 'note'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-muted hover:border-muted-foreground/50'
                    )}
                  >
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">Notes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Color Picker */}
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2">
                {LIST_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full transition-all ${
                      color === c
                        ? 'ring-2 ring-offset-2 ring-primary scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
              {/* Custom Hex Color Input */}
              <div className="flex items-center gap-2 mt-2">
                <div
                  className="w-8 h-8 rounded-full border-2 border-muted shrink-0"
                  style={{ backgroundColor: color }}
                />
                <Input
                  value={color}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || value.startsWith('#')) {
                      setColor(value);
                    } else {
                      setColor('#' + value);
                    }
                  }}
                  placeholder="#3B82F6"
                  className="font-mono text-sm h-8"
                  maxLength={7}
                />
              </div>
            </div>

            {/* Usage Statistics (only for existing lists) */}
            {isEditing && list && (
              <div className="space-y-2">
                <Label>Usage</Label>
                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      {list.type === 'task' ? (
                        <ListTodo className="w-3.5 h-3.5" />
                      ) : (
                        <FileText className="w-3.5 h-3.5" />
                      )}
                      {list.type === 'task' ? 'Tasks' : 'Notes'}
                    </span>
                    <span className="font-medium">{usageCount}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            {isEditing ? (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowDeleteConfirm(true)}
                className="gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            ) : (
              <div />
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {isEditing ? 'Save' : 'Create'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      {list && (
        <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete list "{list.name}"?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove the list. {usageCount > 0 
                  ? `${usageCount} item${usageCount !== 1 ? 's' : ''} in this list will be unassigned.`
                  : 'The list is empty.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
