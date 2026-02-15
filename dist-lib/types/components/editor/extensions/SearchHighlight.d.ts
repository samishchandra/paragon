import { Extension } from '@tiptap/core';
export interface SearchHighlightOptions {
    searchTerm: string;
    caseSensitive: boolean;
    useRegex: boolean;
    currentMatchIndex: number;
}
export interface SearchHighlightStorage {
    searchTerm: string;
    caseSensitive: boolean;
    useRegex: boolean;
    currentMatchIndex: number;
}
export declare const SearchHighlight: Extension<SearchHighlightOptions, SearchHighlightStorage>;
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        searchHighlight: {
            setSearchHighlight: (options: Partial<SearchHighlightOptions>) => ReturnType;
            clearSearchHighlight: () => ReturnType;
        };
    }
}
