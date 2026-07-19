import { useNavigate } from "react-router-dom";
import { Building2, Calendar, FolderOpen, Plus } from "lucide-react";
import Avatar from "../common/Avatar";
import StatusBadge from "../leads/StatusBadge";

/**
 * RecentLeads Component
 * Redesigned into a premium, responsive SaaS dashboard widget
 */
function RecentLeads({ leads = [] }) {
  const navigate = useNavigate();
  const recent = leads.slice(0, 5);

  const handleAddNew = () => {
    navigate("/leads", { state: { openNew: true } });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-4 sm:p-6 transition-colors duration-200 flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          Recent Leads
        </h2>
        {recent.length > 0 && (
          <button
            onClick={() => navigate("/leads")}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-150 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20"
          >
            View all
          </button>
        )}
      </div>

      {recent.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center mb-4 text-slate-400 dark:text-slate-500 border border-slate-200/50 dark:border-slate-800">
            <FolderOpen size={20} />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
            No Leads Found
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs mb-4">
            Start by adding your first lead to track your pipeline.
          </p>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center justify-center gap-1.5 min-h-[38px] rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 shadow-sm"
          >
            <Plus size={14} />
            <span>Add Lead</span>
          </button>
        </div>
      ) : (
        <div className="flex-1">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden rounded-xl border border-slate-150 dark:border-slate-700/60 bg-slate-50/30 dark:bg-slate-900/10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/55 dark:bg-slate-900/60">
                  <th className="px-5 py-3.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 bg-white dark:bg-gray-800">
                {recent.map((lead) => (
                  <tr
                    key={lead._id || lead.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-700/20 transition-colors duration-150"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={lead.name} size="sm" />
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm truncate">
                            {lead.name}
                          </span>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                            {lead.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Building2 size={13} className="text-slate-400 dark:text-slate-500 shrink-0" />
                        <span className="text-sm font-medium truncate">{lead.company}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                        <Calendar size={13} className="text-slate-400 dark:text-slate-500 shrink-0" />
                        <span>{formatDate(lead.createdAt)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card list View */}
          <div className="grid grid-cols-1 md:hidden gap-3">
            {recent.map((lead) => (
              <div
                key={lead._id || lead.id}
                className="bg-slate-50/40 dark:bg-slate-900/25 border border-slate-100 dark:border-slate-800/80 rounded-xl p-4 flex flex-col gap-3 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar name={lead.name} size="sm" />
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-sm truncate">
                        {lead.name}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                        {lead.email}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <StatusBadge status={lead.status} />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800/50 pt-2.5 mt-0.5 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 min-w-0">
                    <Building2 size={13} className="text-slate-400 dark:text-slate-500 shrink-0" />
                    <span className="font-medium truncate">{lead.company}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 shrink-0">
                    <Calendar size={13} />
                    <span>{formatDate(lead.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecentLeads;