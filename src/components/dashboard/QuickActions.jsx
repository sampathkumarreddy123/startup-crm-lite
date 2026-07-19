/**
 * QuickActions Component
 * Buttons for fast actions
 */

import { useNavigate } from "react-router-dom";
import { useLeads } from "../../context/LeadContext";

function QuickActions() {
  const navigate = useNavigate();
  const { leads } = useLeads();

  const handleAddNew = () => {
    navigate("/leads", { state: { openNew: true } });
  };

  const handleViewAll = () => {
    navigate("/leads");
  };

  const handleExport = () => {
    if (!leads || leads.length === 0) return;

    const keys = ["name", "email", "company", "status", "phone", "createdAt"];
    const header = keys.join(",") + "\n";
    const rows = leads.map((l) => keys.map((k) => {
      const v = l[k] ?? "";
      // Escape commas and quotes
      return `"${String(v).replace(/"/g, '""')}"`;
    }).join(",")).join("\n");

    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads-export.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
      <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>

      <div className="flex flex-col gap-3">
        <button onClick={handleAddNew} className="min-h-[44px] rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
          Add New Lead
        </button>

        <button onClick={handleViewAll} className="min-h-[44px] rounded-xl bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600">
          View All Leads
        </button>

        <button onClick={handleExport} className="min-h-[44px] rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700">
          Export Data
        </button>
      </div>
    </div>
  );
}

export default QuickActions;