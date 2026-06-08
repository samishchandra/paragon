import { marked } from 'marked';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MarkdownEditor, type MarkdownEditorRef } from '@/components/editor/MarkdownEditor';
import { markdownToHtml } from '@/components/editor/utils';
import '@/index.css';
import './glide-webview.css';

type GlideBridge = {
  surface: {
    data?: { path?: string };
    title?: string;
  };
  editor: {
    setDirty: (isDirty: boolean) => Promise<void>;
  };
  files: {
    read: (path: string) => Promise<{ content?: string }>;
    write: (path: string, content: string) => Promise<unknown>;
  };
};

declare global {
  interface Window {
    glide?: GlideBridge;
  }
}

const markedParse = (src: string) => marked.parse(src, { async: false, breaks: true }) as string;

function App() {
  const editorRef = useRef<MarkdownEditorRef>(null);
  const dirtyRef = useRef(false);
  const [path, setPath] = useState('');
  const [content, setContent] = useState<string | null>(null);
  const [status, setStatus] = useState('Loading...');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const glide = window.glide;
      const nextPath = glide?.surface.data?.path ?? '';
      if (!glide || !nextPath) {
        setError('Glide bridge is unavailable.');
        setStatus('Error');
        return;
      }

      try {
        setPath(nextPath);
        const result = await glide.files.read(nextPath);
        if (cancelled) return;
        const markdown = result.content ?? '';
        setContent(markdownToHtml(markdown, markedParse));
        setStatus('Ready');
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : String(err));
        setStatus('Error');
      }
    }

    if (window.glide) {
      load();
    } else {
      window.addEventListener('glide:ready', load, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('glide:ready', load);
    };
  }, []);

  const markDirty = useCallback(() => {
    if (dirtyRef.current) return;
    dirtyRef.current = true;
    setStatus('Unsaved');
    void window.glide?.editor.setDirty(true);
  }, []);

  const save = useCallback(async () => {
    if (!path || !editorRef.current || !window.glide) return;
    setStatus('Saving...');
    try {
      const markdown = editorRef.current.getMarkdownForExport();
      await window.glide.files.write(path, markdown);
      dirtyRef.current = false;
      await window.glide.editor.setDirty(false);
      setStatus('Saved');
    } catch (err) {
      setStatus('Save failed');
      setError(err instanceof Error ? err.message : String(err));
    }
  }, [path]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        void save();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [save]);

  return (
    <div className="glide-shell">
      <header className="glide-toolbar">
        <div className="glide-title">{path || window.glide?.surface.title || 'Markdown'}</div>
        <div className="glide-status">{status}</div>
        <button className="glide-save" type="button" onClick={() => void save()} disabled={content === null || !path}>
          Save
        </button>
      </header>
      <main className="glide-editor">
        {error ? <div className="glide-error">{error}</div> : null}
        {content !== null ? (
          <MarkdownEditor
            ref={editorRef}
            content={content}
            autoSave={false}
            showRecoveryBanner={false}
            markdownChangeDebounceMs={0}
            performanceMode="auto"
            theme="dark"
            onDocUpdate={markDirty}
          />
        ) : null}
      </main>
    </div>
  );
}

const root = document.getElementById('root');
if (!root) throw new Error('Missing root element');

createRoot(root).render(<App />);
