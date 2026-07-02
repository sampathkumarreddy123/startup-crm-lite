/**
 * QuickActions Component
 * Buttons for fast actions
 */

function QuickActions() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

      <div className="flex flex-col gap-4">
        <button className="bg-blue-600 text-white py-3 rounded-xl">
          Add New Lead
        </button>

        <button className="bg-slate-200 text-slate-800 py-3 rounded-xl">
          View All Leads
        </button>

        <button className="bg-green-500 text-white py-3 rounded-xl">
          Export Data
        </button>
      </div>
    </div>
  );
}

export default QuickActions;