# Paragon Markdown Editor

A professional, feature-rich markdown editor component designed as a drop-in for note-taking applications like Taskmate, Momentum, and more.

## Features

### Core Markdown Features
- **Headings** (H1-H6) with auto-detection (`# `, `## `, `### `)
- **Text Formatting**: Bold, Italic, Underline, Strikethrough, Highlight
- **Inline Code** with syntax highlighting
- **Links** with auto-detection for URLs
- **Lists**: Bullet lists, Numbered lists, Nested lists
- **Task Lists** with interactive checkboxes
- **Blockquotes** with styled borders
- **Horizontal Rules** (dotted gray dividers)
- **Text Alignment**: Left, Center, Right, Justify

### Advanced Features
- **Code Blocks** with syntax highlighting for 20+ languages
- **Tables** with resizable columns and header rows
- **Resizable Images** with drag-to-resize handles
- **Callouts** with 5 types: Info, Warning, Error, Success, Note
- **Floating Toolbar** on text selection (glassmorphic design)
- **Slash Commands** (`/` to open command palette)
- **Auto-Detection** for markdown shortcuts
- **Copy as Markdown** functionality
- **Word and Character Count**

### Customization
- **CSS Variables** for easy theming
- **Multiple Themes**: Dark, Light, Sepia, Nord
- **Theme Provider** for React context-based theming
- **Customizable Toolbar** visibility
- **Modular Architecture** for easy integration

## Installation

```bash
# Install dependencies
pnpm add @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder \
  @tiptap/extension-text-align @tiptap/extension-highlight @tiptap/extension-link \
  @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-cell \
  @tiptap/extension-table-header @tiptap/extension-task-list @tiptap/extension-task-item \
  @tiptap/extension-code-block-lowlight @tiptap/extension-underline \
  @tiptap/extension-subscript @tiptap/extension-superscript @tiptap/extension-typography \
  @tiptap/extension-image lowlight
```

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
    />
  );
}
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

### Custom Theme

```tsx
import { createCustomTheme, applyTheme } from '@/components/editor';

const myTheme = createCustomTheme('dark', 'my-theme', 'My Custom Theme', {
  '--editor-primary': 'oklch(0.7 0.2 150)',
  '--editor-bg': 'oklch(0.15 0.02 200)',
});

// Apply to element
applyTheme(document.getElementById('editor'), myTheme);
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `''` | Initial HTML content |
| `onChange` | `(html: string) => void` | - | Callback when content changes |
| `onHTMLChange` | `(html: string) => void` | - | Callback for HTML content |
| `placeholder` | `string` | `'Start writing...'` | Placeholder text |
| `showToolbar` | `boolean` | `true` | Show top toolbar |
| `showWordCount` | `boolean` | `true` | Show word count footer |
| `editable` | `boolean` | `true` | Enable editing |
| `autofocus` | `boolean` | `false` | Auto-focus on mount |
| `className` | `string` | `''` | Additional CSS classes |
| `theme` | `'dark' \| 'light'` | `'dark'` | Theme preset |

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Bold | `Ctrl+B` |
| Italic | `Ctrl+I` |
| Underline | `Ctrl+U` |
| Inline Code | `Ctrl+E` |
| Link | `Ctrl+K` |
| Undo | `Ctrl+Z` |
| Redo | `Ctrl+Shift+Z` |
| Callout | `Ctrl+Shift+C` |

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
| ``` ` ` ` ``` | Code Block |

## Theming

### Available Themes

- **Dark** (default): GitHub Dark inspired
- **Light**: Bright environment theme
- **Sepia**: Warm reading comfort theme
- **Nord**: Arctic, north-bluish palette

### CSS Variables

```css
/* Base colors */
--editor-bg: oklch(0.13 0.01 250);
--editor-fg: oklch(0.93 0.01 250);
--editor-border: oklch(0.28 0.01 250);

/* Primary accent */
--editor-primary: oklch(0.7 0.15 220);
--editor-primary-fg: oklch(0.13 0.01 250);

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

## Architecture

```
components/editor/
├── MarkdownEditor.tsx      # Main editor component
├── EditorToolbar.tsx       # Top toolbar with formatting buttons
├── FloatingToolbar.tsx     # Selection-based floating toolbar
├── SlashCommands.tsx       # Slash command palette
├── CodeBlockComponent.tsx  # Code block with copy button
├── ThemeProvider.tsx       # React context for theming
├── index.ts                # Public exports
├── extensions/
│   ├── Callout.ts          # Custom callout block extension
│   └── ResizableImage.ts   # Resizable image extension
└── themes/
    └── index.ts            # Theme definitions and utilities
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License

## Credits

Built with:
- [TipTap](https://tiptap.dev/) - Headless editor framework
- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lowlight](https://github.com/wooorm/lowlight) - Syntax highlighting
- [Lucide](https://lucide.dev/) - Icons
