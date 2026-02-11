# @manus/editor

A professional, feature-rich markdown editor component built with TipTap and React. Drop-in editor for note-taking applications like Taskmate, Momentum, and more.

## Features

- **Rich Text Editing** — Full WYSIWYG markdown editing with TipTap/ProseMirror
- **Syntax Highlighting** — 20+ language support via highlight.js
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
npm install @manus/editor
# or
pnpm add @manus/editor
# or
yarn add @manus/editor
```

### Peer Dependencies

The editor requires React 18 or 19:

```bash
npm install react react-dom
```

## Quick Start

```tsx
import { MarkdownEditor } from '@manus/editor';
import '@manus/editor/style.css';

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
import { MarkdownEditor, EditorThemeProvider } from '@manus/editor';
import '@manus/editor/style.css';

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
import { createCustomTheme, applyTheme } from '@manus/editor';

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

## Advanced Usage

### Accessing the Editor Instance

```tsx
import { MarkdownEditor } from '@manus/editor';
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
