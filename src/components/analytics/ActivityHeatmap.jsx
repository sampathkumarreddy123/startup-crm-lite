function ActivityHeatmap({ data = [] }) {
  const activityMap = {};

  data.forEach((item) => {
    activityMap[item.date] = item.count;
  });

  const year = new Date().getFullYear();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];

function getColor(count) {
  if (!count) return "bg-gray-200 dark:bg-gray-700";

  if (count >= 1 && count <= 2) {
    return "bg-green-300";
  }

  if (count >= 3 && count <= 4) {
    return "bg-green-500";
  }

  if (count >= 5 && count <= 6) {
    return "bg-green-700";
  }

  return "bg-green-900";
}

  function getMonthDays(monthIndex) {
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);

    const totalDays = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days = [];

    // Empty slots before month starts
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Actual dates
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, monthIndex, day);
      const dateString = date.toISOString().split("T")[0];

      days.push({
        date: dateString,
        count: activityMap[dateString] || 0
      });
    }

    return days;
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Activity Heatmap
      </h2>

      {/* Scrollable container */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max">
          {months.map((month, monthIndex) => {
            const monthDays = getMonthDays(monthIndex);

            return (
              <div
                key={month}
                className="min-w-[260px] border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-900"
              >
                {/* Month title */}
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  {month}
                </h3>

                {/* Weekday labels */}
                <div className="grid grid-cols-7 gap-2 mb-3">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="text-[10px] text-center text-gray-500 dark:text-gray-400"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Heatmap blocks */}
                <div className="grid grid-cols-7 gap-2">
                  {monthDays.map((day, index) =>
                    day ? (
                      <div
                        key={day.date}
                        title={`${day.date} • ${day.count} activities`}
                        className={`w-5 h-5 rounded-sm transition-all duration-200 cursor-pointer ${getColor(
                          day.count
                        )}`}
                      />
                    ) : (
                      <div
                        key={index}
                        className="w-5 h-5"
                      />
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-6 text-xs text-gray-500 dark:text-gray-400">
        <span>Less</span>

        <div className="w-4 h-4 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
        <div className="w-4 h-4 rounded-sm bg-green-200"></div>
        <div className="w-4 h-4 rounded-sm bg-green-400"></div>
        <div className="w-4 h-4 rounded-sm bg-green-600"></div>
        <div className="w-4 h-4 rounded-sm bg-green-800"></div>

        <span>More</span>
      </div>
    </div>
  );
}

export default ActivityHeatmap;