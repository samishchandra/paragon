/**
 * AIDropdownMenu — Dropdown menu for AI actions.
 *
 * Renders the list of AI actions with icons and an optional custom prompt input.
 * Used by both the FloatingToolbar (selection scope) and EditorToolbar (document scope).
 *
 * This component is lazy-loaded — only imported when AI features are enabled.
 */
import type { AIActionDefinition } from './types';
interface AIDropdownMenuProps {
    actions: AIActionDefinition[];
    scope: 'selection' | 'document';
    onAction: (actionId: string, customPrompt?: string) => void;
    onClose: () => void;
    /** Anchor position in viewport coordinates */
    position: {
        top: number;
        left: number;
    };
}
export declare function AIDropdownMenu({ actions, scope, onAction, onClose, position }: AIDropdownMenuProps): import("react").JSX.Element;
export {};
