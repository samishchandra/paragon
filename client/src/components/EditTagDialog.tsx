/**
 * Edit Tag Dialog Component
 * 
 * Allows editing tag name, color, and shows usage statistics.
 * Handles tag merging when name conflicts with existing tag.
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMomentum } from "@/contexts/ServerMomentumContext";
import { Tag } from '@/types';
import { TagIcon } from '@/components/icons/TagIcon';
import { Trash2, FileText, ListTodo } from 'lucide-react';
import { toast } from '@/lib/toast';

// Predefined color palette
const TAG_COLORS = [
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

interface EditTagDialogProps {
  tag: Tag | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTagDialog({ tag, open, onOpenChange }: EditTagDialogProps) {
  const { state, updateTag, deleteTag, mergeTags, getTagCounts } = useMomentum();
  
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3B82F6');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMergeConfirm, setShowMergeConfirm] = useState(false);
  const [conflictingTag, setConflictingTag] = useState<Tag | null>(null);

  // Reset form when tag changes
  useEffect(() => {
    if (tag) {
      setName(tag.name);
      setColor(tag.color);
    }
  }, [tag]);

  if (!tag) return null;

  // Get usage statistics
  const tagCounts = getTagCounts();
  const usageCount = tagCounts.get(tag.id) || 0;
  
  // Count tasks vs notes
  const itemsWithTag = state.items.filter(
    item => item.tags.includes(tag.id) && !item.deletedAt
  );
  const taskCount = itemsWithTag.filter(item => item.type === 'task').length;
  const noteCount = itemsWithTag.filter(item => item.type === 'note').length;

  const handleSave = () => {
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      toast.error('Tag name cannot be empty');
      return;
    }

    // Check if name conflicts with another tag (case-insensitive)
    const existingTag = state.tags.find(
      t => t.id !== tag.id && t.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (existingTag) {
      setConflictingTag(existingTag);
      setShowMergeConfirm(true);
      return;
    }

    // Update the tag
    updateTag(tag.id, { name: trimmedName, color });
    toast.success('Tag updated');
    onOpenChange(false);
  };

  const handleMerge = () => {
    if (conflictingTag) {
      // Merge current tag into the existing one
      mergeTags(tag.id, conflictingTag.id);
      setShowMergeConfirm(false);
      onOpenChange(false);
    }
  };

  const handleDelete = () => {
    deleteTag(tag.id);
    toast.success(`Tag "${tag.name}" deleted`);
    setShowDeleteConfirm(false);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="!max-w-[400px]" style={{ maxWidth: '400px' }} showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TagIcon className="w-5 h-5" color={color} />
              Edit Tag
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Tag Name */}
            <div className="space-y-2">
              <Label htmlFor="tag-name">Name</Label>
              <Input
                id="tag-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tag name"
                autoFocus
              />
            </div>

            {/* Color Picker */}
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2">
                {TAG_COLORS.map((c) => (
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
                    // Allow typing and auto-add # if missing
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

            {/* Usage Statistics */}
            <div className="space-y-2">
              <Label>Usage</Label>
              <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <ListTodo className="w-3.5 h-3.5" />
                    Tasks
                  </span>
                  <span className="font-medium">{taskCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <FileText className="w-3.5 h-3.5" />
                    Notes
                  </span>
                  <span className="font-medium">{noteCount}</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete tag "{tag.name}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the tag from {usageCount} item{usageCount !== 1 ? 's' : ''}.
              The items themselves will not be deleted.
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

      {/* Merge Confirmation Dialog */}
      <AlertDialog open={showMergeConfirm} onOpenChange={setShowMergeConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tag name already exists</AlertDialogTitle>
            <AlertDialogDescription>
              A tag named "{conflictingTag?.name}" already exists. Would you like to merge
              "{tag.name}" into "{conflictingTag?.name}"? All items with "{tag.name}" will
              be updated to use "{conflictingTag?.name}" instead.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleMerge}>
              Merge Tags
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
