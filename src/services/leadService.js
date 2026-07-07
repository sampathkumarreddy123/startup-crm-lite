import api from "./api";

/**
 * Leads Management API Service wrappers.
 */
const leadService = {
  /**
   * Fetch all leads matching search, filter, and pagination parameters.
   * @param {object} params - query parameters like status, search, page, limit
   */
  async getLeads(params) {
    const response = await api.get("/api/leads", { params });
    return response.data;
  },

  /**
   * Create a new lead.
   * @param {object} leadData 
   */
  async createLead(leadData) {
    const response = await api.post("/api/leads", leadData);
    return response.data;
  },

  /**
   * Update a lead completely.
   * @param {string} id - Lead ID
   * @param {object} leadData 
   */
  async updateLead(id, leadData) {
    const response = await api.put(`/api/leads/${id}`, leadData);
    return response.data;
  },

  /**
   * Patch only the status of a lead.
   * @param {string} id - Lead ID
   * @param {string} status - New status string
   */
  async updateLeadStatus(id, status) {
    const response = await api.patch(`/api/leads/${id}/status`, { status });
    return response.data;
  },

  /**
   * Delete a lead permanently.
   * @param {string} id - Lead ID
   */
  async deleteLead(id) {
    const response = await api.delete(`/api/leads/${id}`);
    return response.data;
  },

  /**
   * Fetch dashboard statistics.
   */
  async getLeadStats() {
    const response = await api.get("/api/leads/stats/summary");
    return response.data;
  },

  /**
   * Fetch monthly aggregated lead volumes.
   */
  async getMonthlyStats() {
    const response = await api.get("/api/leads/stats/monthly");
    return response.data;
  }
};

export default leadService;
