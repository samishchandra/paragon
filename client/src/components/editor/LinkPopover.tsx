import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Editor } from '@tiptap/react';
import { Link2 } from 'lucide-react';

/*
 * DESIGN: Dark Mode Craftsman
 * - Glassmorphic popover with backdrop blur
 * - Cyan accent for focus states
 * - Smooth transitions
 * Uses React portal to escape overflow containers.
 */

interface LinkPopoverProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export function LinkPopover({ editor, isOpen, onClose }: LinkPopoverProps) {
  const [url, setUrl] = useState('');
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Calculate position based on cursor coords
  const updatePosition = useCallback(() => {
    if (!editor || editor.isDestroyed) return;
    try {
      const { view } = editor;
      const { from } = view.state.selection;
      const coords = view.coordsAtPos(from);
      
      const popoverWidth = 320;
      const popoverHeight = 80;
      const padding = 8;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = coords.bottom + 8;
      let left = coords.left;

      // Flip upward if not enough space below
      if (top + popoverHeight > viewportHeight - padding) {
        top = coords.top - popoverHeight - 8;
      }

      // Keep within horizontal bounds
      if (left + popoverWidth > viewportWidth - padding) {
        left = viewportWidth - popoverWidth - padding;
      }
      if (left < padding) {
        left = padding;
      }

      // Keep within vertical bounds
      top = Math.max(padding, top);

      setPopoverPos({ top, left });
    } catch {
      // Fallback to center of viewport
      setPopoverPos({
        top: window.innerHeight / 2 - 40,
        left: window.innerWidth / 2 - 160,
      });
    }
  }, [editor]);

  // Get current link URL if cursor is on a link
  useEffect(() => {
    if (isOpen) {
      const currentUrl = editor.getAttributes('link').href || '';
      setUrl(currentUrl);
      updatePosition();
      // Focus input after a short delay to ensure popover is rendered
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen, editor, updatePosition]);

  // Reposition on scroll/resize
  useEffect(() => {
    if (!isOpen) return;

    const handleReposition = () => {
      requestAnimationFrame(updatePosition);
    };

    window.addEventListener('scroll', handleReposition, true);
    window.addEventListener('resize', handleReposition);

    return () => {
      window.removeEventListener('scroll', handleReposition, true);
      window.removeEventListener('resize', handleReposition);
    };
  }, [isOpen, updatePosition]);

  // Handle click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (url.trim()) {
      // Add https:// if no protocol specified
      let finalUrl = url.trim();
      if (!/^https?:\/\//i.test(finalUrl) && !finalUrl.startsWith('mailto:')) {
        finalUrl = 'https://' + finalUrl;
      }
      
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: finalUrl })
        .run();
    } else {
      // Remove link if URL is empty
      editor.chain().focus().unsetLink().run();
    }
    
    onClose();
  }, [url, editor, onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }, [onClose, handleSubmit]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={popoverRef}
      className="link-popover"
      style={{
        position: 'fixed',
        top: `${popoverPos.top}px`,
        left: `${popoverPos.left}px`,
        zIndex: 9999,
      }}
    >
      <form onSubmit={handleSubmit} className="link-popover-form">
        <div className="link-popover-input-wrapper">
          <Link2 className="link-popover-icon" size={16} />
          <input
            ref={inputRef}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter URL or paste link"
            className="link-popover-input"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div className="link-popover-hint">
          Press Enter to save · Escape to cancel
        </div>
      </form>
    </div>,
    document.body
  );
}

export default LinkPopover;
