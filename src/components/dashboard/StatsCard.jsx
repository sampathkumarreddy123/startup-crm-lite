/**
 * StatsCard Component
 * Displays one metric card
 */

function StatsCard({ title, value, icon, change, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs sm:text-sm font-medium text-slate-500 dark:text-gray-400 truncate" title={title}>
          {title}
        </h3>

        <div
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 [&>svg]:h-4 [&>svg]:w-4 sm:[&>svg]:h-5 sm:[&>svg]:w-5 transition-transform duration-200"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
          {value}
        </h2>
        <p className="text-[11px] sm:text-xs text-green-500 mt-1 sm:mt-2 font-medium">
          {change}% <span className="text-slate-400 dark:text-gray-500 font-normal">from last month</span>
        </p>
      </div>
    </div>
  );
}

export default StatsCard;