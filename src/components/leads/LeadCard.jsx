import { Pencil, Trash2, Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";

/**
 * Lead Card Component
 */

function LeadCard({ lead, onEdit, onDelete, onView }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 transition-colors duration-200">
      <h3 className="font-semibold text-lg">{lead.name}</h3>
      <p className="text-slate-500 dark:text-gray-400">{lead.company}</p>

      <div className="mt-3 flex items-center justify-between">
        <StatusBadge status={lead.status} />
        {lead.value !== undefined && lead.value !== null && (
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-lg">
            ${Number(lead.value).toLocaleString()}
          </span>
        )}
      </div>

      <p className="mt-3">{lead.email}</p>
      <p>{lead.phone}</p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onView(lead)}
          className="inline-flex items-center justify-center rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
          aria-label="View lead details"
          title="View details"
        >
          <Eye size={16} />
        </button>

        <button
          onClick={() => onEdit(lead)}
          className="inline-flex items-center justify-center rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors duration-150"
          aria-label="Edit lead"
          title="Edit"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => onDelete(lead._id || lead.id)}
          className="inline-flex items-center justify-center rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-150"
          aria-label="Delete lead"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default LeadCard;