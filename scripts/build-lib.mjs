#!/usr/bin/env node

/**
 * Build script for @samishkolli/paragon npm package
 * 
 * This script:
 * 1. Builds the library bundle using Vite in library mode
 * 2. Generates TypeScript declarations
 * 3. Rewrites @/ path aliases to relative paths in .d.ts files
 * 4. Copies the package.lib.json as package.json into dist-lib/
 * 5. Copies the README for the library
 * 
 * Usage:
 *   node scripts/build-lib.mjs
 *   # or via npm script:
 *   pnpm run build:lib
 */

import { execSync } from 'node:child_process';
import { copyFileSync, readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
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
// Clear incremental build cache to ensure declarations are always emitted.
// The base tsconfig.json has incremental: true with a tsBuildInfoFile, which
// can cause tsc to skip emit when it thinks nothing changed.
const tsBuildInfoPath = path.resolve(ROOT, 'node_modules/typescript/tsbuildinfo');
if (existsSync(tsBuildInfoPath)) {
  const { unlinkSync } = await import('node:fs');
  unlinkSync(tsBuildInfoPath);
  console.log('   Cleared stale tsBuildInfo cache');
}
run('npx tsc --project tsconfig.lib.json', 'Generating TypeScript declarations');

// Step 2.5: Rewrite @/ path aliases to relative paths in .d.ts files
// TypeScript doesn't rewrite path aliases in emitted declarations, so
// `from '@/components/editor/...'` stays as-is. Since @/ maps to client/src/
// and types are emitted under dist-lib/types/ (rootDir=client/src), we compute
// the correct relative path from each .d.ts file to the referenced module.
(function rewritePathAliases() {
  const typesDir = path.resolve(DIST, 'types');
  if (!existsSync(typesDir)) return;

  console.log('\n📦 Rewriting @/ path aliases in .d.ts files...');

  function findDtsFiles(dir) {
    const results = [];
    for (const entry of readdirSync(dir)) {
      const fullPath = path.join(dir, entry);
      if (statSync(fullPath).isDirectory()) {
        results.push(...findDtsFiles(fullPath));
      } else if (entry.endsWith('.d.ts')) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const dtsFiles = findDtsFiles(typesDir);
  let totalRewrites = 0;

  for (const filePath of dtsFiles) {
    const content = readFileSync(filePath, 'utf-8');
    const fileDir = path.dirname(filePath);

    const rewritten = content.replace(
      /(from\s+['"])@\/([^'"]+)(['"])/g,
      (_match, prefix, importPath, suffix) => {
        const targetAbsolute = path.resolve(typesDir, importPath);
        let relativePath = path.relative(fileDir, targetAbsolute);
        if (!relativePath.startsWith('.')) {
          relativePath = './' + relativePath;
        }
        relativePath = relativePath.replace(/\\/g, '/');
        totalRewrites++;
        return `${prefix}${relativePath}${suffix}`;
      }
    );

    if (rewritten !== content) {
      writeFileSync(filePath, rewritten, 'utf-8');
    }
  }

  console.log(`   Rewrote ${totalRewrites} @/ imports across ${dtsFiles.length} .d.ts files`);
})();

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
