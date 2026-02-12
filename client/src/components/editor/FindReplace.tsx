import { Editor } from '@tiptap/react';
import { useCallback, useEffect, useState, useRef } from 'react';
import {
  Search,
  Replace,
  ChevronUp,
  ChevronDown,
  X,
  CaseSensitive,
  Regex,
  ReplaceAll,
  WholeWord,
  MousePointerClick,
} from 'lucide-react';

/*
 * DESIGN: Dark Mode Craftsman
 * Find and Replace panel with regex support, Select All Occurrences
 * Glassmorphic styling with keyboard navigation
 */

interface FindReplaceProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
  focusTrigger?: number;
  initialSearchQuery?: string;
  /** Current editor mode - 'wysiwyg' or 'markdown' */
  editorMode?: 'wysiwyg' | 'markdown';
  /** Raw markdown content (for searching in raw mode) */
  rawMarkdown?: string;
  /** Callback to update raw markdown (for replace in raw mode) */
  onRawMarkdownChange?: (content: string) => void;
}

interface SearchMatch {
  from: number;
  to: number;
  text: string;
}

export function FindReplace({ editor, isOpen, onClose, focusTrigger = 0, initialSearchQuery, editorMode = 'wysiwyg', rawMarkdown = '', onRawMarkdownChange }: FindReplaceProps) {
  const isRawMode = editorMode === 'markdown';
  const [searchQuery, setSearchQuery] = useState('');
  const [replaceQuery, setReplaceQuery] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [showReplace, setShowReplace] = useState(false);
  const [matches, setMatches] = useState<SearchMatch[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [regexError, setRegexError] = useState<string | null>(null);
  const [isSelectAllActive, setIsSelectAllActive] = useState(false);
  const closedBySelectAllRef = useRef(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const isNavigatingRef = useRef(false);

  // Auto-fill search query from initialSearchQuery prop (when Cmd+F with selected text)
  useEffect(() => {
    if (isOpen && initialSearchQuery && initialSearchQuery.trim()) {
      setSearchQuery(initialSearchQuery);
    }
  }, [isOpen, initialSearchQuery, focusTrigger]);

  // Find all matches in the document (WYSIWYG) or raw markdown text
  const findMatches = useCallback(() => {
    if (!searchQuery || !editor) {
      setMatches([]);
      setCurrentMatchIndex(0);
      setRegexError(null);
      return;
    }

    const foundMatches: SearchMatch[] = [];
    let searchPattern: RegExp;

    try {
      if (useRegex) {
        searchPattern = new RegExp(searchQuery, caseSensitive ? 'g' : 'gi');
      } else {
        // Escape special regex characters for literal search
        let escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Add word boundaries if whole word matching is enabled
        if (wholeWord) {
          escaped = `\\b${escaped}\\b`;
        }
        searchPattern = new RegExp(escaped, caseSensitive ? 'g' : 'gi');
      }
      setRegexError(null);
    } catch (e) {
      setRegexError((e as Error).message);
      setMatches([]);
      return;
    }

    if (isRawMode) {
      // In raw markdown mode, search the raw text directly
      let match;
      while ((match = searchPattern.exec(rawMarkdown)) !== null) {
        foundMatches.push({
          from: match.index,
          to: match.index + match[0].length,
          text: match[0],
        });
      }
    } else {
      // In WYSIWYG mode, search through ProseMirror text nodes
      const { doc } = editor.state;
      doc.descendants((node, pos) => {
        if (node.isText && node.text) {
          let match;
          while ((match = searchPattern.exec(node.text)) !== null) {
            foundMatches.push({
              from: pos + match.index,
              to: pos + match.index + match[0].length,
              text: match[0],
            });
          }
        }
        return true;
      });
    }

    setMatches(foundMatches);
    if (foundMatches.length > 0 && currentMatchIndex >= foundMatches.length) {
      setCurrentMatchIndex(0);
    }
  }, [searchQuery, caseSensitive, useRegex, wholeWord, editor, currentMatchIndex, isRawMode, rawMarkdown]);

  // Update matches when search parameters change
  useEffect(() => {
    findMatches();
  }, [findMatches]);

  // Update search highlighting in the editor
  useEffect(() => {
    if (!editor) return;
    
    // In raw mode, highlight matches in the textarea via CSS selection
    if (isRawMode) {
      // Clear WYSIWYG highlights when in raw mode
      const hasSearchHighlight = typeof editor.commands.clearSearchHighlight === 'function';
      if (hasSearchHighlight) {
        editor.commands.clearSearchHighlight();
      }
      // Highlight current match in textarea by selecting it
      if (isOpen && matches.length > 0 && currentMatchIndex < matches.length) {
        const match = matches[currentMatchIndex];
        const textarea = document.querySelector('.syntax-textarea') as HTMLTextAreaElement;
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(match.from, match.to);
          // Scroll the match into view
          const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 22;
          const textBefore = rawMarkdown.substring(0, match.from);
          const lineNumber = textBefore.split('\n').length;
          textarea.scrollTop = Math.max(0, (lineNumber - 3) * lineHeight);
        }
      }
      return;
    }
    
    // Check if the SearchHighlight extension is available
    const hasSearchHighlight = typeof editor.commands.setSearchHighlight === 'function';
    
    if (isOpen && searchQuery && hasSearchHighlight) {
      editor.commands.setSearchHighlight({
        searchTerm: searchQuery,
        caseSensitive,
        useRegex,
        currentMatchIndex,
      });
    } else if (hasSearchHighlight) {
      editor.commands.clearSearchHighlight();
    }
  }, [editor, isOpen, searchQuery, caseSensitive, useRegex, currentMatchIndex, isRawMode, matches, rawMarkdown]);

  // Clear highlighting when panel closes
  useEffect(() => {
    if (!isOpen && editor) {
      // Check if the SearchHighlight extension is available
      const hasSearchHighlight = typeof editor.commands.clearSearchHighlight === 'function';
      if (hasSearchHighlight) {
        editor.commands.clearSearchHighlight();
      }
      // Only clear select-all-occurrences if the panel was NOT closed by the Select All action
      if (!closedBySelectAllRef.current) {
        const hasClearAll = typeof editor.commands.clearAllOccurrences === 'function';
        if (hasClearAll) {
          editor.commands.clearAllOccurrences();
          setIsSelectAllActive(false);
        }
      }
      closedBySelectAllRef.current = false;
    }
  }, [isOpen, editor]);

  // Scroll to current match in editor (without selecting text to avoid floating toolbar)
  useEffect(() => {
    if (matches.length > 0 && currentMatchIndex < matches.length) {
      if (isRawMode) {
        // In raw mode, scrolling is handled in the highlighting effect above
        if (isNavigatingRef.current) {
          isNavigatingRef.current = false;
        }
        return;
      }
      const match = matches[currentMatchIndex];
      
      // Scroll to the match
      const domAtPos = editor.view.domAtPos(match.from);
      if (domAtPos.node) {
        const element = domAtPos.node.parentElement;
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      // Reset navigation flag
      if (isNavigatingRef.current) {
        isNavigatingRef.current = false;
      }
    }
  }, [currentMatchIndex, matches, editor, isRawMode]);

  // Focus search input when opened or when focusTrigger changes
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.select();
    }
  }, [isOpen, focusTrigger]);

  // Navigate to next match
  const goToNextMatch = useCallback(() => {
    if (matches.length === 0) return;
    isNavigatingRef.current = true;
    setCurrentMatchIndex((prev) => (prev + 1) % matches.length);
  }, [matches.length]);

  // Navigate to previous match
  const goToPrevMatch = useCallback(() => {
    if (matches.length === 0) return;
    isNavigatingRef.current = true;
    setCurrentMatchIndex((prev) => (prev - 1 + matches.length) % matches.length);
  }, [matches.length]);

  // Replace current match
  const replaceCurrent = useCallback(() => {
    if (matches.length === 0 || currentMatchIndex >= matches.length) return;
    
    const match = matches[currentMatchIndex];
    
    if (isRawMode && onRawMarkdownChange) {
      // In raw mode, replace directly in the raw markdown string
      const newContent = rawMarkdown.substring(0, match.from) + replaceQuery + rawMarkdown.substring(match.to);
      onRawMarkdownChange(newContent);
      setTimeout(findMatches, 10);
      return;
    }
    
    editor
      .chain()
      .focus()
      .setTextSelection({ from: match.from, to: match.to })
      .deleteSelection()
      .insertContent(replaceQuery)
      .run();
    
    // Re-find matches after replacement
    setTimeout(findMatches, 10);
  }, [matches, currentMatchIndex, replaceQuery, editor, findMatches, isRawMode, rawMarkdown, onRawMarkdownChange]);

  // Replace all matches
  const replaceAll = useCallback(() => {
    if (matches.length === 0) return;
    
    if (isRawMode && onRawMarkdownChange) {
      // In raw mode, replace all in the raw markdown string (from end to preserve positions)
      const sortedMatches = [...matches].sort((a, b) => b.from - a.from);
      let newContent = rawMarkdown;
      sortedMatches.forEach((match) => {
        newContent = newContent.substring(0, match.from) + replaceQuery + newContent.substring(match.to);
      });
      onRawMarkdownChange(newContent);
      setTimeout(findMatches, 10);
      return;
    }
    
    // Replace from end to start to preserve positions
    const sortedMatches = [...matches].sort((a, b) => b.from - a.from);
    
    editor.chain().focus();
    
    sortedMatches.forEach((match) => {
      editor
        .chain()
        .setTextSelection({ from: match.from, to: match.to })
        .deleteSelection()
        .insertContent(replaceQuery)
        .run();
    });
    
    // Re-find matches after replacement
    setTimeout(findMatches, 10);
  }, [matches, replaceQuery, editor, findMatches, isRawMode, rawMarkdown, onRawMarkdownChange]);

  // Select All Occurrences - highlight all matches for batch operations
  const selectAllOccurrences = useCallback(() => {
    if (matches.length === 0 || !searchQuery) return;
    
    const hasCommand = typeof editor.commands.selectAllOccurrences === 'function';
    if (!hasCommand) return;

    const success = editor.commands.selectAllOccurrences({
      searchTerm: searchQuery,
      caseSensitive,
      useRegex,
      wholeWord,
    });

    if (success) {
      setIsSelectAllActive(true);
      // Mark that we're closing via Select All so the cleanup effect doesn't clear our decorations
      closedBySelectAllRef.current = true;
      // Clear the search highlight (yellow) but keep the select-all-occurrence highlight (blue)
      const hasSearchHighlight = typeof editor.commands.clearSearchHighlight === 'function';
      if (hasSearchHighlight) {
        editor.commands.clearSearchHighlight();
      }
      onClose();
      editor.commands.focus();
    }
  }, [matches, searchQuery, caseSensitive, useRegex, wholeWord, editor, onClose]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        goToPrevMatch();
      } else {
        goToNextMatch();
      }
      // Keep focus on search input after navigating
      searchInputRef.current?.focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'h' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setShowReplace((prev) => !prev);
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
      // Cmd+Shift+L to select all occurrences
      e.preventDefault();
      selectAllOccurrences();
    }
  }, [goToNextMatch, goToPrevMatch, onClose, selectAllOccurrences]);

  if (!isOpen) return null;

  return (
    <div 
      className="find-replace-panel"
      onKeyDown={handleKeyDown}
    >
      {/* Search Row */}
      <div className="find-replace-row">
        <div className="find-replace-input-wrapper">
          <Search size={14} className="find-replace-icon" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Find..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`find-replace-input ${regexError ? 'has-error' : ''}`}
          />
          {regexError && (
            <span className="find-replace-error" title={regexError}>!</span>
          )}
        </div>
        
        {/* Match count */}
        <span className="find-replace-count">
          {matches.length > 0 
            ? `${currentMatchIndex + 1} of ${matches.length}`
            : searchQuery ? 'No results' : ''
          }
        </span>
        
        {/* Navigation buttons */}
        <button
          onClick={goToPrevMatch}
          disabled={matches.length === 0}
          className="find-replace-btn"
          title="Previous match (Shift+Enter)"
        >
          <ChevronUp size={16} />
        </button>
        <button
          onClick={goToNextMatch}
          disabled={matches.length === 0}
          className="find-replace-btn"
          title="Next match (Enter)"
        >
          <ChevronDown size={16} />
        </button>
        
        {/* Select All Occurrences button */}
        <button
          onClick={selectAllOccurrences}
          disabled={matches.length === 0}
          className={`find-replace-btn ${isSelectAllActive ? 'active' : ''}`}
          title={`Select all occurrences (${navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl'}+Shift+L) — Apply formatting to all ${matches.length} matches`}
        >
          <MousePointerClick size={16} />
        </button>

        {/* Separator */}
        <div className="find-replace-separator" />
        
        {/* Options */}
        <button
          onClick={() => setCaseSensitive((prev) => !prev)}
          className={`find-replace-btn ${caseSensitive ? 'active' : ''}`}
          title="Match case"
        >
          <CaseSensitive size={16} />
        </button>
        <button
          onClick={() => setWholeWord((prev) => !prev)}
          className={`find-replace-btn ${wholeWord ? 'active' : ''}`}
          title="Match whole word"
        >
          <WholeWord size={16} />
        </button>
        <button
          onClick={() => setUseRegex((prev) => !prev)}
          className={`find-replace-btn ${useRegex ? 'active' : ''}`}
          title="Use regex"
        >
          <Regex size={16} />
        </button>
        
        {/* Toggle replace */}
        <button
          onClick={() => setShowReplace((prev) => !prev)}
          className={`find-replace-btn ${showReplace ? 'active' : ''}`}
          title="Toggle replace (Ctrl+H)"
        >
          <Replace size={16} />
        </button>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="find-replace-btn"
          title="Close (Escape)"
        >
          <X size={16} />
        </button>
      </div>
      
      {/* Replace Row */}
      {showReplace && (
        <div className="find-replace-row">
          <div className="find-replace-input-wrapper">
            <Replace size={14} className="find-replace-icon" />
            <input
              ref={replaceInputRef}
              type="text"
              placeholder="Replace with..."
              value={replaceQuery}
              onChange={(e) => setReplaceQuery(e.target.value)}
              className="find-replace-input"
            />
          </div>
          
          <button
            onClick={replaceCurrent}
            disabled={matches.length === 0}
            className="find-replace-btn replace-btn"
            title="Replace current"
          >
            Replace
          </button>
          <button
            onClick={replaceAll}
            disabled={matches.length === 0}
            className="find-replace-btn replace-btn"
            title="Replace all"
          >
            <ReplaceAll size={14} />
            All
          </button>
        </div>
      )}
    </div>
  );
}

export default FindReplace;
