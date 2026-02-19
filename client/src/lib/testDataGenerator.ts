/**
 * Test Data Generator
 * 
 * Generates realistic tasks, notes, lists, tags, and item-tag associations
 * with rich TipTap HTML content that exercises all markdown/editor features.
 */

import { apiQuery } from './apiClient';

// ─── Tag Definitions ─────────────────────────────────────────────
export const TEST_TAGS = [
  { name: 'urgent', color: '#EF4444' },
  { name: 'frontend', color: '#3B82F6' },
  { name: 'backend', color: '#8B5CF6' },
  { name: 'design', color: '#EC4899' },
  { name: 'bug', color: '#F97316' },
  { name: 'feature', color: '#10B981' },
  { name: 'documentation', color: '#6366F1' },
  { name: 'devops', color: '#14B8A6' },
  { name: 'research', color: '#F59E0B' },
  { name: 'personal', color: '#A855F7' },
  { name: 'meeting-notes', color: '#06B6D4' },
  { name: 'architecture', color: '#84CC16' },
];

// ─── List Definitions ────────────────────────────────────────────
export const TEST_LISTS = [
  { name: 'Sprint 24 — Q1 2026', icon: 'folder', color: '#3B82F6', type: 'task' as const },
  { name: 'Product Roadmap', icon: 'folder', color: '#8B5CF6', type: 'task' as const },
  { name: 'Engineering Wiki', icon: 'folder', color: '#10B981', type: 'note' as const },
  { name: 'Personal Projects', icon: 'folder', color: '#F59E0B', type: 'task' as const },
  { name: 'Learning & Research', icon: 'folder', color: '#EC4899', type: 'note' as const },
  { name: 'Team Onboarding', icon: 'folder', color: '#06B6D4', type: 'note' as const },
];

// ─── Rich HTML Content Templates ─────────────────────────────────

const TASK_CONTENTS: Array<{ title: string; content: string; tags: string[]; section: 'now' | 'later'; is_completed: boolean; is_pinned: boolean; due_date?: string }> = [
  {
    title: 'Migrate authentication to Supabase Auth',
    tags: ['backend', 'urgent', 'feature'],
    section: 'now',
    is_completed: false,
    is_pinned: true,
    due_date: '2026-02-14T00:00:00Z',
    content: `<h2>Migration Plan</h2><p>We need to migrate our custom JWT-based auth to <strong>Supabase Auth</strong> for better security, social login support, and Row Level Security integration.</p><h3>Steps</h3><ul><li><p>Audit current auth endpoints and token flow</p></li><li><p>Set up Supabase Auth providers (Google, GitHub)</p></li><li><p>Implement <code>useAuth</code> hook with Supabase client</p></li><li><p>Add RLS policies to all tables</p></li><li><p>Test token refresh and session persistence</p></li></ul><h3>Acceptance Criteria</h3><taskList><taskItem checked="false"><p>Users can sign in with Google OAuth</p></taskItem><taskItem checked="false"><p>Users can sign in with GitHub OAuth</p></taskItem><taskItem checked="true"><p>Supabase project created and configured</p></taskItem><taskItem checked="false"><p>RLS policies applied to items, tags, lists tables</p></taskItem><taskItem checked="false"><p>Session persists across page reloads</p></taskItem></taskList><blockquote><p><strong>Note:</strong> We should keep the anonymous fallback for local-only usage during development.</p></blockquote>`,
  },
  {
    title: 'Implement drag-and-drop reordering for task list',
    tags: ['frontend', 'feature'],
    section: 'now',
    is_completed: false,
    is_pinned: false,
    due_date: '2026-02-17T00:00:00Z',
    content: `<h2>Overview</h2><p>Add <strong>drag-and-drop</strong> support to the middle panel task list so users can manually reorder items. This should use the <code>@dnd-kit/core</code> library for accessible, performant drag interactions.</p><h3>Technical Approach</h3><ol><li><p>Install <code>@dnd-kit/core</code> and <code>@dnd-kit/sortable</code></p></li><li><p>Wrap the item list in a <code>SortableContext</code></p></li><li><p>Each item gets a <code>useSortable</code> hook with a drag handle</p></li><li><p>On drop, compute new <code>sort_order</code> values using fractional indexing</p></li><li><p>Persist to Supabase with optimistic update</p></li></ol><h3>Edge Cases</h3><ul><li><p>Dragging between sections (Now → Later)</p></li><li><p>Dragging to an empty section</p></li><li><p>Undo support via toast notification</p></li></ul><pre><code class="language-typescript">// Fractional indexing example
function midpoint(a: number, b: number): number {
  return Math.round((a + b) / 2);
}

// Between items at order 100 and 200:
const newOrder = midpoint(100, 200); // 150</code></pre>`,
  },
  {
    title: 'Fix: Search results not highlighting matched terms',
    tags: ['frontend', 'bug', 'urgent'],
    section: 'now',
    is_completed: false,
    is_pinned: true,
    content: `<h2>Bug Report</h2><p>When searching for text in the middle panel, the matching terms are <strong>not highlighted</strong> in the search results. The search itself works correctly, but there's no visual indication of why an item matched.</p><h3>Expected Behavior</h3><p>Matching text should be wrapped in a <code>&lt;mark&gt;</code> element with a yellow background highlight, similar to how VS Code highlights search matches.</p><h3>Current Behavior</h3><p>Items are filtered correctly but the title and content preview show plain text without any highlighting.</p><h3>Steps to Reproduce</h3><ol><li><p>Type a search query in the search bar</p></li><li><p>Observe that matching items appear</p></li><li><p>Notice that the matched text is <em>not</em> highlighted</p></li></ol><h3>Fix</h3><p>Add a <code>highlightText</code> utility function:</p><pre><code class="language-typescript">function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const regex = new RegExp(\`(\${escapeRegex(query)})\`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =&gt;
    regex.test(part) ? &lt;mark key={i}&gt;{part}&lt;/mark&gt; : part
  );
}</code></pre>`,
  },
  {
    title: 'Set up CI/CD pipeline with GitHub Actions',
    tags: ['devops', 'feature'],
    section: 'now',
    is_completed: false,
    is_pinned: false,
    due_date: '2026-02-20T00:00:00Z',
    content: `<h2>Pipeline Requirements</h2><p>We need a <strong>CI/CD pipeline</strong> that runs on every push to <code>main</code> and <code>development</code> branches.</p><h3>Jobs</h3><taskList><taskItem checked="true"><p>TypeScript type checking (<code>pnpm check</code>)</p></taskItem><taskItem checked="false"><p>Unit tests with Vitest</p></taskItem><taskItem checked="false"><p>Build verification</p></taskItem><taskItem checked="false"><p>Deploy preview to Vercel on PR</p></taskItem><taskItem checked="false"><p>Deploy production on merge to main</p></taskItem></taskList><h3>Configuration</h3><pre><code class="language-yaml">name: CI
on:
  push:
    branches: [main, development]
  pull_request:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install --frozen-lockfile
      - run: pnpm check
      - run: pnpm build</code></pre>`,
  },
  {
    title: 'Design system: Create color token documentation',
    tags: ['design', 'documentation'],
    section: 'later',
    is_completed: false,
    is_pinned: false,
    content: `<h2>Color Token System</h2><p>Document our <strong>OKLCH-based color system</strong> used in <code>index.css</code> for consistent theming across light and dark modes.</p><h3>Token Categories</h3><table><thead><tr><th>Token</th><th>Light Mode</th><th>Dark Mode</th><th>Usage</th></tr></thead><tbody><tr><td><code>--background</code></td><td>oklch(1 0 0)</td><td>oklch(0.141 0.005 285)</td><td>Page background</td></tr><tr><td><code>--foreground</code></td><td>oklch(0.235 0.015 65)</td><td>oklch(0.85 0.005 65)</td><td>Primary text</td></tr><tr><td><code>--primary</code></td><td>blue-700</td><td>blue-700</td><td>Buttons, links</td></tr><tr><td><code>--muted</code></td><td>oklch(0.967 ...)</td><td>oklch(0.274 ...)</td><td>Subtle backgrounds</td></tr><tr><td><code>--destructive</code></td><td>oklch(0.577 0.245 27)</td><td>oklch(0.704 0.191 22)</td><td>Delete actions</td></tr></tbody></table><blockquote><p><strong>Why OKLCH?</strong> OKLCH provides perceptually uniform color manipulation. Unlike HSL, adjusting lightness in OKLCH produces visually consistent results across hues.</p></blockquote>`,
  },
  {
    title: 'Optimize Supabase queries with proper indexing',
    tags: ['backend', 'devops'],
    section: 'later',
    is_completed: false,
    is_pinned: false,
    content: `<h2>Performance Analysis</h2><p>The items table is growing and some queries are getting slow. We need to add proper <strong>database indexes</strong> for the most common query patterns.</p><h3>Current Query Patterns</h3><ol><li><p>Fetch all items for a user, ordered by <code>sort_order</code></p></li><li><p>Filter items by <code>type</code> (task/note)</p></li><li><p>Filter items by <code>list_id</code></p></li><li><p>Search items by <code>title</code> and <code>search_content</code></p></li><li><p>Filter soft-deleted items (<code>deleted_at IS NOT NULL</code>)</p></li></ol><h3>Proposed Indexes</h3><pre><code class="language-sql">-- Composite index for the main item listing query
CREATE INDEX idx_items_user_sort ON items (user_id, sort_order DESC);

-- Partial index for active (non-deleted) items
CREATE INDEX idx_items_active ON items (user_id, type) 
  WHERE deleted_at IS NULL;

-- Full-text search index
CREATE INDEX idx_items_search ON items 
  USING GIN (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(search_content, '')));

-- List filtering
CREATE INDEX idx_items_list ON items (list_id) WHERE list_id IS NOT NULL;</code></pre>`,
  },
  {
    title: 'Write unit tests for MomentumContext reducer',
    tags: ['frontend', 'documentation'],
    section: 'later',
    is_completed: false,
    is_pinned: false,
    content: `<h2>Test Plan</h2><p>The <code>ServerMomentumContext</code> reducer handles all state transitions. We need comprehensive unit tests to prevent regressions.</p><h3>Test Cases</h3><taskList><taskItem checked="false"><p>ADD_ITEM — adds item to state and sets as active</p></taskItem><taskItem checked="false"><p>UPDATE_ITEM — merges partial updates into existing item</p></taskItem><taskItem checked="false"><p>DELETE_ITEM — sets deleted_at timestamp (soft delete)</p></taskItem><taskItem checked="false"><p>RESTORE_ITEM — clears deleted_at</p></taskItem><taskItem checked="false"><p>TOGGLE_COMPLETE — flips is_completed and updates section</p></taskItem><taskItem checked="false"><p>SET_ACTIVE_ITEM — updates activeItemId</p></taskItem><taskItem checked="false"><p>REORDER_ITEMS — updates sort_order for all affected items</p></taskItem></taskList><p>Use <strong>Vitest</strong> with the following pattern:</p><pre><code class="language-typescript">import { describe, it, expect } from 'vitest';
import { momentumReducer } from './ServerMomentumContext';

describe('momentumReducer', () =&gt; {
  it('should add a new item', () =&gt; {
    const state = { items: [], activeItemId: null };
    const action = { type: 'ADD_ITEM', payload: { id: '1', title: 'Test' } };
    const next = momentumReducer(state, action);
    expect(next.items).toHaveLength(1);
    expect(next.activeItemId).toBe('1');
  });
});</code></pre>`,
  },
  {
    title: 'Add keyboard shortcut for command palette',
    tags: ['frontend', 'feature'],
    section: 'now',
    is_completed: true,
    is_pinned: false,
    content: `<h2>Implementation</h2><p>Added <code>Cmd+K</code> / <code>Ctrl+K</code> keyboard shortcut to open the command palette from anywhere in the app.</p><h3>Changes</h3><ul><li><p>Updated <code>useKeyboardShortcuts</code> hook to listen for Cmd+K</p></li><li><p>Command palette now supports fuzzy search across all items</p></li><li><p>Added action shortcuts: <code>Cmd+N</code> (new task), <code>Cmd+Shift+N</code> (new note)</p></li></ul><p><em>Completed on Feb 8, 2026</em></p>`,
  },
  {
    title: 'Implement real-time collaboration with Supabase Realtime',
    tags: ['backend', 'feature', 'architecture'],
    section: 'later',
    is_completed: false,
    is_pinned: false,
    content: `<h2>Architecture Proposal</h2><p>Enable <strong>real-time collaboration</strong> so multiple users can see changes instantly across devices and browser tabs.</p><h3>Approach</h3><p>Use Supabase Realtime's <strong>Postgres Changes</strong> feature to subscribe to table mutations:</p><pre><code class="language-typescript">const channel = supabase
  .channel('items-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'items' },
    (payload) =&gt; {
      switch (payload.eventType) {
        case 'INSERT':
          dispatch({ type: 'ADD_ITEM', payload: payload.new });
          break;
        case 'UPDATE':
          dispatch({ type: 'UPDATE_ITEM', payload: payload.new });
          break;
        case 'DELETE':
          dispatch({ type: 'REMOVE_ITEM', payload: payload.old.id });
          break;
      }
    }
  )
  .subscribe();</code></pre><h3>Conflict Resolution</h3><p>For concurrent edits to the same item, we'll use <strong>last-write-wins</strong> with <code>updated_at</code> timestamp comparison. Future improvement: integrate Yjs for CRDT-based collaborative editing.</p><blockquote><p>This is a stretch goal for Q2 2026. Focus on single-user real-time sync across tabs first.</p></blockquote>`,
  },
  {
    title: 'Refactor CSS to use Tailwind v4 theme tokens consistently',
    tags: ['frontend', 'design'],
    section: 'now',
    is_completed: true,
    is_pinned: false,
    content: `<h2>Summary</h2><p>Refactored all hardcoded color values to use Tailwind v4's <code>@theme inline</code> CSS variables. This ensures consistent theming across light and dark modes.</p><h3>Before / After</h3><pre><code class="language-css">/* Before — hardcoded */
.sidebar { background: #1e1e2e; color: #cdd6f4; }

/* After — token-based */
.sidebar { background: var(--sidebar); color: var(--sidebar-foreground); }</code></pre><p><strong>Files changed:</strong> 14 components, <code>index.css</code></p><p><em>Completed on Feb 6, 2026</em></p>`,
  },
  {
    title: 'Add due date picker with natural language parsing',
    tags: ['frontend', 'feature'],
    section: 'later',
    is_completed: false,
    is_pinned: false,
    due_date: '2026-03-01T00:00:00Z',
    content: `<h2>Feature Spec</h2><p>Allow users to set due dates using <strong>natural language</strong> like "tomorrow", "next Friday", or "in 3 days" in addition to a calendar picker.</p><h3>Library Options</h3><table><thead><tr><th>Library</th><th>Size</th><th>Pros</th><th>Cons</th></tr></thead><tbody><tr><td>chrono-node</td><td>~45KB</td><td>Best NLP parsing</td><td>Larger bundle</td></tr><tr><td>sugar-date</td><td>~30KB</td><td>Good parsing</td><td>Less maintained</td></tr><tr><td>Custom regex</td><td>~2KB</td><td>Tiny bundle</td><td>Limited patterns</td></tr></tbody></table><h3>UI Design</h3><ul><li><p>Input field with calendar icon</p></li><li><p>Typing shows parsed date preview below the input</p></li><li><p>Click calendar icon to open <code>react-day-picker</code></p></li><li><p>Relative dates shown as pills: <code>Today</code>, <code>Tomorrow</code>, <code>Next Week</code></p></li></ul>`,
  },
  {
    title: 'Review PR #42: Add table support to TipTap editor',
    tags: ['frontend', 'documentation'],
    section: 'now',
    is_completed: true,
    is_pinned: false,
    content: `<h2>PR Review Notes</h2><p>Reviewed the table extension implementation. Overall looks good with a few suggestions.</p><h3>What works well</h3><ul><li><p>Table insertion via slash command <code>/table</code></p></li><li><p>Row and column add/remove operations</p></li><li><p>Cell merging and splitting</p></li><li><p>Tab key navigation between cells</p></li></ul><h3>Suggestions</h3><ol><li><p><strong>Column resizing</strong> — Users should be able to drag column borders to resize. Use <code>@tiptap/extension-table</code>'s <code>resizable: true</code> option.</p></li><li><p><strong>Header row styling</strong> — The first row should have a distinct background color using <code>bg-muted</code>.</p></li><li><p><strong>Compact rows</strong> — Reduce cell padding from <code>p-3</code> to <code>p-2</code> for better information density.</p></li></ol><p><strong>Verdict:</strong> Approved with minor changes. ✅</p>`,
  },
  {
    title: 'Set up error monitoring with Sentry',
    tags: ['devops', 'urgent'],
    section: 'now',
    is_completed: false,
    is_pinned: false,
    due_date: '2026-02-15T00:00:00Z',
    content: `<h2>Requirements</h2><p>We need production error monitoring to catch issues before users report them.</p><h3>Setup Steps</h3><taskList><taskItem checked="true"><p>Create Sentry project for React</p></taskItem><taskItem checked="false"><p>Install <code>@sentry/react</code> package</p></taskItem><taskItem checked="false"><p>Configure DSN in environment variables</p></taskItem><taskItem checked="false"><p>Add ErrorBoundary with Sentry reporting</p></taskItem><taskItem checked="false"><p>Set up source map uploads in CI</p></taskItem><taskItem checked="false"><p>Configure alert rules for P0 errors</p></taskItem></taskList><blockquote><p>Use the free tier (5K events/month) to start. Upgrade if we exceed the limit.</p></blockquote>`,
  },
  {
    title: 'Implement offline support with service worker',
    tags: ['frontend', 'architecture', 'feature'],
    section: 'later',
    is_completed: false,
    is_pinned: false,
    content: `<h2>Offline-First Architecture</h2><p>Enable the app to work fully offline using a <strong>service worker</strong> and local-first data sync.</p><h3>Architecture</h3><pre><code class="language-text">┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   Browser    │────▶│  IndexedDB   │────▶│   Supabase   │
│   (React)    │◀────│  (Local DB)  │◀────│   (Cloud)    │
└─────────────┘     └──────────────┘     └──────────────┘
     UI Layer          Cache Layer         Persistence</code></pre><h3>Sync Strategy</h3><ol><li><p>All writes go to IndexedDB first (instant)</p></li><li><p>Background sync pushes changes to Supabase</p></li><li><p>On reconnect, pull remote changes and merge</p></li><li><p>Conflict resolution: last-write-wins with vector clocks</p></li></ol><p>This is a <strong>major architectural change</strong> that should be planned carefully for Q3 2026.</p>`,
  },
  {
    title: 'Update dependencies to latest versions',
    tags: ['devops'],
    section: 'now',
    is_completed: true,
    is_pinned: false,
    content: `<h2>Dependency Updates</h2><p>Updated all major dependencies to their latest versions.</p><h3>Changes</h3><table><thead><tr><th>Package</th><th>From</th><th>To</th><th>Notes</th></tr></thead><tbody><tr><td>react</td><td>19.1.0</td><td>19.2.1</td><td>Bug fixes</td></tr><tr><td>@tiptap/react</td><td>3.17.0</td><td>3.19.0</td><td>flushSync fix needed</td></tr><tr><td>tailwindcss</td><td>4.0.0</td><td>4.1.14</td><td>Performance improvements</td></tr><tr><td>vite</td><td>6.0.0</td><td>7.1.7</td><td>Major version bump</td></tr><tr><td>typescript</td><td>5.5.0</td><td>5.6.3</td><td>New satisfies improvements</td></tr></tbody></table><p><em>Completed on Feb 5, 2026. All tests passing.</em></p>`,
  },
];

const NOTE_CONTENTS: Array<{ title: string; content: string; tags: string[]; section: 'now' | 'later'; is_pinned: boolean }> = [
  {
    title: 'Architecture Decision Record: State Management',
    tags: ['architecture', 'documentation'],
    section: 'now',
    is_pinned: true,
    content: `<h2>ADR-001: State Management Approach</h2><p><strong>Status:</strong> Accepted<br><strong>Date:</strong> 2026-01-15<br><strong>Decision Makers:</strong> Engineering Team</p><h3>Context</h3><p>We need a state management solution for the Momentum Notes app that handles:</p><ul><li><p>Complex nested state (items, tags, lists, associations)</p></li><li><p>Optimistic updates for responsive UI</p></li><li><p>Server synchronization with Supabase</p></li><li><p>Undo/redo support</p></li></ul><h3>Options Considered</h3><table><thead><tr><th>Option</th><th>Pros</th><th>Cons</th><th>Verdict</th></tr></thead><tbody><tr><td>React Context + useReducer</td><td>Simple, no deps</td><td>Re-render concerns</td><td><strong>Chosen</strong></td></tr><tr><td>Zustand</td><td>Lightweight, flexible</td><td>Another dependency</td><td>Considered</td></tr><tr><td>Redux Toolkit</td><td>Mature ecosystem</td><td>Boilerplate heavy</td><td>Rejected</td></tr><tr><td>Jotai</td><td>Atomic, performant</td><td>Learning curve</td><td>Considered</td></tr></tbody></table><h3>Decision</h3><p>We chose <strong>React Context + useReducer</strong> because:</p><ol><li><p>Zero additional dependencies</p></li><li><p>The reducer pattern naturally maps to our CRUD operations</p></li><li><p>We can wrap the context with memoization to prevent unnecessary re-renders</p></li><li><p>Easy to test — pure reducer functions</p></li></ol><h3>Consequences</h3><blockquote><p>We accept that large state trees may cause performance issues at scale. If we exceed ~1000 items, we'll migrate to Zustand with selectors for fine-grained subscriptions.</p></blockquote>`,
  },
  {
    title: 'Weekly Standup Notes — Feb 10, 2026',
    tags: ['meeting-notes'],
    section: 'now',
    is_pinned: false,
    content: `<h2>Team Standup — Monday</h2><h3>Attendees</h3><p>Samish, Alex, Priya, Jordan</p><h3>Updates</h3><p><strong>Samish:</strong></p><ul><li><p>Completed Supabase migration for the notes app</p></li><li><p>Fixed flushSync error in TipTap + React 19</p></li><li><p>Working on test data generator improvements</p></li></ul><p><strong>Alex:</strong></p><ul><li><p>Finished drag-and-drop prototype</p></li><li><p>Blocked on fractional indexing edge case</p></li></ul><p><strong>Priya:</strong></p><ul><li><p>Designed new tag management UI mockups</p></li><li><p>Starting on color picker component</p></li></ul><p><strong>Jordan:</strong></p><ul><li><p>Set up Sentry error monitoring</p></li><li><p>Investigating slow query on items table</p></li></ul><h3>Action Items</h3><taskList><taskItem checked="false"><p>Samish: Review Alex's DnD PR by Wednesday</p></taskItem><taskItem checked="false"><p>Alex: Pair with Jordan on indexing strategy</p></taskItem><taskItem checked="false"><p>Priya: Share mockups in Figma by Thursday</p></taskItem><taskItem checked="false"><p>Jordan: Add composite index on items table</p></taskItem></taskList>`,
  },
  {
    title: 'TipTap Editor Extension Guide',
    tags: ['documentation', 'frontend'],
    section: 'now',
    is_pinned: true,
    content: `<h2>Custom TipTap Extensions</h2><p>This guide documents how to create and configure TipTap extensions for the Momentum editor.</p><h3>Extension Types</h3><ol><li><p><strong>Node Extensions</strong> — Block-level elements (headings, code blocks, tables)</p></li><li><p><strong>Mark Extensions</strong> — Inline formatting (bold, italic, highlight)</p></li><li><p><strong>Plugin Extensions</strong> — Editor behavior (history, collaboration)</p></li></ol><h3>Creating a Custom Extension</h3><pre><code class="language-typescript">import { Node, mergeAttributes } from '@tiptap/core';

const CalloutBox = Node.create({
  name: 'callout',
  group: 'block',
  content: 'block+',
  
  addAttributes() {
    return {
      type: {
        default: 'info',
        parseHTML: el =&gt; el.getAttribute('data-type'),
        renderHTML: attrs =&gt; ({ 'data-type': attrs.type }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-callout]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 
      'data-callout': '', 
      class: 'callout' 
    }), 0];
  },
});</code></pre><h3>Available Extensions</h3><table><thead><tr><th>Extension</th><th>Type</th><th>Shortcut</th><th>Status</th></tr></thead><tbody><tr><td>Bold</td><td>Mark</td><td>Cmd+B</td><td>✅ Active</td></tr><tr><td>Italic</td><td>Mark</td><td>Cmd+I</td><td>✅ Active</td></tr><tr><td>Code Block</td><td>Node</td><td>\`\`\`</td><td>✅ Active</td></tr><tr><td>Task List</td><td>Node</td><td>[ ]</td><td>✅ Active</td></tr><tr><td>Table</td><td>Node</td><td>/table</td><td>✅ Active</td></tr><tr><td>Callout</td><td>Node</td><td>/callout</td><td>🚧 Planned</td></tr><tr><td>Mermaid</td><td>Node</td><td>/mermaid</td><td>🚧 Planned</td></tr></tbody></table>`,
  },
  {
    title: 'React 19 Migration Notes',
    tags: ['frontend', 'research'],
    section: 'now',
    is_pinned: false,
    content: `<h2>React 19 Breaking Changes</h2><p>Key changes that affected our codebase during the React 19 upgrade.</p><h3>1. flushSync in Lifecycle Methods</h3><p>React 19 now <strong>warns</strong> when <code>flushSync</code> is called inside lifecycle methods. This broke TipTap's <code>ReactRenderer</code> which calls <code>flushSync</code> during <code>componentDidMount</code>.</p><p><strong>Fix:</strong> Patched <code>@tiptap/react</code> to use <code>editor.isEditorContentInitialized</code> instead of <code>editor.isInitialized</code>.</p><h3>2. Ref Cleanup Functions</h3><p>React 19 supports returning a cleanup function from refs:</p><pre><code class="language-tsx">// React 19 pattern
&lt;div ref={(node) =&gt; {
  // setup
  return () =&gt; {
    // cleanup
  };
}} /&gt;</code></pre><h3>3. use() Hook</h3><p>New <code>use()</code> hook for reading resources (Promises, Contexts) during render:</p><pre><code class="language-typescript">function UserProfile({ userPromise }) {
  const user = use(userPromise); // Suspends until resolved
  return &lt;h1&gt;{user.name}&lt;/h1&gt;;
}</code></pre><h3>4. Actions and useActionState</h3><p>New form handling primitives that replace <code>useFormState</code>:</p><pre><code class="language-typescript">const [state, formAction, isPending] = useActionState(
  async (prevState, formData) =&gt; {
    const result = await saveItem(formData);
    return result;
  },
  initialState
);</code></pre><blockquote><p>We should gradually adopt these patterns as we refactor existing forms.</p></blockquote>`,
  },
  {
    title: 'Supabase Row Level Security (RLS) Policy Guide',
    tags: ['backend', 'architecture', 'documentation'],
    section: 'now',
    is_pinned: false,
    content: `<h2>RLS Implementation Plan</h2><p>Row Level Security ensures each user can only access their own data. This is <strong>critical</strong> before making the app publicly accessible.</p><h3>Policy Templates</h3><pre><code class="language-sql">-- Enable RLS on all tables
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE item_tags ENABLE ROW LEVEL SECURITY;

-- Items: Users can only see their own items
CREATE POLICY "Users can view own items" ON items
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own items" ON items
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own items" ON items
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own items" ON items
  FOR DELETE USING (auth.uid()::text = user_id);</code></pre><h3>Testing RLS</h3><ol><li><p>Enable RLS on a test table</p></li><li><p>Create a test user via Supabase Auth</p></li><li><p>Verify SELECT returns only that user's rows</p></li><li><p>Verify INSERT sets user_id automatically</p></li><li><p>Verify UPDATE/DELETE cannot affect other users' rows</p></li></ol><blockquote><p><strong>Warning:</strong> Always test RLS policies thoroughly before deploying. A misconfigured policy can either expose all data or lock everyone out.</p></blockquote>`,
  },
  {
    title: 'Learning RAG: Retrieval-Augmented Generation Notes',
    tags: ['research', 'personal'],
    section: 'later',
    is_pinned: false,
    content: `<h2>RAG Architecture Overview</h2><p>Notes from studying Retrieval-Augmented Generation for building AI-powered search and Q&A systems.</p><h3>Core Components</h3><ol><li><p><strong>Document Ingestion</strong> — Split documents into chunks, generate embeddings</p></li><li><p><strong>Vector Store</strong> — Store embeddings in a vector database (Pinecone, pgvector)</p></li><li><p><strong>Retrieval</strong> — Find relevant chunks using similarity search</p></li><li><p><strong>Generation</strong> — Feed retrieved context to LLM for answer generation</p></li></ol><h3>Architecture Diagram</h3><pre><code class="language-text">User Query
    │
    ▼
┌──────────┐    ┌──────────────┐    ┌─────────┐
│ Embedding │───▶│ Vector Store │───▶│ Top-K   │
│ Model     │    │ (pgvector)   │    │ Results │
└──────────┘    └──────────────┘    └────┬────┘
                                         │
                                         ▼
                                   ┌──────────┐
                              ┌───▶│   LLM    │───▶ Answer
                              │    └──────────┘
                         Context + Query</code></pre><h3>Key Learnings</h3><ul><li><p><strong>Chunk size matters</strong> — 512 tokens is a good starting point</p></li><li><p><strong>Overlap chunks</strong> — 10-20% overlap prevents context loss at boundaries</p></li><li><p><strong>Hybrid search</strong> — Combine vector similarity with keyword search (BM25) for better recall</p></li><li><p><strong>Re-ranking</strong> — Use a cross-encoder to re-rank top-K results before feeding to LLM</p></li></ul><blockquote><p>Supabase supports <code>pgvector</code> natively — we could build a RAG-powered search for notes using Supabase's vector extension.</p></blockquote>`,
  },
  {
    title: 'Vim Keybindings Cheat Sheet',
    tags: ['personal', 'documentation'],
    section: 'later',
    is_pinned: false,
    content: `<h2>Essential Vim Commands</h2><p>Quick reference for the Vim keybindings I use most often.</p><h3>Navigation</h3><table><thead><tr><th>Key</th><th>Action</th><th>Mnemonic</th></tr></thead><tbody><tr><td><code>h j k l</code></td><td>Left, Down, Up, Right</td><td>—</td></tr><tr><td><code>w / b</code></td><td>Next / Previous word</td><td><strong>w</strong>ord / <strong>b</strong>ack</td></tr><tr><td><code>0 / $</code></td><td>Start / End of line</td><td>Regex anchors</td></tr><tr><td><code>gg / G</code></td><td>Top / Bottom of file</td><td><strong>g</strong>o</td></tr><tr><td><code>Ctrl+d / Ctrl+u</code></td><td>Half page down / up</td><td><strong>d</strong>own / <strong>u</strong>p</td></tr><tr><td><code>%</code></td><td>Jump to matching bracket</td><td>—</td></tr></tbody></table><h3>Editing</h3><table><thead><tr><th>Key</th><th>Action</th></tr></thead><tbody><tr><td><code>i / a</code></td><td>Insert before / after cursor</td></tr><tr><td><code>o / O</code></td><td>New line below / above</td></tr><tr><td><code>dd</code></td><td>Delete line</td></tr><tr><td><code>yy</code></td><td>Yank (copy) line</td></tr><tr><td><code>p / P</code></td><td>Paste after / before</td></tr><tr><td><code>ciw</code></td><td>Change inner word</td></tr><tr><td><code>.</code></td><td>Repeat last command</td></tr></tbody></table><blockquote><p><em>"The key to Vim mastery is thinking in terms of text objects and motions, not individual characters."</em></p></blockquote>`,
  },
  {
    title: 'AI Agent Patterns and Best Practices',
    tags: ['research', 'architecture'],
    section: 'now',
    is_pinned: false,
    content: `<h2>AI Agent Design Patterns</h2><p>Research notes on building effective AI agents for task automation.</p><h3>Core Patterns</h3><h4>1. ReAct (Reasoning + Acting)</h4><p>The agent alternates between <strong>thinking</strong> (reasoning about what to do) and <strong>acting</strong> (executing tools). Each observation feeds back into the next reasoning step.</p><pre><code class="language-text">Thought: I need to find the user's recent orders
Action: query_database("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 5")
Observation: [5 orders returned]
Thought: Now I can summarize the order history
Action: respond("Here are your 5 most recent orders...")</code></pre><h4>2. Plan-and-Execute</h4><p>The agent creates a <strong>full plan</strong> upfront, then executes each step sequentially. Better for complex multi-step tasks.</p><h4>3. Tool Use</h4><p>The agent has access to a set of <strong>tools</strong> (functions) and decides which tool to call based on the current context.</p><h3>Key Principles</h3><ul><li><p><strong>Grounding</strong> — Always verify information against real data sources</p></li><li><p><strong>Error recovery</strong> — Agents should retry with alternative approaches on failure</p></li><li><p><strong>Context management</strong> — Summarize long conversations to stay within token limits</p></li><li><p><strong>Safety</strong> — Confirm destructive actions before executing</p></li></ul>`,
  },
  {
    title: 'Fremont Farmers Market Favorites',
    tags: ['personal'],
    section: 'later',
    is_pinned: false,
    content: `<h2>Weekend Farmers Market</h2><p>Notes on our favorite vendors at the Fremont farmers market for the family.</p><h3>Must-Visit Stalls</h3><ul><li><p><strong>Green Valley Organics</strong> — Best strawberries and heirloom tomatoes. Get there early, they sell out by 10am.</p></li><li><p><strong>Bay Area Bread Co.</strong> — Sourdough loaves and olive focaccia. The girls love the cinnamon rolls.</p></li><li><p><strong>Patel's Spice Garden</strong> — Fresh curry leaves, turmeric root, and homemade chutneys. Reminds me of Machilipatnam markets.</p></li><li><p><strong>Happy Hen Farm</strong> — Pasture-raised eggs, always fresh.</p></li></ul><h3>Seasonal Calendar</h3><table><thead><tr><th>Season</th><th>Best Picks</th></tr></thead><tbody><tr><td>Spring</td><td>Strawberries, asparagus, peas</td></tr><tr><td>Summer</td><td>Tomatoes, peaches, corn</td></tr><tr><td>Fall</td><td>Apples, pumpkins, persimmons</td></tr><tr><td>Winter</td><td>Citrus, root vegetables, greens</td></tr></tbody></table><blockquote><p>The market runs every Sunday 9am–1pm at Centerville Community Park.</p></blockquote>`,
  },
  {
    title: 'ML Fundamentals: Gradient Descent Explained',
    tags: ['research', 'personal'],
    section: 'later',
    is_pinned: false,
    content: `<h2>Gradient Descent</h2><p>Core optimization algorithm used to train machine learning models by iteratively minimizing a loss function.</p><h3>Intuition</h3><p>Imagine standing on a mountain in fog. You can't see the valley, but you can feel the slope under your feet. <strong>Gradient descent</strong> says: always step in the direction of steepest descent.</p><h3>The Algorithm</h3><pre><code class="language-python"># Simple gradient descent
def gradient_descent(f, df, x0, lr=0.01, epochs=1000):
    x = x0
    history = [x]
    for _ in range(epochs):
        grad = df(x)          # Compute gradient
        x = x - lr * grad     # Update parameters
        history.append(x)
    return x, history

# Example: minimize f(x) = x^2
import numpy as np
f = lambda x: x**2
df = lambda x: 2*x
minimum, path = gradient_descent(f, df, x0=5.0, lr=0.1)
print(f"Minimum at x = {minimum:.4f}")  # ≈ 0.0</code></pre><h3>Variants</h3><table><thead><tr><th>Variant</th><th>Batch Size</th><th>Speed</th><th>Stability</th></tr></thead><tbody><tr><td>Batch GD</td><td>Full dataset</td><td>Slow</td><td>Stable</td></tr><tr><td>Stochastic GD</td><td>1 sample</td><td>Fast</td><td>Noisy</td></tr><tr><td>Mini-batch GD</td><td>32-256</td><td>Balanced</td><td>Good</td></tr><tr><td>Adam</td><td>Mini-batch</td><td>Fast</td><td>Adaptive</td></tr></tbody></table><blockquote><p><strong>Key insight:</strong> Learning rate is the most important hyperparameter. Too large → divergence. Too small → slow convergence. Use learning rate schedulers in practice.</p></blockquote>`,
  },
];

// ─── Generator Functions ─────────────────────────────────────────

interface GenerateOptions {
  taskCount?: number;
  noteCount?: number;
  clearExisting: boolean;
  userId: string;
  onProgress?: (percent: number, message: string) => void;
}

interface GenerateResult {
  tasks: number;
  notes: number;
  lists: number;
  tags: number;
  itemTags: number;
}

export async function generateTestData(options: GenerateOptions): Promise<GenerateResult> {
  const { taskCount = 20, noteCount = 15, clearExisting, userId, onProgress } = options;
  if (!userId) throw new Error('userId is required to generate test data');

  // Step 1: Clear existing data if requested
  if (clearExisting) {
    onProgress?.(5, 'Clearing existing data...');
    // Filter by user_id to only clear the current user's data
    const { data: userItems } = await apiQuery({ table: 'items', select: 'id', filters: { user_id: userId } });
    const userItemIds = (userItems || []).map(i => i.id);
    if (userItemIds.length > 0) {
      await apiQuery({ action: 'delete', table: 'item_tags', filters: { 'item_id__in': userItemIds } });
    }
    await apiQuery({ action: 'delete', table: 'items', filters: { user_id: userId } });
    await apiQuery({ action: 'delete', table: 'tags', filters: { user_id: userId } });
    await apiQuery({ action: 'delete', table: 'lists', filters: { user_id: userId } });
  }

  // Step 2: Create tags
  onProgress?.(15, 'Creating tags...');
  const tagInserts = TEST_TAGS.map(t => ({
    name: t.name,
    color: t.color,
    user_id: userId,
  }));
  const { data: createdTags, error: tagErr } = await apiQuery({ action: 'insert', table: 'tags', data: tagInserts });
  if (tagErr) throw new Error(`Failed to create tags: ${tagErr.message}`);
  
  const tagNameToId = new Map<string, string>();
  (createdTags || []).forEach(t => tagNameToId.set(t.name, t.id));

  // Step 3: Create lists
  onProgress?.(25, 'Creating lists...');
  const listInserts = TEST_LISTS.map((l, i) => ({
    name: l.name,
    icon: l.icon,
    color: l.color,
    type: l.type,
    sort_order: i,
    user_id: userId,
  }));
  const { data: createdLists, error: listErr } = await apiQuery({ action: 'insert', table: 'lists', data: listInserts });
  if (listErr) throw new Error(`Failed to create lists: ${listErr.message}`);

  const taskLists = (createdLists || []).filter(l => l.type === 'task');
  const noteLists = (createdLists || []).filter(l => l.type === 'note');

  // Step 4: Create task items with realistic content
  onProgress?.(40, 'Creating tasks...');
  const taskItems: any[] = [];
  const taskTagAssociations: Array<{ itemIndex: number; tagNames: string[] }> = [];

  // Use the curated content first, then generate additional items
  for (let i = 0; i < taskCount; i++) {
    const template = TASK_CONTENTS[i % TASK_CONTENTS.length];
    const isFromTemplate = i < TASK_CONTENTS.length;
    
    const title = isFromTemplate ? template.title : `${template.title} (variant ${Math.floor(i / TASK_CONTENTS.length) + 1})`;
    const listId = Math.random() > 0.4 ? taskLists[Math.floor(Math.random() * taskLists.length)]?.id : null;
    const daysAgo = Math.floor(Math.random() * 30);
    const createdAt = new Date(Date.now() - daysAgo * 86400000).toISOString();
    
    taskItems.push({
      type: 'task',
      title,
      content: template.content,
      section: template.section,
      is_completed: isFromTemplate ? template.is_completed : Math.random() > 0.7,
      is_pinned: isFromTemplate ? template.is_pinned : Math.random() > 0.9,
      sort_order: i,
      due_date: template.due_date || null,
      search_content: title.toLowerCase(),
      created_at: createdAt,
      updated_at: createdAt,
      list_id: listId,
      user_id: userId,
    });
    
    taskTagAssociations.push({ itemIndex: taskItems.length - 1, tagNames: template.tags });
  }

  // Insert tasks in batches
  const batchSize = 50;
  const insertedTaskIds: string[] = [];
  for (let i = 0; i < taskItems.length; i += batchSize) {
    const batch = taskItems.slice(i, i + batchSize);
    const { data, error } = await apiQuery({ action: 'insert', table: 'items', data: batch });
    if (error) throw new Error(`Failed to insert tasks: ${error.message}`);
    insertedTaskIds.push(...(data || []).map(d => d.id));
    onProgress?.(40 + (20 * Math.min(i + batchSize, taskItems.length) / taskItems.length), `Creating tasks... (${Math.min(i + batchSize, taskItems.length)}/${taskItems.length})`);
  }

  // Step 5: Create note items with realistic content
  onProgress?.(65, 'Creating notes...');
  const noteItems: any[] = [];
  const noteTagAssociations: Array<{ itemIndex: number; tagNames: string[] }> = [];

  for (let i = 0; i < noteCount; i++) {
    const template = NOTE_CONTENTS[i % NOTE_CONTENTS.length];
    const isFromTemplate = i < NOTE_CONTENTS.length;
    
    const title = isFromTemplate ? template.title : `${template.title} (v${Math.floor(i / NOTE_CONTENTS.length) + 1})`;
    const listId = Math.random() > 0.4 ? noteLists[Math.floor(Math.random() * noteLists.length)]?.id : null;
    const daysAgo = Math.floor(Math.random() * 30);
    const createdAt = new Date(Date.now() - daysAgo * 86400000).toISOString();
    
    noteItems.push({
      type: 'note',
      title,
      content: template.content,
      section: template.section,
      is_completed: false,
      is_pinned: isFromTemplate ? template.is_pinned : Math.random() > 0.9,
      sort_order: taskCount + i,
      search_content: title.toLowerCase(),
      created_at: createdAt,
      updated_at: createdAt,
      list_id: listId,
      user_id: userId,
    });
    
    noteTagAssociations.push({ itemIndex: noteItems.length - 1, tagNames: template.tags });
  }

  // Insert notes in batches
  const insertedNoteIds: string[] = [];
  for (let i = 0; i < noteItems.length; i += batchSize) {
    const batch = noteItems.slice(i, i + batchSize);
    const { data, error } = await apiQuery({ action: 'insert', table: 'items', data: batch });
    if (error) throw new Error(`Failed to insert notes: ${error.message}`);
    insertedNoteIds.push(...(data || []).map(d => d.id));
    onProgress?.(65 + (15 * Math.min(i + batchSize, noteItems.length) / noteItems.length), `Creating notes... (${Math.min(i + batchSize, noteItems.length)}/${noteItems.length})`);
  }

  // Step 6: Create item-tag associations
  onProgress?.(85, 'Creating tag associations...');
  const itemTagInserts: Array<{ item_id: string; tag_id: string }> = [];

  // Task tag associations
  taskTagAssociations.forEach(({ itemIndex, tagNames }) => {
    const itemId = insertedTaskIds[itemIndex];
    if (!itemId) return;
    tagNames.forEach(tagName => {
      const tagId = tagNameToId.get(tagName);
      if (tagId) {
        itemTagInserts.push({ item_id: itemId, tag_id: tagId });
      }
    });
  });

  // Note tag associations
  noteTagAssociations.forEach(({ itemIndex, tagNames }) => {
    const itemId = insertedNoteIds[itemIndex];
    if (!itemId) return;
    tagNames.forEach(tagName => {
      const tagId = tagNameToId.get(tagName);
      if (tagId) {
        itemTagInserts.push({ item_id: itemId, tag_id: tagId });
      }
    });
  });

  // Insert item-tag associations in batches
  let insertedTagAssociations = 0;
  for (let i = 0; i < itemTagInserts.length; i += batchSize) {
    const batch = itemTagInserts.slice(i, i + batchSize);
    const { error } = await apiQuery({ action: 'insert', table: 'item_tags', data: batch });
    if (error) {
      console.warn('Some tag associations failed:', error.message);
    } else {
      insertedTagAssociations += batch.length;
    }
    onProgress?.(85 + (10 * Math.min(i + batchSize, itemTagInserts.length) / itemTagInserts.length), `Creating tag associations... (${Math.min(i + batchSize, itemTagInserts.length)}/${itemTagInserts.length})`);
  }

  // Step 7: Add a few soft-deleted items for testing trash
  onProgress?.(97, 'Creating trashed items...');
  const trashedItems = [
    {
      type: 'task',
      title: 'Old: Remove deprecated API endpoints',
      content: '<p>This task was deleted because the API refactor made it obsolete.</p>',
      section: 'now' as const,
      is_completed: false,
      is_pinned: false,
      sort_order: taskCount + noteCount,
      deleted_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      user_id: userId,
    },
    {
      type: 'note',
      title: 'Draft: Initial project proposal (superseded)',
      content: '<p>This was the first draft of the project proposal. Replaced by the final version in the Engineering Wiki list.</p>',
      section: 'now' as const,
      is_completed: false,
      is_pinned: false,
      sort_order: taskCount + noteCount + 1,
      deleted_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      user_id: userId,
    },
  ];
  await apiQuery({ action: 'insert', table: 'items', data: trashedItems });

  onProgress?.(100, 'Done!');

  return {
    tasks: insertedTaskIds.length,
    notes: insertedNoteIds.length,
    lists: (createdLists || []).length,
    tags: (createdTags || []).length,
    itemTags: insertedTagAssociations,
  };
}

export async function clearAllData(userId: string): Promise<{ items: number; lists: number; tags: number }> {
  if (!userId) throw new Error('userId is required to clear data');
  const { count: itemCount } = await apiQuery({ table: 'items', select: '*', filters: { user_id: userId }, count: true });
  const { count: listCount } = await apiQuery({ table: 'lists', select: '*', filters: { user_id: userId }, count: true });
  const { count: tagCount } = await apiQuery({ table: 'tags', select: '*', filters: { user_id: userId }, count: true });

  // Delete item_tags for this user's items
  const { data: userItems } = await apiQuery({ table: 'items', select: 'id', filters: { user_id: userId } });
  const userItemIds = (userItems || []).map(i => i.id);
  if (userItemIds.length > 0) {
    await apiQuery({ action: 'delete', table: 'item_tags', filters: { 'item_id__in': userItemIds } });
  }
  await apiQuery({ action: 'delete', table: 'items', filters: { user_id: userId } });
  await apiQuery({ action: 'delete', table: 'lists', filters: { user_id: userId } });
  await apiQuery({ action: 'delete', table: 'tags', filters: { user_id: userId } });

  return {
    items: itemCount || 0,
    lists: listCount || 0,
    tags: tagCount || 0,
  };
}
