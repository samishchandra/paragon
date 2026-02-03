import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
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
            
            // First pass: collect all headings with their positions and collapse states
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
            
            // Second pass: determine which content should be hidden based on hierarchical collapse
            const hiddenRanges: Array<{ start: number; end: number }> = [];
            
            for (let i = 0; i < headings.length; i++) {
              const heading = headings[i];
              
              if (heading.isCollapsed) {
                const startHidePos = heading.pos + heading.nodeSize;
                let endHidePos = doc.content.size;
                
                // Find the next heading of same or higher level (lower number)
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
            
            // Check if a position is within a hidden range
            function isHidden(pos: number): boolean {
              for (const range of mergedRanges) {
                if (pos >= range.start && pos < range.end) {
                  return true;
                }
              }
              return false;
            }
            
            // Third pass: add decorations
            doc.descendants((node, pos) => {
              if (node.type.name === 'heading' && options.levels.includes(node.attrs.level)) {
                const headingId = getHeadingId(node, node.attrs.level, pos);
                const isCollapsed = storage.collapsedHeadings.has(headingId);
                const headingIsHidden = isHidden(pos);
                
                // Add node decoration to the heading for styling
                decorations.push(
                  Decoration.node(pos, pos + node.nodeSize, {
                    class: `collapsible-heading collapsible-heading-level-${node.attrs.level} ${isCollapsed ? 'is-collapsed' : 'is-expanded'}${headingIsHidden ? ' collapsible-heading-hidden' : ''}`,
                    'data-heading-id': headingId,
                    'data-heading-level': String(node.attrs.level),
                  })
                );
                
                // Add widget decoration for the chevron button
                // Position it inside the heading (pos + 1) so it's positioned relative to the heading
                const chevronWidget = Decoration.widget(pos + 1, () => {
                  const wrapper = document.createElement('span');
                  wrapper.className = 'collapsible-heading-chevron-wrapper';
                  wrapper.setAttribute('contenteditable', 'false');
                  
                  const button = document.createElement('button');
                  button.className = `collapsible-heading-chevron ${isCollapsed ? 'collapsed' : 'expanded'}`;
                  button.setAttribute('data-heading-id', headingId);
                  button.setAttribute('data-heading-level', String(node.attrs.level));
                  button.setAttribute('contenteditable', 'false');
                  button.setAttribute('tabindex', '-1');
                  // Use a simple chevron SVG
                  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
                  button.title = isCollapsed ? 'Click to expand' : 'Click to collapse';
                  
                  // Add direct click handler
                  button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (storage.collapsedHeadings.has(headingId)) {
                      storage.collapsedHeadings.delete(headingId);
                    } else {
                      storage.collapsedHeadings.add(headingId);
                    }
                    
                    // Use the stored view reference to dispatch
                    if (currentView) {
                      currentView.dispatch(currentView.state.tr.setMeta('collapsibleHeading', { toggled: headingId }));
                    }
                  });
                  
                  wrapper.appendChild(button);
                  return wrapper;
                }, { side: -1, key: `chevron-${headingId}` });
                
                decorations.push(chevronWidget);
              } else if (node.isBlock && isHidden(pos)) {
                // Hide non-heading blocks that are in hidden ranges
                decorations.push(
                  Decoration.node(pos, pos + node.nodeSize, {
                    class: 'collapsible-heading-hidden',
                  })
                );
              }
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});

export default CollapsibleHeading;
