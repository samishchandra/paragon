import { Mark, mergeAttributes } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

/**
 * HexColorMark Extension
 * Auto-detects hex color values (#RGB, #RRGGBB, #RRGGBBAA) in text
 * and renders them with a background color swatch.
 * 
 * This is a decoration-only extension — it doesn't modify the document
 * structure, just visually highlights hex colors inline.
 */

/** Regex to match hex color values: #RGB, #RRGGBB, or #RRGGBBAA */
export const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;

/** Check if a string is a valid hex color */
export function isHexColor(str: string): boolean {
  return /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(str);
}

/**
 * Determine if a color is "light" (needs dark text) or "dark" (needs light text).
 * Uses relative luminance calculation.
 */
export function isLightColor(hex: string): boolean {
  // Normalize to 6-digit hex
  let color = hex.replace('#', '');
  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }
  if (color.length === 8) {
    // Strip alpha channel
    color = color.slice(0, 6);
  }
  
  const r = parseInt(color.slice(0, 2), 16) / 255;
  const g = parseInt(color.slice(2, 4), 16) / 255;
  const b = parseInt(color.slice(4, 6), 16) / 255;
  
  // Relative luminance (sRGB)
  const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const luminance = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  
  return luminance > 0.4;
}

const hexColorPluginKey = new PluginKey('hexColorDecoration');

export const HexColorMark = Mark.create({
  name: 'hexColor',
  
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: hexColorPluginKey,
        state: {
          init(_, { doc }) {
            return buildDecorations(doc);
          },
          apply(tr, oldDecorations) {
            if (tr.docChanged) {
              return buildDecorations(tr.doc);
            }
            return oldDecorations;
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      }),
    ];
  },
});

function buildDecorations(doc: any): DecorationSet {
  const decorations: Decoration[] = [];
  
  doc.descendants((node: any, pos: number) => {
    if (!node.isText) return;
    
    const text = node.text || '';
    let match: RegExpExecArray | null;
    const regex = new RegExp(HEX_COLOR_REGEX.source, 'g');
    
    while ((match = regex.exec(text)) !== null) {
      const from = pos + match.index;
      const to = from + match[0].length;
      const hexColor = match[0];
      const light = isLightColor(hexColor);
      
      decorations.push(
        Decoration.inline(from, to, {
          class: 'hex-color-swatch',
          style: `background-color: ${hexColor}; color: ${light ? '#1a1a1a' : '#ffffff'}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`,
        })
      );
    }
  });
  
  return DecorationSet.create(doc, decorations);
}

export default HexColorMark;
