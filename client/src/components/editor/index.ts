/**
 * Editor Module Exports
 * 
 * This module provides the markdown editor architecture for Momentum.
 * The EditorWrapper component wraps the Paragon editor implementation.
 */

// Main wrapper component
export { EditorWrapper, useEditorContext } from './EditorWrapper';

// Types
export type {
  TextLevel,
  FormatAction,
  EditorSelection,
  EditorState,
  EditorRef,
  EditorProps,
  EditorContextValue,
} from './types';
