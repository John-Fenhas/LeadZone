import { useState, useRef, useEffect } from "react";
import { useLeads } from "../context/LeadsContext";

export default function FilterDropDown({ filter, listOfFilters }) {
  const { handleFilter } = useLeads();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const currentValue = listOfFilters[0].label;
  let selected = listOfFilters.find((i) => i.label === currentValue);

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="min-w-24 flex items-center justify-between rounded-xl border border-white/10 bg-slate-900 px-2 py-1 text-sm text-white hover:bg-slate-800 focus:outline-none 
          focus:border-indigo-400/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.18)] transition"
      >
        <span className={`rounded text-slate-500 font-medium text-xs px-1 `}>
          {selected?.label}
        </span>

        <svg
          className={`h-3.5 w-3.5 text-white/60 transition ${open && "rotate-180"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 text-nowrap rounded-xl border border-white/10 bg-slate-950 shadow-xl overflow-hidden">
          {listOfFilters.slice(1).map((i) => (
            <div
              key={i.value}
              onClick={() => {
                handleFilter(filter, i.value);
                selected = i.value;
                setOpen(false);
              }}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-white/5 transition"
            >
              <span className={`px-2 py-0.5 rounded text-slate-500 text-sm`}>
                {i.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
