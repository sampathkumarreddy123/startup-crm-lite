import {
  Users,
  TrendingUp,
  DollarSign,
  AlertTriangle
} from "lucide-react";

function StatsCards({
  totalLeads,
  conversionRate,
  pipelineValue,
  wonRevenue,
  lostRate
}) {
  const stats = [
    {
      title: "Total Leads",
      value: totalLeads,
      icon: <Users />
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate}%`,
      icon: <TrendingUp />
    },
    {
      title: "Pipeline Value",
      value: `₹${pipelineValue.toLocaleString()}`,
      icon: <DollarSign />
    },
    {
      title: "Won Revenue",
      value: `₹${wonRevenue.toLocaleString()}`,
      icon: <DollarSign />
    },
    {
      title: "Lost Rate",
      value: `${lostRate}%`,
      icon: <AlertTriangle />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 transition-colors duration-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-600 text-sm">
              {stat.title}
            </h3>
            {stat.icon}
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;