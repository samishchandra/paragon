interface SyntaxHighlightedMarkdownProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
    editable?: boolean;
    autofocus?: boolean;
    className?: string;
}
export declare function SyntaxHighlightedMarkdown({ content, onChange, placeholder, editable, autofocus, className, }: SyntaxHighlightedMarkdownProps): import("react").JSX.Element;
export default SyntaxHighlightedMarkdown;
