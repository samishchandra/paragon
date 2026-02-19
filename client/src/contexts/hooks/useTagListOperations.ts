/**
 * useTagListOperations — Tag and list CRUD with optimistic UI + Supabase persistence.
 *
 * Handles: addTag, updateTag, deleteTag, mergeTags, addList, updateList,
 * deleteList, reorderLists, setItemList, removeItemFromList.
 *
 * All mutations follow the same pattern:
 *   1. Optimistic dispatch to the reducer
 *   2. If online → Supabase call (with offline fallback on error)
 *   3. If offline → enqueue for later flush
 */
import { useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { markItemDirty } from '@/lib/autoBackup';
import type { Item, Tag, List } from '@/types';

export interface TagListOperationsDeps {
  dispatch: React.Dispatch<any>;
  userId: string;
  isOnlineRef: React.MutableRefObject<boolean>;
  enqueueOffline: (entry: any) => void;
  /** updateItem from useItemOperations — needed by mergeTags */
  updateItem: (item: Item) => void;
  /** refreshCounts from useSidebarData — called after setItemList / removeItemFromList */
  refreshCounts: () => Promise<void>;
  /** Current items — needed by mergeTags to iterate */
  items: Item[];
}

export function useTagListOperations(deps: TagListOperationsDeps) {
  const {
    dispatch,
    userId,
    isOnlineRef,
    enqueueOffline,
    updateItem,
    refreshCounts,
    items,
  } = deps;

  // ── Tag operations ─────────────────────────────────────────────────────

  const addTag = useCallback((tag: Tag) => {
    dispatch({ type: 'ADD_TAG', payload: tag });
    const payload = { id: tag.id, name: tag.name, color: tag.color, user_id: userId };
    if (!isOnlineRef.current) {
      enqueueOffline({ mutationType: 'insert', table: 'tags', payload });
    } else {
      supabase.from('tags').insert(payload).then(({ error }) => {
        if (error) enqueueOffline({ mutationType: 'insert', table: 'tags', payload });
      });
    }
  }, [enqueueOffline, userId]);

  const updateTag = useCallback((id: string, updates: Partial<Tag>) => {
    dispatch({ type: 'UPDATE_TAG', payload: { id, updates } });
    if (!isOnlineRef.current) {
      enqueueOffline({ mutationType: 'update', table: 'tags', payload: updates as Record<string, any>, filterColumn: 'id', filterValue: id });
    } else {
      supabase.from('tags').update(updates).eq('id', id).then(({ error }) => {
        if (error) enqueueOffline({ mutationType: 'update', table: 'tags', payload: updates as Record<string, any>, filterColumn: 'id', filterValue: id });
      });
    }
  }, [enqueueOffline]);

  const deleteTag = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TAG', payload: id });
    if (!isOnlineRef.current) {
      enqueueOffline({ mutationType: 'delete', table: 'item_tags', payload: {}, filterColumn: 'tag_id', filterValue: id });
      enqueueOffline({ mutationType: 'delete', table: 'tags', payload: {}, filterColumn: 'id', filterValue: id });
    } else {
      supabase.from('item_tags').delete().eq('tag_id', id).then(({ error: junctionError }) => {
        if (junctionError) {
          console.error('Failed to delete item_tags for tag:', id, junctionError);
          enqueueOffline({ mutationType: 'delete', table: 'item_tags', payload: {}, filterColumn: 'tag_id', filterValue: id });
        }
        return supabase.from('tags').delete().eq('id', id);
      }).then((result) => {
        if (result && 'error' in result && result.error) {
          console.error('Failed to delete tag:', id, result.error);
          enqueueOffline({ mutationType: 'delete', table: 'tags', payload: {}, filterColumn: 'id', filterValue: id });
        }
      });
    }
  }, [enqueueOffline]);

  const mergeTags = useCallback((sourceTagId: string, targetTagId: string) => {
    items.forEach((item) => {
      if (item.tags.includes(sourceTagId)) {
        const newTags = item.tags.filter((t) => t !== sourceTagId);
        if (!newTags.includes(targetTagId)) {
          newTags.push(targetTagId);
        }
        updateItem({ ...item, tags: newTags });
      }
    });
    deleteTag(sourceTagId);
  }, [items, updateItem, deleteTag]);

  // ── List operations ────────────────────────────────────────────────────

  const addList = useCallback((list: List) => {
    dispatch({ type: 'ADD_LIST', payload: list });
    const payload = {
      id: list.id,
      name: list.name,
      icon: list.icon,
      color: list.color,
      type: list.type,
      sort_order: list.order,
      user_id: userId,
    };
    if (!isOnlineRef.current) {
      enqueueOffline({ mutationType: 'insert', table: 'lists', payload });
    } else {
      supabase.from('lists').insert(payload).then(({ error }) => {
        if (error) enqueueOffline({ mutationType: 'insert', table: 'lists', payload });
      });
    }
  }, [enqueueOffline, userId]);

  const updateList = useCallback((id: string, updates: Partial<List>) => {
    dispatch({ type: 'UPDATE_LIST', payload: { id, updates } });
    const dbUpdates: any = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.icon !== undefined) dbUpdates.icon = updates.icon;
    if (updates.color !== undefined) dbUpdates.color = updates.color;
    if (updates.type !== undefined) dbUpdates.type = updates.type;
    if (updates.order !== undefined) dbUpdates.sort_order = updates.order;
    if (!isOnlineRef.current) {
      enqueueOffline({ mutationType: 'update', table: 'lists', payload: dbUpdates, filterColumn: 'id', filterValue: id });
    } else {
      supabase.from('lists').update(dbUpdates).eq('id', id).then(({ error }) => {
        if (error) enqueueOffline({ mutationType: 'update', table: 'lists', payload: dbUpdates, filterColumn: 'id', filterValue: id });
      });
    }
  }, [enqueueOffline]);

  const deleteList = useCallback((id: string) => {
    dispatch({ type: 'DELETE_LIST', payload: id });
    if (!isOnlineRef.current) {
      enqueueOffline({ mutationType: 'update', table: 'items', payload: { list_id: null }, filterColumn: 'list_id', filterValue: id });
      enqueueOffline({ mutationType: 'delete', table: 'lists', payload: {}, filterColumn: 'id', filterValue: id });
    } else {
      supabase.from('items').update({ list_id: null }).eq('list_id', id).then(() => {
        supabase.from('lists').delete().eq('id', id);
      });
    }
  }, [enqueueOffline]);

  const reorderLists = useCallback(async (lists: List[]) => {
    dispatch({ type: 'REORDER_LISTS', payload: lists });
    const updates = lists.map((list, index) => {
      const payload = { sort_order: index };
      if (!isOnlineRef.current) {
        enqueueOffline({ mutationType: 'update', table: 'lists', payload, filterColumn: 'id', filterValue: list.id });
        return Promise.resolve();
      } else {
        return supabase.from('lists').update(payload).eq('id', list.id).then(({ error }) => {
          if (error) {
            console.error(`Failed to update sort_order for list ${list.name}:`, error);
            enqueueOffline({ mutationType: 'update', table: 'lists', payload, filterColumn: 'id', filterValue: list.id });
          }
        });
      }
    });
    await Promise.all(updates);
  }, [enqueueOffline]);

  // ── Item ↔ List assignment ─────────────────────────────────────────────

  const setItemList = useCallback((itemId: string, listId: string) => {
    dispatch({ type: 'SET_ITEM_LIST', payload: { itemId, listId } });
    markItemDirty(itemId);
    const payload = { list_id: listId };
    if (!isOnlineRef.current) {
      enqueueOffline({ mutationType: 'update', table: 'items', payload, filterColumn: 'id', filterValue: itemId });
    } else {
      supabase.from('items').update(payload).eq('id', itemId).then(({ error }) => {
        if (error) enqueueOffline({ mutationType: 'update', table: 'items', payload, filterColumn: 'id', filterValue: itemId });
        refreshCounts();
      });
    }
  }, [refreshCounts, enqueueOffline]);

  const removeItemFromList = useCallback((itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM_FROM_LIST', payload: itemId });
    markItemDirty(itemId);
    const payload = { list_id: null };
    if (!isOnlineRef.current) {
      enqueueOffline({ mutationType: 'update', table: 'items', payload, filterColumn: 'id', filterValue: itemId });
    } else {
      supabase.from('items').update(payload).eq('id', itemId).then(({ error }) => {
        if (error) enqueueOffline({ mutationType: 'update', table: 'items', payload, filterColumn: 'id', filterValue: itemId });
        refreshCounts();
      });
    }
  }, [refreshCounts, enqueueOffline]);

  return {
    addTag,
    updateTag,
    deleteTag,
    mergeTags,
    addList,
    updateList,
    deleteList,
    reorderLists,
    setItemList,
    removeItemFromList,
  };
}
