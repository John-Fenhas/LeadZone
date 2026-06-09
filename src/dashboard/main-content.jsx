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
      <Filters />

      {isMobile ? <MobileTable /> : <Table />}

      <Modal />
      {totalPageCount > 1 ? <Pagination /> : null}
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
