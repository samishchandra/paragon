import { Mark } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

/**
 * HexColorMark Extension
 * Auto-detects hex color values (#RGB, #RRGGBB, #RRGGBBAA) in text
 * and renders them with a background color swatch.
 * 
 * This is a decoration-only extension — it doesn't modify the document
 * structure, just visually highlights hex colors inline.
 * 
 * PERFORMANCE: Uses incremental decoration mapping. On each transaction,
 * only the changed ranges are re-scanned. Unchanged decorations are mapped
 * through the transaction's mapping to their new positions. This avoids
 * O(n) full-document traversal on every keystroke.
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

/** Build decorations for hex colors within a specific range of the document */
function buildDecorationsInRange(doc: any, from: number, to: number): Decoration[] {
  const decorations: Decoration[] = [];
  
  doc.nodesBetween(from, to, (node: any, pos: number) => {
    if (!node.isText) return;
    
    const text = node.text || '';
    let match: RegExpExecArray | null;
    const regex = new RegExp(HEX_COLOR_REGEX.source, 'g');
    
    while ((match = regex.exec(text)) !== null) {
      const decorFrom = pos + match.index;
      const decorTo = decorFrom + match[0].length;
      // Only include decorations that overlap with the requested range
      if (decorTo >= from && decorFrom <= to) {
        const hexColor = match[0];
        const light = isLightColor(hexColor);
        
        decorations.push(
          Decoration.inline(decorFrom, decorTo, {
            class: 'hex-color-swatch',
            style: `background-color: ${hexColor}; color: ${light ? '#1a1a1a' : '#ffffff'}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`,
          })
        );
      }
    }
  });
  
  return decorations;
}

/** Build decorations for the entire document (used on init) */
function buildAllDecorations(doc: any): DecorationSet {
  const decorations = buildDecorationsInRange(doc, 0, doc.content.size);
  return DecorationSet.create(doc, decorations);
}

export const HexColorMark = Mark.create({
  name: 'hexColor',
  
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: hexColorPluginKey,
        state: {
          init(_, { doc }) {
            return buildAllDecorations(doc);
          },
          apply(tr, oldDecorations) {
            if (!tr.docChanged) {
              return oldDecorations;
            }
            
            // Map existing decorations through the transaction
            let decorations = oldDecorations.map(tr.mapping, tr.doc);
            
            // Collect changed ranges from the transaction steps
            // We need to re-scan these ranges for hex colors
            const changedRanges: Array<{ from: number; to: number }> = [];
            tr.mapping.maps.forEach((stepMap, i) => {
              stepMap.forEach((oldStart, oldEnd, newStart, newEnd) => {
                // Expand range to cover full text nodes that might be affected
                // Add a small buffer to catch hex colors that span the boundary
                const from = Math.max(0, newStart - 10);
                const to = Math.min(tr.doc.content.size, newEnd + 10);
                changedRanges.push({ from, to });
              });
            });
            
            if (changedRanges.length === 0) {
              return decorations;
            }
            
            // Merge overlapping ranges
            changedRanges.sort((a, b) => a.from - b.from);
            const merged: Array<{ from: number; to: number }> = [changedRanges[0]];
            for (let i = 1; i < changedRanges.length; i++) {
              const last = merged[merged.length - 1];
              if (changedRanges[i].from <= last.to) {
                last.to = Math.max(last.to, changedRanges[i].to);
              } else {
                merged.push(changedRanges[i]);
              }
            }
            
            // For each changed range: remove old decorations, add new ones
            for (const range of merged) {
              // Remove decorations in the changed range
              decorations = decorations.remove(
                decorations.find(range.from, range.to)
              );
              
              // Build new decorations for the changed range
              const newDecorations = buildDecorationsInRange(tr.doc, range.from, range.to);
              if (newDecorations.length > 0) {
                decorations = decorations.add(tr.doc, newDecorations);
              }
            }
            
            return decorations;
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

export default HexColorMark;
