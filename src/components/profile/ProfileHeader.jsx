import { memo } from "react";
import { BadgeCheck, CalendarDays, PencilLine } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";

/**
 * Hero header for the user profile page.
 *
 * @param {{ profile: object, isEditing: boolean, onEdit: () => void }} props - Profile header props.
 * @returns {JSX.Element} Profile header card.
 */
const ProfileHeader = memo(function ProfileHeader({ profile, isEditing, onEdit }) {
  const createdAt = profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "Recently joined";
  const status = profile?.isActive ? "Active" : "Inactive";

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <ProfileAvatar name={profile?.name || profile?.email || "User"} size="h-24 w-24" />

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{profile?.name || "Your profile"}</h1>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white/95 backdrop-blur">
                    <BadgeCheck size={16} />
                    {status}
                  </span>
                </div>
                <p className="text-sm text-blue-50 sm:text-base">{profile?.email || "No email stored"}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-50">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} />
                  Member since {createdAt}
                </span>
                {profile?.role ? <span className="text-blue-100">• {profile.role}</span> : null}
              </div>
            </div>
          </div>

          {isEditing ? null : (
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/25"
              aria-label="Edit profile"
            >
              <PencilLine size={16} />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </section>
  );
});

export default ProfileHeader;
