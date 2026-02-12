import { useEffect, useState, useCallback, useRef } from 'react';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import type { Editor } from '@tiptap/react';
import { memo } from 'react';

/*
 * TABLE OF CONTENTS SIDEBAR
 * Modern, minimalistic component that displays document heading hierarchy
 * Supports click-to-scroll, active heading tracking, collapsible sections,
 * and draggable width with localStorage persistence.
 */

const TOC_WIDTH_STORAGE_KEY = 'paragon-editor-toc-width';
const TOC_DEFAULT_WIDTH = 280; // px — wider default
const TOC_MIN_WIDTH = 200;
const TOC_MAX_WIDTH = 500;

/** Get stored width from localStorage, or return default */
function getStoredWidth(): number {
  try {
    const stored = localStorage.getItem(TOC_WIDTH_STORAGE_KEY);
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed >= TOC_MIN_WIDTH && parsed <= TOC_MAX_WIDTH) {
        return parsed;
      }
    }
  } catch {
    // localStorage not available
  }
  return TOC_DEFAULT_WIDTH;
}

/** Store width to localStorage */
function storeWidth(width: number) {
  try {
    localStorage.setItem(TOC_WIDTH_STORAGE_KEY, String(width));
  } catch {
    // localStorage not available
  }
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
  pos: number;
  element?: HTMLElement | null;
  isCollapsed?: boolean;
  children?: TocItem[];
}

export interface TableOfContentsProps {
  editor: Editor | null;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  title?: string;
  minLevel?: number;
  maxLevel?: number;
  showLevelIndicators?: boolean;
  highlightActive?: boolean;
  treeView?: boolean;
  className?: string;
  width?: string;
  position?: 'left' | 'right';
  scrollOffset?: number;
  onItemClick?: (item: TocItem) => void;
  renderItem?: (item: TocItem, isActive: boolean, onClick: () => void) => React.ReactNode;
  showToggleButton?: boolean;
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

function extractHeadings(editor: Editor, minLevel: number, maxLevel: number): TocItem[] {
  const headings: TocItem[] = [];
  const doc = editor.state.doc;
  doc.descendants((node, pos) => {
    if (node.type.name === 'heading') {
      const level = node.attrs.level as number;
      if (level >= minLevel && level <= maxLevel) {
        const text = node.textContent;
        if (text.trim()) {
          headings.push({ id: `toc-heading-${pos}`, text: text.trim(), level, pos });
        }
      }
    }
  });
  return headings;
}

function buildTree(headings: TocItem[]): TocItem[] {
  if (headings.length === 0) return [];
  const root: TocItem[] = [];
  const stack: { item: TocItem; level: number }[] = [];
  for (const heading of headings) {
    const item: TocItem = { ...heading, children: [] };
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

function findHeadingElement(editor: Editor, pos: number): HTMLElement | null {
  try {
    const resolvedPos = editor.state.doc.resolve(pos);
    const dom = editor.view.nodeDOM(resolvedPos.before(resolvedPos.depth + 1));
    if (dom instanceof HTMLElement) return dom;
    const directDom = editor.view.nodeDOM(pos);
    if (directDom instanceof HTMLElement) return directDom;
  } catch {
    // fallback
  }
  return null;
}

export const TableOfContents = memo(function TableOfContents({
  editor,
  visible = true,
  onVisibilityChange,
  title = '',
  minLevel = 1,
  maxLevel = 4,
  showLevelIndicators = false,
  highlightActive = true,
  treeView = false,
  className = '',
  width,
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
  const [tocWidth, setTocWidth] = useState<number>(() => {
    // If a width prop is provided, parse it; otherwise use stored/default
    if (width) {
      const parsed = parseInt(width, 10);
      return !isNaN(parsed) ? parsed : getStoredWidth();
    }
    return getStoredWidth();
  });
  const tocRef = useRef<HTMLDivElement>(null);
  const updateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartWidthRef = useRef(0);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  // ── Drag-to-resize logic ──
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartWidthRef.current = tocWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [tocWidth]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const delta = position === 'right'
        ? dragStartXRef.current - e.clientX  // dragging left = wider for right panel
        : e.clientX - dragStartXRef.current; // dragging right = wider for left panel
      const newWidth = Math.min(TOC_MAX_WIDTH, Math.max(TOC_MIN_WIDTH, dragStartWidthRef.current + delta));
      setTocWidth(newWidth);
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      // Persist the width
      setTocWidth(prev => {
        storeWidth(prev);
        return prev;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [position]);

  const updateHeadings = useCallback(() => {
    if (!editor || editor.isDestroyed) return;
    const newHeadings = extractHeadings(editor, minLevel, maxLevel);
    setHeadings(newHeadings);
    if (activeId && !newHeadings.find(h => h.id === activeId)) {
      setActiveId(null);
    }
  }, [editor, minLevel, maxLevel, activeId]);

  useEffect(() => {
    if (!editor) return;
    const handleUpdate = () => {
      if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
      updateTimeoutRef.current = setTimeout(() => updateHeadings(), 300);
    };
    updateHeadings();
    editor.on('update', handleUpdate);
    editor.on('create', handleUpdate);
    return () => {
      editor.off('update', handleUpdate);
      editor.off('create', handleUpdate);
      if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
    };
  }, [editor, updateHeadings]);

  useEffect(() => {
    if (!editor || !highlightActive || !isVisible || headings.length === 0) return;
    const scrollContainer = scrollContainerRef?.current ||
      editor.view.dom.closest('.editor-content-wrapper') as HTMLElement;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const containerRect = scrollContainer.getBoundingClientRect();
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
      if (!currentActive && headings.length > 0) {
        currentActive = headings[0].id;
      }
      setActiveId(currentActive);
    };

    let rafId: number;
    const debouncedScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };
    scrollContainer.addEventListener('scroll', debouncedScroll, { passive: true });
    handleScroll();
    return () => {
      scrollContainer.removeEventListener('scroll', debouncedScroll);
      cancelAnimationFrame(rafId);
    };
  }, [editor, headings, highlightActive, isVisible, scrollOffset, scrollContainerRef]);

  const handleItemClick = useCallback((item: TocItem) => {
    if (!editor || editor.isDestroyed) return;
    const element = findHeadingElement(editor, item.pos);
    if (element) {
      const scrollContainer = scrollContainerRef?.current ||
        editor.view.dom.closest('.editor-content-wrapper') as HTMLElement;
      if (scrollContainer) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const relativeTop = elementRect.top - containerRect.top + scrollContainer.scrollTop;
        scrollContainer.scrollTo({ top: relativeTop - scrollOffset, behavior: 'smooth' });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    try {
      editor.commands.setTextSelection(item.pos + 1);
    } catch {
      // Position might be invalid
    }
    setActiveId(item.id);
    onItemClick?.(item);
  }, [editor, scrollOffset, onItemClick, scrollContainerRef]);

  const toggleVisibility = useCallback(() => {
    const newVisible = !isVisible;
    setIsVisible(newVisible);
    onVisibilityChange?.(newVisible);
  }, [isVisible, onVisibilityChange]);

  const toggleCollapse = useCallback((id: string) => {
    setCollapsedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const renderTocItem = useCallback((item: TocItem, isActive: boolean, depth: number = 0) => {
    if (renderItem) {
      return renderItem(item, isActive, () => handleItemClick(item));
    }

    const indent = (item.level - minLevel) * 14;
    const hasChildren = treeView && item.children && item.children.length > 0;
    const isCollapsed = collapsedSections.has(item.id);

    return (
      <div
        key={item.id}
        className={`toc-item ${isActive ? 'toc-item-active' : ''} toc-level-${item.level}`}
        style={{ paddingLeft: `${indent + 10}px` }}
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
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                {isCollapsed
                  ? <path d="M3.5 2L7 5L3.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  : <path d="M2 3.5L5 7L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                }
              </svg>
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
      {/* Toggle button — positioned outside the sidebar so it doesn't overlap content */}
      {showToggleButton && (
        <button
          className={`toc-toggle-button toc-toggle-${position}`}
          onClick={toggleVisibility}
          title={isVisible ? 'Hide Table of Contents' : 'Show Table of Contents'}
        >
          {isVisible ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
        </button>
      )}

      {/* TOC Sidebar */}
      <div
        ref={tocRef}
        className={`toc-sidebar ${isVisible ? 'toc-visible' : 'toc-hidden'} toc-${position} ${className}`}
        style={{ width: isVisible ? `${tocWidth}px` : '0px' }}
      >
        {/* Drag handle for resizing — on the edge facing the editor */}
        {isVisible && (
          <div
            className={`toc-resize-handle toc-resize-${position}`}
            onMouseDown={handleDragStart}
          />
        )}

        <div className="toc-inner">
          {/* Optional header - only show if title is provided */}
          {title && (
            <div className="toc-header">
              <span className="toc-title">{title}</span>
            </div>
          )}

          {/* Content — add top padding to avoid overlap with toggle button */}
          <div className="toc-content toc-content-with-toggle">
            {headings.length === 0 ? (
              <div className="toc-empty">
                <p>No headings yet</p>
                <p className="toc-empty-hint">Add headings to see the outline.</p>
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
});

export default TableOfContents;
