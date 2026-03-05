# Paragon Editor Performance Analysis Report

**Date:** March 5, 2026
**Scope:** Deep audit of the Paragon Markdown Editor (TipTap/ProseMirror-based) for performance bottlenecks and actionable optimization recommendations.

---

## Executive Summary

The Paragon editor is a feature-rich TipTap-based Markdown editor with approximately **30 custom extensions**, **5 ReactNodeViewRenderers**, **6 decoration plugins**, and a **665 KB library bundle** (ESM). While the architecture includes several thoughtful performance optimizations (debounced `onUpdate`, `useEditorState` selectors, lazy highlight.js language loading, lightweight mode), there are significant opportunities to reduce per-keystroke overhead, minimize React re-renders, and improve perceived startup speed.

This report identifies **17 specific bottlenecks** across four categories and provides prioritized recommendations with estimated impact levels.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Startup Performance](#2-startup-performance)
3. [Per-Keystroke Transaction Pipeline](#3-per-keystroke-transaction-pipeline)
4. [React Rendering Pipeline](#4-react-rendering-pipeline)
5. [Decoration Plugin Performance](#5-decoration-plugin-performance)
6. [Bundle Size Analysis](#6-bundle-size-analysis)
7. [Prioritized Recommendations](#7-prioritized-recommendations)
8. [Quick Wins vs. Deep Investments](#8-quick-wins-vs-deep-investments)

---

## 1. Architecture Overview

### Extension Count

The editor registers a substantial number of extensions, each contributing ProseMirror plugins to the transaction pipeline:

| Category | Count | Examples |
|---|---|---|
| TipTap built-in (via StarterKit) | ~15 | Bold, Italic, History, Gapcursor, Dropcursor |
| TipTap standalone extensions | ~12 | Table, TaskList, Link, Highlight, Typography |
| Custom extensions | ~30 | CollapsibleHeading, CodeBlockWithFeatures, SearchHighlight |
| **Total estimated plugins** | **50-60+** | Each adds `apply()`, `handleKeyDown`, etc. |

Every ProseMirror plugin's `apply()` function runs on **every transaction** (including cursor movements). With 50-60+ plugins, even simple keystrokes trigger a cascade of plugin evaluations.

### ReactNodeViewRenderer Usage

Five node types use `ReactNodeViewRenderer`, which mounts a full React component tree inside ProseMirror's DOM:

| Node | Component | Complexity |
|---|---|---|
| `codeBlock` | `CodeBlockComponent` | Language selector, copy button, syntax highlighting |
| `callout` | `CalloutComponent` | Type dropdown, collapse toggle, portal menu |
| `datePill` | `DatePillComponent` | Date picker popover, formatting logic |
| `tagPill` | `TagPillComponent` | Tag rendering with click handlers |
| `image` | `ResizableImage` | Resize handles, drag, edit overlay |

Each `ReactNodeViewRenderer` instance creates a separate React root. In a document with 20 code blocks, 5 callouts, and 10 images, that is **35 independent React roots** inside ProseMirror's DOM, each with its own reconciliation cycle.

### Event Handler Hooks

| Hook Type | Count | Impact |
|---|---|---|
| `handleTextInput` | 6 | Runs on every character typed |
| `handleKeyDown` | 7 | Runs on every key press |
| `handleDOMEvents` | 5 | Runs on DOM events (paste, drop, etc.) |
| `appendTransaction` | 2 | Runs after every transaction |

ProseMirror iterates these via `someProp()` in array order for every relevant event. Six `handleTextInput` hooks means six function calls per character typed.

---

## 2. Startup Performance

### 2.1 Deferred Content Injection (Good)

The editor already implements deferred content injection via `requestAnimationFrame` → `setTimeout(0)`, which allows the browser to paint the skeleton before the heavy ProseMirror parsing runs. This is a solid pattern.

### 2.2 Extension Instantiation is Eager

All ~45 extensions are instantiated synchronously in `useEditorExtensions` via a single `useMemo`. This means:

- All extension schemas, plugins, and input rules are created upfront
- The `useMemo` dependency array includes 15+ variables, meaning any prop change recreates all extensions
- Extensions like `TableSorting`, `CollapsibleHeading`, `HexColorMark`, and `SearchHighlight` create complex plugin state objects on initialization

**Bottleneck:** For documents that don't use tables, callouts, or code blocks, the corresponding extensions still register their plugins and run `apply()` on every transaction.

### 2.3 CSS Payload

The editor ships two large CSS files:

| File | Lines |
|---|---|
| `editor.css` | 6,514 |
| `editor-colorful.css` | 6,398 |
| **Total** | **12,912** |

Both are loaded eagerly. Only one theme is active at a time, so the inactive theme's CSS is wasted bandwidth and parsing time.

---

## 3. Per-Keystroke Transaction Pipeline

This is the most critical performance path. Every character typed triggers:

1. **DOM input event** → ProseMirror's `handleTextInput` or `readDOMChange`
2. **Transaction creation** → `state.tr` with the text insertion
3. **Plugin `apply()` cascade** → 50-60+ plugins evaluate the transaction
4. **Decoration rebuilds** → 6 decoration plugins check if they need to update
5. **DOM update** → ProseMirror patches the DOM
6. **React reconciliation** → ReactNodeViewRenderers re-render if their node changed
7. **External callbacks** → `onUpdate` fires (debounced at 150ms)

### 3.1 Full-Document Traversals on Every Change

Several decoration plugins perform **full `doc.descendants()` traversals** on every `docChanged` transaction:

| Plugin | Traversal Pattern | When |
|---|---|---|
| `CollapsibleHeading` | 3× `doc.descendants()` (migrateCollapsedIds + buildDecorations) | Every `docChanged` |
| `CollapsibleList` | 1× `doc.descendants()` (buildDecorations) | Every `docChanged` |
| `LinkValidation` | `doc.nodesBetween()` (incremental) | Every `docChanged` |
| `HexColorMark` | Incremental via `changedRanges` | Every `docChanged` |
| `SearchHighlight` | `doc.descendants()` | When search is active + `docChanged` |
| `SelectAllOccurrences` | `doc.descendants()` | When active + `docChanged` |

**CollapsibleHeading is the worst offender**: it calls `doc.descendants()` **three times** on every document change — once in `migrateCollapsedIds()` and twice in `buildDecorations()`. For a 1,000-node document, that is 3,000 node visits per keystroke.

### 3.2 CollapsibleHeading Full Rebuild

```
apply(tr, value, oldState, newState) {
  if (meta || tr.docChanged) {
    if (tr.docChanged && !meta) {
      migrateCollapsedIds(oldState.doc, newState.doc, storage, options.levels);  // doc.descendants() × 2
    }
    return {
      decorations: buildDecorations(newState.doc, storage, options),  // doc.descendants() × 1
    };
  }
}
```

This means typing a single character in a paragraph triggers a full document scan to rebuild all heading decorations, even though no heading changed.

### 3.3 CollapsibleList Full Rebuild

Same pattern as CollapsibleHeading — full `buildDecorations()` on every `docChanged`, even for changes that don't affect any list.

### 3.4 getHTML() in Debounced onUpdate

The `onUpdate` callback calls `editor.getHTML()` which serializes the entire document to HTML. Even though it's debounced at 150ms, this is an O(n) operation that blocks the main thread. For a 10,000-word document, HTML serialization can take 5-15ms.

---

## 4. React Rendering Pipeline

### 4.1 Toolbar Re-render Optimization (Good)

Both `EditorToolbar` and `FloatingToolbar` use `memo()` and `useEditorState` with selectors, which is the recommended TipTap v3 pattern. This prevents re-renders on every transaction and only triggers when the active formatting state actually changes.

### 4.2 MarkdownEditor State Variables

The `MarkdownEditor` component has **15 `useState` calls**. Any state change triggers a re-render of the entire component tree. While the toolbar is memoized, other child components may not be:

- `aiDropdown` state changes
- `imageEditState` changes
- `isLinkPopoverOpen` changes
- `rawSearchMatches` changes (from SearchHighlight)

Each of these can cause the entire editor wrapper to re-render, which in turn may trigger prop changes on child components.

### 4.3 ReactNodeViewRenderer Re-renders

Each `ReactNodeViewRenderer` creates an independent React root. When the node's attributes or content change, the entire React component re-renders. The `CodeBlockComponent` is particularly expensive because:

- It renders a `<select>` with 26 language options
- It includes hover-triggered controls (copy button, language selector)
- Syntax highlighting runs through lowlight on every content change

### 4.4 Word Count Hook

The `useWordCount` hook is well-debounced (500ms) and skips if text hasn't changed. However, it calls `editor.getText()` which is another full document serialization. Combined with the debounced `getHTML()` in `onUpdate`, the editor performs **two full document serializations** within 500ms of any change.

---

## 5. Decoration Plugin Performance

### 5.1 Incremental vs. Full Rebuild

| Plugin | Strategy | Rating |
|---|---|---|
| `HexColorMark` | Incremental (changedRanges + map) | Excellent |
| `LinkValidation` | Incremental (nodesBetween changed range) | Good |
| `SearchHighlight` | Full rebuild when active | Acceptable (only when searching) |
| `CollapsibleHeading` | **Full rebuild on every docChanged** | **Poor** |
| `CollapsibleList` | **Full rebuild on every docChanged** | **Poor** |
| `SelectAllOccurrences` | Full rebuild when active | Acceptable (only when active) |

The `HexColorMark` extension is the gold standard — it maps existing decorations through the transaction, computes changed ranges, removes stale decorations in those ranges, and adds new ones. This is O(changed) instead of O(document).

`CollapsibleHeading` and `CollapsibleList` should adopt the same incremental pattern.

### 5.2 Decoration Widget DOM Creation

`CollapsibleHeading` creates chevron widgets via `Decoration.widget()` with a DOM factory function. Each time decorations are rebuilt, new DOM elements are created. ProseMirror compares widgets by identity, so even identical widgets are recreated, causing unnecessary DOM mutations.

---

## 6. Bundle Size Analysis

### 6.1 Library Bundle

| File | Size |
|---|---|
| `paragon.js` (ESM) | 665 KB |
| `paragon.umd.cjs` | 486 KB |
| `paragon.css` | 215 KB |
| `marked.esm` chunk | 51 KB |
| `turndown` chunk | 16 KB |
| **Total shipped** | **~1.4 MB** |

### 6.2 highlight.js

The `highlight.js` package is 7.9 MB on disk. The editor correctly uses dynamic imports for most languages, but eagerly loads 8 core languages:

- javascript, typescript, python, css, html/xml, json, bash, diff

Each language grammar is ~10-30 KB. The core `highlight.js` library itself is ~100 KB. This is loaded even if the document has no code blocks.

### 6.3 lucide-react

The `lucide-react` package is **33 MB** on disk. While Vite tree-shakes unused icons, the TypeScript compilation and IDE performance suffer from the massive type definitions. The editor imports icons from `lucide-react` in multiple files.

### 6.4 date-fns

The `date-fns` package is **33 MB** on disk. It's used by the `DatePill` extension. Tree-shaking should handle this, but it's worth verifying that only the used functions are bundled.

### 6.5 Duplicate CSS Themes

Two complete CSS files (6,500+ lines each) are shipped. The consumer loads both but only uses one at a time. This doubles the CSS parsing cost.

---

## 7. Prioritized Recommendations

### Priority 1: High Impact, Low Effort (Quick Wins)

#### R1. Make CollapsibleHeading Incremental
**Impact: High | Effort: Medium**

Convert `CollapsibleHeading` from full-rebuild to incremental decoration updates using the same pattern as `HexColorMark`:

```typescript
apply(tr, value, oldState, newState) {
  if (!tr.docChanged) {
    return { ...value, decorations: value.decorations.map(tr.mapping, tr.doc) };
  }
  // Only rebuild decorations in changed ranges
  let decorations = value.decorations.map(tr.mapping, tr.doc);
  const changedRanges = getChangedRanges(tr);
  for (const range of changedRanges) {
    decorations = decorations.remove(decorations.find(range.from, range.to));
    const newDecos = buildDecorationsInRange(newState.doc, range.from, range.to, storage, options);
    decorations = decorations.add(newState.doc, newDecos);
  }
  return { ...value, decorations, docVersion: value.docVersion + 1 };
}
```

This eliminates 3× `doc.descendants()` calls per keystroke. For a 500-heading document, this saves ~1,500 node visits per character typed.

#### R2. Make CollapsibleList Incremental
**Impact: High | Effort: Medium**

Same approach as R1. Convert `buildDecorations()` to only scan changed ranges.

#### R3. Lazy-Load highlight.js Core
**Impact: Medium | Effort: Low**

Currently, 8 language grammars are eagerly imported. Move them to dynamic imports that load on first code block focus:

```typescript
// Before (eager)
import javascript from 'highlight.js/lib/languages/javascript';

// After (lazy)
const CORE_LANGUAGES = {
  javascript: () => import('highlight.js/lib/languages/javascript'),
  // ...
};
```

The lowlight library already supports `registerLanguage()` at runtime. This saves ~200 KB from the initial bundle.

#### R4. Conditional Extension Registration
**Impact: Medium | Effort: Low**

For documents that don't contain certain node types, skip registering the corresponding plugins. This can be done by checking the initial content:

```typescript
const hasCodeBlocks = initialContent?.includes('<pre>') || initialContent?.includes('```');
const hasTables = initialContent?.includes('<table>');

// Only register if needed (or register lazily on first use)
if (hasCodeBlocks) extensions.push(CodeBlockWithFeatures);
if (hasTables) extensions.push(Table, TableRow, TableCell, TableHeader, TableSorting);
```

This reduces the plugin count for simple documents from ~60 to ~30.

### Priority 2: Medium Impact, Medium Effort

#### R5. Consolidate handleTextInput Hooks
**Impact: Medium | Effort: Medium**

Six separate `handleTextInput` hooks means six function calls per character. Merge them into a single plugin with a dispatcher:

```typescript
// Single plugin that handles all text input concerns
handleTextInput(view, from, to, text) {
  if (isInsideCodeBlock(view.state, from)) return false;
  if (isBacktickShortcut(text, from, view)) return handleCodeBlockShortcut(...);
  if (isLinkBoundary(view.state, from)) return handleLinkBoundary(...);
  // ... etc
  return false;
}
```

#### R6. Consolidate handleKeyDown Hooks
**Impact: Medium | Effort: Medium**

Same as R5 but for the 7 `handleKeyDown` hooks. A single dispatcher reduces the overhead of ProseMirror's `someProp()` iteration.

#### R7. Use `shouldRerenderOnTransaction: false`
**Impact: Medium | Effort: Low**

TipTap v3 defaults to `shouldRerenderOnTransaction: false`, which prevents the editor component from re-rendering on every transaction. Verify this is set and that all UI components use `useEditorState` selectors instead of relying on re-renders.

#### R8. Memoize CodeBlockComponent Language Options
**Impact: Low-Medium | Effort: Low**

The `LANGUAGE_OPTIONS` array is defined at module scope (good), but the `<select>` renders all 26 `<option>` elements on every re-render. Move the options rendering to a memoized sub-component:

```typescript
const LanguageSelect = memo(({ language, onChange }) => (
  <select value={language} onChange={onChange}>
    {LANGUAGE_OPTIONS.map(({ value, label }) => (
      <option key={value} value={value}>{label}</option>
    ))}
  </select>
));
```

#### R9. Split CSS Themes
**Impact: Low-Medium | Effort: Low**

Load only the active theme's CSS. The inactive theme can be loaded on demand when the user switches themes:

```typescript
// Load only the active theme
if (colorTheme === 'colorful') {
  import('./editor-colorful.css');
} else {
  import('./editor.css');
}
```

This saves ~6,500 lines of CSS parsing on initial load.

### Priority 3: High Impact, High Effort (Strategic)

#### R10. Replace ReactNodeViewRenderer with Plain NodeViews for Simple Cases
**Impact: High | Effort: High**

For `CodeBlockComponent` and `CalloutComponent`, consider using plain ProseMirror `NodeView` classes instead of `ReactNodeViewRenderer`. This eliminates the React root overhead:

```typescript
addNodeView() {
  return ({ node, getPos, editor }) => {
    const dom = document.createElement('div');
    dom.className = 'code-block-wrapper';
    // Build DOM imperatively
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    pre.appendChild(code);
    dom.appendChild(pre);
    return { dom, contentDOM: code, update: (updatedNode) => { ... } };
  };
}
```

This is the single biggest performance improvement for documents with many code blocks or callouts. The TipTap GitHub issue #4492 confirms that `ReactNodeViewRenderer` "drastically reduces performance" for large documents.

#### R11. Virtualize Long Documents
**Impact: High | Effort: Very High**

For documents exceeding ~2,000 nodes (the current lightweight threshold), implement viewport-based rendering. Only render nodes visible in the viewport plus a buffer zone. This is architecturally complex with ProseMirror but can be approximated by:

1. Collapsing off-screen sections into placeholder nodes
2. Using `IntersectionObserver` to expand/collapse sections
3. Keeping the ProseMirror document intact but hiding DOM elements

#### R12. Web Worker for HTML/Markdown Serialization
**Impact: Medium | Effort: High**

Move `getHTML()` and Turndown conversion to a Web Worker to avoid blocking the main thread:

```typescript
const serializationWorker = new Worker('./serializationWorker.ts');

onUpdate: ({ editor }) => {
  const json = editor.getJSON(); // Fast, just returns the internal tree
  serializationWorker.postMessage({ type: 'serialize', json });
};
```

This eliminates the 5-15ms main-thread block from HTML serialization.

#### R13. Implement Transaction Batching
**Impact: Medium | Effort: Medium**

For rapid typing, batch multiple character insertions into a single transaction using `requestAnimationFrame`:

```typescript
let pendingChars = '';
let rafId: number | null = null;

handleTextInput(view, from, to, text) {
  pendingChars += text;
  if (!rafId) {
    rafId = requestAnimationFrame(() => {
      // Insert all pending chars in one transaction
      const tr = view.state.tr.insertText(pendingChars, from, to);
      view.dispatch(tr);
      pendingChars = '';
      rafId = null;
    });
  }
  return true; // Prevent default handling
}
```

This reduces the number of plugin `apply()` cascades during fast typing.

### Priority 4: Low Impact, Low Effort (Polish)

#### R14. Cache Decoration Widget DOM Elements
**Impact: Low | Effort: Low**

In `CollapsibleHeading`, cache the chevron widget DOM elements instead of recreating them on every decoration rebuild:

```typescript
const chevronCache = new WeakMap<Node, HTMLElement>();
```

#### R15. Debounce Word Count More Aggressively
**Impact: Low | Effort: Trivial**

Increase the word count debounce from 500ms to 1000ms, or make it configurable. Most users don't need real-time word count updates.

#### R16. Lazy-Load Table Extensions
**Impact: Low-Medium | Effort: Low**

Table-related extensions (`Table`, `TableRow`, `TableCell`, `TableHeader`, `TableSorting`, `TableRowDrag`, `SortableTable`, `TableCellWithMenu`) add 8 extensions with multiple plugins. Lazy-load them only when a table is inserted or detected in the initial content.

#### R17. Profile and Optimize `migrateCollapsedIds`
**Impact: Low-Medium | Effort: Low**

The `migrateCollapsedIds` function in `CollapsibleHeading` calls `doc.descendants()` twice (once on old doc, once on new doc) on every `docChanged`. This can be optimized to only check headings in the changed range.

---

## 8. Quick Wins vs. Deep Investments

### Immediate Quick Wins (Can implement today)

| # | Recommendation | Est. Time | Impact |
|---|---|---|---|
| R1 | Incremental CollapsibleHeading | 2-3 hours | High |
| R2 | Incremental CollapsibleList | 1-2 hours | High |
| R3 | Lazy-load highlight.js core | 30 min | Medium |
| R8 | Memoize CodeBlockComponent | 15 min | Low |
| R9 | Split CSS themes | 30 min | Low-Medium |
| R15 | Increase word count debounce | 5 min | Low |

### Medium-Term Investments (1-2 weeks)

| # | Recommendation | Est. Time | Impact |
|---|---|---|---|
| R4 | Conditional extension registration | 1-2 days | Medium |
| R5 | Consolidate handleTextInput | 1 day | Medium |
| R6 | Consolidate handleKeyDown | 1 day | Medium |
| R7 | Verify shouldRerenderOnTransaction | 1 hour | Medium |
| R16 | Lazy-load table extensions | 1 day | Low-Medium |
| R17 | Optimize migrateCollapsedIds | 2 hours | Low-Medium |

### Strategic Investments (1-2 months)

| # | Recommendation | Est. Time | Impact |
|---|---|---|---|
| R10 | Plain NodeViews for CodeBlock/Callout | 1-2 weeks | High |
| R12 | Web Worker serialization | 1 week | Medium |
| R13 | Transaction batching | 3-5 days | Medium |
| R11 | Viewport virtualization | 2-4 weeks | Very High |

---

## Appendix: Current Performance Safeguards

The codebase already includes several performance-conscious patterns worth preserving:

1. **Debounced `onUpdate`** (150ms) — prevents `getHTML()` on every keystroke
2. **Lazy Turndown conversion** — only converts HTML→Markdown on blur/mode-switch, not on every change
3. **`useEditorState` selectors** — toolbar only re-renders when formatting state changes
4. **`memo()` on toolbars** — prevents unnecessary React reconciliation
5. **Lightweight mode** — disables Typography, SelectAllOccurrences, CollapsibleHeadings, HexColorMark, TableSorting, and DragHandle for documents >2,000 nodes
6. **Lazy highlight.js languages** — non-core languages loaded on demand
7. **Deferred content injection** — skeleton renders before heavy ProseMirror parsing
8. **Incremental HexColorMark** — only scans changed ranges, not the full document
9. **Incremental LinkValidation** — uses `nodesBetween` on changed ranges
10. **Word count debounce** (500ms) — avoids `getText()` on every keystroke

These should be maintained and used as patterns for future extensions.

---

## Appendix: Measurement Methodology

To validate the impact of each recommendation, use the built-in `PerformanceProfiler` component and the browser's Performance tab:

1. **Transaction time**: Measure `Date.now()` before and after `view.dispatch(tr)` in a custom plugin
2. **Plugin apply time**: Wrap each plugin's `apply()` with `performance.mark()` / `performance.measure()`
3. **React render time**: Use React DevTools Profiler to measure component render durations
4. **Bundle size**: Use `npx vite-bundle-visualizer` to see the actual tree-shaken bundle composition
5. **Lighthouse**: Run Lighthouse performance audit on the editor page for overall metrics

---

*This report was generated from a deep audit of the Paragon editor codebase. All line numbers and code references are based on the current state of the repository.*
