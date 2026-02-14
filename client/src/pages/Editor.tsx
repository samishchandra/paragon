import { MarkdownEditor } from '@/components/editor';
import { useState, useCallback } from 'react';

/*
 * Standalone editor page — just the editor, nothing else.
 * Accessible at /editor
 */

const INITIAL_CONTENT = `
<h1>Start Writing</h1>
<p>This is a clean, distraction-free writing space. Use the toolbar above or type <code>/</code> for commands.</p>
`;

export default function EditorPage() {
  const [content, setContent] = useState(INITIAL_CONTENT);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <MarkdownEditor
        content={content}
        onChange={setContent}
        placeholder="Start writing... Use '/' for commands"
        showToolbar={true}
        showWordCount={true}
        autofocus={true}
        showTableOfContents={true}
        tocMaxLevel={4}
        theme="light"
        autoReorderChecklist={true}
      />
    </div>
  );
}
