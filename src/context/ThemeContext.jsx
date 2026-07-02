import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ThemeContext = createContext();

/**
 * Theme Provider
 */
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] =
    useLocalStorage("startup-crm-theme", false);

  /**
   * Toggle Theme
   */
function toggleTheme() {
  setIsDarkMode((prev) => {
    const nextTheme = !prev;

    if (nextTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    return nextTheme;
  });
}
  /**
   * Apply theme on load
   */
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom Hook
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}