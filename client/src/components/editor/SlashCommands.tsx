import { Editor } from '@tiptap/react';
import { useEffect, useState, useCallback, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
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
 * Rendered via portal to document.body for correct fixed positioning
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

// Menu height per item (padding + content)
const ITEM_HEIGHT = 28; // ~28px per item
const MENU_PADDING = 8; // 4px top + 4px bottom
const MENU_MAX_HEIGHT = 320;
const MENU_WIDTH = 210;
const VIEWPORT_MARGIN = 12;

/**
 * Get reliable viewport-relative cursor coordinates.
 * ProseMirror's coordsAtPos can be inaccurate when the editor is inside
 * scrollable containers or dialogs. We use the native Selection API instead,
 * which always returns correct viewport-relative coordinates via getBoundingClientRect.
 */
function getCursorViewportCoords(editor: Editor): { top: number; bottom: number; left: number } | null {
  try {
    // First try: use native window selection (most reliable for viewport coords)
    const domSelection = window.getSelection();
    if (domSelection && domSelection.rangeCount > 0) {
      const range = domSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      // getBoundingClientRect returns 0,0,0,0 for collapsed selections in some cases
      if (rect.width === 0 && rect.height === 0 && rect.top === 0) {
        // Fallback: create a temporary span at cursor position
        const tempSpan = document.createElement('span');
        tempSpan.textContent = '\u200b'; // zero-width space
        const clonedRange = range.cloneRange();
        clonedRange.insertNode(tempSpan);
        const spanRect = tempSpan.getBoundingClientRect();
        const coords = { top: spanRect.top, bottom: spanRect.bottom, left: spanRect.left };
        tempSpan.parentNode?.removeChild(tempSpan);
        // Restore selection
        domSelection.removeAllRanges();
        domSelection.addRange(range);
        return coords;
      }
      return { top: rect.top, bottom: rect.bottom, left: rect.left };
    }
    // Last resort: use ProseMirror coordsAtPos
    const pos = editor.state.selection.from;
    const coords = editor.view.coordsAtPos(pos);
    return { top: coords.top, bottom: coords.bottom, left: coords.left };
  } catch {
    return null;
  }
}

export function SlashCommands({ editor }: SlashCommandsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cursorCoords, setCursorCoords] = useState<{ top: number; bottom: number; left: number } | null>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageDialogPosition, setImageDialogPosition] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState<'below' | 'above'>('below');
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

  // Calculate actual menu height based on filtered items
  const menuHeight = Math.min(
    filteredCommands.length * ITEM_HEIGHT + MENU_PADDING,
    MENU_MAX_HEIGHT
  );

  // Compute position after render so we can measure the menu
  useLayoutEffect(() => {
    if (!isOpen || !cursorCoords) return;

    const { top: cursorTop, bottom: cursorBottom, left: cursorLeft } = cursorCoords;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Determine vertical placement
    const spaceBelow = viewportHeight - cursorBottom - VIEWPORT_MARGIN;
    const spaceAbove = cursorTop - VIEWPORT_MARGIN;

    let newPlacement: 'below' | 'above';
    if (spaceBelow >= menuHeight) {
      newPlacement = 'below';
    } else if (spaceAbove >= menuHeight) {
      newPlacement = 'above';
    } else {
      // Pick whichever side has more room
      newPlacement = spaceBelow >= spaceAbove ? 'below' : 'above';
    }
    setPlacement(newPlacement);

    // Clamp left so menu doesn't overflow viewport
    if (menuRef.current) {
      const safeLeft = Math.max(
        VIEWPORT_MARGIN,
        Math.min(cursorLeft, viewportWidth - MENU_WIDTH - VIEWPORT_MARGIN)
      );
      const top = newPlacement === 'below'
        ? cursorBottom + 4
        : cursorTop - menuHeight - 4;

      menuRef.current.style.top = `${top}px`;
      menuRef.current.style.left = `${safeLeft}px`;
    }
  }, [isOpen, cursorCoords, menuHeight, filteredCommands.length]);

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
    setCursorCoords(null);
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

      // Get cursor coordinates using reliable viewport-relative method
      const coords = getCursorViewportCoords(editor);
      if (!coords) return;

      setCursorCoords(coords);
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
        
        // If query contains a newline, close menu
        if (queryText.includes('\n')) {
          closeMenu();
          return;
        }

        setQuery(queryText);
        setSelectedIndex(0);

        // Update cursor coords — re-measure from native selection
        // The menu stays anchored near the slash position
        const coords = getCursorViewportCoords(editor);
        if (coords) {
          setCursorCoords(coords);
        }
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

  const animationClass = placement === 'below' ? 'slash-menu-below' : 'slash-menu-above';

  // Render via portal to document.body so position:fixed works correctly
  // regardless of parent overflow/transform contexts
  return createPortal(
    <div
      ref={menuRef}
      className={`slash-menu ${animationClass}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99999,
        pointerEvents: 'auto',
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
    </div>,
    document.body
  );
}

export default SlashCommands;
