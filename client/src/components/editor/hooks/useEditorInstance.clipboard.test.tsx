import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import StarterKit from '@tiptap/starter-kit';
import { useEditorInstance } from './useEditorInstance';

/**
 * Verifies the text/plain clipboard serializer emits tight markdown (single
 * newlines between list items) instead of ProseMirror's default blank-line
 * block separation, which produced empty lines when pasting a copied list
 * into a plain-text field or code block.
 */
function setup(content: string) {
  const editorModeRef = { current: 'wysiwyg' as const };
  const rawMarkdownRef = { current: '' };
  const lightweightCheckCounterRef = { current: 0 };
  const isLightweightRef = { current: false };

  return renderHook(() =>
    useEditorInstance({
      extensions: [StarterKit],
      content,
      editable: true,
      autofocus: false,
      spellCheck: false,
      initialMode: 'wysiwyg',
      performanceMode: 'full',
      lightweightThreshold: 1000,
      markdownChangeDebounceMs: 0,
      editorModeRef,
      rawMarkdownRef,
      setRawMarkdown: () => {},
      setIsLightweight: () => {},
      lightweightCheckCounterRef,
      isLightweightRef,
    })
  );
}

function serializeWholeDoc(editor: any): string {
  const { doc } = editor.state;
  const slice = doc.slice(0, doc.content.size);
  const serialize = editor.view.someProp('clipboardTextSerializer');
  return serialize(slice, editor.view);
}

async function readyEditor(result: any, marker: string) {
  // Wait for the doc content to load AND the lazily-imported turndown service
  // to finish loading (it returns '' until the dynamic import resolves).
  await waitFor(
    () => {
      const editor = result.current.editor;
      const td = result.current.turndownService;
      expect(
        !!editor &&
          editor.state.doc.textContent.includes(marker) &&
          td.turndown('<p>x</p>').includes('x')
      ).toBe(true);
    },
    { timeout: 5000 }
  );
  return result.current.editor;
}

describe('clipboardTextSerializer (text/plain copy)', () => {
  it('copies a bullet list without blank lines between items', async () => {
    const { result } = setup(
      '<ul><li><p>first</p></li><li><p>second</p></li><li><p>third</p></li></ul>'
    );
    const editor = await readyEditor(result, 'first');

    const text = serializeWholeDoc(editor);
    // eslint-disable-next-line no-console
    console.log('BULLET CLIPBOARD:', JSON.stringify(text));

    expect(text).toContain('first');
    expect(text).toContain('second');
    expect(text).toContain('third');
    // No blank line (two+ consecutive newlines) anywhere in a tight list.
    expect(/\n[ \t]*\n/.test(text)).toBe(false);
  });

  it('falls back to tight, non-empty text before turndown finishes loading', async () => {
    const { result } = setup(
      '<ul><li><p>alpha</p></li><li><p>beta</p></li></ul>'
    );
    // Wait only for the doc content — NOT for turndown to load — so we exercise
    // the lazy-load window where turndown.turndown() returns ''.
    await waitFor(() =>
      expect(result.current.editor?.state.doc.textContent.includes('alpha')).toBe(true)
    );
    const editor = result.current.editor!;
    const text = serializeWholeDoc(editor);
    // Must NOT be empty (the bug was an empty clipboard during this window),
    // and must still avoid blank lines between items.
    expect(text.length).toBeGreaterThan(0);
    expect(text).toContain('alpha');
    expect(text).toContain('beta');
    expect(/\n[ \t]*\n/.test(text)).toBe(false);
  });

  it('copies an ordered list without blank lines between items', async () => {
    const { result } = setup(
      '<ol><li><p>one</p></li><li><p>two</p></li><li><p>three</p></li></ol>'
    );
    const editor = await readyEditor(result, 'one');

    const text = serializeWholeDoc(editor);
    // eslint-disable-next-line no-console
    console.log('ORDERED CLIPBOARD:', JSON.stringify(text));

    expect(/\n[ \t]*\n/.test(text)).toBe(false);
    expect(text).toMatch(/one/);
    expect(text).toMatch(/three/);
  });
});
