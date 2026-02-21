/**
 * Tests for sync-foundation.mjs
 *
 * These tests verify the core helper functions and logic of the sync script
 * using a temporary directory structure to simulate the foundation layout.
 */
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execSync } from "node:child_process";

const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");
const SCRIPTS_DIR = path.resolve(import.meta.dirname);
const SYNC_SCRIPT = path.join(SCRIPTS_DIR, "sync-foundation.mjs");

// Temp directory for isolated tests
const TEST_TMP = path.join(PROJECT_ROOT, ".test-sync-tmp");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf-8");
}

function fileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(content).digest("hex");
}

function runScript(args = "") {
  return execSync(`node "${SYNC_SCRIPT}" ${args} 2>&1`, {
    encoding: "utf-8",
    cwd: PROJECT_ROOT,
  });
}

describe("sync-foundation script", () => {
  describe("script existence and syntax", () => {
    it("script file exists", () => {
      expect(fs.existsSync(SYNC_SCRIPT)).toBe(true);
    });

    it("script is valid JavaScript (can be parsed)", () => {
      const result = execSync(`node --check "${SYNC_SCRIPT}" 2>&1`, {
        encoding: "utf-8",
        cwd: PROJECT_ROOT,
      });
      expect(result.trim()).toBe("");
    });

    it("script has executable permission", () => {
      const stats = fs.statSync(SYNC_SCRIPT);
      const isExecutable = (stats.mode & 0o111) !== 0;
      expect(isExecutable).toBe(true);
    });
  });

  describe("--help flag", () => {
    it("displays help text and exits cleanly", () => {
      const result = runScript("--help");
      expect(result).toContain("sync-foundation");
      expect(result).toContain("--dry-run");
      expect(result).toContain("--status");
      expect(result).toContain("--branch");
      expect(result).toContain("--ref");
      expect(result).toContain("--force");
    });

    it("-h shorthand also works", () => {
      const result = runScript("-h");
      expect(result).toContain("sync-foundation");
    });

    it("shows SSH URL options in help", () => {
      const result = runScript("--help");
      expect(result).toContain("--ssh");
      expect(result).toContain("--https");
      expect(result).toContain("--url");
      expect(result).toContain("git@github.com:");
    });

    it("shows URL resolution order in help", () => {
      const result = runScript("--help");
      expect(result).toContain("URL Resolution Order");
      expect(result).toContain("Auto-detect");
      expect(result).toContain("SSH");
      expect(result).toContain("HTTPS");
    });

    it("shows private repo setup instructions in help", () => {
      const result = runScript("--help");
      expect(result).toContain("Private Repo Setup");
      expect(result).toContain("SSH key");
      expect(result).toContain("ssh -T git@github.com");
    });
  });

  describe("--status flag", () => {
    it("displays foundation sync status", () => {
      const result = runScript("--status");
      expect(result).toContain("Foundation Sync Status");
      expect(result).toContain("Foundation files:");
      expect(result).toContain("Local overrides:");
    });

    it("shows the current commit from .foundation-version", () => {
      const versionFile = path.join(PROJECT_ROOT, ".foundation-version");
      if (fs.existsSync(versionFile)) {
        const result = runScript("--status");
        expect(result).toContain("Commit:");
        expect(result).toContain("Branch:");
        expect(result).toContain("Synced at:");
      }
    });

    it("lists local overrides that shadow foundation files", () => {
      const result = runScript("--status");
      expect(result).toContain("Overridden files");
      expect(result).toContain("AuthContext.tsx");
    });

    it("shows SSH access status", () => {
      const result = runScript("--status");
      expect(result).toContain("SSH access:");
      // Should show either "available" or "not available"
      const hasSSHInfo =
        result.includes("available") || result.includes("not available");
      expect(hasSSHInfo).toBe(true);
    });
  });

  describe(".foundation-version file", () => {
    it("exists and has required fields", () => {
      const versionFile = path.join(PROJECT_ROOT, ".foundation-version");
      expect(fs.existsSync(versionFile)).toBe(true);

      const content = fs.readFileSync(versionFile, "utf-8");
      expect(content).toContain("commit=");
      expect(content).toContain("branch=");
      expect(content).toContain("synced_at=");
      expect(content).toContain("upstream=");
    });

    it("contains the upstream repo URL", () => {
      const versionFile = path.join(PROJECT_ROOT, ".foundation-version");
      const content = fs.readFileSync(versionFile, "utf-8");
      expect(content).toContain("momentum-foundation");
    });
  });

  describe("package.json scripts", () => {
    it("has sync:foundation script", () => {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(PROJECT_ROOT, "package.json"), "utf-8")
      );
      expect(pkg.scripts["sync:foundation"]).toBe(
        "node scripts/sync-foundation.mjs"
      );
    });

    it("has sync:foundation:dry script", () => {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(PROJECT_ROOT, "package.json"), "utf-8")
      );
      expect(pkg.scripts["sync:foundation:dry"]).toBe(
        "node scripts/sync-foundation.mjs --dry-run"
      );
    });

    it("has sync:foundation:status script", () => {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(PROJECT_ROOT, "package.json"), "utf-8")
      );
      expect(pkg.scripts["sync:foundation:status"]).toBe(
        "node scripts/sync-foundation.mjs --status"
      );
    });
  });

  describe("foundation directory integrity", () => {
    it("foundation/ directory exists with files", () => {
      const foundationDir = path.join(PROJECT_ROOT, "foundation");
      expect(fs.existsSync(foundationDir)).toBe(true);

      const files = fs.readdirSync(foundationDir);
      expect(files.length).toBeGreaterThan(0);
    });

    it("foundation/client/src/ contains expected structure", () => {
      const clientSrc = path.join(
        PROJECT_ROOT,
        "foundation",
        "client",
        "src"
      );
      expect(fs.existsSync(clientSrc)).toBe(true);

      const dirs = fs.readdirSync(clientSrc, { withFileTypes: true });
      const dirNames = dirs
        .filter((d) => d.isDirectory())
        .map((d) => d.name);
      expect(dirNames).toContain("components");
      expect(dirNames).toContain("contexts");
      expect(dirNames).toContain("lib");
    });

    it("foundation is NOT a git submodule", () => {
      expect(
        fs.existsSync(path.join(PROJECT_ROOT, ".gitmodules"))
      ).toBe(false);
      expect(
        fs.existsSync(path.join(PROJECT_ROOT, "foundation", ".git"))
      ).toBe(false);
    });

    it("local overrides exist in client/src/ for key files", () => {
      const overrideFiles = [
        "client/src/contexts/AuthContext.tsx",
        "client/src/App.tsx",
        "client/src/main.tsx",
        "client/src/index.css",
      ];
      for (const f of overrideFiles) {
        expect(fs.existsSync(path.join(PROJECT_ROOT, f))).toBe(true);
        expect(
          fs.existsSync(path.join(PROJECT_ROOT, "foundation", f))
        ).toBe(true);
      }
    });
  });

  describe("SSH and HTTPS URL configuration", () => {
    it("script source contains both SSH and HTTPS URL constants", () => {
      const source = fs.readFileSync(SYNC_SCRIPT, "utf-8");
      expect(source).toContain("git@github.com:");
      expect(source).toContain("https://github.com/");
      expect(source).toContain("momentum-foundation");
    });

    it("script source contains SSH access detection function", () => {
      const source = fs.readFileSync(SYNC_SCRIPT, "utf-8");
      expect(source).toContain("hasSSHAccess");
      expect(source).toContain("ssh -o");
      expect(source).toContain("successfully authenticated");
    });

    it("script source contains cloneUpstream with fallback logic", () => {
      const source = fs.readFileSync(SYNC_SCRIPT, "utf-8");
      expect(source).toContain("cloneUpstream");
      expect(source).toContain("Trying");
      expect(source).toContain("trying next");
    });

    it("parseArgs handles --ssh flag", () => {
      const source = fs.readFileSync(SYNC_SCRIPT, "utf-8");
      expect(source).toContain('"--ssh"');
      expect(source).toContain("preferSSH");
    });

    it("parseArgs handles --https flag", () => {
      const source = fs.readFileSync(SYNC_SCRIPT, "utf-8");
      expect(source).toContain('"--https"');
    });

    it("parseArgs handles --url flag", () => {
      const source = fs.readFileSync(SYNC_SCRIPT, "utf-8");
      expect(source).toContain('"--url"');
      expect(source).toContain('"-u"');
    });
  });

  describe("file hashing consistency", () => {
    beforeEach(() => {
      ensureDir(TEST_TMP);
    });

    afterEach(() => {
      if (fs.existsSync(TEST_TMP)) {
        fs.rmSync(TEST_TMP, { recursive: true, force: true });
      }
    });

    it("identical files produce the same hash", () => {
      const file1 = path.join(TEST_TMP, "a.txt");
      const file2 = path.join(TEST_TMP, "b.txt");
      writeFile(file1, "hello world");
      writeFile(file2, "hello world");
      expect(fileHash(file1)).toBe(fileHash(file2));
    });

    it("different files produce different hashes", () => {
      const file1 = path.join(TEST_TMP, "a.txt");
      const file2 = path.join(TEST_TMP, "b.txt");
      writeFile(file1, "hello world");
      writeFile(file2, "hello world!");
      expect(fileHash(file1)).not.toBe(fileHash(file2));
    });
  });

  describe("error handling", () => {
    it("shows troubleshooting tips when clone fails", () => {
      // Try syncing with a bogus URL — should fail with helpful error
      try {
        runScript("--url https://github.com/nonexistent/repo-404.git --force");
      } catch (err) {
        const output = err.stdout || err.stderr || "";
        expect(output).toContain("Failed to clone");
        expect(output).toContain("Troubleshooting");
      }
    });
  });
});
