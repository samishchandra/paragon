/**
 * SmartCopyPaste extension tests
 *
 * Tests the smart copy-paste behavior for code blocks and callouts:
 * - Full selection of container content → preserves the wrapper
 * - Partial selection inside container → unwraps, pastes inner content only
 */
import { describe, it, expect } from 'vitest';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Slice, Fragment } from '@tiptap/pm/model';
import { SmartCopyPaste } from './SmartCopyPaste';
import { Callout } from './Callout';

/**
 * Helper: create a minimal editor with SmartCopyPaste, code block, and callout
 */
function createEditor(content?: object) {
  return new Editor({
    extensions: [
      StarterKit,
      Callout,
      SmartCopyPaste,
    ],
    content: content || { type: 'doc', content: [{ type: 'paragraph' }] },
  });
}

describe('SmartCopyPaste', () => {
  describe('analyzeSelection helper (via transformCopied)', () => {
    it('should be registered as a plugin', () => {
      const editor = createEditor();
      const plugins = editor.view.state.plugins;
      const hasSmartCopyPaste = plugins.some(
        p => (p as unknown as { key: string }).key.includes('smartCopyPaste')
      );
      expect(hasSmartCopyPaste).toBe(true);
      editor.destroy();
    });
  });

  describe('code block scenarios', () => {
    it('should create a valid editor with code block content', () => {
      const editor = createEditor({
        type: 'doc',
        content: [
          {
            type: 'codeBlock',
            attrs: { language: 'javascript' },
            content: [{ type: 'text', text: 'const x = 1;\nconst y = 2;\nconst z = 3;' }],
          },
        ],
      });

      expect(editor.state.doc.firstChild?.type.name).toBe('codeBlock');
      expect(editor.state.doc.firstChild?.textContent).toBe('const x = 1;\nconst y = 2;\nconst z = 3;');
      editor.destroy();
    });

    it('should detect full selection of code block content', () => {
      const editor = createEditor({
        type: 'doc',
        content: [
          {
            type: 'codeBlock',
            attrs: { language: 'javascript' },
            content: [{ type: 'text', text: 'const x = 1;\nconst y = 2;' }],
          },
        ],
      });

      // Select the entire content of the code block
      // Code block starts at pos 0, content starts at pos 1
      const codeBlock = editor.state.doc.firstChild!;
      const contentStart = 1; // pos inside code block
      const contentEnd = 1 + codeBlock.content.size; // end of content

      editor.commands.setTextSelection({ from: contentStart, to: contentEnd });

      const { $from, $to } = editor.state.selection;
      // Verify the selection is inside the code block
      expect($from.parent.type.name).toBe('codeBlock');
      expect($to.parent.type.name).toBe('codeBlock');
      // Verify it covers the full content
      expect($from.parentOffset).toBe(0);
      expect($to.parentOffset).toBe(codeBlock.content.size);

      editor.destroy();
    });

    it('should detect partial selection of code block content', () => {
      const editor = createEditor({
        type: 'doc',
        content: [
          {
            type: 'codeBlock',
            attrs: { language: 'javascript' },
            content: [{ type: 'text', text: 'const x = 1;\nconst y = 2;\nconst z = 3;' }],
          },
        ],
      });

      // Select only "const y = 2;" (partial content)
      const text = 'const x = 1;\nconst y = 2;\nconst z = 3;';
      const startOffset = text.indexOf('const y');
      const endOffset = text.indexOf('const z') - 1; // before the newline

      editor.commands.setTextSelection({
        from: 1 + startOffset,
        to: 1 + endOffset,
      });

      const { $from, $to } = editor.state.selection;
      expect($from.parent.type.name).toBe('codeBlock');
      // Verify it's a partial selection (doesn't start at 0)
      expect($from.parentOffset).toBeGreaterThan(0);

      editor.destroy();
    });
  });

  describe('callout scenarios', () => {
    it('should create a valid editor with callout content', () => {
      const editor = createEditor({
        type: 'doc',
        content: [
          {
            type: 'callout',
            attrs: { type: 'info' },
            content: [
              { type: 'paragraph', content: [{ type: 'text', text: 'First paragraph' }] },
              { type: 'paragraph', content: [{ type: 'text', text: 'Second paragraph' }] },
            ],
          },
        ],
      });

      expect(editor.state.doc.firstChild?.type.name).toBe('callout');
      expect(editor.state.doc.firstChild?.childCount).toBe(2);
      editor.destroy();
    });

    it('should detect full selection of callout content', () => {
      const editor = createEditor({
        type: 'doc',
        content: [
          {
            type: 'callout',
            attrs: { type: 'info' },
            content: [
              { type: 'paragraph', content: [{ type: 'text', text: 'First paragraph' }] },
              { type: 'paragraph', content: [{ type: 'text', text: 'Second paragraph' }] },
            ],
          },
        ],
      });

      // Select entire callout content
      const callout = editor.state.doc.firstChild!;
      const contentStart = 1; // inside callout
      const contentEnd = 1 + callout.content.size;

      // For callout, content starts at callout pos + 1
      // First paragraph starts at callout + 1, text starts at callout + 2
      // We need to select from start of first paragraph text to end of last paragraph text
      const firstParaTextStart = 2; // inside first paragraph
      const lastParaTextEnd = contentEnd - 1; // before closing of callout

      editor.commands.setTextSelection({ from: firstParaTextStart, to: lastParaTextEnd });

      const { $from } = editor.state.selection;
      // Verify we're inside the callout
      let inCallout = false;
      for (let d = $from.depth; d > 0; d--) {
        if ($from.node(d).type.name === 'callout') {
          inCallout = true;
          break;
        }
      }
      expect(inCallout).toBe(true);

      editor.destroy();
    });

    it('should detect partial selection of callout content (only some paragraphs)', () => {
      const editor = createEditor({
        type: 'doc',
        content: [
          {
            type: 'callout',
            attrs: { type: 'info' },
            content: [
              { type: 'paragraph', content: [{ type: 'text', text: 'First paragraph' }] },
              { type: 'paragraph', content: [{ type: 'text', text: 'Second paragraph' }] },
              { type: 'paragraph', content: [{ type: 'text', text: 'Third paragraph' }] },
            ],
          },
        ],
      });

      // Select only the second paragraph's text (partial callout content)
      // Callout: pos 0
      //   Paragraph 1: pos 1, text starts at 2, text "First paragraph" (15 chars), ends at 17, para ends at 17
      //   Paragraph 2: pos 18, text starts at 19
      const doc = editor.state.doc;
      let secondParaStart = 0;
      let secondParaEnd = 0;
      doc.firstChild!.forEach((child, offset) => {
        if (offset > 0 && secondParaStart === 0) {
          // This is the second child
          secondParaStart = 1 + offset + 1; // callout offset + child offset + into paragraph
          secondParaEnd = secondParaStart + child.content.size;
        }
      });

      editor.commands.setTextSelection({ from: secondParaStart, to: secondParaEnd });

      const { $from, $to } = editor.state.selection;
      expect($from.parent.type.name).toBe('paragraph');

      // Verify we're inside the callout
      let calloutDepth = -1;
      for (let d = $from.depth; d > 0; d--) {
        if ($from.node(d).type.name === 'callout') {
          calloutDepth = d;
          break;
        }
      }
      expect(calloutDepth).toBeGreaterThan(0);

      // Verify it's a partial selection (doesn't cover all callout content)
      const calloutContentStart = $from.start(calloutDepth);
      const calloutContentEnd = $from.end(calloutDepth);
      expect($from.pos).toBeGreaterThan(calloutContentStart);

      editor.destroy();
    });
  });

  describe('transformCopied behavior', () => {
    it('should have transformCopied registered in plugin props', () => {
      const editor = createEditor();
      const plugins = editor.view.state.plugins;
      const smartPlugin = plugins.find(
        p => (p as unknown as { key: string }).key.includes('smartCopyPaste')
      );
      expect(smartPlugin).toBeDefined();
      // Check that the plugin has props with transformCopied
      const props = (smartPlugin as unknown as { props: { transformCopied?: unknown } }).props;
      expect(props.transformCopied).toBeDefined();
      expect(typeof props.transformCopied).toBe('function');
      editor.destroy();
    });

    it('should pass through slices that are not inside containers', () => {
      const editor = createEditor({
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Hello world' }] },
        ],
      });

      const plugins = editor.view.state.plugins;
      const smartPlugin = plugins.find(
        p => (p as unknown as { key: string }).key.includes('smartCopyPaste')
      );
      const transformCopied = (smartPlugin as unknown as { props: { transformCopied: (slice: Slice) => Slice } }).props.transformCopied;

      // Create a simple slice (not inside a container)
      const textNode = editor.state.schema.text('Hello');
      const para = editor.state.schema.nodes.paragraph.create(null, textNode);
      const slice = new Slice(Fragment.from(para), 0, 0);

      const result = transformCopied(slice);
      // Should return the same slice unchanged
      expect(result).toBe(slice);

      editor.destroy();
    });

    it('should unwrap code block slice when openStart > 0 (partial selection)', () => {
      const editor = createEditor({
        type: 'doc',
        content: [
          {
            type: 'codeBlock',
            attrs: { language: 'javascript' },
            content: [{ type: 'text', text: 'line 1\nline 2\nline 3' }],
          },
        ],
      });

      const plugins = editor.view.state.plugins;
      const smartPlugin = plugins.find(
        p => (p as unknown as { key: string }).key.includes('smartCopyPaste')
      );
      const props = (smartPlugin as unknown as { props: Record<string, unknown> }).props;
      const transformCopied = props.transformCopied as (slice: Slice) => Slice;
      const handleDOMEvents = props.handleDOMEvents as Record<string, (view: unknown) => boolean>;

      // Simulate a partial selection inside the code block
      // Select only "line 2"
      const text = 'line 1\nline 2\nline 3';
      const startOffset = text.indexOf('line 2');
      const endOffset = startOffset + 'line 2'.length;

      editor.commands.setTextSelection({
        from: 1 + startOffset,
        to: 1 + endOffset,
      });

      // Trigger the copy DOM event handler to analyze the selection
      handleDOMEvents.copy(editor.view);

      // Create a slice that ProseMirror would create for this selection
      // (code block wrapping the selected text, with openStart=1)
      const selectedText = editor.state.schema.text('line 2');
      const codeBlock = editor.state.schema.nodes.codeBlock.create(
        { language: 'javascript' },
        selectedText
      );
      const slice = new Slice(Fragment.from(codeBlock), 1, 1);

      const result = transformCopied(slice);

      // Should unwrap: content should be a paragraph with the text, not wrapped in code block
      expect(result.openStart).toBe(0);
      expect(result.openEnd).toBe(0);
      // Code block text is converted to paragraph(s) when unwrapped
      expect(result.content.firstChild?.type.name).toBe('paragraph');
      expect(result.content.firstChild?.textContent).toBe('line 2');

      editor.destroy();
    });

    it('should preserve code block wrapper when full content is selected', () => {
      const editor = createEditor({
        type: 'doc',
        content: [
          {
            type: 'codeBlock',
            attrs: { language: 'javascript' },
            content: [{ type: 'text', text: 'line 1\nline 2' }],
          },
        ],
      });

      const plugins = editor.view.state.plugins;
      const smartPlugin = plugins.find(
        p => (p as unknown as { key: string }).key.includes('smartCopyPaste')
      );
      const props = (smartPlugin as unknown as { props: Record<string, unknown> }).props;
      const transformCopied = props.transformCopied as (slice: Slice) => Slice;
      const handleDOMEvents = props.handleDOMEvents as Record<string, (view: unknown) => boolean>;

      // Select the entire content of the code block
      const codeBlockNode = editor.state.doc.firstChild!;
      editor.commands.setTextSelection({
        from: 1,
        to: 1 + codeBlockNode.content.size,
      });

      // Trigger the copy DOM event handler
      handleDOMEvents.copy(editor.view);

      // Create a slice with the full code block content (openStart=1 because
      // the selection is inside the code block)
      const fullText = editor.state.schema.text('line 1\nline 2');
      const codeBlock = editor.state.schema.nodes.codeBlock.create(
        { language: 'javascript' },
        fullText
      );
      const slice = new Slice(Fragment.from(codeBlock), 1, 1);

      const result = transformCopied(slice);

      // Should preserve the wrapper (return same slice)
      expect(result).toBe(slice);

      editor.destroy();
    });

    it('should unwrap callout slice when partial content is selected', () => {
      const editor = createEditor({
        type: 'doc',
        content: [
          {
            type: 'callout',
            attrs: { type: 'info' },
            content: [
              { type: 'paragraph', content: [{ type: 'text', text: 'First paragraph' }] },
              { type: 'paragraph', content: [{ type: 'text', text: 'Second paragraph' }] },
              { type: 'paragraph', content: [{ type: 'text', text: 'Third paragraph' }] },
            ],
          },
        ],
      });

      const plugins = editor.view.state.plugins;
      const smartPlugin = plugins.find(
        p => (p as unknown as { key: string }).key.includes('smartCopyPaste')
      );
      const props = (smartPlugin as unknown as { props: Record<string, unknown> }).props;
      const transformCopied = props.transformCopied as (slice: Slice) => Slice;
      const handleDOMEvents = props.handleDOMEvents as Record<string, (view: unknown) => boolean>;

      // Select only the second paragraph
      // Callout pos 0, first para pos 1, first para text pos 2
      // "First paragraph" = 15 chars, first para ends at 17, second para starts at 18
      // second para text starts at 19
      const doc = editor.state.doc;
      let secondParaTextStart = 0;
      let secondParaTextEnd = 0;
      let childIndex = 0;
      doc.firstChild!.forEach((child, offset) => {
        if (childIndex === 1) {
          secondParaTextStart = 1 + offset + 1; // callout start + offset + into para
          secondParaTextEnd = secondParaTextStart + child.content.size;
        }
        childIndex++;
      });

      editor.commands.setTextSelection({
        from: secondParaTextStart,
        to: secondParaTextEnd,
      });

      // Trigger the copy DOM event handler
      handleDOMEvents.copy(editor.view);

      // Create a slice that ProseMirror would create:
      // callout > paragraph > text, with openStart=2
      const selectedText = editor.state.schema.text('Second paragraph');
      const para = editor.state.schema.nodes.paragraph.create(null, selectedText);
      const callout = editor.state.schema.nodes.callout.create({ type: 'info' }, para);
      const slice = new Slice(Fragment.from(callout), 2, 2);

      const result = transformCopied(slice);

      // Should unwrap the callout: content should be paragraph(s), not callout
      expect(result.content.firstChild?.type.name).toBe('paragraph');
      expect(result.openStart).toBe(1); // still open inside the paragraph
      expect(result.openEnd).toBe(1);

      editor.destroy();
    });

    it('should preserve callout wrapper when full content is selected', () => {
      const editor = createEditor({
        type: 'doc',
        content: [
          {
            type: 'callout',
            attrs: { type: 'info' },
            content: [
              { type: 'paragraph', content: [{ type: 'text', text: 'First paragraph' }] },
              { type: 'paragraph', content: [{ type: 'text', text: 'Second paragraph' }] },
            ],
          },
        ],
      });

      const plugins = editor.view.state.plugins;
      const smartPlugin = plugins.find(
        p => (p as unknown as { key: string }).key.includes('smartCopyPaste')
      );
      const props = (smartPlugin as unknown as { props: Record<string, unknown> }).props;
      const transformCopied = props.transformCopied as (slice: Slice) => Slice;
      const handleDOMEvents = props.handleDOMEvents as Record<string, (view: unknown) => boolean>;

      // Select the entire callout content (from start of first para text to end of last para text)
      const calloutNode = editor.state.doc.firstChild!;
      const contentStart = 1; // inside callout
      const contentEnd = 1 + calloutNode.content.size;

      // Select from first text position to last text position
      editor.commands.setTextSelection({
        from: contentStart + 1, // inside first paragraph
        to: contentEnd - 1, // inside last paragraph
      });

      // Trigger the copy DOM event handler
      handleDOMEvents.copy(editor.view);

      // Create a slice with full callout content
      const text1 = editor.state.schema.text('First paragraph');
      const text2 = editor.state.schema.text('Second paragraph');
      const para1 = editor.state.schema.nodes.paragraph.create(null, text1);
      const para2 = editor.state.schema.nodes.paragraph.create(null, text2);
      const callout = editor.state.schema.nodes.callout.create(
        { type: 'info' },
        Fragment.from([para1, para2])
      );
      const slice = new Slice(Fragment.from(callout), 2, 2);

      const result = transformCopied(slice);

      // Should preserve the wrapper (return same slice)
      expect(result).toBe(slice);

      editor.destroy();
    });
  });

  describe('edge cases', () => {
    it('should handle empty selections gracefully', () => {
      const editor = createEditor({
        type: 'doc',
        content: [
          {
            type: 'codeBlock',
            attrs: { language: null },
            content: [{ type: 'text', text: 'some code' }],
          },
        ],
      });

      const plugins = editor.view.state.plugins;
      const smartPlugin = plugins.find(
        p => (p as unknown as { key: string }).key.includes('smartCopyPaste')
      );
      const props = (smartPlugin as unknown as { props: Record<string, unknown> }).props;
      const transformCopied = props.transformCopied as (slice: Slice) => Slice;

      // Empty slice
      const slice = Slice.empty;
      const result = transformCopied(slice);
      expect(result).toBe(slice);

      editor.destroy();
    });

    it('should convert multi-line code block text to separate paragraphs when unwrapping', () => {
      const editor = createEditor({
        type: 'doc',
        content: [
          {
            type: 'codeBlock',
            attrs: { language: null },
            content: [{ type: 'text', text: 'something\n* nice to have\n* wonderful' }],
          },
        ],
      });

      const plugins = editor.view.state.plugins;
      const smartPlugin = plugins.find(
        p => (p as unknown as { key: string }).key.includes('smartCopyPaste')
      );
      const props = (smartPlugin as unknown as { props: Record<string, unknown> }).props;
      const transformCopied = props.transformCopied as (slice: Slice) => Slice;
      const handleDOMEvents = props.handleDOMEvents as Record<string, (view: unknown) => boolean>;

      // Select only "* nice to have\n* wonderful" (partial selection)
      const codeBlockStart = 1; // inside code block
      const textStart = codeBlockStart + 'something\n'.length;
      const textEnd = codeBlockStart + 'something\n* nice to have\n* wonderful'.length;
      editor.commands.setTextSelection({ from: textStart, to: textEnd });

      // Trigger the copy DOM event handler
      handleDOMEvents.copy(editor.view);

      // Create a slice that ProseMirror would create for this partial selection
      const selectedText = editor.state.schema.text('* nice to have\n* wonderful');
      const codeBlock = editor.state.schema.nodes.codeBlock.create(null, selectedText);
      const slice = new Slice(Fragment.from(codeBlock), 1, 1);

      const result = transformCopied(slice);

      // Should unwrap and convert to separate paragraphs
      expect(result.openStart).toBe(0);
      expect(result.openEnd).toBe(0);
      expect(result.content.childCount).toBe(2);
      expect(result.content.child(0).type.name).toBe('paragraph');
      expect(result.content.child(0).textContent).toBe('* nice to have');
      expect(result.content.child(1).type.name).toBe('paragraph');
      expect(result.content.child(1).textContent).toBe('* wonderful');

      editor.destroy();
    });

    it('should not affect slices with multiple top-level children', () => {
      const editor = createEditor();

      const plugins = editor.view.state.plugins;
      const smartPlugin = plugins.find(
        p => (p as unknown as { key: string }).key.includes('smartCopyPaste')
      );
      const props = (smartPlugin as unknown as { props: Record<string, unknown> }).props;
      const transformCopied = props.transformCopied as (slice: Slice) => Slice;

      // Slice with two paragraphs (not a single container)
      const text1 = editor.state.schema.text('Hello');
      const text2 = editor.state.schema.text('World');
      const para1 = editor.state.schema.nodes.paragraph.create(null, text1);
      const para2 = editor.state.schema.nodes.paragraph.create(null, text2);
      const slice = new Slice(Fragment.from([para1, para2]), 1, 1);

      const result = transformCopied(slice);
      expect(result).toBe(slice);

      editor.destroy();
    });
  });
});
