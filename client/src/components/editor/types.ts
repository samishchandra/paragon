/**
 * Editor Interface Types
 * 
 * This module defines the contract for markdown editors in Momentum.
 * Any editor implementation must conform to these interfaces to be
 * used as a drop-in replacement.
 */

export type TextLevel = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type FormatAction = 
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'inlineCode'
  | 'codeBlock'
  | 'blockquote'
  | 'bulletList'
  | 'numberedList'
  | 'taskList'
  | 'horizontalRule'
  | 'link'
  | 'table'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'paragraph';

export interface EditorSelection {
  start: number;
  end: number;
  text: string;
}

export interface EditorState {
  markdown: string;
  selection: EditorSelection | null;
  currentTextLevel: TextLevel;
  isEmpty: boolean;
}

export interface EditorRef {
  /** Get the current markdown content */
  getMarkdown: () => string;
  /** Set the markdown content */
  setMarkdown: (markdown: string) => void;
  /** Apply a formatting action to the current selection */
  applyFormat: (action: FormatAction, options?: Record<string, unknown>) => void;
  /** Insert text at the current cursor position */
  insertText: (text: string) => void;
  /** Insert a link with the given URL */
  insertLink: (url: string, text?: string) => void;
  /** Insert a table with specified dimensions */
  insertTable: (rows?: number, cols?: number) => void;
  /** Focus the editor and move cursor to end */
  focus: () => void;
  /** Focus the editor and move cursor to start */
  focusStart: () => void;
  /** Blur the editor */
  blur: () => void;
  /** Get the current selection */
  getSelection: () => EditorSelection | null;
  /** Get the current text level at cursor */
  getCurrentTextLevel: () => TextLevel;
}

export interface EditorProps {
  /** Initial markdown content */
  initialContent?: string;
  /** Callback when content changes */
  onChange?: (markdown: string) => void;
  /** Callback when selection changes */
  onSelectionChange?: (selection: EditorSelection | null) => void;
  /** Placeholder text when editor is empty */
  placeholder?: string;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Whether to auto-focus on mount */
  autoFocus?: boolean;
  /** Custom class name for the editor container */
  className?: string;
  /** Ref to access editor methods */
  editorRef?: React.RefObject<EditorRef>;
  /** Item ID for persisting collapse state */
  itemId?: string;
  /** Whether to show raw markdown text instead of WYSIWYG */
  isRawMode?: boolean;
  /** Callback when a wiki link is clicked */
  onWikiLinkClick?: (pageName: string) => void;
  /** Validate whether a wiki link target exists (for valid/invalid styling) */
  validateWikiLink?: (pageName: string) => boolean;
  /** Search for wiki link suggestions (for autocomplete dropdown) */
  onWikiLinkSearch?: (query: string) => Promise<{id: string; title: string; type: string}[]>;
}



/**
 * Editor Provider Context
 * 
 * This context allows components to access the current editor
 * implementation without knowing which specific editor is being used.
 */
export interface EditorContextValue {
  editorType: 'paragon';
  editorRef: React.RefObject<EditorRef> | null;
}
