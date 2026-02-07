import { Editor } from '@tiptap/react';
import { memo, useCallback, useEffect, useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Trash2,
  X,
  Type,
} from 'lucide-react';
import type { SelectAllOccurrencesStorage } from './extensions/SelectAllOccurrences';

/*
 * SelectAllActionBar
 * 
 * A floating action bar that appears above the editor when "Select All Occurrences"
 * mode is active. Shows the count of selected occurrences and provides quick-action
 * buttons for Bold, Italic, Underline, Strikethrough, Delete, and Exit.
 * 
 * Also shows a live preview of the typed replacement text when the user starts typing.
 */

interface SelectAllActionBarProps {
  editor: Editor;
}

const SelectAllActionBarInner = ({ editor }: SelectAllActionBarProps) => {
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [typedBuffer, setTypedBuffer] = useState('');
  const [isTypingReplace, setIsTypingReplace] = useState(false);

  // Poll the extension storage for state changes
  useEffect(() => {
    if (!editor) return;

    const checkState = () => {
      const storage = (editor.storage as any).selectAllOccurrences as SelectAllOccurrencesStorage | undefined;
      if (storage) {
        setIsActive(storage.isActive);
        setCount(storage.ranges.length);
        setSearchTerm(storage.searchTerm);
        setTypedBuffer(storage.typedBuffer);
        setIsTypingReplace(storage.isTypingReplace);
      } else {
        setIsActive(false);
        setCount(0);
      }
    };

    // Check on every transaction
    const onTransaction = () => {
      checkState();
    };

    editor.on('transaction', onTransaction);
    checkState();

    return () => {
      editor.off('transaction', onTransaction);
    };
  }, [editor]);

  const handleBold = useCallback(() => {
    editor.commands.toggleMarkOnAllOccurrences('bold');
    editor.commands.focus();
  }, [editor]);

  const handleItalic = useCallback(() => {
    editor.commands.toggleMarkOnAllOccurrences('italic');
    editor.commands.focus();
  }, [editor]);

  const handleUnderline = useCallback(() => {
    editor.commands.toggleMarkOnAllOccurrences('underline');
    editor.commands.focus();
  }, [editor]);

  const handleStrikethrough = useCallback(() => {
    editor.commands.toggleMarkOnAllOccurrences('strike');
    editor.commands.focus();
  }, [editor]);

  const handleDelete = useCallback(() => {
    editor.commands.deleteAllOccurrences();
    editor.commands.focus();
  }, [editor]);

  const handleExit = useCallback(() => {
    editor.commands.clearAllOccurrences();
    editor.commands.focus();
  }, [editor]);

  if (!isActive || count === 0) return null;

  return (
    <div className="select-all-action-bar">
      <div className="select-all-action-bar-inner">
        {/* Count badge */}
        <div className="select-all-action-bar-count">
          <span className="select-all-action-bar-count-number">{count}</span>
          <span className="select-all-action-bar-count-label">selected</span>
        </div>

        {/* Search term / typed buffer preview */}
        <div className="select-all-action-bar-preview">
          {isTypingReplace ? (
            <>
              <Type size={12} className="select-all-action-bar-preview-icon" />
              <span className="select-all-action-bar-preview-old">{searchTerm}</span>
              <span className="select-all-action-bar-preview-arrow">→</span>
              <span className="select-all-action-bar-preview-new">{typedBuffer || '∅'}</span>
            </>
          ) : (
            <>
              <span className="select-all-action-bar-preview-term">"{searchTerm}"</span>
            </>
          )}
        </div>

        {/* Separator */}
        <div className="select-all-action-bar-separator" />

        {/* Formatting buttons */}
        <button
          onClick={handleBold}
          className="select-all-action-bar-btn"
          title="Bold all occurrences (Ctrl+B)"
        >
          <Bold size={14} />
        </button>
        <button
          onClick={handleItalic}
          className="select-all-action-bar-btn"
          title="Italic all occurrences (Ctrl+I)"
        >
          <Italic size={14} />
        </button>
        <button
          onClick={handleUnderline}
          className="select-all-action-bar-btn"
          title="Underline all occurrences (Ctrl+U)"
        >
          <Underline size={14} />
        </button>
        <button
          onClick={handleStrikethrough}
          className="select-all-action-bar-btn"
          title="Strikethrough all occurrences"
        >
          <Strikethrough size={14} />
        </button>

        {/* Separator */}
        <div className="select-all-action-bar-separator" />

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="select-all-action-bar-btn select-all-action-bar-btn-danger"
          title="Delete all occurrences"
        >
          <Trash2 size={14} />
        </button>

        {/* Exit */}
        <button
          onClick={handleExit}
          className="select-all-action-bar-btn"
          title="Exit select all mode (Escape)"
        >
          <X size={14} />
        </button>
      </div>

      {/* Hint text */}
      <div className="select-all-action-bar-hint">
        Type to replace all · <kbd>Esc</kbd> to exit · <kbd>Backspace</kbd> to delete
      </div>
    </div>
  );
};

export const SelectAllActionBar = memo(SelectAllActionBarInner);
export default SelectAllActionBar;
