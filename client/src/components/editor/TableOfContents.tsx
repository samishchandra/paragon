import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import type { Editor } from '@tiptap/react';
import { memo } from 'react';

/*
 * TABLE OF CONTENTS SIDEBAR
 * Modern, minimalistic component that displays document heading hierarchy.
 * Supports click-to-scroll, active heading tracking, collapsible sections,
 * and draggable width with localStorage persistence.
 *
 * Performance optimizations:
 * - Incremental heading extraction: only updates state when headings actually change
 * - Memoized individual TOC items: each item only re-renders when its data or active state changes
 * - Windowed rendering for flat list: only renders items visible in the scroll viewport
 * - Stable refs for callbacks to avoid cascading re-renders
 */

const TOC_WIDTH_STORAGE_KEY = 'paragon-editor-toc-width';
const TOC_DEFAULT_WIDTH = 280; // px — wider default
const TOC_MIN_WIDTH = 200;
const TOC_MAX_WIDTH = 500;

/** Height of each TOC item in pixels (must match CSS) */
const TOC_ITEM_HEIGHT = 30;
/** Number of extra items to render above/below the visible area */
const OVERSCAN_COUNT = 5;

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

/**
 * Create a fingerprint string for a headings array.
 * Used to detect whether headings actually changed (avoiding unnecessary React state updates).
 */
function headingsFingerprint(headings: TocItem[]): string {
  // Fast path: just join pos+level+text for each heading
  let fp = '';
  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    fp += `${h.pos}:${h.level}:${h.text};`;
  }
  return fp;
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

// ── Memoized individual TOC item component ──
// Only re-renders when its own props change (not when other items' active state changes)
interface TocItemRowProps {
  item: TocItem;
  isActive: boolean;
  minLevel: number;
  showLevelIndicators: boolean;
  hasChildren: boolean;
  isCollapsed: boolean;
  treeView: boolean;
  onItemClick: (item: TocItem) => void;
  onToggleCollapse: (id: string) => void;
  style?: React.CSSProperties;
}

const TocItemRow = memo(function TocItemRow({
  item,
  isActive,
  minLevel,
  showLevelIndicators,
  hasChildren,
  isCollapsed,
  treeView,
  onItemClick,
  onToggleCollapse,
  style,
}: TocItemRowProps) {
  const indent = (item.level - minLevel) * 14;

  return (
    <div
      className={`toc-item ${isActive ? 'toc-item-active' : ''} toc-level-${item.level}`}
      style={{ paddingLeft: `${indent + 10}px`, ...style }}
    >
      <button
        className="toc-item-button"
        onClick={() => onItemClick(item)}
        title={item.text}
      >
        {treeView && hasChildren && (
          <span
            className="toc-collapse-toggle"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCollapse(item.id);
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
});

// ── Virtualized flat list ──
// Only renders items visible in the scroll viewport + overscan
interface VirtualizedTocListProps {
  headings: TocItem[];
  activeId: string | null;
  minLevel: number;
  showLevelIndicators: boolean;
  onItemClick: (item: TocItem) => void;
  onToggleCollapse: (id: string) => void;
}

const VirtualizedTocList = memo(function VirtualizedTocList({
  headings,
  activeId,
  minLevel,
  showLevelIndicators,
  onItemClick,
  onToggleCollapse,
}: VirtualizedTocListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  // Measure container height on mount and resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      setContainerHeight(container.clientHeight);
    };
    measure();

    // Use ResizeObserver for dynamic height changes
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(measure);
      observer.observe(container);
    }

    return () => {
      observer?.disconnect();
    };
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Calculate visible range
  const totalHeight = headings.length * TOC_ITEM_HEIGHT;
  const startIndex = Math.max(0, Math.floor(scrollTop / TOC_ITEM_HEIGHT) - OVERSCAN_COUNT);
  const endIndex = Math.min(
    headings.length,
    Math.ceil((scrollTop + containerHeight) / TOC_ITEM_HEIGHT) + OVERSCAN_COUNT
  );

  // Render only visible items
  const visibleItems = useMemo(() => {
    const items: React.ReactNode[] = [];
    for (let i = startIndex; i < endIndex; i++) {
      const item = headings[i];
      items.push(
        <TocItemRow
          key={item.id}
          item={item}
          isActive={activeId === item.id}
          minLevel={minLevel}
          showLevelIndicators={showLevelIndicators}
          hasChildren={false}
          isCollapsed={false}
          treeView={false}
          onItemClick={onItemClick}
          onToggleCollapse={onToggleCollapse}
          style={{
            position: 'absolute',
            top: `${i * TOC_ITEM_HEIGHT}px`,
            left: 0,
            right: 0,
            height: `${TOC_ITEM_HEIGHT}px`,
          }}
        />
      );
    }
    return items;
  }, [headings, startIndex, endIndex, activeId, minLevel, showLevelIndicators, onItemClick, onToggleCollapse]);

  // For small lists (< 30 items), skip virtualization overhead
  if (headings.length < 30) {
    return (
      <>
        {headings.map(item => (
          <TocItemRow
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            minLevel={minLevel}
            showLevelIndicators={showLevelIndicators}
            hasChildren={false}
            isCollapsed={false}
            treeView={false}
            onItemClick={onItemClick}
            onToggleCollapse={onToggleCollapse}
          />
        ))}
      </>
    );
  }

  return (
    <div
      ref={containerRef}
      className="toc-virtual-container"
      onScroll={handleScroll}
      style={{
        height: '100%',
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <div
        style={{
          height: `${totalHeight}px`,
          position: 'relative',
        }}
      >
        {visibleItems}
      </div>
    </div>
  );
});

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
  // Fingerprint of the last headings array — used to skip no-op state updates
  const lastFingerprintRef = useRef('');

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

  // Incremental heading extraction — only updates state when headings actually change
  const updateHeadings = useCallback(() => {
    if (!editor || editor.isDestroyed) return;
    const newHeadings = extractHeadings(editor, minLevel, maxLevel);
    const fp = headingsFingerprint(newHeadings);
    // Skip state update if headings haven't changed (most common case during typing)
    if (fp === lastFingerprintRef.current) return;
    lastFingerprintRef.current = fp;
    setHeadings(newHeadings);
  }, [editor, minLevel, maxLevel]);

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

  // Tree view rendering with memoized items
  const renderTreeItem = useCallback((item: TocItem, depth: number = 0): React.ReactNode => {
    if (renderItem) {
      const isActive = activeId === item.id;
      return renderItem(item, isActive, () => handleItemClick(item));
    }

    const isActive = activeId === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isCollapsed = collapsedSections.has(item.id);

    return (
      <div key={item.id}>
        <TocItemRow
          item={item}
          isActive={isActive}
          minLevel={minLevel}
          showLevelIndicators={showLevelIndicators}
          hasChildren={!!hasChildren}
          isCollapsed={isCollapsed}
          treeView={true}
          onItemClick={handleItemClick}
          onToggleCollapse={toggleCollapse}
        />
        {hasChildren && !isCollapsed && (
          <div className="toc-children">
            {item.children!.map(child => renderTreeItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  }, [activeId, collapsedSections, handleItemClick, toggleCollapse, minLevel, showLevelIndicators, renderItem]);

  const renderTree = useCallback((items: TocItem[]): React.ReactNode => {
    return items.map(item => renderTreeItem(item));
  }, [renderTreeItem]);

  // For flat list with custom renderItem, fall back to simple rendering
  const renderCustomFlatList = useCallback(() => {
    if (!renderItem) return null;
    return headings.map(item => {
      const isActive = activeId === item.id;
      return (
        <div key={item.id}>
          {renderItem(item, isActive, () => handleItemClick(item))}
        </div>
      );
    });
  }, [headings, activeId, renderItem, handleItemClick]);

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
                {treeView
                  ? renderTree(treeItems)
                  : renderItem
                    ? renderCustomFlatList()
                    : (
                      <VirtualizedTocList
                        headings={headings}
                        activeId={activeId}
                        minLevel={minLevel}
                        showLevelIndicators={showLevelIndicators}
                        onItemClick={handleItemClick}
                        onToggleCollapse={toggleCollapse}
                      />
                    )
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

export default TableOfContents;
