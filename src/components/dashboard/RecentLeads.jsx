/**
 * RecentLeads Component
 * Shows latest 5 leads
 */

function RecentLeads({ leads }) {
  const recent = leads.slice(0, 5);

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 transition-colors duration-200">
      <h2 className="text-lg font-semibold mb-4">Recent Leads</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-500 dark:text-gray-400 border-b">
              <th className="pb-3">Name</th>
              <th className="pb-3">Company</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {recent.map((lead) => (
              <tr key={lead.id} className="border-b">
                <td className="py-3">{lead.name}</td>
                <td className="py-3">{lead.company}</td>
                <td className="py-3">{lead.status}</td>
                <td className="py-3">{lead.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentLeads;