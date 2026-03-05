import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import type { EditorView, NodeView } from '@tiptap/pm/view';

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
 * PERFORMANCE (R10): Plain ProseMirror NodeView
 * Replaces ReactNodeViewRenderer to eliminate React reconciliation overhead.
 * The DOM is built once and updated incrementally via the `update()` method.
 *
 * Features preserved:
 * - Language selector dropdown (<select> with all core + extended languages)
 * - Copy-to-clipboard button with "Copied!" feedback
 * - IntersectionObserver for lazy highlighting
 * - Language lazy-loading (core + extended)
 * - All CSS classes match the previous React output
 * - Inline SVG icons (Copy, Check, ChevronDown) replace Lucide React components
 */

const lowlight = createLowlight();

// === ALL LANGUAGES: Lazy-loaded on demand ===
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
      
      for (const [name, definition] of results) {
        if (!lowlight.registered(name)) {
          lowlight.register(name, definition);
        }
      }
      
      for (const [alias, canonical] of Object.entries(CORE_ALIASES)) {
        if (!lowlight.registered(alias)) {
          const entry = results.find(([n]) => n === canonical);
          if (entry) {
            lowlight.register(alias, entry[1]);
          }
        }
      }
      
      coreLanguagesLoaded = true;
    } catch (err) {
      console.warn('Failed to load core highlight.js languages:', err);
      coreLanguagesLoading = null;
    }
  })();
  
  return coreLanguagesLoading;
}

/**
 * Attempt to lazy-load a language if it's in the core or extended tier.
 */
async function loadLanguageIfNeeded(lang: string): Promise<boolean> {
  if (lowlight.registered(lang)) return true;
  
  if (CORE_LANGUAGE_LOADERS[lang] || CORE_ALIASES[lang]) {
    await loadCoreLanguages();
    return lowlight.registered(lang);
  }
  
  const loader = LAZY_LANGUAGES[lang];
  if (!loader) return false;
  
  if (registeredLazyLanguages.has(lang)) return true;
  
  if (loadingLanguages.has(lang)) {
    return new Promise((resolve) => {
      const check = () => {
        if (registeredLazyLanguages.has(lang)) {
          resolve(true);
        } else if (!loadingLanguages.has(lang)) {
          resolve(false);
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

export { lowlight, loadLanguageIfNeeded, loadCoreLanguages };

// ─── SVG Icons (inline, matching Lucide's output) ──────────────────────────

const SVG_NS = 'http://www.w3.org/2000/svg';

function createSvgIcon(paths: string[], size: number, className?: string): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  if (className) svg.setAttribute('class', className);
  for (const d of paths) {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    svg.appendChild(path);
  }
  return svg;
}

// Lucide "copy" icon paths
const COPY_PATHS = [
  'M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Z',
  'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
];
// Lucide "check" icon paths
const CHECK_PATHS = ['M20 6 9 17l-5-5'];
// Lucide "chevron-down" icon paths
const CHEVRON_DOWN_PATHS = ['m6 9 6 6 6-6'];

// ─── Memoized language list ────────────────────────────────────────────────

let cachedAllLanguages: string[] | null = null;

function getAllLanguages(): string[] {
  // Rebuild when new languages are registered (rare)
  // For simplicity, we always rebuild — the Set dedup + sort is fast (<1ms)
  const registered = lowlight.listLanguages();
  const all = Array.from(new Set([...registered, ...Object.keys(LAZY_LANGUAGES)])).sort();
  cachedAllLanguages = all;
  return all;
}

// ─── Plain ProseMirror NodeView ────────────────────────────────────────────

class CodeBlockNodeView implements NodeView {
  node: ProseMirrorNode;
  view: EditorView;
  getPos: () => number | undefined;
  dom: HTMLElement;
  contentDOM: HTMLElement;

  // Internal state
  private isVisible = false;
  private languageReady = false;
  private copied = false;
  private copiedTimeout: ReturnType<typeof setTimeout> | null = null;
  private observer: IntersectionObserver | null = null;

  // DOM references for incremental updates
  private selectEl: HTMLSelectElement;
  private labelEl: HTMLSpanElement;
  private copyBtn: HTMLButtonElement;
  private preEl: HTMLPreElement;
  private codeEl: HTMLElement;

  constructor(node: ProseMirrorNode, view: EditorView, getPos: () => number | undefined) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;

    const currentLanguage = node.attrs.language || 'plaintext';

    // Build DOM structure matching the React output exactly
    // Outer wrapper
    this.dom = document.createElement('div');
    this.dom.className = 'code-block-wrapper';
    this.dom.setAttribute('data-node-view-wrapper', '');

    // Controls overlay (contentEditable=false to prevent editing)
    const controls = document.createElement('div');
    controls.className = 'code-block-controls';
    controls.contentEditable = 'false';

    // Language wrapper
    const langWrapper = document.createElement('div');
    langWrapper.className = 'code-block-language-wrapper';

    // Language select (invisible, overlays the label)
    this.selectEl = document.createElement('select');
    this.selectEl.className = 'code-block-language-select';
    this.selectEl.value = currentLanguage;
    this.populateLanguageOptions(currentLanguage);
    this.selectEl.addEventListener('change', this.handleLanguageChange);

    // Language label (visible text)
    this.labelEl = document.createElement('span');
    this.labelEl.className = 'code-block-language-label';
    this.labelEl.textContent = this.formatLanguageLabel(currentLanguage);

    // Chevron icon
    const chevron = createSvgIcon(CHEVRON_DOWN_PATHS, 12, 'code-block-language-chevron');

    langWrapper.appendChild(this.selectEl);
    langWrapper.appendChild(this.labelEl);
    langWrapper.appendChild(chevron);

    // Copy button
    this.copyBtn = document.createElement('button');
    this.copyBtn.type = 'button';
    this.copyBtn.className = 'code-block-copy-btn';
    this.copyBtn.title = 'Copy code';
    this.copyBtn.appendChild(createSvgIcon(COPY_PATHS, 14));
    this.copyBtn.addEventListener('click', this.handleCopy);

    controls.appendChild(langWrapper);
    controls.appendChild(this.copyBtn);

    // Pre > code (contentDOM is the <code> element where ProseMirror renders text)
    this.preEl = document.createElement('pre');
    this.preEl.className = 'code-block-pre code-block-deferred';

    this.codeEl = document.createElement('code');
    this.codeEl.className = 'language-plaintext';
    this.preEl.appendChild(this.codeEl);

    // contentDOM tells ProseMirror where to render the node's text content
    this.contentDOM = this.codeEl;

    this.dom.appendChild(controls);
    this.dom.appendChild(this.preEl);

    // Set up IntersectionObserver for lazy highlighting
    this.setupVisibilityObserver();
  }

  // ── Language select ──

  private populateLanguageOptions(currentLanguage: string) {
    // Clear existing options
    this.selectEl.innerHTML = '';

    const plainOpt = document.createElement('option');
    plainOpt.value = 'plaintext';
    plainOpt.textContent = 'Plain Text';
    this.selectEl.appendChild(plainOpt);

    const allLangs = getAllLanguages();
    for (const lang of allLangs) {
      const opt = document.createElement('option');
      opt.value = lang;
      opt.textContent = lang.charAt(0).toUpperCase() + lang.slice(1);
      this.selectEl.appendChild(opt);
    }

    this.selectEl.value = currentLanguage;
  }

  private formatLanguageLabel(lang: string): string {
    return lang === 'plaintext'
      ? 'Plain Text'
      : lang.charAt(0).toUpperCase() + lang.slice(1);
  }

  private handleLanguageChange = () => {
    const newLang = this.selectEl.value;
    const pos = this.getPos();
    if (pos == null) return;
    
    // Update the node attribute via a ProseMirror transaction
    this.view.dispatch(
      this.view.state.tr.setNodeMarkup(pos, undefined, {
        ...this.node.attrs,
        language: newLang,
      })
    );
  };

  // ── Copy button ──

  private handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(this.node.textContent);
      this.setCopiedState(true);
      if (this.copiedTimeout) clearTimeout(this.copiedTimeout);
      this.copiedTimeout = setTimeout(() => this.setCopiedState(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  private setCopiedState(copied: boolean) {
    this.copied = copied;
    this.copyBtn.className = `code-block-copy-btn${copied ? ' copied' : ''}`;
    this.copyBtn.title = copied ? 'Copied!' : 'Copy code';
    // Replace icon
    this.copyBtn.innerHTML = '';
    this.copyBtn.appendChild(
      copied
        ? createSvgIcon(CHECK_PATHS, 14)
        : createSvgIcon(COPY_PATHS, 14)
    );
  }

  // ── Lazy visibility / language loading ──

  private setupVisibilityObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.isVisible = true;
            this.observer?.unobserve(this.dom);
            this.observer?.disconnect();
            this.observer = null;
            this.onBecameVisible();
          }
        }
      },
      { rootMargin: '200px 0px', threshold: 0 }
    );
    this.observer.observe(this.dom);
  }

  private async onBecameVisible() {
    const lang = this.node.attrs.language || 'plaintext';
    if (lang === 'plaintext') {
      this.setLanguageReady(true);
      return;
    }
    if (lowlight.registered(lang)) {
      this.setLanguageReady(true);
      return;
    }
    const loaded = await loadLanguageIfNeeded(lang);
    this.setLanguageReady(loaded || lang === 'plaintext');
    // Repopulate options in case new languages were registered
    this.populateLanguageOptions(lang);
  }

  private setLanguageReady(ready: boolean) {
    this.languageReady = ready;
    const lang = this.node.attrs.language || 'plaintext';
    
    if (this.isVisible && ready) {
      this.preEl.className = 'code-block-pre';
      this.codeEl.className = `language-${lang}`;
    } else {
      this.preEl.className = 'code-block-pre code-block-deferred';
      this.codeEl.className = 'language-plaintext';
    }
  }

  // ── ProseMirror NodeView interface ──

  update(node: ProseMirrorNode): boolean {
    // Reject if node type changed (ProseMirror will destroy and recreate)
    if (node.type !== this.node.type) return false;

    const oldLang = this.node.attrs.language || 'plaintext';
    const newLang = node.attrs.language || 'plaintext';
    this.node = node;

    if (oldLang !== newLang) {
      // Language changed — update label, select, and CSS class
      this.labelEl.textContent = this.formatLanguageLabel(newLang);
      this.selectEl.value = newLang;

      if (newLang === 'plaintext') {
        this.setLanguageReady(true);
      } else if (lowlight.registered(newLang)) {
        this.setLanguageReady(true);
      } else if (this.isVisible) {
        // Need to lazy-load the new language
        this.setLanguageReady(false);
        loadLanguageIfNeeded(newLang).then((loaded) => {
          // Only update if language hasn't changed again
          if ((this.node.attrs.language || 'plaintext') === newLang) {
            this.setLanguageReady(loaded || newLang === 'plaintext');
            this.populateLanguageOptions(newLang);
          }
        });
      }
    }

    // Content changes are handled by ProseMirror via contentDOM — no action needed
    return true;
  }

  selectNode() {
    this.dom.classList.add('ProseMirror-selectednode');
  }

  deselectNode() {
    this.dom.classList.remove('ProseMirror-selectednode');
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.copiedTimeout) {
      clearTimeout(this.copiedTimeout);
      this.copiedTimeout = null;
    }
    this.selectEl.removeEventListener('change', this.handleLanguageChange);
    this.copyBtn.removeEventListener('click', this.handleCopy);
  }

  // Let ProseMirror handle mutations inside the <code> contentDOM
  ignoreMutation(mutation: MutationRecord | { type: 'selection'; target: globalThis.Node }): boolean {
    // Ignore mutations inside the controls (non-editable area)
    if (!this.contentDOM.contains(mutation.target)) {
      return true;
    }
    return false;
  }

  stopEvent(event: Event): boolean {
    // Stop events from the controls area (select, button) from reaching ProseMirror
    const target = event.target as HTMLElement;
    if (target && !this.contentDOM.contains(target) && this.dom.contains(target)) {
      return true;
    }
    return false;
  }
}

// ─── Extension Definition ──────────────────────────────────────────────────

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
      return ({ node, view, getPos }) => {
        return new CodeBlockNodeView(node, view, getPos as () => number | undefined);
      };
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
  const { state } = editor;
  const { from, to, empty } = state.selection;

  if (editor.isActive('codeBlock')) {
    return editor.chain().focus().toggleCodeBlock().run();
  }

  if (empty) {
    return editor.chain().focus().toggleCodeBlock().run();
  }

  let textblockCount = 0;
  const lines: string[] = [];
  state.doc.nodesBetween(from, to, (node: any) => {
    if (node.isTextblock) {
      textblockCount++;
      lines.push(node.textContent);
      return false;
    }
    return true;
  });

  if (textblockCount <= 1) {
    return editor.chain().focus().toggleCodeBlock().run();
  }

  const text = lines.join('\n');
  const codeBlockType = state.schema.nodes.codeBlock;

  const $from = state.doc.resolve(from);
  const $to = state.doc.resolve(to);
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
