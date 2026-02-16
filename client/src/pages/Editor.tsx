import { MarkdownEditor } from '@/components/editor';
import { useState, useMemo } from 'react';
import SiteHeader from '@/components/SiteHeader';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

/*
 * Standalone editor page — just the editor, nothing else.
 * Accessible at /editor
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

const INITIAL_CONTENT = `
<h1>Start Writing</h1>
<p>This is a clean, distraction-free writing space. Use the toolbar above or type <code>/</code> for commands.</p>
`;

export default function EditorPage() {
  const [content, setContent] = useState(INITIAL_CONTENT);

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

  const [theme, setTheme] = useState(config.theme);

  const headerActions = (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="gap-1.5 h-8"
    >
      {theme === 'dark' ? (
        <><Sun className="w-4 h-4" /> Light</>
      ) : (
        <><Moon className="w-4 h-4" /> Dark</>
      )}
    </Button>
  );

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <SiteHeader actions={headerActions} />
      <div className="flex-1 overflow-hidden">
        <MarkdownEditor
          content={content}
          onChange={setContent}
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
