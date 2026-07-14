import { memo } from "react";
import { Download, FileText, LogOut, Settings } from "lucide-react";

/**
 * Primary action controls for the profile experience.
 *
 * @param {{ onExport: () => void, onDownloadReport: () => void, onLogout: () => void }} props - Action props.
 * @returns {JSX.Element} Profile action card.
 */
const ProfileActions = memo(function ProfileActions({ onExport, onDownloadReport, onLogout }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400">
          <Settings size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Actions</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your profile and exports</p>
        </div>
      </div>

      <div className="grid gap-3">
        <button type="button" onClick={onExport} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800" aria-label="Export account data">
          <Download size={16} />
          Export My Data
        </button>
        <button type="button" onClick={onDownloadReport} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800" aria-label="Download activity report">
          <FileText size={16} />
          Download Activity Report
        </button>
        <button type="button" onClick={onLogout} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors duration-200 hover:bg-red-100 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400" aria-label="Logout">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </section>
  );
});

export default ProfileActions;
