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
 * Usage:
 *   pnpm run build:lib
 * 
 * Output:
 *   dist-lib/
 *     manus-editor.js      (ESM bundle)
 *     manus-editor.umd.cjs (UMD bundle)
 *     manus-editor.css      (Extracted styles)
 *     index.d.ts            (TypeScript declarations - generated separately)
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
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
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
