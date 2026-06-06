import { useState } from "react";
import { useLeads } from "../context/LeadsContext";

const statuses = [
  { label: "Fresh", value: "fresh", color: "bg-blue-500/20 text-blue-400" },
  {
    label: "No Answer",
    value: "no_answer",
    color: "bg-slate-500/20 text-slate-400",
  },
  {
    label: "Call Back",
    value: "callback",
    color: "bg-amber-500/20 text-amber-400",
  },
  {
    label: "Follow-up",
    value: "follow_up",
    color: "bg-violet-500/20 text-violet-400",
  },
  {
    label: "Meeting Booked",
    value: "meeting_booked",
    color: "bg-emerald-500/20 text-emerald-400",
  },
  {
    label: "Site Visit",
    value: "site_visit",
    color: "bg-cyan-500/20 text-cyan-400",
  },
  {
    label: "Low Budget",
    value: "low_budget",
    color: "bg-orange-500/20 text-orange-400",
  },
  {
    label: "Not Interested",
    value: "not_interested",
    color: "bg-red-500/20 text-red-400",
  },
];

export function MobileTableRow({ lead }) {
  const [expanded, setExpanded] = useState(false);
  const { openAddAndEditModal, deleteLead } = useLeads();

  const isoDate = lead.date;
  const date = new Date(isoDate).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const selectedStatus =
    statuses.find((s) => s.label === lead.status) ||
    statuses.find((s) => s.label === "Fresh");

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <button
        className="w-full text-left px-4 pt-4 pb-3 focus:outline-none"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`shrink-0 px-2 py-0.5 rounded text-xs font-medium ${selectedStatus.color}`}
            >
              {lead.status}
            </span>
            <span className="text-sm font-semibold text-white truncate">
              {lead.name}
            </span>
          </div>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-3.5 h-3.5 text-slate-500"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
                fill="currentColor"
              />
            </svg>
            {lead.destination}
          </span>
          <span className="text-slate-500">·</span>
          <span>{lead.budget}</span>
        </div>
      </button>

      {/*expandable info*/}
      {expanded && (
        <div className="border-t border-white/10 px-4 py-3 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-y-2.5 text-xs">
            {[
              { label: "Phone", value: lead.number },
              { label: "Email", value: lead.email },
              { label: "Date", value: date },
            ].map(({ label, value }) => (
              <div key={label} className="contents">
                <span className="text-slate-500">{label}</span>
                <span className="text-slate-300 text-right truncate">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {lead.callRecap && (
            <div className="bg-white/5 rounded-xl px-3 py-2.5 text-xs text-slate-400 leading-relaxed">
              {lead.callRecap}
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => openAddAndEditModal(lead)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 hover:bg-white/10 transition"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                <path
                  d="M18.3785 8.44975L8.9636 17.8648C8.6844 18.144 8.3288 18.3343 7.94161 18.4117L4.99988 19.0001L5.58823 16.0583C5.66566 15.6711 5.85597 15.3155 6.13517 15.0363L15.5501 5.62132M18.3785 8.44975L19.7927 7.03553C20.1832 6.64501 20.1832 6.01184 19.7927 5.62132L18.3785 4.20711C17.988 3.81658 17.3548 3.81658 16.9643 4.20711L15.5501 5.62132M18.3785 8.44975L15.5501 5.62132"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Edit
            </button>
            <button
              onClick={() => deleteLead(lead.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 hover:bg-red-500/20 transition"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                <path
                  d="M4 7H20M6 7v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5zM10 11v6M14 11v6"
                  stroke="#FCA5A5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
