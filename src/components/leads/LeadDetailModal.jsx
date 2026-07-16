import { X, Mail, Phone, Building2, Tag, Calendar, User, Globe } from "lucide-react";
import StatusBadge from "./StatusBadge";

/**
 * LeadDetailModal — Full-screen slide-in modal showing all details of a lead.
 */
function LeadDetailModal({ lead, onClose }) {
  if (!lead) return null;

  const fields = [
    { icon: <User size={16} />,       label: "Name",       value: lead.name },
    { icon: <Building2 size={16} />,  label: "Company",    value: lead.company },
    { icon: <Mail size={16} />,       label: "Email",      value: lead.email },
    { icon: <Phone size={16} />,      label: "Phone",      value: lead.phone },
    { icon: <Globe size={16} />,      label: "Source",     value: lead.source },
    { icon: <Tag size={16} />,        label: "Value",      value: lead.value ? `$${lead.value}` : null },
    {
      icon: <Calendar size={16} />,
      label: "Created",
      value: lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric"
      }) : null,
    },
  ];

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-md rounded-3xl bg-white dark:bg-gray-800 shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header gradient bar */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-6 pt-6 pb-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-blue-100 uppercase tracking-widest mb-1">Lead Details</p>
              <h2 className="text-xl font-bold text-white leading-tight">{lead.name}</h2>
              <p className="text-sm text-blue-100 mt-0.5">{lead.company}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-1.5 text-white/70 hover:text-white hover:bg-white/20 transition-colors duration-150"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Status badge */}
          <div className="mt-4">
            <StatusBadge status={lead.status} />
          </div>
        </div>

        {/* Content — overlaps the header */}
        <div className="-mt-4 mx-4 mb-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 shadow-sm">
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {fields.map(({ icon, label, value }) =>
              value ? (
                <li key={label} className="flex items-center gap-3 px-5 py-3.5">
                  <span className="flex-shrink-0 text-blue-500 dark:text-blue-400">{icon}</span>
                  <span className="w-20 flex-shrink-0 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                    {label}
                  </span>
                  <span className="text-sm text-gray-800 dark:text-gray-200 break-all">
                    {value}
                  </span>
                </li>
              ) : null
            )}

            {/* Notes */}
            {lead.notes && (
              <li className="px-5 py-3.5">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="flex-shrink-0 text-blue-500 dark:text-blue-400">
                    <Tag size={16} />
                  </span>
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                    Notes
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pl-7">
                  {lead.notes}
                </p>
              </li>
            )}
          </ul>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4">
          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-gray-100 dark:bg-gray-700 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeadDetailModal;
