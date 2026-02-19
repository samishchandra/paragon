/**
 * Dropbox image upload and resolution for the Paragon editor.
 * 
 * Images are uploaded to Dropbox at: /<backupFolder>/_images/<filename>
 * Stored in markdown as relative paths: ../_images/<filename>
 * Resolved at render time via authenticated Dropbox download + IndexedDB cache.
 */

import { getBackupFolder, isConnected, getValidToken, dropboxApiArgEncode } from './dropbox';
import { getCachedImage, cacheImage } from './imageCache';

const CONTENT_URL = 'https://content.dropboxapi.com/2';
const IMAGES_FOLDER = '_images';

// In-flight resolution promises to deduplicate concurrent requests for the same image
const inflightResolves = new Map<string, Promise<string>>();

/**
 * Generate a unique filename for an uploaded image.
 * Format: YYYY-MM-DD_<random8chars>.<ext>
 */
function generateImageFilename(file: File): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10); // YYYY-MM-DD
  const random = Math.random().toString(36).substring(2, 10);
  const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
  return `${date}_${random}.${ext}`;
}

/**
 * Get the absolute Dropbox path for the _images folder.
 * e.g. "/MomentumBackup/_images"
 */
function getImagesDropboxPath(): string {
  const backupFolder = getBackupFolder().replace(/^\/+|\/+$/g, '');
  return `/${backupFolder}/${IMAGES_FOLDER}`;
}

/**
 * Convert a relative image path (as stored in markdown) to an absolute Dropbox path.
 * e.g. "../_images/2026-02-12_abc123.jpg" → "/MomentumBackup/_images/2026-02-12_abc123.jpg"
 */
function relativePathToDropboxPath(relativePath: string): string {
  // Strip the "../_images/" prefix to get just the filename
  const filename = relativePath.replace(/^\.\.\/(_images\/)?/, '').replace(/^_images\//, '');
  return `${getImagesDropboxPath()}/${filename}`;
}

/**
 * Upload an image file to Dropbox.
 * Called by the Paragon editor's onImageUpload hook.
 * 
 * @param file - The image File object from paste/drop
 * @param options - Upload metadata from the editor
 * @returns The relative path to store in markdown, e.g. "../_images/2026-02-12_abc123.jpg"
 */
export async function uploadImageToDropbox(
  file: File,
  _options: { fileName: string; mimeType: string; fileSize: number; uploadId: string }
): Promise<string> {
  if (!isConnected()) {
    throw new Error('Dropbox not connected. Please connect Dropbox in Settings to upload images.');
  }

  const token = await getValidToken();
  const filename = generateImageFilename(file);
  const dropboxPath = `${getImagesDropboxPath()}/${filename}`;

  // Upload the binary file to Dropbox
  const res = await fetch(`${CONTENT_URL}/files/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': dropboxApiArgEncode({
        path: dropboxPath,
        mode: 'add',
        autorename: true,
        mute: true,
      }),
    },
    body: file,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Image upload failed: ${err}`);
  }

  // Cache the image locally so it's immediately available
  const blob = new Blob([await file.arrayBuffer()], { type: file.type });
  const relativePath = `../${IMAGES_FOLDER}/${filename}`;
  await cacheImage(relativePath, blob, file.type);

  return relativePath;
}

/**
 * Resolve a relative image path to a displayable blob URL.
 * Called by the Paragon editor's resolveImageSrc hook.
 * 
 * 1. Check IndexedDB cache first (instant, works offline)
 * 2. Fall back to authenticated Dropbox download
 * 3. Cache the downloaded blob for future use
 * 
 * @param src - The image src from the editor (e.g. "../_images/2026-02-12_abc123.jpg")
 * @returns A blob: URL that the browser can display
 */
export async function resolveImageSrc(src: string): Promise<string> {
  // Only handle relative _images paths
  if (!src.includes('_images/')) {
    return src;
  }

  // Check if there's already an in-flight request for this image
  const inflight = inflightResolves.get(src);
  if (inflight) {
    return inflight;
  }

  const resolvePromise = (async () => {
    try {
      // 1. Check IndexedDB cache
      const cached = await getCachedImage(src);
      if (cached) {
        return cached;
      }

      // 2. Download from Dropbox
      if (!isConnected()) {
        // Can't download — return a placeholder or the raw path
        return src;
      }

      const token = await getValidToken();
      const dropboxPath = relativePathToDropboxPath(src);

      const res = await fetch(`${CONTENT_URL}/files/download`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Dropbox-API-Arg': dropboxApiArgEncode({ path: dropboxPath }),
        },
      });

      if (!res.ok) {
        throw new Error(`Download failed: ${res.status}`);
      }

      // Get the blob and determine MIME type
      const blob = await res.blob();
      const mimeType = blob.type || 'image/jpeg';

      // 3. Cache for future use
      await cacheImage(src, blob, mimeType);

      // 4. Create and return blob URL
      return URL.createObjectURL(blob);
    } finally {
      // Clean up in-flight tracker
      inflightResolves.delete(src);
    }
  })();

  inflightResolves.set(src, resolvePromise);
  return resolvePromise;
}
