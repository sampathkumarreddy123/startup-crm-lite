import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import leadService from "../services/leadService";
import { useAuth } from "./AuthContext";

export const LeadContext = createContext();

/**
 * Lead Provider that manages CRM Leads state by interacting with the Express API.
 */
export function LeadProvider({ children }) {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 1,
    hasNext: false,
    hasPrev: false
  });
  const [stats, setStats] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState([]);
  
  const { isAuthenticated } = useAuth();

  /**
   * Fetch leads from server based on search, status filters, and pagination.
   */
  const fetchLeads = async (params) => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const res = await leadService.getLeads(params);
      if (res && res.success) {
        setLeads(res.data);
        setPagination(res.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      toast.error(error.response?.data?.message || "Failed to fetch leads");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch lead aggregation statistics for dashboard summary.
   */
  const fetchStats = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await leadService.getLeadStats();
      if (res && res.success) {
        setStats(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      toast.error("Failed to load dashboard metrics");
    }
  };

  /**
   * Fetch lead monthly historical chart aggregates.
   */
  const fetchMonthlyStats = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await leadService.getMonthlyStats();
      if (res && res.success) {
        setMonthlyStats(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch monthly stats:", error);
    }
  };

  /**
   * Create a new lead on the backend.
   */
  const addLead = async (leadData) => {
    try {
      const res = await leadService.createLead(leadData);
      if (res && res.success) {
        setLeads((prevLeads) => [res.data, ...prevLeads]);
        toast.success("Lead created successfully");
        // Refresh stats
        fetchStats();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to create lead:", error);
      toast.error(error.response?.data?.message || "Failed to create lead");
      return false;
    }
  };

  /**
   * Update a lead's details on the backend.
   */
  const updateLead = async (id, leadData) => {
    try {
      const res = await leadService.updateLead(id, leadData);
      if (res && res.success) {
        setLeads((prevLeads) =>
          prevLeads.map((lead) => (lead.id === id || lead._id === id ? res.data : lead))
        );
        toast.success("Lead updated successfully");
        // Refresh stats
        fetchStats();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to update lead:", error);
      toast.error(error.response?.data?.message || "Failed to update lead");
      return false;
    }
  };

  /**
   * Delete a lead permanently from the backend.
   */
  const deleteLead = async (id) => {
    try {
      const res = await leadService.deleteLead(id);
      if (res && res.success) {
        setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id && lead._id !== id));
        toast.success("Lead deleted successfully");
        // Refresh stats
        fetchStats();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to delete lead:", error);
      toast.error(error.response?.data?.message || "Failed to delete lead");
      return false;
    }
  };

  /**
   * Helper to retrieve a single cached lead by ID.
   */
  const getLeadById = (id) => {
    return leads.find((lead) => lead.id === id || lead._id === id);
  };

  // Fetch initial data upon login validation
  useEffect(() => {
    if (isAuthenticated) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchLeads();
      fetchStats();
      fetchMonthlyStats();
    } else {
      setLeads([]);
      setStats(null);
      setMonthlyStats([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <LeadContext.Provider
      value={{
        leads,
        isLoading,
        pagination,
        stats,
        monthlyStats,
        fetchLeads,
        fetchStats,
        fetchMonthlyStats,
        addLead,
        updateLead,
        deleteLead,
        getLeadById
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}

/**
 * Custom hook to use the LeadContext.
 */
export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLeads must be used inside LeadProvider");
  }
  return context;
}