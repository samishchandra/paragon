import { MarkdownEditor } from '@/components/editor';
import type { MarkdownEditorRef } from '@/components/editor/MarkdownEditor';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import SiteHeader from '@/components/SiteHeader';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FilePlus, Download, Sun, Moon } from 'lucide-react';

/*
 * Standalone editor page — just the editor, nothing else.
 * Accessible at /editor
 *
 * Content is automatically saved to localStorage and restored on return.
 *
 * Supported query parameters:
 *   ?theme=dark|light          — Editor theme (default: light)
 *   ?toc=true|false            — Show table of contents (default: true)
 *   ?tocMaxLevel=1-6           — Max heading level in ToC (default: 4)
 *   ?toolbar=true|false        — Show editor toolbar (default: true)
 *   ?wordcount=true|false      — Show word count in footer (default: true)
 *   ?autofocus=true|false      — Auto-focus editor on load (default: true)
 *   ?reorder=true|false        — Auto-reorder completed checklist items (default: true)
 *   ?editable=true|false       — Allow editing (default: true)
 *   ?placeholder=...           — Custom placeholder text
 *
 * Example: /editor?theme=dark&toc=false&toolbar=true
 */

const STORAGE_KEY_CONTENT = 'paragon-editor-content';
const STORAGE_KEY_THEME = 'paragon-editor-theme';
const SAVE_DEBOUNCE_MS = 500;

function parseBool(value: string | null, defaultValue: boolean): boolean {
  if (value === null) return defaultValue;
  return value !== 'false' && value !== '0';
}

function parseIntSafe(value: string | null, defaultValue: number, min: number, max: number): number {
  if (value === null) return defaultValue;
  const n = Number(value);
  if (isNaN(n)) return defaultValue;
  return Math.max(min, Math.min(max, Math.floor(n)));
}

const DEFAULT_CONTENT = `
<h1>Start Writing</h1>
<p>This is a clean, distraction-free writing space. Use the toolbar above or type <code>/</code> for commands.</p>
`;

function loadSavedContent(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CONTENT);
    if (saved && saved.trim().length > 0) return saved;
  } catch {
    // localStorage may be unavailable
  }
  return DEFAULT_CONTENT;
}

function loadSavedTheme(queryTheme: 'dark' | 'light'): 'dark' | 'light' {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // localStorage may be unavailable
  }
  return queryTheme;
}

export default function EditorPage() {
  const config = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      theme: (params.get('theme') === 'dark' ? 'dark' : 'light') as 'dark' | 'light',
      showTableOfContents: parseBool(params.get('toc'), true),
      tocMaxLevel: parseIntSafe(params.get('tocMaxLevel'), 4, 1, 6),
      showToolbar: parseBool(params.get('toolbar'), true),
      showWordCount: parseBool(params.get('wordcount'), true),
      autofocus: parseBool(params.get('autofocus'), true),
      autoReorderChecklist: parseBool(params.get('reorder'), true),
      editable: parseBool(params.get('editable'), true),
      placeholder: params.get('placeholder') || "Start writing... Use '/' for commands",
    };
  }, []);

  const [content, setContent] = useState(() => loadSavedContent());
  const [theme, setTheme] = useState(() => loadSavedTheme(config.theme));
  const [showNewConfirm, setShowNewConfirm] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const editorRef = useRef<MarkdownEditorRef>(null);

  // Debounced save to localStorage on content change
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY_CONTENT, newContent);
      } catch {
        // Silently fail if storage is full or unavailable
      }
    }, SAVE_DEBOUNCE_MS);
  }, []);

  // Save theme preference immediately
  const handleThemeToggle = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY_THEME, next);
      } catch {
        // Silently fail
      }
      return next;
    });
  }, []);

  // Clear saved content and reset to default (after confirmation)
  const handleClearContent = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY_CONTENT);
    } catch {
      // Silently fail
    }
    setContent(DEFAULT_CONTENT);
    setShowNewConfirm(false);
  }, []);

  // Export content as .md file
  const handleExport = useCallback(() => {
    const markdown = editorRef.current?.getMarkdown?.() || '';
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  // Flush pending save on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const headerActions = (
    <>
      {/* New document button — opens confirmation dialog */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowNewConfirm(true)}
        className="gap-1.5 h-8 text-foreground"
        title="New document"
      >
        <FilePlus className="w-4 h-4" />
        <span className="hidden sm:inline">New</span>
      </Button>

      {/* Theme toggle — pill-shaped switch with sun/moon icons */}
      <button
        onClick={handleThemeToggle}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className="relative inline-flex h-7 w-[52px] shrink-0 items-center rounded-full border border-border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{
          background: theme === 'dark' ? 'var(--muted)' : 'var(--muted)',
        }}
        role="switch"
        aria-checked={theme === 'dark'}
      >
        {/* Track icons — sun on left, moon on right */}
        <Sun className="absolute left-1.5 w-3.5 h-3.5 text-amber-500 opacity-40" />
        <Moon className="absolute right-1.5 w-3.5 h-3.5 text-blue-400 opacity-40" />
        {/* Sliding thumb */}
        <span
          className="pointer-events-none flex items-center justify-center h-5 w-5 rounded-full bg-background shadow-sm ring-1 ring-border/50 transition-transform duration-200"
          style={{
            transform: theme === 'dark' ? 'translateX(28px)' : 'translateX(4px)',
          }}
        >
          {theme === 'dark' ? (
            <Moon className="w-3 h-3 text-blue-400" />
          ) : (
            <Sun className="w-3 h-3 text-amber-500" />
          )}
        </span>
      </button>

      {/* Export / Download as .md — icon only */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleExport}
        className="h-8 w-8"
        title="Download as Markdown"
      >
        <Download className="w-4 h-4" />
      </Button>
    </>
  );

  return (
    <div className={`h-screen w-screen overflow-hidden flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <SiteHeader actions={headerActions} />
      <div className="flex-1 overflow-hidden">
        <MarkdownEditor
          ref={editorRef}
          content={content}
          onChange={handleContentChange}
          placeholder={config.placeholder}
          showToolbar={config.showToolbar}
          showWordCount={config.showWordCount}
          autofocus={config.autofocus}
          showTableOfContents={config.showTableOfContents}
          tocMaxLevel={config.tocMaxLevel}
          theme={theme}
          autoReorderChecklist={config.autoReorderChecklist}
          editable={config.editable}
          progressiveSelectAll={true}
        />
      </div>

      {/* Confirmation dialog for New document */}
      <Dialog open={showNewConfirm} onOpenChange={setShowNewConfirm}>
        <DialogContent className="sm:max-w-md" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Create new document?</DialogTitle>
            <DialogDescription>
              Your current content will be lost. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowNewConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleClearContent}
            >
              Discard &amp; Create New
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
