import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { useState, useCallback } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';

/*
 * DESIGN: Dark Mode Craftsman
 * Code block with syntax highlighting and copy button
 * Controls appear inside the code block on hover (top-right corner)
 * No line numbers by default for cleaner look
 * Copy button is icon-only
 * Language selector is next to copy button
 */

const lowlight = createLowlight(common);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CodeBlockComponent({ node, updateAttributes, extension }: any) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(node.textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [node.textContent]);

  // Get the list of supported languages
  const languages = extension.options.lowlight?.listLanguages?.() || [];
  const currentLanguage = node.attrs.language || 'plaintext';
  const languageLabel = currentLanguage === 'plaintext' 
    ? 'Plain Text' 
    : currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1);

  return (
    <NodeViewWrapper className="code-block-wrapper">
      {/* Controls overlay - appears on hover, positioned inside top-right */}
      <div className="code-block-controls" contentEditable={false}>
        <div className="code-block-language-wrapper">
          <select
            value={currentLanguage}
            onChange={(e) => updateAttributes({ language: e.target.value })}
            className="code-block-language-select"
          >
            <option value="plaintext">Plain Text</option>
            {languages.map((lang: string) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
          <span className="code-block-language-label">{languageLabel}</span>
          <ChevronDown size={12} className="code-block-language-chevron" />
        </div>
        <button
          type="button"
          onClick={copyToClipboard}
          className={`code-block-copy-btn ${copied ? 'copied' : ''}`}
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      
      {/* Code content - no line numbers */}
      <pre className="code-block-pre">
        <NodeViewContent className={`language-${currentLanguage}`} />
      </pre>
    </NodeViewWrapper>
  );
}

export const CodeBlockWithFeatures = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
}).configure({
  lowlight,
  defaultLanguage: 'plaintext',
  HTMLAttributes: {
    class: 'code-block',
  },
});
