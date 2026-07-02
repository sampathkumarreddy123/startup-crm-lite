function ForecastCard({ revenue }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 transition-colors duration-200">
      <h2 className="text-lg font-semibold mb-4">
        Revenue Forecast
      </h2>

      <h1 className="text-3xl font-bold text-blue-600">
        ₹{Number(revenue).toLocaleString()}
      </h1>

      <p className="text-slate-500 dark:text-gray-400 mt-2">
        Predicted next month revenue
      </p>

      <p className="text-green-500 mt-3">
        Confidence: 82%
      </p>
    </div>
  );
}

export default ForecastCard;