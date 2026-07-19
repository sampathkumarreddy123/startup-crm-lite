import React from "react";

/**
 * Reusable Avatar Component
 * Generates a consistent premium background color based on name hashing.
 */
function Avatar({ name, size = "md" }) {
  const firstLetter = name ? name.trim().charAt(0).toUpperCase() : "?";

  // A premium SaaS color palette
  const colors = [
    "bg-indigo-500 text-white dark:bg-indigo-600",
    "bg-emerald-500 text-white dark:bg-emerald-600",
    "bg-blue-500 text-white dark:bg-blue-600",
    "bg-amber-500 text-white dark:bg-amber-600",
    "bg-rose-500 text-white dark:bg-rose-600",
    "bg-purple-500 text-white dark:bg-purple-600",
    "bg-teal-500 text-white dark:bg-teal-600",
    "bg-orange-500 text-white dark:bg-orange-600",
  ];

  const getHashIndex = (str) => {
    if (!str) return 0;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % colors.length;
  };

  const colorClass = colors[getHashIndex(name)];

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-lg",
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full font-bold shadow-sm select-none shrink-0 ${sizeClasses[size] || sizeClasses.md} ${colorClass}`}
      aria-hidden="true"
    >
      {firstLetter}
    </div>
  );
}

export default Avatar;
