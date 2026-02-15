import type { Editor } from '@tiptap/react';
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
export declare const TableOfContents: import("react").NamedExoticComponent<TableOfContentsProps>;
export default TableOfContents;
