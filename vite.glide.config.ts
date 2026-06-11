import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client', 'src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  root: path.resolve(__dirname, 'client'),
  publicDir: false,
  build: {
    outDir: path.resolve(__dirname, 'dist/glide'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'client/glide.html'),
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('/react-dom/') || id.includes('/react/')) {
            return 'vendor-react';
          }
          if (id.includes('/@tiptap/') || id.includes('/prosemirror-')) {
            return 'vendor-tiptap';
          }
          if (id.includes('/lowlight/') || id.includes('/highlight.js/')) {
            return 'vendor-highlight';
          }
          return undefined;
        },
      },
    },
  },
});
