/**
 * DateSuggestionChip Component
 * Shows a detected date phrase with Apply/Dismiss actions.
 * Appears below the title input when a natural language date is detected.
 */

import { memo } from 'react';
import { Calendar, Check, X } from 'lucide-react';
import { formatDetectedDate } from '@/lib/dateParser';
import { motion, AnimatePresence } from 'framer-motion';

interface DateSuggestionChipProps {
  /** The detected date */
  date: Date;
  /** The matched text from the title */
  matchedText: string;
  /** Callback when user accepts the date suggestion */
  onApply: () => void;
  /** Callback when user dismisses the suggestion */
  onDismiss: () => void;
  /** Whether to show the chip */
  visible: boolean;
}

export const DateSuggestionChip = memo(function DateSuggestionChip({
  date,
  matchedText,
  onApply,
  onDismiss,
  visible,
}: DateSuggestionChipProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-2 py-1">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs">
              <Calendar className="w-3 h-3 text-primary" />
              <span className="text-primary font-medium">
                Set due: {formatDetectedDate(date)}
              </span>
              <span className="text-muted-foreground">
                from "{matchedText}"
              </span>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onApply();
              }}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
              title="Apply due date"
            >
              <Check className="w-3 h-3" />
              Apply
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDismiss();
              }}
              className="flex items-center justify-center w-5 h-5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default DateSuggestionChip;
