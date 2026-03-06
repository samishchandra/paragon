import { Node } from '@tiptap/core';
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
export declare function parseLocalDate(dateStr: string): Date;
/** Get today's date as YYYY-MM-DD in local timezone */
export declare function getLocalToday(): string;
/** Get a date offset from today as YYYY-MM-DD */
export declare function getLocalDateOffset(days: number): string;
/** Convert a Date object to YYYY-MM-DD string using local timezone */
export declare function dateToLocalString(date: Date): string;
/** Format date for display (Today, Tomorrow, Yesterday, or "Jan 15" / "Jan 15, 2025") */
export declare function formatDate(dateStr: string): string;
/** Format date for markdown serialization: "Feb 11, 2025" */
export declare function formatDateForMarkdown(dateStr: string): string;
/** Parse a markdown date string like "Feb 11, 2025" or "Mar 3, 2025" back to YYYY-MM-DD */
export declare function parseDateFromMarkdown(mdDate: string): string | null;
/** Determine date variant for styling */
export declare function getDateVariant(dateStr: string): string;
export declare const DatePill: Node<DatePillOptions, any>;
export default DatePill;
