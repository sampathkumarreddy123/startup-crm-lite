import StatsCard from "../components/dashboard/StatsCard";
import PipelineOverview from "../components/dashboard/PipelineOverview";
import RecentLeads from "../components/dashboard/RecentLeads";
import QuickActions from "../components/dashboard/QuickActions";

import {
  Users,
  CheckCircle,
  XCircle,
  TrendingUp
} from "lucide-react";

import { useEffect } from "react";
import { useLeads } from "../context/LeadContext";

function Dashboard() {
  const { leads, stats, fetchStats, fetchLeads } = useLeads();

  useEffect(() => {
    fetchLeads({ limit: 10 }); // Get the 10 most recent leads
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalLeads = stats ? stats.totalLeads : leads.length;
  const wonLeads = stats ? stats.wonLeads : leads.filter((lead) => lead.status === "Won").length;
  const lostLeads = stats ? stats.lostLeads : leads.filter((lead) => lead.status === "Lost").length;
  const conversionRate = stats
    ? stats.conversionRate
    : totalLeads > 0
    ? ((wonLeads / totalLeads) * 100).toFixed(1)
    : 0;


  return (
    <div className="w-full space-y-6 text-gray-900 dark:text-white sm:space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold transition-colors duration-200 sm:text-3xl">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500 dark:text-gray-400 sm:text-base">
          Welcome back. Here's your pipeline.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 xl:grid-cols-4">
        <StatsCard
          title="Total Leads"
          value={totalLeads}
          icon={<Users className="text-white" />}
          change="12"
          color="#2563EB"
        />

        <StatsCard
          title="Won"
          value={wonLeads}
          icon={<CheckCircle className="text-white" />}
          change="8"
          color="#22C55E"
        />

        <StatsCard
          title="Lost"
          value={lostLeads}
          icon={<XCircle className="text-white" />}
          change="4"
          color="#EF4444"
        />

        <StatsCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          icon={<TrendingUp className="text-white" />}
          change="6"
          color="#F59E0B"
        />
      </div>

      <PipelineOverview leads={leads} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentLeads leads={leads} />
        <QuickActions />
      </div>
    </div>
  );
}

export default Dashboard;