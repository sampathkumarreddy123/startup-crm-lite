import {
  FunnelChart,
  Funnel,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function FunnelChartCard({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-6">
        Sales Funnel
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip />
            <Funnel dataKey="value" data={data} />
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default FunnelChartCard;