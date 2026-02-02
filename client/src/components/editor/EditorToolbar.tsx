import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
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
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  FileText,
  Code2,
  Rows,
  Columns,
  Plus,
  Trash2,
  ToggleLeft,
  Palette,
  X,
} from 'lucide-react';
import { useCallback, useState } from 'react';
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
 * Top toolbar with grouped actions
 * Subtle borders and hover states
 */

interface EditorToolbarProps {
  editor: Editor;
  onCopyMarkdown?: () => void;
  onOpenLinkPopover?: () => void;
  className?: string;
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
        flex items-center justify-center w-8 h-8 rounded-md
        transition-all duration-100 ease-out
        ${isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-transparent text-foreground hover:bg-secondary'
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
  <div className="w-px h-6 bg-border mx-1" />
);

export function EditorToolbar({ editor, onCopyMarkdown, onOpenLinkPopover, className = '' }: EditorToolbarProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);

  const addImage = useCallback(() => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowImageInput(false);
    }
  }, [editor, imageUrl]);

  const addTable = useCallback(() => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  const addCallout = useCallback((type: 'info' | 'warning' | 'error' | 'success' | 'note') => {
    editor.chain().focus().toggleCallout({ type }).run();
  }, [editor]);

  return (
    <div className={`flex items-center gap-1 px-3 py-2 border-b border-border bg-card/50 flex-wrap ${className}`}>
      {/* Undo/Redo */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        tooltip="Undo (Ctrl+Z)"
      >
        <Undo size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        tooltip="Redo (Ctrl+Shift+Z)"
      >
        <Redo size={16} />
      </ToolbarButton>

      <Divider />

      {/* Text formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        tooltip="Bold (Ctrl+B)"
      >
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        tooltip="Italic (Ctrl+I)"
      >
        <Italic size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
        tooltip="Underline (Ctrl+U)"
      >
        <Underline size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
        tooltip="Strikethrough"
      >
        <Strikethrough size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
        tooltip="Inline Code (Ctrl+E)"
      >
        <Code size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        isActive={editor.isActive('highlight')}
        tooltip="Highlight"
      >
        <Highlighter size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => onOpenLinkPopover?.()}
        isActive={editor.isActive('link')}
        tooltip="Link (Ctrl+K)"
      >
        <Link size={16} />
      </ToolbarButton>

      <Divider />

      {/* Headings dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2 gap-1">
            <Heading1 size={16} />
            <span className="text-xs">Heading</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            <Heading1 size={16} className="mr-2" /> Heading 1
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <Heading2 size={16} className="mr-2" /> Heading 2
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            <Heading3 size={16} className="mr-2" /> Heading 3
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()}>
            <FileText size={16} className="mr-2" /> Paragraph
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Divider />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        tooltip="Bullet List"
      >
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        tooltip="Numbered List"
      >
        <ListOrdered size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        isActive={editor.isActive('taskList')}
        tooltip="Task List"
      >
        <CheckSquare size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        tooltip="Quote"
      >
        <Quote size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}
        tooltip="Code Block"
      >
        <Code2 size={16} />
      </ToolbarButton>

      <Divider />

      {/* Alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
        tooltip="Align Left"
      >
        <AlignLeft size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
        tooltip="Align Center"
      >
        <AlignCenter size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
        tooltip="Align Right"
      >
        <AlignRight size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        isActive={editor.isActive({ textAlign: 'justify' })}
        tooltip="Justify"
      >
        <AlignJustify size={16} />
      </ToolbarButton>

      <Divider />

      {/* Insert elements */}
      {/* Table dropdown with controls */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-8 px-2 gap-1 ${editor.isActive('table') ? 'bg-primary text-primary-foreground' : ''}`}
          >
            <Table size={16} />
            <span className="text-xs">Table</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem onClick={addTable}>
            <Plus size={16} className="mr-2" /> Insert Table (3×3)
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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
          <DropdownMenuItem 
            onClick={() => editor.chain().focus().toggleHeaderCell().run()}
            disabled={!editor.can().toggleHeaderCell()}
          >
            <ToggleLeft size={16} className="mr-2" /> Toggle Header Cell
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => editor.chain().focus().mergeCells().run()}
            disabled={!editor.can().mergeCells()}
          >
            <Table size={16} className="mr-2" /> Merge Cells
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => editor.chain().focus().splitCell().run()}
            disabled={!editor.can().splitCell()}
          >
            <Table size={16} className="mr-2" /> Split Cell
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* Cell Background Color Submenu */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger disabled={!editor.isActive('table')}>
              <Palette size={16} className="mr-2" /> Cell Background
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-48">
              <div className="p-2">
                <div className="text-xs text-muted-foreground mb-2">Quick Colors</div>
                <div className="grid grid-cols-6 gap-1 mb-2">
                  {[
                    { color: '#ef4444', name: 'Red' },
                    { color: '#f97316', name: 'Orange' },
                    { color: '#eab308', name: 'Yellow' },
                    { color: '#22c55e', name: 'Green' },
                    { color: '#3b82f6', name: 'Blue' },
                    { color: '#8b5cf6', name: 'Purple' },
                    { color: '#ec4899', name: 'Pink' },
                    { color: '#14b8a6', name: 'Teal' },
                    { color: '#6366f1', name: 'Indigo' },
                    { color: '#64748b', name: 'Slate' },
                    { color: '#1e293b', name: 'Dark' },
                    { color: '#f1f5f9', name: 'Light' },
                  ].map(({ color, name }) => (
                    <button
                      key={color}
                      onClick={() => editor.chain().focus().setCellBackground(color).run()}
                      className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      title={name}
                    />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mb-1">Custom Color</div>
                <input
                  type="color"
                  onChange={(e) => editor.chain().focus().setCellBackground(e.target.value).run()}
                  className="w-full h-8 rounded cursor-pointer"
                />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => editor.chain().focus().unsetCellBackground().run()}>
                <X size={16} className="mr-2" /> Remove Background
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
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
      
      {showImageInput ? (
        <div className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md">
          <input
            type="url"
            placeholder="Image URL..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addImage();
              }
              if (e.key === 'Escape') {
                setShowImageInput(false);
                setImageUrl('');
              }
            }}
            className="bg-transparent border-none outline-none text-sm w-40"
            autoFocus
          />
          <button
            onClick={addImage}
            className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded"
          >
            Add
          </button>
          <button
            onClick={() => {
              setShowImageInput(false);
              setImageUrl('');
            }}
            className="px-2 py-0.5 text-xs text-muted-foreground"
          >
            Cancel
          </button>
        </div>
      ) : (
        <ToolbarButton
          onClick={() => setShowImageInput(true)}
          tooltip="Insert Image"
        >
          <Image size={16} />
        </ToolbarButton>
      )}
      
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        tooltip="Horizontal Rule"
      >
        <Minus size={16} />
      </ToolbarButton>

      {/* Callouts dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2 gap-1">
            <Info size={16} />
            <span className="text-xs">Callout</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => addCallout('info')}>
            <Info size={16} className="mr-2 text-blue-400" /> Info
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addCallout('warning')}>
            <AlertTriangle size={16} className="mr-2 text-yellow-400" /> Warning
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addCallout('error')}>
            <AlertCircle size={16} className="mr-2 text-red-400" /> Error
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addCallout('success')}>
            <CheckCircle size={16} className="mr-2 text-green-400" /> Success
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addCallout('note')}>
            <FileText size={16} className="mr-2 text-purple-400" /> Note
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Copy as Markdown */}
      {onCopyMarkdown && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2 gap-1" onClick={onCopyMarkdown}>
              <Copy size={16} />
              <span className="text-xs hidden sm:inline">Copy as Markdown</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            Copy content as Markdown
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

export default EditorToolbar;
