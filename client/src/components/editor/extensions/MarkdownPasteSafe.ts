import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export interface MarkdownPasteOptions {
  enableMarkdownPaste: boolean;
}

// Pre-compiled regex patterns for better performance
const MARKDOWN_PATTERNS = {
  header: /^#{1,6}\s+/m,
  bold: /\*\*[^*]+\*\*/,
  codeBlock: /```[\s\S]*?```/,
  list: /^\s*[-*]\s+/m,
  taskList: /^\s*[-*]\s*\[[ x]\]/im,
  link: /\[.+\]\(.+\)/,
  // Table pattern: header row with pipes, separator row with dashes, optional data rows
  // Allow headers and separators with or without trailing pipes
  table: /^\|[^\n]+\n\|[-:\s|]+/m,
  // Callout pattern: ```info, ```warning, ```error, ```success, ```note
  callout: /```(?:info|warning|error|success|note)\s*\n[\s\S]*?```/,
};

// Callout types for parsing
const CALLOUT_TYPES = ['info', 'warning', 'error', 'success', 'note'];

// Quick check if text looks like markdown (optimized - check most common patterns first)
function looksLikeMarkdown(text: string): boolean {
  // Check length first - very short text unlikely to be markdown
  if (text.length < 3) return false;
  
  // Check most common patterns first for early exit
  if (MARKDOWN_PATTERNS.header.test(text)) return true;
  if (MARKDOWN_PATTERNS.bold.test(text)) return true;
  if (MARKDOWN_PATTERNS.list.test(text)) return true;
  if (MARKDOWN_PATTERNS.taskList.test(text)) return true;
  if (MARKDOWN_PATTERNS.codeBlock.test(text)) return true;
  if (MARKDOWN_PATTERNS.callout.test(text)) return true;
  if (MARKDOWN_PATTERNS.link.test(text)) return true;
  if (MARKDOWN_PATTERNS.table.test(text)) return true;
  
  return false;
}

// Parse markdown table to HTML
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
  
  // Verify separator row
  const separatorLine = lines[1];
  if (!separatorLine.includes('-')) return '';
  
  // Parse data rows
  const dataRows = lines.slice(2);
  
  // Build HTML table
  let html = '<table><thead><tr>';
  
  for (const cell of headerCells) {
    html += '<th><p>' + cell + '</p></th>';
  }
  
  html += '</tr></thead><tbody>';
  
  for (const row of dataRows) {
    if (!row.trim()) continue;
    
    const rawCells = row.split('|');
    const filteredCells: string[] = [];
    
    for (let i = 0; i < rawCells.length; i++) {
      const cell = rawCells[i].trim();
      // Skip empty cells at start/end if row starts/ends with |
      if (i === 0 && cell === '' && row.trim().startsWith('|')) continue;
      if (i === rawCells.length - 1 && cell === '' && row.trim().endsWith('|')) continue;
      filteredCells.push(cell);
    }
    
    if (filteredCells.length === 0) continue;
    
    html += '<tr>';
    
    for (let i = 0; i < headerCells.length; i++) {
      const cellContent = filteredCells[i] || '';
      html += '<td><p>' + cellContent + '</p></td>';
    }
    
    html += '</tr>';
  }
  
  html += '</tbody></table>';
  
  return html;
}

// Optimized markdown to HTML converter
// Uses a single pass approach where possible
function markdownToHtml(markdown: string): string {
  let html = markdown;
  
  // Tables first - find and replace markdown tables with HTML tables
  // Pattern matches consecutive lines starting with | (header, separator, data rows)
  const tablePattern = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm;
  const tablePlaceholders: string[] = [];
  
  html = html.replace(tablePattern, (match) => {
    // Validate that this is actually a table (has separator row with dashes)
    const lines = match.split('\n');
    if (lines.length >= 2) {
      const separatorLine = lines[1];
      // Check if second line is a separator (contains |, -, :, and spaces)
      // Allow separators with or without trailing pipes
      if (/^\|?[\s\-:|]+\|?$/.test(separatorLine) && separatorLine.includes('-')) {
        const tableHtml = parseMarkdownTable(match);
        if (tableHtml) {
          // Use a unique placeholder that won't be affected by markdown parsing (no underscores)
          const placeholder = `MANUSTABLEPLACEHOLDER${tablePlaceholders.length}END`;
          tablePlaceholders.push(tableHtml);
          return placeholder;
        }
      }
    }
    return match;
  });
  
  // Callout blocks (before regular code blocks)
  // Convert ```info, ```warning, etc. to callout HTML
  CALLOUT_TYPES.forEach(type => {
    const calloutRegex = new RegExp(`\`\`\`${type}\\s*\\n([\\s\\S]*?)\`\`\``, 'g');
    html = html.replace(calloutRegex, (_, content) => {
      // Process the content inside the callout (convert markdown to HTML)
      let innerHtml = content.trim();
      // Apply basic markdown formatting to inner content
      innerHtml = innerHtml.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      innerHtml = innerHtml.replace(/__([^_]+)__/g, '<strong>$1</strong>');
      innerHtml = innerHtml.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
      innerHtml = innerHtml.replace(/(?<!_)_([^_]+)_(?!_)/g, '<em>$1</em>');
      innerHtml = innerHtml.replace(/`([^`]+)`/g, '<code>$1</code>');
      // Wrap in paragraph if not already wrapped
      if (!innerHtml.startsWith('<')) {
        innerHtml = `<p>${innerHtml}</p>`;
      }
      return `<div data-callout="" data-type="${type}" class="callout callout-${type}">${innerHtml}</div>`;
    });
  });
  
  // Code blocks (preserve content inside) - skip callout types
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    // Skip if this is a callout type (already processed)
    if (CALLOUT_TYPES.includes(lang)) {
      return `<div data-callout="" data-type="${lang}" class="callout callout-${lang}"><p>${code.trim()}</p></div>`;
    }
    const language = lang || 'plaintext';
    const escapedCode = code.trim()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<pre><code class="language-${language}">${escapedCode}</code></pre>`;
  });
  
  // Inline code (before other inline formatting)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Headers (single pass with callback)
  html = html.replace(/^(#{1,6})\s+(.+)$/gm, (_, hashes, content) => {
    const level = hashes.length;
    return `<h${level}>${content}</h${level}>`;
  });
  
  // Task lists
  html = html.replace(/^(\s*)[-*]\s*\[x\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="true"><p>$2</p></li>');
  html = html.replace(/^(\s*)[-*]\s*\[\s*\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="false"><p>$2</p></li>');
  
  // Unordered lists
  html = html.replace(/^(\s*)[-*]\s+(?!\[)(.+)$/gm, '$1<li><p>$2</p></li>');
  
  // Ordered lists
  html = html.replace(/^(\s*)\d+\.\s+(.+)$/gm, '$1<li><p>$2</p></li>');
  
  // Wrap consecutive list items
  html = html.replace(/(<li data-type="taskItem"[^>]*>[\s\S]*?<\/li>\n?)+/g, '<ul data-type="taskList">$&</ul>');
  html = html.replace(/(<li><p>[\s\S]*?<\/p><\/li>\n?)+/g, '<ul>$&</ul>');
  
  // Blockquotes
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote><p>$1</p></blockquote>');
  
  // Horizontal rules
  html = html.replace(/^[-*_]{3,}$/gm, '<hr>');
  
  // Bold and italic (combined pass)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
  html = html.replace(/(?<!_)_([^_]+)_(?!_)/g, '<em>$1</em>');
  
  // Strikethrough
  html = html.replace(/~~([^~]+)~~/g, '<s>$1</s>');
  
  // Links and images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // Wrap remaining lines in paragraphs
  const lines = html.split('\n');
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    // Skip lines that are already wrapped in HTML tags or are placeholders
    if (/^<[a-z]/.test(trimmed) || /^<\//.test(trimmed)) return line;
    if (trimmed.startsWith('MANUSTABLEPLACEHOLDER')) return line;
    return `<p>${trimmed}</p>`;
  });
  
  html = processedLines.join('\n');
  
  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');
  
  // Restore table placeholders
  for (let i = 0; i < tablePlaceholders.length; i++) {
    html = html.replace(`MANUSTABLEPLACEHOLDER${i}END`, tablePlaceholders[i]);
  }
  
  return html;
}

export const MarkdownPasteSafe = Extension.create<MarkdownPasteOptions>({
  name: 'markdownPasteSafe',

  addOptions() {
    return {
      enableMarkdownPaste: true,
    };
  },

  addProseMirrorPlugins() {
    if (!this.options.enableMarkdownPaste) {
      return [];
    }

    const editor = this.editor;

    return [
      new Plugin({
        key: new PluginKey('markdownPaste'),
        props: {
          handlePaste(view, event, slice) {
            const clipboardData = event.clipboardData;
            if (!clipboardData) return false;

            // If HTML content exists, let default handler deal with it
            const htmlContent = clipboardData.getData('text/html');
            if (htmlContent && htmlContent.trim()) {
              return false;
            }

            // Get plain text
            const text = clipboardData.getData('text/plain');
            if (!text) return false;

            // Quick check if it looks like markdown
            if (!looksLikeMarkdown(text)) {
              return false;
            }

            // Prevent default and convert
            event.preventDefault();

            // Convert markdown to HTML
            const html = markdownToHtml(text);

            // Insert using TipTap's optimized insertContent
            editor.commands.insertContent(html, {
              parseOptions: {
                preserveWhitespace: false,
              },
            });

            return true;
          },
        },
      }),
    ];
  },
});

export default MarkdownPasteSafe;
