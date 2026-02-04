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
        default: 'center',
        parseHTML: (element: HTMLElement) => element.getAttribute('data-align') || 'center',
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
    return ({ node, editor, getPos }) => {
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
      applyAlignment(node.attrs.align || 'center');
      
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
        width: 20px;
        height: 20px;
        background: var(--primary);
        border-radius: 4px;
        cursor: se-resize;
        opacity: 0;
        transition: opacity 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px oklch(0 0 0 / 0.2);
      `;
      // Add diagonal resize SVG icon (se-resize arrows) - rotated 90 degrees
      resizeHandle.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(90deg);">
          <polyline points="15 3 21 3 21 9"></polyline>
          <polyline points="9 21 3 21 3 15"></polyline>
          <line x1="21" y1="3" x2="14" y2="10"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
      `;

      // Edit hint overlay
      const editHint = document.createElement('div');
      editHint.classList.add('image-edit-hint');
      editHint.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 4px 8px;
        font-size: 11px;
        font-weight: 500;
        color: white;
        background: oklch(0 0 0 / 0.6);
        border-radius: 4px;
        opacity: 0;
        transition: opacity 0.15s ease;
        pointer-events: none;
      `;
      editHint.textContent = 'Double-click to edit';
      
      container.appendChild(img);
      container.appendChild(resizeHandle);
      container.appendChild(editHint);
      
      // Show handle and hint on hover
      container.addEventListener('mouseenter', () => {
        resizeHandle.style.opacity = '1';
        editHint.style.opacity = '1';
      });
      container.addEventListener('mouseleave', () => {
        resizeHandle.style.opacity = '0';
        editHint.style.opacity = '0';
      });

      // Double-click to edit image
      img.addEventListener('dblclick', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const pos = typeof getPos === 'function' ? getPos() : null;
        if (pos !== null && pos !== undefined && this.options.onImageClick) {
          const rect = img.getBoundingClientRect();
          this.options.onImageClick({
            src: node.attrs.src,
            alt: node.attrs.alt || '',
            pos,
            rect,
          });
        }
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
          img.src = updatedNode.attrs.src;
          img.alt = updatedNode.attrs.alt || '';
          if (updatedNode.attrs.width) {
            img.style.width = `${updatedNode.attrs.width}px`;
          }
          // Update alignment
          applyAlignment(updatedNode.attrs.align || 'center');
          return true;
        },
        destroy: () => {
          resizeHandle.removeEventListener('mousedown', onMouseDown);
        },
      };
    };
  },
});

export default ResizableImage;
