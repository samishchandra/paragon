import { Node, mergeAttributes, InputRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { DatePillComponent } from '../DatePillComponent';

/*
 * DatePill Extension
 * Creates inline date pills with rounded corners and click-to-edit date picker
 * Stores dates as YYYY-MM-DD strings, renders as relative or formatted dates
 * Markdown format: @Mon DD, YYYY@ (e.g., @Feb 11, 2025@)
 */

export interface DatePillOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    datePill: {
      /** Insert a date pill */
      insertDatePill: (date?: string) => ReturnType;
      /** Update a date pill */
      updateDatePill: (date: string) => ReturnType;
    };
  }
}

/**
 * Parse a YYYY-MM-DD string into a local Date (avoids UTC timezone shift).
 * This is the ROOT FIX for the "1 day off" bug: new Date('2025-02-11')
 * parses as UTC midnight, which is Feb 10 in US timezones.
 */
export function parseLocalDate(dateStr: string): Date {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  }
  // Fallback: try to parse, but force local
  const d = new Date(dateStr);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Get today's date as YYYY-MM-DD in local timezone */
export function getLocalToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Get a date offset from today as YYYY-MM-DD */
export function getLocalDateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Convert a Date object to YYYY-MM-DD string using local timezone */
export function dateToLocalString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

/** Format date for display (Today, Tomorrow, Yesterday, or "Jan 15" / "Jan 15, 2025") */
export function formatDate(dateStr: string): string {
  const date = parseLocalDate(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check for next Monday
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon, ...
  const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek);
  const nextMonday = new Date(today);
  nextMonday.setDate(nextMonday.getDate() + daysUntilMonday);

  if (date.getTime() === today.getTime()) return 'Today';
  if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';
  if (date.getTime() === yesterday.getTime()) return 'Yesterday';
  if (date.getTime() === nextMonday.getTime()) return 'Next Monday';

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  if (date.getFullYear() !== today.getFullYear()) {
    options.year = 'numeric';
  }
  return date.toLocaleDateString('en-US', options);
}

/** Format date for markdown serialization: "Feb 11, 2025" */
export function formatDateForMarkdown(dateStr: string): string {
  const date = parseLocalDate(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Parse a markdown date string like "Feb 11, 2025" or "Mar 3, 2025" back to YYYY-MM-DD */
export function parseDateFromMarkdown(mdDate: string): string | null {
  const trimmed = mdDate.trim();

  // Check relative keywords first
  const lower = trimmed.toLowerCase();
  if (lower === 'today') return getLocalToday();
  if (lower === 'tomorrow') return getLocalDateOffset(1);
  if (lower === 'yesterday') return getLocalDateOffset(-1);
  if (lower === 'next monday') {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek);
    return getLocalDateOffset(daysUntilMonday);
  }

  // Try parsing "Mon DD, YYYY" or "Mon DD YYYY" or "Mon DD"
  const dateMatch = trimmed.match(/^([A-Za-z]+)\s+(\d{1,2})(?:,?\s*(\d{4}))?$/);
  if (dateMatch) {
    const months: Record<string, number> = {
      jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2,
      apr: 3, april: 3, may: 4, jun: 5, june: 5,
      jul: 6, july: 6, aug: 7, august: 7, sep: 8, september: 8,
      oct: 9, october: 9, nov: 10, november: 10, dec: 11, december: 11,
    };
    const monthNum = months[dateMatch[1].toLowerCase()];
    if (monthNum !== undefined) {
      const day = parseInt(dateMatch[2], 10);
      const year = dateMatch[3] ? parseInt(dateMatch[3], 10) : new Date().getFullYear();
      const d = new Date(year, monthNum, day);
      return dateToLocalString(d);
    }
  }

  // Try ISO format YYYY-MM-DD
  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) return trimmed;

  // Try MM/DD/YYYY
  const slashMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slashMatch) {
    const d = new Date(parseInt(slashMatch[3], 10), parseInt(slashMatch[1], 10) - 1, parseInt(slashMatch[2], 10));
    return dateToLocalString(d);
  }

  return null;
}

/** Determine date variant for styling */
export function getDateVariant(dateStr: string): string {
  const date = parseLocalDate(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  if (date.getTime() === today.getTime()) return 'date-today';
  if (date < today) return 'date-overdue';
  if (date <= nextWeek) return 'date-upcoming';
  return '';
}

export const DatePill = Node.create<DatePillOptions>({
  name: 'datePill',
  group: 'inline',
  inline: true,
  atom: true,

  addOptions() {
    return { HTMLAttributes: {} };
  },

  addAttributes() {
    return {
      date: {
        default: getLocalToday(),
        parseHTML: (element) => element.getAttribute('data-date'),
        renderHTML: (attributes) => ({ 'data-date': attributes.date }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-type="date-pill"]' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const date = node.attrs.date;
    const displayDate = formatDate(date);
    const variant = getDateVariant(date);

    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': 'date-pill',
        class: `date-pill ${variant}`.trim(),
      }),
      ['span', { class: 'date-icon' }, '📅'],
      ['span', { class: 'date-text' }, displayDate],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DatePillComponent, {
      stopEvent: ({ event }) => {
        // Allow click and mousedown events to pass through to the React component
        // so the date picker can open. ProseMirror normally intercepts these for atom nodes.
        if (event.type === 'click' || event.type === 'mousedown') {
          return true;
        }
        return false;
      },
    });
  },

  addCommands() {
    return {
      insertDatePill:
        (date?: string) =>
        ({ commands }) => {
          const dateValue = date || getLocalToday();
          return commands.insertContent({
            type: this.name,
            attrs: { date: dateValue },
          });
        },
      updateDatePill:
        (date: string) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { date });
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-d': () => this.editor.commands.insertDatePill(),
    };
  },

  addInputRules() {
    const todayRule = new InputRule({
      find: /@today\s$/,
      handler: ({ range, chain }) => {
        chain().deleteRange(range).insertDatePill(getLocalToday()).run();
      },
    });

    const tomorrowRule = new InputRule({
      find: /@tomorrow\s$/,
      handler: ({ range, chain }) => {
        chain().deleteRange(range).insertDatePill(getLocalDateOffset(1)).run();
      },
    });

    const yesterdayRule = new InputRule({
      find: /@yesterday\s$/,
      handler: ({ range, chain }) => {
        chain().deleteRange(range).insertDatePill(getLocalDateOffset(-1)).run();
      },
    });

    const isoDateRule = new InputRule({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range, chain, match }) => {
        chain().deleteRange(range).insertDatePill(match[1]).run();
      },
    });

    const monthDayRule = new InputRule({
      find: /@([A-Za-z]{3})\s?(\d{1,2})\s$/,
      handler: ({ range, chain, match }) => {
        const months: Record<string, number> = {
          jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
          jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
        };
        const monthNum = months[match[1].toLowerCase()];
        if (monthNum !== undefined) {
          const year = new Date().getFullYear();
          const d = new Date(year, monthNum, parseInt(match[2], 10));
          chain().deleteRange(range).insertDatePill(dateToLocalString(d)).run();
        }
      },
    });

    return [todayRule, tomorrowRule, yesterdayRule, isoDateRule, monthDayRule];
  },
});

export default DatePill;
