import Image from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/core';

export interface ResizableImageOptions {
  HTMLAttributes: Record<string, unknown>;
  allowBase64: boolean;
  onImageClick?: (attrs: { src: string; alt: string; pos: number; rect: DOMRect }) => void;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    resizableImage: {
      setImage: (options: { src: string; alt?: string; title?: string; width?: number }) => ReturnType;
      updateImage: (options: { src?: string; alt?: string; width?: number; align?: string }) => ReturnType;
      setImageAlign: (align: 'left' | 'center' | 'right') => ReturnType;
    };
  }
}

export const ResizableImage = Image.extend<ResizableImageOptions>({
  name: 'resizableImage',

  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {},
      allowBase64: true,
      onImageClick: undefined,
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const width = element.getAttribute('width') || element.style.width;
          return width ? parseInt(width, 10) : null;
        },
        renderHTML: (attributes: Record<string, unknown>) => {
          if (!attributes.width) {
            return {};
          }
          return {
            width: attributes.width,
            style: `width: ${attributes.width}px`,
          };
        },
      },
      height: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const height = element.getAttribute('height') || element.style.height;
          return height ? parseInt(height, 10) : null;
        },
        renderHTML: (attributes: Record<string, unknown>) => {
          if (!attributes.height) {
            return {};
          }
          return {
            height: attributes.height,
          };
        },
      },
      align: {
        default: 'left',
        parseHTML: (element: HTMLElement) => element.getAttribute('data-align') || 'left',
        renderHTML: (attributes: Record<string, unknown>) => ({
          'data-align': attributes.align,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
      {
        tag: 'figure.image-resizer img[src]',
      },
    ];
  },

  addCommands() {
    return {
      ...this.parent?.(),
      updateImage:
        (options) =>
        ({ commands }) => {
          return commands.updateAttributes('resizableImage', options);
        },
      setImageAlign:
        (align) =>
        ({ commands }) => {
          return commands.updateAttributes('resizableImage', { align });
        },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const align = HTMLAttributes['data-align'] || 'center';
    const wrapperStyle = {
      left: 'margin-right: auto;',
      center: 'margin-left: auto; margin-right: auto;',
      right: 'margin-left: auto;',
    }[align as string] || 'margin-left: auto; margin-right: auto;';

    return [
      'figure',
      { 
        class: 'image-resizer',
        style: wrapperStyle,
      },
      [
        'img',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      ],
    ];
  },

  addNodeView() {
    // Capture extension options in a variable accessible to the closure
    const extensionOptions = this.options;

    return ({ node, editor, getPos }) => {
      // Mutable reference to track the current node state
      // This ensures menu actions always use the latest src/alt values
      let currentNode = node;

      const container = document.createElement('figure');
      container.classList.add('image-resizer');
      
      // Apply alignment style
      const applyAlignment = (align: string) => {
        const alignStyle = {
          left: 'margin-right: auto; margin-left: 0;',
          center: 'margin-left: auto; margin-right: auto;',
          right: 'margin-left: auto; margin-right: 0;',
        }[align] || 'margin-left: auto; margin-right: auto;';
        container.style.cssText = `display: block; position: relative; width: fit-content; ${alignStyle}`;
      };
      applyAlignment(node.attrs.align || 'left');
      
      const img = document.createElement('img');
      img.src = node.attrs.src;
      img.alt = node.attrs.alt || '';
      if (node.attrs.width) {
        img.style.width = `${node.attrs.width}px`;
      }
      
      // Resize handle with diagonal resize icon
      const resizeHandle = document.createElement('div');
      resizeHandle.classList.add('resize-handle');
      resizeHandle.style.cssText = `
        position: absolute;
        bottom: 4px;
        right: 4px;
        width: 24px;
        height: 24px;
        background: oklch(0.98 0 0 / 0.95);
        border: 1px solid oklch(0.85 0 0);
        border-radius: 6px;
        cursor: se-resize;
        opacity: 0;
        transition: opacity 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px oklch(0 0 0 / 0.15);
      `;
      resizeHandle.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.4 0 0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(90deg);">
          <polyline points="15 3 21 3 21 9"></polyline>
          <polyline points="9 21 3 21 3 15"></polyline>
          <line x1="21" y1="3" x2="14" y2="10"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
      `;

      // 3-dot menu button
      const menuButton = document.createElement('button');
      menuButton.classList.add('image-menu-btn');
      menuButton.setAttribute('type', 'button');
      menuButton.setAttribute('title', 'Image options');
      menuButton.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        width: 28px;
        height: 28px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: oklch(0.98 0 0 / 0.95);
        border: 1px solid oklch(0.85 0 0);
        border-radius: 6px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.15s ease, background 0.15s ease;
        box-shadow: 0 2px 8px oklch(0 0 0 / 0.15);
        z-index: 10;
      `;
      menuButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      `;
      
      // Dropdown menu
      const dropdown = document.createElement('div');
      dropdown.classList.add('image-menu-dropdown');
      dropdown.style.cssText = `
        position: fixed;
        display: none;
        flex-direction: column;
        min-width: 140px;
        padding: 4px;
        background: oklch(0.99 0 0);
        border: 1px solid oklch(0.9 0 0);
        border-radius: 8px;
        box-shadow: 0 4px 16px oklch(0 0 0 / 0.15);
        z-index: 9999;
        pointer-events: auto;
      `;
      
      const createMenuItem = (label: string, icon: string, onClick: () => void) => {
        const item = document.createElement('button');
        item.setAttribute('type', 'button');
        item.style.cssText = `
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 8px 12px;
          font-size: 13px;
          color: oklch(0.3 0 0);
          background: transparent;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s ease;
        `;
        item.innerHTML = `${icon}<span>${label}</span>`;
        item.addEventListener('mouseenter', () => {
          item.style.background = 'oklch(0.95 0 0)';
        });
        item.addEventListener('mouseleave', () => {
          item.style.background = 'transparent';
        });
        item.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick();
          dropdown.style.display = 'none';
          isDropdownOpen = false;
        });
        return item;
      };
      
      const editIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
      const copyIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      const saveIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;
      const copyUrlIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`;
      
      // Edit menu item — uses extensionOptions (captured from this.options above)
      dropdown.appendChild(createMenuItem('Edit', editIcon, () => {
        const pos = typeof getPos === 'function' ? getPos() : null;
        if (pos !== null && pos !== undefined && extensionOptions.onImageClick) {
          const rect = img.getBoundingClientRect();
          extensionOptions.onImageClick({
            src: currentNode.attrs.src,
            alt: currentNode.attrs.alt || '',
            pos,
            rect,
          });
        }
      }));
      
      // Copy image menu item — uses currentNode for latest src
      dropdown.appendChild(createMenuItem('Copy image', copyIcon, async () => {
        const src = currentNode.attrs.src;
        try {
          const response = await fetch(src);
          const blob = await response.blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [blob.type]: blob })
          ]);
        } catch {
          // Fallback: copy image URL
          try {
            await navigator.clipboard.writeText(src);
          } catch {
            // Silent fail
          }
        }
      }));

      // Copy URL menu item
      dropdown.appendChild(createMenuItem('Copy URL', copyUrlIcon, async () => {
        const src = currentNode.attrs.src;
        try {
          await navigator.clipboard.writeText(src);
        } catch {
          // Silent fail
        }
      }));
      
      // Save image menu item — uses currentNode for latest src, appends link to DOM
      dropdown.appendChild(createMenuItem('Save image', saveIcon, () => {
        const src = currentNode.attrs.src;
        const alt = currentNode.attrs.alt || 'image';
        const link = document.createElement('a');
        link.href = src;
        link.download = alt;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        // Clean up after a short delay
        setTimeout(() => {
          document.body.removeChild(link);
        }, 100);
      }));
      
      // Toggle dropdown on button click
      let isDropdownOpen = false;
      menuButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isDropdownOpen) {
          dropdown.style.display = 'none';
          isDropdownOpen = false;
        } else {
          const btnRect = menuButton.getBoundingClientRect();
          dropdown.style.top = `${btnRect.bottom + 4}px`;
          dropdown.style.left = `${btnRect.right - 140}px`;
          dropdown.style.display = 'flex';
          isDropdownOpen = true;
        }
      });
      
      // Close dropdown when clicking outside
      const closeDropdown = (e: MouseEvent) => {
        if (!dropdown.contains(e.target as Node) && !menuButton.contains(e.target as Node)) {
          dropdown.style.display = 'none';
          isDropdownOpen = false;
        }
      };
      document.addEventListener('click', closeDropdown);
      
      container.appendChild(img);
      container.appendChild(resizeHandle);
      container.appendChild(menuButton);
      // Append dropdown to the dialog content if inside a Radix Dialog,
      // otherwise to document.body. This ensures pointer-events work
      // because Radix Dialog sets pointer-events:none on <body>.
      const dialogContent = container.closest('[role="dialog"]');
      if (dialogContent) {
        dialogContent.appendChild(dropdown);
      } else {
        document.body.appendChild(dropdown);
      }
      
      // Show handle and menu button on hover
      container.addEventListener('mouseenter', () => {
        resizeHandle.style.opacity = '1';
        menuButton.style.opacity = '1';
      });
      container.addEventListener('mouseleave', () => {
        resizeHandle.style.opacity = '0';
        if (!isDropdownOpen) {
          menuButton.style.opacity = '0';
        }
      });
      
      // Hover effect on menu button
      menuButton.addEventListener('mouseenter', () => {
        menuButton.style.background = 'oklch(0.95 0 0)';
      });
      menuButton.addEventListener('mouseleave', () => {
        menuButton.style.background = 'oklch(0.98 0 0 / 0.95)';
      });

      
      // Resize logic
      let startX: number;
      let startWidth: number;
      
      const onMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        startX = e.clientX;
        startWidth = img.offsetWidth;
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };
      
      const onMouseMove = (e: MouseEvent) => {
        const diff = e.clientX - startX;
        const newWidth = Math.max(100, startWidth + diff);
        img.style.width = `${newWidth}px`;
      };
      
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        
        const pos = typeof getPos === 'function' ? getPos() : null;
        if (pos !== null && pos !== undefined) {
          editor.chain().focus().updateAttributes('resizableImage', {
            width: img.offsetWidth,
          }).run();
        }
      };
      
      resizeHandle.addEventListener('mousedown', onMouseDown);
      
      return {
        dom: container,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'resizableImage') {
            return false;
          }
          // Update the mutable reference so menu actions use latest values
          currentNode = updatedNode;
          img.src = updatedNode.attrs.src;
          img.alt = updatedNode.attrs.alt || '';
          if (updatedNode.attrs.width) {
            img.style.width = `${updatedNode.attrs.width}px`;
          }
          // Update alignment
          applyAlignment(updatedNode.attrs.align || 'left');
          return true;
        },
        destroy: () => {
          resizeHandle.removeEventListener('mousedown', onMouseDown);
          document.removeEventListener('click', closeDropdown);
          dropdown.remove();
        },
      };
    };
  },
});

export default ResizableImage;
