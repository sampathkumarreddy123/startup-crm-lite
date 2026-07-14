import { memo } from "react";
import { Activity, Download, PencilLine, PlusCircle, RefreshCw, Trash2 } from "lucide-react";

/**
 * Timeline of recent CRM activity for the profile page.
 *
 * @param {{ activities: Array<object> }} props - Activity feed data.
 * @returns {JSX.Element} Recent activity card.
 */
const RecentActivity = memo(function RecentActivity({ activities }) {
  const icons = {
    added: <PlusCircle size={18} />,
    updated: <PencilLine size={18} />,
    deleted: <Trash2 size={18} />,
    status: <RefreshCw size={18} />,
    export: <Download size={18} />
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400">
          <Activity size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Latest actions from your CRM workspace</p>
        </div>
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/70 p-4 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-400">
            No recent CRM activity yet.
          </div>
        ) : (
          activities.map((item) => (
            <div key={item.id} className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4 dark:border-gray-700 dark:bg-gray-900/50">
              <div className="mt-0.5 rounded-lg bg-white p-2 text-blue-600 shadow-sm dark:bg-gray-800 dark:text-blue-400">
                {icons[item.type]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.description}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.timestamp}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
});

export default RecentActivity;
