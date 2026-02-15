/**
 * Paragon AI Module — Barrel Export
 *
 * All AI-related components and types are exported from here.
 * The embedding application imports these lazily via React.lazy or dynamic import.
 */
export type { AIActionDefinition, AIActionHandler, AIState, AIAction } from './types';
export { AIDropdownMenu } from './AIDropdownMenu';
export { AIResultPopover } from './AIResultPopover';
export { useAIState } from './useAIState';
