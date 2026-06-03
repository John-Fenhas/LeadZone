import FilterDropDown from "../components/filter-dropdown";

export default function Filters({
  openModal,
  search,
  handleSearch,
  handleFilter,
}) {
  const statusFilters = [
    { label: "Status", value: null },
    { label: "All", value: null },
    { label: "Fresh", value: "Fresh" },
    { label: "No Answer", value: "No Answer" },
    { label: "Call Back", value: "Call Back" },
    { label: "Follow-up", value: "Follow-up" },
    { label: "Meeting Booked", value: "Meeting Booked" },
    { label: "Site Visit", value: "Site Visit" },
    { label: "Low Budget", value: "Low Budget" },
    { label: "Not Interested", value: "Not Interested" },
  ];

  const destinationFilters = [
    { label: "Destination", value: null },
    { label: "All", value: null },
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

  return (
    <div className="w-full lg:w-5/6 z-50">
      {/* Header */}
      <div className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex justify-between items-center shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-white">Leads Dashboard</p>
        </div>

        <div className="flex items-center gap-3 h-9">
          <button
            id="add-lead-btn"
            className="bg-indigo-600 text-xs text-white px-4 rounded-xl h-full hover:bg-indigo-500 transition shadow-[0_10px_30px_rgba(79,70,229,0.35)] add-lead-btn"
            onClick={openModal}
          >
            + Add Lead
          </button>
        </div>
      </div>

      {/* Filters */}
      <div
        className="
      w-full mt-4
      bg-white/5 border border-white/10 rounded-2xl
      px-4 py-3
      shadow-2xl backdrop-blur-xl

      flex flex-col gap-3
      sm:flex-row sm:justify-between sm:items-center
    "
      >
        <div className="flex flex-wrap items-center gap-2">
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 5H6C5.5286 5 5.29289 5 5.14645 5.14645C5 5.29289 5 5.5286 5 6V7.96482C5 8.2268 5 8.35779 5.05916 8.46834C5.11833 8.57888 5.22732 8.65154 5.4453 8.79687L8.4688 10.8125C9.34073 11.3938 9.7767 11.6845 10.0133 12.1267C10.25 12.5688 10.25 13.0928 10.25 14.1407V19L13.75 17.25V14.1407C13.75 13.0928 13.75 12.5688 13.9867 12.1267C14.2233 11.6845 14.6593 11.3938 15.5312 10.8125L18.5547 8.79687C18.7727 8.65154 18.8817 8.57888 18.9408 8.46834C19 8.35779 19 8.2268 19 7.96482V6C19 5.5286 19 5.29289 18.8536 5.14645C18.7071 5 18.4714 5 18 5Z"
              stroke="#94A3B8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="text-xs font-medium text-slate-300">Filters</p>

          <FilterDropDown filter={"status"} listOfFilters={statusFilters} />

          <FilterDropDown
            filter={"destination"}
            listOfFilters={destinationFilters}
          />
        </div>

        <div
          className="
        flex items-center
        h-10 sm:h-9
        w-full sm:w-auto
        sm:min-w-56

        bg-white/5 px-3 rounded-xl
        border border-white/10
        focus-within:border-indigo-400/50
        focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.18)]
        transition
      "
        >
          <svg
            fill="#94A3B8"
            width="12px"
            height="12px"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
              fillRule="evenodd"
            />
          </svg>

          <input
            id="search"
            type="text"
            placeholder="Search leads…"
            className="
          bg-transparent pl-2 w-full
          text-xs text-slate-200
          placeholder-slate-500
          focus:outline-none focus:ring-0
        "
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
