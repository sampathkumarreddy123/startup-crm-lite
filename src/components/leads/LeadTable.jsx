import { Pencil, Trash2, Eye, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import StatusBadge from "./StatusBadge";

/**
 * Lead Table Component with sortable columns.
 */

const COLUMNS = [
  { label: "Name",    field: "name" },
  { label: "Company", field: "company" },
  { label: "Status",  field: "status" },
  { label: "Email",   field: "email" },
  { label: "Source",  field: "source" },
  { label: "Date",    field: "createdAt" },
];

function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field) return <ChevronsUpDown size={14} className="opacity-40" />;
  return sortDir === "asc"
    ? <ChevronUp size={14} className="text-blue-500" />
    : <ChevronDown size={14} className="text-blue-500" />;
}

function LeadTable({ leads, onEdit, onDelete, onView, sortField, sortDir, onSort }) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm transition-colors duration-200">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            {COLUMNS.map(({ label, field }) => (
              <th
                key={field}
                onClick={() => onSort(field)}
                className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap select-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150"
              >
                <span className="inline-flex items-center gap-1.5">
                  {label}
                  <SortIcon field={field} sortField={sortField} sortDir={sortDir} />
                </span>
              </th>
            ))}
            <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {leads.map((lead) => (
            <tr
              key={lead._id || lead.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors duration-100"
            >
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {lead.name}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                {lead.company}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                {lead.email}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                {lead.source}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "—"}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onView(lead)}
                    className="inline-flex items-center justify-center rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                    aria-label="View lead details"
                    title="View details"
                  >
                    <Eye size={15} />
                  </button>

                  <button
                    onClick={() => onEdit(lead)}
                    className="inline-flex items-center justify-center rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors duration-150"
                    aria-label="Edit lead"
                    title="Edit"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    onClick={() => onDelete(lead._id || lead.id)}
                    className="inline-flex items-center justify-center rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-150"
                    aria-label="Delete lead"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;