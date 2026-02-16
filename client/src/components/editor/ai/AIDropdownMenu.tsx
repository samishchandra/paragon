/**
 * AIDropdownMenu — Dropdown menu for AI actions.
 * 
 * Renders the list of AI actions with icons and an optional custom prompt input.
 * Used by both the FloatingToolbar (selection scope) and EditorToolbar (document scope).
 * 
 * This component is lazy-loaded — only imported when AI features are enabled.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { DialogSafePortal } from '../DialogSafePortal';
import {
  SpellCheck,
  RefreshCw,
  Minimize2,
  Maximize2,
  FileText,
  MessageSquare,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import type { AIActionDefinition } from './types';

// Map icon names to Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  SpellCheck,
  RefreshCw,
  Minimize2,
  Maximize2,
  FileText,
  MessageSquare,
  Sparkles,
};

interface AIDropdownMenuProps {
  actions: AIActionDefinition[];
  scope: 'selection' | 'document';
  onAction: (actionId: string, customPrompt?: string) => void;
  onClose: () => void;
  /** Anchor position in viewport coordinates */
  position: { top: number; left: number };
}

export function AIDropdownMenu({ actions, scope, onAction, onClose, position }: AIDropdownMenuProps) {
  const [customPrompt, setCustomPrompt] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter actions by scope
  const filteredActions = actions.filter(a => a.scope === scope || a.scope === 'both');

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Use a short delay so the opening click doesn't immediately close it
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus input when custom prompt is shown
  useEffect(() => {
    if (showCustomInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showCustomInput]);

  // Adjust position to stay within viewport
  const adjustedPosition = useCallback(() => {
    const menuWidth = 260;
    const menuHeight = filteredActions.length * 40 + (showCustomInput ? 56 : 0) + 16;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = position.top;
    let left = position.left;

    // Clamp horizontally
    if (left + menuWidth > viewportWidth - 8) {
      left = viewportWidth - menuWidth - 8;
    }
    if (left < 8) left = 8;

    // If not enough space below, show above
    if (top + menuHeight > viewportHeight - 8) {
      top = position.top - menuHeight - 8;
    }
    if (top < 8) top = 8;

    return { top, left };
  }, [position, filteredActions.length, showCustomInput]);

  const pos = adjustedPosition();

  const handleCustomSubmit = () => {
    if (customPrompt.trim()) {
      onAction('custom', customPrompt.trim());
      setCustomPrompt('');
      setShowCustomInput(false);
    }
  };

  const menu = (
    <div
      ref={menuRef}
      className="ai-dropdown-menu"
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
      }}
    >
      <div
        className="
          bg-popover text-popover-foreground border border-border
          rounded-lg shadow-lg overflow-hidden
          w-[260px] py-1
          animate-in fade-in-0 zoom-in-95 duration-100
        "
      >
        {/* Custom prompt input — always at top like Google Docs */}
        <div className="px-2 py-1.5">
          <div className="flex items-center gap-2 bg-secondary/50 rounded-md px-2.5 py-1.5 border border-border/50">
            <MessageSquare size={14} className="text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Modify with prompt…"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCustomSubmit();
                }
                e.stopPropagation(); // Don't let editor handle these keys
              }}
              onFocus={() => setShowCustomInput(true)}
              className="
                flex-1 bg-transparent text-sm text-foreground
                placeholder:text-muted-foreground
                outline-none min-w-0
              "
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mx-2 my-0.5" />

        {/* Action items */}
        {filteredActions
          .filter(a => !a.showCustomPrompt) // Custom prompt is handled above
          .map((action) => {
            const IconComponent = action.icon ? ICON_MAP[action.icon] : Sparkles;
            return (
              <button
                key={action.id}
                className="
                  flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left
                  hover:bg-secondary/80 transition-colors duration-75
                  text-foreground
                "
                onMouseDown={(e) => {
                  e.preventDefault();
                  onAction(action.id);
                }}
              >
                {IconComponent && <IconComponent size={15} className="text-muted-foreground shrink-0" />}
                <span>{action.label}</span>
              </button>
            );
          })}
      </div>
    </div>
  );

  return (
    <DialogSafePortal onMouseDown={(e) => e.preventDefault()}>
      {menu}
    </DialogSafePortal>
  );
}
