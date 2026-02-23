/**
 * Restore header column from <!-- header-column --> marker in HTML.
 * 
 * Standard markdown has no syntax for header columns, so we use an HTML comment
 * to preserve this metadata during WYSIWYG ↔ markdown round-trips.
 * When detected, convert the first <td> in each <tbody> row to <th>.
 * The comment appears after </table> in marked output, so we match table + trailing comment.
 */
export function restoreHeaderColumn(html: string): string {
  return html.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (_fullMatch: string, tableHtml: string) => {
    // Convert first <td> in each body row to <th>, and its closing </td> to </th>
    return tableHtml.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (tbody) => {
      // Process each <tr> in the tbody individually
      return tbody.replace(/<tr>([\s\S]*?)<\/tr>/gi, (_trMatch: string, trContent: string) => {
        // Replace only the first <td>...</td> with <th>...</th>
        const replaced = trContent.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, '$1<th>$2</th>');
        return `<tr>${replaced}</tr>`;
      });
    });
  });
}
