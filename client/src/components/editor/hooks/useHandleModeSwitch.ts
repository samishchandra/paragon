/**
 * useHandleModeSwitch — Manages switching between WYSIWYG and raw markdown modes.
 *
 * Extracted from MarkdownEditor.tsx to reduce component size.
 * Handles HTML→Markdown (via turndown) and Markdown→HTML (via marked + pipeline)
 * conversions, plus state updates for mode, raw markdown, and the mode-change callback.
 */
import { useCallback } from 'react';
import type { Editor } from '@tiptap/core';
import { markdownToHtml, type PreprocessOptions } from '../utils';
import { parseDateFromMarkdown, getDateVariant } from '../extensions/DatePill';
import { isValidTag, normalizeTag } from '../extensions/TagPill';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Accepts any object with a turndown() method (TurndownService or LazyTurndownService). */
export interface TurndownLike {
  turndown(html: string): string;
}

export interface UseHandleModeSwitchDeps {
  editor: Editor | null;
  turndownService: TurndownLike;
  editorModeRef: React.MutableRefObject<'wysiwyg' | 'markdown'>;
  rawMarkdownRef: React.MutableRefObject<string>;
  setEditorMode: React.Dispatch<React.SetStateAction<'wysiwyg' | 'markdown'>>;
  setRawMarkdown: React.Dispatch<React.SetStateAction<string>>;
  onModeChange?: (mode: 'wysiwyg' | 'markdown') => void;
  enableTagAutoDetect: boolean;
  disabledFeatures: Record<string, boolean | undefined>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useHandleModeSwitch({
  editor,
  turndownService,
  editorModeRef,
  rawMarkdownRef,
  setEditorMode,
  setRawMarkdown,
  onModeChange,
  enableTagAutoDetect,
  disabledFeatures,
}: UseHandleModeSwitchDeps) {
  const handleModeSwitch = useCallback(async (newMode: 'wysiwyg' | 'markdown') => {
    if (!editor) return;

    if (newMode === 'markdown' && editorModeRef.current === 'wysiwyg') {
      // Convert HTML to Markdown
      const html = editor.getHTML();
      const markdown = turndownService.turndown(html);
      setRawMarkdown(markdown);
      rawMarkdownRef.current = markdown;
    } else if (newMode === 'wysiwyg' && editorModeRef.current === 'markdown') {
      // Convert Markdown back to HTML and set in editor using marked
      // Use queueMicrotask to avoid flushSync error when ReactNodeViewRenderer is used
      // This defers the setContent call to after React's render cycle completes

      // Lazy-load marked (only needed for markdown→WYSIWYG conversion)
      const { marked } = await import('marked');
      const markedParse = (src: string) => marked.parse(src, { async: false, breaks: true }) as string;

      const pipelineOptions: PreprocessOptions = {
        enableTagAutoDetect,
        disableTagPills: !!disabledFeatures.tagPills,
        isValidTag,
        normalizeTag,
        parseDateFromMarkdown,
        getDateVariant,
      };

      const html = markdownToHtml(rawMarkdownRef.current, markedParse, pipelineOptions);

      queueMicrotask(() => {
        if (!editor.isDestroyed) {
          editor.commands.setContent(html);
        }
      });
    }

    setEditorMode(newMode);
    editorModeRef.current = newMode;
    onModeChange?.(newMode);
  }, [editor, turndownService, onModeChange]);

  return handleModeSwitch;
}
