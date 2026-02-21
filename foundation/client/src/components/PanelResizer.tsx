/**
 * PanelResizer Component
 * A draggable divider between panels for resizing
 * Appears as a single subtle line that highlights on hover
 */

import { cn } from '@/lib/utils';

interface PanelResizerProps {
  onMouseDown: (e: React.MouseEvent) => void;
  isResizing: boolean;
  className?: string;
}

export function PanelResizer({ onMouseDown, isResizing, className }: PanelResizerProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      className={cn(
        'group relative w-px h-full cursor-col-resize flex-shrink-0 z-10',
        'bg-border transition-colors duration-150',
        'hover:bg-primary/50',
        isResizing && 'bg-primary',
        className
      )}
    >
      {/* Wider hit area for easier grabbing */}
      <div className="absolute inset-y-0 -left-1.5 -right-1.5" />
    </div>
  );
}
