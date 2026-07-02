import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import sampleLeads from "../data/sampleLeads";
import { useEffect } from "react";

export const LeadContext = createContext();

/**
 * Lead Provider
 */
export function LeadProvider({ children }) {
  const [leads, setLeads] = useLocalStorage(
    "startup-crm-leads",
    []
  );

  useEffect(() => {
    if (leads.length === 0) {
      setLeads(sampleLeads);
    }
  }, []);
  function addLead(lead) {
    const newLead = {
      ...lead,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    setLeads([...leads, newLead]);
  }

  function updateLead(id, updatedLead) {
    setLeads(
      leads.map((lead) =>
        lead.id === id
          ? { ...lead, ...updatedLead }
          : lead
      )
    );
  }

  function deleteLead(id) {
    setLeads(
      leads.filter((lead) => lead.id !== id)
    );
  }

  function getLeadById(id) {
    return leads.find((lead) => lead.id === id);
  }

  return (
    <LeadContext.Provider
      value={{
        leads,
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

export function useLeads() {
  const context = useContext(LeadContext);

  if (!context) {
    throw new Error(
      "useLeads must be used inside LeadProvider"
    );
  }

  return context;
}