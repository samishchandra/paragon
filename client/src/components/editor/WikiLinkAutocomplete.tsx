import { Editor } from '@tiptap/react';
import { TextSelection } from '@tiptap/pm/state';
import { useEffect, useState, useCallback, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { FileText, Plus } from 'lucide-react';

/*
 * WikiLink Autocomplete
 * Detects [[ typed in the editor and shows a dropdown of matching item titles.
 * Selecting an item inserts a wiki link mark. If no match, offers to create.
 * Follows the same portal + fixed positioning pattern as SlashCommands.
 */

interface WikiLinkAutocompleteProps {
  editor: Editor;
  onSearch: (query: string) => Promise<Array<{ id: string; title: string; type: string }>>;
  onCreateItem?: (title: string) => void;
}

const MENU_WIDTH = 340;
const ITEM_HEIGHT = 36;
const MENU_PADDING = 8;
const MENU_MAX_HEIGHT = 240;
const VIEWPORT_MARGIN = 8;

function getCursorViewportCoords(editor: Editor): { top: number; bottom: number; left: number } | null {
  try {
    const domSelection = window.getSelection();
    if (domSelection && domSelection.rangeCount > 0) {
      const range = domSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0 && rect.top === 0) {
        const tempSpan = document.createElement('span');
        tempSpan.textContent = '\u200b';
        const clonedRange = range.cloneRange();
        clonedRange.insertNode(tempSpan);
        const spanRect = tempSpan.getBoundingClientRect();
        const coords = { top: spanRect.top, bottom: spanRect.bottom, left: spanRect.left };
        tempSpan.parentNode?.removeChild(tempSpan);
        domSelection.removeAllRanges();
        domSelection.addRange(range);
        return coords;
      }
      return { top: rect.top, bottom: rect.bottom, left: rect.left };
    }
    const pos = editor.state.selection.from;
    const coords = editor.view.coordsAtPos(pos);
    return { top: coords.top, bottom: coords.bottom, left: coords.left };
  } catch {
    return null;
  }
}

export function WikiLinkAutocomplete({ editor, onSearch, onCreateItem }: WikiLinkAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{ id: string; title: string; type: string }>>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cursorCoords, setCursorCoords] = useState<{ top: number; bottom: number; left: number } | null>(null);
  const [placement, setPlacement] = useState<'below' | 'above'>('below');
  const [isLoading, setIsLoading] = useState(false);

  const isOpenRef = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const bracketPosRef = useRef<number>(-1);
  const searchTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    setSelectedIndex(0);
    bracketPosRef.current = -1;
  }, []);

  // Insert wiki link mark at the bracket position
  const insertWikiLink = useCallback((title: string) => {
    const bracketPos = bracketPosRef.current;
    if (bracketPos < 0) return;

    const { state } = editor;
    const cursorPos = state.selection.from;

    try {
      // Delete from [[ to cursor
      const tr = state.tr.delete(bracketPos, cursorPos);
      
      // Insert the title text with wikiLink mark
      const markType = state.schema.marks.wikiLink;
      if (markType) {
        const mark = markType.create({ pageName: title });
        const textNode = state.schema.text(title, [mark]);
        tr.insert(bracketPos, textNode);
        
        // Position cursor right after the inserted link and clear stored marks
        const endPos = bracketPos + title.length;
        tr.setSelection(TextSelection.create(tr.doc, endPos));
        tr.removeStoredMark(markType);
      } else {
        // Fallback: insert as [[title]] text
        tr.insertText(`[[${title}]]`, bracketPos);
      }

      editor.view.dispatch(tr);
      editor.view.focus();
    } catch (error) {
      console.warn('WikiLinkAutocomplete: Error inserting link', error);
    }

    closeMenu();
  }, [editor, closeMenu]);

  // Detect [[ trigger
  useEffect(() => {
    if (!editor) return;

    const handleTransaction = () => {
      if (isOpenRef.current) return;
      const { state } = editor;
      const { selection } = state;
      const { $from } = selection;

      if ($from.parentOffset < 2) return;
      const textBefore = $from.parent.textBetween(0, $from.parentOffset, undefined, '\ufffc');
      if (!textBefore.endsWith('[[')) return;

      // Record the position of the first [
      bracketPosRef.current = $from.pos - 2;

      const coords = getCursorViewportCoords(editor);
      if (!coords) return;
      setCursorCoords(coords);
      setIsOpen(true);
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    };

    editor.on('update', handleTransaction);
    return () => {
      editor.off('update', handleTransaction);
    };
  }, [editor]);

  // Handle keyboard navigation and query updates when menu is open
  useEffect(() => {
    if (!editor || !isOpen) return;
    const editorElement = editor.view.dom;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpenRef.current) return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const maxIdx = results.length + (query.trim() ? 1 : 0) - 1; // +1 for "Create" option
        setSelectedIndex(prev => Math.min(prev + 1, maxIdx));
        return;
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        return;
      }
      if (event.key === 'Enter' || event.key === 'Tab') {
        event.preventDefault();
        event.stopPropagation();
        if (selectedIndex < results.length) {
          insertWikiLink(results[selectedIndex].title);
        } else if (query.trim() && onCreateItem) {
          // "Create new" option selected
          onCreateItem(query.trim());
          closeMenu();
        } else if (query.trim()) {
          // No create handler, just insert as-is
          insertWikiLink(query.trim());
        }
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }
      // Close on ]] typed
      if (event.key === ']') {
        // Let the character be inserted, then check
        setTimeout(() => {
          const { state } = editor;
          const { $from } = state.selection;
          const textBefore = $from.parent.textBetween(0, $from.parentOffset, undefined, '\ufffc');
          if (textBefore.endsWith(']]')) {
            closeMenu();
          }
        }, 0);
      }
    };

    editorElement.addEventListener('keydown', handleKeyDown, true);
    return () => {
      editorElement.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [editor, isOpen, results, selectedIndex, query, insertWikiLink, closeMenu, onCreateItem]);

  // Track query text between [[ and cursor
  useEffect(() => {
    if (!editor || !isOpen) return;

    const handleUpdate = () => {
      const bracketPos = bracketPosRef.current;
      if (bracketPos < 0) {
        closeMenu();
        return;
      }
      const { state } = editor;
      const cursorPos = state.selection.from;

      if (cursorPos <= bracketPos) {
        closeMenu();
        return;
      }

      try {
        const queryText = state.doc.textBetween(bracketPos + 2, cursorPos, undefined, '\ufffc');
        if (queryText.includes('\n') || queryText.includes(']]')) {
          closeMenu();
          return;
        }
        setQuery(queryText);
        setSelectedIndex(0);

        const coords = getCursorViewportCoords(editor);
        if (coords) {
          setCursorCoords(coords);
        }
      } catch {
        closeMenu();
      }
    };

    editor.on('update', handleUpdate);
    editor.on('selectionUpdate', handleUpdate);
    return () => {
      editor.off('update', handleUpdate);
      editor.off('selectionUpdate', handleUpdate);
    };
  }, [editor, isOpen, closeMenu]);

  // Debounced search
  useEffect(() => {
    if (!isOpen) return;

    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);

    if (!query.trim()) {
      // Show recent/all items when query is empty
      setIsLoading(true);
      searchTimerRef.current = setTimeout(async () => {
        try {
          const items = await onSearch('');
          setResults(items);
        } catch {
          setResults([]);
        }
        setIsLoading(false);
      }, 100);
      return;
    }

    setIsLoading(true);
    searchTimerRef.current = setTimeout(async () => {
      try {
        const items = await onSearch(query.trim());
        setResults(items);
      } catch {
        setResults([]);
      }
      setIsLoading(false);
    }, 150);

    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, [isOpen, query, onSearch]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, closeMenu]);

  // Scroll selected item into view
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const selected = menuRef.current.querySelector('.wikilink-item.is-selected');
    if (selected) {
      selected.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, selectedIndex]);

  // Positioning
  const totalItems = results.length + (query.trim() ? 1 : 0);
  const menuHeight = Math.min(
    Math.max(totalItems, 1) * ITEM_HEIGHT + MENU_PADDING,
    MENU_MAX_HEIGHT
  );

  useLayoutEffect(() => {
    if (!isOpen || !cursorCoords) return;
    const { top: cursorTop, bottom: cursorBottom, left: cursorLeft } = cursorCoords;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const spaceBelow = viewportHeight - cursorBottom - VIEWPORT_MARGIN;
    const spaceAbove = cursorTop - VIEWPORT_MARGIN;
    let newPlacement: 'below' | 'above';
    if (spaceBelow >= menuHeight) {
      newPlacement = 'below';
    } else if (spaceAbove >= menuHeight) {
      newPlacement = 'above';
    } else {
      newPlacement = spaceBelow >= spaceAbove ? 'below' : 'above';
    }
    setPlacement(newPlacement);

    if (menuRef.current) {
      const safeLeft = Math.max(
        VIEWPORT_MARGIN,
        Math.min(cursorLeft, viewportWidth - MENU_WIDTH - VIEWPORT_MARGIN)
      );
      const top = newPlacement === 'below'
        ? cursorBottom + 4
        : cursorTop - menuHeight - 4;
      menuRef.current.style.top = `${top}px`;
      menuRef.current.style.left = `${safeLeft}px`;
    }
  }, [isOpen, cursorCoords, menuHeight, totalItems]);

  if (!isOpen) return null;

  const showCreateOption = query.trim() && !results.some(r => r.title.toLowerCase() === query.trim().toLowerCase());
  const animationClass = placement === 'below' ? 'slash-menu-below' : 'slash-menu-above';

  return createPortal(
    <div
      ref={menuRef}
      className={`wikilink-menu ${animationClass}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99999,
        pointerEvents: 'auto',
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {isLoading && results.length === 0 && (
        <div className="wikilink-item wikilink-loading">
          <span className="wikilink-label" style={{ color: 'var(--muted-foreground)' }}>Searching...</span>
        </div>
      )}
      {results.map((item, index) => (
        <div
          key={item.id}
          className={`wikilink-item ${index === selectedIndex ? 'is-selected' : ''}`}
          onMouseDown={(e) => {
            e.preventDefault();
            insertWikiLink(item.title);
          }}
          onMouseEnter={() => setSelectedIndex(index)}
        >
          <span className="wikilink-icon">
            <FileText size={14} />
          </span>
          <span className="wikilink-label">{item.title}</span>
          <span className="wikilink-type">{item.type}</span>
        </div>
      ))}
      {showCreateOption && (
        <div
          className={`wikilink-item wikilink-create ${results.length === selectedIndex ? 'is-selected' : ''}`}
          onMouseDown={(e) => {
            e.preventDefault();
            if (onCreateItem) {
              onCreateItem(query.trim());
              closeMenu();
            } else {
              insertWikiLink(query.trim());
            }
          }}
          onMouseEnter={() => setSelectedIndex(results.length)}
        >
          <span className="wikilink-icon">
            <Plus size={14} />
          </span>
          <span className="wikilink-label">Create &ldquo;{query.trim()}&rdquo;</span>
        </div>
      )}
      {!isLoading && results.length === 0 && !query.trim() && (
        <div className="wikilink-item wikilink-loading">
          <span className="wikilink-label" style={{ color: 'var(--muted-foreground)' }}>Type to search items...</span>
        </div>
      )}
    </div>,
    document.body
  );
}

export default WikiLinkAutocomplete;
