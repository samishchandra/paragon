import { defineConfig } from "vitest/config";
import path from "path";
import fs from "fs";

const templateRoot = path.resolve(import.meta.dirname);
const clientSrc = path.resolve(templateRoot, "client", "src");
const foundationSrc = path.resolve(templateRoot, "foundation", "client", "src");

const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".json", ".css"];

/**
 * Vitest-compatible resolve plugin that mirrors the foundation resolve
 * behavior: check client/src/ first, then fall back to foundation/client/src/.
 */
function foundationResolvePlugin() {
  function tryResolve(basePath: string): string | null {
    if (fs.existsSync(basePath) && fs.statSync(basePath).isFile()) return basePath;
    for (const ext of EXTENSIONS) {
      const withExt = basePath + ext;
      if (fs.existsSync(withExt) && fs.statSync(withExt).isFile()) return withExt;
    }
    if (fs.existsSync(basePath) && fs.statSync(basePath).isDirectory()) {
      for (const ext of EXTENSIONS) {
        const indexFile = path.join(basePath, `index${ext}`);
        if (fs.existsSync(indexFile)) return indexFile;
      }
    }
    return null;
  }

  return {
    name: "vitest-foundation-resolve",
    enforce: "pre" as const,
    resolveId(source: string) {
      if (!source.startsWith("@/")) return null;
      const relativePath = source.slice(2);
      const overrideResolved = tryResolve(path.resolve(clientSrc, relativePath));
      if (overrideResolved) return overrideResolved;
      const foundationResolved = tryResolve(path.resolve(foundationSrc, relativePath));
      if (foundationResolved) return foundationResolved;
      return null;
    },
  };
}

export default defineConfig({
  root: templateRoot,
  plugins: [foundationResolvePlugin()],
  resolve: {
    alias: {
      "@shared": path.resolve(templateRoot, "shared"),
      "@assets": path.resolve(templateRoot, "attached_assets"),
    },
  },
  test: {
    globals: true,
    include: [
      "server/**/*.test.ts",
      "server/**/*.spec.ts",
      "client/src/**/*.test.ts",
      "client/src/**/*.test.tsx",
      "scripts/**/*.test.mjs",
    ],
    environmentMatchGlobs: [
      ["client/src/**", "jsdom"],
      ["server/**", "node"],
    ],
    setupFiles: ["./client/src/__tests__/setup.ts"],
    css: false,
  },
});
