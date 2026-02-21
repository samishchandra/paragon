/**
 * Middle Panel Component - Clean Minimalist Design
 * Shows list of notes and tasks with draggable sections
 * 
 * Section Structure:
 * - Notes view: Flat list (no sections), with Pinned section at top if any pinned notes
 * - Tasks view: Pinned (if any) → Now (overdue + today) → Do → Later → Completed
 * 
 * Features: DnD-kit for drag-and-drop, collapsible sections, search, sort order
 * Mobile responsive with inline title editing
 */

import { useState, useRef, useEffect, useMemo, memo, useCallback } from 'react';
import { useMomentum } from "@/contexts/ServerMomentumContext";
import { useTheme } from '@/contexts/ThemeContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  ChevronDown,
  ChevronRight,
  Pin,
  CheckCircle2,
  Check,
  Circle,
  FileText,
  FilePlus2,
  GripVertical,
  Sun,
  Moon,
  Calendar,
  ArrowUpDown,
  Pencil,
  CheckSquare,
  ListChecks,
  Clock,
  Inbox,
  MoreHorizontal,
  Trash2,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Zap,
  Sparkles,
  ListTodo,
  Timer,
  CheckCheck,
  RotateCcw,
  AlertTriangle,
  Loader2,
  Square,
  LayoutGrid,
  StickyNote,
  Grid2X2,
  FolderOpen,
  Tag,
  Copy,
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
import { CARD_DEFAULT, CARD_SELECTED_SUFFIX, ITEM_SELECTED, ITEM_HOVER, ITEM_DRAGGING } from '@/lib/styles';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarPicker } from '@/components/ui/calendar';
import { highlightText, getMatchSnippet } from '@/lib/highlightText';
import { DatePickerPopover } from '@/components/DatePickerPopover';
import { Item, SectionType, Task, SortOrder, DisplaySectionType } from '@/types';
import { format, isPast, isToday, isTomorrow, parseISO, startOfDay } from 'date-fns';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { useSwipeable } from 'react-swipeable';
import { TagIcon } from '@/components/icons/TagIcon';
import { ListPill } from '@/components/ListPill';
import { TagPill } from '@/components/TagPill';
import { DatePill } from '@/components/DatePill';
import { Pill } from '@/components/ui/pill';
import { VirtualizedItemList } from '@/components/VirtualizedItemList';
import { CheckConfetti } from '@/components/CheckConfetti';
import { linkifyTitle, getTitlePlainText, extractFirstLineLink, renderFirstLineLink } from '@/lib/linkifyTitle';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

/** Virtualize lists above this item count for smooth scrolling. Disabled for custom sort (drag-and-drop). */
const VIRTUALIZATION_THRESHOLD = 30;

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
  { value: 'custom', label: 'Custom Order' },
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

  const { theme, toggleTheme } = useTheme();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<'before' | 'after' | null>(null);
  
  // Mobile detection - disable drag on mobile/tablet
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  
  // Scroll viewport ref for programmatic scroll control
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  
  // Reset scroll to top when switching views
  useEffect(() => {
    const viewport = scrollViewportRef.current;
    if (!viewport) return;
    viewport.scrollTop = 0;
  }, [state.activeFilter]);

  // ─── Suppress Framer Motion layout animations during panel resize ────────
  // When the sidebar or editor panel toggles, the middle panel width changes.
  // Framer Motion's `layout` prop detects this and animates every item card,
  // causing an unwanted "expand" effect. We suppress layout for 250ms after
  // any panel collapse state change so items snap instantly instead.
  // Start suppressed: on mobile, MiddlePanel remounts on tab switch, so we
  // suppress layout on initial mount to prevent the "expand" animation.
  const [suppressLayout, setSuppressLayout] = useState(true);
  const suppressLayoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevLeftCollapsed = useRef(state.leftPanelCollapsed);
  const prevRightCollapsed = useRef(state.rightPanelCollapsed);

  // Allow layout animations after initial mount settles
  useEffect(() => {
    suppressLayoutTimerRef.current = setTimeout(() => {
      setSuppressLayout(false);
    }, 250);
    return () => {
      if (suppressLayoutTimerRef.current) clearTimeout(suppressLayoutTimerRef.current);
    };
  }, []);

  // Suppress layout during panel collapse/expand transitions (desktop)
  useEffect(() => {
    if (
      state.leftPanelCollapsed !== prevLeftCollapsed.current ||
      state.rightPanelCollapsed !== prevRightCollapsed.current
    ) {
      prevLeftCollapsed.current = state.leftPanelCollapsed;
      prevRightCollapsed.current = state.rightPanelCollapsed;
      setSuppressLayout(true);
      if (suppressLayoutTimerRef.current) clearTimeout(suppressLayoutTimerRef.current);
      suppressLayoutTimerRef.current = setTimeout(() => {
        setSuppressLayout(false);
      }, 250);
    }
  }, [state.leftPanelCollapsed, state.rightPanelCollapsed]);

  // Suppress layout during data fetches to prevent overlap when items array
  // is replaced in bulk (e.g., IndexedDB cache load → server sync, filter change).
  // We track the items array reference: when it changes, suppress layout briefly
  // so items snap into place instead of animating from stale positions.
  const prevItemsRef = useRef(state.items);
  const prevItemsLenRef = useRef(state.items.length);
  useEffect(() => {
    const prevItems = prevItemsRef.current;
    const prevLen = prevItemsLenRef.current;
    prevItemsRef.current = state.items;
    prevItemsLenRef.current = state.items.length;

    // Detect bulk replacement: different array reference AND significant length change
    // (single-item edits reuse the same length but still create a new array,
    //  so we also check if the first/last IDs shifted — a sign of a full reload)
    if (prevItems !== state.items) {
      const lenDelta = Math.abs(state.items.length - prevLen);
      const firstChanged = state.items[0]?.id !== prevItems[0]?.id;
      const lastChanged = state.items[state.items.length - 1]?.id !== prevItems[prevLen - 1]?.id;

      if (lenDelta >= 2 || (lenDelta >= 1 && (firstChanged || lastChanged)) || (firstChanged && lastChanged)) {
        setSuppressLayout(true);
        if (suppressLayoutTimerRef.current) clearTimeout(suppressLayoutTimerRef.current);
        suppressLayoutTimerRef.current = setTimeout(() => {
          setSuppressLayout(false);
        }, 100);
      }
    }
  }, [state.items]);


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    
    if (isTodoView) {
      // Todo view: flat list of items with uncompleted todos
      return { all: filtered };
    }

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

  // Map display section to storage section for drag operations
  const displayToStorageSection = (displaySection: DisplaySectionType): SectionType => {
    switch (displaySection) {
      case 'pinned':
        return 'now'; // Pinned items go to 'now' storage section
      case 'now':
        return 'now'; // Now display section maps to 'now' storage
      case 'do':
        return 'now'; // Do display section maps to 'now' storage
      case 'later':
        return 'later';
      case 'completed':
        return 'completed';
      default:
        return 'now';
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // Track the last processed drag state to prevent duplicate updates
  const lastDragStateRef = useRef<{ activeId: string; overId: string; section: string } | null>(null);

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) {
      setOverId(null);
      setDropPosition(null);
      return;
    }
    
    const overIdStr = over.id as string;
    setOverId(overIdStr);
    
    // Calculate drop position (before or after) based on cursor position
    const overRect = over.rect;
    if (overRect && event.activatorEvent instanceof MouseEvent) {
      const mouseY = event.activatorEvent.clientY;
      const midY = overRect.top + overRect.height / 2;
      setDropPosition(mouseY < midY ? 'before' : 'after');
    } else {
      setDropPosition('after');
    }

    // Don't process state updates during drag - only show visual feedback
    // All actual reordering happens in handleDragEnd
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // Clear drag state first
    setActiveId(null);
    setOverId(null);
    setDropPosition(null);
    lastDragStateRef.current = null;
    
    if (!over || active.id === over.id) {
      return;
    }
    
    const activeItem = state.items.find((item) => item.id === active.id);
    if (!activeItem) return;
    
    const overItem = state.items.find((item) => item.id === over.id);
    
    // Check if dropping on a display section header
    const targetDisplaySection = TASK_DISPLAY_SECTIONS.find((s) => s.id === over.id);
    const targetStorageSection = STORAGE_SECTIONS.find((s) => s.id === over.id);
    
    let targetSection: SectionType | null = null;
    let shouldSetDueDate = false;
    
    if (targetDisplaySection) {
      targetSection = displayToStorageSection(targetDisplaySection.id);
      // If dropping on "Now" display section, set due date to today
      if (targetDisplaySection.id === 'now' && activeItem.type === 'task') {
        shouldSetDueDate = true;
      }
    } else if (targetStorageSection) {
      targetSection = targetStorageSection.id;
    } else if (overItem && overItem.section !== activeItem.section) {
      targetSection = overItem.section;
    }

    // Move item to new section
    if (targetSection && targetSection !== activeItem.section) {
      // Don't move notes to completed
      if (activeItem.type === 'note' && targetSection === 'completed') {
        return;
      }
      
      // Calculate position in target section
      const targetItems = getItemsBySection(targetSection);
      let newOrder: number;
      
      if (overItem) {
        const insertIndex = targetItems.findIndex((item) => item.id === over.id);
        newOrder = insertIndex >= 0 ? insertIndex : targetItems.length;
      } else {
        newOrder = targetItems.length > 0 
          ? Math.max(...targetItems.map(i => i.order)) + 1 
          : 0;
      }
      
      // Move item to new section
      moveItem(activeItem.id, targetSection, newOrder);
      
      // If dropping on "Now" display section and task has no due date, set it to today
      if (shouldSetDueDate && activeItem.type === 'task' && !(activeItem as Task).dueDate) {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        updateItem({ ...activeItem, section: targetSection, dueDate: today.toISOString() } as Task);
      }
      
      // Reorder items in target section
      if (overItem) {
        const newItemIds = targetItems.filter(i => i.id !== activeItem.id).map(i => i.id);
        const insertIndex = targetItems.findIndex((item) => item.id === over.id);
        if (insertIndex >= 0) {
          newItemIds.splice(insertIndex, 0, activeItem.id);
        } else {
          newItemIds.push(activeItem.id);
        }
        reorderItems(targetSection, newItemIds);
      }
    } else if (overItem && overItem.section === activeItem.section) {
      // Same section - reorder items
      const sectionItems = getItemsBySection(activeItem.section);
      const oldIndex = sectionItems.findIndex((item) => item.id === active.id);
      const newIndex = sectionItems.findIndex((item) => item.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const newOrder = arrayMove(
          sectionItems.map((item) => item.id),
          oldIndex,
          newIndex
        );
        reorderItems(activeItem.section, newOrder);
      }
    }
  };

  const handleItemSelect = (id: string) => {
    selectItem(id);
    addRecentItem(id); // Track recently viewed items
    onItemSelect?.();
  };

  const activeItem = activeId ? state.items.find((item) => item.id === activeId) : null;

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
    
    if (isTodoView) {
      // Todo view: flat list of items with uncompleted checklists
      const allTodoItems = sortItems(organizedItems.all || []);
      
      return (
        <div className="space-y-0">
          <LayoutGroup>
            <SortableContext
              items={allTodoItems.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <AnimatePresence mode="popLayout">
                {allTodoItems.map((item) => {
                  const isOverItem = overId === item.id && activeId && activeId !== item.id;
                  const showIndicator = isOverItem ? dropPosition : null;
                  
                  return (
                    <SortableItem
                      key={item.id}
                      item={item}
                      isSelected={state.selectedItemId === item.id}
                      onSelect={() => handleItemSelect(item.id)}
                      onComplete={() => {}}
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
                      onDueDateChange={() => {}}
                      onTagClick={() => {
                        handleItemSelect(item.id);
                        dispatch({ type: 'OPEN_TAG_POPOVER' });
                      }}
                      tags={state.tags}
                      isDragDisabled={true}
                      showDropIndicator={showIndicator}
                      searchQuery={state.searchQuery}
                      hideListPill={false}
                      isMultiSelectMode={state.isMultiSelectMode}
                      isMultiSelected={state.selectedItemIds.includes(item.id)}
                      onToggleMultiSelect={() => dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: item.id })}
                      suppressLayout={suppressLayout}
                    />
                  );
                })}
              </AnimatePresence>
            </SortableContext>
          </LayoutGroup>
          {allTodoItems.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <CheckSquare className="w-12 h-12 opacity-30" />
              <div className="text-center">
                <p className="text-sm font-medium">All done!</p>
                <p className="text-xs mt-1 opacity-70">No items with uncompleted checklists</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (isNotesView) {
      // Notes view: Flat list of notes (no Pinned section - pinned items show in All Items view only)
      const allNotes = sortItems(organizedItems.all || []);
      const useVirtualization = allNotes.length > VIRTUALIZATION_THRESHOLD && state.sortOrder !== 'custom';
      
      if (useVirtualization) {
        // Use virtualized list for large datasets (100+ items)
        return (
          <div className="h-[calc(100vh-200px)]">
            <VirtualizedItemList
              items={allNotes}
              selectedItemId={state.selectedItemId}
              tags={state.tags}
              lists={state.lists}
              searchQuery={state.searchQuery}
              onSelect={handleItemSelect}
              onComplete={() => {}}
              onUncomplete={() => {}}
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
              hideListPill={isListView}
            />
          </div>
        );
      }

      // Use regular rendering for small datasets or when drag-and-drop is needed
      return (
        <div className="space-y-0">
          <LayoutGroup>
            <SortableContext
              items={allNotes.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <AnimatePresence mode="popLayout">
                {allNotes.map((item) => {
                  const isOverItem = overId === item.id && activeId && activeId !== item.id;
                  const showIndicator = isOverItem ? dropPosition : null;
                  
                  return (
                    <SortableItem
                      key={item.id}
                      item={item}
                      isSelected={state.selectedItemId === item.id}
                      onSelect={() => handleItemSelect(item.id)}
                      onComplete={() => {}}
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
                      onDueDateChange={() => {}}
                      onTagClick={() => {
                        handleItemSelect(item.id);
                        dispatch({ type: 'OPEN_TAG_POPOVER' });
                      }}
                      tags={state.tags}
                      isDragDisabled={state.sortOrder !== 'custom' || isMobile}
                      showDropIndicator={showIndicator}
                      searchQuery={state.searchQuery}
                      hideListPill={isListView}
                      isMultiSelectMode={state.isMultiSelectMode}
                      isMultiSelected={state.selectedItemIds.includes(item.id)}
                      onToggleMultiSelect={() => dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: item.id })}
                      suppressLayout={suppressLayout}
                    />
                  );
                })}
              </AnimatePresence>
            </SortableContext>
          </LayoutGroup>
          {allNotes.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <FileText className="w-12 h-12 opacity-30" />
              <div className="text-center">
                <p className="text-sm font-medium">No notes yet</p>
                <p className="text-xs mt-1 opacity-70">Create a note to get started</p>
              </div>
            </div>
          )}
        </div>
      );
    }
    
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
            <LayoutGroup>
            <SortableContext
              items={section.items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <AnimatePresence mode="popLayout">
                {section.items.map((item) => {
                  const isOverItem = overId === item.id && activeId && activeId !== item.id;
                  const showIndicator = isOverItem ? dropPosition : null;
                  
                  return (
                    <SortableItem
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
                      isDragDisabled={state.sortOrder !== 'custom' || isMobile}
                      showDropIndicator={showIndicator}
                      searchQuery={state.searchQuery}
                      hideListPill={isListView}
                      isMultiSelectMode={state.isMultiSelectMode}
                      isMultiSelected={state.selectedItemIds.includes(item.id)}
                      onToggleMultiSelect={() => dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: item.id })}
                      suppressLayout={suppressLayout}
                    />
                  );
                })}
              </AnimatePresence>
            </SortableContext>
            </LayoutGroup>
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
    if (isPinnedView) {
      const pinnedItems = sortItems(getFilteredItems());
      
      return (
        <div className="space-y-0">
          <LayoutGroup>
          <SortableContext
            items={pinnedItems.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <AnimatePresence mode="popLayout">
              {pinnedItems.map((item) => {
                const isOverItem = overId === item.id && activeId && activeId !== item.id;
                const showIndicator = isOverItem ? dropPosition : null;
                
                return (
                  <SortableItem
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
                    isDragDisabled={state.sortOrder !== 'custom' || isMobile}
                    showDropIndicator={showIndicator}
                    searchQuery={state.searchQuery}
                    hideListPill={isListView}
                    isMultiSelectMode={state.isMultiSelectMode}
                    isMultiSelected={state.selectedItemIds.includes(item.id)}
                    onToggleMultiSelect={() => dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: item.id })}
                    suppressLayout={suppressLayout}
                  />
                );
              })}
            </AnimatePresence>
          </SortableContext>
          </LayoutGroup>
          {pinnedItems.length === 0 && (
            <div className="py-8 flex flex-col items-center justify-center gap-2 text-muted-foreground text-sm">
              <Pin className="w-8 h-8 opacity-40" />
              <span>No pinned items yet</span>
            </div>
          )}
        </div>
      );
    }
    
    // Completed view: flat list without sections
    if (isCompletedView) {
      const completedItems = sortItems(getFilteredItems());
      const useVirtualization = completedItems.length > VIRTUALIZATION_THRESHOLD && state.sortOrder !== 'custom';
      
      if (useVirtualization) {
        // Use virtualized list for large datasets (100+ items)
        return (
          <div className="h-[calc(100vh-200px)]">
            <VirtualizedItemList
              items={completedItems}
              selectedItemId={state.selectedItemId}
              tags={state.tags}
              lists={state.lists}
              searchQuery={state.searchQuery}
              onSelect={handleItemSelect}
              onComplete={(id) => {
                const item = state.items.find(i => i.id === id);
                if (item?.type === 'task') {
                  (item as Task).isCompleted ? uncompleteTask(id) : completeTask(id);
                }
              }}
              onUncomplete={(id) => uncompleteTask(id)}
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
              hideListPill={isListView}
            />
          </div>
        );
      }
      
      return (
        <div className="space-y-0">
          <LayoutGroup>
          <SortableContext
            items={completedItems.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <AnimatePresence mode="popLayout">
              {completedItems.map((item) => {
                const isOverItem = overId === item.id && activeId && activeId !== item.id;
                const showIndicator = isOverItem ? dropPosition : null;
                
                return (
                  <SortableItem
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
                    isDragDisabled={state.sortOrder !== 'custom' || isMobile}
                    showDropIndicator={showIndicator}
                    searchQuery={state.searchQuery}
                    hideListPill={isListView}
                    isMultiSelectMode={state.isMultiSelectMode}
                    isMultiSelected={state.selectedItemIds.includes(item.id)}
                    onToggleMultiSelect={() => dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: item.id })}
                    suppressLayout={suppressLayout}
                  />
                );
              })}
            </AnimatePresence>
          </SortableContext>
          </LayoutGroup>
          {completedItems.length === 0 && (
            <div className="py-8 flex flex-col items-center justify-center gap-2 text-muted-foreground text-sm">
              <CheckCircle2 className="w-8 h-8 opacity-40" />
              <span>No completed items yet</span>
            </div>
          )}
        </div>
      );
    }
    
    // All Items view: Flat list (no sections)
    if (isAllItemsView) {
      const allItems = sortItems(getFilteredItems());
      const useVirtualization = allItems.length > VIRTUALIZATION_THRESHOLD && state.sortOrder !== 'custom';
      
      if (useVirtualization) {
        return (
          <div className="h-[calc(100vh-200px)]">
            <VirtualizedItemList
              items={allItems}
              selectedItemId={state.selectedItemId}
              tags={state.tags}
              lists={state.lists}
              searchQuery={state.searchQuery}
              onSelect={handleItemSelect}
              onComplete={() => {}}
              onUncomplete={() => {}}
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
              hideListPill={false}
            />
          </div>
        );
      }

      return (
        <div className="space-y-0">
          <LayoutGroup>
            <SortableContext
              items={allItems.map((item: Item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <AnimatePresence mode="popLayout">
              {allItems.map((item: Item) => {
                const isOverItem = overId === item.id && activeId && activeId !== item.id;
                const showIndicator = isOverItem ? dropPosition : null;
                
                return (
                  <SortableItem
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
                    isDragDisabled={state.sortOrder !== 'custom' || isMobile}
                    showDropIndicator={showIndicator}
                    searchQuery={state.searchQuery}
                    hideListPill={false}
                    isMultiSelectMode={state.isMultiSelectMode}
                    isMultiSelected={state.selectedItemIds.includes(item.id)}
                    onToggleMultiSelect={() => dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: item.id })}
                    suppressLayout={suppressLayout}
                  />
                );
              })}
            </AnimatePresence>
          </SortableContext>
          </LayoutGroup>
          {allItems.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Sparkles className="w-12 h-12 opacity-30" />
              <div className="text-center">
                <p className="text-sm font-medium">No items yet</p>
                <p className="text-xs mt-1 opacity-70">Create a task or note to get started</p>
              </div>
            </div>
          )}
        </div>
      );
    }
    
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
            <LayoutGroup>
            <SortableContext
              items={section.items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <AnimatePresence mode="popLayout">
                {section.items.map((item) => {
                  const isOverItem = overId === item.id && activeId && activeId !== item.id;
                  const showIndicator = isOverItem ? dropPosition : null;
                  
                  return (
                    <SortableItem
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
                      isDragDisabled={state.sortOrder !== 'custom' || isMobile}
                      showDropIndicator={showIndicator}
                      searchQuery={state.searchQuery}
                      hideListPill={false}
                      isMultiSelectMode={state.isMultiSelectMode}
                      isMultiSelected={state.selectedItemIds.includes(item.id)}
                      onToggleMultiSelect={() => dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: item.id })}
                      suppressLayout={suppressLayout}
                    />
                  );
                })}
              </AnimatePresence>
            </SortableContext>
            </LayoutGroup>
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
    if (isTagView) {
      const allTagItems = sortItems(getFilteredItems());
      const useVirtualization = allTagItems.length > VIRTUALIZATION_THRESHOLD && state.sortOrder !== 'custom';
      
      if (useVirtualization) {
        return (
          <div className="h-[calc(100vh-200px)]">
            <VirtualizedItemList
              items={allTagItems}
              selectedItemId={state.selectedItemId}
              tags={state.tags}
              lists={state.lists}
              searchQuery={state.searchQuery}
              onSelect={handleItemSelect}
              onComplete={() => {}}
              onUncomplete={() => {}}
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
              hideListPill={false}
            />
          </div>
        );
      }
      
      return (
        <div className="space-y-0">
          <LayoutGroup>
          <SortableContext
            items={allTagItems.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <AnimatePresence mode="popLayout">
              {allTagItems.map((item) => {
                const isOverItem = overId === item.id && activeId && activeId !== item.id;
                const showIndicator = isOverItem ? dropPosition : null;
                
                return (
                  <SortableItem
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
                    isDragDisabled={state.sortOrder !== 'custom' || isMobile}
                    showDropIndicator={showIndicator}
                    searchQuery={state.searchQuery}
                    hideListPill={false}
                    isMultiSelectMode={state.isMultiSelectMode}
                    isMultiSelected={state.selectedItemIds.includes(item.id)}
                    onToggleMultiSelect={() => dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: item.id })}
                    suppressLayout={suppressLayout}
                  />
                );
              })}
            </AnimatePresence>
          </SortableContext>
          </LayoutGroup>
          {allTagItems.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Tag className="w-12 h-12 opacity-30" />
              <div className="text-center">
                <p className="text-sm font-medium">No items with this tag</p>
                <p className="text-xs mt-1 opacity-70">Tag items to see them here</p>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    // Note-type List view: Flat list (no sections, same as Notes view)
    if (isNoteListView) {
      const allNoteListItems = sortItems(getFilteredItems());
      const useVirtualization = allNoteListItems.length > VIRTUALIZATION_THRESHOLD && state.sortOrder !== 'custom';
      
      if (useVirtualization) {
        return (
          <div className="h-[calc(100vh-200px)]">
            <VirtualizedItemList
              items={allNoteListItems}
              selectedItemId={state.selectedItemId}
              tags={state.tags}
              lists={state.lists}
              searchQuery={state.searchQuery}
              onSelect={handleItemSelect}
              onComplete={() => {}}
              onUncomplete={() => {}}
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
              hideListPill={true}
            />
          </div>
        );
      }

      return (
        <div className="space-y-0">
          <LayoutGroup>
            <SortableContext
              items={allNoteListItems.map((item: Item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <AnimatePresence mode="popLayout">
              {allNoteListItems.map((item) => {
                const isOverItem = overId === item.id && activeId && activeId !== item.id;
                const showIndicator = isOverItem ? dropPosition : null;
                
                return (
                  <SortableItem
                    key={item.id}
                    item={item}
                    isSelected={state.selectedItemId === item.id}
                    onSelect={() => handleItemSelect(item.id)}
                    onComplete={() => {}}
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
                    onDueDateChange={() => {}}
                    onTagClick={() => {
                      handleItemSelect(item.id);
                      dispatch({ type: 'OPEN_TAG_POPOVER' });
                    }}
                    tags={state.tags}
                    isDragDisabled={state.sortOrder !== 'custom' || isMobile}
                    showDropIndicator={showIndicator}
                    searchQuery={state.searchQuery}
                    hideListPill={true}
                    isMultiSelectMode={state.isMultiSelectMode}
                    isMultiSelected={state.selectedItemIds.includes(item.id)}
                    onToggleMultiSelect={() => dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: item.id })}
                    suppressLayout={suppressLayout}
                  />
                );
              })}
            </AnimatePresence>
          </SortableContext>
          </LayoutGroup>
          {allNoteListItems.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <FileText className="w-12 h-12 opacity-30" />
              <div className="text-center">
                <p className="text-sm font-medium">No notes in this list</p>
                <p className="text-xs mt-1 opacity-70">Create a note to get started</p>
              </div>
            </div>
          )}
        </div>
      );
    }
    
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
          <LayoutGroup>
          <SortableContext
            items={section.items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <AnimatePresence mode="popLayout">
              {section.items.map((item) => {
                const isOverItem = overId === item.id && activeId && activeId !== item.id;
                const showIndicator = isOverItem ? dropPosition : null;
                
                return (
                  <SortableItem
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
                    isDragDisabled={state.sortOrder !== 'custom' || isMobile}
                    showDropIndicator={showIndicator}
                    searchQuery={state.searchQuery}
                    hideListPill={isListView}
                    isMultiSelectMode={state.isMultiSelectMode}
                    isMultiSelected={state.selectedItemIds.includes(item.id)}
                    onToggleMultiSelect={() => dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: item.id })}
                    suppressLayout={suppressLayout}
                  />
                );
              })}
            </AnimatePresence>
          </SortableContext>
          </LayoutGroup>
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
    if (isTodoView) return { title: 'Todo', icon: CheckSquare, color: '#fbbf24' }; // amber-400 color
    if (isMiscellaneousView) return { title: 'Miscellaneous', icon: LayoutGrid, color: '#a78bfa' }; // violet-400 color
    if (isCompletedView) return { title: 'Completed', icon: CheckCircle2, color: '#34d399' }; // emerald-400 color
    if (isTrashView) return { title: 'Recently Deleted', icon: Trash2, color: undefined };
    if (isPinnedView) return { title: 'Pinned', icon: Pin, color: undefined };
    if (isTagView && currentTag) return { title: currentTag.name, icon: null, color: currentTag.color };
    if (isListView && currentList) return { title: currentList.name, icon: FolderOpen, color: currentList.color };
    return { title: 'Items', icon: LayoutGrid, color: undefined };
  };
  
  const viewInfo = getViewInfo();

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
                  <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
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
        <ScrollArea 
          className="h-full custom-scrollbar" 
          ref={scrollViewportRef}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="p-3 space-y-4">
              {renderSections()}
              {/* Bottom spacer for mobile tab bar + safe area */}
              <div className="shrink-0 md:hidden" style={{ height: 'calc(3.5rem + max(0.5rem, env(safe-area-inset-bottom)))' }} />
            </div>

          <DragOverlay>
            {activeItem && (
              <ItemCard
                item={activeItem}
                isSelected={false}
                isDragging
                tags={state.tags}
              />
            )}
          </DragOverlay>
        </DndContext>
      </ScrollArea>
      </div>
    </div>
  );
}

interface SectionProps {
  id: string;
  title: string;
  count: number;
  isCollapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  color?: string;
  description?: string;
  hideHeader?: boolean;
}

const Section = memo(function Section({ id, title, count, isCollapsed, onToggle, children, icon, color, description, hideHeader }: SectionProps) {
  const { setNodeRef } = useSortable({
    id,
    data: { type: 'section' },
  });

  if (hideHeader) {
    return (
      <div ref={setNodeRef} className="space-y-0">
        {children}
      </div>
    );
  }

  return (
    <div ref={setNodeRef} className="space-y-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center py-1.5 pl-3 pr-3 rounded-md hover:bg-muted/40 transition-colors group"
      >
        {/* Icon - aligned with list item checkbox */}
        {icon && <span className={cn("shrink-0", color || "text-muted-foreground")}>{icon}</span>}
        {/* Title - left aligned with list item title */}
        <span className={cn("text-sm font-semibold ml-2", color || "text-foreground")}>{title}</span>
        {/* Chevron - next to title, hidden when expanded (shows on hover), always visible when collapsed */}
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 90 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn(
            "w-4 h-4 flex items-center justify-center shrink-0 text-muted-foreground ml-1 transition-opacity duration-200",
            isCollapsed ? "opacity-100" : "opacity-0 group-hover:opacity-60"
          )}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.div>
        {/* Spacer to push count to right */}
        <span className="flex-1" />
        {/* Count - right aligned */}
        {count > 0 && <span className="text-xs text-muted-foreground font-mono">{count}</span>}
      </button>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="space-y-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

interface SortableItemProps {
  item: Item;
  isSelected: boolean;
  onSelect: () => void;
  onComplete: () => void;
  onTitleChange: (newTitle: string) => void;
  onDelete: () => void;
  onMove: (section: SectionType) => void;
  onPin: () => void;
  onMoveToTop: () => void;
  onDuplicate: () => void;
  onDueDateChange: (date: Date | undefined) => void;
  onTagClick: () => void;
  tags: { id: string; name: string; color: string }[];
  isDragDisabled?: boolean;
  showDropIndicator?: 'before' | 'after' | null;
  searchQuery?: string;
  hideListPill?: boolean;
  isMultiSelectMode?: boolean;
  isMultiSelected?: boolean;
  onToggleMultiSelect?: () => void;
  suppressLayout?: boolean;
}

function sortableItemAreEqual(prev: SortableItemProps, next: SortableItemProps): boolean {
  return (
    prev.item === next.item &&
    prev.isSelected === next.isSelected &&
    prev.isDragDisabled === next.isDragDisabled &&
    prev.showDropIndicator === next.showDropIndicator &&
    prev.searchQuery === next.searchQuery &&
    prev.hideListPill === next.hideListPill &&
    prev.isMultiSelectMode === next.isMultiSelectMode &&
    prev.isMultiSelected === next.isMultiSelected &&
    prev.tags === next.tags &&
    prev.suppressLayout === next.suppressLayout
  );
}

const SortableItem = memo(function SortableItem({ item, isSelected, onSelect, onComplete, onTitleChange, onDelete, onMove, onPin, onMoveToTop, onDuplicate, onDueDateChange, onTagClick, tags, isDragDisabled, showDropIndicator, searchQuery, hideListPill, isMultiSelectMode, isMultiSelected, onToggleMultiSelect, suppressLayout }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: item.id,
    disabled: isDragDisabled,
  });

  // Combine dnd-kit transform with smooth layout transitions
  // When drag is disabled (non-custom sort), let Framer Motion handle layout animations
  // When drag is enabled, dnd-kit manages transforms directly
  const style: React.CSSProperties = isDragDisabled
    ? {
        opacity: 1,
      }
    : {
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? transition : `${transition || ''}, opacity 0.25s ease`.replace(/^, /, ''),
        opacity: isDragging ? 0.4 : 1,
        pointerEvents: isDragging ? 'none' : 'auto',
      };

  // Drop indicator line component
  const DropIndicator = () => (
    <div className="h-0.5 bg-primary rounded-full mx-2 my-1 shadow-sm shadow-primary/50" />
  );

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="touch-manipulation"
      layout={isDragDisabled && !suppressLayout ? 'position' : false}
      initial={false}
      animate={{ opacity: isDragging ? 0.4 : 1 }}
      exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, overflow: 'hidden' }}
      transition={{
        layout: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 },
        height: { duration: 0.2 },
      }}
    >
      {showDropIndicator === 'before' && <DropIndicator />}
      <ItemCard
        item={item}
        isSelected={isSelected}
        onSelect={onSelect}
        onComplete={onComplete}
        onTitleChange={onTitleChange}
        onDelete={onDelete}
        onMove={onMove}
        onPin={onPin}
        onMoveToTop={onMoveToTop}
        onDuplicate={onDuplicate}
        onDueDateChange={onDueDateChange}
        onTagClick={onTagClick}
        tags={tags}
        dragHandleProps={isDragDisabled ? undefined : { ...attributes, ...listeners }}
        isDragDisabled={isDragDisabled}
        searchQuery={searchQuery}
        hideListPill={hideListPill}
        isMultiSelectMode={isMultiSelectMode}
        isMultiSelected={isMultiSelected}
        onToggleMultiSelect={onToggleMultiSelect}
      />
      {showDropIndicator === 'after' && <DropIndicator />}
     </motion.div>
  );
}, sortableItemAreEqual);
interface ItemCardProps {
  item: Item;
  isSelected: boolean;
  onSelect?: () => void;
  onComplete?: () => void;
  onTitleChange?: (newTitle: string) => void;
  onDelete?: () => void;
  onMove?: (section: SectionType) => void;
  onPin?: () => void;
  onMoveToTop?: () => void;
  onDuplicate?: () => void;
  onDueDateChange?: (date: Date | undefined) => void;
  onTagClick?: () => void;
  isDragging?: boolean;
  tags: { id: string; name: string; color: string }[];
  dragHandleProps?: Record<string, unknown>;
  isDragDisabled?: boolean;
  searchQuery?: string;
  hideListPill?: boolean;
  isMultiSelectMode?: boolean;
  isMultiSelected?: boolean;
  onToggleMultiSelect?: () => void;
}

function itemCardAreEqual(prev: ItemCardProps, next: ItemCardProps): boolean {
  // Compare data props that affect rendering, skip callback references
  if (prev.item !== next.item) {
    const p = prev.item;
    const n = next.item;
    if (
      p.id !== n.id ||
      p.title !== n.title ||
      p.type !== n.type ||
      p.section !== n.section ||
      p.isPinned !== n.isPinned ||
      p.order !== n.order ||
      p.updatedAt !== n.updatedAt ||
      p.content !== n.content ||
      p.listId !== n.listId
    ) return false;
    if (p.type === 'task' && n.type === 'task') {
      const pt = p as any;
      const nt = n as any;
      if (pt.isCompleted !== nt.isCompleted || pt.dueDate !== nt.dueDate) return false;
    }
    const pTags = (p as any).tagIds || [];
    const nTags = (n as any).tagIds || [];
    if (pTags.length !== nTags.length || pTags.some((t: string, i: number) => t !== nTags[i])) return false;
  }
  return (
    prev.isSelected === next.isSelected &&
    prev.isDragging === next.isDragging &&
    prev.isDragDisabled === next.isDragDisabled &&
    prev.searchQuery === next.searchQuery &&
    prev.hideListPill === next.hideListPill &&
    prev.isMultiSelectMode === next.isMultiSelectMode &&
    prev.isMultiSelected === next.isMultiSelected &&
    prev.tags === next.tags
  );
}

const ItemCard = memo(function ItemCard({
  item,
  isSelected,
  onSelect,
  onComplete,
  onTitleChange,
  onDelete,
  onMove,
  onPin,
  onMoveToTop,
  onDuplicate,
  onDueDateChange,
  onTagClick,
  isDragging,
  tags,
  dragHandleProps,
  isDragDisabled,
  searchQuery,
  hideListPill,
  isMultiSelectMode,
  isMultiSelected,
  onToggleMultiSelect,
}: ItemCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);

  const inputRef = useRef<HTMLInputElement>(null);
  
  const itemTags = tags.filter((tag) => item.tags.includes(tag.id));
  const isTask = item.type === 'task';
  const isCompleted = isTask && (item as Task).isCompleted;
  
  // Confetti state - triggers when task transitions from incomplete to complete
  const [showConfetti, setShowConfetti] = useState(false);
  const prevCompletedRef = useRef(isCompleted);
  
  useEffect(() => {
    if (isTask && isCompleted && !prevCompletedRef.current) {
      setShowConfetti(true);
    }
    prevCompletedRef.current = isCompleted;
  }, [isCompleted, isTask]);
  
  // Swipe state for mobile
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwipeRevealed, setIsSwipeRevealed] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const SWIPE_THRESHOLD = 80; // pixels to reveal actions
  
  const swipeHandlers = useSwipeable({
    onSwiping: (e) => {
      if (e.dir === 'Left') {
        setSwipeOffset(Math.min(e.deltaX * -1, 160)); // Max reveal 160px
      } else if (e.dir === 'Right' && isSwipeRevealed) {
        setSwipeOffset(Math.max(160 - e.deltaX, 0));
      }
    },
    onSwipedLeft: (e) => {
      if (Math.abs(e.deltaX) > SWIPE_THRESHOLD) {
        setSwipeOffset(160);
        setIsSwipeRevealed(true);
      } else {
        setSwipeOffset(0);
        setIsSwipeRevealed(false);
      }
    },
    onSwipedRight: () => {
      setSwipeOffset(0);
      setIsSwipeRevealed(false);
    },
    trackMouse: false,
    trackTouch: true,
    preventScrollOnSwipe: false, // Allow vertical scroll, only prevent on horizontal swipe
    delta: 10, // Minimum distance before swipe is detected
    swipeDuration: 500, // Maximum time for swipe gesture
  });
  
  // Reset swipe when item changes or is deselected
  useEffect(() => {
    if (!isSelected) {
      setSwipeOffset(0);
      setIsSwipeRevealed(false);
    }
  }, [isSelected]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditTitle(item.title);
  }, [item.title]);

  const handleTitleSubmit = () => {
    if (editTitle.trim() && editTitle !== item.title) {
      onTitleChange?.(editTitle.trim());
    } else {
      setEditTitle(item.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setEditTitle(item.title);
      setIsEditing(false);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  // Handle native drag start for cross-panel dragging (to tags)
  const handleNativeDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ itemId: item.id }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="relative rounded-lg overflow-hidden border-b border-border/40">
      {/* Swipe action buttons (revealed on swipe left - mobile only) */}
      {swipeOffset > 0 && (
        <div 
          className="absolute right-0 top-0 bottom-0 flex items-stretch z-0"
          style={{ width: `${swipeOffset}px` }}
        >
          <DropdownMenu open={showMobileMenu} onOpenChange={setShowMobileMenu}>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMobileMenu(true);
                }}
                className="flex-1 flex flex-col items-center justify-center gap-1 bg-muted hover:bg-muted/80 transition-colors"
                title="More options"
              >
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">More</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {/* Pin/Unpin option */}
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onPin?.();
                  setSwipeOffset(0);
                  setIsSwipeRevealed(false);
                  setShowMobileMenu(false);
                }}
              >
                <Pin className="w-4 h-4 mr-2" />
                {item.isPinned ? 'Unpin' : 'Pin'}
              </DropdownMenuItem>
              {/* Duplicate option */}
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate?.();
                  setSwipeOffset(0);
                  setIsSwipeRevealed(false);
                  setShowMobileMenu(false);
                }}
              >
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              {/* Move to top option */}
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveToTop?.();
                  setSwipeOffset(0);
                  setIsSwipeRevealed(false);
                  setShowMobileMenu(false);
                }}
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Move to top
              </DropdownMenuItem>
              {item.type === 'task' && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Move to
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => {
                        onMove?.('now');
                        setSwipeOffset(0);
                        setIsSwipeRevealed(false);
                        setShowMobileMenu(false);
                      }}>
                        <Sun className="w-4 h-4 mr-2 text-amber-500" />
                        Do
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        onMove?.('later');
                        setSwipeOffset(0);
                        setIsSwipeRevealed(false);
                        setShowMobileMenu(false);
                      }}>
                        <Clock className="w-4 h-4 mr-2 text-sky-500" />
                        Later
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        onMove?.('completed');
                        setSwipeOffset(0);
                        setIsSwipeRevealed(false);
                        setShowMobileMenu(false);
                      }}>
                        <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />
                        Completed
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.();
                  setSwipeOffset(0);
                  setIsSwipeRevealed(false);
                  setShowMobileMenu(false);
                }}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
              setSwipeOffset(0);
              setIsSwipeRevealed(false);
            }}
            className="flex-1 flex flex-col items-center justify-center gap-1 bg-destructive hover:bg-destructive/90 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-5 h-5 text-destructive-foreground" />
            <span className="text-xs text-destructive-foreground">Delete</span>
          </button>
        </div>
      )}
      
      {/* Main content with swipe transform */}
      <div
        {...swipeHandlers}
        onClick={onSelect}
        draggable={isDragDisabled}
        onDragStart={isDragDisabled ? handleNativeDragStart : undefined}
        {...(!isDragDisabled ? dragHandleProps : {})}

        style={{
          transform: `translateX(-${swipeOffset}px)`,
          transition: swipeOffset === 0 || swipeOffset === 160 ? 'transform 0.2s ease-out' : 'none',
        }}
        className={cn(
          'group relative py-3 pr-3 pl-3 rounded-lg transition-colors duration-150 cursor-pointer select-none bg-background',
          isSelected
            ? ITEM_SELECTED
            : 'bg-transparent ' + ITEM_HOVER,
          isDragging && ITEM_DRAGGING
        )}
      >

      {/* Flexbox layout for icon and content */}
      <div className="flex items-start gap-2">
        {/* Multi-select checkbox */}
        {isMultiSelectMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMultiSelect?.();
            }}
            className="shrink-0 mt-0.5"
          >
            {isMultiSelected ? (
              <CheckSquare className="w-4 h-4 text-primary" />
            ) : (
              <Square className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
            )}
          </button>
        )}
        
        {/* Checkbox or Icon - aligned with first line of title */}
        <div className="shrink-0 flex items-center h-[22px] relative">
          {isTask ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onComplete?.();
              }}
              className="flex items-center justify-center relative"
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className={showConfetti ? 'completion-ring-pulse' : ''}
                >
                  <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500" />
                </motion.div>
              ) : (
                <Circle className="w-[18px] h-[18px] text-muted-foreground hover:text-primary transition-colors" />
              )}
              <CheckConfetti
                trigger={showConfetti}
                onComplete={() => setShowConfetti(false)}
              />
            </button>
          ) : (
            <FileText className="w-[18px] h-[18px] text-muted-foreground" />
          )}
        </div>

        {/* Content - starts after icon, aligned with section title */}
        <div className="min-w-0 flex-1">
          {/* Title row with date pill and action icons on the right */}
          <div className="flex items-start justify-between gap-2">
            {/* Title - max 2 lines */}
            <div className="min-w-0 flex-1">
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={handleTitleSubmit}
                  onKeyDown={handleKeyDown}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    'w-full text-sm font-medium bg-transparent border-b border-primary/50 outline-none px-0 py-0',
                    isCompleted ? 'text-muted-foreground' : 'text-foreground'
                  )}
                />
              ) : (
                <h4
                  onDoubleClick={handleDoubleClick}
                  className={cn(
                    'text-sm font-medium line-clamp-2',
                    isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'
                  )}
                >
                  {searchQuery ? highlightText(item.title || 'Untitled', searchQuery) : (item.title ? linkifyTitle(item.title).elements : 'Untitled')}
                </h4>
              )}
            </div>

            {/* Right side: Pin icon → 3-dot menu (rightmost) */}
            <div className="flex items-center shrink-0">
              {/* Pin icon - hidden by default, expands on hover like Momentum */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPin?.();
                }}
                className={cn(
                  'h-5 shrink-0 rounded transition-all duration-200 overflow-hidden flex items-center justify-center',
                  item.isPinned 
                    ? 'w-5 opacity-100 text-primary hover:bg-muted' 
                    : 'w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-muted-foreground hover:text-primary hover:bg-muted'
                )}
                title={item.isPinned ? 'Unpin' : 'Pin'}
              >
                <Pin className={cn('w-3.5 h-3.5', !item.isPinned && 'rotate-45')} />
              </button>

              {/* 3-dot menu - hidden by default, appears on hover, rightmost */}
              {!isEditing && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="h-5 shrink-0 rounded transition-all duration-200 overflow-hidden flex items-center justify-center w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 hover:bg-muted"
                      title="More options"
                    >
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {/* Pin/Unpin option */}
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onPin?.();
                      }}
                    >
                      <Pin className="w-4 h-4 mr-2" />
                      {item.isPinned ? 'Unpin' : 'Pin'}
                    </DropdownMenuItem>
                    {/* Duplicate option */}
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicate?.();
                      }}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    {/* Move to top option */}
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveToTop?.();
                      }}
                    >
                      <ArrowUp className="w-4 h-4 mr-2" />
                      Move to top
                    </DropdownMenuItem>
                    {item.type === 'task' && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <ArrowRight className="w-4 h-4 mr-2" />
                            Move to
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => onMove?.('now')}>
                              <Sun className="w-4 h-4 mr-2 text-amber-500" />
                              Do
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onMove?.('later')}>
                              <Clock className="w-4 h-4 mr-2 text-sky-500" />
                              Later
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onMove?.('completed')}>
                              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />
                              Completed
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.();
                      }}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* First-line content link */}
          {(() => {
            const firstLink = extractFirstLineLink(item.content);
            if (firstLink) {
              return (
                <div className="mt-1">
                  {renderFirstLineLink(firstLink)}
                </div>
              );
            }
            return null;
          })()}

          {/* Preview text */}
          {item.content && !extractFirstLineLink(item.content) && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {searchQuery 
                ? highlightText(getMatchSnippet(item.content.replace(/<[^>]*>/g, ''), searchQuery, 100), searchQuery)
                : item.content.replace(/<[^>]*>/g, '').slice(0, 100)}
            </p>
          )}

          {/* Bottom row: Date pill (right-aligned) then Tags */}
          {(isTask && (item as Task).dueDate) || item.listId || itemTags.length > 0 ? (
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              {/* Date pill - rendered first, positioned at bottom-right via ml-auto if no tags */}
              {isTask && (item as Task).dueDate && (
                <DatePill
                  dueDate={(item as Task).dueDate}
                  onDateChange={(date) => onDueDateChange?.(date)}
                  size="sm"
                  showPlaceholder={false}
                />
              )}
              {/* List pill - hidden when viewing a specific list */}
              {item.listId && !hideListPill && (
                <ListPill
                  listId={item.listId}
                  itemId={item.id}
                  itemType={item.type}
                  size="sm"
                />
              )}
              {/* Tag pills - clickable to open inline tag popover */}
              {itemTags.slice(0, 3).map((tag) => (
                <TagPill
                  key={tag.id}
                  tag={tag}
                  itemId={item.id}
                  size="sm"
                />
              ))}
            </div>
          ) : null}
        </div>
          </div>
      </div>
    </div>
  );
}, itemCardAreEqual);
