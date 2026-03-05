/**
 * TabIndent Extension
 *
 * DEPRECATED: The handleKeyDown logic for Tab/Shift+Tab list indent/outdent
 * has been moved to InputDispatcher for consolidated input handling
 * (R6 performance optimization).
 *
 * This stub extension is kept for backward compatibility so that
 * existing code that imports TabIndent continues to work.
 * It registers no plugins — all logic is in InputDispatcher.
 */

import { Extension } from '@tiptap/core';

export const TabIndent = Extension.create({
  name: 'tabIndent',
  // No plugins — logic moved to InputDispatcher
});
