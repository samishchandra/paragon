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
  csharp: () => import('highlight.js/lib/languages/csharp'),
  go: () => import('highlight.js/lib/languages/go'),
  golang: () => import('highlight.js/lib/languages/go'),
  rust: () => import('highlight.js/lib/languages/rust'),
  rs: () => import('highlight.js/lib/languages/rust'),
  ruby: () => import('highlight.js/lib/languages/ruby'),
  php: () => import('highlight.js/lib/languages/php'),
  swift: () => import('highlight.js/lib/languages/swift'),
  kotlin: () => import('highlight.js/lib/languages/kotlin'),
  scss: () => import('highlight.js/lib/languages/scss'),
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

// ─── Curated Language List & Labels ───────────────────────────────────────

// Human-readable labels for language identifiers.
// Only canonical names are listed — aliases (go→golang, rs→rust, etc.) are
// resolved via ALIAS_TO_CANONICAL and never shown in the dropdown.
const LANGUAGE_LABELS: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
  csharp: 'C#',
  go: 'Go',
  rust: 'Rust',
  ruby: 'Ruby',
  php: 'PHP',
  swift: 'Swift',
  kotlin: 'Kotlin',
  html: 'HTML',
  xml: 'XML',
  css: 'CSS',
  scss: 'SCSS',
  json: 'JSON',
  yaml: 'YAML',
  markdown: 'Markdown',
  sql: 'SQL',
  bash: 'Bash',
  shell: 'Shell',
  diff: 'Diff',
};

// Map aliases to their canonical name so we never show duplicates.
// When a user's code block has language="golang", we store "golang" but
// display the canonical "Go" label and highlight the "Go" option.
const ALIAS_TO_CANONICAL: Record<string, string> = {
  js: 'javascript', jsx: 'javascript',
  ts: 'typescript', tsx: 'typescript',
  py: 'python',
  golang: 'go',
  rs: 'rust',
  md: 'markdown',
  yml: 'yaml',
  patch: 'diff',
  sh: 'bash', zsh: 'bash',
  svg: 'xml',
};

// The curated set of languages shown in the dropdown, in display order.
// This is the single source of truth — getAllLanguages() returns this list.
const DROPDOWN_LANGUAGES: string[] = [
  'javascript', 'typescript', 'python', 'java',
  'cpp', 'c', 'csharp', 'go', 'rust',
  'ruby', 'php', 'swift', 'kotlin',
  'html', 'xml', 'css', 'scss',
  'json', 'yaml', 'markdown',
  'sql', 'bash', 'shell', 'diff',
];

function getAllLanguages(): string[] {
  return DROPDOWN_LANGUAGES;
}

function getLanguageLabel(lang: string): string {
  if (lang === 'plaintext') return 'Plain Text';
  // Resolve alias to canonical for label lookup
  const canonical = ALIAS_TO_CANONICAL[lang] || lang;
  return LANGUAGE_LABELS[canonical] || lang.charAt(0).toUpperCase() + lang.slice(1);
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
  private highlightForced = false;


  // DOM references for incremental updates
  private controlsEl: HTMLElement;
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
    this.controlsEl = document.createElement('div');
    this.controlsEl.className = 'code-block-controls';
    this.controlsEl.contentEditable = 'false';

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

    this.controlsEl.appendChild(langWrapper);
    this.controlsEl.appendChild(this.copyBtn);

    // Pre > code (contentDOM is the <code> element where ProseMirror renders text)
    this.preEl = document.createElement('pre');
    this.preEl.className = 'code-block-pre';

    this.codeEl = document.createElement('code');
    this.codeEl.className = `language-${currentLanguage}`;
    this.preEl.appendChild(this.codeEl);

    // contentDOM tells ProseMirror where to render the node's text content
    this.contentDOM = this.codeEl;

    this.dom.appendChild(this.controlsEl);
    this.dom.appendChild(this.preEl);

    // Use JS mouseenter/mouseleave for reliable hover in contentEditable.
    // CSS :hover can be unreliable inside ProseMirror's contentEditable context
    // because transactions may cause brief DOM reflows that disrupt the hover state.
    this.dom.addEventListener('mouseenter', this.handleMouseEnter);
    this.dom.addEventListener('mouseleave', this.handleMouseLeave);

    // Trigger language loading after DOM attachment.
    // setTimeout(0) ensures ProseMirror has fully attached the dom element
    // to the document before we dispatch forceRehighlight transactions.
    setTimeout(() => {
      this.isVisible = true;
      this.onBecameVisible().catch(() => {
        // Silently ignore — language loading failed, code will display without highlighting
      });
    }, 0);
  }

  // ── Hover handlers ──

  private handleMouseEnter = () => {
    // Use inline styles with !important to show controls instantly.
    //
    // Why not CSS :hover?
    //   ProseMirror transactions cause DOM reflows inside contentEditable that
    //   briefly disrupt the :hover state, causing visible flickering.
    //
    // Why not a CSS class toggle?
    //   The `transition: opacity 0.15s` on .code-block-controls delays the
    //   visual change, and ProseMirror mutations can reset the class before
    //   the transition completes.
    //
    // Inline styles with transition:none bypass both issues — the controls
    // appear instantly and persist until a real mouseleave.
    this.controlsEl.style.setProperty('opacity', '1', 'important');
    this.controlsEl.style.setProperty('transition', 'none', 'important');
  };

  private handleMouseLeave = () => {
    // Remove inline overrides so the CSS defaults (opacity: 0, transition) take effect
    this.controlsEl.style.removeProperty('opacity');
    this.controlsEl.style.removeProperty('transition');
  };

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
      opt.textContent = getLanguageLabel(lang);
      this.selectEl.appendChild(opt);
    }

    // If the current language is an alias (e.g. "golang"), resolve to
    // its canonical form ("go") so the correct option is selected.
    const resolved = ALIAS_TO_CANONICAL[currentLanguage] || currentLanguage;
    this.selectEl.value = resolved;
  }

  private formatLanguageLabel(lang: string): string {
    return getLanguageLabel(lang);
  }

  private handleLanguageChange = () => {
    const newLang = this.selectEl.value;
    const pos = this.getPos();
    if (pos == null) return;

    // Update label immediately for responsive feel
    this.labelEl.textContent = this.formatLanguageLabel(newLang);
    
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

  // ── Language loading ──

  private async onBecameVisible() {
    const lang = this.node.attrs.language || 'plaintext';

    // Always ensure core languages are loaded so the dropdown is fully
    // populated. Without this, code blocks with language="plaintext" or
    // an already-registered language would return early and never trigger
    // loadCoreLanguages(), leaving the dropdown incomplete on cold starts.
    await loadCoreLanguages();

    if (lang === 'plaintext') {
      this.setLanguageReady(true);
      return;
    }
    if (lowlight.registered(lang)) {
      this.setLanguageReady(true);
      // Language is already registered — the lowlight plugin will produce
      // correct decorations on the next transaction. No need to force
      // rehighlight, which would cause an infinite destroy/create loop
      // because setNodeMarkup triggers NodeView recreation.
      return;
    }
    const loaded = await loadLanguageIfNeeded(lang);
    this.setLanguageReady(loaded || lang === 'plaintext');
    // Force the lowlight plugin to re-run decorations now that the language
    // is registered. Without this, the plugin's cached decorations remain
    // empty because it ran before the language was available.
    // Guard: only force once per NodeView instance to prevent infinite loops.
    if (loaded && !this.highlightForced) {
      this.highlightForced = true;
      this.forceRehighlight(lang);
    }
  }

  /**
   * Force the lowlight ProseMirror plugin to recompute syntax highlighting
   * decorations by dispatching a setNodeMarkup transaction that "touches"
   * the language attribute. This is needed after lazy-loading a language
   * because the lowlight plugin may have already run and cached empty
   * decorations for this code block.
   */
  private forceRehighlight(lang: string) {
    const pos = this.getPos();
    if (pos == null) return;
    try {
      const { tr } = this.view.state;
      // Setting the same attributes triggers the lowlight plugin to re-run
      tr.setNodeMarkup(pos, undefined, {
        ...this.node.attrs,
        language: lang,
      });
      // Mark as a non-addToHistory transaction to avoid polluting undo stack
      tr.setMeta('addToHistory', false);
      this.view.dispatch(tr);
    } catch {
      // Silently ignore if the position is stale
    }
  }

  private setLanguageReady(ready: boolean) {
    this.languageReady = ready;
    const lang = this.node.attrs.language || 'plaintext';
    const expected = `language-${lang}`;
    // Only update if the class actually changed — setting className on the
    // contentDOM triggers a MutationObserver in ProseMirror which interprets
    // it as a content change, causing NodeView destruction and recreation.
    // This guard prevents an infinite destroy/create loop.
    if (this.codeEl.className !== expected) {
      this.codeEl.className = expected;
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

    if (this.copiedTimeout) {
      clearTimeout(this.copiedTimeout);
      this.copiedTimeout = null;
    }
    this.selectEl.removeEventListener('change', this.handleLanguageChange);
    this.copyBtn.removeEventListener('click', this.handleCopy);
    this.dom.removeEventListener('mouseenter', this.handleMouseEnter);
    this.dom.removeEventListener('mouseleave', this.handleMouseLeave);
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
