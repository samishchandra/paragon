import { Mark } from '@tiptap/core';
/**
 * HexColorMark Extension
 * Auto-detects hex color values (#RGB, #RRGGBB, #RRGGBBAA) in text
 * and renders them with a background color swatch.
 *
 * This is a decoration-only extension — it doesn't modify the document
 * structure, just visually highlights hex colors inline.
 */
/** Regex to match hex color values: #RGB, #RRGGBB, or #RRGGBBAA */
export declare const HEX_COLOR_REGEX: RegExp;
/** Check if a string is a valid hex color */
export declare function isHexColor(str: string): boolean;
/**
 * Determine if a color is "light" (needs dark text) or "dark" (needs light text).
 * Uses relative luminance calculation.
 */
export declare function isLightColor(hex: string): boolean;
export declare const HexColorMark: Mark<any, any>;
export default HexColorMark;
