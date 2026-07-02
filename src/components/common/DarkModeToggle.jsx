import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function DarkModeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-200 dark:bg-gray-700 transition-colors duration-200"
    >
      {isDarkMode ? (
        <>
          <Moon size={18} />
          <span>Dark</span>
        </>
      ) : (
        <>
          <Sun size={18} />
          <span>Light</span>
        </>
      )}
    </button>
  );
}

export default DarkModeToggle;