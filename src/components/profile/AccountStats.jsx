import { memo } from "react";
import { ArrowUpRight, CircleDollarSign, TrendingUp } from "lucide-react";

/**
 * Summarizes CRM performance metrics from the lead context.
 *
 * @param {{ stats: object }} props - Statistics data.
 * @returns {JSX.Element} Account stats card.
 */
const AccountStats = memo(function AccountStats({ stats }) {
  const metrics = [
    { label: "Total Leads", value: stats.totalLeads },
    { label: "New Leads", value: stats.newLeads },
    { label: "Contacted Leads", value: stats.contactedLeads },
    { label: "Meeting Scheduled", value: stats.meetingsScheduled },
    { label: "Proposal Sent", value: stats.proposalSent },
    { label: "Won Leads", value: stats.wonLeads },
    { label: "Lost Leads", value: stats.lostLeads },
    { label: "Conversion Rate", value: `${stats.conversionRate}%` }
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Account Statistics</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Live snapshot of your CRM pipeline</p>
        </div>
        <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
          <TrendingUp size={20} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 dark:border-gray-700 dark:bg-gray-900/50">
            <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 p-4 dark:from-emerald-950/30 dark:to-cyan-950/30">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <CircleDollarSign size={18} />
          <span className="text-sm font-medium">Total Revenue Generated</span>
        </div>
        <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalRevenue}</p>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
        <ArrowUpRight size={16} />
        Healthy pipeline momentum
      </div>
    </section>
  );
});

export default AccountStats;
