import TableRow from "./table-row";
import { MobileTableRow } from "./MobileTableRow";

export default function MobileTable({
  openModal,
  leads,
  onDelete,
  onEdit,
  sortBy,
  sortDir,
  handleSort,
}) {
  return (
    <main className="mt-6 w-full xl:w-5/6 bg-white/5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
      <div className="px-4 py-4 border-b border-white/10">
        <p className="text-sm font-semibold text-white">Leads</p>
        <p className="text-xs text-slate-400 mt-1">
          Manage and track all incoming leads
        </p>
      </div>

      <div>
        {leads.length > 0 ? (
          <div className="p-3 flex flex-col gap-2">
            {leads.map((lead) => (
              <MobileTableRow key={lead.id} lead={lead} />
            ))}
          </div>
        ) : (
          <div className="py-14 text-center">
            <p className="text-sm font-medium text-slate-200">No leads yet</p>
            <p className="text-xs text-slate-500 mt-1">
              Add your first lead to get started.
            </p>
            <div className="flex items-center justify-center mt-2.5 gap-3 h-9">
              <button
                className="bg-indigo-600 text-xs text-white px-4 rounded-xl h-full hover:bg-indigo-500 transition shadow-[0_10px_30px_rgba(79,70,229,0.35)]"
                onClick={openModal}
              >
                + Add Lead
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
