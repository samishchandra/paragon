import { describe, it, expect, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { CodeBlockWithFeatures } from '../extensions/CodeBlockWithFeatures';
import { MixedBulletList, MixedOrderedList, MixedListItem, MixedTaskList, MixedTaskItem } from '../extensions/MixedLists';
import { useEditorKeyboardShortcuts } from './useEditorKeyboardShortcuts';

const noopCallbacks = {
  openLinkPopover: () => {},
  openFindReplace: () => {},
  openFindReplaceWithReplace: () => {},
};

let editor: Editor | null = null;

function makeEditor(content: string) {
  return new Editor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      MixedBulletList,
      MixedOrderedList,
      MixedListItem,
      MixedTaskList,
      MixedTaskItem,
      CodeBlockWithFeatures,
    ],
    content,
  });
}

function nodeTypes(ed: Editor): string[] {
  const types: string[] = [];
  ed.state.doc.descendants((n) => { types.push(n.type.name); });
  return types;
}

function pressSpace() {
  document.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }));
}

afterEach(() => {
  editor?.destroy();
  editor = null;
});

describe('useEditorKeyboardShortcuts — markdown shortcuts respect code blocks', () => {
  it('does NOT convert "* " to a bullet list inside a code block', () => {
    editor = makeEditor('<pre><code>*</code></pre>');
    // place cursor right after the "*" inside the code block
    editor.commands.setTextSelection(2);
    expect(editor.state.selection.$from.parent.type.name).toBe('codeBlock');

    renderHook(() => useEditorKeyboardShortcuts(editor, false, noopCallbacks));
    pressSpace();

    expect(nodeTypes(editor).includes('bulletList')).toBe(false);
    expect(editor.state.doc.firstChild?.type.name).toBe('codeBlock');
  });

  it('does NOT convert "- " to a bullet list inside a code block', () => {
    editor = makeEditor('<pre><code>-</code></pre>');
    editor.commands.setTextSelection(2);

    renderHook(() => useEditorKeyboardShortcuts(editor, false, noopCallbacks));
    pressSpace();

    expect(nodeTypes(editor).includes('bulletList')).toBe(false);
  });

  it('does NOT convert "# " to a heading inside a code block', () => {
    editor = makeEditor('<pre><code>#</code></pre>');
    editor.commands.setTextSelection(2);

    renderHook(() => useEditorKeyboardShortcuts(editor, false, noopCallbacks));
    pressSpace();

    expect(nodeTypes(editor).includes('heading')).toBe(false);
    expect(editor.state.doc.firstChild?.type.name).toBe('codeBlock');
  });

  it('still converts "* " to a bullet list in a normal paragraph (regression guard)', () => {
    editor = makeEditor('<p>*</p>');
    editor.commands.setTextSelection(2);

    renderHook(() => useEditorKeyboardShortcuts(editor, false, noopCallbacks));
    pressSpace();

    expect(nodeTypes(editor).includes('bulletList')).toBe(true);
  });
});
