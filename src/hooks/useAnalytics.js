import { useMemo } from "react";

import {
  getStatusDistribution,
  getPipelineValue,
  getWonRevenue,
  getLostRate,
  getConversionRate
} from "../utils/analyticsHelpers";

function useAnalytics(leads) {
  return useMemo(() => {
    return {
      totalLeads: leads.length,
      statusDistribution: getStatusDistribution(leads),
      pipelineValue: getPipelineValue(leads),
      wonRevenue: getWonRevenue(leads),
      lostRate: getLostRate(leads),
      conversionRate: getConversionRate(leads)
    };
  }, [leads]);
}

export default useAnalytics;