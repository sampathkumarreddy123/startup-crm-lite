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
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full transition ${
            activeFilter === filter
              ? "bg-blue-600 text-white"
              : "bg-slate-200 text-slate-700"
          }`}
        >
          {filter} ({getCount(filter)})
        </button>
      ))}
    </div>
  );
}

export default FilterBar;