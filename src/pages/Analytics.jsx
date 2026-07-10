import { useLeads } from "../context/LeadContext";
import useAnalytics from "../hooks/useAnalytics";

import StatsCards from "../components/analytics/StatsCards";
import PieChartCard from "../components/analytics/PieChartCard";
import FunnelChartCard from "../components/analytics/FunnelChartCard";
import BarChartCard from "../components/analytics/BarChartCard";
import LineChartCard from "../components/analytics/LineChartCard";
import RevenueChartCard from "../components/analytics/RevenueChartCard";
import LeadSourceChart from "../components/analytics/LeadSourceChart";
import SalesVelocityCard from "../components/analytics/SalesVelocityCard";
import ForecastCard from "../components/analytics/ForecastCard";
import ActivityHeatmap from "../components/analytics/ActivityHeatmap";
import TopPerformersCard from "../components/analytics/TopPerformersCard";
import EmptyAnalyticsState from "../components/analytics/EmptyAnalyticsState";

import {
  getFunnelData,
  getMonthlyLeads,
  getConversionByMonth,
  getRevenueByMonth,
  getLeadSourceStats,
  getSalesVelocity,
  getForecastRevenue,
  getTopPerformers,
  getActivityHeatmapData
} from "../utils/analyticsHelpers";

/**
 * Analytics Page
 */

function Analytics() {
  const { leads } = useLeads();
  const {
    totalLeads,
    statusDistribution,
    pipelineValue,
    wonRevenue,
    lostRate,
    conversionRate
  } = useAnalytics(leads);

  // Chart data
  const funnelData = getFunnelData(leads);
  const monthlyLeads = getMonthlyLeads(leads);
  const conversionTrend = getConversionByMonth(leads);
  const revenueData = getRevenueByMonth(leads);
  const sourceStats = getLeadSourceStats(leads);

  // Advanced widgets
  const salesVelocity = getSalesVelocity(leads);
  const forecastRevenue = getForecastRevenue(leads);
  const topPerformers = getTopPerformers(leads);
  const heatmapData = getActivityHeatmapData(leads);

  // Empty state
  if (!leads.length) {
    return <EmptyAnalyticsState />;
  }

  return (
    <div className="w-full space-y-6 text-gray-900 dark:text-white sm:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold transition-colors duration-200 sm:text-3xl">
          Analytics Dashboard
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-400 sm:text-base">
          Track sales performance and growth trends.
        </p>
      </div>

      {/* KPI Cards */}
      <StatsCards
        totalLeads={totalLeads}
        conversionRate={conversionRate}
        pipelineValue={pipelineValue}
        wonRevenue={wonRevenue}
        lostRate={lostRate}
      />

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <PieChartCard data={statusDistribution} />

        {/* Funnel */}
        <FunnelChartCard data={funnelData} />

        {/* Monthly Leads */}
        <BarChartCard data={monthlyLeads} />

        {/* Conversion Trend */}
        <LineChartCard data={conversionTrend} />

        {/* Revenue */}
        <RevenueChartCard data={revenueData} />

        {/* Lead Sources */}
        <LeadSourceChart data={sourceStats} />
      </div>

      {/* Advanced Analytics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Heatmap */}
        <ActivityHeatmap data={heatmapData} />

        {/* Top Performers */}
        <TopPerformersCard performers={topPerformers} />

        {/* Forecast */}
        <ForecastCard revenue={forecastRevenue} />

        {/* Sales Velocity */}
        <SalesVelocityCard value={salesVelocity} />
      </div>
    </div>
  );
}

export default Analytics;