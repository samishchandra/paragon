/**
 * Service Worker Registration
 *
 * Registers the service worker for offline-first capabilities.
 * Handles updates, versioning, and user notifications.
 *
 * Update flow:
 * 1. On page load, register SW and check for updates
 * 2. If a new SW is found, it installs and enters 'waiting' state
 * 3. We show an "Update available" toast with a "Refresh" action
 * 4. When the user taps "Refresh", we send SKIP_WAITING and reload
 */

import { toast } from '@/lib/toast';

const SW_URL = '/sw.js';

let registration: ServiceWorkerRegistration | null = null;
let updateToastShown = false;

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
      updateViaCache: 'none', // Always check server for SW updates (critical for mobile)
    });

    console.log('[SW] Registered with scope:', registration.scope);

    // If there's already a waiting worker (e.g., from a previous page load), show the toast
    if (registration.waiting && navigator.serviceWorker.controller) {
      showUpdateToast();
    }

    // Force an immediate update check on every page load
    registration.update().catch(() => {});

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
          // New version available — show the update toast
          console.log('[SW] New version available, waiting for user to accept');
          showUpdateToast();
        }
      });
    });

    // Handle controller change (new SW activated after user accepted)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[SW] Controller changed — new version active');
    });
  } catch (error) {
    console.error('[SW] Registration failed:', error);
  }
}

/**
 * Show a non-intrusive toast prompting the user to refresh for the new version.
 * Only shows once per session to avoid spamming.
 */
function showUpdateToast(): void {
  if (updateToastShown) return;
  updateToastShown = true;

  toast.info('A new version is available', {
    action: {
      label: 'Refresh',
      onClick: () => activateUpdate(),
    },
    duration: 30000, // Keep visible for 30 seconds
    description: 'Tap Refresh to get the latest features and fixes.',
  });
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
