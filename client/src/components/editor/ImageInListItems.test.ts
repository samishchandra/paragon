/**
 * Tests for images inside list items — verifies the markdown→HTML parsing
 * and HTML→markdown serialization pipelines handle images correctly.
 *
 * Covers:
 * - Nested bullet list with image child
 * - Nested task list with image child
 * - Image as continuation content in a bullet list item
 * - structureImagesInListItems post-processing
 * - convertCheckboxListsToTaskLists with images
 */
import { describe, it, expect } from 'vitest';

// We test the two key functions that are defined in MarkdownEditor.tsx.
// Since they're module-private, we replicate their logic here for unit testing.
// The integration test (round-trip) is done via the actual component in the browser.

/**
 * Replicate structureImagesInListItems logic for testing.
 */
function structureImagesInListItems(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
  const container = doc.body.firstElementChild as HTMLElement;
  if (!container) return html;

  const allLis = Array.from(container.querySelectorAll('li')) as HTMLLIElement[];

  for (const li of allLis) {
    if (li.getAttribute('data-type') === 'taskItem') continue;

    const hasImg = li.querySelector(':scope > img, :scope > p > img, :scope > figure');
    if (!hasImg) continue;

    const childNodes = Array.from(li.childNodes);
    const inlineContent: Node[] = [];
    const blockContent: Node[] = [];

    childNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tag = el.tagName;

        if (tag === 'UL' || tag === 'OL') {
          blockContent.push(node);
        } else if (tag === 'FIGURE') {
          blockContent.push(node);
        } else if (tag === 'IMG') {
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
          const pImgs = el.querySelectorAll('img');
          if (pImgs.length === 0) {
            blockContent.push(node);
          } else {
            const pChildren = Array.from(el.childNodes);
            const textParts: Node[] = [];

            pChildren.forEach(pChild => {
              if (pChild.nodeType === Node.ELEMENT_NODE && (pChild as HTMLElement).tagName === 'IMG') {
                if (textParts.length > 0) {
                  const p = doc.createElement('p');
                  textParts.forEach(t => p.appendChild(t.cloneNode(true)));
                  if (p.textContent?.trim()) blockContent.push(p);
                  textParts.length = 0;
                }
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

            if (textParts.length > 0) {
              const p = doc.createElement('p');
              textParts.forEach(t => p.appendChild(t.cloneNode(true)));
              if (p.textContent?.trim()) blockContent.push(p);
            }
          }
        } else {
          inlineContent.push(node);
        }
      } else {
        inlineContent.push(node);
      }
    });

    li.innerHTML = '';

    if (inlineContent.length > 0) {
      const hasText = inlineContent.some(n => (n.textContent || '').trim().length > 0);
      if (hasText) {
        const p = doc.createElement('p');
        inlineContent.forEach(n => p.appendChild(n));
        li.appendChild(p);
      }
    }

    blockContent.forEach(node => li.appendChild(node));
  }

  return container.innerHTML;
}

describe('Images inside list items', () => {
  describe('structureImagesInListItems', () => {
    it('should wrap bare <img> inside <li> with <figure>', () => {
      const input = '<ul><li><img src="https://example.com/img.jpg" alt="test" data-align="left" width="132"></li></ul>';
      const result = structureImagesInListItems(input);
      expect(result).toContain('<figure class="image-resizer"');
      expect(result).toContain('<img src="https://example.com/img.jpg"');
      expect(result).not.toContain('<li><img'); // img should not be bare inside li
    });

    it('should separate text and image in same <li>', () => {
      const input = '<ul><li>First bullet<img src="https://example.com/img.jpg" alt="test" data-align="left" width="132"></li></ul>';
      const result = structureImagesInListItems(input);
      expect(result).toContain('<p>First bullet</p>');
      expect(result).toContain('<figure class="image-resizer"');
    });

    it('should handle nested bullet with image', () => {
      const input = '<ul><li>First bullet<ul><li><img src="https://example.com/img.jpg" alt="test" data-align="left" width="132"></li></ul></li></ul>';
      const result = structureImagesInListItems(input);
      // The nested li should have the image wrapped in figure
      expect(result).toContain('<figure class="image-resizer"');
    });

    it('should extract image from <p> inside <li>', () => {
      const input = '<ul><li><p>First bullet</p><p><img src="https://example.com/img.jpg" alt="test" data-align="left" width="132"></p></li></ul>';
      const result = structureImagesInListItems(input);
      expect(result).toContain('<p>First bullet</p>');
      expect(result).toContain('<figure class="image-resizer"');
      // Image should not be inside a <p> anymore
      expect(result).not.toContain('<p><img');
    });

    it('should preserve existing <figure> wrappers', () => {
      const input = '<ul><li><p>Text</p><figure class="image-resizer"><img src="https://example.com/img.jpg" alt="test"></figure></li></ul>';
      const result = structureImagesInListItems(input);
      expect(result).toContain('<figure class="image-resizer"');
      expect(result).toContain('<p>Text</p>');
    });

    it('should not modify list items without images', () => {
      const input = '<ul><li>Just text</li><li>More text</li></ul>';
      const result = structureImagesInListItems(input);
      expect(result).toBe(input);
    });

    it('should skip task items (handled by convertCheckboxListsToTaskLists)', () => {
      const input = '<ul data-type="taskList"><li data-type="taskItem" data-checked="false"><p>Task</p><img src="https://example.com/img.jpg" alt="test"></li></ul>';
      const result = structureImagesInListItems(input);
      // Task items should be left unchanged
      expect(result).toBe(input);
    });

    it('should handle center-aligned images', () => {
      const input = '<ul><li><img src="https://example.com/img.jpg" alt="test" data-align="center" width="200"></li></ul>';
      const result = structureImagesInListItems(input);
      expect(result).toContain('margin-left: auto; margin-right: auto;');
    });

    it('should handle right-aligned images', () => {
      const input = '<ul><li><img src="https://example.com/img.jpg" alt="test" data-align="right" width="200"></li></ul>';
      const result = structureImagesInListItems(input);
      expect(result).toContain('margin-left: auto;');
    });

    it('should handle mixed text and image in <p>', () => {
      const input = '<ul><li><p>Before <img src="https://example.com/img.jpg" alt="test" data-align="left"> After</p></li></ul>';
      const result = structureImagesInListItems(input);
      expect(result).toContain('<figure class="image-resizer"');
      // Text before and after should be preserved
      expect(result).toContain('Before');
      expect(result).toContain('After');
    });
  });

  describe('convertCheckboxListsToTaskLists with images', () => {
    // Replicate the convertCheckboxListsToTaskLists function for testing
    function convertCheckboxListsToTaskLists(html: string): string {
      const parser = new DOMParser();
      const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
      const container = doc.body.firstElementChild as HTMLElement;
      if (!container) return html;

      const processUl = (ul: HTMLUListElement) => {
        const nestedUls = Array.from(ul.querySelectorAll('ul')) as HTMLUListElement[];
        nestedUls.forEach(processUl);

        const items = Array.from(ul.children).filter(el => el.tagName === 'LI') as HTMLLIElement[];
        let hasCheckbox = false;
        let hasRegular = false;

        const findCheckbox = (li: HTMLLIElement): HTMLInputElement | null => {
          const directInput = li.querySelector(':scope > input[type="checkbox"]');
          if (directInput) return directInput as HTMLInputElement;
          const firstP = li.querySelector(':scope > p');
          if (firstP) {
            const pInput = firstP.querySelector(':scope > input[type="checkbox"]');
            if (pInput) return pInput as HTMLInputElement;
          }
          return null;
        };

        items.forEach(li => {
          if (findCheckbox(li)) hasCheckbox = true;
          else hasRegular = true;
        });

        if (!hasCheckbox) return;

        items.forEach(li => {
          const checkbox = findCheckbox(li);
          if (checkbox) {
            const isChecked = checkbox.hasAttribute('checked');
            li.setAttribute('data-type', 'taskItem');
            li.setAttribute('data-checked', String(isChecked));

            const checkboxParent = checkbox.parentElement;
            const wasInsideP = checkboxParent && checkboxParent.tagName === 'P' && checkboxParent.parentElement === li;
            checkbox.remove();

            if (wasInsideP && checkboxParent.firstChild && checkboxParent.firstChild.nodeType === Node.TEXT_NODE) {
              checkboxParent.firstChild.textContent = (checkboxParent.firstChild.textContent || '').replace(/^\s+/, '');
            }

            const childNodes = Array.from(li.childNodes);
            const inlineContent: Node[] = [];
            const blockContent: Node[] = [];

            childNodes.forEach(node => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const el = node as HTMLElement;
                if (el.tagName === 'UL' || el.tagName === 'OL' || el.tagName === 'P') {
                  blockContent.push(node);
                } else if (el.tagName === 'IMG' || el.tagName === 'FIGURE') {
                  if (el.tagName === 'IMG') {
                    const figure = doc.createElement('figure');
                    figure.className = 'image-resizer';
                    const align = el.getAttribute('data-align') || 'left';
                    const style: Record<string, string> = { left: 'margin-right: auto;', center: 'margin-left: auto; margin-right: auto;', right: 'margin-left: auto;' };
                    figure.style.cssText = style[align] || 'margin-right: auto;';
                    figure.appendChild(el.cloneNode(true));
                    blockContent.push(figure);
                  } else {
                    blockContent.push(node);
                  }
                } else {
                  inlineContent.push(node);
                }
              } else {
                inlineContent.push(node);
              }
            });

            li.innerHTML = '';

            if (inlineContent.length > 0) {
              const p = doc.createElement('p');
              inlineContent.forEach(node => p.appendChild(node));
              if (p.firstChild && p.firstChild.nodeType === Node.TEXT_NODE) {
                p.firstChild.textContent = (p.firstChild.textContent || '').replace(/^\s+/, '');
              }
              li.appendChild(p);
            }

            blockContent.forEach(node => li.appendChild(node));
          }
        });

        if (hasCheckbox && !hasRegular) {
          ul.setAttribute('data-type', 'taskList');
        }
      };

      const topUls = Array.from(container.querySelectorAll(':scope > ul')) as HTMLUListElement[];
      topUls.forEach(processUl);

      return container.innerHTML;
    }

    it('should treat IMG as block content in task items', () => {
      const input = '<ul><li><input disabled="" type="checkbox"> <img src="https://example.com/img.jpg" alt="test" data-align="left" width="132"></li></ul>';
      const result = convertCheckboxListsToTaskLists(input);
      expect(result).toContain('data-type="taskItem"');
      expect(result).toContain('<figure class="image-resizer"');
      // Image should be inside a <figure>, not directly inside a <p>
      expect(result).toMatch(/<figure[^>]*>\s*<img/);
      expect(result).not.toMatch(/<p>[^<]*<img/);
    });

    it('should handle task item with text and nested image', () => {
      const input = '<ul><li><input disabled="" type="checkbox"> First bullet<ul><li><input disabled="" type="checkbox"> <img src="https://example.com/img.jpg" alt="test" data-align="left" width="132"></li></ul></li></ul>';
      const result = convertCheckboxListsToTaskLists(input);
      expect(result).toContain('data-type="taskList"');
      // Both items should be task items
      const taskItems = result.match(/data-type="taskItem"/g);
      expect(taskItems?.length).toBe(2);
      // The nested item should have the image in a figure
      expect(result).toContain('<figure class="image-resizer"');
    });

    it('should preserve text before image in task items', () => {
      const input = '<ul><li><input disabled="" type="checkbox"> Some text <img src="https://example.com/img.jpg" alt="test"></li></ul>';
      const result = convertCheckboxListsToTaskLists(input);
      expect(result).toContain('Some text');
      expect(result).toContain('<figure class="image-resizer"');
    });
  });
});
