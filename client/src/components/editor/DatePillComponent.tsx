import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { useRef, useEffect, useCallback } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { createRoot, Root } from 'react-dom/client';
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
 * DatePillComponent — Standalone Picker Architecture
 *
 * Problem: When the date picker is rendered as part of the NodeView component
 * (via createPortal or inline), ProseMirror/TipTap recreates NodeViews on
 * document transactions, causing the React component to unmount and remount.
 * This destroys the picker state.
 *
 * Solution: The picker is managed as a completely standalone React root
 * attached to document.body. It is NOT part of any NodeView's React tree.
 * The picker communicates with the pill via a global singleton that stores
 * the update callback. When the NodeView unmounts and remounts, the picker
 * remains untouched because it's a separate React root.
 *
 * Event handling challenge:
 * - Radix Dialog sets `document.body.style.pointerEvents = "none"` when open
 * - The standalone picker portal is on document.body, so it inherits pointer-events: none
 * - We set pointer-events: auto on the picker to override this
 * - React 18 attaches event delegation to the root container element
 * - We must NOT stopPropagation on elements INSIDE the picker, as that would
 *   prevent events from reaching the React root (container) for delegation
 * - Instead, we stop propagation on the container itself (the React root boundary)
 *   so events don't escape to the Dialog's DismissableLayer
 */

// ─── Global Picker Singleton ─────────────────────────────────────────────────

interface PickerInstance {
  container: HTMLDivElement;
  root: Root;
  pillDate: string; // data-date of the pill that opened this picker
}

let activePicker: PickerInstance | null = null;

// Global map: data-date value → updateAttributes callback
// When a NodeView remounts, it re-registers here so the picker can still call it
const updateCallbacks = new Map<string, (date: string) => void>();
const themeCallbacks = new Map<string, () => string>();

function destroyPicker() {
  if (!activePicker) return;
  const picker = activePicker;
  activePicker = null;
  // Defer unmount to avoid "synchronously unmount during render" error
  setTimeout(() => {
    try {
      picker.root.unmount();
    } catch {
      // ignore
    }
    picker.container.remove();
  }, 0);
}

function isPickerOpenForDate(dateAttr: string): boolean {
  return activePicker?.pillDate === dateAttr;
}

// ─── Standalone Picker React Component ───────────────────────────────────────

function PickerUI({
  currentDate,
  theme,
  position,
  onSelectDate,
  onClose,
}: {
  currentDate: string;
  theme: string;
  position: { top: number; left: number; direction: 'below' | 'above'; pillCenter: number };
  onSelectDate: (date: string) => void;
  onClose: () => void;
}) {
  const pickerRef = useRef<HTMLDivElement>(null);
  const selectedDate = parseLocalDate(currentDate);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape, true);
    return () => document.removeEventListener('keydown', handleEscape, true);
  }, [onClose]);

  // Close on click outside (delayed to avoid the opening click)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        // Also check if the click is on a date-pill (toggle behavior)
        const target = e.target as HTMLElement;
        if (!target.closest('.date-pill')) {
          onClose();
        }
      }
    };
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside, true);
    }, 50);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [onClose]);

  const handleSelectDate = useCallback((date: Date | undefined) => {
    if (date) {
      onSelectDate(dateToLocalString(date));
    }
    onClose();
  }, [onSelectDate, onClose]);

  const handleQuickDate = useCallback((daysFromToday: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromToday);
    onSelectDate(dateToLocalString(d));
    onClose();
  }, [onSelectDate, onClose]);

  const handleNextMonday = useCallback(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek);
    const d = new Date();
    d.setDate(d.getDate() + daysUntilMonday);
    onSelectDate(dateToLocalString(d));
    onClose();
  }, [onSelectDate, onClose]);

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

  return (
    <div
      ref={pickerRef}
      className={cn('date-picker-portal', theme === 'dark' ? 'dark' : '')}
      data-theme={theme}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 99999,
        pointerEvents: 'auto',
        animation: position.direction === 'above'
          ? 'picker-slide-up 0.15s ease-out'
          : 'picker-slide-down 0.15s ease-out',
        transformOrigin: position.direction === 'above' ? 'bottom center' : 'top center',
      }}
    >
      {/* Arrow pointing to the pill */}
      <div
        className="date-picker-arrow"
        style={{
          position: 'absolute',
          left: Math.max(12, Math.min(position.pillCenter - position.left, 280)) + 'px',
          ...(position.direction === 'below'
            ? { top: '-6px' }
            : { bottom: '-6px' }),
          width: '12px',
          height: '12px',
          transform: position.direction === 'below' ? 'rotate(45deg)' : 'rotate(225deg)',
          zIndex: -1,
        }}
      />
      <div className="date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden">
        <div className="flex flex-col">
          <div className="flex justify-center p-1">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelectDate}
            />
          </div>
          <div className="border-t border-border" />
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

        </div>
      </div>
    </div>
  );
}

// ─── Open Picker Function ────────────────────────────────────────────────────

function openPickerForPill(pillEl: HTMLElement, dateAttr: string, theme: string) {
  // If picker is already open for this pill, close it (toggle)
  if (isPickerOpenForDate(dateAttr)) {
    destroyPicker();
    return;
  }

  // Close any existing picker
  destroyPicker();

  // Compute position with smart direction detection
  const rect = pillEl.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const pickerWidth = 320;
  const pickerHeight = 420;
  const gap = 10; // gap between pill and picker
  const margin = 16; // minimum margin from viewport edges

  // Determine direction: prefer below, but flip above if not enough space
  const spaceBelow = viewportHeight - rect.bottom - gap - margin;
  const spaceAbove = rect.top - gap - margin;
  const direction: 'below' | 'above' =
    spaceBelow >= pickerHeight ? 'below' :
    spaceAbove >= pickerHeight ? 'above' :
    spaceBelow >= spaceAbove ? 'below' : 'above';

  let top: number;
  if (direction === 'below') {
    top = rect.bottom + gap;
  } else {
    top = rect.top - pickerHeight - gap;
  }

  // Horizontal: center on pill, clamp to viewport
  const pillCenter = rect.left + rect.width / 2;
  let left = pillCenter - pickerWidth / 2;
  if (left + pickerWidth > viewportWidth - margin) {
    left = viewportWidth - pickerWidth - margin;
  }
  if (left < margin) left = margin;

  // Create standalone container - this is the React root boundary.
  // pointer-events: auto overrides the body's pointer-events: none (set by Radix Dialog).
  // We attach event listeners on this container to stop events from propagating
  // to the Radix Dialog's DismissableLayer, but since React 18 attaches its
  // event delegation listeners to this same container, React events still work.
  const container = document.createElement('div');
  container.setAttribute('data-date-picker-standalone', dateAttr);
  container.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;';
  document.body.appendChild(container);

  // Stop events from escaping the container to the Dialog's DismissableLayer.
  // These listeners are on the container (React root), so React's event delegation
  // fires BEFORE these bubble-phase handlers. React processes the event via its
  // internal capture/bubble simulation, then our handler stops it from going further.
  const stopEvents = ['mousedown', 'mouseup', 'click', 'pointerdown', 'pointerup', 'touchstart', 'touchend', 'focusin', 'focusout'];
  stopEvents.forEach(evt => {
    container.addEventListener(evt, (e: Event) => {
      e.stopPropagation();
    }, false); // bubble phase on the container itself
  });

  const root = createRoot(container);
  activePicker = { container, root, pillDate: dateAttr };

  const handleClose = () => {
    destroyPicker();
  };

  const handleSelectDate = (newDate: string) => {
    // Find the latest callback for this pill's date
    const cb = updateCallbacks.get(dateAttr);
    if (cb) {
      cb(newDate);
    }
  };

  root.render(
    <PickerUI
      currentDate={dateAttr}
      theme={theme}
      position={{ top, left, direction, pillCenter }}
      onSelectDate={handleSelectDate}
      onClose={handleClose}
    />
  );
}

// ─── DatePill NodeView Component ─────────────────────────────────────────────

export function DatePillComponent({ node, updateAttributes, selected }: NodeViewProps) {
  const pillRef = useRef<HTMLSpanElement>(null);

  const dateValue = node.attrs.date || getLocalToday();
  const displayDate = formatDate(dateValue);
  const variant = getDateVariant(dateValue);

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

  // Register the update callback so the standalone picker can call it
  // This runs on every mount (including remounts after ProseMirror recreates the NodeView)
  useEffect(() => {
    updateCallbacks.set(dateValue, (newDate: string) => {
      updateAttributes({ date: newDate });
    });
    themeCallbacks.set(dateValue, getTheme);

    return () => {
      // Do NOT close the picker on unmount!
      // The picker is standalone and should survive NodeView recreation.
    };
  }, [dateValue, updateAttributes, getTheme]);

  // Native DOM click listener on the pill to toggle picker
  useEffect(() => {
    const el = pillRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      const date = el.getAttribute('data-date') || getLocalToday();
      const theme = getTheme();
      openPickerForPill(el, date, theme);
    };
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  }, [getTheme]);

  // Close picker on scroll of any scrollable parent
  useEffect(() => {
    const scrollParent = pillRef.current?.closest('.ProseMirror') || document;
    const handleScroll = () => {
      if (activePicker) {
        destroyPicker();
      }
    };
    scrollParent.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollParent.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    </NodeViewWrapper>
  );
}

export default DatePillComponent;
