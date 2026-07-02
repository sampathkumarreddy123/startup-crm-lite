import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function LineChartCard({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-6">
        Conversion Trend
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#22C55E"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LineChartCard;