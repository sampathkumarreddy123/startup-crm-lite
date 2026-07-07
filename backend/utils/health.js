export const createHealthPayload = (dbConnected) => ({
  status: dbConnected ? "OK" : "DEGRADED",
  database: dbConnected ? "connected" : "not-configured",
  timestamp: new Date().toISOString()
});

export const getHealthStatusCode = (dbConnected) => (dbConnected ? 200 : 503);
