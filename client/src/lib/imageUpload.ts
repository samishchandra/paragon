/**
 * Image upload and resolution for the Paragon editor.
 * 
 * Images are uploaded to S3 via the server's /api/images/upload endpoint.
 * The returned S3 URL is stored directly in markdown.
 * No Dropbox dependency — images are served from S3 CDN.
 */

import { getCachedImage, cacheImage } from './imageCache';

// In-flight resolution promises to deduplicate concurrent requests for the same image
const inflightResolves = new Map<string, Promise<string>>();

/**
 * Upload an image file to S3 via the server.
 * Called by the Paragon editor's onImageUpload hook.
 * 
 * @param file - The image File object from paste/drop
 * @param _options - Upload metadata from the editor
 * @returns The S3 URL to store in markdown
 */
export async function uploadImage(
  file: File,
  _options: { fileName: string; mimeType: string; fileSize: number; uploadId: string }
): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/images/upload', {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Image upload failed: ${err}`);
  }

  const { url } = await res.json();

  // Cache the image locally so it's immediately available
  const blob = new Blob([await file.arrayBuffer()], { type: file.type });
  await cacheImage(url, blob, file.type);

  return url;
}

/**
 * Resolve image sources to displayable URLs.
 * 
 * For S3 URLs (https://...), returns them directly — they're already publicly accessible.
 * For legacy relative paths (../_images/...), checks IndexedDB cache.
 * 
 * @param src - The image src from the editor
 * @returns A displayable URL
 */
export async function resolveImageSrc(src: string): Promise<string> {
  // S3 URLs are already publicly accessible — return as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // Legacy relative _images paths — check cache
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
      // Check IndexedDB cache
      const cached = await getCachedImage(src);
      if (cached) {
        return cached;
      }

      // Can't resolve legacy paths without Dropbox — return raw path
      return src;
    } finally {
      inflightResolves.delete(src);
    }
  })();

  inflightResolves.set(src, resolvePromise);
  return resolvePromise;
}
