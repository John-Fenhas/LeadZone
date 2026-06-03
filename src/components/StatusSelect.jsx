import { useState, useRef, useEffect } from "react";

const statuses = [
  { label: "Fresh", value: "fresh", color: "bg-blue-500/20 text-blue-400" },
  { label: "No Answer", value: "no_answer", color: "bg-slate-500/20 text-slate-400" },
  { label: "Call Back", value: "callback", color: "bg-amber-500/20 text-amber-400" },
  { label: "Follow-up", value: "follow_up", color: "bg-violet-500/20 text-violet-400" },
  { label: "Meeting Booked", value: "meeting_booked", color: "bg-emerald-500/20 text-emerald-400" },
  { label: "Site Visit", value: "site_visit", color: "bg-cyan-500/20 text-cyan-400" },
  { label: "Low Budget", value: "low_budget", color: "bg-orange-500/20 text-orange-400" },
  { label: "Not Interested", value: "not_interested", color: "bg-red-500/20 text-red-400" },
];

export default function StatusSelect({
  value,
  onChange,
}) {
  
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const currentValue = value === "Fresh" ? "Fresh" : value;
  const selected = statuses.find(s => s.label === currentValue);

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-ful">

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 focus:outline-none 
          focus:border-indigo-400/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.18)] transition"
      >
        <span className={`px-2 py-0.5 rounded ${selected?.color}`}>
          {selected?.label}
        </span>

        <svg
          className={`h-4 w-4 text-white/60 transition ${open && "rotate-180"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-white/10 bg-slate-950 shadow-xl overflow-hidden max-h-56 overflow-y-auto"
          style={{ 
          scrollbarWidth: "thin",     
          scrollbarColor: "rgba(255,255,255,0.2) transparent", 
          }}
        >

          {statuses.map(status => (
            <div
              key={status.value}
              onClick={() => {
                onChange(status.label);
                setOpen(false);
              }}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-white/5 transition"
            >
              <span className={`px-2 py-0.5 rounded ${status.color}`}>
                {status.label}
              </span>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}
