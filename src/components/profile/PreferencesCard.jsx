import { memo } from "react";
import { SlidersHorizontal, Globe2, CircleDollarSign, CalendarDays, Clock3 } from "lucide-react";

/**
 * Preference controls for appearance and regional settings.
 *
 * @param {{ preferences: object, onPreferenceChange: (field: string, value: string) => void }} props - Preference props.
 * @returns {JSX.Element} Preferences card.
 */
const PreferencesCard = memo(function PreferencesCard({ preferences, onPreferenceChange }) {
  const options = [
    { label: "Dark Mode", key: "darkMode", type: "toggle", value: preferences.darkMode },
    { label: "Language", key: "language", type: "select", options: ["English", "Hindi", "Telugu"], value: preferences.language },
    { label: "Currency", key: "currency", type: "select", options: ["USD", "EUR", "INR"], value: preferences.currency },
    { label: "Date Format", key: "dateFormat", type: "select", options: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"], value: preferences.dateFormat },
    { label: "Time Zone", key: "timeZone", type: "select", options: ["UTC", "IST", "America/New_York"], value: preferences.timeZone } 
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
          <SlidersHorizontal size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Preferences</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Adjust your workspace experience</p>
        </div>
      </div>

      <div className="space-y-4">
        {options.map((option) => (
          <label key={option.key} className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50/70 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/50">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              {option.key === "darkMode" && <SlidersHorizontal size={16} />}
              {option.key === "language" && <Globe2 size={16} />}
              {option.key === "currency" && <CircleDollarSign size={16} />}
              {option.key === "dateFormat" && <CalendarDays size={16} />}
              {option.key === "timeZone" && <Clock3 size={16} />}
              <span>{option.label}</span>
            </div>

            {option.type === "toggle" ? (
              <button
                type="button"
                onClick={() => onPreferenceChange(option.key, String(!preferences.darkMode))}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 ${preferences.darkMode ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"}`}
                aria-label={`Toggle ${option.label}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ${preferences.darkMode ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            ) : (
              <select
                value={option.value}
                onChange={(event) => onPreferenceChange(option.key, event.target.value)}
                className="min-h-[44px] rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                aria-label={option.label}
              >
                {option.options.map((choice) => (
                  <option key={choice} value={choice}>
                    {choice}
                  </option>
                ))}
              </select>
            )}
          </label>
        ))}
      </div>
    </section>
  );
});

export default PreferencesCard;
