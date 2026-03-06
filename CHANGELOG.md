# Changelog

All notable changes to Paragon Editor are documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/).

---

## [2.1.0] - 2026-03-06

### Performance Optimizations

A comprehensive performance audit was conducted, resulting in 12 of 17 recommendations being implemented. See `PERFORMANCE_REPORT.md` for the full analysis.

- **Incremental decoration updates** (R1, R2): CollapsibleHeading and CollapsibleList plugins now use `DecorationSet.map()` instead of full document traversal on every transaction. Only changed ranges are recomputed.
- **Lazy-loaded highlight.js** (R3): Core highlight.js languages (~200 KB) are loaded on demand via dynamic `import()` instead of being bundled upfront, reducing initial bundle size.
- **Conditional extension registration** (R4): Extensions gated by `disabledFeatures` are not registered at all. The `isLightweight` auto-detection mode disables heavy extensions for large documents.
- **Consolidated input handlers** (R5, R6): `handleTextInput` and `handleKeyDown` hooks from multiple extensions are merged into a single `InputDispatcher`, reducing per-keystroke overhead from ~8 handler invocations to 1.
- **shouldRerenderOnTransaction: false** (R7): Verified that all ReactNodeViewRenderers already skip unnecessary re-renders.
- **Memoized language options** (R8): CodeBlock language select options are memoized to avoid recalculating on every render.
- **Plain NodeViews for CodeBlock and Callout** (R10): Replaced `ReactNodeViewRenderer` with imperative ProseMirror `NodeView` classes for CodeBlock and Callout nodes, eliminating React overhead on every transaction.
- **Cached structure fingerprints** (R17): `migrateCollapsedIds`, `headingStructureChanged`, and `listStructureChanged` now use a single cached traversal instead of three separate full-document scans.
- **Configurable debounce props**: Added `markdownChangeDebounceMs` (default 150ms) and `wordCountDebounceMs` (default 1000ms) props for fine-tuning serialization and word count overhead.
- **Lazy-loaded TOC panel**: Table of Contents is loaded with `React.lazy`/`Suspense` to reduce initial bundle size.
- **Virtualized TOC**: TOC panel uses windowed rendering for documents with many headings.
- **Automated performance benchmarks**: 14 benchmark tests covering large document operations (500+ nodes, 50+ headings) to catch regressions. Run with `pnpm run bench`.

### Bug Fixes

- **Code block controls flickering**: Fixed an infinite NodeView recreation loop (~330 destroy/create cycles per second) caused by `setLanguageReady()` unconditionally mutating `codeEl.className` on ProseMirror's contentDOM. Also fixed hover controls using inline styles with `!important` to bypass CSS specificity issues inside ProseMirror's contentEditable.
- **Code block rendering regression**: Fixed borders around code lines, missing language selector, and missing copy button caused by the plain NodeView migration. Root causes included the `code-block-deferred` class forcing gray color, inline code CSS bleeding into code blocks, and IntersectionObserver race conditions.
- **PWA link compatibility**: Changed link hover tooltip to use anchor click instead of `window.open` for compatibility with Progressive Web Apps.
- **Nested list round-trip**: Fixed nested list items with links breaking when switching between raw markdown and WYSIWYG modes.
- **Blank line preservation**: Fixed blank lines between sections being lost after mode switch due to `stripZWSP` processing.
- **Code block extra blank line**: Fixed code blocks showing an extra blank line in WYSIWYG editor.
- **Multi-line code block toggle**: Fixed selecting multiple lines and toggling code block creating multiple code blocks instead of one.
- **Link text absorption**: Fixed typing before a hyperlink at the start of a line absorbing text into the link.
- **Smart copy-paste**: Full selection of code block/callout content preserves the wrapper on paste; partial selection unwraps and pastes inner content only.
- **Mark clearing on Enter**: Fixed pressing Enter at end of bold/italic/strikethrough/code text not clearing marks on the new line.
- **Partial code block copy**: Fixed partial copy from code block losing newlines and line structure when pasted outside.
- **Copy as Markdown**: Added Copy as Markdown button to floating formatting toolbar.
- **Ordered list indent**: Indent on ordered list item now converts to bullet list instead of nested ordered list.
- **Image copy**: Fixed selecting an image and pressing Cmd+C not copying the image.
- **Zero-width space**: Fixed zero-width space character (U+200B) present in copied markdown text.

### New Features

- **Performance Profiler**: Built-in profiler panel for monitoring editor performance, controlled by the embedding app via `showPerformanceProfiler` prop.
- **Copy as Markdown toolbar button**: Added to floating toolbar with divider after code block button.
- **Configurable performance props**: `markdownChangeDebounceMs`, `wordCountDebounceMs`, `enableCollapsibleHeadings`, `enableCollapsibleLists` for fine-tuning editor behavior.

### Testing

- Expanded test suite from **847 to 1,012 unit tests** across 40 test files.
- Added **14 performance benchmark tests** for large document operations (`pnpm run bench`).
- Added round-trip regression tests for nested lists, code blocks, blank line preservation, and mode switching.

### Documentation

- Added `PERFORMANCE_REPORT.md` with full audit, 17 recommendations, and resolution status.
- Updated README with current test counts, new props, and performance documentation.

---

## [2.0.0] - 2026-02-28

### Initial Release

- Full-featured markdown editor with 35+ features
- Dual WYSIWYG/raw markdown mode with real-time sync
- AI writing assistant (provider-agnostic, streaming support)
- Code blocks with syntax highlighting for 20+ languages
- Tables with resizable columns, sortable headers, row drag
- Callouts with 5 types (info, note, prompt, resources, todo)
- Date pills with smart detection
- Wiki links with click handler callback
- Collapsible lists and headings
- Find & Replace in both modes
- Table of Contents with scroll sync
- Error boundary with crash recovery
- Auto-save and recovery
- Dark/light themes with colorful/neutral color themes
- 847 unit tests + 40 Playwright E2E browser tests
