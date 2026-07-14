import { memo } from "react";
import { ShieldCheck, KeyRound, MonitorSmartphone, Clock3 } from "lucide-react";

/**
 * Security and access overview for the current user.
 *
 * @param {{ profile: object }} props - Profile data.
 * @returns {JSX.Element} Security card.
 */
const SecurityCard = memo(function SecurityCard({ profile }) {
  const securityItems = [
    { label: "Username", value: profile.username },
    { label: "Account Status", value: profile.status },
    { label: "Last Login", value: profile.lastLogin },
    { label: "Last Password Change", value: profile.lastPasswordChange },
    { label: "Active Session", value: profile.activeSession }
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-rose-50 p-2.5 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Security</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Account safety and access controls</p>
        </div>
      </div>

      <div className="space-y-3">
        {securityItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/50">
            <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800" aria-label="Change password">
          <KeyRound size={16} />
          Change Password
        </button>
        <button type="button" className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800" aria-label="Manage sessions">
          <MonitorSmartphone size={16} />
          Manage Sessions
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Clock3 size={16} />
        Last activity synced 2 minutes ago
      </div>
    </section>
  );
});

export default SecurityCard;
