import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';

/*
 * DESIGN: Dark Mode Craftsman
 * Code block with syntax highlighting and copy button
 * Controls appear inside the code block on hover (top-right corner)
 * No line numbers by default for cleaner look
 * Copy button is icon-only
 * Language selector is next to copy button
 *
 * PERFORMANCE: Lazy-loaded syntax highlighting
 * - Uses IntersectionObserver to defer highlighting until visible
 * - Code blocks outside viewport render as plain text (no lowlight parse)
 * - Highlighting activates when block enters viewport with 200px margin
 * - Once highlighted, stays highlighted (no re-parsing on scroll out)
 */

const lowlight = createLowlight(common);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CodeBlockComponent({ node, updateAttributes, extension }: any) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Lazy-load: Use IntersectionObserver to detect when code block enters viewport
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    
    // If already visible, no need to observe
    if (isVisible) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once visible, stop observing — highlighting persists
            observer.unobserve(el);
          }
        }
      },
      {
        // Start highlighting 200px before the block enters viewport
        rootMargin: '200px 0px',
        threshold: 0,
      }
    );
    
    observer.observe(el);
    
    return () => {
      observer.disconnect();
    };
  }, [isVisible]);
  
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
    <NodeViewWrapper className="code-block-wrapper" ref={wrapperRef}>
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
      {/* When not yet visible, render without syntax highlighting class to skip lowlight parse */}
      <pre className={`code-block-pre ${!isVisible ? 'code-block-deferred' : ''}`}>
        <NodeViewContent className={isVisible ? `language-${currentLanguage}` : 'language-plaintext'} />
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
