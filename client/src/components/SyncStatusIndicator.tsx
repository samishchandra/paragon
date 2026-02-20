/**
 * Sync Status Indicator
 * 
 * Visual indicator showing real-time server sync status.
 * Uses isFetching from TanStack Query to detect active data fetches
 * and displays a "last synced" timestamp for user confidence.
 * Includes offline status and pending sync count.
 */

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Cloud, 
  CloudOff,
  RefreshCw, 
  Check, 
  Database,
  Loader2,
  WifiOff,
  Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMomentum } from "@/contexts/ServerMomentumContext";
import { toast } from '@/lib/toast';

type SyncState = 'synced' | 'syncing' | 'offline' | 'pending-sync';

interface SyncStatusIndicatorProps {
  /** Show compact version (icon only) */
  compact?: boolean;
  /** Show in the header style */
  variant?: 'default' | 'header' | 'minimal';
  /** Custom className */
  className?: string;
}

function formatLastSynced(date: Date | null): string {
  if (!date) return '';
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);

  if (diffSec < 5) return 'Just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export function SyncStatusIndicator({ 
  compact = false, 
  variant = 'default',
  className,
}: SyncStatusIndicatorProps) {
  const { state, refreshData, isFetching, isSyncingCatchUp, lastSyncedAt, isOnline, pendingOfflineCount, isSyncingOffline, retrySyncOffline } = useMomentum();
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const [lastSyncedLabel, setLastSyncedLabel] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update the "last synced" label every 10 seconds
  useEffect(() => {
    const update = () => setLastSyncedLabel(formatLastSynced(lastSyncedAt));
    update();
    intervalRef.current = setInterval(update, 10000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [lastSyncedAt]);

  // Determine sync state with offline awareness
  const syncState: SyncState = (() => {
    if (!isOnline) return 'offline';
    if (isSyncingOffline) return 'pending-sync';
    if (pendingOfflineCount > 0 && isOnline) return 'pending-sync';
    if (isFetching || isManualRefreshing || state.isLoading || isSyncingCatchUp) return 'syncing';
    return 'synced';
  })();

  const handleRefresh = async () => {
    setIsManualRefreshing(true);
    try {
      refreshData();
      toast.success('Data refreshed');
    } finally {
      setTimeout(() => setIsManualRefreshing(false), 800);
    }
  };

  const getStateConfig = () => {
    switch (syncState) {
      case 'synced':
        return {
          icon: <Check className="h-3.5 w-3.5" />,
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/20',
          label: 'Synced',
          description: lastSyncedLabel ? `Last synced ${lastSyncedLabel}` : 'Auto-save enabled',
        };
      case 'syncing':
        return {
          icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
          color: 'text-emerald-500',
          bgColor: 'bg-emerald-500/10',
          borderColor: 'border-emerald-500/20',
          label: 'Syncing',
          description: 'Fetching latest data...',
        };
      case 'offline':
        return {
          icon: <WifiOff className="h-3.5 w-3.5" />,
          color: 'text-amber-500',
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/20',
          label: 'Offline',
          description: pendingOfflineCount > 0 
            ? `${pendingOfflineCount} change${pendingOfflineCount > 1 ? 's' : ''} queued`
            : 'Changes saved locally',
        };
      case 'pending-sync':
        return {
          icon: <Upload className="h-3.5 w-3.5 animate-pulse" />,
          color: 'text-orange-500',
          bgColor: 'bg-orange-500/10',
          borderColor: 'border-orange-500/20',
          label: 'Syncing offline changes',
          description: `${pendingOfflineCount} change${pendingOfflineCount > 1 ? 's' : ''} pending`,
        };
      default:
        return {
          icon: <Cloud className="h-3.5 w-3.5" />,
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/50',
          borderColor: 'border-muted',
          label: 'Idle',
          description: 'Auto-save enabled',
        };
    }
  };

  const config = getStateConfig();

  // Minimal variant - just a small dot indicator
  if (variant === 'minimal') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className={cn(
                "h-2 w-2 rounded-full transition-colors duration-300",
                syncState === 'synced' && "bg-green-500",
                syncState === 'syncing' && "bg-emerald-500 animate-pulse",
                syncState === 'offline' && "bg-amber-500",
                syncState === 'pending-sync' && "bg-orange-500 animate-pulse",
                className
              )}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="font-medium">{config.label}</p>
            <p className="text-xs text-muted-foreground">{config.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Header variant - compact with popover for details
  if (variant === 'header') {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "gap-1.5 h-7 px-2 transition-colors duration-300",
              config.color,
              className
            )}
          >
            {config.icon}
            {!compact && (
              <span className="text-xs font-medium">
                {syncState === 'offline' ? (
                  pendingOfflineCount > 0 ? `Offline (${pendingOfflineCount})` : 'Offline'
                ) : syncState === 'pending-sync' ? (
                  `Syncing (${pendingOfflineCount})`
                ) : syncState === 'syncing' ? 'Syncing...' : (
                  lastSyncedLabel ? `Synced ${lastSyncedLabel}` : 'Synced'
                )}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-72 p-0">
          <div className="p-4 space-y-4">
            {/* Status Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "p-2 rounded-lg transition-colors duration-300",
                  config.bgColor
                )}>
                  <span className={config.color}>{config.icon}</span>
                </div>
                <div>
                  <p className="font-medium text-sm">{config.label}</p>
                  <p className="text-xs text-muted-foreground">{config.description}</p>
                </div>
              </div>
            </div>

            {/* Offline Banner */}
            {syncState === 'offline' && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <WifiOff className="h-4 w-4 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">You're offline</p>
                    <p className="text-xs opacity-80">
                      Your edits are saved locally and will sync automatically when you reconnect.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Pending Sync Info */}
            {pendingOfflineCount > 0 && syncState !== 'offline' && (
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                  <Upload className="h-4 w-4 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Syncing offline changes</p>
                    <p className="text-xs opacity-80">
                      {pendingOfflineCount} change{pendingOfflineCount > 1 ? 's' : ''} being uploaded...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sync Details */}
            <div className="space-y-2 pt-2 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Connection</span>
                <span className={cn("font-medium flex items-center gap-1", isOnline ? 'text-green-500' : 'text-amber-500')}>
                  {isOnline ? <Cloud className="h-3 w-3" /> : <CloudOff className="h-3 w-3" />}
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Storage</span>
                <span className="font-medium flex items-center gap-1">
                  <Database className="h-3 w-3" />
                  PostgreSQL
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Items</span>
                <span className="font-medium">{state.total}</span>
              </div>
              {pendingOfflineCount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Queued changes</span>
                  <span className="font-medium text-orange-500">{pendingOfflineCount}</span>
                </div>
              )}
              {lastSyncedAt && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last synced</span>
                  <span className="font-medium">
                    {lastSyncedAt.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
              )}
            </div>

            {/* Retry Sync Button */}
            {pendingOfflineCount > 0 && isOnline && !isSyncingOffline && (
              <div className="pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 text-orange-600 border-orange-200 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-800 dark:hover:bg-orange-950"
                  onClick={retrySyncOffline}
                >
                  <Upload className="h-4 w-4" />
                  Retry Sync ({pendingOfflineCount} pending)
                </Button>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={handleRefresh}
                disabled={syncState === 'syncing' || syncState === 'offline'}
              >
                <RefreshCw className={cn("h-4 w-4", syncState === 'syncing' && "animate-spin")} />
                {syncState === 'offline' ? 'Unavailable offline' : syncState === 'syncing' ? 'Syncing...' : 'Refresh Data'}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Default variant - full display
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-lg border transition-colors duration-300",
      config.bgColor,
      config.borderColor,
      className
    )}>
      {/* Status Icon */}
      <div className={cn(
        "p-2 rounded-lg transition-colors duration-300",
        config.bgColor
      )}>
        <span className={config.color}>{config.icon}</span>
      </div>

      {/* Status Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn("font-medium text-sm transition-colors duration-300", config.color)}>
            {config.label}
          </span>
          <span className="text-xs text-muted-foreground">
            • {isOnline ? 'Server' : 'Local'}
          </span>
          {pendingOfflineCount > 0 && (
            <span className="text-xs text-orange-500 font-medium">
              ({pendingOfflineCount} queued)
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {config.description}
        </p>
      </div>

      {/* Sync Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={handleRefresh}
              disabled={syncState === 'syncing' || syncState === 'offline'}
            >
              <RefreshCw className={cn(
                "h-4 w-4",
                syncState === 'syncing' && "animate-spin"
              )} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{syncState === 'offline' ? 'Unavailable offline' : syncState === 'syncing' ? 'Syncing...' : 'Refresh now'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

/**
 * Compact sync indicator for use in tight spaces
 */
export function SyncDot({ className }: { className?: string }) {
  return <SyncStatusIndicator variant="minimal" className={className} />;
}

/**
 * Header sync indicator with dropdown details
 */
export function HeaderSyncIndicator({ className }: { className?: string }) {
  return <SyncStatusIndicator variant="header" className={className} />;
}
