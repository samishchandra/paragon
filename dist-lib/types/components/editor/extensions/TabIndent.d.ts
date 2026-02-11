import { Extension } from '@tiptap/core';
/**
 * TabIndent Extension
 * Handles Tab and Shift+Tab for nesting/unnesting list items
 *
 * Key behavior:
 * - Tab in list: Nest the current list item (make it a child of the previous item)
 * - Shift+Tab in list: Unnest the current list item (move it up one level)
 * - Tab outside list: Prevent default browser behavior (no focus change)
 * - Shift+Tab outside list: Prevent default browser behavior
 *
 * Uses ProseMirror keymap plugin for reliable Tab key interception
 */
export declare const TabIndent: Extension<any, any>;
