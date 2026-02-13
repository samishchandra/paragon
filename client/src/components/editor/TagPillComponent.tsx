import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { useRef, useCallback } from 'react';
import { Hash } from 'lucide-react';

/*
 * TagPillComponent — React NodeView for tag pills
 *
 * Renders a tag as an inline pill with a # icon and tag name.
 * Consistent with DatePill styling: circular rounded corners, same size.
 * Uses outline-style Hash icon per user preference for tag icons.
 */

export function TagPillComponent({ node, selected }: NodeViewProps) {
  const pillRef = useRef<HTMLSpanElement>(null);
  const tagValue = node.attrs.tag || '';

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Tag click is a no-op for now; the embedding app can handle via onTagClick
  }, []);

  return (
    <NodeViewWrapper as="span" className="inline">
      <span
        ref={pillRef}
        className={`tag-pill ${selected ? 'ProseMirror-selectednode' : ''}`}
        contentEditable={false}
        data-type="tag-pill"
        data-tag={tagValue}
        onClick={handleClick}
      >
        <Hash size={14} className="tag-icon" strokeWidth={2.5} />
        <span className="tag-text">{tagValue}</span>
      </span>
    </NodeViewWrapper>
  );
}
