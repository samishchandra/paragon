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
 */
export declare function splitSeparatedLists(markdown: string): string;
