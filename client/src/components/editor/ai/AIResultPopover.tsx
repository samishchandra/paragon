/**
 * AIResultPopover — Displays streaming AI results near the selection.
 * 
 * Shows the AI-generated text as it streams in, with action buttons:
 * - Replace: replaces the selected text with the AI result
 * - Insert: inserts the AI result after the selected text
 * - Retry: re-runs the same action
 * - Discard: closes the popover
 * 
 * This component is lazy-loaded — only imported when AI features are enabled.
 */

import { useRef, useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Replace,
  Plus,
  RotateCcw,
  X,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';
import type { AIState } from './types';

interface AIResultPopoverProps {
  state: AIState;
  /** Anchor position in viewport coordinates (below the selection) */
  position: { top: number; left: number };
  /** Replace the selected text with the AI result */
  onReplace: () => void;
  /** Insert the AI result after the selected text */
  onInsert: () => void;
  /** Retry the same action */
  onRetry: () => void;
  /** Discard / close */
  onDiscard: () => void;
}

export function AIResultPopover({
  state,
  position,
  onReplace,
  onInsert,
  onRetry,
  onDiscard,
}: AIResultPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Auto-scroll to bottom as content streams in
  useEffect(() => {
    if (contentRef.current && state.status === 'streaming') {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [state.status === 'streaming' ? (state as Extract<AIState, { status: 'streaming' }>).result : '']);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDiscard();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onDiscard]);

  // Adjust position to stay within viewport
  const adjustedPosition = useCallback(() => {
    const popoverWidth = 380;
    const popoverMaxHeight = 320;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = position.top;
    let left = position.left - popoverWidth / 2;

    // Clamp horizontally
    if (left + popoverWidth > viewportWidth - 8) {
      left = viewportWidth - popoverWidth - 8;
    }
    if (left < 8) left = 8;

    // If not enough space below, show above
    if (top + popoverMaxHeight > viewportHeight - 8) {
      top = Math.max(8, position.top - popoverMaxHeight - 8);
    }

    return { top, left };
  }, [position]);

  const pos = adjustedPosition();

  const resultText = (state.status === 'streaming' || state.status === 'complete')
    ? (state as Extract<AIState, { status: 'streaming' | 'complete' }>).result
    : '';

  const actionLabel = (state.status === 'streaming' || state.status === 'complete')
    ? (state as Extract<AIState, { status: 'streaming' | 'complete' }>).actionLabel
    : '';

  const isStreaming = state.status === 'streaming';
  const isComplete = state.status === 'complete';
  const isError = state.status === 'error';

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [resultText]);

  if (state.status === 'idle') return null;

  const popover = (
    <div
      ref={popoverRef}
      className="ai-result-popover"
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        zIndex: 10001,
      }}
      onMouseDown={(e) => e.preventDefault()} // Prevent losing editor selection
    >
      <div
        className="
          bg-popover text-popover-foreground border border-border
          rounded-lg shadow-xl overflow-hidden
          w-[380px] max-w-[calc(100vw-16px)]
          animate-in fade-in-0 slide-in-from-top-2 duration-150
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {isStreaming && <Loader2 size={12} className="animate-spin" />}
            <span className="font-medium">
              {isError ? 'Error' : actionLabel}
            </span>
            {isStreaming && <span className="opacity-60">Generating…</span>}
          </div>
          <button
            className="p-0.5 rounded hover:bg-secondary transition-colors"
            onMouseDown={(e) => { e.preventDefault(); onDiscard(); }}
            title="Discard"
          >
            <X size={14} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed"
        >
          {isError ? (
            <div className="text-destructive">
              {(state as Extract<AIState, { status: 'error' }>).message}
            </div>
          ) : (
            <div className="whitespace-pre-wrap">
              {resultText}
              {isStreaming && (
                <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" />
              )}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20">
          {(isComplete || isError) && (
            <>
              {isComplete && (
                <>
                  <ActionButton
                    icon={Replace}
                    label="Replace"
                    onClick={onReplace}
                    primary
                  />
                  <ActionButton
                    icon={Plus}
                    label="Insert"
                    onClick={onInsert}
                  />
                  <ActionButton
                    icon={copied ? Check : Copy}
                    label={copied ? 'Copied' : 'Copy'}
                    onClick={handleCopy}
                  />
                </>
              )}
              <ActionButton
                icon={RotateCcw}
                label="Retry"
                onClick={onRetry}
              />
              <div className="flex-1" />
              <ActionButton
                icon={X}
                label="Discard"
                onClick={onDiscard}
              />
            </>
          )}
          {isStreaming && (
            <>
              <div className="flex-1" />
              <ActionButton
                icon={X}
                label="Stop"
                onClick={onDiscard}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(popover, document.body);
}

// ─── Internal Button Component ────────────────────────────────────────────────

function ActionButton({
  icon: Icon,
  label,
  onClick,
  primary = false,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      className={`
        flex items-center gap-1 px-2 py-1 rounded text-xs font-medium
        transition-colors duration-75
        ${primary
          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }
      `}
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    >
      <Icon size={12} />
      <span>{label}</span>
    </button>
  );
}
