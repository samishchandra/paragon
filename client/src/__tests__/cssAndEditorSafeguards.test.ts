/**
 * CSS & Editor Safeguards — Tests
 *
 * Covers:
 * - Callout CSS: display:contents must NOT be used (causes text flash)
 * - Editor skeleton: loading state must show skeleton, not text
 * - Slash command: executeCommand must delete slash text before applying
 * - MiddlePanel header: must be hidden on mobile (no double border)
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const PROJECT_ROOT = resolve(__dirname, '..', '..', '..');

// Resolve the paragon package path dynamically
function resolveParagonPath(relativePath: string): string {
  try {
    // Try to resolve from the @samishkolli/paragon package
    const paragonBase = resolve(PROJECT_ROOT, 'node_modules', '@samishkolli', 'paragon');
    return resolve(paragonBase, relativePath);
  } catch {
    // Fallback to old path structure
    return resolve(PROJECT_ROOT, 'paragon', relativePath);
  }
}

// ─── Callout CSS Safeguard ───────────────────────────────────────────

describe('callout CSS safeguard', () => {
  it('does NOT use display:contents on callout-content children (causes text flash)', () => {
    const cssPath = resolveParagonPath(
      'client/src/components/editor/editor.css'
    );
    const css = readFileSync(cssPath, 'utf-8');

    // Check that .callout-content > div does NOT have display: contents
    // This was the root cause of text disappearing during editing
    const calloutContentRules = css.match(/\.callout-content\s*>\s*div\s*\{[^}]*\}/g) || [];
    for (const rule of calloutContentRules) {
      expect(rule).not.toMatch(/display\s*:\s*contents/);
    }
  });

  it('callout-content children use display:block instead', () => {
    const cssPath = resolveParagonPath(
      'client/src/components/editor/editor.css'
    );
    const css = readFileSync(cssPath, 'utf-8');

    const calloutContentRules = css.match(/\.callout-content\s*>\s*div\s*\{[^}]*\}/g) || [];
    // At least one rule should exist and use display: block
    expect(calloutContentRules.length).toBeGreaterThan(0);
    const hasBlock = calloutContentRules.some((rule) => /display\s*:\s*block/.test(rule));
    expect(hasBlock).toBe(true);
  });
});

// ─── Editor Loading Skeleton Safeguard ───────────────────────────────

describe('editor loading skeleton safeguard', () => {
  it('EditorWrapper does NOT show "Loading editor..." text', () => {
    const wrapperPath = resolve(
      PROJECT_ROOT,
      'client/src/components/editor/EditorWrapper.tsx'
    );
    const content = readFileSync(wrapperPath, 'utf-8');

    // Should not contain the old loading text
    expect(content).not.toContain('Loading editor...');
  });

  it('EditorWrapper uses skeleton/shimmer animation for loading', () => {
    const wrapperPath = resolve(
      PROJECT_ROOT,
      'client/src/components/editor/EditorWrapper.tsx'
    );
    const content = readFileSync(wrapperPath, 'utf-8');

    // Should contain animate-pulse (Tailwind shimmer) for the loading state
    expect(content).toContain('animate-pulse');
  });

  it('MarkdownEditor does NOT show "Loading editor..." text', () => {
    const editorPath = resolveParagonPath(
      'client/src/components/editor/MarkdownEditor.tsx'
    );
    const content = readFileSync(editorPath, 'utf-8');

    expect(content).not.toContain('Loading editor...');
  });
});

// ─── MiddlePanel Mobile Header Safeguard ─────────────────────────────

describe('MiddlePanel mobile double border safeguard', () => {
  it('MiddlePanel header section is hidden on mobile', () => {
    const panelPath = resolve(
      PROJECT_ROOT,
      'client/src/components/MiddlePanel.tsx'
    );
    const content = readFileSync(panelPath, 'utf-8');

    // The header div that contains the search bar should have hidden md:block or hidden md:flex
    // to prevent double border on mobile (Home.tsx already has mobile header)
    expect(content).toMatch(/hidden\s+md:(block|flex)/);
  });
});

// ─── Slash Command Safeguard ─────────────────────────────────────────

describe('slash command safeguard', () => {
  it('SlashCommands uses textBetween for reliable slash text detection', () => {
    const slashPath = resolveParagonPath(
      'client/src/components/editor/SlashCommands.tsx'
    );
    const content = readFileSync(slashPath, 'utf-8');

    // The fix uses state.doc.textBetween to reliably find the slash text
    // instead of the unreliable $from.nodeBefore?.textContent
    expect(content).toContain('textBetween');
  });

  it('SlashCommands deletes slash text before applying command', () => {
    const slashPath = resolveParagonPath(
      'client/src/components/editor/SlashCommands.tsx'
    );
    const content = readFileSync(slashPath, 'utf-8');

    // Should contain deleteRange or delete logic before the command execution
    expect(content).toMatch(/delete|deleteRange/);
  });
});

// ─── Injected Item Isolation Safeguard ───────────────────────────────

describe('injected item isolation safeguard', () => {
  it('Reducer types define injectedItemIds in State', () => {
    const typesPath = resolve(
      PROJECT_ROOT,
      'client/src/contexts/reducers/types.ts'
    );
    const content = readFileSync(typesPath, 'utf-8');

    expect(content).toContain('injectedItemIds');

    const indexPath = resolve(
      PROJECT_ROOT,
      'client/src/contexts/reducers/index.ts'
    );
    const indexContent = readFileSync(indexPath, 'utf-8');
    expect(indexContent).toContain("new Set<string>()");
  });

  it('getFilteredItems excludes injected items', () => {
    const hookPath = resolve(
      PROJECT_ROOT,
      'client/src/contexts/hooks/useComputedData.ts'
    );
    const content = readFileSync(hookPath, 'utf-8');

    // The filter function should check injectedItemIds
    expect(content).toContain('injectedItemIds.has(item.id)');
  });

  it('SET_FILTER clears injectedItemIds', () => {
    const uiReducerPath = resolve(
      PROJECT_ROOT,
      'client/src/contexts/reducers/uiReducer.ts'
    );
    const content = readFileSync(uiReducerPath, 'utf-8');

    // SET_FILTER case should reset injectedItemIds
    // Look for the pattern in the SET_FILTER case
    const setFilterMatch = content.match(/case 'SET_FILTER'[\s\S]*?injectedItemIds:\s*new Set/);
    expect(setFilterMatch).toBeTruthy();
  });
});

// ─── Visibility Sync Safeguard ───────────────────────────────────────

describe('visibility sync safeguard', () => {
  it('context syncs tags and lists during visibility change', () => {
    // visibilitychange logic was extracted to the useVisibilitySync hook
    const hookPath = resolve(
      PROJECT_ROOT,
      'client/src/contexts/hooks/useVisibilitySync.ts'
    );
    const content = readFileSync(hookPath, 'utf-8');

    // Should contain visibilitychange listener
    expect(content).toContain('visibilitychange');

    // Should fetch tags and lists during catch-up
    expect(content).toContain('fetchTags');
    expect(content).toContain('fetchLists');
  });

  it('context exposes isSyncingCatchUp in the context value', () => {
    // isSyncingCatchUp is now assembled in useProviderState orchestrator hook
    const hookPath = resolve(
      PROJECT_ROOT,
      'client/src/contexts/hooks/useProviderState.ts'
    );
    const content = readFileSync(hookPath, 'utf-8');

    expect(content).toContain('isSyncingCatchUp');
  });
});

// ─── Offline Queue Wiring Safeguard ──────────────────────────────────

describe('offline queue wiring safeguard', () => {
  it('context imports offlineQueue module (via useOnlineStatus hook)', () => {
    // offlineQueue import was extracted to the useOnlineStatus hook
    const hookPath = resolve(
      PROJECT_ROOT,
      'client/src/contexts/hooks/useOnlineStatus.ts'
    );
    const content = readFileSync(hookPath, 'utf-8');

    expect(content).toContain("import * as offlineQueue from '@/lib/offlineQueue'");
  });

  it('context uses offlineQueue.enqueue for mutations', () => {
    // enqueueOffline usage is spread across the orchestrator and extracted hooks
    const files = [
      'client/src/contexts/hooks/useProviderState.ts',
      'client/src/contexts/hooks/useItemOperations.ts',
      'client/src/contexts/hooks/useTagListOperations.ts',
    ];
    let totalCount = 0;
    for (const file of files) {
      const content = readFileSync(resolve(PROJECT_ROOT, file), 'utf-8');
      totalCount += (content.match(/enqueueOffline|offlineQueue\.enqueue/g) || []).length;
    }
    // Many mutations: create, update, delete, pin, complete, move, tags, lists, etc.
    expect(totalCount).toBeGreaterThanOrEqual(10);
  });
});

// ─── Duplicate Item Timestamp Safeguard ──────────────────────────────

describe('duplicate item timestamp safeguard', () => {
  it('duplicateItem flushes pending save before duplicating', () => {
    const contextPath = resolve(
      PROJECT_ROOT,
      'client/src/contexts/hooks/useItemOperations.ts'
    );
    const content = readFileSync(contextPath, 'utf-8');

    // The duplicateItem function should contain clearTimeout to cancel pending debounced save
    // and use sourceItem.updatedAt (not new Date()) to preserve the original timestamp
    expect(content).toContain('clearTimeout(pendingTimer)');
    expect(content).toContain('updated_at: sourceItem.updatedAt');
  });
});

// ─── Settings Import Safeguard ───────────────────────────────────────

describe('settings import safeguard', () => {
  it('Settings does NOT have Import from ZIP button', () => {
    const settingsPath = resolve(
      PROJECT_ROOT,
      'client/src/pages/Settings.tsx'
    );
    const content = readFileSync(settingsPath, 'utf-8');

    expect(content).not.toContain('Import from ZIP');
  });

  it('Settings does NOT have Import JSON button', () => {
    const settingsPath = resolve(
      PROJECT_ROOT,
      'client/src/pages/Settings.tsx'
    );
    const content = readFileSync(settingsPath, 'utf-8');

    expect(content).not.toContain('Import JSON');
    expect(content).not.toContain('Import from JSON');
  });

  it('Settings does NOT show Supabase Database card', () => {
    const settingsPath = resolve(
      PROJECT_ROOT,
      'client/src/pages/Settings.tsx'
    );
    const content = readFileSync(settingsPath, 'utf-8');

    expect(content).not.toContain('Database Statistics');
    expect(content).not.toContain('Supabase Database');
  });

  it('Settings has Import from Folder with progress bar', () => {
    const settingsPath = resolve(
      PROJECT_ROOT,
      'client/src/pages/Settings.tsx'
    );
    const content = readFileSync(settingsPath, 'utf-8');

    expect(content).toContain('Import from Folder');
    expect(content).toContain('importProgress');
  });

  it('Settings has Local Backup section', () => {
    const settingsPath = resolve(
      PROJECT_ROOT,
      'client/src/pages/Settings.tsx'
    );
    const content = readFileSync(settingsPath, 'utf-8');

    expect(content).toContain('Backup Folder');
    expect(content).toContain('Backup');
  });

  it('Export button says "Export Data" not "Export as Folders (ZIP)"', () => {
    const settingsPath = resolve(
      PROJECT_ROOT,
      'client/src/pages/Settings.tsx'
    );
    const content = readFileSync(settingsPath, 'utf-8');

    expect(content).toContain('Export Data');
    expect(content).not.toContain('Export as Folders (ZIP)');
  });
});
