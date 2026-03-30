/**
 * Post-process HTML to properly structure images inside list items.
 *
 * Problem: marked outputs <li>text<img .../></li> or <li><img .../></li>
 * but TipTap's resizableImage is a block node, so it can't live inside a <p>
 * or as a bare child of <li> without a wrapper.
 *
 * Solution: For each <li>, separate inline content from images:
 * - Inline text/formatting → wrapped in <p>
 * - Images → wrapped in <figure class="image-resizer">
 * - Nested lists → preserved as-is
 *
 * This ensures TipTap parses the structure correctly:
 * <li><p>text</p><figure class="image-resizer"><img .../></figure></li>
 */
export declare function structureImagesInListItems(html: string): string;
