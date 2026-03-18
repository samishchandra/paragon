/**
 * InputDispatcher Extension
 *
 * PERFORMANCE OPTIMIZATION (R5 + R6 from PERFORMANCE_REPORT.md)
 *
 * Consolidates multiple stateless handleTextInput and handleKeyDown ProseMirror
 * plugin hooks into a single dispatcher plugin. Instead of ProseMirror iterating
 * through N separate plugins via someProp() on every keystroke, this single plugin
 * dispatches to the appropriate handler with early-exit checks.
 *
 * Consolidated handlers:
 *
 * handleTextInput:
 *   1. MixedLists/taskItem — detects [] + space to create task items
 *
 * handleKeyDown:
 *   1. TabIndent — handles Tab/Shift+Tab for list indent/outdent (highest priority)
 *   2. CalloutInputRule — detects ```info + Enter to create callout blocks
 *   3. CodeBlockEnterShortcut — detects ``` + Enter to create code blocks
 *
 * NOT consolidated (stateful, need their own plugin for state management):
 *   - ExpandSelection (manages expansionDepth state)
 *   - SelectAllOccurrences (manages complex batch-replace state machine)
 *
 * NOT consolidated (uses InputRules instead of handleTextInput):
 *   - WikiLinkSafe (mobile-safe InputRules-based implementation)
 */
import { Extension } from '@tiptap/core';
import { PluginKey } from '@tiptap/pm/state';
export declare const inputDispatcherPluginKey: PluginKey<any>;
export declare const InputDispatcher: Extension<any, any>;
export default InputDispatcher;
