import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function BarChartCard({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-6">
        Monthly Leads Trend
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2563EB" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartCard;