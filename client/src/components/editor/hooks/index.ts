/**
 * Barrel file for editor hooks.
 *
 * Re-exports every custom hook and its associated types so consumers can
 * import from a single path:
 *
 *   import { useAutoSave, useWordCount, type AutoSaveOptions } from './hooks';
 */

// Auto-save with debounce, recovery, and beforeunload flush
export { useAutoSave, type AutoSaveOptions, type AutoSaveState, type AutoSaveReturn } from './useAutoSave';

// Imperative ref API exposed via useImperativeHandle
export { useEditorAPI, type UseEditorAPIDeps } from './useEditorAPI';

// TipTap extension configuration based on features and performance mode
export {
  useEditorExtensions,
  type DisabledFeatures,
  type ImageEditState,
  type ExtensionCallbackRefs,
  type UseEditorExtensionsOptions,
} from './useEditorExtensions';

// TipTap editor instance creation with debounced onUpdate and lifecycle management
export { useEditorInstance, type UseEditorInstanceOptions } from './useEditorInstance';

// Keyboard shortcuts (markdown on space, Cmd+K/F/H)
export { useEditorKeyboardShortcuts, type KeyboardShortcutCallbacks } from './useEditorKeyboardShortcuts';

// Global window.__paragonEditorModeAPI exposure
export { useGlobalEditorAPI, type UseGlobalEditorAPIDeps } from './useGlobalEditorAPI';

// WYSIWYG ↔ Markdown mode switching with turndown/marked conversion
export { useHandleModeSwitch, type UseHandleModeSwitchDeps, type TurndownLike } from './useHandleModeSwitch';

// Lazy-loaded TurndownService for HTML→Markdown conversion
export { useTurndownService, type LazyTurndownService } from './useTurndownService';

// Word/character count with debounced recalculation
export { useWordCount, type WordCountResult, type UseWordCountOptions } from './useWordCount';
