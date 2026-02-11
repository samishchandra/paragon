#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * 
 * Builds the library with rollup-plugin-visualizer to generate
 * a stats.html file showing the bundle composition.
 */

import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

console.log('📊 Building library with bundle analysis...');
execSync('npx vite build --config vite.analyze.config.ts', { cwd: ROOT, stdio: 'inherit' });
console.log('\n✅ Analysis complete! Open dist-lib/stats.html in a browser.');
