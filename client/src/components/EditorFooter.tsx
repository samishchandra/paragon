/**
 * Editor Footer Component
 * 
 * Displays auto-save status, word count, character count, last updated time,
 * and Dropbox backup status at the bottom of the editor panel.
 * 
 * Dropbox status is event-driven (no polling):
 * - Connection changes via onConnectionChange listener
 * - Per-item backup status via onItemBackupStatusChange listener
 */

import { useMemo, useEffect, useState, useRef, memo, useCallback } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { 
  Clock,
  Loader2,
  CheckCircle2,
  Cloud,
  CloudOff,
  AlertCircle,
  UploadCloud,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HeaderSyncIndicator } from '@/components/SyncStatusIndicator';
import {
  getItemBackupStatus,
  onItemBackupStatusChange,
  backupItemNow,
  type ItemBackupStatus,
} from '@/lib/autoBackup';
import { isConnected as isDropboxConnected, onConnectionChange, getBackupFolder, sanitizeFilename } from '@/lib/dropbox';

type SaveStatus = 'idle' | 'saving' | 'saved';

interface EditorFooterProps {
  content: string;
  updatedAt?: string;
  className?: string;
  /** Trigger to indicate content has changed */
  contentVersion?: number;
  /** The ID of the currently selected item */
  itemId?: string;
  /** The name of the list the item belongs to (for Dropbox folder link) */
  listName?: string;
}

export const EditorFooter = memo(function EditorFooter({ content, updatedAt, className, contentVersion = 0, itemId, listName }: EditorFooterProps) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const savedTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevContentVersionRef = useRef(contentVersion);

  // ── Backup status tracking (event-driven, no polling) ──
  const [backupStatus, setBackupStatus] = useState<ItemBackupStatus | null>(null);
  const [dropboxConnected, setDropboxConnected] = useState(isDropboxConnected());

  // Listen for Dropbox connection changes via event listener
  useEffect(() => {
    setDropboxConnected(isDropboxConnected());
    const unsub = onConnectionChange((connected) => {
      setDropboxConnected(connected);
    });
    return unsub;
  }, []);

  // Subscribe to backup status changes for the current item
  useEffect(() => {
    if (!itemId || !dropboxConnected) {
      setBackupStatus(null);
      return;
    }

    // Get initial status
    setBackupStatus(getItemBackupStatus(itemId));

    // Listen for changes
    const unsub = onItemBackupStatusChange((changedItemId, status) => {
      if (changedItemId === itemId) {
        setBackupStatus(status);
      }
    });

    return unsub;
  }, [itemId, dropboxConnected]);

  // Handle click-to-backup
  const handleBackupClick = useCallback(() => {
    if (!itemId) return;
    if (backupStatus === 'pending' || backupStatus === 'error' || !backupStatus) {
      backupItemNow(itemId);
    }
  }, [itemId, backupStatus]);

  // Handle auto-save indicator
  useEffect(() => {
    if (prevContentVersionRef.current === contentVersion) {
      return;
    }
    prevContentVersionRef.current = contentVersion;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    if (savedTimeoutRef.current) clearTimeout(savedTimeoutRef.current);

    setSaveStatus('saving');

    saveTimeoutRef.current = setTimeout(() => {
      setSaveStatus('saved');
      savedTimeoutRef.current = setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    }, 500);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      if (savedTimeoutRef.current) clearTimeout(savedTimeoutRef.current);
    };
  }, [contentVersion]);

  // Calculate word and character count
  const stats = useMemo(() => {
    const text = content || '';
    const cleanText = text
      .replace(/[#*_~`\[\]()]/g, '')
      .replace(/\n+/g, ' ')
      .trim();
    
    const words = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
    const characters = text.length;
    const lines = text ? text.split('\n').length : 0;
    
    return { words, characters, lines };
  }, [content]);

  // Format last updated time - relative for display, absolute for tooltip
  // Only recalculates when updatedAt changes (on save) or when item is viewed (contentVersion)
  const lastUpdatedAbsolute = useMemo(() => {
    if (!updatedAt) return null;
    try {
      return format(new Date(updatedAt), 'MMM d, yyyy h:mm a');
    } catch {
      return null;
    }
  }, [updatedAt]);

  const lastUpdatedRelative = useMemo(() => {
    if (!updatedAt) return null;
    try {
      return formatDistanceToNow(new Date(updatedAt), { addSuffix: true });
    } catch {
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedAt, contentVersion]);

  // Render save status indicator
  const renderSaveStatus = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <span className="flex items-center gap-1.5 text-blue-500 animate-in fade-in duration-200">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Saving...</span>
          </span>
        );
      case 'saved':
        return (
          <span className="flex items-center gap-1.5 text-green-500 animate-in fade-in duration-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>Saved</span>
          </span>
        );
      default:
        return null;
    }
  };

  // Render Dropbox backup status indicator
  const renderBackupStatus = () => {
    if (!dropboxConnected || !itemId) return null;

    const isClickable = backupStatus === 'pending' || backupStatus === 'error';
    const clickableClass = isClickable 
      ? 'cursor-pointer hover:opacity-80 active:scale-95 transition-all' 
      : 'cursor-default';

    if (!backupStatus || backupStatus === 'synced') {
      const currentStatus = getItemBackupStatus(itemId);
      if (currentStatus === 'synced') {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={`https://www.dropbox.com/home/Apps/Momentum${getBackupFolder()}/${sanitizeFilename(listName || 'Miscellaneous')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-500/70 hover:text-emerald-600 transition-colors"
                >
                  <Cloud className="w-3 h-3" />
                  <span className="text-[10px]">Backed up</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Backed up to Dropbox</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => backupItemNow(itemId)}
                className="flex items-center gap-1.5 text-muted-foreground/50 hover:text-muted-foreground cursor-pointer hover:opacity-80 active:scale-95 transition-all"
              >
                <CloudOff className="w-3 h-3" />
                <span className="text-[10px]">Not backed up</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Click to backup to Dropbox</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    switch (backupStatus) {
      case 'pending':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleBackupClick}
                  className={cn("flex items-center gap-1.5 text-amber-500/80", clickableClass)}
                >
                  <UploadCloud className="w-3 h-3" />
                  <span className="text-[10px]">Pending</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Backup pending — click to backup now</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'backing-up':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center gap-1.5 text-blue-500/80 cursor-default animate-in fade-in duration-200">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span className="text-[10px]">Backing up</span>
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Backing up to Dropbox...</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'error':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleBackupClick}
                  className={cn("flex items-center gap-1.5 text-red-500/80", clickableClass)}
                >
                  <AlertCircle className="w-3 h-3" />
                  <span className="text-[10px]">Failed</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Backup failed — click to retry</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      default:
        return null;
    }
  };

  const showBackup = dropboxConnected && !!itemId;
  const showSaveStatus = saveStatus !== 'idle';

  return (
    <div className={cn(
      "h-8 border-t border-border/50 flex items-center justify-between px-3 text-xs text-muted-foreground bg-[#F9FAFB] dark:bg-zinc-900",
      className
    )}>
      {/* Left side - Stats */}
      <div className="flex items-center gap-3 whitespace-nowrap font-mono text-muted-foreground/70">
        {lastUpdatedRelative && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center gap-1 cursor-default">
                  <Clock className="w-3 h-3" />
                  {lastUpdatedRelative}
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{lastUpdatedAbsolute || 'Last modified'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {lastUpdatedRelative && stats.words > 0 && (
          <span className="w-px h-3 bg-border/60" />
        )}
        {stats.words > 0 && (
          <span>{stats.words} words</span>
        )}
      </div>

      {/* Right side - Save status, Dropbox Backup status, and Cloud Sync */}
      <div className="flex items-center gap-3">
        {/* Auto-save indicator */}
        {renderSaveStatus()}
        
        {/* Vertical divider when save status is visible */}
        {showSaveStatus && (showBackup || true) && (
          <span className="w-px h-3 bg-border/60" />
        )}

        {/* Dropbox backup status */}
        {renderBackupStatus()}

        {/* Vertical divider when backup status is visible */}
        {showBackup && (
          <span className="w-px h-3 bg-border/60" />
        )}
        
        {/* Cloud Sync button */}
        <HeaderSyncIndicator />
      </div>
    </div>
  );
});

export default EditorFooter;
