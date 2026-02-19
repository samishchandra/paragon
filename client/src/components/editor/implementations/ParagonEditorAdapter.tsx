/**
 * ParagonEditorAdapter
 * 
 * Adapter component that bridges the Paragon MarkdownEditor's API
 * (MarkdownEditorRef) to TaskFlow's EditorRef interface, allowing
 * the Paragon editor to be used as a drop-in replacement for the
 * existing TipTap editor via the EditorWrapper abstraction.
 * 
 * Key responsibilities:
 * 1. Convert stored markdown → HTML on load (Paragon expects HTML content)
 * 2. Convert HTML → markdown on save (via Paragon's onMarkdownChange/getMarkdown)
 * 3. Map TaskFlow's FormatAction commands to Paragon's TipTap editor commands
 * 4. Expose TaskFlow's EditorRef interface via useImperativeHandle
 * 5. CSS isolation via .paragon-editor wrapper class
 * 
 * IMPORTANT: The `content` prop passed to Paragon's MarkdownEditor is only used
 * for initial editor creation. After that, the editor manages its own internal state.
 * We must NOT re-derive htmlContent from initialContent on every render, because:
 *   - onChange fires → updateItem → selectedItem.content changes → initialContent changes
 *   - This would cause htmlContent to recompute and potentially reset the editor
 *   - The markdown→HTML→markdown round-trip is not lossless, causing feedback loops
 */

import React, { forwardRef, useImperativeHandle, useRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { marked } from 'marked';
import { MarkdownEditor, type MarkdownEditorRef, parseDateFromMarkdown, getDateVariant, isValidTag, normalizeTag } from '@samishkolli/paragon';
import type { EditorRef, EditorProps, FormatAction, TextLevel } from '../types';
import { isConnected } from '@/lib/dropbox';
import { uploadImageToDropbox, resolveImageSrc as resolveDropboxImageSrc } from '@/lib/dropboxImages';
import { toast } from '@/lib/toast';
import { DEFAULT_AI_ACTIONS } from '@/lib/ai/types';
import type { AIActionDefinition } from '@samishkolli/paragon';

// Import Paragon editor CSS (pre-built from npm package)
import '@samishkolli/paragon/style.css';

export interface ParagonEditorAdapterProps extends EditorProps {
  /** Show the bubble menu (floating toolbar) */
  showBubbleMenu?: boolean;
  /** Show the floating menu (slash commands) */
  showFloatingMenu?: boolean;
  /** Whether to show raw markdown text instead of WYSIWYG */
  isRawMode?: boolean;
  /** Automatically reorder checklist items: completed to bottom (default: false) */
  autoReorderChecklist?: boolean;
}

/**
 * Zero-width space used as a blank line marker in the markdown↔HTML round-trip.
 * Turndown emits this character on its own line for each empty paragraph (<p><br></p>),
 * and markdownToHtml converts it back to <p><br></p> when loading content.
 */
const BLANK_LINE_MARKER = '\u200B';

/**
 * Callout types supported by the editor.
 * Used for both serialization (HTML→MD) and deserialization (MD→HTML).
 */
const CALLOUT_TYPES = ['info', 'note', 'prompt', 'resources', 'todo'] as const;

/**
 * Pre-process markdown to convert callout code blocks back to callout HTML divs
 * before passing through marked. Supports both new format (```ad-info) and
 * old format (```info) for backward compatibility.
 */
function preprocessCallouts(markdown: string): string {
  let processed = markdown;
  // Safety: skip callout preprocessing if content is very large to avoid regex overhead
  if (markdown.length > 200_000) return processed;
  CALLOUT_TYPES.forEach(type => {
    // New format: ```ad-info
    const newRegex = new RegExp('```ad-' + type + '\\s*\\n([\\s\\S]*?)```', 'g');
    processed = processed.replace(newRegex, (_match, content) => {
      const innerHtml = marked.parse(content.trim(), { async: false }) as string;
      return `<div data-callout="" data-type="${type}" class="callout callout-${type}">${innerHtml}</div>`;
    });
    // Old format: ```info (backward compatibility)
    const oldRegex = new RegExp('```' + type + '\\s*\\n([\\s\\S]*?)```', 'g');
    processed = processed.replace(oldRegex, (_match, content) => {
      const innerHtml = marked.parse(content.trim(), { async: false }) as string;
      return `<div data-callout="" data-type="${type}" class="callout callout-${type}">${innerHtml}</div>`;
    });
  });
  return processed;
}

/**
 * Post-process HTML from marked to transform checkbox list items
 * into TipTap-compatible task list structure.
 *
 * marked produces:  <ul><li><input type="checkbox"> text</li></ul>
 * TipTap expects:   <ul data-type="taskList"><li data-type="taskItem" data-checked="false">text</li></ul>
 *
 * For inter-mixed lists (some items are tasks, some are bullets),
 * we keep them in the same parent list. If ANY item is a task item,
 * the parent <ul> gets data-type="taskList" so TipTap renders it
 * as a task list. Regular items inside a taskList are rendered as
 * normal list items (without checkboxes) thanks to the MixedLists extension.
 */
function transformCheckboxListItems(html: string): string {
  return processUlBlocks(html);
}

/**
 * Recursively process <ul> blocks to transform checkbox items into TipTap task items.
 * This handles nested lists at any depth.
 */
function processUlBlocks(html: string): string {
  let result = '';
  let i = 0;

  while (i < html.length) {
    const ulStart = html.indexOf('<ul>', i);
    if (ulStart === -1) {
      result += html.slice(i);
      break;
    }

    // Add everything before this <ul>
    result += html.slice(i, ulStart);

    // Find the matching </ul> (handle nesting)
    let depth = 1;
    let j = ulStart + 4; // after '<ul>'
    while (j < html.length && depth > 0) {
      if (html.startsWith('<ul', j)) {
        depth++;
        j += 3;
      } else if (html.startsWith('</ul>', j)) {
        depth--;
        if (depth === 0) break;
        j += 5;
      } else {
        j++;
      }
    }

    const ulEnd = j + 5; // include '</ul>'
    const innerHtml = html.slice(ulStart + 4, j); // between <ul> and </ul>

    // Parse top-level <li>...</li> items
    const items = parseTopLevelListItems(innerHtml);

    if (items.length === 0) {
      result += html.slice(ulStart, ulEnd);
      i = ulEnd;
      continue;
    }

    // First, recursively process nested <ul> blocks within each item
    const recursiveItems = items.map(item => processUlBlocks(item));

    // Check if this list contains any checkbox items (at this level only)
    const hasCheckbox = recursiveItems.some(item => 
      /<li(?:\s[^>]*)?>(?:\s*<p>)?\s*<input[^>]*type="checkbox"[^>]*>/.test(item)
    );

    if (!hasCheckbox) {
      // No checkboxes at this level, keep as regular <ul>
      result += `<ul>${recursiveItems.join('\n')}</ul>`;
      i = ulEnd;
      continue;
    }

    // Transform items with checkboxes into task items
    const transformedItems: string[] = [];

    for (const item of recursiveItems) {
      // Check if this item starts with a checkbox input (possibly wrapped in <p>)
      const isTask = /<li(?:\s[^>]*)?>(?:\s*<p>)?\s*<input[^>]*type="checkbox"[^>]*>/.test(item);
      const isChecked = isTask && /<input[^>]*checked(?:="[^"]*")?[^>]*>/.test(item);

      if (isTask) {
        let transformed = item;

        // Add data-type="taskItem" and data-checked to the <li>
        transformed = transformed.replace(
          /^<li(\s[^>]*)?>/, 
          `<li data-type="taskItem" data-checked="${isChecked}">`
        );

        // Remove the checkbox input element and any trailing space
        transformed = transformed.replace(/<input[^>]*type="checkbox"[^>]*>\s*/, '');

        transformedItems.push(transformed);
      } else {
        transformedItems.push(item);
      }
    }

    // Mark the parent as taskList if it has any task items
    result += `<ul data-type="taskList">${transformedItems.join('\n')}</ul>`;

    i = ulEnd;
  }

  return result;
}

/**
 * Parse top-level <li>...</li> items from inner HTML of a <ul>.
 * Handles nested <ul>/<ol> inside <li> items.
 */
function parseTopLevelListItems(innerHtml: string): string[] {
  const items: string[] = [];
  let i = 0;

  while (i < innerHtml.length) {
    // Find next <li
    const liStart = innerHtml.indexOf('<li', i);
    if (liStart === -1) break;

    // Find the end of the opening <li> tag
    const liTagEnd = innerHtml.indexOf('>', liStart);
    if (liTagEnd === -1) break;

    // Find matching </li> (handle nested lists which contain their own <li>)
    let depth = 1;
    let j = liTagEnd + 1;
    while (j < innerHtml.length && depth > 0) {
      if (innerHtml.startsWith('<li', j)) {
        depth++;
        j += 3;
      } else if (innerHtml.startsWith('</li>', j)) {
        depth--;
        if (depth === 0) break;
        j += 5;
      } else {
        j++;
      }
    }

    const liEnd = j + 5; // include '</li>'
    items.push(innerHtml.slice(liStart, liEnd));
    i = liEnd;
  }

  return items;
}

/**
 * Normalize "loose" list markdown (produced by old Turndown versions) to "tight" format.
 * Loose format: '1.  great\n    \n2.  going\n    \n' (extra spaces + blank lines between items)
 * Tight format: '1. great\n2. going\n' (single space, no blank lines between items)
 * Skips content inside code fences to avoid modifying callout/code block content.
 */
function normalizeLooseLists(md: string): string {
  // Split by code fences to avoid modifying content inside them
  const parts = md.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    // Odd indices are code fence blocks - skip them
    if (i % 2 === 1) return part;
    return part
      // Normalize extra spaces after list markers: '1.  ' -> '1. ', '-   ' -> '- '
      .replace(/^(\s*\d+\.)\s{2,}/gm, '$1 ')
      .replace(/^(\s*-)\s{3,}/gm, '$1 ')
      // Remove blank lines BETWEEN list items only (previous line must be a list item)
      // Handles: bullet (- ), numbered (1. ), task (- [ ] / - [x] ), and star (* ) markers
      .replace(/(^[ \t]*(?:\d+\. |- (?:\[[x ]\] )?|\* ).+)\n[ \t]*\n(?=[ \t]*(?:\d+\. |- (?:\[[x ]\] )?|\* ))/gm, '$1\n')
      // Remove trailing whitespace-only line after the last list item
      .replace(/(^[ \t]*(?:\d+\. |- (?:\[[x ]\] )?|\* ).+)\n[ \t]+$/gm, '$1');
  }).join('');
}

/**
 * Convert markdown string to HTML for Paragon's content prop.
 * Preserves extra blank lines by detecting ZWSP markers (from Turndown)
 * and raw consecutive newlines (3+), converting them to <p><br></p>.
 * Also converts callout code blocks (```ad-info) back to callout HTML divs.
 * Also transforms checkbox list items into TipTap-compatible task list structure.
 */
function markdownToHtml(markdown: string): string {
  if (!markdown || markdown.trim() === '') return '';
  try {
    // Safety: limit input length to prevent extremely long content from blocking the main thread
    // On mobile, this is especially important as the CPU is slower
    const MAX_INPUT_LENGTH = 500_000; // 500KB
    if (markdown.length > MAX_INPUT_LENGTH) {
      console.warn(`markdownToHtml: Input truncated from ${markdown.length} to ${MAX_INPUT_LENGTH} chars`);
      markdown = markdown.slice(0, MAX_INPUT_LENGTH);
    }

    // Sanitize corrupted wiki-links: un-escape \[\[...\]\] back to [[...]]
    // This can happen when switching between raw markdown and WYSIWYG modes
    // in older versions that didn't properly handle wiki-link syntax.
    markdown = markdown.replace(/\\\[\\\[([^\]]+?)\\\]\\\]/g, '[[$1]]');

    // Normalize loose list format from old Turndown before any other processing.
    // This ensures old content with extra spaces/blank lines in lists is displayed correctly.
    markdown = normalizeLooseLists(markdown);

    // Pre-process empty checkboxes: marked doesn't recognize "- [ ]" (no text after checkbox)
    // as a task item. It becomes <li>[ ]</li> and Turndown escapes the brackets.
    // Add a zero-width space after empty checkboxes so marked parses them correctly.
    markdown = markdown.replace(/^(\s*- \[[x ]\])\s*$/gm, '$1 \u200B');

    // Pre-process image format: ![alt | alignment | width](url) → <img> with alignment and width
    // This must happen before marked.parse() since marked doesn't understand the |alignment|width syntax.
    // Supports: ![alt | center | 300](url), ![alt|300](url), ![alt | 300](url)
    // First match format with alignment: ![alt | center | 300](url)
    markdown = markdown.replace(/!\[([^\]]*?)\s*\|\s*(left|center|right)\s*\|\s*(\d+)\]\(([^)]+)\)/g, (_match, alt, align, width, src) => {
      return `<img src="${src.trim()}" alt="${alt.trim()}" width="${width.trim()}" data-align="${align.trim()}" style="width: ${width.trim()}px" />`;
    });
    // Then match format without alignment: ![alt|300](url) and ![alt | 300](url)
    markdown = markdown.replace(/!\[([^\]]*?)\s*\|\s*(\d+)\]\(([^)]+)\)/g, (_match, alt, width, src) => {
      return `<img src="${src.trim()}" alt="${alt.trim()}" width="${width.trim()}" style="width: ${width.trim()}px" />`;
    });

    // Pre-process date pill format: @Mon DD, YYYY@ → date pill HTML
    // This must happen before marked.parse() since marked doesn't understand the @date@ syntax.
    markdown = markdown.replace(/@([^@\n]+)@/g, (match, dateText) => {
      const parsed = parseDateFromMarkdown(dateText);
      if (parsed) {
        const variant = getDateVariant(parsed);
        return `<span data-type="date-pill" data-date="${parsed}" class="date-pill ${variant}"><span class="date-icon">📅</span><span class="date-text">${dateText.trim()}</span></span>`;
      }
      return match; // Not a valid date, leave as-is
    });

    // Pre-process #tagname markdown format → tag pill HTML
    // Must happen before marked.parse() to prevent marked from treating # as heading
    // Split by code fences and inline code to avoid converting #tags inside code
    const tagParts = markdown.split(/(```[\s\S]*?```|`[^`\n]+`)/g);
    markdown = tagParts.map((part, idx) => {
      // Odd indices are code blocks/inline code - skip them
      if (idx % 2 === 1) return part;
      // Match #tag preceded by start-of-line or whitespace, tag must contain at least one letter
      return part.replace(/(?:^|(?<=\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\s|$|[.,;:!?)\]])/gm, (match, tag) => {
        const normalized = normalizeTag(tag);
        if (isValidTag(normalized)) {
          return `<span data-type="tag-pill" data-tag="${normalized}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${normalized}</span></span>`;
        }
        return match;
      });
    }).join('');

    // Pre-process [[wiki links]] → wiki link HTML spans
    // Split by code fences and inline code to avoid converting links inside code
    const wikiParts = markdown.split(/(```[\s\S]*?```|`[^`\n]+`)/g);
    markdown = wikiParts.map((part, idx) => {
      // Odd indices are code blocks/inline code - skip them
      if (idx % 2 === 1) return part;
      return part.replace(/\[\[([^\[\]]+)\]\]/g, (_match, pageName) => {
        return `<span data-wiki-link data-page-name="${pageName.trim()}" class="wiki-link">${pageName.trim()}</span>`;
      });
    }).join('');

    // Pre-process callout code blocks before splitting into lines/blocks
    // This must happen first so callout blocks are converted to HTML divs
    // before the line-by-line ZWSP/blank-line processing
    const preprocessed = preprocessCallouts(markdown);

    // Strip trailing ZWSP blank lines before processing.
    // TipTap automatically adds a trailing empty <p></p> after block elements (like <ul>)
    // for cursor positioning. Turndown converts this to a ZWSP line. On reload,
    // markdownToHtml would convert it back to <p><br></p>, and TipTap would add
    // ANOTHER trailing <p></p>, causing +1 empty paragraph growth per round-trip.
    // Stripping trailing ZWSP lines prevents this accumulation since TipTap
    // will re-add the cursor positioning paragraph automatically.
    let trimmed = preprocessed;
    while (trimmed.endsWith('\n' + BLANK_LINE_MARKER) || trimmed.endsWith('\n' + BLANK_LINE_MARKER + '\n')) {
      if (trimmed.endsWith('\n' + BLANK_LINE_MARKER + '\n')) {
        trimmed = trimmed.slice(0, -(BLANK_LINE_MARKER.length + 2));
      } else {
        trimmed = trimmed.slice(0, -(BLANK_LINE_MARKER.length + 1));
      }
    }
    // Also handle if the entire content is just ZWSP lines
    if (trimmed === BLANK_LINE_MARKER) trimmed = '';

    // Process line by line to handle ZWSP blank markers and raw blank lines
    const lines = trimmed.split('\n');
    const blocks: Array<{ type: 'content'; text: string } | { type: 'blank' }> = [];
    let currentContent: string[] = [];

    for (const line of lines) {
      if (line === BLANK_LINE_MARKER || line.trim() === BLANK_LINE_MARKER) {
        // ZWSP-only line = one blank line marker from Turndown
        if (currentContent.length > 0) {
          blocks.push({ type: 'content', text: currentContent.join('\n') });
          currentContent = [];
        }
        blocks.push({ type: 'blank' });
      } else {
        currentContent.push(line);
      }
    }
    if (currentContent.length > 0) {
      blocks.push({ type: 'content', text: currentContent.join('\n') });
    }

    // Build HTML: parse each content block with marked, inject empty <p> for blanks.
    // IMPORTANT: Use <p></p> (not <p><br></p>) because TipTap automatically adds its
    // own <br class="ProseMirror-trailingBreak"> to empty paragraphs. If we include
    // a <br> in the source HTML, TipTap adds another one, resulting in a double-height
    // blank line that grows by +1 on each save/restore round-trip.
    let html = '';
    for (const block of blocks) {
      if (block.type === 'blank') {
        html += '<p></p>\n';
      } else {
        // Normalize whitespace-only lines within content
        let text = block.text.replace(/^[ \t]+$/gm, '');

        // Handle raw extra blank lines (3+ consecutive newlines) within content
        const parts = text.split(/\n{3,}/);
        const gaps = text.match(/\n{3,}/g) || [];

        for (let i = 0; i < parts.length; i++) {
          if (parts[i].trim()) {
            html += marked.parse(parts[i], { async: false }) as string;
          }
          if (i < gaps.length) {
            const extraBlanks = gaps[i].length - 2;
            for (let j = 0; j < extraBlanks; j++) {
              html += '<p></p>\n';
            }
          }
        }
      }
    }

    // Strip trailing newlines from code block content.
    // marked always adds a trailing \n inside <code> tags (e.g., <code>content\n</code>),
    // which TipTap preserves and renders as a visible blank line at the end of code blocks.
    // Stripping it here prevents an extra blank line from appearing after each round-trip.
    html = html.replace(/<pre><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g, (match, attrs, content) => {
      const trimmed = content.replace(/\n+$/, '');
      return `<pre><code${attrs}>${trimmed}</code></pre>`;
    });

    // Transform checkbox list items from marked's output into TipTap-compatible
    // task list structure with data-type and data-checked attributes.
    // This also handles inter-mixing of task and bullet items by splitting
    // them into separate adjacent <ul> blocks.
    html = transformCheckboxListItems(html);

    return html;
  } catch {
    // Fallback: return as-is wrapped in a paragraph
    return `<p>${markdown}</p>`;
  }
}

export { BLANK_LINE_MARKER, transformCheckboxListItems, normalizeLooseLists };

const ParagonEditorAdapter = forwardRef<EditorRef, ParagonEditorAdapterProps>((props, ref) => {
  const {
    initialContent = '',
    onChange,
    onSelectionChange,
    placeholder = 'Start writing...',
    readOnly = false,
    autoFocus = false,
    className = '',
    showBubbleMenu = true,
    showFloatingMenu = true,
    itemId,
    isRawMode = false,
    autoReorderChecklist = true,
    onWikiLinkClick,
    validateWikiLink,
    onWikiLinkSearch,
  } = props;

  const { theme } = useTheme();
  const paragonRef = useRef<MarkdownEditorRef>(null);
  
  // Store the latest onChange callback in a ref to avoid stale closures
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // --- AI Writing Assistant (Built-in, server-side) ---
  
  
  /**
   * AI action handler — calls the server-side streaming endpoint.
   * Returns an AsyncIterable<string> for streaming text chunks.
   */
  const stableAIActionHandler = useCallback((
    actionId: string,
    text: string,
    customPrompt?: string
  ): AsyncIterable<string> => {
    return (async function* () {
      const response = await fetch('/api/ai/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ actionId, text, customPrompt }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'AI request failed' }));
        throw new Error(errorData.error || `AI error: ${response.status}`);
      }
      
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') return;
              try {
                const json = JSON.parse(data);
                if (json.error) throw new Error(json.error);
                if (json.text) yield json.text;
              } catch (e: any) {
                if (e.message && !e.message.includes('JSON')) throw e;
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    })();
  }, []);
  
  /**
   * Called when AI sparkles is clicked but AI is unavailable.
   * This should rarely happen since AI is built-in.
   */
  const handleAISetupRequired = useCallback(() => {
    toast.info('AI features are built-in and should be available automatically.');
  }, []);

  // --- Dropbox image upload/resolve hooks ---

  /**
   * Handle image upload from paste/drop in the editor.
   * Uploads the file to Dropbox and returns a relative path for markdown storage.
   */
  const handleImageUpload = useCallback(async (
    file: File,
    options: { fileName: string; mimeType: string; fileSize: number; uploadId: string }
  ): Promise<string> => {
    return uploadImageToDropbox(file, options);
  }, []);

  /**
   * Show a toast when image upload fails.
   */
  const handleImageUploadError = useCallback((error: string) => {
    toast.error(error);
  }, []);

  /**
   * Resolve relative image paths (e.g. "../_images/photo.jpg") to displayable blob URLs.
   * Uses IndexedDB cache first, falls back to authenticated Dropbox download.
   * Stable reference via useCallback to avoid unnecessary re-renders.
   */
  const stableResolveImageSrc = useCallback(async (src: string): Promise<string> => {
    return resolveDropboxImageSrc(src);
  }, []);

  // CRITICAL: Compute htmlContent ONCE from the initial mount value only.
  // We use useRef to capture the initial value and never update it.
  // The EditorWrapper already uses a `key` prop based on selectedItem.id,
  // so when switching items, the entire component remounts with fresh initialContent.
  // Within the same item, the editor manages its own state — we should NOT
  // feed back the round-tripped content as it causes the disappearing text bug.
  const initialHtmlRef = useRef<string>(markdownToHtml(initialContent));

  // Handle content changes from Paragon
  // Paragon's onChange fires with HTML; we need to convert to markdown for storage
  const handleChange = useCallback((html: string) => {
    // Use the paragon ref to get markdown (uses Turndown internally)
    if (paragonRef.current && onChangeRef.current) {
      const markdown = paragonRef.current.getMarkdown();
      onChangeRef.current(markdown);
    }
  }, []);

  // Sync isRawMode prop changes to the MarkdownEditor's internal mode.
  // The initialMode prop sets the mode on mount; subsequent changes need
  // to be pushed imperatively via the ref's setMode method.
  // NOTE: Paragon v1.2.0+ properly initializes rawMarkdown from editor content
  // when initialMode='markdown', so we can pass it directly.
  const prevRawModeRef = useRef(isRawMode);
  useEffect(() => {
    if (prevRawModeRef.current !== isRawMode && paragonRef.current) {
      const targetMode = isRawMode ? 'markdown' : 'wysiwyg';
      paragonRef.current.setMode(targetMode);
    }
    prevRawModeRef.current = isRawMode;
  }, [isRawMode]);

  // Expose TaskFlow's EditorRef interface
  useImperativeHandle(ref, () => ({
    getMarkdown: () => {
      if (!paragonRef.current) return '';
      return paragonRef.current.getMarkdown();
    },
    
    setMarkdown: (markdown: string) => {
      if (!paragonRef.current) return;
      const html = markdownToHtml(markdown);
      paragonRef.current.setContent(html);
    },
    
    applyFormat: (action: FormatAction, options?: Record<string, unknown>) => {
      if (!paragonRef.current) return;
      const editor = paragonRef.current.getEditor();
      if (!editor) return;
      
      switch (action) {
        case 'bold':
          editor.chain().focus().toggleBold().run();
          break;
        case 'italic':
          editor.chain().focus().toggleItalic().run();
          break;
        case 'strikethrough':
          editor.chain().focus().toggleStrike().run();
          break;
        case 'inlineCode':
          editor.chain().focus().toggleCode().run();
          break;
        case 'codeBlock':
          editor.chain().focus().toggleCodeBlock().run();
          break;
        case 'blockquote':
          editor.chain().focus().toggleBlockquote().run();
          break;
        case 'bulletList':
          editor.chain().focus().toggleBulletList().run();
          break;
        case 'numberedList':
          editor.chain().focus().toggleOrderedList().run();
          break;
        case 'taskList':
          editor.chain().focus().toggleTaskList().run();
          break;
        case 'horizontalRule':
          editor.chain().focus().setHorizontalRule().run();
          break;
        case 'heading1':
          editor.chain().focus().toggleHeading({ level: 1 }).run();
          break;
        case 'heading2':
          editor.chain().focus().toggleHeading({ level: 2 }).run();
          break;
        case 'heading3':
          editor.chain().focus().toggleHeading({ level: 3 }).run();
          break;
        case 'paragraph':
          editor.chain().focus().setParagraph().run();
          break;
        case 'link':
          if (options?.url) {
            editor.chain().focus().setLink({ href: options.url as string }).run();
          }
          break;
        case 'table':
          editor.chain().focus().insertTable({
            rows: (options?.rows as number) || 3,
            cols: (options?.cols as number) || 3,
            withHeaderRow: true,
          }).run();
          break;
      }
    },
    
    insertText: (text: string) => {
      if (!paragonRef.current) return;
      paragonRef.current.insertContent(text);
    },
    
    insertLink: (url: string, text?: string) => {
      if (!paragonRef.current) return;
      const editor = paragonRef.current.getEditor();
      if (!editor) return;
      if (text) {
        editor.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run();
      } else {
        editor.chain().focus().setLink({ href: url }).run();
      }
    },
    
    insertTable: (rows = 3, cols = 3) => {
      if (!paragonRef.current) return;
      paragonRef.current.insertTable(rows, cols);
    },
    
    focus: () => {
      if (!paragonRef.current) return;
      paragonRef.current.focus('end');
    },
    
    focusStart: () => {
      if (!paragonRef.current) return;
      paragonRef.current.focus('start');
    },
    
    blur: () => {
      if (!paragonRef.current) return;
      paragonRef.current.blur();
    },
    
    getSelection: () => {
      if (!paragonRef.current) return null;
      const editor = paragonRef.current.getEditor();
      if (!editor) return null;
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to, ' ');
      return { start: from, end: to, text };
    },
    
    getCurrentTextLevel: (): TextLevel => {
      if (!paragonRef.current) return 'p';
      const editor = paragonRef.current.getEditor();
      if (!editor) return 'p';
      if (editor.isActive('heading', { level: 1 })) return 'h1';
      if (editor.isActive('heading', { level: 2 })) return 'h2';
      if (editor.isActive('heading', { level: 3 })) return 'h3';
      if (editor.isActive('heading', { level: 4 })) return 'h4';
      if (editor.isActive('heading', { level: 5 })) return 'h5';
      if (editor.isActive('heading', { level: 6 })) return 'h6';
      return 'p';
    },
  }), []);

  return (
    <div 
      className={`paragon-editor ${className}`}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <MarkdownEditor
        ref={paragonRef}
        content={initialHtmlRef.current}
        onChange={handleChange}
        placeholder={placeholder}
        editable={!readOnly}
        autofocus={autoFocus}
        className="flex-1"
        showToolbar={true}
        showWordCount={false}
        showFloatingToolbar={showBubbleMenu}
        showModeToggle={false}
        autoSave={false}
        showRecoveryBanner={false}
        theme={theme}
        initialMode={isRawMode ? 'markdown' : 'wysiwyg'}
        disabledFeatures={{}}
        minHeight="100%"
        showTableOfContents={true}
        tocVisible={false}
        tocPosition="right"
        tocTreeView={true}
        tocMaxLevel={4}
        autoReorderChecklist={autoReorderChecklist}
        progressiveSelectAll={true}
        onImageUpload={handleImageUpload}
        onImageUploadError={handleImageUploadError}
        resolveImageSrc={stableResolveImageSrc}
        aiActions={DEFAULT_AI_ACTIONS as AIActionDefinition[]}
        onAIAction={stableAIActionHandler}
        onAISetupRequired={handleAISetupRequired}
        onWikiLinkClick={onWikiLinkClick}
        validateWikiLink={validateWikiLink}
        onWikiLinkSearch={onWikiLinkSearch}
      />
    </div>
  );
});

ParagonEditorAdapter.displayName = 'ParagonEditorAdapter';

export default ParagonEditorAdapter;
