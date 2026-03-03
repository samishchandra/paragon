/**
 * Pre-process markdown to split consecutive list blocks that are separated by
 * blank lines into truly separate lists.
 *
 * Problem: CommonMark (and marked) treats consecutive list items separated by
 * blank lines as a single "loose" list. But users expect blank-line-separated
 * lists to remain separate — especially when the list type changes (bullet → task
 * list or vice versa).
 *
 * Solution: Scan the markdown line-by-line. When we detect a blank line between
 * two list item lines, insert a zero-width HTML comment <!-- list-break --> that
 * forces marked to close the first list and start a new one.
 *
 * Handles both different-type transitions (bullet → task) and same-type lists
 * separated by blank lines — both should remain separate.
 *
 * IMPORTANT: Does NOT insert a list-break when the next list item is indented
 * deeper than the previous one, because that indicates a nested sub-list, not
 * a separate list. Turndown can produce blank lines between a parent item and
 * its nested children (e.g. "- parent\n    \n    - child"), and those must be
 * preserved as nested structure.
 */
export function splitSeparatedLists(markdown: string): string {
  const lines = markdown.split('\n');
  const result: string[] = [];

  // Classify a line as a list item and determine its type
  type ListType = 'bullet' | 'task' | 'ordered' | null;
  const classifyLine = (line: string): ListType => {
    const trimmed = line.trimStart();
    // Task list: - [ ] or - [x] or * [ ] or + [ ]
    if (/^[-*+]\s+\[[ xX]\]\s/.test(trimmed)) return 'task';
    // Unordered bullet: - text, * text, + text
    if (/^[-*+]\s+/.test(trimmed)) return 'bullet';
    // Ordered list: 1. text, 2. text, etc.
    if (/^\d+\.\s+/.test(trimmed)) return 'ordered';
    return null;
  };

  // Get the indentation level (number of leading spaces) of a line
  const getIndent = (line: string): number => {
    const match = line.match(/^( *)/);
    return match ? match[1].length : 0;
  };

  // Check if a line is a continuation of a list item (indented content)
  const isContinuation = (line: string): boolean => {
    return /^\s{2,}\S/.test(line);
  };

  // Check if a line is blank
  const isBlank = (line: string): boolean => {
    return line.trim() === '' || line.trim() === '\u200B';
  };

  // Track whether we're inside a code fence
  let inCodeFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Track code fences to avoid modifying content inside them
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

    // Look for the pattern: list item, blank line(s), list item
    if (classifyLine(line) !== null || isContinuation(line)) {
      // Find the end of the current list item (including continuations)
      let lastListLine = i;
      // Check if the NEXT lines form: blank line(s) followed by a list item
      let j = i + 1;

      // Skip continuation lines
      while (j < lines.length && isContinuation(lines[j])) {
        j++;
      }

      // Count blank lines
      let blankCount = 0;
      const blankStart = j;
      while (j < lines.length && isBlank(lines[j])) {
        blankCount++;
        j++;
      }

      // If we found blank line(s) followed by another list item
      if (blankCount > 0 && j < lines.length) {
        const prevType = classifyLine(line);
        const nextType = classifyLine(lines[j]);

        if (prevType !== null && nextType !== null) {
          // Check indentation: if the next list item is more indented than
          // the current one, it's a nested sub-list, not a separate list.
          // Turndown can produce blank lines between a parent item and its
          // nested children (e.g. "- parent\n    \n    - child").
          // We must NOT insert a list-break in that case.
          const prevIndent = getIndent(line);
          const nextIndent = getIndent(lines[j]);

          if (nextIndent > prevIndent) {
            // Nested sub-list — do NOT insert list-break.
            // Just push the blank lines and continue normally.
            for (let k = blankStart; k < j; k++) {
              result.push(lines[k]);
            }
            i = j - 1;
            continue;
          }

          // Lists separated by blank line at the same or lesser indentation —
          // insert separator to keep them independent.
          // This handles both different-type (bullet → task) and same-type (bullet → bullet)
          // transitions. Without this, marked merges them into a single list.
          // Push the blank lines, then add a separator before the next list item
          for (let k = blankStart; k < j; k++) {
            result.push(lines[k]);
          }
          result.push('<!-- list-break -->');
          i = j - 1; // Skip to just before the next list item (loop will increment)
          continue;
        }
      }
    }
  }

  return result.join('\n');
}
