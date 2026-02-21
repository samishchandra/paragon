/**
 * EditorHeaderBar Component - Reusable header bar for the editor
 * Contains title, metadata pills (due date, list, tags), and action buttons
 */

import { useCallback, useState, useRef, useEffect, memo } from 'react';
import { useMomentum } from "@/contexts/ServerMomentumContext";
import { Button } from '@/components/ui/button';
import { Pill, PillButton } from '@/components/ui/pill';
import {
  Pin,
  PinOff,
  Trash2,
  X,
  Plus,
  FileText,
  PanelRightClose,
  Copy,
  Circle,
  Check,
  CheckCircle2,
  Code2,
  Eye,
  Download,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Task, Item } from '@/types';
import { cn } from '@/lib/utils';
import { linkifyTitle } from '@/lib/linkifyTitle';
import { TagIcon } from '@/components/icons/TagIcon';
import { ListPill } from '@/components/ListPill';
import { DatePill } from '@/components/DatePill';

export interface EditorHeaderBarProps {
  /** The item being edited */
  item: Item;
  /** Whether the item is a task */
  isTask: boolean;
  /** Whether the task is completed (only applicable for tasks) */
  isCompleted?: boolean;
  /** The task object (only applicable for tasks) */
  task?: Task | null;
  /** Current title value */
  title: string;
  /** Callback when title changes */
  onTitleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Callback for title keydown events */
  onTitleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  /** Callback for title paste events (splits multi-line paste) */
  onTitlePaste?: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
  /** Callback for tag button keydown events */
  onTagButtonKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  /** Callback when due date changes */
  onDueDateChange: (date: Date | undefined) => void;
  /** Callback when a tag is toggled */
  onTagToggle: (tagId: string) => void;
  /** Callback to toggle pin status */
  onTogglePin: () => void;
  /** Callback to copy item */
  onCopy: () => void;
  /** Callback to download item as markdown */
  onDownload?: () => void;
  /** Callback to delete item */
  onDelete: () => void;
  /** Callback to complete/uncomplete task */
  onToggleComplete?: () => void;
  /** Callback to toggle the right panel */
  onTogglePanel?: () => void;
  /** Whether raw mode is active */
  isRawMode?: boolean;
  /** Callback to toggle raw mode */
  onToggleRawMode?: () => void;
  /** Ref for the title input */
  titleInputRef?: React.RefObject<HTMLTextAreaElement | null>;
  /** Ref for the tag button */
  tagButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

export const EditorHeaderBar = memo(function EditorHeaderBar({
  item,
  isTask,
  isCompleted = false,
  task,
  title,
  onTitleChange,
  onTitleKeyDown,
  onTitlePaste,
  onTagButtonKeyDown,
  onDueDateChange,
  onTagToggle,
  onTogglePin,
  onCopy,
  onDownload,
  onDelete,
  onToggleComplete,
  onTogglePanel,
  isRawMode = false,
  onToggleRawMode,
  titleInputRef,
  tagButtonRef,
}: EditorHeaderBarProps) {
  const { state, addTag, updateItem, dispatch } = useMomentum();
  const [newTagName, setNewTagName] = useState('');
  const [localTagPopoverOpen, setLocalTagPopoverOpen] = useState(false);
  const [isTitleEditing, setIsTitleEditing] = useState(false);

  // Check if title contains links
  const titleLinkResult = title ? linkifyTitle(title) : null;
  const titleHasLinks = titleLinkResult?.hasLinks ?? false;

  // When title editing ends (blur), switch back to display mode
  const handleTitleBlur = useCallback(() => {
    setIsTitleEditing(false);
  }, []);

  // When display title is clicked, switch to edit mode and focus textarea
  const handleTitleDisplayClick = useCallback(() => {
    setIsTitleEditing(true);
    // Focus the textarea after it renders
    setTimeout(() => {
      titleInputRef?.current?.focus();
    }, 0);
  }, [titleInputRef]);
  
  // Sync tag popover state with context (for opening from list item cards)
  const tagPopoverOpen = localTagPopoverOpen || state.tagPopoverOpen;
  const setTagPopoverOpen = (open: boolean) => {
    setLocalTagPopoverOpen(open);
    if (!open && state.tagPopoverOpen) {
      dispatch({ type: 'CLOSE_TAG_POPOVER' });
    }
  };

  return (
    <div className="border-b border-border/50 px-4 py-3 shrink-0 bg-[#F9FAFB] dark:bg-zinc-900 space-y-2">
      {/* Top row: Icon, Title, Action buttons */}
      <div className="flex items-start gap-2">
        {/* Item type icon - clickable checkbox for tasks, aligned to first line */}
        <div className="shrink-0 flex items-center" style={{ height: 'calc(1em * 1.4)', lineHeight: '1.4', fontSize: '1rem' }}>
          {isTask ? (
            <button
              onClick={onToggleComplete}
              className={cn(
                "flex items-center justify-center transition-all duration-300 ease-out hover:scale-110",
                isCompleted && "animate-[checkmark_0.3s_ease-out]"
              )}
              title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <Circle className="w-5 h-5 text-foreground hover:text-foreground/80" />
              )}
            </button>
          ) : (
            <FileText className="w-5 h-5 text-foreground" />
          )}
        </div>
        
        {/* Title - display mode with linkified text, or textarea for editing */}
        {titleHasLinks && !isTitleEditing ? (
          <div
            onClick={handleTitleDisplayClick}
            className={cn(
              "flex-1 text-base font-medium cursor-text overflow-hidden leading-tight",
              isCompleted ? "line-through text-muted-foreground" : "text-foreground",
              !title && "text-muted-foreground/50"
            )}
            style={{ 
              maxHeight: '2.8em',
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {titleLinkResult!.elements}
          </div>
        ) : (
          <textarea
            ref={titleInputRef}
            value={title}
            onChange={onTitleChange}
            onKeyDown={onTitleKeyDown}
            onPaste={onTitlePaste}
            onFocus={() => setIsTitleEditing(true)}
            onBlur={handleTitleBlur}
            placeholder={isTask ? 'Task title...' : 'Note title...'}
            rows={1}
            className={cn(
              "flex-1 text-base font-medium bg-transparent border-none outline-none placeholder:text-muted-foreground/50 resize-none overflow-hidden leading-tight transition-all duration-300",
              isCompleted && "line-through text-muted-foreground"
            )}
            style={{ 
              maxHeight: '2.8em',
              lineHeight: '1.4',
              fontFamily: 'var(--editor-font-family, inherit)'
            }}
          />
        )}
        
        {/* Panel toggle button - aligned to first line of title */}
        {onTogglePanel && (
          <div className="shrink-0 flex items-center" style={{ height: 'calc(1em * 1.4)', lineHeight: '1.4', fontSize: '1rem' }}>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 text-muted-foreground hover:text-foreground"
              onClick={onTogglePanel}
              title="Hide panel"
            >
              <PanelRightClose className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      {/* Bottom row: Metadata pills (due date, tag badges, add tag) + action buttons */}
      <div className="flex flex-wrap items-center gap-2 justify-start">
        {/* Due Date (Tasks only) */}
        {isTask && (
          <DatePill
            dueDate={task?.dueDate}
            onDateChange={onDueDateChange}
            showPlaceholder={true}
            size="sm"
          />
        )}

        {/* List pill */}
        <ListPill
          listId={item.listId}
          itemId={item.id}
          itemType={item.type}
          showRemove={true}
          size="sm"
        />

        {/* Tag section with popover */}
        <Popover open={tagPopoverOpen} onOpenChange={setTagPopoverOpen}>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Display selected tags */}
              {item.tags && item.tags.length > 0 && (
                <>
                  {item.tags.map((tagId) => {
                    const tag = state.tags.find(t => t.id === tagId);
                    if (!tag) return null;
                    return (
                      <div key={tag.id} className="relative group">
                        <Pill
                          variant="filled"
                          size="sm"
                          color={tag.color}
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTagPopoverOpen(true);
                          }}
                        >
                          <TagIcon className="w-2.5 h-2.5" color={tag.color} />
                          {tag.name}
                        </Pill>
                        {/* Cross button on hover - positioned top-right over the pill */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onTagToggle(tag.id);
                          }}
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-muted-foreground/80 hover:bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                          title="Remove tag"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    );
                  })}
                </>
              )}
              
              {/* Show "+ Tag" button only when item has no tags */}
              {(!item.tags || item.tags.length === 0) && (
                <PillButton
                  ref={tagButtonRef}
                  variant="placeholder"
                  size="sm"
                  className="focus:ring-2 focus:ring-primary focus:ring-offset-1"
                  onKeyDown={onTagButtonKeyDown}
                >
                  <Plus className="w-2.5 h-2.5" />
                  Tag
                </PillButton>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="start">
            <div className="space-y-1">
              {/* Search/Create tag input */}
              <div className="flex items-center gap-1 px-1 pb-2 border-b mb-1">
                <TagIcon className="w-3 h-3" filled={false} />
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Search or create tag..."
                  className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-muted-foreground/50"
                  autoFocus
                />
              </div>
              
              {/* Filtered existing tags list */}
              {(() => {
                const searchTerm = newTagName.trim().toLowerCase();
                const filteredTags = searchTerm 
                  ? state.tags.filter(tag => tag.name.toLowerCase().includes(searchTerm))
                  : state.tags;
                const exactMatch = state.tags.some(tag => tag.name.toLowerCase() === searchTerm);
                const showCreateOption = searchTerm && !exactMatch;
                
                return (
                  <>
                    {/* Create new tag option */}
                    {showCreateOption && (
                      <button
                        onClick={() => {
                          const colors = ['#22c55e', '#008948', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];
                          const randomColor = colors[Math.floor(Math.random() * colors.length)];
                          const newTagId = crypto.randomUUID();
                          const newTag = { id: newTagId, name: newTagName.trim(), color: randomColor };
                          addTag(newTag);
                          const currentTags = item.tags || [];
                          updateItem({ ...item, tags: [...currentTags, newTagId] });
                          setNewTagName('');
                        }}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors hover:bg-accent text-primary"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Create "{newTagName.trim()}"</span>
                      </button>
                    )}
                    
                    {/* Filtered tags as pills */}
                    {filteredTags.length > 0 && (
                      <div className="text-xs font-medium text-muted-foreground px-2 py-1">
                        {searchTerm ? 'Matching tags' : 'Existing tags'}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 px-1 py-1">
                      {filteredTags.map(tag => {
                        const isSelected = item.tags?.includes(tag.id);
                        return (
                          <PillButton
                            key={tag.id}
                            onClick={() => onTagToggle(tag.id)}
                            variant="filled"
                            size="sm"
                            color={tag.color}
                            className={cn(
                              isSelected
                                ? "ring-2 ring-offset-1"
                                : "hover:opacity-80"
                            )}
                            style={isSelected ? { '--tw-ring-color': tag.color } as React.CSSProperties : {}}
                          >
                            <TagIcon className="w-2.5 h-2.5" color={tag.color} />
                            <span className="truncate max-w-[100px]">{tag.name}</span>
                            {isSelected && <X className="w-2.5 h-2.5 ml-0.5" />}
                          </PillButton>
                        );
                      })}
                    </div>
                    
                    {/* Empty states */}
                    {filteredTags.length === 0 && !showCreateOption && (
                      <p className="text-xs text-muted-foreground text-center py-2">
                        {searchTerm ? 'No matching tags' : 'Type to search or create a tag'}
                      </p>
                    )}
                  </>
                );
              })()}
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Spacer to push action buttons to the right */}
        <div className="flex-1" />
        
        {/* Action buttons - Mode Switch, Pin, Download, Copy, and Delete */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Editor Mode Switch - WYSIWYG / Raw Markdown */}
          {onToggleRawMode && (
            <button 
              onClick={onToggleRawMode}
              className="flex items-center h-7 rounded-md border border-border/50 bg-muted/30 p-0.5 gap-0.5 cursor-pointer hover:border-border transition-colors"
              title={isRawMode ? 'Switch to WYSIWYG editor' : 'Switch to raw markdown'}
            >
              <span
                className={cn(
                  "flex items-center justify-center h-6 w-6 rounded transition-all duration-200",
                  !isRawMode 
                    ? "bg-background shadow-sm text-foreground" 
                    : "text-muted-foreground"
                )}
              >
                <Eye className="h-3.5 w-3.5" />
              </span>
              <span
                className={cn(
                  "flex items-center justify-center h-6 w-6 rounded transition-all duration-200",
                  isRawMode 
                    ? "bg-background shadow-sm text-foreground" 
                    : "text-muted-foreground"
                )}
              >
                <Code2 className="h-3.5 w-3.5" />
              </span>
            </button>
          )}
          
          {/* Vertical divider between mode switcher and action icons */}
          {onToggleRawMode && (
            <div className="h-4 w-px bg-border/60 mx-0.5" />
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onTogglePin}
            title={item.isPinned ? 'Unpin' : 'Pin'}
          >
            {item.isPinned ? (
              <PinOff className="h-4 w-4" />
            ) : (
              <Pin className="h-4 w-4" />
            )}
          </Button>
          
          {onDownload && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onDownload}
              title="Download as Markdown"
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onCopy}
            title="Copy"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={onDelete}
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
});

export default EditorHeaderBar;
