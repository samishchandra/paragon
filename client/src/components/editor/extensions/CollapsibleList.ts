import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { Decoration, DecorationSet, EditorView } from '@tiptap/pm/view';

export interface CollapsibleListOptions {
  /** List item types that can be collapsed */
  listItemTypes: string[];
}

export interface CollapsibleListStorage {
  collapsedItems: Set<string>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    collapsibleList: {
      toggleListItemCollapse: (pos: number) => ReturnType;
      expandAllListItems: () => ReturnType;
      collapseAllListItems: () => ReturnType;
    };
  }
}

const collapsibleListPluginKey = new PluginKey('collapsibleList');

/**
 * Generate a stable ID for a list item based on its content and position.
 * We use the first paragraph's text content + position for uniqueness.
 */
function getListItemId(node: ProseMirrorNode, pos: number): string {
  let text = '';
  if (node.firstChild && node.firstChild.type.name === 'paragraph') {
    text = node.firstChild.textContent.slice(0, 50);
  }
  return `li-${pos}-${text}`;
}

/**
 * Check if a list item has nested list children (bulletList, orderedList, taskList).
 * Returns true if the item contains any nested list after its first paragraph.
 */
function hasNestedList(node: ProseMirrorNode): boolean {
  const listTypes = ['bulletList', 'orderedList', 'taskList'];
  let found = false;
  node.forEach((child) => {
    if (listTypes.includes(child.type.name)) {
      found = true;
    }
  });
  return found;
}

/**
 * Get the position range of nested list content within a list item.
 * Returns the start and end positions of the nested lists (relative to doc).
 */
function getNestedListRange(
  node: ProseMirrorNode,
  itemPos: number
): { start: number; end: number } | null {
  const listTypes = ['bulletList', 'orderedList', 'taskList'];
  let start = -1;
  let end = -1;
  let offset = itemPos + 1; // +1 for the list item node itself

  node.forEach((child) => {
    if (listTypes.includes(child.type.name)) {
      if (start === -1) {
        start = offset;
      }
      end = offset + child.nodeSize;
    }
    offset += child.nodeSize;
  });

  if (start === -1) return null;
  return { start, end };
}

// Store view reference for click handlers
let currentView: EditorView | null = null;

/**
 * Build decorations for collapsible list items.
 * Only list items with nested children get a chevron widget.
 */
function buildDecorations(
  doc: ProseMirrorNode,
  storage: CollapsibleListStorage,
  options: CollapsibleListOptions
): DecorationSet {
  const decorations: Decoration[] = [];

  doc.descendants((node, pos) => {
    // Only process list item types
    if (!options.listItemTypes.includes(node.type.name)) {
      return true; // continue descending
    }

    // Only add chevron if this item has nested lists
    if (!hasNestedList(node)) {
      return true;
    }

    const itemId = getListItemId(node, pos);
    const isCollapsed = storage.collapsedItems.has(itemId);

    // Add a class to the list item node for styling
    decorations.push(
      Decoration.node(pos, pos + node.nodeSize, {
        class: `collapsible-list-item ${isCollapsed ? 'is-collapsed' : 'is-expanded'}`,
        'data-list-item-id': itemId,
      })
    );

    // Find the end of the first paragraph to place the chevron widget
    // The chevron goes at the end of the first paragraph's content
    const firstChild = node.firstChild;
    if (firstChild && firstChild.type.name === 'paragraph') {
      const paragraphEndPos = pos + 1 + firstChild.nodeSize - 1; // end of paragraph content

      const chevronWidget = Decoration.widget(
        paragraphEndPos,
        () => {
          // Reuse existing button if possible
          const existingButton = document.querySelector(
            `button.collapsible-list-chevron[data-list-item-id="${itemId}"]`
          ) as HTMLButtonElement | null;

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
          wrapper.className = 'collapsible-list-chevron-wrapper';
          wrapper.setAttribute('contenteditable', 'false');

          const button = document.createElement('button');
          button.className = `collapsible-list-chevron ${isCollapsed ? 'collapsed' : 'expanded'}`;
          button.setAttribute('data-list-item-id', itemId);
          button.setAttribute('contenteditable', 'false');
          button.setAttribute('tabindex', '-1');
          button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
          button.title = isCollapsed ? 'Click to expand' : 'Click to collapse';

          button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const wasCollapsed = button.classList.contains('collapsed');
            button.classList.remove('collapsed', 'expanded');
            button.classList.add(wasCollapsed ? 'expanded' : 'collapsed');
            button.title = wasCollapsed ? 'Click to collapse' : 'Click to expand';

            if (storage.collapsedItems.has(itemId)) {
              storage.collapsedItems.delete(itemId);
            } else {
              storage.collapsedItems.add(itemId);
            }

            if (currentView) {
              currentView.dispatch(
                currentView.state.tr.setMeta('collapsibleList', { toggled: itemId })
              );
            }
          });

          wrapper.appendChild(button);
          return wrapper;
        },
        { side: 1, key: `list-chevron-${itemId}` }
      );

      decorations.push(chevronWidget);
    }

    // If collapsed, hide the nested list children
    if (isCollapsed) {
      const range = getNestedListRange(node, pos);
      if (range) {
        // We need to hide each top-level child that is a list type
        let offset = pos + 1; // inside the list item
        node.forEach((child) => {
          const listTypes = ['bulletList', 'orderedList', 'taskList'];
          if (listTypes.includes(child.type.name)) {
            decorations.push(
              Decoration.node(offset, offset + child.nodeSize, {
                class: 'collapsible-list-hidden',
              })
            );
          }
          offset += child.nodeSize;
        });
      }
    }

    return true; // continue descending to find nested collapsible items
  });

  return DecorationSet.create(doc, decorations);
}

export const CollapsibleList = Extension.create<CollapsibleListOptions, CollapsibleListStorage>({
  name: 'collapsibleList',

  addOptions() {
    return {
      listItemTypes: ['listItem', 'taskItem'],
    };
  },

  addStorage() {
    return {
      collapsedItems: new Set<string>(),
    };
  },

  addCommands() {
    return {
      toggleListItemCollapse:
        (pos: number) =>
        ({ editor, tr }) => {
          const storage = this.storage as CollapsibleListStorage;
          const node = tr.doc.nodeAt(pos);

          if (!node || !this.options.listItemTypes.includes(node.type.name)) {
            return false;
          }

          if (!hasNestedList(node)) {
            return false;
          }

          const itemId = getListItemId(node, pos);

          if (storage.collapsedItems.has(itemId)) {
            storage.collapsedItems.delete(itemId);
          } else {
            storage.collapsedItems.add(itemId);
          }

          editor.view.dispatch(tr.setMeta('collapsibleList', { toggled: itemId }));
          return true;
        },

      expandAllListItems:
        () =>
        ({ editor, tr }) => {
          const storage = this.storage as CollapsibleListStorage;
          storage.collapsedItems.clear();
          editor.view.dispatch(tr.setMeta('collapsibleList', { expandAll: true }));
          return true;
        },

      collapseAllListItems:
        () =>
        ({ editor, tr }) => {
          const storage = this.storage as CollapsibleListStorage;
          const doc = tr.doc;

          doc.descendants((node, pos) => {
            if (
              this.options.listItemTypes.includes(node.type.name) &&
              hasNestedList(node)
            ) {
              storage.collapsedItems.add(getListItemId(node, pos));
            }
          });

          editor.view.dispatch(tr.setMeta('collapsibleList', { collapseAll: true }));
          return true;
        },
    };
  },

  addProseMirrorPlugins() {
    const storage = this.storage as CollapsibleListStorage;
    const options = this.options;

    return [
      new Plugin({
        key: collapsibleListPluginKey,
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
              collapsedItems: new Set<string>(),
              decorations: buildDecorations(state.doc, storage, options),
              docVersion: 0,
            };
          },
          apply(tr, value, _oldState, newState) {
            const meta = tr.getMeta('collapsibleList');
            // Only rebuild decorations when doc changes or collapse state changes
            if (meta || tr.docChanged) {
              return {
                collapsedItems: new Set(storage.collapsedItems),
                decorations: buildDecorations(newState.doc, storage, options),
                docVersion: value.docVersion + 1,
              };
            }
            // Reuse existing decorations, mapped through the transaction
            return {
              ...value,
              decorations: value.decorations.map(tr.mapping, tr.doc),
            };
          },
        },
        props: {
          decorations(state) {
            const pluginState = collapsibleListPluginKey.getState(state);
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

export default CollapsibleList;
