import { useState, useEffect, useRef, useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { Link2 } from 'lucide-react';

/*
 * DESIGN: Dark Mode Craftsman
 * - Glassmorphic popover with backdrop blur
 * - Cyan accent for focus states
 * - Smooth transitions
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

  // Get current link URL if cursor is on a link
  useEffect(() => {
    if (isOpen) {
      const currentUrl = editor.getAttributes('link').href || '';
      setUrl(currentUrl);
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

  // Get cursor position for popover placement
  const { view } = editor;
  const { from } = view.state.selection;
  const coords = view.coordsAtPos(from);
  
  // Calculate position relative to viewport
  const editorRect = view.dom.getBoundingClientRect();
  const top = coords.top - editorRect.top + 30;
  const left = Math.min(coords.left - editorRect.left, editorRect.width - 320);

  return (
    <div
      ref={popoverRef}
      className="link-popover"
      style={{
        position: 'absolute',
        top: `${top}px`,
        left: `${Math.max(0, left)}px`,
        zIndex: 100,
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
}

export default LinkPopover;
