/**
 * Extended Reducer Logic — Unit Tests
 *
 * Covers features not in the original reducer.test.ts:
 * - Tab management (OPEN_TAB, CLOSE_TAB, LRU eviction, 15-tab limit)
 * - Task completion (COMPLETE_TASK, UNCOMPLETE_TASK)
 * - Item movement (MOVE_ITEM, REORDER_ITEMS)
 * - List management (SET_ITEM_LIST, REMOVE_ITEM_FROM_LIST, DELETE_LIST cascading)
 * - Tag management (DELETE_TAG cascading, BULK_ADD_TAG, BULK_REMOVE_TAG)
 * - Multi-select (TOGGLE_MULTI_SELECT_MODE, TOGGLE_ITEM_SELECTION, BULK_DELETE_ITEMS)
 * - Trash (PERMANENT_DELETE_ITEM, EMPTY_TRASH)
 * - Panel toggles (TOGGLE_LEFT_PANEL, TOGGLE_RIGHT_PANEL, TOGGLE_SECTION)
 * - PREFETCH_TAB_ITEMS and REFRESH_TAB_ITEMS (multi-device sync)
 * - Recent items (ADD_RECENT_ITEM)
 */
import { describe, it, expect } from 'vitest';
import type { Item, Task, Note, Tag, List, FilterType, SortOrder, SectionType, DisplaySectionType } from '@/types';

// ─── Replicate State, Action, and helpers ──────────────────────────

type CollapsedSectionsMap = Record<string, (SectionType | DisplaySectionType)[]>;

interface State {
  items: Item[];
  tags: Tag[];
  lists: List[];
  selectedItemId: string | null;
  isNewlyCreatedItem: boolean;
  activeFilter: FilterType;
  searchQuery: string;
  sortOrder: SortOrder;
  sortDirection: 'asc' | 'desc';
  leftPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;
  collapsedSections: (SectionType | DisplaySectionType)[];
  collapsedSectionsPerView: CollapsedSectionsMap;
  recentItemIds: string[];
  isLoading: boolean;
  tagPopoverOpen: boolean;
  selectedItemIds: string[];
  isMultiSelectMode: boolean;
  openTabIds: string[];
  hasMore: boolean;
  total: number;
  offset: number;
  isLoadingMore: boolean;
  cursor: string | null;
  viewSortPrefs: Record<string, { sortOrder: SortOrder; sortDirection: 'asc' | 'desc' }>;
  injectedItemIds: Set<string>;
}

const MAX_OPEN_TABS = 15;

function enforceTabLimit(tabs: string[], selectedItemId: string | null): string[] {
  if (tabs.length <= MAX_OPEN_TABS) return tabs;
  const evictIndex = tabs.findIndex(id => id !== selectedItemId);
  if (evictIndex === -1) return tabs.slice(-MAX_OPEN_TABS);
  return [...tabs.slice(0, evictIndex), ...tabs.slice(evictIndex + 1)];
}

type Action =
  | { type: 'SELECT_ITEM'; payload: string | null }
  | { type: 'OPEN_TAB'; payload: string }
  | { type: 'CLOSE_TAB'; payload: string }
  | { type: 'REORDER_TABS'; payload: string[] }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'UNCOMPLETE_TASK'; payload: string }
  | { type: 'MOVE_ITEM'; payload: { itemId: string; section: SectionType; newOrder?: number } }
  | { type: 'REORDER_ITEMS'; payload: { section: SectionType; itemIds: string[] } }
  | { type: 'SET_ITEM_LIST'; payload: { itemId: string; listId: string } }
  | { type: 'REMOVE_ITEM_FROM_LIST'; payload: string }
  | { type: 'DELETE_LIST'; payload: string }
  | { type: 'DELETE_TAG'; payload: string }
  | { type: 'TOGGLE_MULTI_SELECT_MODE' }
  | { type: 'TOGGLE_ITEM_SELECTION'; payload: string }
  | { type: 'SELECT_ALL_ITEMS'; payload: string[] }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'BULK_DELETE_ITEMS'; payload: string[] }
  | { type: 'BULK_SET_LIST'; payload: { itemIds: string[]; listId: string | null } }
  | { type: 'BULK_ADD_TAG'; payload: { itemIds: string[]; tagId: string } }
  | { type: 'BULK_REMOVE_TAG'; payload: { itemIds: string[]; tagId: string } }
  | { type: 'PERMANENT_DELETE_ITEM'; payload: string }
  | { type: 'EMPTY_TRASH' }
  | { type: 'TOGGLE_LEFT_PANEL' }
  | { type: 'TOGGLE_RIGHT_PANEL' }
  | { type: 'TOGGLE_SECTION'; payload: SectionType | DisplaySectionType }
  | { type: 'PREFETCH_TAB_ITEMS'; payload: Item[] }
  | { type: 'REFRESH_TAB_ITEMS'; payload: Item[] }
  | { type: 'ADD_RECENT_ITEM'; payload: string }
  | { type: 'INJECT_ITEM'; payload: Item };

// ─── Reducer (matching production logic) ───────────────────────────

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SELECT_ITEM': {
      const newSelectedId = action.payload;
      let selectTabs: string[];
      if (newSelectedId && !state.openTabIds.includes(newSelectedId)) {
        selectTabs = enforceTabLimit(
          [...state.openTabIds, newSelectedId],
          newSelectedId
        );
      } else if (newSelectedId && state.openTabIds.includes(newSelectedId)) {
        // Tab already open — keep it in its current position
        selectTabs = state.openTabIds;
      } else {
        selectTabs = state.openTabIds;
      }
      return {
        ...state,
        selectedItemId: newSelectedId,
        isNewlyCreatedItem: false,
        openTabIds: selectTabs,
      };
    }

    case 'OPEN_TAB': {
      if (state.openTabIds.includes(action.payload)) {
        // Tab already open — keep it in its current position
        return state;
      }
      const openTabTabs = enforceTabLimit(
        [...state.openTabIds, action.payload],
        state.selectedItemId
      );
      return { ...state, openTabIds: openTabTabs };
    }

    case 'CLOSE_TAB': {
      return {
        ...state,
        openTabIds: state.openTabIds.filter((id) => id !== action.payload),
      };
    }

    case 'REORDER_TABS':
      return { ...state, openTabIds: action.payload };

    case 'COMPLETE_TASK': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload && item.type === 'task'
            ? { ...item, isCompleted: true, section: 'completed' as SectionType, updatedAt: new Date().toISOString() }
            : item
        ),
      };
    }

    case 'UNCOMPLETE_TASK': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload && item.type === 'task'
            ? { ...item, isCompleted: false, section: 'now' as SectionType, updatedAt: new Date().toISOString() }
            : item
        ),
      };
    }

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

    case 'DELETE_LIST':
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload),
        items: state.items.map((item) =>
          item.listId === action.payload ? { ...item, listId: undefined } : item
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

    case 'TOGGLE_MULTI_SELECT_MODE':
      return {
        ...state,
        isMultiSelectMode: !state.isMultiSelectMode,
        selectedItemIds: [],
      };

    case 'TOGGLE_ITEM_SELECTION': {
      const itemId = action.payload;
      const isSelected = state.selectedItemIds.includes(itemId);
      return {
        ...state,
        selectedItemIds: isSelected
          ? state.selectedItemIds.filter((id) => id !== itemId)
          : [...state.selectedItemIds, itemId],
      };
    }

    case 'SELECT_ALL_ITEMS':
      return { ...state, selectedItemIds: action.payload };

    case 'CLEAR_SELECTION':
      return { ...state, selectedItemIds: [], isMultiSelectMode: false };

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

    case 'TOGGLE_LEFT_PANEL':
      return { ...state, leftPanelCollapsed: !state.leftPanelCollapsed };

    case 'TOGGLE_RIGHT_PANEL':
      return { ...state, rightPanelCollapsed: !state.rightPanelCollapsed };

    case 'TOGGLE_SECTION':
      return {
        ...state,
        collapsedSections: state.collapsedSections.includes(action.payload)
          ? state.collapsedSections.filter((s) => s !== action.payload)
          : [...state.collapsedSections, action.payload],
      };

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

    case 'ADD_RECENT_ITEM': {
      const maxRecent = 10;
      const filtered = state.recentItemIds.filter(id => id !== action.payload);
      return {
        ...state,
        recentItemIds: [action.payload, ...filtered].slice(0, maxRecent),
      };
    }

    case 'INJECT_ITEM': {
      const exists = state.items.some((i) => i.id === action.payload.id);
      const newItems = exists ? state.items : [action.payload, ...state.items];
      const newTabs = state.openTabIds.includes(action.payload.id)
        ? state.openTabIds
        : enforceTabLimit(
            [...state.openTabIds, action.payload.id],
            state.selectedItemId
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

    default:
      return state;
  }
}

// ─── Test Helpers ────────────────────────────────────────────────────

function makeNote(overrides: Partial<Note> = {}): Note {
  return {
    id: crypto.randomUUID(),
    type: 'note',
    title: 'Test Note',
    content: '',
    tags: [],
    isPinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 0,
    section: 'now',
    ...overrides,
  };
}

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: crypto.randomUUID(),
    type: 'task',
    title: 'Test Task',
    content: '',
    tags: [],
    isPinned: false,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 0,
    section: 'now',
    ...overrides,
  };
}

function makeTag(overrides: Partial<Tag> = {}): Tag {
  return {
    id: crypto.randomUUID(),
    name: 'Test Tag',
    color: '#ff0000',
    ...overrides,
  };
}

function makeList(overrides: Partial<List> = {}): List {
  return {
    id: crypto.randomUUID(),
    name: 'Test List',
    color: '#0000ff',
    order: 0,
    ...overrides,
  };
}

function makeState(overrides: Partial<State> = {}): State {
  return {
    items: [],
    tags: [],
    lists: [],
    selectedItemId: null,
    isNewlyCreatedItem: false,
    activeFilter: { type: 'all' },
    searchQuery: '',
    sortOrder: 'modified',
    sortDirection: 'desc',
    leftPanelCollapsed: false,
    rightPanelCollapsed: false,
    collapsedSections: [],
    collapsedSectionsPerView: {},
    recentItemIds: [],
    isLoading: false,
    tagPopoverOpen: false,
    selectedItemIds: [],
    isMultiSelectMode: false,
    openTabIds: [],
    hasMore: false,
    total: 0,
    offset: 0,
    isLoadingMore: false,
    cursor: null,
    viewSortPrefs: {},
    injectedItemIds: new Set<string>(),
    ...overrides,
  };
}

// ═══════════════════════════════════════════════════════════════════
// TAB MANAGEMENT
// ═══════════════════════════════════════════════════════════════════

describe('Tab Management', () => {
  describe('SELECT_ITEM', () => {
    it('opens a new tab when selecting an item not in tabs', () => {
      const state = makeState();
      const next = reducer(state, { type: 'SELECT_ITEM', payload: 'item-1' });
      expect(next.openTabIds).toContain('item-1');
      expect(next.selectedItemId).toBe('item-1');
    });

    it('keeps existing tab in place when re-selecting', () => {
      const state = makeState({ openTabIds: ['a', 'b', 'c'] });
      const next = reducer(state, { type: 'SELECT_ITEM', payload: 'a' });
      expect(next.openTabIds).toEqual(['a', 'b', 'c']);
    });

    it('does not change tabs when deselecting (null)', () => {
      const state = makeState({ openTabIds: ['a', 'b'], selectedItemId: 'a' });
      const next = reducer(state, { type: 'SELECT_ITEM', payload: null });
      expect(next.openTabIds).toEqual(['a', 'b']);
      expect(next.selectedItemId).toBeNull();
    });

    it('clears isNewlyCreatedItem on select', () => {
      const state = makeState({ isNewlyCreatedItem: true });
      const next = reducer(state, { type: 'SELECT_ITEM', payload: 'item-1' });
      expect(next.isNewlyCreatedItem).toBe(false);
    });
  });

  describe('OPEN_TAB', () => {
    it('adds a new tab', () => {
      const state = makeState();
      const next = reducer(state, { type: 'OPEN_TAB', payload: 'tab-1' });
      expect(next.openTabIds).toContain('tab-1');
    });

    it('keeps existing tab in place instead of duplicating', () => {
      const state = makeState({ openTabIds: ['a', 'b', 'c'] });
      const next = reducer(state, { type: 'OPEN_TAB', payload: 'a' });
      expect(next.openTabIds).toEqual(['a', 'b', 'c']);
    });
  });

  describe('CLOSE_TAB', () => {
    it('removes the tab from openTabIds', () => {
      const state = makeState({ openTabIds: ['a', 'b', 'c'] });
      const next = reducer(state, { type: 'CLOSE_TAB', payload: 'b' });
      expect(next.openTabIds).toEqual(['a', 'c']);
    });

    it('no-ops if tab is not open', () => {
      const state = makeState({ openTabIds: ['a', 'b'] });
      const next = reducer(state, { type: 'CLOSE_TAB', payload: 'z' });
      expect(next.openTabIds).toEqual(['a', 'b']);
    });
  });

  describe('REORDER_TABS', () => {
    it('replaces openTabIds with the new order', () => {
      const state = makeState({ openTabIds: ['a', 'b', 'c'] });
      const next = reducer(state, { type: 'REORDER_TABS', payload: ['c', 'a', 'b'] });
      expect(next.openTabIds).toEqual(['c', 'a', 'b']);
    });
  });

  describe('15-tab limit (enforceTabLimit)', () => {
    it('allows up to 15 tabs without eviction', () => {
      const tabs = Array.from({ length: 14 }, (_, i) => `tab-${i}`);
      const state = makeState({ openTabIds: tabs });
      const next = reducer(state, { type: 'SELECT_ITEM', payload: 'tab-new' });
      expect(next.openTabIds).toHaveLength(15);
    });

    it('evicts the oldest (LRU) tab when exceeding 15', () => {
      const tabs = Array.from({ length: 15 }, (_, i) => `tab-${i}`);
      const state = makeState({ openTabIds: tabs, selectedItemId: 'tab-14' });
      const next = reducer(state, { type: 'SELECT_ITEM', payload: 'tab-new' });
      expect(next.openTabIds).toHaveLength(15);
      expect(next.openTabIds).not.toContain('tab-0'); // oldest evicted
      expect(next.openTabIds).toContain('tab-new');
    });

    it('does not evict the currently selected tab', () => {
      const tabs = Array.from({ length: 15 }, (_, i) => `tab-${i}`);
      // tab-0 is selected, so tab-1 should be evicted instead
      const state = makeState({ openTabIds: tabs, selectedItemId: 'tab-0' });
      const next = reducer(state, { type: 'OPEN_TAB', payload: 'tab-new' });
      expect(next.openTabIds).toHaveLength(15);
      expect(next.openTabIds).toContain('tab-0'); // selected, not evicted
      expect(next.openTabIds).not.toContain('tab-1'); // oldest non-selected evicted
    });

    it('enforces limit on INJECT_ITEM too', () => {
      const tabs = Array.from({ length: 15 }, (_, i) => `tab-${i}`);
      const state = makeState({ openTabIds: tabs, selectedItemId: 'tab-14' });
      const item = makeNote({ id: 'injected-new' });
      const next = reducer(state, { type: 'INJECT_ITEM', payload: item });
      expect(next.openTabIds).toHaveLength(15);
      expect(next.openTabIds).toContain('injected-new');
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// TASK COMPLETION
// ═══════════════════════════════════════════════════════════════════

describe('Task Completion', () => {
  describe('COMPLETE_TASK', () => {
    it('marks a task as completed and moves to completed section', () => {
      const task = makeTask({ id: 'task-1' });
      const state = makeState({ items: [task] });
      const next = reducer(state, { type: 'COMPLETE_TASK', payload: 'task-1' });
      expect((next.items[0] as Task).isCompleted).toBe(true);
      expect(next.items[0].section).toBe('completed');
    });

    it('does not affect notes', () => {
      const note = makeNote({ id: 'note-1' });
      const state = makeState({ items: [note] });
      const next = reducer(state, { type: 'COMPLETE_TASK', payload: 'note-1' });
      expect(next.items[0].section).toBe('now'); // unchanged
    });

    it('updates the updatedAt timestamp', () => {
      const task = makeTask({ id: 'task-1', updatedAt: '2025-01-01T00:00:00Z' });
      const state = makeState({ items: [task] });
      const next = reducer(state, { type: 'COMPLETE_TASK', payload: 'task-1' });
      expect(next.items[0].updatedAt).not.toBe('2025-01-01T00:00:00Z');
    });
  });

  describe('UNCOMPLETE_TASK', () => {
    it('marks a completed task as not completed and moves to now section', () => {
      const task = makeTask({ id: 'task-1', isCompleted: true, section: 'completed' });
      const state = makeState({ items: [task] });
      const next = reducer(state, { type: 'UNCOMPLETE_TASK', payload: 'task-1' });
      expect((next.items[0] as Task).isCompleted).toBe(false);
      expect(next.items[0].section).toBe('now');
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// ITEM MOVEMENT
// ═══════════════════════════════════════════════════════════════════

describe('Item Movement', () => {
  describe('MOVE_ITEM', () => {
    it('moves a task to a different section', () => {
      const task = makeTask({ id: 'task-1', section: 'now' });
      const state = makeState({ items: [task] });
      const next = reducer(state, {
        type: 'MOVE_ITEM',
        payload: { itemId: 'task-1', section: 'next' },
      });
      expect(next.items[0].section).toBe('next');
    });

    it('marks task as completed when moved to completed section', () => {
      const task = makeTask({ id: 'task-1', section: 'now' });
      const state = makeState({ items: [task] });
      const next = reducer(state, {
        type: 'MOVE_ITEM',
        payload: { itemId: 'task-1', section: 'completed' },
      });
      expect((next.items[0] as Task).isCompleted).toBe(true);
    });

    it('sets a new order when provided', () => {
      const task = makeTask({ id: 'task-1', section: 'now', order: 0 });
      const state = makeState({ items: [task] });
      const next = reducer(state, {
        type: 'MOVE_ITEM',
        payload: { itemId: 'task-1', section: 'now', newOrder: 5 },
      });
      expect(next.items[0].order).toBe(5);
    });

    it('does not move notes to completed section', () => {
      const note = makeNote({ id: 'note-1', section: 'now' });
      const state = makeState({ items: [note] });
      const next = reducer(state, {
        type: 'MOVE_ITEM',
        payload: { itemId: 'note-1', section: 'completed' },
      });
      // Notes can't be "completed", so section stays unchanged
      expect(next.items[0].section).toBe('now');
    });

    it('moves notes to non-completed sections', () => {
      const note = makeNote({ id: 'note-1', section: 'now' });
      const state = makeState({ items: [note] });
      const next = reducer(state, {
        type: 'MOVE_ITEM',
        payload: { itemId: 'note-1', section: 'next' },
      });
      expect(next.items[0].section).toBe('next');
    });
  });

  describe('REORDER_ITEMS', () => {
    it('updates order for items in the specified section', () => {
      const a = makeTask({ id: 'a', section: 'now', order: 0 });
      const b = makeTask({ id: 'b', section: 'now', order: 1 });
      const c = makeTask({ id: 'c', section: 'now', order: 2 });
      const state = makeState({ items: [a, b, c] });
      const next = reducer(state, {
        type: 'REORDER_ITEMS',
        payload: { section: 'now', itemIds: ['c', 'a', 'b'] },
      });
      expect(next.items.find(i => i.id === 'c')!.order).toBe(0);
      expect(next.items.find(i => i.id === 'a')!.order).toBe(1);
      expect(next.items.find(i => i.id === 'b')!.order).toBe(2);
    });

    it('does not affect items in other sections', () => {
      const inNow = makeTask({ id: 'a', section: 'now', order: 0 });
      const inNext = makeTask({ id: 'b', section: 'next', order: 5 });
      const state = makeState({ items: [inNow, inNext] });
      const next = reducer(state, {
        type: 'REORDER_ITEMS',
        payload: { section: 'now', itemIds: ['a'] },
      });
      expect(next.items.find(i => i.id === 'b')!.order).toBe(5); // unchanged
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// LIST MANAGEMENT
// ═══════════════════════════════════════════════════════════════════

describe('List Management', () => {
  describe('SET_ITEM_LIST', () => {
    it('assigns a list to an item', () => {
      const item = makeNote({ id: 'item-1' });
      const state = makeState({ items: [item] });
      const next = reducer(state, {
        type: 'SET_ITEM_LIST',
        payload: { itemId: 'item-1', listId: 'list-1' },
      });
      expect(next.items[0].listId).toBe('list-1');
    });
  });

  describe('REMOVE_ITEM_FROM_LIST', () => {
    it('removes the list assignment from an item', () => {
      const item = makeNote({ id: 'item-1', listId: 'list-1' });
      const state = makeState({ items: [item] });
      const next = reducer(state, { type: 'REMOVE_ITEM_FROM_LIST', payload: 'item-1' });
      expect(next.items[0].listId).toBeUndefined();
    });
  });

  describe('DELETE_LIST', () => {
    it('removes the list from state.lists', () => {
      const list = makeList({ id: 'list-1' });
      const state = makeState({ lists: [list] });
      const next = reducer(state, { type: 'DELETE_LIST', payload: 'list-1' });
      expect(next.lists).toHaveLength(0);
    });

    it('cascades: removes listId from items in the deleted list', () => {
      const list = makeList({ id: 'list-1' });
      const item1 = makeNote({ id: 'item-1', listId: 'list-1' });
      const item2 = makeNote({ id: 'item-2', listId: 'list-2' });
      const state = makeState({ lists: [list], items: [item1, item2] });
      const next = reducer(state, { type: 'DELETE_LIST', payload: 'list-1' });
      expect(next.items[0].listId).toBeUndefined();
      expect(next.items[1].listId).toBe('list-2'); // unaffected
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// TAG MANAGEMENT
// ═══════════════════════════════════════════════════════════════════

describe('Tag Management', () => {
  describe('DELETE_TAG', () => {
    it('removes the tag from state.tags', () => {
      const tag = makeTag({ id: 'tag-1' });
      const state = makeState({ tags: [tag] });
      const next = reducer(state, { type: 'DELETE_TAG', payload: 'tag-1' });
      expect(next.tags).toHaveLength(0);
    });

    it('cascades: removes tagId from all items that had it', () => {
      const tag = makeTag({ id: 'tag-1' });
      const item1 = makeNote({ id: 'item-1', tags: ['tag-1', 'tag-2'] });
      const item2 = makeNote({ id: 'item-2', tags: ['tag-1'] });
      const item3 = makeNote({ id: 'item-3', tags: ['tag-3'] });
      const state = makeState({ tags: [tag], items: [item1, item2, item3] });
      const next = reducer(state, { type: 'DELETE_TAG', payload: 'tag-1' });
      expect(next.items[0].tags).toEqual(['tag-2']);
      expect(next.items[1].tags).toEqual([]);
      expect(next.items[2].tags).toEqual(['tag-3']); // unaffected
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// MULTI-SELECT & BULK OPERATIONS
// ═══════════════════════════════════════════════════════════════════

describe('Multi-Select & Bulk Operations', () => {
  describe('TOGGLE_MULTI_SELECT_MODE', () => {
    it('toggles multi-select mode and clears selection', () => {
      const state = makeState({ selectedItemIds: ['a', 'b'] });
      const next = reducer(state, { type: 'TOGGLE_MULTI_SELECT_MODE' });
      expect(next.isMultiSelectMode).toBe(true);
      expect(next.selectedItemIds).toEqual([]);
    });
  });

  describe('TOGGLE_ITEM_SELECTION', () => {
    it('adds item to selection', () => {
      const state = makeState({ isMultiSelectMode: true });
      const next = reducer(state, { type: 'TOGGLE_ITEM_SELECTION', payload: 'item-1' });
      expect(next.selectedItemIds).toEqual(['item-1']);
    });

    it('removes item from selection if already selected', () => {
      const state = makeState({ isMultiSelectMode: true, selectedItemIds: ['item-1', 'item-2'] });
      const next = reducer(state, { type: 'TOGGLE_ITEM_SELECTION', payload: 'item-1' });
      expect(next.selectedItemIds).toEqual(['item-2']);
    });
  });

  describe('SELECT_ALL_ITEMS', () => {
    it('sets selectedItemIds to the provided array', () => {
      const state = makeState();
      const next = reducer(state, { type: 'SELECT_ALL_ITEMS', payload: ['a', 'b', 'c'] });
      expect(next.selectedItemIds).toEqual(['a', 'b', 'c']);
    });
  });

  describe('CLEAR_SELECTION', () => {
    it('clears selection and exits multi-select mode', () => {
      const state = makeState({ isMultiSelectMode: true, selectedItemIds: ['a', 'b'] });
      const next = reducer(state, { type: 'CLEAR_SELECTION' });
      expect(next.selectedItemIds).toEqual([]);
      expect(next.isMultiSelectMode).toBe(false);
    });
  });

  describe('BULK_DELETE_ITEMS', () => {
    it('soft-deletes all specified items and clears selection', () => {
      const a = makeNote({ id: 'a' });
      const b = makeNote({ id: 'b' });
      const c = makeNote({ id: 'c' });
      const state = makeState({ items: [a, b, c], selectedItemIds: ['a', 'b'], isMultiSelectMode: true });
      const next = reducer(state, { type: 'BULK_DELETE_ITEMS', payload: ['a', 'b'] });
      expect(next.items[0].deletedAt).toBeTruthy();
      expect(next.items[0].isPinned).toBe(false);
      expect(next.items[1].deletedAt).toBeTruthy();
      expect(next.items[2].deletedAt).toBeUndefined(); // unaffected
      expect(next.selectedItemIds).toEqual([]);
      expect(next.isMultiSelectMode).toBe(false);
    });
  });

  describe('BULK_SET_LIST', () => {
    it('sets listId on all specified items', () => {
      const a = makeNote({ id: 'a' });
      const b = makeNote({ id: 'b' });
      const state = makeState({ items: [a, b] });
      const next = reducer(state, { type: 'BULK_SET_LIST', payload: { itemIds: ['a', 'b'], listId: 'list-1' } });
      expect(next.items[0].listId).toBe('list-1');
      expect(next.items[1].listId).toBe('list-1');
    });

    it('removes listId when listId is null', () => {
      const a = makeNote({ id: 'a', listId: 'list-1' });
      const state = makeState({ items: [a] });
      const next = reducer(state, { type: 'BULK_SET_LIST', payload: { itemIds: ['a'], listId: null } });
      expect(next.items[0].listId).toBeUndefined();
    });
  });

  describe('BULK_ADD_TAG', () => {
    it('adds tag to specified items', () => {
      const a = makeNote({ id: 'a', tags: [] });
      const b = makeNote({ id: 'b', tags: ['existing'] });
      const state = makeState({ items: [a, b] });
      const next = reducer(state, { type: 'BULK_ADD_TAG', payload: { itemIds: ['a', 'b'], tagId: 'new-tag' } });
      expect(next.items[0].tags).toEqual(['new-tag']);
      expect(next.items[1].tags).toEqual(['existing', 'new-tag']);
    });

    it('does not duplicate tag if item already has it', () => {
      const a = makeNote({ id: 'a', tags: ['tag-1'] });
      const state = makeState({ items: [a] });
      const next = reducer(state, { type: 'BULK_ADD_TAG', payload: { itemIds: ['a'], tagId: 'tag-1' } });
      expect(next.items[0].tags).toEqual(['tag-1']); // no duplicate
    });
  });

  describe('BULK_REMOVE_TAG', () => {
    it('removes tag from specified items', () => {
      const a = makeNote({ id: 'a', tags: ['tag-1', 'tag-2'] });
      const b = makeNote({ id: 'b', tags: ['tag-1'] });
      const state = makeState({ items: [a, b] });
      const next = reducer(state, { type: 'BULK_REMOVE_TAG', payload: { itemIds: ['a', 'b'], tagId: 'tag-1' } });
      expect(next.items[0].tags).toEqual(['tag-2']);
      expect(next.items[1].tags).toEqual([]);
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// TRASH OPERATIONS
// ═══════════════════════════════════════════════════════════════════

describe('Trash Operations', () => {
  describe('PERMANENT_DELETE_ITEM', () => {
    it('removes the item from state entirely', () => {
      const item = makeNote({ id: 'del-1', deletedAt: '2026-01-01T00:00:00Z' });
      const state = makeState({ items: [item], total: 1 });
      const next = reducer(state, { type: 'PERMANENT_DELETE_ITEM', payload: 'del-1' });
      expect(next.items).toHaveLength(0);
      expect(next.total).toBe(0);
    });

    it('deselects the item if it was selected', () => {
      const item = makeNote({ id: 'del-1' });
      const state = makeState({ items: [item], selectedItemId: 'del-1', total: 1 });
      const next = reducer(state, { type: 'PERMANENT_DELETE_ITEM', payload: 'del-1' });
      expect(next.selectedItemId).toBeNull();
    });

    it('does not deselect other items', () => {
      const item = makeNote({ id: 'del-1' });
      const state = makeState({ items: [item], selectedItemId: 'other', total: 1 });
      const next = reducer(state, { type: 'PERMANENT_DELETE_ITEM', payload: 'del-1' });
      expect(next.selectedItemId).toBe('other');
    });
  });

  describe('EMPTY_TRASH', () => {
    it('removes all items with deletedAt set', () => {
      const normal = makeNote({ id: 'n1' });
      const deleted1 = makeNote({ id: 'd1', deletedAt: '2026-01-01T00:00:00Z' });
      const deleted2 = makeNote({ id: 'd2', deletedAt: '2026-01-02T00:00:00Z' });
      const state = makeState({ items: [normal, deleted1, deleted2] });
      const next = reducer(state, { type: 'EMPTY_TRASH' });
      expect(next.items).toHaveLength(1);
      expect(next.items[0].id).toBe('n1');
      expect(next.selectedItemId).toBeNull();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// PANEL TOGGLES
// ═══════════════════════════════════════════════════════════════════

describe('Panel Toggles', () => {
  it('TOGGLE_LEFT_PANEL toggles leftPanelCollapsed', () => {
    const state = makeState({ leftPanelCollapsed: false });
    const next = reducer(state, { type: 'TOGGLE_LEFT_PANEL' });
    expect(next.leftPanelCollapsed).toBe(true);
    const next2 = reducer(next, { type: 'TOGGLE_LEFT_PANEL' });
    expect(next2.leftPanelCollapsed).toBe(false);
  });

  it('TOGGLE_RIGHT_PANEL toggles rightPanelCollapsed', () => {
    const state = makeState({ rightPanelCollapsed: false });
    const next = reducer(state, { type: 'TOGGLE_RIGHT_PANEL' });
    expect(next.rightPanelCollapsed).toBe(true);
  });

  it('TOGGLE_SECTION adds/removes section from collapsedSections', () => {
    const state = makeState({ collapsedSections: [] });
    const next = reducer(state, { type: 'TOGGLE_SECTION', payload: 'now' });
    expect(next.collapsedSections).toContain('now');
    const next2 = reducer(next, { type: 'TOGGLE_SECTION', payload: 'now' });
    expect(next2.collapsedSections).not.toContain('now');
  });
});

// ═══════════════════════════════════════════════════════════════════
// MULTI-DEVICE SYNC (PREFETCH / REFRESH TAB ITEMS)
// ═══════════════════════════════════════════════════════════════════

describe('Multi-Device Sync', () => {
  describe('PREFETCH_TAB_ITEMS', () => {
    it('adds new items to state without duplicating existing ones', () => {
      const existing = makeNote({ id: 'existing-1' });
      const prefetched = makeNote({ id: 'prefetched-1' });
      const state = makeState({ items: [existing] });
      const next = reducer(state, { type: 'PREFETCH_TAB_ITEMS', payload: [prefetched, existing] });
      expect(next.items).toHaveLength(2);
      expect(next.injectedItemIds.has('prefetched-1')).toBe(true);
      expect(next.injectedItemIds.has('existing-1')).toBe(false); // existing items are not injected
    });

    it('returns same state if all items already exist', () => {
      const existing = makeNote({ id: 'existing-1' });
      const state = makeState({ items: [existing] });
      const next = reducer(state, { type: 'PREFETCH_TAB_ITEMS', payload: [existing] });
      expect(next).toBe(state); // same reference — no change
    });
  });

  describe('REFRESH_TAB_ITEMS', () => {
    it('updates items when server version is newer', () => {
      const local = makeNote({ id: 'item-1', title: 'Old Title', updatedAt: '2026-01-01T00:00:00Z' });
      const server = makeNote({ id: 'item-1', title: 'New Title', updatedAt: '2026-01-02T00:00:00Z' });
      const state = makeState({ items: [local] });
      const next = reducer(state, { type: 'REFRESH_TAB_ITEMS', payload: [server] });
      expect(next.items[0].title).toBe('New Title');
    });

    it('does NOT update items when local version is newer', () => {
      const local = makeNote({ id: 'item-1', title: 'Local Title', updatedAt: '2026-01-02T00:00:00Z' });
      const server = makeNote({ id: 'item-1', title: 'Old Server', updatedAt: '2026-01-01T00:00:00Z' });
      const state = makeState({ items: [local] });
      const next = reducer(state, { type: 'REFRESH_TAB_ITEMS', payload: [server] });
      expect(next.items[0].title).toBe('Local Title');
    });

    it('returns same state when no changes detected', () => {
      const item = makeNote({ id: 'item-1', updatedAt: '2026-01-01T00:00:00Z' });
      const state = makeState({ items: [item] });
      const next = reducer(state, { type: 'REFRESH_TAB_ITEMS', payload: [item] });
      expect(next).toBe(state); // same reference
    });

    it('injects items not already in state', () => {
      const existing = makeNote({ id: 'existing-1' });
      const newFromServer = makeNote({ id: 'new-1' });
      const state = makeState({ items: [existing] });
      const next = reducer(state, { type: 'REFRESH_TAB_ITEMS', payload: [newFromServer] });
      expect(next.items).toHaveLength(2);
      expect(next.injectedItemIds.has('new-1')).toBe(true);
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// RECENT ITEMS
// ═══════════════════════════════════════════════════════════════════

describe('Recent Items', () => {
  describe('ADD_RECENT_ITEM', () => {
    it('adds item to the front of recentItemIds', () => {
      const state = makeState({ recentItemIds: ['b', 'c'] });
      const next = reducer(state, { type: 'ADD_RECENT_ITEM', payload: 'a' });
      expect(next.recentItemIds[0]).toBe('a');
    });

    it('deduplicates: moves existing item to front', () => {
      const state = makeState({ recentItemIds: ['a', 'b', 'c'] });
      const next = reducer(state, { type: 'ADD_RECENT_ITEM', payload: 'c' });
      expect(next.recentItemIds).toEqual(['c', 'a', 'b']);
    });

    it('caps at 10 recent items', () => {
      const ids = Array.from({ length: 10 }, (_, i) => `item-${i}`);
      const state = makeState({ recentItemIds: ids });
      const next = reducer(state, { type: 'ADD_RECENT_ITEM', payload: 'new-item' });
      expect(next.recentItemIds).toHaveLength(10);
      expect(next.recentItemIds[0]).toBe('new-item');
      expect(next.recentItemIds).not.toContain('item-9'); // oldest dropped
    });
  });
});
