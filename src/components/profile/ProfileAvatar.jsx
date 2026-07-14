import { memo } from "react";
import { UserRound } from "lucide-react";

/**
 * Avatar block used in the profile header.
 *
 * @param {{ name: string, size?: string }} props - Avatar display props.
 * @returns {JSX.Element} Profile avatar element.
 */
const ProfileAvatar = memo(function ProfileAvatar({ name, size = "h-20 w-20" }) {
  const initials = (name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

  return (
    <div
      className={`flex items-center justify-center rounded-full border border-white/40 bg-white/20 text-2xl font-semibold text-white shadow-lg backdrop-blur ${size}`}
      aria-label={`${name || "Profile"} avatar`}
    >
      {initials ? initials : <UserRound size={24} />}
    </div>
  );
});

export default ProfileAvatar;
