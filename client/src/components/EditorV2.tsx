/**
 * EditorV2 Component - Modular Markdown Editor
 * Uses the EditorWrapper abstraction layer for easy editor swapping
 * Default: Paragon editor (based on TipTap/ProseMirror)
 *
 * CRITICAL: The onChange callback passed to the editor MUST be stable (not recreated on
 * every render). If it changes reference, the EditorWrapper key doesn't change but the
 * parent re-renders, and the Paragon editor's internal TipTap onUpdate handler may fire
 * in a way that causes cursor position issues. We use refs for selectedItem and updateItem
 * to keep handleContentChange stable.
 */

import { useEffect, useCallback, useState, useRef, memo, useMemo } from 'react';
import { useMomentum } from "@/contexts/ServerMomentumContext";
import { Button } from '@/components/ui/button';
import { EditorWrapper } from '@/components/editor/EditorWrapper';
import { EditorFooter } from '@/components/EditorFooter';
import { EditorHeaderBar } from '@/components/EditorHeaderBar';
import { EditorTabs } from '@/components/EditorTabs';
import { CreateTagModal } from '@/components/CreateTagModal';
import type { EditorRef, EditorContextValue } from '@/components/editor/types';
import {
  Sparkles,
  FileText,
  PanelRightClose,
} from 'lucide-react';
import { Task } from '@/types';
import { extractDateFromText, extractDateFromTextAsync, removeDateFromText, preloadDateParser, type ParsedDate } from '@/lib/dateParser';
import { DateSuggestionChip } from '@/components/DateSuggestionChip';
import { EditorErrorBoundary } from '@/components/EditorErrorBoundary';
import { getFontConfig, loadGoogleFont } from '@/lib/editorFonts';
import { toast } from '@/lib/toast';

interface EditorV2Props {
  /** Which editor implementation to use */
  editorType?: EditorContextValue['editorType'];
  /** Callback to toggle the right panel visibility */
  onTogglePanel?: () => void;
  /** Automatically reorder checklist items: completed to bottom (default: true) */
  autoReorderChecklist?: boolean;
}

export const EditorV2 = memo(function EditorV2({ editorType = 'paragon', onTogglePanel, autoReorderChecklist = true }: EditorV2Props) {
  const { selectedItem, updateItem, deleteItem, softDeleteItem, togglePin, state, addTag, completeTask, uncompleteTask, isNewlyCreatedItem, clearNewlyCreatedFlag, dispatch, isFetchingItem, editorPreferences, searchItemTitles, findItemByTitle, validateWikiLink, updateWikiLinksOnRename, createNote, fetchAndSelectItem } = useMomentum();

  // Load Google Font when preference changes
  useEffect(() => {
    if (editorPreferences?.fontFamily) {
      loadGoogleFont(editorPreferences.fontFamily);
    }
  }, [editorPreferences?.fontFamily]);

  // Detect mobile viewport for font size adjustment
  const [isMobileEditor, setIsMobileEditor] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobileEditor(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute CSS variables for editor font (2px smaller on mobile)
  const LINE_HEIGHT_MAP: Record<string, string> = { compact: '1.4', normal: '1.6', relaxed: '1.9' };
  const editorFontStyle = useMemo(() => {
    const fontConfig = getFontConfig(editorPreferences?.fontFamily || 'inter');
    const baseFontSize = editorPreferences?.fontSize || 15;
    const fontSize = isMobileEditor ? Math.max(baseFontSize - 2, 10) : baseFontSize;
    const lineHeight = LINE_HEIGHT_MAP[editorPreferences?.lineHeight || 'normal'] || '1.6';
    return {
      '--editor-font-family': fontConfig.family,
      '--editor-font-size': `${fontSize}px`,
      '--editor-line-height': lineHeight,
    } as React.CSSProperties;
  }, [editorPreferences?.fontFamily, editorPreferences?.fontSize, editorPreferences?.lineHeight, isMobileEditor]);
  const [createTagOpen, setCreateTagOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [contentVersion, setContentVersion] = useState(0);
  const contentVersionRef = useRef(0);
  // Separate key for intentional editor remounts (error recovery, clear content).
  // This is NOT incremented on normal content changes — only on explicit user actions
  // that require destroying and recreating the editor instance.
  const [editorMountKey, setEditorMountKey] = useState(0);
  const [isRawMode, setIsRawMode] = useState(false);
  // editorType comes from props (user's settings preference)
  const [detectedDate, setDetectedDate] = useState<ParsedDate | null>(null);
  const [dateDismissed, setDateDismissed] = useState(false);
  const dateDetectionTimer = useRef<NodeJS.Timeout | null>(null);
  const editorRef = useRef<EditorRef>(null);
  const titleInputRef = useRef<HTMLTextAreaElement>(null);
  const tagButtonRef = useRef<HTMLButtonElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorScrollRef = useRef<HTMLDivElement>(null);
  const prevSelectedIdRef = useRef<string | null>(null);
  const prevTitleRef = useRef<string>(''); // Track previous title for wiki link rename
  const renameTimerRef = useRef<NodeJS.Timeout | null>(null);
  // Track whether the user has actually interacted with the editor content.
  // The Paragon editor fires onChange on initial mount due to markdown→HTML→markdown roundtrip,
  // which can produce slightly different content. We use a time-based guard to skip
  // all onChange events that fire within a short window after mount/item-switch,
  // preventing spurious updatedAt bumps that reorder items in the list.
  const userHasEditedContentRef = useRef(false);
  // Track whether the user is actively editing the title. This prevents the
  // multi-device sync effect from remounting the editor (which steals focus
  // via autoFocus) when the updatedAt changes due to a local title edit.
  const userHasEditedTitleRef = useRef(false);
  const onChangeCountRef = useRef(0);
  // Timestamp when the current item was selected — onChange events within 1s of this
  // are treated as mount artifacts (roundtrip normalization) and ignored.
  const itemMountTimeRef = useRef(Date.now());
  
  // CRITICAL: Keep stable refs for selectedItem and updateItem to prevent
  // handleContentChange from being recreated on every content change.
  // Without this, the callback dependency on selectedItem causes it to be
  // recreated whenever content changes → which can cause re-render cascades
  // that interfere with the editor's cursor position.
  const selectedItemRef = useRef(selectedItem);
  selectedItemRef.current = selectedItem;
  const updateItemRef = useRef(updateItem);
  updateItemRef.current = updateItem;
  
  // Update title and reset editor override when selected item changes
  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      prevTitleRef.current = selectedItem.title; // Track for rename detection
      prevSelectedIdRef.current = selectedItem.id;
      // Reset interaction tracking when switching items
      userHasEditedContentRef.current = false;
      userHasEditedTitleRef.current = false;
      onChangeCountRef.current = 0;
      itemMountTimeRef.current = Date.now();
      // Reset external change tracker for the new item
      lastKnownUpdatedAtRef.current = selectedItem.updatedAt;
    }
  }, [selectedItem?.id]);

  // ---- Multi-device sync: detect external content changes ----
  // When the selected item's updatedAt changes (from a visibility/focus sync that
  // fetched newer data from the server), and the user hasn't made local edits,
  // remount the editor so it picks up the new content from another device.
  // We track the last known updatedAt to detect external changes.
  const lastKnownUpdatedAtRef = useRef<string | null>(null);
  useEffect(() => {
    if (!selectedItem) {
      lastKnownUpdatedAtRef.current = null;
      return;
    }
    const currentUpdatedAt = selectedItem.updatedAt;
    const prevUpdatedAt = lastKnownUpdatedAtRef.current;
    
    if (prevUpdatedAt === null) {
      // First time seeing this item — just record the timestamp
      lastKnownUpdatedAtRef.current = currentUpdatedAt;
      return;
    }
    
    // Same item, but updatedAt changed externally
    if (prevUpdatedAt !== currentUpdatedAt && selectedItem.id === prevSelectedIdRef.current) {
      // Only remount if the user hasn't been actively editing (content OR title)
      if (!userHasEditedContentRef.current && !userHasEditedTitleRef.current) {
        // Update title from server
        setTitle(selectedItem.title);
        prevTitleRef.current = selectedItem.title;
        // Force editor remount to load new content
        setEditorMountKey(prev => prev + 1);
        // Reset interaction tracking for the fresh editor instance
        userHasEditedContentRef.current = false;
        onChangeCountRef.current = 0;
        itemMountTimeRef.current = Date.now();
      }
      lastKnownUpdatedAtRef.current = currentUpdatedAt;
    }
  }, [selectedItem?.updatedAt, selectedItem?.id]);
  
  // Focus on title when a new item is created
  useEffect(() => {
    if (isNewlyCreatedItem && selectedItem && titleInputRef.current) {
      // Small delay to ensure the component is fully rendered
      const focusTimeout = setTimeout(() => {
        titleInputRef.current?.focus();
        // Select all text in the title for easy replacement
        titleInputRef.current?.select();
        clearNewlyCreatedFlag();
      }, 50);
      return () => clearTimeout(focusTimeout);
    }
  }, [isNewlyCreatedItem, selectedItem, clearNewlyCreatedFlag]);
  
  // Reset editor scroll to top when switching items
  useEffect(() => {
    const scrollContainer = editorScrollRef.current;
    if (!scrollContainer) return;
    scrollContainer.scrollTop = 0;
  }, [selectedItem?.id]);

  // Auto-resize title textarea
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.style.height = 'auto';
      titleInputRef.current.style.height = `${titleInputRef.current.scrollHeight}px`;
    }
  }, [title]);

  // Handle title change with date detection
  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    const item = selectedItemRef.current;
    if (item && newTitle !== item.title) {
      userHasEditedTitleRef.current = true;
      updateItemRef.current({ ...item, title: newTitle });
      contentVersionRef.current += 1;
      setContentVersion(contentVersionRef.current);
    }

    // Debounced wiki link rename: update [[old title]] → [[new title]] across all items
    if (item && newTitle !== prevTitleRef.current && prevTitleRef.current) {
      if (renameTimerRef.current) clearTimeout(renameTimerRef.current);
      const oldTitle = prevTitleRef.current;
      renameTimerRef.current = setTimeout(() => {
        updateWikiLinksOnRename(oldTitle, newTitle);
        prevTitleRef.current = newTitle;
      }, 2000); // 2s debounce for rename to avoid updating on every keystroke
    }

    // Debounced async date detection for tasks only
    // Uses 800ms debounce + async parsing to avoid blocking typing
    if (item?.type === 'task') {
      if (dateDetectionTimer.current) {
        clearTimeout(dateDetectionTimer.current);
      }
      dateDetectionTimer.current = setTimeout(async () => {
        const parsed = await extractDateFromTextAsync(newTitle);
        if (parsed && !dateDismissed) {
          setDetectedDate(parsed);
        } else {
          setDetectedDate(null);
        }
      }, 800);
    }
  }, [dateDismissed, updateWikiLinksOnRename]);

  // Apply detected date: set due date and strip phrase from title
  const handleApplyDetectedDate = useCallback(() => {
    if (!detectedDate || !selectedItem || selectedItem.type !== 'task') return;
    const cleanedTitle = removeDateFromText(title, detectedDate);
    setTitle(cleanedTitle);
    updateItem({ ...selectedItem, title: cleanedTitle, dueDate: detectedDate.date.toISOString() } as Task);
    setDetectedDate(null);
    setDateDismissed(false);
    contentVersionRef.current += 1;
    setContentVersion(contentVersionRef.current);
  }, [detectedDate, selectedItem, title, updateItem]);

  // Dismiss detected date suggestion
  const handleDismissDetectedDate = useCallback(() => {
    setDetectedDate(null);
    setDateDismissed(true);
  }, []);

  // Reset dismissed state when selected item changes
  useEffect(() => {
    setDetectedDate(null);
    setDateDismissed(false);
  }, [selectedItem?.id]);

  // Preload chrono-node when editor mounts (background, non-blocking)
  useEffect(() => {
    preloadDateParser();
    return () => {
      if (dateDetectionTimer.current) {
        clearTimeout(dateDetectionTimer.current);
      }
    };
  }, []);

  // Handle Enter and Tab keys in title
  const handleTitleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Auto-apply detected date on Enter before focusing editor
      if (detectedDate && selectedItem?.type === 'task') {
        handleApplyDetectedDate();
      }
      // Focus the editor
      editorRef.current?.focus();
    } else if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      // Focus the tag button
      tagButtonRef.current?.focus();
    }
  }, [detectedDate, selectedItem, handleApplyDetectedDate]);

  // Handle paste in title: first line stays as title, rest goes to content
  const handleTitlePaste = useCallback((e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData('text/plain');
    if (!pastedText) return;

    const lines = pastedText.split(/\r?\n/);
    // If single line, let default paste behavior handle it
    if (lines.length <= 1) return;

    e.preventDefault();

    const firstLine = lines[0].trim();
    const restLines = lines.slice(1).join('\n').trim();

    // Update title with first line (append to existing text at cursor position)
    const textarea = e.currentTarget;
    const selStart = textarea.selectionStart;
    const selEnd = textarea.selectionEnd;
    const currentTitle = title;
    const newTitle = currentTitle.substring(0, selStart) + firstLine + currentTitle.substring(selEnd);
    setTitle(newTitle);

    const item = selectedItemRef.current;
    if (!item) return;

    // Prepend remaining lines to existing content
    if (restLines) {
      const existingContent = item.content || '';
      const newContent = existingContent
        ? restLines + '\n\n' + existingContent
        : restLines;
      updateItemRef.current({ ...item, title: newTitle, content: newContent });
      // Force editor to reload with new content
      contentVersionRef.current += 1;
      setContentVersion(contentVersionRef.current);
      setEditorMountKey(prev => prev + 1);
    } else {
      updateItemRef.current({ ...item, title: newTitle });
      contentVersionRef.current += 1;
      setContentVersion(contentVersionRef.current);
    }
  }, [title]);

  // Handle Tab key on tag button to move to editor
  const handleTagButtonKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      // Focus the editor
      editorRef.current?.focus();
    } else if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      // Focus back to title
      titleInputRef.current?.focus();
    }
  }, []);

  // Capture the item ID at mount time so we can guard against stale saves.
  // When the editor remounts (key changes), this ref gets a fresh value.
  // This prevents the race condition where a debounced onChange fires after
  // the user has switched to a different item.
  const mountedItemIdRef = useRef(selectedItem?.id ?? null);
  useEffect(() => {
    if (selectedItem) {
      mountedItemIdRef.current = selectedItem.id;
    }
  }, [selectedItem?.id]);

  // Handle content change from editor
  // ---- Wiki Link Click Handler ----
  const handleWikiLinkClick = useCallback(async (pageName: string) => {
    const item = await findItemByTitle(pageName);
    if (item) {
      // Open the linked item in a new tab
      dispatch({ type: 'OPEN_TAB', payload: item.id });
      dispatch({ type: 'SELECT_ITEM', payload: item.id });
    } else {
      // Item doesn't exist — offer to create it
      const { toast: showToast } = await import('sonner');
      showToast(`"${pageName}" not found`, {
        description: 'Create a new note with this title?',
        action: {
          label: 'Create',
          onClick: () => {
            const newId = createNote(undefined, pageName);
            if (newId) {
              dispatch({ type: 'OPEN_TAB', payload: newId });
              dispatch({ type: 'SELECT_ITEM', payload: newId });
            }
          },
        },
      });
    }
  }, [findItemByTitle, dispatch, createNote]);

  const handleWikiLinkSearch = useCallback(async (query: string) => {
    return searchItemTitles(query);
  }, [searchItemTitles]);

  // CRITICAL: This callback MUST be stable (empty dependency array) to prevent
  // the editor from being affected by parent re-renders. We use refs to access
  // the latest selectedItem and updateItem without adding them as dependencies.
  // Without this, every content change recreates this callback (because selectedItem
  // changes), which can cause cursor jumping in the Paragon/TipTap editor.
  const handleContentChange = useCallback((markdown: string) => {
    const item = selectedItemRef.current;
    if (!item) return;
    
    // GUARD: Verify the current item ID matches the mounted item ID.
    // This prevents saving content to the wrong item when a debounced onChange
    // fires after the user has switched items (especially on mobile with
    // AnimatePresence exit animations keeping the old editor alive briefly).
    if (item.id !== mountedItemIdRef.current) {
      console.warn(`[EditorV2] Ignoring stale onChange: editor mounted for ${mountedItemIdRef.current} but current item is ${item.id}`);
      return;
    }
    
    // Track onChange calls. The editor fires onChange on mount due to
    // markdown→HTML→markdown roundtrip normalization. We use a time-based guard
    // to skip ALL onChange events within 1 second of item selection, not just
    // the first one — TipTap extensions can trigger multiple onUpdate events
    // during initialization (e.g., collapsible headings, tables, etc.).
    onChangeCountRef.current += 1;
    const timeSinceMount = Date.now() - itemMountTimeRef.current;
    if (!userHasEditedContentRef.current && timeSinceMount < 1000) {
      // Within mount window and user hasn't edited — likely roundtrip artifact.
      // Skip to avoid a spurious updatedAt bump that reorders items.
      return;
    }
    
    if (markdown !== item.content) {
      userHasEditedContentRef.current = true;
      updateItemRef.current({ ...item, content: markdown });
      // Increment content version ref and sync to state for footer save indicator.
      // CRITICAL: We use a ref to avoid the state update being part of the key.
      // The key no longer includes contentVersion, so this setState only triggers
      // a re-render of EditorFooter (which is memo'd), not an editor remount.
      contentVersionRef.current += 1;
      setContentVersion(contentVersionRef.current);
    }
  }, []);

  // Handle due date change
  const handleDueDateChange = useCallback((date: Date | undefined) => {
    if (selectedItem && selectedItem.type === 'task') {
      updateItem({ ...selectedItem, dueDate: date?.toISOString() } as Task);
    }
  }, [selectedItem, updateItem]);

  // Handle tag toggle
  const handleTagToggle = useCallback((tagId: string) => {
    if (selectedItem) {
      const currentTags = selectedItem.tags || [];
      const newTags = currentTags.includes(tagId)
        ? currentTags.filter(t => t !== tagId)
        : [...currentTags, tagId];
      updateItem({ ...selectedItem, tags: newTags });
    }
  }, [selectedItem, updateItem]);

  // Handle click on editor container to focus editor
  const handleEditorContainerClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Only focus if clicking on the container itself, not on the editor content
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('editor-click-area')) {
      editorRef.current?.focus();
    }
  }, []);

  // Handle copy
  const handleCopy = useCallback(() => {
    if (selectedItem) {
      const textToCopy = `# ${selectedItem.title}\n\n${selectedItem.content || ''}`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        toast.success('Copied to clipboard');
      }).catch((err) => {
        console.error('Failed to copy:', err);
        toast.error('Failed to copy');
      });
    }
  }, [selectedItem]);

  // Handle download as markdown file
  const handleDownload = useCallback(() => {
    if (selectedItem) {
      const markdownContent = `# ${selectedItem.title}\n\n${selectedItem.content || ''}`;
      const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // Sanitize filename: remove special characters, replace spaces with hyphens
      const sanitizedTitle = selectedItem.title
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
        .slice(0, 50) || 'untitled';
      a.download = `${sanitizedTitle}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Downloaded as markdown');
    }
  }, [selectedItem]);

  // Handle toggle complete
  const handleToggleComplete = useCallback(() => {
    if (selectedItem && selectedItem.type === 'task') {
      const task = selectedItem as Task;
      if (task.isCompleted) {
        uncompleteTask(task.id);
      } else {
        completeTask(task.id);
      }
    }
  }, [selectedItem, completeTask, uncompleteTask]);

  // Handle selecting an item from tabs — use fetchAndSelectItem to ensure
  // the item data is loaded from the server when it's not in local state
  // (e.g., after app reload when tabs are restored but items aren't fetched yet)
  const handleSelectItemFromTab = useCallback((id: string) => {
    fetchAndSelectItem(id);
  }, [fetchAndSelectItem]);

  // Empty state
  if (!selectedItem) {
    return (
      <div className="h-full flex flex-col bg-[#F9FAFB] dark:bg-zinc-900">
        {/* Tabs bar - show even in empty state if there are open tabs */}
        <EditorTabs onSelectItem={handleSelectItemFromTab} />
        
        {/* Header */}
        <div className="h-12 border-b border-border/50 flex items-center justify-between px-4 shrink-0 bg-[#F9FAFB] dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Editor</span>
          </div>
          {onTogglePanel && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={onTogglePanel}
              title="Hide panel"
            >
              <PanelRightClose className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Loading Skeleton or Empty State */}
        {isFetchingItem ? (
          <div className="flex-1 flex flex-col animate-pulse">
            {/* Skeleton title bar */}
            <div className="h-12 border-b border-border/30 flex items-center px-4 gap-3">
              <div className="h-5 w-48 bg-muted/60 rounded" />
              <div className="h-4 w-16 bg-muted/40 rounded-full ml-auto" />
            </div>
            {/* Skeleton content area */}
            <div className="flex-1 px-6 py-5 space-y-4">
              {/* Title skeleton */}
              <div className="h-7 w-3/5 bg-muted/50 rounded" />
              <div className="h-px w-full bg-border/30" />
              {/* Content line skeletons */}
              <div className="space-y-3 pt-2">
                <div className="h-4 w-full bg-muted/40 rounded" />
                <div className="h-4 w-11/12 bg-muted/40 rounded" />
                <div className="h-4 w-4/5 bg-muted/40 rounded" />
                <div className="h-4 w-full bg-muted/40 rounded" />
                <div className="h-4 w-3/4 bg-muted/40 rounded" />
                <div className="h-4 w-0 bg-transparent" />
                <div className="h-4 w-full bg-muted/40 rounded" />
                <div className="h-4 w-5/6 bg-muted/40 rounded" />
                <div className="h-4 w-2/3 bg-muted/40 rounded" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-3 max-w-[240px]">
              <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-base font-medium text-foreground">No item selected</h3>
              <p className="text-sm text-muted-foreground">
                Select a task or note to view and edit its content
              </p>
            </div>
          </div>
        )}
        
        {/* Footer - shows sync status even when no item selected */}
        <EditorFooter 
          content=""
          className="shrink-0"
        />

        {/* Bottom spacer for mobile tab bar + safe area */}
        <div className="shrink-0 md:hidden" style={{ height: 'calc(3.5rem + max(0.5rem, env(safe-area-inset-bottom)))' }} />
      </div>
    );
  }

  const isTask = selectedItem.type === 'task';
  const task = isTask ? (selectedItem as Task) : null;
  const isCompleted = task?.isCompleted === true;

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB] dark:bg-zinc-900" style={editorFontStyle}>
      {/* Tabs bar - reorderable, scrollable */}
      <EditorTabs onSelectItem={handleSelectItemFromTab} />
      
      {/* Header - Title, metadata pills, and action buttons */}
      <EditorHeaderBar
        item={selectedItem}
        isTask={isTask}
        isCompleted={isCompleted}
        task={task}
        title={title}
        onTitleChange={handleTitleChange}
        onTitleKeyDown={handleTitleKeyDown}
        onTitlePaste={handleTitlePaste}
        onTagButtonKeyDown={handleTagButtonKeyDown}
        onDueDateChange={handleDueDateChange}
        onTagToggle={handleTagToggle}
        onTogglePin={() => togglePin(selectedItem.id)}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onDelete={() => softDeleteItem(selectedItem.id)}
        onToggleComplete={handleToggleComplete}
        onTogglePanel={onTogglePanel}
        isRawMode={isRawMode}
        onToggleRawMode={() => {
          // Simple toggle - the editor adapter handles content sync internally
          setIsRawMode(!isRawMode);
        }}
        titleInputRef={titleInputRef}
        tagButtonRef={tagButtonRef}
      />

      {/* Date suggestion chip - shows when a date phrase is detected in the title */}
      {isTask && detectedDate && (
        <div 
          className="px-4 shrink-0 bg-[#F9FAFB] dark:bg-zinc-900 border-b border-border/30 relative z-10"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <DateSuggestionChip
            date={detectedDate.date}
            matchedText={detectedDate.matchedText}
            onApply={handleApplyDetectedDate}
            onDismiss={handleDismissDetectedDate}
            visible={true}
          />
        </div>
      )}

      {/* Content - fills remaining space, editor-content-wrapper handles its own scrolling */}
      <div ref={editorScrollRef} className="flex-1 flex flex-col min-h-0">
        {/* Editor - Responsive, fills remaining space */}
        <EditorErrorBoundary
          editorType={editorType}
          itemId={selectedItem.id}
          onRetry={() => setEditorMountKey(v => v + 1)}
          onClearContent={() => {
            if (selectedItem) {
              updateItem({ ...selectedItem, content: '' });
              setEditorMountKey(v => v + 1);
            }
          }}
        >
          <div 
            ref={editorContainerRef}
            className="flex-1 min-h-0 cursor-text editor-click-area"
            onClick={handleEditorContainerClick}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <EditorWrapper
              key={`${selectedItem.id}-${editorType}-${editorMountKey}`}
              ref={editorRef}
              editorType={editorType}
              initialContent={selectedItem.content || ''}
              onChange={handleContentChange}
              placeholder="Start writing..."
              autoFocus
              showFloatingToolbar={!isRawMode}
              enableSlashCommands={!isRawMode}
              itemId={selectedItem.id}
              isRawMode={isRawMode}
              autoReorderChecklist={autoReorderChecklist}
              onWikiLinkClick={handleWikiLinkClick}
              validateWikiLink={validateWikiLink}
              onWikiLinkSearch={handleWikiLinkSearch}
            />
          </div>
        </EditorErrorBoundary>
      </div>

      {/* Footer - Sync status, word count, last updated */}
      <EditorFooter 
        content={selectedItem.content || ''} 
        updatedAt={selectedItem.updatedAt}
        contentVersion={contentVersion}
        itemId={selectedItem.id}
        listName={selectedItem.listId ? state.lists.find(l => l.id === selectedItem.listId)?.name : undefined}
      />

      {/* Bottom spacer for mobile tab bar + safe area */}
      <div className="shrink-0 md:hidden" style={{ height: 'calc(3.5rem + max(0.5rem, env(safe-area-inset-bottom)))' }} />

      {/* Create Tag Modal */}
      <CreateTagModal
        open={createTagOpen}
        onOpenChange={setCreateTagOpen}
        onCreateTag={addTag}
      />
    </div>
  );
});

export default EditorV2;
