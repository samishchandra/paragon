/**
 * useTurndownService — Creates and configures a TurndownService instance
 * for converting HTML (from TipTap's getHTML()) to Markdown.
 *
 * Extracted from MarkdownEditor to improve maintainability.
 * The service is created once (no dependencies) and reused across renders.
 */
import { useMemo } from 'react';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { formatDateForMarkdown } from '../extensions/DatePill';

export function useTurndownService(): TurndownService {
  return useMemo(() => {
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

    // Helper: serialize a table cell's content to inline markdown
    // Handles text, images, lists, and mixed content within cells.
    // Uses <br> as line separator for multi-line content (lists, multiple paragraphs).
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
        
        // Handle lists (ul, ol) — serialize each item with marker
        if (tag === 'UL' || tag === 'OL') {
          const items = Array.from(el.querySelectorAll(':scope > li'));
          items.forEach((li, idx) => {
            const isTask = li.getAttribute('data-type') === 'taskItem';
            const isChecked = li.getAttribute('data-checked') === 'true';
            let text = '';
            // Get text from the li's paragraph children
            for (const liChild of Array.from(li.childNodes)) {
              if (liChild.nodeType === Node.ELEMENT_NODE) {
                const liEl = liChild as HTMLElement;
                if (liEl.nodeName === 'P' || liEl.nodeName === 'DIV' || liEl.nodeName === 'SPAN') {
                  text += getInlineText(liEl);
                } else if (liEl.nodeName === 'LABEL' || liEl.nodeName === 'INPUT') {
                  // Skip checkbox input elements (handled by isTask/isChecked)
                } else {
                  text += getInlineText(liEl);
                }
              } else {
                text += getInlineText(liChild);
              }
            }
            text = text.trim();
            
            if (isTask) {
              blocks.push(`- [${isChecked ? 'x' : ' '}] ${text}`);
            } else if (tag === 'OL') {
              blocks.push(`${idx + 1}. ${text}`);
            } else {
              blocks.push(`- ${text}`);
            }
          });
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

        rows.forEach((row, rowIndex) => {
          const cells = Array.from(row.querySelectorAll('th, td'));
          const cellContents = cells.map(cell => serializeTableCell(cell));

          result.push('| ' + cellContents.join(' | ') + ' |');

          // Add separator after header row
          if (rowIndex === 0) {
            const separator = cells.map(() => '---').join(' | ');
            result.push('| ' + separator + ' |');
          }
        });

        return '\n\n' + result.join('\n') + '\n\n';
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
    // e.g., ```ad-info\ncontent\n```
    td.addRule('callout', {
      filter: (node) => {
        return node.nodeName === 'DIV' && node.hasAttribute('data-callout');
      },
      replacement: (content, node) => {
        const calloutType = (node as HTMLElement).getAttribute('data-type') || 'info';
        // Clean up the content - remove leading/trailing whitespace and normalize newlines
        const cleanContent = content.trim().replace(/\n{3,}/g, '\n\n');
        return `\n\n\`\`\`ad-${calloutType}\n${cleanContent}\n\`\`\`\n\n`;
      },
    });

    return td;
  }, []);
}
