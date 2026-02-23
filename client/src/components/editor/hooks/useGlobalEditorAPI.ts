/**
 * useGlobalEditorAPI — Exposes the Paragon Editor Mode API on `window.__paragonEditorModeAPI`.
 *
 * Extracted from MarkdownEditor.tsx to reduce component size.
 * Uses refs to avoid closure issues — the API always reads the latest values.
 */
import { useEffect } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UseGlobalEditorAPIDeps {
  editorModeRef: React.MutableRefObject<'wysiwyg' | 'markdown'>;
  rawMarkdownRef: React.MutableRefObject<string>;
  editorMode: 'wysiwyg' | 'markdown';
  handleModeSwitch: (mode: 'wysiwyg' | 'markdown') => void;
  setIsFindReplaceOpen: (open: boolean) => void;
  setFindReplaceFocusTrigger: React.Dispatch<React.SetStateAction<number>>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useGlobalEditorAPI({
  editorModeRef,
  rawMarkdownRef,
  editorMode,
  handleModeSwitch,
  setIsFindReplaceOpen,
  setFindReplaceFocusTrigger,
}: UseGlobalEditorAPIDeps) {
  // Mount/unmount: create and expose the API object
  useEffect(() => {
    const editorModeAPI = {
      /**
       * Get the current editor mode
       * @returns {'wysiwyg' | 'markdown'} The current mode
       */
      getMode: () => editorModeRef.current,

      /**
       * Set the editor mode
       * @param mode {'wysiwyg' | 'markdown'} The mode to switch to
       */
      setMode: (mode: 'wysiwyg' | 'markdown') => {
        if (mode !== 'wysiwyg' && mode !== 'markdown') {
          console.error('Invalid mode. Use "wysiwyg" or "markdown"');
          return;
        }
        handleModeSwitch(mode);
      },

      /**
       * Toggle between wysiwyg and markdown modes
       * @returns {'wysiwyg' | 'markdown'} The new mode after toggle
       */
      toggleMode: () => {
        const newMode = editorModeRef.current === 'wysiwyg' ? 'markdown' : 'wysiwyg';
        handleModeSwitch(newMode);
        return newMode;
      },

      /**
       * Switch to visual (WYSIWYG) mode
       */
      switchToVisual: () => {
        handleModeSwitch('wysiwyg');
      },

      /**
       * Switch to raw markdown mode
       */
      switchToMarkdown: () => {
        handleModeSwitch('markdown');
      },

      /**
       * Check if currently in visual mode
       * @returns {boolean}
       */
      isVisualMode: () => editorModeRef.current === 'wysiwyg',

      /**
       * Check if currently in markdown mode
       * @returns {boolean}
       */
      isMarkdownMode: () => editorModeRef.current === 'markdown',

      /**
       * Get the raw markdown content (only available in markdown mode)
       * @returns {string | null} The raw markdown or null if in visual mode
       */
      getRawMarkdown: () => editorModeRef.current === 'markdown' ? rawMarkdownRef.current : null,

      /**
       * Subscribe to mode changes
       * @param callback Function to call when mode changes
       * @returns Function to unsubscribe
       */
      onModeChange: (callback: (mode: 'wysiwyg' | 'markdown') => void) => {
        const handler = (event: Event) => {
          const customEvent = event as CustomEvent<{ mode: 'wysiwyg' | 'markdown' }>;
          callback(customEvent.detail.mode);
        };
        window.addEventListener('paragon-editor-mode-change', handler);
        return () => window.removeEventListener('paragon-editor-mode-change', handler);
      },
    };

    // Expose the API globally (only once on mount)
    (window as any).__paragonEditorModeAPI = editorModeAPI;

    console.log('Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI');
    console.log('Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)');

    return () => {
      // Cleanup on unmount
      delete (window as any).__paragonEditorModeAPI;
    };
  }, [handleModeSwitch]);

  // Dispatch event when mode changes (separate effect to avoid recreating the API)
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('paragon-editor-mode-change', { detail: { mode: editorMode } }));
  }, [editorMode]);
}
