import { Node, mergeAttributes, InputRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { DatePillComponent } from '../DatePillComponent';

/*
 * DatePill Extension
 * Creates inline date pills with rounded corners and click-to-edit date picker
 * Useful for log and task-based notes
 */

export interface DatePillOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    datePill: {
      /**
       * Insert a date pill
       */
      insertDatePill: (date?: string) => ReturnType;
      /**
       * Update a date pill
       */
      updateDatePill: (date: string) => ReturnType;
    };
  }
}

// Helper to format date for display (used for HTML rendering)
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

export const DatePill = Node.create<DatePillOptions>({
  name: 'datePill',

  group: 'inline',

  inline: true,

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      date: {
        default: new Date().toISOString().split('T')[0],
        parseHTML: (element) => element.getAttribute('data-date'),
        renderHTML: (attributes) => ({
          'data-date': attributes.date,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="date-pill"]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const date = node.attrs.date;
    const displayDate = formatDate(date);
    const variant = getDateVariant(date);

    return [
      'span',
      mergeAttributes(
        this.options.HTMLAttributes,
        HTMLAttributes,
        {
          'data-type': 'date-pill',
          class: `date-pill ${variant}`.trim(),
        }
      ),
      [
        'span',
        { class: 'date-icon' },
        '📅',
      ],
      [
        'span',
        { class: 'date-text' },
        displayDate,
      ],
    ];
  },

  // Use React component for interactive editing
  addNodeView() {
    return ReactNodeViewRenderer(DatePillComponent);
  },

  addCommands() {
    return {
      insertDatePill:
        (date?: string) =>
        ({ commands }) => {
          const dateValue = date || new Date().toISOString().split('T')[0];
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
      // Type Ctrl+Shift+D to insert a date pill
      'Mod-Shift-d': () => {
        return this.editor.commands.insertDatePill();
      },
    };
  },

  addInputRules() {
    const todayRule = new InputRule({
      find: /@today\s$/,
      handler: ({ state, range, chain }) => {
        const today = new Date().toISOString().split('T')[0];
        chain()
          .deleteRange(range)
          .insertDatePill(today)
          .run();
      },
    });

    const tomorrowRule = new InputRule({
      find: /@tomorrow\s$/,
      handler: ({ state, range, chain }) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        chain()
          .deleteRange(range)
          .insertDatePill(tomorrow.toISOString().split('T')[0])
          .run();
      },
    });

    const yesterdayRule = new InputRule({
      find: /@yesterday\s$/,
      handler: ({ state, range, chain }) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        chain()
          .deleteRange(range)
          .insertDatePill(yesterday.toISOString().split('T')[0])
          .run();
      },
    });

    const isoDateRule = new InputRule({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ state, range, chain, match }) => {
        const date = match[1];
        chain()
          .deleteRange(range)
          .insertDatePill(date)
          .run();
      },
    });

    const monthDayRule = new InputRule({
      find: /@([A-Za-z]{3})\s?(\d{1,2})\s$/,
      handler: ({ state, range, chain, match }) => {
        const monthStr = match[1];
        const day = parseInt(match[2], 10);
        const months: Record<string, number> = {
          jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
          jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
        };
        const monthNum = months[monthStr.toLowerCase()];
        if (monthNum !== undefined) {
          const year = new Date().getFullYear();
          const date = new Date(year, monthNum, day);
          chain()
            .deleteRange(range)
            .insertDatePill(date.toISOString().split('T')[0])
            .run();
        }
      },
    });

    return [todayRule, tomorrowRule, yesterdayRule, isoDateRule, monthDayRule];
  },
});

export default DatePill;
