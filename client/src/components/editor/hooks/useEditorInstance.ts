import { useEffect, useRef, useState } from 'react';
import { useEditor } from '@tiptap/react';
import type { Extensions } from '@tiptap/react';
import type { Editor } from '@tiptap/react';
import { useTurndownService } from './useTurndownService';

export interface UseEditorInstanceOptions {
  extensions: Extensions;
  content: string;
  editable: boolean;
  autofocus: boolean;
  spellCheck: boolean;
  initialMode: 'wysiwyg' | 'markdown';
  performanceMode: 'auto' | 'full' | 'lightweight';
  lightweightThreshold: number;

  // Callbacks
  onChange?: (html: string) => void;
  onHTMLChange?: (html: string) => void;
  onMarkdownChange?: (markdown: string) => void;
  onReady?: (editor: Editor) => void;
  onDestroy?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onSelectionChange?: (selection: { from: number; to: number; empty: boolean }) => void;
  onLinkClick?: (url: string, event: MouseEvent) => boolean | void;

  // Refs from parent for mode tracking
  editorModeRef: React.MutableRefObject<'wysiwyg' | 'markdown'>;
  rawMarkdownRef: React.MutableRefObject<string>;

  // State setters from parent
  setRawMarkdown: (markdown: string) => void;
  setIsLightweight: (value: boolean) => void;

  // Refs for lightweight mode
  lightweightCheckCounterRef: React.MutableRefObject<number>;
  isLightweightRef: React.MutableRefObject<boolean>;
}

export function useEditorInstance(options: UseEditorInstanceOptions) {
  const {
    extensions,
    content,
    editable,
    autofocus,
    spellCheck,
    initialMode,
    performanceMode,
    lightweightThreshold,
    onChange,
    onHTMLChange,
    onMarkdownChange,
    onReady,
    onDestroy: onDestroyProp,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    onSelectionChange,
    onLinkClick,
    editorModeRef,
    rawMarkdownRef,
    setRawMarkdown,
    setIsLightweight,
    lightweightCheckCounterRef,
    isLightweightRef,
  } = options;

  // Debounced onUpdate ref for HTML serialization performance
  const onUpdateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onChangeRef = useRef(onChange);
  const onHTMLChangeRef = useRef(onHTMLChange);
  const onMarkdownChangeRef = useRef(onMarkdownChange);
  // Ref for turndownService so onUpdate callback can access it (turndownService is created after useEditor)
  const turndownServiceRef = useRef<ReturnType<typeof useTurndownService> | null>(null);
  onChangeRef.current = onChange;
  onHTMLChangeRef.current = onHTMLChange;
  onMarkdownChangeRef.current = onMarkdownChange;

  const editor = useEditor({
    /**
     * Performance: Render immediately without waiting for next tick
     */
    immediatelyRender: false,
    /**
     * Performance: Prevent React re-renders on every ProseMirror transaction.
     * The editor DOM updates are handled by ProseMirror directly.
     * Only toolbar state and other React UI need selective re-renders via useEditorState.
     */
    shouldRerenderOnTransaction: false,
    // @ts-ignore - Expose editor globally for debugging
    onCreate: ({ editor }) => {
      (window as any).__tiptapEditor = editor;
      onReady?.(editor);
    },
    onDestroy: () => {
      onDestroyProp?.();
    },
    extensions,
    content,
    editable,
    autofocus,
    editorProps: {
      attributes: {
        class: 'tiptap-editor outline-none min-h-full',
        spellcheck: spellCheck ? 'true' : 'false',
      },
      handleClick: (view, pos, event) => {
        // Handle link clicks
        if (onLinkClick) {
          const target = event.target as HTMLElement;
          const link = target.closest('a');
          if (link) {
            const url = link.getAttribute('href');
            if (url) {
              const result = onLinkClick(url, event);
              if (result === false) {
                event.preventDefault();
                return true;
              }
            }
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      // === Auto lightweight mode detection ===
      if (performanceMode === 'auto') {
        lightweightCheckCounterRef.current++;
        if (lightweightCheckCounterRef.current >= 50) {
          lightweightCheckCounterRef.current = 0;
          const nodeCount = editor.state.doc.content.childCount;
          const shouldBeLightweight = nodeCount > lightweightThreshold;
          if (shouldBeLightweight !== isLightweightRef.current) {
            setIsLightweight(shouldBeLightweight);
          }
        }
      }

      // Performance: Debounce HTML serialization to avoid calling getHTML() on every keystroke
      if (onUpdateTimeoutRef.current) {
        clearTimeout(onUpdateTimeoutRef.current);
      }
      onUpdateTimeoutRef.current = setTimeout(() => {
        if (editor.isDestroyed) return;
        const html = editor.getHTML();
        if (onChangeRef.current || onHTMLChangeRef.current) {
          onChangeRef.current?.(html);
          onHTMLChangeRef.current?.(html);
        }
        // NOTE: Turndown conversion is intentionally NOT done here for performance.
        // Converting HTML→Markdown on every keystroke (even debounced at 150ms) is expensive
        // for large documents (two full document serializations per keystroke).
        // Instead, rawMarkdown is synced lazily: on blur, on mode-switch, and on unmount.
      }, 150);
    },
    onFocus: () => {
      onFocusProp?.();
    },
    onBlur: () => {
      // Flush any pending debounced onChange immediately on blur
      // This prevents data loss when user switches apps (especially on mobile)
      if (onUpdateTimeoutRef.current) {
        clearTimeout(onUpdateTimeoutRef.current);
        onUpdateTimeoutRef.current = null;
        if (editor && !editor.isDestroyed) {
          const html = editor.getHTML();
          if (onChangeRef.current || onHTMLChangeRef.current) {
            onChangeRef.current?.(html);
            onHTMLChangeRef.current?.(html);
          }
          // Flush rawMarkdown sync on blur too
          if (editorModeRef.current === 'wysiwyg' && turndownServiceRef.current) {
            const markdown = turndownServiceRef.current.turndown(html);
            rawMarkdownRef.current = markdown;
            onMarkdownChangeRef.current?.(markdown);
          }
        }
      }
      onBlurProp?.();
    },
    onSelectionUpdate: ({ editor }) => {
      if (onSelectionChange) {
        const { from, to, empty } = editor.state.selection;
        onSelectionChange({ from, to, empty });
      }
    },
  });

  // Cleanup debounced onUpdate timeout - flush pending changes on unmount
  // This ensures image resize and other pending changes are saved when navigating away
  useEffect(() => {
    return () => {
      if (onUpdateTimeoutRef.current) {
        clearTimeout(onUpdateTimeoutRef.current);
        onUpdateTimeoutRef.current = null;
        // Flush the pending onChange before unmount
        if (editor && !editor.isDestroyed) {
          const html = editor.getHTML();
          if (onChangeRef.current || onHTMLChangeRef.current) {
            onChangeRef.current?.(html);
            onHTMLChangeRef.current?.(html);
          }
          // Flush rawMarkdown sync on unmount too
          if (editorModeRef.current === 'wysiwyg' && turndownServiceRef.current) {
            const markdown = turndownServiceRef.current.turndown(html);
            rawMarkdownRef.current = markdown;
            onMarkdownChangeRef.current?.(markdown);
          }
        }
      }
    };
  }, []);

  // Create TurndownService for HTML to Markdown conversion (extracted to hook)
  const turndownService = useTurndownService();
  // Keep turndownServiceRef in sync so the onUpdate callback can access it
  turndownServiceRef.current = turndownService;

  // Initialize rawMarkdown from editor content when mounting in markdown mode.
  // Without this, rawMarkdown starts as '' (empty string) and the raw markdown
  // editor shows empty content when initialMode='markdown'. This effect runs
  // once after the editor and turndownService are both available, converting
  // the HTML content to markdown for the raw editor display.
  const rawMarkdownInitializedRef = useRef(false);
  useEffect(() => {
    if (
      !rawMarkdownInitializedRef.current &&
      initialMode === 'markdown' &&
      editor &&
      !editor.isDestroyed &&
      turndownService
    ) {
      const html = editor.getHTML();
      const markdown = turndownService.turndown(html);
      setRawMarkdown(markdown);
      rawMarkdownRef.current = markdown;
      rawMarkdownInitializedRef.current = true;
    }
  }, [editor, turndownService, initialMode]);

  return { editor, turndownService };
}
