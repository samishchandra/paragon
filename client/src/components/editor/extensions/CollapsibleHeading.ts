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

// Generate a stable ID for a heading based on its content and position
function getHeadingId(node: { textContent: string }, level: number, pos: number): string {
  // Include position to handle duplicate heading text
  return `h${level}-${pos}-${node.textContent.slice(0, 50)}`;
}

// Store view reference for click handlers
let currentView: EditorView | null = null;

/**
 * Performance: Extract decoration building into a standalone function.
 * This is called from plugin state management, which caches the result
 * and only rebuilds when the document structure changes or collapse state toggles.
 * Previously, this ran 3 full doc.descendants() passes on EVERY transaction.
 */
function buildDecorations(
  doc: ProseMirrorNode,
  storage: CollapsibleHeadingStorage,
  options: CollapsibleHeadingOptions
): DecorationSet {
  const decorations: Decoration[] = [];

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
      const headingId = getHeadingId(node, node.attrs.level, pos);
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
      const headingId = getHeadingId(node, node.attrs.level, pos);
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

          const headingId = getHeadingId(node, node.attrs.level, pos);
          
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
          const doc = tr.doc;
          
          doc.descendants((node, pos) => {
            if (node.type.name === 'heading') {
              storage.collapsedHeadings.add(getHeadingId(node, node.attrs.level, pos));
            }
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
          apply(tr, value, _oldState, newState) {
            const meta = tr.getMeta('collapsibleHeading');
            // Performance: Only rebuild decorations when doc changes or collapse state changes
            // This avoids 3 full doc traversals on every keystroke
            if (meta || tr.docChanged) {
              return {
                collapsedHeadings: new Set(storage.collapsedHeadings),
                decorations: buildDecorations(newState.doc, storage, options),
                docVersion: value.docVersion + 1,
              };
            }
            // If doc hasn't changed and no collapse toggle, reuse existing decorations
            // but map them through the transaction to adjust positions
            return {
              ...value,
              decorations: value.decorations.map(tr.mapping, tr.doc),
            };
          },
        },
        props: {
          decorations(state) {
            // Performance: Return cached decorations from plugin state
            // Only falls back to fresh build if plugin state is unavailable
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
