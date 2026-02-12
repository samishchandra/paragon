import { Editor } from '@tiptap/react';
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
 * DESIGN: Taskmate-style compact slash command menu
 * Uses editor transaction monitoring to detect "/" typed at start of line
 * Single-line items: icon + title only, no descriptions
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
  icon: React.ReactNode;
  command: (editor: Editor) => void;
  keywords?: string[];
  isImageCommand?: boolean;
}

const commands: CommandItem[] = [
  {
    title: 'Paragraph',
    icon: <Type size={16} />,
    command: (editor) => editor.chain().focus().setParagraph().run(),
    keywords: ['text', 'normal', 'p'],
  },
  {
    title: 'Heading 1',
    icon: <Heading1 size={16} />,
    command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ['h1', 'title', 'large'],
  },
  {
    title: 'Heading 2',
    icon: <Heading2 size={16} />,
    command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ['h2', 'subtitle'],
  },
  {
    title: 'Heading 3',
    icon: <Heading3 size={16} />,
    command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ['h3', 'subheading'],
  },
  {
    title: 'Bullet List',
    icon: <List size={16} />,
    command: (editor) => editor.chain().focus().toggleBulletList().run(),
    keywords: ['ul', 'unordered', 'bullets'],
  },
  {
    title: 'Numbered List',
    icon: <ListOrdered size={16} />,
    command: (editor) => editor.chain().focus().toggleOrderedList().run(),
    keywords: ['ol', 'ordered', 'numbers'],
  },
  {
    title: 'Task List',
    icon: <CheckSquare size={16} />,
    command: (editor) => editor.chain().focus().toggleTaskList().run(),
    keywords: ['todo', 'checkbox', 'tasks'],
  },
  {
    title: 'Quote',
    icon: <Quote size={16} />,
    command: (editor) => editor.chain().focus().toggleBlockquote().run(),
    keywords: ['blockquote', 'citation'],
  },
  {
    title: 'Code Block',
    icon: <Code2 size={16} />,
    command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    keywords: ['code', 'pre', 'syntax'],
  },
  {
    title: 'Table',
    icon: <Table size={16} />,
    command: (editor) => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    keywords: ['grid', 'spreadsheet'],
  },
  {
    title: 'Image',
    icon: <Image size={16} />,
    command: () => {},
    keywords: ['picture', 'photo', 'img'],
    isImageCommand: true,
  },
  {
    title: 'Divider',
    icon: <Minus size={16} />,
    command: (editor) => editor.chain().focus().setHorizontalRule().run(),
    keywords: ['hr', 'separator', 'line'],
  },
  {
    title: 'Info Callout',
    icon: <Info size={16} className="text-blue-400" />,
    command: (editor) => editor.chain().focus().toggleCallout({ type: 'info' }).run(),
    keywords: ['note', 'tip', 'information'],
  },
  {
    title: 'Note Callout',
    icon: <StickyNote size={16} className="text-purple-400" />,
    command: (editor) => editor.chain().focus().toggleCallout({ type: 'note' }).run(),
    keywords: ['memo', 'remember'],
  },
  {
    title: 'Prompt Callout',
    icon: <MessageSquareText size={16} className="text-amber-400" />,
    command: (editor) => editor.chain().focus().toggleCallout({ type: 'prompt' }).run(),
    keywords: ['question', 'ask', 'prompt'],
  },
  {
    title: 'Resources Callout',
    icon: <BookOpen size={16} className="text-green-400" />,
    command: (editor) => editor.chain().focus().toggleCallout({ type: 'resources' }).run(),
    keywords: ['links', 'reference', 'reading'],
  },
  {
    title: 'To-Do Callout',
    icon: <ListTodo size={16} className="text-cyan-400" />,
    command: (editor) => editor.chain().focus().toggleCallout({ type: 'todo' }).run(),
    keywords: ['task', 'action', 'checklist'],
  },
  {
    title: 'Date',
    icon: <Calendar size={16} className="text-cyan-400" />,
    command: (editor) => editor.chain().focus().insertDatePill().run(),
    keywords: ['date', 'today', 'calendar', 'time', 'schedule'],
  },
  {
    title: 'Wiki Link',
    icon: <Link2 size={16} className="text-cyan-400" />,
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
  const slashPosRef = useRef<number>(-1);
  const isOpenRef = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const filteredCommands = commands.filter((cmd) => {
    if (!query) return true;
    const searchText = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(searchText) ||
      cmd.keywords?.some((kw) => kw.includes(searchText))
    );
  });

  const deleteSlashAndQuery = useCallback(() => {
    const { state } = editor;
    const { selection } = state;
    const cursorPos = selection.from;
    const slashPos = slashPosRef.current;

    if (slashPos >= 0 && slashPos <= cursorPos) {
      editor.chain().focus().deleteRange({ from: slashPos, to: cursorPos }).run();
    } else {
      const { $from } = selection;
      const textBefore = $from.parent.textBetween(0, $from.parentOffset, undefined, '\ufffc');
      const slashIndex = textBefore.lastIndexOf('/');
      if (slashIndex !== -1) {
        const deleteFrom = $from.pos - ($from.parentOffset - slashIndex);
        editor.chain().focus().deleteRange({ from: deleteFrom, to: $from.pos }).run();
      }
    }
  }, [editor]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
    slashPosRef.current = -1;
  }, []);

  const executeCommand = useCallback((index: number) => {
    const command = filteredCommands[index];
    if (command) {
      deleteSlashAndQuery();

      if (command.isImageCommand) {
        const { state } = editor;
        const coords = editor.view.coordsAtPos(state.selection.from);
        setImageDialogPosition({
          top: coords.bottom + 8,
          left: coords.left,
        });
        setShowImageDialog(true);
      } else {
        command.command(editor);
      }

      closeMenu();
    }
  }, [editor, filteredCommands, deleteSlashAndQuery, closeMenu]);

  const handleImageInsert = useCallback((url: string, alt: string) => {
    editor.chain().focus().setImage({ src: url, alt }).run();
  }, [editor]);

  // Monitor editor transactions to detect "/" being typed
  useEffect(() => {
    if (!editor) return;

    const handleTransaction = () => {
      if (isOpenRef.current) return; // Already open, don't re-trigger

      const { state } = editor;
      const { selection } = state;
      const { $from } = selection;

      // Check if the character just before the cursor is "/"
      if ($from.parentOffset === 0) return;

      const textBefore = $from.parent.textBetween(0, $from.parentOffset, undefined, '\ufffc');
      if (!textBefore.endsWith('/')) return;

      // Only trigger if "/" is at start of line or after whitespace
      const charBeforeSlash = textBefore.length > 1 ? textBefore.slice(-2, -1) : '';
      if (charBeforeSlash && charBeforeSlash !== ' ' && charBeforeSlash !== '\n') return;

      // Record the slash position (the character before cursor)
      slashPosRef.current = $from.pos - 1;

      // Get cursor position for menu placement
      const coords = editor.view.coordsAtPos($from.pos);
      
      // Check if we need to open above (near bottom of viewport)
      const viewportHeight = window.innerHeight;
      const menuHeight = 320; // approximate max height
      const spaceBelow = viewportHeight - coords.bottom;
      const openAbove = spaceBelow < menuHeight && coords.top > menuHeight;
      
      setPosition({
        top: openAbove ? coords.top - menuHeight - 4 : coords.bottom + 6,
        left: coords.left,
      });
      setIsOpen(true);
      setQuery('');
      setSelectedIndex(0);
    };

    editor.on('update', handleTransaction);
    return () => {
      editor.off('update', handleTransaction);
    };
  }, [editor]);

  // Handle keyboard navigation and query updates when menu is open
  useEffect(() => {
    if (!editor || !isOpen) return;

    const editorElement = editor.view.dom;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpenRef.current) return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        event.stopPropagation();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        event.stopPropagation();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        executeCommand(selectedIndex);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        closeMenu();
      }
    };

    // Listen on the editor element in capture phase to intercept before ProseMirror
    editorElement.addEventListener('keydown', handleKeyDown, true);

    return () => {
      editorElement.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [editor, isOpen, selectedIndex, filteredCommands, executeCommand, closeMenu]);

  // Monitor editor updates to track the query text after the slash
  useEffect(() => {
    if (!editor || !isOpen) return;

    const handleUpdate = () => {
      if (!isOpenRef.current || slashPosRef.current < 0) return;

      const { state } = editor;
      const { selection } = state;
      const cursorPos = selection.from;
      const slashPos = slashPosRef.current;

      // If cursor moved before the slash, close menu
      if (cursorPos <= slashPos) {
        closeMenu();
        return;
      }

      // Extract the text between slash and cursor (the query)
      try {
        const queryText = state.doc.textBetween(slashPos + 1, cursorPos, undefined, '\ufffc');
        
        // If query contains a space or newline, close menu
        if (queryText.includes('\n')) {
          closeMenu();
          return;
        }

        setQuery(queryText);
        setSelectedIndex(0);
      } catch {
        closeMenu();
      }
    };

    editor.on('update', handleUpdate);
    editor.on('selectionUpdate', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
      editor.off('selectionUpdate', handleUpdate);
    };
  }, [editor, isOpen, closeMenu]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, closeMenu]);

  // Close if no results
  useEffect(() => {
    if (isOpen && filteredCommands.length === 0 && query.length > 2) {
      closeMenu();
    }
  }, [isOpen, filteredCommands.length, query, closeMenu]);

  // Reset selected index when filtered results change
  useEffect(() => {
    if (selectedIndex >= filteredCommands.length) {
      setSelectedIndex(Math.max(0, filteredCommands.length - 1));
    }
  }, [filteredCommands.length, selectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const selected = menuRef.current.querySelector('.slash-item.is-selected');
    if (selected) {
      selected.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, selectedIndex]);

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

  // Calculate safe position
  const safeLeft = Math.max(8, Math.min(
    position.left,
    typeof window !== 'undefined' ? window.innerWidth - 220 : position.left
  ));

  return (
    <div
      ref={menuRef}
      className="slash-menu"
      style={{
        position: 'fixed',
        top: position.top,
        left: safeLeft,
        zIndex: 9999,
      }}
    >
      {filteredCommands.map((cmd, index) => (
        <div
          key={cmd.title}
          className={`slash-item ${index === selectedIndex ? 'is-selected' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            executeCommand(index);
          }}
          onMouseEnter={() => setSelectedIndex(index)}
        >
          <span className="slash-icon">{cmd.icon}</span>
          <span className="slash-label">{cmd.title}</span>
        </div>
      ))}
    </div>
  );
}

export default SlashCommands;
