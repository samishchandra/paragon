import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';

// ─── Highlight.js Language Loading Strategy ─────────────────────────────────
//
// Languages are split into two tiers for optimal bundle performance:
//
// CORE TIER (loaded synchronously, ~40 KB):
//   javascript, typescript, python, xml/html, css, json, bash
//   These are the most commonly used languages and are always available.
//
// EXTENDED TIER (lazy-loaded on demand, ~44 KB total):
//   sql, java, cpp/c, go, rust, markdown, yaml, diff
//   These are loaded dynamically when a code block with that language is first
//   encountered. The lazy import is triggered by the CodeBlockComponent when
//   it detects an unregistered language.
//
// Consumers can still register additional languages via:
//   import ruby from 'highlight.js/lib/languages/ruby';
//   lowlight.register('ruby', ruby);
// ─────────────────────────────────────────────────────────────────────────────

// === CORE TIER: Synchronous imports (always bundled) ===
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import xml from 'highlight.js/lib/languages/xml'; // also covers HTML
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';

/*
 * DESIGN: Dark Mode Craftsman
 * Code block with syntax highlighting and copy button
 * Controls appear inside the code block on hover (top-right corner)
 * No line numbers by default for cleaner look
 * Copy button is icon-only
 * Language selector is next to copy button
 *
 * PERFORMANCE: Lazy-loaded syntax highlighting
 * - Uses IntersectionObserver to defer highlighting until visible
 * - Code blocks outside viewport render as plain text (no lowlight parse)
 * - Highlighting activates when block enters viewport with 200px margin
 * - Once highlighted, stays highlighted (no re-parsing on scroll out)
 * - Extended languages loaded on-demand via dynamic import()
 *
 * BUNDLE: Two-tier language loading
 * - Core: 7 languages always bundled (~40 KB)
 * - Extended: 8 languages lazy-loaded on demand (~44 KB, split into chunks)
 */

const lowlight = createLowlight();

// Register core languages (always available)
lowlight.register('javascript', javascript);
lowlight.register('js', javascript);
lowlight.register('jsx', javascript);
lowlight.register('typescript', typescript);
lowlight.register('ts', typescript);
lowlight.register('tsx', typescript);
lowlight.register('python', python);
lowlight.register('py', python);
lowlight.register('xml', xml);
lowlight.register('html', xml);
lowlight.register('svg', xml);
lowlight.register('css', css);
lowlight.register('json', json);
lowlight.register('bash', bash);
lowlight.register('sh', bash);
lowlight.register('shell', bash);
lowlight.register('zsh', bash);

// === EXTENDED TIER: Lazy-loaded language registry ===
// Maps language aliases to their dynamic import function.
// Each import() creates a separate chunk that's only fetched when needed.
type LazyLanguageLoader = () => Promise<{ default: any }>;

const LAZY_LANGUAGES: Record<string, LazyLanguageLoader> = {
  sql: () => import('highlight.js/lib/languages/sql'),
  java: () => import('highlight.js/lib/languages/java'),
  cpp: () => import('highlight.js/lib/languages/cpp'),
  c: () => import('highlight.js/lib/languages/cpp'),
  go: () => import('highlight.js/lib/languages/go'),
  golang: () => import('highlight.js/lib/languages/go'),
  rust: () => import('highlight.js/lib/languages/rust'),
  rs: () => import('highlight.js/lib/languages/rust'),
  markdown: () => import('highlight.js/lib/languages/markdown'),
  md: () => import('highlight.js/lib/languages/markdown'),
  yaml: () => import('highlight.js/lib/languages/yaml'),
  yml: () => import('highlight.js/lib/languages/yaml'),
  diff: () => import('highlight.js/lib/languages/diff'),
  patch: () => import('highlight.js/lib/languages/diff'),
};

// Track which lazy languages are currently being loaded to avoid duplicate imports
const loadingLanguages = new Set<string>();
// Track which lazy languages have been successfully registered
const registeredLazyLanguages = new Set<string>();

/**
 * Attempt to lazy-load a language if it's in the extended tier.
 * Returns a promise that resolves to true if the language was loaded,
 * false if it's not in the lazy registry.
 */
async function loadLanguageIfNeeded(lang: string): Promise<boolean> {
  // Already registered (core or previously lazy-loaded)
  if (lowlight.registered(lang)) return true;
  
  // Not in lazy registry
  const loader = LAZY_LANGUAGES[lang];
  if (!loader) return false;
  
  // Already loaded via a different alias
  if (registeredLazyLanguages.has(lang)) return true;
  
  // Currently loading (another code block triggered it)
  if (loadingLanguages.has(lang)) {
    // Wait for it to finish
    return new Promise((resolve) => {
      const check = () => {
        if (registeredLazyLanguages.has(lang)) {
          resolve(true);
        } else if (!loadingLanguages.has(lang)) {
          resolve(false); // Loading failed
        } else {
          setTimeout(check, 50);
        }
      };
      setTimeout(check, 50);
    });
  }
  
  loadingLanguages.add(lang);
  try {
    const mod = await loader();
    const definition = mod.default;
    lowlight.register(lang, definition);
    registeredLazyLanguages.add(lang);
    
    // Also register common aliases for the same language
    const aliasGroups: string[][] = [
      ['cpp', 'c'],
      ['go', 'golang'],
      ['rust', 'rs'],
      ['markdown', 'md'],
      ['yaml', 'yml'],
      ['diff', 'patch'],
    ];
    for (const group of aliasGroups) {
      if (group.includes(lang)) {
        for (const alias of group) {
          if (alias !== lang && !lowlight.registered(alias)) {
            lowlight.register(alias, definition);
            registeredLazyLanguages.add(alias);
          }
        }
      }
    }
    
    return true;
  } catch (err) {
    console.warn(`Failed to lazy-load highlight.js language: ${lang}`, err);
    return false;
  } finally {
    loadingLanguages.delete(lang);
  }
}

// Export lowlight so consumers can register additional languages
export { lowlight, loadLanguageIfNeeded };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CodeBlockComponent({ node, updateAttributes, extension }: any) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [languageReady, setLanguageReady] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const currentLanguage = node.attrs.language || 'plaintext';
  
  // Lazy-load: Use IntersectionObserver to detect when code block enters viewport
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    
    // If already visible, no need to observe
    if (isVisible) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once visible, stop observing — highlighting persists
            observer.unobserve(el);
          }
        }
      },
      {
        // Start highlighting 200px before the block enters viewport
        rootMargin: '200px 0px',
        threshold: 0,
      }
    );
    
    observer.observe(el);
    
    return () => {
      observer.disconnect();
    };
  }, [isVisible]);
  
  // Lazy-load extended language when code block becomes visible or language changes
  useEffect(() => {
    if (!isVisible) return;
    if (currentLanguage === 'plaintext') return;
    
    // Check if language is already registered
    if (lowlight.registered(currentLanguage)) {
      setLanguageReady(true);
      return;
    }
    
    // Check if it's a lazy-loadable language
    if (LAZY_LANGUAGES[currentLanguage]) {
      setLanguageReady(false);
      loadLanguageIfNeeded(currentLanguage).then((loaded) => {
        setLanguageReady(loaded);
      });
    }
  }, [isVisible, currentLanguage]);
  
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(node.textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [node.textContent]);

  // Get the list of supported languages (core + any lazy-loaded ones)
  // Also include all lazy language names so they appear in the dropdown
  const coreLanguages: string[] = extension.options.lowlight?.listLanguages?.() || [];
  const allLanguages = Array.from(new Set([...coreLanguages, ...Object.keys(LAZY_LANGUAGES)])).sort();
  
  const languageLabel = currentLanguage === 'plaintext' 
    ? 'Plain Text' 
    : currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1);

  return (
    <NodeViewWrapper className="code-block-wrapper" ref={wrapperRef}>
      {/* Controls overlay - appears on hover, positioned inside top-right */}
      <div className="code-block-controls" contentEditable={false}>
        <div className="code-block-language-wrapper">
          <select
            value={currentLanguage}
            onChange={(e) => updateAttributes({ language: e.target.value })}
            className="code-block-language-select"
          >
            <option value="plaintext">Plain Text</option>
            {allLanguages.map((lang: string) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
          <span className="code-block-language-label">{languageLabel}</span>
          <ChevronDown size={12} className="code-block-language-chevron" />
        </div>
        <button
          type="button"
          onClick={copyToClipboard}
          className={`code-block-copy-btn ${copied ? 'copied' : ''}`}
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      
      {/* Code content - no line numbers */}
      {/* When not yet visible or language not ready, render without syntax highlighting */}
      <pre className={`code-block-pre ${(!isVisible || !languageReady) ? 'code-block-deferred' : ''}`}>
        <NodeViewContent className={(isVisible && languageReady) ? `language-${currentLanguage}` : 'language-plaintext'} />
      </pre>
    </NodeViewWrapper>
  );
}

export const CodeBlockWithFeatures = CodeBlockLowlight
  .configure({
    lowlight,
    defaultLanguage: 'plaintext',
    HTMLAttributes: {
      class: 'code-block',
    },
  })
  .extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlockComponent);
    },
    addKeyboardShortcuts() {
      const parentShortcuts = this.parent?.() ?? {};
      return {
        ...parentShortcuts,
        'Mod-Alt-c': () => toggleCodeBlockMerged(this.editor),
      };
    },
  });

/**
 * Helper: toggle code block for multi-block selections.
 *
 * When the selection spans multiple blocks (paragraphs, headings, etc.),
 * the default TipTap `toggleCodeBlock` converts each block individually,
 * producing multiple code blocks. This helper instead collects all text
 * from the selected blocks, joins with newlines, and replaces the range
 * with a single code block.
 *
 * For single-block or collapsed selections, it falls back to the default
 * `toggleCodeBlock` command.
 */
export function toggleCodeBlockMerged(editor: any): boolean {
  // Read the selection from ProseMirror state (preserved even when DOM is blurred)
  const { state } = editor;
  const { from, to, empty } = state.selection;

  // If already inside a code block, just toggle off
  if (editor.isActive('codeBlock')) {
    return editor.chain().focus().toggleCodeBlock().run();
  }

  // For collapsed cursor, use default behavior
  if (empty) {
    return editor.chain().focus().toggleCodeBlock().run();
  }

  // Count textblock nodes in the selection to detect multi-block
  let textblockCount = 0;
  const lines: string[] = [];
  state.doc.nodesBetween(from, to, (node: any) => {
    if (node.isTextblock) {
      textblockCount++;
      lines.push(node.textContent);
      return false; // don't descend into inline children
    }
    return true;
  });

  // Single-block selection: use default behavior
  if (textblockCount <= 1) {
    return editor.chain().focus().toggleCodeBlock().run();
  }

  // Multi-block selection: merge all text into a single code block
  const text = lines.join('\n');
  const codeBlockType = state.schema.nodes.codeBlock;

  // Expand to cover the full blocks — resolve depth dynamically
  const $from = state.doc.resolve(from);
  const $to = state.doc.resolve(to);
  // Find the outermost block ancestor for each end of the selection
  const fromDepth = Math.max(1, $from.depth);
  const toDepth = Math.max(1, $to.depth);
  const rangeFrom = $from.before(fromDepth);
  const rangeTo = $to.after(toDepth);

  return editor
    .chain()
    .focus()
    .command(({ tr }: { tr: any }) => {
      const codeBlock = codeBlockType.create(
        { language: null },
        text ? state.schema.text(text) : undefined,
      );
      tr.replaceWith(rangeFrom, rangeTo, codeBlock);
      return true;
    })
    .run();
}
