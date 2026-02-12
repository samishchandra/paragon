import { Extension } from '@tiptap/core';
import { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state';

export interface ImageUploadOptions {
  /**
   * Maximum file size in bytes (default: 10MB)
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
  /**
   * External image upload handler (REQUIRED for image paste/drop to work).
   * The callback receives the compressed File and metadata, and should return
   * a reference string (e.g. a relative path like "../_images/photo.jpg").
   * If not provided, paste/drop of images is silently ignored.
   * If the upload throws, the placeholder image is removed from the editor.
   */
  onImageUpload?: (
    file: File,
    options: { fileName: string; mimeType: string; fileSize: number; uploadId: string }
  ) => Promise<string>;
}

/**
 * Generate a short unique ID for upload tracking
 */
function generateUploadId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Convert a File to a base64 data URL (used only for the temporary placeholder during upload)
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
 * Convert a base64 data URL to a File object
 */
function dataUrlToFile(dataUrl: string, fileName: string): File {
  const [header, base64] = dataUrl.split(',');
  const mimeMatch = header.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new File([array], fileName, { type: mime });
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
    const img = new window.Image();
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
 * Returns a compressed data URL and a File object
 */
async function compressImage(
  file: File,
  maxWidth: number,
  quality: number
): Promise<{ dataUrl: string; file: File; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
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
      const isTransparent = file.type === 'image/png' || file.type === 'image/gif';
      const outputType = isTransparent ? 'image/png' : 'image/jpeg';
      const outputQuality = isTransparent ? undefined : quality;

      // Convert to data URL
      const dataUrl = canvas.toDataURL(outputType, outputQuality);

      // Also convert to File for upload
      const compressedFile = dataUrlToFile(dataUrl, file.name);

      resolve({ dataUrl, file: compressedFile, width, height });
    };

    img.onerror = () => reject(new Error('Failed to load image'));

    reader.readAsDataURL(file);
  });
}

/**
 * Remove a placeholder image node from the editor by matching its src and alt.
 */
function removePlaceholderNode(editor: any, placeholderSrc: string, altText: string): void {
  editor.view.state.doc.descendants((n: any, p: number) => {
    if (n.type.name === 'resizableImage' && n.attrs.src === placeholderSrc && n.attrs.alt === altText) {
      try {
        const { state, dispatch } = editor.view;
        const tr = state.tr.delete(p, p + n.nodeSize);
        dispatch(tr);
      } catch {
        // Node may have already been removed
      }
      return false;
    }
    return true;
  });
}

/**
 * Process and insert an image file into the editor.
 * Requires onImageUpload to be provided — images are always uploaded externally.
 * A temporary base64 placeholder is shown during upload, then replaced with the
 * returned reference. If upload fails, the placeholder is removed entirely.
 * If onImageUpload is not configured, the paste/drop is silently ignored.
 */
async function processAndInsertImage(
  file: File,
  editor: any,
  options: ImageUploadOptions
): Promise<boolean> {
  // If no upload handler is configured, silently ignore the image
  if (!options.onImageUpload) {
    options.onUploadError?.('Image upload not available. Please connect Dropbox in Settings.');
    return false;
  }

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

  const uploadId = generateUploadId();

  try {
    options.onUploadStart?.();

    // Step 1: Compress the image (or read as-is) for the temporary placeholder
    let placeholderDataUrl: string;
    let displayWidth: number;
    let compressedFile: File;

    const isCompressible = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);

    if (options.enableCompression && isCompressible) {
      const compressed = await compressImage(
        file,
        options.maxCompressedWidth,
        options.compressionQuality
      );
      placeholderDataUrl = compressed.dataUrl;
      compressedFile = compressed.file;
      const maxDisplayWidth = 600;
      displayWidth = Math.min(compressed.width, maxDisplayWidth);
    } else {
      placeholderDataUrl = await fileToBase64(file);
      compressedFile = file;
      const dimensions = await getImageDimensions(placeholderDataUrl);
      const maxDisplayWidth = 600;
      displayWidth = Math.min(dimensions.width, maxDisplayWidth);
    }

    // Step 2: Insert a temporary placeholder image while uploading
    editor.chain().focus().setImage({
      src: placeholderDataUrl,
      alt: file.name,
      width: displayWidth,
    }).run();

    // Mark the just-inserted image node as uploading
    const { state } = editor.view;
    const pos = state.selection.from - 1;
    const node = state.doc.nodeAt(pos);
    if (node && node.type.name === 'resizableImage') {
      const nodeView = editor.view.nodeDOM(pos);
      if (nodeView) {
        const figure = nodeView instanceof HTMLElement ? nodeView : (nodeView as any).dom;
        if (figure) {
          figure.classList.add('image-uploading');
        }
      }
    }

    // Step 3: Perform the external upload
    try {
      const imageRef = await options.onImageUpload(compressedFile, {
        fileName: file.name,
        mimeType: compressedFile.type,
        fileSize: compressedFile.size,
        uploadId,
      });

      // Replace the placeholder src with the returned reference
      let found = false;
      editor.view.state.doc.descendants((n: any, p: number) => {
        if (found) return false;
        if (n.type.name === 'resizableImage' && n.attrs.src === placeholderDataUrl && n.attrs.alt === file.name) {
          try {
            const { state: currentState, dispatch } = editor.view;
            const currentNode = currentState.doc.nodeAt(p);
            if (currentNode) {
              const tr = currentState.tr.setNodeMarkup(p, undefined, {
                ...currentNode.attrs,
                src: imageRef,
              });
              dispatch(tr);
            }
          } catch (e) {
            console.warn('Failed to replace placeholder with uploaded reference:', e);
          }
          found = true;
          return false;
        }
        return true;
      });

      // Remove uploading class
      editor.view.state.doc.descendants((n: any, p: number) => {
        if (n.type.name === 'resizableImage' && n.attrs.src === imageRef) {
          const nodeView = editor.view.nodeDOM(p);
          if (nodeView) {
            const figure = nodeView instanceof HTMLElement ? nodeView : (nodeView as any).dom;
            if (figure) {
              figure.classList.remove('image-uploading');
            }
          }
          return false;
        }
        return true;
      });

      options.onUploadComplete?.();
      return true;
    } catch (uploadError) {
      // Upload failed — remove the placeholder entirely (no base64 fallback)
      console.warn('Image upload failed, removing placeholder:', uploadError);
      removePlaceholderNode(editor, placeholderDataUrl, file.name);

      options.onUploadError?.(`Upload failed: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`);
      options.onUploadComplete?.();
      return false;
    }
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
      maxFileSize: 10 * 1024 * 1024, // 10MB default
      allowedMimeTypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
      ],
      enableCompression: true,
      maxCompressedWidth: 1200,
      compressionQuality: 0.8,
      onUploadStart: undefined,
      onUploadComplete: undefined,
      onUploadError: undefined,
      onImageUpload: undefined,
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
