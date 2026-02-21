/**
 * Section Component — Collapsible section wrapper for item groups in the middle panel.
 * Uses dnd-kit sortable for drag-and-drop section targeting, and motion for collapse animation.
 */
import { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export interface SectionProps {
  id: string;
  title: string;
  count: number;
  isCollapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  color?: string;
  description?: string;
  hideHeader?: boolean;
}

export const Section = memo(function Section({ id, title, count, isCollapsed, onToggle, children, icon, color, description, hideHeader }: SectionProps) {
  const { setNodeRef } = useSortable({
    id,
    data: { type: 'section' },
  });
  if (hideHeader) {
    return (
      <div ref={setNodeRef} className="space-y-0">
        {children}
      </div>
    );
  }
  return (
    <div ref={setNodeRef} className="space-y-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center py-1.5 pl-3 pr-3 rounded-md hover:bg-muted/40 transition-colors group"
      >
        {/* Icon - aligned with list item checkbox */}
        {icon && <span className={cn("shrink-0", color || "text-muted-foreground")}>{icon}</span>}
        {/* Title - left aligned with list item title */}
        <span className={cn("text-sm font-semibold ml-2", color || "text-foreground")}>{title}</span>
        {/* Chevron - next to title, hidden when expanded (shows on hover), always visible when collapsed */}
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 90 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn(
            "w-4 h-4 flex items-center justify-center shrink-0 text-muted-foreground ml-1 transition-opacity duration-200",
            isCollapsed ? "opacity-100" : "opacity-0 group-hover:opacity-60"
          )}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.div>
        {/* Spacer to push count to right */}
        <span className="flex-1" />
        {/* Count - right aligned */}
        {count > 0 && <span className="text-xs text-muted-foreground font-mono">{count}</span>}
      </button>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="space-y-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
