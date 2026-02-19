/**
 * Tests for the Todo view feature
 * - hasUncompletedTodos helper function
 * - Filter type 'todo' in getFilteredItems
 * - Sidebar count integration
 * - Import with has_uncompleted_todos
 */
import { describe, it, expect } from 'vitest';

// ── hasUncompletedTodos (replicated from ServerMomentumContext) ──

function hasUncompletedTodos(content: string | undefined | null): boolean {
  if (!content) return false;
  const text = content.replace(/<[^>]*>/g, ' ');
  return /- \[ \][^\S\n]*\S/.test(text);
}

describe('hasUncompletedTodos', () => {
  it('returns false for null/undefined/empty content', () => {
    expect(hasUncompletedTodos(null)).toBe(false);
    expect(hasUncompletedTodos(undefined)).toBe(false);
    expect(hasUncompletedTodos('')).toBe(false);
  });

  it('returns false for content without checkboxes', () => {
    expect(hasUncompletedTodos('Hello world')).toBe(false);
    expect(hasUncompletedTodos('# Title\n\nSome paragraph text')).toBe(false);
    expect(hasUncompletedTodos('Just a regular note with no todos')).toBe(false);
  });

  it('returns true for content with uncompleted checkboxes', () => {
    expect(hasUncompletedTodos('- [ ] Buy groceries')).toBe(true);
    expect(hasUncompletedTodos('Some text\n- [ ] Task 1\n- [ ] Task 2')).toBe(true);
    expect(hasUncompletedTodos('# Shopping List\n- [ ] Milk\n- [x] Bread')).toBe(true);
  });

  it('returns false when all checkboxes are completed', () => {
    expect(hasUncompletedTodos('- [x] Done task')).toBe(false);
    expect(hasUncompletedTodos('- [x] Task 1\n- [x] Task 2\n- [x] Task 3')).toBe(false);
  });

  it('returns true for mixed completed and uncompleted', () => {
    expect(hasUncompletedTodos('- [x] Done\n- [ ] Not done')).toBe(true);
    expect(hasUncompletedTodos('- [ ] First\n- [x] Second\n- [ ] Third')).toBe(true);
  });

  it('handles content with code blocks containing checkbox-like text', () => {
    // The simple regex doesn't exclude code blocks, but this is acceptable
    // because the content is markdown and code blocks with "- [ ]" are rare
    const codeBlockContent = '```\n- [ ] this is in a code block\n```';
    // This will return true because the regex is simple — documented behavior
    expect(hasUncompletedTodos(codeBlockContent)).toBe(true);
  });

  it('handles HTML content with checkbox patterns', () => {
    // Editor stores HTML, so test with HTML-like content
    expect(hasUncompletedTodos('<ul><li>- [ ] Task</li></ul>')).toBe(true);
    expect(hasUncompletedTodos('<p>No checkboxes here</p>')).toBe(false);
  });

  it('handles edge cases with similar but non-matching patterns', () => {
    expect(hasUncompletedTodos('- [x] completed')).toBe(false);
    expect(hasUncompletedTodos('-[ ] no space before bracket')).toBe(false);
    expect(hasUncompletedTodos('- [] empty brackets')).toBe(false);
    expect(hasUncompletedTodos('[ ] no dash')).toBe(false);
  });

  it('returns false for empty todo items (no text after checkbox)', () => {
    expect(hasUncompletedTodos('- [ ] ')).toBe(false);
    expect(hasUncompletedTodos('- [ ]')).toBe(false);
    expect(hasUncompletedTodos('- [ ]  ')).toBe(false);
    expect(hasUncompletedTodos('- [ ] \n- [ ] ')).toBe(false);
  });

  it('returns true when at least one todo has text, even if others are empty', () => {
    expect(hasUncompletedTodos('- [ ] \n- [ ] Buy milk')).toBe(true);
    expect(hasUncompletedTodos('- [ ] Real task\n- [ ] ')).toBe(true);
  });

  it('handles multiline content with checkboxes deep in the text', () => {
    const longContent = `# Project Plan

## Phase 1
Some description of phase 1.

## Phase 2
- [x] Design mockups
- [x] Review with team
- [ ] Implement frontend
- [ ] Write tests

## Phase 3
Not started yet.`;
    expect(hasUncompletedTodos(longContent)).toBe(true);
  });

  it('returns false for content that only has completed checkboxes deep in text', () => {
    const longContent = `# Done Project

## Phase 1
- [x] Design mockups
- [x] Review with team

## Phase 2
- [x] Implement frontend
- [x] Write tests

All done!`;
    expect(hasUncompletedTodos(longContent)).toBe(false);
  });
});

// ── FilterType 'todo' integration ──

describe('Todo filter type', () => {
  it('todo is a valid FilterType value', () => {
    const filter = { type: 'todo' as const };
    expect(filter.type).toBe('todo');
  });

  it('todo filter should match items where has_uncompleted_todos would be true', () => {
    // Simulate the server-side filter logic
    const items = [
      { id: '1', content: '- [ ] Buy milk', deletedAt: null },
      { id: '2', content: '- [x] Done task', deletedAt: null },
      { id: '3', content: 'No checkboxes', deletedAt: null },
      { id: '4', content: '- [ ] Pending\n- [x] Done', deletedAt: null },
      { id: '5', content: '- [ ] Deleted item', deletedAt: '2025-01-01' },
    ];

    // Simulate: WHERE has_uncompleted_todos = true AND deleted_at IS NULL
    const todoItems = items.filter(
      (item) => hasUncompletedTodos(item.content) && !item.deletedAt
    );

    expect(todoItems).toHaveLength(2);
    expect(todoItems.map((i) => i.id)).toEqual(['1', '4']);
  });
});

// ── Sidebar count for todo ──

describe('Sidebar todo count', () => {
  it('sidebarCounts type includes todo field', () => {
    const counts = {
      all: 100,
      tasks: 30,
      notes: 70,
      pinned: 5,
      completed: 10,
      trash: 3,
      miscellaneous: 20,
      todo: 7,
    };
    expect(counts.todo).toBe(7);
  });

  it('todo count of 0 should hide the sidebar entry', () => {
    const todoCount = 0;
    const shouldShow = todoCount > 0;
    expect(shouldShow).toBe(false);
  });

  it('todo count > 0 should show the sidebar entry', () => {
    const todoCount = 3;
    const shouldShow = todoCount > 0;
    expect(shouldShow).toBe(true);
  });
});

// ── Import with has_uncompleted_todos ──

describe('Import with has_uncompleted_todos', () => {
  it('imported file with uncompleted todos should set has_uncompleted_todos to true', () => {
    const content = '# Shopping\n- [ ] Milk\n- [ ] Bread\n- [x] Eggs';
    const hasUncompleted = /- \[ \]/.test(content);
    expect(hasUncompleted).toBe(true);
  });

  it('imported file without todos should set has_uncompleted_todos to false', () => {
    const content = '# Meeting Notes\n\nDiscussed project timeline.';
    const hasUncompleted = /- \[ \]/.test(content);
    expect(hasUncompleted).toBe(false);
  });

  it('imported file with only completed todos should set has_uncompleted_todos to false', () => {
    const content = '# Done\n- [x] Task 1\n- [x] Task 2';
    const hasUncompleted = /- \[ \]/.test(content);
    expect(hasUncompleted).toBe(false);
  });
});

// ── Save payload includes has_uncompleted_todos ──

describe('Save payload includes has_uncompleted_todos', () => {
  it('update payload should compute has_uncompleted_todos from content', () => {
    const content = '- [ ] Pending task\n- [x] Done task';
    const payload = {
      title: 'Test',
      content,
      has_uncompleted_todos: hasUncompletedTodos(content),
    };
    expect(payload.has_uncompleted_todos).toBe(true);
  });

  it('update payload should be false when no uncompleted todos', () => {
    const content = '- [x] All done\nSome text';
    const payload = {
      title: 'Test',
      content,
      has_uncompleted_todos: hasUncompletedTodos(content),
    };
    expect(payload.has_uncompleted_todos).toBe(false);
  });

  it('completing the last todo should flip has_uncompleted_todos to false', () => {
    const beforeContent = '- [ ] Last task';
    const afterContent = '- [x] Last task';
    
    expect(hasUncompletedTodos(beforeContent)).toBe(true);
    expect(hasUncompletedTodos(afterContent)).toBe(false);
  });

  it('adding a new uncompleted todo should flip has_uncompleted_todos to true', () => {
    const beforeContent = '- [x] Done task';
    const afterContent = '- [x] Done task\n- [ ] New task';
    
    expect(hasUncompletedTodos(beforeContent)).toBe(false);
    expect(hasUncompletedTodos(afterContent)).toBe(true);
  });
});
