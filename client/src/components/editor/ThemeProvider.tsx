import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { themes, EditorTheme, applyTheme } from './themes';

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

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface EditorThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  containerRef?: React.RefObject<HTMLElement>;
}

export function EditorThemeProvider({
  children,
  defaultTheme = 'dark',
  containerRef,
}: EditorThemeProviderProps) {
  const [themeName, setThemeName] = useState(defaultTheme);
  const theme = themes[themeName] || themes.dark;

  const setTheme = useCallback((name: string) => {
    if (themes[name]) {
      setThemeName(name);
    }
  }, []);

  // Apply theme to container when it changes
  useEffect(() => {
    if (containerRef?.current) {
      applyTheme(containerRef.current, theme);
    }
  }, [theme, containerRef]);

  const value: ThemeContextValue = {
    theme,
    themeName,
    setTheme,
    availableThemes: Object.keys(themes),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useEditorTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useEditorTheme must be used within an EditorThemeProvider');
  }
  return context;
}

export default EditorThemeProvider;
