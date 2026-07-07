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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

      <div className="flex flex-col gap-4">
        <button onClick={handleAddNew} className="bg-blue-600 text-white py-3 rounded-xl">
          Add New Lead
        </button>

        <button onClick={handleViewAll} className="bg-slate-200 text-slate-800 py-3 rounded-xl">
          View All Leads
        </button>

        <button onClick={handleExport} className="bg-green-500 text-white py-3 rounded-xl">
          Export Data
        </button>
      </div>
    </div>
  );
}

export default QuickActions;