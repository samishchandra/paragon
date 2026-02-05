# Manus Markdown Editor - Product Requirements Document

**Version:** 1.0  
**Author:** Manus AI  
**Date:** February 5, 2026  
**Status:** Production Ready

---

## Executive Summary

The Manus Markdown Editor is a professional, feature-rich WYSIWYG markdown editor designed as a drop-in component for note-taking applications. Built with TipTap (ProseMirror) and React 19, it provides a seamless editing experience with comprehensive markdown support, real-time formatting, and extensive customization options. The editor supports both visual editing and raw markdown modes, with automatic content preservation between mode switches.

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Technical Architecture](#2-technical-architecture)
3. [Core Features](#3-core-features)
4. [Editor Extensions](#4-editor-extensions)
5. [UI Components](#5-ui-components)
6. [Hooks and State Management](#6-hooks-and-state-management)
7. [Styling System](#7-styling-system)
8. [Keyboard Shortcuts](#8-keyboard-shortcuts)
9. [API Reference](#9-api-reference)
10. [Implementation Guidelines](#10-implementation-guidelines)

---

## 1. Product Overview

### 1.1 Purpose

The Manus Markdown Editor serves as a reusable, embeddable editor component that can be integrated into any React-based note-taking, documentation, or content management application. It bridges the gap between raw markdown editing and rich text WYSIWYG editing by supporting both modes with seamless content preservation.

### 1.2 Target Users

| User Type | Use Case |
|-----------|----------|
| Developers | Integrating a markdown editor into their applications |
| Content Writers | Creating formatted documents with rich media |
| Note-takers | Personal knowledge management and note organization |
| Documentation Teams | Writing technical documentation with code blocks |

### 1.3 Key Value Propositions

The editor differentiates itself through several key capabilities. First, it provides **dual-mode editing** where users can switch between visual WYSIWYG and raw markdown modes without losing formatting or content. Second, it offers **comprehensive markdown support** including tables, code blocks with syntax highlighting, task lists, callouts, and images. Third, the **auto-save functionality** ensures content is automatically saved to localStorage with recovery options. Fourth, the **extensible architecture** allows custom extensions to be added following the TipTap extension pattern. Finally, the **responsive design** ensures the editor works seamlessly on both desktop and mobile devices.

---

## 2. Technical Architecture

### 2.1 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | React 19 | UI component framework |
| Editor Core | TipTap 2.x | ProseMirror-based editor framework |
| Styling | Tailwind CSS 4 | Utility-first CSS framework |
| UI Components | shadcn/ui | Accessible component library |
| Icons | Lucide React | Icon library |
| Markdown Parser | marked | Markdown to HTML conversion |
| HTML to Markdown | turndown | HTML to Markdown conversion |

### 2.2 Project Structure

```
client/src/components/editor/
├── MarkdownEditor.tsx          # Main editor component
├── EditorToolbar.tsx           # Top formatting toolbar
├── FloatingToolbar.tsx         # Selection-based floating toolbar
├── SlashCommands.tsx           # Slash command palette
├── FindReplace.tsx             # Find and replace panel
├── RawMarkdownEditor.tsx       # Raw markdown editing mode
├── SyntaxHighlightedMarkdown.tsx # Syntax highlighting for raw mode
├── LinkPopover.tsx             # Link editing popover
├── LinkHoverTooltip.tsx        # Link preview tooltip
├── ImageDropZone.tsx           # Drag-drop image upload
├── ImageEditPopover.tsx        # Image editing controls
├── ImageURLDialog.tsx          # Image URL insertion dialog
├── TableCellMenu.tsx           # Table cell context menu
├── DatePillComponent.tsx       # Date pill UI component
├── CodeBlockComponent.tsx      # Code block with language selector
├── AutoSaveIndicator.tsx       # Save status indicator
├── RecoveryBanner.tsx          # Content recovery banner
├── ThemeProvider.tsx           # Theme context provider
├── hooks/
│   ├── useAutoSave.ts          # Auto-save hook
│   └── useWordCount.ts         # Word count hook
└── extensions/
    ├── Callout.ts              # Callout block extension
    ├── CalloutWithMenu.tsx     # Callout with type switcher
    ├── CalloutInputRule.ts     # Auto-detect callout syntax
    ├── CodeBlockWithFeatures.tsx # Enhanced code block
    ├── CollapsibleHeading.ts   # Collapsible headings
    ├── CustomTableCell.ts      # Enhanced table cells
    ├── CustomTableHeader.ts    # Enhanced table headers
    ├── DatePill.ts             # Date pill extension
    ├── ImageUpload.ts          # Image upload handling
    ├── LinkValidation.ts       # Link validation
    ├── MarkdownLinkInputRule.ts # Markdown link auto-detection
    ├── MarkdownPaste.ts        # Markdown paste handling
    ├── MarkdownPasteSafe.ts    # Safe markdown paste
    ├── ResizableImage.ts       # Resizable image extension
    ├── SearchHighlight.ts      # Search result highlighting
    ├── SortableTable.ts        # Table sorting
    ├── TabIndent.ts            # Tab indentation
    ├── TableCellWithMenu.tsx   # Table cell with menu
    ├── TableRowDrag.ts         # Drag-to-reorder rows
    ├── TableSorting.tsx        # Column sorting
    ├── WikiLink.ts             # Wiki-style links
    └── WikiLinkSafe.ts         # Safe wiki links
```

### 2.3 Component Hierarchy

```
MarkdownEditor (Main Container)
├── EditorToolbar (Top Bar)
│   ├── Formatting Buttons
│   ├── Insert Menu
│   └── Mode Toggle
├── RecoveryBanner (Conditional)
├── Editor Content Area
│   ├── TipTap EditorContent
│   ├── FloatingToolbar
│   ├── SlashCommands
│   ├── FindReplace
│   └── LinkHoverTooltip
├── RawMarkdownEditor (Mode: Raw)
│   └── SyntaxHighlightedMarkdown
└── Footer Bar
    ├── AutoSaveIndicator
    └── Word Count
```

---

## 3. Core Features

### 3.1 Text Formatting

The editor supports comprehensive text formatting options that can be applied via toolbar, keyboard shortcuts, or markdown syntax.

| Format | Toolbar | Shortcut | Markdown Syntax |
|--------|---------|----------|-----------------|
| Bold | ✅ | Ctrl+B | `**text**` |
| Italic | ✅ | Ctrl+I | `*text*` |
| Underline | ✅ | Ctrl+U | N/A |
| Strikethrough | ✅ | Ctrl+Shift+S | `~~text~~` |
| Code | ✅ | Ctrl+E | `` `code` `` |
| Highlight | ✅ | Ctrl+Shift+H | `==text==` |
| Subscript | ✅ | N/A | N/A |
| Superscript | ✅ | N/A | N/A |

### 3.2 Block Elements

| Element | Description | Markdown Syntax |
|---------|-------------|-----------------|
| Headings (H1-H6) | Six levels of headings with colored styling | `# H1` to `###### H6` |
| Paragraph | Normal text blocks | Plain text |
| Bullet List | Unordered lists with nesting | `- item` or `* item` |
| Numbered List | Ordered lists with auto-numbering | `1. item` |
| Task List | Interactive checkboxes | `- [ ] task` or `- [x] done` |
| Blockquote | Quoted text with left border | `> quote` |
| Code Block | Syntax-highlighted code | ` ```language ` |
| Horizontal Rule | Visual separator | `---` or `***` |
| Table | Full-featured data tables | Pipe syntax |
| Callout | Styled info/warning/error boxes | ` ```info ` |

### 3.3 Dual-Mode Editing

The editor supports seamless switching between visual (WYSIWYG) and raw markdown modes.

**Visual Mode Features:**
- Real-time formatting preview
- Floating toolbar on text selection
- Slash commands for quick insertion
- Drag-and-drop image support
- Interactive table editing

**Raw Markdown Mode Features:**
- Syntax-highlighted markdown editing
- Line numbers
- Monospace font (JetBrains Mono)
- Full markdown syntax support

**Mode Switching Behavior:**
When switching from visual to raw mode, the editor converts HTML to markdown using Turndown with custom rules for:
- Images with width attributes preserved as HTML `<img>` tags
- Callouts converted to code block syntax (` ```info `, ` ```warning `, etc.)
- Tables converted to pipe syntax
- Task lists with checkbox syntax

When switching from raw to visual mode, the editor parses markdown using marked with custom preprocessing for:
- Callout code blocks converted to callout HTML
- Tables parsed with proper structure
- Images with width attributes restored

### 3.4 Auto-Save System

The auto-save system provides automatic content persistence with the following behavior:

| Feature | Description |
|---------|-------------|
| Debounced Save | Content saved 1 second after last edit |
| localStorage Key | `manus-editor-content` (configurable) |
| Recovery Detection | Detects unsaved content on page load |
| Recovery Banner | Shows option to recover or dismiss |
| Save on Unload | Immediate save when page closes |
| Hash-based Comparison | Efficient change detection |

### 3.5 Find and Replace

The find and replace panel provides powerful search capabilities:

| Feature | Description |
|---------|-------------|
| Case Sensitive | Toggle case-sensitive matching |
| Whole Word | Match whole words only |
| Regex Support | Use regular expressions |
| Navigation | Previous/Next match buttons |
| Replace | Replace current match |
| Replace All | Replace all matches at once |
| Keyboard Shortcuts | Enter (next), Shift+Enter (prev), Escape (close) |

---

## 4. Editor Extensions

### 4.1 Callout Extension

Callouts are styled information boxes with five types: info, warning, error, success, and note.

**Features:**
- Type-specific icons (info circle, warning triangle, error X, checkmark, notebook)
- Type switcher dropdown on hover
- Color-coded backgrounds and borders
- Preserved in markdown as code block syntax

**Markdown Syntax:**
```
```info
Information callout content
```

```warning
Warning callout content
```
```

**HTML Structure:**
```html
<div data-type="callout" data-callout-type="info" class="callout callout-info">
  <div class="callout-icon-container">
    <button class="callout-icon-button"><!-- Icon --></button>
    <div class="callout-type-dropdown"><!-- Type options --></div>
  </div>
  <div class="callout-content">
    <p>Content here</p>
  </div>
</div>
```

### 4.2 Collapsible Heading Extension

Headings can be collapsed to hide their content sections.

**Features:**
- Chevron toggle button on hover
- Smooth collapse/expand animation
- Visual indicator for collapsed state
- Hover state feedback on collapsed headings
- Content between headings is hidden when collapsed

**Implementation:**
- Uses ProseMirror decorations for chevron buttons
- Tracks collapsed state per heading
- Applies CSS classes for visual styling
- Background color matches code block on collapse

### 4.3 Resizable Image Extension

Images can be resized by dragging corner handles.

**Features:**
- Corner resize handles on selection
- Maintains aspect ratio during resize
- Alignment options (left, center, right)
- Width preserved in markdown mode as HTML `<img>` tags
- Alt text support

**Attributes:**
| Attribute | Type | Description |
|-----------|------|-------------|
| src | string | Image URL |
| alt | string | Alternative text |
| title | string | Image title |
| width | number | Width in pixels |
| align | string | left, center, right |

### 4.4 Table Extensions

Tables are enhanced with multiple extensions working together.

**TableCellWithMenu:**
- Context menu on cell hover
- Add/delete row/column options
- Merge/split cell options
- Header row toggle

**TableSorting:**
- Sort button in header cells
- Ascending/descending sort
- Inline button positioning next to header text
- Decoration caching for performance

**TableRowDrag:**
- Drag handle on row hover
- Reorder rows by dragging
- Visual drop indicator
- Smooth animation

**CustomTableCell/Header:**
- Vertical center alignment
- Proper paragraph styling inside cells
- Border and background styling

### 4.5 Date Pill Extension

Date pills are inline date references with smart formatting.

**Features:**
- Auto-detection of `@today`, `@tomorrow`, `@Jan15` syntax
- Visual pill with calendar icon
- Date picker on click
- Relative date display (Today, Tomorrow, Yesterday)
- Color-coded (overdue, today, upcoming)

**Syntax:**
```
Meeting scheduled for @today
Deadline: @Jan15
```

### 4.6 Wiki Link Extension

Wiki-style internal links using double bracket syntax.

**Features:**
- Auto-detection of `[[page name]]` syntax
- Visual styling as link
- Click handler for navigation
- Safe version prevents XSS

### 4.7 Code Block Extension

Enhanced code blocks with syntax highlighting.

**Features:**
- Language selector dropdown
- 20+ supported languages
- Copy code button
- Line numbers (optional)
- Syntax highlighting via highlight.js

**Supported Languages:**
javascript, typescript, python, java, c, cpp, csharp, go, rust, ruby, php, swift, kotlin, sql, html, css, json, yaml, markdown, bash, plaintext

### 4.8 Search Highlight Extension

Highlights search matches in the editor.

**Features:**
- Current match highlighting (distinct color)
- All matches highlighting
- Updates on search term change
- Integrates with Find/Replace panel

### 4.9 Markdown Paste Extension

Handles pasting markdown content.

**Features:**
- Auto-detects markdown syntax in pasted text
- Converts markdown to rich content
- Supports tables, lists, code blocks, callouts
- Falls back to plain text if not markdown

---

## 5. UI Components

### 5.1 EditorToolbar

The main formatting toolbar at the top of the editor.

**Sections:**
1. **Text Style** - Paragraph, H1, H2, H3 dropdown
2. **Text Formatting** - Bold, Italic, Underline, Strikethrough, Code, Highlight
3. **Lists** - Bullet, Numbered, Task list
4. **Block Elements** - Quote, Code block
5. **Insert** (inline on large screens) - Table, Image, Horizontal Rule, Callout
6. **Actions** - Find/Replace, Undo, Redo
7. **Mode Toggle** - Visual/Raw markdown switch

**Responsive Behavior:**
- On screens ≥1024px: Insert options shown inline
- On smaller screens: Insert options in dropdown menu

### 5.2 FloatingToolbar

Appears when text is selected.

**Features:**
- Positioned above selection
- Auto-repositions to stay within bounds
- Shows formatting options relevant to selection
- Link editing input mode
- Hides in code blocks

**Available Actions:**
- Paragraph style
- Headings (H1, H2, H3)
- Bold, Italic, Underline, Strikethrough
- Code, Highlight
- Link
- Lists (Bullet, Numbered, Task)
- Quote, Code block

### 5.3 SlashCommands

Command palette triggered by typing `/`.

**Features:**
- Fuzzy search filtering
- Keyboard navigation (↑↓ arrows)
- Enter to execute
- Escape to close
- Categorized commands

**Available Commands:**
| Command | Description |
|---------|-------------|
| Paragraph | Normal text |
| Heading 1-3 | Section headings |
| Bullet List | Unordered list |
| Numbered List | Ordered list |
| Task List | Checkbox list |
| Quote | Blockquote |
| Code Block | Syntax-highlighted code |
| Table | 3x3 table |
| Image | Image from URL |
| Divider | Horizontal rule |
| Info/Warning/Error/Success/Note Callout | Styled callout boxes |
| Date | Today's date pill |
| Wiki Link | Internal page link |

### 5.4 FindReplace

Find and replace panel.

**Features:**
- Search input with icon
- Match count display
- Navigation buttons
- Case sensitive toggle
- Whole word toggle
- Regex toggle
- Replace input (expandable)
- Replace/Replace All buttons

### 5.5 LinkHoverTooltip

Tooltip shown when hovering over links.

**Features:**
- Shows link URL
- Edit button
- Open in new tab button
- Copy URL button
- Unlink button

### 5.6 ImageEditPopover

Popover for editing selected images.

**Features:**
- Alt text input
- Alignment buttons (left, center, right)
- Delete button
- Width display

### 5.7 AutoSaveIndicator

Shows save status in footer.

**States:**
- Idle: No indicator
- Saving: "Saving..." with spinner
- Saved: "Saved" with checkmark
- Error: "Error" with warning icon

### 5.8 RecoveryBanner

Banner shown when recoverable content is detected.

**Features:**
- "Recover" button to restore content
- "Dismiss" button to ignore
- Timestamp of saved content

---

## 6. Hooks and State Management

### 6.1 useAutoSave Hook

Manages automatic content persistence.

**Options:**
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| storageKey | string | 'manus-editor-content' | localStorage key |
| debounceMs | number | 1000 | Save delay in ms |
| enabled | boolean | true | Enable/disable auto-save |
| onSave | function | undefined | Callback on save |
| onRecover | function | undefined | Callback on recover |

**Return Value:**
| Property | Type | Description |
|----------|------|-------------|
| status | string | 'idle' \| 'saving' \| 'saved' \| 'error' |
| lastSaved | Date \| null | Last save timestamp |
| hasRecoverableContent | boolean | Recovery available |
| error | string \| null | Error message |
| save | function | Manual save trigger |
| clear | function | Clear saved content |
| recover | function | Recover saved content |
| dismissRecovery | function | Dismiss recovery prompt |

### 6.2 useWordCount Hook

Provides debounced word and character counts.

**Options:**
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| debounceMs | number | 500 | Calculation delay |
| extendedStats | boolean | false | Include sentences/paragraphs |
| enabled | boolean | true | Enable/disable counting |

**Return Value:**
| Property | Type | Description |
|----------|------|-------------|
| words | number | Word count |
| characters | number | Character count (no spaces) |
| charactersWithSpaces | number | Character count (with spaces) |
| paragraphs | number | Paragraph count |
| sentences | number | Sentence count |
| readingTime | number | Estimated reading time (minutes) |
| isCalculating | boolean | Calculation in progress |

---

## 7. Styling System

### 7.1 Theme: Things Theme

The editor uses a "Things Theme" inspired by the Obsidian Things theme, featuring clean, elegant design with colored headings and a blue accent color.

**Design Principles:**
- Clean, minimal interface
- Colored headings for visual hierarchy
- Blue primary accent (#2e80f2)
- Proper dark/light mode support
- System fonts with JetBrains Mono for code

### 7.2 Color Variables

**Light Mode:**
| Variable | Value | Usage |
|----------|-------|-------|
| --background | #ffffff | Main background |
| --foreground | #333333 | Main text |
| --primary | #2e80f2 | Accent color |
| --muted | #f5f5f5 | Muted backgrounds |
| --border | #e8e8e8 | Borders |

**Dark Mode:**
| Variable | Value | Usage |
|----------|-------|-------|
| --background | #1c2127 | Main background |
| --foreground | #dadada | Main text |
| --primary | #2e80f2 | Accent color |
| --muted | #282c34 | Muted backgrounds |
| --border | #3e4451 | Borders |

**Heading Colors:**
| Heading | Light Mode | Dark Mode |
|---------|------------|-----------|
| H1 | #2e80f2 (Blue) | #2e80f2 |
| H2 | #2e80f2 (Blue) | #2e80f2 |
| H3 | #4eb57c (Green) | #9e86c8 (Purple) |
| H4 | #3eb4bf (Teal) | #2e80f2 |
| H5 | #e87d3e (Orange) | #e5b567 (Yellow) |
| H6 | #9a9a9a (Gray) | muted-foreground |

**Callout Colors:**
| Type | Border Color | Background (Light) | Background (Dark) |
|------|--------------|-------------------|-------------------|
| Info | #3b82f6 | oklch(0.95 0.03 240) | oklch(0.22 0.03 240) |
| Warning | #f59e0b | oklch(0.96 0.04 85) | oklch(0.22 0.04 85) |
| Error | #ef4444 | oklch(0.96 0.03 25) | oklch(0.22 0.03 25) |
| Success | #10b981 | oklch(0.96 0.03 160) | oklch(0.22 0.03 160) |
| Note | #8b5cf6 | oklch(0.96 0.03 280) | oklch(0.22 0.03 280) |

### 7.3 Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Body | Inter | 16px | 400 |
| H1 | Inter | 2em | 700 |
| H2 | Inter | 1.5em | 600 |
| H3 | Inter | 1.25em | 600 |
| Code | JetBrains Mono | 0.9em | 400 |

---

## 8. Keyboard Shortcuts

### 8.1 Text Formatting

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Bold | Ctrl+B | Cmd+B |
| Italic | Ctrl+I | Cmd+I |
| Underline | Ctrl+U | Cmd+U |
| Strikethrough | Ctrl+Shift+S | Cmd+Shift+S |
| Code | Ctrl+E | Cmd+E |
| Highlight | Ctrl+Shift+H | Cmd+Shift+H |
| Link | Ctrl+K | Cmd+K |

### 8.2 Block Elements

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Heading 1 | Ctrl+Alt+1 | Cmd+Alt+1 |
| Heading 2 | Ctrl+Alt+2 | Cmd+Alt+2 |
| Heading 3 | Ctrl+Alt+3 | Cmd+Alt+3 |
| Bullet List | Ctrl+Shift+8 | Cmd+Shift+8 |
| Numbered List | Ctrl+Shift+7 | Cmd+Shift+7 |
| Task List | Ctrl+Shift+9 | Cmd+Shift+9 |
| Blockquote | Ctrl+Shift+B | Cmd+Shift+B |
| Code Block | Ctrl+Alt+C | Cmd+Alt+C |

### 8.3 Navigation & Actions

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Undo | Ctrl+Z | Cmd+Z |
| Redo | Ctrl+Shift+Z | Cmd+Shift+Z |
| Find | Ctrl+F | Cmd+F |
| Find & Replace | Ctrl+H | Cmd+H |
| Select All | Ctrl+A | Cmd+A |

### 8.4 List Indentation

| Action | Shortcut |
|--------|----------|
| Indent | Tab |
| Outdent | Shift+Tab |

---

## 9. API Reference

### 9.1 MarkdownEditor Props

```typescript
interface MarkdownEditorProps {
  // === CONTENT PROPS ===
  /** Initial HTML content */
  content?: string;
  /** Callback when content changes (HTML) */
  onChange?: (content: string) => void;
  /** Callback when HTML content changes (alias for onChange) */
  onHTMLChange?: (html: string) => void;
  /** Callback when raw markdown content changes */
  onMarkdownChange?: (markdown: string) => void;
  /** Placeholder text when editor is empty */
  placeholder?: string;
  
  // === EDITOR STATE PROPS ===
  /** Whether the editor is editable (default: true) */
  editable?: boolean;
  /** Whether to autofocus the editor on mount (default: false) */
  autofocus?: boolean;
  /** Initial editor mode (default: 'wysiwyg') */
  initialMode?: 'wysiwyg' | 'markdown';
  /** Enable spellcheck (default: true) */
  spellCheck?: boolean;
  
  // === UI VISIBILITY PROPS ===
  /** Show top toolbar (default: true) */
  showToolbar?: boolean;
  /** Show word count in footer (default: true) */
  showWordCount?: boolean;
  /** Show mode toggle to switch between WYSIWYG and raw markdown (default: true) */
  showModeToggle?: boolean;
  /** Show floating toolbar on text selection (default: true) */
  showFloatingToolbar?: boolean;
  /** Show recovery banner when unsaved content is found (default: true) */
  showRecoveryBanner?: boolean;
  
  // === AUTO-SAVE PROPS ===
  /** Enable auto-save to localStorage (default: true) */
  autoSave?: boolean;
  /** Storage key for auto-save (default: 'manus-editor-content') */
  autoSaveKey?: string;
  /** Auto-save debounce delay in ms (default: 1000) */
  autoSaveDelay?: number;
  
  // === LAYOUT PROPS ===
  /** Additional CSS classes */
  className?: string;
  /** Minimum height of the editor (default: '200px') */
  minHeight?: string;
  /** Maximum height of the editor (default: none) */
  maxHeight?: string;
  
  // === IMAGE PROPS ===
  /** Maximum image file size in bytes (default: 5MB) */
  maxImageSize?: number;
  /** Callback when image upload starts */
  onImageUploadStart?: () => void;
  /** Callback when image upload completes */
  onImageUploadComplete?: () => void;
  /** Callback when image upload fails */
  onImageUploadError?: (error: string) => void;
  
  // === EVENT CALLBACKS ===
  /** Callback when editor mode changes */
  onModeChange?: (mode: 'wysiwyg' | 'markdown') => void;
  /** Callback when editor is ready with the editor instance */
  onReady?: (editor: Editor) => void;
  /** Callback when editor is focused */
  onFocus?: () => void;
  /** Callback when editor loses focus */
  onBlur?: () => void;
  /** Callback when selection changes */
  onSelectionChange?: (selection: { from: number; to: number; empty: boolean }) => void;
  /** Callback when editor is destroyed */
  onDestroy?: () => void;
  /** Callback when content is saved (auto-save or manual) */
  onSave?: (content: string) => void;
  /** Callback when content is recovered from storage */
  onRecover?: (content: string) => void;
  /** Callback when a wiki link is clicked */
  onWikiLinkClick?: (pageName: string) => void;
  /** Callback when a link is clicked (return false to prevent default) */
  onLinkClick?: (url: string, event: MouseEvent) => boolean | void;
  
  // === CONTROLLED COMPONENTS ===
  /** Show find/replace panel (default: false) - controlled mode */
  findReplaceOpen?: boolean;
  /** Callback when find/replace panel state changes */
  onFindReplaceChange?: (isOpen: boolean) => void;
  
  // === CUSTOM RENDER PROPS ===
  /** Custom toolbar render function - allows replacing or extending toolbar */
  renderToolbar?: (editor: Editor, defaultToolbar: React.ReactNode) => React.ReactNode;
  /** Custom footer render function - allows replacing or extending footer */
  renderFooter?: (wordCount: { words: number; characters: number }, autoSaveStatus: string, defaultFooter: React.ReactNode) => React.ReactNode;
  
  // === FEATURE CONFIGURATION ===
  /** Heading levels to enable (default: [1, 2, 3, 4, 5, 6]) */
  headingLevels?: (1 | 2 | 3 | 4 | 5 | 6)[];
  /** Collapsible heading levels (default: [1, 2, 3]) */
  collapsibleHeadingLevels?: (1 | 2 | 3 | 4 | 5 | 6)[];
  /** Disable specific features */
  disabledFeatures?: {
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
  };
}
```

### 9.2 MarkdownEditorRef (Imperative Handle)

The editor exposes an imperative handle via React ref for programmatic control:

```typescript
interface MarkdownEditorRef {
  // === CONTENT METHODS ===
  /** Get the underlying TipTap editor instance */
  getEditor: () => Editor | null;
  /** Get the current HTML content */
  getHTML: () => string;
  /** Get the current markdown content */
  getMarkdown: () => string;
  /** Get plain text content */
  getText: () => string;
  /** Set content (HTML string) */
  setContent: (content: string) => void;
  /** Clear all content */
  clearContent: () => void;
  /** Insert content at cursor position */
  insertContent: (content: string) => void;
  /** Get selection text */
  getSelectedText: () => string;
  
  // === FOCUS METHODS ===
  /** Focus the editor */
  focus: (position?: 'start' | 'end' | 'all' | number | boolean) => void;
  /** Blur the editor */
  blur: () => void;
  /** Check if editor is empty */
  isEmpty: () => boolean;
  /** Check if editor is focused */
  isFocused: () => boolean;
  
  // === MODE METHODS ===
  /** Get current editor mode */
  getMode: () => 'wysiwyg' | 'markdown';
  /** Set editor mode */
  setMode: (mode: 'wysiwyg' | 'markdown') => void;
  /** Toggle between modes */
  toggleMode: () => 'wysiwyg' | 'markdown';
  
  // === STATISTICS ===
  /** Get word count stats */
  getWordCount: () => { words: number; characters: number; charactersWithSpaces: number };
  
  // === HISTORY METHODS ===
  /** Undo last action */
  undo: () => void;
  /** Redo last undone action */
  redo: () => void;
  /** Check if can undo */
  canUndo: () => boolean;
  /** Check if can redo */
  canRedo: () => boolean;
  
  // === INSERT METHODS ===
  /** Insert image at cursor position */
  insertImage: (src: string, alt?: string) => void;
  /** Insert table at cursor position */
  insertTable: (rows?: number, cols?: number) => void;
  /** Insert code block at cursor position */
  insertCodeBlock: (language?: string) => void;
  /** Insert callout at cursor position */
  insertCallout: (type?: 'info' | 'warning' | 'error' | 'success' | 'note') => void;
  /** Insert horizontal rule at cursor position */
  insertHorizontalRule: () => void;
  
  // === FORMATTING METHODS ===
  /** Toggle bold on selection */
  toggleBold: () => void;
  /** Toggle italic on selection */
  toggleItalic: () => void;
  /** Toggle underline on selection */
  toggleUnderline: () => void;
  /** Toggle strikethrough on selection */
  toggleStrike: () => void;
  /** Toggle code on selection */
  toggleCode: () => void;
  /** Toggle highlight on selection */
  toggleHighlight: () => void;
  /** Set heading level (1-6) or 0 for paragraph */
  setHeading: (level: 0 | 1 | 2 | 3 | 4 | 5 | 6) => void;
  /** Toggle bullet list */
  toggleBulletList: () => void;
  /** Toggle numbered list */
  toggleOrderedList: () => void;
  /** Toggle task list */
  toggleTaskList: () => void;
  /** Toggle blockquote */
  toggleBlockquote: () => void;
  
  // === LINK METHODS ===
  /** Set link on selection */
  setLink: (url: string) => void;
  /** Remove link from selection */
  unsetLink: () => void;
  
  // === PANEL METHODS ===
  /** Open find/replace panel */
  openFindReplace: () => void;
  /** Close find/replace panel */
  closeFindReplace: () => void;
  
  // === SAVE METHODS ===
  /** Trigger manual save */
  save: () => void;
  /** Clear saved content from storage */
  clearSavedContent: () => void;
  
  // === STATE METHODS ===
  /** Check if editor is editable */
  isEditable: () => boolean;
  /** Set editable state */
  setEditable: (editable: boolean) => void;
}
```

### 9.3 Basic Usage Example

```tsx
import { MarkdownEditor } from '@/components/editor';
import { useState } from 'react';

function App() {
  const [content, setContent] = useState('<p>Start writing...</p>');

  return (
    <MarkdownEditor
      content={content}
      onChange={setContent}
      placeholder="Type something..."
      showToolbar={true}
      showWordCount={true}
      autoSave={true}
      autoSaveKey="my-document"
      minHeight="500px"
    />
  );
}
```

### 9.4 Advanced Usage with Ref

```tsx
import { MarkdownEditor, MarkdownEditorRef } from '@/components/editor';
import { useRef } from 'react';

function App() {
  const editorRef = useRef<MarkdownEditorRef>(null);

  const handleGetMarkdown = () => {
    const markdown = editorRef.current?.getMarkdown();
    console.log('Markdown:', markdown);
  };

  const handleInsertTable = () => {
    editorRef.current?.insertTable(3, 4);
  };

  const handleToggleMode = () => {
    const newMode = editorRef.current?.toggleMode();
    console.log('New mode:', newMode);
  };

  return (
    <div>
      <div className="toolbar">
        <button onClick={handleGetMarkdown}>Get Markdown</button>
        <button onClick={handleInsertTable}>Insert Table</button>
        <button onClick={handleToggleMode}>Toggle Mode</button>
      </div>
      <MarkdownEditor
        ref={editorRef}
        onReady={(editor) => console.log('Editor ready:', editor)}
        onModeChange={(mode) => console.log('Mode changed:', mode)}
        onSelectionChange={(sel) => console.log('Selection:', sel)}
      />
    </div>
  );
}
```

### 9.5 Custom Toolbar Example

```tsx
import { MarkdownEditor } from '@/components/editor';

function App() {
  return (
    <MarkdownEditor
      renderToolbar={(editor, defaultToolbar) => (
        <div className="custom-toolbar">
          {defaultToolbar}
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            Custom Bold
          </button>
        </div>
      )}
    />
  );
}
```

### 9.6 Disabled Features Example

```tsx
import { MarkdownEditor } from '@/components/editor';

function SimpleEditor() {
  return (
    <MarkdownEditor
      disabledFeatures={{
        tables: true,
        codeBlocks: true,
        callouts: true,
        datePills: true,
        wikiLinks: true,
        collapsibleHeadings: true,
      }}
      showModeToggle={false}
      showFloatingToolbar={false}
    />
  );
}
```

### 9.7 Global API (window.__manusEditorModeAPI)

The editor also exposes a global API for external scripts:

```typescript
interface ManusEditorModeAPI {
  getMode: () => 'wysiwyg' | 'markdown';
  setMode: (mode: 'wysiwyg' | 'markdown') => void;
  toggleMode: () => 'wysiwyg' | 'markdown';
  switchToVisual: () => void;
  switchToMarkdown: () => void;
  isVisualMode: () => boolean;
  isMarkdownMode: () => boolean;
  getRawMarkdown: () => string | null;
  onModeChange: (callback: (mode: 'wysiwyg' | 'markdown') => void) => () => void;
}

// Usage
window.__manusEditorModeAPI.toggleMode();
window.__manusEditorModeAPI.onModeChange((mode) => console.log('Mode:', mode));
```

### 9.8 Editor Commands (TipTap)

The editor instance provides access to TipTap commands:

```typescript
// Access via ref
const editor = editorRef.current?.getEditor();

// Formatting
editor.chain().focus().toggleBold().run();
editor.chain().focus().setHeading({ level: 1 }).run();

// Insertions
editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
editor.chain().focus().setImage({ src: 'url', alt: 'text' }).run();
editor.commands.insertCallout({ type: 'info' });
editor.chain().focus().insertDatePill().run();

// Selection
editor.chain().focus().selectAll().run();
editor.chain().focus().setTextSelection({ from: 0, to: 10 }).run();
```

---

## 10. Implementation Guidelines

### 10.1 Integration Steps

1. **Install Dependencies:**
```bash
pnpm add @tiptap/react @tiptap/starter-kit @tiptap/extension-*
pnpm add marked turndown highlight.js
pnpm add lucide-react
```

2. **Copy Editor Components:**
Copy the entire `components/editor` directory to your project.

3. **Copy Styles:**
Add the editor styles from `index.css` to your global styles.

4. **Import and Use:**
```tsx
import { MarkdownEditor } from '@/components/editor';
```

### 10.2 Customization Points

**Theme Customization:**
Override CSS variables in your global styles:
```css
:root {
  --primary: #your-color;
  --h1-color: #your-h1-color;
  /* ... */
}
```

**Extension Customization:**
Modify extensions in the `extensions` array in `MarkdownEditor.tsx`.

**Toolbar Customization:**
Modify `EditorToolbar.tsx` to add/remove toolbar buttons.

### 10.3 Performance Considerations

The editor implements several performance optimizations:

1. **Debounced Auto-Save:** Content is saved 1 second after the last edit, not on every keystroke.

2. **Debounced Word Count:** Word count is calculated 500ms after the last edit.

3. **Hash-based Change Detection:** Uses simple hash comparison instead of full string comparison for change detection.

4. **Decoration Caching:** Table sorting and cell menu decorations are cached to avoid rebuilding on every transaction.

5. **queueMicrotask for setContent:** Content updates are deferred using queueMicrotask to avoid React flushSync errors.

### 10.4 Known Limitations

| Limitation | Workaround |
|------------|------------|
| No collaborative editing | Use external CRDT library |
| No image upload to server | Implement custom upload handler |
| No spell checking | Browser native spell check works |
| No version history | Implement external versioning |

### 10.5 Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 14+ |
| Edge | 90+ |

---

## Appendix A: File Manifest

| File | Lines | Purpose |
|------|-------|---------|
| MarkdownEditor.tsx | ~800 | Main editor component |
| EditorToolbar.tsx | ~700 | Top toolbar |
| FloatingToolbar.tsx | ~400 | Selection toolbar |
| SlashCommands.tsx | ~380 | Command palette |
| FindReplace.tsx | ~370 | Find/replace panel |
| CollapsibleHeading.ts | ~400 | Collapsible headings |
| ResizableImage.ts | ~450 | Resizable images |
| TableCellWithMenu.tsx | ~500 | Table cell menu |
| TableSorting.tsx | ~400 | Table sorting |
| TableRowDrag.ts | ~350 | Row drag-drop |
| CalloutWithMenu.tsx | ~200 | Callout with switcher |
| index.css | ~3500 | All styles |

---

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| TipTap | A headless, framework-agnostic rich text editor built on ProseMirror |
| ProseMirror | A toolkit for building rich text editors |
| WYSIWYG | What You See Is What You Get - visual editing |
| Extension | A modular plugin that adds functionality to TipTap |
| Decoration | Visual overlay added to the editor without modifying content |
| Node | A block-level element in the document (paragraph, heading, etc.) |
| Mark | An inline formatting applied to text (bold, italic, etc.) |
| Transaction | A change to the editor state |

---

*This document serves as a comprehensive reference for understanding, maintaining, and extending the Manus Markdown Editor. For questions or contributions, please refer to the project repository.*
