import { Extension } from '@tiptap/core';
import { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state';

export interface ImageUploadOptions {
  /**
   * Maximum file size in bytes (default: 5MB)
   */
  maxFileSize: number;
  /**
   * Allowed image MIME types
   */
  allowedMimeTypes: string[];
  /**
   * Enable image compression (default: true)
   */
  enableCompression: boolean;
  /**
   * Maximum width for compressed images (default: 1200px)
   */
  maxCompressedWidth: number;
  /**
   * JPEG quality for compression (0-1, default: 0.8)
   */
  compressionQuality: number;
  /**
   * Callback when upload starts
   */
  onUploadStart?: () => void;
  /**
   * Callback when upload completes
   */
  onUploadComplete?: () => void;
  /**
   * Callback when upload fails
   */
  onUploadError?: (error: string) => void;
}

/**
 * Convert a File to a base64 data URL
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Validate if a file is an allowed image type
 */
function isValidImage(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

/**
 * Get image dimensions from a data URL
 */
function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      // Default dimensions if we can't load the image
      resolve({ width: 400, height: 300 });
    };
    img.src = dataUrl;
  });
}

/**
 * Compress an image file using canvas
 * Returns a compressed data URL
 */
async function compressImage(
  file: File,
  maxWidth: number,
  quality: number
): Promise<{ dataUrl: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));

    img.onload = () => {
      // Calculate new dimensions
      let width = img.width;
      let height = img.height;

      // Only resize if image is larger than maxWidth
      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height = Math.round(height * ratio);
      }

      // Create canvas for compression
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Draw image with high quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Determine output format
      // Use JPEG for photos (better compression), PNG for images with transparency
      const isTransparent = file.type === 'image/png' || file.type === 'image/gif';
      const outputType = isTransparent ? 'image/png' : 'image/jpeg';
      const outputQuality = isTransparent ? undefined : quality;

      // Convert to data URL
      const dataUrl = canvas.toDataURL(outputType, outputQuality);

      resolve({ dataUrl, width, height });
    };

    img.onerror = () => reject(new Error('Failed to load image'));

    reader.readAsDataURL(file);
  });
}

/**
 * Process and insert an image file into the editor
 */
async function processAndInsertImage(
  file: File,
  editor: any,
  options: ImageUploadOptions
): Promise<boolean> {
  // Validate file type
  if (!isValidImage(file, options.allowedMimeTypes)) {
    options.onUploadError?.(`Invalid file type: ${file.type}. Allowed types: ${options.allowedMimeTypes.join(', ')}`);
    return false;
  }

  // Validate file size
  if (file.size > options.maxFileSize) {
    const maxSizeMB = (options.maxFileSize / (1024 * 1024)).toFixed(1);
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
    options.onUploadError?.(`File too large: ${fileSizeMB}MB. Maximum size: ${maxSizeMB}MB`);
    return false;
  }

  try {
    options.onUploadStart?.();

    let dataUrl: string;
    let displayWidth: number;

    // Check if compression is enabled and file is compressible
    const isCompressible = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
    
    if (options.enableCompression && isCompressible) {
      // Compress the image
      const compressed = await compressImage(
        file,
        options.maxCompressedWidth,
        options.compressionQuality
      );
      dataUrl = compressed.dataUrl;
      
      // Calculate display width (max 600px for editor display)
      const maxDisplayWidth = 600;
      displayWidth = Math.min(compressed.width, maxDisplayWidth);
    } else {
      // No compression - use original
      dataUrl = await fileToBase64(file);
      const dimensions = await getImageDimensions(dataUrl);
      const maxDisplayWidth = 600;
      displayWidth = Math.min(dimensions.width, maxDisplayWidth);
    }

    // Insert the image using the resizableImage command
    editor.chain().focus().setImage({
      src: dataUrl,
      alt: file.name,
      width: displayWidth,
    }).run();

    options.onUploadComplete?.();
    return true;
  } catch (error) {
    options.onUploadError?.(`Failed to process image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
}

/**
 * Extract image files from a DataTransfer object
 */
function getImageFiles(dataTransfer: DataTransfer): File[] {
  const files: File[] = [];
  
  // Check items first (for drag events)
  if (dataTransfer.items) {
    for (let i = 0; i < dataTransfer.items.length; i++) {
      const item = dataTransfer.items[i];
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) files.push(file);
      }
    }
  }
  
  // Fallback to files array
  if (files.length === 0 && dataTransfer.files) {
    for (let i = 0; i < dataTransfer.files.length; i++) {
      const file = dataTransfer.files[i];
      if (file.type.startsWith('image/')) {
        files.push(file);
      }
    }
  }
  
  return files;
}

export const ImageUpload = Extension.create<ImageUploadOptions>({
  name: 'imageUpload',

  addOptions() {
    return {
      maxFileSize: 5 * 1024 * 1024, // 5MB default
      allowedMimeTypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
      ],
      enableCompression: true, // Enable compression by default
      maxCompressedWidth: 1200, // Max width for compressed images
      compressionQuality: 0.8, // JPEG quality (0-1)
      onUploadStart: undefined,
      onUploadComplete: undefined,
      onUploadError: undefined,
    };
  },

  addProseMirrorPlugins() {
    const options = this.options;
    const editor = this.editor;

    return [
      new Plugin({
        key: new PluginKey('imageUpload'),
        props: {
          // Handle paste events with images
          handlePaste(view, event) {
            const clipboardData = event.clipboardData;
            if (!clipboardData) return false;

            // Check for image files in clipboard
            const imageFiles = getImageFiles(clipboardData);
            
            if (imageFiles.length === 0) {
              return false; // No images, let other handlers process
            }

            // Prevent default paste behavior
            event.preventDefault();

            // Process all images
            imageFiles.forEach(file => {
              processAndInsertImage(file, editor, options);
            });

            return true;
          },

          // Handle drop events with images
          handleDrop(view, event, slice, moved) {
            // Only handle external drops (not internal moves)
            if (moved) return false;

            const dataTransfer = event.dataTransfer;
            if (!dataTransfer) return false;

            // Check for image files
            const imageFiles = getImageFiles(dataTransfer);
            
            if (imageFiles.length === 0) {
              return false; // No images, let other handlers process
            }

            // Prevent default drop behavior
            event.preventDefault();

            // Get drop position and set cursor there
            const coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            });

            if (coordinates) {
              // Move cursor to drop position
              const tr = view.state.tr.setSelection(
                TextSelection.near(view.state.doc.resolve(coordinates.pos))
              );
              view.dispatch(tr);
            }

            // Process all images
            imageFiles.forEach(file => {
              processAndInsertImage(file, editor, options);
            });

            return true;
          },
        },
      }),
    ];
  },
});

export default ImageUpload;
