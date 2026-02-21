/**
 * Service Worker for Momentum Foundation
 *
 * Provides offline-first capabilities:
 * 1. App Shell caching — cache HTML, CSS, JS, fonts so the UI loads offline
 * 2. Static asset caching — cache-first for hashed/immutable files
 * 3. Google Fonts caching — cache-first for font files
 *
 * Strategy:
 * - App shell (HTML): Stale-while-revalidate (serve cached, update in background)
 * - Static assets (JS/CSS with hashes): Cache-first (immutable)
 * - Google Fonts: Cache-first (long-lived)
 * - Everything else: Network-first with cache fallback
 *
 * Note: momentum-foundation uses IndexedDB for data (no API calls to cache).
 * The SW focuses purely on caching the app shell and static assets.
 */

const CACHE_VERSION = 'momentum-foundation-v1';
const APP_SHELL_CACHE = `${CACHE_VERSION}-shell`;
const STATIC_CACHE = `${CACHE_VERSION}-static`;

// App shell resources to precache on install
const APP_SHELL_URLS = [
  '/',
  '/offline.html',
];

// ─── URL matchers ──────────────────────────────────────────────────────────

const isStaticAsset = (url) =>
  url.pathname.match(/\.(js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|ico|webp|avif)$/) ||
  url.pathname.startsWith('/assets/');

const isNavigationRequest = (request) =>
  request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html');

const isGoogleFont = (url) =>
  url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

// Skip dev/debug endpoints
const isDevEndpoint = (url) =>
  url.pathname.startsWith('/__manus__') ||
  url.pathname.startsWith('/@') ||
  url.pathname.includes('hot-update');

// ─── Install ───────────────────────────────────────────────────────────────

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => {
      return cache.addAll(APP_SHELL_URLS).catch((err) => {
        console.warn('[SW] Failed to precache some app shell URLs:', err);
      });
    })
  );
  // Don't call skipWaiting() here — let the user choose when to update
  // via the PWAUpdatePrompt component
});

// ─── Activate ──────────────────────────────────────────────────────────────

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) =>
            key.startsWith('momentum-foundation-') &&
            key !== APP_SHELL_CACHE &&
            key !== STATIC_CACHE
          )
          .map((key) => caches.delete(key))
      );
    })
  );
  // Take control of all clients immediately
  self.clients.claim();
});

// ─── Fetch ─────────────────────────────────────────────────────────────────

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip dev endpoints
  if (isDevEndpoint(url)) return;

  // Skip cross-origin requests that aren't fonts
  if (url.origin !== self.location.origin && !isGoogleFont(url)) return;

  // Strategy 1: Google Fonts — Cache-first (long-lived)
  if (isGoogleFont(url)) {
    event.respondWith(cacheFirst(event.request, STATIC_CACHE));
    return;
  }

  // Strategy 2: Static assets with hashes — Cache-first (immutable)
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(event.request, STATIC_CACHE));
    return;
  }

  // Strategy 3: Navigation requests — Stale-while-revalidate
  if (isNavigationRequest(event.request)) {
    event.respondWith(navigationHandler(event.request));
    return;
  }

  // Default: Network-first
  event.respondWith(networkFirst(event.request, APP_SHELL_CACHE));
});

// ─── Caching Strategies ────────────────────────────────────────────────────

/**
 * Cache-first: Serve from cache if available, otherwise fetch and cache.
 * Best for immutable assets (hashed JS/CSS, fonts).
 */
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

/**
 * Network-first: Try network, fall back to cache.
 * Best for dynamic content that should be fresh when possible.
 */
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
    return new Response('Offline', { status: 503 });
  }
}

/**
 * Navigation handler: Network-first for HTML, with SPA fallback chain.
 * 1. Try network
 * 2. Fall back to cached version of the page
 * 3. Fall back to cached root (SPA serves same HTML for all routes)
 * 4. Fall back to offline.html
 */
async function navigationHandler(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(APP_SHELL_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Try cached version of the requested page
    const cached = await caches.match(request);
    if (cached) return cached;

    // SPA fallback: serve cached root
    const rootCached = await caches.match('/');
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

// ─── Message handling ──────────────────────────────────────────────────────

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
