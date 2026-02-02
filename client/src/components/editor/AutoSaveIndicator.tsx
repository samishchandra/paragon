import React from 'react';
import { Check, Cloud, CloudOff, Loader2 } from 'lucide-react';

/*
 * AutoSaveIndicator Component
 * Displays the current save status with visual feedback
 */

export interface AutoSaveIndicatorProps {
  status: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved: Date | null;
  className?: string;
}

export function AutoSaveIndicator({ status, lastSaved, className = '' }: AutoSaveIndicatorProps) {
  const formatLastSaved = (date: Date | null): string => {
    if (!date) return '';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffSecs < 10) return 'Just now';
    if (diffSecs < 60) return `${diffSecs}s ago`;
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div 
      className={`auto-save-indicator flex items-center gap-1.5 text-xs ${className}`}
      title={lastSaved ? `Last saved: ${lastSaved.toLocaleString()}` : 'Not saved yet'}
    >
      {status === 'idle' && lastSaved && (
        <>
          <Cloud className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">Saved {formatLastSaved(lastSaved)}</span>
        </>
      )}
      
      {status === 'saving' && (
        <>
          <Loader2 className="w-3.5 h-3.5 text-cyan-500 animate-spin" />
          <span className="text-cyan-500">Saving...</span>
        </>
      )}
      
      {status === 'saved' && (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-emerald-500">Saved</span>
        </>
      )}
      
      {status === 'error' && (
        <>
          <CloudOff className="w-3.5 h-3.5 text-red-500" />
          <span className="text-red-500">Save failed</span>
        </>
      )}
    </div>
  );
}

export default AutoSaveIndicator;
