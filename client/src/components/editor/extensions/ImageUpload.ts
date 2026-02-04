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

    // Convert to base64
    const dataUrl = await fileToBase64(file);

    // Get image dimensions for proper sizing
    const dimensions = await getImageDimensions(dataUrl);
    
    // Calculate a reasonable display width (max 600px, preserve aspect ratio)
    const maxWidth = 600;
    const displayWidth = Math.min(dimensions.width, maxWidth);

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
