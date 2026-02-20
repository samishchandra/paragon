/**
 * Left Sidebar Component - Clean Minimalist Design
 * Shows tags with counts, TODO items, pinned items, and completed tasks
 * Features: Clean lines, subtle borders, compact information density
 * Mobile responsive - full width on mobile
 */

import { useState, useEffect, DragEvent, useMemo, memo, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useMomentum } from "@/contexts/ServerMomentumContext";
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { UserAvatar } from '@/components/UserAvatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreateTagModal } from '@/components/CreateTagModal';
import { EditTagDialog } from '@/components/EditTagDialog';
import {
  Hash,
  Pin,
  CheckCircle2,
  CheckSquare,
  ListTodo,
  FileText,
  ChevronLeft,
  Plus,
  Sparkles,
  RefreshCw,
  Settings,
  Clock,
  ChevronRight,
  LayoutGrid,
  Search,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import { TagIcon } from '@/components/icons/TagIcon';
import { ListIcon } from '@/components/icons/ListIcon';
import { cn } from '@/lib/utils';
import { linkifyTitle, getTitlePlainText, extractFirstLineLink, renderFirstLineLink } from '@/lib/linkifyTitle';
import { useLocation } from 'wouter';
import { FilterType, Item, Tag, List } from '@/types';
import { EditListDialog } from '@/components/EditListDialog';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/lib/toast';
import {
  SIDEBAR_NAV_SELECTED,
  SIDEBAR_NAV_DEFAULT,
  SIDEBAR_NAV_DEFAULT_SUBTLE,
  sidebarNavState,
  SIDEBAR_DRAG_OVER,
  SIDEBAR_ICON_BUTTON,
  SIDEBAR_HEADER_BUTTON,
  SIDEBAR_FILTER_ACTIVE,
} from '@/lib/styles';

/** Read a sidebar section's expanded/collapsed state from localStorage */
function getStoredCollapseState(key: string, defaultValue: boolean): boolean {
  try {
    const stored = localStorage.getItem(`momentum-sidebar-${key}`);
    return stored !== null ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

interface LeftSidebarProps {
  onNavigate?: () => void; // Callback for mobile navigation
  onOpenSettings?: () => void; // Callback to open settings dialog
  onToggleCommandPalette?: () => void; // Callback to open command palette
}

export function LeftSidebar({ onNavigate, onOpenSettings, onToggleCommandPalette }: LeftSidebarProps) {
  const {
    state,
    dispatch,
    getTagCounts,
    getTodoCounts,
    getPinnedItems,
    getRecentItems,
    getTrashItems,
    selectItem,
    fetchAndSelectItem,
    createTask,
    createNote,
    addTag,
    updateItem,
    getListCounts,
    reorderLists,
    sidebarCounts,
    tasksEnabled,
    sidebarTagCounts,
    sidebarListCounts,
    refreshData,
  } = useMomentum();

  const [createTagOpen, setCreateTagOpen] = useState(false);
  const [dragOverTagId, setDragOverTagId] = useState<string | null>(null);
  const [dragOverListId, setDragOverListId] = useState<string | null>(null);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [editingList, setEditingList] = useState<List | null>(null);
  const [createListOpen, setCreateListOpen] = useState(false);

  // Handle drag over tag
  const handleDragOver = (e: DragEvent<HTMLButtonElement>, tagId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverTagId(tagId);
  };

  // Handle drag leave tag
  const handleDragLeave = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverTagId(null);
  };

  // Handle drop on tag
  const handleDropOnTag = (e: DragEvent<HTMLButtonElement>, tagId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverTagId(null);

    try {
      const data = e.dataTransfer.getData('application/json');
      if (data) {
        const { itemId } = JSON.parse(data);
        const item = state.items.find(i => i.id === itemId);
        if (item) {
          // Add tag to item if not already present
          if (!item.tags.includes(tagId)) {
            updateItem({
              ...item,
              tags: [...item.tags, tagId],
              updatedAt: new Date().toISOString(),
            });
          }
        }
      }
    } catch (err) {
      console.error('Failed to parse drag data:', err);
    }
  };

  // Handle drag over list (for item drop)
  const handleListDragOver = (e: DragEvent<HTMLDivElement>, listId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverListId(listId);
  };

  // Handle drag leave list
  const handleListDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverListId(null);
  };

  // Handle drop on list — move item to this list
  const handleDropOnList = (e: DragEvent<HTMLDivElement>, listId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverListId(null);

    try {
      const data = e.dataTransfer.getData('application/json');
      if (data) {
        const { itemId } = JSON.parse(data);
        const item = state.items.find(i => i.id === itemId);
        if (item) {
          const targetList = state.lists.find(l => l.id === listId);
          const previousListId = item.listId;
          // Skip if already in this list
          if (previousListId === listId) return;
          const previousList = previousListId ? state.lists.find(l => l.id === previousListId) : null;
          updateItem({
            ...item,
            listId: listId,
            updatedAt: new Date().toISOString(),
          });
          const fromLabel = previousList ? `"${previousList.name}"` : 'no list';
          toast.success(`Moved to "${targetList?.name || 'list'}"`, {
            description: `From ${fromLabel}`,
            action: {
              label: 'Undo',
              onClick: () => {
                updateItem({
                  ...item,
                  listId: previousListId || undefined,
                  updatedAt: new Date().toISOString(),
                });
                toast.success('Move undone');
              },
            },
          });
        }
      }
    } catch (err) {
      console.error('Failed to parse drag data:', err);
    }
  };

  const { theme } = useTheme();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = useCallback(async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    try {
      refreshData();
      toast.success('Synced successfully');
    } catch (err) {
      toast.error('Failed to sync');
    } finally {
      setTimeout(() => setIsSyncing(false), 1000);
    }
  }, [isSyncing, refreshData]);
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const tagCounts = getTagCounts();
  const todoCounts = getTodoCounts();
  const pinnedItems = getPinnedItems();
  const recentItems = getRecentItems();
  const trashItems = getTrashItems();
  
  
  const [recentExpanded, setRecentExpanded] = useState(() => getStoredCollapseState('recent', false));
  const [pinnedExpanded, setPinnedExpanded] = useState(() => getStoredCollapseState('pinned', true));
  const [listsExpanded, setListsExpanded] = useState(() => getStoredCollapseState('lists', true));
  const [tagsExpanded, setTagsExpanded] = useState(() => getStoredCollapseState('tags', true));
  
  // Persist collapse states to localStorage
  useEffect(() => {
    localStorage.setItem('momentum-sidebar-recent', JSON.stringify(recentExpanded));
  }, [recentExpanded]);
  
  useEffect(() => {
    localStorage.setItem('momentum-sidebar-pinned', JSON.stringify(pinnedExpanded));
  }, [pinnedExpanded]);
  
  useEffect(() => {
    localStorage.setItem('momentum-sidebar-tags', JSON.stringify(tagsExpanded));
  }, [tagsExpanded]);
  
  useEffect(() => {
    localStorage.setItem('momentum-sidebar-lists', JSON.stringify(listsExpanded));
  }, [listsExpanded]);

  // Drag-and-drop for list reordering
  const [activeListId, setActiveListId] = useState<string | null>(null);
  
  const listSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Sort lists by order
  const sortedLists = useMemo(() => {
    return [...state.lists].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [state.lists]);

  const listIds = useMemo(() => sortedLists.map((list) => list.id), [sortedLists]);

  const handleListDragStart = (event: DragStartEvent) => {
    setActiveListId(event.active.id as string);
  };

  const handleListDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveListId(null);

    if (over && active.id !== over.id) {
      const oldIndex = sortedLists.findIndex((list) => list.id === active.id);
      const newIndex = sortedLists.findIndex((list) => list.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newLists = arrayMove(sortedLists, oldIndex, newIndex).map((list, index) => ({
          ...list,
          order: index,
        }));
        reorderLists(newLists);
        toast.success('List order updated');
      }
    }
  };

  const activeList = activeListId ? sortedLists.find((list) => list.id === activeListId) : null;

  const setFilter = (filter: FilterType) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
    onNavigate?.();
  };

  const handleSelectItem = (id: string) => {
    // Check if item exists in local state; if not, fetch on-demand from Supabase
    const existsLocally = state.items.some((i) => i.id === id);
    if (existsLocally) {
      selectItem(id);
    } else {
      fetchAndSelectItem(id);
    }
    onNavigate?.();
  };

  const isActiveFilter = (filter: FilterType) => {
    if (filter.type === 'tag' && state.activeFilter.type === 'tag') {
      return filter.tagId === (state.activeFilter as { type: 'tag'; tagId: string }).tagId;
    }
    if (filter.type === 'list' && state.activeFilter.type === 'list') {
      return filter.listId === (state.activeFilter as { type: 'list'; listId: string }).listId;
    }
    return filter.type === state.activeFilter.type;
  };

  const listCounts = getListCounts();

  // Mobile-friendly full width sidebar
  const sidebarContent = (
    <div className="h-full bg-sidebar flex flex-col overflow-hidden">
      {/* Header - hidden on mobile as we have the mobile header */}
      <div className="p-4 border-b border-sidebar-border/50 items-center justify-between hidden md:flex">
        <button
          className="flex items-center gap-2 h-8 hover:opacity-80 transition-opacity cursor-pointer"
          onClick={() => setFilter({ type: 'all' })}
          title="Go to All Items"
        >
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/NZmQsfhbCmKNvHui.png" alt="Momentum" className="w-7 h-7" />
          <span className="font-medium text-sidebar-foreground leading-7">Momentum</span>
        </button>
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => onToggleCommandPalette?.()}
            title="Search (⌘E)"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => dispatch({ type: 'TOGGLE_LEFT_PANEL' })}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 custom-scrollbar">
        <div className="p-3 space-y-4">
          {/* Views Section - No header, items aligned with chevrons */}
          <div>
            <nav>
              <SidebarItem
                icon={<Sparkles className="w-4 h-4" />}
                label="All Items"
                count={sidebarCounts?.all ?? state.items.filter((i) => !i.deletedAt).length}
                isActive={isActiveFilter({ type: 'all' })}
                onClick={() => setFilter({ type: 'all' })}
                accentColor="text-emerald-500"
              />
              {tasksEnabled && (sidebarCounts?.tasks ?? todoCounts.total) > 0 && (
                <SidebarItem
                  icon={<ListTodo className="w-4 h-4" />}
                  label="Tasks"
                  count={sidebarCounts?.tasks ?? todoCounts.total}
                  isActive={isActiveFilter({ type: 'tasks' })}
                  onClick={() => setFilter({ type: 'tasks' })}
                  accentColor="text-blue-500"
                />
              )}
              {tasksEnabled && (
                <SidebarItem
                  icon={<FileText className="w-4 h-4" />}
                  label="Notes"
                  count={sidebarCounts?.notes ?? state.items.filter((i) => i.type === 'note' && !i.deletedAt).length}
                  isActive={isActiveFilter({ type: 'notes' })}
                  onClick={() => setFilter({ type: 'notes' })}
                  accentColor="text-orange-400"
                />
              )}
              {(sidebarCounts?.todo ?? 0) > 0 && (
                <SidebarItem
                  icon={<CheckSquare className="w-4 h-4" />}
                  label="Todo"
                  count={sidebarCounts?.todo ?? 0}
                  isActive={isActiveFilter({ type: 'todo' })}
                  onClick={() => setFilter({ type: 'todo' })}
                  accentColor="text-amber-400"
                />
              )}
              <SidebarItem
                icon={<LayoutGrid className="w-4 h-4" />}
                label="Miscellaneous"
                count={sidebarCounts?.miscellaneous ?? state.items.filter((i) => !i.listId && !i.deletedAt).length}
                isActive={isActiveFilter({ type: 'miscellaneous' })}
                onClick={() => setFilter({ type: 'miscellaneous' })}
                accentColor="text-violet-400"
              />
              {tasksEnabled && (sidebarCounts?.completed ?? todoCounts.completed) > 0 && (
                <SidebarItem
                  icon={<CheckCircle2 className="w-4 h-4" />}
                  label="Completed"
                  count={sidebarCounts?.completed ?? todoCounts.completed}
                  isActive={isActiveFilter({ type: 'completed' })}
                  onClick={() => setFilter({ type: 'completed' })}
                  accentColor="text-emerald-400"
                />
              )}
              <SidebarItem
                icon={<Trash2 className="w-4 h-4" />}
                label="Deleted"
                count={sidebarCounts?.trash ?? trashItems.length}
                isActive={isActiveFilter({ type: 'trash' })}
                onClick={() => setFilter({ type: 'trash' })}
                accentColor="text-red-400"
              />
            </nav>
          </div>

          {/* Pinned Section - Above Recent */}
          {pinnedItems.length > 0 && (
            <div>
              <button
                onClick={() => setPinnedExpanded(!pinnedExpanded)}
                className={`w-full text-left text-sm font-medium uppercase tracking-wider px-2 h-11 md:h-9 flex items-center gap-2 transition-colors group rounded-md ${
                  state.activeFilter.type === 'pinned'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Pin className="w-4 h-4" />
                <span className="text-left">Pinned</span>
                <motion.div
                  animate={{ rotate: pinnedExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className={cn(
                    "w-4 h-4 flex items-center justify-center shrink-0 transition-opacity duration-200",
                    pinnedExpanded ? "opacity-0 group-hover:opacity-60" : "opacity-100"
                  )}
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </motion.div>
                <span className="flex-1" />
                <span className="text-[10px] font-normal normal-case tracking-normal text-muted-foreground/70">{pinnedItems.length}</span>
              </button>
              <AnimatePresence>
                {pinnedExpanded && (
                  <motion.nav
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="space-y-1 overflow-hidden"
                  >
                    {pinnedItems.slice(0, 10).map((item) => (
                      <PinnedItem
                        key={item.id}
                        item={item}
                        onClick={() => handleSelectItem(item.id)}
                        isSelected={state.selectedItemId === item.id}
                      />
                    ))}
                    {pinnedItems.length > 10 && (
                      <button
                        className="w-full text-left pl-8 pr-2 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setFilter({ type: 'pinned' })}
                      >
                        +{pinnedItems.length - 10} more items
                      </button>
                    )}
                  </motion.nav>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Recent Items Section */}
          {recentItems.length > 0 && (
            <div>
              <button
                onClick={() => setRecentExpanded(!recentExpanded)}
                className="w-full text-sm font-medium text-muted-foreground uppercase tracking-wider px-2 h-11 md:h-9 flex items-center gap-2 hover:text-foreground transition-colors group rounded-md"
              >
                <Clock className="w-4 h-4" />
                <span className="text-left">Recent</span>
                <motion.div
                  animate={{ rotate: recentExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className={cn(
                    "w-4 h-4 flex items-center justify-center shrink-0 transition-opacity duration-200",
                    recentExpanded ? "opacity-0 group-hover:opacity-60" : "opacity-100"
                  )}
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </motion.div>
                <span className="flex-1" />
              </button>
              <AnimatePresence>
                {recentExpanded && (
                  <motion.nav
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="space-y-1 overflow-hidden"
                  >
                    {recentItems.slice(0, 5).map((item) => (
                      <PinnedItem
                        key={item.id}
                        item={item}
                        onClick={() => handleSelectItem(item.id)}
                        isSelected={state.selectedItemId === item.id}
                      />
                    ))}
                  </motion.nav>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Lists Section */}
          <div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setListsExpanded(!listsExpanded)}
              onKeyDown={(e) => e.key === 'Enter' && setListsExpanded(!listsExpanded)}
              className="w-full text-sm font-medium text-muted-foreground uppercase tracking-wider px-2 h-11 md:h-9 flex items-center gap-2 hover:text-foreground transition-colors group rounded-md cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-left">Lists</span>
              <motion.div
                animate={{ rotate: listsExpanded ? 90 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={cn(
                  "w-4 h-4 flex items-center justify-center shrink-0 transition-opacity duration-200",
                  listsExpanded ? "opacity-0 group-hover:opacity-60" : "opacity-100"
                )}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.div>
              <span className="flex-1" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCreateListOpen(true);
                }}
                className={SIDEBAR_HEADER_BUTTON}
                title="Create new list"
              >
                <Plus className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-normal normal-case tracking-normal text-muted-foreground/50 min-w-[16px] text-right">{state.lists.length}</span>
            </div>
            <AnimatePresence>
              {listsExpanded && (
                <motion.nav
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  {sortedLists.length === 0 ? (
                    <div className="pl-8 pr-2 py-2 text-xs text-muted-foreground/70 italic">
                      No lists yet
                    </div>
                  ) : (
                    <DndContext
                      sensors={listSensors}
                      collisionDetection={closestCenter}
                      onDragStart={handleListDragStart}
                      onDragEnd={handleListDragEnd}
                    >
                      <SortableContext items={listIds} strategy={verticalListSortingStrategy}>
                        {sortedLists.map((list) => (
                          <SortableListItem
                            key={list.id}
                            list={list}
                            count={sidebarListCounts ? (sidebarListCounts[list.id] || 0) : (listCounts.get(list.id) || 0)}
                            isActive={isActiveFilter({ type: 'list', listId: list.id })}
                            onClick={() => setFilter({ type: 'list', listId: list.id })}
                            onEdit={() => setEditingList(list)}
                            isDragOver={dragOverListId === list.id}
                            onItemDragOver={(e) => handleListDragOver(e, list.id)}
                            onItemDragLeave={handleListDragLeave}
                            onItemDrop={(e) => handleDropOnList(e, list.id)}
                          />
                        ))}
                      </SortableContext>
                      <DragOverlay>
                        {activeList && (
                          <div className="opacity-90 shadow-lg rounded-md">
                            <SidebarListItem
                              icon={<ListIcon name={activeList.icon} color={activeList.color} className="w-4 h-4" />}
                              label={activeList.name}
                              count={sidebarListCounts ? (sidebarListCounts[activeList.id] || 0) : (listCounts.get(activeList.id) || 0)}
                              isActive={false}
                              onClick={() => {}}
                              accentColor={activeList.color}
                              labelColor={activeList.color}
                            />
                          </div>
                        )}
                      </DragOverlay>
                    </DndContext>
                  )}
                </motion.nav>
              )}
            </AnimatePresence>
          </div>

          {/* Tags Section */}
          <div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setTagsExpanded(!tagsExpanded)}
              onKeyDown={(e) => e.key === 'Enter' && setTagsExpanded(!tagsExpanded)}
              className="w-full text-sm font-medium text-muted-foreground uppercase tracking-wider px-2 h-11 md:h-9 flex items-center gap-2 hover:text-foreground transition-colors group rounded-md cursor-pointer"
            >
              <TagIcon className="w-4 h-4" />
              <span className="text-left">Tags</span>
              <motion.div
                animate={{ rotate: tagsExpanded ? 90 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={cn(
                  "w-4 h-4 flex items-center justify-center shrink-0 transition-opacity duration-200",
                  tagsExpanded ? "opacity-0 group-hover:opacity-60" : "opacity-100"
                )}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.div>
              <span className="flex-1" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCreateTagOpen(true);
                }}
                className={SIDEBAR_HEADER_BUTTON}
                title="Create new tag"
              >
                <Plus className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-normal normal-case tracking-normal text-muted-foreground/50 min-w-[16px] text-right">{state.tags.length}</span>
            </div>
            <AnimatePresence>
              {tagsExpanded && (
                <motion.nav
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  {state.tags.map((tag) => (
                    <SidebarTagItem
                      key={tag.id}
                      icon={<TagIcon className="w-4 h-4" color={tag.color} />}
                      label={tag.name}
                      count={sidebarTagCounts ? (sidebarTagCounts[tag.id] || 0) : (tagCounts.get(tag.id) || 0)}
                      isActive={isActiveFilter({ type: 'tag', tagId: tag.id })}
                      onClick={() => setFilter({ type: 'tag', tagId: tag.id })}
                      accentColor={tag.color}
                      labelColor={tag.color}
                      isDragOver={dragOverTagId === tag.id}
                      onDragOver={(e) => handleDragOver(e, tag.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDropOnTag(e, tag.id)}
                      onEdit={() => setEditingTag(tag)}
                    />
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ScrollArea>
      
      {/* Footer with User Profile, Theme Toggle, and Settings */}
      <div className="p-3 border-t border-sidebar-border/50 sidebar-footer-mobile">
        <div className="flex items-center gap-2">
          <UserAvatar size={28} className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.dispatchEvent(new CustomEvent('open-settings', { detail: { section: 'account' } }))} />
          <div className="flex-1 min-w-0 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.dispatchEvent(new CustomEvent('open-settings', { detail: { section: 'account' } }))} title="Account settings">
            <p className="text-xs font-medium text-foreground truncate leading-tight">
              {user?.name || user?.email?.split('@')[0] || 'User'}
            </p>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={handleSync}
              disabled={isSyncing}
              title="Sync data"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", isSyncing && "animate-spin")} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => onOpenSettings ? onOpenSettings() : setLocation('/settings')}
              title="Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop view - width controlled by parent */}
      <div className="hidden md:block h-full w-full">
        {!state.leftPanelCollapsed ? (
          <aside className="h-full w-full overflow-hidden">
            {sidebarContent}
          </aside>
        ) : (
          <aside className="h-full w-full bg-sidebar flex flex-col items-center py-3 gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => dispatch({ type: 'TOGGLE_LEFT_PANEL' })}
            >
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663318957742/NZmQsfhbCmKNvHui.png" alt="Momentum" className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => onToggleCommandPalette?.()}
              title="Search (⌘E)"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Separator */}
            <div className="w-6 border-t border-sidebar-border/50 my-1" />

            {/* Navigation view icons */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                isActiveFilter({ type: 'all' })
                  ? "text-emerald-500 bg-emerald-500/10"
                  : "text-emerald-500/60 hover:text-emerald-500"
              )}
              onClick={() => setFilter({ type: 'all' })}
              title="All Items"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
            {tasksEnabled && (sidebarCounts?.tasks ?? todoCounts.total) > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8",
                  isActiveFilter({ type: 'tasks' })
                    ? "text-blue-500 bg-blue-500/10"
                    : "text-blue-500/60 hover:text-blue-500"
                )}
                onClick={() => setFilter({ type: 'tasks' })}
                title="Tasks"
              >
                <ListTodo className="h-4 w-4" />
              </Button>
            )}
            {tasksEnabled && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8",
                  isActiveFilter({ type: 'notes' })
                    ? "text-orange-400 bg-orange-400/10"
                    : "text-orange-400/60 hover:text-orange-400"
                )}
                onClick={() => setFilter({ type: 'notes' })}
                title="Notes"
              >
                <FileText className="h-4 w-4" />
              </Button>
            )}
            {(sidebarCounts?.todo ?? 0) > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8",
                  isActiveFilter({ type: 'todo' })
                    ? "text-amber-400 bg-amber-400/10"
                    : "text-amber-400/60 hover:text-amber-400"
                )}
                onClick={() => setFilter({ type: 'todo' })}
                title="Todo"
              >
                <CheckSquare className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                isActiveFilter({ type: 'miscellaneous' })
                  ? "text-violet-400 bg-violet-400/10"
                  : "text-violet-400/60 hover:text-violet-400"
              )}
              onClick={() => setFilter({ type: 'miscellaneous' })}
              title="Miscellaneous"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            {tasksEnabled && (sidebarCounts?.completed ?? todoCounts.completed) > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8",
                  isActiveFilter({ type: 'completed' })
                    ? "text-emerald-400 bg-emerald-400/10"
                    : "text-emerald-400/60 hover:text-emerald-400"
                )}
                onClick={() => setFilter({ type: 'completed' })}
                title="Completed"
              >
                <CheckCircle2 className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                isActiveFilter({ type: 'trash' })
                  ? "text-red-400 bg-red-400/10"
                  : "text-red-400/60 hover:text-red-400"
              )}
              onClick={() => setFilter({ type: 'trash' })}
              title="Deleted"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="flex-1" />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={handleSync}
              disabled={isSyncing}
              title="Sync data"
            >
              <RefreshCw className={cn("h-4 w-4", isSyncing && "animate-spin")} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => onOpenSettings ? onOpenSettings() : setLocation('/settings')}
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </aside>
        )}
      </div>

      {/* Mobile view - full width */}
      <div className="md:hidden h-full w-full">
        {sidebarContent}
      </div>

      {/* Create Tag Modal */}
      <CreateTagModal
        open={createTagOpen}
        onOpenChange={setCreateTagOpen}
        onCreateTag={addTag}
      />

      {/* Edit Tag Dialog */}
      <EditTagDialog
        tag={editingTag}
        open={editingTag !== null}
        onOpenChange={(open) => !open && setEditingTag(null)}
      />

      {/* Create List Dialog */}
      <EditListDialog
        list={null}
        open={createListOpen}
        onOpenChange={setCreateListOpen}
      />

      {/* Edit List Dialog */}
      <EditListDialog
        list={editingList}
        open={editingList !== null}
        onOpenChange={(open) => !open && setEditingList(null)}
      />
    </>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  accentColor?: string;
  labelColor?: string;
}

const SidebarItem = memo(function SidebarItem({ icon, label, count, isActive, onClick, accentColor, labelColor }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2 pl-2 pr-2 h-11 md:h-9 rounded-md text-sm transition-all duration-150',
        sidebarNavState(isActive)
      )}
    >
      <span className={cn(accentColor || 'text-muted-foreground')}>{icon}</span>
      <span 
        className="flex-1 text-left truncate"
        style={labelColor ? { color: labelColor } : undefined}
      >
        {label}
      </span>
      {count > 0 && (
        <span
          className={cn(
            'text-[10px] font-mono',
            isActive ? 'text-primary/70' : 'text-muted-foreground/50'
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
});

// Tag item with drag-and-drop support and 3-dot menu
interface SidebarTagItemProps extends SidebarItemProps {
  isDragOver: boolean;
  onDragOver: (e: DragEvent<HTMLButtonElement>) => void;
  onDragLeave: (e: DragEvent<HTMLButtonElement>) => void;
  onDrop: (e: DragEvent<HTMLButtonElement>) => void;
  onEdit?: () => void;
}

const SidebarTagItem = memo(function SidebarTagItem({ 
  icon, 
  label, 
  count, 
  isActive, 
  onClick, 
  accentColor, 
  labelColor,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onEdit,
}: SidebarTagItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onClick}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          'w-full flex items-center gap-2 pl-2 pr-2 h-11 md:h-9 rounded-md text-sm transition-all duration-150',
          isDragOver
            ? SIDEBAR_DRAG_OVER
            : sidebarNavState(isActive)
        )}
      >
        <span className={cn(accentColor || 'text-muted-foreground')}>{icon}</span>
        <span 
          className="flex-1 text-left truncate"
          style={labelColor ? { color: labelColor } : undefined}
        >
          {label}
        </span>
        {isDragOver && (
          <span className="text-xs text-primary font-medium">Drop to tag</span>
        )}
        {!isDragOver && (
          <div className="flex items-center h-6">
            {count > 0 && (
              <span
                className={cn(
                  'text-[10px] font-mono transition-all duration-200 min-w-[1.5rem] text-right',
                  isActive ? 'text-primary/70' : 'text-muted-foreground/50',
                  isHovered ? 'mr-1' : 'mr-0'
                )}
              >
                {count}
              </span>
            )}
            <span
              role="button"
              tabIndex={0}
              onClick={handleMenuClick}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleMenuClick(e as any); } }}
              className={cn(
                SIDEBAR_ICON_BUTTON,
                isHovered ? 'opacity-100' : 'opacity-0 w-0'
              )}
              title="Edit tag"
            >
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </span>
          </div>
        )}
      </button>
    </div>
  );
});

// List item with 3-dot menu for editing
interface SidebarListItemProps extends SidebarItemProps {
  onEdit?: () => void;
}

const SidebarListItem = memo(function SidebarListItem({ 
  icon, 
  label, 
  count, 
  isActive, 
  onClick, 
  accentColor, 
  labelColor,
  onEdit,
}: SidebarListItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onClick}
        className={cn(
          'w-full flex items-center gap-2 pl-2 pr-2 h-11 md:h-9 rounded-md text-sm transition-all duration-150',
          sidebarNavState(isActive)
        )}
      >
        <span className={cn(accentColor || 'text-muted-foreground')}>{icon}</span>
        <span 
          className="flex-1 text-left truncate"
          style={labelColor ? { color: labelColor } : undefined}
        >
          {label}
        </span>
        <div className="flex items-center h-6">
          {count > 0 && (
            <span
              className={cn(
                'text-[10px] font-mono transition-all duration-200 min-w-[1.5rem] text-right',
                isActive ? 'text-primary/70' : 'text-muted-foreground/50',
                isHovered ? 'mr-1' : 'mr-0'
              )}
            >
              {count}
            </span>
          )}
          <span
            role="button"
            tabIndex={0}
            onClick={handleMenuClick}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleMenuClick(e as any); } }}
            className={cn(
              SIDEBAR_ICON_BUTTON,
              isHovered ? 'opacity-100' : 'opacity-0 w-0'
            )}
            title="Edit list"
          >
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </span>
        </div>
      </button>
    </div>
  );
});

// Sortable wrapper for list items with item drop support
interface SortableListItemProps {
  list: List;
  count: number;
  isActive: boolean;
  onClick: () => void;
  onEdit: () => void;
  isDragOver?: boolean;
  onItemDragOver?: (e: DragEvent<HTMLDivElement>) => void;
  onItemDragLeave?: (e: DragEvent<HTMLDivElement>) => void;
  onItemDrop?: (e: DragEvent<HTMLDivElement>) => void;
}

const SortableListItem = memo(function SortableListItem({ list, count, isActive, onClick, onEdit, isDragOver, onItemDragOver, onItemDragLeave, onItemDrop }: SortableListItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={onItemDragOver}
      onDragLeave={onItemDragLeave}
      onDrop={onItemDrop}
    >
      <button
        onClick={onClick}
        {...attributes}
        {...listeners}
        className={cn(
          'w-full flex items-center gap-2 pl-2 pr-2 h-11 md:h-9 rounded-md text-sm transition-all duration-150',
          isDragOver
            ? SIDEBAR_DRAG_OVER
            : sidebarNavState(isActive)
        )}
      >
        <ListIcon name={list.icon} color={list.color} className="w-4 h-4" />
        <span 
          className="flex-1 text-left truncate"
          style={{ color: list.color }}
        >
          {list.name}
        </span>
        {isDragOver && (
          <span className="text-xs text-primary font-medium">Drop to move</span>
        )}
        {!isDragOver && (
          <div className="flex items-center h-6">
            {count > 0 && (
              <span
                className={cn(
                  'text-[10px] font-mono transition-all duration-200 min-w-[1.5rem] text-right',
                  isActive ? 'text-primary/70' : 'text-muted-foreground/50',
                  isHovered ? 'mr-1' : 'mr-0'
                )}
              >
                {count}
              </span>
            )}
            <span
              role="button"
              tabIndex={0}
              onClick={handleMenuClick}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleMenuClick(e as any); } }}
              className={cn(
                SIDEBAR_ICON_BUTTON,
                isHovered ? 'opacity-100' : 'opacity-0 w-0'
              )}
              title="Edit list"
            >
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </span>
          </div>
        )}
      </button>
    </div>
  );
});

interface PinnedItemProps {
  item: Item;
  onClick: () => void;
  isSelected: boolean;
}

const PinnedItem = memo(function PinnedItem({ item, onClick, isSelected }: PinnedItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2 pl-2 pr-2 h-11 md:h-9 rounded-md text-sm transition-all duration-150',
        isSelected
          ? SIDEBAR_NAV_SELECTED
          : SIDEBAR_NAV_DEFAULT_SUBTLE
      )}
    >
      {item.type === 'task' ? (
        <ListTodo className="w-3.5 h-3.5 text-primary shrink-0" />
      ) : (
        <FileText className="w-3.5 h-3.5 text-amber-500 shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <span className="truncate text-left block">{item.title ? linkifyTitle(item.title).elements : 'Untitled'}</span>
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
      </div>
    </button>
  );
});
