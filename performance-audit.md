# Momentum Performance Audit

## Bundle Analysis

| Chunk | Size (raw) | Size (gzip) | Contents |
|-------|-----------|-------------|----------|
| ParagonEditorAdapter | 1,061 KB | 326 KB | Paragon editor + TipTap + marked + highlight.js |
| AuthenticatedApp | 901 KB | 214 KB | MiddlePanel (3071 LOC) + LeftSidebar + dnd-kit + framer-motion + all contexts |
| index (vendor) | 546 KB | 163 KB | React + tRPC + react-query + superjson + wouter |
| ParagonEditorAdapter.css | 209 KB | 34 KB | Paragon editor styles |
| SettingsDialog | 168 KB | 31 KB | Settings UI + all settings panels |
| index.css | 156 KB | 24 KB | Tailwind output + app styles |
| index-qEnd4NwJ.js | 156 KB | 38 KB | Additional shared modules |
| EditorV2 | 98 KB | 19 KB | Editor wrapper + date parsing |
| jszip.min | 97 KB | 30 KB | JSZip for backup export |
| CommandPalette | 46 KB | 7 KB | Command palette (lazy) |
| SearchPanel | 41 KB | 7 KB | Search panel (lazy) |
| testDataGenerator | 39 KB | 13 KB | Test data (lazy, settings only) |
| **Total JS** | **3.1 MB** | ~**850 KB** | |
| **Total CSS** | **364 KB** | ~**58 KB** | |

## Key Findings

### HIGH IMPACT

1. **No manualChunks config** — Vite bundles everything into a few mega-chunks.
   The 901KB AuthenticatedApp chunk contains MiddlePanel (3071 LOC), LeftSidebar (1287 LOC),
   all context hooks, dnd-kit, framer-motion, and more. Should split vendor libs.

2. **No static asset caching headers** — `serveStatic` uses bare `express.static(distPath)`
   without `maxAge` or `immutable` for hashed assets. Every page load re-validates.

3. **No compression middleware** — Express serves uncompressed responses. Adding gzip/brotli
   would cut transfer sizes by 60-70%.

4. **Font loading blocks render** — Google Fonts loaded via render-blocking `<link>` stylesheet.
   Should use `font-display: swap` (already in URL) but no preload for the font files themselves.

5. **Duplicate lucide-react** — Two versions installed (0.453.0 + 0.542.0) due to Paragon.
   Both get bundled, adding ~30KB+ gzipped of duplicate icon code.

### MEDIUM IMPACT

6. **MiddlePanel is 3071 lines** — Single monolithic component. Even with memo'd sub-components,
   any state change in the parent triggers re-evaluation of the entire render function.

7. **Context provides ~80+ values** — Every context consumer re-renders when any value changes.
   The `useMomentum()` hook returns the entire context object.

8. **No CSS containment** — Large scrollable lists (MiddlePanel, LeftSidebar) lack `contain: content`
   which would help browsers skip layout/paint for off-screen items.

9. **framer-motion in 8 files** — Adds ~30KB gzipped to the bundle. Used for subtle animations
   that could use CSS transitions instead for most cases.

### ALREADY GOOD

- ✅ Lazy loading: EditorV2, SearchPanel, CommandPalette, SettingsDialog, testDataGenerator
- ✅ AuthenticatedApp is lazy-loaded (code-split from auth gate)
- ✅ Virtualized lists (react-window) for 100+ items
- ✅ IndexedDB offline cache with stale-while-revalidate pattern
- ✅ Service worker with proper caching strategies
- ✅ Database indexes on key columns
- ✅ Batch sync endpoint (Promise.all for parallel queries)
- ✅ memo'd sub-components (Section, SortableItem, ItemCard, SidebarItem, etc.)
- ✅ Skeleton loading states for all panels
- ✅ `font-display: swap` in Google Fonts URL

## Implementation Plan

### High Impact (implement now)
1. Add manualChunks to split vendor libs (react, radix, dnd-kit, framer-motion, tiptap)
2. Add compression middleware (express compression)
3. Add proper cache headers for hashed static assets (1 year immutable)
4. Add font preload hints
5. Deduplicate lucide-react via Vite resolve alias

### Medium Impact (implement now)
6. Add CSS containment to scrollable panels
7. Add `will-change` hints for animated elements
8. Preconnect to API/CDN domains
