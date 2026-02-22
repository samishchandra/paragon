/**
 * Middle Panel Component - Clean Minimalist Design
 * Shows list of notes and tasks with virtualized rendering.
 * 
 * Flat views (Notes, Tasks, Completed, Pinned, Todo, AllItems, Tag, NoteList)
 * use VirtualizedItemList for efficient rendering of 1000+ items.
 * 
 * Sectioned views (Tasks, TaskList, Miscellaneous) use Section + ItemCard
 * for collapsible section headers with items inside.
 * 
 * Features: Virtualized lists, collapsible sections, search, sort order
 * Native drag-to-sidebar for assigning lists/tags. Mobile responsive.
 */

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useMomentum } from "@/contexts/ServerMomentumContext";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';


import {
  Pin,
  CheckCircle2,
  Check,
  Circle,
  FileText,
  FilePlus2,
  ArrowUpDown,
  CheckSquare,
  ListChecks,
  Clock,
  Inbox,
  Trash2,
  ArrowUp,
  ArrowDown,
  Zap,
  Sparkles,
  ListTodo,
  Timer,
  CheckCheck,
  RotateCcw,
  LayoutGrid,
  FolderOpen,
  Tag,
} from 'lucide-react';
import { BulkActionToolbar } from '@/components/BulkActionToolbar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { CARD_DEFAULT, CARD_SELECTED_SUFFIX } from '@/lib/styles';
import { Item, SectionType, Task, SortOrder, DisplaySectionType } from '@/types';
import { format, parseISO, startOfDay } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

import { TagIcon } from '@/components/icons/TagIcon';
import { ListPill } from '@/components/ListPill';


import { VirtualizedItemList } from '@/components/VirtualizedItemList';
import { ItemCard, Section } from '@/components/middle-panel';
import { linkifyTitle, extractFirstLineLink, renderFirstLineLink } from '@/lib/linkifyTitle';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';


// Storage sections (what's stored in DB)
const STORAGE_SECTIONS: { id: SectionType; title: string }[] = [
  { id: 'now', title: 'Do' },
  { id: 'later', title: 'Later' },
  { id: 'completed', title: 'Completed' },
];

// Display sections for Tasks view
const TASK_DISPLAY_SECTIONS: { id: DisplaySectionType; title: string; description?: string }[] = [
  { id: 'pinned', title: 'Pinned', description: 'Pinned tasks' },
  { id: 'now', title: 'Now', description: 'Overdue and due today' },
  { id: 'do', title: 'Do', description: 'Tasks to work on' },
  { id: 'later', title: 'Later', description: 'Tasks for later' },
  { id: 'completed', title: 'Completed', description: 'Completed tasks' },
];

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'modified', label: 'Date Modified' },
  { value: 'dueDate', label: 'Due Date' },
];

interface MiddlePanelProps {
  onItemSelect?: () => void; // Callback for mobile when item is selected
}

export function MiddlePanel({ onItemSelect }: MiddlePanelProps) {
  const {
    state,
    dispatch,
    getItemsBySection,
    getFilteredItems,
    selectItem,
    moveItem,
    reorderItems,
    setSortOrder,
    setSortDirection,
    completeTask,
    uncompleteTask,
    updateItem,
    deleteItem,
    softDeleteItem,
    restoreItem,
    permanentDeleteItem,
    emptyTrash,
    getTrashItems,
    createTask,
    createNote,
    duplicateItem,
    toggleSectionForView,
    isSectionCollapsedForView,
    getViewKey,
    addRecentItem,
    togglePin,
    getPinnedItems,
    isFetching,
    tasksEnabled,
  } = useMomentum();

  const handleCreateTask = () => {
    // Auto-assign to current list if in a list view
    const activeListId = state.activeFilter.type === 'list'
      ? (state.activeFilter as { type: 'list'; listId: string }).listId
      : null;
    const taskListId = activeListId && state.lists.find(l => l.id === activeListId && l.type === 'task')
      ? activeListId : undefined;
    // Auto-tag with current tag if in a tag view
    const tagId = state.activeFilter.type === 'tag'
      ? (state.activeFilter as { type: 'tag'; tagId: string }).tagId
      : null;
    createTask(taskListId, tagId ? [tagId] : undefined);
    if (onItemSelect) onItemSelect();
  };

  const handleCreateNote = () => {
    // Auto-assign to current list if in a list view
    const noteActiveListId = state.activeFilter.type === 'list'
      ? (state.activeFilter as { type: 'list'; listId: string }).listId
      : null;
    const noteListId = noteActiveListId && state.lists.find(l => l.id === noteActiveListId && l.type === 'note')
      ? noteActiveListId : undefined;
    // Auto-tag with current tag name if in a tag view
    const viewTag = state.activeFilter.type === 'tag'
      ? state.tags.find(t => t.id === (state.activeFilter as { type: 'tag'; tagId: string }).tagId)
      : null;
    createNote(noteListId, undefined, undefined, viewTag ? [viewTag.name] : undefined);
    if (onItemSelect) onItemSelect();
  };

  // ─── .md file drop handling ────────────────────────────────────
  const [isFileDragOver, setIsFileDragOver] = useState(false);
  const fileDragCounter = useRef(0);

  const handleFileDragEnter = useCallback((e: React.DragEvent) => {
    // Only react to external file drops, not internal dnd-kit drags
    if (!e.dataTransfer.types.includes('Files')) return;
    e.preventDefault();
    e.stopPropagation();
    fileDragCounter.current++;
    setIsFileDragOver(true);
  }, []);

  const handleFileDragLeave = useCallback((e: React.DragEvent) => {
    if (!e.dataTransfer.types.includes('Files')) return;
    e.preventDefault();
    e.stopPropagation();
    fileDragCounter.current--;
    if (fileDragCounter.current <= 0) {
      fileDragCounter.current = 0;
      setIsFileDragOver(false);
    }
  }, []);

  const handleFileDragOver = useCallback((e: React.DragEvent) => {
    if (!e.dataTransfer.types.includes('Files')) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  }, []);  
  
  // Scroll viewport ref for programmatic scroll control
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  
  // Reset scroll to top when switching views
  useEffect(() => {
    const viewport = scrollViewportRef.current;
    if (!viewport) return;
    viewport.scrollTop = 0;
  }, [state.activeFilter]);


  // Determine current view type
  const isNotesView = state.activeFilter.type === 'notes';
  const isTasksView = state.activeFilter.type === 'tasks';
  const isCompletedView = state.activeFilter.type === 'completed';
  const isPinnedView = state.activeFilter.type === 'pinned';
  const isTagView = state.activeFilter.type === 'tag';
  const isTrashView = state.activeFilter.type === 'trash';
  const isListView = state.activeFilter.type === 'list';
  const isAllItemsView = state.activeFilter.type === 'all';
  const isMiscellaneousView = state.activeFilter.type === 'miscellaneous';
  const isTodoView = state.activeFilter.type === 'todo';

  // Get current list when in list view
  const currentListId = state.activeFilter.type === 'list' ? state.activeFilter.listId : null;
  const currentList = currentListId ? state.lists.find(l => l.id === currentListId) : null;
  const isTaskListView = isListView && currentList?.type === 'task';
  const isNoteListView = isListView && currentList?.type === 'note';

  const handleFileDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileDragCounter.current = 0;
    setIsFileDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const mdFiles = files.filter(f => f.name.endsWith('.md') || f.name.endsWith('.markdown') || f.name.endsWith('.txt'));

    if (mdFiles.length === 0) {
      toast.error('No markdown files found', { description: 'Drop .md, .markdown, or .txt files to create notes' });
      return;
    }

    // Determine list to assign — if currently viewing a list, auto-apply it
    const listId = isListView && currentListId ? currentListId : undefined;
    // Determine tag to auto-apply — if currently viewing a tag, include it
    const currentViewTag = isTagView && state.activeFilter.type === 'tag'
      ? state.tags.find(t => t.id === (state.activeFilter as { type: 'tag'; tagId: string }).tagId)
      : null;
    let created = 0;
    const allDetectedTags = new Set<string>();

    for (const file of mdFiles) {
      try {
        const text = await file.text();
        if (!text.trim()) continue;

        // Parse YAML frontmatter if present
        let body = text;
        let frontmatter: Record<string, string> = {};
        const fmMatch = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        if (fmMatch) {
          body = fmMatch[2];
          // Simple YAML key-value parser
          const fmBlock = fmMatch[1];
          for (const line of fmBlock.split('\n')) {
            const kvMatch = line.match(/^(\w[\w-]*):\s*(.+)$/);
            if (kvMatch) {
              frontmatter[kvMatch[1].toLowerCase()] = kvMatch[2].trim();
            }
          }
        }

        // First line as title (strip # heading prefix), rest as content
        // If second line is a divider (---, ===, ***), remove it automatically
        const lines = body.split('\n');
        let title = file.name.replace(/\.(md|markdown|txt)$/, '');
        let content = body.trim();

        const firstLine = lines[0]?.trim();
        if (firstLine) {
          const headingMatch = firstLine.match(/^#+\s+(.+)/);
          if (headingMatch) {
            title = headingMatch[1].trim();
          } else {
            title = firstLine;
          }

          // Skip the heading line and any immediately following divider (---, ===, ***)
          // Also handle blank lines between heading and divider
          let contentStartLine = 1;
          // Look ahead past any blank lines to find a divider
          for (let i = 1; i < lines.length && i <= 3; i++) {
            const line = lines[i]?.trim();
            if (line === '') continue; // skip blank lines
            if (/^[-=*]{3,}$/.test(line)) {
              contentStartLine = i + 1; // skip past the divider
            }
            break; // stop at first non-blank line (divider or not)
          }
          content = lines.slice(contentStartLine).join('\n').trim();
        }

        // Extract hashtags from title + content for auto-tagging
        const tagText = (title + '\n' + content).replace(/```[\s\S]*?```/g, '').replace(/`[^`]+`/g, '');
        const tagRegex = /(?:^|\s)#([a-zA-Z][\w-]{0,49})(?=\s|$|[.,;:!?)])/gm;
        const hexColorRegex = /^[0-9a-fA-F]{3,8}$/;
        const tagNames = new Set<string>();
        let tagMatch;
        while ((tagMatch = tagRegex.exec(tagText)) !== null) {
          const raw = tagMatch[1];
          // Skip hex color values like #ff00ff, #fff, #FF0000, #aabbccdd
          if (hexColorRegex.test(raw)) continue;
          // Skip ALL-CAPS tags (likely acronyms/constants, not user tags)
          if (raw === raw.toUpperCase() && raw.length <= 6) continue;
          tagNames.add(raw.toLowerCase());
        }

        // Extract tags from frontmatter
        if (frontmatter.tags) {
          for (const t of frontmatter.tags.replace(/^\[|\]$/g, '').split(',')) {
            const trimmed = t.trim().replace(/^[#"']/g, '').replace(/["']$/g, '');
            if (trimmed) tagNames.add(trimmed.toLowerCase());
          }
        }

        // Extract title from frontmatter if present (overrides heading-based title)
        if (frontmatter.title) {
          title = frontmatter.title.replace(/^["']|["']$/g, '');
        }

        // Determine item type from frontmatter (note or task)
        const fmType = frontmatter.type?.toLowerCase();
        const isTask = fmType === 'task' || fmType === 'todo';

        // Extract date from frontmatter
        const fmDate = frontmatter.date || frontmatter.created || frontmatter.created_at;
        let createdDate: string | undefined;
        if (fmDate) {
          const parsed = new Date(fmDate.replace(/^["']|["']$/g, ''));
          if (!isNaN(parsed.getTime())) createdDate = parsed.toISOString();
        }

        // If in tag view, ensure the current tag is included
        if (currentViewTag) {
          tagNames.add(currentViewTag.name.toLowerCase());
        }

        // Collect all tags for toast summary
        tagNames.forEach(t => allDetectedTags.add(t));

        const noteId = createNote(listId, title, content, tagNames.size > 0 ? Array.from(tagNames) : undefined);

        // Apply frontmatter metadata after creation
        if (createdDate || isTask) {
          const createdItem = state.items.find(i => i.id === noteId);
          if (createdItem) {
            const updates: Partial<typeof createdItem> = {};
            if (createdDate) {
              updates.createdAt = createdDate;
              updates.updatedAt = createdDate;
            }
            if (isTask) {
              // Convert to task type
              const taskItem: Task = {
                id: createdItem.id,
                title: createdItem.title,
                content: createdItem.content,
                tags: createdItem.tags,
                isPinned: createdItem.isPinned,
                createdAt: updates.createdAt || createdItem.createdAt,
                updatedAt: updates.updatedAt || createdItem.updatedAt,
                order: createdItem.order,
                listId: createdItem.listId,
                type: 'task',
                isCompleted: false,
                section: 'now',
              };
              updateItem(taskItem);
            } else if (Object.keys(updates).length > 0) {
              updateItem({ ...createdItem, ...updates } as Item);
            }
          }
        }
        created++;
      } catch (err) {
        console.error(`Failed to read file ${file.name}:`, err);
      }
    }

    if (created > 0) {
      const listName = currentList?.name;
      const parts: string[] = [];
      if (listName) parts.push(`Added to "${listName}"`);
      if (allDetectedTags.size > 0) {
        const tagList = Array.from(allDetectedTags).slice(0, 5).map(t => `#${t}`).join(', ');
        const suffix = allDetectedTags.size > 5 ? ` +${allDetectedTags.size - 5} more` : '';
        parts.push(`Auto-tagged: ${tagList}${suffix}`);
      }
      toast.success(
        `Created ${created} note${created > 1 ? 's' : ''}`,
        { description: parts.length > 0 ? parts.join(' · ') : undefined }
      );
    }
  }, [createNote, isListView, currentListId, currentList, isTagView, state.activeFilter, state.tags]);

  // Determine if Due Date sort option should be hidden (note-only views don't have due dates)
  const hideDueDateSort = isNotesView || isTodoView || isMiscellaneousView || isNoteListView;
  const availableSortOptions = hideDueDateSort
    ? SORT_OPTIONS.filter(o => o.value !== 'dueDate')
    : SORT_OPTIONS;

  // Get items organized by display sections
  const organizedItems = useMemo(() => {
    const filtered = getFilteredItems();
    const today = startOfDay(new Date());
    
    // isTodoView — handled by virtualizedProps path

    if (isNotesView || isMiscellaneousView || isAllItemsView) {
      // Notes/Miscellaneous/All Items view: Pinned section + flat Items list
      // Use dedicated pinned query for ALL pinned items (not just current page)
      const allPinnedItems = getPinnedItems();
      // For Notes view, filter pinned items to only show notes; for others show all
      const pinnedItems = isNotesView 
        ? allPinnedItems.filter(item => item.type === 'note')
        : isMiscellaneousView
          ? allPinnedItems.filter(item => !item.listId)
          : allPinnedItems;
      const unpinnedItems = filtered.filter(item => !item.isPinned);
      return {
        pinned: pinnedItems,
        all: unpinnedItems,
      };
    }
    
    if (isTasksView) {
      // Tasks view: Pinned → Now (overdue/today) → Do → Later → Completed
      const tasks = filtered as Task[];
      
      // Pinned tasks are no longer separated - they stay in their regular sections
      // Pinning only adds items to sidebar Pinned section for quick access
      
      // Now section: overdue + due today (not completed)
      const nowTasks = tasks.filter(t => {
        if (t.isCompleted) return false;
        if (!t.dueDate) return false;
        const dueDate = startOfDay(parseISO(t.dueDate));
        return dueDate <= today; // Overdue or due today
      });
      
      // Do section: tasks in 'now' storage section without due date or future due date
      const doTasks = tasks.filter(t => {
        if (t.isCompleted) return false;
        if (t.section !== 'now') return false;
        if (!t.dueDate) return true; // No due date = Do section
        const dueDate = startOfDay(parseISO(t.dueDate));
        return dueDate > today; // Future due date in 'now' section = Do section
      });
      
      // Later section: tasks in 'later' storage section that are NOT overdue
      // Overdue tasks from 'later' section should appear in 'Now' section instead
      const laterTasks = tasks.filter(t => {
        if (t.isCompleted) return false;
        if (t.section !== 'later') return false;
        // Exclude overdue tasks - they should be in Now section
        if (t.dueDate) {
          const dueDate = startOfDay(parseISO(t.dueDate));
          if (dueDate <= today) return false; // Overdue - goes to Now
        }
        return true;
      });
      
      // Completed section
      const completedTasks = tasks.filter(t => t.isCompleted);
      
      return {
        pinned: [], // Pinned items stay in their regular sections
        now: nowTasks,
        do: doTasks,
        later: laterTasks,
        completed: completedTasks,
      };
    }
    
    // All view or other filters: use storage sections (pinned items stay in their regular sections)
    // Pinning only adds items to sidebar Pinned section for quick access
    const nowItems = filtered.filter(item => item.section === 'now' && !(item.type === 'task' && (item as Task).isCompleted));
    const laterItems = filtered.filter(item => item.section === 'later' && !(item.type === 'task' && (item as Task).isCompleted));
    const completedItems = filtered.filter(item => item.type === 'task' && (item as Task).isCompleted);
    
    return {
      pinned: [], // Pinned items stay in their regular sections
      now: nowItems,
      later: laterItems,
      completed: completedItems,
    };
  }, [getFilteredItems, getPinnedItems, isNotesView, isTasksView, isMiscellaneousView, isAllItemsView]);

  // Sort items within each section
  const sortItems = (items: Item[]): Item[] => {
    const sorted = [...items];
    const isAsc = state.sortDirection === 'asc';
    const multiplier = isAsc ? 1 : -1;
    
    switch (state.sortOrder) {
      case 'custom':
        return sorted.sort((a, b) => (a.order - b.order) * multiplier);
      case 'modified':
        return sorted.sort((a, b) => {
          const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          const diff = (isNaN(aTime) ? 0 : aTime) - (isNaN(bTime) ? 0 : bTime);
          return diff * multiplier;
        });
      case 'dueDate':
        return sorted.sort((a, b) => {
          const aTask = a.type === 'task' ? a as Task : null;
          const bTask = b.type === 'task' ? b as Task : null;
          const aDueDate = aTask?.dueDate ? new Date(aTask.dueDate).getTime() : null;
          const bDueDate = bTask?.dueDate ? new Date(bTask.dueDate).getTime() : null;
          
          if (aDueDate === null && bDueDate === null) return 0;
          if (aDueDate === null) return 1;
          if (bDueDate === null) return -1;
          
          return (aDueDate - bDueDate) * multiplier;
        });
      default:
        return sorted;
    }
  };

  const handleItemSelect = (id: string) => {
    selectItem(id);
    addRecentItem(id); // Track recently viewed items
    onItemSelect?.();
  };
  // Render sections based on view type
  const renderSections = () => {
    // Trash view: Show deleted items with restore/permanent delete options
    if (isTrashView) {
      const trashItems = getTrashItems();
      
      return (
        <div className="space-y-0">
          {/* Empty Trash button */}
          {trashItems.length > 0 && (
            <div className="px-3 py-2 flex items-center justify-between border-b border-border/30 mb-2">
              <span className="text-xs text-muted-foreground">
                {trashItems.length} item{trashItems.length !== 1 ? 's' : ''} will be permanently deleted after 30 days
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10"
                onClick={() => {
                  if (window.confirm(`Are you sure you want to permanently delete ${trashItems.length} item${trashItems.length !== 1 ? 's' : ''}? This cannot be undone.`)) {
                    emptyTrash();
                  }
                }}
              >
                Empty Trash
              </Button>
            </div>
          )}
          
          <AnimatePresence mode="sync">
            {trashItems.map((item) => {
              const deletedDate = item.deletedAt ? new Date(item.deletedAt) : null;
              const daysRemaining = deletedDate 
                ? Math.max(0, 30 - Math.floor((Date.now() - deletedDate.getTime()) / (1000 * 60 * 60 * 24)))
                : 30;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0, transition: { duration: 0.25, ease: 'easeInOut' } }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className={cn(
                    "group px-3 py-2.5 mx-1 rounded-lg transition-colors cursor-pointer",
                    CARD_DEFAULT,
                    state.selectedItemId === item.id && CARD_SELECTED_SUFFIX
                  )}
                  onClick={() => selectItem(item.id)}
                >
                  <div>
                    {/* Title row with icon and actions */}
                    <div className="flex items-center gap-3">
                      {/* Item type icon */}
                      <div className="text-muted-foreground/50">
                        {item.type === 'task' ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                      </div>
                      
                      {/* Title */}
                      <div className="flex-1 min-w-0">
                        <span className={cn(
                          "text-sm font-medium truncate block",
                          "text-muted-foreground line-through"
                        )}>
                          {item.title ? linkifyTitle(item.title).elements : (item.type === 'task' ? 'Untitled Task' : 'Untitled Note')}
                        </span>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            restoreItem(item.id);
                          }}
                          title="Restore"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm('Permanently delete this item? This cannot be undone.')) {
                              permanentDeleteItem(item.id);
                            }
                          }}
                          title="Delete permanently"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Link preview if any */}
                    {(() => {
                      const firstLink = extractFirstLineLink(item.content);
                      if (firstLink) {
                        return (
                          <div className="mt-0.5 pl-7">
                            {renderFirstLineLink(firstLink)}
                          </div>
                        );
                      }
                      return null;
                    })()}
                    
                    {/* Meta text */}
                    <div className="flex items-center gap-1.5 mt-1.5 pl-7 text-xs text-muted-foreground/70 whitespace-nowrap">
                      <span>Deleted {deletedDate ? format(deletedDate, 'MMM d, yyyy') : 'recently'}</span>
                      <span className="opacity-40">❘</span>
                      <span className={daysRemaining <= 7 ? 'text-red-400' : ''}>
                        {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {trashItems.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Trash2 className="w-12 h-12 opacity-30" />
              <div className="text-center">
                <p className="text-sm font-medium">Trash is empty</p>
                <p className="text-xs mt-1 opacity-70">Deleted items will appear here for 30 days</p>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    // isTodoView — handled by virtualizedProps path

    // isNotesView — handled by virtualizedProps path

    
    if (isTasksView) {
      // Tasks view: Pinned → Now → Do → Later (Completed items shown in Completed view)
      const sections = [
        // Pinned section removed from Tasks view - pinned items show in All Items view only
        { id: 'now' as DisplaySectionType, title: 'Now', items: sortItems(organizedItems.now || []), color: 'text-rose-500', icon: <Zap className="w-4 h-4" /> },
        { id: 'do' as DisplaySectionType, title: 'Do', items: sortItems(organizedItems.do || []), color: 'text-sky-500', icon: <ListTodo className="w-4 h-4" /> },
        { id: 'later' as DisplaySectionType, title: 'Later', items: sortItems(organizedItems.later || []), color: 'text-violet-500', icon: <Timer className="w-4 h-4" /> },
        // Completed section removed - completed items are shown in Completed view
      ];
      
      return sections.map((section) => {
        // Hide empty Now section in Tasks view
        if (section.id === 'now' && section.items.length === 0) {
          return null;
        }
        
        // Hide completed section in certain filter views
        if (
          section.id === 'completed' &&
          state.activeFilter.type !== 'all' &&
          state.activeFilter.type !== 'tasks' &&
          state.activeFilter.type !== 'completed'
        ) {
          return null;
        }
        
        const viewKey = getViewKey();
        const isCollapsed = isSectionCollapsedForView(viewKey, section.id as SectionType);
        
        return (
          <Section
            key={section.id}
            id={section.id}
            title={section.title}
            count={section.items.length}
            isCollapsed={isCollapsed}
            onToggle={() => toggleSectionForView(viewKey, section.id as SectionType)}
            color={section.color}
            icon={section.icon}
          >
                {section.items.map((item) => {
                  return (
                    <ItemCard
                      key={item.id}
                      item={item}
                      isSelected={state.selectedItemId === item.id}
                      onSelect={() => handleItemSelect(item.id)}
                      onComplete={() =>
                        item.type === 'task' &&
                        ((item as Task).isCompleted
                          ? uncompleteTask(item.id)
                          : completeTask(item.id))
                      }
                      onTitleChange={(newTitle) => {
                        updateItem({ ...item, title: newTitle });
                      }}
                      onDelete={() => softDeleteItem(item.id)}
                      onMove={(targetSection) => {
                        if (item.type === 'note' && targetSection === 'completed') return;
                        updateItem({ ...item, section: targetSection } as Item);
                      }}
                      onPin={() => togglePin(item.id)}
                      onMoveToTop={() => {
                        // Move item to top of its section
                        const sectionItems = state.items.filter(i => i.section === item.section && i.type === item.type);
                        const otherItems = sectionItems.filter(i => i.id !== item.id);
                        const newOrder = otherItems.length > 0 ? Math.min(...otherItems.map(i => i.order)) - 1 : 0;
                        updateItem({ ...item, order: newOrder });
                      }}
                      onDuplicate={() => duplicateItem(item.id)}
                      onDueDateChange={(date) => {
                        if (item.type === 'task') {
                          updateItem({ ...item, dueDate: date?.toISOString() } as Task);
                        }
                      }}
                      onTagClick={() => {
                        handleItemSelect(item.id);
                        dispatch({ type: 'OPEN_TAG_POPOVER' });
                      }}
                      tags={state.tags}
                      searchQuery={state.searchQuery}
                      hideListPill={isListView}
                      isMultiSelectMode={state.isMultiSelectMode}
                      isMultiSelected={state.selectedItemIds.includes(item.id)}
                      onToggleMultiSelect={() => dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: item.id })}
                    />
                  );
                })}
            {section.items.length === 0 && !isCollapsed && (
              <div className="py-8 flex flex-col items-center justify-center gap-2 text-muted-foreground text-sm">
                {section.id === 'completed' ? (
                  <><CheckCircle2 className="w-8 h-8 opacity-40" /><span>No completed tasks yet</span></>
                ) : section.id === 'now' ? (
                  <><Clock className="w-8 h-8 opacity-40" /><span>No overdue or due today tasks</span></>
                ) : section.id === 'do' ? (
                  <><Circle className="w-8 h-8 opacity-40" /><span>Drop tasks to work on</span></>
                ) : section.id === 'later' ? (
                  <><Clock className="w-8 h-8 opacity-40" /><span>Drop tasks for later</span></>
                ) : section.id === 'pinned' ? (
                  <><Pin className="w-8 h-8 opacity-40" /><span>Pin important items here</span></>
                ) : (
                  <><Inbox className="w-8 h-8 opacity-40" /><span>Drop items here</span></>
                )}
              </div>
            )}
          </Section>
        );
      });
    }
    
    // Pinned view: flat list without sections
    // isPinnedView — handled by virtualizedProps path

    
    // Completed view: flat list without sections
    // isCompletedView — handled by virtualizedProps path

    
    // All Items view: Flat list (no sections)
    // isAllItemsView — handled by virtualizedProps path

    
    // Miscellaneous view: Pinned → Items sections (same as All Items)
    if (isMiscellaneousView) {
      const allItems = sortItems(getFilteredItems());
      
      const miscSections = [
        { id: 'unpinned' as const, title: 'Items', items: allItems, color: 'text-muted-foreground', icon: <ListTodo className="w-4 h-4" /> },
      ];
      
      return miscSections.map((section) => {
        
        const viewKey = getViewKey();
        const isCollapsed = isSectionCollapsedForView(viewKey, section.id as SectionType);
        
        return (
          <Section
            key={section.id}
            id={section.id}
            title={section.title}
            count={section.items.length}
            isCollapsed={isCollapsed}
            onToggle={() => toggleSectionForView(viewKey, section.id as SectionType)}
            color={section.color}
            icon={section.icon}
          >
                {section.items.map((item) => {
                  return (
                    <ItemCard
                      key={item.id}
                      item={item}
                      isSelected={state.selectedItemId === item.id}
                      onSelect={() => handleItemSelect(item.id)}
                      onComplete={() =>
                        item.type === 'task' &&
                        ((item as Task).isCompleted
                          ? uncompleteTask(item.id)
                          : completeTask(item.id))
                      }
                      onTitleChange={(newTitle) => {
                        updateItem({ ...item, title: newTitle });
                      }}
                      onDelete={() => softDeleteItem(item.id)}
                      onMove={(targetSection) => {
                        if (item.type === 'note' && targetSection === 'completed') return;
                        updateItem({ ...item, section: targetSection } as Item);
                      }}
                      onPin={() => togglePin(item.id)}
                      onMoveToTop={() => {
                        const sectionItems = state.items.filter(i => i.section === item.section && i.type === item.type);
                        const otherItems = sectionItems.filter(i => i.id !== item.id);
                        const newOrder = otherItems.length > 0 ? Math.min(...otherItems.map(i => i.order)) - 1 : 0;
                        updateItem({ ...item, order: newOrder });
                      }}
                      onDuplicate={() => duplicateItem(item.id)}
                      onDueDateChange={(date) => {
                        if (item.type === 'task') {
                          updateItem({ ...item, dueDate: date?.toISOString() } as Task);
                        }
                      }}
                      onTagClick={() => {
                        handleItemSelect(item.id);
                        dispatch({ type: 'OPEN_TAG_POPOVER' });
                      }}
                      tags={state.tags}
                      searchQuery={state.searchQuery}
                      hideListPill={false}
                      isMultiSelectMode={state.isMultiSelectMode}
                      isMultiSelected={state.selectedItemIds.includes(item.id)}
                      onToggleMultiSelect={() => dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: item.id })}
                    />
                  );
                })}
            {section.items.length === 0 && !isCollapsed && (
              <div className="py-8 flex flex-col items-center justify-center gap-2 text-muted-foreground text-sm">
                <Clock className="w-8 h-8 opacity-40" />
                <span>No items yet</span>
              </div>
            )}
          </Section>
        );
      });
    }
    
    // Tag view: Flat list (no sections)
    // isTagView — handled by virtualizedProps path

    
    // Note-type List view: Flat list (no sections, same as Notes view)
    // isNoteListView — handled by virtualizedProps path

    
    // Task-type List views: Now → Do → Later → Completed sections
    // First, separate now items into overdue/today vs regular
    const allNowItems = organizedItems.now || [];
    const allLaterItems = organizedItems.later || [];
    const today = startOfDay(new Date());
    
    // Now section: overdue + due today items from BOTH now and later storage sections
    const nowSectionItems = [
      ...allNowItems.filter(item => {
        if (item.type !== 'task') return false;
        const task = item as Task;
        if (!task.dueDate) return false;
        const dueDate = startOfDay(parseISO(task.dueDate));
        return dueDate <= today;
      }),
      // Also include overdue items from later section
      ...allLaterItems.filter(item => {
        if (item.type !== 'task') return false;
        const task = item as Task;
        if (!task.dueDate) return false;
        const dueDate = startOfDay(parseISO(task.dueDate));
        return dueDate <= today;
      })
    ];
    
    // Do section: items without due date or future due date
    const doSectionItems = allNowItems.filter(item => {
      if (item.type === 'note') return true; // Notes go to Do
      const task = item as Task;
      if (!task.dueDate) return true;
      const dueDate = startOfDay(parseISO(task.dueDate));
      return dueDate > today;
    });
    
    // Later section: exclude overdue items (they go to Now)
    const laterSectionItems = allLaterItems.filter(item => {
      if (item.type !== 'task') return true; // Notes stay in later
      const task = item as Task;
      if (!task.dueDate) return true; // No due date stays in later
      const dueDate = startOfDay(parseISO(task.dueDate));
      return dueDate > today; // Only future due dates stay in later
    });
    
    const sections = [
      { id: 'pinned' as const, title: 'Pinned', items: sortItems(organizedItems.pinned || []), color: 'text-primary', icon: <Pin className="w-4 h-4" /> },
      { id: 'now' as const, title: 'Now', items: sortItems(nowSectionItems), color: 'text-rose-500', icon: <Zap className="w-4 h-4" /> },
      { id: 'do' as const, title: 'Do', items: sortItems(doSectionItems), color: 'text-sky-500', icon: <ListTodo className="w-4 h-4" /> },
      { id: 'later' as const, title: 'Later', items: sortItems(laterSectionItems), color: 'text-violet-500', icon: <Timer className="w-4 h-4" /> },
      { id: 'completed' as const, title: 'Completed', items: sortItems(organizedItems.completed || []), color: 'text-emerald-500', icon: <CheckCheck className="w-4 h-4" /> },
    ];
    
    return sections.map((section) => {
      // Hide pinned section in Tag views (pinned items show in All Items view only)
      // Also hide empty pinned section
      if (section.id === 'pinned' && (isTagView || section.items.length === 0)) {
        return null;
      }
      
      // Hide empty Now section
      if (section.id === 'now' && section.items.length === 0) {
        return null;
      }
      
      // Hide completed section in filter views that don't show completed
      if (
        section.id === 'completed' &&
        state.activeFilter.type !== 'all' &&
        state.activeFilter.type !== 'tasks' &&
        state.activeFilter.type !== 'completed'
      ) {
        return null;
      }
      
      const viewKey = getViewKey();
      const isCollapsed = isSectionCollapsedForView(viewKey, section.id as SectionType);
      
      return (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          count={section.items.length}
          isCollapsed={isCollapsed}
          onToggle={() => toggleSectionForView(viewKey, section.id as SectionType)}
          color={section.color}
          icon={section.icon}
        >
              {section.items.map((item) => {
                return (
                  <ItemCard
                    key={item.id}
                    item={item}
                    isSelected={state.selectedItemId === item.id}
                    onSelect={() => handleItemSelect(item.id)}
                    onComplete={() =>
                      item.type === 'task' &&
                      ((item as Task).isCompleted
                        ? uncompleteTask(item.id)
                        : completeTask(item.id))
                    }
                    onTitleChange={(newTitle) => {
                      updateItem({ ...item, title: newTitle });
                    }}
                    onDelete={() => softDeleteItem(item.id)}
                    onMove={(targetSection) => {
                      if (item.type === 'note' && targetSection === 'completed') return;
                      updateItem({ ...item, section: targetSection } as Item);
                    }}
                    onPin={() => togglePin(item.id)}
                    onMoveToTop={() => {
                      const sectionItems = state.items.filter(i => i.section === item.section && i.type === item.type);
                      const otherItems = sectionItems.filter(i => i.id !== item.id);
                      const newOrder = otherItems.length > 0 ? Math.min(...otherItems.map(i => i.order)) - 1 : 0;
                      updateItem({ ...item, order: newOrder });
                    }}
                    onDuplicate={() => duplicateItem(item.id)}
                    onDueDateChange={(date) => {
                      if (item.type === 'task') {
                        updateItem({ ...item, dueDate: date?.toISOString() } as Task);
                      }
                    }}
                    onTagClick={() => {
                      handleItemSelect(item.id);
                      dispatch({ type: 'OPEN_TAG_POPOVER' });
                    }}
                    tags={state.tags}
                    searchQuery={state.searchQuery}
                    hideListPill={isListView}
                    isMultiSelectMode={state.isMultiSelectMode}
                    isMultiSelected={state.selectedItemIds.includes(item.id)}
                    onToggleMultiSelect={() => dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: item.id })}
                  />
                );
              })}
          {section.items.length === 0 && !isCollapsed && (
            <div className="py-8 flex flex-col items-center justify-center gap-2 text-muted-foreground text-sm">
              {section.id === 'completed' ? (
                <><CheckCircle2 className="w-8 h-8 opacity-40" /><span>No completed tasks yet</span></>
              ) : section.id === 'now' ? (
                <><Clock className="w-8 h-8 opacity-40" /><span>No overdue or due today tasks</span></>
              ) : section.id === 'do' ? (
                <><Circle className="w-8 h-8 opacity-40" /><span>Drop tasks to work on</span></>
              ) : section.id === 'later' ? (
                <><Clock className="w-8 h-8 opacity-40" /><span>Drop tasks for later</span></>
              ) : section.id === 'pinned' ? (
                <><Pin className="w-8 h-8 opacity-40" /><span>Pin important items here</span></>
              ) : (
                <><Inbox className="w-8 h-8 opacity-40" /><span>Drop items here</span></>
              )}
            </div>
          )}
        </Section>
      );
    });
  };

  // Get view title and icon based on active filter
  // Icons match the sidebar icons for consistency
  const getViewInfo = () => {
    const currentTag = isTagView && state.activeFilter.type === 'tag'
      ? state.tags.find(t => t.id === (state.activeFilter as { type: 'tag'; tagId: string }).tagId) 
      : null;
    
    if (isAllItemsView) return { title: 'All Items', icon: Sparkles, color: undefined };
    if (isTasksView) return { title: 'Tasks', icon: ListTodo, color: undefined };
    if (isNotesView) return { title: 'Notes', icon: FileText, color: undefined };
    if (isTodoView) return { title: 'Todo Notes', icon: CheckSquare, color: '#fbbf24' }; // amber-400 color
    if (isMiscellaneousView) return { title: 'Miscellaneous', icon: LayoutGrid, color: '#a78bfa' }; // violet-400 color
    if (isCompletedView) return { title: 'Completed', icon: CheckCircle2, color: '#34d399' }; // emerald-400 color
    if (isTrashView) return { title: 'Recently Deleted', icon: Trash2, color: undefined };
    if (isPinnedView) return { title: 'Pinned', icon: Pin, color: undefined };
    if (isTagView && currentTag) return { title: currentTag.name, icon: null, color: currentTag.color };
    if (isListView && currentList) return { title: currentList.name, icon: FolderOpen, color: currentList.color };
    return { title: 'Items', icon: LayoutGrid, color: undefined };
  };
  
  const viewInfo = getViewInfo();

  // Determine if the current view should use virtualization (all flat views).
  // Sectioned views (Tasks, TaskList, Miscellaneous) use ScrollArea with ItemCard instead.
  const getVirtualizedListProps = (): { items: Item[]; hideListPill: boolean; emptyState?: React.ReactNode } | null => {
    const filtered = getFilteredItems();
    
    if (isAllItemsView) {
      return { items: sortItems(filtered), hideListPill: false, emptyState: (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <Sparkles className="w-12 h-12 opacity-30" />
          <div className="text-center">
            <p className="text-sm font-medium">No items yet</p>
            <p className="text-xs mt-1 opacity-70">Create a task or note to get started</p>
          </div>
        </div>
      )};
    }
    if (isNotesView) {
      return { items: sortItems(organizedItems.all || []), hideListPill: isNoteListView, emptyState: (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <FileText className="w-12 h-12 opacity-30" />
          <div className="text-center">
            <p className="text-sm font-medium">No notes yet</p>
            <p className="text-xs mt-1 opacity-70">Create a note to get started</p>
          </div>
        </div>
      )};
    }
    if (isCompletedView) {
      return { items: sortItems(filtered), hideListPill: false, emptyState: (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <CheckCircle2 className="w-12 h-12 opacity-30" />
          <div className="text-center">
            <p className="text-sm font-medium">No completed items yet</p>
            <p className="text-xs mt-1 opacity-70">Complete a task to see it here</p>
          </div>
        </div>
      )};
    }
    if (isPinnedView) {
      return { items: sortItems(filtered), hideListPill: false, emptyState: (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <Pin className="w-12 h-12 opacity-30" />
          <div className="text-center">
            <p className="text-sm font-medium">No pinned items yet</p>
            <p className="text-xs mt-1 opacity-70">Pin important items for quick access</p>
          </div>
        </div>
      )};
    }
    if (isTodoView) {
      return { items: sortItems(organizedItems.all || []), hideListPill: false, emptyState: (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <CheckSquare className="w-12 h-12 opacity-30" />
          <div className="text-center">
            <p className="text-sm font-medium">All done!</p>
            <p className="text-xs mt-1 opacity-70">No items with uncompleted checklists</p>
          </div>
        </div>
      )};
    }
    if (isTagView) {
      return { items: sortItems(filtered), hideListPill: false, emptyState: (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <Tag className="w-12 h-12 opacity-30" />
          <div className="text-center">
            <p className="text-sm font-medium">No items with this tag</p>
            <p className="text-xs mt-1 opacity-70">Tag items to see them here</p>
          </div>
        </div>
      )};
    }
    if (isNoteListView) {
      return { items: sortItems(filtered), hideListPill: true, emptyState: (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <FileText className="w-12 h-12 opacity-30" />
          <div className="text-center">
            <p className="text-sm font-medium">No notes in this list</p>
            <p className="text-xs mt-1 opacity-70">Create a note to get started</p>
          </div>
        </div>
      )};
    }
    if (isListView && currentList) {
      // Task-type list views use sections, not virtualization
      if (currentList.type === 'task') return null;
      return { items: sortItems(filtered), hideListPill: true };
    }
    return null;
  };
  const virtualizedProps = getVirtualizedListProps();

  return (
    <div
      className="h-full flex flex-col bg-[#F9FAFB] dark:bg-zinc-900 border-r border-border/50 relative"
      onDragEnter={handleFileDragEnter}
      onDragLeave={handleFileDragLeave}
      onDragOver={handleFileDragOver}
      onDrop={handleFileDrop}
    >
      {/* File drop overlay */}
      {isFileDragOver && (
        <div className="absolute inset-0 z-50 bg-primary/5 border-2 border-dashed border-primary/40 rounded-lg flex items-center justify-center backdrop-blur-[1px] pointer-events-none">
          <div className="flex flex-col items-center gap-2 text-primary">
            <Upload className="w-8 h-8" />
            <span className="text-sm font-medium">Drop .md files to create notes</span>
            {isListView && currentList && (
              <span className="text-xs text-muted-foreground">Will be added to "{currentList.name}"</span>
            )}
          </div>
        </div>
      )}
      {/* Fetching indicator - subtle progress bar at the top */}
      {isFetching && (
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="h-0.5 bg-primary/30 overflow-hidden">
            <div className="h-full bg-primary animate-[indeterminate_1.5s_ease-in-out_infinite] w-1/3" />
          </div>
        </div>
      )}
      {/* Header Section */}
      <div className="hidden md:block p-3 border-b border-border/50 space-y-2">
        {/* Actions Bar - Title on left, buttons on right */}
        <div className="flex items-center h-8">
          {/* View Title with Icon */}
          <div className="flex items-center gap-1.5 h-full">
            {viewInfo.icon ? (
              <viewInfo.icon className="w-4 h-4" style={viewInfo.color ? { color: viewInfo.color } : undefined} />
            ) : (
              <TagIcon color={viewInfo.color} className="w-4 h-4" />
            )}
            <span 
              className="font-normal text-base"
              style={viewInfo.color ? { color: viewInfo.color } : undefined}
            >
              {viewInfo.title}
            </span>
          </div>
          
          {/* Spacer to push all action buttons to the right */}
          <div className="flex-1" />
          
          {/* All action buttons - right aligned with consistent spacing */}
          <div className="flex items-center gap-1">
            {/* New Task button (icon only) */}
            {tasksEnabled && !isNotesView && !isCompletedView && !isNoteListView && !isTrashView && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                title="New Task"
                onClick={handleCreateTask}
              >
                <CheckSquare className="w-4 h-4" />
              </Button>
            )}
            
            {/* New Note button (icon only) */}
            {!isTasksView && !isCompletedView && !isTaskListView && !isTrashView && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                title="New Note"
                onClick={handleCreateNote}
              >
                <FilePlus2 className="w-4 h-4" />
              </Button>
            )}
            
            {/* Multi-select toggle button */}
            <Button
              variant={state.isMultiSelectMode ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              title={state.isMultiSelectMode ? "Exit multi-select" : "Select multiple items"}
              onClick={() => dispatch({ type: 'TOGGLE_MULTI_SELECT_MODE' })}
            >
              <ListChecks className="w-4 h-4" />
            </Button>
            
            {/* Sort Order Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  title={availableSortOptions.find(o => o.value === state.sortOrder)?.label || SORT_OPTIONS.find(o => o.value === state.sortOrder)?.label}
                >
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {availableSortOptions.map((option) => {
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
          </div>
        </div>

      </div>


      {/* Bulk Action Toolbar - shown when in multi-select mode and there are items in view */}
      {state.isMultiSelectMode && getFilteredItems().length > 0 && (
        <BulkActionToolbar
          selectedCount={state.selectedItemIds.length}
          totalCount={getFilteredItems().length}
          onSelectAll={() => dispatch({ type: 'SELECT_ALL_ITEMS', payload: getFilteredItems().map((item: { id: string }) => item.id) })}
          onClearSelection={() => dispatch({ type: 'CLEAR_SELECTION' })}
        />
      )}

      {/* Sections */}
      <div 
        className="flex-1 overflow-hidden relative"
      >
        {virtualizedProps ? (
          /* Virtualized path for flat views: render directly (not inside ScrollArea)
             so AutoSizer can measure the parent's height correctly */
          <VirtualizedItemList
            items={virtualizedProps.items}
            selectedItemId={state.selectedItemId}
            tags={state.tags}
            lists={state.lists}
            searchQuery={state.searchQuery}
            onSelect={handleItemSelect}
            onComplete={(id) => {
              const item = state.items.find(i => i.id === id);
              if (item && item.type === 'task') {
                (item as Task).isCompleted ? uncompleteTask(id) : completeTask(id);
              }
            }}
            onUncomplete={(id) => {
              const item = state.items.find(i => i.id === id);
              if (item && item.type === 'task') uncompleteTask(id);
            }}
            onDelete={(id) => softDeleteItem(id)}
            onMove={(id, section) => {
              const item = state.items.find(i => i.id === id);
              if (item && item.type === 'note' && section === 'completed') return;
              if (item) updateItem({ ...item, section } as Item);
            }}
            onPin={(id) => togglePin(id)}
            onMoveToTop={(id) => {
              const item = state.items.find(i => i.id === id);
              if (item) {
                const sectionItems = state.items.filter(i => i.section === item.section && i.type === item.type);
                const otherItems = sectionItems.filter(i => i.id !== item.id);
                const newOrder = otherItems.length > 0 ? Math.min(...otherItems.map(i => i.order)) - 1 : 0;
                updateItem({ ...item, order: newOrder });
              }
            }}
            onDuplicate={(id) => duplicateItem(id)}
            onDateChange={(id, date) => {
              const item = state.items.find(i => i.id === id);
              if (item && item.type === 'task') {
                updateItem({ ...item, dueDate: date } as Item);
              }
            }}
            onTagClick={(id) => {
              handleItemSelect(id);
              dispatch({ type: 'OPEN_TAG_POPOVER' });
            }}
            hideListPill={virtualizedProps.hideListPill}
            emptyState={virtualizedProps.emptyState}
            isMultiSelectMode={state.isMultiSelectMode}
            selectedItemIds={state.selectedItemIds}
            onToggleMultiSelect={(id) => dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: id })}
            className="h-full"
          />
        ) : (
          /* Sectioned views (Tasks, TaskList, Miscellaneous): use ScrollArea */
          <ScrollArea 
            className="h-full custom-scrollbar" 
            ref={scrollViewportRef}
          >
            <div className="p-3 space-y-4">
              {renderSections()}
              {/* Bottom spacer for mobile tab bar + safe area */}
              <div className="shrink-0 md:hidden" style={{ height: 'calc(3.5rem + max(0.5rem, env(safe-area-inset-bottom)))' }} />
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
