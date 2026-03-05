/**
 * Performance Benchmark Tests
 *
 * Automated benchmarks that measure transaction processing time and TOC update
 * latency with large documents (500+ nodes, 50+ headings) to catch regressions.
 *
 * These tests create real TipTap editor instances with large documents and
 * measure the time taken for key operations. They assert that operations
 * complete within acceptable time budgets (generous thresholds to avoid
 * flaky failures in CI, while still catching major regressions).
 *
 * Run with: npx vitest run performance.benchmark
 */

import { describe, it, expect, afterEach } from 'vitest';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { CodeBlockWithFeatures } from './extensions/CodeBlockWithFeatures';
import { Callout } from './extensions/Callout';
import TextAlign from '@tiptap/extension-text-align';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Generate a large HTML document with the specified number of nodes.
 * Includes headings, paragraphs, lists, code blocks, and callouts
 * to simulate a realistic document structure.
 */
function generateLargeDocument(options: {
  headingCount: number;
  paragraphsPerSection: number;
  listItemsPerSection: number;
  codeBlocksPerSection: number;
}): string {
  const { headingCount, paragraphsPerSection, listItemsPerSection, codeBlocksPerSection } = options;
  const sections: string[] = [];

  for (let i = 0; i < headingCount; i++) {
    const level = (i % 4) + 1; // Cycle through h1-h4
    sections.push(`<h${level}>Section ${i + 1}: ${generateText(5 + (i % 10))}</h${level}>`);

    // Add paragraphs
    for (let p = 0; p < paragraphsPerSection; p++) {
      sections.push(`<p>${generateText(20 + (p % 30))}</p>`);
    }

    // Add a list every other section
    if (i % 2 === 0 && listItemsPerSection > 0) {
      const items = Array.from({ length: listItemsPerSection }, (_, j) =>
        `<li><p>${generateText(8 + (j % 5))}</p></li>`
      ).join('');
      sections.push(`<ul>${items}</ul>`);
    }

    // Add a code block every 3rd section
    if (i % 3 === 0 && codeBlocksPerSection > 0) {
      for (let c = 0; c < codeBlocksPerSection; c++) {
        sections.push(`<pre><code class="language-javascript">function example${i}_${c}() {\n  const x = ${i};\n  return x * 2;\n}</code></pre>`);
      }
    }
  }

  return sections.join('\n');
}

/** Generate random-ish text with the specified word count */
function generateText(wordCount: number): string {
  const words = [
    'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog',
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing',
    'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore',
    'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam',
    'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
    'aliquip', 'ex', 'ea', 'commodo', 'consequat',
  ];
  return Array.from({ length: wordCount }, (_, i) => words[i % words.length]).join(' ');
}

/** Create a TipTap editor with standard extensions */
function createEditor(content: string): Editor {
  return new Editor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      CodeBlockWithFeatures,
      Callout,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content,
  });
}

/** Measure execution time of a function in milliseconds */
function measureTime(fn: () => void): number {
  const start = performance.now();
  fn();
  return performance.now() - start;
}

/** Measure average execution time over multiple iterations */
function measureAverage(fn: () => void, iterations: number): number {
  // Warm up
  fn();
  fn();

  let total = 0;
  for (let i = 0; i < iterations; i++) {
    total += measureTime(fn);
  }
  return total / iterations;
}

// ---------------------------------------------------------------------------
// Test Suites
// ---------------------------------------------------------------------------

describe('Performance Benchmarks', () => {
  let editor: Editor | null = null;

  afterEach(() => {
    if (editor && !editor.isDestroyed) {
      editor.destroy();
    }
    editor = null;
  });

  // ===== DOCUMENT CREATION =====

  describe('editor initialization with large documents', () => {
    it('should create editor with 500+ node document in under 2000ms', () => {
      const html = generateLargeDocument({
        headingCount: 60,
        paragraphsPerSection: 5,
        listItemsPerSection: 4,
        codeBlocksPerSection: 1,
      });

      const time = measureTime(() => {
        editor = createEditor(html);
      });

      // Verify document structure
      const doc = editor!.state.doc;
      let nodeCount = 0;
      doc.descendants(() => { nodeCount++; });
      expect(nodeCount).toBeGreaterThan(500);

      // Assert time budget (generous for CI)
      expect(time).toBeLessThan(2000);
      // Log for visibility
      console.log(`[Benchmark] Editor init (${nodeCount} nodes): ${time.toFixed(1)}ms`);
    });

    it('should create editor with 50+ headings document in under 2000ms', () => {
      const html = generateLargeDocument({
        headingCount: 60,
        paragraphsPerSection: 3,
        listItemsPerSection: 2,
        codeBlocksPerSection: 0,
      });

      const time = measureTime(() => {
        editor = createEditor(html);
      });

      // Count headings
      let headingCount = 0;
      editor!.state.doc.descendants((node) => {
        if (node.type.name === 'heading') headingCount++;
      });
      expect(headingCount).toBeGreaterThanOrEqual(50);

      expect(time).toBeLessThan(2000);
      console.log(`[Benchmark] Editor init (${headingCount} headings): ${time.toFixed(1)}ms`);
    });
  });

  // ===== TRANSACTION PROCESSING =====

  describe('transaction processing on large documents', () => {
    it('should process single character insertion in under 20ms', () => {
      const html = generateLargeDocument({
        headingCount: 60,
        paragraphsPerSection: 5,
        listItemsPerSection: 3,
        codeBlocksPerSection: 1,
      });
      editor = createEditor(html);

      // Position cursor in a paragraph (not a heading)
      const doc = editor.state.doc;
      let paragraphPos = 0;
      doc.descendants((node, pos) => {
        if (node.type.name === 'paragraph' && paragraphPos === 0) {
          paragraphPos = pos + 1; // Inside the paragraph
          return false;
        }
      });
      editor.commands.setTextSelection(paragraphPos);

      // Measure single character insertion
      const avgTime = measureAverage(() => {
        editor!.commands.insertContent('x');
      }, 10);

      expect(avgTime).toBeLessThan(20);
      console.log(`[Benchmark] Single char insert (avg over 10): ${avgTime.toFixed(2)}ms`);
    });

    it('should process text replacement in under 30ms', () => {
      const html = generateLargeDocument({
        headingCount: 50,
        paragraphsPerSection: 4,
        listItemsPerSection: 3,
        codeBlocksPerSection: 1,
      });
      editor = createEditor(html);

      // Select first paragraph content
      const doc = editor.state.doc;
      let paraStart = 0;
      let paraEnd = 0;
      doc.descendants((node, pos) => {
        if (node.type.name === 'paragraph' && paraStart === 0 && node.textContent.length > 10) {
          paraStart = pos + 1;
          paraEnd = pos + 1 + Math.min(node.textContent.length, 20);
          return false;
        }
      });

      const avgTime = measureAverage(() => {
        editor!.commands.setTextSelection({ from: paraStart, to: paraEnd });
        editor!.commands.insertContent('replaced text content');
      }, 5);

      expect(avgTime).toBeLessThan(30);
      console.log(`[Benchmark] Text replacement (avg over 5): ${avgTime.toFixed(2)}ms`);
    });

    it('should process heading level change in under 30ms', () => {
      const html = generateLargeDocument({
        headingCount: 60,
        paragraphsPerSection: 4,
        listItemsPerSection: 2,
        codeBlocksPerSection: 0,
      });
      editor = createEditor(html);

      // Find a heading
      let headingPos = 0;
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'heading' && headingPos === 0) {
          headingPos = pos + 1;
          return false;
        }
      });
      editor.commands.setTextSelection(headingPos);

      const avgTime = measureAverage(() => {
        editor!.commands.toggleHeading({ level: 2 });
        editor!.commands.toggleHeading({ level: 3 });
      }, 5);

      expect(avgTime).toBeLessThan(30);
      console.log(`[Benchmark] Heading level change (avg over 5): ${avgTime.toFixed(2)}ms`);
    });
  });

  // ===== DOCUMENT TRAVERSAL (TOC-related) =====

  describe('document traversal and heading extraction', () => {
    it('should extract headings from 500+ node document in under 5ms', () => {
      const html = generateLargeDocument({
        headingCount: 60,
        paragraphsPerSection: 5,
        listItemsPerSection: 3,
        codeBlocksPerSection: 1,
      });
      editor = createEditor(html);

      let headings: { text: string; level: number; pos: number }[] = [];

      const avgTime = measureAverage(() => {
        headings = [];
        editor!.state.doc.descendants((node, pos) => {
          if (node.type.name === 'heading') {
            const level = node.attrs.level as number;
            if (level >= 1 && level <= 4) {
              const text = node.textContent;
              if (text.trim()) {
                headings.push({ text: text.trim(), level, pos });
              }
            }
          }
        });
      }, 20);

      expect(headings.length).toBeGreaterThanOrEqual(50);
      expect(avgTime).toBeLessThan(5);
      console.log(`[Benchmark] Heading extraction (${headings.length} headings, avg over 20): ${avgTime.toFixed(3)}ms`);
    });

    it('should fingerprint headings array in under 1ms', () => {
      const html = generateLargeDocument({
        headingCount: 100,
        paragraphsPerSection: 2,
        listItemsPerSection: 0,
        codeBlocksPerSection: 0,
      });
      editor = createEditor(html);

      // Extract headings first
      const headings: { id: string; text: string; level: number; pos: number }[] = [];
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'heading') {
          const level = node.attrs.level as number;
          const text = node.textContent.trim();
          if (text) {
            headings.push({ id: `toc-heading-${pos}`, text, level, pos });
          }
        }
      });

      expect(headings.length).toBeGreaterThanOrEqual(50);

      // Measure fingerprinting
      const avgTime = measureAverage(() => {
        let fp = '';
        for (let i = 0; i < headings.length; i++) {
          const h = headings[i];
          fp += `${h.pos}:${h.level}:${h.text};`;
        }
        // Prevent dead code elimination
        if (fp.length === 0) throw new Error('empty');
      }, 100);

      expect(avgTime).toBeLessThan(1);
      console.log(`[Benchmark] Heading fingerprint (${headings.length} headings, avg over 100): ${avgTime.toFixed(4)}ms`);
    });

    it('should build heading tree from 60+ headings in under 2ms', () => {
      const html = generateLargeDocument({
        headingCount: 80,
        paragraphsPerSection: 2,
        listItemsPerSection: 0,
        codeBlocksPerSection: 0,
      });
      editor = createEditor(html);

      // Extract headings
      const headings: { id: string; text: string; level: number; pos: number; children?: any[] }[] = [];
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'heading') {
          const level = node.attrs.level as number;
          const text = node.textContent.trim();
          if (text && level >= 1 && level <= 4) {
            headings.push({ id: `toc-heading-${pos}`, text, level, pos });
          }
        }
      });

      expect(headings.length).toBeGreaterThanOrEqual(60);

      // Measure tree building (same algorithm as TableOfContents.buildTree)
      const avgTime = measureAverage(() => {
        const root: any[] = [];
        const stack: { item: any; level: number }[] = [];
        for (const heading of headings) {
          const item = { ...heading, children: [] };
          while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
            stack.pop();
          }
          if (stack.length === 0) {
            root.push(item);
          } else {
            stack[stack.length - 1].item.children.push(item);
          }
          stack.push({ item, level: heading.level });
        }
        // Prevent dead code elimination
        if (root.length === 0) throw new Error('empty tree');
      }, 50);

      expect(avgTime).toBeLessThan(2);
      console.log(`[Benchmark] Tree build (${headings.length} headings, avg over 50): ${avgTime.toFixed(4)}ms`);
    });
  });

  // ===== BULK OPERATIONS =====

  describe('bulk operations on large documents', () => {
    it('should handle getHTML() on 500+ node document in under 50ms', () => {
      const html = generateLargeDocument({
        headingCount: 60,
        paragraphsPerSection: 5,
        listItemsPerSection: 3,
        codeBlocksPerSection: 1,
      });
      editor = createEditor(html);

      let resultHtml = '';
      const avgTime = measureAverage(() => {
        resultHtml = editor!.getHTML();
      }, 5);

      expect(resultHtml.length).toBeGreaterThan(1000);
      expect(avgTime).toBeLessThan(50);
      console.log(`[Benchmark] getHTML() (${resultHtml.length} chars, avg over 5): ${avgTime.toFixed(2)}ms`);
    });

    it('should handle getJSON() on 500+ node document in under 30ms', () => {
      const html = generateLargeDocument({
        headingCount: 60,
        paragraphsPerSection: 5,
        listItemsPerSection: 3,
        codeBlocksPerSection: 1,
      });
      editor = createEditor(html);

      let resultJson: any;
      const avgTime = measureAverage(() => {
        resultJson = editor!.getJSON();
      }, 5);

      expect(resultJson.content.length).toBeGreaterThan(100);
      expect(avgTime).toBeLessThan(30);
      console.log(`[Benchmark] getJSON() (${resultJson.content.length} top-level nodes, avg over 5): ${avgTime.toFixed(2)}ms`);
    });

    it('should handle rapid sequential insertions (simulating fast typing)', () => {
      const html = generateLargeDocument({
        headingCount: 50,
        paragraphsPerSection: 4,
        listItemsPerSection: 2,
        codeBlocksPerSection: 1,
      });
      editor = createEditor(html);

      // Position cursor in a paragraph
      let paragraphPos = 0;
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'paragraph' && paragraphPos === 0) {
          paragraphPos = pos + 1;
          return false;
        }
      });
      editor.commands.setTextSelection(paragraphPos);

      // Simulate typing 50 characters rapidly
      const totalTime = measureTime(() => {
        for (let i = 0; i < 50; i++) {
          editor!.commands.insertContent(String.fromCharCode(97 + (i % 26)));
        }
      });

      const avgPerChar = totalTime / 50;
      expect(avgPerChar).toBeLessThan(15);
      console.log(`[Benchmark] Rapid typing (50 chars): total=${totalTime.toFixed(1)}ms, avg=${avgPerChar.toFixed(2)}ms/char`);
    });
  });

  // ===== DECORATION-RELATED OPERATIONS =====

  describe('decoration-related operations', () => {
    it('should handle doc.descendants traversal on large document in under 5ms', () => {
      const html = generateLargeDocument({
        headingCount: 60,
        paragraphsPerSection: 5,
        listItemsPerSection: 3,
        codeBlocksPerSection: 1,
      });
      editor = createEditor(html);

      let nodeCount = 0;
      const avgTime = measureAverage(() => {
        nodeCount = 0;
        editor!.state.doc.descendants(() => {
          nodeCount++;
        });
      }, 20);

      expect(nodeCount).toBeGreaterThan(500);
      expect(avgTime).toBeLessThan(5);
      console.log(`[Benchmark] Full doc.descendants (${nodeCount} nodes, avg over 20): ${avgTime.toFixed(3)}ms`);
    });

    it('should count specific node types efficiently', () => {
      const html = generateLargeDocument({
        headingCount: 60,
        paragraphsPerSection: 5,
        listItemsPerSection: 3,
        codeBlocksPerSection: 1,
      });
      editor = createEditor(html);

      let headingCount = 0;
      let paragraphCount = 0;
      let listItemCount = 0;
      let codeBlockCount = 0;

      const avgTime = measureAverage(() => {
        headingCount = 0;
        paragraphCount = 0;
        listItemCount = 0;
        codeBlockCount = 0;
        editor!.state.doc.descendants((node) => {
          switch (node.type.name) {
            case 'heading': headingCount++; break;
            case 'paragraph': paragraphCount++; break;
            case 'listItem': listItemCount++; break;
            case 'codeBlock': codeBlockCount++; break;
          }
        });
      }, 20);

      expect(headingCount).toBeGreaterThanOrEqual(50);
      expect(paragraphCount).toBeGreaterThan(100);
      expect(avgTime).toBeLessThan(5);
      console.log(`[Benchmark] Node type counting (h:${headingCount} p:${paragraphCount} li:${listItemCount} cb:${codeBlockCount}, avg over 20): ${avgTime.toFixed(3)}ms`);
    });
  });

  // ===== DOCUMENT SIZE METRICS =====

  describe('document size metrics', () => {
    it('should report document metrics for the large test document', () => {
      const html = generateLargeDocument({
        headingCount: 60,
        paragraphsPerSection: 5,
        listItemsPerSection: 3,
        codeBlocksPerSection: 1,
      });
      editor = createEditor(html);

      const doc = editor.state.doc;
      let nodeCount = 0;
      let headingCount = 0;
      let textLength = 0;

      doc.descendants((node) => {
        nodeCount++;
        if (node.type.name === 'heading') headingCount++;
        if (node.isText) textLength += node.text?.length || 0;
      });

      console.log(`[Benchmark] Document metrics:`);
      console.log(`  - Top-level children: ${doc.content.childCount}`);
      console.log(`  - Total nodes: ${nodeCount}`);
      console.log(`  - Headings: ${headingCount}`);
      console.log(`  - Text length: ${textLength} chars`);
      console.log(`  - Doc size (nodeSize): ${doc.nodeSize}`);

      // Verify we have a sufficiently large document
      expect(nodeCount).toBeGreaterThan(500);
      expect(headingCount).toBeGreaterThanOrEqual(50);
    });
  });
});
