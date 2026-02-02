import { Extension } from '@tiptap/core';

export interface MarkdownPasteOptions {
  enableMarkdownPaste: boolean;
}

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  let html = markdown;
  
  // Escape HTML entities first
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
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  
  // Auto-detect URLs
  html = html.replace(/(?<!["\(])(https?:\/\/[^\s<]+)(?!["\)])/g, '<a href="$1">$1</a>');
  
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
    /\*[^*]+\*/,             // Italic
    /__[^_]+__/,             // Bold (underscore)
    /_[^_]+_/,               // Italic (underscore)
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

  onCreate() {
    if (!this.options.enableMarkdownPaste) return;

    const handlePaste = (event: ClipboardEvent) => {
      try {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return;

        // Get plain text from clipboard
        const text = clipboardData.getData('text/plain');
        if (!text) return;

        // Check if it looks like markdown
        if (!looksLikeMarkdown(text)) return;

        // Prevent default paste
        event.preventDefault();

        // Convert markdown to HTML
        const html = markdownToHtml(text);
        
        // Insert the converted HTML
        this.editor.commands.insertContent(html, {
          parseOptions: {
            preserveWhitespace: false,
          },
        });
      } catch (error) {
        console.warn('MarkdownPasteSafe: Error handling paste', error);
      }
    };

    // Add event listener to the editor DOM element
    this.editor.view.dom.addEventListener('paste', handlePaste as EventListener);
    
    // Store cleanup function
    (this as any)._pasteHandler = handlePaste;
  },

  onDestroy() {
    const handlePaste = (this as any)._pasteHandler;
    if (handlePaste) {
      this.editor.view.dom.removeEventListener('paste', handlePaste as EventListener);
    }
  },
});

export default MarkdownPasteSafe;
