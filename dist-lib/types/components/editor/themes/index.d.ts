/**
 * Manus Markdown Editor - Theming System
 *
 * This module provides a comprehensive theming system for the markdown editor.
 * Themes can be applied by setting CSS variables on the editor container.
 *
 * DESIGN: Dark Mode Craftsman
 * Multi-layer dark theme with depth through layering
 * Glassmorphic elements with backdrop blur
 * Vibrant cyan accent for interactive elements
 */
export interface EditorTheme {
    name: string;
    description: string;
    variables: Record<string, string>;
}
export declare const darkTheme: EditorTheme;
export declare const lightTheme: EditorTheme;
export declare const sepiaTheme: EditorTheme;
export declare const nordTheme: EditorTheme;
export declare const themes: Record<string, EditorTheme>;
/**
 * Apply a theme to an element by setting CSS variables
 */
export declare function applyTheme(element: HTMLElement, theme: EditorTheme): void;
/**
 * Create a custom theme by extending an existing theme
 */
export declare function createCustomTheme(baseName: string, name: string, description: string, overrides: Record<string, string>): EditorTheme;
export default themes;
