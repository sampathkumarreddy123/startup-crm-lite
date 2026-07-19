/**
 * PipelineOverview Component
 * Shows status distribution
 */

function PipelineOverview({ leads }) {
  const total = leads.length;

  const statuses = [
    { name: "New", color: "#94A3B8" },
    { name: "Contacted", color: "#2563EB" },
    { name: "Meeting Scheduled", color: "#F59E0B" },
    { name: "Won", color: "#22C55E" },
    { name: "Lost", color: "#EF4444" }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Pipeline Overview</h2>

      <div className="flex h-5 rounded-full overflow-hidden">
        {statuses.map((status) => {
          const count = leads.filter(
            (lead) => lead.status && lead.status.toLowerCase() === status.name.toLowerCase()
          ).length;

          const width = (count / total) * 100;

          return (
            <div
              key={status.name}
              style={{
                width: `${width}%`,
                backgroundColor: status.color
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default PipelineOverview;