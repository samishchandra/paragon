import { Editor } from '@tiptap/react';
interface WikiLinkAutocompleteProps {
    editor: Editor;
    onSearch: (query: string) => Promise<Array<{
        id: string;
        title: string;
        type: string;
    }>>;
    onCreateItem?: (title: string) => void;
}
export declare function WikiLinkAutocomplete({ editor, onSearch, onCreateItem }: WikiLinkAutocompleteProps): import("react").JSX.Element | null;
export default WikiLinkAutocomplete;
