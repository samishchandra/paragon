import { useState, useEffect, useRef, useCallback } from 'react';
import { DialogSafePortal } from './DialogSafePortal';
import { Editor } from '@tiptap/react';
import { Link2 } from 'lucide-react';

/*
 * DESIGN: Theme-aware link editor popover
 * - Uses CSS variables for proper light/dark theme support
 * - Glassmorphic popover with backdrop blur
 * - Closes on scroll to prevent stale positioning
 * - Uses React portal to avoid overflow clipping
 */

interface LinkPopoverProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export function LinkPopover({ editor, isOpen, onClose }: LinkPopoverProps) {
  const [url, setUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Get current link URL if cursor is on a link and calculate position
  useEffect(() => {
    if (isOpen) {
      const currentUrl = editor.getAttributes('link').href || '';
      setUrl(currentUrl);

      // Calculate position relative to viewport using fixed positioning
      try {
        const { view } = editor;
        const { from } = view.state.selection;
        const coords = view.coordsAtPos(from);

        // Position below the cursor, with some offset
        const top = coords.bottom + 8;
        const left = Math.max(16, Math.min(coords.left, window.innerWidth - 420));

        setPosition({ top, left });
      } catch {
        // Fallback: center horizontally
        setPosition({ top: 200, left: window.innerWidth / 2 - 160 });
      }

      // Focus input after a short delay to ensure popover is rendered
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen, editor]);

  // Handle click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Close on scroll to avoid stale position
    const handleScroll = () => {
      onClose();
    };

    // Delay attachment to prevent immediate close from the same click that opened it
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 10);

    // Listen for scroll on the editor content wrapper
    const wrapper = editor.view.dom.closest('.editor-content-wrapper');
    wrapper?.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      wrapper?.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, onClose, editor]);

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

  // Get the theme from the editor's container
  const editorContainer = editor.view.dom.closest('.markdown-editor-container') || editor.view.dom.closest('[data-theme]');
  const theme = editorContainer?.getAttribute('data-theme') || '';

  const popoverContent = (
    <div
      ref={popoverRef}
      className="link-popover"
      data-theme={theme}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
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
    </div>
  );

  // Render via DialogSafePortal to avoid overflow clipping and Radix Dialog issues
  return <DialogSafePortal>{popoverContent}</DialogSafePortal>;
}

export default LinkPopover;
