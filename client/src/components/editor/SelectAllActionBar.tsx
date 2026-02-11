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
  Plus,
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
 * In incremental (Cmd+D) mode, shows "N of M" count and a "Select Next" button.
 */

interface SelectAllActionBarProps {
  editor: Editor;
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
const modKey = isMac ? '⌘' : 'Ctrl';

const SelectAllActionBarInner = ({ editor }: SelectAllActionBarProps) => {
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [typedBuffer, setTypedBuffer] = useState('');
  const [isTypingReplace, setIsTypingReplace] = useState(false);
  const [isIncremental, setIsIncremental] = useState(false);

  // Poll the extension storage for state changes
  useEffect(() => {
    if (!editor) return;

    const checkState = () => {
      const storage = (editor.storage as any).selectAllOccurrences as SelectAllOccurrencesStorage | undefined;
      if (storage) {
        setIsActive(storage.isActive);
        setCount(storage.ranges.length);
        setTotalMatches(storage.allMatches.length);
        setSearchTerm(storage.searchTerm);
        setTypedBuffer(storage.typedBuffer);
        setIsTypingReplace(storage.isTypingReplace);
        setIsIncremental(storage.isIncremental);
      } else {
        setIsActive(false);
        setCount(0);
        setTotalMatches(0);
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

  const handleSelectNext = useCallback(() => {
    editor.commands.selectNextOccurrence();
    editor.commands.focus();
  }, [editor]);

  const handleSelectAll = useCallback(() => {
    // Select all remaining occurrences at once
    if (searchTerm) {
      editor.commands.selectAllOccurrences({
        searchTerm,
        caseSensitive: false,
        useRegex: false,
        wholeWord: false,
      });
      editor.commands.focus();
    }
  }, [editor, searchTerm]);

  if (!isActive || count === 0) return null;

  return (
    <div className="select-all-action-bar">
      <div className="select-all-action-bar-inner">
        {/* Count badge */}
        <div className="select-all-action-bar-count">
          <span className="select-all-action-bar-count-number">
            {isIncremental && totalMatches > 0 ? `${count}/${totalMatches}` : count}
          </span>
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

        {/* Incremental mode: Select Next button */}
        {isIncremental && count < totalMatches && (
          <>
            <button
              onClick={handleSelectNext}
              className="select-all-action-bar-btn select-all-action-bar-btn-primary"
              title={`Select next occurrence (${modKey}+D)`}
            >
              <Plus size={14} />
            </button>
            <button
              onClick={handleSelectAll}
              className="select-all-action-bar-btn select-all-action-bar-btn-secondary"
              title={`Select all remaining (${modKey}+Shift+L)`}
            >
              All
            </button>
            <div className="select-all-action-bar-separator" />
          </>
        )}

        {/* Formatting buttons */}
        <button
          onClick={handleBold}
          className="select-all-action-bar-btn"
          title={`Bold all occurrences (${modKey}+B)`}
        >
          <Bold size={14} />
        </button>
        <button
          onClick={handleItalic}
          className="select-all-action-bar-btn"
          title={`Italic all occurrences (${modKey}+I)`}
        >
          <Italic size={14} />
        </button>
        <button
          onClick={handleUnderline}
          className="select-all-action-bar-btn"
          title={`Underline all occurrences (${modKey}+U)`}
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
        {isIncremental && count < totalMatches ? (
          <>
            <kbd>{modKey}+D</kbd> next · <kbd>{modKey}+Shift+L</kbd> all · Type to replace · <kbd>Esc</kbd> to exit · <kbd>{modKey}+Z</kbd> undo
          </>
        ) : (
          <>
            Type to replace all · <kbd>Esc</kbd> to exit · <kbd>Backspace</kbd> to delete · <kbd>{modKey}+Z</kbd> undo
          </>
        )}
      </div>
    </div>
  );
};

export const SelectAllActionBar = memo(SelectAllActionBarInner);
export default SelectAllActionBar;
