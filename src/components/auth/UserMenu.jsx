import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

/**
 * UserMenu — Avatar + name dropdown in the app header.
 * Shows Google profile photo if available, falls back to initials.
 *
 * @param {object} props
 * @param {object} props.user - Current authenticated user object
 */
export default function UserMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  /** Compute display initials from name */
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    navigate("/login");
  };

  const handleProfile = () => {
    setIsOpen(false);
    navigate("/profile");
  };

  const handleSettings = () => {
    setIsOpen(false);
    navigate("/profile");
  };

  return (
    <div ref={menuRef} className="relative" id="user-menu-container">
      {/* Trigger Button */}
      <button
        id="user-menu-trigger"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          flex items-center gap-2 rounded-xl border border-gray-200
          bg-white p-1.5 pl-2 pr-3 text-sm
          text-gray-700 transition-all duration-200
          hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
          dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200
          dark:hover:bg-gray-800 dark:hover:border-gray-600
        "
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Open user menu"
      >
        {/* Avatar */}
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || "User avatar"}
            className="h-7 w-7 rounded-lg object-cover ring-1 ring-gray-200 dark:ring-gray-700"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        {/* Initials fallback */}
        <span
          className={`
            h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600
            text-xs font-bold text-white
            items-center justify-center shrink-0
            ${user?.avatar ? "hidden" : "flex"}
          `}
          aria-hidden="true"
        >
          {getInitials(user?.name)}
        </span>

        {/* Name (hidden on very small screens) */}
        <span className="hidden max-w-[120px] truncate font-medium sm:block">
          {user?.name || "User"}
        </span>

        <ChevronDown
          size={14}
          className={`shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="
            absolute right-0 top-full z-50 mt-2
            w-56 origin-top-right
            rounded-2xl border border-gray-200 bg-white
            p-1.5 shadow-lg shadow-gray-200/60
            animate-[fadeIn_0.15s_ease-out]
            dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/60
          "
        >
          {/* User info header */}
          <div className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-700 mb-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
              {user?.email || ""}
            </p>
            {user?.googleId && (
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google Account
              </span>
            )}
          </div>

          {/* Menu items */}
          <button
            id="user-menu-profile"
            type="button"
            role="menuitem"
            onClick={handleProfile}
            className="
              flex w-full items-center gap-3 rounded-xl px-3 py-2.5
              text-sm text-gray-700 transition-colors duration-150
              hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700
            "
          >
            <User size={15} className="shrink-0 text-gray-400 dark:text-gray-500" />
            My Profile
          </button>

          <button
            id="user-menu-settings"
            type="button"
            role="menuitem"
            onClick={handleSettings}
            className="
              flex w-full items-center gap-3 rounded-xl px-3 py-2.5
              text-sm text-gray-700 transition-colors duration-150
              hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700
            "
          >
            <Settings size={15} className="shrink-0 text-gray-400 dark:text-gray-500" />
            Settings
          </button>

          <div className="my-1 border-t border-gray-100 dark:border-gray-700" />

          <button
            id="user-menu-logout"
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="
              flex w-full items-center gap-3 rounded-xl px-3 py-2.5
              text-sm font-medium text-red-600 transition-colors duration-150
              hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20
            "
          >
            <LogOut size={15} className="shrink-0" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
