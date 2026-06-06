import { useEffect, useState } from "react";
import StatusSelect from "./StatusSelect";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import DestinationSelect from "./DestinationSelect";

////// modal call btnnn

// <button id="add-lead-btn" className="bg-black text-sm text-gray-50 w-24 rounded-md h-full cursor-pointer

// add-lead-btn

// ">
// +  Add Lead
// </button>

///////

export default function Modal({
  isModalOpen,
  closeModal,
  selectedLead,
  addLead,
  editLead,
}) {
  // esc listener to close modal
  useEffect(() => {
    if (!isModalOpen) return;

    const esc = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [isModalOpen]);

  //stopping scroll behaviour while modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // state for the modal form
  const [formData, setFormData] = useState({
    status: "Fresh",
    name: "",
    number: null,
    email: "",
    budget: null,
    destination: "",
    date: new Date(),
    callRecap: "",
  });

  // check for open or edit modal

  useEffect(() => {
    if (selectedLead) {
      setFormData({
        status: selectedLead.status || "Fresh",
        name: selectedLead.name || "",
        number: selectedLead.number || null,
        email: selectedLead.email || "",
        budget: selectedLead.budget || null,
        destination: selectedLead.destination || "",
        date: selectedLead.date || new Date(),
        callRecap: selectedLead.callRecap || "",
      });
    } else {
      setFormData({
        status: "Fresh",
        name: "",
        number: null,
        email: "",
        budget: null,
        destination: "",
        date: new Date(),
        callRecap: "",
      });
    }
  }, [isModalOpen]);

  // on form submit fn
  const submitForm = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedLead) {
      await editLead(selectedLead.id, formData);
    } else {
      await addLead(formData);
    }
    setFormData({
      status: "Fresh",
      name: "",
      number: null,
      email: "",
      budget: null,
      destination: "",
      date: new Date(),
      callRecap: "",
    });
    closeModal();
  };

  // On Change Function for the status select dropDown Comp.
  function statusSelectOnChange(value) {
    setFormData({ ...formData, status: value });
  }

  // on change function for the destination Select dropdowwn comp.

  function destinationSelectOnChange(value) {
    setFormData({ ...formData, destination: value });
  }

  return (
    isModalOpen && (
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 sm:px-4 pb-0 sm:pb-0"
        onClick={closeModal}
      >
        <div
          className="
            bg-slate-950 w-full max-w-lg relative border border-white/10 shadow-2xl
            rounded-2xl
            max-h-[92dvh] sm:max-h-[90dvh]
            flex flex-col
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag handle (mobile only) */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* Header — fixed inside the panel */}
          <div className="flex items-center justify-between px-6 pt-4 pb-3 sm:pt-6 border-b border-white/10 shrink-0">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Add New Lead
            </h2>
            <button
              onClick={closeModal}
              className="text-xl text-slate-400 hover:text-white transition cursor-pointer leading-none"
            >
              ×
            </button>
          </div>

          {/* Scrollable form body */}
          <div className="overflow-y-auto overscroll-contain px-6 py-4">
            <form
              id="leadForm"
              onSubmit={submitForm}
              className="space-y-4 leadForm"
            >
              <div className="relative">
                <label className="block mb-1 font-medium text-slate-300">
                  Status
                </label>
                <StatusSelect
                  value={selectedLead?.status || formData.status}
                  onChange={statusSelectOnChange}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-slate-300">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-400/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.18)] transition"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-slate-300">
                  Number
                </label>
                <input
                  type="tel"
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-400/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.18)] transition"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-400/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.18)] transition"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-slate-300">
                  Budget
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-400/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.18)] transition"
                  placeholder="$10,000"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-slate-300">
                  Destination
                </label>
                <DestinationSelect
                  value={selectedLead?.destination || formData.destination}
                  onChange={destinationSelectOnChange}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-slate-300">
                  Call Recap
                </label>
                <input
                  type="text"
                  value={formData.callRecap}
                  onChange={(e) =>
                    setFormData({ ...formData, callRecap: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-400/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.18)] transition"
                  placeholder="Enter Call Recap"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-slate-300">
                  Date
                </label>
                <Flatpickr
                  value={formData.date}
                  options={{
                    enableTime: true,
                    minDate: "today",
                    dateFormat: "Y-m-d H:i",
                  }}
                  onChange={([date]) =>
                    setFormData((prev) => ({ ...prev, date: date }))
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-400/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.18)] transition"
                  placeholder="Select date & time"
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-500 transition shadow-[0_10px_30px_rgba(79,70,229,0.35)] cursor-pointer font-semibold"
              >
                Save Lead
              </button>

              {/* Bottom breathing room so last button clears the keyboard */}
              <div className="h-2 sm:h-0" />
            </form>
          </div>
        </div>
      </div>
    )
  );
}
