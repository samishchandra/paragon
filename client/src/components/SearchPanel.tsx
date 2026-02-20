/**
 * SearchPanel - Shared search UI used by both CommandPalette (desktop modal) and mobile full-screen tab.
 * Contains all search logic: server-side search, filter chips, picker mode, keyboard navigation, result rendering.
 * 
 * Props:
 * - mode: 'modal' (desktop CommandPalette) or 'fullscreen' (mobile tab)
 * - isActive: whether the panel is currently visible/active (controls data fetching)
 * - onClose: callback to close (only used in modal mode)
 * - onSelectItem: callback when user selects a search result
 * - onSelectList/onSelectTag: callbacks for list/tag navigation
 * - onNewTask/onNewNote: quick action callbacks
 * - onToggleSidebar/onToggleDetailPanel: quick action callbacks (desktop only)
 * - preserveState: if true, don't reset query/filters when isActive changes (mobile mode)
 */
import { useState, useRef, useEffect, useMemo, useCallback, forwardRef, useImperativeHandle } from 'react';
import {
  Search,
  X,
  ListTodo,
  FileText,
  PanelLeftClose,
  PanelRightClose,
  CheckSquare,
  List,
  Tag,
  Settings,
  Moon,
  Sun,
  Clock,
  History,
  Trash2,
  Loader2,
  Filter,
} from 'lucide-react';
import { useMomentum } from "@/contexts/ServerMomentumContext";
import { apiQuery } from '@/lib/apiClient';
import { cn } from '@/lib/utils';
import { itemRowState, ITEM_DRAGGING } from '@/lib/styles';
import { linkifyTitle, getTitlePlainText, extractFirstLineLink, renderFirstLineLink } from '@/lib/linkifyTitle';
import { ListIcon } from '@/components/icons/ListIcon';
import { ListPill } from '@/components/ListPill';
import { TagPill } from '@/components/TagPill';
import {
  debouncedSearch,
  cancelSearch,
  clearSearchCache,
  parseHighlight,
  highlightSubstring,
  browseFilteredItems,
  type ServerSearchResult,
  type SearchState,
  type SearchFilters,
} from '@/lib/serverSearch';
import type { List as ListType, Tag as TagType } from '@/types';

// Local storage key for search history
const SEARCH_HISTORY_KEY = 'momentum_search_history';
const MAX_SEARCH_HISTORY = 10;

interface ActiveFilter {
  type: 'list' | 'tag';
  id: string;
  name: string;
  color: string;
  icon?: string;
}

type PickerMode = 'none' | 'list' | 'tag';

function loadSearchHistory(): string[] {
  try {
    const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveSearchHistory(history: string[]): void {
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  } catch {
    // Ignore storage errors
  }
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
  showByDefault?: boolean;
}

export interface SearchPanelProps {
  mode: 'modal' | 'fullscreen';
  isActive: boolean;
  onClose?: () => void;
  onNewTask: () => void;
  onNewNote: () => void;
  onToggleSidebar?: () => void;
  onToggleDetailPanel?: () => void;
  onSelectItem: (id: string) => void;
  onSelectList: (listId: string) => void;
  onSelectTag: (tagId: string) => void;
}

export interface SearchPanelRef {
  focusInput: () => void;
}

export const SearchPanel = forwardRef<SearchPanelRef, SearchPanelProps>(({
  mode,
  isActive,
  onClose,
  onNewTask,
  onNewNote,
  onToggleSidebar,
  onToggleDetailPanel,
  onSelectItem,
  onSelectList,
  onSelectTag,
}, ref) => {
  const { userId, state, dispatch, tasksEnabled } = useMomentum();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastClosedAtRef = useRef<number>(0);
  const IDLE_TIMEOUT_MS = 30_000; // 30 seconds

  // Filter state
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [pickerMode, setPickerMode] = useState<PickerMode>('none');
  const [pickerQuery, setPickerQuery] = useState('');

  // Server-side search state
  const [searchState, setSearchState] = useState<SearchState>({
    results: [],
    isLoading: false,
    query: '',
    fromCache: false,
    error: null,
  });

  // Browse mode results (empty query + active filter)
  const [browseResults, setBrowseResults] = useState<ServerSearchResult[]>([]);
  const [isBrowsing, setIsBrowsing] = useState(false);

  const MAX_RECENT_ITEMS = 5;

  // Expose focusInput to parent
  useImperativeHandle(ref, () => ({
    focusInput: () => {
      setTimeout(() => inputRef.current?.focus(), 50);
    },
  }));

  // Derive search filters from active filters
  const searchFilters = useMemo((): SearchFilters | undefined => {
    const listFilter = activeFilters.find(f => f.type === 'list');
    const tagFilter = activeFilters.find(f => f.type === 'tag');
    if (!listFilter && !tagFilter) return undefined;
    return {
      listId: listFilter?.id || null,
      tagId: tagFilter?.id || null,
    };
  }, [activeFilters]);

  const hasActiveFilters = activeFilters.length > 0;

  // Load search history on mount
  useEffect(() => {
    setSearchHistory(loadSearchHistory());
  }, []);

  // Fetch the 5 most recently modified items from Supabase (only when active, no filters, no query)
  const [recentFilesData, setRecentFilesData] = useState<any[]>([]);
  useEffect(() => {
    if (!isActive || query.trim() || hasActiveFilters) return;
    apiQuery({ table: 'items', select: 'id, type, title, content, updated_at, list_id', filters: { user_id: userId, deleted_at: null }, order: { column: 'updated_at', ascending: false }, limit: 5 }).then(({ data }) => {
      setRecentFilesData(data || []);
    });
  }, [isActive, query, hasActiveFilters]);

  const recentItems = useMemo(() => {
    if (query.trim() || hasActiveFilters) return [];
    return recentFilesData.map(item => ({
      id: item.id,
      type: item.type as 'task' | 'note',
      title: item.title,
      content: item.content,
      updatedAt: item.updated_at,
      listId: item.list_id as string | null,
    }));
  }, [query, recentFilesData, hasActiveFilters]);

  // Detect picker mode from query prefix
  useEffect(() => {
    const trimmed = query.trimStart();
    if (trimmed.toLowerCase().startsWith('list:')) {
      setPickerMode('list');
      setPickerQuery(trimmed.slice(5).trim());
      return;
    }
    if (trimmed.toLowerCase().startsWith('tag:')) {
      setPickerMode('tag');
      setPickerQuery(trimmed.slice(4).trim());
      return;
    }
    setPickerMode('none');
    setPickerQuery('');
  }, [query]);

  // Server-side search — triggered on query change (only when not in picker mode)
  useEffect(() => {
    if (pickerMode !== 'none') {
      cancelSearch();
      setSearchState({ results: [], isLoading: false, query: '', fromCache: false, error: null });
      return;
    }

    const trimmed = query.trim();
    if (!trimmed) {
      cancelSearch();
      setSearchState({ results: [], isLoading: false, query: '', fromCache: false, error: null });
      return;
    }

    debouncedSearch(trimmed, (newState) => {
      setSearchState(newState);
    }, 200, searchFilters, userId);

    return () => {
      cancelSearch();
    };
  }, [query, pickerMode, searchFilters]);

  // Browse mode: when query is empty but filters are active, fetch filtered items
  useEffect(() => {
    if (pickerMode !== 'none') return;
    if (!hasActiveFilters || query.trim()) {
      setBrowseResults([]);
      setIsBrowsing(false);
      return;
    }

    setIsBrowsing(true);
    browseFilteredItems(searchFilters!).then(results => {
      setBrowseResults(results);
      setIsBrowsing(false);
    }).catch(() => {
      setBrowseResults([]);
      setIsBrowsing(false);
    });
  }, [query, hasActiveFilters, searchFilters, pickerMode]);

  const searchResults = searchState.results;
  const isSearching = searchState.isLoading || isBrowsing;

  const displayResults = useMemo(() => {
    if (query.trim() && pickerMode === 'none') return searchResults;
    if (hasActiveFilters && !query.trim() && pickerMode === 'none') return browseResults;
    return [];
  }, [query, pickerMode, searchResults, browseResults, hasActiveFilters]);

  // Picker items: lists or tags filtered by picker query
  const pickerItems = useMemo(() => {
    if (pickerMode === 'list') {
      const pq = pickerQuery.toLowerCase();
      const existingListId = activeFilters.find(f => f.type === 'list')?.id;
      return state.lists
        .filter(l => l.id !== existingListId)
        .filter(l => !pq || l.name.toLowerCase().includes(pq))
        .slice(0, 10);
    }
    if (pickerMode === 'tag') {
      const pq = pickerQuery.toLowerCase();
      const existingTagId = activeFilters.find(f => f.type === 'tag')?.id;
      return state.tags
        .filter(t => t.id !== existingTagId)
        .filter(t => !pq || t.name.toLowerCase().includes(pq))
        .slice(0, 10);
    }
    return [];
  }, [pickerMode, pickerQuery, state.lists, state.tags, activeFilters]);

  // Quick actions (only in modal mode)
  const quickActions: QuickAction[] = useMemo(() => {
    if (mode === 'fullscreen') return []; // No quick actions in mobile fullscreen
    return [
      {
        id: 'new-task',
        label: 'New Task',
        icon: <ListTodo className="w-4 h-4" />,
        action: () => { onNewTask(); onClose?.(); },
        showByDefault: true,
      },
      {
        id: 'new-note',
        label: 'New Note',
        icon: <FileText className="w-4 h-4" />,
        action: () => { onNewNote(); onClose?.(); },
        showByDefault: true,
      },
      {
        id: 'toggle-sidebar',
        label: 'Toggle Sidebar',
        icon: <PanelLeftClose className="w-4 h-4" />,
        action: () => { onToggleSidebar?.(); onClose?.(); },
        showByDefault: false,
      },
      {
        id: 'toggle-detail',
        label: 'Toggle Detail Panel',
        icon: <PanelRightClose className="w-4 h-4" />,
        action: () => { onToggleDetailPanel?.(); onClose?.(); },
        showByDefault: false,
      },
    ];
  }, [mode, onNewTask, onNewNote, onToggleSidebar, onToggleDetailPanel, onClose]);

  const availableQuickActions = useMemo(() => {
    if (tasksEnabled) return quickActions;
    return quickActions.filter(a => a.id !== 'new-task');
  }, [quickActions, tasksEnabled]);

  const filteredQuickActions = useMemo(() => {
    if (pickerMode !== 'none') return [];
    if (hasActiveFilters) return [];
    if (!query.trim()) {
      return availableQuickActions.filter(action => action.showByDefault);
    }
    const q = query.toLowerCase();
    return availableQuickActions.filter(action =>
      action.label.toLowerCase().includes(q)
    );
  }, [query, availableQuickActions, pickerMode, hasActiveFilters]);

  const filteredLists = useMemo(() => {
    if (pickerMode !== 'none') return [];
    if (hasActiveFilters) return [];
    if (!query.trim()) return state.lists.slice(0, 5);
    const q = query.toLowerCase();
    return state.lists.filter(list =>
      list.name.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [query, state.lists, pickerMode, hasActiveFilters]);

  const filteredTags = useMemo(() => {
    if (pickerMode !== 'none') return [];
    if (hasActiveFilters) return [];
    if (!query.trim()) return state.tags.slice(0, 5);
    const q = query.toLowerCase();
    return state.tags.filter(tag =>
      tag.name.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [query, state.tags, pickerMode, hasActiveFilters]);

  const filteredSearchHistory = useMemo(() => {
    if (query.trim() || hasActiveFilters || pickerMode !== 'none') return [];
    return searchHistory.slice(0, 5);
  }, [query, searchHistory, hasActiveFilters, pickerMode]);

  const totalItems = useMemo(() => {
    if (pickerMode !== 'none') return pickerItems.length;
    let count = 0;
    if (filteredQuickActions.length > 0) count += filteredQuickActions.length;
    if (filteredSearchHistory.length > 0) count += filteredSearchHistory.length;
    if (recentItems.length > 0) count += recentItems.length;
    if (displayResults.length > 0) count += displayResults.length;
    if (filteredLists.length > 0) count += filteredLists.length;
    if (filteredTags.length > 0) count += filteredTags.length;
    return count;
  }, [pickerMode, pickerItems, filteredQuickActions, filteredSearchHistory, recentItems, displayResults, filteredLists, filteredTags]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // In modal mode: only reset state if more than 30s have passed since last close.
  // This allows users to quickly navigate between search results and items.
  // In fullscreen mode (mobile): state always persists.
  useEffect(() => {
    if (isActive) {
      if (mode === 'modal') {
        const elapsed = Date.now() - lastClosedAtRef.current;
        if (elapsed > IDLE_TIMEOUT_MS || lastClosedAtRef.current === 0) {
          // Stale session — reset everything
          setQuery('');
          setSelectedIndex(0);
          setActiveFilters([]);
          setPickerMode('none');
          setPickerQuery('');
          setBrowseResults([]);
        } else {
          // Fresh session — preserve state, just reset selection cursor
          setSelectedIndex(0);
        }
        setSearchHistory(loadSearchHistory());
      } else {
        // Fullscreen mode: refresh search history but preserve query/filters
        setSearchHistory(loadSearchHistory());
      }
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      // Record when the panel was closed (for modal idle timeout)
      if (mode === 'modal') {
        lastClosedAtRef.current = Date.now();
      }
      cancelSearch();
    }
  }, [isActive, mode]);

  // Add query to search history
  const addToSearchHistory = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setSearchHistory(prev => {
      const filtered = prev.filter(q => q.toLowerCase() !== searchQuery.toLowerCase());
      const updated = [searchQuery.trim(), ...filtered].slice(0, MAX_SEARCH_HISTORY);
      saveSearchHistory(updated);
      return updated;
    });
  }, []);

  const removeFromSearchHistory = useCallback((searchQuery: string) => {
    setSearchHistory(prev => {
      const updated = prev.filter(q => q !== searchQuery);
      saveSearchHistory(updated);
      return updated;
    });
  }, []);

  const clearSearchHistoryFn = useCallback(() => {
    setSearchHistory([]);
    saveSearchHistory([]);
  }, []);

  const addFilter = useCallback((filter: ActiveFilter) => {
    setActiveFilters(prev => {
      const filtered = prev.filter(f => f.type !== filter.type);
      return [...filtered, filter];
    });
    setQuery('');
    setPickerMode('none');
    setPickerQuery('');
    setSelectedIndex(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const removeFilter = useCallback((filterType: 'list' | 'tag') => {
    setActiveFilters(prev => prev.filter(f => f.type !== filterType));
    setSelectedIndex(0);
  }, []);

  const clearAllFilters = useCallback(() => {
    setActiveFilters([]);
    setSelectedIndex(0);
  }, []);

  const selectPickerItem = useCallback((index: number) => {
    const item = pickerItems[index];
    if (!item) return;

    if (pickerMode === 'list') {
      const list = item as ListType;
      addFilter({
        type: 'list',
        id: list.id,
        name: list.name,
        color: list.color,
        icon: list.icon,
      });
    } else if (pickerMode === 'tag') {
      const tag = item as TagType;
      addFilter({
        type: 'tag',
        id: tag.id,
        name: tag.name,
        color: tag.color,
      });
    }
  }, [pickerMode, pickerItems, addFilter]);

  // Handle item selection - in fullscreen mode, don't close, just select
  const handleSelectItem = useCallback((id: string) => {
    if (query.trim()) addToSearchHistory(query);
    onSelectItem(id);
    if (mode === 'modal') {
      onClose?.();
    }
    // In fullscreen mode: don't close - the parent (Home.tsx) will switch to editor view
  }, [query, addToSearchHistory, onSelectItem, mode, onClose]);

  const executeSelectedItem = useCallback(() => {
    if (pickerMode !== 'none') {
      selectPickerItem(selectedIndex);
      return;
    }

    let currentIndex = 0;

    // Quick actions
    if (selectedIndex < currentIndex + filteredQuickActions.length) {
      filteredQuickActions[selectedIndex - currentIndex].action();
      return;
    }
    currentIndex += filteredQuickActions.length;

    // Search history
    if (selectedIndex < currentIndex + filteredSearchHistory.length) {
      const historyQuery = filteredSearchHistory[selectedIndex - currentIndex];
      setQuery(historyQuery);
      return;
    }
    currentIndex += filteredSearchHistory.length;

    // Recent items
    if (selectedIndex < currentIndex + recentItems.length) {
      const item = recentItems[selectedIndex - currentIndex];
      handleSelectItem(item.id);
      return;
    }
    currentIndex += recentItems.length;

    // Display results (search or browse)
    if (selectedIndex < currentIndex + displayResults.length) {
      const result = displayResults[selectedIndex - currentIndex];
      handleSelectItem(result.id);
      return;
    }
    currentIndex += displayResults.length;

    // Lists
    if (selectedIndex < currentIndex + filteredLists.length) {
      const list = filteredLists[selectedIndex - currentIndex];
      addFilter({
        type: 'list',
        id: list.id,
        name: list.name,
        color: list.color,
        icon: list.icon,
      });
      return;
    }
    currentIndex += filteredLists.length;

    // Tags
    if (selectedIndex < currentIndex + filteredTags.length) {
      const tag = filteredTags[selectedIndex - currentIndex];
      addFilter({
        type: 'tag',
        id: tag.id,
        name: tag.name,
        color: tag.color,
      });
      return;
    }
  }, [selectedIndex, pickerMode, selectPickerItem, filteredQuickActions, filteredSearchHistory, recentItems, displayResults, filteredLists, filteredTags, handleSelectItem, addFilter]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, totalItems - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        executeSelectedItem();
        break;
      case 'Tab':
        if (pickerMode !== 'none' && pickerItems.length === 1) {
          e.preventDefault();
          selectPickerItem(0);
        } else if (pickerMode !== 'none' && pickerItems.length > 0) {
          e.preventDefault();
          selectPickerItem(selectedIndex);
        }
        break;
      case 'Backspace':
        if (query === '' && activeFilters.length > 0) {
          e.preventDefault();
          const lastFilter = activeFilters[activeFilters.length - 1];
          removeFilter(lastFilter.type);
        }
        break;
      case 'Escape':
        e.preventDefault();
        if (pickerMode !== 'none') {
          setQuery('');
          setPickerMode('none');
          setPickerQuery('');
        } else if (activeFilters.length > 0) {
          clearAllFilters();
        } else if (mode === 'modal') {
          onClose?.();
        }
        // In fullscreen mode, Escape with no filters does nothing (user uses tab bar to navigate)
        break;
    }
  }, [totalItems, onClose, executeSelectedItem, pickerMode, pickerItems, selectPickerItem, selectedIndex, query, activeFilters, removeFilter, clearAllFilters, mode]);

  // Scroll selected item into view
  useEffect(() => {
    const selectedElement = listRef.current?.querySelector('[data-selected="true"]');
    selectedElement?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  // Shared renderer for highlight segments
  const renderSegments = (segments: { text: string; highlighted: boolean }[]) => (
    <>
      {segments.map((seg, i) => (
        seg.highlighted ? (
          <mark key={i} className="bg-yellow-300/60 dark:bg-yellow-500/50 text-inherit rounded-sm px-0.5 font-medium">
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      ))}
    </>
  );

  const renderServerHighlight = (html: string) => renderSegments(parseHighlight(html));

  const renderClientHighlight = (text: string) => {
    if (!query.trim()) return text;
    return renderSegments(highlightSubstring(text, query.trim()));
  };

  const renderPickerHighlight = (text: string) => {
    if (!pickerQuery.trim()) return text;
    return renderSegments(highlightSubstring(text, pickerQuery.trim()));
  };

  const getItemIndex = (section: 'actions' | 'history' | 'recent' | 'results' | 'lists' | 'tags', localIndex: number): number => {
    let offset = 0;
    if (section === 'actions') return localIndex;
    offset += filteredQuickActions.length;
    if (section === 'history') return offset + localIndex;
    offset += filteredSearchHistory.length;
    if (section === 'recent') return offset + localIndex;
    offset += recentItems.length;
    if (section === 'results') return offset + localIndex;
    offset += displayResults.length;
    if (section === 'lists') return offset + localIndex;
    offset += filteredLists.length;
    if (section === 'tags') return offset + localIndex;
    return offset + localIndex;
  };

  const filterContextLine = useMemo(() => {
    if (!hasActiveFilters) return null;
    const parts: string[] = [];
    const listFilter = activeFilters.find(f => f.type === 'list');
    const tagFilter = activeFilters.find(f => f.type === 'tag');
    if (listFilter) parts.push(`in "${listFilter.name}"`);
    if (tagFilter) parts.push(`tagged #${tagFilter.name}`);

    const resultCount = displayResults.length;
    if (query.trim()) {
      return `${resultCount} result${resultCount !== 1 ? 's' : ''} ${parts.join(' ')}`;
    }
    return `${resultCount} item${resultCount !== 1 ? 's' : ''} ${parts.join(' ')}`;
  }, [hasActiveFilters, activeFilters, displayResults.length, query]);

  // Determine container height class based on mode
  const containerHeightClass = mode === 'fullscreen' ? 'h-full' : 'max-h-[60vh]';

  return (
    <div className={cn("flex flex-col bg-background", mode === 'fullscreen' && "h-full")}>
      {/* Search Input */}
      <div className={cn(
        "flex items-center gap-3 px-4 py-3 border-b border-border shrink-0",
        mode === 'fullscreen' && "safe-area-top"
      )}>
        {isSearching ? (
          <Loader2 className="w-4 h-4 text-primary shrink-0 animate-spin" />
        ) : pickerMode !== 'none' ? (
          <Filter className="w-4 h-4 text-primary shrink-0" />
        ) : (
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            hasActiveFilters
              ? "Search within filter... (or type list: / tag: to add more)"
              : "Search items, lists, or type list: / tag: to filter..."
          }
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
        />

        {/* Clear button - in fullscreen mode, clear query; in modal mode, close */}
        {mode === 'fullscreen' && query && (
          <button
            onClick={() => setQuery('')}
            className="p-1 hover:bg-accent rounded-md transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
        {mode === 'modal' && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded-md transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/20 shrink-0">
          <span className="text-xs text-muted-foreground mr-1">Filters:</span>
          {activeFilters.map(filter => (
            <span
              key={`${filter.type}-${filter.id}`}
              className="inline-flex items-center gap-1.5 pl-2 pr-1 py-0.5 rounded-full text-xs font-medium border transition-colors"
              style={{
                backgroundColor: `${filter.color}15`,
                borderColor: `${filter.color}40`,
                color: filter.color,
              }}
            >
              {filter.type === 'list' && filter.icon && (
                <ListIcon name={filter.icon as any} className="w-3 h-3" color={filter.color} />
              )}
              {filter.type === 'tag' && (
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: filter.color }}
                />
              )}
              <span>{filter.name}</span>
              <button
                onClick={() => removeFilter(filter.type)}
                className="p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {activeFilters.length > 1 && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-1"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Results */}
      <div ref={listRef} className={cn("overflow-y-auto flex-1", mode === 'modal' && "max-h-[60vh]")}>

        {/* Picker Mode: List Picker */}
        {pickerMode === 'list' && (
          <div className="py-1.5">
            <div className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Select a List to filter by
            </div>
            {pickerItems.length > 0 ? (
              (pickerItems as ListType[]).map((list, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <button
                    key={list.id}
                    data-selected={isSelected}
                    onClick={() => selectPickerItem(index)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                      itemRowState(isSelected)
                    )}
                  >
                    <ListIcon name={list.icon} className="w-4 h-4" color={list.color} />
                    <span className="flex-1 text-sm text-foreground">{renderPickerHighlight(list.name)}</span>
                    <span className="text-xs text-muted-foreground">
                      {state.items.filter(i => i.listId === list.id && !i.deletedAt).length} items
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-4 text-center text-sm text-muted-foreground">
                {pickerQuery ? `No lists matching "${pickerQuery}"` : 'No lists available'}
              </div>
            )}
          </div>
        )}

        {/* Picker Mode: Tag Picker */}
        {pickerMode === 'tag' && (
          <div className="py-1.5">
            <div className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Select a Tag to filter by
            </div>
            {pickerItems.length > 0 ? (
              (pickerItems as TagType[]).map((tag, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <button
                    key={tag.id}
                    data-selected={isSelected}
                    onClick={() => selectPickerItem(index)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                      itemRowState(isSelected)
                    )}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tag.color }}
                    />
                    <span className="flex-1 text-sm text-foreground">{renderPickerHighlight(tag.name)}</span>
                    <span className="text-xs text-muted-foreground">
                      {state.items.filter(i => i.tags.includes(tag.id) && !i.deletedAt).length} items
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-4 text-center text-sm text-muted-foreground">
                {pickerQuery ? `No tags matching "${pickerQuery}"` : 'No tags available'}
              </div>
            )}
          </div>
        )}

        {/* Normal mode content (not picker) */}
        {pickerMode === 'none' && (
          <>
            {/* Filter context line */}
            {filterContextLine && displayResults.length > 0 && (
              <div className="px-4 py-1.5 text-xs text-muted-foreground">
                {filterContextLine}
              </div>
            )}

            {/* Results count when searching without filters */}
            {!hasActiveFilters && query.trim() && searchResults.length > 0 && (
              <div className="px-4 py-1.5 text-xs text-muted-foreground">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </div>
            )}

            {/* Quick Actions (modal mode only) */}
            {filteredQuickActions.length > 0 && (
              <div className="py-1.5">
                <div className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Quick Actions
                </div>
                {filteredQuickActions.map((action, index) => {
                  const itemIndex = getItemIndex('actions', index);
                  const isSelected = selectedIndex === itemIndex;
                  return (
                    <button
                      key={action.id}
                      data-selected={isSelected}
                      onClick={action.action}
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                        itemRowState(isSelected)
                      )}
                    >
                      <span className="text-muted-foreground">{action.icon}</span>
                      <span className="flex-1 text-sm text-foreground">{renderClientHighlight(action.label)}</span>
                      {action.shortcut && (
                        <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                          {action.shortcut}
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Search History */}
            {filteredSearchHistory.length > 0 && (
              <div className="py-1.5 border-t border-border">
                <div className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <History className="w-3 h-3" />
                    Recent Searches
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearSearchHistoryFn();
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear
                  </button>
                </div>
                {filteredSearchHistory.map((historyQuery, index) => {
                  const itemIndex = getItemIndex('history', index);
                  const isSelected = selectedIndex === itemIndex;
                  return (
                    <div
                      key={`history-${index}`}
                      role="button"
                      tabIndex={0}
                      data-selected={isSelected}
                      onClick={() => setQuery(historyQuery)}
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                      onKeyDown={(e) => { if (e.key === 'Enter') setQuery(historyQuery); }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors group cursor-pointer",
                        itemRowState(isSelected)
                      )}
                    >
                      <Search className="w-4 h-4 text-muted-foreground" />
                      <span className="flex-1 text-sm text-foreground">{historyQuery}</span>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromSearchHistory(historyQuery);
                        }}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); removeFromSearchHistory(historyQuery); } }}
                        className="p-1 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 rounded transition-all cursor-pointer"
                      >
                        <X className="w-3 h-3 text-muted-foreground hover:text-destructive" />
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Recent Files */}
            {recentItems.length > 0 && (
              <div className="py-1.5 border-t border-border">
                <div className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  Recent Files
                </div>
                {recentItems.map((item, index) => {
                  const itemIndex = getItemIndex('recent', index);
                  const isSelected = selectedIndex === itemIndex;
                  return (
                    <button
                      key={item.id}
                      data-selected={isSelected}
                      onClick={() => handleSelectItem(item.id)}
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                        itemRowState(isSelected)
                      )}
                    >
                      <span className="text-muted-foreground">
                        {item.type === 'task' ? (
                          <ListTodo className="w-4 h-4" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-foreground truncate block">{item.title ? linkifyTitle(item.title).elements : 'Untitled'}</span>
                        {(() => {
                          const firstLink = extractFirstLineLink(item.content);
                          if (firstLink) {
                            return (
                              <div className="mt-0.5">
                                {renderFirstLineLink(firstLink)}
                              </div>
                            );
                          }
                          return null;
                        })()}
                        {/* List and Tag pills */}
                        {(() => {
                          const stateItem = state.items.find(i => i.id === item.id);
                          const itemTagIds = stateItem?.tags || [];
                          const itemTags = state.tags.filter(t => itemTagIds.includes(t.id));
                          const hasListOrTags = item.listId || itemTags.length > 0;
                          if (!hasListOrTags) return null;
                          return (
                            <div className="flex items-center gap-1 mt-1 flex-wrap">
                              {item.listId && (
                                <ListPill
                                  listId={item.listId}
                                  itemId={item.id}
                                  itemType={item.type}
                                  size="sm"
                                  readOnly
                                />
                              )}
                              {itemTags.slice(0, 3).map((tag) => (
                                <TagPill
                                  key={tag.id}
                                  tag={tag}
                                  itemId={item.id}
                                  size="sm"
                                  readOnly
                                />
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Display Results (Search Results or Browse Results) */}
            {displayResults.length > 0 && (
              <div className="py-1.5 border-t border-border">
                <div className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {hasActiveFilters && !query.trim() ? 'Filtered Items' : 'Items'}
                </div>
                {displayResults.map((result, index) => {
                  const itemIndex = getItemIndex('results', index);
                  const isSelected = selectedIndex === itemIndex;

                  return (
                    <button
                      key={result.id}
                      data-selected={isSelected}
                      onClick={() => handleSelectItem(result.id)}
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                      className={cn(
                        "w-full flex items-start gap-3 px-4 py-2 text-left transition-colors",
                        itemRowState(isSelected)
                      )}
                    >
                      <span className="text-muted-foreground flex-shrink-0 h-5 flex items-center">
                        {result.type === 'task' ? (
                          <ListTodo className="w-4 h-4" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-foreground truncate leading-5">
                          {(() => {
                            const hl = result.titleHighlight;
                            if (hl && (hl.includes('<mark>') || hl.includes('<b>'))) {
                              return renderServerHighlight(hl);
                            }
                            const title = result.title || 'Untitled';
                            return query.trim() ? renderClientHighlight(title) : title;
                          })()}
                        </div>
                        {(() => {
                          const chl = result.contentHighlight;
                          if (chl && (chl.includes('<mark>') || chl.includes('<b>'))) {
                            return (
                              <div className="text-xs text-muted-foreground truncate mt-0.5">
                                {renderServerHighlight(chl)}
                              </div>
                            );
                          }
                          if (result.content) {
                            const snippet = result.content.replace(/\n/g, ' ').slice(0, 120);
                            return (
                              <div className="text-xs text-muted-foreground truncate mt-0.5">
                                {query.trim() ? renderClientHighlight(snippet) : snippet}
                                {result.content.length > 120 ? '...' : ''}
                              </div>
                            );
                          }
                          const firstLink = extractFirstLineLink(result.content);
                          if (firstLink) {
                            return (
                              <div className="mt-0.5">
                                {renderFirstLineLink(firstLink)}
                              </div>
                            );
                          }
                          return null;
                        })()}
                        {/* List and Tag pills */}
                        {(() => {
                          const stateItem = state.items.find(i => i.id === result.id);
                          const itemTagIds = stateItem?.tags || [];
                          const itemTags = state.tags.filter(t => itemTagIds.includes(t.id));
                          const hasListOrTags = result.listId || itemTags.length > 0;
                          if (!hasListOrTags) return null;
                          return (
                            <div className="flex items-center gap-1 mt-1 flex-wrap">
                              {result.listId && (
                                <ListPill
                                  listId={result.listId}
                                  itemId={result.id}
                                  itemType={result.type}
                                  size="sm"
                                  readOnly
                                />
                              )}
                              {itemTags.slice(0, 3).map((tag) => (
                                <TagPill
                                  key={tag.id}
                                  tag={tag}
                                  itemId={result.id}
                                  size="sm"
                                  readOnly
                                />
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Loading skeleton when searching */}
            {isSearching && displayResults.length === 0 && (query.trim() || hasActiveFilters) && (
              <div className="py-1.5 border-t border-border">
                <div className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {hasActiveFilters ? 'Loading filtered items...' : 'Searching...'}
                </div>
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3 px-4 py-2 animate-pulse">
                    <div className="w-4 h-4 bg-muted rounded" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3.5 bg-muted rounded w-3/4" />
                      <div className="h-2.5 bg-muted/60 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Lists */}
            {filteredLists.length > 0 && (
              <div className="py-1.5 border-t border-border">
                <div className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Lists
                </div>
                {filteredLists.map((list, index) => {
                  const itemIndex = getItemIndex('lists', index);
                  const isSelected = selectedIndex === itemIndex;
                  return (
                    <button
                      key={list.id}
                      data-selected={isSelected}
                      onClick={() => {
                        addFilter({
                          type: 'list',
                          id: list.id,
                          name: list.name,
                          color: list.color,
                          icon: list.icon,
                        });
                      }}
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                        itemRowState(isSelected)
                      )}
                    >
                      <ListIcon name={list.icon} className="w-4 h-4" color={list.color} />
                      <span className="flex-1 text-sm text-foreground">{renderClientHighlight(list.name)}</span>
                      <span className="text-xs text-muted-foreground">
                        {state.items.filter(i => i.listId === list.id && !i.deletedAt).length} items
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Tags */}
            {filteredTags.length > 0 && (
              <div className="py-1.5 border-t border-border">
                <div className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Tags
                </div>
                {filteredTags.map((tag, index) => {
                  const itemIndex = getItemIndex('tags', index);
                  const isSelected = selectedIndex === itemIndex;
                  return (
                    <button
                      key={tag.id}
                      data-selected={isSelected}
                      onClick={() => {
                        addFilter({
                          type: 'tag',
                          id: tag.id,
                          name: tag.name,
                          color: tag.color,
                        });
                      }}
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                        itemRowState(isSelected)
                      )}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: tag.color }}
                      />
                      <span className="flex-1 text-sm text-foreground">{renderClientHighlight(tag.name)}</span>
                      <span className="text-xs text-muted-foreground">
                        {state.items.filter(i => i.tags.includes(tag.id) && !i.deletedAt).length} items
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* No results */}
            {!isSearching && displayResults.length === 0 && (
              <>
                {query.trim() && filteredQuickActions.length === 0 && filteredLists.length === 0 && filteredTags.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No results found for "{query}"</p>
                    {hasActiveFilters && (
                      <p className="text-xs mt-1">Try removing filters or using a different search term</p>
                    )}
                    {!hasActiveFilters && (
                      <p className="text-xs mt-1">Try a different search term</p>
                    )}
                  </div>
                )}
                {!query.trim() && hasActiveFilters && !isBrowsing && (
                  <div className="py-8 text-center text-muted-foreground">
                    <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No items match the current filter</p>
                    <p className="text-xs mt-1">Try a different filter or add items to this list/tag</p>
                  </div>
                )}
              </>
            )}

            {/* Search error */}
            {searchState.error && (
              <div className="px-4 py-2 text-xs text-destructive">
                Search error: {searchState.error}
              </div>
            )}
          </>
        )}

        {/* Bottom spacer for mobile tab bar + safe area */}
        {mode === 'fullscreen' && (
          <div className="shrink-0 md:hidden" style={{ height: 'calc(3.5rem + max(0.5rem, env(safe-area-inset-bottom)))' }} />
        )}
      </div>
    </div>
  );
});

SearchPanel.displayName = 'SearchPanel';
