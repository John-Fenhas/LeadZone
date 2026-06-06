import { useLeads } from "../context/LeadsContext";

export default function Pagination() {
  const {
    currentPage,
    totalPageCount,
    isLoading,
    nextPage,
    prevPage,
    goToPage,
  } = useLeads();

  const getPageNumbers = () => {
    const pages = [];

    if (totalPageCount <= 4) {
      return Array.from({ length: totalPageCount }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    // Show window around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPageCount - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPageCount - 2) {
      pages.push("...");
    }

    // Always show last page
    pages.push(totalPageCount);

    return pages;
  };

  return (
    <div className="flex pt-6">
      {/*prev page btn*/}
      <button
        className="h-10 w-10 md:w-12 md:h-12 flex justify-center items-center rounded-l-xl border border-[#2A3557] bg-[#08112D] text-white hover:bg-[#0D1738] cursor-pointer"
        onClick={() => prevPage()}
      >
        <svg
          width="26px"
          height="26px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_iconCarrier">
            <path
              d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
              fill="#94A3B8"
            />
          </g>
        </svg>
      </button>

      {getPageNumbers().map((page, i) =>
        page === "..." ? (
          <button
            className="h-10 w-10 md:w-12 md:h-12 flex justify-center items-center border-r border-y border-[#2A3557] bg-[#08112D] text-slate-300 cursor-pointer text-sm md:text-base"
            key={i}
          >
            ...
          </button>
        ) : (
          <button
            className={
              currentPage === i + 1
                ? `h-10 w-10 md:w-12 md:h-12 flex justify-center items-center border border-[#7C8DB5] bg-[#030B23] text-white cursor-pointer text-sm md:text-base`
                : `h-10 w-10 md:w-12 md:h-12 flex justify-center items-center border-r border-y border-[#2A3557] bg-[#08112D] text-slate-300 hover:bg-[#0D1738] hover:text-white cursor-pointer text-sm md:text-base`
            }
            key={i}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ),
      )}

      {/*next page btn*/}
      <button
        className="h-10 w-10 md:w-12 md:h-12 flex justify-center items-center rounded-r-xl border border-l-0 border-[#2A3557] bg-[#08112D] hover:bg-[#0D1738] cursor-pointer"
        onClick={() => nextPage()}
      >
        <svg
          width="26px"
          height="26px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-180"
        >
          <g id="SVGRepo_iconCarrier">
            <path
              d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
              fill="#94A3B8"
            />
          </g>
        </svg>
      </button>
    </div>
  );
}
