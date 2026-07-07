import StatusBadge from "./StatusBadge";

/**
 * Lead Table Component
 */

function LeadTable({ leads, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 transition-colors duration-200 ">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Email</th>
            <th>Source</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id || lead.id} className="border-t">
              <td className="py-4">{lead.name}</td>
              <td>{lead.company}</td>
              <td>
                <StatusBadge status={lead.status} />
              </td>
              <td>{lead.email}</td>
              <td>{lead.source}</td>
              <td>{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "—"}</td>
              <td>
                <button
                  onClick={() => onEdit(lead)}
                  className="text-blue-600 mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(lead._id || lead.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;