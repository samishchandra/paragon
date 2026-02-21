/**
 * Service Worker for Momentum Notes
 *
 * Provides true offline-first capabilities:
 * 1. App Shell caching — cache HTML, CSS, JS, fonts so the UI loads offline
 * 2. API caching — cache GET responses for offline reads
 * 3. Background sync — queue failed mutations for retry when back online
 *
 * Strategy:
 * - Navigation (HTML): Network-first, always fetch fresh index.html
 * - Hashed assets (/assets/*): Cache-first (content-hash guarantees uniqueness)
 * - API calls: Network-first with cache fallback
 * - Google Fonts: Cache-first (long-lived)
 *
 * Cache Versioning:
 * - Bump CACHE_VERSION on each deploy to purge stale caches.
 * - The activate handler deletes ALL caches that don't match the current version.
 * - This prevents stale HTML from referencing old chunk filenames.
 */

const CACHE_VERSION = 'momentum-v2';
const APP_SHELL_CACHE = `${CACHE_VERSION}-shell`;
const API_CACHE = `${CACHE_VERSION}-api`;
const STATIC_CACHE = `${CACHE_VERSION}-static`;

// App shell resources to precache (only the offline fallback — index.html
// is always fetched network-first so we never serve a stale shell)
const APP_SHELL_URLS = [
  '/offline.html',
];

// Patterns for different caching strategies
const isApiRequest = (url) => url.pathname.startsWith('/api/');
const isHashedAsset = (url) => url.pathname.startsWith('/assets/');
const isNavigationRequest = (request) =>
  request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html');
const isGoogleFont = (url) =>
  url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

// ─── Install ────────────────────────────────────────────────────────────────

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => {
      return cache.addAll(APP_SHELL_URLS).catch((err) => {
        console.warn('[SW] Failed to precache some app shell URLs:', err);
      });
    })
  );
  // Activate immediately without waiting for existing clients to close
  self.skipWaiting();
});

// ─── Activate ───────────────────────────────────────────────────────────────

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      // Delete ALL caches that don't belong to the current version.
      // This ensures old HTML/JS/CSS are purged on every deploy.
      return Promise.all(
        keys
          .filter((key) => key !== APP_SHELL_CACHE && key !== API_CACHE && key !== STATIC_CACHE)
          .map((key) => {
            console.log('[SW] Deleting stale cache:', key);
            return caches.delete(key);
          })
      );
    })
  );
  // Take control of all clients immediately
  self.clients.claim();
});

// ─── Fetch ──────────────────────────────────────────────────────────────────

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests (mutations should go through the offline queue)
  if (event.request.method !== 'GET') return;

  // Skip OAuth/auth endpoints — never cache these
  if (url.pathname.startsWith('/api/oauth') || url.pathname.includes('/auth/')) return;

  // Skip tRPC batch requests that contain mutations
  if (url.pathname.startsWith('/api/trpc') && url.search.includes('auth.')) return;

  // Strategy 1: Navigation requests — ALWAYS network-first
  // This is critical: we must never serve stale HTML that references old chunks.
  if (isNavigationRequest(event.request)) {
    event.respondWith(navigationHandler(event.request));
    return;
  }

  // Strategy 2: Google Fonts — Cache-first (long-lived, versioned by URL)
  if (isGoogleFont(url)) {
    event.respondWith(cacheFirst(event.request, STATIC_CACHE));
    return;
  }

  // Strategy 3: Hashed assets (/assets/*) — Cache-first
  // These have content hashes in filenames, so each build produces unique URLs.
  // Safe to cache aggressively — stale entries are harmless (just unused).
  if (isHashedAsset(url)) {
    event.respondWith(cacheFirstWithFallback(event.request, STATIC_CACHE));
    return;
  }

  // Strategy 4: API requests — Network-first with cache fallback
  if (isApiRequest(url)) {
    event.respondWith(networkFirst(event.request, API_CACHE));
    return;
  }

  // Default: Network-first for everything else (manifest.json, icons, etc.)
  event.respondWith(networkFirst(event.request, APP_SHELL_CACHE));
});

// ─── Caching Strategies ─────────────────────────────────────────────────────

/**
 * Cache-first with network fallback.
 * If the cached response is a non-JS content type for a .js request (corruption),
 * bypass cache and fetch from network.
 */
async function cacheFirstWithFallback(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    // Sanity check: if requesting JS but cached response is HTML, skip cache
    const url = new URL(request.url);
    if (url.pathname.endsWith('.js')) {
      const contentType = cached.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        // Corrupted cache entry — delete it and fetch fresh
        const cache = await caches.open(cacheName);
        await cache.delete(request);
        // Fall through to network fetch below
      } else {
        return cached;
      }
    } else {
      return cached;
    }
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function navigationHandler(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      // Cache the fresh HTML for offline fallback
      const cache = await caches.open(APP_SHELL_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Offline: try to serve the cached version of the requested page
    const cached = await caches.match(request);
    if (cached) return cached;

    // Fallback to cached root (SPA — all routes serve the same HTML)
    const rootCached = await caches.match('/');
    if (rootCached) return rootCached;

    // Last resort: offline page
    const offlineCached = await caches.match('/offline.html');
    if (offlineCached) return offlineCached;

    return new Response('<html><body><h1>Offline</h1><p>Please check your internet connection.</p></body></html>', {
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

// ─── Message handling ───────────────────────────────────────────────────────

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data?.type === 'CLEAR_CACHES') {
    event.waitUntil(
      caches.keys().then((keys) =>
        Promise.all(keys.map((key) => caches.delete(key)))
      )
    );
  }

  if (event.data?.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({ version: CACHE_VERSION });
  }
});
