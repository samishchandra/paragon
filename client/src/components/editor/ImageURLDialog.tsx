import { useState, useEffect, useRef } from 'react';
import { X, Image, Link2, Type } from 'lucide-react';

/*
 * DESIGN: Things Theme
 * Image URL insertion dialog
 * Clean, elegant design matching the editor theme
 */

interface ImageURLDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (url: string, alt: string) => void;
  position?: { top: number; left: number };
}

export function ImageURLDialog({ isOpen, onClose, onInsert, position }: ImageURLDialogProps) {
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUrl('');
      setAlt('');
      setError('');
      // Focus the URL input after a short delay
      setTimeout(() => {
        urlInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const validateUrl = (urlToValidate: string): boolean => {
    if (!urlToValidate.trim()) {
      setError('Please enter an image URL');
      return false;
    }

    // Basic URL validation
    try {
      const parsedUrl = new URL(urlToValidate);
      if (!['http:', 'https:', 'data:'].includes(parsedUrl.protocol)) {
        setError('URL must start with http://, https://, or be a data URL');
        return false;
      }
    } catch {
      setError('Please enter a valid URL');
      return false;
    }

    setError('');
    return true;
  };

  const handleInsert = async () => {
    if (!validateUrl(url)) return;

    setIsValidating(true);

    // Try to load the image to validate it
    const img = new window.Image();
    img.onload = () => {
      setIsValidating(false);
      onInsert(url.trim(), alt.trim());
      onClose();
    };
    img.onerror = () => {
      setIsValidating(false);
      // Still insert even if validation fails - user might have a valid URL that CORS blocks
      onInsert(url.trim(), alt.trim());
      onClose();
    };
    
    // Set a timeout in case the image takes too long
    setTimeout(() => {
      if (isValidating) {
        setIsValidating(false);
        onInsert(url.trim(), alt.trim());
        onClose();
      }
    }, 3000);

    img.src = url.trim();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleInsert();
    }
  };

  if (!isOpen) return null;

  // Calculate safe position
  const safePosition = position ? {
    top: position.top,
    left: Math.min(position.left, typeof window !== 'undefined' ? window.innerWidth - 340 : position.left),
  } : { top: '50%', left: '50%' };

  return (
    <div
      ref={dialogRef}
      className="image-url-dialog fixed z-50"
      style={{
        top: typeof safePosition.top === 'number' ? safePosition.top : safePosition.top,
        left: typeof safePosition.left === 'number' ? Math.max(8, safePosition.left) : safePosition.left,
        transform: !position ? 'translate(-50%, -50%)' : undefined,
      }}
    >
      {/* Header */}
      <div className="image-url-dialog-header">
        <div className="flex items-center gap-2">
          <Image size={16} className="text-primary" />
          <span className="font-medium text-sm">Insert Image from URL</span>
        </div>
        <button
          onClick={onClose}
          className="image-url-dialog-close"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="image-url-dialog-content">
        {/* URL Input */}
        <div className="image-url-dialog-field">
          <label className="image-url-dialog-label">
            <Link2 size={12} />
            Image URL
          </label>
          <input
            ref={urlInputRef}
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="https://example.com/image.jpg"
            className={`image-url-dialog-input ${error ? 'error' : ''}`}
          />
          {error && (
            <span className="image-url-dialog-error">{error}</span>
          )}
        </div>

        {/* Alt Text Input */}
        <div className="image-url-dialog-field">
          <label className="image-url-dialog-label">
            <Type size={12} />
            Alt Text (optional)
          </label>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the image"
            className="image-url-dialog-input"
          />
        </div>

        {/* Actions */}
        <div className="image-url-dialog-actions">
          <button
            onClick={onClose}
            className="image-url-dialog-btn image-url-dialog-btn-cancel"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            disabled={isValidating || !url.trim()}
            className="image-url-dialog-btn image-url-dialog-btn-insert"
          >
            {isValidating ? 'Validating...' : 'Insert Image'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageURLDialog;
