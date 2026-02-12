import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'node_modules/@tiptap/react/dist/index.js');
let code = fs.readFileSync(filePath, 'utf-8');

// Pattern 1: Original unpatched version
const original = `    if (this.editor.isInitialized) {
      flushSync(() => {
        this.render();
      });
    }`;

// Pattern 2: Previously patched version (try/catch)
const previousPatch = `    if (this.editor.isInitialized) {
      try {
        flushSync(() => {
          this.render();
        });
      } catch (e) {
        queueMicrotask(() => {
          if (this.destroyed) return;
          this.render();
        });
      }
    }`;

// Replace flushSync entirely with queueMicrotask to avoid the console.error
// flushSync doesn't throw when called during rendering - it just logs an error
// and still executes the callback. Using queueMicrotask is safe because the
// else branch already uses it for uninitialized editors.
const replacement = `    if (this.editor.isInitialized) {
      queueMicrotask(() => {
        if (this.destroyed) return;
        this.render();
      });
    }`;

if (code.includes(previousPatch)) {
  code = code.replace(previousPatch, replacement);
  fs.writeFileSync(filePath, code, 'utf-8');
  console.log('Successfully patched @tiptap/react: replaced try/catch flushSync with queueMicrotask');
} else if (code.includes(original)) {
  code = code.replace(original, replacement);
  fs.writeFileSync(filePath, code, 'utf-8');
  console.log('Successfully patched @tiptap/react: replaced flushSync with queueMicrotask');
} else if (code.includes(replacement)) {
  console.log('Already patched');
} else {
  console.log('Could not find the flushSync pattern to patch');
}
