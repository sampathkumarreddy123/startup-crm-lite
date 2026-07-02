const sampleLeads = [
  // APRIL

  // Light Green (2 activities)
  {
    id: "1",
    name: "Rahul Sharma",
    company: "Infosys",
    email: "rahul@crm.com",
    status: "New",
    source: "Website",
    value: 25000,
    createdAt: "2026-04-05T10:00:00Z"
  },
  {
    id: "2",
    name: "Priya Reddy",
    company: "TCS",
    email: "priya@crm.com",
    status: "Contacted",
    source: "Referral",
    value: 35000,
    createdAt: "2026-04-05T12:00:00Z"
  },

  // Medium Green (4 activities)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `apr-mid-${i}`,
    name: `April Mid ${i}`,
    company: "Wipro",
    email: `aprmid${i}@crm.com`,
    status: "Won",
    source: "LinkedIn",
    value: 50000,
    createdAt: "2026-04-12T10:00:00Z"
  })),

  // Dark Green (8 activities)
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `apr-dark-${i}`,
    name: `April Dark ${i}`,
    company: "Zoho",
    email: `aprdark${i}@crm.com`,
    status: "Won",
    source: "Cold Call",
    value: 60000,
    createdAt: "2026-04-18T10:00:00Z"
  })),

  // MAY

  // Light Green (1 activity)
  {
    id: "20",
    name: "Kiran Verma",
    company: "HCL",
    email: "kiran@crm.com",
    status: "New",
    source: "Website",
    value: 30000,
    createdAt: "2026-05-03T10:00:00Z"
  },

  // Medium Green (3 activities)
  ...Array.from({ length: 3 }, (_, i) => ({
    id: `may-mid-${i}`,
    name: `May Mid ${i}`,
    company: "Amazon",
    email: `maymid${i}@crm.com`,
    status: "Proposal Sent",
    source: "Referral",
    value: 70000,
    createdAt: "2026-05-10T10:00:00Z"
  })),

  // Dark Green (7 activities)
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `may-dark-${i}`,
    name: `May Dark ${i}`,
    company: "Google",
    email: `maydark${i}@crm.com`,
    status: "Won",
    source: "LinkedIn",
    value: 100000,
    createdAt: "2026-05-15T10:00:00Z"
  })),

  // Very Dark Green (12 activities)
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `may-heavy-${i}`,
    name: `May Heavy ${i}`,
    company: "Microsoft",
    email: `mayheavy${i}@crm.com`,
    status: "Won",
    source: "Website",
    value: 150000,
    createdAt: "2026-05-25T10:00:00Z"
  }))
];

export default sampleLeads;