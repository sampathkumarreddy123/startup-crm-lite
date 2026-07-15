import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

/**
 * Dark mode toggle button.
 * - Desktop sidebar (lg): shows icon + label text
 * - Desktop sidebar (md, collapsed): shows icon only
 * - Mobile bottom nav: icon only (compact variant via props)
 *
 * @param {{ compact?: boolean }} props
 */
function DarkModeToggle({ compact = false }) {
  const { isDarkMode, toggleTheme } = useTheme();

  if (compact) {
    // Icon-only version for mobile bottom nav
    return (
      <button
        onClick={toggleTheme}
        className="p-3 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="
        flex items-center
        justify-center lg:justify-start
        gap-3
        min-h-[44px]
        px-4
        rounded-xl
        bg-slate-100 dark:bg-gray-700
        text-gray-700 dark:text-gray-300
        hover:bg-slate-200 dark:hover:bg-gray-600
        transition-colors duration-200
      "
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      {/* Hide label on md (icon-only collapsed sidebar), show on lg */}
      <span className="hidden lg:block text-sm font-medium">
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
}

export default DarkModeToggle;