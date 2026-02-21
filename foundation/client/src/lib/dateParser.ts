/**
 * Natural Language Date Parser
 * Detects date phrases in text (e.g., "tomorrow", "next Friday", "in 3 days")
 * and extracts them with their positions for visual highlighting and auto-setting due dates.
 *
 * Performance optimizations:
 * - Lazy-loads chrono-node via dynamic import (not in initial bundle)
 * - Caches recent parse results to avoid redundant parsing
 * - Provides both sync (cached-only) and async (full parse) APIs
 * - Quick pre-filter rejects text unlikely to contain dates before invoking chrono
 */

export interface ParsedDate {
  /** The parsed Date object */
  date: Date;
  /** The matched text in the original string (e.g., "tomorrow", "next Friday") */
  matchedText: string;
  /** Start index of the matched text in the original string */
  startIndex: number;
  /** End index of the matched text in the original string */
  endIndex: number;
}

// ── Lazy chrono-node loader ──────────────────────────────────────────────
let chronoModule: typeof import('chrono-node') | null = null;
let chronoLoadPromise: Promise<typeof import('chrono-node')> | null = null;

async function getChrono(): Promise<typeof import('chrono-node')> {
  if (chronoModule) return chronoModule;
  if (!chronoLoadPromise) {
    chronoLoadPromise = import('chrono-node').then(mod => {
      chronoModule = mod;
      return mod;
    });
  }
  return chronoLoadPromise;
}

/**
 * Pre-load chrono-node in the background so it's ready when needed.
 * Call this once on app startup or when the editor mounts.
 */
export function preloadDateParser(): void {
  getChrono().catch(() => {
    // Silently ignore preload failures
  });
}

// ── Quick pre-filter ─────────────────────────────────────────────────────
// Fast regex check to reject text that almost certainly has no date phrases.
// This avoids calling chrono.parse() on every keystroke for non-date text.
const DATE_HINT_PATTERN = /\b(today|tomorrow|yesterday|tonight|morning|afternoon|evening|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|june|july|august|september|october|november|december|next\s+\w+|last\s+\w+|in\s+\w+|this\s+\w+|end\s+of|by\s+\w+|due\s+\w+|before\s+\w+|\d{1,2}\/\d{1,2}|\d{4}-\d{2}-\d{2})\b/i;

function mightContainDate(text: string): boolean {
  return DATE_HINT_PATTERN.test(text);
}

// ── Parse result cache ───────────────────────────────────────────────────
// Simple LRU-style cache: stores the last N parse results keyed by input text.
const CACHE_MAX = 16;
const parseCache = new Map<string, ParsedDate | null>();

function getCached(text: string): ParsedDate | null | undefined {
  return parseCache.get(text);
}

function setCache(text: string, result: ParsedDate | null): void {
  // Evict oldest if at capacity
  if (parseCache.size >= CACHE_MAX) {
    const firstKey = parseCache.keys().next().value;
    if (firstKey !== undefined) parseCache.delete(firstKey);
  }
  parseCache.set(text, result);
}

// ── Core parsing (internal) ──────────────────────────────────────────────
function parseWithChrono(text: string, chrono: typeof import('chrono-node')): ParsedDate | null {
  const results = chrono.parse(text, new Date(), { forwardDate: true });
  if (results.length === 0) return null;

  const result = results[0];
  const date = result.start.date();

  // Validate: not more than 5 years in the future or past
  const now = new Date();
  const fiveYearsMs = 5 * 365 * 24 * 60 * 60 * 1000;
  if (Math.abs(date.getTime() - now.getTime()) > fiveYearsMs) {
    return null;
  }

  return {
    date,
    matchedText: result.text,
    startIndex: result.index,
    endIndex: result.index + result.text.length,
  };
}

// ── Public API ───────────────────────────────────────────────────────────

/**
 * Async date extraction — lazy-loads chrono-node, uses cache + pre-filter.
 * This is the primary API for the debounced title change handler.
 */
export async function extractDateFromTextAsync(text: string): Promise<ParsedDate | null> {
  if (!text || text.trim().length === 0) return null;

  // Quick reject: no date-like tokens
  if (!mightContainDate(text)) return null;

  // Check cache
  const cached = getCached(text);
  if (cached !== undefined) return cached;

  // Lazy-load chrono and parse
  const chrono = await getChrono();
  const result = parseWithChrono(text, chrono);
  setCache(text, result);
  return result;
}

/**
 * Synchronous date extraction — only works if chrono is already loaded.
 * Falls back to cache-only if chrono hasn't been loaded yet.
 * Used for the Enter-key auto-apply path where we need an immediate result.
 */
export function extractDateFromText(text: string): ParsedDate | null {
  if (!text || text.trim().length === 0) return null;
  if (!mightContainDate(text)) return null;

  // Check cache first
  const cached = getCached(text);
  if (cached !== undefined) return cached;

  // If chrono is loaded, parse synchronously
  if (chronoModule) {
    const result = parseWithChrono(text, chronoModule);
    setCache(text, result);
    return result;
  }

  // chrono not loaded yet — return null (async path will handle it)
  return null;
}

/**
 * Remove the date phrase from the text and clean up whitespace.
 * Returns the cleaned title text.
 */
export function removeDateFromText(text: string, parsed: ParsedDate): string {
  const before = text.slice(0, parsed.startIndex);
  const after = text.slice(parsed.endIndex);

  // Clean up: remove extra whitespace, leading/trailing spaces
  let cleaned = (before + after).replace(/\s{2,}/g, ' ').trim();

  // Remove trailing prepositions/conjunctions left behind
  cleaned = cleaned.replace(/\s+(by|on|at|for|due|before|until|till|from)\s*$/i, '').trim();

  // Remove leading prepositions left behind
  cleaned = cleaned.replace(/^(by|on|at|for|due|before|until|till|from)\s+/i, '').trim();

  return cleaned;
}

/**
 * Format a date for display in the date chip/badge.
 * Shows relative dates for nearby dates, otherwise shows the date.
 */
export function formatDetectedDate(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1 && diffDays <= 7) {
    return target.toLocaleDateString('en-US', { weekday: 'long' });
  }
  if (diffDays > 7 && diffDays <= 14) return 'Next week';

  return target.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ── Test helpers (exported for unit tests) ───────────────────────────────
export const _testHelpers = {
  mightContainDate,
  clearCache: () => parseCache.clear(),
  getCacheSize: () => parseCache.size,
  isChronoLoaded: () => chronoModule !== null,
  /** Force-set chrono module for testing sync path */
  setChronoModule: (mod: typeof import('chrono-node') | null) => {
    chronoModule = mod;
  },
};
