import TurndownService from 'turndown';

const td = new TurndownService({ bulletListMarker: '-', headingStyle: 'atx' });

// Add the resizableImage rule (same as in useTurndownService.ts)
td.addRule('resizableImage', {
  filter: 'img',
  replacement: (content, node) => {
    const img = node;
    const src = img.getAttribute('src') || '';
    const rawAlt = img.getAttribute('alt') || '';
    const alt = rawAlt.replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, '').trim();
    const widthAttr = img.getAttribute('width');
    const width = widthAttr ? parseInt(widthAttr, 10) : null;
    const align = img.getAttribute('data-align') || 'left';
    const parts = [alt];
    const hasNonDefaultAlign = align && align !== 'left';
    const hasWidth = width && width > 0;
    if (hasNonDefaultAlign || hasWidth) {
      parts.push(hasNonDefaultAlign ? align : 'left');
    }
    if (hasWidth) {
      parts.push(String(width));
    }
    return `![${parts.join(' | ')}](${src})`;
  },
});

// Test case 1: Image as separate block in list item (what TipTap getHTML outputs)
const html1 = `<ul><li><p>First bullet</p><ul><li><figure class="image-resizer" style="margin-right: auto;"><img src="https://example.com/img.jpg" alt="alt_text" data-align="left" width="132" style="width: 132px"></figure></li></ul></li><li><p>Second bullet</p></li></ul>`;

// Test case 2: Image inline in same list item  
const html2 = `<ul><li><p>First bullet</p><figure class="image-resizer" style="margin-right: auto;"><img src="https://example.com/img.jpg" alt="alt_text" data-align="left" width="132" style="width: 132px"></figure></li><li><p>Second bullet</p></li></ul>`;

// Test case 3: Task list with nested image
const html3 = `<ul data-type="taskList"><li data-type="taskItem" data-checked="false"><p>First bullet</p><ul data-type="taskList"><li data-type="taskItem" data-checked="false"><p></p><figure class="image-resizer" style="margin-right: auto;"><img src="https://example.com/img.jpg" alt="alt_text" data-align="left" width="132" style="width: 132px"></figure></li></ul></li><li data-type="taskItem" data-checked="false"><p>Second bullet</p></li></ul>`;

console.log('=== Case 1: Nested bullet with image ===');
console.log(td.turndown(html1));
console.log('\n=== Case 2: Image in same list item ===');
console.log(td.turndown(html2));
console.log('\n=== Case 3: Task list with nested image ===');
console.log(td.turndown(html3));
