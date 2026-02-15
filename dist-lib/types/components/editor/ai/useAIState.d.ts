/**
 * useAIState — Manages the AI interaction state machine.
 *
 * This hook is only imported when AI features are enabled (lazy-loaded).
 */
import type { AIState, AIActionHandler } from './types';
export declare function useAIState(onAIAction?: AIActionHandler): {
    state: AIState;
    executeAction: (actionId: string, actionLabel: string, text: string, selectionRange: {
        from: number;
        to: number;
    }, customPrompt?: string) => Promise<void>;
    abort: () => void;
    reset: () => void;
};
