/**
 * EditorModeToggle — Renders the WYSIWYG / Raw Markdown toggle buttons.
 */
import { Eye, FileText } from 'lucide-react';

interface EditorModeToggleProps {
  editorMode: 'wysiwyg' | 'markdown';
  onModeSwitch: (mode: 'wysiwyg' | 'markdown') => void;
}

export function EditorModeToggle({ editorMode, onModeSwitch }: EditorModeToggleProps) {
  return (
    <div className="editor-mode-toggle mr-2 sm:mr-3">
      <button
        onClick={() => onModeSwitch('wysiwyg')}
        className={`editor-mode-toggle-btn ${editorMode === 'wysiwyg' ? 'active' : ''}`}
        title="Visual Editor"
      >
        <Eye />
      </button>
      <button
        onClick={() => onModeSwitch('markdown')}
        className={`editor-mode-toggle-btn ${editorMode === 'markdown' ? 'active' : ''}`}
        title="Raw Markdown"
      >
        <FileText />
      </button>
    </div>
  );
}
