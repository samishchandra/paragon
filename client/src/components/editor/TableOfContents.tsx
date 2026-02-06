import { useEffect, useState, useCallback, useRef } from 'react';
import { List, ChevronRight, ChevronDown, PanelRightClose, PanelRightOpen } from 'lucide-react';
import type { Editor } from '@tiptap/react';

/*
 * TABLE OF CONTENTS SIDEBAR
 * Modular, configurable component that displays document heading hierarchy
 * Supports click-to-scroll, active heading tracking, and collapsible sections
 */

export interface TocItem {
  /** Unique ID for the heading */
  id: string;
  /** Heading text content */
  text: string;
  /** Heading level (1-6) */
  level: number;
  /** Position in the document (ProseMirror position) */
  pos: number;
  /** DOM element reference for scrolling */
  element?: HTMLElement | null;
  /** Whether this section is collapsed in TOC */
  isCollapsed?: boolean;
  /** Children items (for tree view) */
  children?: TocItem[];
}

export interface TableOfContentsProps {
  /** TipTap editor instance */
  editor: Editor | null;
  /** Whether the TOC sidebar is visible (default: true) */
  visible?: boolean;
  /** Callback when visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
  /** Title for the TOC panel (default: 'Table of Contents') */
  title?: string;
  /** Minimum heading level to include (default: 1) */
  minLevel?: number;
  /** Maximum heading level to include (default: 4) */
  maxLevel?: number;
  /** Whether to show heading level indicators (default: true) */
  showLevelIndicators?: boolean;
  /** Whether to highlight the active heading (default: true) */
  highlightActive?: boolean;
  /** Whether to show a tree view with collapsible sections (default: false) */
  treeView?: boolean;
  /** Custom CSS class for the TOC container */
  className?: string;
  /** Width of the TOC sidebar (default: '240px') */
  width?: string;
  /** Position of the TOC sidebar (default: 'right') */
  position?: 'left' | 'right';
  /** Scroll offset when clicking a heading (default: 20) */
  scrollOffset?: number;
  /** Callback when a TOC item is clicked */
  onItemClick?: (item: TocItem) => void;
  /** Custom render function for TOC items */
  renderItem?: (item: TocItem, isActive: boolean, onClick: () => void) => React.ReactNode;
  /** Whether to show the toggle button (default: true) */
  showToggleButton?: boolean;
  /** Scroll container ref - if provided, scrolls within this container instead of the editor wrapper */
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

/**
 * Extract headings from the TipTap editor document
 */
function extractHeadings(editor: Editor, minLevel: number, maxLevel: number): TocItem[] {
  const headings: TocItem[] = [];
  const doc = editor.state.doc;

  doc.descendants((node, pos) => {
    if (node.type.name === 'heading') {
      const level = node.attrs.level as number;
      if (level >= minLevel && level <= maxLevel) {
        const text = node.textContent;
        if (text.trim()) {
          headings.push({
            id: `toc-heading-${pos}`,
            text: text.trim(),
            level,
            pos,
          });
        }
      }
    }
  });

  return headings;
}

/**
 * Build a tree structure from flat headings list
 */
function buildTree(headings: TocItem[]): TocItem[] {
  if (headings.length === 0) return [];

  const root: TocItem[] = [];
  const stack: { item: TocItem; level: number }[] = [];

  for (const heading of headings) {
    const item: TocItem = { ...heading, children: [] };

    // Pop items from stack that are at the same or deeper level
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(item);
    } else {
      const parent = stack[stack.length - 1].item;
      if (!parent.children) parent.children = [];
      parent.children.push(item);
    }

    stack.push({ item, level: heading.level });
  }

  return root;
}

/**
 * Find the DOM element for a heading at a given ProseMirror position
 */
function findHeadingElement(editor: Editor, pos: number): HTMLElement | null {
  try {
    const resolvedPos = editor.state.doc.resolve(pos);
    const dom = editor.view.nodeDOM(resolvedPos.before(resolvedPos.depth + 1));
    if (dom instanceof HTMLElement) return dom;
    // Try direct position
    const directDom = editor.view.nodeDOM(pos);
    if (directDom instanceof HTMLElement) return directDom;
  } catch {
    // Fallback: find by text content
  }
  return null;
}

/**
 * TableOfContents Component
 * Renders a sidebar with document heading hierarchy and click-to-scroll navigation
 */
export function TableOfContents({
  editor,
  visible = true,
  onVisibilityChange,
  title = 'Table of Contents',
  minLevel = 1,
  maxLevel = 4,
  showLevelIndicators = true,
  highlightActive = true,
  treeView = false,
  className = '',
  width = '240px',
  position = 'right',
  scrollOffset = 20,
  onItemClick,
  renderItem,
  showToggleButton = true,
  scrollContainerRef,
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(visible);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const tocRef = useRef<HTMLDivElement>(null);
  const updateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync visibility with prop
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  // Extract headings from editor content
  const updateHeadings = useCallback(() => {
    if (!editor || editor.isDestroyed) return;

    const newHeadings = extractHeadings(editor, minLevel, maxLevel);
    setHeadings(newHeadings);

    // If active heading no longer exists, clear it
    if (activeId && !newHeadings.find(h => h.id === activeId)) {
      setActiveId(null);
    }
  }, [editor, minLevel, maxLevel, activeId]);

  // Debounced heading update on content changes
  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      updateTimeoutRef.current = setTimeout(() => {
        updateHeadings();
      }, 300);
    };

    // Initial extraction
    updateHeadings();

    // Listen for content changes
    editor.on('update', handleUpdate);
    editor.on('create', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
      editor.off('create', handleUpdate);
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [editor, updateHeadings]);

  // Track active heading based on scroll position
  useEffect(() => {
    if (!editor || !highlightActive || !isVisible || headings.length === 0) return;

    const scrollContainer = scrollContainerRef?.current || 
      editor.view.dom.closest('.editor-content-wrapper') as HTMLElement;
    
    if (!scrollContainer) return;

    const handleScroll = () => {
      const containerRect = scrollContainer.getBoundingClientRect();
      const scrollTop = scrollContainer.scrollTop;
      let currentActive: string | null = null;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        const element = findHeadingElement(editor, heading.pos);
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const relativeTop = elementRect.top - containerRect.top;
          
          if (relativeTop <= scrollOffset + 10) {
            currentActive = heading.id;
            break;
          }
        }
      }

      // If no heading is above the scroll threshold, activate the first one
      if (!currentActive && headings.length > 0) {
        currentActive = headings[0].id;
      }

      setActiveId(currentActive);
    };

    // Debounce scroll handler
    let rafId: number;
    const debouncedScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    scrollContainer.addEventListener('scroll', debouncedScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', debouncedScroll);
      cancelAnimationFrame(rafId);
    };
  }, [editor, headings, highlightActive, isVisible, scrollOffset, scrollContainerRef]);

  // Handle click on a TOC item - scroll to the heading
  const handleItemClick = useCallback((item: TocItem) => {
    if (!editor || editor.isDestroyed) return;

    // Find the DOM element for this heading
    const element = findHeadingElement(editor, item.pos);
    
    if (element) {
      const scrollContainer = scrollContainerRef?.current || 
        editor.view.dom.closest('.editor-content-wrapper') as HTMLElement;
      
      if (scrollContainer) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const relativeTop = elementRect.top - containerRect.top + scrollContainer.scrollTop;
        
        scrollContainer.scrollTo({
          top: relativeTop - scrollOffset,
          behavior: 'smooth',
        });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // Also set cursor position to the heading
    try {
      editor.commands.setTextSelection(item.pos + 1);
    } catch {
      // Position might be invalid if content changed
    }

    setActiveId(item.id);
    onItemClick?.(item);
  }, [editor, scrollOffset, onItemClick, scrollContainerRef]);

  // Toggle visibility
  const toggleVisibility = useCallback(() => {
    const newVisible = !isVisible;
    setIsVisible(newVisible);
    onVisibilityChange?.(newVisible);
  }, [isVisible, onVisibilityChange]);

  // Toggle section collapse in tree view
  const toggleCollapse = useCallback((id: string) => {
    setCollapsedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Render a single TOC item
  const renderTocItem = useCallback((item: TocItem, isActive: boolean, depth: number = 0) => {
    if (renderItem) {
      return renderItem(item, isActive, () => handleItemClick(item));
    }

    const indent = treeView ? depth * 12 : (item.level - minLevel) * 16;
    const hasChildren = treeView && item.children && item.children.length > 0;
    const isCollapsed = collapsedSections.has(item.id);

    return (
      <div
        key={item.id}
        className={`toc-item ${isActive ? 'toc-item-active' : ''} toc-level-${item.level}`}
        style={{ paddingLeft: `${indent + 12}px` }}
      >
        <button
          className="toc-item-button"
          onClick={() => handleItemClick(item)}
          title={item.text}
        >
          {hasChildren && (
            <span
              className="toc-collapse-toggle"
              onClick={(e) => {
                e.stopPropagation();
                toggleCollapse(item.id);
              }}
            >
              {isCollapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
            </span>
          )}
          {showLevelIndicators && (
            <span className="toc-level-indicator">H{item.level}</span>
          )}
          <span className="toc-item-text">{item.text}</span>
        </button>
      </div>
    );
  }, [renderItem, handleItemClick, treeView, minLevel, showLevelIndicators, collapsedSections, toggleCollapse]);

  // Render tree recursively
  const renderTree = useCallback((items: TocItem[], depth: number = 0): React.ReactNode => {
    return items.map(item => {
      const isActive = activeId === item.id;
      const isCollapsed = collapsedSections.has(item.id);
      const hasChildren = item.children && item.children.length > 0;

      return (
        <div key={item.id}>
          {renderTocItem(item, isActive, depth)}
          {hasChildren && !isCollapsed && (
            <div className="toc-children">
              {renderTree(item.children!, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  }, [activeId, collapsedSections, renderTocItem]);

  // Render flat list
  const renderFlatList = useCallback(() => {
    return headings.map(item => {
      const isActive = activeId === item.id;
      return renderTocItem(item, isActive);
    });
  }, [headings, activeId, renderTocItem]);

  if (!editor) return null;

  const treeItems = treeView ? buildTree(headings) : [];

  return (
    <>
      {/* Toggle button - always visible */}
      {showToggleButton && (
        <button
          className={`toc-toggle-button toc-toggle-${position}`}
          onClick={toggleVisibility}
          title={isVisible ? 'Hide Table of Contents' : 'Show Table of Contents'}
        >
          {isVisible ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
        </button>
      )}

      {/* TOC Sidebar */}
      <div
        ref={tocRef}
        className={`toc-sidebar ${isVisible ? 'toc-visible' : 'toc-hidden'} toc-${position} ${className}`}
        style={{ width: isVisible ? width : '0px' }}
      >
        <div className="toc-inner">
          {/* Header */}
          <div className="toc-header">
            <List size={16} />
            <span className="toc-title">{title}</span>
            <span className="toc-count">{headings.length}</span>
          </div>

          {/* Content */}
          <div className="toc-content">
            {headings.length === 0 ? (
              <div className="toc-empty">
                <p>No headings found</p>
                <p className="toc-empty-hint">Add headings to your document to see the table of contents.</p>
              </div>
            ) : (
              <div className="toc-list">
                {treeView ? renderTree(treeItems) : renderFlatList()}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TableOfContents;
