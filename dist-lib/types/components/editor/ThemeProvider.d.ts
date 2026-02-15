import { ReactNode } from 'react';
import { EditorTheme } from './themes';
/**
 * DESIGN: Dark Mode Craftsman
 * Theme provider for the markdown editor
 * Supports multiple themes and custom theme creation
 */
interface ThemeContextValue {
    theme: EditorTheme;
    themeName: string;
    setTheme: (name: string) => void;
    availableThemes: string[];
}
interface EditorThemeProviderProps {
    children: ReactNode;
    defaultTheme?: string;
    containerRef?: React.RefObject<HTMLElement>;
}
export declare function EditorThemeProvider({ children, defaultTheme, containerRef, }: EditorThemeProviderProps): import("react").JSX.Element;
export declare function useEditorTheme(): ThemeContextValue;
export default EditorThemeProvider;
