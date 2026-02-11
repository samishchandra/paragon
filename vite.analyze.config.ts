import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Bundle Analysis Configuration
 * Identical to vite.lib.config.ts but with rollup-plugin-visualizer added.
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
      formats: ['es'],
      fileName: () => 'manus-editor.js',
    },
    outDir: path.resolve(__dirname, 'dist-lib'),
    emptyOutDir: true,
    cssFileName: 'manus-editor',
    sourcemap: false,
    rollupOptions: {
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
      },
      plugins: [
        visualizer({
          filename: path.resolve(__dirname, 'dist-lib/stats.html'),
          gzipSize: true,
          brotliSize: true,
          template: 'treemap',
        }),
      ],
    },
  },
});
