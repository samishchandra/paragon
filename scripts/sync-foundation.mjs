#!/usr/bin/env node
/**
 * sync-foundation.mjs — Pull & copy workflow for momentum-foundation
 *
 * Since the foundation/ directory is tracked as regular files (not a git
 * submodule), this script automates pulling the latest upstream changes
 * and copying them into the project.
 *
 * Usage:
 *   node scripts/sync-foundation.mjs                  # interactive sync (SSH first, HTTPS fallback)
 *   node scripts/sync-foundation.mjs --dry-run        # preview changes only
 *   node scripts/sync-foundation.mjs --branch <name>  # sync from a specific branch
 *   node scripts/sync-foundation.mjs --ref <hash>     # sync a specific commit
 *   node scripts/sync-foundation.mjs --url <url>      # use a specific git URL (SSH or HTTPS)
 *   node scripts/sync-foundation.mjs --ssh            # force SSH URL
 *   node scripts/sync-foundation.mjs --https          # force HTTPS URL
 *   node scripts/sync-foundation.mjs --status         # show current version & override report
 *
 * The script:
 *   1. Clones (or fetches) the upstream repo into a temp directory
 *      - Tries SSH first (git@github.com:...) for private repo access
 *      - Falls back to HTTPS if SSH fails
 *   2. Compares every file against the current foundation/ contents
 *   3. Reports new, modified, and deleted files
 *   4. Detects local overrides in client/src/ that shadow foundation files
 *   5. Copies changes (unless --dry-run)
 *   6. Updates .foundation-version with the synced commit hash
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const FOUNDATION_DIR = path.join(PROJECT_ROOT, "foundation");
const VERSION_FILE = path.join(PROJECT_ROOT, ".foundation-version");
const TEMP_DIR = path.join(PROJECT_ROOT, ".foundation-sync-tmp");

// Upstream repo coordinates — SSH is preferred for private repos
const REPO_OWNER = "samishchandra";
const REPO_NAME = "momentum-foundation";
const UPSTREAM_SSH = `git@github.com:${REPO_OWNER}/${REPO_NAME}.git`;
const UPSTREAM_HTTPS = `https://github.com/${REPO_OWNER}/${REPO_NAME}.git`;
const DEFAULT_BRANCH = "main";

// Files/dirs to skip when comparing (foundation repo meta files we don't need)
const SKIP_PATTERNS = [".git", "node_modules", ".DS_Store"];

// ANSI colors
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fileHash(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    return crypto.createHash("sha256").update(content).digest("hex");
  } catch {
    return null;
  }
}

function getAllFiles(dir, base = dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_PATTERNS.includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllFiles(fullPath, base));
    } else {
      results.push(path.relative(base, fullPath));
    }
  }
  return results;
}

function readVersion() {
  try {
    const raw = fs.readFileSync(VERSION_FILE, "utf-8").trim();
    const lines = raw.split("\n");
    const data = {};
    for (const line of lines) {
      const [key, ...rest] = line.split("=");
      if (key && rest.length) data[key.trim()] = rest.join("=").trim();
    }
    return data;
  } catch {
    return null;
  }
}

function writeVersion(commitHash, branch, date, repoUrl) {
  const content = [
    `commit=${commitHash}`,
    `branch=${branch}`,
    `synced_at=${date}`,
    `upstream=${repoUrl}`,
    "",
  ].join("\n");
  fs.writeFileSync(VERSION_FILE, content, "utf-8");
}

function exec(cmd, opts = {}) {
  return execSync(cmd, {
    encoding: "utf-8",
    stdio: opts.silent ? "pipe" : "inherit",
    cwd: opts.cwd || PROJECT_ROOT,
    ...opts,
  }).trim();
}

function execSilent(cmd, opts = {}) {
  return exec(cmd, { ...opts, silent: true, stdio: "pipe" });
}

function findOverrides() {
  const foundationClientSrc = path.join(FOUNDATION_DIR, "client", "src");
  const clientSrc = path.join(PROJECT_ROOT, "client", "src");
  const foundationFiles = getAllFiles(foundationClientSrc, foundationClientSrc);
  const overrides = [];

  for (const relFile of foundationFiles) {
    const localPath = path.join(clientSrc, relFile);
    if (fs.existsSync(localPath)) {
      overrides.push(relFile);
    }
  }
  return overrides;
}

function cleanup() {
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
}

/**
 * Detect whether SSH access to GitHub is available.
 * Returns true if `ssh -T git@github.com` succeeds (exit code 1 with
 * "successfully authenticated" is normal for GitHub).
 */
function hasSSHAccess() {
  try {
    execSilent("ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=5 -T git@github.com 2>&1", {
      cwd: PROJECT_ROOT,
    });
    return true;
  } catch (err) {
    // GitHub returns exit code 1 with "successfully authenticated" — that's fine
    const output = err.stderr || err.stdout || String(err);
    if (output.includes("successfully authenticated")) {
      return true;
    }
    return false;
  }
}

/**
 * Try to clone the upstream repo, attempting multiple URLs in order.
 * Returns the URL that succeeded.
 */
function cloneUpstream(urls, branch) {
  for (const url of urls) {
    const protocol = url.startsWith("git@") ? "SSH" : "HTTPS";
    try {
      console.log(`${c.blue}→${c.reset} Trying ${protocol}: ${c.dim}${url}${c.reset}`);
      execSilent(
        `git clone --depth 1 --single-branch --branch ${branch} "${url}" "${TEMP_DIR}"`,
        { cwd: PROJECT_ROOT }
      );
      console.log(`${c.green}✓${c.reset} Connected via ${protocol}\n`);
      return url;
    } catch {
      console.log(`${c.dim}  ${protocol} failed, ${urls.indexOf(url) < urls.length - 1 ? "trying next..." : "no more URLs to try."}${c.reset}`);
      cleanup(); // Remove partial clone
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    dryRun: false,
    status: false,
    branch: DEFAULT_BRANCH,
    ref: null,
    help: false,
    force: false,
    url: null,       // explicit URL override
    preferSSH: null, // null = auto-detect, true = force SSH, false = force HTTPS
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--dry-run":
      case "-n":
        opts.dryRun = true;
        break;
      case "--status":
      case "-s":
        opts.status = true;
        break;
      case "--branch":
      case "-b":
        opts.branch = args[++i];
        break;
      case "--ref":
      case "-r":
        opts.ref = args[++i];
        break;
      case "--force":
      case "-f":
        opts.force = true;
        break;
      case "--url":
      case "-u":
        opts.url = args[++i];
        break;
      case "--ssh":
        opts.preferSSH = true;
        break;
      case "--https":
        opts.preferSSH = false;
        break;
      case "--help":
      case "-h":
        opts.help = true;
        break;
    }
  }
  return opts;
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

function showHelp() {
  console.log(`
${c.bold}sync-foundation${c.reset} — Pull & copy workflow for momentum-foundation

${c.bold}Usage:${c.reset}
  node scripts/sync-foundation.mjs [options]

${c.bold}Options:${c.reset}
  --dry-run, -n     Preview changes without applying them
  --status, -s      Show current version and override report
  --branch, -b      Upstream branch to sync from (default: ${DEFAULT_BRANCH})
  --ref, -r         Sync a specific commit hash
  --url, -u         Use a specific git URL (SSH or HTTPS)
  --ssh             Force SSH URL (git@github.com:${REPO_OWNER}/${REPO_NAME}.git)
  --https           Force HTTPS URL (https://github.com/${REPO_OWNER}/${REPO_NAME}.git)
  --force, -f       Skip confirmation prompt
  --help, -h        Show this help message

${c.bold}URL Resolution Order:${c.reset}
  1. --url flag (explicit override)
  2. --ssh or --https flag (force protocol)
  3. Auto-detect: try SSH first, fall back to HTTPS

${c.bold}Examples:${c.reset}
  node scripts/sync-foundation.mjs                  # auto-detect (SSH → HTTPS)
  node scripts/sync-foundation.mjs --ssh            # force SSH for private repo
  node scripts/sync-foundation.mjs --https          # force HTTPS (needs token)
  node scripts/sync-foundation.mjs --dry-run        # preview only
  node scripts/sync-foundation.mjs --branch develop # sync from develop
  node scripts/sync-foundation.mjs --ref abc123     # sync specific commit
  node scripts/sync-foundation.mjs --status         # show version info
  node scripts/sync-foundation.mjs --url git@github.com:myorg/my-foundation.git

${c.bold}Private Repo Setup (SSH):${c.reset}
  1. Add your SSH key to GitHub: ${c.cyan}https://github.com/settings/keys${c.reset}
  2. Test access: ${c.cyan}ssh -T git@github.com${c.reset}
  3. Run: ${c.cyan}pnpm sync:foundation${c.reset}
`);
}

function showStatus() {
  const version = readVersion();
  console.log(`\n${c.bold}${c.cyan}Foundation Sync Status${c.reset}\n`);

  if (version) {
    console.log(`  ${c.bold}Commit:${c.reset}    ${version.commit || "unknown"}`);
    console.log(`  ${c.bold}Branch:${c.reset}    ${version.branch || "unknown"}`);
    console.log(`  ${c.bold}Synced at:${c.reset} ${version.synced_at || "unknown"}`);
    console.log(`  ${c.bold}Upstream:${c.reset}  ${version.upstream || UPSTREAM_SSH}`);
  } else {
    console.log(`  ${c.yellow}No .foundation-version file found.${c.reset}`);
    console.log(`  Foundation files are present but version is untracked.`);
  }

  const totalFiles = getAllFiles(FOUNDATION_DIR).length;
  console.log(`\n  ${c.bold}Foundation files:${c.reset} ${totalFiles}`);

  const overrides = findOverrides();
  console.log(`  ${c.bold}Local overrides:${c.reset}  ${overrides.length}`);

  if (overrides.length > 0) {
    console.log(`\n  ${c.bold}${c.yellow}Overridden files (client/src/ takes priority):${c.reset}`);
    for (const f of overrides) {
      console.log(`    ${c.yellow}↳${c.reset} ${f}`);
    }
  }

  // SSH access check
  console.log(`\n  ${c.bold}SSH access:${c.reset}  checking...`);
  const ssh = hasSSHAccess();
  if (ssh) {
    console.log(`\x1b[1A  ${c.bold}SSH access:${c.reset}  ${c.green}available${c.reset} (git@github.com)`);
  } else {
    console.log(`\x1b[1A  ${c.bold}SSH access:${c.reset}  ${c.yellow}not available${c.reset} — will use HTTPS`);
  }

  console.log("");
}

async function syncFoundation(opts) {
  const { dryRun, branch, ref, force, url, preferSSH } = opts;

  // Determine which URL(s) to try
  let urls;
  let displayUrl;

  if (url) {
    // Explicit URL override
    urls = [url];
    displayUrl = url;
  } else if (preferSSH === true) {
    // Force SSH
    urls = [UPSTREAM_SSH];
    displayUrl = UPSTREAM_SSH;
  } else if (preferSSH === false) {
    // Force HTTPS
    urls = [UPSTREAM_HTTPS];
    displayUrl = UPSTREAM_HTTPS;
  } else {
    // Auto-detect: SSH first, then HTTPS
    urls = [UPSTREAM_SSH, UPSTREAM_HTTPS];
    displayUrl = `${UPSTREAM_SSH} (with HTTPS fallback)`;
  }

  console.log(`\n${c.bold}${c.cyan}Foundation Sync${c.reset}`);
  console.log(`${c.dim}Upstream: ${displayUrl}${c.reset}`);
  console.log(`${c.dim}Branch:   ${ref ? `(ref: ${ref})` : branch}${c.reset}`);
  if (dryRun) console.log(`${c.yellow}${c.bold}DRY RUN — no files will be modified${c.reset}`);
  console.log("");

  // Step 1: Clone upstream into temp dir
  cleanup();
  console.log(`${c.blue}→${c.reset} Cloning upstream repository...`);

  const cloneBranch = ref ? branch : (ref || branch);
  const successUrl = cloneUpstream(urls, cloneBranch);

  if (!successUrl) {
    console.error(`\n${c.red}✗ Failed to clone upstream repository.${c.reset}`);
    console.error(`  Tried: ${urls.join(", ")}`);
    console.error(`\n${c.bold}Troubleshooting:${c.reset}`);
    console.error(`  ${c.cyan}SSH:${c.reset}   Ensure your SSH key is added to GitHub (${c.dim}ssh -T git@github.com${c.reset})`);
    console.error(`  ${c.cyan}HTTPS:${c.reset} Use a personal access token or GitHub CLI auth`);
    console.error(`  ${c.cyan}URL:${c.reset}   Override with --url <your-git-url>`);
    cleanup();
    process.exit(1);
  }

  // If a specific ref was requested, fetch and checkout
  if (ref) {
    try {
      execSilent(`git fetch --depth 1 origin ${ref}`, { cwd: TEMP_DIR });
      execSilent(`git checkout ${ref}`, { cwd: TEMP_DIR });
    } catch (err) {
      console.error(`${c.red}✗ Failed to checkout ref ${ref}.${c.reset}`);
      console.error(`  Error: ${err.message}`);
      cleanup();
      process.exit(1);
    }
  }

  // Get the upstream commit hash
  const upstreamHash = execSilent("git rev-parse HEAD", { cwd: TEMP_DIR });
  const upstreamShort = upstreamHash.slice(0, 8);
  const upstreamDate = execSilent('git log -1 --format="%ci"', { cwd: TEMP_DIR });
  const upstreamMsg = execSilent('git log -1 --format="%s"', { cwd: TEMP_DIR });

  console.log(`${c.blue}→${c.reset} Upstream HEAD: ${c.bold}${upstreamShort}${c.reset} (${upstreamDate})`);
  console.log(`  ${c.dim}${upstreamMsg}${c.reset}\n`);

  // Check if already up to date
  const currentVersion = readVersion();
  if (currentVersion?.commit === upstreamHash && !force) {
    console.log(`${c.green}✓ Already up to date (${upstreamShort}).${c.reset}\n`);
    cleanup();
    return;
  }

  if (currentVersion?.commit) {
    console.log(`${c.dim}Current: ${currentVersion.commit.slice(0, 8)} → Upstream: ${upstreamShort}${c.reset}\n`);
  }

  // Step 2: Compare files
  const upstreamFiles = new Set(getAllFiles(TEMP_DIR, TEMP_DIR));
  const currentFiles = new Set(getAllFiles(FOUNDATION_DIR, FOUNDATION_DIR));

  const added = [];
  const modified = [];
  const deleted = [];
  const unchanged = [];

  // Check for new and modified files
  for (const file of upstreamFiles) {
    const upstreamPath = path.join(TEMP_DIR, file);
    const currentPath = path.join(FOUNDATION_DIR, file);

    if (!currentFiles.has(file)) {
      added.push(file);
    } else {
      const upHash = fileHash(upstreamPath);
      const curHash = fileHash(currentPath);
      if (upHash !== curHash) {
        modified.push(file);
      } else {
        unchanged.push(file);
      }
    }
  }

  // Check for deleted files
  for (const file of currentFiles) {
    if (!upstreamFiles.has(file)) {
      deleted.push(file);
    }
  }

  // Step 3: Report changes
  const totalChanges = added.length + modified.length + deleted.length;

  if (totalChanges === 0) {
    console.log(`${c.green}✓ No file changes detected (${unchanged.length} files identical).${c.reset}\n`);
    if (!dryRun) {
      writeVersion(upstreamHash, ref || branch, new Date().toISOString(), successUrl);
      console.log(`${c.dim}Updated .foundation-version to ${upstreamShort}${c.reset}\n`);
    }
    cleanup();
    return;
  }

  console.log(`${c.bold}Changes detected:${c.reset}`);
  console.log(`  ${c.green}+ ${added.length} new${c.reset}  ${c.yellow}~ ${modified.length} modified${c.reset}  ${c.red}- ${deleted.length} deleted${c.reset}  ${c.dim}= ${unchanged.length} unchanged${c.reset}\n`);

  if (added.length > 0) {
    console.log(`${c.green}${c.bold}New files:${c.reset}`);
    for (const f of added.slice(0, 20)) console.log(`  ${c.green}+${c.reset} ${f}`);
    if (added.length > 20) console.log(`  ${c.dim}... and ${added.length - 20} more${c.reset}`);
    console.log("");
  }

  if (modified.length > 0) {
    console.log(`${c.yellow}${c.bold}Modified files:${c.reset}`);
    for (const f of modified.slice(0, 30)) console.log(`  ${c.yellow}~${c.reset} ${f}`);
    if (modified.length > 30) console.log(`  ${c.dim}... and ${modified.length - 30} more${c.reset}`);
    console.log("");
  }

  if (deleted.length > 0) {
    console.log(`${c.red}${c.bold}Deleted files:${c.reset}`);
    for (const f of deleted.slice(0, 20)) console.log(`  ${c.red}-${c.reset} ${f}`);
    if (deleted.length > 20) console.log(`  ${c.dim}... and ${deleted.length - 20} more${c.reset}`);
    console.log("");
  }

  // Step 4: Check for override conflicts
  const overrides = findOverrides();
  const conflictingOverrides = modified.filter((f) => {
    // Check if this modified foundation file has a local override
    if (!f.startsWith("client/src/")) return false;
    const relPath = f.slice("client/src/".length);
    return overrides.includes(relPath);
  });

  if (conflictingOverrides.length > 0) {
    console.log(`${c.magenta}${c.bold}⚠ Modified files that have local overrides:${c.reset}`);
    console.log(`${c.dim}  These foundation files changed upstream, but you have local overrides.${c.reset}`);
    console.log(`${c.dim}  The overrides will continue to take priority at runtime, but you may${c.reset}`);
    console.log(`${c.dim}  want to review the upstream changes and merge relevant updates.${c.reset}\n`);
    for (const f of conflictingOverrides) {
      console.log(`  ${c.magenta}⚡${c.reset} foundation/${f}`);
      console.log(`    ${c.dim}↳ overridden by client/src/${f.slice("client/src/".length)}${c.reset}`);
    }
    console.log("");
  }

  // Step 5: Apply changes (unless dry-run)
  if (dryRun) {
    console.log(`${c.yellow}${c.bold}Dry run complete.${c.reset} Run without --dry-run to apply changes.\n`);
    cleanup();
    return;
  }

  // Confirmation prompt (unless --force)
  if (!force) {
    const readline = await import("node:readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((resolve) => {
      rl.question(
        `${c.bold}Apply ${totalChanges} changes? ${c.dim}[y/N]${c.reset} `,
        resolve
      );
    });
    rl.close();
    if (answer.toLowerCase() !== "y" && answer.toLowerCase() !== "yes") {
      console.log(`\n${c.yellow}Aborted.${c.reset}\n`);
      cleanup();
      return;
    }
    console.log("");
  }

  // Apply additions and modifications
  let applied = 0;
  for (const file of [...added, ...modified]) {
    const src = path.join(TEMP_DIR, file);
    const dest = path.join(FOUNDATION_DIR, file);
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
    applied++;
  }

  // Apply deletions
  for (const file of deleted) {
    const dest = path.join(FOUNDATION_DIR, file);
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
      applied++;
    }
    // Clean up empty parent directories
    let dir = path.dirname(dest);
    while (dir !== FOUNDATION_DIR) {
      try {
        const entries = fs.readdirSync(dir);
        if (entries.length === 0) {
          fs.rmdirSync(dir);
        } else {
          break;
        }
      } catch {
        break;
      }
      dir = path.dirname(dir);
    }
  }

  // Update version file
  writeVersion(upstreamHash, ref || branch, new Date().toISOString(), successUrl);

  console.log(`${c.green}${c.bold}✓ Sync complete!${c.reset}`);
  console.log(`  ${applied} files updated, now at ${c.bold}${upstreamShort}${c.reset}`);
  console.log(`  Version tracked in .foundation-version\n`);

  if (conflictingOverrides.length > 0) {
    console.log(`${c.yellow}${c.bold}Next steps:${c.reset}`);
    console.log(`  1. Review the ${conflictingOverrides.length} override conflict(s) listed above`);
    console.log(`  2. Run ${c.cyan}pnpm build${c.reset} to verify the build succeeds`);
    console.log(`  3. Run ${c.cyan}pnpm test${c.reset} to verify all tests pass`);
    console.log(`  4. Commit the changes\n`);
  } else {
    console.log(`${c.dim}Next: run ${c.cyan}pnpm build${c.dim} and ${c.cyan}pnpm test${c.dim} to verify, then commit.${c.reset}\n`);
  }

  cleanup();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const opts = parseArgs();

if (opts.help) {
  showHelp();
  process.exit(0);
}

if (opts.status) {
  showStatus();
  process.exit(0);
}

// Ensure we're in the right directory
if (!fs.existsSync(FOUNDATION_DIR)) {
  console.error(`${c.red}✗ foundation/ directory not found at ${FOUNDATION_DIR}${c.reset}`);
  console.error(`  Run this script from the project root.`);
  process.exit(1);
}

try {
  await syncFoundation(opts);
} catch (err) {
  console.error(`\n${c.red}✗ Sync failed: ${err.message}${c.reset}`);
  cleanup();
  process.exit(1);
}
