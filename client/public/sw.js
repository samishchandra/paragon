/**
 * Service Worker for Momentum Notes
 *
 * Provides true offline-first capabilities:
 * 1. App Shell caching — cache HTML, CSS, JS, fonts so the UI loads offline
 * 2. API caching — cache GET responses for offline reads
 * 3. Background sync — queue failed mutations for retry when back online
 *
 * Strategy:
 * - App shell: Cache-first with network fallback (stale-while-revalidate)
 * - API calls: Network-first with cache fallback
 * - Static assets: Cache-first (immutable hashed files)
 */

const CACHE_VERSION = 'momentum-v1';
const APP_SHELL_CACHE = `${CACHE_VERSION}-shell`;
const API_CACHE = `${CACHE_VERSION}-api`;
const STATIC_CACHE = `${CACHE_VERSION}-static`;

// App shell resources to precache
const APP_SHELL_URLS = [
  '/',
  '/offline.html',
];

// Patterns for different caching strategies
const isApiRequest = (url) => url.pathname.startsWith('/api/');
const isStaticAsset = (url) =>
  url.pathname.match(/\.(js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|ico|webp)$/) ||
  url.pathname.startsWith('/assets/');
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
      return Promise.all(
        keys
          .filter((key) => key.startsWith('momentum-') && key !== APP_SHELL_CACHE && key !== API_CACHE && key !== STATIC_CACHE)
          .map((key) => caches.delete(key))
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

  // Strategy 1: Google Fonts — Cache-first (long-lived)
  if (isGoogleFont(url)) {
    event.respondWith(cacheFirst(event.request, STATIC_CACHE));
    return;
  }

  // Strategy 2: Static assets with hashes — Cache-first
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(event.request, STATIC_CACHE));
    return;
  }

  // Strategy 3: API requests — Network-first with cache fallback
  if (isApiRequest(url)) {
    event.respondWith(networkFirst(event.request, API_CACHE));
    return;
  }

  // Strategy 4: Navigation requests — Network-first, fallback to cached shell or offline page
  if (isNavigationRequest(event.request)) {
    event.respondWith(navigationHandler(event.request));
    return;
  }

  // Default: Network-first
  event.respondWith(networkFirst(event.request, APP_SHELL_CACHE));
});

// ─── Caching Strategies ─────────────────────────────────────────────────────

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
      const cache = await caches.open(APP_SHELL_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Try to serve the cached version of the requested page
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
