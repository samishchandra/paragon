/**
 * Shared style constants for consistent UI across components.
 * Centralizes hover, selected, and dragging states so future
 * changes only need to be made in one place.
 */

// ── Item row states ──────────────────────────────────────────────

/** Background + ring for the currently selected item row */
export const ITEM_SELECTED = 'bg-primary/8';

/** Hover background for unselected item rows */
export const ITEM_HOVER = 'hover:bg-muted/50';

/** Background + ring for an item being dragged */
export const ITEM_DRAGGING = 'bg-primary/8 ring-1 ring-primary/20';

/** Ternary helper: returns selected or hover class based on condition */
export const itemRowState = (isSelected: boolean) =>
  isSelected ? ITEM_SELECTED : ITEM_HOVER;

// ── Middle panel item card ───────────────────────────────────────

/** Default item card border + hover */
export const CARD_DEFAULT = 'hover:bg-muted/50 border border-transparent hover:border-border/30';

/** Selected item card highlight */
export const CARD_SELECTED_SUFFIX = 'bg-primary/8 border-primary/20';

// ── Pill hover ring ──────────────────────────────────────────────

/** Hover ring effect used on pill components */
export const PILL_HOVER_RING = 'hover:ring-2 hover:ring-primary/20 hover:shadow-sm';

// ── Sidebar nav item states ─────────────────────────────────────

/** Active/selected sidebar nav item */
export const SIDEBAR_NAV_SELECTED = 'bg-primary/8 text-sidebar-accent-foreground';

/** Default (unselected) sidebar nav item with hover */
export const SIDEBAR_NAV_DEFAULT = 'text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground';

/** Ternary helper: returns selected or default sidebar nav class */
export const sidebarNavState = (isSelected: boolean) =>
  isSelected ? SIDEBAR_NAV_SELECTED : SIDEBAR_NAV_DEFAULT;

/** Sidebar drag-over highlight */
export const SIDEBAR_DRAG_OVER = 'bg-primary/20 ring-2 ring-primary ring-inset scale-[1.02]';

/** Sidebar icon button hover (e.g., add/edit buttons next to section headers) */
export const SIDEBAR_ICON_BUTTON = 'h-6 w-6 flex items-center justify-center rounded hover:bg-sidebar-accent transition-all duration-200 cursor-pointer';

/** Sidebar section header icon button hover (e.g., collapse/expand, add) */
export const SIDEBAR_HEADER_BUTTON = 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-md p-1 transition-colors';

/** Sidebar filter chip active state (e.g., Now/Next/Later/Someday) */
export const SIDEBAR_FILTER_ACTIVE = 'text-primary bg-primary/10';

/** Default sidebar nav for bottom items (slightly lower opacity) */
export const SIDEBAR_NAV_DEFAULT_SUBTLE = 'text-sidebar-foreground/70 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground';
