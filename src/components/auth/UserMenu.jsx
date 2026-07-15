import { useNavigate } from "react-router-dom";

/**
 * UserMenu — Clicking the avatar/name navigates directly to the Profile page.
 *
 * @param {object} props
 * @param {object} props.user - Current authenticated user object
 */
export default function UserMenu({ user }) {
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return "U";
    return name.trim().split(" ").filter(Boolean).slice(0, 2)
      .map((p) => p[0].toUpperCase()).join("");
  };

  return (
    <button
      id="user-menu-trigger"
      type="button"
      onClick={() => navigate("/profile")}
      className="
        flex items-center gap-2 rounded-xl border border-gray-200
        bg-white p-1.5 pl-2 pr-3 text-sm text-gray-700
        transition-all duration-200
        hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
        dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200
        dark:hover:bg-gray-800 dark:hover:border-gray-600
      "
      aria-label="Go to profile"
    >
      {/* Avatar image */}
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={user.name || "User"}
          className="h-7 w-7 rounded-lg object-cover ring-1 ring-gray-200 dark:ring-gray-700"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}

      {/* Initials fallback */}
      <span
        className={`h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600
          text-xs font-bold text-white items-center justify-center shrink-0
          ${user?.avatar ? "hidden" : "flex"}`}
        aria-hidden="true"
      >
        {getInitials(user?.name)}
      </span>

      {/* Name */}
      <span className="hidden max-w-[120px] truncate font-medium sm:block">
        {user?.name || "User"}
      </span>
    </button>
  );
}
