import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { Decoration, DecorationSet, EditorView } from '@tiptap/pm/view';

export interface CollapsibleHeadingOptions {
  levels: number[];
}

export interface CollapsibleHeadingStorage {
  collapsedHeadings: Set<string>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    collapsibleHeading: {
      toggleHeadingCollapse: (pos: number) => ReturnType;
      expandAllHeadings: () => ReturnType;
      collapseAllHeadings: () => ReturnType;
    };
  }
}

const collapsibleHeadingPluginKey = new PluginKey('collapsibleHeading');

/**
 * Generate a stable, position-independent ID for a heading.
 * Uses level + text content + occurrence index among same-level headings with the same text.
 * This ensures IDs remain stable when text is inserted/deleted elsewhere in the document.
 */
function getHeadingId(level: number, textContent: string, occurrenceIndex: number): string {
  return `h${level}-${occurrenceIndex}-${textContent.slice(0, 50)}`;
}

/**
 * Build a lookup map of heading IDs for the entire document.
 * Returns a Map from position -> headingId.
 * This is computed once per document version and shared across all consumers.
 */
function buildHeadingIdMap(
  doc: ProseMirrorNode,
  levels: number[]
): Map<number, string> {
  const idMap = new Map<number, string>();
  // Track occurrence count per (level, text) pair
  const occurrenceCounts = new Map<string, number>();

  doc.descendants((node, pos) => {
    if (node.type.name === 'heading' && levels.includes(node.attrs.level)) {
      const level = node.attrs.level;
      const text = node.textContent.slice(0, 50);
      const key = `h${level}-${text}`;
      const count = occurrenceCounts.get(key) ?? 0;
      occurrenceCounts.set(key, count + 1);
      idMap.set(pos, getHeadingId(level, text, count));
    }
  });

  return idMap;
}

// Store view reference for click handlers
let currentView: EditorView | null = null;

/**
 * Performance: Extract decoration building into a standalone function.
 * This is called from plugin state management, which caches the result
 * and only rebuilds when the document structure changes or collapse state toggles.
 */
function buildDecorations(
  doc: ProseMirrorNode,
  storage: CollapsibleHeadingStorage,
  options: CollapsibleHeadingOptions
): DecorationSet {
  const decorations: Decoration[] = [];
  const headingIdMap = buildHeadingIdMap(doc, options.levels);

  // First pass: collect all headings
  const headings: Array<{
    pos: number;
    level: number;
    id: string;
    isCollapsed: boolean;
    nodeSize: number;
  }> = [];

  doc.descendants((node, pos) => {
    if (node.type.name === 'heading' && options.levels.includes(node.attrs.level)) {
      const headingId = headingIdMap.get(pos) ?? '';
      headings.push({
        pos,
        level: node.attrs.level,
        id: headingId,
        isCollapsed: storage.collapsedHeadings.has(headingId),
        nodeSize: node.nodeSize,
      });
    }
  });

  // Second pass: determine hidden ranges
  const hiddenRanges: Array<{ start: number; end: number }> = [];
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    if (heading.isCollapsed) {
      const startHidePos = heading.pos + heading.nodeSize;
      let endHidePos = doc.content.size;
      for (let j = i + 1; j < headings.length; j++) {
        if (headings[j].level <= heading.level) {
          endHidePos = headings[j].pos;
          break;
        }
      }
      if (startHidePos < endHidePos) {
        hiddenRanges.push({ start: startHidePos, end: endHidePos });
      }
    }
  }

  // Merge overlapping hidden ranges
  const mergedRanges: Array<{ start: number; end: number }> = [];
  for (const range of hiddenRanges) {
    if (mergedRanges.length === 0) {
      mergedRanges.push(range);
    } else {
      const last = mergedRanges[mergedRanges.length - 1];
      if (range.start <= last.end) {
        last.end = Math.max(last.end, range.end);
      } else {
        mergedRanges.push(range);
      }
    }
  }

  function isHidden(pos: number): boolean {
    for (const range of mergedRanges) {
      if (pos >= range.start && pos < range.end) return true;
    }
    return false;
  }

  // Third pass: add decorations
  doc.descendants((node, pos) => {
    if (node.type.name === 'heading' && options.levels.includes(node.attrs.level)) {
      const headingId = headingIdMap.get(pos) ?? '';
      const isCollapsed = storage.collapsedHeadings.has(headingId);
      const headingIsHidden = isHidden(pos);

      decorations.push(
        Decoration.node(pos, pos + node.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${node.attrs.level} ${isCollapsed ? 'is-collapsed' : 'is-expanded'}${headingIsHidden ? ' collapsible-heading-hidden' : ''}`,
          'data-heading-id': headingId,
          'data-heading-level': String(node.attrs.level),
        })
      );

      const chevronWidget = Decoration.widget(pos + node.nodeSize - 1, () => {
        const existingButton = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${headingId}"]`) as HTMLButtonElement | null;
        if (existingButton) {
          const wasCollapsed = existingButton.classList.contains('collapsed');
          if (wasCollapsed !== isCollapsed) {
            existingButton.classList.remove('collapsed', 'expanded');
            existingButton.classList.add(isCollapsed ? 'collapsed' : 'expanded');
            existingButton.title = isCollapsed ? 'Click to expand' : 'Click to collapse';
          }
          const existingWrapper = existingButton.parentElement;
          if (existingWrapper) return existingWrapper;
        }

        const wrapper = document.createElement('span');
        wrapper.className = 'collapsible-heading-chevron-wrapper';
        wrapper.setAttribute('contenteditable', 'false');

        const button = document.createElement('button');
        button.className = `collapsible-heading-chevron ${isCollapsed ? 'collapsed' : 'expanded'}`;
        button.setAttribute('data-heading-id', headingId);
        button.setAttribute('data-heading-level', String(node.attrs.level));
        button.setAttribute('contenteditable', 'false');
        button.setAttribute('tabindex', '-1');
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
        button.title = isCollapsed ? 'Click to expand' : 'Click to collapse';

        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const wasCollapsed = button.classList.contains('collapsed');
          button.classList.remove('collapsed', 'expanded');
          button.classList.add(wasCollapsed ? 'expanded' : 'collapsed');
          button.title = wasCollapsed ? 'Click to collapse' : 'Click to expand';
          if (storage.collapsedHeadings.has(headingId)) {
            storage.collapsedHeadings.delete(headingId);
          } else {
            storage.collapsedHeadings.add(headingId);
          }
          if (currentView) {
            currentView.dispatch(currentView.state.tr.setMeta('collapsibleHeading', { toggled: headingId }));
          }
        });

        wrapper.appendChild(button);
        return wrapper;
      }, { side: 1, key: `chevron-${headingId}` });

      decorations.push(chevronWidget);
    } else if (node.isBlock && isHidden(pos)) {
      decorations.push(
        Decoration.node(pos, pos + node.nodeSize, {
          class: 'collapsible-heading-hidden',
        })
      );
    }
  });

  return DecorationSet.create(doc, decorations);
}

/**
 * Migrate collapsed heading IDs when the document changes.
 * Maps old IDs (from the previous document state) to new IDs (in the current document state).
 * This handles cases where heading positions shift due to edits, which would change
 * position-based IDs but not occurrence-based IDs.
 */
function migrateCollapsedIds(
  oldDoc: ProseMirrorNode,
  newDoc: ProseMirrorNode,
  storage: CollapsibleHeadingStorage,
  levels: number[]
): void {
  if (storage.collapsedHeadings.size === 0) return;

  const newIdMap = buildHeadingIdMap(newDoc, levels);
  const newIds = new Set(newIdMap.values());

  // Remove any collapsed IDs that no longer exist in the document
  // (e.g., heading was deleted or its text changed)
  const toRemove: string[] = [];
  storage.collapsedHeadings.forEach((id) => {
    if (!newIds.has(id)) {
      toRemove.push(id);
    }
  });
  for (const id of toRemove) {
    storage.collapsedHeadings.delete(id);
  }
}

export const CollapsibleHeading = Extension.create<CollapsibleHeadingOptions, CollapsibleHeadingStorage>({
  name: 'collapsibleHeading',

  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
    };
  },

  addStorage() {
    return {
      collapsedHeadings: new Set<string>(),
    };
  },

  addCommands() {
    return {
      toggleHeadingCollapse:
        (pos: number) =>
        ({ editor, tr }) => {
          const storage = this.storage as CollapsibleHeadingStorage;
          const node = tr.doc.nodeAt(pos);
          
          if (!node || node.type.name !== 'heading') {
            return false;
          }

          const headingIdMap = buildHeadingIdMap(tr.doc, this.options.levels);
          const headingId = headingIdMap.get(pos);
          
          if (!headingId) return false;

          if (storage.collapsedHeadings.has(headingId)) {
            storage.collapsedHeadings.delete(headingId);
          } else {
            storage.collapsedHeadings.add(headingId);
          }

          editor.view.dispatch(tr.setMeta('collapsibleHeading', { toggled: headingId }));
          
          return true;
        },
      expandAllHeadings:
        () =>
        ({ editor, tr }) => {
          const storage = this.storage as CollapsibleHeadingStorage;
          storage.collapsedHeadings.clear();
          editor.view.dispatch(tr.setMeta('collapsibleHeading', { expandAll: true }));
          return true;
        },
      collapseAllHeadings:
        () =>
        ({ editor, tr }) => {
          const storage = this.storage as CollapsibleHeadingStorage;
          const headingIdMap = buildHeadingIdMap(tr.doc, this.options.levels);
          
          headingIdMap.forEach((id) => {
            storage.collapsedHeadings.add(id);
          });
          
          editor.view.dispatch(tr.setMeta('collapsibleHeading', { collapseAll: true }));
          return true;
        },
    };
  },

  addProseMirrorPlugins() {
    const storage = this.storage as CollapsibleHeadingStorage;
    const options = this.options;

    return [
      new Plugin({
        key: collapsibleHeadingPluginKey,
        view(view) {
          currentView = view;
          return {
            update(view) {
              currentView = view;
            },
            destroy() {
              currentView = null;
            },
          };
        },
        state: {
          init(_, state) {
            return {
              collapsedHeadings: new Set<string>(),
              decorations: buildDecorations(state.doc, storage, options),
              docVersion: 0,
            };
          },
          apply(tr, value, oldState, newState) {
            const meta = tr.getMeta('collapsibleHeading');
            // Performance: Only rebuild decorations when doc changes or collapse state changes
            if (meta || tr.docChanged) {
              // When doc changes, migrate collapsed IDs to account for any structural shifts
              if (tr.docChanged && !meta) {
                migrateCollapsedIds(oldState.doc, newState.doc, storage, options.levels);
              }
              return {
                collapsedHeadings: new Set(storage.collapsedHeadings),
                decorations: buildDecorations(newState.doc, storage, options),
                docVersion: value.docVersion + 1,
              };
            }
            // If doc hasn't changed and no collapse toggle, reuse existing decorations
            return {
              ...value,
              decorations: value.decorations.map(tr.mapping, tr.doc),
            };
          },
        },
        props: {
          decorations(state) {
            const pluginState = collapsibleHeadingPluginKey.getState(state);
            if (pluginState?.decorations) {
              return pluginState.decorations;
            }
            return buildDecorations(state.doc, storage, options);
          },
        },
      }),
    ];
  },
});

export default CollapsibleHeading;
