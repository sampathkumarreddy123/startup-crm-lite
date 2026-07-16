import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useLeads } from "../context/LeadContext";
import { useLocation } from "react-router-dom";

import LeadForm from "../components/leads/LeadForm";
import LeadCard from "../components/leads/LeadCard";
import LeadTable from "../components/leads/LeadTable";
import LeadDetailModal from "../components/leads/LeadDetailModal";

import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import EmptyState from "../components/common/EmptyState";

/**
 * Leads Page
 */

function Leads() {
  const { leads, addLead, updateLead, deleteLead } = useLeads();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [viewLead, setViewLead] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (location && location.state && location.state.openNew) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsModalOpen(true);
      // Clear the navigation state to avoid reopening on back/refresh
      try {
        window.history.replaceState({}, document.title);
      } catch {
        // ignore
      }
    }
  }, [location]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filteredLeads = leads
    .filter(
      (lead) =>
        activeFilter === "All" || lead.status === activeFilter
    )
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      let aVal = a[sortField] ?? "";
      let bVal = b[sortField] ?? "";
      if (sortField === "createdAt") {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const saveLead = function (lead) {
  if (selectedLead) {
    updateLead(selectedLead._id || selectedLead.id, lead);
    toast.success("Lead updated");
  } else {
    addLead(lead);
    toast.success("Lead created");
  }

  setIsModalOpen(false);
  setSelectedLead(null);
};

const removeLead = function (leadId) {
  deleteLead(leadId);
  toast.error("Lead deleted");
};

  const editLead = function (lead) {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleView = (lead) => {
    setViewLead(lead);
  };

  return (
    <div className="w-full space-y-6 text-gray-900 dark:text-white">
      <Toaster />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold transition-colors duration-200 sm:text-3xl">Lead Management</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
        >
          Add Lead
        </button>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        leads={leads}
      />

      {filteredLeads.length === 0 ? (
        <EmptyState totalLeads={leads.length} />
      ) : (
        <>
          {/* Mobile */}
          <div className="grid grid-cols-1 md:hidden gap-4">
            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead._id || lead.id}
                lead={lead}
                onEdit={editLead}
                onDelete={removeLead}
                onView={handleView}
              />
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <LeadTable
              leads={filteredLeads}
              onEdit={editLead}
              onDelete={removeLead}
              onView={handleView}
              sortField={sortField}
              sortDir={sortDir}
              onSort={handleSort}
            />
          </div>
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-3 sm:p-4 md:p-6">
          <div className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-2xl dark:bg-gray-800 sm:p-6 md:my-6">
            <LeadForm
              initialData={selectedLead}
              onSubmit={saveLead}
              onCancel={() => {
                setIsModalOpen(false);
                setSelectedLead(null);
              }}
            />
          </div>
        </div>
      )}
      {/* Lead Detail Modal */}
      {viewLead && (
        <LeadDetailModal
          lead={viewLead}
          onClose={() => setViewLead(null)}
        />
      )}
    </div>
  );
}

export default Leads;