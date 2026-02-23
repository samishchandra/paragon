/**
 * AIResultPopover — Displays streaming AI results near the selection.
 *
 * Shows the AI-generated text as it streams in, with action buttons:
 * - Replace: replaces the selected text with the AI result
 * - Insert: inserts the AI result after the selected text
 * - Retry: re-runs the same action
 * - Discard: closes the popover
 *
 * Positioning: Centers horizontally on the selection midpoint.
 * Vertically places below the selection if space allows, otherwise above.
 *
 * This component is lazy-loaded — only imported when AI features are enabled.
 */
import type { AIState } from './types';
interface AIResultPopoverProps {
    state: AIState;
    /** Anchor position in viewport coordinates — selection bounds */
    position: {
        selectionTop: number;
        selectionBottom: number;
        selectionCenterX: number;
    };
    /** Replace the selected text with the AI result */
    onReplace: () => void;
    /** Insert the AI result after the selected text */
    onInsert: () => void;
    /** Retry the same action */
    onRetry: () => void;
    /** Discard / close */
    onDiscard: () => void;
}
export declare function AIResultPopover({ state, position, onReplace, onInsert, onRetry, onDiscard, }: AIResultPopoverProps): import("react").JSX.Element | null;
export {};
