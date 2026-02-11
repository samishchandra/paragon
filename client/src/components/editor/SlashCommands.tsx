import { Editor, Extension } from '@tiptap/react';
import { useEffect, useState, useCallback, useRef } from 'react';
import ImageURLDialog from './ImageURLDialog';
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Code2,
  Table,
  Image,
  Minus,
  Info,
  StickyNote,
  MessageSquareText,
  BookOpen,
  ListTodo,
  Type,
  Calendar,
  Link2,
} from 'lucide-react';

/*
 * DESIGN: Dark Mode Craftsman
 * Slash command menu for quick insertions
 * Glassmorphic popup with keyboard navigation
 */

interface SlashCommandsProps {
  editor: Editor;
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
}

interface CommandItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  command: (editor: Editor) => void;
  keywords?: string[];
  isImageCommand?: boolean;
}

const commands: CommandItem[] = [
  {
    title: 'Paragraph',
    description: 'Normal text',
    icon: <Type size={15} />,
    command: (editor) => editor.chain().focus().setParagraph().run(),
    keywords: ['text', 'normal', 'p'],
  },
  {
    title: 'Heading 1',
    description: 'Large section heading',
    icon: <Heading1 size={15} />,
    command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ['h1', 'title', 'large'],
  },
  {
    title: 'Heading 2',
    description: 'Medium section heading',
    icon: <Heading2 size={15} />,
    command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ['h2', 'subtitle'],
  },
  {
    title: 'Heading 3',
    description: 'Small section heading',
    icon: <Heading3 size={15} />,
    command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ['h3', 'subheading'],
  },
  {
    title: 'Bullet List',
    description: 'Create a simple bullet list',
    icon: <List size={15} />,
    command: (editor) => editor.chain().focus().toggleBulletList().run(),
    keywords: ['ul', 'unordered', 'bullets'],
  },
  {
    title: 'Numbered List',
    description: 'Create a numbered list',
    icon: <ListOrdered size={15} />,
    command: (editor) => editor.chain().focus().toggleOrderedList().run(),
    keywords: ['ol', 'ordered', 'numbers'],
  },
  {
    title: 'Task List',
    description: 'Create a todo list with checkboxes',
    icon: <CheckSquare size={15} />,
    command: (editor) => editor.chain().focus().toggleTaskList().run(),
    keywords: ['todo', 'checkbox', 'tasks'],
  },
  {
    title: 'Quote',
    description: 'Add a blockquote',
    icon: <Quote size={15} />,
    command: (editor) => editor.chain().focus().toggleBlockquote().run(),
    keywords: ['blockquote', 'citation'],
  },
  {
    title: 'Code Block',
    description: 'Add a code block with syntax highlighting',
    icon: <Code2 size={15} />,
    command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    keywords: ['code', 'pre', 'syntax'],
  },
  {
    title: 'Table',
    description: 'Insert a table',
    icon: <Table size={15} />,
    command: (editor) => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    keywords: ['grid', 'spreadsheet'],
  },
  // Image command is handled separately with a dialog
  {
    title: 'Image',
    description: 'Insert an image from URL',
    icon: <Image size={15} />,
    command: () => {
      // This is a placeholder - actual insertion is handled by the dialog
      // The command will be intercepted in SlashCommands component
    },
    keywords: ['picture', 'photo', 'img'],
    isImageCommand: true,
  },
  {
    title: 'Divider',
    description: 'Add a horizontal rule',
    icon: <Minus size={15} />,
    command: (editor) => editor.chain().focus().setHorizontalRule().run(),
    keywords: ['hr', 'separator', 'line'],
  },
  {
    title: 'Info Callout',
    description: 'Add an info callout box',
    icon: <Info size={15} className="text-blue-400" />,
    command: (editor) => editor.chain().focus().toggleCallout({ type: 'info' }).run(),
    keywords: ['note', 'tip', 'information'],
  },
  {
    title: 'Note Callout',
    description: 'Add a note callout box',
    icon: <StickyNote size={15} className="text-purple-400" />,
    command: (editor) => editor.chain().focus().toggleCallout({ type: 'note' }).run(),
    keywords: ['memo', 'remember'],
  },
  {
    title: 'Prompt Callout',
    description: 'Add a prompt callout box',
    icon: <MessageSquareText size={15} className="text-yellow-400" />,
    command: (editor) => editor.chain().focus().toggleCallout({ type: 'prompt' }).run(),
    keywords: ['question', 'ask', 'prompt'],
  },
  {
    title: 'Resources Callout',
    description: 'Add a resources callout box',
    icon: <BookOpen size={15} className="text-green-400" />,
    command: (editor) => editor.chain().focus().toggleCallout({ type: 'resources' }).run(),
    keywords: ['links', 'reference', 'reading'],
  },
  {
    title: 'To-Do Callout',
    description: 'Add a to-do callout box',
    icon: <ListTodo size={15} className="text-cyan-400" />,
    command: (editor) => editor.chain().focus().toggleCallout({ type: 'todo' }).run(),
    keywords: ['task', 'action', 'checklist'],
  },
  {
    title: 'Date',
    description: 'Insert a date pill (today)',
    icon: <Calendar size={15} className="text-cyan-400" />,
    command: (editor) => editor.chain().focus().insertDatePill().run(),
    keywords: ['date', 'today', 'calendar', 'time', 'schedule'],
  },
  {
    title: 'Wiki Link',
    description: 'Insert a [[page name]] link',
    icon: <Link2 size={15} className="text-cyan-400" />,
    command: (editor) => {
      const pageName = window.prompt('Enter page name:');
      if (pageName) {
        editor.chain().focus().insertContent(`[[${pageName}]]`).run();
      }
    },
    keywords: ['wiki', 'internal', 'page', 'link', 'backlink'],
  },
];

export function SlashCommands({ editor }: SlashCommandsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageDialogPosition, setImageDialogPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredCommands = commands.filter((cmd) => {
    const searchText = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(searchText) ||
      cmd.description.toLowerCase().includes(searchText) ||
      cmd.keywords?.some((kw) => kw.includes(searchText))
    );
  });

  const executeCommand = useCallback((index: number) => {
    const command = filteredCommands[index];
    if (command) {
      // Delete the slash and query
      const { state } = editor;
      const { selection } = state;
      const { $from } = selection;
      const textBefore = $from.nodeBefore?.textContent || '';
      const slashIndex = textBefore.lastIndexOf('/');
      
      if (slashIndex !== -1) {
        const deleteFrom = $from.pos - (textBefore.length - slashIndex);
        editor.chain().focus().deleteRange({ from: deleteFrom, to: $from.pos }).run();
      }
      
      // Handle image command specially with dialog
      if (command.isImageCommand) {
        const coords = editor.view.coordsAtPos($from.pos);
        setImageDialogPosition({
          top: coords.bottom + 8,
          left: coords.left,
        });
        setShowImageDialog(true);
      } else {
        command.command(editor);
      }
      
      setIsOpen(false);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [editor, filteredCommands]);

  const handleImageInsert = useCallback((url: string, alt: string) => {
    editor.chain().focus().setImage({ src: url, alt }).run();
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) {
        // Check for slash to open menu
        if (event.key === '/') {
          const { state } = editor;
          const { selection } = state;
          const { $from } = selection;
          
          // Get cursor position for menu placement
          const coords = editor.view.coordsAtPos($from.pos);
          setPosition({
            top: coords.bottom + 8,
            left: coords.left,
          });
          
          // Open menu after a small delay to allow the slash to be typed
          setTimeout(() => {
            setIsOpen(true);
            setQuery('');
            setSelectedIndex(0);
          }, 10);
        }
        return;
      }

      // Handle navigation when menu is open
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        executeCommand(selectedIndex);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        setQuery('');
      } else if (event.key === 'Backspace') {
        if (query.length === 0) {
          setIsOpen(false);
        } else {
          setQuery((prev) => prev.slice(0, -1));
        }
      } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
        setQuery((prev) => prev + event.key);
        setSelectedIndex(0);
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick);
    };
  }, [editor, isOpen, query, selectedIndex, filteredCommands, executeCommand]);

  // Reset selected index when filtered results change
  useEffect(() => {
    if (selectedIndex >= filteredCommands.length) {
      setSelectedIndex(Math.max(0, filteredCommands.length - 1));
    }
  }, [filteredCommands.length, selectedIndex]);

  // Show image dialog even when menu is closed
  if (showImageDialog) {
    return (
      <ImageURLDialog
        isOpen={showImageDialog}
        onClose={() => setShowImageDialog(false)}
        onInsert={handleImageInsert}
        position={imageDialogPosition}
      />
    );
  }

  if (!isOpen || filteredCommands.length === 0) {
    return null;
  }

  // Calculate safe position for mobile
  const safePosition = {
    top: position.top,
    left: Math.min(position.left, typeof window !== 'undefined' ? window.innerWidth - 280 : position.left),
  };

  return (
    <div
      ref={menuRef}
      className="slash-command-menu fixed z-50 max-h-[60vh] overflow-y-auto"
      style={{
        top: safePosition.top,
        left: Math.max(8, safePosition.left),
      }}
    >
      <div className="text-xs text-muted-foreground px-3 py-2 border-b border-border">
        {query ? `Searching: ${query}` : 'Type to filter...'}
      </div>
      {filteredCommands.map((cmd, index) => (
        <div
          key={cmd.title}
          className={`slash-command-item ${index === selectedIndex ? 'is-selected' : ''}`}
          onClick={() => executeCommand(index)}
          onMouseEnter={() => setSelectedIndex(index)}
          onTouchStart={() => setSelectedIndex(index)}
        >
          <div className="icon flex-shrink-0">{cmd.icon}</div>
          <div className="flex flex-col min-w-0">
            <span className="label truncate">{cmd.title}</span>
            <span className="text-xs text-muted-foreground truncate">{cmd.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SlashCommands;
