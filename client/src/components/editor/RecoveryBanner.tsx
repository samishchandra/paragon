import React from 'react';
import { AlertCircle, RotateCcw, X } from 'lucide-react';

/*
 * RecoveryBanner Component
 * Displays a banner when there's recoverable content from a previous session
 */

export interface RecoveryBannerProps {
  onRecover: () => void;
  onDismiss: () => void;
  className?: string;
}

export function RecoveryBanner({ onRecover, onDismiss, className = '' }: RecoveryBannerProps) {
  return (
    <div 
      className={`recovery-banner flex items-center justify-between gap-4 px-4 py-3 
        bg-amber-500/10 border border-amber-500/30 rounded-lg ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
        <span className="text-sm text-amber-200">
          We found unsaved content from your last session.
        </span>
      </div>
      
      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          onClick={onRecover}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium
            bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-md
            border border-amber-500/30 transition-colors duration-150"
        >
          <RotateCcw className="w-4 h-4" />
          Recover
        </button>
        
        <button
          onClick={onDismiss}
          className="p-2 text-amber-400/60 hover:text-amber-400 
            hover:bg-amber-500/20 rounded-md transition-colors duration-150"
          title="Dismiss"
          aria-label="Dismiss recovery banner"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default RecoveryBanner;
