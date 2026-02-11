import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  parseLocalDate,
  formatDate,
  getDateVariant,
  dateToLocalString,
  getLocalToday,
} from './extensions/DatePill';

/*
 * DatePillComponent
 * Interactive date pill with Taskmate-style Calendar date picker popup.
 * Calendar is centered at top, quick date buttons below, then clear button.
 * Clicking the pill opens the picker; selecting a date updates the pill.
 */

export function DatePillComponent({ node, updateAttributes, selected }: NodeViewProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });
  const pillRef = useRef<HTMLSpanElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const dateValue = node.attrs.date || getLocalToday();
  const displayDate = formatDate(dateValue);
  const variant = getDateVariant(dateValue);
  const selectedDate = parseLocalDate(dateValue);

  // Detect theme from closest data-theme ancestor
  const getTheme = useCallback(() => {
    if (!pillRef.current) return '';
    const container = pillRef.current.closest('.markdown-editor-container');
    if (container) {
      const t = container.getAttribute('data-theme');
      if (t) return t;
    }
    const ancestor = pillRef.current.closest('[data-theme]');
    return ancestor?.getAttribute('data-theme') || '';
  }, []);

  const computePosition = useCallback(() => {
    if (!pillRef.current) return;
    const rect = pillRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const pickerWidth = 320;
    const pickerHeight = 420;

    let top = rect.bottom + 8;
    let left = rect.left;

    // Ensure picker doesn't go off-screen right
    if (left + pickerWidth > viewportWidth - 16) {
      left = viewportWidth - pickerWidth - 16;
    }
    // Ensure picker doesn't go off-screen bottom
    if (top + pickerHeight > viewportHeight - 16) {
      top = rect.top - pickerHeight - 8;
    }
    // Ensure picker doesn't go off-screen left
    if (left < 16) left = 16;

    setPickerPosition({ top, left });
  }, []);

  // Note: React onClick is NOT used because ProseMirror's event handling
  // causes both React synthetic and native DOM events to fire, resulting in
  // a double-toggle. We use only the native DOM listener (useEffect below).

  // Native DOM click listener as fallback for ProseMirror intercepting React events
  useEffect(() => {
    const el = pillRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      computePosition();
      setIsPickerOpen((prev) => !prev);
    };
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  }, [computePosition]);

  // Handle calendar date selection
  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      updateAttributes({ date: dateToLocalString(date) });
    }
    setIsPickerOpen(false);
  };

  // Handle quick date buttons
  const handleQuickDate = (daysFromToday: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromToday);
    updateAttributes({ date: dateToLocalString(d) });
    setIsPickerOpen(false);
  };

  // Handle next Monday
  const handleNextMonday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek);
    const d = new Date();
    d.setDate(d.getDate() + daysUntilMonday);
    updateAttributes({ date: dateToLocalString(d) });
    setIsPickerOpen(false);
  };

  // Handle clear (remove date pill)
  const handleClear = () => {
    setIsPickerOpen(false);
  };

  // Close picker when clicking outside or pressing Escape
  useEffect(() => {
    if (!isPickerOpen) return;

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

    const handleScroll = () => {
      setIsPickerOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    // Close on scroll of any scrollable parent
    const scrollParent = pillRef.current?.closest('.ProseMirror') || document;
    scrollParent.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      scrollParent.removeEventListener('scroll', handleScroll);
    };
  }, [isPickerOpen]);

  // Quick date comparison helpers
  const today = new Date();
  const todayStr = today.toDateString();
  const tomorrowDate = new Date(today);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowStr = tomorrowDate.toDateString();
  const dayOfWeek = today.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek);
  const nextMondayDate = new Date(today);
  nextMondayDate.setDate(nextMondayDate.getDate() + daysUntilMonday);
  const nextMondayStr = nextMondayDate.toDateString();

  const theme = getTheme();

  return (
    <NodeViewWrapper as="span" className="inline">
      <span
        ref={pillRef}

        className={`date-pill ${variant} ${selected ? 'ProseMirror-selectednode' : ''} cursor-pointer`}
        contentEditable={false}
        data-type="date-pill"
        data-date={dateValue}
      >
        <CalendarIcon size={14} className="date-icon" />
        <span className="date-text">{displayDate}</span>
      </span>

      {isPickerOpen &&
        createPortal(
          <div
            ref={pickerRef}
            className={cn(
              'date-picker-portal',
              theme === 'dark' ? 'dark' : ''
            )}
            data-theme={theme}
            style={{
              position: 'fixed',
              top: pickerPosition.top,
              left: pickerPosition.left,
              zIndex: 9999,
            }}
          >
            <div className="date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden">
              <div className="flex flex-col">
                {/* Calendar at top, centered */}
                <div className="flex justify-center p-1">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleSelectDate}
                    initialFocus
                  />
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Quick date buttons below calendar */}
                <div className="flex items-center justify-center gap-2 px-3 py-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      'rounded-full text-xs',
                      selectedDate.toDateString() === todayStr && 'ring-2 ring-primary'
                    )}
                    onClick={() => handleQuickDate(0)}
                  >
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      'rounded-full text-xs',
                      selectedDate.toDateString() === tomorrowStr && 'ring-2 ring-primary'
                    )}
                    onClick={() => handleQuickDate(1)}
                  >
                    Tomorrow
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      'rounded-full text-xs',
                      selectedDate.toDateString() === nextMondayStr && 'ring-2 ring-primary'
                    )}
                    onClick={handleNextMonday}
                  >
                    Next Monday
                  </Button>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Close / clear button */}
                <button
                  onClick={handleClear}
                  className="flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </NodeViewWrapper>
  );
}

export default DatePillComponent;
