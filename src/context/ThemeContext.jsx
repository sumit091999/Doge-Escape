import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const themes = [
  {
    id: 'doge-classic',
    name: 'DogeOS Classic',
    shortName: 'Classic',
    icon: '☀️',
  },
  {
    id: 'such-wow-arcade',
    name: 'Such Wow Arcade',
    shortName: 'Arcade',
    icon: '🌙',
  },
  {
    id: 'doge-network-state',
    name: 'Doge Network State',
    shortName: 'Network',
    icon: '✨',
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

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return defaultTheme.id;
  }

  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  return themes.some((theme) => theme.id === savedTheme) ? savedTheme : defaultTheme.id;
};

export const ThemeProvider = ({ children }) => {
  const [themeId, setThemeId] = useState(getInitialTheme);

  const activeTheme = useMemo(
    () => themes.find((theme) => theme.id === themeId) || defaultTheme,
    [themeId]
  );

  useEffect(() => {
    document.documentElement.dataset.theme = activeTheme.id;
    window.localStorage.setItem(STORAGE_KEY, activeTheme.id);
  }, [activeTheme.id]);

  const nextTheme = useCallback(() => {
    setThemeId((currentThemeId) => {
      const currentIndex = themes.findIndex((theme) => theme.id === currentThemeId);
      return themes[(currentIndex + 1) % themes.length].id;
    });
  }, []);

  const value = useMemo(
    () => ({
      themes,
      activeTheme,
      nextTheme,
      setThemeId,
    }),
    [activeTheme, nextTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
