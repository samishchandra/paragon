/**
 * PWA Update Prompt
 *
 * Shows a subtle toast-like banner when a new version of the app is available.
 * Allows the user to update immediately or dismiss.
 */

import { useState, useEffect } from 'react';
import { onUpdateAvailable, applyUpdate } from '@/lib/swRegister';
import { RefreshCw, X } from 'lucide-react';

export function PWAUpdatePrompt() {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const unsub = onUpdateAvailable(() => {
      setShowUpdate(true);
    });
    return unsub;
  }, []);

  if (!showUpdate) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="flex items-center gap-3 bg-primary text-primary-foreground rounded-lg px-4 py-3 shadow-lg shadow-primary/20 max-w-sm">
        <RefreshCw className="w-4 h-4 shrink-0 animate-spin" style={{ animationDuration: '3s' }} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">Update available</p>
          <p className="text-xs opacity-80">A new version is ready to install.</p>
        </div>
        <button
          onClick={() => {
            applyUpdate();
            setShowUpdate(false);
          }}
          className="shrink-0 text-xs font-semibold bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-md px-3 py-1.5 transition-colors"
        >
          Update
        </button>
        <button
          onClick={() => setShowUpdate(false)}
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
