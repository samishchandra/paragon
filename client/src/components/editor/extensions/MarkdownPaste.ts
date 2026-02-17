import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export interface MarkdownPasteOptions {
  enableMarkdownPaste: boolean;
}

export const markdownPastePluginKey = new PluginKey('markdownPaste');

/**
 * Convert markdown image syntax in a table cell to HTML.
 * Handles: ![alt|align|width](url) → <figure class="image-resizer"><img .../></figure>
 */
function parseImageMetadata(metadata: string): { alt: string; align: string; width: string | null } {
  const parts = metadata.split(/\s*\\?\|\s*/).map((p: string) => p.trim());
  let alt = '', align = 'left', width: string | null = null;
  if (parts.length === 1) { alt = parts[0]; }
  else if (parts.length === 2) {
    alt = parts[0];
    if (/^\d+$/.test(parts[1])) width = parts[1];
    else if (['left', 'center', 'right'].includes(parts[1])) align = parts[1];
  } else if (parts.length === 3) {
    alt = parts[0];
    if (['left', 'center', 'right'].includes(parts[1])) align = parts[1];
    if (/^\d+$/.test(parts[2])) width = parts[2];
  }
  return { alt, align, width };
}

function imageToFigure(metadata: string, src: string): string {
  const { alt, align, width } = parseImageMetadata(metadata);
  const wrapperStyle = { left: 'margin-right: auto;', center: 'margin-left: auto; margin-right: auto;', right: 'margin-left: auto;' }[align] || 'margin-right: auto;';
  const widthAttr = width ? ` width="${width}" style="width: ${width}px"` : '';
  return `<figure class="image-resizer" style="${wrapperStyle}"><img src="${src.trim()}" alt="${alt}" data-align="${align}"${widthAttr} /></figure>`;
}

/**
 * Convert a single line (no <br>) that may contain images to HTML blocks.
 */
/**
 * Convert inline markdown formatting to HTML.
 * Handles: **bold**, *italic*, ~~strike~~, `code`, ==highlight==, [link](url)
 */
function inlineMarkdownToHtml(text: string): string {
  let result = text;
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
  result = result.replace(/~~(.+?)~~/g, '<s>$1</s>');
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>');
  result = result.replace(/==(.+?)==/g, '<mark>$1</mark>');
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return result;
}

function convertLineToBlocks(line: string): string {
  const hasImages = /!\[[^\]]*\]\([^)]+\)/.test(line);
  if (!hasImages) return `<p>${inlineMarkdownToHtml(line)}</p>`;
  const imgPattern = /(!\[[^\]]*\]\([^)]+\))/g;
  const segments = line.split(imgPattern).filter(s => s.trim());
  const blocks: string[] = [];
  for (const segment of segments) {
    const imgMatch = segment.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) blocks.push(imageToFigure(imgMatch[1], imgMatch[2]));
    else blocks.push(`<p>${inlineMarkdownToHtml(segment.trim())}</p>`);
  }
  return blocks.join('');
}

/**
 * Parse a list line and return its type, depth, and content.
 * Indentation is 2 spaces per level.
 */
type ListLineInfo = { type: 'ul' | 'ol' | 'task'; depth: number; text: string; checked?: boolean };
function parseListLine(rawLine: string): ListLineInfo | null {
  const indentMatch = rawLine.match(/^( *)/);
  const spaces = indentMatch ? indentMatch[1].length : 0;
  const depth = Math.floor(spaces / 2);
  const trimmed = rawLine.trimStart();
  
  const taskMatch = trimmed.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (taskMatch) return { type: 'task', depth, text: taskMatch[2].trim(), checked: taskMatch[1] === 'x' };
  const ulMatch = trimmed.match(/^-\s+(.+)$/);
  if (ulMatch) return { type: 'ul', depth, text: ulMatch[1].trim() };
  const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
  if (olMatch) return { type: 'ol', depth, text: olMatch[2].trim() };
  return null;
}

/**
 * Build nested list HTML from a sequence of parsed list lines.
 */
function buildNestedListHtml(items: ListLineInfo[]): string {
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
        if (isTask) html += `<li data-type="taskItem" data-checked="${item.checked || false}"><p>${inlineMarkdownToHtml(item.text)}</p>`;
        else html += `<li><p>${inlineMarkdownToHtml(item.text)}</p>`;
        if (i + 1 < items.length && items[i + 1].depth > parentDepth) {
          const child = buildLevel(i + 1, items[i + 1].depth);
          html += child.html;
          i = child.nextIdx;
        } else { i++; }
        html += '</li>';
      } else { i++; }
    }
    html += closeTag;
    return { html, nextIdx: i };
  };
  const minDepth = Math.min(...items.map(it => it.depth));
  return buildLevel(0, minDepth).html;
}

/**
 * Convert markdown cell content (text, images, lists with nesting, or mixed) to HTML blocks.
 * Supports nested sub-lists (indented with 2 spaces per level).
 */
function convertCellContent(cellText: string): string {
  if (!cellText.trim()) return '<p></p>';
  const hasBr = /<br\s*\/?>/i.test(cellText);
  const hasListMarker = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(cellText);
  if (!hasBr && !hasListMarker) return convertLineToBlocks(cellText);
  
  const rawLines = cellText.split(/<br\s*\/?>/i).filter(l => l.trim());
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
      if (pendingListItems.length > 0 && listInfo.depth === 0 && listInfo.type !== pendingListItems[0].type) flushList();
      pendingListItems.push(listInfo);
    } else {
      flushList();
      blocks.push(convertLineToBlocks(rawLine.trim()));
    }
  }
  flushList();
  return blocks.join('');
}

// Parse a markdown table and convert to HTML
function parseMarkdownTable(tableText: string): string {
  const lines = tableText.trim().split('\n');
  if (lines.length < 2) return '';
  
  // Parse header row
  const headerLine = lines[0];
  const headerCells = headerLine
    .split('|')
    .map(cell => cell.trim())
    .filter(cell => cell.length > 0);
  
  if (headerCells.length === 0) return '';
  
  // Check for separator row (second line should have dashes)
  const separatorLine = lines[1];
  if (!separatorLine.includes('-')) return '';
  
  // Parse data rows
  const dataRows = lines.slice(2);
  
  let html = '<table><thead><tr>';
  
  // Add header cells
  for (const cell of headerCells) {
    html += `<th>${convertCellContent(cell)}</th>`;
  }
  
  html += '</tr></thead><tbody>';
  
  // Add data rows
  for (const row of dataRows) {
    if (!row.trim()) continue;
    
    const cells = row
      .split('|')
      .map(cell => cell.trim())
      .filter((_, index, arr) => {
        // Filter out empty cells at the beginning and end (from leading/trailing pipes)
        if (index === 0 && arr[0] === '') return false;
        if (index === arr.length - 1 && arr[arr.length - 1] === '') return false;
        return true;
      });
    
    // Re-parse to handle the filtering correctly
    const rawCells = row.split('|');
    const filteredCells: string[] = [];
    for (let i = 0; i < rawCells.length; i++) {
      const cell = rawCells[i].trim();
      // Skip first empty cell if line starts with |
      if (i === 0 && cell === '' && row.trim().startsWith('|')) continue;
      // Skip last empty cell if line ends with |
      if (i === rawCells.length - 1 && cell === '' && row.trim().endsWith('|')) continue;
      filteredCells.push(cell);
    }
    
    if (filteredCells.length === 0) continue;
    
    html += '<tr>';
    
    // Ensure we have the same number of cells as headers
    for (let i = 0; i < headerCells.length; i++) {
      const cellContent = filteredCells[i] || '';
      html += `<td>${convertCellContent(cellContent)}</td>`;
    }
    
    html += '</tr>';
  }
  
  html += '</tbody></table>';
  
  return html;
}

// Check if a block of text is a markdown table
function isMarkdownTable(text: string): boolean {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return false;
  
  // First line should have pipes
  if (!lines[0].includes('|')) return false;
  
  // Second line should be the separator with dashes and pipes
  const separatorPattern = /^[\s|:-]+$/;
  if (!separatorPattern.test(lines[1]) || !lines[1].includes('-')) return false;
  
  return true;
}

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  let html = markdown;
  
  // First, extract and convert tables
  // Tables are multi-line structures, so we need to handle them specially
  const tablePattern = /^(\|[^\n]+\|\n\|[-:\s|]+\|\n(?:\|[^\n]+\|\n?)*)/gm;
  const tables: { placeholder: string; html: string }[] = [];
  let tableIndex = 0;
  
  html = html.replace(tablePattern, (match) => {
    const tableHtml = parseMarkdownTable(match);
    if (tableHtml) {
      const placeholder = `__TABLE_PLACEHOLDER_${tableIndex}__`;
      tables.push({ placeholder, html: tableHtml });
      tableIndex++;
      return placeholder;
    }
    return match;
  });
  
  // Also handle tables without leading pipe
  const tablePatternNoPipe = /^([^\n|]+\|[^\n]+\n[-:\s|]+\n(?:[^\n]+\n?)*)/gm;
  html = html.replace(tablePatternNoPipe, (match) => {
    if (isMarkdownTable(match)) {
      const tableHtml = parseMarkdownTable(match);
      if (tableHtml) {
        const placeholder = `__TABLE_PLACEHOLDER_${tableIndex}__`;
        tables.push({ placeholder, html: tableHtml });
        tableIndex++;
        return placeholder;
      }
    }
    return match;
  });
  
  // Escape HTML entities first (but not in table placeholders)
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  // Headers (must be at start of line)
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
  
  // Task lists (must come before regular lists)
  html = html.replace(/^(\s*)-\s*\[x\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="true">$2</li>');
  html = html.replace(/^(\s*)-\s*\[\s*\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="false">$2</li>');
  html = html.replace(/^(\s*)\*\s*\[x\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="true">$2</li>');
  html = html.replace(/^(\s*)\*\s*\[\s*\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="false">$2</li>');
  
  // Unordered lists
  html = html.replace(/^(\s*)-\s+(.+)$/gm, '$1<li>$2</li>');
  html = html.replace(/^(\s*)\*\s+(.+)$/gm, '$1<li>$2</li>');
  
  // Ordered lists
  html = html.replace(/^(\s*)\d+\.\s+(.+)$/gm, '$1<li>$2</li>');
  
  // Wrap consecutive li elements in ul/ol
  html = html.replace(/(<li data-type="taskItem"[^>]*>.*?<\/li>\n?)+/g, '<ul data-type="taskList">$&</ul>');
  html = html.replace(/(<li>.*?<\/li>\n?)+/g, '<ul>$&</ul>');
  
  // Blockquotes
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote><p>$1</p></blockquote>');
  
  // Horizontal rules
  html = html.replace(/^---+$/gm, '<hr>');
  html = html.replace(/^\*\*\*+$/gm, '<hr>');
  html = html.replace(/^___+$/gm, '<hr>');
  
  // Code blocks (fenced)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const language = lang || 'plaintext';
    return `<pre><code class="language-${language}">${code.trim()}</code></pre>`;
  });
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Bold (must come before italic)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
  
  // Strikethrough
  html = html.replace(/~~([^~]+)~~/g, '<s>$1</s>');
  
  // Highlight ==text==
  html = html.replace(/(?<!`)==((?:(?!==)[^\n])+)==(?!`)/g, '<mark>$1</mark>');
  
  // Images MUST be processed before links since ![...] would also match [...]
  // Images with optional alignment and width: ![alt|alignment|width](url), ![alt|width](url), or ![alt](url)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match: string, metadata: string, src: string) => {
    const parts = metadata.split('|').map((p: string) => p.trim());
    let alt = '', align = 'left', width: string | null = null;
    if (parts.length === 1) {
      alt = parts[0];
    } else if (parts.length === 2) {
      alt = parts[0];
      if (/^\d+$/.test(parts[1])) { width = parts[1]; }
      else if (['left','center','right'].includes(parts[1])) { align = parts[1]; }
      else { alt = metadata; }
    } else if (parts.length === 3) {
      alt = parts[0];
      if (['left','center','right'].includes(parts[1])) { align = parts[1]; }
      if (/^\d+$/.test(parts[2])) { width = parts[2]; }
    } else { alt = metadata; }
    const w = width ? ` width="${width}" style="width: ${width}px"` : '';
    return `<img src="${src.trim()}" alt="${alt}" data-align="${align}"${w}>`;
  });
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // Auto-detect URLs
  html = html.replace(/(?<!["\(])(https?:\/\/[^\s<]+)(?!["\)])/g, '<a href="$1">$1</a>');
  
  // Paragraphs - wrap lines that aren't already wrapped
  const lines = html.split('\n');
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    // Skip table placeholders
    if (trimmed.startsWith('__TABLE_PLACEHOLDER_')) return line;
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || 
        trimmed.startsWith('<li') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<pre') ||
        trimmed.startsWith('<hr') || trimmed.startsWith('</') || trimmed.startsWith('<table')) {
      return line;
    }
    return `<p>${trimmed}</p>`;
  });
  
  html = processedLines.join('\n');
  
  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>\s*<\/p>/g, '');
  
  // Restore tables
  for (const table of tables) {
    html = html.replace(table.placeholder, table.html);
  }
  
  return html;
}

// Check if text looks like markdown
function looksLikeMarkdown(text: string): boolean {
  const markdownPatterns = [
    /^#{1,6}\s+/m,           // Headers
    /\*\*[^*]+\*\*/,         // Bold
    /\*[^*]+\*/,             // Italic
    /__[^_]+__/,             // Bold (underscore)
    /_[^_]+_/,               // Italic (underscore)
    /~~[^~]+~~/,             // Strikethrough
    /==[^=]+==/,              // Highlight
    /`[^`]+`/,               // Inline code
    /```[\s\S]*?```/,        // Code blocks
    /^\s*[-*]\s+/m,          // Unordered lists
    /^\s*\d+\.\s+/m,         // Ordered lists
    /^\s*[-*]\s*\[[ x]\]/im, // Task lists
    /^>\s+/m,                // Blockquotes
    /\[.+\]\(.+\)/,          // Links
    /!\[.*\]\(.+\)/,         // Images
    /^---+$/m,               // Horizontal rules
    /^\*\*\*+$/m,            // Horizontal rules
    /^\|[^\n]+\|\n\|[-:\s|]+\|/m, // Tables with pipes
    /^[^|\n]+\|[^|\n]+\n[-:\s|]+/m, // Tables without leading pipe
  ];
  
  return markdownPatterns.some(pattern => pattern.test(text));
}

export const MarkdownPaste = Extension.create<MarkdownPasteOptions>({
  name: 'markdownPaste',

  addOptions() {
    return {
      enableMarkdownPaste: true,
    };
  },

  addProseMirrorPlugins() {
    const { editor } = this;

    return [
      new Plugin({
        key: markdownPastePluginKey,
        props: {
          handlePaste(view, event, slice) {
            try {
              const clipboardData = event.clipboardData;
              if (!clipboardData) return false;

              // Get plain text from clipboard
              const text = clipboardData.getData('text/plain');
              if (!text) return false;

              console.log('MarkdownPaste: Received text:', text.substring(0, 100));

              // Check if it looks like markdown
              if (!looksLikeMarkdown(text)) {
                console.log('MarkdownPaste: Text does not look like markdown');
                return false;
              }

              console.log('MarkdownPaste: Text looks like markdown, converting...');

              // Convert markdown to HTML
              const html = markdownToHtml(text);
              console.log('MarkdownPaste: Generated HTML:', html.substring(0, 200));
              
              // Insert the converted HTML
              editor.commands.insertContent(html, {
                parseOptions: {
                  preserveWhitespace: false,
                },
              });

              return true;
            } catch (error) {
              console.warn('MarkdownPaste: Error handling paste', error);
              return false;
            }
          },
        },
      }),
    ];
  },
});

export default MarkdownPaste;
