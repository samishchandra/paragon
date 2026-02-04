import { useState, useEffect, useRef } from 'react';
import { X, Check, Link, Type, Trash2 } from 'lucide-react';

/*
 * DESIGN: Dark Mode Craftsman
 * Image edit popover with clean, minimal design
 * Matches the editor's professional aesthetic
 */

interface ImageEditPopoverProps {
  /**
   * Current image source URL
   */
  src: string;
  /**
   * Current alt text
   */
  alt: string;
  /**
   * Position of the popover
   */
  position: { x: number; y: number };
  /**
   * Callback when save is clicked
   */
  onSave: (src: string, alt: string) => void;
  /**
   * Callback when delete is clicked
   */
  onDelete: () => void;
  /**
   * Callback when popover is closed
   */
  onClose: () => void;
}

export function ImageEditPopover({
  src,
  alt,
  position,
  onSave,
  onDelete,
  onClose,
}: ImageEditPopoverProps) {
  const [editSrc, setEditSrc] = useState(src);
  const [editAlt, setEditAlt] = useState(alt);
  const popoverRef = useRef<HTMLDivElement>(null);
  const srcInputRef = useRef<HTMLInputElement>(null);

  // Focus the src input on mount
  useEffect(() => {
    srcInputRef.current?.focus();
    srcInputRef.current?.select();
  }, []);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Delay adding the listener to prevent immediate close
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        handleSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [editSrc, editAlt, onClose]);

  const handleSave = () => {
    if (editSrc.trim()) {
      onSave(editSrc.trim(), editAlt.trim());
    }
  };

  // Calculate position to keep popover in viewport
  const calculatePosition = () => {
    const popoverWidth = 320;
    const popoverHeight = 200;
    const padding = 16;

    let x = position.x;
    let y = position.y + 10; // Offset below the click point

    // Keep within horizontal bounds
    if (x + popoverWidth > window.innerWidth - padding) {
      x = window.innerWidth - popoverWidth - padding;
    }
    if (x < padding) {
      x = padding;
    }

    // Keep within vertical bounds
    if (y + popoverHeight > window.innerHeight - padding) {
      y = position.y - popoverHeight - 10; // Show above instead
    }

    return { left: x, top: y };
  };

  const pos = calculatePosition();

  return (
    <div
      ref={popoverRef}
      className="image-edit-popover"
      style={{
        position: 'fixed',
        left: pos.left,
        top: pos.top,
        zIndex: 1000,
      }}
    >
      {/* Header */}
      <div className="image-edit-popover-header">
        <span className="image-edit-popover-title">Edit Image</span>
        <button
          onClick={onClose}
          className="image-edit-popover-close"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="image-edit-popover-content">
        {/* URL Input */}
        <div className="image-edit-popover-field">
          <label className="image-edit-popover-label">
            <Link className="w-3.5 h-3.5" />
            <span>Image URL</span>
          </label>
          <input
            ref={srcInputRef}
            type="text"
            value={editSrc}
            onChange={(e) => setEditSrc(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="image-edit-popover-input"
          />
        </div>

        {/* Alt Text Input */}
        <div className="image-edit-popover-field">
          <label className="image-edit-popover-label">
            <Type className="w-3.5 h-3.5" />
            <span>Alt Text</span>
          </label>
          <input
            type="text"
            value={editAlt}
            onChange={(e) => setEditAlt(e.target.value)}
            placeholder="Describe the image..."
            className="image-edit-popover-input"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="image-edit-popover-footer">
        <button
          onClick={onDelete}
          className="image-edit-popover-btn image-edit-popover-btn-delete"
          title="Delete image"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <div className="image-edit-popover-actions">
          <button
            onClick={onClose}
            className="image-edit-popover-btn image-edit-popover-btn-cancel"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="image-edit-popover-btn image-edit-popover-btn-save"
            disabled={!editSrc.trim()}
          >
            <Check className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
