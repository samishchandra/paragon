import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';

/*
 * DatePillComponent
 * Interactive date pill with click-to-edit date picker popup
 * Displays formatted date with color variants based on date status
 */

// Helper to format date for display
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Reset time for comparison
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date.getTime() === today.getTime()) {
    return 'Today';
  }
  if (date.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  }
  if (date.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  }

  // Format as "Jan 15" or "Jan 15, 2025" if different year
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };
  
  if (date.getFullYear() !== today.getFullYear()) {
    options.year = 'numeric';
  }

  return date.toLocaleDateString('en-US', options);
}

// Helper to determine date variant
function getDateVariant(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  // Reset time for comparison
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date.getTime() === today.getTime()) {
    return 'date-today';
  }
  if (date < today) {
    return 'date-overdue';
  }
  if (date <= nextWeek) {
    return 'date-upcoming';
  }
  return '';
}

export function DatePillComponent({ node, updateAttributes, selected }: NodeViewProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });
  const pillRef = useRef<HTMLSpanElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const dateValue = node.attrs.date || new Date().toISOString().split('T')[0];
  const displayDate = formatDate(dateValue);
  const variant = getDateVariant(dateValue);

  // Handle click on date pill to open picker
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (pillRef.current) {
      const rect = pillRef.current.getBoundingClientRect();
      setPickerPosition({
        top: rect.bottom + 8,
        left: rect.left,
      });
    }
    
    setIsPickerOpen(true);
  };

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (newDate) {
      updateAttributes({ date: newDate });
      setIsPickerOpen(false);
    }
  };

  // Handle quick date buttons
  const setQuickDate = (daysFromToday: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    updateAttributes({ date: date.toISOString().split('T')[0] });
    setIsPickerOpen(false);
  };

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        pickerRef.current && 
        !pickerRef.current.contains(e.target as Node) &&
        pillRef.current &&
        !pillRef.current.contains(e.target as Node)
      ) {
        setIsPickerOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPickerOpen(false);
      }
    };

    if (isPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      // Focus the date input when picker opens
      setTimeout(() => inputRef.current?.focus(), 50);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isPickerOpen]);

  return (
    <NodeViewWrapper as="span" className="inline">
      <span
        ref={pillRef}
        onClick={handleClick}
        className={`date-pill ${variant} ${selected ? 'ProseMirror-selectednode' : ''} cursor-pointer`}
        contentEditable={false}
        data-type="date-pill"
        data-date={dateValue}
      >
        <Calendar size={14} className="date-icon" />
        <span className="date-text">{displayDate}</span>
      </span>

      {isPickerOpen && (
        <div
          ref={pickerRef}
          className="date-picker-popup"
          style={{
            position: 'fixed',
            top: pickerPosition.top,
            left: pickerPosition.left,
            zIndex: 100,
          }}
        >
          {/* Quick date buttons */}
          <div className="flex gap-1 mb-3">
            <button
              type="button"
              onClick={() => setQuickDate(0)}
              className="quick-date-btn"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setQuickDate(1)}
              className="quick-date-btn"
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => setQuickDate(7)}
              className="quick-date-btn"
            >
              Next Week
            </button>
          </div>

          {/* Date input */}
          <div className="relative">
            <input
              ref={inputRef}
              type="date"
              value={dateValue}
              onChange={handleDateChange}
              className="date-picker-input"
            />
          </div>

          {/* Clear button */}
          <div className="mt-2 pt-2 border-t border-border">
            <button
              type="button"
              onClick={() => {
                setIsPickerOpen(false);
              }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </NodeViewWrapper>
  );
}

export default DatePillComponent;
