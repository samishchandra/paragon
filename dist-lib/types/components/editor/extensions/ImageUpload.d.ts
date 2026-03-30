import { Extension } from '@tiptap/core';
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
    onImageUpload?: (file: File, options: {
        fileName: string;
        mimeType: string;
        fileSize: number;
        uploadId: string;
    }) => Promise<string>;
}
export declare const ImageUpload: Extension<ImageUploadOptions, any>;
export default ImageUpload;
