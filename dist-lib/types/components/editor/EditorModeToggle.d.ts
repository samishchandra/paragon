interface EditorModeToggleProps {
    editorMode: 'wysiwyg' | 'markdown';
    onModeSwitch: (mode: 'wysiwyg' | 'markdown') => void;
}
export declare function EditorModeToggle({ editorMode, onModeSwitch }: EditorModeToggleProps): import("react").JSX.Element;
export {};
