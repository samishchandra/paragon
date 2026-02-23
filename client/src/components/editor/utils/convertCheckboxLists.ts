/**
 * Convert marked's standard checkbox list HTML to TipTap's task list format.
 * Uses DOM parsing for robust handling of nested/mixed lists with inline formatting.
 * 
 * marked outputs: <ul><li><input disabled="" type="checkbox"> text</li></ul>
 * TipTap expects: <ul data-type="taskList"><li data-type="taskItem" data-checked="true/false"><p>text</p></li></ul>
 * 
 * Handles:
 * - Nested lists (bullet inside task, task inside bullet)
 * - Mixed lists (some items are checkboxes, some are regular bullets)
 * - Inline formatting (bold, italic, strikethrough) inside list items
 * - Various attribute orderings from marked
 */
export function convertCheckboxListsToTaskLists(html: string): string {
  // Use DOMParser for robust HTML manipulation
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
  const container = doc.body.firstElementChild as HTMLElement;
  if (!container) return html;

  // Process all <ul> elements bottom-up (deepest first) to handle nesting
  const processUl = (ul: HTMLUListElement) => {
    // First, recursively process any nested <ul> inside this one
    const nestedUls = Array.from(ul.querySelectorAll('ul')) as HTMLUListElement[];
    nestedUls.forEach(processUl);

    // Check each <li> in this <ul> for checkboxes
    // Note: marked may place checkboxes as direct children of <li> OR inside a <p> wrapper
    // (the latter happens when list items have multi-line/continuation content)
    const items = Array.from(ul.children).filter(el => el.tagName === 'LI') as HTMLLIElement[];
    let hasCheckbox = false;
    let hasRegular = false;

    // Helper to find checkbox in an <li> — checks both direct children and inside <p> wrappers
    const findCheckbox = (li: HTMLLIElement): HTMLInputElement | null => {
      // First check direct children
      const directInput = li.querySelector(':scope > input[type="checkbox"]');
      if (directInput) return directInput as HTMLInputElement;
      // Then check inside first <p> child (marked wraps in <p> for multi-line items)
      const firstP = li.querySelector(':scope > p');
      if (firstP) {
        const pInput = firstP.querySelector(':scope > input[type="checkbox"]');
        if (pInput) return pInput as HTMLInputElement;
      }
      return null;
    };

    items.forEach(li => {
      if (findCheckbox(li)) {
        hasCheckbox = true;
      } else {
        hasRegular = true;
      }
    });

    if (!hasCheckbox) return; // No checkboxes, nothing to convert

    // Convert checkbox <li> items to taskItem format
    items.forEach(li => {
      const checkbox = findCheckbox(li);
      if (checkbox) {
        const isChecked = checkbox.hasAttribute('checked');
        li.setAttribute('data-type', 'taskItem');
        li.setAttribute('data-checked', String(isChecked));
        
        // Determine if checkbox was inside a <p> wrapper
        const checkboxParent = checkbox.parentElement;
        const wasInsideP = checkboxParent && checkboxParent.tagName === 'P' && checkboxParent.parentElement === li;
        
        // Remove the checkbox input element
        checkbox.remove();
        
        // If the checkbox was inside a <p>, clean up that <p>'s leading whitespace
        if (wasInsideP && checkboxParent.firstChild && checkboxParent.firstChild.nodeType === Node.TEXT_NODE) {
          checkboxParent.firstChild.textContent = (checkboxParent.firstChild.textContent || '').replace(/^\s+/, '');
        }
        
        // Get the remaining content of the <li>
        // We need to separate inline content from nested block elements (like <ul>)
        const childNodes = Array.from(li.childNodes);
        const inlineContent: Node[] = [];
        const blockContent: Node[] = [];
        
        childNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            if (el.tagName === 'UL' || el.tagName === 'OL' || el.tagName === 'P') {
              blockContent.push(node);
            } else if (el.tagName === 'IMG' || el.tagName === 'FIGURE') {
              // Images are block nodes in ProseMirror — treat as block content.
              // Wrap bare <img> in <figure> so TipTap parses it as resizableImage.
              if (el.tagName === 'IMG') {
                const figure = doc.createElement('figure');
                figure.className = 'image-resizer';
                const align = el.getAttribute('data-align') || 'left';
                const style = { left: 'margin-right: auto;', center: 'margin-left: auto; margin-right: auto;', right: 'margin-left: auto;' }[align] || 'margin-right: auto;';
                figure.style.cssText = style;
                figure.appendChild(el.cloneNode(true));
                blockContent.push(figure);
              } else {
                blockContent.push(node);
              }
            } else {
              inlineContent.push(node);
            }
          } else {
            // Text nodes go to inline content
            inlineContent.push(node);
          }
        });
        
        // Filter out empty <p> tags from blockContent.
        // When marked wraps a checkbox inside a <p>, removing the checkbox can leave
        // an empty <p> (or one with only whitespace/newlines). These create blank
        // lines in the rendered output between the checkbox and the text content.
        const filteredBlockContent = blockContent.filter(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            if (el.tagName === 'P' && !el.textContent?.trim() && !el.querySelector('img, figure, code, br')) {
              return false; // Skip empty <p> tags
            }
          }
          return true;
        });
        
        // Clear the <li> and rebuild with proper structure
        li.innerHTML = '';
        
        // Wrap inline content in <p> if there is any meaningful content
        if (inlineContent.length > 0) {
          const p = doc.createElement('p');
          inlineContent.forEach(node => p.appendChild(node));
          // Trim leading whitespace from the first text node (space after checkbox)
          if (p.firstChild && p.firstChild.nodeType === Node.TEXT_NODE) {
            p.firstChild.textContent = (p.firstChild.textContent || '').replace(/^\s+/, '');
          }
          // Only append the <p> if it has meaningful content (not just whitespace)
          if (p.textContent?.trim() || p.querySelector('img, figure, code, br')) {
            li.appendChild(p);
          }
        }
        
        // Re-append block content (nested lists, etc.)
        // If a <p> that contained the checkbox is now in blockContent, it already has the text
        filteredBlockContent.forEach(node => li.appendChild(node));
      }
    });

    // If ALL items are checkboxes, convert the <ul> to a taskList
    // If mixed, keep as <ul> (TipTap's mixed list extension handles this)
    if (hasCheckbox && !hasRegular) {
      ul.setAttribute('data-type', 'taskList');
    } else if (hasCheckbox) {
      // Mixed list: keep as <ul> but task items are already marked with data-type="taskItem"
      // TipTap's MixedBulletList extension will handle this
    }
  };

  // Process all top-level <ul> elements
  const topUls = Array.from(container.querySelectorAll(':scope > ul')) as HTMLUListElement[];
  topUls.forEach(processUl);

  return container.innerHTML;
}
