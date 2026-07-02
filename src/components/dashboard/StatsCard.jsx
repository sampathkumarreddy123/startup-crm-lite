/**
 * StatsCard Component
 * Displays one metric card
 */

function StatsCard({ title, value, icon, change, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-slate-500">{title}</h3>

        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{value}</h2>
        <p className="text-sm text-green-500 mt-2">
          {change}% from last month
        </p>
      </div>
    </div>
  );
}

export default StatsCard;