import { useState, useEffect, useCallback } from 'react';
import { ImagePlus } from 'lucide-react';

interface ImageDropZoneProps {
  /**
   * Reference to the container element to attach drag events to
   */
  containerRef: React.RefObject<HTMLElement | null>;
  /**
   * Whether the drop zone is enabled
   */
  enabled?: boolean;
}

/**
 * Visual overlay that appears when dragging images over the editor
 * Provides visual feedback for drag-and-drop image upload
 */
export function ImageDropZone({ containerRef, enabled = true }: ImageDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if the drag contains files
    if (e.dataTransfer?.types.includes('Files')) {
      setDragCounter(prev => prev + 1);
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragCounter(prev => {
      const newCount = prev - 1;
      if (newCount === 0) {
        setIsDragging(false);
      }
      return newCount;
    });
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setDragCounter(0);
    // The actual drop handling is done by the ImageUpload extension
  }, []);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    
    container.addEventListener('dragenter', handleDragEnter);
    container.addEventListener('dragleave', handleDragLeave);
    container.addEventListener('dragover', handleDragOver);
    container.addEventListener('drop', handleDrop);

    return () => {
      container.removeEventListener('dragenter', handleDragEnter);
      container.removeEventListener('dragleave', handleDragLeave);
      container.removeEventListener('dragover', handleDragOver);
      container.removeEventListener('drop', handleDrop);
    };
  }, [enabled, containerRef, handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

  if (!isDragging) return null;

  return (
    <div className="image-drop-zone">
      <div className="image-drop-zone-content">
        <div className="image-drop-zone-icon">
          <ImagePlus className="w-12 h-12" />
        </div>
        <div className="image-drop-zone-text">
          <span className="image-drop-zone-title">Drop image here</span>
          <span className="image-drop-zone-subtitle">Release to insert image into the editor</span>
        </div>
      </div>
    </div>
  );
}

export default ImageDropZone;
