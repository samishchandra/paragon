/**
 * useEditorAPI — Exposes the imperative API for the MarkdownEditor ref.
 *
 * Extracted from MarkdownEditor.tsx to reduce component size.
 * Wraps `useImperativeHandle` so the parent component just calls
 * `useEditorAPI(ref, deps)` instead of inlining ~130 lines.
 */
import { type Ref } from 'react';
import type { Editor } from '@tiptap/core';
import type { TurndownLike } from './useHandleModeSwitch';
import type { MarkdownEditorRef } from '../MarkdownEditor';
export interface UseEditorAPIDeps {
    editor: Editor | null;
    turndownService: TurndownLike;
    editorModeRef: React.MutableRefObject<'wysiwyg' | 'markdown'>;
    handleModeSwitch: (mode: 'wysiwyg' | 'markdown') => void;
    wordCount: {
        words: number;
        characters: number;
        charactersWithSpaces: number;
    };
    autoSaveState: {
        save: () => void;
        clear: () => void;
    };
    setIsFindReplaceOpen: (open: boolean) => void;
    setFindReplaceFocusTrigger: React.Dispatch<React.SetStateAction<number>>;
}
export declare function useEditorAPI(ref: Ref<MarkdownEditorRef>, { editor, turndownService, editorModeRef, handleModeSwitch, wordCount, autoSaveState, setIsFindReplaceOpen, setFindReplaceFocusTrigger, }: UseEditorAPIDeps): void;
