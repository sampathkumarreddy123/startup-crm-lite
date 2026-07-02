function SalesVelocityCard({ value }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 transition-colors duration-200">
      <h2 className="text-lg font-semibold mb-4">
        Sales Velocity
      </h2>

      <h1 className="text-3xl font-bold text-green-600">
        ₹{Number(value).toLocaleString()}/day
      </h1>

      <p className="text-slate-500 dark:text-gray-400 mt-2">
        +12% from previous period
      </p>
    </div>
  );
}

export default SalesVelocityCard;