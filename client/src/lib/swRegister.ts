/**
 * Service Worker Registration & Update Management
 *
 * Registers the Workbox-generated service worker from vite-plugin-pwa.
 * Provides hooks for detecting new versions and prompting the user to update.
 *
 * IMPORTANT: We intentionally do NOT auto-reload on `controllerchange`.
 * Previously, the controllerchange listener called window.location.reload()
 * whenever a new SW took over, which caused a visible "double splash" on every
 * page reload (Splash → Home → reload → Splash → Home). This happened because:
 *   1. On reload, the existing SW serves cached HTML (splash visible).
 *   2. The browser checks for SW updates; if a new SW is found, it installs.
 *   3. If the new SW calls skipWaiting(), controllerchange fires.
 *   4. The auto-reload triggers a second full page load (second splash).
 *
 * Instead, we now rely on the PWAUpdatePrompt component to notify the user
 * when a new version is available, letting them choose when to reload.
 * The new SW's assets will be used on the *next* natural navigation/reload.
 */

type UpdateCallback = (registration: ServiceWorkerRegistration) => void;

let updateCallbacks: UpdateCallback[] = [];
let currentRegistration: ServiceWorkerRegistration | null = null;

export function onUpdateAvailable(cb: UpdateCallback): () => void {
  updateCallbacks.push(cb);
  return () => {
    updateCallbacks = updateCallbacks.filter(fn => fn !== cb);
  };
}

export function getRegistration(): ServiceWorkerRegistration | null {
  return currentRegistration;
}

export function applyUpdate(): void {
  if (currentRegistration?.waiting) {
    currentRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
    // After the waiting SW receives SKIP_WAITING and activates,
    // reload so the page uses the new assets.
    // We use a small delay to let the SW activate before reloading.
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }
}

export async function registerSW(): Promise<void> {
  if (!('serviceWorker' in navigator)) {
    console.log('[SW] Service workers not supported');
    return;
  }

  // Only register in production (SW is not generated in dev)
  if (import.meta.env.DEV) {
    console.log('[SW] Skipping registration in development mode');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    currentRegistration = registration;

    // Check for updates periodically (every 60 minutes)
    setInterval(() => {
      registration.update().catch(() => { /* ignore */ });
    }, 60 * 60 * 1000);

    // Detect waiting worker (new version ready)
    if (registration.waiting) {
      updateCallbacks.forEach(cb => cb(registration));
    }

    // Detect installing worker becoming waiting
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New version available — notify via PWAUpdatePrompt
          updateCallbacks.forEach(cb => cb(registration));
        }
      });
    });

    // No controllerchange listener — we do NOT auto-reload.
    // The applyUpdate() function handles reload after the user explicitly
    // clicks "Update" in the PWAUpdatePrompt.

    console.log('[SW] Registered successfully');
  } catch (err) {
    console.error('[SW] Registration failed:', err);
  }
}
