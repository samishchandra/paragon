/**
 * Vite Plugin: Foundation Resolve
 * 
 * Implements a cascading resolution strategy for the @/ path alias:
 * 1. First checks `client/src/` (repo-specific overrides)
 * 2. Falls back to `foundation/client/src/` (shared foundation code)
 * 
 * This allows embedding repos to override any foundation file by placing
 * a file at the same relative path in their own `client/src/` directory.
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
      // Only handle @/ imports
      if (!source.startsWith("@/")) return null;

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

      // Not found in either location — let Vite handle the error
      return null;
    },
  };
}
