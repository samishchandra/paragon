/**
 * EditorTabs Component - Reorderable, scrollable tabs for open items
 * Features:
 * - Drag and drop reordering
 * - Hidden horizontal scrollbar with scroll functionality
 * - Auto-scroll to selected tab
 * - Keyboard shortcuts: Cmd+Shift+[ (prev tab), Cmd+Shift+] (next tab), Cmd+W (close tab), Cmd+Shift+T (reopen closed tab)
 * - Right-click context menu with Close, Close Others, Close All options
 */

import { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { useMomentum } from "@/contexts/ServerMomentumContext";
import { apiQuery } from '@/lib/apiClient';
import { X, ListTodo, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { linkifyTitle } from '@/lib/linkifyTitle';
import { Item } from '@/types';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

interface EditorTabsProps {
  onSelectItem: (id: string) => void;
}

export function EditorTabs({ onSelectItem }: EditorTabsProps) {
  const { userId, state, dispatch } = useMomentum();
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [draggedTabId, setDraggedTabId] = useState<string | null>(null);
  const [dragOverTabId, setDragOverTabId] = useState<string | null>(null);
  // Track tab visit history (most recent last) for "go to previous tab" on close
  const tabHistoryRef = useRef<string[]>([]);
  // Stack of recently closed tab IDs (most recent last) for Cmd+Shift+T reopen
  const closedTabStackRef = useRef<string[]>([]);
  
  // Compute IDs of tabs not found in current view's items
  const missingTabIds = useMemo(() => {
    if (!state.openTabIds || state.openTabIds.length === 0) return [];
    const loadedIds = new Set(state.items.map(item => item.id));
    return state.openTabIds.filter(id => !loadedIds.has(id));
  }, [state.openTabIds, state.items]);

  // Fetch missing tab items from Supabase and inject into state for instant switching.
  // Deferred until primary items are loaded (isLoading === false) to avoid slowing startup.
  const [missingTabItemsData, setMissingTabItemsData] = useState<any[]>([]);
  const hasDeferredRef = useRef(false);
  useEffect(() => {
    if (missingTabIds.length === 0) { setMissingTabItemsData([]); return; }
    // Wait until primary items have finished loading
    if (state.isLoading) return;
    
    const doFetch = () => {
      apiQuery({ table: 'items', select: '*, item_tags(tag_id)', filters: { user_id: userId, 'id__in': missingTabIds } }).then(({ data }) => {
        setMissingTabItemsData(data || []);
      });
    };

    // On first load, defer to browser idle time so we don't compete with initial render.
    // On subsequent tab changes (e.g. opening a new tab mid-session), fetch immediately.
    if (!hasDeferredRef.current) {
      hasDeferredRef.current = true;
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => doFetch(), { timeout: 3000 });
      } else {
        setTimeout(doFetch, 500);
      }
    } else {
      doFetch();
    }
  }, [missingTabIds.join(','), state.isLoading]);
  const missingTabItemsQuery = { data: missingTabItemsData };

  // Build a map of fetched tab items for quick lookup
  const fetchedTabItems = useMemo(() => {
    const map = new Map<string, Item>();
    if (missingTabItemsQuery.data) {
      for (const serverItem of missingTabItemsQuery.data) {
        // Convert server item to client Item format
        const baseItem = {
          id: serverItem.id,
          title: serverItem.title || '',
          content: serverItem.content || '',
          tags: serverItem.item_tags?.map((it: any) => it.tag_id) || serverItem.tags || [],
          isPinned: serverItem.is_pinned || serverItem.isPinned || false,
          createdAt: (serverItem.created_at || serverItem.createdAt) ? new Date(serverItem.created_at || serverItem.createdAt).toISOString() : new Date().toISOString(),
          updatedAt: (serverItem.updated_at || serverItem.updatedAt) ? new Date(serverItem.updated_at || serverItem.updatedAt).toISOString() : new Date().toISOString(),
          order: serverItem.sort_order || serverItem.order || 0,
          deletedAt: (serverItem.deleted_at || serverItem.deletedAt) ? new Date(serverItem.deleted_at || serverItem.deletedAt).toISOString() : undefined,
          listId: serverItem.list_id || serverItem.listId || undefined,
        };
        if (serverItem.type === 'task') {
          map.set(serverItem.id, { ...baseItem, type: 'task', isCompleted: serverItem.is_completed || serverItem.isCompleted || false, section: serverItem.section || 'now', dueDate: (serverItem.due_date || serverItem.dueDate) ? new Date(serverItem.due_date || serverItem.dueDate).toISOString() : undefined } as Item);
        } else {
          map.set(serverItem.id, { ...baseItem, type: 'note', section: serverItem.section === 'completed' ? 'now' : (serverItem.section || 'now') } as Item);
        }
      }
    }
    return map;
  }, [missingTabItemsQuery.data]);

  // Inject prefetched tab items into state.items so tab switching is instant
  useEffect(() => {
    if (fetchedTabItems.size === 0) return;
    const itemsToInject = Array.from(fetchedTabItems.values());
    dispatch({ type: 'PREFETCH_TAB_ITEMS', payload: itemsToInject });
  }, [fetchedTabItems, dispatch]);

  // Get open tabs from state, resolving from current view items OR fetched tab items
  const openTabs = useMemo(() => {
    if (!state.openTabIds) return [];
    return state.openTabIds
      .map(id => {
        const fromItems = state.items.find(item => item.id === id && !item.deletedAt);
        if (fromItems) return fromItems;
        const fromFetched = fetchedTabItems.get(id);
        if (fromFetched && !fromFetched.deletedAt) return fromFetched;
        return undefined;
      })
      .filter((item): item is Item => item !== undefined);
  }, [state.openTabIds, state.items, fetchedTabItems]);
  
  const selectedItemId = state.selectedItemId;
  
  // Track tab visit history — push selected tab to history stack
  useEffect(() => {
    if (!selectedItemId) return;
    const history = tabHistoryRef.current;
    // Remove if already in history (to move it to the end)
    const idx = history.indexOf(selectedItemId);
    if (idx !== -1) history.splice(idx, 1);
    history.push(selectedItemId);
    // Keep history bounded
    if (history.length > 50) history.shift();
  }, [selectedItemId]);

  // Auto-scroll to selected tab
  useEffect(() => {
    if (!selectedItemId || !tabsContainerRef.current) return;
    
    const selectedTab = tabsContainerRef.current.querySelector(`[data-tab-id="${selectedItemId}"]`);
    if (selectedTab) {
      selectedTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [selectedItemId]);
  
  const navigateToPreviousTab = useCallback(() => {
    if (openTabs.length === 0) return;
    
    const currentIndex = openTabs.findIndex(tab => tab.id === selectedItemId);
    if (currentIndex === -1) {
      // No tab selected, select the last one
      onSelectItem(openTabs[openTabs.length - 1].id);
    } else if (currentIndex > 0) {
      // Select previous tab
      onSelectItem(openTabs[currentIndex - 1].id);
    } else {
      // Wrap around to last tab
      onSelectItem(openTabs[openTabs.length - 1].id);
    }
  }, [openTabs, selectedItemId, onSelectItem]);
  
  const navigateToNextTab = useCallback(() => {
    if (openTabs.length === 0) return;
    
    const currentIndex = openTabs.findIndex(tab => tab.id === selectedItemId);
    if (currentIndex === -1) {
      // No tab selected, select the first one
      onSelectItem(openTabs[0].id);
    } else if (currentIndex < openTabs.length - 1) {
      // Select next tab
      onSelectItem(openTabs[currentIndex + 1].id);
    } else {
      // Wrap around to first tab
      onSelectItem(openTabs[0].id);
    }
  }, [openTabs, selectedItemId, onSelectItem]);
  
  // Find the most recent tab from history that is still open (excluding the closing tab)
  const findPreviousTab = useCallback((closingTabId: string): string | null => {
    const history = tabHistoryRef.current;
    const openTabIdSet = new Set((state.openTabIds || []).filter(id => id !== closingTabId));
    // Walk history backwards to find the most recently visited tab that's still open
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i] !== closingTabId && openTabIdSet.has(history[i])) {
        return history[i];
      }
    }
    return null;
  }, [state.openTabIds]);

  const handleCloseTab = useCallback((e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    // Push to closed tab stack before removing
    closedTabStackRef.current.push(tabId);
    if (closedTabStackRef.current.length > 30) closedTabStackRef.current.shift();
    
    dispatch({ type: 'CLOSE_TAB', payload: tabId });
    
    // Remove from history
    const history = tabHistoryRef.current;
    const idx = history.indexOf(tabId);
    if (idx !== -1) history.splice(idx, 1);
    
    // If closing the selected tab, navigate to the previously active tab
    if (tabId === selectedItemId) {
      const prevTab = findPreviousTab(tabId);
      if (prevTab) {
        onSelectItem(prevTab);
      } else if (openTabs.length > 1) {
        // Fallback: select adjacent tab
        const currentIndex = openTabs.findIndex(tab => tab.id === tabId);
        const newIndex = currentIndex < openTabs.length - 1 ? currentIndex + 1 : currentIndex - 1;
        onSelectItem(openTabs[newIndex].id);
      } else {
        dispatch({ type: 'SELECT_ITEM', payload: null });
      }
    }
  }, [dispatch, selectedItemId, openTabs, onSelectItem, findPreviousTab]);
  
  // Close a single tab (for context menu and keyboard shortcut)
  const handleCloseTabById = useCallback((tabId: string) => {
    // Push to closed tab stack before removing
    closedTabStackRef.current.push(tabId);
    if (closedTabStackRef.current.length > 30) closedTabStackRef.current.shift();
    
    dispatch({ type: 'CLOSE_TAB', payload: tabId });
    
    // Remove from history
    const history = tabHistoryRef.current;
    const idx = history.indexOf(tabId);
    if (idx !== -1) history.splice(idx, 1);
    
    // If closing the selected tab, navigate to the previously active tab
    if (tabId === selectedItemId) {
      const prevTab = findPreviousTab(tabId);
      if (prevTab) {
        onSelectItem(prevTab);
      } else if (openTabs.length > 1) {
        const currentIndex = openTabs.findIndex(tab => tab.id === tabId);
        const newIndex = currentIndex < openTabs.length - 1 ? currentIndex + 1 : currentIndex - 1;
        onSelectItem(openTabs[newIndex].id);
      } else {
        dispatch({ type: 'SELECT_ITEM', payload: null });
      }
    }
  }, [dispatch, selectedItemId, openTabs, onSelectItem, findPreviousTab]);

  // Reopen the most recently closed tab
  const reopenLastClosedTab = useCallback(() => {
    const stack = closedTabStackRef.current;
    if (stack.length === 0) return;
    // Pop the most recently closed tab ID
    const tabId = stack.pop()!;
    // Skip if already open
    if (state.openTabIds.includes(tabId)) {
      // Try the next one
      reopenLastClosedTab();
      return;
    }
    dispatch({ type: 'OPEN_TAB', payload: tabId });
    onSelectItem(tabId);
  }, [state.openTabIds, dispatch, onSelectItem]);

  // Keyboard shortcuts for tab navigation and close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+Shift+[ - Previous tab
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === '[') {
        e.preventDefault();
        navigateToPreviousTab();
      }
      // Cmd+Shift+] - Next tab
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === ']') {
        e.preventDefault();
        navigateToNextTab();
      }
      // Cmd+W - Close active tab
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === 'w') {
        if (selectedItemId) {
          e.preventDefault();
          handleCloseTabById(selectedItemId);
        }
      }
      // Cmd+Shift+T - Reopen last closed tab
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 't' || e.key === 'T')) {
        e.preventDefault();
        reopenLastClosedTab();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openTabs, selectedItemId, handleCloseTabById, navigateToPreviousTab, navigateToNextTab, reopenLastClosedTab]);
  
  // Close all other tabs except the specified one
  const handleCloseOtherTabs = useCallback((keepTabId: string) => {
    const tabIdsToClose = openTabs
      .filter(tab => tab.id !== keepTabId)
      .map(tab => tab.id);
    
    tabIdsToClose.forEach(tabId => {
      dispatch({ type: 'CLOSE_TAB', payload: tabId });
    });
    
    // Select the kept tab if it's not already selected
    if (selectedItemId !== keepTabId) {
      onSelectItem(keepTabId);
    }
  }, [dispatch, openTabs, selectedItemId, onSelectItem]);
  
  // Close all tabs
  const handleCloseAllTabs = useCallback(() => {
    dispatch({ type: 'REORDER_TABS', payload: [] });
    dispatch({ type: 'SELECT_ITEM', payload: null });
  }, [dispatch]);
  
  // Drag and drop handlers
  const handleDragStart = useCallback((e: React.DragEvent, tabId: string) => {
    setDraggedTabId(tabId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', tabId);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent, tabId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (tabId !== draggedTabId) {
      setDragOverTabId(tabId);
    }
  }, [draggedTabId]);
  
  const handleDragLeave = useCallback(() => {
    setDragOverTabId(null);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent, targetTabId: string) => {
    e.preventDefault();
    
    if (!draggedTabId || draggedTabId === targetTabId) {
      setDraggedTabId(null);
      setDragOverTabId(null);
      return;
    }
    
    // Reorder tabs
    const currentTabIds = state.openTabIds || [];
    const draggedIndex = currentTabIds.indexOf(draggedTabId);
    const targetIndex = currentTabIds.indexOf(targetTabId);
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      const newTabIds = [...currentTabIds];
      newTabIds.splice(draggedIndex, 1);
      newTabIds.splice(targetIndex, 0, draggedTabId);
      dispatch({ type: 'REORDER_TABS', payload: newTabIds });
    }
    
    setDraggedTabId(null);
    setDragOverTabId(null);
  }, [draggedTabId, state.openTabIds, dispatch]);
  
  const handleDragEnd = useCallback(() => {
    setDraggedTabId(null);
    setDragOverTabId(null);
  }, []);
  
  // Don't render if no tabs are open
  if (openTabs.length === 0) {
    return null;
  }
  
  return (
    <div className="border-b border-border/50 bg-[#F9FAFB] dark:bg-zinc-900 shrink-0">
      {/* Scrollable tabs container with hidden scrollbar */}
      <div
        ref={tabsContainerRef}
        className="flex overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {openTabs.map((tab) => {
          const isSelected = tab.id === selectedItemId;
          const isDragging = tab.id === draggedTabId;
          const isDragOver = tab.id === dragOverTabId;
          
          return (
            <ContextMenu key={tab.id}>
              <ContextMenuTrigger asChild>
                <div
                  data-tab-id={tab.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, tab.id)}
                  onDragOver={(e) => handleDragOver(e, tab.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, tab.id)}
                  onDragEnd={handleDragEnd}
                  onClick={() => onSelectItem(tab.id)}
                  className={cn(
                    "group relative flex items-center gap-1.5 pl-3 pr-1.5 py-2 min-w-[120px] max-w-[200px] cursor-grab active:cursor-grabbing border-r border-border/30 transition-all shrink-0",
                    isSelected 
                      ? "bg-background" 
                      : "hover:bg-muted/50",
                    isDragging && "opacity-50",
                    isDragOver && "bg-primary/10 border-l-2 border-l-primary"
                  )}
                  style={isSelected ? { boxShadow: 'inset 0 -2px 0 0 var(--color-primary)' } : undefined}
                >
                  {/* Item type icon */}
                  {tab.type === 'task' ? (
                    <ListTodo className="w-3.5 h-3.5 text-foreground shrink-0" />
                  ) : (
                    <FileText className="w-3.5 h-3.5 text-foreground shrink-0" />
                  )}
                  
                  {/* Tab title */}
                  <span className={cn(
                    "text-xs truncate flex-1",
                    isSelected ? "text-foreground font-medium" : "text-muted-foreground"
                  )}>
                    {tab.title ? linkifyTitle(tab.title).plainText || 'Untitled' : 'Untitled'}
                  </span>
                  
                  {/* Close button */}
                  <button
                    onClick={(e) => handleCloseTab(e, tab.id)}
                    className="ml-auto w-4 h-4 rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-muted transition-opacity shrink-0"
                    title="Close tab"
                  >
                    <X className="w-3 h-3 text-muted-foreground" />
                  </button>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-48">
                <ContextMenuItem onClick={() => handleCloseTabById(tab.id)}>
                  Close
                </ContextMenuItem>
                <ContextMenuItem 
                  onClick={() => handleCloseOtherTabs(tab.id)}
                  disabled={openTabs.length <= 1}
                >
                  Close Others
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem 
                  onClick={handleCloseAllTabs}
                  className="text-destructive focus:text-destructive"
                >
                  Close All
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
      </div>
      
      {/* CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
