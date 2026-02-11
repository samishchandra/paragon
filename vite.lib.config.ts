import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vite Library Mode Configuration
 * 
 * Builds the Manus Markdown Editor as a reusable npm package.
 * 
 * Bundle Optimization Strategy:
 * ─────────────────────────────
 * 1. React is externalized (peer dependency)
 * 2. TipTap + ProseMirror are externalized (peer dependencies)
 *    - Consuming apps already have these; bundling them doubles the cost
 * 3. highlight.js uses selective imports (15 languages instead of 37)
 * 4. lucide-react is externalized (peer dependency)
 * 
 * Usage:
 *   pnpm run build:lib
 * 
 * Output:
 *   dist-lib/
 *     manus-editor.js      (ESM bundle)
 *     manus-editor.umd.cjs (UMD bundle)
 *     manus-editor.css      (Extracted styles)
 *     types/                (TypeScript declarations)
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client', 'src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  root: path.resolve(__dirname),
  build: {
    lib: {
      entry: path.resolve(__dirname, 'client/src/lib/editor-entry.ts'),
      name: 'ManusEditor',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'manus-editor.js';
        if (format === 'umd') return 'manus-editor.umd.cjs';
        return `manus-editor.${format}.js`;
      },
    },
    outDir: path.resolve(__dirname, 'dist-lib'),
    emptyOutDir: true,
    cssFileName: 'manus-editor',
    sourcemap: true,
    rollupOptions: {
      // Externalize peer dependencies — consumers must provide these
      // This is the primary bundle size optimization: instead of bundling
      // TipTap/ProseMirror (~800 KB), we expect the consuming app to
      // provide them. Any app using @manus/editor already needs TipTap.
      external: (id) => {
        // React
        if (id === 'react' || id === 'react-dom' || id.startsWith('react/') || id.startsWith('react-dom/')) {
          return true;
        }
        // TipTap
        if (id.startsWith('@tiptap/')) return true;
        // ProseMirror
        if (id.startsWith('prosemirror-') || id.startsWith('@prosemirror/')) return true;
        // lowlight / highlight.js (consumers configure their own languages)
        if (id === 'lowlight' || id.startsWith('lowlight/') || id === 'highlight.js' || id.startsWith('highlight.js/')) return true;
        // lucide-react (icon library — consumers already have it)
        if (id === 'lucide-react' || id.startsWith('lucide-react/')) return true;
        return false;
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'lucide-react': 'LucideReact',
          'lowlight': 'lowlight',
          '@tiptap/react': 'TiptapReact',
          '@tiptap/core': 'TiptapCore',
        },
        // Ensure CSS is extracted
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'manus-editor.css';
          }
          return assetInfo.name || 'asset-[hash][extname]';
        },
      },
    },
  },
});
