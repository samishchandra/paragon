/**
 * useAIState — Manages the AI interaction state machine.
 * 
 * This hook is only imported when AI features are enabled (lazy-loaded).
 */

import { useReducer, useCallback, useRef } from 'react';
import type { AIState, AIAction, AIActionHandler } from './types';

function aiReducer(state: AIState, action: AIAction): AIState {
  switch (action.type) {
    case 'start-streaming':
      return {
        status: 'streaming',
        action: action.action,
        actionLabel: action.actionLabel,
        inputText: action.inputText,
        result: '',
        selectionRange: action.selectionRange,
      };
    case 'append-chunk':
      if (state.status !== 'streaming') return state;
      return { ...state, result: state.result + action.text };
    case 'complete':
      if (state.status !== 'streaming') return state;
      return { ...state, status: 'complete' };
    case 'error':
      return { status: 'error', message: action.message, action: state.status === 'streaming' ? state.action : undefined };
    case 'reset':
      return { status: 'idle' };
    default:
      return state;
  }
}

export function useAIState(onAIAction?: AIActionHandler) {
  const [state, dispatch] = useReducer(aiReducer, { status: 'idle' });
  const abortRef = useRef<(() => void) | null>(null);

  const executeAction = useCallback(async (
    actionId: string,
    actionLabel: string,
    text: string,
    selectionRange: { from: number; to: number },
    customPrompt?: string,
  ) => {
    if (!onAIAction) return;

    dispatch({
      type: 'start-streaming',
      action: actionId,
      actionLabel,
      inputText: text,
      selectionRange,
    });

    try {
      const result = onAIAction(actionId, text, customPrompt);

      // Check if it's an async iterable (streaming) or a promise (non-streaming)
      if (Symbol.asyncIterator in Object(result)) {
        // Streaming
        for await (const chunk of result as AsyncIterable<string>) {
          dispatch({ type: 'append-chunk', text: chunk });
        }
      } else {
        // Non-streaming (Promise<string>)
        const fullText = await (result as Promise<string>);
        dispatch({ type: 'append-chunk', text: fullText });
      }

      dispatch({ type: 'complete' });
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        dispatch({ type: 'reset' });
        return;
      }
      const message = err instanceof Error ? err.message : 'AI action failed';
      dispatch({ type: 'error', message });
    }
  }, [onAIAction]);

  const abort = useCallback(() => {
    abortRef.current?.();
    dispatch({ type: 'reset' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  return { state, executeAction, abort, reset };
}
