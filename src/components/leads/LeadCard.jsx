import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

/**
 * Lead Card Component
 */

function LeadCard({ lead, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 transition-colors duration-200">
      <h3 className="font-semibold text-lg">{lead.name}</h3>
      <p className="text-slate-500 dark:text-gray-400">{lead.company}</p>

      <div className="mt-3">
        <StatusBadge status={lead.status} />
      </div>

      <p className="mt-3">{lead.email}</p>
      <p>{lead.phone}</p>

      <div className="flex gap-3 mt-4">
        <button onClick={() => onEdit(lead)}>
          <Pencil size={18} />
        </button>

        <button onClick={() => onDelete(lead._id || lead.id)}>
          <Trash2 size={18} className="text-red-500" />
        </button>
      </div>
    </div>
  );
}

export default LeadCard;