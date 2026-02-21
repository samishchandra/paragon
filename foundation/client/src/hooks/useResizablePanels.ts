/**
 * useResizablePanels Hook
 * Manages draggable panel resizing for the 3-column layout
 * Persists panel widths to localStorage
 */

import { useState, useCallback, useEffect, useRef } from 'react';

const STORAGE_KEY = 'momentum-panel-widths';

interface PanelWidths {
  leftPanel: number;
  middlePanel: number;
}

const DEFAULT_WIDTHS: PanelWidths = {
  leftPanel: 280,
  middlePanel: 320,
};

const MIN_WIDTHS = {
  leftPanel: 200,
  middlePanel: 280,
  rightPanel: 300,
};

const MAX_WIDTHS = {
  leftPanel: 400,
  middlePanel: 500,
};

export function useResizablePanels() {
  const [panelWidths, setPanelWidths] = useState<PanelWidths>(DEFAULT_WIDTHS);
  const [isResizing, setIsResizing] = useState<'left' | 'middle' | null>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  // Load saved widths from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPanelWidths({
          leftPanel: Math.max(MIN_WIDTHS.leftPanel, Math.min(MAX_WIDTHS.leftPanel, parsed.leftPanel || DEFAULT_WIDTHS.leftPanel)),
          middlePanel: Math.max(MIN_WIDTHS.middlePanel, Math.min(MAX_WIDTHS.middlePanel, parsed.middlePanel || DEFAULT_WIDTHS.middlePanel)),
        });
      } catch (e) {
        console.error('Failed to load panel widths:', e);
      }
    }
  }, []);

  // Save widths to localStorage when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(panelWidths));
  }, [panelWidths]);

  const handleMouseDown = useCallback((panel: 'left' | 'middle', e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(panel);
    startXRef.current = e.clientX;
    startWidthRef.current = panel === 'left' ? panelWidths.leftPanel : panelWidths.middlePanel;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [panelWidths]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    const delta = e.clientX - startXRef.current;
    const newWidth = startWidthRef.current + delta;

    if (isResizing === 'left') {
      const clampedWidth = Math.max(MIN_WIDTHS.leftPanel, Math.min(MAX_WIDTHS.leftPanel, newWidth));
      setPanelWidths(prev => ({ ...prev, leftPanel: clampedWidth }));
    } else if (isResizing === 'middle') {
      const clampedWidth = Math.max(MIN_WIDTHS.middlePanel, Math.min(MAX_WIDTHS.middlePanel, newWidth));
      setPanelWidths(prev => ({ ...prev, middlePanel: clampedWidth }));
    }
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(null);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  // Add/remove global mouse event listeners
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const resetWidths = useCallback(() => {
    setPanelWidths(DEFAULT_WIDTHS);
  }, []);

  return {
    panelWidths,
    isResizing,
    handleMouseDown,
    resetWidths,
    MIN_WIDTHS,
    MAX_WIDTHS,
  };
}
