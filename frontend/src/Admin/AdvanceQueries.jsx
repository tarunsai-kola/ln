import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import {
  UserPlus,
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Calendar,
  ChevronDown,
  X,
  Share2,
  ExternalLink,
  MessageSquare,
  Phone,
  Mail,
  UserCheck,
  CheckSquare,
  Square,
  Sparkles
} from "lucide-react";

const AdvanceQueries = () => {
  const [queries, setQueries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [assignmentFilter, setAssignmentFilter] = useState("all"); // "all", "unassigned", "assigned", or salespersonId
  const [loading, setLoading] = useState(true);

  // Salespersons list
  const [salesPersons, setSalesPersons] = useState([]);

  // Details Modal
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  // Assign Modal
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignTargets, setAssignTargets] = useState([]); // array of query objects
  const [selectedSalespersonId, setSelectedSalespersonId] = useState("");
  const [assignNote, setAssignNote] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);

  // Multi-select for bulk assign
  const [selectedQueryIds, setSelectedQueryIds] = useState([]);

  const getQueries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/advancequeries`);
      setQueries(response.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load advance queries");
    } finally {
      setLoading(false);
    }
  };

  const getSalesPersons = async () => {
    try {
      const res = await axios.get(`${API}/getadvteam`);
      const all = Array.isArray(res.data) ? res.data : [];
      // Filter active salespeople
      const active = all.filter((s) => s.status !== "Inactive");
      setSalesPersons(active);
    } catch (err) {
      console.error("Failed to load sales team:", err);
    }
  };

  useEffect(() => {
    getQueries();
    getSalesPersons();
  }, []);

  // Filter queries based on search & assignment status
  const filteredQueries = useMemo(() => {
    return queries.filter((query) => {
      // Assignment filter
      if (assignmentFilter === "unassigned") {
        if (query.assignedTo || query.assignedToName) return false;
      } else if (assignmentFilter === "assigned") {
        if (!query.assignedTo && !query.assignedToName) return false;
      } else if (assignmentFilter !== "all") {
        // Specific salesperson ID
        if (
          String(query.assignedTo) !== String(assignmentFilter) &&
          query.assignedToName !== assignmentFilter
        ) {
          return false;
        }
      }

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        (query.email && query.email.toLowerCase().includes(q)) ||
        (query.phone && query.phone.toLowerCase().includes(q)) ||
        (query.name && query.name.toLowerCase().includes(q)) ||
        (query.interestedDomain && query.interestedDomain.toLowerCase().includes(q)) ||
        (query.domain && query.domain.toLowerCase().includes(q)) ||
        (query.goal && query.goal.toLowerCase().includes(q)) ||
        (query.assignedToName && query.assignedToName.toLowerCase().includes(q))
      );
    });
  }, [queries, searchQuery, assignmentFilter]);

  const handleSelectChange = async (event, id) => {
    const updatedAction = event.target.value;
    try {
      await axios.put(`${API}/advancequery/${id}`, { action: updatedAction });
      toast.success("Query updated successfully");
      getQueries();
    } catch (error) {
      console.error("Error updating query:", error);
      toast.error("Failed to update query status");
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-GB");
  };

  const groupedData = useMemo(() => {
    return filteredQueries.reduce((acc, query) => {
      const date = formatDate(query.createdAt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(query);
      return acc;
    }, {});
  }, [filteredQueries]);

  const handleDialogOpen = (query) => {
    setDialogData(query);
    setDialogVisible(true);
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setDialogData(null);
  };

  const convertToIST = (utcDate) => {
    if (!utcDate) return "N/A";
    const date = new Date(utcDate);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Status Badge styling helper
  const getStatusBadge = (status) => {
    switch (status) {
      case "Shared":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Not Interested":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "Already Paid":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Shared to CRM":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Unseen":
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  // ── Assignment Handlers ──
  const handleOpenAssignModal = (targets) => {
    const targetsList = Array.isArray(targets) ? targets : [targets];
    setAssignTargets(targetsList);
    setAssignNote("");
    if (salesPersons.length > 0) {
      // If single query already has an assigned salesperson, pre-select it
      if (targetsList.length === 1 && targetsList[0].assignedTo) {
        setSelectedSalespersonId(String(targetsList[0].assignedTo));
      } else {
        setSelectedSalespersonId(salesPersons[0]._id);
      }
    }
    setAssignModalOpen(true);
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSalespersonId) {
      toast.error("Please select a sales person");
      return;
    }

    const salesperson = salesPersons.find((s) => String(s._id) === String(selectedSalespersonId));
    if (!salesperson) {
      toast.error("Invalid sales person selected");
      return;
    }

    setIsAssigning(true);
    try {
      const queryIds = assignTargets.map((q) => q._id);
      const res = await axios.post(`${API}/advancequery/assign`, {
        queryIds,
        salespersonId: salesperson._id,
        salespersonName: salesperson.fullname,
        salespersonEmail: salesperson.email,
        salespersonTeam: salesperson.team || "",
        assignedBy: "Admin",
        note: assignNote,
      });

      if (res.data.success) {
        toast.success(res.data.message || `Assigned to ${salesperson.fullname}!`);
        setAssignModalOpen(false);
        setSelectedQueryIds([]);
        getQueries();
        if (dialogVisible && dialogData) {
          setDialogData((prev) => ({
            ...prev,
            assignedTo: salesperson._id,
            assignedToName: salesperson.fullname,
            assignedToTeam: salesperson.team,
            assignedAt: new Date().toISOString(),
            action: "Shared",
          }));
        }
      }
    } catch (err) {
      console.error("Assignment failed:", err);
      toast.error("Failed to assign lead(s)");
    } finally {
      setIsAssigning(false);
    }
  };

  // Bulk selection toggles
  const handleToggleSelectAll = () => {
    if (selectedQueryIds.length === filteredQueries.length) {
      setSelectedQueryIds([]);
    } else {
      setSelectedQueryIds(filteredQueries.map((q) => q._id));
    }
  };

  const handleToggleQuerySelect = (id) => {
    setSelectedQueryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="admin-content-wrap min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#fff",
            borderRadius: "12px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          },
        }}
      />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              Advance Course Queries
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-3 py-1 rounded-full uppercase tracking-wider">
                Inbound Leads
              </span>
            </h1>
            <p className="text-slate-500 mt-1">
              Review inbound student queries and share leads directly with your sales specialists.
            </p>
          </div>

          {/* Search & Counter Bar */}
          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
            <div className="relative flex-1 xl:w-80 bg-white border border-slate-200 rounded-xl shadow-sm">
              <i className="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                placeholder="Search name, email, phone, role, salesperson..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm outline-none bg-transparent placeholder-slate-400 text-slate-700"
              />
            </div>

            {/* Assignment Status Filter */}
            <div className="relative bg-white border border-slate-200 rounded-xl shadow-sm">
              <select
                value={assignmentFilter}
                onChange={(e) => setAssignmentFilter(e.target.value)}
                className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-transparent outline-none cursor-pointer pr-8"
              >
                <option value="all">All Assignment Status</option>
                <option value="unassigned">⚠️ Unassigned Only</option>
                <option value="assigned">✅ Assigned to Sales</option>
                {salesPersons.map((sp) => (
                  <option key={sp._id} value={sp.fullname}>
                    👤 Assigned to {sp.fullname} ({sp.team || "Sales"})
                  </option>
                ))}
              </select>
            </div>

            <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl whitespace-nowrap shadow-sm">
              <span className="text-sm font-semibold text-slate-700">{filteredQueries.length} found</span>
            </div>
          </div>
        </div>

        {/* ── BULK ACTION FLOATING BAR ── */}
        {selectedQueryIds.length > 0 && (
          <div className="p-4 bg-indigo-900 text-white rounded-2xl shadow-xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top duration-200">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center font-bold text-sm">
                {selectedQueryIds.length}
              </span>
              <span className="text-sm font-semibold">
                {selectedQueryIds.length} lead{selectedQueryIds.length > 1 ? "s" : ""} selected
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const targets = queries.filter((q) => selectedQueryIds.includes(q._id));
                  handleOpenAssignModal(targets);
                }}
                className="px-4 py-2 rounded-xl bg-white text-indigo-950 font-bold text-xs hover:bg-indigo-50 transition flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Share2 size={14} />
                Share Selected to Sales Person
              </button>
              <button
                onClick={() => setSelectedQueryIds([])}
                className="px-3 py-2 text-indigo-200 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
          {loading && (
            <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="px-4 py-4 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={
                        filteredQueries.length > 0 &&
                        selectedQueryIds.length === filteredQueries.length
                      }
                      onChange={handleToggleSelectAll}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-4 w-12 text-center">#</th>
                  <th className="px-6 py-4">Candidate Profile</th>
                  <th className="px-6 py-4">Education</th>
                  <th className="px-6 py-4">Program Interest</th>
                  <th className="px-6 py-4">Sales Person Assignment</th>
                  <th className="px-6 py-4">Status & Action</th>
                  <th className="px-6 py-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.keys(groupedData).length > 0 ? (
                  Object.keys(groupedData)
                    .sort((a, b) => {
                      const dateA = a.split("/").reverse().join("");
                      const dateB = b.split("/").reverse().join("");
                      return dateB.localeCompare(dateA);
                    })
                    .map((date) => (
                      <React.Fragment key={date}>
                        {/* Date Group Header */}
                        <tr className="bg-slate-50/80 border-y border-slate-200">
                          <td colSpan="8" className="px-6 py-3">
                            <div className="flex items-center gap-2">
                              <i className="fa fa-calendar-day text-blue-500 text-sm"></i>
                              <span className="text-sm font-bold text-slate-800">{date}</span>
                              <span className="text-xs font-medium text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                                {groupedData[date].length} queries
                              </span>
                            </div>
                          </td>
                        </tr>

                        {groupedData[date].map((query, index) => {
                          const isSelected = selectedQueryIds.includes(query._id);

                          return (
                            <tr
                              key={query._id}
                              className={`hover:bg-slate-50 transition-colors group ${
                                isSelected ? "bg-indigo-50/40" : ""
                              } ${
                                query.action === "Unseen" || !query.action
                                  ? "bg-amber-50/30"
                                  : ""
                              }`}
                            >
                              {/* Checkbox */}
                              <td className="px-4 py-4 text-center">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleToggleQuerySelect(query._id)}
                                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                              </td>

                              {/* Sl No */}
                              <td className="px-4 py-4 text-center text-slate-500 font-medium">
                                {index + 1}
                              </td>

                              {/* Candidate Profile */}
                              <td className="px-6 py-4">
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold text-slate-800 capitalize mb-1">
                                    {query.name || "N/A"}
                                  </span>
                                  <div className="flex items-center gap-2 text-xs text-slate-600">
                                    <span className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-md">
                                      <i className="fa fa-envelope text-slate-400"></i> {query.email || "N/A"}
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-md">
                                      <i className="fa fa-phone text-emerald-500"></i> {query.phone || "N/A"}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Education */}
                              <td className="px-6 py-4">
                                <div className="flex flex-col gap-1.5">
                                  <div className="flex items-center gap-2 text-sm">
                                    {query.passedOutYear ? (
                                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                        Class of {query.passedOutYear}
                                      </span>
                                    ) : (
                                      <span className="text-xs text-slate-500">N/A</span>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* Program Interest */}
                              <td className="px-6 py-4">
                                <div className="flex flex-col gap-1.5">
                                  <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-100 w-fit capitalize">
                                    {query.interestedDomain || "N/A"}
                                  </span>
                                  <span className="text-xs text-slate-500 truncate max-w-[200px] capitalize">
                                    <span className="font-medium">Goal:</span>{" "}
                                    {query.goal === "Other" ? query.goalOther : query.goal || "N/A"}
                                  </span>
                                </div>
                              </td>

                              {/* ── SALES PERSON ASSIGNMENT ── */}
                              <td className="px-6 py-4">
                                {query.assignedToName ? (
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                                        <UserCheck size={13} className="text-indigo-600" />
                                        {query.assignedToName}
                                      </span>
                                      <button
                                        onClick={() => handleOpenAssignModal(query)}
                                        className="text-[11px] font-semibold text-slate-400 hover:text-indigo-600 transition underline cursor-pointer"
                                        title="Reassign to another sales person"
                                      >
                                        Reassign
                                      </button>
                                    </div>
                                    <div className="text-[10px] text-slate-400">
                                      {query.assignedToTeam && <span>{query.assignedToTeam} • </span>}
                                      <span>{formatDate(query.assignedAt)}</span>
                                    </div>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleOpenAssignModal(query)}
                                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 text-indigo-700 font-bold text-xs border border-indigo-200/80 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                                  >
                                    <UserPlus size={13} />
                                    <span>Share to Sales</span>
                                  </button>
                                )}
                              </td>

                              {/* Status & Action */}
                              <td className="px-6 py-4">
                                <div className="relative w-full max-w-[160px]">
                                  <select
                                    value={query.action || "Unseen"}
                                    onChange={(event) => handleSelectChange(event, query._id)}
                                    className={`w-full text-xs font-bold appearance-none border rounded-lg px-3 py-2 outline-none transition-all cursor-pointer pr-8 ${getStatusBadge(
                                      query.action
                                    )}`}
                                  >
                                    <option value="Unseen">Unseen</option>
                                    <option value="Shared">Shared</option>
                                    <option value="Not Interested">Not Interested</option>
                                    <option value="Already Paid">Already Paid</option>
                                    <option value="Shared to CRM">Shared to CRM</option>
                                  </select>
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 opacity-50">
                                    <i className="fa fa-chevron-down text-[10px]"></i>
                                  </div>
                                </div>
                              </td>

                              {/* Details */}
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-3 text-sm">
                                  <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                    {convertToIST(query.createdAt)}
                                  </span>
                                  <button
                                    onClick={() => handleDialogOpen(query)}
                                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white border border-blue-100 transition-all group-hover:shadow-sm cursor-pointer"
                                    title="View More Details"
                                  >
                                    <i className="fa fa-info-circle text-sm"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-20 text-center">
                      {!loading && (
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-4">
                            <i className="fa fa-inbox text-2xl text-slate-300"></i>
                          </div>
                          <h3 className="text-base font-bold text-slate-800">No queries found</h3>
                          <p className="text-sm text-slate-500 mt-1 max-w-sm">
                            There are no advanced course queries matching your search criteria.
                          </p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── MODAL: ASSIGN LEAD(S) TO SALESPERSON ── */}
        {assignModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-7 relative border border-slate-100 animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setAssignModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="mb-5 pb-3 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <UserPlus className="text-indigo-600" size={22} />
                  Share Lead to Sales Person
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Assign candidate query directly to a sales specialist's dashboard.
                </p>
              </div>

              <form onSubmit={handleAssignSubmit} className="space-y-4">
                {/* Target Queries Summary */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Candidate(s) Being Shared ({assignTargets.length})
                  </span>
                  <div className="max-h-28 overflow-y-auto space-y-1 pr-1">
                    {assignTargets.map((q) => (
                      <div key={q._id} className="text-xs font-semibold text-slate-800 flex items-center justify-between">
                        <span>{q.name} ({q.phone})</span>
                        <span className="text-[11px] text-blue-600">{q.interestedDomain || "Advance"}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salesperson Selector */}
                <div>
                  <label className="font-bold text-slate-700 text-xs block mb-1.5 uppercase tracking-wider">
                    Select Sales Person / Specialist
                  </label>
                  <select
                    value={selectedSalespersonId}
                    onChange={(e) => setSelectedSalespersonId(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="" disabled>Select Sales Person</option>
                    {salesPersons.map((sp) => (
                      <option key={sp._id} value={sp._id}>
                        {sp.fullname} &mdash; {sp.team || "Advance Team"} ({sp.designation || "Specialist"})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Admin Note */}
                <div>
                  <label className="font-bold text-slate-700 text-xs block mb-1.5 uppercase tracking-wider">
                    Admin Note / Instructions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Inquired about Data Science offline batch, please call immediately..."
                    value={assignNote}
                    onChange={(e) => setAssignNote(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  ></textarea>
                </div>

                <div className="pt-3 border-t border-slate-100 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAssignModalOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isAssigning}
                    className="flex-[2] py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition cursor-pointer shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Share2 size={14} />
                    {isAssigning
                      ? "Assigning Lead(s)..."
                      : `Assign to ${salesPersons.find((s) => String(s._id) === String(selectedSalespersonId))?.fullname || "Sales Person"}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── DETAILS DIALOG OVERLAY ── */}
        {dialogVisible && dialogData && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
              {/* Dialog Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Query Details</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-sm font-medium text-blue-600 capitalize">{dialogData.name}</p>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(
                        dialogData.action
                      )}`}
                    >
                      {dialogData.action || "Unseen"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleDialogClose}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                >
                  <i className="fa fa-times text-lg"></i>
                </button>
              </div>

              {/* Dialog Content */}
              <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-white">
                <div className="space-y-6">
                  {/* Sales Person Assignment Banner */}
                  <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">
                        Sales Assignment
                      </span>
                      {dialogData.assignedToName ? (
                        <p className="text-xs font-bold text-indigo-950 mt-0.5">
                          Assigned to <strong>{dialogData.assignedToName}</strong> ({dialogData.assignedToTeam || "Sales Team"}) on {formatDate(dialogData.assignedAt)}
                        </p>
                      ) : (
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">
                          Not assigned to any sales person yet.
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleOpenAssignModal(dialogData)}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-600/20"
                    >
                      <UserPlus size={13} />
                      {dialogData.assignedToName ? "Reassign" : "Share to Sales"}
                    </button>
                  </div>

                  {/* Candidate Info */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-200">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-slate-500 block mb-0.5">Email</span>
                        <span className="text-xs font-bold text-slate-800 break-all">{dialogData.email}</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 block mb-0.5">Phone</span>
                        <span className="text-xs font-bold text-slate-800">{dialogData.phone}</span>
                      </div>
                      {dialogData.passedOutYear && (
                        <div>
                          <span className="text-xs text-slate-500 block mb-0.5">Year of Passing</span>
                          <span className="text-xs font-bold text-slate-800">{dialogData.passedOutYear}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Program Info */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-200">
                      Query Details
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs text-slate-500 mb-1 block">Interested Domain</span>
                          <span className="text-sm font-bold text-blue-600 capitalize">
                            {dialogData.interestedDomain || "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 mb-1 block">Specific Domain</span>
                          <span className="text-sm font-semibold text-slate-800 capitalize">
                            {dialogData.domain === "Other" ? dialogData.domainOther : dialogData.domain || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200">
                        <span className="text-xs text-slate-500 mb-1 block">Primary Goal</span>
                        <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100 capitalize font-medium">
                          {dialogData.goal === "Other" ? dialogData.goalOther : dialogData.goal || "N/A"}
                        </p>
                      </div>

                      {dialogData.reason && (
                        <div className="pt-3 border-t border-slate-200">
                          <span className="text-xs text-slate-500 mb-1 block">Detailed Reason / Challenge</span>
                          <p className="text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-100 leading-relaxed italic">
                            "{dialogData.reason}"
                          </p>
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-200">
                        <span className="text-xs text-slate-500">Query Submitted On</span>
                        <span className="text-xs font-bold text-slate-700 block">
                          {formatDate(dialogData.createdAt)} at {convertToIST(dialogData.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvanceQueries;
