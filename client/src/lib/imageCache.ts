/**
 * IndexedDB-based image cache for editor images.
 * Caches image blobs locally for fast resolution
 * without re-downloading from the server.
 */

const DB_NAME = 'momentum-image-cache';
const DB_VERSION = 1;
const STORE_NAME = 'images';

interface CachedImage {
  /** The relative path key, e.g. "../_images/2026-02-12_abc123.jpg" */
  key: string;
  /** The image binary data */
  blob: Blob;
  /** MIME type */
  mimeType: string;
  /** When this entry was cached */
  cachedAt: number;
  /** File size in bytes */
  size: number;
}

let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      dbPromise = null;
      reject(request.error);
    };
  });

  return dbPromise;
}

/**
 * Get a cached image blob URL by its relative path key.
 * Returns null if not cached.
 */
export async function getCachedImage(key: string): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result as CachedImage | undefined;
        if (result?.blob) {
          const blobUrl = URL.createObjectURL(result.blob);
          resolve(blobUrl);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch {
    return null;
  }
}

/**
 * Cache an image blob with its relative path key.
 */
export async function cacheImage(key: string, blob: Blob, mimeType: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const entry: CachedImage = {
        key,
        blob,
        mimeType,
        cachedAt: Date.now(),
        size: blob.size,
      };
      const request = store.put(entry);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    // Silently fail — cache is a performance optimization, not critical
  }
}

/**
 * Remove a cached image by its key.
 */
export async function removeCachedImage(key: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    // Silently fail
  }
}

/**
 * Clear all cached images.
 */
export async function clearImageCache(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    // Silently fail
  }
}

/**
 * Get total cache size in bytes.
 */
export async function getCacheSize(): Promise<number> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => {
        const entries = request.result as CachedImage[];
        const totalSize = entries.reduce((sum, entry) => sum + entry.size, 0);
        resolve(totalSize);
      };
      request.onerror = () => reject(request.error);
    });
  } catch {
    return 0;
  }
}
