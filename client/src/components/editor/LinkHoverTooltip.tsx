import { useState, useEffect, useRef, useCallback } from 'react';
import { DialogSafePortal } from './DialogSafePortal';
import { Editor } from '@tiptap/react';
import { Pencil, Copy, Unlink, Check, ExternalLink } from 'lucide-react';

/*
 * Link Hover/Tap Tooltip
 * Desktop: Shows when hovering over a link in the editor.
 * Mobile: Shows when tapping on a link in the editor.
 * Layout: [clickable link URL] [edit] [copy] [unlink]
 * - Clicking/tapping the link URL opens it in a new tab
 * - Pencil icon opens the link editor (selects link text in LinkPopover)
 * - Copy icon copies the URL to clipboard
 * - Unlink icon removes the link formatting
 * Uses React portal to avoid overflow clipping
 * Theme-aware via data-theme attribute
 */

export interface LinkHoverTooltipProps {
  editor: Editor;
  onEditLink: () => void;
}

export interface TooltipState {
  isVisible: boolean;
  url: string;
  position: { top: number; left: number };
  linkElement: HTMLElement | null;
}

function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
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
  const activeLinkRef = useRef<HTMLElement | null>(null);

  const showTooltip = useCallback((linkElement: HTMLElement) => {
    if (!editor || editor.isDestroyed) return;
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    try {
      const href = linkElement.getAttribute('href') || '';
      const rect = linkElement.getBoundingClientRect();

      // Estimated tooltip height: ~40px (padding 0.25rem*2 + button 1.75rem + border)
      const tooltipHeight = 44;
      const gap = 8;

      // Prefer positioning above the link; fall back to below if not enough space
      const spaceAbove = rect.top;
      const canFitAbove = spaceAbove >= tooltipHeight + gap;

      const top = canFitAbove
        ? rect.top - tooltipHeight - gap
        : rect.bottom + gap;

      const left = Math.max(16, Math.min(rect.left, window.innerWidth - 340));

      activeLinkRef.current = linkElement;
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
      activeLinkRef.current = null;
      setTooltip(prev => ({ ...prev, isVisible: false, linkElement: null }));
    }, 150);
  }, []);

  const hideTooltipImmediate = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    activeLinkRef.current = null;
    setTooltip(prev => ({ ...prev, isVisible: false, linkElement: null }));
  }, []);

  const keepTooltipVisible = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  // Handle mouse events on the editor (desktop)
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

  // Handle touch events on the editor (mobile)
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    
    const editorElement = editor.view.dom;
    if (!editorElement) return;

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const linkElement = target.closest('a') as HTMLElement | null;

      if (linkElement && editorElement.contains(linkElement)) {
        // If tooltip is already showing for this link, let the user interact normally
        if (activeLinkRef.current === linkElement && tooltip.isVisible) {
          return;
        }

        // Prevent the default behavior (which would place cursor)
        // and prevent the editor from handling this as a regular tap
        e.preventDefault();
        e.stopPropagation();

        showTooltip(linkElement);
      }
    };

    // Use touchend with capture to intercept before TipTap handles it
    editorElement.addEventListener('touchend', handleTouchEnd, { capture: true });

    return () => {
      editorElement.removeEventListener('touchend', handleTouchEnd, { capture: true });
    };
  }, [editor, showTooltip, tooltip.isVisible]);

  // Handle tap outside tooltip to dismiss (mobile)
  useEffect(() => {
    if (!tooltip.isVisible) return;
    if (!isTouchDevice()) return;

    const handleTouchOutside = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      
      // Don't dismiss if tapping the tooltip itself
      if (tooltipRef.current?.contains(target)) {
        return;
      }

      // Don't dismiss if tapping the same link
      if (activeLinkRef.current && activeLinkRef.current.contains(target)) {
        return;
      }

      // Dismiss the tooltip
      hideTooltipImmediate();
    };

    // Small delay to avoid the same touch event that opened the tooltip
    const timer = setTimeout(() => {
      document.addEventListener('touchstart', handleTouchOutside, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('touchstart', handleTouchOutside);
    };
  }, [tooltip.isVisible, hideTooltipImmediate]);

  // Hide tooltip on scroll to prevent stale positioning
  useEffect(() => {
    if (!tooltip.isVisible) return;

    const handleScroll = () => {
      hideTooltipImmediate();
    };

    const wrapper = editor.view.dom.closest('.editor-content-wrapper');
    wrapper?.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      wrapper?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [tooltip.isVisible, editor, hideTooltipImmediate]);

  const [copied, setCopied] = useState(false);

  const handleCopyLink = useCallback(() => {
    if (tooltip.url) {
      navigator.clipboard.writeText(tooltip.url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  }, [tooltip.url]);

  const handleOpenLink = useCallback(() => {
    if (tooltip.url) {
      // Use anchor element click instead of window.open() with features string
      // to ensure external links open in the default browser when running as a PWA
      const a = document.createElement('a');
      a.href = tooltip.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.click();
    }
  }, [tooltip.url]);

  const handleRemoveLink = useCallback(() => {
    // Select the link and remove it
    if (tooltip.linkElement) {
      const { view } = editor;
      const { doc } = view.state;
      
      // Find the link position in the document
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
        // Fallback: just unset link at current selection
        editor.chain().focus().unsetLink().run();
      }
    }
    setTooltip(prev => ({ ...prev, isVisible: false }));
  }, [editor, tooltip.linkElement]);

  const handleEditLink = useCallback(() => {
    // Select the link text first so LinkPopover can edit it
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

  // Get the theme from the editor's container
  // Look for the markdown-editor-container first, then any ancestor with data-theme
  const editorContainer = editor.view.dom.closest('.markdown-editor-container') || editor.view.dom.closest('[data-theme]');
  const theme = editorContainer?.getAttribute('data-theme') || '';

  const tooltipContent = (
    <div
      ref={tooltipRef}
      className="link-hover-tooltip"
      data-theme={theme}
      style={{
        position: 'fixed',
        top: `${tooltip.position.top}px`,
        left: `${tooltip.position.left}px`,
      }}
      onMouseEnter={keepTooltipVisible}
      onMouseLeave={hideTooltip}
    >
      <div className="link-hover-tooltip-content">
        {/* 1. Clickable link - opens in new tab */}
        <button
          onClick={handleOpenLink}
          className="link-hover-tooltip-link"
          title={tooltip.url}
        >
          <ExternalLink size={13} className="link-hover-tooltip-link-icon" />
          <span className="link-hover-tooltip-url">{displayUrl || 'No URL'}</span>
        </button>

        {/* Action buttons: edit, copy, unlink */}
        <div className="link-hover-tooltip-actions">
          {/* 2. Edit link - pencil icon */}
          <button
            onClick={handleEditLink}
            className="link-hover-tooltip-btn"
            title="Edit link"
          >
            <Pencil size={14} />
          </button>

          {/* 3. Copy link */}
          <button
            onClick={handleCopyLink}
            className="link-hover-tooltip-btn"
            title="Copy link"
          >
            {copied ? <Check size={14} style={{ color: 'var(--primary)' }} /> : <Copy size={14} />}
          </button>

          {/* 4. Unlink - remove link */}
          <button
            onClick={handleRemoveLink}
            className="link-hover-tooltip-btn link-hover-tooltip-btn-danger"
            title="Remove link"
          >
            <Unlink size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  // Render via DialogSafePortal to avoid overflow clipping and Radix Dialog issues
  return <DialogSafePortal>{tooltipContent}</DialogSafePortal>;
}

export default LinkHoverTooltip;
