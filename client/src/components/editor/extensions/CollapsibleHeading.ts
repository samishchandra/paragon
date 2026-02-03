import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

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

// Generate a stable ID for a heading based on its content
function getHeadingId(node: { textContent: string }, level: number): string {
  return `h${level}-${node.textContent.slice(0, 50)}`;
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

          const headingId = getHeadingId(node, node.attrs.level);
          
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
          
          doc.descendants((node) => {
            if (node.type.name === 'heading') {
              storage.collapsedHeadings.add(getHeadingId(node, node.attrs.level));
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
        state: {
          init() {
            return { collapsedHeadings: new Set<string>() };
          },
          apply(tr, value) {
            const meta = tr.getMeta('collapsibleHeading');
            if (meta) {
              return { collapsedHeadings: new Set(storage.collapsedHeadings) };
            }
            return value;
          },
        },
        props: {
          decorations(state) {
            const decorations: Decoration[] = [];
            const doc = state.doc;

            doc.descendants((node, pos) => {
              if (node.type.name === 'heading' && options.levels.includes(node.attrs.level)) {
                const headingId = getHeadingId(node, node.attrs.level);
                const isCollapsed = storage.collapsedHeadings.has(headingId);
                
                // Add node decoration to the heading for styling
                decorations.push(
                  Decoration.node(pos, pos + node.nodeSize, {
                    class: `collapsible-heading ${isCollapsed ? 'is-collapsed' : 'is-expanded'}`,
                    'data-heading-id': headingId,
                  })
                );
                
                // Add widget decoration for the chevron button inside the heading
                const chevronWidget = Decoration.widget(pos + 1, () => {
                  const button = document.createElement('button');
                  button.className = `collapsible-heading-chevron ${isCollapsed ? 'collapsed' : 'expanded'}`;
                  button.setAttribute('data-heading-id', headingId);
                  button.setAttribute('contenteditable', 'false');
                  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
                  button.title = isCollapsed ? 'Click to expand' : 'Click to collapse';
                  
                  // Add hover detection via JavaScript for expanded chevrons
                  if (!isCollapsed) {
                    // Find the parent heading element after the widget is inserted
                    setTimeout(() => {
                      const heading = button.closest('.collapsible-heading');
                      if (heading && !heading.hasAttribute('data-hover-listener')) {
                        heading.setAttribute('data-hover-listener', 'true');
                        heading.addEventListener('mouseenter', () => {
                          const chevron = heading.querySelector('.collapsible-heading-chevron.expanded') as HTMLElement;
                          if (chevron) chevron.style.opacity = '0.6';
                        });
                        heading.addEventListener('mouseleave', () => {
                          const chevron = heading.querySelector('.collapsible-heading-chevron.expanded') as HTMLElement;
                          if (chevron) chevron.style.opacity = '0';
                        });
                      }
                    }, 0);
                  }
                  
                  return button;
                }, { side: -1, key: `chevron-${headingId}` });
                
                decorations.push(chevronWidget);

                // If collapsed, hide content until next heading of same or higher level
                if (isCollapsed) {
                  const headingLevel = node.attrs.level;
                  const startHidePos = pos + node.nodeSize;
                  
                  doc.nodesBetween(startHidePos, doc.content.size, (childNode, childPos) => {
                    // Stop at next heading of same or higher level
                    if (childNode.type.name === 'heading' && childNode.attrs.level <= headingLevel) {
                      return false;
                    }
                    
                    // Hide this block node
                    if (childNode.isBlock && childPos >= startHidePos) {
                      decorations.push(
                        Decoration.node(childPos, childPos + childNode.nodeSize, {
                          class: 'collapsible-heading-hidden',
                        })
                      );
                    }
                    
                    return true;
                  });
                }
              }
            });

            return DecorationSet.create(doc, decorations);
          },
          handleClick(view, _pos, event) {
            const target = event.target as HTMLElement;
            const button = target.closest('.collapsible-heading-chevron');
            
            if (button) {
              event.preventDefault();
              event.stopPropagation();
              
              const headingId = button.getAttribute('data-heading-id');
              
              if (headingId) {
                if (storage.collapsedHeadings.has(headingId)) {
                  storage.collapsedHeadings.delete(headingId);
                } else {
                  storage.collapsedHeadings.add(headingId);
                }
                
                view.dispatch(view.state.tr.setMeta('collapsibleHeading', { toggled: headingId }));
              }
              
              return true;
            }
            
            return false;
          },
        },
      }),
    ];
  },
});

export default CollapsibleHeading;
