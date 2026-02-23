# Editor Hooks

Custom React hooks extracted from `MarkdownEditor.tsx` to keep the main component focused on orchestration and rendering. Each hook owns a single responsibility and is independently testable.

---

## Hook Reference

### `useEditorExtensions`

Builds the TipTap extension array based on feature flags, disabled features, and performance mode.

| Parameter | Type | Description |
|---|---|---|
| `disabledFeatures` | `DisabledFeatures` | Feature flags to exclude specific extensions (e.g., `table`, `codeBlock`, `image`) |
| `isLightweight` | `boolean` | When `true`, strips heavy extensions for large documents |
| `isMobile` | `boolean` | Enables touch-friendly behaviours |
| `enableTagAutoDetect` | `boolean` | Enables automatic `#tag` detection in text |
| `callbackRefs` | `ExtensionCallbackRefs` | Refs for `onImageUpload`, `setImageEditState`, etc. |

**Returns:** `Extensions` — the array passed to `useEditor({ extensions })`.

**Test file:** `useEditorExtensions.test.ts` (46 tests)

---

### `useEditorInstance`

Creates the TipTap `Editor` via `useEditor()`, wires up the debounced `onUpdate` callback, lightweight-mode auto-detection, `onBlur` flush, link-click handling, and raw-markdown initialisation for markdown-first mode.

| Parameter | Type | Description |
|---|---|---|
| `extensions` | `Extensions` | Extension array from `useEditorExtensions` |
| `content` | `string` | Initial HTML content |
| `editable` | `boolean` | Whether the editor is editable |
| `autofocus` | `boolean` | Whether to auto-focus on mount |
| `spellCheck` | `boolean` | Enable browser spell-check |
| `initialMode` | `'wysiwyg' \| 'markdown'` | Starting editor mode |
| `performanceMode` | `'auto' \| 'full' \| 'lightweight'` | Lightweight-mode strategy |
| `lightweightThreshold` | `number` | Node count above which auto-mode switches to lightweight |
| `onChange` | `(html: string) => void` | Debounced HTML change callback |
| `onHTMLChange` | `(html: string) => void` | Debounced HTML change callback (alias) |
| `onMarkdownChange` | `(md: string) => void` | Called on blur with the latest markdown |
| `onReady` | `(editor: Editor) => void` | Called once the editor is created |
| `onDestroy` | `() => void` | Called when the editor is destroyed |
| `onFocus` | `() => void` | Focus callback |
| `onBlur` | `() => void` | Blur callback (also flushes pending debounced updates) |
| `onSelectionChange` | `() => void` | Selection change callback |
| `onLinkClick` | `(href, event) => boolean \| void` | Link click handler; return `false` to prevent default |

**Returns:** `{ editor, rawMarkdown, setRawMarkdown, rawMarkdownRef, editorModeRef, isLightweight, setIsLightweight, isLightweightRef, lightweightCheckCounterRef, turndownService }`

**Test file:** `useEditorInstance.test.ts` (24 tests)

---

### `useEditorAPI`

Wraps `useImperativeHandle` to expose the `MarkdownEditorRef` imperative API to parent components via `forwardRef`.

| Parameter | Type | Description |
|---|---|---|
| `ref` | `React.Ref` | The forwarded ref |
| `editor` | `Editor \| null` | The TipTap editor instance |
| `turndownService` | `TurndownLike` | HTML → markdown converter |
| `editorModeRef` | `MutableRefObject<string>` | Current editor mode |
| `rawMarkdownRef` | `MutableRefObject<string>` | Current raw markdown content |
| `handleModeSwitch` | `(mode: string) => void` | Mode switch handler |

**Exposed methods:** `getHTML()`, `getMarkdown()`, `getText()`, `setContent()`, `focus()`, `blur()`, `isEmpty()`, `getEditor()`, `insertContent()`, `clearContent()`, `setEditable()`, `getJSON()`, `setMode()`, `getMode()`, `insertHorizontalRule()`, `scrollToHeading()`, `getTableOfContents()`

**Test file:** `useEditorAPI.test.ts` (63 tests)

---

### `useEditorKeyboardShortcuts`

Attaches a `keydown` listener to the editor DOM that intercepts `Space` after markdown shorthand prefixes and converts them into TipTap commands.

| Shorthand | Result |
|---|---|
| `# ` – `###### ` | Heading levels 1–6 |
| `- ` or `* ` | Bullet list |
| `1. ` | Ordered list |
| `- [ ] ` or `- [x] ` | Task list item |
| `> ` | Blockquote |
| `` ``` `` | Code block |
| `---` | Horizontal rule |

| Parameter | Type | Description |
|---|---|---|
| `editor` | `Editor \| null` | The TipTap editor instance |
| `editorMode` | `string` | Current mode (`'wysiwyg'` or `'markdown'`) |
| `callbacks` | `KeyboardShortcutCallbacks` | `onCmdK`, `onCmdF`, `onCmdH` handlers |

**Test file:** none (keyboard events require full DOM; tested via E2E)

---

### `useHandleModeSwitch`

Manages the bidirectional conversion when switching between WYSIWYG and raw markdown modes.

- **WYSIWYG → Markdown:** uses `turndownService.turndown(editor.getHTML())`
- **Markdown → WYSIWYG:** uses `markdownToHtml()` pipeline (marked + pre/post-processing)

| Parameter | Type | Description |
|---|---|---|
| `editor` | `Editor \| null` | The TipTap editor instance |
| `turndownService` | `TurndownLike` | HTML → markdown converter |
| `rawMarkdown` | `string` | Current raw markdown state |
| `setRawMarkdown` | `(md: string) => void` | State setter for raw markdown |
| `rawMarkdownRef` | `MutableRefObject<string>` | Ref for raw markdown |
| `editorModeRef` | `MutableRefObject<string>` | Ref for current mode |
| `enableTagAutoDetect` | `boolean` | Whether `#tag` auto-detection is enabled |
| `disabledFeatures` | `DisabledFeatures` | Feature flags |
| `isValidTag` | `(tag: string) => boolean` | Tag validation function |
| `normalizeTag` | `(tag: string) => string` | Tag normalisation function |

**Returns:** `(targetMode: 'wysiwyg' \| 'markdown') => Promise<void>`

**Test file:** `useHandleModeSwitch.test.ts` (16 tests)

---

### `useGlobalEditorAPI`

Attaches `window.__paragonEditorModeAPI` so external code (e.g., a host application) can query and control the editor mode programmatically. Dispatches `paragon-editor-mode-change` events on the window.

| Parameter | Type | Description |
|---|---|---|
| `editorModeRef` | `MutableRefObject<string>` | Current editor mode |
| `handleModeSwitch` | `(mode: string) => void` | Mode switch handler |
| `rawMarkdownRef` | `MutableRefObject<string>` | Current raw markdown |
| `editor` | `Editor \| null` | The TipTap editor instance |
| `turndownService` | `TurndownLike` | HTML → markdown converter |
| `setRawMarkdown` | `(md: string) => void` | State setter for raw markdown |
| `onMarkdownChangeRef` | `MutableRefObject<Function \| null>` | Ref to onMarkdownChange callback |
| `onHTMLChangeRef` | `MutableRefObject<Function \| null>` | Ref to onHTMLChange callback |
| `onChangeRef` | `MutableRefObject<Function \| null>` | Ref to onChange callback |

**API methods:** `getMode()`, `setMode()`, `getMarkdown()`, `setMarkdown()`, `getHTML()`, `setHTML()`, `getEditor()`, `subscribe()`, `unsubscribe()`

**Test file:** `useGlobalEditorAPI.test.ts` (23 tests)

---

### `useTurndownService`

Lazy-initialises a `TurndownService` instance with custom rules for resizable images, task lists, callouts, date pills, tag pills, wiki links, highlights, code blocks, and tables. The service is only created on first `.turndown()` call.

| Parameter | Type | Description |
|---|---|---|
| *(none)* | — | No parameters; configuration is internal |

**Returns:** `LazyTurndownService` — object with `.turndown(html: string): string` and `.isReady: boolean`

**Test file:** `useTurndownService.test.ts`

---

### `useAutoSave`

Debounced auto-save with dirty tracking. Calls the provided save function after a configurable delay, and exposes save state (`idle`, `saving`, `saved`, `error`).

| Parameter | Type | Description |
|---|---|---|
| `onSave` | `(content: string) => Promise<void>` | Async save function |
| `debounceMs` | `number` | Debounce delay in milliseconds (default: 1000) |
| `enabled` | `boolean` | Whether auto-save is active |

**Returns:** `AutoSaveReturn` — `{ status, lastSavedAt, error, save(), flush() }`

**Test file:** none (integration-tested via component tests)

---

### `useWordCount`

Computes live word and character counts from the editor's text content, debounced to avoid excessive recalculation.

| Parameter | Type | Description |
|---|---|---|
| `editor` | `Editor \| null` | The TipTap editor instance |
| `enabled` | `boolean` | Whether counting is active |
| `debounceMs` | `number` | Debounce delay (default: 300) |

**Returns:** `WordCountResult` — `{ words, characters, isReady }`

**Test file:** none (integration-tested via component tests)

---

## Adding a New Hook

1. Create `useMyHook.ts` in this directory.
2. Add a JSDoc header describing the hook's purpose.
3. Export the hook and its options interface.
4. Create `useMyHook.test.ts` alongside it with unit tests.
5. Import the hook in `MarkdownEditor.tsx` and add it to the architecture comment at the top of that file.
