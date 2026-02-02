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
} from 'lucide-react';

/*
 * DESIGN: Dark Mode Craftsman
 * Find and Replace panel with regex support
 * Glassmorphic styling with keyboard navigation
 */

interface FindReplaceProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

interface SearchMatch {
  from: number;
  to: number;
  text: string;
}

export function FindReplace({ editor, isOpen, onClose }: FindReplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [replaceQuery, setReplaceQuery] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [showReplace, setShowReplace] = useState(false);
  const [matches, setMatches] = useState<SearchMatch[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [regexError, setRegexError] = useState<string | null>(null);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const isNavigatingRef = useRef(false);

  // Find all matches in the document
  const findMatches = useCallback(() => {
    if (!searchQuery || !editor) {
      setMatches([]);
      setCurrentMatchIndex(0);
      setRegexError(null);
      return;
    }

    const { doc } = editor.state;
    const foundMatches: SearchMatch[] = [];
    let searchPattern: RegExp;

    try {
      if (useRegex) {
        searchPattern = new RegExp(searchQuery, caseSensitive ? 'g' : 'gi');
      } else {
        // Escape special regex characters for literal search
        const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        searchPattern = new RegExp(escaped, caseSensitive ? 'g' : 'gi');
      }
      setRegexError(null);
    } catch (e) {
      setRegexError((e as Error).message);
      setMatches([]);
      return;
    }

    // Search through all text nodes
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

    setMatches(foundMatches);
    if (foundMatches.length > 0 && currentMatchIndex >= foundMatches.length) {
      setCurrentMatchIndex(0);
    }
  }, [searchQuery, caseSensitive, useRegex, editor, currentMatchIndex]);

  // Update matches when search parameters change
  useEffect(() => {
    findMatches();
  }, [findMatches]);

  // Update search highlighting in the editor
  useEffect(() => {
    if (!editor) return;
    
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
  }, [editor, isOpen, searchQuery, caseSensitive, useRegex, currentMatchIndex]);

  // Clear highlighting when panel closes
  useEffect(() => {
    if (!isOpen && editor) {
      // Check if the SearchHighlight extension is available
      const hasSearchHighlight = typeof editor.commands.clearSearchHighlight === 'function';
      if (hasSearchHighlight) {
        editor.commands.clearSearchHighlight();
      }
    }
  }, [isOpen, editor]);

  // Highlight current match in editor
  useEffect(() => {
    if (matches.length > 0 && currentMatchIndex < matches.length) {
      const match = matches[currentMatchIndex];
      
      // Only focus editor if user is navigating matches (clicked prev/next)
      if (isNavigatingRef.current) {
        editor.chain().focus().setTextSelection({ from: match.from, to: match.to }).run();
        isNavigatingRef.current = false;
      } else {
        // Just set selection without stealing focus from search input
        editor.chain().setTextSelection({ from: match.from, to: match.to }).run();
      }
      
      // Scroll to the match
      const domAtPos = editor.view.domAtPos(match.from);
      if (domAtPos.node) {
        const element = domAtPos.node.parentElement;
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentMatchIndex, matches, editor]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.select();
    }
  }, [isOpen]);

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
    
    editor
      .chain()
      .focus()
      .setTextSelection({ from: match.from, to: match.to })
      .deleteSelection()
      .insertContent(replaceQuery)
      .run();
    
    // Re-find matches after replacement
    setTimeout(findMatches, 10);
  }, [matches, currentMatchIndex, replaceQuery, editor, findMatches]);

  // Replace all matches
  const replaceAll = useCallback(() => {
    if (matches.length === 0) return;
    
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
  }, [matches, replaceQuery, editor, findMatches]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        goToPrevMatch();
      } else {
        goToNextMatch();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'h' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setShowReplace((prev) => !prev);
    }
  }, [goToNextMatch, goToPrevMatch, onClose]);

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
        
        {/* Options */}
        <button
          onClick={() => setCaseSensitive((prev) => !prev)}
          className={`find-replace-btn ${caseSensitive ? 'active' : ''}`}
          title="Match case"
        >
          <CaseSensitive size={16} />
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
