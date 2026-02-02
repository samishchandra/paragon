import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

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
  
  // Count lines
  const lineCount = (node.textContent || '').split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <NodeViewWrapper className="code-block-wrapper">
      <div className="code-block-header">
        <select
          contentEditable={false}
          value={node.attrs.language || 'plaintext'}
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
        <button
          type="button"
          onClick={copyToClipboard}
          className="code-block-copy-btn"
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          <span className="ml-1.5 text-xs">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="code-block-content">
        <div className="code-block-line-numbers" contentEditable={false}>
          {lineNumbers.map((num) => (
            <div key={num} className="code-block-line-number">
              {num}
            </div>
          ))}
        </div>
        <pre className="code-block-pre">
          <NodeViewContent className={`language-${node.attrs.language || 'plaintext'}`} />
        </pre>
      </div>
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
