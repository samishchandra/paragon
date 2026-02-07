import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent, NodeViewProps } from '@tiptap/react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Info, AlertTriangle, XCircle, CheckCircle, FileText, ChevronDown } from 'lucide-react';

export type CalloutType = 'info' | 'warning' | 'error' | 'success' | 'note';

export interface CalloutOptions {
  HTMLAttributes: Record<string, unknown>;
  types: CalloutType[];
}

const calloutConfig: Record<CalloutType, { icon: typeof Info; label: string; color: string }> = {
  info: { icon: Info, label: 'Info', color: 'var(--callout-info)' },
  warning: { icon: AlertTriangle, label: 'Warning', color: 'var(--callout-warning)' },
  error: { icon: XCircle, label: 'Error', color: 'var(--callout-error)' },
  success: { icon: CheckCircle, label: 'Success', color: 'var(--callout-success)' },
  note: { icon: FileText, label: 'Note', color: 'var(--callout-note)' },
};

function CalloutDropdownPortal({
  buttonRef,
  type,
  onTypeChange,
  onClose,
  theme,
}: {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  type: CalloutType;
  onTypeChange: (type: CalloutType) => void;
  onClose: () => void;
  theme?: string;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number; flipped: boolean } | null>(null);

  // Estimated dropdown height (5 items * ~33px + padding)
  const DROPDOWN_HEIGHT = 185;

  // Calculate position based on button's bounding rect, flip upward if needed
  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Flip upward if not enough space below but enough above
    const shouldFlip = spaceBelow < DROPDOWN_HEIGHT + 8 && spaceAbove > DROPDOWN_HEIGHT + 8;

    setPosition({
      top: shouldFlip ? rect.top - DROPDOWN_HEIGHT - 4 : rect.bottom + 4,
      left: rect.left,
      flipped: shouldFlip,
    });
  }, [buttonRef]);

  useEffect(() => {
    updatePosition();

    // Reposition on scroll/resize
    const handleReposition = () => updatePosition();
    window.addEventListener('scroll', handleReposition, true);
    window.addEventListener('resize', handleReposition);

    return () => {
      window.removeEventListener('scroll', handleReposition, true);
      window.removeEventListener('resize', handleReposition);
    };
  }, [updatePosition]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as globalThis.Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as globalThis.Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [buttonRef, onClose]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!position) return null;

  const dropdown = (
    <div
      ref={dropdownRef}
      className={`callout-type-dropdown-portal ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 99999,
        maxHeight: DROPDOWN_HEIGHT,
        overflowY: 'auto',
      }}
    >
      {(Object.keys(calloutConfig) as CalloutType[]).map((calloutType) => {
        const typeConfig = calloutConfig[calloutType];
        const TypeIcon = typeConfig.icon;
        return (
          <button
            key={calloutType}
            className={`callout-type-option ${calloutType === type ? 'active' : ''}`}
            onClick={() => onTypeChange(calloutType)}
            style={{ '--callout-option-color': typeConfig.color } as React.CSSProperties}
          >
            <TypeIcon size={16} style={{ color: typeConfig.color }} />
            <span>{typeConfig.label}</span>
          </button>
        );
      })}
    </div>
  );

  return createPortal(dropdown, document.body);
}

function CalloutComponent({ node, updateAttributes, editor }: NodeViewProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const type = (node.attrs.type as CalloutType) || 'info';
  const config = calloutConfig[type] || calloutConfig.info;
  const Icon = config.icon;

  // Detect theme from closest data-theme attribute or .dark class
  const [theme, setTheme] = useState<string>('light');
  useEffect(() => {
    const editorEl = editor.view.dom.closest('[data-theme]');
    if (editorEl) {
      setTheme(editorEl.getAttribute('data-theme') || 'light');
    } else if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    }
  }, [editor]);

  const handleTypeChange = useCallback((newType: CalloutType) => {
    updateAttributes({ type: newType });
    setShowDropdown(false);
  }, [updateAttributes]);

  const handleClose = useCallback(() => {
    setShowDropdown(false);
  }, []);

  return (
    <NodeViewWrapper className={`callout callout-${type}`} data-callout="" data-type={type}>
      <div className="callout-icon-container">
        <button
          ref={buttonRef}
          className="callout-icon-button"
          onClick={() => editor.isEditable && setShowDropdown(!showDropdown)}
          title={editor.isEditable ? "Click to change callout type" : config.label}
          style={{ color: config.color }}
          contentEditable={false}
        >
          <Icon size={20} />
          {editor.isEditable && <ChevronDown size={12} className="callout-chevron" />}
        </button>

        {showDropdown && editor.isEditable && (
          <CalloutDropdownPortal
            buttonRef={buttonRef}
            type={type}
            onTypeChange={handleTypeChange}
            onClose={handleClose}
            theme={theme}
          />
        )}
      </div>
      <div className="callout-content">
        <NodeViewContent />
      </div>
    </NodeViewWrapper>
  );
}

export const CalloutWithMenu = Node.create<CalloutOptions>({
  name: 'callout',

  addOptions() {
    return {
      HTMLAttributes: {},
      types: ['info', 'warning', 'error', 'success', 'note'],
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
    return ReactNodeViewRenderer(CalloutComponent);
  },

  addCommands() {
    return {
      setCallout:
        (attributes?: { type?: CalloutType }) =>
        ({ commands }: { commands: { wrapIn: (name: string, attrs?: Record<string, unknown>) => boolean } }) => {
          return commands.wrapIn(this.name, attributes);
        },
      toggleCallout:
        (attributes?: { type?: CalloutType }) =>
        ({ commands }: { commands: { toggleWrap: (name: string, attrs?: Record<string, unknown>) => boolean } }) => {
          return commands.toggleWrap(this.name, attributes);
        },
      unsetCallout:
        () =>
        ({ commands }: { commands: { lift: (name: string) => boolean } }) => {
          return commands.lift(this.name);
        },
      insertCallout:
        (attributes?: { type?: CalloutType }) =>
        ({ chain }: { chain: () => ReturnType<typeof import('@tiptap/core').Editor.prototype.chain> }) => {
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
        ({ commands }: { commands: { updateAttributes: (name: string, attrs: Record<string, unknown>) => boolean } }) => {
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
