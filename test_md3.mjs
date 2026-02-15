import { JSDOM } from 'jsdom';

// This is the exact output from marked for the problematic markdown
const html = `<ul>
<li><input disabled="" type="checkbox"> <strong>Bold text</strong> for emphasis</li>
<li><input disabled="" type="checkbox"> <em>Italic text</em> for subtle emphasis<ul>
<li><del>Strikethrough</del> for corrections</li>
</ul>
</li>
</ul>`;

console.log("=== Input HTML from marked ===");
console.log(html);

// Simulate the convertCheckboxListsToTaskLists function
const dom = new JSDOM(`<div>${html}</div>`);
const doc = dom.window.document;
const container = doc.body.firstElementChild;

const processUl = (ul) => {
  // First, recursively process any nested <ul> inside this one
  const nestedUls = Array.from(ul.querySelectorAll('ul'));
  console.log(`\nProcessing <ul>, found ${nestedUls.length} nested <ul>s`);
  nestedUls.forEach(processUl);

  const items = Array.from(ul.children).filter(el => el.tagName === 'LI');
  let hasCheckbox = false;
  let hasRegular = false;

  items.forEach((li, i) => {
    const firstInput = li.querySelector(':scope > input[type="checkbox"]');
    console.log(`  <li>[${i}] has checkbox: ${!!firstInput}, innerHTML: ${li.innerHTML.substring(0, 80)}...`);
    if (firstInput) {
      hasCheckbox = true;
    } else {
      hasRegular = true;
    }
  });

  console.log(`  hasCheckbox: ${hasCheckbox}, hasRegular: ${hasRegular}`);

  if (!hasCheckbox) {
    console.log("  -> No checkboxes, skipping");
    return;
  }

  items.forEach((li, i) => {
    const checkbox = li.querySelector(':scope > input[type="checkbox"]');
    if (checkbox) {
      const isChecked = checkbox.hasAttribute('checked');
      li.setAttribute('data-type', 'taskItem');
      li.setAttribute('data-checked', String(isChecked));
      checkbox.remove();

      const childNodes = Array.from(li.childNodes);
      const inlineContent = [];
      const blockContent = [];

      childNodes.forEach(node => {
        if (node.nodeType === 1) { // ELEMENT_NODE
          const el = node;
          console.log(`    Child element: <${el.tagName}>`);
          if (el.tagName === 'UL' || el.tagName === 'OL' || el.tagName === 'P') {
            blockContent.push(node);
          } else {
            inlineContent.push(node);
          }
        } else {
          console.log(`    Text node: "${node.textContent?.substring(0, 40)}"`);
          inlineContent.push(node);
        }
      });

      console.log(`  <li>[${i}] inlineContent: ${inlineContent.length}, blockContent: ${blockContent.length}`);

      li.innerHTML = '';

      if (inlineContent.length > 0) {
        const p = doc.createElement('p');
        inlineContent.forEach(node => p.appendChild(node));
        if (p.firstChild && p.firstChild.nodeType === 3) {
          p.firstChild.textContent = (p.firstChild.textContent || '').replace(/^\s+/, '');
        }
        li.appendChild(p);
      }

      blockContent.forEach(node => li.appendChild(node));
      console.log(`  <li>[${i}] final innerHTML: ${li.innerHTML}`);
    }
  });

  if (hasCheckbox && !hasRegular) {
    ul.setAttribute('data-type', 'taskList');
    console.log("  -> Set data-type=taskList on <ul>");
  }
};

const topUls = Array.from(container.querySelectorAll(':scope > ul'));
topUls.forEach(processUl);

console.log("\n=== Final HTML ===");
console.log(container.innerHTML);
