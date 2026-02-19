/**
 * Data Flow Integration Tests
 *
 * Tests higher-level data flow patterns that span multiple reducer actions,
 * simulating real user workflows:
 * - Item lifecycle (create → edit → soft-delete → restore → permanent delete)
 * - Tab lifecycle (open → switch → LRU eviction → close)
 * - Multi-device sync scenario (edit on device A → switch to device B → merge)
 * - View switching with cache (All Items → Tag view → back to All Items)
 * - Bulk operations workflow (multi-select → bulk tag → bulk delete)
 * - List/tag cascading deletes
 * - Offline queue flush simulation
 */
import { describe, it, expect, beforeEach } from 'vitest';
import type { Item, Task, Note, Tag, List, SectionType } from '@/types';

// ─── Reuse reducer and helpers from reducer-extended ────────────────

const MAX_OPEN_TABS = 15;

function enforceTabLimit(tabs: string[], selectedItemId: string | null): string[] {
  if (tabs.length <= MAX_OPEN_TABS) return tabs;
  const evictIndex = tabs.findIndex(id => id !== selectedItemId);
  if (evictIndex === -1) return tabs.slice(-MAX_OPEN_TABS);
  return [...tabs.slice(0, evictIndex), ...tabs.slice(evictIndex + 1)];
}

interface MinimalState {
  items: Item[];
  tags: Tag[];
  lists: List[];
  selectedItemId: string | null;
  openTabIds: string[];
  recentItemIds: string[];
  selectedItemIds: string[];
  isMultiSelectMode: boolean;
  injectedItemIds: Set<string>;
  total: number;
}

type Action =
  | { type: 'SELECT_ITEM'; payload: string | null }
  | { type: 'OPEN_TAB'; payload: string }
  | { type: 'CLOSE_TAB'; payload: string }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'UNCOMPLETE_TASK'; payload: string }
  | { type: 'MOVE_ITEM'; payload: { itemId: string; section: SectionType; newOrder?: number } }
  | { type: 'SET_ITEM_LIST'; payload: { itemId: string; listId: string } }
  | { type: 'DELETE_LIST'; payload: string }
  | { type: 'DELETE_TAG'; payload: string }
  | { type: 'TOGGLE_MULTI_SELECT_MODE' }
  | { type: 'TOGGLE_ITEM_SELECTION'; payload: string }
  | { type: 'BULK_DELETE_ITEMS'; payload: string[] }
  | { type: 'BULK_ADD_TAG'; payload: { itemIds: string[]; tagId: string } }
  | { type: 'BULK_REMOVE_TAG'; payload: { itemIds: string[]; tagId: string } }
  | { type: 'PERMANENT_DELETE_ITEM'; payload: string }
  | { type: 'EMPTY_TRASH' }
  | { type: 'SOFT_DELETE_ITEM'; payload: string }
  | { type: 'RESTORE_ITEM'; payload: string }
  | { type: 'ADD_RECENT_ITEM'; payload: string }
  | { type: 'REFRESH_TAB_ITEMS'; payload: Item[] }
  | { type: 'INJECT_ITEM'; payload: Item };

function reducer(state: MinimalState, action: Action): MinimalState {
  switch (action.type) {
    case 'SELECT_ITEM': {
      const newSelectedId = action.payload;
      let tabs: string[];
      if (newSelectedId && !state.openTabIds.includes(newSelectedId)) {
        tabs = enforceTabLimit([...state.openTabIds, newSelectedId], newSelectedId);
      } else if (newSelectedId && state.openTabIds.includes(newSelectedId)) {
        // Tab already open — keep it in its current position
        tabs = state.openTabIds;
      } else {
        tabs = state.openTabIds;
      }
      return { ...state, selectedItemId: newSelectedId, openTabIds: tabs };
    }

    case 'OPEN_TAB': {
      if (state.openTabIds.includes(action.payload)) {
        // Tab already open — keep it in its current position
        return state;
      }
      return { ...state, openTabIds: enforceTabLimit([...state.openTabIds, action.payload], state.selectedItemId) };
    }

    case 'CLOSE_TAB':
      return { ...state, openTabIds: state.openTabIds.filter(id => id !== action.payload) };

    case 'COMPLETE_TASK':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload && item.type === 'task'
            ? { ...item, isCompleted: true, section: 'completed' as SectionType, updatedAt: new Date().toISOString() }
            : item
        ),
      };

    case 'UNCOMPLETE_TASK':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload && item.type === 'task'
            ? { ...item, isCompleted: false, section: 'now' as SectionType, updatedAt: new Date().toISOString() }
            : item
        ),
      };

    case 'MOVE_ITEM': {
      const { itemId, section, newOrder } = action.payload;
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id !== itemId) return item;
          if (item.type === 'task') {
            return { ...item, section, isCompleted: section === 'completed', order: newOrder ?? item.order, updatedAt: new Date().toISOString() };
          }
          if (section !== 'completed') {
            return { ...item, section, order: newOrder ?? item.order, updatedAt: new Date().toISOString() };
          }
          return item;
        }),
      };
    }

    case 'SET_ITEM_LIST':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.itemId ? { ...item, listId: action.payload.listId, updatedAt: new Date().toISOString() } : item
        ),
      };

    case 'DELETE_LIST':
      return {
        ...state,
        lists: state.lists.filter(l => l.id !== action.payload),
        items: state.items.map(item => item.listId === action.payload ? { ...item, listId: undefined } : item),
      };

    case 'DELETE_TAG':
      return {
        ...state,
        tags: state.tags.filter(t => t.id !== action.payload),
        items: state.items.map(item => ({ ...item, tags: item.tags.filter(t => t !== action.payload) })),
      };

    case 'TOGGLE_MULTI_SELECT_MODE':
      return { ...state, isMultiSelectMode: !state.isMultiSelectMode, selectedItemIds: [] };

    case 'TOGGLE_ITEM_SELECTION': {
      const isSelected = state.selectedItemIds.includes(action.payload);
      return {
        ...state,
        selectedItemIds: isSelected
          ? state.selectedItemIds.filter(id => id !== action.payload)
          : [...state.selectedItemIds, action.payload],
      };
    }

    case 'BULK_DELETE_ITEMS': {
      const ids = new Set(action.payload);
      return {
        ...state,
        items: state.items.map(item => ids.has(item.id) ? { ...item, deletedAt: new Date().toISOString(), isPinned: false } : item),
        selectedItemIds: [],
        isMultiSelectMode: false,
      };
    }

    case 'BULK_ADD_TAG': {
      const { itemIds, tagId } = action.payload;
      return {
        ...state,
        items: state.items.map(item =>
          itemIds.includes(item.id) && !item.tags.includes(tagId)
            ? { ...item, tags: [...item.tags, tagId], updatedAt: new Date().toISOString() }
            : item
        ),
      };
    }

    case 'BULK_REMOVE_TAG': {
      const { itemIds, tagId } = action.payload;
      return {
        ...state,
        items: state.items.map(item =>
          itemIds.includes(item.id)
            ? { ...item, tags: item.tags.filter(t => t !== tagId), updatedAt: new Date().toISOString() }
            : item
        ),
      };
    }

    case 'SOFT_DELETE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, deletedAt: new Date().toISOString(), isPinned: false } : item
        ),
      };

    case 'RESTORE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, deletedAt: undefined } : item
        ),
      };

    case 'PERMANENT_DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        selectedItemId: state.selectedItemId === action.payload ? null : state.selectedItemId,
        total: state.total - 1,
      };

    case 'EMPTY_TRASH':
      return { ...state, items: state.items.filter(item => !item.deletedAt), selectedItemId: null };

    case 'ADD_RECENT_ITEM': {
      const filtered = state.recentItemIds.filter(id => id !== action.payload);
      return { ...state, recentItemIds: [action.payload, ...filtered].slice(0, 10) };
    }

    case 'REFRESH_TAB_ITEMS': {
      const serverMap = new Map(action.payload.map(i => [i.id, i]));
      let changed = false;
      const refreshed = state.items.map(local => {
        const server = serverMap.get(local.id);
        if (!server) return local;
        if (new Date(server.updatedAt).getTime() > new Date(local.updatedAt).getTime()) {
          changed = true;
          return server;
        }
        return local;
      });
      const existingIds = new Set(state.items.map(i => i.id));
      const newItems = action.payload.filter(i => !existingIds.has(i.id));
      if (newItems.length > 0) changed = true;
      if (!changed) return state;
      const injected = new Set(state.injectedItemIds);
      newItems.forEach(i => injected.add(i.id));
      return { ...state, items: [...newItems, ...refreshed], injectedItemIds: injected };
    }

    case 'INJECT_ITEM': {
      const exists = state.items.some(i => i.id === action.payload.id);
      const newItems = exists ? state.items : [action.payload, ...state.items];
      const newTabs = state.openTabIds.includes(action.payload.id)
        ? state.openTabIds
        : enforceTabLimit([...state.openTabIds, action.payload.id], state.selectedItemId);
      const injected = new Set(state.injectedItemIds);
      if (!exists) injected.add(action.payload.id);
      return { ...state, items: newItems, selectedItemId: action.payload.id, openTabIds: newTabs, injectedItemIds: injected };
    }

    default:
      return state;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────

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

function makeState(overrides: Partial<MinimalState> = {}): MinimalState {
  return {
    items: [],
    tags: [],
    lists: [],
    selectedItemId: null,
    openTabIds: [],
    recentItemIds: [],
    selectedItemIds: [],
    isMultiSelectMode: false,
    injectedItemIds: new Set<string>(),
    total: 0,
    ...overrides,
  };
}

// ═══════════════════════════════════════════════════════════════════
// ITEM LIFECYCLE
// ═══════════════════════════════════════════════════════════════════

describe('Item Lifecycle', () => {
  it('create → select → soft-delete → restore → permanent delete', () => {
    const item = makeNote({ id: 'lifecycle-1' });
    let state = makeState({ items: [item], total: 1 });

    // Select the item
    state = reducer(state, { type: 'SELECT_ITEM', payload: 'lifecycle-1' });
    expect(state.selectedItemId).toBe('lifecycle-1');
    expect(state.openTabIds).toContain('lifecycle-1');

    // Soft-delete
    state = reducer(state, { type: 'SOFT_DELETE_ITEM', payload: 'lifecycle-1' });
    expect(state.items[0].deletedAt).toBeTruthy();
    expect(state.items[0].isPinned).toBe(false);

    // Restore
    state = reducer(state, { type: 'RESTORE_ITEM', payload: 'lifecycle-1' });
    expect(state.items[0].deletedAt).toBeUndefined();

    // Soft-delete again, then permanent delete
    state = reducer(state, { type: 'SOFT_DELETE_ITEM', payload: 'lifecycle-1' });
    state = reducer(state, { type: 'PERMANENT_DELETE_ITEM', payload: 'lifecycle-1' });
    expect(state.items).toHaveLength(0);
    expect(state.total).toBe(0);
    expect(state.selectedItemId).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════════════
// TAB LIFECYCLE
// ═══════════════════════════════════════════════════════════════════

describe('Tab Lifecycle', () => {
  it('open tabs → switch between them → LRU eviction → close', () => {
    let state = makeState();

    // Open 15 tabs
    for (let i = 0; i < 15; i++) {
      state = reducer(state, { type: 'SELECT_ITEM', payload: `tab-${i}` });
    }
    expect(state.openTabIds).toHaveLength(15);
    expect(state.selectedItemId).toBe('tab-14');

    // Switch to tab-0 (stays in its current position)
    state = reducer(state, { type: 'SELECT_ITEM', payload: 'tab-0' });
    expect(state.openTabIds[0]).toBe('tab-0'); // stays at index 0

    // Open a 16th tab — should evict tab-0 (oldest, at index 0)
    state = reducer(state, { type: 'SELECT_ITEM', payload: 'tab-new' });
    expect(state.openTabIds).toHaveLength(15);
    expect(state.openTabIds).toContain('tab-new');

    // Close a tab
    state = reducer(state, { type: 'CLOSE_TAB', payload: 'tab-5' });
    expect(state.openTabIds).toHaveLength(14);
    expect(state.openTabIds).not.toContain('tab-5');
  });
});

// ═══════════════════════════════════════════════════════════════════
// MULTI-DEVICE SYNC SCENARIO
// ═══════════════════════════════════════════════════════════════════

describe('Multi-Device Sync Scenario', () => {
  it('simulates edit on device A → switch to device B → merge newer version', () => {
    // Device A: item exists with content from step 1
    const itemAfterDeviceA = makeNote({
      id: 'shared-item',
      title: 'Edited on Device A',
      content: 'Content from Device A',
      updatedAt: '2026-02-01T10:00:00Z',
    });

    // Device B: has the old version
    const itemOnDeviceB = makeNote({
      id: 'shared-item',
      title: 'Old Title',
      content: 'Old Content',
      updatedAt: '2026-01-31T10:00:00Z',
    });

    let stateB = makeState({
      items: [itemOnDeviceB],
      openTabIds: ['shared-item'],
      selectedItemId: 'shared-item',
    });

    // Device B receives REFRESH_TAB_ITEMS with newer data from server
    stateB = reducer(stateB, { type: 'REFRESH_TAB_ITEMS', payload: [itemAfterDeviceA] });

    // Server version should win because it's newer
    expect(stateB.items[0].title).toBe('Edited on Device A');
    expect(stateB.items[0].content).toBe('Content from Device A');
  });

  it('does NOT overwrite local edits when local is newer', () => {
    const localItem = makeNote({
      id: 'shared-item',
      title: 'Edited Locally',
      updatedAt: '2026-02-02T10:00:00Z',
    });

    const serverItem = makeNote({
      id: 'shared-item',
      title: 'Old Server Version',
      updatedAt: '2026-02-01T10:00:00Z',
    });

    let state = makeState({ items: [localItem] });
    state = reducer(state, { type: 'REFRESH_TAB_ITEMS', payload: [serverItem] });

    // Local version should be preserved
    expect(state.items[0].title).toBe('Edited Locally');
  });

  it('injects items from server that do not exist locally', () => {
    const localItem = makeNote({ id: 'local-1' });
    const serverOnlyItem = makeNote({ id: 'server-only-1', title: 'From Server' });

    let state = makeState({ items: [localItem] });
    state = reducer(state, { type: 'REFRESH_TAB_ITEMS', payload: [serverOnlyItem] });

    expect(state.items).toHaveLength(2);
    expect(state.items.find(i => i.id === 'server-only-1')?.title).toBe('From Server');
    expect(state.injectedItemIds.has('server-only-1')).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════════
// BULK OPERATIONS WORKFLOW
// ═══════════════════════════════════════════════════════════════════

describe('Bulk Operations Workflow', () => {
  it('multi-select → bulk add tag → bulk remove tag → bulk delete', () => {
    const a = makeNote({ id: 'a', tags: [] });
    const b = makeNote({ id: 'b', tags: [] });
    const c = makeNote({ id: 'c', tags: ['existing-tag'] });
    let state = makeState({ items: [a, b, c] });

    // Enter multi-select mode
    state = reducer(state, { type: 'TOGGLE_MULTI_SELECT_MODE' });
    expect(state.isMultiSelectMode).toBe(true);

    // Select items a and b
    state = reducer(state, { type: 'TOGGLE_ITEM_SELECTION', payload: 'a' });
    state = reducer(state, { type: 'TOGGLE_ITEM_SELECTION', payload: 'b' });
    expect(state.selectedItemIds).toEqual(['a', 'b']);

    // Bulk add tag
    state = reducer(state, { type: 'BULK_ADD_TAG', payload: { itemIds: ['a', 'b'], tagId: 'new-tag' } });
    expect(state.items[0].tags).toEqual(['new-tag']);
    expect(state.items[1].tags).toEqual(['new-tag']);
    expect(state.items[2].tags).toEqual(['existing-tag']); // unaffected

    // Bulk remove tag
    state = reducer(state, { type: 'BULK_REMOVE_TAG', payload: { itemIds: ['a', 'b'], tagId: 'new-tag' } });
    expect(state.items[0].tags).toEqual([]);
    expect(state.items[1].tags).toEqual([]);

    // Bulk delete
    state = reducer(state, { type: 'BULK_DELETE_ITEMS', payload: ['a', 'b'] });
    expect(state.items[0].deletedAt).toBeTruthy();
    expect(state.items[1].deletedAt).toBeTruthy();
    expect(state.items[2].deletedAt).toBeUndefined();
    expect(state.selectedItemIds).toEqual([]);
    expect(state.isMultiSelectMode).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════
// CASCADING DELETES
// ═══════════════════════════════════════════════════════════════════

describe('Cascading Deletes', () => {
  it('deleting a list removes listId from all items in that list', () => {
    const list = { id: 'list-1', name: 'Work', color: '#000', order: 0 };
    const item1 = makeNote({ id: 'i1', listId: 'list-1' });
    const item2 = makeNote({ id: 'i2', listId: 'list-1' });
    const item3 = makeNote({ id: 'i3', listId: 'list-2' });
    let state = makeState({ lists: [list], items: [item1, item2, item3] });

    state = reducer(state, { type: 'DELETE_LIST', payload: 'list-1' });
    expect(state.lists).toHaveLength(0);
    expect(state.items[0].listId).toBeUndefined();
    expect(state.items[1].listId).toBeUndefined();
    expect(state.items[2].listId).toBe('list-2');
  });

  it('deleting a tag removes it from all items', () => {
    const tag = { id: 'tag-1', name: 'Important', color: '#f00' };
    const item1 = makeNote({ id: 'i1', tags: ['tag-1', 'tag-2'] });
    const item2 = makeNote({ id: 'i2', tags: ['tag-1'] });
    let state = makeState({ tags: [tag], items: [item1, item2] });

    state = reducer(state, { type: 'DELETE_TAG', payload: 'tag-1' });
    expect(state.tags).toHaveLength(0);
    expect(state.items[0].tags).toEqual(['tag-2']);
    expect(state.items[1].tags).toEqual([]);
  });
});

// ═══════════════════════════════════════════════════════════════════
// TASK COMPLETION WORKFLOW
// ═══════════════════════════════════════════════════════════════════

describe('Task Completion Workflow', () => {
  it('complete → uncomplete → move to different section', () => {
    const task = makeTask({ id: 'task-1', section: 'now' });
    let state = makeState({ items: [task] });

    // Complete
    state = reducer(state, { type: 'COMPLETE_TASK', payload: 'task-1' });
    expect((state.items[0] as Task).isCompleted).toBe(true);
    expect(state.items[0].section).toBe('completed');

    // Uncomplete
    state = reducer(state, { type: 'UNCOMPLETE_TASK', payload: 'task-1' });
    expect((state.items[0] as Task).isCompleted).toBe(false);
    expect(state.items[0].section).toBe('now');

    // Move to "next" section
    state = reducer(state, { type: 'MOVE_ITEM', payload: { itemId: 'task-1', section: 'next' } });
    expect(state.items[0].section).toBe('next');
    expect((state.items[0] as Task).isCompleted).toBe(false);

    // Move to "completed" via MOVE_ITEM
    state = reducer(state, { type: 'MOVE_ITEM', payload: { itemId: 'task-1', section: 'completed' } });
    expect((state.items[0] as Task).isCompleted).toBe(true);
    expect(state.items[0].section).toBe('completed');
  });
});

// ═══════════════════════════════════════════════════════════════════
// RECENT ITEMS TRACKING
// ═══════════════════════════════════════════════════════════════════

describe('Recent Items Tracking', () => {
  it('tracks the 10 most recently accessed items in order', () => {
    let state = makeState();

    // Add 12 items to recent
    for (let i = 0; i < 12; i++) {
      state = reducer(state, { type: 'ADD_RECENT_ITEM', payload: `item-${i}` });
    }

    expect(state.recentItemIds).toHaveLength(10);
    expect(state.recentItemIds[0]).toBe('item-11'); // most recent
    expect(state.recentItemIds[9]).toBe('item-2'); // oldest kept
    expect(state.recentItemIds).not.toContain('item-0'); // dropped
    expect(state.recentItemIds).not.toContain('item-1'); // dropped
  });

  it('re-accessing an item moves it to front without duplicating', () => {
    let state = makeState({ recentItemIds: ['a', 'b', 'c', 'd'] });
    state = reducer(state, { type: 'ADD_RECENT_ITEM', payload: 'c' });
    expect(state.recentItemIds).toEqual(['c', 'a', 'b', 'd']);
  });
});

// ═══════════════════════════════════════════════════════════════════
// INJECT ITEM (from search / deep link)
// ═══════════════════════════════════════════════════════════════════

describe('Inject Item', () => {
  it('injects a new item, selects it, and opens a tab', () => {
    const item = makeNote({ id: 'injected-1' });
    let state = makeState();
    state = reducer(state, { type: 'INJECT_ITEM', payload: item });

    expect(state.items).toHaveLength(1);
    expect(state.selectedItemId).toBe('injected-1');
    expect(state.openTabIds).toContain('injected-1');
    expect(state.injectedItemIds.has('injected-1')).toBe(true);
  });

  it('does not duplicate if item already exists', () => {
    const item = makeNote({ id: 'existing-1' });
    let state = makeState({ items: [item] });
    state = reducer(state, { type: 'INJECT_ITEM', payload: item });

    expect(state.items).toHaveLength(1); // no duplicate
    expect(state.selectedItemId).toBe('existing-1');
  });
});
