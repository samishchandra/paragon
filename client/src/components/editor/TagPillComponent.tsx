import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { useRef, useCallback, useState, useEffect } from 'react';
import { Hash } from 'lucide-react';
import { isValidTag, normalizeTag } from './extensions/TagPill';

/*
 * TagPillComponent — React NodeView for tag pills
 *
 * ARCHITECTURE NOTE:
 * TipTap's NodeView lifecycle unmounts and remounts React components whenever
 * ProseMirror processes a transaction. This causes a cascade of mount/unmount
 * cycles that reset local React state and fire spurious blur events.
 * 
 * Solution: Module-level Map persists editing state across remounts.
 * A focus timestamp prevents blur events fired during the remount cycle
 * (within 300ms of focus) from triggering commitEdit.
 */

// Module-level state persisted across component remounts.
const editingTags = new Map<string, { value: string; focusedAt: number }>();

export function TagPillComponent({ node, selected, editor, getPos, deleteNode }: NodeViewProps) {
  const pillRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const tagValue = node.attrs.tag || '';
  const committedRef = useRef(false);
  
  // Check module-level Map on mount to restore editing state.
  const [isEditing, setIsEditing] = useState(() => {
    return editingTags.has(tagValue);
  });
  const [editValue, setEditValue] = useState(() => {
    return editingTags.get(tagValue)?.value ?? tagValue;
  });

  // Sync editValue when tag changes externally
  useEffect(() => {
    if (!isEditing) {
      setEditValue(tagValue);
    }
  }, [tagValue, isEditing]);

  // Keep module-level map in sync with current edit value
  useEffect(() => {
    if (isEditing) {
      const existing = editingTags.get(tagValue);
      editingTags.set(tagValue, { 
        value: editValue, 
        focusedAt: existing?.focusedAt ?? Date.now() 
      });
    }
  }, [isEditing, editValue, tagValue]);

  const doCommit = useCallback((value: string) => {
    if (committedRef.current) return;
    committedRef.current = true;
    
    const trimmed = value.trim().replace(/^#/, '');
    const normalized = normalizeTag(trimmed);
    
    // Clear from module-level Map
    editingTags.delete(tagValue);
    if (normalized) editingTags.delete(normalized);
    
    if (!normalized || !isValidTag(normalized)) {
      deleteNode();
    } else if (normalized !== tagValue) {
      const pos = getPos();
      if (typeof pos === 'number' && editor) {
        const { tr } = editor.state;
        const nodeSize = node.nodeSize;
        tr.delete(pos, pos + nodeSize);
        tr.insert(pos, editor.schema.nodes.tagPill.create({ tag: normalized }));
        editor.view.dispatch(tr);
      }
    } else {
      editingTags.delete(tagValue);
    }
    setIsEditing(false);
    requestAnimationFrame(() => {
      editor?.commands.focus();
    });
  }, [tagValue, editor, getPos, deleteNode, node.nodeSize]);

  const startEditing = useCallback(() => {
    if (editor && !editor.isEditable) return;
    editingTags.set(tagValue, { value: tagValue, focusedAt: Date.now() });
    setEditValue(tagValue);
    setIsEditing(true);
    committedRef.current = false;
  }, [editor, tagValue]);

  // Native DOM event listener for double-click
  useEffect(() => {
    const el = pillRef.current;
    if (!el || isEditing) return;

    const handleDblClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      startEditing();
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    el.addEventListener('dblclick', handleDblClick);
    el.addEventListener('click', handleClick);

    return () => {
      el.removeEventListener('dblclick', handleDblClick);
      el.removeEventListener('click', handleClick);
    };
  }, [isEditing, editor, getPos, startEditing]);

  // Focus input when entering editing mode
  useEffect(() => {
    if (isEditing) {
      // Update the focusedAt timestamp when the input is actually focused
      const raf = requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
          // Update timestamp to now (after remount cycle settles)
          const existing = editingTags.get(tagValue);
          if (existing) {
            existing.focusedAt = Date.now();
          }
        }
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isEditing, tagValue]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      doCommit(editValue);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      editingTags.delete(tagValue);
      setIsEditing(false);
      committedRef.current = true; // prevent blur from also committing
      editor?.commands.focus();
    }
  }, [doCommit, editValue, tagValue, editor]);

  const handleBlur = useCallback(() => {
    // Only commit on blur if the input has been focused for a meaningful duration.
    // During ProseMirror's remount cycle, blur fires within milliseconds of focus.
    const entry = editingTags.get(tagValue);
    const focusedAt = entry?.focusedAt ?? 0;
    const elapsed = Date.now() - focusedAt;
    
    if (elapsed > 300) {
      // User intentionally blurred (clicked elsewhere, tabbed away)
      doCommit(editValue);
    }
    // If elapsed <= 300ms, this is a spurious blur from a remount cycle — ignore it
  }, [doCommit, editValue, tagValue]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  }, []);

  if (isEditing) {
    return (
      <NodeViewWrapper as="span" className="inline">
        <span
          ref={pillRef}
          className={`tag-pill tag-pill-editing ${selected ? 'ProseMirror-selectednode' : ''}`}
          data-type="tag-pill"
          data-tag={tagValue}
        >
          <Hash size={14} className="tag-icon" strokeWidth={2.5} />
          <input
            ref={inputRef}
            type="text"
            className="tag-pill-input"
            value={editValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            spellCheck={false}
            autoComplete="off"
          />
        </span>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper as="span" className="inline">
      <span
        ref={pillRef}
        className={`tag-pill ${selected ? 'ProseMirror-selectednode' : ''}`}
        contentEditable={false}
        data-type="tag-pill"
        data-tag={tagValue}
      >
        <Hash size={14} className="tag-icon" strokeWidth={2.5} />
        <span className="tag-text">{tagValue}</span>
      </span>
    </NodeViewWrapper>
  );
}
