import { Node } from '@tiptap/core';
export type CalloutType = 'info' | 'note' | 'prompt' | 'resources' | 'todo';
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
export declare const CalloutWithMenu: Node<CalloutOptions, any>;
export default CalloutWithMenu;
