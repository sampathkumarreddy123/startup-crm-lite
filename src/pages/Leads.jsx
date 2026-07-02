import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useLeads } from "../context/LeadContext";

import LeadForm from "../components/leads/LeadForm";
import LeadCard from "../components/leads/LeadCard";
import LeadTable from "../components/leads/LeadTable";

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

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

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
    );

  const saveLead = function (lead) {
  if (selectedLead) {
    updateLead(selectedLead.id, lead);
    toast.success("Lead updated");
  } else {
    addLead(lead);
    toast.success("Lead created");
  }

  setIsModalOpen(false);
  setSelectedLead(null);
};

const removeLead = function (id) {
  deleteLead(id);
  toast.error("Lead deleted");
};

  const editLead = function (lead) {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6  text-gray-900 dark:text-white">
      <Toaster />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold transition-colors duration-200">Lead Management</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-3 rounded-xl"
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
                key={lead.id}
                lead={lead}
                onEdit={editLead}
                onDelete={removeLead}
              />
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <LeadTable
              leads={filteredLeads}
              onEdit={editLead}
              onDelete={removeLead}
            />
          </div>
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="
              w-full h-full md:h-auto md:max-w-lg
            bg-white dark:bg-gray-800
            p-6
            md:rounded-2xl
            ">
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
    </div>
  );
}

export default Leads;