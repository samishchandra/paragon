/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client', 'src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./client/src/test/setup.ts'],
    include: ['client/src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'dist-lib'],
    css: false,
    // Increase timeout for component tests that involve TipTap editor initialization
    testTimeout: 15000,
    // Reporter configuration
    reporters: ['verbose'],
    // Coverage configuration (optional, run with --coverage)
    coverage: {
      provider: 'v8',
      include: [
        'client/src/components/editor/**/*.{ts,tsx}',
        'client/src/lib/**/*.ts',
        'client/src/hooks/**/*.ts',
      ],
      exclude: [
        'client/src/components/ui/**',
        'client/src/**/*.test.{ts,tsx}',
        'client/src/test/**',
      ],
    },
  },
});
