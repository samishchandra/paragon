import { MarkdownEditor } from '@/components/editor';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import SiteHeader from '@/components/SiteHeader';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Trash2 } from 'lucide-react';

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
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Clear saved content and reset to default
  const handleClearContent = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY_CONTENT);
    } catch {
      // Silently fail
    }
    setContent(DEFAULT_CONTENT);
  }, []);

  // Flush pending save on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const headerActions = (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClearContent}
        className="gap-1.5 h-8 text-muted-foreground hover:text-destructive"
        title="Clear saved content"
      >
        <Trash2 className="w-4 h-4" />
        <span className="hidden sm:inline">New</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleThemeToggle}
        className="gap-1.5 h-8"
      >
        {theme === 'dark' ? (
          <><Sun className="w-4 h-4" /> Light</>
        ) : (
          <><Moon className="w-4 h-4" /> Dark</>
        )}
      </Button>
    </>
  );

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <SiteHeader actions={headerActions} />
      <div className="flex-1 overflow-hidden">
        <MarkdownEditor
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
        />
      </div>
    </div>
  );
}
