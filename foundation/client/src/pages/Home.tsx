/**
 * Home Page - Momentum Main Application
 * Clean Minimalist Design: 3-column layout with collapsible panels
 * Mobile responsive with bottom navigation (4 tabs: Menu, Items, Editor, Search)
 * Left: Tags, filters, pinned items | Middle: Task/Note list | Right: Editor
 */

import { useCallback, useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useResizablePanels } from '@/hooks/useResizablePanels';
import { PanelResizer } from '@/components/PanelResizer';
import { LeftSidebar } from '@/components/LeftSidebar';
import { MiddlePanel } from '@/components/MiddlePanel';
import type { SearchPanelRef } from '@/components/SearchPanel';
import type { SettingsSection } from '@/components/SettingsDialog';

// Lazy-load heavy components that aren't needed on initial render
const EditorV2 = lazy(() => import('@/components/EditorV2'));
// SearchPanel uses forwardRef, so we cast to preserve ref forwarding through lazy
const SearchPanel = lazy(() => import('@/components/SearchPanel').then(m => ({ default: m.SearchPanel }))) as any;
const CommandPalette = lazy(() => import('@/components/CommandPalette').then(m => ({ default: m.CommandPalette })));
const SettingsDialog = lazy(() => import('@/components/SettingsDialog').then(m => ({ default: m.SettingsDialog })));
import { useMomentum } from "@/contexts/ServerMomentumContext";
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { LeftSidebarSkeleton } from '@/components/LeftSidebarSkeleton';
import { KeyboardShortcutsDialog, useKeyboardShortcutsDialog } from '@/components/KeyboardShortcutsDialog';
import { MiddlePanelSkeleton } from '@/components/MiddlePanelSkeleton';
import { EditorPanelSkeleton } from '@/components/EditorPanelSkeleton';
import { Button } from '@/components/ui/button';
import { 
  PanelLeftClose, 
  Sparkles, 
  List, 
  Edit3, 
  Menu,
  X,
  FileText,
  FilePlus2,
  CheckSquare,
  ListTodo,
  LayoutGrid,
  CheckCircle2,
  Trash2,
  Hash,
  Folder,
  Search,
  ListChecks,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { FilterType, SortOrder } from '@/types';
// motion/react removed — using CSS transitions for panel collapse/expand
import { cn } from '@/lib/utils';
import { toast } from '@/lib/toast';


type MobileView = 'sidebar' | 'list' | 'search' | 'editor';

export default function Home() {
  const { state, dispatch, createTask, createNote, undoLastDelete, selectNextItem, selectPreviousItem, fetchAndSelectItem, autoReorderChecklist, tasksEnabled, setSortOrder, setSortDirection } = useMomentum();
  
  const editorType = 'paragon' as const;
  

  const [mobileView, setMobileView] = useState<MobileView>('list');
  const [isMobile, setIsMobile] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsInitialSection, setSettingsInitialSection] = useState<SettingsSection | undefined>(undefined);
  const searchPanelRef = useRef<SearchPanelRef>(null);

  // Listen for custom 'open-settings' events dispatched from anywhere in the app
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.section) {
        setSettingsInitialSection(detail.section);
      }
      setSettingsOpen(true);
    };
    window.addEventListener('open-settings', handler);
    return () => window.removeEventListener('open-settings', handler);
  }, []);
  const { panelWidths, isResizing, handleMouseDown } = useResizablePanels();
  const { open: shortcutsOpen, setOpen: setShortcutsOpen } = useKeyboardShortcutsDialog();

  // Check if mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Switch to editor view when item is selected on mobile
  useEffect(() => {
    if (isMobile && state.selectedItemId) {
      setMobileView('editor');
    }
  }, [state.selectedItemId, isMobile]);

  // Redirect away from tasks/completed view when tasks are disabled
  useEffect(() => {
    if (!tasksEnabled && (state.activeFilter.type === 'tasks' || state.activeFilter.type === 'completed')) {
      dispatch({ type: 'SET_FILTER', payload: { type: 'all' } });
    }
  }, [tasksEnabled, state.activeFilter.type, dispatch]);



  const handleNewNote = useCallback(() => {
    createNote();
    if (isMobile) {
      setMobileView('editor');
    }
  }, [createNote, isMobile]);

  const handleNewTask = useCallback(() => {
    if (!tasksEnabled) return;
    createTask();
    if (isMobile) {
      setMobileView('editor');
    }
  }, [createTask, isMobile, tasksEnabled]);

  const handleEscape = useCallback(() => {
    if (state.selectedItemId) {
      dispatch({ type: 'SELECT_ITEM', payload: null });
    }
  }, [state.selectedItemId, dispatch]);

  // Handle Enter key to focus editor when item is selected
  const handleEnter = useCallback(() => {
    if (state.selectedItemId) {
      const titleInput = document.querySelector('textarea[placeholder="Task title..."], textarea[placeholder="Note title..."]') as HTMLTextAreaElement;
      if (titleInput) {
        titleInput.focus();
      }
    }
  }, [state.selectedItemId]);

  // Command palette keyboard shortcut (Cmd+E) and Settings shortcut (Cmd+,)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        if (isMobile) {
          // On mobile, switch to search tab
          setMobileView('search');
        } else {
          setCommandPaletteOpen(true);
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        setSettingsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile]);

  const handleToggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_LEFT_PANEL' });
  }, [dispatch]);

  const handleToggleDetailPanel = useCallback(() => {
    dispatch({ type: 'TOGGLE_RIGHT_PANEL' });
  }, [dispatch]);

  const handleSelectItem = useCallback((id: string) => {
    dispatch({ type: 'SELECT_ITEM', payload: id });
    if (isMobile) {
      setMobileView('editor');
    }
  }, [dispatch, isMobile]);

  // For search results that may not be in local state yet
  const handleFetchAndSelectItem = useCallback((id: string) => {
    fetchAndSelectItem(id);
    if (isMobile) {
      setMobileView('editor');
    }
  }, [fetchAndSelectItem, isMobile]);

  const handleSelectList = useCallback((listId: string) => {
    dispatch({ type: 'SET_FILTER', payload: { type: 'list', listId } });
    if (isMobile) {
      setMobileView('list');
    }
  }, [dispatch, isMobile]);

  const handleSelectTag = useCallback((tagId: string) => {
    dispatch({ type: 'SET_FILTER', payload: { type: 'tag', tagId } });
    if (isMobile) {
      setMobileView('list');
    }
  }, [dispatch, isMobile]);

  useKeyboardShortcuts({
    onNewNote: handleNewNote,
    onNewTask: tasksEnabled ? handleNewTask : undefined,
    onEscape: handleEscape,
    onUndo: undoLastDelete,
    onArrowUp: selectPreviousItem,
    onArrowDown: selectNextItem,
    onEnter: handleEnter,
  });

  const handleMobileItemSelect = useCallback(() => {
    setMobileView('editor');
  }, []);

  const handleMobileBack = useCallback(() => {
    setMobileView('list');
    dispatch({ type: 'SELECT_ITEM', payload: null });
  }, [dispatch]);

  // Helper to get the label and icon for the center tab based on active filter
  const getCenterTabInfo = useCallback(() => {
    const filter = state.activeFilter;
    switch (filter.type) {
      case 'all':
        return { label: 'All Items', icon: <Sparkles className="w-5 h-5" /> };
      case 'tasks':
        return { label: 'Tasks', icon: <ListTodo className="w-5 h-5" /> };
      case 'notes':
        return { label: 'Notes', icon: <FileText className="w-5 h-5" /> };
      case 'todo':
        return { label: 'Todo', icon: <CheckSquare className="w-5 h-5" /> };
      case 'miscellaneous':
        return { label: 'Misc', icon: <LayoutGrid className="w-5 h-5" /> };
      case 'completed':
        return { label: 'Completed', icon: <CheckCircle2 className="w-5 h-5" /> };
      case 'trash':
        return { label: 'Trash', icon: <Trash2 className="w-5 h-5" /> };
      case 'pinned':
        return { label: 'Pinned', icon: <Sparkles className="w-5 h-5" /> };
      case 'tag':
        return { label: 'Tag', icon: <Hash className="w-5 h-5" /> };
      case 'list':
        return { label: 'List', icon: <Folder className="w-5 h-5" /> };
      default:
        return { label: 'Items', icon: <List className="w-5 h-5" /> };
    }
  }, [state.activeFilter]);

  // Dismiss the HTML splash screen once data has loaded
  useEffect(() => {
    if (!state.isLoading) {
      (window as any).__dismissSplash?.();
    }
  }, [state.isLoading]);

  // Sort options for mobile - filter based on active view
  const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
    { value: 'modified', label: 'Date Modified' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'custom', label: 'Custom Order' },
  ];
  const mobileSortOptions = SORT_OPTIONS.filter(option => {
    const filter = state.activeFilter;
    // Hide Due Date for notes-only views
    if (option.value === 'dueDate' && filter.type === 'notes') {
      return false;
    }
    return true;
  });

  // Mobile Loading State
  if (isMobile && state.isLoading) {
    return (
      <div className="h-dvh w-screen flex flex-col overflow-hidden bg-background">
        <header className="h-12 border-b border-border/50 flex items-center justify-between px-4 bg-background shrink-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-primary" />
            </div>
            <span className="font-medium text-foreground">Momentum</span>
          </div>
        </header>
        <div className="flex-1 overflow-hidden">
          <MiddlePanelSkeleton />
        </div>
        <nav className="border-t border-border/50 bg-background flex items-center justify-around px-4 pt-2 shrink-0 safe-area-bottom">
          <div className="flex flex-col items-center gap-1 px-3 py-1.5">
            <Menu className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Menu</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-3 py-1.5">
            <List className="w-5 h-5 text-primary" />
            <span className="text-xs text-primary">Items</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-3 py-1.5">
            <Search className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Search</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-3 py-1.5">
            <Edit3 className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Editor</span>
          </div>
        </nav>
      </div>
    );
  }

  // Desktop Loading State
  if (!isMobile && state.isLoading) {
    return (
      <div className="h-screen w-screen flex overflow-hidden bg-background">
        <div
          style={{ width: panelWidths.leftPanel }}
          className="h-full flex-shrink-0"
        >
          <LeftSidebarSkeleton />
        </div>
        <div
          style={{ width: panelWidths.middlePanel }}
          className="h-full flex-shrink-0"
        >
          <MiddlePanelSkeleton />
        </div>
        <div className="flex-1 h-full overflow-hidden">
          <EditorPanelSkeleton />
        </div>
      </div>
    );
  }

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="h-dvh w-screen flex flex-col overflow-hidden bg-background">
        {/* Desktop-style CommandPalette is no longer needed on mobile — search is a tab */}

        {/* Mobile header: shown for sidebar and list views only */}
        {(mobileView === 'sidebar' || mobileView === 'list') && (
          <header className="h-12 border-b border-border/50 flex items-center justify-between px-3 bg-background shrink-0 z-10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary" />
              </div>
              <span className="font-medium text-foreground truncate">
                {mobileView === 'sidebar' && 'Menu'}
                {mobileView === 'list' && getCenterTabInfo().label}
              </span>
            </div>
            
            <div className="flex items-center gap-0.5">
              {/* New Task button */}
              {tasksEnabled && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  title="New Task"
                  onClick={handleNewTask}
                >
                  <CheckSquare className="h-4 w-4" />
                </Button>
              )}
              
              {/* New Note button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                title="New Note"
                onClick={handleNewNote}
              >
                <FilePlus2 className="h-4 w-4" />
              </Button>

              {/* Multi-select toggle - list view only */}
              {mobileView === 'list' && (
                <Button
                  variant={state.isMultiSelectMode ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  title={state.isMultiSelectMode ? "Exit multi-select" : "Select multiple items"}
                  onClick={() => dispatch({ type: 'TOGGLE_MULTI_SELECT_MODE' })}
                >
                  <ListChecks className="h-4 w-4" />
                </Button>
              )}

              {/* Sort Order Dropdown - list view only */}
              {mobileView === 'list' && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title="Sort order"
                    >
                      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    {mobileSortOptions.map((option) => {
                      const isActive = state.sortOrder === option.value;
                      return (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => {
                            if (isActive) {
                              setSortDirection(state.sortDirection === 'asc' ? 'desc' : 'asc');
                            } else {
                              setSortOrder(option.value);
                              setSortDirection('desc');
                            }
                          }}
                          className={cn(
                            'flex items-center justify-between text-xs',
                            isActive && 'text-primary font-medium'
                          )}
                        >
                          <span>{option.label}</span>
                          {isActive && (
                            state.sortDirection === 'asc' 
                              ? <ArrowUp className="w-3.5 h-3.5 ml-2" />
                              : <ArrowDown className="w-3.5 h-3.5 ml-2" />
                          )}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </header>
        )}

        <div className="flex-1 overflow-hidden relative">
          {/* Use CSS visibility to keep SearchPanel mounted (preserving state) while hiding it */}
          <div
            className={cn(
              "absolute inset-0 mobile-tab-bottom-offset transition-opacity duration-100",
              mobileView === 'search' ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
          >
            <SearchPanel
              ref={searchPanelRef}
              mode="fullscreen"
              isActive={mobileView === 'search'}
              onNewTask={handleNewTask}
              onNewNote={handleNewNote}
              onSelectItem={handleFetchAndSelectItem}
              onSelectList={handleSelectList}
              onSelectTag={handleSelectTag}
            />
          </div>

          {/* Keep all panels mounted to prevent item expand animations on view switches.
              Use CSS visibility/opacity to show/hide panels instead of AnimatePresence mount/unmount. */}
          <div
            className={cn(
              "absolute inset-0 mobile-tab-bottom-offset transition-opacity duration-100",
              mobileView === 'sidebar' ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
          >
            <LeftSidebar onNavigate={() => setMobileView('list')} onOpenSettings={() => setSettingsOpen(true)} onToggleCommandPalette={() => setMobileView('search')} />
          </div>
          <div
            className={cn(
              "absolute inset-0 mobile-tab-bottom-offset transition-opacity duration-100",
              mobileView === 'list' ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
          >
            <MiddlePanel 
              onItemSelect={handleMobileItemSelect}
            />
          </div>
          <div
            className={cn(
              "absolute inset-0 mobile-tab-bottom-offset transition-opacity duration-100",
              mobileView === 'editor' ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
          >
            <EditorV2 editorType={editorType} autoReorderChecklist={autoReorderChecklist} />
          </div>
        </div>

        {/* Bottom Tab Bar — 4 tabs */}
        <nav className="fixed bottom-0 left-0 right-0 border-t border-border/50 bg-background flex items-center justify-around px-2 pt-2 z-50 safe-area-bottom">
          <button
            onClick={() => setMobileView('sidebar')}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors',
              mobileView === 'sidebar' 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs">Menu</span>
          </button>
          <button
            onClick={() => setMobileView('list')}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors',
              mobileView === 'list' 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {getCenterTabInfo().icon}
            <span className="text-xs">{getCenterTabInfo().label}</span>
          </button>
          <button
            onClick={() => setMobileView('editor')}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors',
              mobileView === 'editor' 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Edit3 className="w-5 h-5" />
            <span className="text-xs">Editor</span>
          </button>
          <button
            onClick={() => {
              setMobileView('search');
              // Focus the search input when switching to search tab
              setTimeout(() => searchPanelRef.current?.focusInput(), 100);
            }}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors',
              mobileView === 'search' 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Search className="w-5 h-5" />
            <span className="text-xs">Search</span>
          </button>
        </nav>
        <SettingsDialog open={settingsOpen} onOpenChange={(v) => { setSettingsOpen(v); if (!v) setSettingsInitialSection(undefined); }} initialSection={settingsInitialSection} />
        <KeyboardShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className={cn(
      "h-screen w-screen flex overflow-hidden bg-background",
      isResizing && "select-none"
    )}>
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNewTask={handleNewTask}
        onNewNote={handleNewNote}
        onToggleSidebar={handleToggleSidebar}
        onToggleDetailPanel={handleToggleDetailPanel}
        onSelectItem={handleFetchAndSelectItem}
        onSelectList={handleSelectList}
        onSelectTag={handleSelectTag}
      />
      <div
        style={{ width: state.leftPanelCollapsed ? 48 : panelWidths.leftPanel }}
        className="h-full flex-shrink-0 transition-[width] duration-150 ease-out"
      >
        <LeftSidebar onOpenSettings={() => setSettingsOpen(true)} onToggleCommandPalette={() => setCommandPaletteOpen(true)} />
      </div>

      {!state.leftPanelCollapsed && (
        <PanelResizer
          onMouseDown={(e) => handleMouseDown('left', e)}
          isResizing={isResizing === 'left'}
        />
      )}

      <div
        style={{ width: state.rightPanelCollapsed ? undefined : panelWidths.middlePanel }}
        className={cn(
          'h-full flex-shrink-0 transition-[width] duration-150 ease-out',
          state.rightPanelCollapsed && 'flex-1'
        )}
      >
        <MiddlePanel />
      </div>

      {!state.rightPanelCollapsed && (
        <PanelResizer
          onMouseDown={(e) => handleMouseDown('middle', e)}
          isResizing={isResizing === 'middle'}
        />
      )}

      {!state.rightPanelCollapsed ? (
        <div className="flex-1 h-full overflow-hidden">
          <EditorV2 
            editorType={editorType} 
            onTogglePanel={() => dispatch({ type: 'TOGGLE_RIGHT_PANEL' })}
            autoReorderChecklist={autoReorderChecklist}
          />
        </div>
      ) : (
        <div className="h-full bg-background border-l border-border/50 flex flex-col items-center py-3 w-12">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => dispatch({ type: 'TOGGLE_RIGHT_PANEL' })}
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>
      )}
      <Suspense fallback={null}>
        <SettingsDialog open={settingsOpen} onOpenChange={(v) => { setSettingsOpen(v); if (!v) setSettingsInitialSection(undefined); }} initialSection={settingsInitialSection} />
      </Suspense>
      <KeyboardShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </div>
  );
}
