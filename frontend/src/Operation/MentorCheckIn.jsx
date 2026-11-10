import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import API from "../API";
import {
  Video,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  ExternalLink,
  Eye,
  DollarSign,
  AlertCircle,
  Calendar,
  User,
  BookOpen,
  RefreshCw,
  PlusCircle,
  MessageSquare,
  ShieldCheck,
  Play,
  X,
  FileVideo,
  Sparkles,
  Users,
  Phone,
  Mail
} from "lucide-react";

const MentorCheckIn = ({ isAdv = false }) => {
  // Current Operation user info
  const operationId = isAdv
    ? localStorage.getItem("advOperationId")
    : localStorage.getItem("operationId") || localStorage.getItem("advOperationId");
  const operationName = isAdv
    ? localStorage.getItem("advOperationName")
    : localStorage.getItem("operationName") || localStorage.getItem("advOperationName") || "Operation Executive";

  // Data State
  const [checkins, setCheckins] = useState([]);
  const [todayMentors, setTodayMentors] = useState([]);
  const [stats, setStats] = useState({
    totalCheckIns: 0,
    todayCheckIns: 0,
    pendingCount: 0,
    verifiedCount: 0,
    rejectedCount: 0,
    paymentStats: { unpaid: 0, approved: 0, paid: 0, hold: 0, totalFeeApprovedOrPaid: 0 }
  });
  const [loading, setLoading] = useState(true);

  // Filters
  const [viewScope, setViewScope] = useState("my"); // 'my' = assigned to this OP, 'all' = all mentors
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDateFilter, setSelectedDateFilter] = useState("all"); // 'all', 'today', 'week', 'month'

  // Video Preview Modal State
  const [previewVideo, setPreviewVideo] = useState(null); // { title, driveLink, driveId, mentorName, sessionDate }

  // Verify / Reject Action Modal State
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    checkIn: null,
    targetStatus: "verified", // 'verified' or 'rejected'
    remarks: "",
    sessionFee: 0,
    paymentStatus: "approved"
  });

  // Manual Check-In Modal State
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [allMentorsList, setAllMentorsList] = useState([]);
  const [manualForm, setManualForm] = useState({
    mentorId: "",
    sessionTitle: "",
    sessionDate: new Date().toISOString().slice(0, 10),
    duration: "1 hour",
    driveLink: "",
    notes: "",
    sessionFee: 0
  });

  useEffect(() => {
    fetchCheckInData();
    fetchTodayMentorStatus();
    fetchMentorsList();
  }, [viewScope, statusFilter, paymentFilter, selectedDateFilter]);

  const fetchCheckInData = async () => {
    setLoading(true);
    try {
      const params = {};
      if (viewScope === "my" && operationId) {
        params.operationId = operationId;
      }
      if (statusFilter !== "all") params.status = statusFilter;
      if (paymentFilter !== "all") params.paymentStatus = paymentFilter;

      if (selectedDateFilter === "today") {
        const todayStr = new Date().toISOString().slice(0, 10);
        params.startDate = todayStr;
        params.endDate = todayStr;
      } else if (selectedDateFilter === "week") {
        const d = new Date();
        d.setDate(d.getDate() - 7);
        params.startDate = d.toISOString().slice(0, 10);
      } else if (selectedDateFilter === "month") {
        const d = new Date();
        d.setDate(1);
        params.startDate = d.toISOString().slice(0, 10);
      }

      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }

      const [resCheckins, resStats] = await Promise.all([
        axios.get(`${API}/api/mentor-checkin/all`, { params }),
        axios.get(`${API}/api/mentor-checkin/stats`, {
          params: viewScope === "my" && operationId ? { operationId } : {}
        })
      ]);

      setCheckins(resCheckins.data.checkins || []);
      if (resStats.data) {
        setStats(resStats.data);
      }
    } catch (error) {
      console.error("Error loading check-ins:", error);
      toast.error("Failed to load mentor check-ins");
    } finally {
      setLoading(false);
    }
  };

  const fetchTodayMentorStatus = async () => {
    try {
      const params = viewScope === "my" && operationId ? { operationId } : {};
      const res = await axios.get(`${API}/api/mentor-checkin/today-mentor-status`, { params });
      setTodayMentors(res.data || []);
    } catch (error) {
      console.error("Error loading today's mentor status:", error);
    }
  };

  const fetchMentorsList = async () => {
    try {
      const res = await axios.get(`${API}/api/mentor-checkin/mentors-with-ops`);
      setAllMentorsList(res.data || []);
    } catch (error) {
      console.error("Error loading mentors list:", error);
    }
  };

  // Open Verify Modal
  const openVerifyModal = (checkIn, targetStatus) => {
    setActionModal({
      isOpen: true,
      checkIn,
      targetStatus,
      remarks: checkIn.operationRemarks || "",
      sessionFee: checkIn.sessionFee || 0,
      paymentStatus: targetStatus === "verified" ? "approved" : "hold"
    });
  };

  // Submit Verify / Reject Action
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    if (!actionModal.checkIn) return;

    try {
      await axios.put(`${API}/api/mentor-checkin/verify/${actionModal.checkIn._id}`, {
        status: actionModal.targetStatus,
        paymentStatus: actionModal.paymentStatus,
        operationRemarks: actionModal.remarks,
        sessionFee: Number(actionModal.sessionFee) || 0,
        verifiedBy: operationName
      });

      toast.success(
        actionModal.targetStatus === "verified"
          ? "Session verified! Class confirmed taken & approved for payment."
          : "Session flagged / rejected with remarks."
      );
      setActionModal({ ...actionModal, isOpen: false });
      fetchCheckInData();
      fetchTodayMentorStatus();
    } catch (error) {
      console.error("Error submitting verification:", error);
      toast.error("Failed to update session verification");
    }
  };

  // Quick Payment status change
  const handleQuickPaymentChange = async (checkInId, newPaymentStatus) => {
    try {
      await axios.put(`${API}/api/mentor-checkin/payment-status/${checkInId}`, {
        paymentStatus: newPaymentStatus
      });
      toast.success(`Payment status set to ${newPaymentStatus}`);
      fetchCheckInData();
    } catch (error) {
      toast.error("Failed to update payment status");
    }
  };

  // Handle Manual Check-In Submit
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!manualForm.mentorId || !manualForm.sessionTitle || !manualForm.driveLink) {
      toast.error("Please fill in mentor, session title, and drive link");
      return;
    }

    try {
      const mentorObj = allMentorsList.find((m) => m._id === manualForm.mentorId);
      await axios.post(`${API}/api/mentor-checkin/create`, {
        mentorId: manualForm.mentorId,
        mentorName: mentorObj ? mentorObj.fullname : "",
        mentorEmail: mentorObj ? mentorObj.email : "",
        mentorPhone: mentorObj ? (mentorObj.mentorPhone || mentorObj.phone || mentorObj.whatsAppNumber || mentorObj.mobile || "") : "",
        courseId: mentorObj ? mentorObj.assignedCourseId : null,
        courseTitle: mentorObj ? mentorObj.courseTitle : "",
        assignedOperationId: operationId,
        assignedOperationName: operationName,
        sessionTitle: manualForm.sessionTitle,
        sessionDate: manualForm.sessionDate,
        duration: manualForm.duration,
        driveLink: manualForm.driveLink,
        notes: manualForm.notes,
        sessionFee: Number(manualForm.sessionFee) || (mentorObj ? mentorObj.perSessionRate : 0) || 0
      });

      toast.success("Mentor check-in logged successfully!");
      setIsManualModalOpen(false);
      setManualForm({
        mentorId: "",
        sessionTitle: "",
        sessionDate: new Date().toISOString().slice(0, 10),
        duration: "1 hour",
        driveLink: "",
        notes: "",
        sessionFee: 0
      });
      fetchCheckInData();
      fetchTodayMentorStatus();
    } catch (error) {
      console.error("Error saving manual checkin:", error);
      toast.error("Failed to log check-in");
    }
  };

  // Filter checkins on client if search is active
  const filteredCheckins = checkins.filter((c) => {
    if (!searchTerm.trim()) return true;
    const s = searchTerm.toLowerCase();
    return (
      c.mentorName?.toLowerCase().includes(s) ||
      c.mentorEmail?.toLowerCase().includes(s) ||
      c.sessionTitle?.toLowerCase().includes(s) ||
      c.courseTitle?.toLowerCase().includes(s) ||
      c.assignedOperationName?.toLowerCase().includes(s)
    );
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pt-24 pb-16 px-4 md:px-8 md:ml-[265px]">
      <Toaster position="top-right" />

      {/* Top Banner / Title */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700/60 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white rounded-2xl shadow-lg shadow-indigo-500/25">
              <Video size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Mentor Check-In & Recording Verification
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Operation Portal
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1">
                Preview uploaded class recordings, confirm classes conducted, and approve mentor session pay
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Scope Toggle: My Assigned vs All */}
            <div className="bg-slate-900/80 p-1 rounded-xl border border-slate-700 flex items-center">
              <button
                onClick={() => setViewScope("my")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${viewScope === "my"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                  }`}
              >
                My Assigned Mentors
              </button>
              <button
                onClick={() => setViewScope("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${viewScope === "all"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                  }`}
              >
                All Mentors
              </button>
            </div>

            <button
              onClick={() => setIsManualModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 border border-slate-600/60 text-xs font-bold transition-all hover:scale-105 active:scale-95"
            >
              <PlusCircle size={15} />
              Log Check-In
            </button>

            <button
              onClick={() => {
                fetchCheckInData();
                fetchTodayMentorStatus();
              }}
              className="p-2.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 border border-slate-600/60 transition-all hover:scale-105 active:scale-95"
              title="Refresh"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Total Check-Ins</span>
              <FileVideo size={18} className="text-blue-400" />
            </div>
            <h3 className="text-2xl font-black text-white">{stats.totalCheckIns}</h3>
            <p className="text-[11px] text-slate-400 mt-1">
              <strong className="text-blue-400">{stats.todayCheckIns}</strong> uploaded today
            </p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Verified (Class Taken)</span>
              <CheckCircle size={18} className="text-emerald-400" />
            </div>
            <h3 className="text-2xl font-black text-emerald-400">{stats.verifiedCount}</h3>
            <p className="text-[11px] text-slate-400 mt-1">Recordings approved</p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Pending Review</span>
              <Clock size={18} className="text-amber-400" />
            </div>
            <h3 className="text-2xl font-black text-amber-400">{stats.pendingCount}</h3>
            <p className="text-[11px] text-slate-400 mt-1">Requires OP check</p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Rejected / Flagged</span>
              <XCircle size={18} className="text-rose-400" />
            </div>
            <h3 className="text-2xl font-black text-rose-400">{stats.rejectedCount}</h3>
            <p className="text-[11px] text-slate-400 mt-1">Class not confirmed</p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Session Pay</span>
              <DollarSign size={18} className="text-purple-400" />
            </div>
            <h3 className="text-2xl font-black text-purple-400">
              ₹{stats.paymentStats?.totalFeeApprovedOrPaid?.toLocaleString() || 0}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              <strong className="text-purple-300">{stats.paymentStats?.approved || 0}</strong> sessions approved
            </p>
          </div>
        </div>

        {/* TODAY'S MENTOR CLASS RADAR: Who uploaded today's recording vs who hasn't! */}
        <div className="mt-6 bg-slate-800/70 rounded-2xl p-5 border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Today's Class Recording Status (Per Mentor)
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Date: <strong className="text-slate-200">{new Date().toDateString()}</strong>
            </span>
          </div>

          {todayMentors.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No mentors linked yet. Assign mentors via Admin.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {todayMentors.map((tm) => (
                <div
                  key={tm.mentorId}
                  className={`p-3 rounded-xl border transition-all ${tm.uploadedToday
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : "bg-slate-900/60 border-slate-700/70"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs truncate max-w-[150px]">
                      {tm.mentorName}
                    </span>
                    {tm.uploadedToday ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30">
                        ✓ Uploaded
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                        ⏳ Pending
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1.5">
                    <Mail size={12} className="text-slate-500 flex-shrink-0" />
                    <span className="truncate" title={tm.mentorEmail || tm.email}>
                      {tm.mentorEmail || tm.email || "No email"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                    <Phone size={12} className="text-indigo-400 flex-shrink-0" />
                    {tm.mentorPhone || tm.phone || tm.whatsAppNumber || tm.mobile ? (
                      <a
                        href={`tel:${tm.mentorPhone || tm.phone || tm.whatsAppNumber || tm.mobile}`}
                        className="truncate text-indigo-300 hover:text-indigo-200 hover:underline font-medium"
                      >
                        {tm.mentorPhone || tm.phone || tm.whatsAppNumber || tm.mobile}
                      </a>
                    ) : (
                      <span className="text-slate-500 italic">No phone number</span>
                    )}
                  </div>
                  {tm.todayCheckIn ? (
                    <div className="mt-2 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px]">
                      <span className="text-slate-300 truncate max-w-[140px]">
                        {tm.todayCheckIn.sessionTitle}
                      </span>
                      <button
                        onClick={() =>
                          setPreviewVideo({
                            title: tm.todayCheckIn.sessionTitle,
                            driveLink: tm.todayCheckIn.driveLink,
                            driveId: tm.todayCheckIn.driveId,
                            mentorName: tm.mentorName,
                            sessionDate: tm.todayCheckIn.sessionDate
                          })
                        }
                        className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-0.5"
                      >
                        <Play size={11} /> Watch
                      </button>
                    </div>
                  ) : (
                    <p className="text-[10px] text-slate-500 mt-2 italic">
                      Class recording not yet submitted
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by mentor name, session title, course, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Status: All</option>
              <option value="pending">⏳ Pending Review</option>
              <option value="verified">✅ Verified (Class Taken)</option>
              <option value="rejected">❌ Rejected / Flagged</option>
            </select>

            {/* Payment Filter */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Payment: All</option>
              <option value="unpaid">Unpaid</option>
              <option value="approved">Approved for Pay</option>
              <option value="paid">Paid</option>
              <option value="hold">On Hold</option>
            </select>

            {/* Date Range Filter */}
            <select
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
              className="px-3 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Date: All Time</option>
              <option value="today">Today's Sessions</option>
              <option value="week">Past 7 Days</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Check-Ins List */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800/60 rounded-2xl border border-slate-700/60 overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-indigo-500/20 border-t-indigo-500 mb-3"></div>
              <p className="text-slate-400 font-medium text-sm">Loading check-in recordings...</p>
            </div>
          ) : filteredCheckins.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <FileVideo size={48} className="mx-auto mb-3 text-slate-500/50" />
              <p className="text-lg font-bold text-slate-300">No session check-ins found</p>
              <p className="text-xs mt-1 text-slate-400">
                When mentors upload drive links, they will appear here for verification and pay approval.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700/50">
              {filteredCheckins.map((item) => {
                const sessionDate = new Date(item.sessionDate).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                });

                return (
                  <div
                    key={item._id}
                    className="p-5 md:p-6 hover:bg-slate-750/40 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    {/* Left: Mentor info & Session Details */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-bold text-white text-lg shadow-md flex-shrink-0 mt-0.5">
                        {item.mentorName ? item.mentorName.charAt(0).toUpperCase() : "M"}
                      </div>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-extrabold text-white text-base tracking-tight">
                            {item.sessionTitle}
                          </h3>
                          {/* Status Badge */}
                          {item.status === "verified" && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                              <CheckCircle size={12} /> Class Confirmed Taken
                            </span>
                          )}
                          {item.status === "pending" && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                              <Clock size={12} /> Pending Operation Check
                            </span>
                          )}
                          {item.status === "rejected" && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                              <XCircle size={12} /> Class Flagged / Not Taken
                            </span>
                          )}
                        </div>

                        {/* Mentor Name & Course */}
                        <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap">
                          <span className="font-semibold text-slate-200 flex items-center gap-1">
                            <User size={13} className="text-indigo-400" />
                            {item.mentorName} ({item.mentorEmail})
                          </span>
                          {(item.mentorPhone || item.phone) && (
                            <span className="text-slate-400 flex items-center gap-1">
                              <Phone size={12} className="text-indigo-400" />
                              <a
                                href={`tel:${item.mentorPhone || item.phone}`}
                                className="text-indigo-300 hover:underline"
                              >
                                {item.mentorPhone || item.phone}
                              </a>
                            </span>
                          )}
                          {item.courseTitle && (
                            <span className="inline-flex items-center gap-1 text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                              <BookOpen size={12} className="text-blue-400" />
                              {item.courseTitle}
                            </span>
                          )}
                          <span className="text-slate-400 flex items-center gap-1">
                            <Calendar size={12} className="text-slate-500" />
                            {sessionDate}
                          </span>
                          {item.duration && (
                            <span className="text-slate-400">Duration: {item.duration}</span>
                          )}
                        </div>

                        {/* Notes if available */}
                        {item.notes && (
                          <p className="text-xs text-slate-400 bg-slate-900/50 p-2 rounded-lg border border-slate-800">
                            <strong>Mentor Notes:</strong> {item.notes}
                          </p>
                        )}

                        {/* Operation Remarks */}
                        {item.operationRemarks && (
                          <p className="text-xs text-indigo-300 bg-indigo-950/30 p-2 rounded-lg border border-indigo-900/40">
                            <strong>Operation Remarks ({item.verifiedBy || "Executive"}):</strong>{" "}
                            {item.operationRemarks}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Middle: Video Link & Preview Action */}
                    <div className="flex items-center gap-3">
                      {item.driveId ? (
                        <button
                          onClick={() =>
                            setPreviewVideo({
                              title: item.sessionTitle,
                              driveLink: item.driveLink,
                              driveId: item.driveId,
                              mentorName: item.mentorName,
                              sessionDate: item.sessionDate
                            })
                          }
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95"
                        >
                          <Play size={14} /> Preview Video
                        </button>
                      ) : (
                        <a
                          href={item.driveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs transition-all"
                        >
                          <ExternalLink size={14} /> Open Drive Link
                        </a>
                      )}

                      <a
                        href={item.driveLink}
                        target="_blank"
                        rel="noreferrer"
                        title="Open full Drive page in new tab"
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
                      >
                        <ExternalLink size={15} />
                      </a>
                    </div>

                    {/* Right: Payment status & Action Buttons */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-3 min-w-[190px]">
                      {/* Payment Badge & Rate */}
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-slate-400">Pay Status:</span>
                          <select
                            value={item.paymentStatus || "unpaid"}
                            onChange={(e) => handleQuickPaymentChange(item._id, e.target.value)}
                            className={`text-xs font-bold rounded-lg px-2.5 py-1 border focus:outline-none cursor-pointer ${item.paymentStatus === "approved"
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                : item.paymentStatus === "paid"
                                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                  : item.paymentStatus === "hold"
                                    ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                                    : "bg-slate-700 text-slate-300 border-slate-600"
                              }`}
                          >
                            <option value="unpaid">Unpaid</option>
                            <option value="approved">Approved</option>
                            <option value="paid">Paid</option>
                            <option value="hold">On Hold</option>
                          </select>
                        </div>
                        {item.sessionFee > 0 && (
                          <p className="text-xs font-bold text-slate-300 mt-1">
                            Fee: <span className="text-emerald-400">₹{item.sessionFee.toLocaleString()}</span>
                          </p>
                        )}
                      </div>

                      {/* Verification Buttons */}
                      <div className="flex items-center gap-2">
                        {item.status !== "verified" ? (
                          <button
                            onClick={() => openVerifyModal(item, "verified")}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all hover:scale-105 active:scale-95"
                          >
                            <CheckCircle size={13} /> Confirm Class
                          </button>
                        ) : (
                          <button
                            onClick={() => openVerifyModal(item, "verified")}
                            className="text-xs text-slate-400 hover:text-slate-200 underline font-medium"
                          >
                            Edit Review
                          </button>
                        )}

                        {item.status !== "rejected" && (
                          <button
                            onClick={() => openVerifyModal(item, "rejected")}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 font-bold text-xs transition-all"
                          >
                            <XCircle size={13} /> Reject
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* VIDEO PREVIEW MODAL */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Play size={16} className="text-indigo-400" />
                  {previewVideo.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mentor: <strong className="text-slate-300">{previewVideo.mentorName}</strong> |{" "}
                  {new Date(previewVideo.sessionDate).toDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewVideo.driveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink size={13} /> Open in Drive
                </a>
                <button
                  onClick={() => setPreviewVideo(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-4 flex-1 bg-black flex items-center justify-center">
              {previewVideo.driveId ? (
                <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={`https://drive.google.com/file/d/${previewVideo.driveId}/preview`}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="autoplay"
                    title={previewVideo.title}
                  ></iframe>
                </div>
              ) : (
                <div className="text-center py-16 text-slate-400">
                  <AlertCircle size={40} className="mx-auto mb-2 text-amber-400" />
                  <p className="font-semibold text-slate-200">Could not extract direct preview iframe</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Please click "Open in Drive" above to watch the recording in a new window.
                  </p>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-800 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
              <span>Ensure the mentor shared the link with proper access permissions</span>
              <button
                onClick={() => setPreviewVideo(null)}
                className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VERIFY / REJECT ACTION MODAL */}
      {actionModal.isOpen && actionModal.checkIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl ${actionModal.targetStatus === "verified"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                >
                  {actionModal.targetStatus === "verified" ? (
                    <CheckCircle size={22} />
                  ) : (
                    <XCircle size={22} />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {actionModal.targetStatus === "verified"
                      ? "Confirm Class Conducted & Verify"
                      : "Reject / Flag Class Session"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {actionModal.checkIn.mentorName} - {actionModal.checkIn.sessionTitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActionModal({ ...actionModal, isOpen: false })}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleVerifySubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Verification Status
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setActionModal({
                        ...actionModal,
                        targetStatus: "verified",
                        paymentStatus: "approved"
                      })
                    }
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${actionModal.targetStatus === "verified"
                        ? "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30"
                        : "bg-slate-900/60 text-slate-400 border-slate-700 hover:text-slate-200"
                      }`}
                  >
                    ✓ Class Taken (Verify)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActionModal({
                        ...actionModal,
                        targetStatus: "rejected",
                        paymentStatus: "hold"
                      })
                    }
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${actionModal.targetStatus === "rejected"
                        ? "bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30"
                        : "bg-slate-900/60 text-slate-400 border-slate-700 hover:text-slate-200"
                      }`}
                  >
                    ✕ Class Not Taken / Flag
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Session Pay Approval Status
                </label>
                <select
                  value={actionModal.paymentStatus}
                  onChange={(e) =>
                    setActionModal({ ...actionModal, paymentStatus: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="approved">Approved for Payment</option>
                  <option value="paid">Paid</option>
                  <option value="hold">On Hold</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Per-Session Fee (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={actionModal.sessionFee}
                    onChange={(e) =>
                      setActionModal({ ...actionModal, sessionFee: e.target.value })
                    }
                    placeholder="e.g. 1500"
                    className="w-full pl-8 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Operation Review Remarks / Notes
                </label>
                <textarea
                  rows={3}
                  value={actionModal.remarks}
                  onChange={(e) =>
                    setActionModal({ ...actionModal, remarks: e.target.value })
                  }
                  placeholder={
                    actionModal.targetStatus === "verified"
                      ? "e.g. Recording verified, class conducted for 1 hr 15 mins."
                      : "e.g. Google Drive link has access restricted / invalid recording."
                  }
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setActionModal({ ...actionModal, isOpen: false })}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-xl text-white font-bold text-xs shadow-lg transition-all hover:scale-105 active:scale-95 ${actionModal.targetStatus === "verified"
                      ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30"
                      : "bg-rose-600 hover:bg-rose-500 shadow-rose-600/30"
                    }`}
                >
                  Save & Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANUAL CHECK-IN MODAL (Log recording on behalf of mentor) */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                  <PlusCircle size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Log Mentor Check-In</h3>
                  <p className="text-xs text-slate-400">Record a session link submitted by a mentor</p>
                </div>
              </div>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Select Mentor <span className="text-rose-400">*</span>
                </label>
                <select
                  required
                  value={manualForm.mentorId}
                  onChange={(e) => {
                    const chosen = allMentorsList.find((m) => m._id === e.target.value);
                    setManualForm({
                      ...manualForm,
                      mentorId: e.target.value,
                      sessionFee: chosen ? chosen.perSessionRate || 0 : 0
                    });
                  }}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="">-- Choose Mentor --</option>
                  {allMentorsList.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.fullname} ({m.email}) - {m.courseTitle || "No Course"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Session Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={manualForm.sessionTitle}
                  onChange={(e) => setManualForm({ ...manualForm, sessionTitle: e.target.value })}
                  placeholder="e.g. Advanced System Design Session 3"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Session Date
                  </label>
                  <input
                    type="date"
                    value={manualForm.sessionDate}
                    onChange={(e) => setManualForm({ ...manualForm, sessionDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={manualForm.duration}
                    onChange={(e) => setManualForm({ ...manualForm, duration: e.target.value })}
                    placeholder="e.g. 1 hr 30 mins"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Google Drive Recording Link <span className="text-rose-400">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={manualForm.driveLink}
                  onChange={(e) => setManualForm({ ...manualForm, driveLink: e.target.value })}
                  placeholder="https://drive.google.com/file/d/..../view"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Session Fee (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={manualForm.sessionFee}
                  onChange={(e) => setManualForm({ ...manualForm, sessionFee: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={manualForm.notes}
                  onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                  placeholder="Any details or summary of class"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all hover:scale-105 active:scale-95"
                >
                  Submit Check-In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorCheckIn;

