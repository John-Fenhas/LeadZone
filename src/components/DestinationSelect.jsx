import { useState, useRef, useEffect } from "react";

const destinations = [
  { label: "Select a Destination", value: "" },
  { label: "New Capital", value: "New Capital" },
  { label: "New Cairo", value: "New Cairo" },
  { label: "October", value: "October" },
  { label: "North Coast", value: "North Coast" },
  { label: "Red Sea", value: "Red Sea" },
  { label: "Sokhna", value: "Sokhna" },
  { label: "Mostakbal City", value: "Mostakbal City" },
  { label: "Al Shorouk City", value: "Al Shorouk City" },
  { label: "The 5th Settlement", value: "The 5th Settlement" },
];

export default function DestinationSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const currentValue = value === "" ? "Select a Destination" : value;
  let selected = destinations.find((d) => d.label === currentValue);

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
        <span className={`py-0.5 rounded text-slate-500 text-sm`}>
          {selected?.label}
        </span>

        <svg
          className={`h-4 w-4 text-white/60 transition ${open && "rotate-180"}`}
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
        <div
          className="absolute z-50 mt-1 w-full rounded-xl border border-white/10 bg-slate-950 shadow-xl overflow-hidden max-h-52 overflow-y-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.2) transparent",
          }}
        >
          {destinations.map((d) => (
            <div
              key={d.value}
              onClick={() => {
                onChange(d.value);
                setOpen(false);
              }}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-white/5 transition"
            >
              <span className={`px-2 py-0.5 rounded text-slate-500 text-sm`}>
                {d.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
