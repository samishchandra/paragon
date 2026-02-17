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
<h1>Welcome to Paragon Editor</h1>
<p>A <strong>professional</strong>, feature-rich markdown editor designed as a drop-in component for note-taking applications. Built with <a href="https://tiptap.dev">TipTap</a> and <strong>React</strong>.</p>

<h2>Quick Tips</h2>
<ul>
  <li>Type <code>/</code> to open the <strong>command palette</strong> for quick actions</li>
  <li>Select text to see the <strong>floating toolbar</strong> with formatting options</li>
  <li>Use <code>Ctrl+H</code> to open <strong>Find &amp; Replace</strong></li>
  <li>Type <code>@today</code> to insert a <strong>date pill</strong></li>
  <li>Press <code>Tab</code> to indent list items and <code>Shift+Tab</code> to outdent</li>
  <li>Toggle between <strong>WYSIWYG</strong> and <strong>raw markdown</strong> mode in the toolbar</li>
</ul>

<h2>Text Formatting</h2>
<p>Paragon supports all standard formatting options:</p>
<ul>
  <li><strong>Bold text</strong> for emphasis</li>
  <li><em>Italic text</em> for subtle emphasis</li>
  <li><s>Strikethrough</s> for corrections</li>
  <li><code>inline code</code> for technical terms</li>
  <li><mark>Highlighted text</mark> for important notes</li>
  <li><u>Underlined text</u> for additional emphasis</li>
</ul>

<h2>Task Lists</h2>
<p>Interactive checkboxes with auto-reorder &mdash; completed items automatically move to the bottom:</p>
<ul data-type="taskList">
  <li data-type="taskItem" data-checked="true">Set up the development environment</li>
  <li data-type="taskItem" data-checked="false">Implement core features</li>
  <li data-type="taskItem" data-checked="false">Write documentation</li>
  <li data-type="taskItem" data-checked="false">Deploy to production</li>
</ul>

<h2>Code Blocks</h2>
<p>Syntax highlighting for 20+ languages with copy-to-clipboard:</p>
<pre><code class="language-typescript">// Using Paragon Editor in your app
import { MarkdownEditor } from '@paragon/editor';

function App() {
  const [content, setContent] = useState('');

  return (
    <MarkdownEditor
      content={content}
      onChange={setContent}
      showToolbar={true}
      showWordCount={true}
      autoReorderChecklist={true}
    />
  );
}</code></pre>

<h2>Tables</h2>
<p>Full table support with resizable columns:</p>
<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Status</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>WYSIWYG + Raw Mode</td>
      <td>\u2705</td>
      <td>Toggle between visual and markdown editing</td>
    </tr>
    <tr>
      <td>AI Writing Assistant</td>
      <td>\u2705</td>
      <td>Provider-agnostic, streaming support</td>
    </tr>
    <tr>
      <td>Find &amp; Replace</td>
      <td>\u2705</td>
      <td>Works in both WYSIWYG and raw mode</td>
    </tr>
    <tr>
      <td>Date Pills</td>
      <td>\u2705</td>
      <td>Inline date tracking with smart detection</td>
    </tr>
    <tr>
      <td>Table of Contents</td>
      <td>\u2705</td>
      <td>Auto-generated sidebar with scroll sync</td>
    </tr>
  </tbody>
</table>

<h2>Blockquotes</h2>
<blockquote>
  <p>"The best way to predict the future is to invent it."</p>
  <p>&mdash; Alan Kay</p>
</blockquote>

<h2>Callouts</h2>
<p>Five callout types for structured notes. Type <code>/callout</code> or use <code>Ctrl+Shift+C</code>:</p>
<div data-callout="true" data-type="info"><p>This is an <strong>info</strong> callout &mdash; great for tips and helpful context.</p></div>
<div data-callout="true" data-type="todo"><p>This is a <strong>todo</strong> callout &mdash; use it for action items and reminders.</p></div>

<h2>Collapsible Lists</h2>
<p>Click the chevron icon to collapse/expand nested items:</p>
<ul>
  <li>Frontend Architecture
    <ul>
      <li>React Components
        <ul>
          <li>Layout components (Header, Sidebar, Footer)</li>
          <li>Form components (Input, Select, DatePicker)</li>
          <li>Data display (Table, Card, Chart)</li>
        </ul>
      </li>
      <li>State Management
        <ul>
          <li>Context API for theme and auth</li>
          <li>React Query for server state</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>Backend Services
    <ul>
      <li>API Layer
        <ul>
          <li>REST endpoints</li>
          <li>WebSocket connections</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

<h2>Keyboard Shortcuts</h2>
<table>
  <thead>
    <tr>
      <th>Action</th>
      <th>Shortcut</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Bold</td><td>Ctrl+B</td></tr>
    <tr><td>Italic</td><td>Ctrl+I</td></tr>
    <tr><td>Underline</td><td>Ctrl+U</td></tr>
    <tr><td>Inline Code</td><td>Ctrl+E</td></tr>
    <tr><td>Link</td><td>Ctrl+K</td></tr>
    <tr><td>Find &amp; Replace</td><td>Ctrl+H</td></tr>
    <tr><td>Date Pill</td><td>Ctrl+Shift+D</td></tr>
    <tr><td>Callout</td><td>Ctrl+Shift+C</td></tr>
    <tr><td>Expand Selection</td><td>Ctrl+A / Cmd+A</td></tr>
  </tbody>
</table>

<hr>

<p>Try typing <code>/</code> to open the command palette, or switch to raw markdown mode using the toolbar toggle!</p>
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

  // Clear saved content and reset to blank (after confirmation)
  const handleClearContent = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY_CONTENT);
    } catch {
      // Silently fail
    }
    setContent('<h1>Untitled</h1><p></p>');
    setShowNewConfirm(false);
  }, []);

  // Load the template content (after confirmation)
  const handleLoadTemplate = useCallback(() => {
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
            <DialogTitle>Start fresh?</DialogTitle>
            <DialogDescription>
              Choose to start with a blank document or load the example template. Your current content will be replaced.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 flex-col sm:flex-row">
            <Button
              variant="outline"
              onClick={() => setShowNewConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={handleLoadTemplate}
            >
              Load Template
            </Button>
            <Button
              variant="destructive"
              onClick={handleClearContent}
            >
              Blank Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
