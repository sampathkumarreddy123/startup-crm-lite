import { memo, useMemo } from "react";
import { Mail, UserCircle2, Save, ShieldCheck } from "lucide-react";

/**
 * Displays the actual user profile fields stored from account creation.
 * Supports both email/password and Google OAuth user profiles.
 *
 * @param {{ profile: object, isEditing: boolean, onFieldChange: (field: string, value: string) => void, onSave: () => void, onCancel: () => void }} props
 * @returns {JSX.Element} Personal information card
 */
const PersonalInfoCard = memo(function PersonalInfoCard({
  profile,
  isEditing,
  onFieldChange,
  onSave,
  onCancel
}) {
  const isGoogleUser = !!profile?.googleId;

  const fields = useMemo(() => {
    const entries = [];

    if (profile?.name) {
      entries.push({ label: "Full Name", value: profile.name, key: "name" });
    }

    if (profile?.email) {
      entries.push({ label: "Email Address", value: profile.email, key: "email" });
    }

    return entries;
  }, [profile]);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
            <UserCircle2 size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Personal Information
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isGoogleUser
                ? "Profile synced from your Google account"
                : "Details stored at registration"}
            </p>
          </div>
        </div>

        {/* Google account badge */}
        {isGoogleUser && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <svg className="h-3 w-3" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google Account
          </span>
        )}
      </div>

      {/* Fields grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.key} className="space-y-2 text-sm">
            <span className="font-medium text-gray-600 dark:text-gray-300">{field.label}</span>

            {/* Name is editable only for non-Google users */}
            {isEditing && field.key === "name" && !isGoogleUser ? (
              <input
                type="text"
                value={field.value || ""}
                onChange={(event) => onFieldChange(field.key, event.target.value)}
                className="min-h-[44px] w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 outline-none transition-colors duration-200 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                aria-label={field.label}
              />
            ) : (
              <div className="flex min-h-[44px] items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/70 px-3 py-2.5 text-gray-700 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-200">
                <span className="flex-1 truncate">{field.value || "—"}</span>
                {/* Verified email badge */}
                {field.key === "email" && profile?.verifiedEmail && (
                  <ShieldCheck
                    size={15}
                    className="shrink-0 text-emerald-500"
                    aria-label="Email verified by Google"
                    title="Email verified by Google"
                  />
                )}
              </div>
            )}
          </label>
        ))}
      </div>

      {/* Google managed notice */}
      {isGoogleUser && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-sm text-blue-600 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-blue-400">
          <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Your name and email are managed by Google. To update them, visit your{" "}
            <a
              href="https://myaccount.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300"
            >
              Google Account
            </a>.
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Mail size={16} />
          {profile?.email || "No email available"}
        </div>

        {isEditing && !isGoogleUser && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onSave}
              className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700 shadow-sm"
              aria-label="Save changes to profile"
            >
              <Save size={16} />
              Save Changes
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              aria-label="Cancel editing details"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  );
});

export default PersonalInfoCard;
