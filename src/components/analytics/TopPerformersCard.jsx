function TopPerformersCard({ performers }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 transition-colors duration-200">
      <h2 className="text-lg font-semibold mb-6">
        Top Performers
      </h2>

      <div className="space-y-4">
        {performers.map((person, index) => (
          <div
            key={person.name}
            className="flex justify-between"
          >
            <p>
              {index + 1}. {person.name}
            </p>

            <p className="font-semibold">
              ₹{person.revenue.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopPerformersCard;