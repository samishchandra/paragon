/**
 * Editor Footer Component
 * 
 * Displays auto-save status, word count, character count, last updated time,
 * and backup status (Dropbox + Local Folder) at the bottom of the editor panel.
 * 
 * Backup status is event-driven (no polling):
 * - Connection changes via onConnectionChange listener
 * - Per-item backup status via onItemBackupStatusChange listener
 */

import { useMemo, useEffect, useState, useRef, memo, useCallback } from 'react';
import { format } from 'date-fns';
import { 
  Clock,
  Loader2,
  CheckCircle2,
  Cloud,
  CloudOff,
  AlertCircle,
  UploadCloud,
  HardDrive,
  HardDriveDownload,
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
import { isConnected as isDropboxConnected, onConnectionChange as onDropboxConnectionChange, getBackupFolder, sanitizeFilename } from '@/lib/dropbox';
import { isConnected as isLocalBackupConnected, onConnectionChange as onLocalConnectionChange, getFolderName } from '@/lib/localBackup';
import {
  getItemBackupStatus as getLocalItemBackupStatus,
  onItemBackupStatusChange as onLocalItemBackupStatusChange,
  backupItemNow as localBackupItemNow,
  type ItemBackupStatus as LocalItemBackupStatus,
} from '@/lib/localAutoBackup';

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

  // ── Dropbox backup status tracking (event-driven, no polling) ──
  const [backupStatus, setBackupStatus] = useState<ItemBackupStatus | null>(null);
  const [dropboxConnected, setDropboxConnected] = useState(isDropboxConnected());

  // ── Local backup status tracking ──
  const [localBackupStatus, setLocalBackupStatus] = useState<LocalItemBackupStatus | null>(null);
  const [localConnected, setLocalConnected] = useState(isLocalBackupConnected());

  // Listen for Dropbox connection changes via event listener
  useEffect(() => {
    setDropboxConnected(isDropboxConnected());
    const unsub = onDropboxConnectionChange((connected) => {
      setDropboxConnected(connected);
    });
    return unsub;
  }, []);

  // Listen for local backup connection changes
  useEffect(() => {
    setLocalConnected(isLocalBackupConnected());
    const unsub = onLocalConnectionChange((connected) => {
      setLocalConnected(connected);
    });
    return unsub;
  }, []);

  // Subscribe to Dropbox backup status changes for the current item
  useEffect(() => {
    if (!itemId || !dropboxConnected) {
      setBackupStatus(null);
      return;
    }
    setBackupStatus(getItemBackupStatus(itemId));
    const unsub = onItemBackupStatusChange((changedItemId, status) => {
      if (changedItemId === itemId) {
        setBackupStatus(status);
      }
    });
    return unsub;
  }, [itemId, dropboxConnected]);

  // Subscribe to local backup status changes for the current item
  useEffect(() => {
    if (!itemId || !localConnected) {
      setLocalBackupStatus(null);
      return;
    }
    setLocalBackupStatus(getLocalItemBackupStatus(itemId));
    const unsub = onLocalItemBackupStatusChange((changedItemId, status) => {
      if (changedItemId === itemId) {
        setLocalBackupStatus(status);
      }
    });
    return unsub;
  }, [itemId, localConnected]);

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
      const now = Date.now();
      const diff = now - new Date(updatedAt).getTime();
      const seconds = Math.floor(diff / 1000);
      if (seconds < 5) return 'just now';
      if (seconds < 60) return `${seconds} secs ago`;
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours} hr${hours === 1 ? '' : 's'} ago`;
      const days = Math.floor(hours / 24);
      if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
      const months = Math.floor(days / 30);
      if (months < 12) return `${months} mo${months === 1 ? '' : 's'} ago`;
      const years = Math.floor(months / 12);
      return `${years} yr${years === 1 ? '' : 's'} ago`;
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

  // Render Dropbox backup status indicator (icon-only, color-coded)
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
                  className="text-emerald-500/70 hover:text-emerald-600 transition-colors"
                >
                  <Cloud className="w-3.5 h-3.5" />
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
                className="text-muted-foreground/40 hover:text-muted-foreground cursor-pointer hover:opacity-80 active:scale-95 transition-all"
              >
                <CloudOff className="w-3.5 h-3.5" />
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
                  className={cn("text-amber-500/80", clickableClass)}
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Dropbox backup pending — click to sync now</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'backing-up':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-blue-500/80 cursor-default animate-in fade-in duration-200">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
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
                  className={cn("text-red-500/80", clickableClass)}
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Dropbox backup failed — click to retry</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      default:
        return null;
    }
  };

  // Render local backup status indicator (icon-only, color-coded)
  const renderLocalBackupStatus = () => {
    if (!localConnected || !itemId) return null;

    const folderName = getFolderName();

    if (!localBackupStatus || localBackupStatus === 'synced') {
      const currentStatus = getLocalItemBackupStatus(itemId);
      if (currentStatus === 'synced') {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-emerald-500/70 cursor-default">
                  <HardDrive className="w-3.5 h-3.5" />
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Backed up to local folder: {folderName}</p>
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
                onClick={() => localBackupItemNow(itemId)}
                className="text-muted-foreground/40 hover:text-muted-foreground cursor-pointer hover:opacity-80 active:scale-95 transition-all"
              >
                <HardDriveDownload className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Click to backup to local folder</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    switch (localBackupStatus) {
      case 'pending':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => localBackupItemNow(itemId)}
                  className="text-amber-500/80 cursor-pointer hover:opacity-80 active:scale-95 transition-all"
                >
                  <HardDriveDownload className="w-3.5 h-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Local backup pending — click to sync now</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'backing-up':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-blue-500/80 cursor-default animate-in fade-in duration-200">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Backing up to local folder...</p>
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
                  onClick={() => localBackupItemNow(itemId)}
                  className="text-red-500/80 cursor-pointer hover:opacity-80 active:scale-95 transition-all"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Local backup failed — click to retry</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      default:
        return null;
    }
  };

  const showDropboxBackup = dropboxConnected && !!itemId;
  const showLocalBackup = localConnected && !!itemId;
  const showBackup = showDropboxBackup || showLocalBackup;
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

      {/* Right side - Save status, Backup status, and Cloud Sync */}
      <div className="flex items-center gap-3">
        {/* Auto-save indicator */}
        {renderSaveStatus()}
        
        {/* Vertical divider when save status is visible */}
        {showSaveStatus && (showBackup || true) && (
          <span className="w-px h-3 bg-border/60" />
        )}

        {/* Dropbox backup status */}
        {renderBackupStatus()}

        {/* Local backup status */}
        {renderLocalBackupStatus()}

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
