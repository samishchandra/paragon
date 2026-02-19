/**
 * Reducer Logic — Unit Tests
 *
 * Tests the pure reducer function extracted from ServerMomentumContext.
 * Covers: INJECT_ITEM isolation, SET_FILTER clearing injectedItemIds,
 * SET_ITEMS merge behavior, SOFT_DELETE, RESTORE, TOGGLE_PIN, etc.
 *
 * Since the reducer is not exported, we replicate its logic here for
 * testing the state transitions. This acts as a contract test.
 */
import { describe, it, expect } from 'vitest';
import type { Item, Task, Note, Tag, List, FilterType, SortOrder, SectionType, DisplaySectionType } from '@/types';

// ─── Replicate State & Action types ──────────────────────────────────

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

type Action =
  | { type: 'SET_ITEMS'; payload: { items: Item[]; total: number; hasMore: boolean; append?: boolean } }
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'UPDATE_ITEM'; payload: Item }
  | { type: 'SOFT_DELETE_ITEM'; payload: string }
  | { type: 'RESTORE_ITEM'; payload: string }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'TOGGLE_PIN'; payload: string }
  | { type: 'SELECT_ITEM'; payload: string | null }
  | { type: 'INJECT_ITEM'; payload: Item };

// ─── Minimal reducer (matching production logic for tested cases) ────

function reducer(state: State, action: Action): State {
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

    case 'ADD_ITEM':
      return {
        ...state,
        items: [action.payload, ...state.items],
        selectedItemId: action.payload.id,
        isNewlyCreatedItem: true,
        openTabIds: [...state.openTabIds, action.payload.id],
        total: state.total + 1,
      };

    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
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
            ? { ...item, deletedAt: undefined }
            : item
        ),
      };

    case 'SET_FILTER':
      return { ...state, activeFilter: action.payload, selectedItemId: null, offset: 0, items: [], cursor: null, injectedItemIds: new Set<string>() };

    case 'TOGGLE_PIN': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, isPinned: !item.isPinned } : item
        ),
      };
    }

    case 'SELECT_ITEM':
      return { ...state, selectedItemId: action.payload, isNewlyCreatedItem: false };

    case 'INJECT_ITEM': {
      const exists = state.items.some((i) => i.id === action.payload.id);
      const newItems = exists ? state.items : [action.payload, ...state.items];
      const newTabs = state.openTabIds.includes(action.payload.id)
        ? state.openTabIds
        : [...state.openTabIds, action.payload.id];
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

// ─── getFilteredItems (matching production logic) ────────────────────

function getFilteredItems(state: State): Item[] {
  return state.items.filter((item) => {
    // Always show deleted items in trash view
    if (item.deletedAt && state.activeFilter.type !== 'trash') return false;
    // In trash view, show non-deleted items that pass through (production shows deleted items)
    if (!item.deletedAt && state.activeFilter.type === 'trash') return false;
    if (item.deletedAt && state.activeFilter.type === 'trash') return true;
    // Exclude injected items
    if (state.injectedItemIds.has(item.id)) return false;
    return true;
  });
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

// ─── INJECT_ITEM Tests ───────────────────────────────────────────────

describe('INJECT_ITEM', () => {
  it('adds item to state.items and tracks it in injectedItemIds', () => {
    const item = makeNote({ id: 'injected-1' });
    const state = makeState();
    const next = reducer(state, { type: 'INJECT_ITEM', payload: item });

    expect(next.items).toHaveLength(1);
    expect(next.items[0].id).toBe('injected-1');
    expect(next.injectedItemIds.has('injected-1')).toBe(true);
    expect(next.selectedItemId).toBe('injected-1');
  });

  it('opens a tab for the injected item', () => {
    const item = makeNote({ id: 'injected-2' });
    const state = makeState();
    const next = reducer(state, { type: 'INJECT_ITEM', payload: item });

    expect(next.openTabIds).toContain('injected-2');
  });

  it('does NOT duplicate item if it already exists in state', () => {
    const item = makeNote({ id: 'existing-1' });
    const state = makeState({ items: [item] });
    const next = reducer(state, { type: 'INJECT_ITEM', payload: item });

    expect(next.items).toHaveLength(1);
    // Should still select it
    expect(next.selectedItemId).toBe('existing-1');
  });

  it('does NOT duplicate tab if already open', () => {
    const item = makeNote({ id: 'tab-1' });
    const state = makeState({ openTabIds: ['tab-1'] });
    const next = reducer(state, { type: 'INJECT_ITEM', payload: item });

    expect(next.openTabIds.filter((id) => id === 'tab-1')).toHaveLength(1);
  });

  it('injected items are excluded from getFilteredItems', () => {
    const existing = makeNote({ id: 'normal-1' });
    const injected = makeNote({ id: 'injected-1' });
    let state = makeState({ items: [existing] });
    state = reducer(state, { type: 'INJECT_ITEM', payload: injected });

    const filtered = getFilteredItems(state);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('normal-1');
  });

  it('injected items remain accessible via state.items (for tabs/editor)', () => {
    const injected = makeNote({ id: 'injected-3' });
    let state = makeState();
    state = reducer(state, { type: 'INJECT_ITEM', payload: injected });

    expect(state.items.find((i) => i.id === 'injected-3')).toBeTruthy();
  });
});

// ─── SET_FILTER clears injectedItemIds ───────────────────────────────

describe('SET_FILTER', () => {
  it('clears injectedItemIds when filter changes', () => {
    const injected = makeNote({ id: 'injected-1' });
    let state = makeState();
    state = reducer(state, { type: 'INJECT_ITEM', payload: injected });
    expect(state.injectedItemIds.size).toBe(1);

    state = reducer(state, { type: 'SET_FILTER', payload: { type: 'tasks' } });
    expect(state.injectedItemIds.size).toBe(0);
  });

  it('clears items and resets offset on filter change', () => {
    const item = makeNote({ id: 'item-1' });
    let state = makeState({ items: [item], offset: 50, total: 100 });
    state = reducer(state, { type: 'SET_FILTER', payload: { type: 'notes' } });

    expect(state.items).toHaveLength(0);
    expect(state.offset).toBe(0);
    expect(state.cursor).toBeNull();
  });

  it('deselects the current item', () => {
    let state = makeState({ selectedItemId: 'item-1' });
    state = reducer(state, { type: 'SET_FILTER', payload: { type: 'all' } });
    expect(state.selectedItemId).toBeNull();
  });
});

// ─── SET_ITEMS ───────────────────────────────────────────────────────

describe('SET_ITEMS', () => {
  it('replaces items when append is false', () => {
    const old = makeNote({ id: 'old-1' });
    const fresh = makeNote({ id: 'new-1' });
    let state = makeState({ items: [old] });
    state = reducer(state, { type: 'SET_ITEMS', payload: { items: [fresh], total: 1, hasMore: false } });

    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe('new-1');
  });

  it('appends items when append is true', () => {
    const existing = makeNote({ id: 'existing-1' });
    const more = makeNote({ id: 'more-1' });
    let state = makeState({ items: [existing], offset: 1 });
    state = reducer(state, { type: 'SET_ITEMS', payload: { items: [more], total: 2, hasMore: false, append: true } });

    expect(state.items).toHaveLength(2);
    expect(state.offset).toBe(2);
  });

  it('updates total and hasMore', () => {
    let state = makeState();
    state = reducer(state, { type: 'SET_ITEMS', payload: { items: [], total: 42, hasMore: true } });
    expect(state.total).toBe(42);
    expect(state.hasMore).toBe(true);
  });
});

// ─── SOFT_DELETE_ITEM ────────────────────────────────────────────────

describe('SOFT_DELETE_ITEM', () => {
  it('sets deletedAt and unpins the item', () => {
    const item = makeNote({ id: 'del-1', isPinned: true });
    let state = makeState({ items: [item] });
    state = reducer(state, { type: 'SOFT_DELETE_ITEM', payload: 'del-1' });

    expect(state.items[0].deletedAt).toBeTruthy();
    expect(state.items[0].isPinned).toBe(false);
  });

  it('deselects the item if it was selected', () => {
    const item = makeNote({ id: 'del-2' });
    let state = makeState({ items: [item], selectedItemId: 'del-2' });
    state = reducer(state, { type: 'SOFT_DELETE_ITEM', payload: 'del-2' });

    expect(state.selectedItemId).toBeNull();
  });

  it('does NOT deselect other items', () => {
    const item = makeNote({ id: 'del-3' });
    let state = makeState({ items: [item], selectedItemId: 'other-id' });
    state = reducer(state, { type: 'SOFT_DELETE_ITEM', payload: 'del-3' });

    expect(state.selectedItemId).toBe('other-id');
  });
});

// ─── RESTORE_ITEM ────────────────────────────────────────────────────

describe('RESTORE_ITEM', () => {
  it('clears deletedAt on the item', () => {
    const item = makeNote({ id: 'rest-1', deletedAt: '2026-01-01T00:00:00Z' });
    let state = makeState({ items: [item] });
    state = reducer(state, { type: 'RESTORE_ITEM', payload: 'rest-1' });

    expect(state.items[0].deletedAt).toBeUndefined();
  });
});

// ─── TOGGLE_PIN ──────────────────────────────────────────────────────

describe('TOGGLE_PIN', () => {
  it('toggles isPinned from false to true', () => {
    const item = makeNote({ id: 'pin-1', isPinned: false });
    let state = makeState({ items: [item] });
    state = reducer(state, { type: 'TOGGLE_PIN', payload: 'pin-1' });

    expect(state.items[0].isPinned).toBe(true);
  });

  it('toggles isPinned from true to false', () => {
    const item = makeNote({ id: 'pin-2', isPinned: true });
    let state = makeState({ items: [item] });
    state = reducer(state, { type: 'TOGGLE_PIN', payload: 'pin-2' });

    expect(state.items[0].isPinned).toBe(false);
  });

  it('does not affect other items', () => {
    const a = makeNote({ id: 'a', isPinned: false });
    const b = makeNote({ id: 'b', isPinned: true });
    let state = makeState({ items: [a, b] });
    state = reducer(state, { type: 'TOGGLE_PIN', payload: 'a' });

    expect(state.items[0].isPinned).toBe(true);
    expect(state.items[1].isPinned).toBe(true);
  });
});

// ─── UPDATE_ITEM ─────────────────────────────────────────────────────

describe('UPDATE_ITEM', () => {
  it('replaces the matching item in state', () => {
    const item = makeNote({ id: 'upd-1', title: 'Old Title' });
    let state = makeState({ items: [item] });
    const updated = { ...item, title: 'New Title', updatedAt: new Date().toISOString() };
    state = reducer(state, { type: 'UPDATE_ITEM', payload: updated });

    expect(state.items[0].title).toBe('New Title');
  });

  it('does not change items count', () => {
    const item = makeNote({ id: 'upd-2' });
    let state = makeState({ items: [item] });
    state = reducer(state, { type: 'UPDATE_ITEM', payload: { ...item, title: 'Changed' } });

    expect(state.items).toHaveLength(1);
  });
});

// ─── ADD_ITEM ────────────────────────────────────────────────────────

describe('ADD_ITEM', () => {
  it('prepends item and selects it', () => {
    const existing = makeNote({ id: 'existing' });
    const newItem = makeNote({ id: 'new-1' });
    let state = makeState({ items: [existing], total: 1 });
    state = reducer(state, { type: 'ADD_ITEM', payload: newItem });

    expect(state.items[0].id).toBe('new-1');
    expect(state.selectedItemId).toBe('new-1');
    expect(state.isNewlyCreatedItem).toBe(true);
    expect(state.total).toBe(2);
  });

  it('opens a tab for the new item', () => {
    const newItem = makeNote({ id: 'new-2' });
    let state = makeState();
    state = reducer(state, { type: 'ADD_ITEM', payload: newItem });

    expect(state.openTabIds).toContain('new-2');
  });
});

// ─── getFilteredItems with trash view ────────────────────────────────

describe('getFilteredItems', () => {
  it('excludes deleted items in non-trash views', () => {
    const normal = makeNote({ id: 'n1' });
    const deleted = makeNote({ id: 'd1', deletedAt: '2026-01-01T00:00:00Z' });
    const state = makeState({ items: [normal, deleted], activeFilter: { type: 'all' } });

    const filtered = getFilteredItems(state);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('n1');
  });

  it('shows only deleted items in trash view', () => {
    const normal = makeNote({ id: 'n1' });
    const deleted = makeNote({ id: 'd1', deletedAt: '2026-01-01T00:00:00Z' });
    const state = makeState({ items: [normal, deleted], activeFilter: { type: 'trash' } });

    const filtered = getFilteredItems(state);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('d1');
  });

  it('excludes injected items from the filtered list', () => {
    const normal = makeNote({ id: 'n1' });
    const injected = makeNote({ id: 'inj1' });
    const state = makeState({
      items: [normal, injected],
      injectedItemIds: new Set(['inj1']),
    });

    const filtered = getFilteredItems(state);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('n1');
  });

  it('shows deleted items in trash view even if injected', () => {
    const injectedDeleted = makeNote({ id: 'inj-del', deletedAt: '2026-01-01T00:00:00Z' });
    const state = makeState({
      items: [injectedDeleted],
      injectedItemIds: new Set(['inj-del']),
      activeFilter: { type: 'trash' },
    });

    // In trash view, deleted items are shown — the deletedAt+trash check
    // returns true before the injectedItemIds check is reached.
    const filtered = getFilteredItems(state);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('inj-del');
  });
});

// ─── Combined scenarios ──────────────────────────────────────────────

describe('combined scenarios', () => {
  it('inject → filter change → inject again works correctly', () => {
    const item1 = makeNote({ id: 'item-1' });
    const item2 = makeNote({ id: 'item-2' });

    let state = makeState();

    // Inject first item
    state = reducer(state, { type: 'INJECT_ITEM', payload: item1 });
    expect(state.injectedItemIds.size).toBe(1);
    expect(getFilteredItems(state)).toHaveLength(0);

    // Change filter (clears injected)
    state = reducer(state, { type: 'SET_FILTER', payload: { type: 'notes' } });
    expect(state.injectedItemIds.size).toBe(0);
    expect(state.items).toHaveLength(0); // SET_FILTER clears items

    // Inject second item
    state = reducer(state, { type: 'INJECT_ITEM', payload: item2 });
    expect(state.injectedItemIds.size).toBe(1);
    expect(state.injectedItemIds.has('item-2')).toBe(true);
  });

  it('soft delete then restore preserves item in list', () => {
    const item = makeNote({ id: 'sr-1', isPinned: true });
    let state = makeState({ items: [item] });

    state = reducer(state, { type: 'SOFT_DELETE_ITEM', payload: 'sr-1' });
    expect(state.items[0].deletedAt).toBeTruthy();
    expect(state.items[0].isPinned).toBe(false);

    state = reducer(state, { type: 'RESTORE_ITEM', payload: 'sr-1' });
    expect(state.items[0].deletedAt).toBeUndefined();
    // Note: pin is NOT restored (by design)
    expect(state.items[0].isPinned).toBe(false);
  });
});
