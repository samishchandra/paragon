/**
 * CustomScrollbar - Placeholder component.
 *
 * The editor scrollbar is now handled entirely via CSS with an always-visible
 * thin subtle scrollbar that becomes more prominent on hover. This approach
 * is the most reliable across browsers (Chromium, Firefox, Safari) and avoids
 * the known limitation that CSS transitions and class-based style changes
 * don't work on ::-webkit-scrollbar pseudo-elements in Chromium.
 *
 * The scrollbar styling is defined in editor.css on .editor-content-wrapper.
 */
export default function CustomScrollbar({ scrollContainerRef: _scrollContainerRef, hideDelay: _hideDelay, }: {
    scrollContainerRef: React.RefObject<HTMLElement | null>;
    hideDelay?: number;
}): null;
