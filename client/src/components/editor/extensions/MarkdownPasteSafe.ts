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
};

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
  if (MARKDOWN_PATTERNS.link.test(text)) return true;
  
  return false;
}

// Optimized markdown to HTML converter
// Uses a single pass approach where possible
function markdownToHtml(markdown: string): string {
  let html = markdown;
  
  // Code blocks first (preserve content inside)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
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
    // Skip lines that are already wrapped in HTML tags
    if (/^<[a-z]/.test(trimmed) || /^<\//.test(trimmed)) return line;
    return `<p>${trimmed}</p>`;
  });
  
  html = processedLines.join('\n');
  
  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');
  
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
