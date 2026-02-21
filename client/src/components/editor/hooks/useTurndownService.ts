/**
 * useTurndownService — Creates and configures a TurndownService instance
 * for converting HTML (from TipTap's getHTML()) to Markdown.
 *
 * PERFORMANCE: Uses lazy initialization — the TurndownService and its
 * dependencies (turndown, turndown-plugin-gfm) are only imported and
 * instantiated on the first call to .turndown(). This keeps the initial
 * bundle smaller by deferring ~40KB of library code until actually needed.
 *
 * Extracted from MarkdownEditor to improve maintainability.
 * The service is created once (no dependencies) and reused across renders.
 */
import { useRef } from 'react';
import type TurndownServiceType from 'turndown';
import { formatDateForMarkdown } from '../extensions/DatePill';

// Module-level cache so the TurndownService is created only once across all
// component instances and survives React strict-mode double-mounts.
let cachedService: TurndownServiceType | null = null;
let initPromise: Promise<TurndownServiceType> | null = null;

/**
 * Synchronously create and configure the TurndownService.
 * Called lazily on first use.
 */
async function createTurndownService(): Promise<TurndownServiceType> {
  if (cachedService) return cachedService;
  
  const [{ default: TurndownService }, { gfm }] = await Promise.all([
    import('turndown'),
    import('turndown-plugin-gfm'),
  ]);

  const td = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
    strongDelimiter: '**',
    // CRITICAL: Handle empty elements that Turndown considers "blank".
    // TipTap's getHTML() can produce <p></p> (no children) for empty lines.
    // Turndown's custom rules only run for non-blank nodes.
    // Blank nodes (empty textContent, no meaningful children) go through
    // blankReplacement instead. Without this, empty paragraphs are silently
    // dropped, causing user-intentional blank lines to disappear on reload.
    blankReplacement: (content: string, node: any) => {
      if (node.nodeName === 'P') {
        return '\n\n\u200B\n\n';
      }
      return node.isBlock ? '\n\n' : '';
    },
  });

  // Use GFM plugin for tables, strikethrough, and task lists
  td.use(gfm);

  // Add custom rules for better markdown output
  td.addRule('highlight', {
    filter: (node) => node.nodeName === 'MARK',
    replacement: (content) => `==${content}==`,
  });

  // Custom image rule to preserve width and alignment using ![alt|alignment|width](url) format
  td.addRule('resizableImage', {
    filter: 'img',
    replacement: (content, node) => {
      const img = node as HTMLImageElement;
      const src = img.getAttribute('src') || '';
      // Strip any previously embedded metadata from alt text (e.g. "photo|center|300" or "photo|300")
      const rawAlt = img.getAttribute('alt') || '';
      const alt = rawAlt.replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, '').trim();
      // Only use the explicit width attribute (set by resize handler), not style/computed
      const widthAttr = img.getAttribute('width');
      const width = widthAttr ? parseInt(widthAttr, 10) : null;
      // Get alignment from data-align attribute
      const align = img.getAttribute('data-align') || 'left';

      // Build metadata parts: alignment and width
      // Format: ![alt|alignment|width](url)
      // Only include alignment if non-default, only include width if set
      const parts: string[] = [alt];
      const hasNonDefaultAlign = align && align !== 'left';
      const hasWidth = width && width > 0;

      if (hasNonDefaultAlign || hasWidth) {
        parts.push(hasNonDefaultAlign ? align : 'left');
      }
      if (hasWidth) {
        parts.push(String(width));
      }

      return `![${parts.join(' | ')}](${src})`;
    },
  });

  td.addRule('taskListItem', {
    filter: (node) => {
      return node.nodeName === 'LI' &&
             node.getAttribute('data-type') === 'taskItem';
    },
    replacement: (content, node) => {
      const el = node as HTMLElement;
      const checkbox = el.querySelector('input[type="checkbox"]');
      // Check both the checkbox state and the data-checked attribute (TipTap fallback)
      const checked = checkbox?.hasAttribute('checked') ||
                     (checkbox as HTMLInputElement)?.checked ||
                     el.getAttribute('data-checked') === 'true';
      // Strip extra blank lines from <p> wrappers inside list items
      content = content
        .replace(/^\n+/, '')
        .replace(/\n+$/, '')
        .replace(/\n\n+/g, '\n\n');
      // Collapse blank line between text and nested list marker
      content = content.replace(/\n\n(- |\d+\. )/g, '\n$1');
      // Strip ZWSP and trim
      content = content.replace(/\u200B/g, '').trim();
      // Add ZWSP after empty checkboxes so marked parses them correctly
      const text = content || '\u200B';
      const prefix = `- [${checked ? 'x' : ' '}] `;
      return prefix + text.replace(/\n/gm, '\n    ') + '\n';
    },
  });

  // Tight lists: strip extra blank lines from <p> wrappers inside <li>
  td.addRule('tightListParagraph', {
    filter: (node) => {
      return node.nodeName === 'P' &&
             node.parentNode !== null &&
             (node.parentNode as HTMLElement).nodeName === 'LI';
    },
    replacement: (content) => {
      return content;
    },
  });

  // Blank line preservation: empty paragraphs emit ZWSP so blank lines survive round-trip
  td.addRule('blankLinePreservation', {
    filter: (node) => {
      return node.nodeName === 'P' &&
             (node.textContent === '' || node.textContent === '\u200B') &&
             node.parentNode !== null &&
             (node.parentNode as HTMLElement).nodeName !== 'LI';
    },
    replacement: () => {
      return '\n\n\u200B\n\n';
    },
  });

  // Helper: serialize an image element to markdown
  function serializeImage(el: HTMLElement): string {
    const src = el.getAttribute('src') || '';
    const rawAlt = el.getAttribute('alt') || '';
    const alt = rawAlt.replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, '').trim();
    const widthAttr = el.getAttribute('width');
    const width = widthAttr ? parseInt(widthAttr, 10) : null;
    const align = el.getAttribute('data-align') || 'left';
    const imgParts: string[] = [alt];
    const hasNonDefaultAlign = align && align !== 'left';
    const hasWidth = width && width > 0;
    if (hasNonDefaultAlign || hasWidth) {
      imgParts.push(hasNonDefaultAlign ? align : 'left');
    }
    if (hasWidth) {
      imgParts.push(String(width));
    }
    return `![${imgParts.join(' \\| ')}](${src})`;
  }

  // Helper: get inline text content from a node (handles bold, italic, etc.)
  function getInlineText(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return (node.textContent || '').replace(/\|/g, '\\|');
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (el.nodeName === 'IMG') return serializeImage(el);
      if (el.nodeName === 'BR') return '';
      // Recurse for inline elements (strong, em, code, span, a, etc.)
      let text = '';
      for (const child of Array.from(el.childNodes)) {
        text += getInlineText(child);
      }
      // Wrap with markdown formatting
      if (el.nodeName === 'STRONG' || el.nodeName === 'B') return `**${text}**`;
      if (el.nodeName === 'EM' || el.nodeName === 'I') return `*${text}*`;
      if (el.nodeName === 'S' || el.nodeName === 'DEL') return `~~${text}~~`;
      if (el.nodeName === 'CODE') return `\`${text}\``;
      if (el.nodeName === 'MARK') return `==${text}==`;
      if (el.nodeName === 'A') {
        const href = el.getAttribute('href') || '';
        return `[${text}](${href})`;
      }
      return text;
    }
    return '';
  }

  // Helper: serialize a list item's text content (excluding nested lists)
  function getListItemText(li: Element): string {
    let text = '';
    for (const liChild of Array.from(li.childNodes)) {
      if (liChild.nodeType === Node.ELEMENT_NODE) {
        const liEl = liChild as HTMLElement;
        const tag = liEl.nodeName;
        // Skip nested lists — they're handled recursively
        if (tag === 'UL' || tag === 'OL') continue;
        // Skip checkbox input elements (handled by isTask/isChecked)
        if (tag === 'LABEL' || tag === 'INPUT') continue;
        text += getInlineText(liEl);
      } else {
        text += getInlineText(liChild);
      }
    }
    return text.trim();
  }

  // Helper: recursively serialize a list (ul/ol) with indentation for nesting
  function serializeList(listEl: Element, blocks: string[], depth: number = 0): void {
    const indent = '  '.repeat(depth);
    const tag = listEl.nodeName;
    const directItems = Array.from(listEl.childNodes).filter(
      (n) => n.nodeType === Node.ELEMENT_NODE && (n as HTMLElement).nodeName === 'LI'
    ) as HTMLElement[];
    
    directItems.forEach((li, idx) => {
      const isTask = li.getAttribute('data-type') === 'taskItem';
      const isChecked = li.getAttribute('data-checked') === 'true';
      const text = getListItemText(li);
      
      if (isTask) {
        blocks.push(`${indent}- [${isChecked ? 'x' : ' '}] ${text}`);
      } else if (tag === 'OL') {
        blocks.push(`${indent}${idx + 1}. ${text}`);
      } else {
        blocks.push(`${indent}- ${text}`);
      }
      
      // Recurse into nested lists within this li
      const nestedLists = Array.from(li.childNodes).filter(
        (n) => n.nodeType === Node.ELEMENT_NODE && 
               ((n as HTMLElement).nodeName === 'UL' || (n as HTMLElement).nodeName === 'OL')
      ) as HTMLElement[];
      for (const nestedList of nestedLists) {
        serializeList(nestedList, blocks, depth + 1);
      }
    });
  }

  // Helper: serialize a table cell's content to inline markdown
  function serializeTableCell(cell: Element): string {
    const blocks: string[] = [];
    
    for (const child of Array.from(cell.childNodes)) {
      if (child.nodeType !== Node.ELEMENT_NODE) {
        const text = (child.textContent || '').trim();
        if (text) blocks.push(text.replace(/\|/g, '\\|'));
        continue;
      }
      
      const el = child as HTMLElement;
      const tag = el.nodeName;
      
      // Handle lists (ul, ol) — recursively serialize with indentation
      if (tag === 'UL' || tag === 'OL') {
        serializeList(el, blocks, 0);
        continue;
      }
      
      // Handle images (figure wrapper or direct img)
      if (tag === 'FIGURE') {
        const img = el.querySelector('img');
        if (img) {
          blocks.push(serializeImage(img));
        }
        continue;
      }
      
      if (tag === 'IMG') {
        blocks.push(serializeImage(el));
        continue;
      }
      
      // Handle paragraphs and other block elements
      const text = getInlineText(el).trim();
      if (text) {
        blocks.push(text);
      }
    }
    
    return blocks.join(' <br> ') || '';
  }

  // Custom table rule to handle TipTap's table structure
  td.addRule('table', {
    filter: 'table',
    replacement: function(content, node) {
      const table = node as HTMLTableElement;
      const rows = Array.from(table.querySelectorAll('tr'));
      if (rows.length === 0) return '';

      const result: string[] = [];
      let hasHeaderColumn = false;

      rows.forEach((row, rowIndex) => {
        const cells = Array.from(row.querySelectorAll('th, td'));
        const cellContents = cells.map(cell => serializeTableCell(cell));

        if (rowIndex > 0 && cells.length > 0 && cells[0].nodeName === 'TH') {
          hasHeaderColumn = true;
        }

        result.push('| ' + cellContents.join(' | ') + ' |');

        if (rowIndex === 0) {
          const separator = cells.map(() => '---').join(' | ');
          result.push('| ' + separator + ' |');
        }
      });

      const marker = hasHeaderColumn ? '\n<!-- header-column -->' : '';
      return '\n\n' + result.join('\n') + marker + '\n\n';
    }
  });

  // Skip th and td since they're handled by the table rule
  td.addRule('tableCell', {
    filter: ['th', 'td'],
    replacement: function(content) {
      return content;
    }
  });

  // Date pill rule: serialize as @Feb 11, 2025@ markdown format
  td.addRule('datePill', {
    filter: (node) => {
      return node.nodeName === 'SPAN' &&
             (node as HTMLElement).getAttribute('data-type') === 'date-pill';
    },
    replacement: (content, node) => {
      const dateStr = (node as HTMLElement).getAttribute('data-date');
      if (dateStr) {
        return `@${formatDateForMarkdown(dateStr)}@`;
      }
      return content;
    },
  });

  // Tag pill rule: serialize as #tagname markdown format
  td.addRule('tagPill', {
    filter: (node) => {
      return node.nodeName === 'SPAN' &&
             (node as HTMLElement).getAttribute('data-type') === 'tag-pill';
    },
    replacement: (content, node) => {
      const tag = (node as HTMLElement).getAttribute('data-tag');
      if (tag) {
        return `#${tag}`;
      }
      return content;
    },
  });

  // Wiki link rule: convert <span data-wiki-link> back to [[title]]
  td.addRule('wikiLink', {
    filter: (node) => {
      return node.nodeName === 'SPAN' &&
             (node as HTMLElement).hasAttribute('data-wiki-link');
    },
    replacement: (content, node) => {
      const pageName = (node as HTMLElement).getAttribute('data-page-name');
      if (pageName) {
        return `[[${pageName}]]`;
      }
      return content;
    },
  });

  // Custom callout rule to convert callouts to markdown code block syntax
  td.addRule('callout', {
    filter: (node) => {
      return node.nodeName === 'DIV' && node.hasAttribute('data-callout');
    },
    replacement: (content, node) => {
      const calloutType = (node as HTMLElement).getAttribute('data-type') || 'info';
      const cleanContent = content.trim().replace(/\n{3,}/g, '\n\n');
      return `\n\n\`\`\`ad-${calloutType}\n${cleanContent}\n\`\`\`\n\n`;
    },
  });

  cachedService = td;
  return td;
}

/**
 * Eagerly start loading the TurndownService in the background.
 * Called once when the hook is first used so the library is ready
 * by the time the user actually needs it (blur, mode switch, etc.).
 */
function ensureLoading(): void {
  if (!initPromise && !cachedService) {
    initPromise = createTurndownService().then(svc => {
      cachedService = svc;
      return svc;
    });
  }
}

/**
 * A wrapper that provides a synchronous .turndown() interface.
 * On first call, if the service hasn't loaded yet, it triggers a synchronous
 * fallback (returns empty string) and logs a warning. In practice, the
 * background preload ensures the service is ready before any user action.
 */
interface LazyTurndownService {
  turndown(html: string): string;
  /** Check if the underlying service is ready */
  isReady(): boolean;
  /** Wait for the service to be ready */
  ready(): Promise<void>;
}

function createLazyWrapper(): LazyTurndownService {
  ensureLoading();
  
  return {
    turndown(html: string): string {
      if (cachedService) {
        return cachedService.turndown(html);
      }
      // Service not yet loaded — this should be rare due to preloading
      console.warn('[Paragon] TurndownService not yet loaded, returning empty markdown');
      return '';
    },
    isReady(): boolean {
      return cachedService !== null;
    },
    async ready(): Promise<void> {
      if (cachedService) return;
      if (initPromise) {
        await initPromise;
      } else {
        await createTurndownService();
      }
    },
  };
}

/**
 * Hook that returns a lazy TurndownService wrapper.
 * The actual library is loaded in the background on first mount.
 * The returned object has a synchronous .turndown() method that works
 * identically to the original TurndownService.
 */
export function useTurndownService(): LazyTurndownService {
  const wrapperRef = useRef<LazyTurndownService | null>(null);
  if (!wrapperRef.current) {
    wrapperRef.current = createLazyWrapper();
  }
  return wrapperRef.current;
}
