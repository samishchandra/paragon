import { Node } from '@tiptap/core';
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
export declare const DatePill: Node<DatePillOptions, any>;
export default DatePill;
