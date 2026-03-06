#!/usr/bin/env node

/**
 * Build script for @samishkolli/paragon npm package
 * 
 * This script:
 * 1. Builds the library bundle using Vite in library mode
 * 2. Generates TypeScript declarations
 * 3. Copies the package.lib.json as package.json into dist-lib/
 * 4. Copies the README for the library
 * 
 * Usage:
 *   node scripts/build-lib.mjs
 *   # or via npm script:
 *   pnpm run build:lib
 */

import { execSync } from 'node:child_process';
import { copyFileSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.resolve(ROOT, 'dist-lib');

function run(cmd, label) {
  console.log(`\n📦 ${label}...`);
  try {
    execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
  } catch (err) {
    console.error(`❌ ${label} failed`);
    process.exit(1);
  }
}

// Step 1: Build the library bundle
// Force NODE_ENV=production so @vitejs/plugin-react uses react/jsx-runtime
// instead of react/jsx-dev-runtime. Without this, jsxDEV calls in the bundle
// crash consuming apps with "f.jsxDEV is not a function".
run('NODE_ENV=production npx vite build --config vite.lib.config.ts', 'Building library bundle');

// Step 2: Generate TypeScript declarations
run('npx tsc --project tsconfig.lib.json', 'Generating TypeScript declarations');

// Step 3: Copy package.json for publishing
console.log('\n📦 Preparing package.json...');
const pkgSrc = path.resolve(ROOT, 'package.lib.json');
const pkgDst = path.resolve(DIST, 'package.json');
copyFileSync(pkgSrc, pkgDst);

// Step 4: Copy library README
console.log('📦 Copying README...');
const readmeSrc = path.resolve(ROOT, 'README.lib.md');
const readmeDst = path.resolve(DIST, 'README.md');
if (existsSync(readmeSrc)) {
  copyFileSync(readmeSrc, readmeDst);
} else {
  console.log('   (No README.lib.md found, skipping)');
}

// Step 5: Print summary
console.log('\n✅ Library build complete!');
console.log(`   Output: ${DIST}/`);
console.log('');
console.log('   Files:');
const files = [
  'paragon.js',
  'paragon.umd.cjs',
  'paragon.css',
  'package.json',
  'types/',
];
files.forEach(f => {
  const fullPath = path.resolve(DIST, f);
  const exists = existsSync(fullPath);
  console.log(`   ${exists ? '✓' : '✗'} ${f}`);
});

console.log('');
console.log('   To publish:');
console.log('     cd dist-lib && npm publish --access public');
console.log('');
console.log('   To use locally:');
console.log('     # In your consuming project:');
console.log('     pnpm add ../manus-markdown-editor/dist-lib');
console.log('');
