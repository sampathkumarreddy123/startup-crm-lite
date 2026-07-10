/**
 * FilterBar Component
 */

function FilterBar({ activeFilter, onFilterChange, leads }) {
  const filters = [
    "All",
    "New",
    "Contacted",
    "Meeting Scheduled",
    "Proposal Sent",
    "Won",
    "Lost"
  ];

  const getCount = function (filter) {
    if (filter === "All") return leads.length;

    return leads.filter((lead) => lead.status === filter).length;
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`min-h-[44px] rounded-full px-3 py-2 text-sm transition sm:px-4 ${
            activeFilter === filter
              ? "bg-blue-600 text-white"
              : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
          }`}
        >
          {filter} ({getCount(filter)})
        </button>
      ))}
    </div>
  );
}

export default FilterBar;