/**
 * EditorWrapper Component
 * 
 * This component serves as the main entry point for the markdown editor.
 * It abstracts the underlying editor implementation, making it easy to
 * swap between different editors without changing the consuming components.
 * 
 * The Paragon editor is the sole editor implementation.
 * It is lazy-loaded to keep the initial bundle small.
 */

import React, { createContext, useContext, forwardRef, lazy, Suspense } from 'react';
import { EditorProps, EditorContextValue, EditorRef } from './types';

// Lazy-load editor implementation to reduce initial bundle size
const ParagonEditorAdapter = lazy(() => import('./implementations/ParagonEditorAdapter'));

// Shared loading fallback — shimmer skeleton matching the editor layout
const EditorLoadingFallback = () => (
  <div className="h-full flex flex-col bg-background animate-pulse">
    {/* Toolbar skeleton */}
    <div className="border-b border-border/30 px-3 py-1.5 flex items-center gap-1.5">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="h-7 w-7 rounded bg-muted/60" />
      ))}
      <div className="h-5 w-px mx-1 bg-border/30" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={`g2-${i}`} className="h-7 w-7 rounded bg-muted/60" />
      ))}
    </div>
    {/* Content area skeleton */}
    <div className="flex-1 p-6 space-y-4">
      <div className="h-4 w-full rounded bg-muted/50" />
      <div className="h-4 w-5/6 rounded bg-muted/50" />
      <div className="h-4 w-4/6 rounded bg-muted/50" />
      <div className="h-3" />
      <div className="h-4 w-full rounded bg-muted/50" />
      <div className="h-4 w-3/4 rounded bg-muted/50" />
      <div className="h-4 w-5/6 rounded bg-muted/50" />
      <div className="h-3" />
      <div className="h-4 w-2/3 rounded bg-muted/50" />
      <div className="h-4 w-full rounded bg-muted/50" />
    </div>
  </div>
);

// Editor Context for accessing editor methods from child components
const EditorContext = createContext<EditorContextValue | null>(null);

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within an EditorWrapper');
  }
  return context;
};

interface EditorWrapperProps extends EditorProps {
  /** Which editor implementation to use (reserved for future use) */
  editorType?: EditorContextValue['editorType'];
  /** Show floating toolbar on text selection */
  showFloatingToolbar?: boolean;
  /** Enable slash commands */
  enableSlashCommands?: boolean;
  /** Custom toolbar actions */
  customToolbarActions?: React.ReactNode;
  /** Item ID for persisting collapse state */
  itemId?: string;
  /** Whether to show raw markdown text instead of WYSIWYG */
  isRawMode?: boolean;
  /** Automatically reorder checklist items: completed to bottom (default: true) */
  autoReorderChecklist?: boolean;
}

export const EditorWrapper = forwardRef<EditorRef, EditorWrapperProps>(({
  initialContent = '',
  onChange,
  onSelectionChange,
  placeholder = 'Start writing...',
  readOnly = false,
  autoFocus = false,
  className = '',
  editorRef,
  editorType = 'paragon',
  showFloatingToolbar = true,
  enableSlashCommands = true,
  itemId,
  isRawMode = false,
  autoReorderChecklist = true,
  onWikiLinkClick,
  validateWikiLink,
  onWikiLinkSearch,
}, ref) => {
  // Use the ref passed to forwardRef or the editorRef prop
  const actualRef = (ref as React.RefObject<EditorRef>) || editorRef;
  
  const contextValue: EditorContextValue = {
    editorType: 'paragon',
    editorRef: actualRef || null,
  };

  return (
    <EditorContext.Provider value={contextValue}>
      <div className={`editor-wrapper ${className}`} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Suspense fallback={<EditorLoadingFallback />}>
          <ParagonEditorAdapter
            ref={actualRef}
            initialContent={initialContent}
            onChange={onChange}
            onSelectionChange={onSelectionChange}
            placeholder={placeholder}
            readOnly={readOnly}
            autoFocus={autoFocus}
            className={className}
            showBubbleMenu={showFloatingToolbar}
            showFloatingMenu={enableSlashCommands}
            itemId={itemId}
            isRawMode={isRawMode}
            autoReorderChecklist={autoReorderChecklist}
            onWikiLinkClick={onWikiLinkClick}
            validateWikiLink={validateWikiLink}
            onWikiLinkSearch={onWikiLinkSearch}
          />
        </Suspense>
      </div>
    </EditorContext.Provider>
  );
});

EditorWrapper.displayName = 'EditorWrapper';

export default EditorWrapper;
