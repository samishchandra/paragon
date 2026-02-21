/**
 * Items sub-reducer — handles all item CRUD, bulk operations,
 * pin/complete/move/reorder, and injected/prefetched item management.
 */
import type { SectionType } from '@/types';
import type { State, ItemAction } from './types';
import { enforceTabLimit } from './helpers';

/** Item action type strings for the dispatcher to route correctly */
export const ITEM_ACTION_TYPES = new Set([
  'SET_ITEMS', 'ADD_ITEM', 'UPDATE_ITEM', 'DELETE_ITEM',
  'SOFT_DELETE_ITEM', 'RESTORE_ITEM', 'PERMANENT_DELETE_ITEM', 'EMPTY_TRASH',
  'TOGGLE_PIN', 'COMPLETE_TASK', 'UNCOMPLETE_TASK',
  'MOVE_ITEM', 'REORDER_ITEMS', 'SET_ITEM_LIST', 'REMOVE_ITEM_FROM_LIST',
  'BULK_DELETE_ITEMS', 'BULK_SET_LIST', 'BULK_ADD_TAG', 'BULK_REMOVE_TAG',
  'INJECT_ITEM', 'PREFETCH_TAB_ITEMS', 'REFRESH_TAB_ITEMS',
]);

export function itemsReducer(state: State, action: ItemAction): State {
  switch (action.type) {
    case 'SET_ITEMS': {
      const { items, total, hasMore, append } = action.payload;
      return {
        ...state,
        items: append ? [...state.items, ...items] : items,
        total,
        hasMore,
        offset: append ? state.offset + items.length : items.length,
      };
    }

    case 'ADD_ITEM': {
      const addItemTabs = enforceTabLimit(
        [...state.openTabIds, action.payload.id],
        action.payload.id
      );
      return {
        ...state,
        items: [action.payload, ...state.items],
        selectedItemId: action.payload.id,
        isNewlyCreatedItem: true,
        openTabIds: addItemTabs,
        total: state.total + 1,
      };
    }

    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        selectedItemId: state.selectedItemId === action.payload ? null : state.selectedItemId,
        total: state.total - 1,
      };

    case 'SOFT_DELETE_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, deletedAt: new Date().toISOString(), isPinned: false }
            : item
        ),
        selectedItemId: state.selectedItemId === action.payload ? null : state.selectedItemId,
      };

    case 'RESTORE_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, deletedAt: undefined, updatedAt: new Date().toISOString() }
            : item
        ),
      };

    case 'PERMANENT_DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        selectedItemId: state.selectedItemId === action.payload ? null : state.selectedItemId,
        total: state.total - 1,
      };

    case 'EMPTY_TRASH':
      return {
        ...state,
        items: state.items.filter((item) => !item.deletedAt),
        selectedItemId: null,
      };

    case 'TOGGLE_PIN':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, isPinned: !item.isPinned, updatedAt: new Date().toISOString() }
            : item
        ),
      };

    case 'COMPLETE_TASK':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload && item.type === 'task'
            ? { ...item, isCompleted: true, section: 'completed' as SectionType, updatedAt: new Date().toISOString() }
            : item
        ),
      };

    case 'UNCOMPLETE_TASK':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload && item.type === 'task'
            ? { ...item, isCompleted: false, section: 'now' as SectionType, updatedAt: new Date().toISOString() }
            : item
        ),
      };

    case 'MOVE_ITEM': {
      const { itemId, section, newOrder } = action.payload;
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id !== itemId) return item;
          if (item.type === 'task') {
            const isCompleted = section === 'completed';
            const order = newOrder !== undefined ? newOrder : item.order;
            return { ...item, section, isCompleted, order, updatedAt: new Date().toISOString() };
          }
          if (section !== 'completed') {
            const order = newOrder !== undefined ? newOrder : item.order;
            return { ...item, section, order, updatedAt: new Date().toISOString() };
          }
          return item;
        }),
      };
    }

    case 'REORDER_ITEMS': {
      const { section, itemIds } = action.payload;
      const orderMap = new Map(itemIds.map((id, index) => [id, index]));
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.section === section && orderMap.has(item.id)) {
            return { ...item, order: orderMap.get(item.id)! };
          }
          return item;
        }),
      };
    }

    case 'SET_ITEM_LIST':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, listId: action.payload.listId, updatedAt: new Date().toISOString() }
            : item
        ),
      };

    case 'REMOVE_ITEM_FROM_LIST':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, listId: undefined, updatedAt: new Date().toISOString() }
            : item
        ),
      };

    case 'BULK_DELETE_ITEMS': {
      const idsToDelete = new Set(action.payload);
      return {
        ...state,
        items: state.items.map((item) =>
          idsToDelete.has(item.id)
            ? { ...item, deletedAt: new Date().toISOString(), isPinned: false }
            : item
        ),
        selectedItemIds: [],
        isMultiSelectMode: false,
      };
    }

    case 'BULK_SET_LIST': {
      const { itemIds, listId } = action.payload;
      const idsToUpdate = new Set(itemIds);
      const now = new Date().toISOString();
      return {
        ...state,
        items: state.items.map((item) =>
          idsToUpdate.has(item.id)
            ? { ...item, listId: listId || undefined, updatedAt: now }
            : item
        ),
      };
    }

    case 'BULK_ADD_TAG': {
      const { itemIds, tagId } = action.payload;
      const now = new Date().toISOString();
      return {
        ...state,
        items: state.items.map((item) =>
          itemIds.includes(item.id) && !item.tags.includes(tagId)
            ? { ...item, tags: [...item.tags, tagId], updatedAt: now }
            : item
        ),
      };
    }

    case 'BULK_REMOVE_TAG': {
      const { itemIds, tagId } = action.payload;
      const now = new Date().toISOString();
      return {
        ...state,
        items: state.items.map((item) =>
          itemIds.includes(item.id)
            ? { ...item, tags: item.tags.filter((id: string) => id !== tagId), updatedAt: now }
            : item
        ),
      };
    }

    case 'INJECT_ITEM': {
      const exists = state.items.some((i) => i.id === action.payload.id);
      const newItems = exists ? state.items : [action.payload, ...state.items];
      const newTabs = state.openTabIds.includes(action.payload.id)
        ? state.openTabIds
        : enforceTabLimit(
            [...state.openTabIds, action.payload.id],
            action.payload.id
          );
      const newInjected = new Set(state.injectedItemIds);
      if (!exists) newInjected.add(action.payload.id);
      return {
        ...state,
        items: newItems,
        selectedItemId: action.payload.id,
        openTabIds: newTabs,
        injectedItemIds: newInjected,
      };
    }

    case 'PREFETCH_TAB_ITEMS': {
      const existingIds = new Set(state.items.map((i) => i.id));
      const newPrefetched = action.payload.filter((i) => !existingIds.has(i.id));
      if (newPrefetched.length === 0) return state;
      const prefetchInjected = new Set(state.injectedItemIds);
      newPrefetched.forEach((i) => prefetchInjected.add(i.id));
      return {
        ...state,
        items: [...newPrefetched, ...state.items],
        injectedItemIds: prefetchInjected,
      };
    }

    case 'REFRESH_TAB_ITEMS': {
      const serverItemMap = new Map(action.payload.map(i => [i.id, i]));
      let changed = false;
      const refreshedItems = state.items.map(localItem => {
        const serverItem = serverItemMap.get(localItem.id);
        if (!serverItem) return localItem;
        const serverTime = new Date(serverItem.updatedAt).getTime();
        const localTime = new Date(localItem.updatedAt).getTime();
        if (serverTime > localTime) {
          changed = true;
          return serverItem;
        }
        return localItem;
      });
      const existingRefreshIds = new Set(state.items.map(i => i.id));
      const newInjected = action.payload.filter(i => !existingRefreshIds.has(i.id));
      if (newInjected.length > 0) changed = true;
      if (!changed) return state;
      const refreshInjectedIds = new Set(state.injectedItemIds);
      newInjected.forEach(i => refreshInjectedIds.add(i.id));
      return {
        ...state,
        items: [...newInjected, ...refreshedItems],
        injectedItemIds: refreshInjectedIds,
      };
    }

    default:
      return state;
  }
}
