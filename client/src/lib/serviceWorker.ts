/**
 * Service Worker Registration
 *
 * Registers the service worker for offline-first capabilities.
 * Handles updates, versioning, and user notifications.
 */

const SW_URL = '/sw.js';

let registration: ServiceWorkerRegistration | null = null;

/**
 * Register the service worker.
 * Should be called once on app startup.
 */
export async function registerServiceWorker(): Promise<void> {
  if (!('serviceWorker' in navigator)) {
    console.log('[SW] Service Workers not supported');
    return;
  }

  try {
    registration = await navigator.serviceWorker.register(SW_URL, {
      scope: '/',
    });

    console.log('[SW] Registered with scope:', registration.scope);

    // Check for updates periodically (every 30 minutes)
    setInterval(() => {
      registration?.update().catch(() => {});
    }, 30 * 60 * 1000);

    // Listen for new service worker installation
    registration.addEventListener('updatefound', () => {
      const newWorker = registration?.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New version available — notify the user
          console.log('[SW] New version available');
          dispatchSwEvent('sw-update-available');
        }
      });
    });

    // Handle controller change (new SW activated)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[SW] Controller changed — new version active');
    });
  } catch (error) {
    console.error('[SW] Registration failed:', error);
  }
}

/**
 * Skip waiting and activate the new service worker.
 * Call this when the user accepts the update.
 */
export function activateUpdate(): void {
  if (registration?.waiting) {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    // Reload the page to use the new version
    window.location.reload();
  }
}

/**
 * Clear all service worker caches.
 * Call this on logout to remove cached data.
 */
export async function clearSwCaches(): Promise<void> {
  if (registration?.active) {
    registration.active.postMessage({ type: 'CLEAR_CACHES' });
  }
  // Also clear via Cache API directly
  if ('caches' in window) {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
  }
}

/**
 * Get the current service worker version.
 */
export async function getSwVersion(): Promise<string | null> {
  if (!registration?.active) return null;

  return new Promise((resolve) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = (event) => {
      resolve(event.data?.version || null);
    };
    registration!.active!.postMessage({ type: 'GET_VERSION' }, [channel.port2]);
    // Timeout after 2 seconds
    setTimeout(() => resolve(null), 2000);
  });
}

/**
 * Unregister the service worker.
 */
export async function unregisterServiceWorker(): Promise<void> {
  if (registration) {
    await registration.unregister();
    registration = null;
    console.log('[SW] Unregistered');
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function dispatchSwEvent(type: string, detail?: any) {
  window.dispatchEvent(new CustomEvent(type, { detail }));
}
