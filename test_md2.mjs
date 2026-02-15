import { marked } from 'marked';

const md = `- [ ] **Bold text** for emphasis
- [ ] *Italic text* for subtle emphasis
    -   ~Strikethrough~ for corrections`;

console.log("=== Input Markdown ===");
console.log(md);
console.log("\n=== marked.parse() output ===");
const html = marked.parse(md);
console.log(html);
