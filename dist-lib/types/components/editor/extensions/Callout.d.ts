import { Node } from '@tiptap/core';
export type CalloutType = 'info' | 'warning' | 'error' | 'success' | 'note';
export interface CalloutOptions {
    HTMLAttributes: Record<string, unknown>;
    types: CalloutType[];
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        callout: {
            setCallout: (attributes?: {
                type?: CalloutType;
            }) => ReturnType;
            toggleCallout: (attributes?: {
                type?: CalloutType;
            }) => ReturnType;
            unsetCallout: () => ReturnType;
            insertCallout: (attributes?: {
                type?: CalloutType;
            }) => ReturnType;
            updateCalloutType: (type: CalloutType) => ReturnType;
        };
    }
}
export declare const Callout: Node<CalloutOptions, any>;
export default Callout;
