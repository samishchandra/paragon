import { Node, mergeAttributes } from '@tiptap/core';
import type { CommandProps } from '@tiptap/core';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import type { EditorView, NodeView } from '@tiptap/pm/view';

/*
 * PERFORMANCE (R10): Plain ProseMirror NodeView
 * Replaces ReactNodeViewRenderer to eliminate React reconciliation overhead.
 * The DOM is built once and updated incrementally via the `update()` method.
 *
 * Features preserved:
 * - Type selector dropdown (portal-based, 6 types with icons)
 * - Collapse/expand toggle with chevron
 * - Click-outside to close dropdown
 * - Scroll-to-close dropdown
 * - All CSS classes match the previous React output
 * - Inline SVG icons replace Lucide React components
 * - iOS Safari workaround (no contentEditable=false on header)
 * - DialogSafePortal-equivalent behavior for dropdown
 */

export type CalloutType = 'info' | 'note' | 'prompt' | 'resources' | 'todo' | 'summary';

export interface CalloutOptions {
  HTMLAttributes: Record<string, unknown>;
  types: CalloutType[];
}

// Module augmentation: declare custom commands so TypeScript recognises them
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: {
      setCallout: (attributes?: { type?: CalloutType }) => ReturnType;
      toggleCallout: (attributes?: { type?: CalloutType }) => ReturnType;
      unsetCallout: () => ReturnType;
      insertCallout: (attributes?: { type?: CalloutType }) => ReturnType;
      updateCalloutType: (type: CalloutType) => ReturnType;
    };
  }
}

// ─── SVG Icon Helpers ──────────────────────────────────────────────────────

const SVG_NS = 'http://www.w3.org/2000/svg';

interface SvgElement {
  tag: string;
  attrs: Record<string, string>;
}

function createSvgIconFromElements(elements: SvgElement[], size: number, className?: string): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  if (className) svg.setAttribute('class', className);
  for (const el of elements) {
    const node = document.createElementNS(SVG_NS, el.tag);
    for (const [key, val] of Object.entries(el.attrs)) {
      node.setAttribute(key, val);
    }
    svg.appendChild(node);
  }
  return svg;
}

// ─── Lucide Icon Definitions ───────────────────────────────────────────────

// Info icon (circle with "i")
const INFO_ELEMENTS: SvgElement[] = [
  { tag: 'circle', attrs: { cx: '12', cy: '12', r: '10' } },
  { tag: 'path', attrs: { d: 'M12 16v-4' } },
  { tag: 'path', attrs: { d: 'M12 8h.01' } },
];

// StickyNote icon
const STICKY_NOTE_ELEMENTS: SvgElement[] = [
  { tag: 'path', attrs: { d: 'M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z' } },
  { tag: 'path', attrs: { d: 'M15 3v4a2 2 0 0 0 2 2h4' } },
];

// MessageSquareText icon
const MESSAGE_SQUARE_TEXT_ELEMENTS: SvgElement[] = [
  { tag: 'path', attrs: { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' } },
  { tag: 'path', attrs: { d: 'M13 8H7' } },
  { tag: 'path', attrs: { d: 'M17 12H7' } },
];

// BookOpen icon
const BOOK_OPEN_ELEMENTS: SvgElement[] = [
  { tag: 'path', attrs: { d: 'M12 7v14' } },
  { tag: 'path', attrs: { d: 'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z' } },
];

// ListTodo icon
const LIST_TODO_ELEMENTS: SvgElement[] = [
  { tag: 'rect', attrs: { x: '3', y: '5', width: '6', height: '6', rx: '1' } },
  { tag: 'path', attrs: { d: 'm3 17 2 2 4-4' } },
  { tag: 'path', attrs: { d: 'M13 6h8' } },
  { tag: 'path', attrs: { d: 'M13 12h8' } },
  { tag: 'path', attrs: { d: 'M13 18h8' } },
];

// ClipboardList icon
const CLIPBOARD_LIST_ELEMENTS: SvgElement[] = [
  { tag: 'rect', attrs: { width: '8', height: '4', x: '8', y: '2', rx: '1', ry: '1' } },
  { tag: 'path', attrs: { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' } },
  { tag: 'path', attrs: { d: 'M12 11h4' } },
  { tag: 'path', attrs: { d: 'M12 16h4' } },
  { tag: 'path', attrs: { d: 'M8 11h.01' } },
  { tag: 'path', attrs: { d: 'M8 16h.01' } },
];

// ChevronDown icon
const CHEVRON_DOWN_ELEMENTS: SvgElement[] = [
  { tag: 'path', attrs: { d: 'm6 9 6 6 6-6' } },
];

// ChevronRight icon
const CHEVRON_RIGHT_ELEMENTS: SvgElement[] = [
  { tag: 'path', attrs: { d: 'm9 18 6-6-6-6' } },
];

// ─── Callout Configuration ─────────────────────────────────────────────────

interface CalloutConfig {
  iconElements: SvgElement[];
  label: string;
  color: string;
  borderColor: string;
}

const calloutConfig: Record<CalloutType, CalloutConfig> = {
  info: { iconElements: INFO_ELEMENTS, label: 'Info', color: 'var(--callout-info)', borderColor: 'var(--callout-info-border)' },
  note: { iconElements: STICKY_NOTE_ELEMENTS, label: 'Note', color: 'var(--callout-note)', borderColor: 'var(--callout-note-border)' },
  prompt: { iconElements: MESSAGE_SQUARE_TEXT_ELEMENTS, label: 'Prompt', color: 'var(--callout-prompt)', borderColor: 'var(--callout-prompt-border)' },
  resources: { iconElements: BOOK_OPEN_ELEMENTS, label: 'Resources', color: 'var(--callout-resources)', borderColor: 'var(--callout-resources-border)' },
  todo: { iconElements: LIST_TODO_ELEMENTS, label: 'Todo', color: 'var(--callout-todo)', borderColor: 'var(--callout-todo-border)' },
  summary: { iconElements: CLIPBOARD_LIST_ELEMENTS, label: 'Summary', color: 'var(--callout-summary)', borderColor: 'var(--callout-summary-border)' },
};

const CALLOUT_TYPES = Object.keys(calloutConfig) as CalloutType[];

// ─── Plain ProseMirror NodeView ────────────────────────────────────────────

class CalloutNodeView implements NodeView {
  node: ProseMirrorNode;
  view: EditorView;
  getPos: () => number | undefined;
  dom: HTMLElement;
  contentDOM: HTMLElement;

  // Internal state
  private collapsed = false;
  private showDropdown = false;

  // DOM references for incremental updates
  private headerButton: HTMLButtonElement;
  private headerIconContainer: HTMLSpanElement;
  private labelEl: HTMLSpanElement;
  private typeChevronEl: SVGSVGElement;
  private collapseIndicator: HTMLDivElement;
  private contentWrapper: HTMLDivElement;
  private headerEl: HTMLDivElement;

  // Portal dropdown
  private portalContainer: HTMLDivElement | null = null;
  private dropdownEl: HTMLDivElement | null = null;

  // Bound event handlers (for cleanup)
  private boundHandleClickOutside: (e: MouseEvent | TouchEvent) => void;
  private boundHandleScroll: () => void;

  constructor(node: ProseMirrorNode, view: EditorView, getPos: () => number | undefined) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;

    const type = (node.attrs.type as CalloutType) || 'info';
    const config = calloutConfig[type] || calloutConfig.info;

    // Bound handlers
    this.boundHandleClickOutside = this.handleClickOutside.bind(this);
    this.boundHandleScroll = this.closeDropdown.bind(this);

    // Build DOM structure matching the React output exactly
    this.dom = document.createElement('div');
    this.dom.className = `callout callout-${type}`;
    this.dom.setAttribute('data-callout', '');
    this.dom.setAttribute('data-type', type);
    this.dom.setAttribute('data-node-view-wrapper', '');

    // Header row
    // IMPORTANT: Do NOT use contentEditable=false here — on iOS Safari,
    // contentEditable boundaries inside a contentEditable editor corrupt
    // Safari's touch-to-click synthesis (TipTap issue #7514).
    this.headerEl = document.createElement('div');
    this.headerEl.className = 'callout-header';
    this.headerEl.style.cursor = 'pointer';
    this.headerEl.style.userSelect = 'none';
    (this.headerEl.style as any).webkitUserSelect = 'none';
    this.headerEl.title = 'Click to collapse';
    this.headerEl.addEventListener('click', this.handleHeaderClick);

    // Header button (icon + label + type chevron)
    this.headerButton = document.createElement('button');
    this.headerButton.className = 'callout-header-button';
    this.headerButton.title = view.editable ? 'Click to change callout type' : config.label;
    this.headerButton.style.color = config.borderColor;
    this.headerButton.style.userSelect = 'none';
    (this.headerButton.style as any).webkitUserSelect = 'none';
    this.headerButton.addEventListener('click', this.handleButtonClick);

    // Icon container (holds the type icon)
    this.headerIconContainer = document.createElement('span');
    this.headerIconContainer.style.display = 'flex';
    this.headerIconContainer.appendChild(createSvgIconFromElements(config.iconElements, 18));

    // Label
    this.labelEl = document.createElement('span');
    this.labelEl.className = 'callout-label';
    this.labelEl.textContent = config.label;

    // Type chevron (only shown when editable)
    this.typeChevronEl = createSvgIconFromElements(CHEVRON_DOWN_ELEMENTS, 12, 'callout-type-chevron');
    if (!view.editable) {
      this.typeChevronEl.style.display = 'none';
    }

    this.headerButton.appendChild(this.headerIconContainer);
    this.headerButton.appendChild(this.labelEl);
    this.headerButton.appendChild(this.typeChevronEl);

    // Collapse indicator
    this.collapseIndicator = document.createElement('div');
    this.collapseIndicator.className = 'callout-collapse-indicator';
    this.collapseIndicator.style.color = config.borderColor;
    this.collapseIndicator.appendChild(createSvgIconFromElements(CHEVRON_DOWN_ELEMENTS, 16));

    this.headerEl.appendChild(this.headerButton);
    this.headerEl.appendChild(this.collapseIndicator);

    // Content area
    this.contentWrapper = document.createElement('div');
    this.contentWrapper.className = 'callout-content';

    // contentDOM is where ProseMirror renders the node's block content
    this.contentDOM = document.createElement('div');
    this.contentWrapper.appendChild(this.contentDOM);

    this.dom.appendChild(this.headerEl);
    this.dom.appendChild(this.contentWrapper);
  }

  // ── Event Handlers ──

  private handleHeaderClick = (e: MouseEvent) => {
    // Don't toggle collapse if the button was clicked (button stops propagation)
    this.toggleCollapse();
  };

  private handleButtonClick = (e: MouseEvent) => {
    e.stopPropagation(); // Prevent header click (collapse) from firing
    if (!this.view.editable) return;
    this.toggleDropdown();
  };

  private toggleCollapse() {
    this.collapsed = !this.collapsed;
    if (this.collapsed) {
      this.dom.classList.add('callout-collapsed');
      this.contentWrapper.classList.add('callout-content-hidden');
      this.headerEl.title = 'Click to expand';
    } else {
      this.dom.classList.remove('callout-collapsed');
      this.contentWrapper.classList.remove('callout-content-hidden');
      this.headerEl.title = 'Click to collapse';
    }
    // Update collapse indicator icon
    this.collapseIndicator.innerHTML = '';
    this.collapseIndicator.appendChild(
      this.collapsed
        ? createSvgIconFromElements(CHEVRON_RIGHT_ELEMENTS, 16)
        : createSvgIconFromElements(CHEVRON_DOWN_ELEMENTS, 16)
    );
  }

  // ── Dropdown Portal ──

  private toggleDropdown() {
    if (this.showDropdown) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  private openDropdown() {
    this.showDropdown = true;

    // Calculate position from the button
    const rect = this.headerButton.getBoundingClientRect();

    // Create portal container (equivalent to DialogSafePortal)
    this.portalContainer = document.createElement('div');
    this.portalContainer.style.position = 'fixed';
    this.portalContainer.style.top = '0';
    this.portalContainer.style.left = '0';
    this.portalContainer.style.width = '0';
    this.portalContainer.style.height = '0';
    this.portalContainer.style.overflow = 'visible';
    this.portalContainer.style.zIndex = '99999';
    this.portalContainer.style.pointerEvents = 'auto';
    // Stop event propagation (DialogSafePortal behavior)
    this.portalContainer.addEventListener('mousedown', (e) => e.stopPropagation());
    this.portalContainer.addEventListener('pointerdown', (e) => e.stopPropagation());
    this.portalContainer.addEventListener('click', (e) => e.stopPropagation());

    // Detect dark mode for dropdown styling
    const isDark = document.documentElement.classList.contains('dark') ||
      document.documentElement.getAttribute('data-theme') === 'dark';

    // Create dropdown
    this.dropdownEl = document.createElement('div');
    this.dropdownEl.className = `callout-type-dropdown-portal ${isDark ? 'dark-theme' : 'light-theme'}`;
    this.dropdownEl.contentEditable = 'false';
    this.dropdownEl.style.position = 'fixed';
    this.dropdownEl.style.top = `${rect.bottom + 4}px`;
    this.dropdownEl.style.left = `${rect.left}px`;

    const currentType = (this.node.attrs.type as CalloutType) || 'info';

    // Populate dropdown options
    for (const calloutType of CALLOUT_TYPES) {
      const typeConfig = calloutConfig[calloutType];
      const option = document.createElement('button');
      option.className = `callout-type-option${calloutType === currentType ? ' active' : ''}`;
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleTypeChange(calloutType);
      });
      option.addEventListener('mousedown', (e) => e.stopPropagation());

      const icon = createSvgIconFromElements(typeConfig.iconElements, 16);
      icon.style.color = typeConfig.borderColor;

      const label = document.createElement('span');
      label.textContent = typeConfig.label;

      option.appendChild(icon);
      option.appendChild(label);
      this.dropdownEl.appendChild(option);
    }

    this.portalContainer.appendChild(this.dropdownEl);
    document.body.appendChild(this.portalContainer);

    // Register click-outside and scroll listeners
    // Use setTimeout to avoid the current click from immediately closing
    setTimeout(() => {
      document.addEventListener('mousedown', this.boundHandleClickOutside);
      document.addEventListener('touchstart', this.boundHandleClickOutside, { passive: true });
      window.addEventListener('scroll', this.boundHandleScroll, true);
    }, 0);
  }

  private closeDropdown() {
    if (!this.showDropdown) return;
    this.showDropdown = false;

    // Remove portal from DOM
    if (this.portalContainer && this.portalContainer.parentNode) {
      this.portalContainer.parentNode.removeChild(this.portalContainer);
    }
    this.portalContainer = null;
    this.dropdownEl = null;

    // Remove listeners
    document.removeEventListener('mousedown', this.boundHandleClickOutside);
    document.removeEventListener('touchstart', this.boundHandleClickOutside);
    window.removeEventListener('scroll', this.boundHandleScroll, true);
  }

  private handleClickOutside(e: MouseEvent | TouchEvent) {
    const target = e.target as HTMLElement;
    if (
      this.dropdownEl && !this.dropdownEl.contains(target) &&
      !this.headerButton.contains(target)
    ) {
      this.closeDropdown();
    }
  }

  private handleTypeChange(newType: CalloutType) {
    const pos = this.getPos();
    if (pos == null) return;

    this.view.dispatch(
      this.view.state.tr.setNodeMarkup(pos, undefined, {
        ...this.node.attrs,
        type: newType,
      })
    );
    this.closeDropdown();
  }

  // ── Update DOM for type change ──

  private applyType(type: CalloutType) {
    const config = calloutConfig[type] || calloutConfig.info;

    // Update wrapper class
    this.dom.className = `callout callout-${type}${this.collapsed ? ' callout-collapsed' : ''}`;
    this.dom.setAttribute('data-type', type);

    // Update header button
    this.headerButton.style.color = config.borderColor;
    this.headerButton.title = this.view.editable ? 'Click to change callout type' : config.label;

    // Update icon
    this.headerIconContainer.innerHTML = '';
    this.headerIconContainer.appendChild(createSvgIconFromElements(config.iconElements, 18));

    // Update label
    this.labelEl.textContent = config.label;

    // Update collapse indicator color
    this.collapseIndicator.style.color = config.borderColor;
  }

  // ── ProseMirror NodeView interface ──

  update(node: ProseMirrorNode): boolean {
    if (node.type !== this.node.type) return false;

    const oldType = this.node.attrs.type || 'info';
    const newType = node.attrs.type || 'info';
    this.node = node;

    if (oldType !== newType) {
      this.applyType(newType as CalloutType);
    }

    // Content changes are handled by ProseMirror via contentDOM
    return true;
  }

  selectNode() {
    this.dom.classList.add('ProseMirror-selectednode');
  }

  deselectNode() {
    this.dom.classList.remove('ProseMirror-selectednode');
  }

  destroy() {
    this.closeDropdown();
    this.headerEl.removeEventListener('click', this.handleHeaderClick);
    this.headerButton.removeEventListener('click', this.handleButtonClick);
  }

  ignoreMutation(mutation: MutationRecord | { type: 'selection'; target: globalThis.Node }): boolean {
    // Ignore mutations outside the content area (header, controls)
    if (!this.contentDOM.contains(mutation.target)) {
      return true;
    }
    return false;
  }

  stopEvent(event: Event): boolean {
    // Stop events from the header area from reaching ProseMirror
    const target = event.target as HTMLElement;
    if (target && this.headerEl.contains(target)) {
      return true;
    }
    // Stop events from the portal dropdown
    if (target && this.portalContainer && this.portalContainer.contains(target)) {
      return true;
    }
    return false;
  }
}

// ─── Extension Definition ──────────────────────────────────────────────────

export const CalloutWithMenu = Node.create<CalloutOptions>({
  name: 'callout',

  addOptions() {
    return {
      HTMLAttributes: {},
      types: ['info', 'note', 'prompt', 'resources', 'todo', 'summary'],
    };
  },

  content: 'block+',

  group: 'block',

  defining: true,

  addAttributes() {
    return {
      type: {
        default: 'info',
        parseHTML: (element: HTMLElement) => element.getAttribute('data-type') || 'info',
        renderHTML: (attributes: Record<string, unknown>) => ({
          'data-type': attributes.type,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-callout]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const type = node.attrs.type as CalloutType;
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-callout': '',
        'data-type': type,
        class: `callout callout-${type}`,
      }),
      0,
    ];
  },

  addNodeView() {
    return ({ node, view, getPos }) => {
      return new CalloutNodeView(node, view, getPos as () => number | undefined);
    };
  },

  addCommands() {
    return {
      setCallout:
        (attributes?: { type?: CalloutType }) =>
        ({ commands }: CommandProps) => {
          return commands.wrapIn(this.name, attributes);
        },
      toggleCallout:
        (attributes?: { type?: CalloutType }) =>
        ({ commands }: CommandProps) => {
          return commands.toggleWrap(this.name, attributes);
        },
      unsetCallout:
        () =>
        ({ commands }: CommandProps) => {
          return commands.lift(this.name);
        },
      insertCallout:
        (attributes?: { type?: CalloutType }) =>
        ({ chain }: CommandProps) => {
          const type = attributes?.type || 'info';
          return chain()
            .insertContent({
              type: this.name,
              attrs: { type },
              content: [{ type: 'paragraph' }],
            })
            .focus()
            .run();
        },
      updateCalloutType:
        (type: CalloutType) =>
        ({ commands }: CommandProps) => {
          return commands.updateAttributes(this.name, { type });
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-c': () => this.editor.commands.toggleCallout({ type: 'info' }),
    };
  },
});

export default CalloutWithMenu;
