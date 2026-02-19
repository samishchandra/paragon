/**
 * Local Folder Backup — Integration Tests
 *
 * Tests the full one-way sync flow (app → filesystem) using mocked
 * File System Access API (showDirectoryPicker, FileSystemDirectoryHandle,
 * FileSystemFileHandle, FileSystemWritableFileStream).
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ── Mock apiClient before any imports ──

const mockApiQuery = vi.fn();
vi.mock('@/lib/apiClient', () => ({
  apiQuery: (...args: any[]) => mockApiQuery(...args),
}));

// ── Mock backupLog to prevent console noise ──

vi.mock('@/lib/backupLog', () => ({
  logAutoBackup: vi.fn(),
  logBackupError: vi.fn(),
  logManualBackup: vi.fn(),
}));

// ── Mock File System Access API ──

interface MockFile {
  name: string;
  content: string;
}

interface MockDir {
  name: string;
  files: Map<string, MockFile>;
  dirs: Map<string, MockDir>;
}

function createMockDir(name: string): MockDir {
  return { name, files: new Map(), dirs: new Map() };
}

function createMockWritable() {
  let buffer = '';
  return {
    write: vi.fn(async (data: string) => { buffer += data; }),
    close: vi.fn(async () => {}),
    _getContent: () => buffer,
  };
}

function createMockFileHandle(name: string, parentDir: MockDir) {
  return {
    kind: 'file' as const,
    name,
    createWritable: vi.fn(async () => {
      const writable = createMockWritable();
      const origClose = writable.close;
      writable.close = vi.fn(async () => {
        parentDir.files.set(name, { name, content: writable._getContent() });
        await origClose();
      });
      return writable;
    }),
  };
}

function createMockDirHandle(dir: MockDir): any {
  return {
    kind: 'directory' as const,
    name: dir.name,
    getDirectoryHandle: vi.fn(async (name: string, opts?: { create?: boolean }) => {
      let subDir = dir.dirs.get(name);
      if (!subDir && opts?.create) {
        subDir = createMockDir(name);
        dir.dirs.set(name, subDir);
      }
      if (!subDir) throw new DOMException('Not found', 'NotFoundError');
      return createMockDirHandle(subDir);
    }),
    getFileHandle: vi.fn(async (name: string, opts?: { create?: boolean }) => {
      if (!dir.files.has(name) && !opts?.create) {
        throw new DOMException('Not found', 'NotFoundError');
      }
      return createMockFileHandle(name, dir);
    }),
    removeEntry: vi.fn(async (name: string) => {
      if (dir.files.has(name)) {
        dir.files.delete(name);
      } else if (dir.dirs.has(name)) {
        dir.dirs.delete(name);
      } else {
        throw new DOMException('Not found', 'NotFoundError');
      }
    }),
    requestPermission: vi.fn(async () => 'granted'),
  };
}

// ── Mock IndexedDB (synchronous resolution) ──

function createMockIDB() {
  const store = new Map<string, any>();

  const mockObjectStore = {
    put: vi.fn((value: any, key: string) => {
      store.set(key, value);
      const req = { onsuccess: null as any, onerror: null as any, result: undefined };
      // Resolve synchronously via microtask
      Promise.resolve().then(() => req.onsuccess?.());
      return req;
    }),
    get: vi.fn((key: string) => {
      const req = {
        result: store.get(key) || null,
        onsuccess: null as any,
        onerror: null as any,
      };
      Promise.resolve().then(() => req.onsuccess?.());
      return req;
    }),
    delete: vi.fn((key: string) => {
      store.delete(key);
      const req = { onsuccess: null as any, onerror: null as any };
      Promise.resolve().then(() => req.onsuccess?.());
      return req;
    }),
  };

  const mockTransaction = (mode: string) => {
    const tx = {
      objectStore: vi.fn(() => mockObjectStore),
      oncomplete: null as any,
      onerror: null as any,
    };
    Promise.resolve().then(() => tx.oncomplete?.());
    return tx;
  };

  const mockDB = {
    transaction: vi.fn((_store: string, mode: string) => mockTransaction(mode)),
    createObjectStore: vi.fn(),
  };

  const mockOpenRequest = {
    result: mockDB,
    onupgradeneeded: null as any,
    onsuccess: null as any,
    onerror: null as any,
    error: null,
  };
  Promise.resolve().then(() => {
    mockOpenRequest.onupgradeneeded?.({ target: { result: mockDB } });
    mockOpenRequest.onsuccess?.();
  });

  return mockOpenRequest;
}

// ── Setup ──

let rootDir: MockDir;
let rootDirHandle: any;

beforeEach(() => {
  vi.resetModules();
  localStorage.clear();
  mockApiQuery.mockReset();

  rootDir = createMockDir('MyBackupFolder');
  rootDirHandle = createMockDirHandle(rootDir);

  // Mock showDirectoryPicker
  (globalThis as any).showDirectoryPicker = vi.fn(async () => rootDirHandle);

  // Mock indexedDB
  (globalThis as any).indexedDB = {
    open: vi.fn(() => createMockIDB()),
  };

  // Mock crypto.subtle.digest — spy on existing
  if (globalThis.crypto?.subtle?.digest) {
    vi.spyOn(globalThis.crypto.subtle, 'digest').mockImplementation(
      async (_algo: any, data: ArrayBuffer) => {
        const bytes = new Uint8Array(data);
        const hash = new Uint8Array(32);
        for (let i = 0; i < bytes.length; i++) {
          hash[i % 32] = (hash[i % 32] + bytes[i]) & 0xff;
        }
        return hash.buffer;
      }
    );
  }
});

afterEach(() => {
  vi.restoreAllMocks();
  delete (globalThis as any).showDirectoryPicker;
});

// ── Tests: localBackup.ts ──

describe('localBackup — core module', () => {
  describe('isFileSystemAccessSupported', () => {
    it('returns true when showDirectoryPicker is available', async () => {
      const { isFileSystemAccessSupported } = await import('@/lib/localBackup');
      expect(isFileSystemAccessSupported()).toBe(true);
    });

    it('returns false when showDirectoryPicker is not available', async () => {
      delete (globalThis as any).showDirectoryPicker;
      const { isFileSystemAccessSupported } = await import('@/lib/localBackup');
      expect(isFileSystemAccessSupported()).toBe(false);
    });
  });

  describe('pickFolder', () => {
    it('connects and stores the folder handle', async () => {
      const { pickFolder, isConnected, getFolderName } = await import('@/lib/localBackup');

      expect(isConnected()).toBe(false);
      expect(getFolderName()).toBe('');

      const result = await pickFolder();

      expect(result).toBe(true);
      expect(isConnected()).toBe(true);
      expect(getFolderName()).toBe('MyBackupFolder');
      expect((globalThis as any).showDirectoryPicker).toHaveBeenCalledWith({ mode: 'readwrite' });
    });

    it('returns false when user cancels the picker', async () => {
      (globalThis as any).showDirectoryPicker = vi.fn(async () => {
        const err = new DOMException('User cancelled', 'AbortError');
        throw err;
      });

      const { pickFolder, isConnected } = await import('@/lib/localBackup');
      const result = await pickFolder();

      expect(result).toBe(false);
      expect(isConnected()).toBe(false);
    });

    it('throws when File System Access API is not supported', async () => {
      delete (globalThis as any).showDirectoryPicker;
      const { pickFolder } = await import('@/lib/localBackup');

      await expect(pickFolder()).rejects.toThrow('File System Access API is not supported');
    });

    it('notifies connection listeners on connect', async () => {
      const { pickFolder, onConnectionChange } = await import('@/lib/localBackup');
      const listener = vi.fn();
      onConnectionChange(listener);

      await pickFolder();

      expect(listener).toHaveBeenCalledWith(true);
    });
  });

  describe('writeFile', () => {
    it('creates a file in the specified subdirectory', async () => {
      const { pickFolder, writeFile } = await import('@/lib/localBackup');
      await pickFolder();

      await writeFile('Miscellaneous', 'My Note.md', '# Hello World\n\nContent here.');

      const subDir = rootDir.dirs.get('Miscellaneous');
      expect(subDir).toBeDefined();
      const file = subDir!.files.get('My Note.md');
      expect(file).toBeDefined();
      expect(file!.content).toBe('# Hello World\n\nContent here.');
    });

    it('creates subdirectory if it does not exist', async () => {
      const { pickFolder, writeFile } = await import('@/lib/localBackup');
      await pickFolder();

      expect(rootDir.dirs.has('Work Projects')).toBe(false);
      await writeFile('Work Projects', 'Task.md', '# Task');
      expect(rootDir.dirs.has('Work Projects')).toBe(true);
    });

    it('overwrites existing file with new content', async () => {
      const { pickFolder, writeFile } = await import('@/lib/localBackup');
      await pickFolder();

      await writeFile('Notes', 'Draft.md', 'Version 1');
      await writeFile('Notes', 'Draft.md', 'Version 2');

      const subDir = rootDir.dirs.get('Notes');
      const file = subDir!.files.get('Draft.md');
      expect(file!.content).toBe('Version 2');
    });

    it('throws when no folder is connected', async () => {
      const { writeFile } = await import('@/lib/localBackup');
      await expect(writeFile('Test', 'file.md', 'content')).rejects.toThrow('No backup folder selected');
    });
  });

  describe('deleteFile', () => {
    it('removes a file from the specified subdirectory', async () => {
      const { pickFolder, writeFile, deleteFile } = await import('@/lib/localBackup');
      await pickFolder();

      await writeFile('Miscellaneous', 'ToDelete.md', 'content');
      expect(rootDir.dirs.get('Miscellaneous')!.files.has('ToDelete.md')).toBe(true);

      await deleteFile('Miscellaneous', 'ToDelete.md');
      expect(rootDir.dirs.get('Miscellaneous')!.files.has('ToDelete.md')).toBe(false);
    });

    it('does not throw when file does not exist', async () => {
      const { pickFolder, deleteFile } = await import('@/lib/localBackup');
      await pickFolder();

      await expect(deleteFile('Miscellaneous', 'NonExistent.md')).resolves.toBeUndefined();
    });
  });

  describe('deleteFileByPath', () => {
    it('deletes a file by its relative path', async () => {
      const { pickFolder, writeFile, deleteFileByPath } = await import('@/lib/localBackup');
      await pickFolder();

      await writeFile('Work', 'Report.md', '# Report');
      expect(rootDir.dirs.get('Work')!.files.has('Report.md')).toBe(true);

      await deleteFileByPath('Work/Report.md');
    });

    it('does not throw when path does not exist', async () => {
      const { pickFolder, deleteFileByPath } = await import('@/lib/localBackup');
      await pickFolder();

      await expect(deleteFileByPath('NonExistent/File.md')).resolves.toBeUndefined();
    });
  });

  describe('disconnect', () => {
    it('clears the connection state', async () => {
      const { pickFolder, disconnect, isConnected, getFolderName } = await import('@/lib/localBackup');
      await pickFolder();
      expect(isConnected()).toBe(true);

      disconnect();

      expect(isConnected()).toBe(false);
      expect(getFolderName()).toBe('');
    });

    it('clears backup state from localStorage', async () => {
      const { pickFolder, disconnect, setBackupState, getBackupState } = await import('@/lib/localBackup');
      await pickFolder();

      setBackupState({ lastBackupAt: '2026-01-01', files: {} });
      expect(getBackupState()).not.toBeNull();

      disconnect();
      expect(getBackupState()).toBeNull();
    });

    it('notifies connection listeners on disconnect', async () => {
      const { pickFolder, disconnect, onConnectionChange } = await import('@/lib/localBackup');
      const listener = vi.fn();
      onConnectionChange(listener);

      await pickFolder();
      listener.mockClear();

      disconnect();
      expect(listener).toHaveBeenCalledWith(false);
    });
  });

  describe('sanitizeFilename', () => {
    it('replaces invalid characters with underscores', async () => {
      const { sanitizeFilename } = await import('@/lib/localBackup');
      expect(sanitizeFilename('file<>:"/\\|?*name')).toBe('file_________name');
    });

    it('trims whitespace and collapses multiple spaces', async () => {
      const { sanitizeFilename } = await import('@/lib/localBackup');
      expect(sanitizeFilename('  hello   world  ')).toBe('hello world');
    });

    it('replaces leading dots', async () => {
      const { sanitizeFilename } = await import('@/lib/localBackup');
      expect(sanitizeFilename('...hidden')).toBe('_hidden');
    });

    it('returns Untitled for empty strings', async () => {
      const { sanitizeFilename } = await import('@/lib/localBackup');
      expect(sanitizeFilename('')).toBe('Untitled');
    });

    it('truncates names longer than 200 characters', async () => {
      const { sanitizeFilename } = await import('@/lib/localBackup');
      const longName = 'A'.repeat(250);
      expect(sanitizeFilename(longName).length).toBe(200);
    });
  });

  describe('generateFrontmatter', () => {
    it('generates YAML frontmatter with all fields', async () => {
      const { generateFrontmatter } = await import('@/lib/localBackup');
      const result = generateFrontmatter({
        type: 'task',
        section: 'Work',
        is_completed: true,
        is_pinned: false,
        due_date: '2026-03-01',
        list_name: 'Project Alpha',
        tag_names: ['urgent', 'review'],
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-02-01T00:00:00Z',
      });

      expect(result).toContain('---');
      expect(result).toContain('type: task');
      expect(result).toContain('section: Work');
      expect(result).toContain('completed: true');
      expect(result).toContain('pinned: false');
      expect(result).toContain('due: 2026-03-01');
      expect(result).toContain('list: Project Alpha');
      expect(result).toContain('tags: [urgent, review]');
      expect(result).toContain('created: 2026-01-01T00:00:00Z');
      expect(result).toContain('updated: 2026-02-01T00:00:00Z');
    });

    it('omits optional fields when not provided', async () => {
      const { generateFrontmatter } = await import('@/lib/localBackup');
      const result = generateFrontmatter({ type: 'note' });

      expect(result).toContain('type: note');
      expect(result).not.toContain('section:');
      expect(result).not.toContain('completed:');
      expect(result).not.toContain('due:');
      expect(result).not.toContain('list:');
      expect(result).not.toContain('tags:');
    });

    it('omits tags when array is empty', async () => {
      const { generateFrontmatter } = await import('@/lib/localBackup');
      const result = generateFrontmatter({ type: 'note', tag_names: [] });
      expect(result).not.toContain('tags:');
    });
  });

  describe('contentHash', () => {
    it('returns a consistent hash for the same content', async () => {
      const { contentHash } = await import('@/lib/localBackup');
      const hash1 = await contentHash('Hello World');
      const hash2 = await contentHash('Hello World');
      expect(hash1).toBe(hash2);
    });

    it('returns different hashes for different content', async () => {
      const { contentHash } = await import('@/lib/localBackup');
      const hash1 = await contentHash('Hello World');
      const hash2 = await contentHash('Goodbye World');
      expect(hash1).not.toBe(hash2);
    });

    it('returns a non-empty string', async () => {
      const { contentHash } = await import('@/lib/localBackup');
      const hash = await contentHash('test');
      expect(hash.length).toBeGreaterThan(0);
    });
  });

  describe('backupState persistence', () => {
    it('stores and retrieves backup state from localStorage', async () => {
      const { getBackupState, setBackupState } = await import('@/lib/localBackup');

      expect(getBackupState()).toBeNull();

      const state = {
        lastBackupAt: '2026-02-19T00:00:00Z',
        files: {
          'item-1': { path: 'Misc/Note.md', updatedAt: '2026-02-19', contentHash: 'abc123' },
        },
      };
      setBackupState(state);

      const retrieved = getBackupState();
      expect(retrieved).toEqual(state);
    });

    it('clearBackupState removes the state', async () => {
      const { setBackupState, clearBackupState, getBackupState } = await import('@/lib/localBackup');

      setBackupState({ lastBackupAt: '2026-01-01', files: {} });
      expect(getBackupState()).not.toBeNull();

      clearBackupState();
      expect(getBackupState()).toBeNull();
    });
  });

  describe('connection change listeners', () => {
    it('supports multiple listeners', async () => {
      const { pickFolder, onConnectionChange } = await import('@/lib/localBackup');
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      onConnectionChange(listener1);
      onConnectionChange(listener2);

      await pickFolder();

      expect(listener1).toHaveBeenCalledWith(true);
      expect(listener2).toHaveBeenCalledWith(true);
    });

    it('unsubscribe removes the listener', async () => {
      const { pickFolder, onConnectionChange } = await import('@/lib/localBackup');
      const listener = vi.fn();
      const unsub = onConnectionChange(listener);

      unsub();
      await pickFolder();

      expect(listener).not.toHaveBeenCalled();
    });
  });
});

// ── Tests: localBackupSync.ts ──

describe('localBackupSync — manual sync', () => {
  const mockItems = [
    {
      id: 'item-1',
      type: 'note',
      title: 'Meeting Notes',
      content: 'Discussed project timeline.',
      section: 'work',
      is_completed: false,
      is_pinned: false,
      due_date: null,
      list_id: 'list-1',
      created_at: '2026-01-15T10:00:00Z',
      updated_at: '2026-02-01T14:30:00Z',
      deleted_at: null,
    },
    {
      id: 'item-2',
      type: 'task',
      title: 'Buy groceries',
      content: '- Milk\n- Eggs\n- Bread',
      section: 'personal',
      is_completed: false,
      is_pinned: true,
      due_date: '2026-02-20',
      list_id: null,
      created_at: '2026-02-10T08:00:00Z',
      updated_at: '2026-02-15T09:00:00Z',
      deleted_at: null,
    },
    {
      id: 'item-3',
      type: 'note',
      title: 'Deleted Note',
      content: 'This was deleted.',
      section: 'misc',
      is_completed: false,
      is_pinned: false,
      due_date: null,
      list_id: null,
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-10T00:00:00Z',
      deleted_at: '2026-02-01T00:00:00Z',
    },
  ];

  const mockLists = [{ id: 'list-1', name: 'Work Projects' }];
  const mockTags = [{ id: 'tag-1', name: 'Important' }];
  const mockItemTags = [{ item_id: 'item-1', tag_id: 'tag-1' }];

  function setupApiMock() {
    mockApiQuery.mockImplementation(async (body: any) => {
      if (body.table === 'items') {
        return { data: mockItems, error: null };
      }
      if (body.table === 'lists') {
        return { data: mockLists, error: null };
      }
      if (body.table === 'tags') {
        return { data: mockTags, error: null };
      }
      if (body.table === 'item_tags') {
        return { data: mockItemTags, error: null };
      }
      return { data: [], error: null };
    });
  }

  beforeEach(() => {
    setupApiMock();
  });

  describe('runBackup (delta backup)', () => {
    it('creates files for active items and skips deleted items', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { runBackup, setBackupUserId } = await import('@/lib/localBackupSync');

      await pickFolder();
      setBackupUserId('user-1');

      const result = await runBackup();

      // 2 active items should be uploaded
      expect(result.uploaded).toBe(2);
      // 1 deleted item — but it has no previous state, so nothing to delete
      expect(result.deleted).toBe(0);
      expect(result.errors).toHaveLength(0);

      // Check files were created in the right subdirectories
      const workDir = rootDir.dirs.get('Work Projects');
      expect(workDir).toBeDefined();
      expect(workDir!.files.has('Meeting Notes.md')).toBe(true);

      const miscDir = rootDir.dirs.get('Miscellaneous');
      expect(miscDir).toBeDefined();
      expect(miscDir!.files.has('Buy groceries.md')).toBe(true);
    });

    it('skips unchanged items on second backup', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { runBackup, setBackupUserId } = await import('@/lib/localBackupSync');

      await pickFolder();
      setBackupUserId('user-1');

      // First backup
      const result1 = await runBackup();
      expect(result1.uploaded).toBe(2);

      // Second backup — same data, should skip
      const result2 = await runBackup();
      expect(result2.unchanged).toBe(2);
      expect(result2.uploaded).toBe(0);
    });

    it('reports progress via callback', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { runBackup, setBackupUserId } = await import('@/lib/localBackupSync');

      await pickFolder();
      setBackupUserId('user-1');

      const progressUpdates: any[] = [];
      await runBackup((progress) => progressUpdates.push({ ...progress }));

      expect(progressUpdates.some(p => p.phase === 'fetching')).toBe(true);
      expect(progressUpdates.some(p => p.phase === 'computing')).toBe(true);
      expect(progressUpdates.some(p => p.phase === 'done')).toBe(true);
    });

    it('deletes files for items that were previously backed up but now deleted', async () => {
      const { pickFolder, setBackupState } = await import('@/lib/localBackup');
      const { runBackup, setBackupUserId } = await import('@/lib/localBackupSync');

      await pickFolder();
      setBackupUserId('user-1');

      // Simulate previous backup state that included the now-deleted item
      setBackupState({
        lastBackupAt: '2026-01-15T00:00:00Z',
        files: {
          'item-3': {
            path: 'Miscellaneous/Deleted Note.md',
            updatedAt: '2026-01-10T00:00:00Z',
            contentHash: 'old-hash',
          },
        },
      });

      // Create the file that should be deleted
      const miscDir = createMockDir('Miscellaneous');
      miscDir.files.set('Deleted Note.md', { name: 'Deleted Note.md', content: 'old content' });
      rootDir.dirs.set('Miscellaneous', miscDir);

      const result = await runBackup();

      expect(result.deleted).toBe(1);
      expect(result.uploaded).toBe(2);
    });

    it('handles path changes (item moved to different list)', async () => {
      const { pickFolder, setBackupState } = await import('@/lib/localBackup');
      const { runBackup, setBackupUserId } = await import('@/lib/localBackupSync');

      await pickFolder();
      setBackupUserId('user-1');

      // Simulate previous state where item-1 was in "Old List" folder
      setBackupState({
        lastBackupAt: '2026-01-15T00:00:00Z',
        files: {
          'item-1': {
            path: 'Old List/Meeting Notes.md',
            updatedAt: '2026-01-01T00:00:00Z',
            contentHash: 'different-hash',
          },
        },
      });

      const result = await runBackup();

      // item-1 should be uploaded (path changed from Old List → Work Projects)
      expect(result.uploaded).toBeGreaterThanOrEqual(1);
    });

    it('throws when no folder is connected', async () => {
      const { runBackup, setBackupUserId } = await import('@/lib/localBackupSync');
      setBackupUserId('user-1');

      await expect(runBackup()).rejects.toThrow('No backup folder selected');
    });

    it('cleans up files for items no longer in the database', async () => {
      const { pickFolder, setBackupState } = await import('@/lib/localBackup');
      const { runBackup, setBackupUserId } = await import('@/lib/localBackupSync');

      await pickFolder();
      setBackupUserId('user-1');

      // Simulate previous state with an item that no longer exists in the DB
      setBackupState({
        lastBackupAt: '2026-01-15T00:00:00Z',
        files: {
          'item-gone': {
            path: 'Miscellaneous/Gone Item.md',
            updatedAt: '2026-01-01T00:00:00Z',
            contentHash: 'old-hash',
          },
        },
      });

      const result = await runBackup();

      // The orphaned file should be cleaned up
      expect(result.deleted).toBeGreaterThanOrEqual(1);
    });
  });

  describe('runFullBackup', () => {
    it('uploads all active items regardless of previous state', async () => {
      const { pickFolder, setBackupState } = await import('@/lib/localBackup');
      const { runFullBackup, setBackupUserId } = await import('@/lib/localBackupSync');

      await pickFolder();
      setBackupUserId('user-1');

      // Set previous state (should be ignored by full backup)
      setBackupState({
        lastBackupAt: '2026-01-15T00:00:00Z',
        files: {
          'item-1': {
            path: 'Work Projects/Meeting Notes.md',
            updatedAt: '2026-02-01T14:30:00Z',
            contentHash: 'same-hash',
          },
        },
      });

      const result = await runFullBackup();

      expect(result.uploaded).toBe(2);
      expect(result.unchanged).toBe(0);
      expect(result.errors).toHaveLength(0);
    });

    it('generates markdown with frontmatter for each item', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { runFullBackup, setBackupUserId } = await import('@/lib/localBackupSync');

      await pickFolder();
      setBackupUserId('user-1');

      await runFullBackup();

      const workDir = rootDir.dirs.get('Work Projects');
      expect(workDir).toBeDefined();
      const file = workDir!.files.get('Meeting Notes.md');
      expect(file).toBeDefined();

      expect(file!.content).toContain('---');
      expect(file!.content).toContain('type: note');
      expect(file!.content).toContain('# Meeting Notes');
      expect(file!.content).toContain('Discussed project timeline.');
      expect(file!.content).toContain('tags: [Important]');
      expect(file!.content).toContain('list: Work Projects');
    });

    it('places items without a list in Miscellaneous folder', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { runFullBackup, setBackupUserId } = await import('@/lib/localBackupSync');

      await pickFolder();
      setBackupUserId('user-1');

      await runFullBackup();

      const miscDir = rootDir.dirs.get('Miscellaneous');
      expect(miscDir).toBeDefined();
      expect(miscDir!.files.has('Buy groceries.md')).toBe(true);
    });

    it('includes task metadata in frontmatter', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { runFullBackup, setBackupUserId } = await import('@/lib/localBackupSync');

      await pickFolder();
      setBackupUserId('user-1');

      await runFullBackup();

      const miscDir = rootDir.dirs.get('Miscellaneous');
      const file = miscDir!.files.get('Buy groceries.md');
      expect(file).toBeDefined();

      expect(file!.content).toContain('type: task');
      expect(file!.content).toContain('pinned: true');
      expect(file!.content).toContain('due: 2026-02-20');
    });

    it('throws when no folder is connected', async () => {
      const { runFullBackup, setBackupUserId } = await import('@/lib/localBackupSync');
      setBackupUserId('user-1');

      await expect(runFullBackup()).rejects.toThrow('No backup folder selected');
    });

    it('reports progress via callback', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { runFullBackup, setBackupUserId } = await import('@/lib/localBackupSync');

      await pickFolder();
      setBackupUserId('user-1');

      const progressUpdates: any[] = [];
      await runFullBackup((progress) => progressUpdates.push({ ...progress }));

      expect(progressUpdates.some(p => p.phase === 'fetching')).toBe(true);
      expect(progressUpdates.some(p => p.phase === 'uploading')).toBe(true);
      expect(progressUpdates.some(p => p.phase === 'done')).toBe(true);
      expect(progressUpdates[progressUpdates.length - 1].phase).toBe('done');
    });

    it('updates backup state after completion', async () => {
      const { pickFolder, getBackupState } = await import('@/lib/localBackup');
      const { runFullBackup, setBackupUserId } = await import('@/lib/localBackupSync');

      await pickFolder();
      setBackupUserId('user-1');

      expect(getBackupState()).toBeNull();

      await runFullBackup();

      const state = getBackupState();
      expect(state).not.toBeNull();
      expect(state!.lastBackupAt).toBeDefined();
      expect(Object.keys(state!.files)).toHaveLength(2);
      expect(state!.files['item-1']).toBeDefined();
      expect(state!.files['item-2']).toBeDefined();
      expect(state!.files['item-1'].path).toBe('Work Projects/Meeting Notes.md');
      expect(state!.files['item-2'].path).toBe('Miscellaneous/Buy groceries.md');
    });
  });

  describe('error handling', () => {
    it('reports errors for individual items without failing the whole backup', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { runFullBackup, setBackupUserId } = await import('@/lib/localBackupSync');

      await pickFolder();
      setBackupUserId('user-1');

      // Make the first getDirectoryHandle call fail for one specific subdirectory
      const origGetDirHandle = rootDirHandle.getDirectoryHandle;
      let callCount = 0;
      rootDirHandle.getDirectoryHandle = vi.fn(async (name: string, opts: any) => {
        callCount++;
        if (callCount === 1) {
          throw new Error('Disk full');
        }
        return origGetDirHandle(name, opts);
      });

      const result = await runFullBackup();

      // One item should fail, the other should succeed
      expect(result.errors.length + result.uploaded).toBe(2);
    });

    it('handles API fetch errors gracefully in runBackup', async () => {
      mockApiQuery.mockImplementation(async () => ({
        data: null,
        error: { message: 'Network error' },
      }));

      const { pickFolder } = await import('@/lib/localBackup');
      const { runBackup, setBackupUserId } = await import('@/lib/localBackupSync');

      await pickFolder();
      setBackupUserId('user-1');

      await expect(runBackup()).rejects.toThrow('Failed to fetch items');
    });
  });
});

// ── Tests: autoBackup.ts (status tracking only — no flush) ──

describe('autoBackup — status tracking', () => {
  describe('item backup status', () => {
    it('returns synced for unknown items', async () => {
      const { getItemBackupStatus } = await import('@/lib/autoBackup');
      expect(getItemBackupStatus('unknown-id')).toBe('synced');
    });

    it('marks items as pending when markItemDirty is called', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { markItemDirty, getItemBackupStatus, setAutoBackupEnabled } = await import('@/lib/autoBackup');

      await pickFolder();
      setAutoBackupEnabled(true, 'user-1');

      markItemDirty('item-1');
      expect(getItemBackupStatus('item-1')).toBe('pending');
    });

    it('marks multiple items as pending with markItemsDirty', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { markItemsDirty, getItemBackupStatus, setAutoBackupEnabled } = await import('@/lib/autoBackup');

      await pickFolder();
      setAutoBackupEnabled(true, 'user-1');

      markItemsDirty(['item-1', 'item-2', 'item-3']);
      expect(getItemBackupStatus('item-1')).toBe('pending');
      expect(getItemBackupStatus('item-2')).toBe('pending');
      expect(getItemBackupStatus('item-3')).toBe('pending');
    });

    it('does not mark items when auto-backup is disabled', async () => {
      const { markItemDirty, getItemBackupStatus, setAutoBackupEnabled } = await import('@/lib/autoBackup');

      setAutoBackupEnabled(false);
      markItemDirty('item-1');
      expect(getItemBackupStatus('item-1')).toBe('synced');
    });

    it('does not mark items when not connected', async () => {
      const { markItemDirty, getItemBackupStatus, setAutoBackupEnabled } = await import('@/lib/autoBackup');

      setAutoBackupEnabled(true, 'user-1');
      markItemDirty('item-1');
      expect(getItemBackupStatus('item-1')).toBe('synced');
    });
  });

  describe('hasUnsyncedItems', () => {
    it('returns false when no items are pending', async () => {
      const { hasUnsyncedItems } = await import('@/lib/autoBackup');
      expect(hasUnsyncedItems()).toBe(false);
    });

    it('returns true when items are pending', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { markItemDirty, hasUnsyncedItems, setAutoBackupEnabled } = await import('@/lib/autoBackup');

      await pickFolder();
      setAutoBackupEnabled(true, 'user-1');
      markItemDirty('item-1');

      expect(hasUnsyncedItems()).toBe(true);
    });
  });

  describe('getPendingCount', () => {
    it('returns 0 when no items are pending', async () => {
      const { getPendingCount } = await import('@/lib/autoBackup');
      expect(getPendingCount()).toBe(0);
    });

    it('returns correct count of pending items', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { markItemsDirty, getPendingCount, setAutoBackupEnabled } = await import('@/lib/autoBackup');

      await pickFolder();
      setAutoBackupEnabled(true, 'user-1');
      markItemsDirty(['a', 'b', 'c']);

      expect(getPendingCount()).toBe(3);
    });
  });

  describe('setAutoBackupEnabled', () => {
    it('clears all pending items when disabled', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { markItemsDirty, getPendingCount, setAutoBackupEnabled, hasUnsyncedItems } = await import('@/lib/autoBackup');

      await pickFolder();
      setAutoBackupEnabled(true, 'user-1');
      markItemsDirty(['a', 'b', 'c']);
      expect(getPendingCount()).toBe(3);

      setAutoBackupEnabled(false);
      expect(getPendingCount()).toBe(0);
      expect(hasUnsyncedItems()).toBe(false);
    });
  });

  describe('status change listeners', () => {
    it('notifies item status listeners on status change', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { markItemDirty, onItemBackupStatusChange, setAutoBackupEnabled } = await import('@/lib/autoBackup');

      await pickFolder();
      setAutoBackupEnabled(true, 'user-1');

      const listener = vi.fn();
      onItemBackupStatusChange(listener);

      markItemDirty('item-1');
      expect(listener).toHaveBeenCalledWith('item-1', 'pending');
    });

    it('notifies global listeners on any status change', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { markItemDirty, onGlobalBackupStatusChange, setAutoBackupEnabled } = await import('@/lib/autoBackup');

      await pickFolder();
      setAutoBackupEnabled(true, 'user-1');

      const listener = vi.fn();
      onGlobalBackupStatusChange(listener);

      markItemDirty('item-1');
      expect(listener).toHaveBeenCalled();
    });

    it('unsubscribe removes the listener', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { markItemDirty, onItemBackupStatusChange, setAutoBackupEnabled } = await import('@/lib/autoBackup');

      await pickFolder();
      setAutoBackupEnabled(true, 'user-1');

      const listener = vi.fn();
      const unsub = onItemBackupStatusChange(listener);
      unsub();

      markItemDirty('item-1');
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('isAutoBackupEnabled', () => {
    it('returns false by default', async () => {
      const { isAutoBackupEnabled } = await import('@/lib/autoBackup');
      expect(isAutoBackupEnabled()).toBe(false);
    });

    it('returns true when enabled and connected', async () => {
      const { pickFolder } = await import('@/lib/localBackup');
      const { isAutoBackupEnabled, setAutoBackupEnabled } = await import('@/lib/autoBackup');

      await pickFolder();
      setAutoBackupEnabled(true, 'user-1');
      expect(isAutoBackupEnabled()).toBe(true);
    });

    it('returns false when enabled but not connected', async () => {
      const { isAutoBackupEnabled, setAutoBackupEnabled } = await import('@/lib/autoBackup');

      setAutoBackupEnabled(true, 'user-1');
      expect(isAutoBackupEnabled()).toBe(false);
    });
  });
});
