/**
 * useItemOperations — All item CRUD operations extracted from ServerMomentumContext.
 *
 * This hook owns: createTask, createNote, duplicateItem, updateItem,
 * softDeleteItem/deleteItem, restoreItem, permanentDeleteItem, emptyTrash,
 * getTrashItems, undoLastDelete, selectItem, fetchAndSelectItem, togglePin,
 * completeTask, uncompleteTask, moveItem, reorderItems, getTopSortOrder,
 * flushPendingSave, and bulk operations (bulkAddTag, bulkRemoveTag,
 * bulkDeleteItems, bulkSetList).
 *
 * Dependencies are passed via a deps object to avoid circular imports.
 * The main provider calls this hook and spreads its return values into the context.
 */
import { useCallback, useRef, useEffect } from 'react';
import { apiQuery } from '@/lib/apiClient';
import { format } from 'date-fns';
import { toast } from '@/lib/toast';
import { clearSearchCache } from '@/lib/serverSearch';
import { markItemDirty, markItemsDirty, flushNow as flushAutoBackup } from '@/lib/autoBackup';
import { wikiLinkCache } from '@/lib/wikiLinkCache';
import type {
  Item,
  Task,
  Note,
  Tag,
  SectionType,
  SortOrder,
  FilterType,
} from '@/types';
import { dbRowToItem } from '@/lib/queries';

/** Check if markdown content contains uncompleted todo checkboxes (- [ ]) with actual text.
 *  Empty todo items (no text after the checkbox) are ignored. */
function hasUncompletedTodos(content: string | undefined | null): boolean {
  if (!content) return false;
  // Strip HTML tags to get the raw text, then check line-by-line
  const text = content.replace(/<[^>]*>/g, ' ');
  // Match "- [ ]" followed by at least one non-whitespace character on the same line
  return /- \[ \][^\S\n]*\S/.test(text);
}


/** Offline queue entry shape (matches offlineQueue module) */
interface QueueEntry {
  mutationType: 'insert' | 'update' | 'delete';
  table: string;
  payload: Record<string, any>;
  filterColumn?: string;
  filterValue?: string;
}

/**
 * Dependencies injected by the main provider.
 * Using an object avoids long parameter lists and makes additions easy.
 */
export interface ItemOperationsDeps {
  dispatch: React.Dispatch<any>;
  userId: string;
  /** Ref to current items array (avoids stale closures) */
  itemsRef: React.MutableRefObject<Item[]>;
  /** Ref to current tags array */
  tagsRef: React.MutableRefObject<Tag[]>;
  /** Ref to current selectedItemId */
  selectedItemIdRef: React.MutableRefObject<string | null>;
  /** Ref tracking items with pending optimistic updates */
  pendingUpdatesRef: React.MutableRefObject<Set<string>>;
  /** Ref tracking tags created in the current synchronous batch */
  pendingTagsRef: React.MutableRefObject<Map<string, Tag>>;
  /** Ref tracking undo stack for soft-deleted items */
  undoStackRef: React.MutableRefObject<{ item: Item; timestamp: number }[]>;
  /** Ref to injected item IDs */
  injectedItemIdsRef: React.MutableRefObject<Set<string>>;
  /** Whether the client is online */
  isOnlineRef: React.MutableRefObject<boolean>;
  /** Enqueue a mutation for offline sync */
  enqueueOffline: (entry: QueueEntry) => void;
  /** Refresh sidebar counts */
  refreshCounts: () => Promise<void>;
  /** Optimistically update sidebar counts */
  setSidebarCounts: React.Dispatch<React.SetStateAction<{
    all: number; tasks: number; notes: number; pinned: number;
    completed: number; trash: number; miscellaneous: number; todo: number;
  } | null>>;
  /** Set isFetchingItem loading state */
  setIsFetchingItem: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useItemOperations(deps: ItemOperationsDeps) {
  const {
    dispatch,
    userId,
    itemsRef,
    tagsRef,
    selectedItemIdRef,
    pendingUpdatesRef,
    pendingTagsRef,
    undoStackRef,
    isOnlineRef,
    enqueueOffline,
    refreshCounts,
    setSidebarCounts,
    setIsFetchingItem,
  } = deps;

  // ---- Helper: get top sort order ----
  const getTopSortOrder = useCallback(() => {
    const orders = itemsRef.current.filter(i => !i.deletedAt).map(i => i.order);
    if (orders.length === 0) return 0;
    const minOrder = Math.min(...orders);
    return Math.max(minOrder - 1, -2147483648);
  }, []);

  // ---- Debounced save mechanism ----
  const debouncedSaveTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const latestItemData = useRef<Map<string, Item>>(new Map());

  const flushPendingSave = useCallback((itemId: string) => {
    const timer = debouncedSaveTimers.current.get(itemId);
    if (timer) {
      clearTimeout(timer);
      debouncedSaveTimers.current.delete(itemId);
    }
    const item = latestItemData.current.get(itemId);
    if (item) {
      latestItemData.current.delete(itemId);
      const searchContent = item.content?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || '';
      const flushPayload = {
        title: item.title,
        content: item.content,
        list_id: item.listId || null,
        is_pinned: item.isPinned,
        is_completed: item.type === 'task' ? (item as Task).isCompleted : false,
        section: item.section,
        sort_order: item.order,
        due_date: item.type === 'task' ? (item as Task).dueDate || null : null,
        search_content: searchContent,
        updated_at: item.updatedAt,
        has_uncompleted_todos: hasUncompletedTodos(item.content),
      };
      if (!isOnlineRef.current) {
        enqueueOffline({ mutationType: 'update', table: 'items', payload: flushPayload, filterColumn: 'id', filterValue: item.id });
        pendingUpdatesRef.current.delete(item.id);
      } else {
        apiQuery({ action: 'update', table: 'items', data: flushPayload, filters: { id: item.id } }).then(({ error }) => {
          if (error) {
            enqueueOffline({ mutationType: 'update', table: 'items', payload: flushPayload, filterColumn: 'id', filterValue: item.id });
          }
          pendingUpdatesRef.current.delete(item.id);
        });
      }
    }
  }, [enqueueOffline]);

  // Flush all pending saves on beforeunload
  useEffect(() => {
    const handleBeforeUnload = () => {
      Array.from(debouncedSaveTimers.current.keys()).forEach(itemId => {
        flushPendingSave(itemId);
      });
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload();
    };
  }, [flushPendingSave]);

  // ---- Create operations ----

  const createTask = useCallback((listId?: string, tagIds?: string[]) => {
    const now = new Date();
    const id = crypto.randomUUID();
    const task: Task = {
      id,
      type: 'task',
      title: 'Untitled Task',
      content: '',
      tags: tagIds || [],
      isPinned: false,
      isCompleted: false,
      section: 'now',
      order: getTopSortOrder(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      ...(listId && { listId }),
    };

    dispatch({ type: 'ADD_ITEM', payload: task });
    wikiLinkCache.onItemCreated(id, task.title);
    markItemDirty(id);

    // Optimistic sidebar count: +1 task, +1 all
    setSidebarCounts(prev => prev ? { ...prev, tasks: prev.tasks + 1, all: prev.all + 1 } : prev);

    const insertPayload = {
      id,
      type: 'task' as const,
      title: task.title,
      content: task.content,
      list_id: listId || null,
      is_pinned: false,
      is_completed: false,
      section: 'now',
      sort_order: task.order,
      has_uncompleted_todos: hasUncompletedTodos(task.content),
      user_id: userId,
    };

    if (!isOnlineRef.current) {
      enqueueOffline({ mutationType: 'insert', table: 'items', payload: insertPayload });
      if (tagIds && tagIds.length > 0) {
        for (const tagId of tagIds) {
          enqueueOffline({ mutationType: 'insert', table: 'item_tags', payload: { item_id: id, tag_id: tagId } });
        }
      }
      toast.info('Saved offline — will sync when connected');
      return;
    }

    apiQuery({ action: 'insert', table: 'items', data: insertPayload }).then(({ error }) => {
      if (error) {
        console.error('Failed to create task:', error);
        enqueueOffline({ mutationType: 'insert', table: 'items', payload: insertPayload });
        toast.info('Saved offline — will sync when connected');
      } else {
        if (tagIds && tagIds.length > 0) {
          apiQuery({ action: 'insert', table: 'item_tags', data: tagIds.map(tagId => ({ item_id: id, tag_id: tagId })) }).then(({ error: tagError }) => {
            if (tagError) console.error('Failed to insert item_tags:', tagError);
          });
        }
        refreshCounts();
        clearSearchCache();
      }
    });
  }, [refreshCounts, enqueueOffline, userId, getTopSortOrder]);

  const createNote = useCallback((listId?: string, title?: string, content?: string, tagNames?: string[]) => {
    const now = new Date();
    const id = crypto.randomUUID();

    // Resolve tags: find existing or create new ones
    const resolvedTagIds: string[] = [];
    const TAG_COLORS = ['#008948', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];
    if (tagNames && tagNames.length > 0) {
      const currentTags = [...tagsRef.current];
      for (const name of tagNames) {
        const lower = name.toLowerCase();
        const existing = currentTags.find(t => t.name.toLowerCase() === lower);
        if (existing) {
          resolvedTagIds.push(existing.id);
        } else {
          const pendingTag = pendingTagsRef.current.get(lower);
          if (pendingTag) {
            resolvedTagIds.push(pendingTag.id);
          } else {
            const newTagId = crypto.randomUUID();
            const color = TAG_COLORS[(currentTags.length + pendingTagsRef.current.size) % TAG_COLORS.length];
            const newTag: Tag = { id: newTagId, name: lower, color };
            dispatch({ type: 'ADD_TAG', payload: newTag });
            pendingTagsRef.current.set(lower, newTag);
            const tagPayload = { id: newTagId, name: lower, color, user_id: userId };
            if (isOnlineRef.current) {
              apiQuery({ action: 'insert', table: 'tags', data: tagPayload }).then(({ error }) => {
                if (error) enqueueOffline({ mutationType: 'insert', table: 'tags', payload: tagPayload });
              });
            } else {
              enqueueOffline({ mutationType: 'insert', table: 'tags', payload: tagPayload });
            }
            resolvedTagIds.push(newTagId);
            currentTags.push(newTag);
          }
        }
      }
      queueMicrotask(() => { pendingTagsRef.current.clear(); });
    }

    const note: Note = {
      id,
      type: 'note',
      title: title || format(now, 'MMM d, yyyy h:mm a'),
      content: content || '',
      tags: resolvedTagIds,
      isPinned: false,
      section: 'now',
      order: getTopSortOrder(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      ...(listId && { listId }),
    };

    dispatch({ type: 'ADD_ITEM', payload: note });
    wikiLinkCache.onItemCreated(id, note.title);
    markItemDirty(id);

    // Optimistic sidebar count: +1 note, +1 all, +1 todo if content has uncompleted todos
    const noteHasTodos = hasUncompletedTodos(note.content);
    setSidebarCounts(prev => prev ? {
      ...prev,
      notes: prev.notes + 1,
      all: prev.all + 1,
      ...(noteHasTodos ? { todo: prev.todo + 1 } : {}),
    } : prev);

    const insertPayload = {
      id,
      type: 'note' as const,
      title: note.title,
      content: note.content,
      list_id: listId || null,
      is_pinned: false,
      is_completed: false,
      section: 'now',
      sort_order: note.order,
      search_content: note.content?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || '',
      has_uncompleted_todos: hasUncompletedTodos(note.content),
      user_id: userId,
    };

    if (!isOnlineRef.current) {
      enqueueOffline({ mutationType: 'insert', table: 'items', payload: insertPayload });
      if (resolvedTagIds.length > 0) {
        for (const tagId of resolvedTagIds) {
          enqueueOffline({ mutationType: 'insert', table: 'item_tags', payload: { item_id: id, tag_id: tagId } });
        }
      }
      toast.info('Saved offline — will sync when connected');
      return id;
    }

    apiQuery({ action: 'insert', table: 'items', data: insertPayload }).then(({ error }) => {
      if (error) {
        console.error('Failed to create note:', error);
        enqueueOffline({ mutationType: 'insert', table: 'items', payload: insertPayload });
        toast.info('Saved offline — will sync when connected');
      } else {
        if (resolvedTagIds.length > 0) {
          apiQuery({ action: 'insert', table: 'item_tags', data: resolvedTagIds.map(tagId => ({ item_id: id, tag_id: tagId })) }).then(({ error: tagError }) => {
            if (tagError) console.error('Failed to insert item_tags:', tagError);
          });
        }
        refreshCounts();
        clearSearchCache();
      }
    });
    return id;
  }, [refreshCounts, enqueueOffline, userId, getTopSortOrder]);

  const duplicateItem = useCallback((id: string) => {
    const sourceItem = itemsRef.current.find(i => i.id === id);
    if (!sourceItem) return;

    // Flush any pending debounced save for the source item BEFORE duplicating
    const pendingTimer = debouncedSaveTimers.current.get(id);
    if (pendingTimer) {
      clearTimeout(pendingTimer);
      debouncedSaveTimers.current.delete(id);
      const pendingItem = latestItemData.current.get(id);
      if (pendingItem) {
        latestItemData.current.delete(id);
        const searchContent = pendingItem.content?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || '';
        const savePayload = {
          title: pendingItem.title,
          content: pendingItem.content,
          list_id: pendingItem.listId || null,
          is_pinned: pendingItem.isPinned,
          is_completed: pendingItem.type === 'task' ? (pendingItem as Task).isCompleted : false,
          section: pendingItem.section,
          sort_order: pendingItem.order,
          due_date: pendingItem.type === 'task' ? (pendingItem as Task).dueDate || null : null,
          search_content: searchContent,
          updated_at: sourceItem.updatedAt,
          has_uncompleted_todos: hasUncompletedTodos(pendingItem.content),
        };
        if (isOnlineRef.current) {
          apiQuery({ action: 'update', table: 'items', data: savePayload, filters: { id: id } });
        } else {
          enqueueOffline({ mutationType: 'update', table: 'items', payload: savePayload, filterColumn: 'id', filterValue: id });
        }
        pendingUpdatesRef.current.delete(id);
      }
    }

    const now = new Date();
    const newId = crypto.randomUUID();
    const duplicatedTitle = sourceItem.title.endsWith(' (Copy)')
      ? sourceItem.title
      : `${sourceItem.title} (Copy)`;

    const newItem: Item = {
      ...sourceItem,
      id: newId,
      title: duplicatedTitle,
      isPinned: false,
      ...(sourceItem.type === 'task' ? { isCompleted: false } : {}),
      order: getTopSortOrder(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      deletedAt: undefined,
    } as Item;
    dispatch({ type: 'ADD_ITEM', payload: newItem });
    markItemDirty(newId);

    apiQuery({ action: 'insert', table: 'items', data: {
      id: newId,
      type: sourceItem.type,
      title: duplicatedTitle,
      content: sourceItem.content,
      list_id: sourceItem.listId || null,
      is_pinned: false,
      is_completed: false,
      section: sourceItem.section,
      sort_order: newItem.order,
      has_uncompleted_todos: hasUncompletedTodos(sourceItem.content),
      user_id: userId,
    } }).then(async ({ error }) => {
      if (error) {
        dispatch({ type: 'DELETE_ITEM', payload: newId });
        toast.error('Failed to duplicate item');
      } else {
        if (sourceItem.tags.length > 0) {
          await apiQuery({ action: 'insert', table: 'item_tags', data: sourceItem.tags.map(tagId => ({ item_id: newId, tag_id: tagId })) });
        }
        refreshCounts();
        toast.success(`Duplicated ${sourceItem.type === 'task' ? 'task' : 'note'}`);
      }
    });

    dispatch({ type: 'SELECT_ITEM', payload: newId });
  }, [refreshCounts, userId, getTopSortOrder, enqueueOffline]);

  // ---- Update operation ----

  const updateItem = useCallback((item: Item) => {
    const currentItem = itemsRef.current.find((i) => i.id === item.id);

    const hasRealChanges = !currentItem ||
      item.title !== currentItem.title ||
      item.content !== currentItem.content ||
      item.listId !== currentItem.listId ||
      item.isPinned !== currentItem.isPinned ||
      item.section !== currentItem.section ||
      item.order !== currentItem.order ||
      JSON.stringify(item.tags) !== JSON.stringify(currentItem.tags) ||
      (item.type === 'task' && currentItem.type === 'task' && (
        (item as Task).isCompleted !== (currentItem as Task).isCompleted ||
        (item as Task).dueDate !== (currentItem as Task).dueDate
      ));

    const updatedItem = hasRealChanges
      ? { ...item, updatedAt: new Date().toISOString() }
      : item;

    if (!hasRealChanges) return;

    // CONTENT INTEGRITY CHECK
    if (currentItem && item.content !== currentItem.content) {
      const prevText = (currentItem.content || '').replace(/<[^>]*>/g, '').trim();
      const newText = (item.content || '').replace(/<[^>]*>/g, '').trim();
      const prevLen = prevText.length;
      const newLen = newText.length;

      if (prevLen > 50 && newLen < 5) {
        console.warn(
          `[CONTENT_INTEGRITY] Blocked suspicious content wipe for item ${item.id}: ` +
          `previous content had ${prevLen} chars, new content has ${newLen} chars. ` +
          `Skipping update to prevent data loss.`
        );
        return;
      }
    }

    markItemDirty(item.id);

    if (currentItem && item.title !== currentItem.title) {
      wikiLinkCache.onItemRenamed(currentItem.title, item.title, item.id);
    }

    // ── Optimistic sidebar todo count update ──
    // When content changes and the has_uncompleted_todos status flips,
    // immediately update the sidebar count without waiting for server sync.
    if (currentItem && item.content !== currentItem.content) {
      const prevHasTodos = hasUncompletedTodos(currentItem.content);
      const newHasTodos = hasUncompletedTodos(item.content);
      if (prevHasTodos !== newHasTodos) {
        setSidebarCounts(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            todo: Math.max(0, prev.todo + (newHasTodos ? 1 : -1)),
          };
        });
      }
    }

    pendingUpdatesRef.current.add(item.id);
    dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });

    // Track modified items as recent
    if (item.title !== currentItem?.title || item.content !== currentItem?.content) {
      dispatch({ type: 'ADD_RECENT_ITEM', payload: item.id });
    }

    // Sync item_tags immediately if tags changed (not debounced)
    const tagsChanged = currentItem && JSON.stringify(item.tags) !== JSON.stringify(currentItem.tags);
    if (tagsChanged && isOnlineRef.current) {
      const newTags = [...item.tags];
      apiQuery({ action: 'delete', table: 'item_tags', filters: { item_id: item.id } }).then(({ error: delError }) => {
        if (delError) {
          console.error('[ITEM_TAGS_SYNC] Delete error:', delError);
          return;
        }
        if (newTags.length > 0) {
          apiQuery({ action: 'insert', table: 'item_tags', data: newTags.map(tagId => ({ item_id: item.id, tag_id: tagId })) }).then(({ error: insError }) => {
            if (insError) console.error('[ITEM_TAGS_SYNC] Insert error:', insError);
          });
        }
      });
    }

    // FIELD-LEVEL MERGE
    const existingLatest = latestItemData.current.get(item.id);
    if (existingLatest && currentItem) {
      const merged = { ...existingLatest };
      if (item.title !== currentItem.title) merged.title = item.title;
      if (item.content !== currentItem.content) merged.content = item.content;
      if (item.listId !== currentItem.listId) merged.listId = item.listId;
      if (item.isPinned !== currentItem.isPinned) merged.isPinned = item.isPinned;
      if (item.section !== currentItem.section) merged.section = item.section;
      if (item.order !== currentItem.order) merged.order = item.order;
      if (JSON.stringify(item.tags) !== JSON.stringify(currentItem.tags)) merged.tags = [...item.tags];
      if (item.type === 'task' && currentItem.type === 'task') {
        if ((item as Task).isCompleted !== (currentItem as Task).isCompleted) {
          (merged as Task).isCompleted = (item as Task).isCompleted;
        }
        if ((item as Task).dueDate !== (currentItem as Task).dueDate) {
          (merged as Task).dueDate = (item as Task).dueDate;
        }
      }
      merged.updatedAt = updatedItem.updatedAt;
      latestItemData.current.set(item.id, merged);
    } else {
      latestItemData.current.set(item.id, updatedItem);
    }

    const existingTimer = debouncedSaveTimers.current.get(item.id);
    if (existingTimer) clearTimeout(existingTimer);

    const timer = setTimeout(() => {
      debouncedSaveTimers.current.delete(item.id);
      const latestItem = latestItemData.current.get(item.id) || updatedItem;
      latestItemData.current.delete(item.id);
      const searchContent = latestItem.content?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || '';

      const updatePayload = {
        title: latestItem.title,
        content: latestItem.content,
        list_id: latestItem.listId || null,
        is_pinned: latestItem.isPinned,
        is_completed: latestItem.type === 'task' ? (latestItem as Task).isCompleted : false,
        section: latestItem.section,
        sort_order: latestItem.order,
        due_date: latestItem.type === 'task' ? (latestItem as Task).dueDate || null : null,
        search_content: searchContent,
        updated_at: latestItem.updatedAt,
        has_uncompleted_todos: hasUncompletedTodos(latestItem.content),
      };

      if (!isOnlineRef.current) {
        enqueueOffline({ mutationType: 'update', table: 'items', payload: updatePayload, filterColumn: 'id', filterValue: latestItem.id });
        pendingUpdatesRef.current.delete(latestItem.id);
        return;
      }

      apiQuery({ action: 'update', table: 'items', data: updatePayload, filters: { id: latestItem.id } }).then(({ error }) => {
        if (error) {
          console.error('Update failed:', error);
          enqueueOffline({ mutationType: 'update', table: 'items', payload: updatePayload, filterColumn: 'id', filterValue: latestItem.id });
        } else {
          clearSearchCache();
        }
        pendingUpdatesRef.current.delete(latestItem.id);
      });
    }, 500);

    debouncedSaveTimers.current.set(item.id, timer);
  }, [enqueueOffline]);

  // ---- Delete operations ----

  const softDeleteItem = useCallback((id: string) => {
    const item = itemsRef.current.find((i) => i.id === id);
    if (!item) return;

    const itemTitle = item.title || (item.type === 'task' ? 'Task' : 'Note');
    const displayTitle = itemTitle.length > 30 ? itemTitle.substring(0, 30) + '...' : itemTitle;

    const now = Date.now();
    undoStackRef.current = [
      { item: { ...item }, timestamp: now },
      ...undoStackRef.current.filter((u) => now - u.timestamp < 5 * 60 * 1000).slice(0, 9),
    ];

    dispatch({ type: 'SOFT_DELETE_ITEM', payload: id });
    wikiLinkCache.onItemDeleted(item.title);
    markItemDirty(id);

    // Optimistic sidebar count: decrement type count, all, and todo/pinned/completed as needed
    setSidebarCounts(prev => {
      if (!prev) return prev;
      const next = { ...prev };
      next.all = Math.max(0, next.all - 1);
      next.trash = next.trash + 1;
      if (item.type === 'task') {
        next.tasks = Math.max(0, next.tasks - 1);
        if ((item as Task).isCompleted) next.completed = Math.max(0, next.completed - 1);
      } else {
        next.notes = Math.max(0, next.notes - 1);
      }
      if (item.isPinned) next.pinned = Math.max(0, next.pinned - 1);
      if (hasUncompletedTodos(item.content)) next.todo = Math.max(0, next.todo - 1);
      if (!item.listId && !item.isPinned && item.tags.length === 0) {
        next.miscellaneous = Math.max(0, next.miscellaneous - 1);
      }
      return next;
    });

    const deletePayload = { deleted_at: new Date().toISOString(), is_pinned: false };
    if (!isOnlineRef.current) {
      enqueueOffline({ mutationType: 'update', table: 'items', payload: deletePayload, filterColumn: 'id', filterValue: id });
    } else {
      apiQuery({ action: 'update', table: 'items', data: deletePayload, filters: { id: id } }).then(({ error }) => {
        if (error) {
          enqueueOffline({ mutationType: 'update', table: 'items', payload: deletePayload, filterColumn: 'id', filterValue: id });
        } else {
          refreshCounts();
          clearSearchCache();
        }
      });
    }

    toast.info(`"${displayTitle}" moved to trash`, {
      duration: 5000,
      action: {
        label: 'Undo',
        onClick: () => {
          dispatch({ type: 'RESTORE_ITEM', payload: id });
          // Optimistic: reverse the softDelete counts
          setSidebarCounts(prev => {
            if (!prev) return prev;
            const next = { ...prev };
            next.all = next.all + 1;
            next.trash = Math.max(0, next.trash - 1);
            if (item.type === 'task') {
              next.tasks = next.tasks + 1;
              if ((item as Task).isCompleted) next.completed = next.completed + 1;
            } else {
              next.notes = next.notes + 1;
            }
            if (hasUncompletedTodos(item.content)) next.todo = next.todo + 1;
            if (!item.listId && item.tags.length === 0) {
              next.miscellaneous = next.miscellaneous + 1;
            }
            return next;
          });
          const restorePayload = { deleted_at: null };
          if (!isOnlineRef.current) {
            enqueueOffline({ mutationType: 'update', table: 'items', payload: restorePayload, filterColumn: 'id', filterValue: id });
          } else {
            apiQuery({ action: 'update', table: 'items', data: restorePayload, filters: { id: id } });
          }
          undoStackRef.current = undoStackRef.current.filter((u) => u.item.id !== id);
          refreshCounts();
        },
      },
    });
  }, [refreshCounts, enqueueOffline]);

  const deleteItem = softDeleteItem;

  const restoreItem = useCallback((id: string) => {
    const item = itemsRef.current.find((i) => i.id === id);
    if (!item) return;

    const itemTitle = item.title || (item.type === 'task' ? 'Task' : 'Note');
    const displayTitle = itemTitle.length > 30 ? itemTitle.substring(0, 30) + '...' : itemTitle;

    dispatch({ type: 'RESTORE_ITEM', payload: id });

    // Optimistic sidebar count: reverse the softDelete counts
    setSidebarCounts(prev => {
      if (!prev) return prev;
      const next = { ...prev };
      next.all = next.all + 1;
      next.trash = Math.max(0, next.trash - 1);
      if (item.type === 'task') {
        next.tasks = next.tasks + 1;
        if ((item as Task).isCompleted) next.completed = next.completed + 1;
      } else {
        next.notes = next.notes + 1;
      }
      if (hasUncompletedTodos(item.content)) next.todo = next.todo + 1;
      if (!item.listId && item.tags.length === 0) {
        next.miscellaneous = next.miscellaneous + 1;
      }
      return next;
    });

    const restorePayload = { deleted_at: null, updated_at: new Date().toISOString() };
    if (!isOnlineRef.current) {
      enqueueOffline({ mutationType: 'update', table: 'items', payload: restorePayload, filterColumn: 'id', filterValue: id });
    } else {
      apiQuery({ action: 'update', table: 'items', data: restorePayload, filters: { id: id } }).then(({ error }) => {
        if (error) {
          enqueueOffline({ mutationType: 'update', table: 'items', payload: restorePayload, filterColumn: 'id', filterValue: id });
        }
        refreshCounts();
        clearSearchCache();
      });
    }
    toast.success(`"${displayTitle}" restored`);
  }, [refreshCounts, enqueueOffline]);

  const permanentDeleteItem = useCallback((id: string) => {
    const item = itemsRef.current.find((i) => i.id === id);

    // Optimistic sidebar count: item is already in trash, so just decrement trash
    if (item) {
      setSidebarCounts(prev => {
        if (!prev) return prev;
        const next = { ...prev };
        next.trash = Math.max(0, next.trash - 1);
        return next;
      });
    }

    dispatch({ type: 'PERMANENT_DELETE_ITEM', payload: id });
    apiQuery({ action: 'delete', table: 'item_tags', filters: { item_id: id } }).then(() => {
      apiQuery({ action: 'delete', table: 'items', filters: { id: id } }).then(() => {
        refreshCounts();
        clearSearchCache();
        markItemDirty(id);
      });
    });
  }, [refreshCounts]);

  const emptyTrash = useCallback(async () => {
    const trashedItems = itemsRef.current.filter((i) => i.deletedAt);
    if (trashedItems.length === 0) return;

    // Optimistic sidebar count: clear all trash items
    setSidebarCounts(prev => {
      if (!prev) return prev;
      return { ...prev, trash: 0 };
    });

    dispatch({ type: 'EMPTY_TRASH' });

    const ids = trashedItems.map(i => i.id);
    await apiQuery({ action: 'delete', table: 'item_tags', filters: { 'item_id__in': ids } });
    await apiQuery({ action: 'delete', table: 'items', filters: { 'deleted_at__not_is': null } });
    refreshCounts();
    clearSearchCache();
    markItemsDirty(ids);
    toast.success(`${trashedItems.length} item${trashedItems.length > 1 ? 's' : ''} permanently deleted`);
  }, [refreshCounts]);

  const getTrashItems = useCallback(() => {
    return itemsRef.current.filter((i) => i.deletedAt).sort((a, b) => {
      return new Date(b.deletedAt!).getTime() - new Date(a.deletedAt!).getTime();
    });
  }, []);

  const undoLastDelete = useCallback(() => {
    const now = Date.now();
    undoStackRef.current = undoStackRef.current.filter((u) => now - u.timestamp < 5 * 60 * 1000);

    if (undoStackRef.current.length === 0) {
      toast.info('Nothing to undo', { description: 'No recent deletions to restore' });
      return;
    }

    const lastDeleted = undoStackRef.current[0];
    const item = lastDeleted.item;

    const trashedItem = itemsRef.current.find((i) => i.id === item.id && i.deletedAt);
    if (trashedItem) {
      dispatch({ type: 'RESTORE_ITEM', payload: item.id });
      apiQuery({ action: 'update', table: 'items', data: { deleted_at: null }, filters: { id: item.id } });
      const itemTitle = item.title || (item.type === 'task' ? 'Task' : 'Note');
      const displayTitle = itemTitle.length > 30 ? itemTitle.substring(0, 30) + '...' : itemTitle;
      toast.success(`"${displayTitle}" restored`, { description: 'Press ⌘/Ctrl+Z again to undo more' });
    }

    undoStackRef.current = undoStackRef.current.slice(1);
  }, []);

  // ---- Selection operations ----

  const selectItem = useCallback((id: string | null) => {
    if (selectedItemIdRef.current && selectedItemIdRef.current !== id) {
      flushPendingSave(selectedItemIdRef.current);
      flushAutoBackup();
    }
    dispatch({ type: 'SELECT_ITEM', payload: id });
  }, [flushPendingSave]);

  const fetchAndSelectItem = useCallback(async (id: string) => {
    const existing = itemsRef.current.find((i) => i.id === id);
    if (existing) {
      selectItem(id);
      return;
    }
    setIsFetchingItem(true);
    try {
      const { data, error } = await apiQuery({
        table: 'items',
        select: '*, item_tags(tag_id)',
        filters: { id },
        limit: 1,
        single: true,
      });
      if (error || !data) {
        console.error('Failed to fetch item:', error);
        selectItem(id);
        return;
      }
      const item = dbRowToItem(data);
      dispatch({ type: 'INJECT_ITEM', payload: item });
    } catch (err) {
      console.error('Failed to fetch item:', err);
      selectItem(id);
    } finally {
      setIsFetchingItem(false);
    }
  }, [selectItem, setIsFetchingItem]);

  // ---- Status operations ----

  const togglePin = useCallback((id: string) => {
    const item = itemsRef.current.find((i) => i.id === id);
    if (!item) return;

    dispatch({ type: 'TOGGLE_PIN', payload: id });
    markItemDirty(id);

    // Optimistic sidebar count: +1 or -1 pinned
    const wasPinned = item.isPinned;
    setSidebarCounts(prev => {
      if (!prev) return prev;
      const next = { ...prev };
      next.pinned = wasPinned ? Math.max(0, next.pinned - 1) : next.pinned + 1;
      // If item has no list, no tags, toggling pin may affect miscellaneous count
      if (!item.listId && item.tags.length === 0) {
        if (wasPinned) {
          // Unpinning: item becomes miscellaneous
          next.miscellaneous = next.miscellaneous + 1;
        } else {
          // Pinning: item leaves miscellaneous
          next.miscellaneous = Math.max(0, next.miscellaneous - 1);
        }
      }
      return next;
    });

    const pinPayload = { is_pinned: !item.isPinned };
    if (!isOnlineRef.current) {
      enqueueOffline({ mutationType: 'update', table: 'items', payload: pinPayload, filterColumn: 'id', filterValue: id });
    } else {
      apiQuery({ action: 'update', table: 'items', data: pinPayload, filters: { id: id } }).then(({ error }) => {
        if (error) {
          enqueueOffline({ mutationType: 'update', table: 'items', payload: pinPayload, filterColumn: 'id', filterValue: id });
        }
        refreshCounts();
      });
    }
  }, [refreshCounts, enqueueOffline]);

  const completeTask = useCallback((id: string) => {
    const task = itemsRef.current.find((item) => item.id === id) as Task | undefined;
    if (!task) return;

    const taskTitle = task.title || 'Task';
    const displayTitle = taskTitle.length > 30 ? taskTitle.substring(0, 30) + '...' : taskTitle;

    dispatch({ type: 'COMPLETE_TASK', payload: id });
    markItemDirty(id);

    // Optimistic sidebar count: +1 completed
    setSidebarCounts(prev => {
      if (!prev) return prev;
      return { ...prev, completed: prev.completed + 1 };
    });

    const completePayload = { is_completed: true, section: 'completed' };
    if (!isOnlineRef.current) {
      enqueueOffline({ mutationType: 'update', table: 'items', payload: completePayload, filterColumn: 'id', filterValue: id });
    } else {
      apiQuery({ action: 'update', table: 'items', data: completePayload, filters: { id: id } }).then(({ error }) => {
        if (error) {
          enqueueOffline({ mutationType: 'update', table: 'items', payload: completePayload, filterColumn: 'id', filterValue: id });
        }
        refreshCounts();
      });
    }

    toast.success(`"${displayTitle}" completed`, {
      duration: 5000,
      action: {
        label: 'Undo',
        onClick: () => {
          dispatch({ type: 'UNCOMPLETE_TASK', payload: id });
          // Optimistic: reverse the complete
          setSidebarCounts(prev => {
            if (!prev) return prev;
            return { ...prev, completed: Math.max(0, prev.completed - 1) };
          });
          const undoPayload = { is_completed: false, section: 'now' };
          if (!isOnlineRef.current) {
            enqueueOffline({ mutationType: 'update', table: 'items', payload: undoPayload, filterColumn: 'id', filterValue: id });
          } else {
            apiQuery({ action: 'update', table: 'items', data: undoPayload, filters: { id: id } }).then(({ error }) => {
              if (error) enqueueOffline({ mutationType: 'update', table: 'items', payload: undoPayload, filterColumn: 'id', filterValue: id });
              refreshCounts();
            });
          }
        },
      },
    });
  }, [refreshCounts, enqueueOffline]);

  const uncompleteTask = useCallback((id: string) => {
    dispatch({ type: 'UNCOMPLETE_TASK', payload: id });
    markItemDirty(id);

    // Optimistic sidebar count: -1 completed
    setSidebarCounts(prev => {
      if (!prev) return prev;
      return { ...prev, completed: Math.max(0, prev.completed - 1) };
    });

    const payload = { is_completed: false, section: 'now' };
    if (!isOnlineRef.current) {
      enqueueOffline({ mutationType: 'update', table: 'items', payload, filterColumn: 'id', filterValue: id });
    } else {
      apiQuery({ action: 'update', table: 'items', data: payload, filters: { id: id } }).then(({ error }) => {
        if (error) enqueueOffline({ mutationType: 'update', table: 'items', payload, filterColumn: 'id', filterValue: id });
        refreshCounts();
      });
    }
  }, [refreshCounts, enqueueOffline]);

  const moveItem = useCallback((itemId: string, section: SectionType, newOrder?: number) => {
    dispatch({ type: 'MOVE_ITEM', payload: { itemId, section, newOrder } });
    markItemDirty(itemId);
    const payload = { section, is_completed: section === 'completed', sort_order: newOrder };
    if (!isOnlineRef.current) {
      enqueueOffline({ mutationType: 'update', table: 'items', payload, filterColumn: 'id', filterValue: itemId });
    } else {
      apiQuery({ action: 'update', table: 'items', data: payload, filters: { id: itemId } }).then(({ error }) => {
        if (error) enqueueOffline({ mutationType: 'update', table: 'items', payload, filterColumn: 'id', filterValue: itemId });
      });
    }
  }, [enqueueOffline]);

  const reorderItems = useCallback((section: SectionType, itemIds: string[]) => {
    dispatch({ type: 'REORDER_ITEMS', payload: { section, itemIds } });

    itemIds.forEach((id, index) => {
      if (!isOnlineRef.current) {
        enqueueOffline({ mutationType: 'update', table: 'items', payload: { sort_order: index }, filterColumn: 'id', filterValue: id });
      } else {
        apiQuery({ action: 'update', table: 'items', data: { sort_order: index }, filters: { id: id } });
      }
    });
  }, [enqueueOffline]);

  // ---- Bulk operations ----

  const bulkAddTag = useCallback((itemIds: string[], tagId: string) => {
    dispatch({ type: 'BULK_ADD_TAG', payload: { itemIds, tagId } });

    const itemsToTag = itemsRef.current.filter(i => itemIds.includes(i.id) && !i.tags.includes(tagId));
    if (itemsToTag.length === 0) return;

    const rows = itemsToTag.map(i => ({ item_id: i.id, tag_id: tagId }));

    if (!isOnlineRef.current) {
      rows.forEach(row => {
        enqueueOffline({ mutationType: 'insert', table: 'item_tags', payload: row });
      });
    } else {
      apiQuery({ action: 'upsert', table: 'item_tags', data: rows }).then(({ error }) => {
        if (error) {
          console.error('[BULK_ADD_TAG] Server sync error:', error);
          rows.forEach(row => {
            enqueueOffline({ mutationType: 'insert', table: 'item_tags', payload: row });
          });
        } else {
          refreshCounts();
        }
      });
    }
  }, [refreshCounts, enqueueOffline]);

  const bulkRemoveTag = useCallback((itemIds: string[], tagId: string) => {
    dispatch({ type: 'BULK_REMOVE_TAG', payload: { itemIds, tagId } });

    if (!isOnlineRef.current) {
      itemIds.forEach(itemId => {
        enqueueOffline({ mutationType: 'delete', table: 'item_tags', payload: { item_id: itemId, tag_id: tagId }, filterColumn: 'item_id', filterValue: itemId });
      });
    } else {
      // Delete item_tags for each item individually
      Promise.all(itemIds.map(itemId =>
        apiQuery({ action: 'delete', table: 'item_tags', filters: { item_id: itemId, tag_id: tagId } })
      )).then((results) => {
        const hasError = results.some(r => r.error);
        if (hasError) {
          console.error('[BULK_REMOVE_TAG] Server sync error');
          itemIds.forEach(itemId => {
            enqueueOffline({ mutationType: 'delete', table: 'item_tags', payload: { item_id: itemId, tag_id: tagId }, filterColumn: 'item_id', filterValue: itemId });
          });
        } else {
          refreshCounts();
        }
      });
    }
  }, [refreshCounts, enqueueOffline]);

  const bulkDeleteItems = useCallback((itemIds: string[]) => {
    dispatch({ type: 'BULK_DELETE_ITEMS', payload: itemIds });

    const now = new Date().toISOString();
    const deletePayload = { deleted_at: now, is_pinned: false };

    if (!isOnlineRef.current) {
      itemIds.forEach(id => {
        enqueueOffline({ mutationType: 'update', table: 'items', payload: deletePayload, filterColumn: 'id', filterValue: id });
      });
    } else {
      // Update each item individually
      Promise.all(itemIds.map(id =>
        apiQuery({ action: 'update', table: 'items', data: deletePayload, filters: { id } })
      )).then((results) => {
        const hasError = results.some(r => r.error);
        if (hasError) {
          console.error('[BULK_DELETE] Server sync error');
          itemIds.forEach(id => {
            enqueueOffline({ mutationType: 'update', table: 'items', payload: deletePayload, filterColumn: 'id', filterValue: id });
          });
        } else {
          refreshCounts();
        }
      });
    }
  }, [refreshCounts, enqueueOffline]);

  const bulkSetList = useCallback((itemIds: string[], listId: string | null) => {
    dispatch({ type: 'BULK_SET_LIST', payload: { itemIds, listId } });

    const now = new Date().toISOString();
    const listPayload = { list_id: listId || null, updated_at: now };

    if (!isOnlineRef.current) {
      itemIds.forEach(id => {
        enqueueOffline({ mutationType: 'update', table: 'items', payload: listPayload, filterColumn: 'id', filterValue: id });
      });
    } else {
      // Update each item individually
      Promise.all(itemIds.map(id =>
        apiQuery({ action: 'update', table: 'items', data: listPayload, filters: { id } })
      )).then((results) => {
        const hasError = results.some(r => r.error);
        if (hasError) {
          console.error('[BULK_SET_LIST] Server sync error');
          itemIds.forEach(id => {
            enqueueOffline({ mutationType: 'update', table: 'items', payload: listPayload, filterColumn: 'id', filterValue: id });
          });
        } else {
          refreshCounts();
        }
      });
    }
  }, [refreshCounts, enqueueOffline]);

  // Expose latestItemData ref so the provider can check for pending debounced saves
  // (used by loadItems merge logic to preserve local edits)
  return {
    // Helpers
    getTopSortOrder,
    flushPendingSave,
    latestItemData,
    debouncedSaveTimers,
    // Create
    createTask,
    createNote,
    duplicateItem,
    // Update
    updateItem,
    // Delete
    softDeleteItem,
    deleteItem,
    restoreItem,
    permanentDeleteItem,
    emptyTrash,
    getTrashItems,
    undoLastDelete,
    // Selection
    selectItem,
    fetchAndSelectItem,
    // Status
    togglePin,
    completeTask,
    uncompleteTask,
    moveItem,
    reorderItems,
    // Bulk
    bulkAddTag,
    bulkRemoveTag,
    bulkDeleteItems,
    bulkSetList,
  };
}
