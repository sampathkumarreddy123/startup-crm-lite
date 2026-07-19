export function getStatusDistribution(leads = []) {
  const result = {};

  leads.forEach((lead) => {
    result[lead.status] = (result[lead.status] || 0) + 1;
  });

  return Object.entries(result).map(([name, value]) => ({
    name,
    value
  }));
}

export function getPipelineValue(leads = []) {
  return leads
    .filter((lead) => lead.status && lead.status.toLowerCase() !== "won" && lead.status.toLowerCase() !== "lost")
    .reduce((sum, lead) => sum + (lead.value || 0), 0);
}

export function getWonRevenue(leads = []) {
  return leads
    .filter((lead) => lead.status && lead.status.toLowerCase() === "won")
    .reduce((sum, lead) => sum + (lead.value || 0), 0);
}

export function getLostRate(leads = []) {
  if (!leads.length) return 0;

  const lost = leads.filter(
    (lead) => lead.status && lead.status.toLowerCase() === "lost"
  ).length;

  return ((lost / leads.length) * 100).toFixed(1);
}

export function getConversionRate(leads = []) {
  if (!leads.length) return 0;

  const won = leads.filter(
    (lead) => lead.status && lead.status.toLowerCase() === "won"
  ).length;

  return ((won / leads.length) * 100).toFixed(1);
}

export function getFunnelData(leads = []) {
  const stages = [
    "New",
    "Contacted",
    "Meeting Scheduled",
    "Proposal Sent",
    "Won"
  ];

  return stages.map((stage) => ({
    value: leads.filter((lead) => lead.status && lead.status.toLowerCase() === stage.toLowerCase()).length,
    name: stage
  }));
}

export function getMonthlyLeads(leads = []) {
  const monthMap = {};

  leads.forEach((lead) => {
    if (!lead.createdAt) return;

    const date = new Date(lead.createdAt);

    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

    if (!monthMap[monthKey]) {
      monthMap[monthKey] = {
        month: date.toLocaleString("default", {
          month: "short"
        }),
        count: 0
      };
    }

    monthMap[monthKey].count += 1;
  });

  return Object.values(monthMap);
}

export function getConversionByMonth(leads = []) {
  const months = {};

  leads.forEach((lead) => {
    const month = new Date(lead.createdAt).toLocaleString(
      "default",
      { month: "short" }
    );

    if (!months[month]) {
      months[month] = {
        total: 0,
        won: 0
      };
    }

    months[month].total += 1;

    if (lead.status === "Won") {
      months[month].won += 1;
    }
  });

  return Object.entries(months).map(([month, data]) => ({
    month,
    rate: ((data.won / data.total) * 100).toFixed(1)
  }));
}

export function getRevenueByMonth(leads = []) {
  const months = {};

  leads
    .filter((lead) => lead.status === "Won")
    .forEach((lead) => {
      const month = new Date(lead.createdAt).toLocaleString(
        "default",
        { month: "short" }
      );

      months[month] =
        (months[month] || 0) + (lead.value || 0);
    });

  return Object.entries(months).map(([month, revenue]) => ({
    month,
    revenue
  }));
}

export function getLeadSourceStats(leads = []) {
  const sources = {};

  leads.forEach((lead) => {
    sources[lead.source] =
      (sources[lead.source] || 0) + 1;
  });

  return Object.entries(sources)
    .map(([source, count]) => ({
      source,
      count
    }))
    .sort((a, b) => b.count - a.count);
}

export function getSalesVelocity(leads = []) {
  const wonLeads = leads.filter(
    (lead) => lead.status === "Won"
  );

  if (!wonLeads.length) return 0;

  const totalRevenue = wonLeads.reduce(
    (sum, lead) => sum + (lead.value || 0),
    0
  );

  const avgDealSize = totalRevenue / wonLeads.length;

  const winRate = wonLeads.length / leads.length;

  const avgCycle = 18;

  return (
    (leads.length * winRate * avgDealSize) / avgCycle
  ).toFixed(0);
}

export function getForecastRevenue(leads = []) {
  const wonLeads = leads.filter(
    (lead) => lead.status === "Won"
  );

  if (!wonLeads.length) return 0;

  const totalRevenue = wonLeads.reduce(
    (sum, lead) => sum + (lead.value || 0),
    0
  );

  return (totalRevenue / 6).toFixed(0);
}

export function getTopPerformers(leads = []) {
  const owners = {};

  leads
    .filter((lead) => lead.status === "Won")
    .forEach((lead) => {
      owners[lead.owner || "Unknown"] =
        (owners[lead.owner || "Unknown"] || 0) +
        (lead.value || 0);
    });

  return Object.entries(owners)
    .map(([name, revenue]) => ({
      name,
      revenue
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);
}

// export function getActivityHeatmapData(leads = []) {
//   const days = {};

//   leads.forEach((lead) => {
//     const day = new Date(lead.createdAt)
//       .toISOString()
//       .split("T")[0];

//     days[day] = (days[day] || 0) + 1;
//   });

//   return Object.entries(days).map(([date, count]) => ({
//     date,
//     count
//   }));
// }

export function getActivityHeatmapData(leads = []) {
  const activityMap = {};

  leads.forEach((lead) => {
    const date = new Date(lead.createdAt)
      .toISOString()
      .split("T")[0];

    activityMap[date] =
      (activityMap[date] || 0) + 1;
  });

  return Object.entries(activityMap).map(
    ([date, count]) => ({
      date,
      count
    })
  );
}