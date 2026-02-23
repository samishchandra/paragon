# Editor Utilities

Pure, stateless utility functions used by the Paragon Editor for markdown parsing, HTML transformation, and DOM manipulation. Every module is independently testable and imported through the barrel `index.ts`.

---

## Directory Overview

| Module | Exported Functions | Tests | Description |
|---|---|---|---|
| `convertCheckboxLists.ts` | `convertCheckboxListsToTaskLists` | 20 | Converts `marked`-generated checkbox HTML into TipTap `taskList` / `taskItem` nodes |
| `splitSeparatedLists.ts` | `splitSeparatedLists` | 26 | Splits a markdown string so that consecutive list items of different types become separate lists |
| `structureImagesInListItems.ts` | `structureImagesInListItems` | 10 | Moves `<img>` / `<figure>` elements out of `<p>` wrappers inside `<li>` for correct rendering |
| `restoreHeaderColumn.ts` | `restoreHeaderColumn` | 7 | Restores `{.header-column}` markers on the first cell of each table row after HTML round-trip |
| `markdownPipeline.ts` | 11 functions + 2 types | 77 | Full markdown → HTML conversion pipeline (preprocessing, parsing, post-processing) |
| `insertHorizontalRule.ts` | `insertHorizontalRuleClean` | — | Inserts a `<hr>` into the TipTap editor with proper paragraph wrapping |
| `performance.ts` | 9 functions/classes | 19 | Debounce, throttle, RAF throttle, lazy init, DOM batching, and document size helpers |
| `index.ts` | (barrel re-exports) | 2 | Re-exports all public symbols; completeness guard tested in `index.test.ts` |
| `roundTrip.test.ts` | (integration tests) | 30 | End-to-end markdown → HTML → markdown round-trip tests using `markdownToHtml` + turndown |

**Total: 191 tests across 8 test files**

---

## Module Details

### `convertCheckboxLists.ts`

Converts standard `<ul>` lists with `<input type="checkbox">` (as produced by `marked`) into TipTap-compatible `<ul data-type="taskList">` / `<li data-type="taskItem">` structure.

```ts
import { convertCheckboxListsToTaskLists } from './convertCheckboxLists';

const html = convertCheckboxListsToTaskLists(markedOutput);
```

**Key behaviors:**
- Handles checkboxes as direct `<li>` children or wrapped in `<p>` tags
- Filters out empty `<p>` elements left behind after checkbox extraction
- Preserves non-checkbox list items as regular `<ul>` / `<ol>`

**Test file:** `convertCheckboxLists.test.ts` (20 tests)

---

### `splitSeparatedLists.ts`

Pre-processes raw markdown to split consecutive list items of different types (ordered, unordered, task) into separate lists by inserting blank lines between them.

```ts
import { splitSeparatedLists } from './splitSeparatedLists';

const processed = splitSeparatedLists(rawMarkdown);
```

**Key behaviors:**
- Detects transitions between `- `, `* `, `1. `, `- [ ]`, `- [x]` prefixes
- Protects content inside fenced code blocks from being split
- Handles continuation lines (indented content under a list item)

**Test file:** `splitSeparatedLists.test.ts` (26 tests)

---

### `structureImagesInListItems.ts`

Restructures images inside list items so they render correctly in TipTap. Moves `<img>` and `<figure>` elements out of `<p>` wrappers and positions them as direct children of `<li>`.

```ts
import { structureImagesInListItems } from './structureImagesInListItems';

const html = structureImagesInListItems(convertedHtml);
```

**Key behaviors:**
- Handles both `<img>` tags and `<figure>` wrappers
- Preserves text content alongside images in the same paragraph
- Works with nested lists and task list items

**Test file:** `structureImagesInListItems.test.ts` (10 tests)

---

### `restoreHeaderColumn.ts`

Restores `{.header-column}` class markers on the first `<td>` of each table row. These markers are used by the editor to style the first column as a header.

```ts
import { restoreHeaderColumn } from './restoreHeaderColumn';

const html = restoreHeaderColumn(tableHtml);
```

**Key behaviors:**
- Only applies to `<td>` elements (not `<th>`)
- Targets the first cell in each `<tr>`
- Preserves existing attributes on the `<td>`

**Test file:** `restoreHeaderColumn.test.ts` (7 tests)

---

### `markdownPipeline.ts`

The core conversion pipeline that transforms raw markdown into TipTap-compatible HTML. Exports both the high-level `markdownToHtml()` function and all intermediate helpers for granular testing.

```ts
import { markdownToHtml, type PreprocessOptions } from './markdownPipeline';

const html = markdownToHtml(markdown, {
  enableTagAutoDetect: true,
  disabledFeatures: {},
  isValidTag: (t) => true,
  normalizeTag: (t) => t.toLowerCase(),
  parseDateFromMarkdown: (s) => null,
  getDateVariant: (d) => 'default',
});
```

**Exported functions:**

| Function | Purpose |
|---|---|
| `inlineMarkdownToHtml(text)` | Converts inline markdown (bold, italic, code, links) to HTML |
| `imgToFigure(imgTag)` | Wraps `<img>` with alignment/width metadata into `<figure>` |
| `lineToBlocks(line)` | Converts a single markdown line into block-level HTML |
| `parseListLine(rawLine)` | Parses a list line into structured `ListLineInfo` |
| `buildNestedListHtml(items)` | Builds nested `<ul>` / `<ol>` HTML from parsed list items |
| `reconstructTableCells(html)` | Reconstructs table cells with proper `colspan` / `rowspan` |
| `preprocessMarkdown(md, opts)` | Pre-processes markdown (callouts, highlights, date/tag pills, wiki links) |
| `postprocessHtml(html)` | Post-processes HTML (table cell reconstruction) |
| `markdownToHtml(md, opts)` | Full pipeline: preprocess → split lists → parse → post-process |

**Types:** `PreprocessOptions`, `ListLineInfo`

**Test file:** `markdownPipeline.test.ts` (77 tests)

---

### `insertHorizontalRule.ts`

Inserts a horizontal rule (`<hr>`) into the TipTap editor, ensuring proper paragraph wrapping before and after.

```ts
import { insertHorizontalRuleClean } from './insertHorizontalRule';

insertHorizontalRuleClean(editor);
```

**Key behaviors:**
- Creates an empty paragraph after the rule for continued typing
- Handles insertion at the end of the document
- Works with the TipTap command chain API

**Test file:** None (tested indirectly through `useEditorAPI` tests)

---

### `performance.ts`

Performance optimization utilities for the editor.

```ts
import { debounce, throttle, lazy, isLargeDocument } from './performance';
```

**Exported functions:**

| Function | Purpose |
|---|---|
| `debounce(fn, ms)` | Debounces a function with configurable delay |
| `throttle(fn, ms)` | Throttles a function to run at most once per interval |
| `rafThrottle(fn)` | Throttles using `requestAnimationFrame` |
| `measurePerformance(fn, label)` | Wraps a function with `performance.mark` / `measure` |
| `lazy(factory)` | Lazy initialization — calls factory once, caches result |
| `DOMBatcher` | Batches DOM reads/writes to avoid layout thrashing |
| `domBatcher` | Singleton `DOMBatcher` instance |
| `isLargeDocument(charCount)` | Returns `true` if character count exceeds the large threshold |
| `isVeryLargeDocument(charCount)` | Returns `true` if character count exceeds the very-large threshold |

**Test file:** `performance.test.ts` (19 tests)

---

### `index.ts` (Barrel)

Re-exports all public symbols from the utility modules. Allows consumers to import from a single path:

```ts
import {
  convertCheckboxListsToTaskLists,
  splitSeparatedLists,
  structureImagesInListItems,
  restoreHeaderColumn,
  insertHorizontalRuleClean,
  markdownToHtml,
  preprocessMarkdown,
  postprocessHtml,
  reconstructTableCells,
  inlineMarkdownToHtml,
  imgToFigure,
  lineToBlocks,
  parseListLine,
  buildNestedListHtml,
} from './utils';
```

**Test file:** `index.test.ts` (2 tests — symbol presence + completeness guard)

---

### `roundTrip.test.ts` (Integration Tests)

End-to-end tests that verify markdown → HTML → markdown fidelity using `markdownToHtml` for the forward pass and a configured `TurndownService` (with `resizableImage` and `imageResizer` rules) for the reverse pass.

**Covers:** headings, inline formatting, lists, task lists, code blocks, blockquotes, tables, header-column markers, date pills, tag pills, wiki links, callouts, highlights, images with metadata, and complex mixed documents.

**Test count:** 30 tests

---

## Adding a New Utility

1. Create `utils/myUtility.ts` with exported functions
2. Add `export { ... } from './myUtility'` to `index.ts`
3. Create `utils/myUtility.test.ts` with co-located tests
4. Update the completeness guard in `index.test.ts` to include the new export count
5. Update this README with the new module documentation
