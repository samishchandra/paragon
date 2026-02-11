import { Node } from '@tiptap/core';
export type CalloutType = 'info' | 'warning' | 'error' | 'success' | 'note';
export interface CalloutOptions {
    HTMLAttributes: Record<string, unknown>;
    types: CalloutType[];
}
export declare const CalloutWithMenu: Node<CalloutOptions, any>;
export default CalloutWithMenu;
