/**
 * Barrel file for editor hooks.
 *
 * Re-exports every custom hook and its associated types so consumers can
 * import from a single path:
 *
 *   import { useAutoSave, useWordCount, type AutoSaveOptions } from './hooks';
 */
export { useAutoSave, type AutoSaveOptions, type AutoSaveState, type AutoSaveReturn } from './useAutoSave';
export { useEditorAPI, type UseEditorAPIDeps } from './useEditorAPI';
export { useEditorExtensions, type DisabledFeatures, type ImageEditState, type ExtensionCallbackRefs, type UseEditorExtensionsOptions, } from './useEditorExtensions';
export { useEditorInstance, type UseEditorInstanceOptions } from './useEditorInstance';
export { useEditorKeyboardShortcuts, type KeyboardShortcutCallbacks } from './useEditorKeyboardShortcuts';
export { useGlobalEditorAPI, type UseGlobalEditorAPIDeps } from './useGlobalEditorAPI';
export { useHandleModeSwitch, type UseHandleModeSwitchDeps } from './useHandleModeSwitch';
export { useTurndownService, type LazyTurndownService } from './useTurndownService';
export { useWordCount, type WordCountResult, type UseWordCountOptions } from './useWordCount';
