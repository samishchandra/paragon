export interface UseGlobalEditorAPIDeps {
    editorModeRef: React.MutableRefObject<'wysiwyg' | 'markdown'>;
    rawMarkdownRef: React.MutableRefObject<string>;
    editorMode: 'wysiwyg' | 'markdown';
    handleModeSwitch: (mode: 'wysiwyg' | 'markdown') => void;
    setIsFindReplaceOpen: (open: boolean) => void;
    setFindReplaceFocusTrigger: React.Dispatch<React.SetStateAction<number>>;
}
export declare function useGlobalEditorAPI({ editorModeRef, rawMarkdownRef, editorMode, handleModeSwitch, setIsFindReplaceOpen, setFindReplaceFocusTrigger, }: UseGlobalEditorAPIDeps): void;
