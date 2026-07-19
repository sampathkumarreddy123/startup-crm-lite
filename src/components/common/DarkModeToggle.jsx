import { memo } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

/**
 * Premium Dark Mode Toggle Switch
 * Supports three variants:
 * - "default": Standard layout (desktop sidebar with icon + label)
 * - "compact": Compact icon-only button (mobile bottom nav or collapsed sidebar)
 * - "auth": High-contrast glassmorphic animated switch with hover and scale effects (Login/Register screens)
 *
 * @param {{ variant?: "default" | "compact" | "auth", compact?: boolean }} props
 */
const DarkModeToggle = memo(({ variant, compact = false }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  // Determine active layout variant (for backwards compatibility with `compact` prop)
  const activeVariant = variant || (compact ? "compact" : "default");

  // Premium Auth Page circular animated glassmorphic button
  if (activeVariant === "auth") {
    return (
      <button
        onClick={toggleTheme}
        className="
          group relative flex h-9 items-center gap-2 rounded-xl
          border border-slate-200 bg-white/90 px-3 text-slate-500 shadow-sm
          backdrop-blur-md transition-all duration-300 ease-in-out
          hover:scale-105 hover:border-blue-500 hover:text-blue-600
          active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-400
          dark:hover:border-blue-400 dark:hover:text-blue-400 dark:focus:ring-offset-slate-900
        "
        aria-label="Toggle Theme"
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {/* Container with overflow-hidden for a slide-and-rotate transition effect */}
        <div className="relative h-4 w-4 overflow-hidden">
          {/* Sun icon (visible in light mode, hidden with rotate & scale in dark mode) */}
          <Sun
            size={16}
            className={`
              absolute inset-0 transform transition-all duration-500 ease-out
              ${isDarkMode ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}
              text-amber-500 group-hover:text-amber-600
            `}
          />
          {/* Moon icon (visible in dark mode, hidden with rotate & scale in light mode) */}
          <Moon
            size={16}
            className={`
              absolute inset-0 transform transition-all duration-500 ease-out
              ${isDarkMode ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}
              text-indigo-400 group-hover:text-indigo-300
            `}
          />
        </div>
        <span className="text-xs font-semibold select-none">
          {isDarkMode ? "Dark" : "Light"}
        </span>
      </button>
    );
  }

  // Mobile navigation or collapsed sidebar icon-only layout
  if (activeVariant === "compact") {
    return (
      <button
        onClick={toggleTheme}
        className="p-3 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle Theme"
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    );
  }

  // Default sidebar layout (with Sun/Moon icon and "Light/Dark Mode" text)
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
        focus:outline-none focus:ring-2 focus:ring-blue-500
      "
      aria-label="Toggle Theme"
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      <span className="hidden lg:block text-sm font-medium">
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
});

DarkModeToggle.displayName = "DarkModeToggle";

export default DarkModeToggle;