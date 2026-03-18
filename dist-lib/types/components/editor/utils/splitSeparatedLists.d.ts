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
export declare function splitSeparatedLists(markdown: string): string;
