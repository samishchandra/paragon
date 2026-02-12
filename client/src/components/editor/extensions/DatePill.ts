import { Node, mergeAttributes, InputRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { DatePillComponent } from '../DatePillComponent';

/*
 * DatePill Extension
 * Creates inline date pills with rounded corners and click-to-edit date picker
 * Stores dates as YYYY-MM-DD strings, renders as relative or formatted dates
 * Markdown format: @Mon DD, YYYY@ (e.g., @Feb 11, 2025@)
 * 
 * Auto-detection triggers:
 * 1. Typing: @today , @tomorrow , @mar15 , @2025-03-24 , etc. (space-terminated)
 * 2. Typing: @mar 24, 2025@ (closing @ terminates)
 * 3. Pasting: text containing @date@ patterns is auto-converted
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

/** Plugin key for the date pill paste handler */
const datePillPastePluginKey = new PluginKey('datePillPaste');

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
    // Rule 1: @today (space-terminated)
    const todayRule = new InputRule({
      find: /@today\s$/,
      handler: ({ range, chain }) => {
        chain().deleteRange(range).insertDatePill(getLocalToday()).run();
      },
    });

    // Rule 2: @tomorrow (space-terminated)
    const tomorrowRule = new InputRule({
      find: /@tomorrow\s$/,
      handler: ({ range, chain }) => {
        chain().deleteRange(range).insertDatePill(getLocalDateOffset(1)).run();
      },
    });

    // Rule 3: @yesterday (space-terminated)
    const yesterdayRule = new InputRule({
      find: /@yesterday\s$/,
      handler: ({ range, chain }) => {
        chain().deleteRange(range).insertDatePill(getLocalDateOffset(-1)).run();
      },
    });

    // Rule 4: @2025-03-24 (ISO date, space-terminated)
    const isoDateRule = new InputRule({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range, chain, match }) => {
        chain().deleteRange(range).insertDatePill(match[1]).run();
      },
    });

    // Rule 5: @mar15 or @mar 15 (month + day, space-terminated)
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

    // Rule 6: @mar 24, 2025@ — closing @ terminates (full date with year)
    // Matches: @Mon DD, YYYY@, @Month DD, YYYY@, @Mon DD YYYY@
    const fullDateClosingRule = new InputRule({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range, chain, match }) => {
        const parsed = parseDateFromMarkdown(match[1]);
        if (parsed) {
          chain().deleteRange(range).insertDatePill(parsed).run();
        }
      },
    });

    // Rule 7: @today@, @tomorrow@, @yesterday@ — closing @ terminates
    const relativeClosingRule = new InputRule({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range, chain, match }) => {
        const parsed = parseDateFromMarkdown(match[1]);
        if (parsed) {
          chain().deleteRange(range).insertDatePill(parsed).run();
        }
      },
    });

    // Rule 8: @2025-03-24@ — ISO date with closing @
    const isoClosingRule = new InputRule({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range, chain, match }) => {
        chain().deleteRange(range).insertDatePill(match[1]).run();
      },
    });

    // Rule 9: @mar 24@ or @march 24@ — month + day with closing @
    const monthDayClosingRule = new InputRule({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range, chain, match }) => {
        const parsed = parseDateFromMarkdown(match[1]);
        if (parsed) {
          chain().deleteRange(range).insertDatePill(parsed).run();
        }
      },
    });

    // Rule 10: @03/24/2025@ — MM/DD/YYYY with closing @
    const slashDateClosingRule = new InputRule({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range, chain, match }) => {
        const parsed = parseDateFromMarkdown(match[1]);
        if (parsed) {
          chain().deleteRange(range).insertDatePill(parsed).run();
        }
      },
    });

    return [
      todayRule, tomorrowRule, yesterdayRule, isoDateRule, monthDayRule,
      fullDateClosingRule, relativeClosingRule, isoClosingRule,
      monthDayClosingRule, slashDateClosingRule,
    ];
  },

  addProseMirrorPlugins() {
    const datePillType = this.type;

    return [
      new Plugin({
        key: datePillPastePluginKey,
        props: {
          handlePaste(view, event) {
            const clipboardData = event.clipboardData;
            if (!clipboardData) return false;

            const text = clipboardData.getData('text/plain');
            const html = clipboardData.getData('text/html');

            // If there's HTML with date pills already, let the default handler process it
            if (html && html.includes('data-type="date-pill"')) return false;

            // Check if the pasted text contains @date@ patterns
            const datePattern = /@([^@\n]+)@/g;
            let hasDatePatterns = false;
            let testMatch: RegExpExecArray | null;
            
            // First pass: check if any @...@ patterns are valid dates
            const tempRegex = new RegExp(datePattern.source, datePattern.flags);
            while ((testMatch = tempRegex.exec(text)) !== null) {
              if (parseDateFromMarkdown(testMatch[1])) {
                hasDatePatterns = true;
                break;
              }
            }

            if (!hasDatePatterns) return false;

            // Build content array: split text by @date@ patterns and create
            // alternating text nodes and date pill nodes
            const { state } = view;
            const { tr, schema } = state;
            const contentNodes: any[] = [];
            let lastIndex = 0;
            const regex = new RegExp(datePattern.source, datePattern.flags);
            let match: RegExpExecArray | null;

            while ((match = regex.exec(text)) !== null) {
              const dateText = match[1];
              const parsed = parseDateFromMarkdown(dateText);

              if (parsed) {
                // Add text before the date pattern
                const beforeText = text.slice(lastIndex, match.index);
                if (beforeText) {
                  contentNodes.push(schema.text(beforeText));
                }
                // Add date pill node
                contentNodes.push(datePillType.create({ date: parsed }));
                lastIndex = match.index + match[0].length;
              }
              // If not a valid date, skip — the text will be included as-is
            }

            // Add remaining text after the last match
            const remainingText = text.slice(lastIndex);
            if (remainingText) {
              contentNodes.push(schema.text(remainingText));
            }

            if (contentNodes.length === 0) return false;

            // Insert the content
            const fragment = schema.nodes.doc.create(
              null,
              schema.nodes.paragraph.create(null, contentNodes)
            );

            // If pasting into an existing paragraph, insert inline
            const { $from } = state.selection;
            if ($from.parent.type.name === 'paragraph') {
              // Insert nodes inline
              const insertTr = tr;
              let insertPos = state.selection.from;
              for (const node of contentNodes) {
                insertTr.insert(insertPos, node);
                insertPos += node.nodeSize;
              }
              insertTr.delete(state.selection.from, state.selection.to);
              view.dispatch(insertTr);
            } else {
              // Replace selection with the fragment
              tr.replaceSelectionWith(fragment);
              view.dispatch(tr);
            }

            event.preventDefault();
            return true;
          },
        },
      }),
    ];
  },
});

export default DatePill;
