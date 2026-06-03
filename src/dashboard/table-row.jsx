import { useLeads } from "../context/LeadsContext";
import { supabase } from "../supabaseClient";

export default function TableRow({ lead }) {
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

  const selectedStatus =
    statuses.find((s) => s.label === lead.status) ||
    statuses.find((s) => s.label === "Fresh");

  const isoDate = lead.date;
  const date = new Date(isoDate).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const { openAddAndEditModal, deleteLead } = useLeads();

  return (
    <tr className="border-t border-white/10 hover:bg-white/5 transition">
      <td className="px-4 py-3 text-slate-200">
        <span className={`px-2 py-0.5 rounded ${selectedStatus.color}`}>
          {lead.status}
        </span>
      </td>
      <td className="px-4 py-3 text-slate-200">{lead.name}</td>
      <td className="px-4 py-3 text-slate-300">{lead.number}</td>
      <td className="px-4 py-3 text-slate-300">{lead.email}</td>
      <td className="px-4 py-3 text-slate-300">{lead.budget}</td>
      <td className="px-4 py-3 text-slate-300">{lead.destination}</td>
      <td className="px-4 py-3 text-slate-400 max-w-xs">{lead.callRecap}</td>
      <td className="px-4 py-3 text-slate-400">{date}</td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => openAddAndEditModal(lead)}
            className="px-1.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 transition cursor-pointer"
          >
            <svg
              width="20px"
              height="14px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M18.3785 8.44975L8.9636 17.8648C8.6844 18.144 8.3288 18.3343 7.94161 18.4117L4.99988 19.0001L5.58823 16.0583C5.66566 15.6711 5.85597 15.3155 6.13517 15.0363L15.5501 5.62132M18.3785 8.44975L19.7927 7.03553C20.1832 6.64501 20.1832 6.01184 19.7927 5.62132L18.3785 4.20711C17.988 3.81658 17.3548 3.81658 16.9643 4.20711L15.5501 5.62132M18.3785 8.44975L15.5501 5.62132"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>

          <button
            onClick={() => deleteLead(lead.id)}
            className="flex justify-center items-center px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 transition cursor-pointer"
          >
            <svg
              width="20px"
              height="14px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke=""
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#FCA5A5"
                strokeWidth="1.584"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M10 11V17"
                  stroke="#FCA5A5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M14 11V17"
                  stroke="#FCA5A5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M4 7H20"
                  stroke="#FCA5A5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                  stroke="#FCA5A5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                  stroke="#FCA5A5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
