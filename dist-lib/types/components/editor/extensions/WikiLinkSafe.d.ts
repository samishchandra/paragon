import { Mark } from '@tiptap/core';
export interface WikiLinkOptions {
    HTMLAttributes: Record<string, unknown>;
    onWikiLinkClick?: (pageName: string) => void;
    validateLink?: (pageName: string) => boolean;
    linkClass?: string;
    invalidLinkClass?: string;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        wikiLink: {
            setWikiLink: (attributes: {
                pageName: string;
            }) => ReturnType;
            unsetWikiLink: () => ReturnType;
        };
    }
}
export declare const WikiLinkSafe: Mark<WikiLinkOptions, any>;
export default WikiLinkSafe;
