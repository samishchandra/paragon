/**
 * Paragon AI Types
 * 
 * Provider-agnostic types for AI integration in the editor.
 * Paragon never imports any AI SDK — it only knows about these types
 * and the callbacks the embedding app provides.
 */

/**
 * Defines an AI action that appears in the editor's sparkles menu.
 */
export interface AIActionDefinition {
  /** Unique action identifier, e.g. 'fix-grammar' */
  id: string;
  /** Display label, e.g. 'Fix spelling & grammar' */
  label: string;
  /** Lucide icon name, e.g. 'SpellCheck' */
  icon?: string;
  /** Where this action appears: selection-only, document-only, or both */
  scope: 'selection' | 'document' | 'both';
  /** Whether this action shows a custom prompt input */
  showCustomPrompt?: boolean;
}

/**
 * Callback type for AI actions.
 * Returns an AsyncIterable<string> for streaming, or a Promise<string> for non-streaming.
 */
export type AIActionHandler = (
  action: string,
  text: string,
  customPrompt?: string
) => AsyncIterable<string> | Promise<string>;

/**
 * AI interaction state machine.
 * Only one AI operation can be active at a time.
 */
export type AIState =
  | { status: 'idle' }
  | { status: 'streaming'; action: string; actionLabel: string; inputText: string; result: string; selectionRange: { from: number; to: number } }
  | { status: 'complete'; action: string; actionLabel: string; inputText: string; result: string; selectionRange: { from: number; to: number } }
  | { status: 'error'; message: string; action?: string };

/**
 * AI state reducer actions
 */
export type AIAction =
  | { type: 'start-streaming'; action: string; actionLabel: string; inputText: string; selectionRange: { from: number; to: number } }
  | { type: 'append-chunk'; text: string }
  | { type: 'complete' }
  | { type: 'error'; message: string }
  | { type: 'reset' };
