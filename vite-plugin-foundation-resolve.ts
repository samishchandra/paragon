/**
 * Vite Plugin: Foundation Resolve
 * 
 * Implements a cascading resolution strategy:
 * 
 * 1. **@/ alias imports**: First checks `client/src/`, falls back to `foundation/client/src/`
 * 2. **Relative imports from client/src/**: If a relative import from a file in `client/src/`
 *    can't be resolved locally, falls back to the equivalent path in `foundation/client/src/`
 * 
 * This allows embedding repos to override any foundation file by placing
 * a file at the same relative path in their own `client/src/` directory,
 * while still allowing client overrides to use relative imports for
 * foundation files that haven't been overridden.
 */
import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".json", ".css"];

function tryResolve(basePath: string): string | null {
  // Try exact path first
  if (fs.existsSync(basePath) && fs.statSync(basePath).isFile()) {
    return basePath;
  }
  // Try with extensions
  for (const ext of EXTENSIONS) {
    const withExt = basePath + ext;
    if (fs.existsSync(withExt) && fs.statSync(withExt).isFile()) {
      return withExt;
    }
  }
  // Try as directory with index file
  if (fs.existsSync(basePath) && fs.statSync(basePath).isDirectory()) {
    for (const ext of EXTENSIONS) {
      const indexFile = path.join(basePath, `index${ext}`);
      if (fs.existsSync(indexFile)) {
        return indexFile;
      }
    }
  }
  return null;
}

export function foundationResolvePlugin(projectRoot: string): Plugin {
  const clientSrc = path.resolve(projectRoot, "client", "src");
  const foundationSrc = path.resolve(projectRoot, "foundation", "client", "src");

  return {
    name: "foundation-resolve",
    enforce: "pre",
    resolveId(source, importer) {
      // ── Handle @/ alias imports ──
      if (source.startsWith("@/")) {
        const relativePath = source.slice(2); // Remove "@/"

        // 1. Try repo-specific override first
        const overridePath = path.resolve(clientSrc, relativePath);
        const overrideResolved = tryResolve(overridePath);
        if (overrideResolved) {
          return overrideResolved;
        }

        // 2. Fall back to foundation
        const foundationPath = path.resolve(foundationSrc, relativePath);
        const foundationResolved = tryResolve(foundationPath);
        if (foundationResolved) {
          return foundationResolved;
        }

        return null;
      }

      // ── Handle relative imports from client/src/ files ──
      // When a file in client/src/ uses a relative import (e.g., ./useItemOperations)
      // and the target doesn't exist in client/src/, fall back to foundation/client/src/
      if (source.startsWith("./") || source.startsWith("../")) {
        if (!importer) return null;

        const normalizedImporter = path.normalize(importer);

        // Only apply fallback for files inside client/src/
        if (!normalizedImporter.startsWith(clientSrc + path.sep)) return null;

        // Compute the absolute path the relative import would resolve to
        const importerDir = path.dirname(normalizedImporter);
        const absoluteTarget = path.resolve(importerDir, source);

        // If it already resolves in client/src/, let Vite handle it normally
        if (tryResolve(absoluteTarget)) return null;

        // Compute the equivalent path in foundation/client/src/
        const relativeFromClient = path.relative(clientSrc, absoluteTarget);
        const foundationTarget = path.resolve(foundationSrc, relativeFromClient);
        const foundationResolved = tryResolve(foundationTarget);

        if (foundationResolved) {
          return foundationResolved;
        }
      }

      // Not handled — let Vite's default resolution proceed
      return null;
    },
  };
}
