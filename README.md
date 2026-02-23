# Paragon Editor

A professional, feature-rich markdown editor component designed as a drop-in for note-taking applications like **Taskmate**, **Momentum**, and more. Built with [TipTap](https://tiptap.dev/), React, and TypeScript.

## Highlights

- **Dual Mode**: WYSIWYG visual editing and raw markdown with real-time sync
- **AI Writing Assistant**: Provider-agnostic integration with streaming support
- **30+ Features**: Tables, code blocks, date pills, callouts, Find & Replace, TOC, and more
- **Zero Lock-in**: Opt-in AI, modular extensions, CSS-variable theming
- **Production Ready**: Error boundary, auto-save/recovery, performance profiler
- **Fully Tested**: 847 unit tests + 40 Playwright E2E browser tests

---

## Features

### Core Markdown

- **Headings** (H1–H6) with auto-detection (`# `, `## `, `### `)
- **Text Formatting**: Bold, Italic, Underline, Strikethrough, Highlight, Subscript, Superscript
- **Inline Code** with backtick detection
- **Links** with auto-detection for URLs and `Ctrl+K` shortcut
- **Lists**: Bullet lists, Numbered lists, Nested lists with Tab/Shift+Tab indentation
- **Task Lists** with interactive checkboxes and auto-reorder (completed items sort to bottom)
- **Mixed Lists**: Bullet items and task items can coexist in the same list
- **Blockquotes** with styled borders
- **Horizontal Rules** (`---` or `***`)
- **Text Alignment**: Left, Center, Right, Justify

### Advanced Features

- **Code Blocks** with syntax highlighting for 20+ languages (via Lowlight) and copy-to-clipboard
- **Tables** with resizable columns, sortable headers, row drag, and cell context menu
- **Resizable Images** with drag handles, alignment options, and width persistence across mode switches
- **Callouts** with 5 types: Info, Note, Prompt, Resources, Todo (`Ctrl+Shift+C` or `/callout`)
- **Date Pills** — inline date tracking with smart detection (`@today`, `@tomorrow`, `@Feb 15, 2026@`, `@2026-02-15`)
- **Wiki Links** — `[[Page Name]]` syntax with click handler callback
- **Collapsible Lists** — nested list items with expand/collapse chevron toggles
- **Collapsible Headings** — click heading to collapse content underneath
- **Floating Toolbar** on text selection (glassmorphic design with backdrop blur, auto-dismisses on scroll)
- **Slash Commands** (`/` to open command palette) with search filtering
- **Find & Replace** (`Ctrl+H`) — works in both WYSIWYG and raw markdown mode with visual highlights
- **Table of Contents** — auto-generated sidebar with scroll sync, configurable heading levels, and tree view
- **Markdown Paste** — paste markdown text and it auto-converts to rich content
- **Copy as Markdown** — export content as markdown
- **Word and Character Count** in the footer
- **Select All Action Bar** — bulk actions when all content is selected
- **Bottom Buffer** — generous padding at the end of content so the cursor never sits at the screen edge

### AI Writing Assistant (opt-in)

Paragon includes a **provider-agnostic AI integration** that is completely opt-in. When `aiActions` are provided, a sparkles button appears in the toolbar and floating toolbar. The embedding app controls the AI provider.

- **Streaming support**: Return `AsyncIterable<string>` for real-time token streaming
- **Custom prompts**: Actions can include a free-text prompt input
- **Scoped actions**: Target selection-only, document-only, or both
- **Result popover**: Shows AI output with Accept/Reject/Retry controls
- **Zero overhead**: When AI props are not provided, no AI code is loaded

### Dual Mode Editing

- **WYSIWYG Mode**: Visual rich-text editing with TipTap
- **Raw Markdown Mode**: Syntax-highlighted markdown editing with debounced tokenization
- **Real-time Sync**: Content syncs between modes on blur, mode-switch, and unmount (lazy Turndown for performance)
- **Width Persistence**: Image widths survive round-trips via `![alt|width](url)` format

### Error Handling & Recovery

- **Error Boundary**: Wraps the editor to catch React rendering crashes with retry, clear content, and error details
- **Auto-Save**: Debounced save to localStorage with configurable key and delay
- **Recovery Banner**: Prompts user to restore unsaved content on mount
- **Performance Profiler**: Built-in profiler panel for monitoring editor performance (controlled by embedding app)

### Customization

- **CSS Variables** for easy theming (OKLCH color format)
- **Dark and Light Modes** with per-instance `theme` prop
- **Color Themes**: `colorful` (default, colored headings and blue table accents) or `neutral` (headings match body text, gray table borders) via `colorTheme` prop
- **Theme Provider** for React context-based theming
- **Customizable Toolbar** — show/hide, or replace with `renderToolbar`
- **Customizable Footer** — replace with `renderFooter`
- **Disable Features** selectively via `disabledFeatures` prop
- **Modular Architecture** for easy integration

---

## Installation

```bash
# Install dependencies
pnpm add @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder \
  @tiptap/extension-text-align @tiptap/extension-highlight @tiptap/extension-link \
  @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-cell \
  @tiptap/extension-table-header @tiptap/extension-task-list @tiptap/extension-task-item \
  @tiptap/extension-code-block-lowlight @tiptap/extension-underline \
  @tiptap/extension-subscript @tiptap/extension-superscript @tiptap/extension-typography \
  @tiptap/extension-image @tiptap/extension-strike @tiptap/extension-bubble-menu \
  @tiptap/extension-drag-handle @tiptap/extension-dropcursor @tiptap/extension-node-range \
  @tiptap/pm lowlight turndown turndown-plugin-gfm marked highlight.js
```

---

## Usage

### Basic Usage

```tsx
import { MarkdownEditor } from '@/components/editor';
import { useState } from 'react';

function MyApp() {
  const [content, setContent] = useState('');

  return (
    <MarkdownEditor
      content={content}
      onChange={setContent}
      placeholder="Start writing..."
      showToolbar={true}
      showWordCount={true}
      showTableOfContents={true}
      autoReorderChecklist={true}
    />
  );
}
```

### With Color Theme

```tsx
// Colorful theme (default) — colored headings and blue table accents
<MarkdownEditor content={content} onChange={setContent} colorTheme="colorful" />

// Neutral theme — headings match body text, gray table borders
<MarkdownEditor content={content} onChange={setContent} colorTheme="neutral" />
```

### With AI Integration

```tsx
import { MarkdownEditor, type AIActionDefinition, type AIActionHandler } from '@/components/editor';

const aiActions: AIActionDefinition[] = [
  { id: 'fix-grammar', label: 'Fix spelling & grammar', icon: 'SpellCheck', scope: 'selection' },
  { id: 'summarize', label: 'Summarize', icon: 'FileText', scope: 'selection' },
  { id: 'expand', label: 'Expand on this', icon: 'Expand', scope: 'selection' },
  { id: 'custom', label: 'Custom prompt...', scope: 'both', showCustomPrompt: true },
];

const handleAIAction: AIActionHandler = async function* (action, text, customPrompt) {
  // Example: streaming response from your AI provider
  const stream = await callYourAIProvider(action, text, customPrompt);
  for await (const chunk of stream) {
    yield chunk;
  }
};

function MyApp() {
  return (
    <MarkdownEditor
      content={content}
      onChange={setContent}
      aiActions={aiActions}
      onAIAction={handleAIAction}
      onAISetupRequired={() => navigate('/settings/ai')}
    />
  );
}
```

### With Image Upload

```tsx
<MarkdownEditor
  content={content}
  onChange={setContent}
  onImageUpload={async (file, { fileName, mimeType, fileSize, uploadId }) => {
    // Upload to your storage and return the reference path
    const path = await uploadToS3(file);
    return path; // e.g. "../_images/photo.jpg"
  }}
  resolveImageSrc={async (src) => {
    // Resolve reference paths to displayable URLs
    return await getSignedUrl(src);
  }}
  maxImageSize={10 * 1024 * 1024} // 10MB
/>
```

### With Theme Provider

```tsx
import { MarkdownEditor, EditorThemeProvider } from '@/components/editor';

function MyApp() {
  return (
    <EditorThemeProvider defaultTheme="dark">
      <MarkdownEditor content="" onChange={() => {}} />
    </EditorThemeProvider>
  );
}
```

### With Error Boundary

```tsx
<MarkdownEditor
  content={content}
  onChange={setContent}
  onEditorError={(error, errorInfo) => {
    // Report to your error tracking service
    Sentry.captureException(error, { extra: errorInfo });
  }}
/>
```

---

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `''` | Initial HTML content |
| `onChange` | `(html: string) => void` | - | Callback when HTML content changes |
| `onHTMLChange` | `(html: string) => void` | - | Alias for onChange |
| `onMarkdownChange` | `(md: string) => void` | - | Callback when raw markdown changes |
| `placeholder` | `string` | `'Start writing...'` | Placeholder text |
| `editable` | `boolean` | `true` | Enable editing |
| `autofocus` | `boolean` | `false` | Auto-focus on mount |
| `className` | `string` | `''` | Additional CSS classes |
| `theme` | `'dark' \| 'light'` | `'dark'` | Theme preset |
| `colorTheme` | `'colorful' \| 'neutral'` | `'colorful'` | Color theme for headings and table accents |
| `minHeight` | `string` | `'200px'` | Minimum editor height |
| `maxHeight` | `string` | - | Maximum editor height |
| `spellCheck` | `boolean` | `true` | Enable browser spellcheck |

### UI Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showToolbar` | `boolean` | `true` | Show top toolbar |
| `showWordCount` | `boolean` | `true` | Show word count footer |
| `showFloatingToolbar` | `boolean` | `true` | Show floating toolbar on selection |
| `showModeToggle` | `boolean` | `true` | Show WYSIWYG/raw mode toggle |
| `renderToolbar` | `function` | - | Custom toolbar render function |
| `renderFooter` | `function` | - | Custom footer render function |

### Mode & Sync Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialMode` | `'wysiwyg' \| 'markdown'` | `'wysiwyg'` | Initial editor mode |
| `onModeChange` | `function` | - | Callback when mode changes |
| `findReplaceOpen` | `boolean` | `false` | Controlled Find & Replace panel |
| `onFindReplaceChange` | `function` | - | Find & Replace state callback |

### Auto-Save & Recovery Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoSave` | `boolean` | `true` | Enable auto-save to localStorage |
| `autoSaveKey` | `string` | `'paragon-editor-content'` | Storage key |
| `autoSaveDelay` | `number` | `1000` | Debounce delay in ms |
| `showRecoveryBanner` | `boolean` | `true` | Show recovery banner |
| `onSave` | `function` | - | Callback on save |
| `onRecover` | `function` | - | Callback on content recovery |

### Table of Contents Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showTableOfContents` | `boolean` | `false` | Show TOC sidebar |
| `tocVisible` | `boolean` | `true` | Initial TOC visibility |
| `tocTitle` | `string` | `'Table of Contents'` | Sidebar title |
| `tocMinLevel` | `number` | `1` | Min heading level |
| `tocMaxLevel` | `number` | `4` | Max heading level |
| `tocPosition` | `'left' \| 'right'` | `'right'` | Sidebar position |
| `tocWidth` | `string` | `'240px'` | Sidebar width |
| `tocTreeView` | `boolean` | `false` | Collapsible tree view |
| `tocHighlightActive` | `boolean` | `true` | Highlight active heading |

### AI Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aiActions` | `AIActionDefinition[]` | - | AI actions for sparkles menu |
| `onAIAction` | `AIActionHandler` | - | Handler (returns `string` or `AsyncIterable<string>`) |
| `onAISetupRequired` | `function` | - | Called when AI is not configured |

### Image Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxImageSize` | `number` | `5MB` | Max upload size in bytes |
| `onImageUpload` | `function` | - | External upload handler (required for paste/drop) |
| `resolveImageSrc` | `function` | - | Resolve reference paths to displayable URLs |
| `onImageUploadStart` | `function` | - | Upload start callback |
| `onImageUploadComplete` | `function` | - | Upload complete callback |
| `onImageUploadError` | `function` | - | Upload error callback |

### Feature Control Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoReorderChecklist` | `boolean` | `false` | Auto-sort completed tasks to bottom |
| `headingLevels` | `number[]` | `[1,2,3,4,5,6]` | Enabled heading levels |
| `collapsibleHeadingLevels` | `number[]` | `[1,2,3]` | Collapsible heading levels |
| `disabledFeatures` | `object` | `{}` | Disable specific features |

The `disabledFeatures` object supports:

```typescript
{
  tables?: boolean;
  images?: boolean;
  codeBlocks?: boolean;
  taskLists?: boolean;
  callouts?: boolean;
  datePills?: boolean;
  wikiLinks?: boolean;
  collapsibleHeadings?: boolean;
  slashCommands?: boolean;
  markdownPaste?: boolean;
  dragAndDrop?: boolean;
}
```

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| `onReady` | `(editor: Editor) => void` | Editor instance ready |
| `onFocus` | `() => void` | Editor focused |
| `onBlur` | `() => void` | Editor blurred |
| `onSelectionChange` | `function` | Selection changed |
| `onDestroy` | `() => void` | Editor destroyed |
| `onWikiLinkClick` | `(pageName: string) => void` | Wiki link clicked |
| `onLinkClick` | `(url: string, event: MouseEvent) => boolean \| void` | Link clicked |
| `onEditorError` | `(error: Error, errorInfo: ErrorInfo) => void` | Editor crash |

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Bold | `Ctrl+B` |
| Italic | `Ctrl+I` |
| Underline | `Ctrl+U` |
| Strikethrough | `Ctrl+Shift+X` |
| Inline Code | `Ctrl+E` |
| Highlight | `Ctrl+Shift+H` |
| Link | `Ctrl+K` |
| Callout | `Ctrl+Shift+C` |
| Date Pill | `Ctrl+Shift+D` |
| Find & Replace | `Ctrl+H` |
| Undo | `Ctrl+Z` |
| Redo | `Ctrl+Shift+Z` |
| Indent | `Tab` |
| Outdent | `Shift+Tab` |

## Markdown Auto-Detection

Type these shortcuts followed by a space to auto-convert:

| Input | Result |
|-------|--------|
| `# ` | Heading 1 |
| `## ` | Heading 2 |
| `### ` | Heading 3 |
| `- ` or `* ` | Bullet List |
| `1. ` | Numbered List |
| `[] ` or `[ ] ` | Task List |
| `> ` | Blockquote |
| `---` or `***` | Horizontal Rule |
| ` ``` ` | Code Block |
| `@today ` | Date Pill (today) |
| `@tomorrow ` | Date Pill (tomorrow) |
| `@Feb 15, 2026@` | Date Pill (specific date) |
| `@2026-02-15@` | Date Pill (ISO format) |
| `[[Page Name]]` | Wiki Link |

---

## Theming

### Color Themes

Paragon supports two color themes via the `colorTheme` prop:

| Theme | Headings | Table Accents | Best For |
|-------|----------|---------------|----------|
| `colorful` (default) | Colored per level (blue, purple, teal, etc.) | Blue header borders | Visual distinction between heading levels |
| `neutral` | Same color as body text | Gray borders | Clean, minimal aesthetic |

```tsx
// Colorful (default)
<MarkdownEditor colorTheme="colorful" />

// Neutral
<MarkdownEditor colorTheme="neutral" />
```

The `colorTheme` prop is also available as a query parameter on the demo editor page: `?colorTheme=neutral`.

### Available Themes

- **Dark** (default): GitHub Dark inspired
- **Light**: Bright environment theme

### CSS Variables

```css
/* Base colors */
--editor-bg: oklch(0.13 0.01 250);
--editor-fg: oklch(0.93 0.01 250);
--editor-border: oklch(0.28 0.01 250);

/* Primary accent */
--editor-primary: oklch(0.7 0.15 220);
--editor-primary-fg: oklch(0.13 0.01 250);

/* Heading colors (colorful theme) */
--h1-color: #4a9eff;
--h2-color: #c084fc;
--h3-color: #34d399;
--h4-color: #fbbf24;
--h5-color: #f87171;
--h6-color: #9ca3af;

/* Callouts */
--editor-callout-info: oklch(0.5 0.12 220);
--editor-callout-warning: oklch(0.6 0.15 70);
--editor-callout-error: oklch(0.5 0.15 25);
--editor-callout-success: oklch(0.5 0.12 160);
--editor-callout-note: oklch(0.5 0.12 280);

/* Syntax highlighting */
--syntax-keyword: oklch(0.7 0.18 320);
--syntax-string: oklch(0.7 0.12 160);
--syntax-number: oklch(0.75 0.12 70);
--syntax-comment: oklch(0.5 0.02 250);
--syntax-function: oklch(0.75 0.15 280);
```

---

## Testing

Paragon has comprehensive test coverage across two layers:

### Unit Tests (Vitest)

847 unit tests covering all hooks, utilities, extensions, and components:

```bash
pnpm test        # Run all unit tests
pnpm test:watch  # Watch mode
```

### E2E Tests (Playwright)

40 real-browser tests that exercise the actual editor canvas in Chromium, catching rendering issues that mocked tests miss:

```bash
pnpm test:e2e    # Run Playwright E2E tests
```

E2E tests cover:
- Page loading, layout, and demo content rendering
- WYSIWYG typing, formatting shortcuts (bold, italic, headings, lists, code blocks)
- Mode switching (WYSIWYG ↔ raw markdown) and content round-tripping
- Find & Replace functionality
- Query parameters (theme, toolbar, ToC, word count, colorTheme)
- Slash commands, Table of Contents, task list checkbox interactivity
- localStorage persistence, undo/redo, rapid typing, and edge cases

---

## Architecture

```
components/editor/
├── MarkdownEditor.tsx          # Main editor component (1,500+ lines)
├── EditorToolbar.tsx           # Top toolbar with formatting buttons
├── EditorModeToggle.tsx        # WYSIWYG/raw mode toggle
├── FloatingToolbar.tsx         # Selection-based floating toolbar (scroll-dismiss)
├── SlashCommands.tsx           # Slash command palette
├── FindReplace.tsx             # Find & Replace panel
├── CodeBlockComponent.tsx      # Code block with language selector + copy
├── SyntaxHighlightedMarkdown.tsx # Raw markdown editor with syntax overlay
├── TableOfContents.tsx         # Auto-generated TOC sidebar
├── EditorErrorBoundary.tsx     # Crash recovery wrapper
├── DatePillComponent.tsx       # Date pill React node view
├── AutoSaveIndicator.tsx       # Auto-save status indicator
├── RecoveryBanner.tsx          # Content recovery prompt
├── ImageDropZone.tsx           # Drag-and-drop image upload
├── ImageEditPopover.tsx        # Image edit/resize popover
├── LinkPopover.tsx             # Link insertion popover
├── LinkHoverTooltip.tsx        # Link hover preview
├── SelectAllActionBar.tsx      # Bulk action bar
├── TableCellMenu.tsx           # Table cell context menu
├── ThemeProvider.tsx           # React context for theming
├── PerformanceProfiler.tsx     # Built-in performance monitor
├── index.ts                    # Public exports
├── editor.css                  # Main stylesheet (6,500+ lines, colorful default + neutral overrides)
├── editor-colorful.css         # Backup of original colorful theme
├── ai/
│   ├── AIDropdownMenu.tsx      # AI action dropdown
│   ├── AIResultPopover.tsx     # AI result display with accept/reject
│   ├── useAIState.ts           # AI state machine
│   ├── types.ts                # AI type definitions
│   └── index.ts                # AI module exports
├── extensions/
│   ├── Callout.ts              # Callout block extension
│   ├── CalloutInputRule.ts     # Callout auto-detection
│   ├── CalloutWithMenu.tsx     # Callout with type switcher
│   ├── CollapsibleHeading.ts   # Collapsible heading extension
│   ├── CollapsibleList.ts      # Collapsible list extension
│   ├── CustomTableCell.ts      # Enhanced table cell
│   ├── CustomTableHeader.ts    # Enhanced table header
│   ├── DatePill.ts             # Date pill inline node
│   ├── ImageUpload.ts          # Image paste/drop handler
│   ├── LinkValidation.ts       # Link validation extension
│   ├── MarkdownLinkInputRule.ts # Markdown link detection
│   ├── MarkdownPaste.ts        # Markdown paste handler
│   ├── MixedLists.ts           # Mixed bullet/task lists
│   ├── ResizableImage.ts       # Resizable image with drag handles
│   ├── SearchHighlight.ts      # Search result highlighting
│   ├── SelectAllOccurrences.ts # Select all occurrences
│   ├── SortableTable.ts        # Table sorting extension
│   ├── TabIndent.ts            # Tab indentation for lists
│   ├── TableCellWithMenu.tsx   # Table cell with context menu
│   ├── TableRowDrag.ts         # Table row drag-and-drop
│   ├── TableSorting.tsx        # Table column sorting
│   ├── TagPill.ts              # Tag pill inline node
│   └── WikiLink.ts             # Wiki link extension
├── hooks/
│   ├── index.ts                # Barrel file — consolidated hook exports
│   ├── useAutoSave.ts          # Auto-save hook
│   ├── useEditorAPI.ts         # Editor API (copy, export, etc.)
│   ├── useEditorExtensions.ts  # Extension configuration
│   ├── useEditorInstance.ts    # TipTap editor instance
│   ├── useEditorKeyboardShortcuts.ts # Keyboard shortcut bindings
│   ├── useGlobalEditorAPI.ts   # Global editor API via ref
│   ├── useHandleModeSwitch.ts  # WYSIWYG ↔ markdown mode switching
│   ├── useTurndownService.ts   # HTML→Markdown conversion (lazy-loaded)
│   └── useWordCount.ts         # Word/character counting
├── utils/
│   ├── index.ts                # Barrel file — consolidated utility exports
│   ├── convertCheckboxLists.ts # Checkbox list conversion
│   ├── insertHorizontalRule.ts # Horizontal rule insertion
│   ├── markdownPipeline.ts     # Markdown processing pipeline
│   ├── performance.ts          # Performance measurement utilities
│   ├── restoreHeaderColumn.ts  # Table header column restoration
│   ├── splitSeparatedLists.ts  # List splitting logic
│   └── structureImagesInListItems.ts # Image-in-list structuring
├── themes/
│   └── index.ts                # Theme definitions and utilities
└── e2e/                        # (project root)
    └── editor.spec.ts          # Playwright E2E tests (40 tests)
```

---

## Exports

```typescript
// Core
export { MarkdownEditor, type MarkdownEditorProps } from './MarkdownEditor';
export { EditorErrorBoundary, type EditorErrorBoundaryProps } from './EditorErrorBoundary';

// UI Components
export { FloatingToolbar } from './FloatingToolbar';
export { EditorToolbar } from './EditorToolbar';
export { SlashCommands } from './SlashCommands';
export { CodeBlockComponent } from './CodeBlockComponent';
export { AutoSaveIndicator, type AutoSaveIndicatorProps } from './AutoSaveIndicator';
export { RecoveryBanner, type RecoveryBannerProps } from './RecoveryBanner';
export { ImageDropZone } from './ImageDropZone';

// Extensions
export { Callout, type CalloutType } from './extensions/Callout';
export { ResizableImage } from './extensions/ResizableImage';
export { ImageUpload, type ImageUploadOptions } from './extensions/ImageUpload';
export { MixedBulletList, MixedOrderedList, MixedTaskList, MixedTaskItem, MixedListItem } from './extensions/MixedLists';
export { CollapsibleList } from './extensions/CollapsibleList';
export { TagPill, type TagPillOptions, isValidTag, normalizeTag } from './extensions/TagPill';

// Theming
export { EditorThemeProvider, useEditorTheme } from './ThemeProvider';
export { themes, applyTheme, createCustomTheme, darkTheme, lightTheme, sepiaTheme, nordTheme, type EditorTheme } from './themes';

// Hooks
export { useAutoSave, type AutoSaveOptions, type AutoSaveState, type AutoSaveReturn } from './hooks';

// AI Types
export type { AIActionDefinition, AIActionHandler, AIState } from './ai/types';
```

---

## Query Parameters (Demo Page)

The demo editor page at `/editor` supports the following query parameters:

| Parameter | Values | Default | Description |
|-----------|--------|---------|-------------|
| `theme` | `dark`, `light` | `light` | Editor theme |
| `colorTheme` | `colorful`, `neutral` | `colorful` | Color theme for headings and tables |
| `toc` | `true`, `false` | `true` | Show table of contents |
| `tocMaxLevel` | `1`–`6` | `4` | Max heading level in ToC |
| `toolbar` | `true`, `false` | `true` | Show editor toolbar |
| `wordcount` | `true`, `false` | `true` | Show word count in footer |
| `autofocus` | `true`, `false` | `true` | Auto-focus editor on load |
| `reorder` | `true`, `false` | `true` | Auto-reorder completed checklist items |
| `editable` | `true`, `false` | `true` | Allow editing |
| `placeholder` | any string | `Start writing...` | Custom placeholder text |

Example: `/editor?theme=dark&toc=false&toolbar=true&colorTheme=neutral`

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License

## Credits

Built with:
- [TipTap](https://tiptap.dev/) — Headless editor framework
- [React](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Lowlight](https://github.com/wooorm/lowlight) — Syntax highlighting
- [Turndown](https://github.com/mixmark-io/turndown) — HTML to Markdown
- [Marked](https://github.com/markedjs/marked) — Markdown to HTML
- [Lucide](https://lucide.dev/) — Icons
- [Playwright](https://playwright.dev/) — E2E browser testing
- [Vitest](https://vitest.dev/) — Unit testing framework
