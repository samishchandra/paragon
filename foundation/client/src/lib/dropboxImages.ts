/**
 * dropboxImages.ts — Stub module for backward compatibility.
 *
 * In momentum-foundation, cloud image backup is disabled by default.
 * Embedding repos can replace this with real Dropbox or other cloud storage.
 */

export async function uploadImageToDropbox(
  _file: File | Blob,
  _options?: string | { fileName: string; mimeType: string; fileSize: number; uploadId: string },
  _folder?: string,
): Promise<string> {
  // In foundation mode, convert to a local blob URL instead
  if (_file instanceof File || _file instanceof Blob) {
    return URL.createObjectURL(_file);
  }
  return '';
}

export function resolveImageSrc(src: string): string {
  return src;
}
