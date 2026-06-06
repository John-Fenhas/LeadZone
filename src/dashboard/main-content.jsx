import { supabase } from "../supabaseClient";
import { useState, useMemo, useEffect } from "react";
import Table from "./table";
import Filters from "./filters";
import Modal from "../components/modal";
import Auth from "../auth/auth";
import { useLeads } from "../context/LeadsContext";
import Pagination from "./Pagination";
import useIsMobile from "../hooks/isMobile";
import MobileTable from "./MobileTable";

export default function MainContent() {
  // // leads fetch and state set up
  // const [leads, setLeads] = useState([]);

  // async function fetchLeads() {
  //   const { data, error } = await supabase
  //     .from("leads")
  //     .select("*")
  //     .order("id", { ascending: true });
  //   if (error) {
  //     console.log("fetch error:", error);
  //     return;
  //   }

  //   setLeads(data);
  // }
  // useEffect(() => {
  //   fetchLeads();
  // }, []);

  // //table logic, fns and state
  // async function deleteLead(id) {
  //   const { error } = await supabase.from("leads").delete().eq("id", id);

  //   if (error) {
  //     console.log(error);
  //     return;
  //   }
  //   if (!error) {
  //     setLeads((prev) => prev.filter((l) => l.id !== id));
  //   }
  // }

  // //Add/Edit lead form modal state and fns
  // const [selectedLead, setSelectedLead] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // async function addLead(newLead) {
  //   const { data, error } = await supabase
  //     .from("leads")
  //     .insert(newLead)
  //     .select()
  //     .single();

  //   if (error) {
  //     console.log("insert error:", error);
  //     return;
  //   }

  //   setLeads((prev) => [...prev, data]);
  // }

  // async function editLead(id, updatedFields) {
  //   const { error } = await supabase
  //     .from("leads")
  //     .update(updatedFields)
  //     .eq("id", id);

  //   if (error) {
  //     console.error("update error:", error);
  //     return;
  //   }

  //   setLeads((prev) =>
  //     prev.map((lead) =>
  //       lead.id === id ? { ...lead, ...updatedFields } : lead,
  //     ),
  //   );
  // }

  // function openEditModal(lead) {
  //   setSelectedLead(lead);
  //   setIsModalOpen(true);
  // }

  // const modal = useMemo(
  //   () => ({
  //     isOpen: isModalOpen,
  //     open: () => setIsModalOpen(true),
  //     openEdit: openEditModal,
  //     close: () => {
  //       setIsModalOpen(false);
  //       setSelectedLead(null);
  //     },
  //   }),
  //   [isModalOpen],
  // );

  // //Dashboard sort, filter and search states and functions
  // const [search, setSearch] = useState({
  //   value: "",
  // });
  // const [sortBy, setSortBy] = useState("date");
  // const [sortDir, setSortDir] = useState("desc");
  // const [filter, setFilter] = useState({
  //   statusFilter: {
  //     filterCol: "status",
  //     filterBy: null,
  //   },
  //   destinationFilter: {
  //     filterCol: "destination",
  //     filterBy: null,
  //   },
  // });

  // const filteredLeads = useMemo(() => {
  //   let result = [...leads];

  //   if (search) {
  //     result = result.filter(
  //       (l) =>
  //         l.name.toLowerCase().includes(search.value.toLowerCase()) ||
  //         l.callRecap
  //           .toLowerCase()
  //           .includes(search.value.toLocaleLowerCase()) ||
  //         l.email.toLowerCase().includes(search.value.toLocaleLowerCase()),
  //     );
  //   }

  //   if (sortBy === "budget") {
  //     sortDir === "asc"
  //       ? result.sort((a, b) => a.budget - b.budget)
  //       : result.sort((a, b) => b.budget - a.budget);
  //   }

  //   if (sortBy === "name") {
  //     sortDir === "asc"
  //       ? result.sort((a, b) =>
  //           a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
  //         )
  //       : result.sort((a, b) =>
  //           b.name.toLowerCase().localeCompare(a.name.toLowerCase()),
  //         );
  //   }

  //   if (sortBy === "date") {
  //     sortDir === "asc"
  //       ? result.sort((a, b) => new Date(a.date) - new Date(b.date))
  //       : result.sort((a, b) => new Date(b.date) - new Date(a.date));
  //   }

  //   if (filter.statusFilter.filterBy) {
  //     result = result.filter(
  //       (lead) =>
  //         lead[filter.statusFilter.filterCol] === filter.statusFilter.filterBy,
  //     );
  //   }

  //   if (filter.destinationFilter.filterBy) {
  //     result = result.filter(
  //       (lead) =>
  //         lead[filter.destinationFilter.filterCol] ===
  //         filter.destinationFilter.filterBy,
  //     );
  //   }

  //   return result;
  // }, [leads, search, sortBy, sortDir, filter]);

  // function handleSearch(searchInput) {
  //   setSearch({ value: searchInput });
  // }

  // function handleSort(col) {
  //   if (sortBy === col) {
  //     setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
  //   } else {
  //     setSortBy(col);
  //     setSortDir("asc");
  //   }
  //   console.log("sorted");
  // }

  // function handleFilter(col, filter) {
  //   //col is the coloum to filter
  //   // filter is the item inside the coloum to filter

  //   if (col === "status") {
  //     setFilter({
  //       statusFilter: {
  //         filterCol: "status",
  //         filterBy: filter,
  //       },
  //       destinationFilter: {
  //         filterCol: "destination",
  //         filterBy: null,
  //       },
  //     });
  //   }
  //   if (col === "destination") {
  //     setFilter({
  //       statusFilter: {
  //         filterCol: "status",
  //         filterBy: null,
  //       },
  //       destinationFilter: {
  //         filterCol: "destination",
  //         filterBy: filter,
  //       },
  //     });
  //   }
  // }

  const {
    //leads
    filteredLeads,
    isLoading,
    // crud
    addLead,
    editLead,
    deleteLead,
    // modal
    isAddandEditModalOpen,
    selectedLead,
    openAddAndEditModal,
    closeAddandEditModal,
    // search
    searchValue,
    handleSearch,
    // sort
    sortBy,
    sortDir,
    handleSort,
    // filter
    filter,
    handleFilter,
    clearFilters,
    // pagination
    currentPage,
    totalPageCount,
    leadsPerPage,
    nextPage,
    prevPage,
    goToPage,
  } = useLeads();

  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-screen flex flex-col items-center px-10 pt-22">
      <Filters
        openModal={openAddAndEditModal}
        search={searchValue}
        handleSearch={handleSearch}
        handleFilter={handleFilter}
      />

      {isMobile ? (
        <MobileTable
          openModal={openAddAndEditModal}
          leads={filteredLeads}
          onDelete={deleteLead}
          onEdit={openAddAndEditModal}
          sortBy={sortBy}
          sortDir={sortDir}
          handleSort={handleSort}
        />
      ) : (
        <Table
          openModal={openAddAndEditModal}
          leads={filteredLeads}
          onDelete={deleteLead}
          onEdit={openAddAndEditModal}
          sortBy={sortBy}
          sortDir={sortDir}
          handleSort={handleSort}
        />
      )}

      <Modal
        isModalOpen={isAddandEditModalOpen}
        closeModal={closeAddandEditModal}
        selectedLead={selectedLead}
        editLead={editLead}
        addLead={addLead}
      />
      <Pagination />
    </section>
  );
}
// const modal = useMemo(
//   () => ({
//     isOpen: isModalOpen,
//     open: () => setIsModalOpen(true),
//     openEdit: openEditModal,
//     close: () => {
//       setIsModalOpen(false);
//       setSelectedLead(null);
//     },
//   }),
//   [isModalOpen],
// );
