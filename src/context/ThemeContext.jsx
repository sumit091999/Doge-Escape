import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';

const themes = [
  {
    id: 'doge-classic',
    name: 'DogeOS Classic',
    shortName: 'Classic',
    icon: '☀️',
  },
];

const STORAGE_KEY = 'dogeescape_theme';
const defaultTheme = themes[0];

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const activeTheme = themes[0];

  useEffect(() => {
    document.documentElement.dataset.theme = activeTheme.id;
  }, [activeTheme.id]);

  const nextTheme = useCallback(() => {
    // No-op as there is only one theme
  }, []);

  const value = useMemo(
    () => ({
      themes,
      activeTheme,
      nextTheme,
      setThemeId: () => {}, // No-op
    }),
    [activeTheme, nextTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
