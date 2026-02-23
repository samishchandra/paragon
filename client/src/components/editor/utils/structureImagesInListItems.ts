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
export function structureImagesInListItems(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
  const container = doc.body.firstElementChild as HTMLElement;
  if (!container) return html;

  // Process all <li> elements that contain images
  const allLis = Array.from(container.querySelectorAll('li')) as HTMLLIElement[];
  
  for (const li of allLis) {
    // Skip task items — they were already processed by convertCheckboxListsToTaskLists
    if (li.getAttribute('data-type') === 'taskItem') continue;
    
    // Check if this <li> contains any <img> elements (direct children or inside <p>)
    const hasImg = li.querySelector(':scope > img, :scope > p > img, :scope > figure');
    if (!hasImg) continue;
    
    // Separate children into categories
    const childNodes = Array.from(li.childNodes);
    const inlineContent: Node[] = [];
    const blockContent: Node[] = [];
    
    childNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tag = el.tagName;
        
        if (tag === 'UL' || tag === 'OL') {
          // Nested lists are block content
          blockContent.push(node);
        } else if (tag === 'FIGURE') {
          // Already wrapped images
          blockContent.push(node);
        } else if (tag === 'IMG') {
          // Bare <img> — wrap in <figure>
          const figure = doc.createElement('figure');
          figure.className = 'image-resizer';
          const align = el.getAttribute('data-align') || 'left';
          const style: Record<string, string> = {
            left: 'margin-right: auto;',
            center: 'margin-left: auto; margin-right: auto;',
            right: 'margin-left: auto;',
          };
          figure.style.cssText = style[align] || 'margin-right: auto;';
          figure.appendChild(el.cloneNode(true));
          blockContent.push(figure);
        } else if (tag === 'P') {
          // Check if this <p> contains images that need to be extracted
          const pImgs = el.querySelectorAll('img');
          if (pImgs.length === 0) {
            // No images — keep as block content (it's already a <p>)
            blockContent.push(node);
          } else {
            // Extract images from the <p> and separate text from images
            const pChildren = Array.from(el.childNodes);
            const textParts: Node[] = [];
            
            pChildren.forEach(pChild => {
              if (pChild.nodeType === Node.ELEMENT_NODE && (pChild as HTMLElement).tagName === 'IMG') {
                // Flush any accumulated text as a <p>
                if (textParts.length > 0) {
                  const p = doc.createElement('p');
                  textParts.forEach(t => p.appendChild(t.cloneNode(true)));
                  if (p.textContent?.trim()) blockContent.push(p);
                  textParts.length = 0;
                }
                // Add image as figure
                const imgEl = pChild as HTMLElement;
                const figure = doc.createElement('figure');
                figure.className = 'image-resizer';
                const align = imgEl.getAttribute('data-align') || 'left';
                const style: Record<string, string> = {
                  left: 'margin-right: auto;',
                  center: 'margin-left: auto; margin-right: auto;',
                  right: 'margin-left: auto;',
                };
                figure.style.cssText = style[align] || 'margin-right: auto;';
                figure.appendChild(imgEl.cloneNode(true));
                blockContent.push(figure);
              } else {
                textParts.push(pChild);
              }
            });
            
            // Flush remaining text
            if (textParts.length > 0) {
              const p = doc.createElement('p');
              textParts.forEach(t => p.appendChild(t.cloneNode(true)));
              if (p.textContent?.trim()) blockContent.push(p);
            }
          }
        } else {
          // Other elements (strong, em, span, etc.) are inline
          inlineContent.push(node);
        }
      } else {
        // Text nodes
        inlineContent.push(node);
      }
    });
    
    // Rebuild the <li>
    li.innerHTML = '';
    
    // Wrap inline content in <p> if there's meaningful text
    if (inlineContent.length > 0) {
      const hasText = inlineContent.some(n => (n.textContent || '').trim().length > 0);
      if (hasText) {
        const p = doc.createElement('p');
        inlineContent.forEach(n => p.appendChild(n));
        li.appendChild(p);
      }
    }
    
    // Append block content
    blockContent.forEach(node => li.appendChild(node));
  }

  return container.innerHTML;
}
