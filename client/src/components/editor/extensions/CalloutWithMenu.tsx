import { Node, mergeAttributes } from '@tiptap/core';
import type { CommandProps } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent, NodeViewProps } from '@tiptap/react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Info, StickyNote, MessageSquareText, BookOpen, ListTodo, ChevronDown, ChevronRight } from 'lucide-react';

export type CalloutType = 'info' | 'note' | 'prompt' | 'resources' | 'todo';

export interface CalloutOptions {
  HTMLAttributes: Record<string, unknown>;
  types: CalloutType[];
}

// Module augmentation: declare custom commands so TypeScript recognises them
// on editor.commands.* and in addCommands return type.
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

const calloutConfig: Record<CalloutType, { icon: typeof Info; label: string; color: string; borderColor: string }> = {
  info: { icon: Info, label: 'Info', color: 'var(--callout-info)', borderColor: 'var(--callout-info-border)' },
  note: { icon: StickyNote, label: 'Note', color: 'var(--callout-note)', borderColor: 'var(--callout-note-border)' },
  prompt: { icon: MessageSquareText, label: 'Prompt', color: 'var(--callout-prompt)', borderColor: 'var(--callout-prompt-border)' },
  resources: { icon: BookOpen, label: 'Resources', color: 'var(--callout-resources)', borderColor: 'var(--callout-resources-border)' },
  todo: { icon: ListTodo, label: 'Todo', color: 'var(--callout-todo)', borderColor: 'var(--callout-todo-border)' },
};

function CalloutComponent({ node, updateAttributes, editor }: NodeViewProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const type = (node.attrs.type as CalloutType) || 'info';
  const config = calloutConfig[type] || calloutConfig.info;
  const Icon = config.icon;

  const updateDropdownPosition = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 4,
        left: rect.left,
      });
    }
  }, []);

  // Only register click-outside listener when dropdown is open (reduces event listener overhead)
  useEffect(() => {
    if (!showDropdown) return;
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as globalThis.Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as globalThis.Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showDropdown]);

  // Close dropdown on scroll to prevent misalignment
  useEffect(() => {
    if (!showDropdown) return;
    const handleScroll = () => setShowDropdown(false);
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [showDropdown]);

  const handleToggleDropdown = useCallback(() => {
    if (!editor.isEditable) return;
    if (!showDropdown) {
      updateDropdownPosition();
    }
    setShowDropdown(!showDropdown);
  }, [editor.isEditable, showDropdown, updateDropdownPosition]);

  const handleTypeChange = (newType: CalloutType) => {
    updateAttributes({ type: newType });
    setShowDropdown(false);
  };

  const handleToggleCollapse = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsed(prev => !prev);
  }, []);

  return (
    <NodeViewWrapper className={`callout callout-${type}${collapsed ? ' callout-collapsed' : ''}`} data-callout="" data-type={type}>
      {/* Header row: icon + label + dropdown trigger + collapse chevron */}
      <div className="callout-header" contentEditable={false}>
        <button
          ref={buttonRef}
          className="callout-header-button"
          onClick={handleToggleDropdown}
          title={editor.isEditable ? "Click to change callout type" : config.label}
          style={{ color: config.borderColor }}
          contentEditable={false}
        >
          <Icon size={18} />
          <span className="callout-label">{config.label}</span>
          {editor.isEditable && <ChevronDown size={12} className="callout-type-chevron" />}
        </button>
        <button
          className="callout-collapse-toggle"
          onClick={handleToggleCollapse}
          title={collapsed ? 'Expand callout' : 'Collapse callout'}
          contentEditable={false}
          style={{ color: config.borderColor }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {showDropdown && editor.isEditable && dropdownPos && createPortal(
          <div
            ref={dropdownRef}
            className="callout-type-dropdown"
            contentEditable={false}
            style={{
              position: 'fixed',
              top: dropdownPos.top,
              left: dropdownPos.left,
              zIndex: 9999,
            }}
          >
            {(Object.keys(calloutConfig) as CalloutType[]).map((calloutType) => {
              const typeConfig = calloutConfig[calloutType];
              const TypeIcon = typeConfig.icon;
              return (
                <button
                  key={calloutType}
                  className={`callout-type-option ${calloutType === type ? 'active' : ''}`}
                  onClick={() => handleTypeChange(calloutType)}
                  style={{ '--callout-option-color': typeConfig.color } as React.CSSProperties}
                >
                  <TypeIcon size={16} style={{ color: typeConfig.borderColor }} />
                  <span>{typeConfig.label}</span>
                </button>
              );
            })}
          </div>,
          document.body
        )}
      </div>

      {/* Content area: collapsible, below header */}
      <div className={`callout-content${collapsed ? ' callout-content-hidden' : ''}`}>
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
      types: ['info', 'note', 'prompt', 'resources', 'todo'],
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
