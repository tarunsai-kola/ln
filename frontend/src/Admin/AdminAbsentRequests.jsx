import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import {
  CalendarX,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  RefreshCw,
  Calendar,
  AlertCircle,
  Plus,
  Trash2,
  Check,
  X,
  Layers,
  Sparkles,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminAbsentRequests = () => {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  );

  const [activeTab, setActiveTab] = useState("requests"); // "requests" | "holidays"
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "pending" | "approved" | "rejected"
  const [searchQuery, setSearchQuery] = useState("");

  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    totalPending: 0,
    totalApproved: 0,
    totalRejected: 0,
    totalCount: 0
  });
  const [loading, setLoading] = useState(false);

  // Review modal state
  const [reviewModalData, setReviewModalData] = useState(null); // { request, targetStatus: "approved" | "rejected" }
  const [adminReviewNote, setAdminReviewNote] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  // Holidays state
  const [holidays, setHolidays] = useState([]);
  const [loadingHolidays, setLoadingHolidays] = useState(false);
  const [isAddHolidayOpen, setIsAddHolidayOpen] = useState(false);
  const [newHoliday, setNewHoliday] = useState({
    date: "",
    name: "",
    type: "national",
    description: ""
  });
  const [submittingHoliday, setSubmittingHoliday] = useState(false);

  const isHR = !!localStorage.getItem("hrToken") && !localStorage.getItem("adminToken");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("hrToken") || localStorage.getItem("atdToken");
    if (!token || token === "null" || token === "undefined") {
      return {};
    }
    const clean = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
    return { Authorization: clean };
  };

  const getReviewerName = () => {
    const hr = localStorage.getItem("hrName");
    if (hr) return `${hr} (HR)`;
    return "Admin";
  };

  // 1. Fetch Absent Requests
  const fetchAbsentRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/atd/admin/absent-requests`, {
        headers: getAuthHeaders(),
        withCredentials: true,
        params: {
          month: selectedMonth,
          status: statusFilter,
          search: searchQuery
        }
      });
      if (res.data.success) {
        setRequests(res.data.data || []);
        if (res.data.stats) setStats(res.data.stats);
      }
    } catch (err) {
      console.error("Error fetching absent requests:", err);
      toast.error(err.response?.data?.message || "Failed to load absent requests");
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch Holidays
  const fetchHolidays = async () => {
    setLoadingHolidays(true);
    try {
      const year = selectedMonth ? selectedMonth.split("-")[0] : new Date().getFullYear();
      const res = await axios.get(`${API}/api/atd/admin/holidays`, {
        headers: getAuthHeaders(),
        withCredentials: true,
        params: { year }
      });
      if (res.data.success) {
        setHolidays(res.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching holidays:", err);
      toast.error("Failed to load holidays");
    } finally {
      setLoadingHolidays(false);
    }
  };

  useEffect(() => {
    fetchAbsentRequests();
    fetchHolidays();
  }, [selectedMonth, statusFilter]);

  // Handle Review (Approve / Reject / Reactivate)
  const handleOpenReview = (request, targetStatus) => {
    setReviewModalData({ request, targetStatus });
    setAdminReviewNote("");
  };

  const handleConfirmReview = async () => {
    if (!reviewModalData) return;
    const { request, targetStatus } = reviewModalData;

    setSubmittingReview(true);
    try {
      const reviewer = getReviewerName();
      const res = await axios.patch(
        `${API}/api/atd/admin/absent-requests/${request._id}`,
        {
          status: targetStatus,
          reviewNote: adminReviewNote || (targetStatus === "approved" ? `Accepted by ${reviewer}` : targetStatus === "pending" ? `Reactivated by ${reviewer}` : `Rejected by ${reviewer}`),
          reviewedBy: reviewer
        },
        {
          headers: getAuthHeaders(),
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success(`Request ${targetStatus === "approved" ? "Accepted & Approved" : targetStatus === "pending" ? "Reactivated" : "Rejected"} successfully!`);
        setReviewModalData(null);
        fetchAbsentRequests();
      }
    } catch (err) {
      console.error("Error reviewing absent request:", err);
      toast.error(err.response?.data?.message || "Failed to review request");
    } finally {
      setSubmittingReview(false);
    }
  };

  // Quick Direct Approve (Accept)
  const handleQuickApprove = async (request) => {
    try {
      const reviewer = getReviewerName();
      const res = await axios.patch(
        `${API}/api/atd/admin/absent-requests/${request._id}`,
        {
          status: "approved",
          reviewNote: `Accepted & Approved by ${reviewer}`,
          reviewedBy: reviewer
        },
        {
          headers: getAuthHeaders(),
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success(`Accepted leave for ${request.userName} on ${request.date}!`);
        fetchAbsentRequests();
      }
    } catch (err) {
      toast.error("Failed to approve request");
    }
  };

  // Quick Direct Reject
  const handleQuickReject = async (request) => {
    try {
      const reviewer = getReviewerName();
      const res = await axios.patch(
        `${API}/api/atd/admin/absent-requests/${request._id}`,
        {
          status: "rejected",
          reviewNote: `Rejected by ${reviewer}`,
          reviewedBy: reviewer
        },
        {
          headers: getAuthHeaders(),
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success(`Rejected leave for ${request.userName} on ${request.date}!`);
        fetchAbsentRequests();
      }
    } catch (err) {
      toast.error("Failed to reject request");
    }
  };

  // Quick Direct Reactivate (Reset back to Pending)
  const handleQuickReactivate = async (request) => {
    try {
      const reviewer = getReviewerName();
      const res = await axios.patch(
        `${API}/api/atd/admin/absent-requests/${request._id}`,
        {
          status: "pending",
          reviewNote: `Reactivated to Pending review by ${reviewer}`,
          reviewedBy: reviewer
        },
        {
          headers: getAuthHeaders(),
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success(`Reactivated absent request for ${request.userName} on ${request.date}!`);
        fetchAbsentRequests();
      }
    } catch (err) {
      toast.error("Failed to reactivate request");
    }
  };

  // Add Holiday
  const handleAddHoliday = async (e) => {
    e.preventDefault();
    if (!newHoliday.date || !newHoliday.name) {
      toast.error("Date and Name are required");
      return;
    }

    setSubmittingHoliday(true);
    try {
      const res = await axios.post(`${API}/api/atd/admin/holidays`, newHoliday, {
        headers: getAuthHeaders(),
        withCredentials: true
      });
      if (res.data.success) {
        toast.success("Holiday added to calendar!");
        setIsAddHolidayOpen(false);
        setNewHoliday({ date: "", name: "", type: "national", description: "" });
        fetchHolidays();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add holiday");
    } finally {
      setSubmittingHoliday(false);
    }
  };

  // Delete Holiday
  const handleDeleteHoliday = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove holiday "${name}"?`)) return;
    try {
      const res = await axios.delete(`${API}/api/atd/admin/holidays/${id}`, {
        headers: getAuthHeaders(),
        withCredentials: true
      });
      if (res.data.success) {
        toast.success("Holiday removed");
        fetchHolidays();
      }
    } catch (err) {
      toast.error("Failed to delete holiday");
    }
  };

  // Filtered requests by search
  const filteredRequests = useMemo(() => {
    if (!searchQuery.trim()) return requests;
    const q = searchQuery.toLowerCase().trim();
    return requests.filter(
      (r) =>
        (r.userName && r.userName.toLowerCase().includes(q)) ||
        (r.userEmail && r.userEmail.toLowerCase().includes(q)) ||
        (r.reason && r.reason.toLowerCase().includes(q)) ||
        (r.date && r.date.includes(q))
    );
  }, [requests, searchQuery]);

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans lg:ml-[265px] xl:ml-[280px] mt-[70px] p-6 sm:p-8 text-slate-800">
      <Toaster position="top-center" reverseOrder={false} />

      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
            <CalendarX className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Absent & Leave Requests
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${isHR ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                {isHR ? "HR Portal Operations" : "Admin & HR Management"}
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1">
              Review employee absence reasons: <strong>Accept (Approve)</strong>, <strong>Reject</strong>, or <strong>Reactivate</strong> pending requests.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {isHR ? (
            <Link
              to="/hrdashboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 transition"
            >
              <span>Back to Attendance</span>
              <ChevronRight size={14} />
            </Link>
          ) : (
            <Link
              to="/attendcal"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 transition"
            >
              <span>Attendance Salary Calc</span>
              <ChevronRight size={14} />
            </Link>
          )}

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent font-bold text-slate-700 focus:outline-none cursor-pointer"
            />
          </div>

          <button
            onClick={() => {
              fetchAbsentRequests();
              fetchHolidays();
              toast.success("Synchronized!");
            }}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-indigo-600" : ""}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TABS (Absent Requests vs Holiday Calendar) */}
      {/* ========================================================= */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("requests")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "requests"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
        >
          <CalendarX size={15} />
          <span>Employee Leave Requests</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === "requests" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
            {stats.totalCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("holidays")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "holidays"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
        >
          <Calendar size={15} />
          <span>Holidays & Sundays Calendar</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === "holidays" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
            {holidays.length}
          </span>
        </button>
      </div>

      {activeTab === "requests" ? (
        <>
          {/* ========================================================= */}
          {/* KPI CARDS */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black text-amber-500 uppercase tracking-wider">Pending Review</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{stats.totalPending}</h3>
                <span className="text-[10px] text-slate-400 font-semibold mt-1">Requires validation</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black text-emerald-600 uppercase tracking-wider">Approved Leaves</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{stats.totalApproved}</h3>
                <span className="text-[10px] text-emerald-600 font-semibold mt-1">Max 2 paid per user</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black text-rose-500 uppercase tracking-wider">Rejected Requests</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{stats.totalRejected}</h3>
                <span className="text-[10px] text-rose-500 font-semibold mt-1">Unexcused absence</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <XCircle className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Total Submissions</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{stats.totalCount}</h3>
                <span className="text-[10px] text-indigo-600 font-semibold mt-1">In {selectedMonth}</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SEARCH & STATUS FILTER BAR */}
          {/* ========================================================= */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by employee name, email, or reason keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Filter:</span>
              {["all", "pending", "approved", "rejected"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition ${statusFilter === s
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* REQUESTS TABLE */}
          {/* ========================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-800">Submitted Leave Requests</h3>
                <p className="text-xs text-slate-400">Review reasons to approve or reject employee absences</p>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                Showing {filteredRequests.length} request(s)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-black uppercase tracking-wider text-slate-500">
                    <th className="py-4 px-5">Employee</th>
                    <th className="py-4 px-5">Absent Date</th>
                    <th className="py-4 px-5">Reason / Message</th>
                    <th className="py-4 px-5">Submitted On</th>
                    <th className="py-4 px-5">Status</th>
                    <th className="py-4 px-5">Admin Notes</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-slate-400">
                        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                        <span>Loading absent requests...</span>
                      </td>
                    </tr>
                  ) : filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-slate-400">
                        <CalendarX size={36} className="mx-auto opacity-20 mb-2" />
                        <span className="font-bold">No absent requests found for this filter.</span>
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((r) => {
                      const reqDate = new Date(r.date);
                      const isSunday = reqDate.getDay() === 0;

                      return (
                        <tr key={r._id} className="hover:bg-slate-50/70 transition">
                          <td className="py-4 px-5">
                            <div className="font-black text-slate-900">{r.userName}</div>
                            <div className="text-[11px] text-slate-400">{r.userEmail}</div>
                          </td>

                          <td className="py-4 px-5 font-bold text-slate-800">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={13} className="text-indigo-600" />
                              <span>{r.date}</span>
                              <span className="text-[10px] text-slate-400 font-normal">
                                ({reqDate.toLocaleDateString("en-US", { weekday: "short" })})
                              </span>
                            </div>
                            {isSunday && (
                              <span className="text-[10px] font-bold text-amber-600 block mt-0.5">
                                Weekly Sunday Off
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-5 max-w-[320px]">
                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 text-[11px] leading-relaxed">
                              "{r.reason}"
                            </div>
                          </td>

                          <td className="py-4 px-5 text-slate-400">
                            {new Date(r.createdAt).toLocaleDateString()}
                          </td>

                          <td className="py-4 px-5">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${r.status === "approved"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                  : r.status === "rejected"
                                    ? "bg-rose-100 text-rose-800 border border-rose-200"
                                    : "bg-amber-100 text-amber-800 border border-amber-200"
                                }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${r.status === "approved"
                                    ? "bg-emerald-600"
                                    : r.status === "rejected"
                                      ? "bg-rose-600"
                                      : "bg-amber-600"
                                  }`}
                              />
                              {r.status === "approved"
                                ? "Approved (Valid Leave)"
                                : r.status === "rejected"
                                  ? "Rejected"
                                  : "Pending Review"}
                            </span>
                          </td>

                          <td className="py-4 px-5 text-slate-500">
                            {r.reviewNote ? (
                              <span className="italic text-slate-700">"{r.reviewNote}"</span>
                            ) : r.reviewedBy ? (
                              <span className="text-[11px] text-slate-400">Reviewed by {r.reviewedBy}</span>
                            ) : (
                              <span className="text-[11px] text-slate-400 italic">No notes</span>
                            )}
                          </td>

                          <td className="py-4 px-5 text-right">
                            {r.status === "pending" ? (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleQuickApprove(r)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg shadow-sm transition"
                                  title="Accept & Approve leave"
                                >
                                  <Check size={13} />
                                  <span>Accept</span>
                                </button>

                                <button
                                  onClick={() => handleOpenReview(r, "rejected")}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold rounded-lg border border-rose-200 transition"
                                  title="Reject with note"
                                >
                                  <X size={13} />
                                  <span>Reject</span>
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleOpenReview(r, r.status === "approved" ? "rejected" : "approved")}
                                  className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 underline"
                                >
                                  Change to {r.status === "approved" ? "Reject" : "Accept"}
                                </button>

                                <button
                                  onClick={() => handleQuickReactivate(r)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 text-[11px] font-bold rounded-lg border border-amber-200 transition"
                                  title="Reactivate to Pending for review"
                                >
                                  <RefreshCw size={12} />
                                  <span>Reactivate</span>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* ========================================================= */
        /* HOLIDAYS CALENDAR TAB */
        /* ========================================================= */
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-black text-slate-800">National & Recognized Holidays</h3>
              <p className="text-xs text-slate-400">
                Sundays and these holidays are excluded from total working days and incur ₹0 deduction.
              </p>
            </div>

            <button
              onClick={() => setIsAddHolidayOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-md transition"
            >
              <Plus size={15} />
              <span>Add Custom Holiday</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3">
            <ShieldCheck size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-950 font-medium leading-relaxed">
              <strong>Calendar Rules:</strong>
              <ul className="list-disc ml-4 mt-1 space-y-0.5">
                <li>Every <strong>Sunday</strong> is automatically considered a weekly non-working holiday.</li>
                <li>All days registered in this holiday calendar are automatically treated as holidays.</li>
                <li>Employees are <strong>NOT deducted</strong> for absence on Sundays or recognized holidays.</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {holidays.map((h) => (
              <div
                key={h._id || h.date}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-sm transition flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                    {h.type}
                  </span>
                  <h4 className="font-black text-slate-900 text-sm mt-2">{h.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold mt-1">
                    <Calendar size={13} className="text-slate-400" />
                    <span>{h.date}</span>
                    <span className="text-[10px] text-slate-400">
                      ({new Date(h.date).toLocaleDateString("en-US", { weekday: "short" })})
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteHoliday(h._id, h.name)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Remove holiday"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: REVIEW NOTE (REJECT / APPROVE WITH NOTE) */}
      {/* ========================================================= */}
      {reviewModalData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-800">
                Confirm {reviewModalData.targetStatus === "approved" ? "Approval" : "Rejection"}
              </h3>
              <button
                onClick={() => setReviewModalData(null)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <p className="font-bold text-slate-800">{reviewModalData.request.userName}</p>
                <p className="text-slate-400">{reviewModalData.request.date}</p>
                <p className="mt-2 text-slate-600 italic">"{reviewModalData.request.reason}"</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  {isHR ? "HR Review Note (Optional)" : "Admin Review Note (Optional)"}
                </label>
                <textarea
                  rows={3}
                  value={adminReviewNote}
                  onChange={(e) => setAdminReviewNote(e.target.value)}
                  placeholder="e.g. Critical client meeting, approved medical leave, or personal emergency..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setReviewModalData(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReview}
                  disabled={submittingReview}
                  className={`px-5 py-2 text-white text-xs font-black rounded-xl shadow-md transition ${reviewModalData.targetStatus === "approved"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : reviewModalData.targetStatus === "pending"
                        ? "bg-amber-600 hover:bg-amber-700"
                        : "bg-rose-600 hover:bg-rose-700"
                    }`}
                >
                  {submittingReview
                    ? "Processing..."
                    : reviewModalData.targetStatus === "approved"
                      ? "Confirm Accept"
                      : reviewModalData.targetStatus === "pending"
                        ? "Confirm Reactivate"
                        : "Confirm Reject"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD HOLIDAY */}
      {/* ========================================================= */}
      {isAddHolidayOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-800">Add Recognized Holiday</h3>
              <button
                onClick={() => setIsAddHolidayOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddHoliday} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Holiday Date *
                </label>
                <input
                  type="date"
                  required
                  value={newHoliday.date}
                  onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Holiday Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Karnataka Rajyotsava, Company Annual Off..."
                  value={newHoliday.name}
                  onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Type
                </label>
                <select
                  value={newHoliday.type}
                  onChange={(e) => setNewHoliday({ ...newHoliday, type: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-bold focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="national">National Holiday</option>
                  <option value="company">Company Holiday</option>
                  <option value="optional">Optional Holiday</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddHolidayOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingHoliday || !newHoliday.date || !newHoliday.name}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-md transition disabled:opacity-50"
                >
                  {submittingHoliday ? "Adding..." : "Add Holiday"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAbsentRequests;
