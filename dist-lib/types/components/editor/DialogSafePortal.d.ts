import { type ReactNode, type MouseEvent } from 'react';
/**
 * DialogSafePortal — a shared wrapper for portal-based popovers, menus, and tooltips.
 *
 * Solves the recurring problem where portaled content inside a Radix Dialog
 * (or any CSS-transformed container) becomes unclickable because:
 *   1. Radix Dialog sets `pointer-events: none` on `<body>`, blocking clicks
 *   2. Events propagate through the portal back to the dialog, causing unwanted behavior
 *
 * This wrapper:
 *   - Portals children to `document.body` via `createPortal`
 *   - Sets `pointer-events: auto` to override the body's `pointer-events: none`
 *   - Stops mouseDown, pointerDown, and click propagation to prevent event leaking
 *   - Uses a high z-index (99999) to stay above dialog overlays
 *   - Renders a transparent, zero-size container so it doesn't affect layout
 *
 * Usage:
 * ```tsx
 * <DialogSafePortal>
 *   <div style={{ position: 'fixed', top: 100, left: 200 }}>
 *     My popover content
 *   </div>
 * </DialogSafePortal>
 * ```
 *
 * For components that need additional mouseDown handling (e.g., preventing blur),
 * use the `onMouseDown` prop — it runs before stopPropagation.
 */
interface DialogSafePortalProps {
    children: ReactNode;
    /** Additional class name for the portal container */
    className?: string;
    /** Custom z-index (default: 99999) */
    zIndex?: number;
    /** Additional mouseDown handler that runs before stopPropagation */
    onMouseDown?: (e: MouseEvent) => void;
}
export declare function DialogSafePortal({ children, className, zIndex, onMouseDown, }: DialogSafePortalProps): import("react").ReactPortal;
export default DialogSafePortal;
