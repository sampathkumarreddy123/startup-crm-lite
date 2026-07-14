import { memo, useMemo } from "react";
import { Mail, UserCircle2 } from "lucide-react";

/**
 * Displays the actual user profile fields stored from account creation.
 *
 * @param {{ profile: object, isEditing: boolean, onFieldChange: (field: string, value: string) => void }} props - Card props.
 * @returns {JSX.Element} Personal information card.
 */
const PersonalInfoCard = memo(function PersonalInfoCard({ profile, isEditing, onFieldChange }) {
  const fields = useMemo(() => {
    const entries = [];

    if (profile?.name) {
      entries.push({ label: "Full Name", value: profile.name, key: "name" });
    }

    if (profile?.email) {
      entries.push({ label: "Email", value: profile.email, key: "email" });
    }

    return entries;
  }, [profile]);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
          <UserCircle2 size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Only the details stored at registration are shown here</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.key} className="space-y-2 text-sm">
            <span className="font-medium text-gray-600 dark:text-gray-300">{field.label}</span>
            {isEditing && field.key === "name" ? (
              <input
                type="text"
                value={field.value || ""}
                onChange={(event) => onFieldChange(field.key, event.target.value)}
                className="min-h-[44px] w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 outline-none transition-colors duration-200 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                aria-label={field.label}
              />
            ) : (
              <div className="min-h-[44px] rounded-xl border border-gray-100 bg-gray-50/70 px-3 py-2.5 text-gray-700 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-200">
                {field.value || "—"}
              </div>
            )}
          </label>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <span className="inline-flex items-center gap-2">
          <Mail size={16} />
          {profile?.email || "No email available"}
        </span>
      </div>
    </section>
  );
});

export default PersonalInfoCard;
