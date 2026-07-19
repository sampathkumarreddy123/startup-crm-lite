import { Circle, Phone, Calendar, Send, Check, X } from "lucide-react";

/**
 * Status Badge Component with premium icons and colors
 */
function StatusBadge({ status }) {
  const configs = {
    New: {
      style: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/50",
      icon: <Circle size={10} className="fill-current" />
    },
    Contacted: {
      style: "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-900/50",
      icon: <Phone size={10} />
    },
    "Meeting Scheduled": {
      style: "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/50",
      icon: <Calendar size={10} />
    },
    "Proposal Sent": {
      style: "bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900/50",
      icon: <Send size={10} />
    },
    Won: {
      style: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50",
      icon: <Check size={10} className="stroke-[3]" />
    },
    Lost: {
      style: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/50",
      icon: <X size={10} className="stroke-[3]" />
    }
  };

  const normalizedStatus = status ? status.toString().trim() : "";
  const matchedKey = Object.keys(configs).find(
    (key) => key.toLowerCase() === normalizedStatus.toLowerCase()
  );

  const config = matchedKey
    ? configs[matchedKey]
    : {
        style: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700",
        icon: <Circle size={10} className="fill-current" />
      };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border hover:scale-105 transition-all duration-150 cursor-default select-none ${config.style}`}>
      {config.icon}
      <span>{matchedKey || status || "New"}</span>
    </span>
  );
}

export default StatusBadge;