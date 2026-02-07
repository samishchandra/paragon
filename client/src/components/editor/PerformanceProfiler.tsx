import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Activity, X, Minimize2, Maximize2 } from 'lucide-react';

/*
 * PERFORMANCE PROFILER OVERLAY
 * Dev-mode tool for monitoring editor performance in real-time.
 * Shows: FPS, frame times, render counts, memory usage, and transaction stats.
 * Toggle with Ctrl+Shift+P or the floating button.
 * Designed to be non-intrusive and draggable.
 */

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  frameTimeMax: number;
  memoryUsed: number;
  memoryTotal: number;
  renderCount: number;
  transactionCount: number;
  lastTransactionTime: number;
  domNodes: number;
  longFrames: number; // frames > 16.67ms
}

interface FrameTimeSample {
  time: number;
  duration: number;
}

// Global render counter that components can increment
let globalRenderCount = 0;
let globalTransactionCount = 0;
let globalLastTransactionTime = 0;

export function incrementRenderCount() {
  globalRenderCount++;
}

export function recordTransaction(duration: number) {
  globalTransactionCount++;
  globalLastTransactionTime = duration;
}

export const PerformanceProfiler = memo(function PerformanceProfiler({
  enabled = false,
  editor,
}: {
  enabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editor?: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    frameTime: 0,
    frameTimeMax: 0,
    memoryUsed: 0,
    memoryTotal: 0,
    renderCount: 0,
    transactionCount: 0,
    lastTransactionTime: 0,
    domNodes: 0,
    longFrames: 0,
  });
  
  const frameTimesRef = useRef<FrameTimeSample[]>([]);
  const lastFrameTimeRef = useRef(performance.now());
  const rafIdRef = useRef<number>(0);
  const longFrameCountRef = useRef(0);
  const renderCountSnapshotRef = useRef(0);
  const transactionCountSnapshotRef = useRef(0);
  
  // FPS graph data (last 60 samples)
  const [fpsHistory, setFpsHistory] = useState<number[]>(new Array(60).fill(0));
  const [frameTimeHistory, setFrameTimeHistory] = useState<number[]>(new Array(60).fill(0));
  
  // Keyboard shortcut: Ctrl+Shift+P
  useEffect(() => {
    if (!enabled) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);
  
  // Track editor transactions
  useEffect(() => {
    if (!enabled || !editor || !isOpen) return;
    
    const handleTransaction = () => {
      const start = performance.now();
      // Measure time after microtask (after ProseMirror applies the transaction)
      queueMicrotask(() => {
        const duration = performance.now() - start;
        recordTransaction(duration);
      });
    };
    
    editor.on('transaction', handleTransaction);
    return () => {
      editor.off('transaction', handleTransaction);
    };
  }, [enabled, editor, isOpen]);
  
  // Main measurement loop
  useEffect(() => {
    if (!enabled || !isOpen) return;
    
    let frameCount = 0;
    let lastSecond = performance.now();
    let currentFps = 0;
    
    const measure = (now: number) => {
      const delta = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;
      
      // Track frame times
      frameTimesRef.current.push({ time: now, duration: delta });
      // Keep only last 120 samples
      if (frameTimesRef.current.length > 120) {
        frameTimesRef.current = frameTimesRef.current.slice(-120);
      }
      
      // Count long frames (> 16.67ms = below 60fps)
      if (delta > 16.67) {
        longFrameCountRef.current++;
      }
      
      frameCount++;
      
      // Update metrics every second
      if (now - lastSecond >= 1000) {
        currentFps = frameCount;
        frameCount = 0;
        lastSecond = now;
        
        // Calculate frame time stats
        const recentFrames = frameTimesRef.current.slice(-60);
        const avgFrameTime = recentFrames.length > 0
          ? recentFrames.reduce((sum, f) => sum + f.duration, 0) / recentFrames.length
          : 0;
        const maxFrameTime = recentFrames.length > 0
          ? Math.max(...recentFrames.map(f => f.duration))
          : 0;
        
        // Memory info (Chrome only)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const memInfo = (performance as any).memory;
        const memUsed = memInfo ? memInfo.usedJSHeapSize / (1024 * 1024) : 0;
        const memTotal = memInfo ? memInfo.jsHeapSizeLimit / (1024 * 1024) : 0;
        
        // DOM node count
        const domNodes = document.querySelectorAll('*').length;
        
        // Render and transaction counts (delta since last snapshot)
        const renderDelta = globalRenderCount - renderCountSnapshotRef.current;
        const transactionDelta = globalTransactionCount - transactionCountSnapshotRef.current;
        renderCountSnapshotRef.current = globalRenderCount;
        transactionCountSnapshotRef.current = globalTransactionCount;
        
        setMetrics({
          fps: currentFps,
          frameTime: Math.round(avgFrameTime * 100) / 100,
          frameTimeMax: Math.round(maxFrameTime * 100) / 100,
          memoryUsed: Math.round(memUsed * 10) / 10,
          memoryTotal: Math.round(memTotal),
          renderCount: renderDelta,
          transactionCount: transactionDelta,
          lastTransactionTime: Math.round(globalLastTransactionTime * 100) / 100,
          domNodes,
          longFrames: longFrameCountRef.current,
        });
        
        // Update history graphs
        setFpsHistory(prev => [...prev.slice(1), currentFps]);
        setFrameTimeHistory(prev => [...prev.slice(1), avgFrameTime]);
        
        // Reset long frame counter each second
        longFrameCountRef.current = 0;
      }
      
      rafIdRef.current = requestAnimationFrame(measure);
    };
    
    rafIdRef.current = requestAnimationFrame(measure);
    
    return () => {
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [enabled, isOpen]);
  
  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  const toggleMinimize = useCallback(() => {
    setIsMinimized(prev => !prev);
  }, []);
  
  if (!enabled) return null;
  
  // Floating toggle button
  if (!isOpen) {
    return (
      <button
        onClick={toggleOpen}
        className="perf-profiler-toggle"
        title="Performance Profiler (Ctrl+Shift+P)"
      >
        <Activity size={16} />
      </button>
    );
  }
  
  // Get color based on FPS
  const getFpsColor = (fps: number) => {
    if (fps >= 55) return '#4ade80'; // green
    if (fps >= 30) return '#fbbf24'; // yellow
    return '#f87171'; // red
  };
  
  const getFrameTimeColor = (ms: number) => {
    if (ms <= 16.67) return '#4ade80';
    if (ms <= 33.33) return '#fbbf24';
    return '#f87171';
  };
  
  // Mini sparkline SVG for FPS history
  const renderSparkline = (data: number[], maxVal: number, color: string) => {
    const width = 120;
    const height = 24;
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (Math.min(val, maxVal) / maxVal) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={width} height={height} className="perf-sparkline">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  
  return (
    <div className="perf-profiler-overlay">
      {/* Header */}
      <div className="perf-profiler-header">
        <div className="perf-profiler-title">
          <Activity size={14} />
          <span>Performance</span>
        </div>
        <div className="perf-profiler-actions">
          <button onClick={toggleMinimize} title={isMinimized ? 'Expand' : 'Minimize'}>
            {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
          </button>
          <button onClick={toggleOpen} title="Close (Ctrl+Shift+P)">
            <X size={12} />
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <div className="perf-profiler-body">
          {/* FPS Section */}
          <div className="perf-section">
            <div className="perf-row">
              <span className="perf-label">FPS</span>
              <span className="perf-value" style={{ color: getFpsColor(metrics.fps) }}>
                {metrics.fps}
              </span>
            </div>
            {renderSparkline(fpsHistory, 70, getFpsColor(metrics.fps))}
          </div>
          
          {/* Frame Time Section */}
          <div className="perf-section">
            <div className="perf-row">
              <span className="perf-label">Frame Time</span>
              <span className="perf-value" style={{ color: getFrameTimeColor(metrics.frameTime) }}>
                {metrics.frameTime}ms
              </span>
            </div>
            <div className="perf-row perf-row-sub">
              <span className="perf-label-sub">Max</span>
              <span className="perf-value-sub" style={{ color: getFrameTimeColor(metrics.frameTimeMax) }}>
                {metrics.frameTimeMax}ms
              </span>
            </div>
            <div className="perf-row perf-row-sub">
              <span className="perf-label-sub">Jank ({'>'} 16.7ms)</span>
              <span className="perf-value-sub" style={{ color: metrics.longFrames > 3 ? '#f87171' : '#4ade80' }}>
                {metrics.longFrames}/s
              </span>
            </div>
            {renderSparkline(frameTimeHistory, 50, getFrameTimeColor(metrics.frameTime))}
          </div>
          
          {/* Editor Stats */}
          <div className="perf-section">
            <div className="perf-row">
              <span className="perf-label">Renders/s</span>
              <span className="perf-value">{metrics.renderCount}</span>
            </div>
            <div className="perf-row">
              <span className="perf-label">Transactions/s</span>
              <span className="perf-value">{metrics.transactionCount}</span>
            </div>
            <div className="perf-row perf-row-sub">
              <span className="perf-label-sub">Last TX time</span>
              <span className="perf-value-sub">{metrics.lastTransactionTime}ms</span>
            </div>
          </div>
          
          {/* System Stats */}
          <div className="perf-section">
            <div className="perf-row">
              <span className="perf-label">DOM Nodes</span>
              <span className="perf-value">{metrics.domNodes.toLocaleString()}</span>
            </div>
            {metrics.memoryTotal > 0 && (
              <div className="perf-row">
                <span className="perf-label">Memory</span>
                <span className="perf-value">{metrics.memoryUsed}MB / {metrics.memoryTotal}MB</span>
              </div>
            )}
          </div>
          
          {/* Keyboard shortcut hint */}
          <div className="perf-hint">
            <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> to toggle
          </div>
        </div>
      )}
    </div>
  );
});

export default PerformanceProfiler;
