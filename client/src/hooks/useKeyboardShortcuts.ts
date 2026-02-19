/**
 * Keyboard Shortcuts Hook
 * 
 * Provides global keyboard shortcuts for power users:
 * - ⌘/Ctrl + N: Create new task
 * - ⌘/Ctrl + T: Create new item (task if enabled, otherwise note)
 * - ⌘/Ctrl + Shift + N: Create new note
 * - ⌘/Ctrl + S: Save/Refresh
 * - Escape: Close modals/clear selection
 */

import { useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface KeyboardShortcutsOptions {
  onNewTask?: () => void;
  onNewNote?: () => void;
  onSearch?: () => void;
  onEscape?: () => void;
  onUndo?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onEnter?: () => void;
  onSave?: () => void;
  enabled?: boolean;
}

export function useKeyboardShortcuts({
  onNewTask,
  onNewNote,
  onSearch,
  onEscape,
  onUndo,
  onArrowUp,
  onArrowDown,
  onEnter,
  onSave,
  enabled = true,
}: KeyboardShortcutsOptions = {}) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    // Check if user is typing in an input field
    const target = event.target as HTMLElement;
    const isTyping = 
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' || 
      target.isContentEditable ||
      target.closest('[contenteditable="true"]');

    // Get modifier key (Cmd on Mac, Ctrl on Windows/Linux)
    const isMod = event.metaKey || event.ctrlKey;

    // ⌘/Ctrl + N: New task (without Shift)
    if (isMod && event.key.toLowerCase() === 'n' && !event.shiftKey) {
      // Only prevent default if we have a handler and not typing
      if (onNewTask && !isTyping) {
        event.preventDefault();
        onNewTask();
        toast.success('New task', { description: 'Creating a new task...' });
      }
      return;
    }

    // ⌘/Ctrl + T: New item (task if tasks enabled, otherwise note)
    if (isMod && event.key.toLowerCase() === 't' && !event.shiftKey) {
      if (!isTyping) {
        event.preventDefault();
        if (onNewTask) {
          onNewTask();
          toast.success('New task', { description: 'Creating a new task...' });
        } else if (onNewNote) {
          onNewNote();
          toast.success('New note', { description: 'Creating a new note...' });
        }
      }
      return;
    }

    // ⌘/Ctrl + Shift + N: New note
    if (isMod && event.key.toLowerCase() === 'n' && event.shiftKey) {
      if (onNewNote && !isTyping) {
        event.preventDefault();
        onNewNote();
        toast.success('New note', { description: 'Creating a new note...' });
      }
      return;
    }

    // ⌘/Ctrl + S: Save/Refresh
    if (isMod && event.key.toLowerCase() === 's') {
      event.preventDefault();
      if (onSave) {
        onSave();
        toast.info('Saved', { description: 'Your data is saved to the server.' });
      } else {
        toast.info('Auto-saved', { description: 'Data is automatically saved to the server.' });
      }
      return;
    }

    // Escape: Close/clear
    if (event.key === 'Escape') {
      if (onEscape && !isTyping) {
        onEscape();
      }
      return;
    }

    // ⌘/Ctrl + Z: Undo (only when not typing)
    if (isMod && event.key.toLowerCase() === 'z' && !event.shiftKey) {
      if (onUndo && !isTyping) {
        event.preventDefault();
        onUndo();
      }
      return;
    }

    // Arrow Up: Navigate to previous item (only when not typing)
    if (event.key === 'ArrowUp' && !isTyping && !isMod) {
      if (onArrowUp) {
        event.preventDefault();
        onArrowUp();
      }
      return;
    }

    // Arrow Down: Navigate to next item (only when not typing)
    if (event.key === 'ArrowDown' && !isTyping && !isMod) {
      if (onArrowDown) {
        event.preventDefault();
        onArrowDown();
      }
      return;
    }

    // Enter: Select/open current item (only when not typing)
    if (event.key === 'Enter' && !isTyping && !isMod) {
      if (onEnter) {
        event.preventDefault();
        onEnter();
      }
      return;
    }
  }, [enabled, onNewTask, onNewNote, onSearch, onEscape, onUndo, onArrowUp, onArrowDown, onEnter, onSave]);

  useEffect(() => {
    if (enabled) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [enabled, handleKeyDown]);
}

/**
 * Format a keyboard shortcut for display
 */
export function formatShortcut(shortcut: string): string {
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  
  return shortcut
    .replace('Mod', isMac ? '⌘' : 'Ctrl')
    .replace('Shift', isMac ? '⇧' : 'Shift')
    .replace('Alt', isMac ? '⌥' : 'Alt')
    .replace('Enter', '↵')
    .replace('Escape', 'Esc');
}

/**
 * List of all available shortcuts
 */
export const SHORTCUTS = [
  { keys: 'Mod+T', description: 'New item' },
  { keys: 'Mod+N', description: 'New task' },
  { keys: 'Mod+Shift+N', description: 'New note' },
  { keys: 'Mod+S', description: 'Save' },
  { keys: 'Mod+E', description: 'Command palette' },
  { keys: 'Mod+Z', description: 'Undo last delete' },
  { keys: '↑/↓', description: 'Navigate items' },
  { keys: 'Enter', description: 'Open selected item' },
  { keys: 'Escape', description: 'Close / Clear selection' },
] as const;
