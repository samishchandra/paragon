/**
 * KeyboardShortcutsDialog
 *
 * A modal overlay showing all available keyboard shortcuts, organized by category.
 * Triggered by pressing "?" when not typing in an input/editor.
 * Uses shadcn/ui Dialog for consistent styling.
 */

import { useEffect, useCallback, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Keyboard } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Detect Mac platform for modifier key display */
const isMac =
  typeof navigator !== 'undefined' &&
  navigator.platform.toUpperCase().indexOf('MAC') >= 0;

/** Format a key symbol for display */
function formatKey(key: string): string {
  if (key === 'Mod') return isMac ? '⌘' : 'Ctrl';
  if (key === 'Shift') return isMac ? '⇧' : 'Shift';
  if (key === 'Alt') return isMac ? '⌥' : 'Alt';
  if (key === 'Enter') return '↵';
  if (key === 'Escape') return 'Esc';
  if (key === 'ArrowUp') return '↑';
  if (key === 'ArrowDown') return '↓';
  return key;
}

interface ShortcutEntry {
  keys: string;
  description: string;
}

interface ShortcutCategory {
  title: string;
  shortcuts: ShortcutEntry[];
}

export const shortcutCategories: ShortcutCategory[] = [
  {
    title: 'General',
    shortcuts: [
      { keys: 'Mod+E', description: 'Open command palette' },
      { keys: 'Mod+T', description: 'New item' },
      { keys: 'Mod+N', description: 'New task' },
      { keys: 'Mod+Shift+N', description: 'New note' },
      { keys: 'Mod+S', description: 'Save' },
      { keys: 'Escape', description: 'Close dialog / Clear selection' },
      { keys: '?', description: 'Show keyboard shortcuts' },
    ],
  },
  {
    title: 'Navigation',
    shortcuts: [
      { keys: 'ArrowUp', description: 'Previous item' },
      { keys: 'ArrowDown', description: 'Next item' },
      { keys: 'Enter', description: 'Open selected item' },
      { keys: 'Mod+Shift+[', description: 'Previous tab' },
      { keys: 'Mod+Shift+]', description: 'Next tab' },
      { keys: 'Mod+W', description: 'Close active tab' },
      { keys: 'Mod+Shift+T', description: 'Reopen closed tab' },
    ],
  },
  {
    title: 'Editing',
    shortcuts: [
      { keys: 'Mod+Z', description: 'Undo' },
      { keys: 'Mod+Shift+Z', description: 'Redo' },
      { keys: 'Mod+B', description: 'Bold' },
      { keys: 'Mod+I', description: 'Italic' },
      { keys: 'Mod+U', description: 'Underline' },
      { keys: 'Mod+K', description: 'Insert link' },
      { keys: 'Mod+Shift+D', description: 'Insert date' },
    ],
  },
  {
    title: 'Editor Tools',
    shortcuts: [
      { keys: 'Mod+F', description: 'Find in note' },
      { keys: 'Mod+H', description: 'Find & replace' },
      { keys: '/', description: 'Slash commands (in editor)' },
    ],
  },
];

/** Render a single key badge */
export function KeyBadge({ children }: { children: string }) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5',
        'rounded-md border border-border/60',
        'bg-muted/50 text-muted-foreground',
        'text-xs font-mono font-medium',
        'shadow-[0_1px_0_1px_rgba(0,0,0,0.04)]'
      )}
    >
      {children}
    </kbd>
  );
}

/** Render a shortcut key combination */
export function ShortcutKeys({ keys }: { keys: string }) {
  // Split on + but keep multi-char keys together
  const parts = keys.split('+');
  return (
    <div className="flex items-center gap-0.5">
      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-0.5">
          {i > 0 && <span className="text-muted-foreground/40 text-xs mx-0.5">+</span>}
          <KeyBadge>{formatKey(part)}</KeyBadge>
        </span>
      ))}
    </div>
  );
}

interface KeyboardShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KeyboardShortcutsDialog({
  open,
  onOpenChange,
}: KeyboardShortcutsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] max-h-[80vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Keyboard className="w-5 h-5 text-primary" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Press <KeyBadge>?</KeyBadge> anytime to show this overlay
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          {shortcutCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                {category.title}
              </h3>
              <div className="space-y-0">
                {category.shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.keys}
                    className="flex items-center justify-between py-1.5 group"
                  >
                    <span className="text-sm text-foreground">
                      {shortcut.description}
                    </span>
                    <ShortcutKeys keys={shortcut.keys} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Hook to manage the keyboard shortcuts dialog state.
 * Opens on "?" key press when not typing in an input/editor.
 */
export function useKeyboardShortcutsDialog() {
  const [open, setOpen] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger when typing in inputs, textareas, or contenteditable
      const target = event.target as HTMLElement;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.closest('[contenteditable="true"]');

      if (isTyping) return;

      // Don't trigger with modifier keys
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key === '?') {
        event.preventDefault();
        setOpen(true);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { open, setOpen };
}
