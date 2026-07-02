/**
 * Empty State Component
 */

function EmptyState({ totalLeads }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-10 text-center">
      <h2 className="text-xl font-semibold mb-2">
        No leads found
      </h2>

      <p className="text-slate-500 dark:text-gray-400">
        {totalLeads === 0
          ? "Start by adding your first lead."
          : "Try clearing search or changing filters."}
      </p>
    </div>
  );
}

export default EmptyState;