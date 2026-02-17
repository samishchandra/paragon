import Image from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/core';

export interface ResizableImageOptions {
  HTMLAttributes: Record<string, unknown>;
  allowBase64: boolean;
  onImageClick?: (attrs: { src: string; alt: string; pos: number; rect: DOMRect }) => void;
  /**
   * Resolve an image src reference to a displayable URL.
   * Called for images whose src is not a data: URL, blob: URL, or http(s) URL.
   * Should return a blob: URL or data: URL that the browser can display.
   */
  resolveImageSrc?: (src: string) => Promise<string>;
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
      resolveImageSrc: undefined,
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
      img.alt = node.attrs.alt || '';
      if (node.attrs.width) {
        img.style.width = `${node.attrs.width}px`;
      }

      // Helper: check if a src needs resolution (not a standard displayable URL)
      const needsResolution = (src: string) => {
        if (!src) return false;
        // Standard displayable URLs don't need resolution
        if (src.startsWith('data:')) return false;
        if (src.startsWith('blob:')) return false;
        if (src.startsWith('http://')) return false;
        if (src.startsWith('https://')) return false;
        // Relative paths and custom protocols need resolution
        return true;
      };

      // Helper: resolve and set image src
      const resolveAndSetSrc = (src: string) => {
        if (needsResolution(src) && extensionOptions.resolveImageSrc) {
          // Set a loading placeholder while resolving
          img.style.opacity = '0.5';
          img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E';
          extensionOptions.resolveImageSrc(src).then((resolvedUrl) => {
            img.src = resolvedUrl;
            img.style.opacity = '1';
          }).catch(() => {
            // Fallback: try using the original src directly
            img.src = src;
            img.style.opacity = '1';
          });
        } else {
          img.src = src;
        }
      };

      // Set initial src (resolve if needed)
      resolveAndSetSrc(node.attrs.src);
      
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
        min-width: 200px;
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

      // --- Alignment toggle (3-button segmented control) ---
      const alignSeparator = document.createElement('div');
      alignSeparator.style.cssText = `
        height: 1px;
        background: oklch(0.92 0 0);
        margin: 4px 8px;
      `;
      dropdown.appendChild(alignSeparator);

      const alignLabel = document.createElement('div');
      alignLabel.style.cssText = `
        font-size: 11px;
        font-weight: 500;
        color: oklch(0.55 0 0);
        padding: 4px 12px 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `;
      alignLabel.textContent = 'Alignment';
      dropdown.appendChild(alignLabel);

      const alignContainer = document.createElement('div');
      alignContainer.style.cssText = `
        display: flex;
        margin: 4px 8px 4px;
        background: oklch(0.94 0 0);
        border-radius: 8px;
        padding: 3px;
        gap: 2px;
      `;

      const alignOptions: Array<{ value: string; label: string; icon: string }> = [
        {
          value: 'left',
          label: 'Left',
          icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>`,
        },
        {
          value: 'center',
          label: 'Center',
          icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>`,
        },
        {
          value: 'right',
          label: 'Right',
          icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>`,
        },
      ];

      const alignButtons: HTMLButtonElement[] = [];

      const updateAlignButtons = (activeAlign: string) => {
        alignButtons.forEach((btn) => {
          const val = btn.getAttribute('data-align-value') || 'left';
          if (val === activeAlign) {
            btn.style.background = 'oklch(1 0 0)';
            btn.style.boxShadow = '0 1px 3px oklch(0 0 0 / 0.1)';
            btn.style.color = 'oklch(0.25 0 0)';
            btn.style.fontWeight = '600';
          } else {
            btn.style.background = 'transparent';
            btn.style.boxShadow = 'none';
            btn.style.color = 'oklch(0.5 0 0)';
            btn.style.fontWeight = '400';
          }
        });
      };

      alignOptions.forEach(({ value, label, icon }) => {
        const btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.setAttribute('data-align-value', value);
        btn.setAttribute('title', `Align ${label.toLowerCase()}`);
        btn.style.cssText = `
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 5px 8px;
          font-size: 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        `;
        btn.innerHTML = `${icon}<span>${label}</span>`;
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const pos = typeof getPos === 'function' ? getPos() : null;
          if (pos !== null && pos !== undefined) {
            try {
              const { state, dispatch } = editor.view;
              const nodeAtPos = state.doc.nodeAt(pos);
              if (nodeAtPos && nodeAtPos.type.name === 'resizableImage') {
                const tr = state.tr.setNodeMarkup(pos, undefined, {
                  ...nodeAtPos.attrs,
                  align: value,
                });
                dispatch(tr);
              }
            } catch {
              editor.chain().focus().setNodeSelection(pos).updateAttributes('resizableImage', {
                align: value,
              }).run();
            }
          }
          updateAlignButtons(value);
          // Don't close dropdown — let user see the change
        });
        alignButtons.push(btn);
        alignContainer.appendChild(btn);
      });

      dropdown.appendChild(alignContainer);

      // Update alignment buttons when dropdown opens
      const refreshAlignState = () => {
        const currentAlign = currentNode.attrs.align || 'left';
        updateAlignButtons(currentAlign);
      };
      
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
          const dropdownWidth = 200;
          
          // If dropdown is inside a dialog, we need to offset by the dialog's position
          // because position:fixed inside a transformed element is relative to that element
          const dialogContent = dropdown.closest('[role="dialog"]');
          let offsetX = 0;
          let offsetY = 0;
          if (dialogContent) {
            const dialogRect = dialogContent.getBoundingClientRect();
            offsetX = dialogRect.left;
            offsetY = dialogRect.top;
          }
          
          let top = btnRect.bottom + 4 - offsetY;
          let left = btnRect.right - dropdownWidth - offsetX;
          
          // Viewport boundary clamping
          const viewportHeight = window.innerHeight;
          const viewportWidth = window.innerWidth;
          const estimatedDropdownHeight = 200; // approximate max height
          
          // If dropdown would go below viewport, position above the button
          if (btnRect.bottom + 4 + estimatedDropdownHeight > viewportHeight) {
            top = btnRect.top - estimatedDropdownHeight - 4 - offsetY;
          }
          
          // Clamp left to stay within viewport
          if (left + offsetX < 8) {
            left = 8 - offsetX;
          }
          if (left + dropdownWidth + offsetX > viewportWidth - 8) {
            left = viewportWidth - dropdownWidth - 8 - offsetX;
          }
          
          dropdown.style.top = `${top}px`;
          dropdown.style.left = `${left}px`;
          dropdown.style.display = 'flex';
          isDropdownOpen = true;
          refreshAlignState();
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
      
      // --- Magnifier button (top-right, to the left of 3-dot menu) ---
      const magnifyBtn = document.createElement('button');
      magnifyBtn.setAttribute('type', 'button');
      magnifyBtn.setAttribute('title', 'View full size');
      magnifyBtn.style.cssText = `
        position: absolute;
        top: 8px;
        right: 40px;
        width: 28px;
        height: 28px;
        background: oklch(0.98 0 0 / 0.95);
        border: 1px solid oklch(0.85 0 0);
        border-radius: 6px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.15s ease, background 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px oklch(0 0 0 / 0.15);
        z-index: 10;
        padding: 0;
      `;
      magnifyBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.4 0 0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      `;
      magnifyBtn.addEventListener('mouseenter', () => {
        magnifyBtn.style.background = 'oklch(0.95 0 0)';
      });
      magnifyBtn.addEventListener('mouseleave', () => {
        magnifyBtn.style.background = 'oklch(0.98 0 0 / 0.95)';
      });

      container.appendChild(img);
      container.appendChild(magnifyBtn);
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
      
      // Show handle, menu button, and magnify button on hover
      container.addEventListener('mouseenter', () => {
        resizeHandle.style.opacity = '1';
        menuButton.style.opacity = '1';
        magnifyBtn.style.opacity = '1';
      });
      container.addEventListener('mouseleave', () => {
        resizeHandle.style.opacity = '0';
        magnifyBtn.style.opacity = '0';
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

      let isResizing = false;

      const openLightbox = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: zoom-out;
          opacity: 0;
          transition: opacity 0.2s ease;
          padding: 24px;
        `;

        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        lightboxImg.style.cssText = `
          max-width: 95vw;
          max-height: 92vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
          transform: scale(0.92);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        `;

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.setAttribute('type', 'button');
        closeBtn.setAttribute('aria-label', 'Close');
        closeBtn.style.cssText = `
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.15);
          color: white;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
          z-index: 1;
        `;
        closeBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        closeBtn.addEventListener('mouseenter', () => { closeBtn.style.background = 'rgba(255, 255, 255, 0.25)'; });
        closeBtn.addEventListener('mouseleave', () => { closeBtn.style.background = 'rgba(255, 255, 255, 0.15)'; });

        // Alt text caption
        const altText = currentNode.attrs.alt;
        let caption: HTMLElement | null = null;
        if (altText && altText.trim()) {
          caption = document.createElement('div');
          caption.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            max-width: 80vw;
            padding: 8px 16px;
            background: rgba(0, 0, 0, 0.6);
            color: rgba(255, 255, 255, 0.9);
            font-size: 13px;
            border-radius: 6px;
            text-align: center;
            pointer-events: none;
          `;
          caption.textContent = altText;
        }

        const closeLightbox = () => {
          overlay.style.opacity = '0';
          lightboxImg.style.transform = 'scale(0.92)';
          setTimeout(() => overlay.remove(), 200);
        };

        overlay.addEventListener('click', (ev) => {
          if (ev.target === overlay) closeLightbox();
        });
        closeBtn.addEventListener('click', closeLightbox);

        // Close on Escape key
        const onKeyDown = (ev: KeyboardEvent) => {
          if (ev.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', onKeyDown);
          }
        };
        document.addEventListener('keydown', onKeyDown);

        overlay.appendChild(lightboxImg);
        overlay.appendChild(closeBtn);
        if (caption) overlay.appendChild(caption);

        // Append to dialog if inside one, otherwise to body
        const dialogEl = container.closest('[role="dialog"]');
        if (dialogEl) {
          dialogEl.appendChild(overlay);
        } else {
          document.body.appendChild(overlay);
        }

        // Animate in
        requestAnimationFrame(() => {
          overlay.style.opacity = '1';
          lightboxImg.style.transform = 'scale(1)';
        });
      };

      magnifyBtn.addEventListener('click', openLightbox);

      // Resize logic
      let startX: number;
      let startWidth: number;
      
      const onMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        isResizing = true;
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
        // Delay clearing the flag so the click event from mouseup doesn't trigger lightbox
        setTimeout(() => { isResizing = false; }, 100);
        
        const pos = typeof getPos === 'function' ? getPos() : null;
        const newWidth = img.offsetWidth;
        if (pos !== null && pos !== undefined) {
          // Use setNodeMarkup with explicit position instead of updateAttributes
          // which relies on the current selection and may fail if focus() moves it
          try {
            const { state, dispatch } = editor.view;
            const node = state.doc.nodeAt(pos);
            if (node && node.type.name === 'resizableImage') {
              const tr = state.tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                width: newWidth,
              });
              dispatch(tr);
            }
          } catch (e) {
            // Fallback: try updateAttributes with selection at the node position
            editor.chain().focus().setNodeSelection(pos).updateAttributes('resizableImage', {
              width: newWidth,
            }).run();
          }
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
          // Resolve src if it's a relative path or custom protocol
          resolveAndSetSrc(updatedNode.attrs.src);
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
          magnifyBtn.removeEventListener('click', openLightbox);
          document.removeEventListener('click', closeDropdown);
          dropdown.remove();
        },
      };
    };
  },
});

export default ResizableImage;
