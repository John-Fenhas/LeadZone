import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { supabase } from "../supabaseClient";
import { useQuery } from "@tanstack/react-query";
import getLeads from "../hooks/getLeads";

const LeadsContext = createContext();

export function LeadsProvider({ children }) {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: supabaseLeads, queryIsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getLeads,
  });
  useEffect(() => {
    if (supabaseLeads) {
      setLeads(supabaseLeads);
    }
  }, [supabaseLeads]);

  // async function fetchLeads() {
  //   setIsLoading(true);
  //   const { data, error } = await supabase
  //     .from("leads")
  //     .select("*")
  //     .order("id", { ascending: true });

  //   if (error) {
  //     console.error("fetch error:", error);
  //     setIsLoading(false);
  //     return;
  //   }

  //   setLeads(data);
  //   setIsLoading(false);
  // }

  //add, edit, delete fns

  async function addLead(newLead) {
    const { data, error } = await supabase
      .from("leads")
      .insert(newLead)
      .select()
      .single();

    if (error) {
      console.error("insert error:", error);
      return;
    }
    setLeads((prev) => [...prev, data]);
  }

  async function editLead(id, updatedFields) {
    const { error } = await supabase
      .from("leads")
      .update(updatedFields)
      .eq("id", id);

    if (error) {
      console.error("update error:", error.message);
      return;
    }
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, ...updatedFields } : lead,
      ),
    );
  }

  async function deleteLead(id) {
    const { error } = await supabase.from("leads").delete().eq("id", id);

    if (error) {
      console.error("delete error:", error);
      return;
    }
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  //add/edit lead modal and selected lead state
  const [selectedLead, setSelectedLead] = useState(null);
  const [isAddandEditModalOpen, setIsAddandEditModalOpen] = useState(false);

  function openAddAndEditModal(lead) {
    if (lead) {
      setSelectedLead(lead);
      setIsAddandEditModalOpen(true);
    }
    if (!lead) {
      setSelectedLead(null);
      setIsAddandEditModalOpen(true);
    }
  }

  function closeAddandEditModal() {
    setIsAddandEditModalOpen(false);
    setSelectedLead(null);
  }

  //search
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(value) {
    setSearchValue(value);
    setCurrentPage(1);
  }

  //sort
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  function handleSort(col) {
    if (sortBy === col) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
    setCurrentPage(1);
  }

  //filters
  const [filter, setFilter] = useState({
    statusFilter: { filterCol: "status", filterBy: null },
    destinationFilter: { filterCol: "destination", filterBy: null },
  });

  function handleFilter(filterby, value) {
    if (filterby === "status") {
      setFilter({
        statusFilter: { filterCol: "status", filterBy: value },
        destinationFilter: { filterCol: "destination", filterBy: null },
      });
    }
    if (filterby === "destination") {
      setFilter({
        statusFilter: { filterCol: "status", filterBy: null },
        destinationFilter: { filterCol: "destination", filterBy: value },
      });
    }
    setCurrentPage(1);
  }

  function clearFilters() {
    setFilter({
      statusFilter: { filterCol: "status", filterBy: null },
      destinationFilter: { filterCol: "destination", filterBy: null },
    });
    setSearchValue("");
    setSortBy("date");
    setSortDir("desc");
    setCurrentPage(1);
  }

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 12;

  //reset page to the first on filter, sort, search changes is handled in each fn

  //processed leads filtered and sorted
  const processedLeads = useMemo(() => {
    let result = [...leads];

    if (searchValue.trim()) {
      const query = searchValue.toLowerCase();
      result = result.filter(
        (l) =>
          l.name?.toLowerCase().includes(query) ||
          l.callRecap?.toLowerCase().includes(query) ||
          l.email?.toLowerCase().includes(query) ||
          l.number.toString().includes(query),
      );
    }

    if (sortBy === "budget") {
      result.sort((a, b) =>
        sortDir === "asc" ? a.budget - b.budget : b.budget - a.budget,
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        sortDir === "asc"
          ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          : b.name.toLowerCase().localeCompare(a.name.toLowerCase()),
      );
    }

    if (sortBy === "date") {
      result.sort((a, b) =>
        sortDir === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date),
      );
    }

    if (filter.statusFilter.filterBy) {
      result = result.filter(
        (lead) =>
          lead[filter.statusFilter.filterCol] === filter.statusFilter.filterBy,
      );
    }

    if (filter.destinationFilter.filterBy) {
      result = result.filter(
        (lead) =>
          lead[filter.destinationFilter.filterCol] ===
          filter.destinationFilter.filterBy,
      );
    }

    return result;
  }, [leads, searchValue, sortBy, sortDir, filter]);

  //total page number for pagination
  const totalPageCount = Math.ceil(processedLeads.length / leadsPerPage);

  //filtered leads for each page
  const filteredLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * leadsPerPage;
    return processedLeads.slice(startIndex, startIndex + leadsPerPage);
  }, [processedLeads, currentPage]);

  //pagination fns
  function nextPage() {
    if (currentPage >= totalPageCount) {
      setCurrentPage(1);
      return;
    }
    setCurrentPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prevPage() {
    if (currentPage <= 1) {
      setCurrentPage(totalPageCount);
      return;
    }
    setCurrentPage((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToPage(pageNumber) {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <LeadsContext.Provider
      value={{
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
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeads() {
  return useContext(LeadsContext);
}
