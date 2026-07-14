import { memo } from "react";
import { BadgeCheck, CalendarDays, PencilLine, ShieldCheck } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";

/**
 * Hero header for the user profile page.
 * Shows Google profile photo if available, else falls back to initials avatar.
 *
 * @param {{ profile: object, isEditing: boolean, onEdit: () => void }} props
 * @returns {JSX.Element} Profile header card
 */
const ProfileHeader = memo(function ProfileHeader({ profile, isEditing, onEdit }) {
  const createdAt = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : "Recently joined";

  const status = profile?.isActive ? "Active" : "Inactive";
  const isGoogleUser = !!profile?.googleId;

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Avatar: Google photo or initials fallback */}
            {profile?.avatar ? (
              <div className="relative shrink-0">
                <img
                  src={profile.avatar}
                  alt={profile.name || "Profile photo"}
                  className="h-24 w-24 rounded-2xl object-cover ring-4 ring-white/30 shadow-xl"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Hidden initials fallback, shown only if img fails */}
                <div style={{ display: "none" }}>
                  <ProfileAvatar name={profile?.name || profile?.email || "User"} size="h-24 w-24" />
                </div>
                {/* Google badge overlay */}
                {isGoogleUser && (
                  <span
                    className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-white/50"
                    title="Signed in with Google"
                    aria-label="Signed in with Google"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </span>
                )}
              </div>
            ) : (
              <ProfileAvatar name={profile?.name || profile?.email || "User"} size="h-24 w-24" />
            )}

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {profile?.name || "Your profile"}
                  </h1>
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

                {profile?.role && (
                  <span className="text-blue-100">• {profile.role}</span>
                )}

                {/* Google verified badge */}
                {isGoogleUser && profile?.verifiedEmail && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium backdrop-blur">
                    <ShieldCheck size={13} className="text-emerald-300" />
                    Verified via Google
                  </span>
                )}
              </div>
            </div>
          </div>

          {!isEditing && !isGoogleUser && (
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
          {!isEditing && isGoogleUser && (
            <span className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur">
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white" opacity="0.9"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white" opacity="0.9"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white" opacity="0.9"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white" opacity="0.9"/>
              </svg>
              Managed by Google
            </span>
          )}
        </div>
      </div>
    </section>
  );
});

export default ProfileHeader;
