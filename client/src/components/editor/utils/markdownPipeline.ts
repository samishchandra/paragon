/**
 * Markdown ↔ HTML conversion pipeline.
 *
 * Extracts the pre-processing (markdown → intermediate) and post-processing
 * (HTML → TipTap-compatible HTML) steps from MarkdownEditor so they can be
 * tested and maintained independently.
 *
 * The pipeline is split into two phases:
 *   1. **Pre-process** (`preprocessMarkdown`): transforms raw markdown before
 *      it is handed to `marked.parse()`.
 *   2. **Post-process** (`postprocessHtml`): transforms the HTML that
 *      `marked.parse()` returns into the structure TipTap expects.
 *
 * A convenience function `markdownToHtml` orchestrates both phases plus the
 * `marked.parse()` call itself.
 */

import { splitSeparatedLists } from './splitSeparatedLists';
import { convertCheckboxListsToTaskLists } from './convertCheckboxLists';
import { structureImagesInListItems } from './structureImagesInListItems';
import { restoreHeaderColumn } from './restoreHeaderColumn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Options that control which pre-processing steps run. */
export interface PreprocessOptions {
  /** When true, #tag tokens are converted to tag-pill HTML. */
  enableTagAutoDetect?: boolean;
  /** When true, tag pill processing is skipped regardless of enableTagAutoDetect. */
  disableTagPills?: boolean;
  /** Function to validate a normalised tag string. */
  isValidTag?: (tag: string) => boolean;
  /** Function to normalise a tag string (e.g. lowercase + trim). */
  normalizeTag?: (tag: string) => string;
  /** Function to parse a date string from markdown @date@ syntax. Returns ISO string or null. */
  parseDateFromMarkdown?: (text: string) => string | null;
  /** Function to compute the date-pill variant class from an ISO date string. */
  getDateVariant?: (isoDate: string) => string;
}

// ---------------------------------------------------------------------------
// Inline markdown helpers (used by table-cell reconstruction)
// ---------------------------------------------------------------------------

/**
 * Convert inline markdown formatting to HTML.
 * Handles: **bold**, *italic*, ~~strike~~, `code`, ==highlight==, [link](url)
 */
export function inlineMarkdownToHtml(text: string): string {
  let result = text;
  // Bold: **text**
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic: *text*
  result = result.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
  // Strikethrough: ~~text~~
  result = result.replace(/~~(.+?)~~/g, '<s>$1</s>');
  // Code: `text`
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Highlight: ==text==
  result = result.replace(/==(.+?)==/g, '<mark>$1</mark>');
  // Links: [text](url)
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return result;
}

/**
 * Wrap an `<img>` tag in a `<figure class="image-resizer">` with alignment styling.
 */
export function imgToFigure(imgTag: string): string {
  const alignMatch = imgTag.match(/data-align="([^"]*)"/);
  const align = (alignMatch ? alignMatch[1] : 'left') as 'left' | 'center' | 'right';
  const wrapperStyle: string = {
    left: 'margin-right: auto;',
    center: 'margin-left: auto; margin-right: auto;',
    right: 'margin-left: auto;',
  }[align] || 'margin-right: auto;';
  return `<figure class="image-resizer" style="${wrapperStyle}">${imgTag.trim()}</figure>`;
}

/**
 * Convert a single line that may contain images into HTML block(s).
 */
export function lineToBlocks(line: string): string {
  if (/<img\s/i.test(line)) {
    const imgSplitRegex = /(<img\s[^>]*\/?>)/gi;
    const segments = line.split(imgSplitRegex).filter(s => s.trim());
    return segments.map(seg => {
      if (/^<img\s/i.test(seg)) return imgToFigure(seg);
      if (seg.trim()) return `<p>${inlineMarkdownToHtml(seg.trim())}</p>`;
      return '';
    }).join('');
  }
  if (/^!\[/.test(line)) {
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${imgMatch[2]}" alt="${imgMatch[1]}" data-align="left" /></figure>`;
    }
  }
  return `<p>${inlineMarkdownToHtml(line)}</p>`;
}

// ---------------------------------------------------------------------------
// List-line parsing (used by table-cell reconstruction)
// ---------------------------------------------------------------------------

export type ListLineInfo = {
  type: 'ul' | 'ol' | 'task';
  depth: number;
  text: string;
  checked?: boolean;
  index?: number;
};

/** Parse a single line into list-line metadata, or null if not a list line. */
export function parseListLine(rawLine: string): ListLineInfo | null {
  const indentMatch = rawLine.match(/^( *)/);
  const spaces = indentMatch ? indentMatch[1].length : 0;
  const depth = Math.floor(spaces / 2);
  const trimmed = rawLine.trimStart();

  // Task list: - [x] text or - [ ] text
  const taskMatch = trimmed.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (taskMatch) {
    return { type: 'task', depth, text: taskMatch[2].trim(), checked: taskMatch[1] === 'x' };
  }
  // Unordered: - text
  const ulMatch = trimmed.match(/^-\s+(.+)$/);
  if (ulMatch) {
    return { type: 'ul', depth, text: ulMatch[1].trim() };
  }
  // Ordered: 1. text
  const olMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
  if (olMatch) {
    return { type: 'ol', depth, text: olMatch[2].trim(), index: parseInt(olMatch[1], 10) };
  }
  return null;
}

/** Build nested list HTML from a sequence of parsed list lines. */
export function buildNestedListHtml(items: ListLineInfo[]): string {
  if (items.length === 0) return '';

  const buildLevel = (startIdx: number, parentDepth: number): { html: string; nextIdx: number } => {
    let html = '';
    let i = startIdx;
    const listType = items[i]?.type || 'ul';
    const isTask = listType === 'task';
    const openTag = isTask ? '<ul data-type="taskList">' : `<${listType === 'ol' ? 'ol' : 'ul'}>`;
    const closeTag = isTask ? '</ul>' : `</${listType === 'ol' ? 'ol' : 'ul'}>`;

    html += openTag;

    while (i < items.length && items[i].depth >= parentDepth) {
      const item = items[i];

      if (item.depth === parentDepth) {
        if (isTask) {
          html += `<li data-type="taskItem" data-checked="${item.checked || false}"><p>${inlineMarkdownToHtml(item.text)}</p>`;
        } else {
          html += `<li><p>${inlineMarkdownToHtml(item.text)}</p>`;
        }

        if (i + 1 < items.length && items[i + 1].depth > parentDepth) {
          const child = buildLevel(i + 1, items[i + 1].depth);
          html += child.html;
          i = child.nextIdx;
        } else {
          i++;
        }

        html += '</li>';
      } else {
        i++;
      }
    }

    html += closeTag;
    return { html, nextIdx: i };
  };

  const minDepth = Math.min(...items.map(it => it.depth));
  const result = buildLevel(0, minDepth);
  return result.html;
}

// ---------------------------------------------------------------------------
// Table-cell reconstruction
// ---------------------------------------------------------------------------

/**
 * Reconstruct rich content inside table cells.
 *
 * Handles images (→ `<figure>`), lists with nesting, ordered lists,
 * task lists, and mixed content. The turndown serialiser encodes multi-line
 * content with `<br>` separators; nested lists use 2-space indentation.
 */
export function reconstructTableCells(html: string): string {
  return html.replace(
    /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
    (match, tdOpen: string, cellContent: string, tdClose: string) => {
      const hasImages = /<img\s/i.test(cellContent);
      const hasBr = /<br\s*\/?>/i.test(cellContent);
      const hasListMarker = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(cellContent);

      if (!hasImages && !hasBr && !hasListMarker) return match;

      let inner = cellContent.trim();
      inner = inner.replace(/^<p>([\s\S]*)<\/p>$/i, '$1').trim();

      const rawLines = inner.split(/<br\s*\/?>/i).filter(l => l.trim());

      if (rawLines.length <= 1 && !hasListMarker) {
        if (!hasImages) return match;
        return `${tdOpen}${lineToBlocks(inner)}${tdClose}`;
      }

      const blocks: string[] = [];
      let pendingListItems: ListLineInfo[] = [];

      const flushList = () => {
        if (pendingListItems.length === 0) return;
        blocks.push(buildNestedListHtml(pendingListItems));
        pendingListItems = [];
      };

      for (const rawLine of rawLines) {
        const listInfo = parseListLine(rawLine);

        if (listInfo) {
          if (pendingListItems.length > 0) {
            const firstType = pendingListItems[0].type;
            if (listInfo.depth === 0 && listInfo.type !== firstType) {
              flushList();
            }
          }
          pendingListItems.push(listInfo);
        } else {
          flushList();
          blocks.push(lineToBlocks(rawLine.trim()));
        }
      }

      flushList();

      return `${tdOpen}${blocks.join('')}${tdClose}`;
    },
  );
}

// ---------------------------------------------------------------------------
// Pre-processing: markdown → intermediate markdown
// ---------------------------------------------------------------------------

/**
 * Pre-process raw markdown before handing it to `marked.parse()`.
 *
 * This handles custom syntax that `marked` does not understand natively:
 * callout code blocks, image metadata, highlight marks, date pills,
 * tag pills, and wiki links.
 *
 * The `markedParse` callback is injected so this module does not need to
 * import `marked` directly (it is lazy-loaded by the caller).
 */
export function preprocessMarkdown(
  markdown: string,
  markedParse: (src: string) => string,
  options: PreprocessOptions = {},
): string {
  const {
    enableTagAutoDetect = false,
    disableTagPills = false,
    isValidTag: isValidTagFn,
    normalizeTag: normalizeTagFn,
    parseDateFromMarkdown: parseDateFn,
    getDateVariant: getDateVariantFn,
  } = options;

  let md = markdown;

  // 1. Split separated lists (before marked merges them)
  md = splitSeparatedLists(md);

  // 2. Callout code blocks → callout HTML (ad- prefix and legacy)
  const calloutTypes = ['info', 'note', 'prompt', 'resources', 'todo'];
  calloutTypes.forEach(type => {
    const regex = new RegExp(`\`\`\`ad-${type}\\s*\\n([\\s\\S]*?)\`\`\``, 'g');
    md = md.replace(regex, (_match, content) => {
      const innerHtml = markedParse(content.trim());
      return `<div data-callout="" data-type="${type}" class="callout callout-${type}">${innerHtml}</div>`;
    });
  });
  calloutTypes.forEach(type => {
    const regex = new RegExp(`\`\`\`${type}\\s*\\n([\\s\\S]*?)\`\`\``, 'g');
    md = md.replace(regex, (_match, content) => {
      const innerHtml = markedParse(content.trim());
      return `<div data-callout="" data-type="${type}" class="callout callout-${type}">${innerHtml}</div>`;
    });
  });

  // 3. Image metadata: ![alt|alignment|width](url) → <img> tags
  md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, metadata, src) => {
    const parts = metadata.split('|').map((p: string) => p.trim());
    let alt = '';
    let align = 'left';
    let width: string | null = null;

    if (parts.length === 1) {
      alt = parts[0];
    } else if (parts.length === 2) {
      alt = parts[0];
      if (/^\d+$/.test(parts[1])) {
        width = parts[1];
      } else if (['left', 'center', 'right'].includes(parts[1])) {
        align = parts[1];
      } else {
        alt = metadata;
      }
    } else if (parts.length === 3) {
      alt = parts[0];
      if (['left', 'center', 'right'].includes(parts[1])) {
        align = parts[1];
      }
      if (/^\d+$/.test(parts[2])) {
        width = parts[2];
      }
    } else {
      alt = metadata;
    }

    const widthAttr = width ? ` width="${width}" style="width: ${width}px"` : '';
    const alignAttr = ` data-align="${align}"`;
    return `<img src="${src.trim()}" alt="${alt}"${alignAttr}${widthAttr} />`;
  });

  // 4. Highlight: ==text== → <mark>
  md = md.replace(/(?<!`)==((?:(?!==)[^\n])+)==(?!`)/g, '<mark>$1</mark>');

  // 5. Date pills: @date text@ → date-pill HTML
  if (parseDateFn && getDateVariantFn) {
    md = md.replace(/@([^@\n]+)@/g, (match, dateText) => {
      const parsed = parseDateFn(dateText);
      if (parsed) {
        const variant = getDateVariantFn(parsed);
        return `<span data-type="date-pill" data-date="${parsed}" class="date-pill ${variant}"><span class="date-icon">📅</span><span class="date-text">${dateText.trim()}</span></span>`;
      }
      return match;
    });
  }

  // 6. Tag pills: #tagname → tag-pill HTML (conditional)
  if (enableTagAutoDetect && !disableTagPills && isValidTagFn && normalizeTagFn) {
    md = md.replace(
      /(?:^|(?<=\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\s|$|[.,;:!?)\]])/gm,
      (match, tag) => {
        const normalized = normalizeTagFn(tag);
        if (isValidTagFn(normalized)) {
          return `<span data-type="tag-pill" data-tag="${normalized}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${normalized}</span></span>`;
        }
        return match;
      },
    );
  }

  // 7. Wiki links: [[page name]] → wiki-link HTML (skip inside code)
  const wikiParts = md.split(/(```[\s\S]*?```|`[^`\n]+`)/g);
  md = wikiParts.map((part, idx) => {
    if (idx % 2 === 1) return part;
    return part.replace(/\[\[([^\[\]]+)\]\]/g, (_match, pageName) => {
      return `<span data-wiki-link data-page-name="${pageName.trim()}" class="wiki-link">${pageName.trim()}</span>`;
    });
  }).join('');

  return md;
}

// ---------------------------------------------------------------------------
// Post-processing: marked HTML → TipTap-compatible HTML
// ---------------------------------------------------------------------------

/**
 * Post-process the HTML returned by `marked.parse()` into the structure
 * that TipTap expects.
 *
 * Steps: list-break separators → task lists → image structure → header
 * column restoration → table-cell reconstruction.
 */
export function postprocessHtml(html: string): string {
  let result = html;

  // 1. List-break separators → invisible separator paragraphs
  result = result.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">\u200B</p>',
  );

  // 2. Checkbox lists → TipTap task lists
  result = convertCheckboxListsToTaskLists(result);

  // 3. Images inside list items → <figure> wrappers
  result = structureImagesInListItems(result);

  // 4. Restore header column from <!-- header-column --> marker
  result = restoreHeaderColumn(result);

  // 5. Reconstruct rich content inside table cells
  result = reconstructTableCells(result);

  return result;
}

// ---------------------------------------------------------------------------
// Full pipeline convenience function
// ---------------------------------------------------------------------------

/**
 * Convert raw markdown to TipTap-compatible HTML.
 *
 * Orchestrates pre-processing, `marked.parse()`, and post-processing.
 *
 * @param markdown - Raw markdown string
 * @param markedParse - A callback wrapping `marked.parse(src, { async: false, breaks: true })`
 * @param options - Feature flags and extension helpers
 */
export function markdownToHtml(
  markdown: string,
  markedParse: (src: string) => string,
  options: PreprocessOptions = {},
): string {
  const preprocessed = preprocessMarkdown(markdown, markedParse, options);
  const rawHtml = markedParse(preprocessed);
  return postprocessHtml(rawHtml);
}
