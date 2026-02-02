import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export interface MarkdownPasteOptions {
  enableMarkdownPaste: boolean;
}

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  let html = markdown;
  
  // Don't escape HTML entities - let TipTap handle it
  // This allows the HTML tags we create to work properly
  
  // Headers (must be at start of line)
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
  
  // Code blocks (fenced) - must come before inline formatting
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const language = lang || 'plaintext';
    // Escape code content
    const escapedCode = code.trim()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<pre><code class="language-${language}">${escapedCode}</code></pre>`;
  });
  
  // Inline code - must come before other inline formatting
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Task lists (must come before regular lists)
  html = html.replace(/^(\s*)-\s*\[x\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="true"><p>$2</p></li>');
  html = html.replace(/^(\s*)-\s*\[\s*\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="false"><p>$2</p></li>');
  html = html.replace(/^(\s*)\*\s*\[x\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="true"><p>$2</p></li>');
  html = html.replace(/^(\s*)\*\s*\[\s*\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="false"><p>$2</p></li>');
  
  // Unordered lists
  html = html.replace(/^(\s*)-\s+(.+)$/gm, '$1<li><p>$2</p></li>');
  html = html.replace(/^(\s*)\*\s+(?!\*\*)(.+)$/gm, '$1<li><p>$2</p></li>');
  
  // Ordered lists
  html = html.replace(/^(\s*)\d+\.\s+(.+)$/gm, '$1<li><p>$2</p></li>');
  
  // Wrap consecutive li elements in ul/ol
  html = html.replace(/(<li data-type="taskItem"[^>]*>[\s\S]*?<\/li>\n?)+/g, '<ul data-type="taskList">$&</ul>');
  html = html.replace(/(<li><p>[\s\S]*?<\/p><\/li>\n?)+/g, '<ul>$&</ul>');
  
  // Blockquotes
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote><p>$1</p></blockquote>');
  
  // Horizontal rules
  html = html.replace(/^---+$/gm, '<hr>');
  html = html.replace(/^\*\*\*+$/gm, '<hr>');
  html = html.replace(/^___+$/gm, '<hr>');
  
  // Bold (must come before italic)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
  html = html.replace(/(?<!_)_([^_]+)_(?!_)/g, '<em>$1</em>');
  
  // Strikethrough
  html = html.replace(/~~([^~]+)~~/g, '<s>$1</s>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  
  // Paragraphs - wrap lines that aren't already wrapped
  const lines = html.split('\n');
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || 
        trimmed.startsWith('<li') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<pre') ||
        trimmed.startsWith('<hr') || trimmed.startsWith('</')) {
      return line;
    }
    return `<p>${trimmed}</p>`;
  });
  
  html = processedLines.join('\n');
  
  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>\s*<\/p>/g, '');
  
  return html;
}

// Check if text looks like markdown
function looksLikeMarkdown(text: string): boolean {
  const markdownPatterns = [
    /^#{1,6}\s+/m,           // Headers
    /\*\*[^*]+\*\*/,         // Bold
    /__[^_]+__/,             // Bold (underscore)
    /~~[^~]+~~/,             // Strikethrough
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
  ];
  
  return markdownPatterns.some(pattern => pattern.test(text));
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
            try {
              const clipboardData = event.clipboardData;
              if (!clipboardData) return false;

              // Check if there's HTML content - if so, let the default handler deal with it
              const htmlContent = clipboardData.getData('text/html');
              if (htmlContent && htmlContent.trim()) {
                // HTML content exists, let default paste handle it
                return false;
              }

              // Get plain text from clipboard
              const text = clipboardData.getData('text/plain');
              if (!text) return false;

              // Check if it looks like markdown
              if (!looksLikeMarkdown(text)) {
                return false;
              }

              // Prevent default paste
              event.preventDefault();

              // Convert markdown to HTML
              const html = markdownToHtml(text);
              
              console.log('MarkdownPasteSafe: Converting markdown to HTML');
              console.log('Input:', text.substring(0, 100) + '...');
              console.log('Output:', html.substring(0, 200) + '...');

              // Insert the converted HTML using TipTap's insertContent
              editor.commands.insertContent(html, {
                parseOptions: {
                  preserveWhitespace: false,
                },
              });

              return true;
            } catch (error) {
              console.warn('MarkdownPasteSafe: Error handling paste', error);
              return false;
            }
          },
        },
      }),
    ];
  },
});

export default MarkdownPasteSafe;
