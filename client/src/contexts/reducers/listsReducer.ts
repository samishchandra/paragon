/**
 * Lists sub-reducer — handles list CRUD operations.
 * DELETE_LIST also cascades to unset listId on affected items.
 */
import type { State, ListAction } from './types';

/** List action type strings for the dispatcher to route correctly */
export const LIST_ACTION_TYPES = new Set([
  'SET_LISTS', 'ADD_LIST', 'UPDATE_LIST', 'DELETE_LIST', 'REORDER_LISTS',
]);

export function listsReducer(state: State, action: ListAction): State {
  switch (action.type) {
    case 'SET_LISTS':
      return { ...state, lists: action.payload };

    case 'ADD_LIST':
      return { ...state, lists: [...state.lists, action.payload] };

    case 'UPDATE_LIST':
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.id ? { ...list, ...action.payload.updates } : list
        ),
      };

    case 'DELETE_LIST':
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload),
        items: state.items.map((item) =>
          item.listId === action.payload ? { ...item, listId: undefined } : item
        ),
      };

    case 'REORDER_LISTS':
      return { ...state, lists: action.payload };

    default:
      return state;
  }
}
