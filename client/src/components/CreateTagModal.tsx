/**
 * Create Tag Modal Component
 * Allows users to create custom tags with user-defined colors
 */

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

interface CreateTagModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTag: (tag: { id: string; name: string; color: string }) => void;
}

// Predefined color palette
const COLOR_PALETTE = [
  '#22D3EE', // Cyan
  '#A78BFA', // Violet
  '#34D399', // Emerald
  '#F87171', // Red
  '#FBBF24', // Amber
  '#60A5FA', // Blue
  '#F472B6', // Pink
  '#4ADE80', // Green
  '#FB923C', // Orange
  '#818CF8', // Indigo
  '#2DD4BF', // Teal
  '#E879F9', // Fuchsia
];

export function CreateTagModal({ open, onOpenChange, onCreateTag }: CreateTagModalProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLOR_PALETTE[0]);
  const [customColor, setCustomColor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalColor = customColor || color;
    onCreateTag({
      id: uuidv4(),
      name: name.trim(),
      color: finalColor,
    });

    // Reset form
    setName('');
    setColor(COLOR_PALETTE[0]);
    setCustomColor('');
    onOpenChange(false);
  };

  const handleClose = () => {
    setName('');
    setColor(COLOR_PALETTE[0]);
    setCustomColor('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:!max-w-[340px]" showCloseButton={false}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Tag</DialogTitle>
            <DialogDescription>
              Add a custom tag to organize your tasks and notes.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Tag Name */}
            <div className="space-y-2">
              <Label htmlFor="tag-name">Tag Name</Label>
              <Input
                id="tag-name"
                placeholder="e.g., Project, Meeting, Idea"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9"
                autoFocus
              />
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-3">
                {COLOR_PALETTE.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setColor(c);
                      setCustomColor('');
                    }}
                    className={cn(
                      'w-7 h-7 rounded-full transition-all',
                      color === c && !customColor
                        ? 'ring-2 ring-offset-2 ring-offset-background ring-foreground scale-110'
                        : 'hover:scale-110'
                    )}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Custom Color */}
            <div className="space-y-2">
              <Label htmlFor="custom-color">Custom Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="custom-color"
                  type="color"
                  value={customColor || color}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-12 h-9 p-1 cursor-pointer"
                />
                <Input
                  placeholder="#RRGGBB"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="flex-1 h-9 font-mono text-sm"
                />
              </div>
            </div>

            {/* Preview */}
            {name && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
                    style={{
                      backgroundColor: `${customColor || color}20`,
                      color: customColor || color,
                    }}
                  >
                    {name}
                  </span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Create Tag
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
