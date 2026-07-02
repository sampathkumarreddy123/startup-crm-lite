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

import { useLeads } from "../context/LeadContext";

function Dashboard() {
  const { leads } = useLeads();

  const totalLeads = leads.length;
  const wonLeads = leads.filter(
    (lead) => lead.status === "Won"
  ).length;

  const lostLeads = leads.filter(
    (lead) => lead.status === "Lost"
  ).length;

  const conversionRate =
    totalLeads > 0
      ? ((wonLeads / totalLeads) * 100).toFixed(1)
      : 0;

  return (
    <div className="space-y-8  text-gray-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-bold transition-colors duration-200">
          Dashboard
        </h1>

        <p className="text-slate-500 dark:text-gray-400 mt-2">
          Welcome back. Here's your pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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