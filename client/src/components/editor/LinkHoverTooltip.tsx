import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Editor } from '@tiptap/react';
import { ExternalLink, Unlink, Pencil } from 'lucide-react';

/*
 * DESIGN: Dark Mode Craftsman
 * - Glassmorphic tooltip with backdrop blur
 * - Cyan accent for interactive elements
 * - Smooth hover transitions
 * Uses React portal to escape overflow containers.
 */

interface LinkHoverTooltipProps {
  editor: Editor;
  onEditLink: () => void;
}

interface TooltipState {
  isVisible: boolean;
  url: string;
  position: { top: number; left: number };
  linkElement: HTMLElement | null;
}

export function LinkHoverTooltip({ editor, onEditLink }: LinkHoverTooltipProps) {
  const [tooltip, setTooltip] = useState<TooltipState>({
    isVisible: false,
    url: '',
    position: { top: 0, left: 0 },
    linkElement: null,
  });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = useCallback((linkElement: HTMLElement) => {
    if (!editor || editor.isDestroyed) return;
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    try {
      const href = linkElement.getAttribute('href') || '';
      const rect = linkElement.getBoundingClientRect();
      
      const tooltipWidth = 320;
      const tooltipHeight = 40;
      const padding = 8;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = rect.bottom + 8;
      let left = rect.left;

      // Flip upward if not enough space below
      if (top + tooltipHeight > viewportHeight - padding) {
        top = rect.top - tooltipHeight - 8;
      }

      // Keep within horizontal bounds
      if (left + tooltipWidth > viewportWidth - padding) {
        left = viewportWidth - tooltipWidth - padding;
      }
      if (left < padding) {
        left = padding;
      }

      setTooltip({
        isVisible: true,
        url: href,
        position: { top, left },
        linkElement,
      });
    } catch (error) {
      console.warn('LinkHoverTooltip: Error showing tooltip', error);
    }
  }, [editor]);

  const hideTooltip = useCallback(() => {
    hideTimeoutRef.current = setTimeout(() => {
      setTooltip(prev => ({ ...prev, isVisible: false, linkElement: null }));
    }, 150);
  }, []);

  const keepTooltipVisible = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  // Handle mouse events on the editor
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    
    const editorElement = editor.view.dom;
    if (!editorElement) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const linkElement = target.closest('a') as HTMLElement | null;
      
      if (linkElement && editorElement.contains(linkElement)) {
        showTooltip(linkElement);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      
      // Check if we're leaving a link
      if (target.closest('a')) {
        // Don't hide if moving to the tooltip
        if (relatedTarget && tooltipRef.current?.contains(relatedTarget)) {
          return;
        }
        hideTooltip();
      }
    };

    editorElement.addEventListener('mouseover', handleMouseOver);
    editorElement.addEventListener('mouseout', handleMouseOut);

    return () => {
      editorElement.removeEventListener('mouseover', handleMouseOver);
      editorElement.removeEventListener('mouseout', handleMouseOut);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [editor, showTooltip, hideTooltip]);

  const handleOpenLink = useCallback(() => {
    if (tooltip.url) {
      window.open(tooltip.url, '_blank', 'noopener,noreferrer');
    }
    setTooltip(prev => ({ ...prev, isVisible: false }));
  }, [tooltip.url]);

  const handleRemoveLink = useCallback(() => {
    if (tooltip.linkElement) {
      const { view } = editor;
      const { doc } = view.state;
      
      let linkPos: number | null = null;
      let linkEnd: number | null = null;
      
      doc.descendants((node, pos) => {
        if (node.isText && node.marks.some(m => m.type.name === 'link')) {
          const dom = view.nodeDOM(pos);
          if (dom && (dom === tooltip.linkElement || dom.parentElement === tooltip.linkElement)) {
            linkPos = pos;
            linkEnd = pos + node.nodeSize;
            return false;
          }
        }
        return true;
      });

      if (linkPos !== null && linkEnd !== null) {
        editor
          .chain()
          .focus()
          .setTextSelection({ from: linkPos, to: linkEnd })
          .unsetLink()
          .run();
      } else {
        editor.chain().focus().unsetLink().run();
      }
    }
    setTooltip(prev => ({ ...prev, isVisible: false }));
  }, [editor, tooltip.linkElement]);

  const handleEditLink = useCallback(() => {
    if (tooltip.linkElement) {
      const { view } = editor;
      const { doc } = view.state;
      
      doc.descendants((node, pos) => {
        if (node.isText && node.marks.some(m => m.type.name === 'link')) {
          const dom = view.nodeDOM(pos);
          if (dom && (dom === tooltip.linkElement || dom.parentElement === tooltip.linkElement)) {
            editor.chain().focus().setTextSelection({ from: pos, to: pos + node.nodeSize }).run();
            return false;
          }
        }
        return true;
      });
    }
    
    setTooltip(prev => ({ ...prev, isVisible: false }));
    onEditLink();
  }, [editor, tooltip.linkElement, onEditLink]);

  if (!tooltip.isVisible) return null;

  // Truncate long URLs for display
  const displayUrl = tooltip.url.length > 40 
    ? tooltip.url.substring(0, 40) + '...' 
    : tooltip.url;

  return createPortal(
    <div
      ref={tooltipRef}
      className="link-hover-tooltip"
      style={{
        position: 'fixed',
        top: `${tooltip.position.top}px`,
        left: `${tooltip.position.left}px`,
        zIndex: 9999,
      }}
      onMouseEnter={keepTooltipVisible}
      onMouseLeave={hideTooltip}
    >
      <div className="link-hover-tooltip-content">
        <button
          onClick={handleEditLink}
          className="link-hover-tooltip-edit"
          title="Edit link"
        >
          <span className="link-hover-tooltip-url">{displayUrl || 'Edit link'}</span>
        </button>
        <div className="link-hover-tooltip-actions">
          <button
            onClick={handleOpenLink}
            className="link-hover-tooltip-btn"
            title="Open link"
          >
            <ExternalLink size={14} />
          </button>
          <button
            onClick={handleRemoveLink}
            className="link-hover-tooltip-btn link-hover-tooltip-btn-danger"
            title="Remove link"
          >
            <Unlink size={14} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default LinkHoverTooltip;
