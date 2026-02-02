import { NodeViewContent, NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

/*
 * DESIGN: Dark Mode Craftsman
 * Code block with syntax highlighting, line numbers, and copy button
 * GitHub Dark inspired syntax colors
 */

const LANGUAGE_LABELS: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  jsx: 'JSX',
  tsx: 'TSX',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
  csharp: 'C#',
  go: 'Go',
  rust: 'Rust',
  ruby: 'Ruby',
  php: 'PHP',
  swift: 'Swift',
  kotlin: 'Kotlin',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  json: 'JSON',
  yaml: 'YAML',
  markdown: 'Markdown',
  sql: 'SQL',
  bash: 'Bash',
  shell: 'Shell',
  plaintext: 'Plain Text',
};

export function CodeBlockComponent({ node, updateAttributes }: NodeViewProps) {
  const [copied, setCopied] = useState(false);
  const language = node.attrs.language || 'plaintext';

  const copyCode = useCallback(() => {
    const code = node.textContent;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [node.textContent]);

  return (
    <NodeViewWrapper className="code-block-wrapper relative">
      <div className="code-block-header">
        <select
          value={language}
          onChange={(e) => updateAttributes({ language: e.target.value })}
          className="bg-transparent border-none outline-none text-xs cursor-pointer"
          contentEditable={false}
        >
          {Object.entries(LANGUAGE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button
          onClick={copyCode}
          className={`copy-button ${copied ? 'copied' : ''}`}
          contentEditable={false}
        >
          {copied ? (
            <>
              <Check size={12} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="with-line-numbers">
        <code>
          <NodeViewContent />
        </code>
      </pre>
    </NodeViewWrapper>
  );
}

export default CodeBlockComponent;
