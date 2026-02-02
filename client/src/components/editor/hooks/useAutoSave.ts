import { useCallback, useEffect, useRef, useState } from 'react';
import { Editor } from '@tiptap/react';

/*
 * useAutoSave Hook
 * Automatically saves editor content to localStorage with debouncing
 * Provides recovery on page load and visual save status indicators
 */

export interface AutoSaveOptions {
  /** Unique key for localStorage (default: 'manus-editor-content') */
  storageKey?: string;
  /** Debounce delay in milliseconds (default: 1000) */
  debounceMs?: number;
  /** Whether auto-save is enabled (default: true) */
  enabled?: boolean;
  /** Callback when content is saved */
  onSave?: (content: string) => void;
  /** Callback when content is recovered */
  onRecover?: (content: string) => void;
}

export interface AutoSaveState {
  /** Current save status */
  status: 'idle' | 'saving' | 'saved' | 'error';
  /** Last save timestamp */
  lastSaved: Date | null;
  /** Whether there's recoverable content */
  hasRecoverableContent: boolean;
  /** Error message if save failed */
  error: string | null;
}

export interface AutoSaveReturn extends AutoSaveState {
  /** Manually trigger a save */
  save: () => void;
  /** Clear saved content from localStorage */
  clear: () => void;
  /** Recover content from localStorage */
  recover: () => string | null;
  /** Dismiss recovery prompt */
  dismissRecovery: () => void;
}

const RECOVERY_DISMISSED_KEY_SUFFIX = '-dismissed';

export function useAutoSave(
  editor: Editor | null,
  options: AutoSaveOptions = {}
): AutoSaveReturn {
  const {
    storageKey = 'manus-editor-content',
    debounceMs = 1000,
    enabled = true,
    onSave,
    onRecover,
  } = options;

  const [state, setState] = useState<AutoSaveState>({
    status: 'idle',
    lastSaved: null,
    hasRecoverableContent: false,
    error: null,
  });

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastContentRef = useRef<string>('');

  // Check for recoverable content on mount
  useEffect(() => {
    if (!enabled) return;
    // Skip on initial render when editor is not ready
    if (!editor || editor.isDestroyed) return;

    try {
      const savedContent = localStorage.getItem(storageKey);
      const dismissed = localStorage.getItem(storageKey + RECOVERY_DISMISSED_KEY_SUFFIX);
      
      if (savedContent && !dismissed) {
        // Check if saved content is different from current
        let currentContent = '';
        try {
          currentContent = editor.getHTML() || '';
        } catch {
          // Editor might not be ready yet
          return;
        }
        if (savedContent !== currentContent && savedContent.length > 50) {
          setState(prev => ({ ...prev, hasRecoverableContent: true }));
        }
      }
    } catch (error) {
      console.warn('useAutoSave: Error checking for recoverable content', error);
    }
  }, [editor, storageKey, enabled]);

  // Save content to localStorage
  const saveContent = useCallback(() => {
    if (!editor || !enabled || editor.isDestroyed) return;

    try {
      const content = editor.getHTML();
      
      // Don't save if content hasn't changed
      if (content === lastContentRef.current) {
        setState(prev => ({ ...prev, status: 'saved' }));
        return;
      }

      // Don't save empty or minimal content
      if (content.length < 20) {
        return;
      }

      setState(prev => ({ ...prev, status: 'saving' }));

      localStorage.setItem(storageKey, content);
      localStorage.setItem(storageKey + '-timestamp', new Date().toISOString());
      
      lastContentRef.current = content;
      
      setState(prev => ({
        ...prev,
        status: 'saved',
        lastSaved: new Date(),
        error: null,
      }));

      onSave?.(content);

      // Reset to idle after a short delay
      setTimeout(() => {
        setState(prev => prev.status === 'saved' ? { ...prev, status: 'idle' } : prev);
      }, 2000);

    } catch (error) {
      console.error('useAutoSave: Error saving content', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to save',
      }));
    }
  }, [editor, storageKey, enabled, onSave]);

  // Debounced save on content change
  useEffect(() => {
    if (!editor || !enabled || editor.isDestroyed) return;

    const handleUpdate = () => {
      // Skip if editor is destroyed
      if (editor.isDestroyed) return;
      // Clear existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Set new timeout for debounced save
      saveTimeoutRef.current = setTimeout(() => {
        saveContent();
      }, debounceMs);
    };

    editor.on('update', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [editor, debounceMs, enabled, saveContent]);

  // Save on page unload
  useEffect(() => {
    if (!editor || !enabled || editor.isDestroyed) return;

    const handleBeforeUnload = () => {
      // Immediate save without debounce
      if (editor.isDestroyed) return;
      try {
        const content = editor.getHTML();
        if (content.length >= 20) {
          localStorage.setItem(storageKey, content);
          localStorage.setItem(storageKey + '-timestamp', new Date().toISOString());
        }
      } catch (error) {
        console.warn('useAutoSave: Error saving on unload', error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [editor, storageKey, enabled]);

  // Manual save function
  const save = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveContent();
  }, [saveContent]);

  // Clear saved content
  const clear = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(storageKey + '-timestamp');
      localStorage.removeItem(storageKey + RECOVERY_DISMISSED_KEY_SUFFIX);
      lastContentRef.current = '';
      setState({
        status: 'idle',
        lastSaved: null,
        hasRecoverableContent: false,
        error: null,
      });
    } catch (error) {
      console.warn('useAutoSave: Error clearing content', error);
    }
  }, [storageKey]);

  // Recover content from localStorage
  const recover = useCallback((): string | null => {
    if (!editor || editor.isDestroyed) return null;
    try {
      const content = localStorage.getItem(storageKey);
      if (content && editor && !editor.isDestroyed) {
        editor.commands.setContent(content);
        lastContentRef.current = content;
        setState(prev => ({ ...prev, hasRecoverableContent: false }));
        localStorage.removeItem(storageKey + RECOVERY_DISMISSED_KEY_SUFFIX);
        onRecover?.(content);
        return content;
      }
      return null;
    } catch (error) {
      console.warn('useAutoSave: Error recovering content', error);
      return null;
    }
  }, [editor, storageKey, onRecover]);

  // Dismiss recovery prompt
  const dismissRecovery = useCallback(() => {
    try {
      localStorage.setItem(storageKey + RECOVERY_DISMISSED_KEY_SUFFIX, 'true');
      setState(prev => ({ ...prev, hasRecoverableContent: false }));
    } catch (error) {
      console.warn('useAutoSave: Error dismissing recovery', error);
    }
  }, [storageKey]);

  return {
    ...state,
    save,
    clear,
    recover,
    dismissRecovery,
  };
}

export default useAutoSave;
