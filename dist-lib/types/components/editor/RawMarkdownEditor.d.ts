interface RawMarkdownEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
    editable?: boolean;
    autofocus?: boolean;
    className?: string;
    /** Enable auto-closing of markdown pairs (backticks, asterisks, brackets, etc.) (default: true) */
    autoClosePairs?: boolean;
}
export declare function RawMarkdownEditor({ content, onChange, placeholder, editable, autofocus, className, }: RawMarkdownEditorProps): import("react").JSX.Element;
export default RawMarkdownEditor;
