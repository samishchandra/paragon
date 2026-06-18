/**
 * SteadyCaret — a non-blinking caret sized to the font height of the text.
 *
 * The native caret blink is OS/WebKit-controlled and not CSS-tunable, and its
 * height tracks the (tall) line box rather than the glyph. This hides the native
 * caret (`caret-color: transparent` on the ProseMirror root) and renders a steady
 * bar that follows the collapsed selection, with a height derived from the font
 * size (≈ glyph height) and centered in the line box. Shown only while the editor
 * is editable, focused, and has a collapsed selection — mirroring native caret
 * visibility.
 *
 * Positioned from the selection's client rect, relative to the editor's scroll
 * wrapper (the same `relative` container the WYSIWYG overlays use). Coordinates
 * come from getBoundingClientRect, which already accounts for the editor's CSS
 * `zoom`, so the rect deltas stay correct under zoom even though the caret itself
 * lives outside the zoomed content.
 *
 * Event-driven (no polling): repositions on editor transactions/selection,
 * focus/blur, document selectionchange, container scroll, window resize, and a
 * ResizeObserver on the editable (which fires on zoom/reflow). All coalesced
 * via a single rAF.
 */

import { useEffect, useRef } from 'react';
import type { Editor } from '@tiptap/react';

/** Caret bar thickness, in px (kept constant regardless of zoom). */
const CARET_WIDTH_PX = 2;
/** Caret height as a fraction of the font size — ≈ ascender-to-descender. */
const CARET_HEIGHT_RATIO = 1.15;
/** Fallback font size when none is resolvable, in px. */
const FALLBACK_FONT_PX = 14;
/** Fallback line-height multiplier for empty lines with no measurable rect. */
const FALLBACK_LINE_RATIO = 1.5;

interface SteadyCaretProps {
  editor: Editor;
  /** The `relative` scroll wrapper the caret is positioned within. */
  containerRef: React.RefObject<HTMLElement | null>;
}

export function SteadyCaret({ editor, containerRef }: SteadyCaretProps) {
  const caretRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = editor.view.dom as HTMLElement;
    const caret = caretRef.current;
    const container = containerRef.current;
    if (!root || !caret || !container) return;

    // Hide the native (blinking) caret; restore on teardown.
    const previousCaretColor = root.style.caretColor;
    root.style.caretColor = 'transparent';

    let frame = 0;
    const place = () => {
      frame = 0;
      const focused = document.activeElement === root;
      const sel = window.getSelection();
      if (
        !editor.isEditable ||
        !focused ||
        !sel ||
        sel.rangeCount === 0 ||
        !sel.isCollapsed ||
        !root.contains(sel.anchorNode)
      ) {
        caret.style.opacity = '0';
        return;
      }

      const range = sel.getRangeAt(0);
      const rects = range.getClientRects();
      // At a soft-wrap/inline boundary a collapsed range yields two rects (end of
      // the previous visual line + start of the next); the caret belongs at the
      // latter, so prefer the last rect. Fall back to the bounding rect otherwise.
      const rect = rects.length > 0 ? rects[rects.length - 1] : range.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // fontSize/zoom are set as inline styles by the host (EditorPanel); fall
      // back to computed style / 1 for other consumers.
      const fontPx =
        parseFloat(root.style.fontSize) ||
        parseFloat(getComputedStyle(root).fontSize) ||
        FALLBACK_FONT_PX;
      const zoom = parseFloat(root.style.zoom) || 1;
      const caretH = Math.max(2, Math.round(fontPx * zoom * CARET_HEIGHT_RATIO));

      const cs = getComputedStyle(root);
      const lineFallback = (parseFloat(cs.lineHeight) || fontPx * FALLBACK_LINE_RATIO) * zoom;
      let lineTop = rect.top;
      let left = rect.left;
      // A collapsed cursor on an empty line keeps a valid top/left but height 0 —
      // synthesize only the height there, preserving the real position. Re-anchor
      // to the editable's text origin ONLY when the rect carries no geometry at
      // all (e.g. a truly empty document).
      let lineHeight = rect.height || lineFallback;
      if (!rect.height && rect.top === 0 && rect.left === 0) {
        const rootRect = root.getBoundingClientRect();
        lineTop = rootRect.top + parseFloat(cs.paddingTop) * zoom;
        left = rootRect.left + parseFloat(cs.paddingLeft) * zoom;
      }

      // Center the font-height caret within the (taller) line box.
      const top = lineTop + (lineHeight - caretH) / 2;

      caret.style.width = `${CARET_WIDTH_PX}px`;
      caret.style.height = `${caretH}px`;
      caret.style.opacity = '1';
      caret.style.transform = `translate(${left - containerRect.left}px, ${top - containerRect.top}px)`;
    };

    const schedule = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(place);
    };

    editor.on('transaction', schedule);
    editor.on('selectionUpdate', schedule);
    editor.on('focus', schedule);
    editor.on('blur', schedule);
    document.addEventListener('selectionchange', schedule);
    container.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    // Fires on zoom changes (root's rendered size changes) and content reflow.
    const ro = new ResizeObserver(schedule);
    ro.observe(root);
    schedule();

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      editor.off('transaction', schedule);
      editor.off('selectionUpdate', schedule);
      editor.off('focus', schedule);
      editor.off('blur', schedule);
      document.removeEventListener('selectionchange', schedule);
      container.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      ro.disconnect();
      root.style.caretColor = previousCaretColor;
    };
  }, [editor, containerRef]);

  return (
    <div
      ref={caretRef}
      aria-hidden
      className="steady-caret"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: CARET_WIDTH_PX,
        opacity: 0,
        pointerEvents: 'none',
        background: 'var(--foreground, currentColor)',
        borderRadius: 1,
        willChange: 'transform',
        zIndex: 1,
      }}
    />
  );
}
