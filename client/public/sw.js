/**
 * Service Worker for Momentum Notes
 *
 * Provides true offline-first capabilities:
 * 1. App Shell caching — cache HTML, CSS, JS, fonts so the UI loads offline
 * 2. API caching — cache GET responses for offline reads
 *
 * Strategy:
 * - Navigation (HTML): Network-first with no-store fetch, cache only '/' for offline
 * - Hashed assets (/assets/*): Cache-first (content-hash guarantees uniqueness)
 * - API calls: Network-first with cache fallback
 * - Google Fonts: Cache-first (long-lived)
 *
 * Cache Versioning:
 * - Bump CACHE_VERSION on each deploy to purge ALL old caches.
 * - The activate handler deletes every cache that doesn't match the current version.
 */

const CACHE_VERSION = 'momentum-v6';
const APP_SHELL_CACHE = `${CACHE_VERSION}-shell`;
const API_CACHE = `${CACHE_VERSION}-api`;
const STATIC_CACHE = `${CACHE_VERSION}-static`;

// Only precache the offline fallback page.
// index.html is always fetched network-first and cached as '/' on success.
const APP_SHELL_URLS = [
  '/offline.html',
];

// ─── Helpers ────────────────────────────────────────────────────────────────

const isApiRequest = (url) => url.pathname.startsWith('/api/');
const isHashedAsset = (url) => url.pathname.startsWith('/assets/');
const isGoogleFont = (url) =>
  url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

function isNavigationRequest(request) {
  // request.mode === 'navigate' is the standard check, but some mobile browsers
  // (especially PWA mode) may not set it correctly. Also check accept header.
  if (request.mode === 'navigate') return true;
  const accept = request.headers.get('accept') || '';
  // Only treat as navigation if it's a document request (not a script/image/etc.)
  if (accept.includes('text/html') && request.destination === 'document') return true;
  // Fallback: if destination is empty and accept includes text/html, it's likely navigation
  if (accept.includes('text/html') && !request.destination) return true;
  return false;
}

/**
 * Check if a cached response looks corrupted for a script request.
 * Returns true if the cached response should be discarded.
 */
function isCacheCorrupted(request, cachedResponse) {
  if (!cachedResponse) return false;
  const url = new URL(request.url);
  const dest = request.destination;
  // Check script requests (JS modules, dynamic imports)
  if (dest === 'script' || url.pathname.endsWith('.js') || url.pathname.endsWith('.mjs')) {
    const contentType = cachedResponse.headers.get('content-type') || '';
    // If a JS request returned HTML, the cache is corrupted
    if (contentType.includes('text/html')) return true;
  }
  // Check CSS requests
  if (dest === 'style' || url.pathname.endsWith('.css')) {
    const contentType = cachedResponse.headers.get('content-type') || '';
    if (contentType.includes('text/html')) return true;
  }
  return false;
}

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
      const currentCaches = new Set([APP_SHELL_CACHE, API_CACHE, STATIC_CACHE]);
      return Promise.all(
        keys
          .filter((key) => !currentCaches.has(key))
          .map((key) => {
            console.log('[SW] Purging old cache:', key);
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

  // Only handle same-origin requests — skip external URLs entirely
  if (url.origin !== self.location.origin) {
    // Exception: cache Google Fonts
    if (isGoogleFont(url)) {
      event.respondWith(cacheFirst(event.request, STATIC_CACHE));
    }
    return;
  }

  // Skip non-GET requests (mutations go through the offline queue)
  if (event.request.method !== 'GET') return;

  // Skip OAuth/auth endpoints — never cache these
  if (url.pathname.startsWith('/api/oauth') || url.pathname.includes('/auth/')) return;

  // Skip tRPC auth-related batch requests
  if (url.pathname.startsWith('/api/trpc') && url.search.includes('auth.')) return;

  // Strategy 1: Navigation requests — ALWAYS network-first
  if (isNavigationRequest(event.request)) {
    event.respondWith(navigationHandler(event.request));
    return;
  }

  // Strategy 2: Hashed assets (/assets/*) — Cache-first with corruption check
  if (isHashedAsset(url)) {
    event.respondWith(cacheFirstSafe(event.request, STATIC_CACHE));
    return;
  }

  // Strategy 3: API requests — Network-first with cache fallback
  if (isApiRequest(url)) {
    event.respondWith(networkFirst(event.request, API_CACHE));
    return;
  }

  // Default: Network-first for everything else (manifest.json, icons, etc.)
  event.respondWith(networkFirst(event.request, APP_SHELL_CACHE));
});

// ─── Caching Strategies ─────────────────────────────────────────────────────

/**
 * Cache-first with corruption detection.
 * If the cached response has wrong content-type (e.g., HTML for a JS request),
 * delete the corrupted entry and fetch fresh from network.
 */
async function cacheFirstSafe(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    if (isCacheCorrupted(request, cached)) {
      console.warn('[SW] Corrupted cache entry detected, refetching:', request.url);
      const cache = await caches.open(cacheName);
      await cache.delete(request);
      // Fall through to network
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

/**
 * Navigation handler — always fetch fresh HTML from network.
 * Uses cache: 'no-store' to bypass browser HTTP cache (critical for Safari).
 * Caches the response under a fixed '/' key so all SPA routes share one entry.
 * On network failure, falls back to the cached '/' (SPA root) or offline page.
 */
async function navigationHandler(request) {
  try {
    // Always fetch fresh — bypass HTTP cache to avoid Safari serving stale HTML
    const response = await fetch(request, { cache: 'no-store' });
    if (response.ok) {
      // Cache under the fixed '/' key — all SPA routes serve the same HTML.
      // This prevents caching redirect pages or per-path stale entries.
      const cache = await caches.open(APP_SHELL_CACHE);
      const rootRequest = new Request(self.location.origin + '/');
      cache.put(rootRequest, response.clone());
    }
    return response;
  } catch {
    // Offline: serve the cached SPA root (all routes share the same HTML)
    const rootCached = await caches.match(new Request(self.location.origin + '/'));
    if (rootCached) return rootCached;

    // Last resort: offline page
    const offlineCached = await caches.match('/offline.html');
    if (offlineCached) return offlineCached;

    return new Response(
      '<html><body><h1>Offline</h1><p>Please check your internet connection.</p></body></html>',
      { headers: { 'Content-Type': 'text/html' } }
    );
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
