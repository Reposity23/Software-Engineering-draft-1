import React, { createContext, useContext, useMemo, useState } from "react";

const ThemeModeContext = createContext(null);

const THEME_KEY = "joap-theme-mode";

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem(THEME_KEY) || "light");

  const toggleMode = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem(THEME_KEY, next);
  };

  const value = useMemo(() => ({ mode, toggleMode, setMode }), [mode]);

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
};

export const useThemeMode = () => useContext(ThemeModeContext);
