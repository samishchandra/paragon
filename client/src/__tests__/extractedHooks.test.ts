/**
 * Extracted Hooks — Unit Tests
 *
 * Tests the hooks extracted from ServerMomentumContext during the refactoring.
 * Covers: useSyncStatus, usePreferences, useComputedData, useUICallbacks.
 *
 * These hooks are pure state/logic hooks that don't depend on Supabase,
 * making them straightforward to test with renderHook.
 */
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSyncStatus } from '@/contexts/hooks/useSyncStatus';
import { usePreferences } from '@/contexts/hooks/usePreferences';
import { useComputedData } from '@/contexts/hooks/useComputedData';
import { useUICallbacks } from '@/contexts/hooks/useUICallbacks';
import type { Item, Task, Note, FilterType } from '@/types';
import type { State } from '@/contexts/reducers';
import { initialState } from '@/contexts/reducers';

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

// ─── useSyncStatus ───────────────────────────────────────────────────

describe('useSyncStatus', () => {
  it('initializes with all flags false and lastSyncedAt null', () => {
    const { result } = renderHook(() => useSyncStatus());
    expect(result.current.isFetching).toBe(false);
    expect(result.current.isFetchingItem).toBe(false);
    expect(result.current.isSyncingCatchUp).toBe(false);
    expect(result.current.lastSyncedAt).toBeNull();
  });

  it('setIsFetching toggles isFetching', () => {
    const { result } = renderHook(() => useSyncStatus());
    act(() => result.current.setIsFetching(true));
    expect(result.current.isFetching).toBe(true);
    act(() => result.current.setIsFetching(false));
    expect(result.current.isFetching).toBe(false);
  });

  it('setIsFetchingItem toggles isFetchingItem', () => {
    const { result } = renderHook(() => useSyncStatus());
    act(() => result.current.setIsFetchingItem(true));
    expect(result.current.isFetchingItem).toBe(true);
  });

  it('setIsSyncingCatchUp toggles isSyncingCatchUp', () => {
    const { result } = renderHook(() => useSyncStatus());
    act(() => result.current.setIsSyncingCatchUp(true));
    expect(result.current.isSyncingCatchUp).toBe(true);
  });

  it('setLastSyncedAt stores a Date', () => {
    const { result } = renderHook(() => useSyncStatus());
    const now = new Date();
    act(() => result.current.setLastSyncedAt(now));
    expect(result.current.lastSyncedAt).toBe(now);
  });
});

// ─── usePreferences ──────────────────────────────────────────────────

describe('usePreferences', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => usePreferences());
    expect(result.current.autoReorderChecklist).toBe(true);
    expect(result.current.tasksEnabled).toBe(false);
    expect(result.current.editorPreferences).toEqual({
      fontFamily: 'inter',
      fontSize: 15,
      lineHeight: 'normal',
    });
  });

  it('setTasksEnabled updates tasksEnabled', () => {
    const { result } = renderHook(() => usePreferences());
    act(() => result.current.setTasksEnabled(true));
    expect(result.current.tasksEnabled).toBe(true);
  });

  it('setEditorPreferences merges partial updates', () => {
    const { result } = renderHook(() => usePreferences());
    act(() => result.current.setEditorPreferences({ fontSize: 18 }));
    expect(result.current.editorPreferences).toEqual({
      fontFamily: 'inter',
      fontSize: 18,
      lineHeight: 'normal',
    });
  });

  it('setEditorPreferences preserves unmodified fields', () => {
    const { result } = renderHook(() => usePreferences());
    act(() => result.current.setEditorPreferences({ fontFamily: 'monospace' }));
    expect(result.current.editorPreferences.fontSize).toBe(15);
    expect(result.current.editorPreferences.lineHeight).toBe('normal');
    expect(result.current.editorPreferences.fontFamily).toBe('monospace');
  });

  it('applySettingsFromServer applies all settings at once', () => {
    const { result } = renderHook(() => usePreferences());
    act(() => result.current.applySettingsFromServer({
      auto_reorder_checklist: false,
      tasks_enabled: true,
      editor_font_family: 'georgia',
      editor_font_size: 20,
      editor_line_height: 'relaxed',
    }));
    expect(result.current.autoReorderChecklist).toBe(false);
    expect(result.current.tasksEnabled).toBe(true);
    expect(result.current.editorPreferences).toEqual({
      fontFamily: 'georgia',
      fontSize: 20,
      lineHeight: 'relaxed',
    });
  });

  it('applySettingsFromServer uses defaults for missing fields', () => {
    const { result } = renderHook(() => usePreferences());
    act(() => result.current.applySettingsFromServer({}));
    expect(result.current.autoReorderChecklist).toBe(true);
    expect(result.current.tasksEnabled).toBe(false);
    expect(result.current.editorPreferences).toEqual({
      fontFamily: 'inter',
      fontSize: 15,
      lineHeight: 'normal',
    });
  });

  it('applySettingsFromServer overrides previous setEditorPreferences', () => {
    const { result } = renderHook(() => usePreferences());
    act(() => result.current.setEditorPreferences({ fontSize: 24 }));
    expect(result.current.editorPreferences.fontSize).toBe(24);
    act(() => result.current.applySettingsFromServer({ editor_font_size: 16 }));
    expect(result.current.editorPreferences.fontSize).toBe(16);
  });
});

// ─── useComputedData ─────────────────────────────────────────────────

describe('useComputedData', () => {
  const baseDeps = {
    items: [] as Item[],
    activeFilter: { type: 'all' } as FilterType,
    injectedItemIds: new Set<string>(),
    recentItemIds: [] as string[],
    pinnedItems: [] as Item[],
    recentItemsData: [] as Item[],
  };

  describe('computeViewKey', () => {
    it('returns "all" for all filter', () => {
      const { result } = renderHook(() => useComputedData(baseDeps));
      expect(result.current.computeViewKey()).toBe('all');
    });

    it('returns "tasks" for tasks filter', () => {
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        activeFilter: { type: 'tasks' },
      }));
      expect(result.current.computeViewKey()).toBe('tasks');
    });

    it('returns "tag-xxx" for tag filter', () => {
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        activeFilter: { type: 'tag', tagId: 'abc123' },
      }));
      expect(result.current.computeViewKey()).toBe('tag-abc123');
    });

    it('returns "list-xxx" for list filter', () => {
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        activeFilter: { type: 'list', listId: 'list1' },
      }));
      expect(result.current.computeViewKey()).toBe('list-list1');
    });
  });

  describe('getFilteredItems', () => {
    it('excludes deleted items from non-trash views', () => {
      const items = [
        makeNote({ id: 'a' }),
        makeNote({ id: 'b', deletedAt: new Date().toISOString() }),
      ];
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        items,
      }));
      const filtered = result.current.getFilteredItems();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe('a');
    });

    it('shows deleted items in trash view', () => {
      const items = [
        makeNote({ id: 'a' }),
        makeNote({ id: 'b', deletedAt: new Date().toISOString() }),
      ];
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        items,
        activeFilter: { type: 'trash' },
      }));
      const filtered = result.current.getFilteredItems();
      // Trash view shows non-deleted items that pass the filter + deleted items
      expect(filtered.some(i => i.id === 'b')).toBe(true);
    });

    it('excludes injected items', () => {
      const items = [
        makeNote({ id: 'a' }),
        makeNote({ id: 'injected-1' }),
      ];
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        items,
        injectedItemIds: new Set(['injected-1']),
      }));
      const filtered = result.current.getFilteredItems();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe('a');
    });
  });

  describe('getListCounts', () => {
    it('counts items per list, excluding deleted', () => {
      const items = [
        makeNote({ id: 'a', listId: 'list1' }),
        makeNote({ id: 'b', listId: 'list1' }),
        makeNote({ id: 'c', listId: 'list2' }),
        makeNote({ id: 'd', listId: 'list1', deletedAt: new Date().toISOString() }),
      ];
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        items,
      }));
      const counts = result.current.getListCounts();
      expect(counts.get('list1')).toBe(2);
      expect(counts.get('list2')).toBe(1);
    });

    it('returns empty map for no items', () => {
      const { result } = renderHook(() => useComputedData(baseDeps));
      expect(result.current.getListCounts().size).toBe(0);
    });
  });

  describe('getTagCounts', () => {
    it('counts items per tag, excluding deleted', () => {
      const items = [
        makeNote({ id: 'a', tags: ['t1', 't2'] }),
        makeNote({ id: 'b', tags: ['t1'] }),
        makeNote({ id: 'c', tags: ['t1'], deletedAt: new Date().toISOString() }),
      ];
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        items,
      }));
      const counts = result.current.getTagCounts();
      expect(counts.get('t1')).toBe(2);
      expect(counts.get('t2')).toBe(1);
    });
  });

  describe('getTodoCounts', () => {
    it('counts total and completed tasks', () => {
      const items: Item[] = [
        makeTask({ id: 'a', isCompleted: false }),
        makeTask({ id: 'b', isCompleted: true }),
        makeTask({ id: 'c', isCompleted: false }),
        makeNote({ id: 'd' }), // not a task
      ];
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        items,
      }));
      const counts = result.current.getTodoCounts();
      expect(counts.total).toBe(3);
      expect(counts.completed).toBe(1);
    });

    it('excludes deleted tasks', () => {
      const items: Item[] = [
        makeTask({ id: 'a', isCompleted: false }),
        makeTask({ id: 'b', isCompleted: true, deletedAt: new Date().toISOString() }),
      ];
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        items,
      }));
      const counts = result.current.getTodoCounts();
      expect(counts.total).toBe(1);
      expect(counts.completed).toBe(0);
    });
  });

  describe('getPinnedItems', () => {
    it('returns pinnedItems from sidebar data when available', () => {
      const pinned = [makeNote({ id: 'pinned-1', isPinned: true })];
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        pinnedItems: pinned,
      }));
      expect(result.current.getPinnedItems()).toEqual(pinned);
    });

    it('falls back to items filter when pinnedItems is empty', () => {
      const items = [
        makeNote({ id: 'a', isPinned: true }),
        makeNote({ id: 'b', isPinned: false }),
        makeNote({ id: 'c', isPinned: true, deletedAt: new Date().toISOString() }),
      ];
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        items,
        pinnedItems: [],
      }));
      const pinned = result.current.getPinnedItems();
      expect(pinned).toHaveLength(1);
      expect(pinned[0].id).toBe('a');
    });
  });

  describe('getRecentItems', () => {
    it('returns recentItemsData when available', () => {
      const recent = [makeNote({ id: 'recent-1' })];
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        recentItemsData: recent,
      }));
      expect(result.current.getRecentItems()).toEqual(recent);
    });

    it('falls back to items lookup by recentItemIds', () => {
      const items = [
        makeNote({ id: 'a' }),
        makeNote({ id: 'b' }),
      ];
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        items,
        recentItemIds: ['b', 'a'],
        recentItemsData: [],
      }));
      const recent = result.current.getRecentItems();
      expect(recent).toHaveLength(2);
      expect(recent[0].id).toBe('b');
      expect(recent[1].id).toBe('a');
    });

    it('excludes deleted items from fallback', () => {
      const items = [
        makeNote({ id: 'a', deletedAt: new Date().toISOString() }),
        makeNote({ id: 'b' }),
      ];
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        items,
        recentItemIds: ['a', 'b'],
        recentItemsData: [],
      }));
      const recent = result.current.getRecentItems();
      expect(recent).toHaveLength(1);
      expect(recent[0].id).toBe('b');
    });
  });

  describe('getVisibleItems', () => {
    it('returns filtered items sorted by order', () => {
      const items = [
        makeNote({ id: 'a', order: 3 }),
        makeNote({ id: 'b', order: 1 }),
        makeNote({ id: 'c', order: 2 }),
      ];
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        items,
      }));
      const visible = result.current.getVisibleItems();
      expect(visible.map(i => i.id)).toEqual(['b', 'c', 'a']);
    });
  });

  describe('getItemsBySection', () => {
    it('returns items for a given section sorted by order', () => {
      const items = [
        makeNote({ id: 'a', section: 'now', order: 2 }),
        makeNote({ id: 'b', section: 'later', order: 1 }),
        makeNote({ id: 'c', section: 'now', order: 1 }),
      ];
      const { result } = renderHook(() => useComputedData({
        ...baseDeps,
        items,
      }));
      const nowItems = result.current.getItemsBySection('now');
      expect(nowItems).toHaveLength(2);
      expect(nowItems[0].id).toBe('c');
      expect(nowItems[1].id).toBe('a');
    });
  });
});

// ─── useUICallbacks ──────────────────────────────────────────────────

describe('useUICallbacks', () => {
  const makeSidebarCounts = (overrides: Partial<Record<string, number>> = {}) => ({
    all: 10, tasks: 5, notes: 5, pinned: 2, completed: 1, trash: 0, miscellaneous: 0, todo: 3,
    ...overrides,
  });

  const makeState = (overrides: Partial<State> = {}): State => ({
    ...initialState,
    ...overrides,
  });

  describe('toggleSectionForView', () => {
    it('dispatches TOGGLE_SECTION_FOR_VIEW action', () => {
      const dispatch = vi.fn();
      const { result } = renderHook(() => useUICallbacks({
        dispatch,
        state: makeState(),
        pinnedItems: [],
        tasksEnabled: true,
        sidebarCounts: makeSidebarCounts(),
      }));
      act(() => result.current.toggleSectionForView('all', 'now'));
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TOGGLE_SECTION_FOR_VIEW',
        payload: { viewKey: 'all', sectionId: 'now' },
      });
    });
  });

  describe('isSectionCollapsedForView', () => {
    it('returns false when no sections are collapsed', () => {
      const dispatch = vi.fn();
      const { result } = renderHook(() => useUICallbacks({
        dispatch,
        state: makeState(),
        pinnedItems: [],
        tasksEnabled: true,
        sidebarCounts: makeSidebarCounts(),
      }));
      expect(result.current.isSectionCollapsedForView('all', 'now')).toBe(false);
    });

    it('returns true when section is in collapsed list', () => {
      const dispatch = vi.fn();
      const { result } = renderHook(() => useUICallbacks({
        dispatch,
        state: makeState({
          collapsedSectionsPerView: { 'all': ['now', 'later'] },
        }),
        pinnedItems: [],
        tasksEnabled: true,
        sidebarCounts: makeSidebarCounts(),
      }));
      expect(result.current.isSectionCollapsedForView('all', 'now')).toBe(true);
      expect(result.current.isSectionCollapsedForView('all', 'later')).toBe(true);
      expect(result.current.isSectionCollapsedForView('all', 'completed')).toBe(false);
    });

    it('returns false for a different view key', () => {
      const dispatch = vi.fn();
      const { result } = renderHook(() => useUICallbacks({
        dispatch,
        state: makeState({
          collapsedSectionsPerView: { 'all': ['now'] },
        }),
        pinnedItems: [],
        tasksEnabled: true,
        sidebarCounts: makeSidebarCounts(),
      }));
      expect(result.current.isSectionCollapsedForView('tasks', 'now')).toBe(false);
    });
  });

  describe('addRecentItem', () => {
    it('dispatches ADD_RECENT_ITEM action', () => {
      const dispatch = vi.fn();
      const { result } = renderHook(() => useUICallbacks({
        dispatch,
        state: makeState(),
        pinnedItems: [],
        tasksEnabled: true,
        sidebarCounts: makeSidebarCounts(),
      }));
      act(() => result.current.addRecentItem('item-123'));
      expect(dispatch).toHaveBeenCalledWith({
        type: 'ADD_RECENT_ITEM',
        payload: 'item-123',
      });
    });
  });

  describe('selectedItem', () => {
    it('returns null when no item is selected', () => {
      const dispatch = vi.fn();
      const { result } = renderHook(() => useUICallbacks({
        dispatch,
        state: makeState({ selectedItemId: null }),
        pinnedItems: [],
        tasksEnabled: true,
        sidebarCounts: makeSidebarCounts(),
      }));
      expect(result.current.selectedItem).toBeNull();
    });

    it('finds selected item from items list', () => {
      const dispatch = vi.fn();
      const note = makeNote({ id: 'note-1' });
      const { result } = renderHook(() => useUICallbacks({
        dispatch,
        state: makeState({ selectedItemId: 'note-1', items: [note] }),
        pinnedItems: [],
        tasksEnabled: true,
        sidebarCounts: makeSidebarCounts(),
      }));
      expect(result.current.selectedItem).toEqual(note);
    });

    it('falls back to pinnedItems when not in items list', () => {
      const dispatch = vi.fn();
      const pinned = makeNote({ id: 'pinned-1', isPinned: true });
      const { result } = renderHook(() => useUICallbacks({
        dispatch,
        state: makeState({ selectedItemId: 'pinned-1', items: [] }),
        pinnedItems: [pinned],
        tasksEnabled: true,
        sidebarCounts: makeSidebarCounts(),
      }));
      expect(result.current.selectedItem).toEqual(pinned);
    });

    it('returns null when selected ID is not found anywhere', () => {
      const dispatch = vi.fn();
      const { result } = renderHook(() => useUICallbacks({
        dispatch,
        state: makeState({ selectedItemId: 'nonexistent' }),
        pinnedItems: [],
        tasksEnabled: true,
        sidebarCounts: makeSidebarCounts(),
      }));
      expect(result.current.selectedItem).toBeNull();
    });
  });

  describe('clearNewlyCreatedFlag', () => {
    it('dispatches SELECT_ITEM with current selectedItemId', () => {
      const dispatch = vi.fn();
      const { result } = renderHook(() => useUICallbacks({
        dispatch,
        state: makeState({ selectedItemId: 'item-1' }),
        pinnedItems: [],
        tasksEnabled: true,
        sidebarCounts: makeSidebarCounts(),
      }));
      act(() => result.current.clearNewlyCreatedFlag());
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SELECT_ITEM',
        payload: 'item-1',
      });
    });
  });

  describe('guard: tasks disabled redirect', () => {
    it('dispatches SET_FILTER to "all" when tasks disabled and filter is "notes"', () => {
      const dispatch = vi.fn();
      renderHook(() => useUICallbacks({
        dispatch,
        state: makeState({ activeFilter: { type: 'notes' } }),
        pinnedItems: [],
        tasksEnabled: false,
        sidebarCounts: makeSidebarCounts(),
      }));
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_FILTER',
        payload: { type: 'all' },
      });
    });

    it('does NOT redirect when tasks are enabled', () => {
      const dispatch = vi.fn();
      renderHook(() => useUICallbacks({
        dispatch,
        state: makeState({ activeFilter: { type: 'notes' } }),
        pinnedItems: [],
        tasksEnabled: true,
        sidebarCounts: makeSidebarCounts(),
      }));
      expect(dispatch).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: 'SET_FILTER' })
      );
    });
  });

  describe('guard: sidebar count drops to 0', () => {
    it('redirects to "all" when todo count drops from >0 to 0', () => {
      const dispatch = vi.fn();
      const initialCounts = makeSidebarCounts({ todo: 3 });
      const { rerender } = renderHook(
        ({ counts }) => useUICallbacks({
          dispatch,
          state: makeState({ activeFilter: { type: 'todo' } }),
          pinnedItems: [],
          tasksEnabled: true,
          sidebarCounts: counts,
        }),
        { initialProps: { counts: initialCounts } }
      );
      dispatch.mockClear();
      rerender({ counts: makeSidebarCounts({ todo: 0 }) });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_FILTER',
        payload: { type: 'all' },
      });
    });

    it('does NOT redirect when count stays > 0', () => {
      const dispatch = vi.fn();
      const initialCounts = makeSidebarCounts({ todo: 3 });
      const { rerender } = renderHook(
        ({ counts }) => useUICallbacks({
          dispatch,
          state: makeState({ activeFilter: { type: 'todo' } }),
          pinnedItems: [],
          tasksEnabled: true,
          sidebarCounts: counts,
        }),
        { initialProps: { counts: initialCounts } }
      );
      dispatch.mockClear();
      rerender({ counts: makeSidebarCounts({ todo: 2 }) });
      expect(dispatch).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: 'SET_FILTER' })
      );
    });

    it('redirects when completed count drops to 0', () => {
      const dispatch = vi.fn();
      const initialCounts = makeSidebarCounts({ completed: 5 });
      const { rerender } = renderHook(
        ({ counts }) => useUICallbacks({
          dispatch,
          state: makeState({ activeFilter: { type: 'completed' } }),
          pinnedItems: [],
          tasksEnabled: true,
          sidebarCounts: counts,
        }),
        { initialProps: { counts: initialCounts } }
      );
      dispatch.mockClear();
      rerender({ counts: makeSidebarCounts({ completed: 0 }) });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_FILTER',
        payload: { type: 'all' },
      });
    });
  });
});
