import { Extension } from '@tiptap/core';
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
export declare const ImageUpload: Extension<ImageUploadOptions, any>;
export default ImageUpload;
