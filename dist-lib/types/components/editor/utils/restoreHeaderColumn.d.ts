/**
 * Restore header column from <!-- header-column --> marker in HTML.
 *
 * Standard markdown has no syntax for header columns, so we use an HTML comment
 * to preserve this metadata during WYSIWYG ↔ markdown round-trips.
 * When detected, convert the first <td> in each <tbody> row to <th>.
 * The comment appears after </table> in marked output, so we match table + trailing comment.
 */
export declare function restoreHeaderColumn(html: string): string;
