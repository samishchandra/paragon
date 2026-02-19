/**
 * Tags sub-reducer — handles tag CRUD operations.
 * DELETE_TAG also cascades to remove the tag from all items.
 */
import type { State, TagAction } from './types';

/** Tag action type strings for the dispatcher to route correctly */
export const TAG_ACTION_TYPES = new Set([
  'SET_TAGS', 'ADD_TAG', 'UPDATE_TAG', 'DELETE_TAG',
]);

export function tagsReducer(state: State, action: TagAction): State {
  switch (action.type) {
    case 'SET_TAGS':
      return { ...state, tags: action.payload };

    case 'ADD_TAG':
      return { ...state, tags: [...state.tags, action.payload] };

    case 'UPDATE_TAG':
      return {
        ...state,
        tags: state.tags.map((tag) =>
          tag.id === action.payload.id ? { ...tag, ...action.payload.updates } : tag
        ),
      };

    case 'DELETE_TAG':
      return {
        ...state,
        tags: state.tags.filter((tag) => tag.id !== action.payload),
        items: state.items.map((item) => ({
          ...item,
          tags: item.tags.filter((tagId) => tagId !== action.payload),
        })),
      };

    default:
      return state;
  }
}
