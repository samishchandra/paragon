/**
 * Sidebar Persistence & Import Tag Detection — Unit Tests
 *
 * Covers:
 * - Sidebar section collapsed state persistence in localStorage
 * - Hashtag extraction from markdown content (import feature)
 * - Frontmatter parsing (import feature)
 */
import { describe, it, expect, beforeEach } from 'vitest';

beforeEach(() => {
  localStorage.clear();
});

// ─── Sidebar Section Persistence ─────────────────────────────────────

const SIDEBAR_STORAGE_KEY = 'momentum-sidebar-collapse';

function getStoredCollapseState(section: string, defaultValue: boolean): boolean {
  try {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (!stored) return defaultValue;
    const map = JSON.parse(stored);
    return map[section] ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStoredCollapseState(section: string, collapsed: boolean): void {
  try {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    const map = stored ? JSON.parse(stored) : {};
    map[section] = collapsed;
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

describe('sidebar section persistence', () => {
  it('returns default value when nothing is stored', () => {
    expect(getStoredCollapseState('recent', false)).toBe(false);
    expect(getStoredCollapseState('pinned', true)).toBe(true);
  });

  it('stores and retrieves collapsed state', () => {
    setStoredCollapseState('recent', true);
    expect(getStoredCollapseState('recent', false)).toBe(true);
  });

  it('handles multiple sections independently', () => {
    setStoredCollapseState('recent', true);
    setStoredCollapseState('pinned', false);
    setStoredCollapseState('lists', true);
    setStoredCollapseState('tags', false);

    expect(getStoredCollapseState('recent', false)).toBe(true);
    expect(getStoredCollapseState('pinned', true)).toBe(false);
    expect(getStoredCollapseState('lists', false)).toBe(true);
    expect(getStoredCollapseState('tags', true)).toBe(false);
  });

  it('overwrites previous value for same section', () => {
    setStoredCollapseState('recent', true);
    setStoredCollapseState('recent', false);
    expect(getStoredCollapseState('recent', true)).toBe(false);
  });

  it('handles corrupted localStorage gracefully', () => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, 'not-json');
    expect(getStoredCollapseState('recent', false)).toBe(false);
  });

  it('handles missing section key gracefully', () => {
    setStoredCollapseState('recent', true);
    expect(getStoredCollapseState('nonexistent', false)).toBe(false);
  });
});

// ─── Hashtag Extraction ──────────────────────────────────────────────

/**
 * Extract #hashtags from markdown content, excluding code blocks.
 * Matches production logic from Settings.tsx importMarkdownFile.
 */
function extractHashtags(text: string): string[] {
  // Remove code blocks (``` ... ```)
  const withoutCodeBlocks = text.replace(/```[\s\S]*?```/g, '');
  // Remove inline code (` ... `)
  const withoutInlineCode = withoutCodeBlocks.replace(/`[^`]*`/g, '');
  // Match #hashtags (word chars after #, not preceded by &)
  const matches = withoutInlineCode.match(/(?<![&\w])#(\w[\w-]*)/g) || [];
  return [...new Set(matches.map((m) => m.slice(1).toLowerCase()))];
}

describe('extractHashtags', () => {
  it('extracts simple hashtags', () => {
    expect(extractHashtags('Hello #world')).toEqual(['world']);
  });

  it('extracts multiple hashtags', () => {
    const tags = extractHashtags('This is #work related and #urgent');
    expect(tags).toContain('work');
    expect(tags).toContain('urgent');
    expect(tags).toHaveLength(2);
  });

  it('deduplicates hashtags (case-insensitive)', () => {
    const tags = extractHashtags('#Work and #work again');
    expect(tags).toHaveLength(1);
    expect(tags[0]).toBe('work');
  });

  it('supports hyphens in hashtags', () => {
    expect(extractHashtags('#my-project')).toEqual(['my-project']);
  });

  it('ignores hashtags inside code blocks', () => {
    const text = '```\n#not-a-tag\n```\n#real-tag';
    expect(extractHashtags(text)).toEqual(['real-tag']);
  });

  it('ignores hashtags inside inline code', () => {
    const text = 'Use `#selector` in CSS but #actual-tag';
    expect(extractHashtags(text)).toEqual(['actual-tag']);
  });

  it('ignores HTML entities like &#123;', () => {
    const text = 'Entity &#123; and #real-tag';
    expect(extractHashtags(text)).toEqual(['real-tag']);
  });

  it('returns empty array when no hashtags', () => {
    expect(extractHashtags('No tags here')).toEqual([]);
  });

  it('handles hashtags at start of line', () => {
    expect(extractHashtags('#first-word')).toEqual(['first-word']);
  });

  it('handles multiple hashtags on same line', () => {
    const tags = extractHashtags('#a #b #c');
    expect(tags).toHaveLength(3);
  });

  it('ignores # followed by space (markdown heading)', () => {
    // # followed by non-word char should not match
    const tags = extractHashtags('# Heading\n#tag');
    // "# Heading" — # is followed by space, not a word char, so no match
    // "#tag" — matches
    expect(tags).toEqual(['tag']);
  });

  it('handles empty string', () => {
    expect(extractHashtags('')).toEqual([]);
  });
});

// ─── Frontmatter Parsing ─────────────────────────────────────────────

/**
 * Parse YAML-like frontmatter from markdown content.
 * Matches production logic from Settings.tsx.
 */
function parseFrontmatter(content: string): { metadata: Record<string, any>; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { metadata: {}, body: content };

  const metadata: Record<string, any> = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value: any = line.slice(colonIdx + 1).trim();
    // Parse arrays like [tag1, tag2]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((s: string) => s.trim()).filter(Boolean);
    } else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }
    metadata[key] = value;
  }

  return { metadata, body: match[2] };
}

describe('parseFrontmatter', () => {
  it('parses basic key-value pairs', () => {
    const content = '---\ntype: note\nsection: now\n---\n\nBody text';
    const { metadata, body } = parseFrontmatter(content);
    expect(metadata.type).toBe('note');
    expect(metadata.section).toBe('now');
    expect(body).toBe('\nBody text');
  });

  it('parses boolean values', () => {
    const content = '---\ncompleted: true\npinned: false\n---\nBody';
    const { metadata } = parseFrontmatter(content);
    expect(metadata.completed).toBe(true);
    expect(metadata.pinned).toBe(false);
  });

  it('parses array values', () => {
    const content = '---\ntags: [work, urgent, dev]\n---\nBody';
    const { metadata } = parseFrontmatter(content);
    expect(metadata.tags).toEqual(['work', 'urgent', 'dev']);
  });

  it('returns empty metadata when no frontmatter', () => {
    const content = 'Just plain text';
    const { metadata, body } = parseFrontmatter(content);
    expect(metadata).toEqual({});
    expect(body).toBe('Just plain text');
  });

  it('handles empty frontmatter', () => {
    const content = '---\n\n---\nBody';
    const { metadata, body } = parseFrontmatter(content);
    expect(Object.keys(metadata)).toHaveLength(0);
    expect(body).toBe('Body');
  });

  it('handles date values as strings', () => {
    const content = '---\ndue: 2026-03-15\ncreated: 2026-01-01T00:00:00Z\n---\nBody';
    const { metadata } = parseFrontmatter(content);
    expect(metadata.due).toBe('2026-03-15');
    expect(metadata.created).toBe('2026-01-01T00:00:00Z');
  });

  it('handles list name with spaces', () => {
    const content = '---\nlist: Work Projects\n---\nBody';
    const { metadata } = parseFrontmatter(content);
    expect(metadata.list).toBe('Work Projects');
  });

  it('handles empty array', () => {
    const content = '---\ntags: []\n---\nBody';
    const { metadata } = parseFrontmatter(content);
    expect(metadata.tags).toEqual([]);
  });

  it('parses tags with # prefix (Obsidian format)', () => {
    const content = '---\ntags: [#work, #urgent, #dev]\n---\nBody';
    const { metadata } = parseFrontmatter(content);
    expect(metadata.tags).toEqual(['#work', '#urgent', '#dev']);
  });
});

// ─── Sync Indicator State Logic ──────────────────────────────────────

describe('sync indicator state determination', () => {
  type SyncState = 'synced' | 'syncing' | 'offline' | 'error';

  function determineSyncState(opts: {
    isOnline: boolean;
    isSyncingCatchUp: boolean;
    isSyncingOffline: boolean;
    pendingOfflineCount: number;
  }): SyncState {
    if (!opts.isOnline) return 'offline';
    if (opts.isSyncingCatchUp || opts.isSyncingOffline) return 'syncing';
    if (opts.pendingOfflineCount > 0) return 'error';
    return 'synced';
  }

  it('returns "synced" when online with no pending items', () => {
    expect(determineSyncState({ isOnline: true, isSyncingCatchUp: false, isSyncingOffline: false, pendingOfflineCount: 0 })).toBe('synced');
  });

  it('returns "offline" when not online', () => {
    expect(determineSyncState({ isOnline: false, isSyncingCatchUp: false, isSyncingOffline: false, pendingOfflineCount: 0 })).toBe('offline');
  });

  it('returns "syncing" during catch-up sync', () => {
    expect(determineSyncState({ isOnline: true, isSyncingCatchUp: true, isSyncingOffline: false, pendingOfflineCount: 0 })).toBe('syncing');
  });

  it('returns "syncing" during offline queue flush', () => {
    expect(determineSyncState({ isOnline: true, isSyncingCatchUp: false, isSyncingOffline: true, pendingOfflineCount: 3 })).toBe('syncing');
  });

  it('returns "error" when online but has pending offline items', () => {
    expect(determineSyncState({ isOnline: true, isSyncingCatchUp: false, isSyncingOffline: false, pendingOfflineCount: 5 })).toBe('error');
  });

  it('offline takes priority over pending count', () => {
    expect(determineSyncState({ isOnline: false, isSyncingCatchUp: false, isSyncingOffline: false, pendingOfflineCount: 5 })).toBe('offline');
  });

  it('syncing takes priority over error', () => {
    expect(determineSyncState({ isOnline: true, isSyncingCatchUp: true, isSyncingOffline: false, pendingOfflineCount: 5 })).toBe('syncing');
  });
});
