# @samishkolli/paragon

A professional, feature-rich markdown editor component built with TipTap and React. Drop-in editor for note-taking applications like Taskmate, Momentum, and more.

## Features

- **Rich Text Editing** — Full WYSIWYG markdown editing with TipTap/ProseMirror
- **Syntax Highlighting** — 15 languages bundled (30+ aliases), extensible via lowlight
- **Tables** — Full table support with resizable columns, sorting, and cell menus
- **Task Lists** — Interactive checkboxes for todo items
- **Code Blocks** — Beautiful code blocks with language detection and copy button
- **Callouts** — Info, warning, error, and success callout blocks
- **Image Upload** — Drag-drop or paste images with resize handles
- **Find & Replace** — Cmd+F search with regex support and Select All Occurrences (Cmd+D)
- **Collapsible Headings** — Collapse/expand sections by heading
- **Auto-Save** — Automatic content persistence to localStorage
- **Theming** — Dark, light, sepia, and Nord themes with custom theme support
- **Table of Contents** — Auto-generated sidebar navigation
- **Keyboard First** — Comprehensive keyboard shortcuts
- **Slash Commands** — Type `/` for quick command palette
- **Wiki Links** — `[[page]]` syntax support
- **Date Pills** — Inline date references

## Installation

```bash
npm install @samishkolli/paragon
# or
pnpm add @samishkolli/paragon
# or
yarn add @samishkolli/paragon
```

### Peer Dependencies

The editor requires React and TipTap (with ProseMirror). Most consuming apps already have these:

```bash
# Core peer dependencies
npm install react react-dom
npm install @tiptap/core @tiptap/react @tiptap/starter-kit
npm install @tiptap/extension-code-block-lowlight lowlight highlight.js
npm install @tiptap/extension-highlight @tiptap/extension-link
npm install @tiptap/extension-placeholder @tiptap/extension-table
npm install @tiptap/extension-table-row @tiptap/extension-task-item
npm install @tiptap/extension-task-list @tiptap/extension-text-align
npm install @tiptap/extension-typography @tiptap/extension-underline
npm install @tiptap/extension-subscript @tiptap/extension-superscript
npm install lucide-react
```

> **Note:** By externalizing TipTap, ProseMirror, highlight.js, and lucide-react, the library bundle is only **618 KB** (ESM) instead of 1.66 MB — a **62.8% reduction**. Your app won't double-bundle these heavy dependencies.

## Quick Start

```tsx
import { MarkdownEditor } from '@samishkolli/paragon';
import '@samishkolli/paragon/style.css';

function App() {
  return (
    <MarkdownEditor
      content="<h1>Hello World</h1><p>Start editing...</p>"
      onChange={(html) => console.log('HTML:', html)}
      onMarkdownChange={(md) => console.log('Markdown:', md)}
      theme="dark"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `''` | Initial HTML content |
| `onChange` | `(html: string) => void` | — | Callback when content changes (HTML) |
| `onMarkdownChange` | `(md: string) => void` | — | Callback when content changes (Markdown) |
| `placeholder` | `string` | `'Start writing...'` | Placeholder text |
| `editable` | `boolean` | `true` | Whether the editor is editable |
| `autofocus` | `boolean` | `false` | Auto-focus on mount |
| `theme` | `'dark' \| 'light'` | `'dark'` | Theme mode |
| `showToolbar` | `boolean` | `true` | Show the top formatting toolbar |
| `showWordCount` | `boolean` | `true` | Show word count in footer |
| `showFloatingToolbar` | `boolean` | `true` | Show floating toolbar on selection |
| `showModeToggle` | `boolean` | `true` | Show WYSIWYG/Markdown mode toggle |
| `showTableOfContents` | `boolean` | `false` | Show TOC sidebar |
| `autoSave` | `boolean` | `true` | Enable auto-save to localStorage |
| `autoSaveKey` | `string` | `'manus-editor-content'` | Storage key for auto-save |
| `minHeight` | `string` | `'200px'` | Minimum editor height |
| `maxHeight` | `string` | — | Maximum editor height |
| `onReady` | `(editor: Editor) => void` | — | Callback when editor is ready |
| `onFocus` | `() => void` | — | Callback on focus |
| `onBlur` | `() => void` | — | Callback on blur |

### Disabling Features

```tsx
<MarkdownEditor
  disabledFeatures={{
    tables: true,
    images: true,
    codeBlocks: false,
    taskLists: false,
    callouts: true,
    datePills: true,
    wikiLinks: true,
    collapsibleHeadings: false,
    slashCommands: false,
    markdownPaste: false,
  }}
/>
```

## Theming

### Built-in Themes

```tsx
import { MarkdownEditor, EditorThemeProvider } from '@samishkolli/paragon';
import '@samishkolli/paragon/style.css';

// Use theme prop
<MarkdownEditor theme="dark" />
<MarkdownEditor theme="light" />

// Or use the theme provider for programmatic control
<EditorThemeProvider>
  <MarkdownEditor />
</EditorThemeProvider>
```

### Custom Themes

```tsx
import { createCustomTheme, applyTheme } from '@samishkolli/paragon';

const myTheme = createCustomTheme('dark', 'my-theme', 'My Custom Theme', {
  '--editor-bg': 'oklch(0.15 0.02 280)',
  '--editor-primary': 'oklch(0.7 0.2 150)',
});

// Apply to a container element
applyTheme(document.getElementById('editor-container')!, myTheme);
```

### Available Themes

| Theme | Description |
|-------|-------------|
| `darkTheme` | Default dark theme (VS Code / GitHub Dark inspired) |
| `lightTheme` | Clean light theme |
| `sepiaTheme` | Warm sepia tones for comfortable reading |
| `nordTheme` | Arctic, north-bluish color palette |

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+B` | Bold |
| `Cmd+I` | Italic |
| `Cmd+U` | Underline |
| `Cmd+E` | Inline code |
| `Cmd+K` | Insert link |
| `Cmd+F` | Find & Replace |
| `Cmd+D` | Select next occurrence |
| `Cmd+Z` | Undo |
| `Cmd+Shift+Z` | Redo |
| `Tab` | Indent |
| `Shift+Tab` | Outdent |
| `/` | Slash commands |
| `Escape` | Exit current mode |

## Extending Syntax Highlighting

The editor bundles 15 languages by default: JavaScript, TypeScript, Python, HTML/XML, CSS, JSON, Bash, SQL, Java, C/C++, Go, Rust, Markdown, YAML, and Diff.

To add more languages:

```tsx
import { lowlight } from '@samishkolli/paragon';
import ruby from 'highlight.js/lib/languages/ruby';
import php from 'highlight.js/lib/languages/php';

// Register additional languages before rendering the editor
lowlight.register('ruby', ruby);
lowlight.register('php', php);
```

## Advanced Usage

### Accessing the Editor Instance

```tsx
import { MarkdownEditor } from '@samishkolli/paragon';
import type { Editor } from '@tiptap/react';

function MyEditor() {
  const handleReady = (editor: Editor) => {
    // Full access to TipTap editor API
    editor.commands.setContent('<p>Programmatic content</p>');
    
    // Get markdown
    // editor.storage.markdown.getMarkdown();
  };

  return <MarkdownEditor onReady={handleReady} />;
}
```

### Custom Toolbar

```tsx
<MarkdownEditor
  renderToolbar={(editor, defaultToolbar) => (
    <div className="my-toolbar">
      {defaultToolbar}
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        Custom Bold
      </button>
    </div>
  )}
/>
```

## License

MIT
