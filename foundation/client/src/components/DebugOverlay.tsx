/**
 * DebugOverlay — Translucent overlay at bottom-right showing console errors,
 * warnings, network failures, and useful app diagnostics.
 *
 * Activated via Settings > Developer > Debug Mode toggle.
 * State persisted in localStorage under 'momentum-debug-mode'.
 */

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';
import {
  X,
  Trash2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  AlertCircle,
  Info,
  Wifi,
  WifiOff,
  Database,
  Clock,
  MemoryStick,
  Bug,
  Copy,
  Check,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type LogLevel = 'error' | 'warn' | 'info' | 'network' | 'unhandled';

interface LogEntry {
  id: number;
  level: LogLevel;
  message: string;
  timestamp: Date;
  stack?: string;
  source?: string;
}

// ─── Console Interceptor (singleton) ─────────────────────────────────────────

let _logEntries: LogEntry[] = [];
let _nextId = 1;
let _listeners: Set<() => void> = new Set();
let _installed = false;
const MAX_ENTRIES = 200;

function addEntry(level: LogLevel, message: string, stack?: string, source?: string) {
  _logEntries = [
    ..._logEntries.slice(-(MAX_ENTRIES - 1)),
    { id: _nextId++, level, message, timestamp: new Date(), stack, source },
  ];
  _listeners.forEach((fn) => fn());
}

function installInterceptors() {
  if (_installed) return;
  _installed = true;

  // Intercept console.error
  const origError = console.error;
  console.error = (...args: any[]) => {
    origError.apply(console, args);
    const msg = args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' ');
    // Skip React internal warnings about setState
    if (msg.includes('Cannot update a component')) return;
    addEntry('error', msg);
  };

  // Intercept console.warn
  const origWarn = console.warn;
  console.warn = (...args: any[]) => {
    origWarn.apply(console, args);
    const msg = args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' ');
    addEntry('warn', msg);
  };

  // Unhandled promise rejections
  window.addEventListener('unhandledrejection', (e) => {
    const msg = e.reason instanceof Error ? e.reason.message : String(e.reason);
    const stack = e.reason instanceof Error ? e.reason.stack : undefined;
    addEntry('unhandled', `Unhandled Promise: ${msg}`, stack);
  });

  // Global errors
  window.addEventListener('error', (e) => {
    addEntry('unhandled', `${e.message}`, undefined, `${e.filename}:${e.lineno}:${e.colno}`);
  });

  // Intercept fetch for network errors
  const origFetch = window.fetch;
  window.fetch = async (...args: Parameters<typeof fetch>) => {
    const url = typeof args[0] === 'string' ? args[0] : args[0] instanceof Request ? args[0].url : String(args[0]);
    const shortUrl = url.length > 80 ? url.slice(0, 77) + '...' : url;
    try {
      const res = await origFetch.apply(window, args);
      if (!res.ok) {
        addEntry('network', `HTTP ${res.status} ${res.statusText} — ${shortUrl}`);
      }
      return res;
    } catch (err: any) {
      addEntry('network', `Fetch failed: ${err.message} — ${shortUrl}`);
      throw err;
    }
  };
}

function clearEntries() {
  _logEntries = [];
  _listeners.forEach((fn) => fn());
}

function useLogEntries(): LogEntry[] {
  const [, setTick] = useState(0);
  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    _listeners.add(listener);
    return () => { _listeners.delete(listener); };
  }, []);
  return _logEntries;
}

// ─── Debug Mode State (localStorage) ────────────────────────────────────────

const DEBUG_KEY = 'momentum-debug-mode';

export function getDebugMode(): boolean {
  try {
    return localStorage.getItem(DEBUG_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setDebugMode(enabled: boolean) {
  try {
    localStorage.setItem(DEBUG_KEY, String(enabled));
    window.dispatchEvent(new CustomEvent('debug-mode-change', { detail: enabled }));
  } catch {}
}

export function useDebugMode(): [boolean, (v: boolean) => void] {
  const [enabled, setEnabled] = useState(getDebugMode);
  useEffect(() => {
    const handler = (e: Event) => setEnabled((e as CustomEvent).detail);
    window.addEventListener('debug-mode-change', handler);
    return () => window.removeEventListener('debug-mode-change', handler);
  }, []);
  return [enabled, setDebugMode];
}

// ─── Level Styling ──────────────────────────────────────────────────────────

const levelConfig: Record<LogLevel, { icon: typeof AlertCircle; color: string; bg: string; label: string }> = {
  error:     { icon: AlertCircle,    color: 'text-red-400',    bg: 'bg-red-500/10',    label: 'ERR' },
  warn:      { icon: AlertTriangle,  color: 'text-amber-400',  bg: 'bg-amber-500/10',  label: 'WRN' },
  info:      { icon: Info,           color: 'text-blue-400',   bg: 'bg-blue-500/10',   label: 'INF' },
  network:   { icon: WifiOff,        color: 'text-orange-400', bg: 'bg-orange-500/10', label: 'NET' },
  unhandled: { icon: Bug,            color: 'text-rose-400',   bg: 'bg-rose-500/10',   label: 'UNH' },
};

// ─── Overlay Component ──────────────────────────────────────────────────────

function DebugOverlayInner() {
  const entries = useLogEntries();
  const [collapsed, setCollapsed] = useState(false);
  const [filter, setFilter] = useState<LogLevel | 'all'>('all');
  const [copied, setCopied] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new entries
  useEffect(() => {
    if (!collapsed && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries.length, collapsed]);

  const filtered = filter === 'all' ? entries : entries.filter((e) => e.level === filter);

  const counts = {
    error: entries.filter((e) => e.level === 'error').length,
    warn: entries.filter((e) => e.level === 'warn').length,
    network: entries.filter((e) => e.level === 'network').length,
    unhandled: entries.filter((e) => e.level === 'unhandled').length,
  };

  const handleCopyAll = useCallback(() => {
    const text = filtered
      .map((e) => `[${e.timestamp.toISOString()}] [${e.level.toUpperCase()}] ${e.message}${e.stack ? '\n' + e.stack : ''}`)
      .join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [filtered]);

  const formatTime = (d: Date) => d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // Diagnostics
  const [diagnostics, setDiagnostics] = useState({ memory: '', online: true, itemCount: 0, tagCount: 0, listCount: 0 });
  useEffect(() => {
    const update = () => {
      const perf = (performance as any).memory;
      const memMB = perf ? `${(perf.usedJSHeapSize / 1048576).toFixed(1)} MB` : 'N/A';
      // Read counts from DOM data attributes set by the provider
      const el = document.querySelector('[data-debug-counts]');
      const items = el?.getAttribute('data-items') || '0';
      const tags = el?.getAttribute('data-tags') || '0';
      const lists = el?.getAttribute('data-lists') || '0';
      setDiagnostics({
        memory: memMB,
        online: navigator.onLine,
        itemCount: parseInt(items, 10),
        tagCount: parseInt(tags, 10),
        listCount: parseInt(lists, 10),
      });
    };
    update();
    const interval = setInterval(update, 3000);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      clearInterval(interval);
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed z-[9999] transition-all duration-200 ease-out',
        // Position: bottom-right, above bottom tab bar on mobile
        'bottom-2 right-2 md:bottom-4 md:right-4',
        // On mobile, offset above the tab bar
        'max-[767px]:bottom-[calc(4rem+env(safe-area-inset-bottom,0px))]',
        collapsed ? 'w-auto' : 'w-[min(420px,calc(100vw-1rem))]',
      )}
    >
      <div
        className={cn(
          'rounded-lg border shadow-2xl backdrop-blur-xl',
          'bg-black/80 border-white/10 text-white/90',
          'font-mono text-[11px] leading-relaxed',
        )}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2 px-3 py-2 cursor-pointer select-none border-b border-white/10"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Bug className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-semibold text-emerald-400 text-xs tracking-wide">DEBUG</span>

          {/* Error/warn badges */}
          <div className="flex items-center gap-1.5 ml-1">
            {counts.error > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold">
                {counts.error} err
              </span>
            )}
            {counts.warn > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                {counts.warn} wrn
              </span>
            )}
            {counts.network > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[10px] font-bold">
                {counts.network} net
              </span>
            )}
          </div>

          <span className="flex-1" />

          {/* Online indicator */}
          <span className={cn('w-2 h-2 rounded-full', diagnostics.online ? 'bg-emerald-400' : 'bg-red-400')} />

          {collapsed ? (
            <ChevronUp className="w-3.5 h-3.5 text-white/50" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-white/50" />
          )}
        </div>

        {!collapsed && (
          <>
            {/* Diagnostics bar */}
            <div className="px-3 py-1.5 flex flex-wrap gap-x-3 gap-y-1 border-b border-white/5 text-[10px] text-white/50">
              <span className="flex items-center gap-1">
                <MemoryStick className="w-3 h-3" /> {diagnostics.memory}
              </span>
              <span className="flex items-center gap-1">
                {diagnostics.online ? <Wifi className="w-3 h-3 text-emerald-400" /> : <WifiOff className="w-3 h-3 text-red-400" />}
                {diagnostics.online ? 'Online' : 'Offline'}
              </span>
              <span className="flex items-center gap-1">
                <Database className="w-3 h-3" /> {diagnostics.itemCount} items · {diagnostics.tagCount} tags · {diagnostics.listCount} lists
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {new Date().toLocaleTimeString('en-US', { hour12: false })}
              </span>
            </div>

            {/* Filter tabs */}
            <div className="px-3 py-1.5 flex items-center gap-1 border-b border-white/5">
              {(['all', 'error', 'warn', 'network', 'unhandled', 'info'] as const).map((level) => (
                <button
                  key={level}
                  onClick={(e) => { e.stopPropagation(); setFilter(level); }}
                  className={cn(
                    'px-2 py-0.5 rounded text-[10px] font-medium transition-colors',
                    filter === level
                      ? 'bg-white/15 text-white'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/5',
                  )}
                >
                  {level === 'all' ? `All (${entries.length})` : `${level} (${entries.filter((e) => e.level === level).length})`}
                </button>
              ))}

              <span className="flex-1" />
              <button
                onClick={(e) => { e.stopPropagation(); handleCopyAll(); }}
                className="p-1 rounded hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors"
                title="Copy all logs"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); clearEntries(); }}
                className="p-1 rounded hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors"
                title="Clear logs"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>

            {/* Log entries */}
            <div
              ref={scrollRef}
              className="max-h-[240px] overflow-y-auto overscroll-contain"
            >
              {filtered.length === 0 ? (
                <div className="px-3 py-6 text-center text-white/30 text-xs">
                  No logs captured yet
                </div>
              ) : (
                filtered.map((entry) => {
                  const cfg = levelConfig[entry.level];
                  const Icon = cfg.icon;
                  const isExpanded = expandedId === entry.id;
                  return (
                    <div
                      key={entry.id}
                      className={cn(
                        'px-3 py-1.5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer',
                        cfg.bg,
                      )}
                      onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                    >
                      <div className="flex items-start gap-2">
                        <Icon className={cn('w-3 h-3 mt-0.5 shrink-0', cfg.color)} />
                        <span className="text-white/40 shrink-0">{formatTime(entry.timestamp)}</span>
                        <span className={cn('flex-1 break-all', isExpanded ? '' : 'line-clamp-2')}>
                          {entry.message}
                        </span>
                      </div>
                      {isExpanded && entry.stack && (
                        <pre className="mt-1 ml-5 text-[9px] text-white/30 whitespace-pre-wrap break-all max-h-[120px] overflow-y-auto">
                          {entry.stack}
                        </pre>
                      )}
                      {isExpanded && entry.source && (
                        <div className="mt-1 ml-5 text-[9px] text-white/30">
                          Source: {entry.source}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer: UA + viewport */}
            <div className="px-3 py-1.5 border-t border-white/5 text-[9px] text-white/30 space-y-0.5">
              <div className="truncate">UA: {navigator.userAgent.slice(0, 100)}</div>
              <div>Viewport: {window.innerWidth}x{window.innerHeight} · DPR: {window.devicePixelRatio} · {new Date().toLocaleDateString()}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * DebugOverlay — renders only when debug mode is enabled.
 * Mount this once at the app root level.
 */
export const DebugOverlay = memo(function DebugOverlay() {
  const [enabled] = useDebugMode();

  useEffect(() => {
    if (enabled) {
      installInterceptors();
    }
  }, [enabled]);

  if (!enabled) return null;
  return <DebugOverlayInner />;
});

/**
 * DebugCountsProvider — invisible element that exposes item/tag/list counts
 * as data attributes for the debug overlay to read without coupling to context.
 */
export function DebugCountsProvider({ items, tags, lists }: { items: number; tags: number; lists: number }) {
  return (
    <div
      data-debug-counts
      data-items={items}
      data-tags={tags}
      data-lists={lists}
      className="hidden"
    />
  );
}
