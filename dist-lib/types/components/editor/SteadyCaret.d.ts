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
import type { Editor } from '@tiptap/react';
interface SteadyCaretProps {
    editor: Editor;
    /** The `relative` scroll wrapper the caret is positioned within. */
    containerRef: React.RefObject<HTMLElement | null>;
}
export declare function SteadyCaret({ editor, containerRef }: SteadyCaretProps): import("react").JSX.Element;
export {};
