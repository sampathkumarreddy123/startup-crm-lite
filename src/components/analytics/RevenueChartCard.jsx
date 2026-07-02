import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function RevenueChartCard({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-6">
        Revenue Analytics
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#22C55E"
              fill="#22C55E"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChartCard;