/**
 * CalloutInputRule Extension
 *
 * DEPRECATED: The handleKeyDown logic for detecting ```info + Enter
 * has been moved to InputDispatcher for consolidated input handling
 * (R6 performance optimization).
 *
 * This stub extension is kept for backward compatibility so that
 * existing code that imports CalloutInputRule continues to work.
 * It registers no plugins — all logic is in InputDispatcher.
 */

import { Extension } from '@tiptap/core';

export const CalloutInputRule = Extension.create({
  name: 'calloutInputRule',
  // No plugins — logic moved to InputDispatcher
});

export default CalloutInputRule;
