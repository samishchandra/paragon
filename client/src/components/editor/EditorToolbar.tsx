import { Editor, useEditorState } from '@tiptap/react';
import { memo } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link,
  Highlighter,
  Quote,
  List,
  ListOrdered,
  CheckSquare,
  Table,
  Image,
  Minus,
  Undo,
  Redo,
  Copy,
  Info,
  BookOpen,
  PenLine,
  Library,
  ListTodo,
  Code2,
  Rows,
  Columns,
  Plus,
  Trash2,
  ToggleLeft,
  Palette,
  X,
  MoreHorizontal,
  ListIcon,
  PlusCircle,
  IndentIncrease,
  IndentDecrease,
  ArrowUpDown,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { useCallback, useState, useMemo, useRef, useEffect } from 'react';
import { ImageURLDialog } from './ImageURLDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

/*
 * DESIGN: Dark Mode Craftsman
 * Horizontally scrollable toolbar — all options always visible
 * Touch-friendly buttons with proper sizing
 */

interface EditorToolbarProps {
  editor: Editor;
  onCopyMarkdown?: () => void;
  onOpenLinkPopover?: () => void;
  onOpenFindReplace?: () => void;
  className?: string;
  disabledFeatures?: {
    tables?: boolean;
    images?: boolean;
    codeBlocks?: boolean;
    taskLists?: boolean;
    callouts?: boolean;
    datePills?: boolean;
    wikiLinks?: boolean;
    collapsibleHeadings?: boolean;
    slashCommands?: boolean;
    markdownPaste?: boolean;
    dragAndDrop?: boolean;
  };
  autoReorderChecklist?: boolean;
  /** Whether AI features are available (shows sparkles button) */
  aiEnabled?: boolean;
  /** Called when the sparkles button is clicked, with the button element for positioning */
  onAISparklesClick?: (anchorEl: HTMLElement) => void;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  tooltip?: string;
}

const ToolbarButton = ({ onClick, isActive, disabled, children, tooltip }: ToolbarButtonProps) => {
  const button = (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center w-8 h-8 rounded-md shrink-0
        transition-all duration-100 ease-out touch-manipulation
        ${isActive 
          ? 'bg-secondary text-foreground' 
          : 'bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {children}
    </button>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
};

const Divider = () => (
  <div className="w-px h-5 bg-border mx-0.5 shrink-0" />
);

export const EditorToolbar = memo(function EditorToolbar({ editor, onCopyMarkdown, onOpenLinkPopover, className = '', autoReorderChecklist = false, aiEnabled = false, onAISparklesClick }: EditorToolbarProps) {
  const aiToolbarButtonRef = useRef<HTMLButtonElement>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageDialogPosition, setImageDialogPosition] = useState<{ top: number; left: number } | undefined>(undefined);

  // Performance: Use useEditorState to only re-render when relevant toolbar states change
  // instead of re-rendering on every transaction
  const editorState = useEditorState({
    editor,
    selector: ({ editor: e }: { editor: Editor }) => ({
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
      isBold: e.isActive('bold'),
      isItalic: e.isActive('italic'),
      isUnderline: e.isActive('underline'),
      isStrike: e.isActive('strike'),
      isCode: e.isActive('code'),
      isHighlight: e.isActive('highlight'),
      isH1: e.isActive('heading', { level: 1 }),
      isH2: e.isActive('heading', { level: 2 }),
      isH3: e.isActive('heading', { level: 3 }),
      isBlockquote: e.isActive('blockquote'),
      isBulletList: e.isActive('bulletList'),
      isOrderedList: e.isActive('orderedList'),
      isTaskList: e.isActive('taskList'),
      isCodeBlock: e.isActive('codeBlock'),
      isLink: e.isActive('link'),
    }),
  });

  const openImageDialog = useCallback(() => {
    // Get cursor position in the editor to anchor the dialog
    const { view } = editor;
    const { from } = view.state.selection;
    const coords = view.coordsAtPos(from);
    setImageDialogPosition({ top: coords.bottom + 8, left: coords.left });
    setShowImageDialog(true);
  }, [editor]);

  const handleImageInsert = useCallback((url: string, alt: string) => {
    editor.chain().focus().setImage({ src: url, alt }).run();
    setShowImageDialog(false);
  }, [editor]);

  const addTable = useCallback(() => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  const addCallout = useCallback((type: 'info' | 'note' | 'prompt' | 'resources' | 'todo') => {
    editor.chain().focus().insertCallout({ type }).run();
  }, [editor]);

  // === Auto-Reorder Checklist ===
  // FLIP animation positions ref
  const firstPositions = useRef(new Map<string, DOMRect>());
  const prevCheckedStatesRef = useRef(new Map<number, boolean>());

  // Standalone reorder function that operates on an editor instance
  // Handles taskList, bulletList, and orderedList nodes that contain taskItem children
  const performReorder = useCallback((ed: Editor) => {
    const { doc, tr } = ed.state;
    let modified = false;

    // List types that can contain taskItem children (mixed lists)
    const listTypes = new Set(['taskList', 'bulletList', 'orderedList']);

    // FLIP Step 1: Capture "First" positions before reorder
    // Select all list containers (taskList, bulletList, orderedList)
    const allListElements = ed.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    firstPositions.current.clear();
    allListElements.forEach((listEl, listIdx) => {
      const items = listEl.querySelectorAll(':scope > li');
      items.forEach((item) => {
        const li = item as HTMLElement;
        const text = (li.textContent || '').trim().substring(0, 50);
        firstPositions.current.set(`${listIdx}-${text}`, li.getBoundingClientRect());
      });
    });

    // Collect all list nodes that need reordering (process deepest first to avoid position shifts)
    const listsToReorder: { node: any; pos: number; depth: number }[] = [];
    doc.descendants((node, pos, _parent, index) => {
      if (!listTypes.has(node.type.name)) return true;

      // Check if this list has any DIRECT taskItem children (not nested ones)
      let hasDirectTaskItems = false;
      node.forEach((child: any) => {
        if (child.type.name === 'taskItem') hasDirectTaskItems = true;
      });
      if (!hasDirectTaskItems) return true; // continue into children to find nested lists

      // Calculate depth by counting ancestor list nodes
      let depth = 0;
      doc.nodesBetween(0, pos, (n) => {
        if (listTypes.has(n.type.name)) depth++;
        return true;
      });

      listsToReorder.push({ node, pos, depth });
      return true; // IMPORTANT: continue descending to find nested lists at deeper levels
    });

    // Sort deepest-first so position mappings stay valid when we modify inner lists before outer ones
    listsToReorder.sort((a, b) => b.depth - a.depth);

    for (const { node, pos } of listsToReorder) {
      // Only reorder DIRECT children of this list node (same level)
      const items: { node: any; isTask: boolean; checked: boolean; originalIndex: number }[] = [];
      let idx = 0;
      node.forEach((child: any) => {
        items.push({
          node: child,
          isTask: child.type.name === 'taskItem',
          checked: child.type.name === 'taskItem' && child.attrs.checked === true,
          originalIndex: idx++,
        });
      });

      // Build reordered list: non-task items stay in relative position,
      // unchecked tasks come before checked tasks, all tasks maintain relative order within their group
      const uncheckedTasks = items.filter(i => i.isTask && !i.checked);
      const checkedTasks = items.filter(i => i.isTask && i.checked);

      // Reconstruct: place items back by filling task slots in order (unchecked first, checked last)
      // while keeping non-task items (listItem) in their original positions
      const reordered = [...items]; // clone
      const taskPositions = items.map((item, i) => ({ index: i, isTask: item.isTask })).filter(s => s.isTask).map(s => s.index);
      const orderedTasks = [...uncheckedTasks, ...checkedTasks];
      taskPositions.forEach((slotIdx, i) => {
        reordered[slotIdx] = orderedTasks[i];
      });

      const orderChanged = reordered.some((item, i) => item.node !== items[i].node);
      if (!orderChanged) continue;

      const newList = node.type.create(
        node.attrs,
        reordered.map(i => i.node)
      );
      const mappedPos = tr.mapping.map(pos);
      tr.replaceWith(mappedPos, mappedPos + node.nodeSize, newList);
      modified = true;
    }

    if (modified) {
      ed.view.dispatch(tr);
      // FLIP Step 2: After DOM update, capture "Last" positions and animate
      requestAnimationFrame(() => {
        const newListElements = ed.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
        newListElements.forEach((listEl) => {
          const items = listEl.querySelectorAll(':scope > li');
          const oldByText = new Map<string, DOMRect>();
          firstPositions.current.forEach((rect, key) => {
            const text = key.replace(/^\d+-/, '');
            oldByText.set(text, rect);
          });
          items.forEach((item) => {
            const li = item as HTMLElement;
            const text = (li.textContent || '').trim().substring(0, 50);
            const oldRect = oldByText.get(text);
            if (!oldRect) return;
            const newRect = li.getBoundingClientRect();
            const deltaY = oldRect.top - newRect.top;
            if (Math.abs(deltaY) < 2) return;
            li.style.transform = `translateY(${deltaY}px)`;
            li.style.transition = 'none';
            li.style.zIndex = '1';
            li.offsetHeight;
            li.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            li.style.transform = 'translateY(0)';
            const cleanup = () => {
              li.style.transform = '';
              li.style.transition = '';
              li.style.zIndex = '';
              li.removeEventListener('transitionend', cleanup);
            };
            li.addEventListener('transitionend', cleanup);
            setTimeout(cleanup, 400);
          });
        });
      });
    }
  }, []);

  // Auto-reorder on checkbox toggle
  useEffect(() => {
    if (!autoReorderChecklist || !editor) return;

    const initStates = new Map<number, boolean>();
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'taskItem') {
        initStates.set(pos, node.attrs.checked === true);
      }
      return true;
    });
    prevCheckedStatesRef.current = initStates;

    const handleTransaction = ({ transaction }: { transaction: any }) => {
      if (!transaction.docChanged) return;

      const currentStates = new Map<number, boolean>();
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'taskItem') {
          currentStates.set(pos, node.attrs.checked === true);
        }
        return true;
      });

      const prev = prevCheckedStatesRef.current;
      let checkboxToggled = false;
      if (prev.size > 0 && currentStates.size > 0) {
        let prevCheckedCount = 0;
        let currCheckedCount = 0;
        prev.forEach((val) => { if (val) prevCheckedCount++; });
        currentStates.forEach((val) => { if (val) currCheckedCount++; });
        if (prevCheckedCount !== currCheckedCount) {
          checkboxToggled = true;
        }
      }

      prevCheckedStatesRef.current = currentStates;

      if (checkboxToggled) {
        setTimeout(() => {
          performReorder(editor);
        }, 150);
      }
    };

    editor.on('transaction', handleTransaction);
    return () => {
      editor.off('transaction', handleTransaction);
    };
  }, [editor, autoReorderChecklist, performReorder]);

  const reorderTodoItems = useCallback(() => {
    performReorder(editor);
  }, [editor, performReorder]);

  return (
    <div className={`flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide ${className}`}>
      {/* Undo/Redo */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState?.canUndo}
        tooltip="Undo (Ctrl+Z)"
      >
        <Undo size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState?.canRedo}
        tooltip="Redo (Ctrl+Shift+Z)"
      >
        <Redo size={16} />
      </ToolbarButton>

      <Divider />

      {/* Text formatting — always visible, scrollable */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editorState?.isBold}
        tooltip="Bold (Ctrl+B)"
      >
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editorState?.isItalic}
        tooltip="Italic (Ctrl+I)"
      >
        <Italic size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editorState?.isUnderline}
        tooltip="Underline (Ctrl+U)"
      >
        <Underline size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editorState?.isStrike}
        tooltip="Strikethrough"
      >
        <Strikethrough size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editorState?.isCode}
        tooltip="Inline Code (Ctrl+E)"
      >
        <Code size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        isActive={editorState?.isHighlight}
        tooltip="Highlight"
      >
        <Highlighter size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => onOpenLinkPopover?.()}
        isActive={editorState?.isLink}
        tooltip="Link (Ctrl+K)"
      >
        <Link size={16} />
      </ToolbarButton>

      <Divider />

      {/* Heading styles dropdown — matches floating toolbar pattern */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`
              flex items-center gap-1 h-8 px-2 rounded-md shrink-0
              transition-all duration-100 ease-out touch-manipulation
              text-xs font-semibold
              ${editorState?.isH1 || editorState?.isH2 || editorState?.isH3
                ? 'bg-secondary text-foreground'
                : 'bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80'
              }
            `}
          >
            <span className="min-w-[18px] text-center">
              {editorState?.isH1 ? 'H1' : editorState?.isH2 ? 'H2' : editorState?.isH3 ? 'H3' : 'P'}
            </span>
            <ChevronDown size={12} strokeWidth={2.5} className="flex-shrink-0" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[130px]">
          <DropdownMenuItem
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={!editorState?.isH1 && !editorState?.isH2 && !editorState?.isH3 ? 'bg-accent font-medium' : ''}
          >
            <span className="w-6 text-xs font-semibold text-muted-foreground">P</span>
            Paragraph
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editorState?.isH1 ? 'bg-accent font-medium' : ''}
          >
            <span className="w-6 text-xs font-semibold text-muted-foreground">H1</span>
            <span className="font-semibold">Heading 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editorState?.isH2 ? 'bg-accent font-medium' : ''}
          >
            <span className="w-6 text-xs font-semibold text-muted-foreground">H2</span>
            <span className="font-semibold">Heading 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editorState?.isH3 ? 'bg-accent font-medium' : ''}
          >
            <span className="w-6 text-xs font-semibold text-muted-foreground">H3</span>
            <span className="font-semibold">Heading 3</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Divider />

      {/* Lists — always visible, scrollable */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editorState?.isBulletList}
        tooltip="Bullet List"
      >
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editorState?.isOrderedList}
        tooltip="Numbered List"
      >
        <ListOrdered size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        isActive={editorState?.isTaskList}
        tooltip="Task List"
      >
        <CheckSquare size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editorState?.isBlockquote}
        tooltip="Quote"
      >
        <Quote size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editorState?.isCodeBlock}
        tooltip="Code Block"
      >
        <Code2 size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          if (editorState?.isTaskList) {
            editor.chain().focus().sinkListItem('taskItem').run();
          } else if (editorState?.isBulletList || editorState?.isOrderedList) {
            editor.chain().focus().sinkListItem('listItem').run();
          }
        }}
        disabled={!editorState?.isBulletList && !editorState?.isOrderedList && !editorState?.isTaskList}
        tooltip="Indent (Tab)"
      >
        <IndentIncrease size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          if (editorState?.isTaskList) {
            editor.chain().focus().liftListItem('taskItem').run();
          } else if (editorState?.isBulletList || editorState?.isOrderedList) {
            editor.chain().focus().liftListItem('listItem').run();
          }
        }}
        disabled={!editorState?.isBulletList && !editorState?.isOrderedList && !editorState?.isTaskList}
        tooltip="Outdent (Shift+Tab)"
      >
        <IndentDecrease size={16} />
      </ToolbarButton>

      <Divider />

      {/* Insert elements — always visible, scrollable */}
      <ToolbarButton
        onClick={addTable}
        tooltip="Insert Table (3×3)"
      >
        <Table size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={openImageDialog}
        tooltip="Insert Image"
      >
        <Image size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        tooltip="Horizontal Rule"
      >
        <Minus size={16} />
      </ToolbarButton>
      {/* Callout dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"
            title="Insert Callout"
          >
            <Info size={16} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => addCallout('info')}>
            <Info size={16} className="mr-2" style={{ color: '#3F78BB' }} /> Info
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addCallout('note')}>
            <BookOpen size={16} className="mr-2" style={{ color: '#FF8200' }} /> Note
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addCallout('prompt')}>
            <PenLine size={16} className="mr-2" style={{ color: '#B244B3' }} /> Prompt
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addCallout('resources')}>
            <Library size={16} className="mr-2" style={{ color: '#63B148' }} /> Resources
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addCallout('todo')}>
            <ListTodo size={16} className="mr-2" style={{ color: '#4479B3' }} /> Todo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Table controls dropdown - Only when in table */}
      {editor.isActive('table') && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-1.5 gap-1 bg-primary/10 shrink-0"
            >
              <Table size={16} />
              <span className="text-xs hidden sm:inline">Table</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().addColumnBefore().run()}
              disabled={!editor.can().addColumnBefore()}
            >
              <Columns size={16} className="mr-2" /> Add Column Before
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              disabled={!editor.can().addColumnAfter()}
            >
              <Columns size={16} className="mr-2" /> Add Column After
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().deleteColumn().run()}
              disabled={!editor.can().deleteColumn()}
            >
              <Trash2 size={16} className="mr-2 text-destructive" /> Delete Column
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().addRowBefore().run()}
              disabled={!editor.can().addRowBefore()}
            >
              <Rows size={16} className="mr-2" /> Add Row Before
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().addRowAfter().run()}
              disabled={!editor.can().addRowAfter()}
            >
              <Rows size={16} className="mr-2" /> Add Row After
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().deleteRow().run()}
              disabled={!editor.can().deleteRow()}
            >
              <Trash2 size={16} className="mr-2 text-destructive" /> Delete Row
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().toggleHeaderRow().run()}
              disabled={!editor.can().toggleHeaderRow()}
            >
              <ToggleLeft size={16} className="mr-2" /> Toggle Header Row
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
              disabled={!editor.can().toggleHeaderColumn()}
            >
              <ToggleLeft size={16} className="mr-2" /> Toggle Header Column
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().deleteTable().run()}
              disabled={!editor.can().deleteTable()}
              className="text-destructive"
            >
              <Trash2 size={16} className="mr-2" /> Delete Table
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Image URL dialog */}
      <ImageURLDialog
        isOpen={showImageDialog}
        onClose={() => setShowImageDialog(false)}
        onInsert={handleImageInsert}
        position={imageDialogPosition}
      />

      {/* Reorder Todo Items button */}
      <Divider />
      <ToolbarButton
        onClick={reorderTodoItems}
        tooltip="Sort tasks: unchecked first, checked last"
      >
        <ArrowUpDown size={16} />
      </ToolbarButton>

      {/* AI Sparkles button (document-scope actions) */}
      {aiEnabled && (
        <>
          <Divider />
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                ref={aiToolbarButtonRef}
                onClick={() => {
                  if (aiToolbarButtonRef.current) {
                    onAISparklesClick?.(aiToolbarButtonRef.current);
                  }
                }}
                className="
                  flex items-center justify-center w-8 h-8 rounded-md shrink-0
                  transition-all duration-100 ease-out touch-manipulation
                  bg-transparent text-muted-foreground hover:bg-secondary active:bg-secondary/80
                  hover:text-foreground
                "
              >
                <Sparkles size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              AI Writing Assistant
            </TooltipContent>
          </Tooltip>
        </>
      )}

      {/* Spacer */}
      <div className="flex-1 min-w-2" />

      {/* Copy as Markdown */}
      {onCopyMarkdown && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 gap-1 shrink-0" 
              onClick={onCopyMarkdown}
            >
              <Copy size={16} />
              <span className="text-xs hidden md:inline">Copy MD</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            Copy content as Markdown
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
});

export default EditorToolbar;
