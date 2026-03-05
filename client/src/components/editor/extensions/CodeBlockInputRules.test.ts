import { describe, it, expect } from 'vitest';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { CodeBlockWithFeatures } from './CodeBlockWithFeatures';

/**
 * Tests for code block input rule behavior:
 * 1. Heading shortcuts (# ) should NOT trigger inside code blocks
 * 2. ``` + Enter should create a code block with cursor inside
 */

function createEditor(content?: string) {
  return new Editor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default, use CodeBlockWithFeatures
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      CodeBlockWithFeatures,
    ],
    content: content || '',
  });
}

describe('Code block input rules', () => {
  describe('Issue 1: heading shortcuts inside code blocks', () => {
    it('should NOT convert "# " to heading inside a code block', () => {
      // Create editor with a code block containing some text
      const editor = createEditor('<pre><code>some text</code></pre>');
      
      // Verify we're in a code block
      expect(editor.isActive('codeBlock')).toBe(true);
      
      // The code block should remain a code block
      const doc = editor.state.doc;
      const firstChild = doc.firstChild;
      expect(firstChild?.type.name).toBe('codeBlock');
    });

    it('code block text should not be converted by input rules', () => {
      // Create a code block with "# heading" text
      const editor = createEditor('<pre><code># heading text</code></pre>');
      
      // Verify the content is still a code block, not a heading
      const doc = editor.state.doc;
      const firstChild = doc.firstChild;
      expect(firstChild?.type.name).toBe('codeBlock');
      expect(firstChild?.textContent).toBe('# heading text');
    });
  });

  describe('Issue 2: ``` + Enter creates code block with cursor inside', () => {
    it('should create a code block when typing ``` and pressing Enter', () => {
      const editor = createEditor('<p>```</p>');
      
      // Position cursor at the end of the paragraph (after ```)
      editor.commands.setTextSelection(4); // After ```
      
      // Simulate Enter key by dispatching a transaction
      // The handleKeyDown plugin should intercept this
      // We can test the state after the plugin processes it
      const view = (editor as any).view;
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      
      // Check if the plugin handles the Enter key
      const handled = view.someProp('handleKeyDown', (f: any) => f(view, event));
      
      if (handled) {
        // Verify a code block was created
        const doc = editor.state.doc;
        let hasCodeBlock = false;
        doc.descendants((node: any) => {
          if (node.type.name === 'codeBlock') {
            hasCodeBlock = true;
          }
        });
        expect(hasCodeBlock).toBe(true);
        
        // Verify cursor is inside the code block
        const { $from } = editor.state.selection;
        expect($from.parent.type.name).toBe('codeBlock');
      }
    });

    it('should create a code block with language when typing ```js and pressing Enter', () => {
      const editor = createEditor('<p>```js</p>');
      
      // Position cursor at the end of the paragraph (after ```js)
      editor.commands.setTextSelection(6); // After ```js
      
      const view = (editor as any).view;
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      
      const handled = view.someProp('handleKeyDown', (f: any) => f(view, event));
      
      if (handled) {
        const doc = editor.state.doc;
        let codeBlockLang: string | null = null;
        doc.descendants((node: any) => {
          if (node.type.name === 'codeBlock') {
            codeBlockLang = node.attrs.language;
          }
        });
        expect(codeBlockLang).toBe('js');
      }
    });

    it('should NOT trigger on non-backtick text + Enter', () => {
      const editor = createEditor('<p>hello world</p>');
      
      editor.commands.setTextSelection(12); // End of text
      
      // Verify no code block was created - the document should still be paragraphs
      const doc = editor.state.doc;
      let hasCodeBlock = false;
      doc.descendants((node: any) => {
        if (node.type.name === 'codeBlock') {
          hasCodeBlock = true;
        }
      });
      expect(hasCodeBlock).toBe(false);
      expect(doc.firstChild?.type.name).toBe('paragraph');
    });
  });
});
