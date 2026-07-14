import { memo } from "react";
import { Building2, BriefcaseBusiness, MapPinHouse, Landmark, Users } from "lucide-react";

/**
 * Displays company and employment details for the current profile.
 *
 * @param {{ profile: object, isEditing: boolean, onFieldChange: (field: string, value: string) => void }} props - Card props.
 * @returns {JSX.Element} Company information card.
 */
const CompanyInfoCard = memo(function CompanyInfoCard({ profile, isEditing, onFieldChange }) {
  const details = [
    { label: "Company Name", value: profile.company, key: "company" },
    { label: "Department", value: profile.department, key: "department" },
    { label: "Designation", value: profile.designation, key: "designation" },
    { label: "Employee ID", value: profile.employeeId, key: "employeeId" },
    { label: "Office Location", value: profile.location, key: "location" },
    { label: "Joining Date", value: profile.joiningDate, key: "joiningDate" },
    { label: "Reporting Manager", value: profile.manager, key: "manager" }
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
          <Building2 size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Company Information</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Role, team, and work context</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {details.map((item) => (
          <label key={item.key} className="space-y-2 text-sm">
            <span className="font-medium text-gray-600 dark:text-gray-300">{item.label}</span>
            {isEditing ? (
              <input
                type="text"
                value={item.value || ""}
                onChange={(event) => onFieldChange(item.key, event.target.value)}
                className="min-h-[44px] w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 outline-none transition-colors duration-200 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                aria-label={item.label}
              />
            ) : (
              <div className="min-h-[44px] rounded-xl border border-gray-100 bg-gray-50/70 px-3 py-2.5 text-gray-700 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-200">
                {item.value || "—"}
              </div>
            )}
          </label>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
        <span className="inline-flex items-center gap-2">
          <BriefcaseBusiness size={16} />
          {profile.designation}
        </span>
        <span className="inline-flex items-center gap-2">
          <MapPinHouse size={16} />
          {profile.location}
        </span>
        <span className="inline-flex items-center gap-2">
          <Users size={16} />
          {profile.department}
        </span>
        <span className="inline-flex items-center gap-2">
          <Landmark size={16} />
          {profile.company}
        </span>
      </div>
    </section>
  );
});

export default CompanyInfoCard;
