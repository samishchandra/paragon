import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';
// Plugin/PluginKey/TextSelection/EditorView removed — handleKeyDown moved to InputDispatcher

// ─── Highlight.js Language Loading Strategy ─────────────────────────────────
//
// ALL languages are lazy-loaded on demand for optimal bundle performance.
// No highlight.js grammars are included in the initial bundle. Languages are
// loaded when a code block first becomes visible in the viewport.
//
// CORE TIER (lazy-loaded on first code block render, ~40 KB total):
//   javascript, typescript, python, xml/html, css, json, bash
//   These are the most commonly used languages and load first.
//
// EXTENDED TIER (lazy-loaded on demand, ~44 KB total):
//   sql, java, cpp/c, go, rust, markdown, yaml, diff
//   These load when a code block with that language is first encountered.
//
// Consumers can still register additional languages via:
//   import ruby from 'highlight.js/lib/languages/ruby';
//   lowlight.register('ruby', ruby);
// ─────────────────────────────────────────────────────────────────────────────

/*
 * DESIGN: Dark Mode Craftsman
 * Code block with syntax highlighting and copy button
 * Controls appear inside the code block on hover (top-right corner)
 * No line numbers by default for cleaner look
 * Copy button is icon-only
 * Language selector is next to copy button
 *
 * PERFORMANCE: Fully lazy-loaded syntax highlighting
 * - Uses IntersectionObserver to defer highlighting until visible
 * - Code blocks outside viewport render as plain text (no lowlight parse)
 * - Highlighting activates when block enters viewport with 200px margin
 * - Once highlighted, stays highlighted (no re-parsing on scroll out)
 * - ALL languages (core + extended) loaded on-demand via dynamic import()
 * - Documents with no code blocks load zero highlight.js grammars (~200KB saved)
 *
 * BUNDLE: All-lazy language loading
 * - Core: 7 languages loaded on first code block render (~40 KB)
 * - Extended: 8 languages loaded on demand (~44 KB, split into chunks)
 */

const lowlight = createLowlight();

// === ALL LANGUAGES: Lazy-loaded on demand ===
// Maps language aliases to their dynamic import function.
// Each import() creates a separate chunk that's only fetched when needed.
// Core languages (javascript, typescript, python, xml, css, json, bash) are
// loaded eagerly when the first code block becomes visible, but NOT at module
// initialization time.
type LazyLanguageLoader = () => Promise<{ default: any }>;

// Core tier loaders — loaded on first code block visibility
const CORE_LANGUAGE_LOADERS: Record<string, LazyLanguageLoader> = {
  javascript: () => import('highlight.js/lib/languages/javascript'),
  typescript: () => import('highlight.js/lib/languages/typescript'),
  python: () => import('highlight.js/lib/languages/python'),
  xml: () => import('highlight.js/lib/languages/xml'),
  css: () => import('highlight.js/lib/languages/css'),
  json: () => import('highlight.js/lib/languages/json'),
  bash: () => import('highlight.js/lib/languages/bash'),
};

// Alias mapping: alias → canonical name (for core languages)
const CORE_ALIASES: Record<string, string> = {
  js: 'javascript', jsx: 'javascript',
  ts: 'typescript', tsx: 'typescript',
  py: 'python',
  html: 'xml', svg: 'xml',
  sh: 'bash', shell: 'bash', zsh: 'bash',
};

// Extended tier loaders — loaded individually on demand
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

// Track whether core languages have been loaded
let coreLanguagesLoaded = false;
let coreLanguagesLoading: Promise<void> | null = null;

/**
 * Load all core languages in parallel. Called once when the first code block
 * becomes visible. Subsequent calls are no-ops.
 */
async function loadCoreLanguages(): Promise<void> {
  if (coreLanguagesLoaded) return;
  if (coreLanguagesLoading) return coreLanguagesLoading;
  
  coreLanguagesLoading = (async () => {
    try {
      const entries = Object.entries(CORE_LANGUAGE_LOADERS);
      const results = await Promise.all(
        entries.map(async ([name, loader]) => {
          const mod = await loader();
          return [name, mod.default] as const;
        })
      );
      
      // Register each core language and its aliases
      for (const [name, definition] of results) {
        if (!lowlight.registered(name)) {
          lowlight.register(name, definition);
        }
      }
      
      // Register all core aliases
      for (const [alias, canonical] of Object.entries(CORE_ALIASES)) {
        if (!lowlight.registered(alias)) {
          // Find the definition from the loaded results
          const entry = results.find(([n]) => n === canonical);
          if (entry) {
            lowlight.register(alias, entry[1]);
          }
        }
      }
      
      coreLanguagesLoaded = true;
    } catch (err) {
      console.warn('Failed to load core highlight.js languages:', err);
      coreLanguagesLoading = null; // Allow retry
    }
  })();
  
  return coreLanguagesLoading;
}

/**
 * Attempt to lazy-load a language if it's in the core or extended tier.
 * Returns a promise that resolves to true if the language was loaded,
 * false if it's not in any registry.
 */
async function loadLanguageIfNeeded(lang: string): Promise<boolean> {
  // Already registered (previously lazy-loaded)
  if (lowlight.registered(lang)) return true;
  
  // Check if it's a core language or alias — load all core languages together
  if (CORE_LANGUAGE_LOADERS[lang] || CORE_ALIASES[lang]) {
    await loadCoreLanguages();
    return lowlight.registered(lang);
  }
  
  // Check extended tier
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
export { lowlight, loadLanguageIfNeeded, loadCoreLanguages };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CodeBlockComponent({ node, updateAttributes, extension }: any) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [languageReady, setLanguageReady] = useState(false);
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
  
  // Lazy-load languages when code block becomes visible or language changes.
  // Core languages are loaded in parallel on first visibility; extended languages
  // are loaded individually on demand.
  useEffect(() => {
    if (!isVisible) return;
    if (currentLanguage === 'plaintext') {
      setLanguageReady(true);
      return;
    }
    
    // Check if language is already registered
    if (lowlight.registered(currentLanguage)) {
      setLanguageReady(true);
      return;
    }
    
    // Load via unified loader (handles core + extended)
    setLanguageReady(false);
    loadLanguageIfNeeded(currentLanguage).then((loaded) => {
      setLanguageReady(loaded || currentLanguage === 'plaintext');
    });
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

  // Performance (R8): Memoize the language list to avoid rebuilding on every render.
  // The list only changes when new languages are registered (rare, after lazy-load).
  const allLanguages = useMemo(() => {
    const coreLanguages: string[] = extension.options.lowlight?.listLanguages?.() || [];
    return Array.from(new Set([...coreLanguages, ...Object.keys(LAZY_LANGUAGES)])).sort();
    // languageReady is included as a dependency so the list updates after a lazy-load completes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extension.options.lowlight, languageReady]);
  
  const languageLabel = useMemo(
    () => currentLanguage === 'plaintext' 
      ? 'Plain Text' 
      : currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1),
    [currentLanguage]
  );

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
      return ReactNodeViewRenderer(CodeBlockComponent, {
        update: ({ oldNode, newNode, updateProps }) => {
          // Performance: Skip React re-render when only cursor position changed.
          // Only re-render when the code block's language or text content changes.
          // NodeViewContent handles content rendering via ProseMirror, so we only
          // need React to re-render for language changes (which affect the UI controls).
          const languageChanged = oldNode.attrs.language !== newNode.attrs.language;
          const contentChanged = !oldNode.content.eq(newNode.content);
          if (languageChanged || contentChanged) {
            updateProps();
          }
          return true;
        },
      });
    },
    addKeyboardShortcuts() {
      const parentShortcuts = this.parent?.() ?? {};
      return {
        ...parentShortcuts,
        'Mod-Alt-c': () => toggleCodeBlockMerged(this.editor),
      };
    },

    addProseMirrorPlugins() {
      // The ``` + Enter shortcut has been moved to InputDispatcher
      // for consolidated input handling (R6 performance optimization).
      // Only parent plugins (lowlight syntax highlighting) remain.
      const parentPlugins = this.parent?.() ?? [];
      return [...parentPlugins];
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
