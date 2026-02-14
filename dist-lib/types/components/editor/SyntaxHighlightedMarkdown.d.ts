interface SearchMatch {
    from: number;
    to: number;
}
interface SyntaxHighlightedMarkdownProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
    editable?: boolean;
    autofocus?: boolean;
    className?: string;
    /** Search matches to highlight in the overlay */
    searchMatches?: SearchMatch[];
    /** Index of the current active match (highlighted differently) */
    currentMatchIndex?: number;
}
export declare function SyntaxHighlightedMarkdown({ content, onChange, placeholder, editable, autofocus, className, searchMatches, currentMatchIndex, }: SyntaxHighlightedMarkdownProps): import("react").JSX.Element;
export default SyntaxHighlightedMarkdown;
