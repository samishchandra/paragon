/**
 * Tests for list separation — verifies that consecutive lists separated by
 * blank lines are preserved as separate lists during round-trips.
 *
 * Covers:
 * - splitSeparatedLists pre-processor
 * - Different list type transitions (bullet → task, task → bullet)
 * - Same-type list transitions (bullet → bullet, task → task)
 * - Code fence protection
 * - Nested list preservation
 * - ZWSP separator handling for round-trip stability
 */
import { describe, it, expect } from 'vitest';

// Replicate splitSeparatedLists for unit testing (it's module-private in MarkdownEditor.tsx)
function splitSeparatedLists(markdown: string): string {
  const lines = markdown.split('\n');
  const result: string[] = [];

  type ListType = 'bullet' | 'task' | 'ordered' | null;
  const classifyLine = (line: string): ListType => {
    const trimmed = line.trimStart();
    if (/^[-*+]\s+\[[ xX]\]\s/.test(trimmed)) return 'task';
    if (/^[-*+]\s+/.test(trimmed)) return 'bullet';
    if (/^\d+\.\s+/.test(trimmed)) return 'ordered';
    return null;
  };

  const isContinuation = (line: string): boolean => {
    return /^\s{2,}\S/.test(line);
  };

  const isBlank = (line: string): boolean => {
    return line.trim() === '' || line.trim() === '\u200B';
  };

  let inCodeFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (/^```/.test(line.trim())) {
      inCodeFence = !inCodeFence;
      result.push(line);
      continue;
    }
    if (inCodeFence) {
      result.push(line);
      continue;
    }

    result.push(line);

    if (classifyLine(line) !== null || isContinuation(line)) {
      let j = i + 1;
      while (j < lines.length && isContinuation(lines[j])) {
        j++;
      }

      let blankCount = 0;
      const blankStart = j;
      while (j < lines.length && isBlank(lines[j])) {
        blankCount++;
        j++;
      }

      if (blankCount > 0 && j < lines.length) {
        const prevType = classifyLine(line);
        const nextType = classifyLine(lines[j]);

        if (prevType !== null && nextType !== null) {
          // Lists separated by blank line — insert separator to keep them independent.
          // This handles both different-type (bullet → task) and same-type (bullet → bullet).
          for (let k = blankStart; k < j; k++) {
            result.push(lines[k]);
          }
          result.push('<!-- list-break -->');
          i = j - 1;
          continue;
        }
      }
    }
  }

  return result.join('\n');
}

describe('List Separation', () => {
  describe('splitSeparatedLists — different-type transitions', () => {
    it('should insert separator between bullet and task lists', () => {
      const md = `- First bullet
- Second bullet

- [ ] First task
- [ ] Second task`;

      const result = splitSeparatedLists(md);
      expect(result).toContain('<!-- list-break -->');
      const lines = result.split('\n');
      const breakIdx = lines.findIndex(l => l.includes('list-break'));
      expect(breakIdx).toBeGreaterThan(0);
      const afterBreak = lines.slice(breakIdx + 1).find(l => l.trim() !== '');
      expect(afterBreak).toMatch(/^- \[ \]/);
    });

    it('should insert separator between task and bullet lists', () => {
      const md = `- [ ] First task
- [ ] Second task

- First bullet
- Second bullet`;

      const result = splitSeparatedLists(md);
      expect(result).toContain('<!-- list-break -->');
    });

    it('should handle three consecutive lists with type changes', () => {
      const md = `- First bullet
- Second bullet

- [ ] First task
- [ ] Second task

- Third bullet
- Fourth bullet`;

      const result = splitSeparatedLists(md);
      const breakCount = (result.match(/<!-- list-break -->/g) || []).length;
      expect(breakCount).toBe(2);
    });

    it('should handle ordered list to bullet transition', () => {
      const md = `1. First item
2. Second item

- First bullet
- Second bullet`;

      const result = splitSeparatedLists(md);
      expect(result).toContain('<!-- list-break -->');
    });

    it('should handle bullet to ordered transition', () => {
      const md = `- First bullet
- Second bullet

1. First item
2. Second item`;

      const result = splitSeparatedLists(md);
      expect(result).toContain('<!-- list-break -->');
    });

    it('should handle task list with checked items', () => {
      const md = `- [x] Completed task
- [ ] Pending task

- First bullet
- Second bullet`;

      const result = splitSeparatedLists(md);
      expect(result).toContain('<!-- list-break -->');
    });
  });

  describe('splitSeparatedLists — same-type transitions', () => {
    it('should insert separator between same-type bullet lists', () => {
      const md = `- First bullet
- Second bullet

- Third bullet
- Fourth bullet`;

      const result = splitSeparatedLists(md);
      expect(result).toContain('<!-- list-break -->');
    });

    it('should insert separator between same-type task lists', () => {
      const md = `- [ ] First task
- [ ] Second task

- [ ] Third task
- [ ] Fourth task`;

      const result = splitSeparatedLists(md);
      expect(result).toContain('<!-- list-break -->');
    });

    it('should insert separator between same-type ordered lists', () => {
      const md = `1. First item
2. Second item

1. Third item
2. Fourth item`;

      const result = splitSeparatedLists(md);
      expect(result).toContain('<!-- list-break -->');
    });

    it('should handle the user example: bullet, task, bullet', () => {
      const md = `-   First bullet
-   Second bullet

- [ ] First bullet
- [ ] Second bullet

-   First bullet
-   Second bullet`;

      const result = splitSeparatedLists(md);
      const breakCount = (result.match(/<!-- list-break -->/g) || []).length;
      expect(breakCount).toBe(2);
    });

    it('should handle ZWSP separator from previous round-trip', () => {
      const md = `- First bullet
- Second bullet

\u200B

- Third bullet
- Fourth bullet`;

      const result = splitSeparatedLists(md);
      expect(result).toContain('<!-- list-break -->');
    });

    it('should handle multiple same-type bullet lists', () => {
      const md = `- A
- B

- C
- D

- E
- F`;

      const result = splitSeparatedLists(md);
      const breakCount = (result.match(/<!-- list-break -->/g) || []).length;
      expect(breakCount).toBe(2);
    });
  });

  describe('splitSeparatedLists — edge cases', () => {
    it('should NOT modify lists without blank line separation', () => {
      const md = `- First bullet
- Second bullet
- [ ] First task
- [ ] Second task`;

      const result = splitSeparatedLists(md);
      expect(result).not.toContain('<!-- list-break -->');
      expect(result).toBe(md);
    });

    it('should NOT modify content inside code fences', () => {
      const md = `\`\`\`
- First bullet

- [ ] First task
\`\`\``;

      const result = splitSeparatedLists(md);
      expect(result).not.toContain('<!-- list-break -->');
      expect(result).toBe(md);
    });

    it('should handle multiple blank lines between lists', () => {
      const md = `- First bullet
- Second bullet


- [ ] First task
- [ ] Second task`;

      const result = splitSeparatedLists(md);
      expect(result).toContain('<!-- list-break -->');
    });

    it('should preserve content before and after lists', () => {
      const md = `# Heading

- First bullet
- Second bullet

- [ ] First task
- [ ] Second task

Some paragraph text.`;

      const result = splitSeparatedLists(md);
      expect(result).toContain('# Heading');
      expect(result).toContain('Some paragraph text.');
      expect(result).toContain('<!-- list-break -->');
    });

    it('should not insert separator when list is followed by non-list content', () => {
      const md = `- First bullet
- Second bullet

Some paragraph text.`;

      const result = splitSeparatedLists(md);
      expect(result).not.toContain('<!-- list-break -->');
    });

    it('should not insert separator when list is preceded by non-list content', () => {
      const md = `Some paragraph text.

- First bullet
- Second bullet`;

      const result = splitSeparatedLists(md);
      expect(result).not.toContain('<!-- list-break -->');
    });
  });
});
