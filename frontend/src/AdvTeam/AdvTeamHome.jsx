import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import {
  Users,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  RefreshCw,
  ArrowUpRight,
  UserPlus,
  Trophy,
  BarChart3,
  BookOpen,
  DollarSign,
  ChevronRight,
  Sparkles
} from "lucide-react";

// Currency Formatter
const formatINR = (val) => {
  const num = Number(val) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(num);
};

const AdvTeamHome = () => {
  const [advEnrollments, setAdvEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const advTeamName = localStorage.getItem("advTeamName") || "Sales Specialist";

  const fetchAdvEnrollments = async (showToast = false) => {
    try {
      if (showToast) setIsRefreshing(true);
      else setLoading(true);

      const response = await axios.get(`${API}/getadvenrolls`);
      const enrollments = response.data.data || response.data || [];

      // Filter by counselor (case-insensitive fallback)
      const filtered = enrollments.filter(
        (item) =>
          item.counselor &&
          (item.counselor === advTeamName ||
            item.counselor.trim().toLowerCase() === advTeamName.trim().toLowerCase())
      );

      // Sort newest first
      filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

      setAdvEnrollments(filtered);
      if (showToast) {
        toast.success("Dashboard data synchronized!");
      }
    } catch (error) {
      console.error("Error fetching advance enrollments:", error);
      toast.error("Failed to load enrollment data");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAdvEnrollments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculated Metrics
  const totalRevenue = useMemo(
    () => advEnrollments.reduce((acc, s) => acc + (Number(s.programPrice) || 0), 0),
    [advEnrollments]
  );

  const bookedRevenue = useMemo(
    () => advEnrollments.reduce((acc, s) => acc + (Number(s.paidAmount) || 0), 0),
    [advEnrollments]
  );

  const creditedRevenue = useMemo(() => {
    return advEnrollments.reduce((acc, student) => {
      const lastRemark =
        Array.isArray(student.remark) && student.remark.length > 0
          ? student.remark[student.remark.length - 1]
          : null;
      if (student.status === "fullPaid" || lastRemark === "Half_Cleared") {
        return acc + (Number(student.paidAmount) || 0);
      }
      return acc;
    }, 0);
  }, [advEnrollments]);

  const pendingRevenue = Math.max(0, totalRevenue - creditedRevenue);
  const totalBooked = advEnrollments.filter((s) => s.status === "booked").length;
  const totalFullPaid = advEnrollments.filter((s) => s.status === "fullPaid").length;
  const totalDefault = advEnrollments.filter((s) => s.status === "default").length;
  const totalEnrollments = advEnrollments.length;

  const collectionRate =
    totalRevenue > 0 ? Math.round((creditedRevenue / totalRevenue) * 100) : 0;

  // Filtered recent enrollments for the table
  const filteredEnrollments = useMemo(() => {
    return advEnrollments.filter((item) => {
      const matchesStatus =
        statusFilter === "all" ? true : item.status === statusFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (item.fullname || "").toLowerCase().includes(q) ||
        (item.phone || "").toLowerCase().includes(q) ||
        (item.email || "").toLowerCase().includes(q) ||
        (item.program || "").toLowerCase().includes(q) ||
        (item.domain || "").toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [advEnrollments, statusFilter, searchQuery]);

  // Current formatted date
  const todayFormatted = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return (
    <div className="bg-[#070A12] min-h-screen font-sans ml-[280px] mt-[70px] p-4 sm:p-8 text-slate-100 relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-emerald-600/5 blur-[130px] pointer-events-none"></div>
      <div className="absolute top-80 right-10 w-[450px] h-[450px] bg-indigo-500/10 blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1500px] mx-auto space-y-8 relative z-10">

        {/* ========================================================= */}
        {/* EXECUTIVE HEADER & ACTIONS */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 bg-[#0D1322] border border-slate-800/80 rounded-3xl shadow-xl">
          {/* Counselor Profile Details */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-[2px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full rounded-[14px] bg-[#0F172A] flex items-center justify-center text-white font-black text-xl">
                {advTeamName ? advTeamName.charAt(0).toUpperCase() : "A"}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-black text-white tracking-tight">
                  Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">{advTeamName}</span>
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-wider hidden sm:inline-block">
                  Advance Specialist
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-1">
                Real-time performance summary • Sales pipeline & enrollment overview
              </p>
            </div>
          </div>

          {/* Quick Actions & Date */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{todayFormatted}</span>
            </div>

            <button
              onClick={() => fetchAdvEnrollments(true)}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-slate-800 shadow-sm transition-all disabled:opacity-50"
              title="Synchronize Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isRefreshing ? "animate-spin text-blue-400" : ""}`} />
              <span>Sync</span>
            </button>

            <Link
              to="/advteam/adduser"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Enroll Student</span>
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4 PRIMARY EXECUTIVE KPI METRIC CARDS */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* Card 1: Total Enrollments */}
          <div className="bg-[#0D1322] border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700/80 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Total Enrollments
              </span>
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                {loading ? "..." : totalEnrollments}
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                <span className="text-emerald-400 font-bold">{totalFullPaid}</span> fully cleared candidate{totalFullPaid !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Card 2: Gross Program Value */}
          <div className="bg-[#0D1322] border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700/80 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Gross Program Value
              </span>
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono tracking-tight">
                {loading ? "..." : formatINR(totalRevenue)}
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                Total portfolio program pricing
              </p>
            </div>
          </div>

          {/* Card 3: Credited / Collected Revenue */}
          <div className="bg-[#0D1322] border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700/80 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Collected Revenue
              </span>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">
                {loading ? "..." : formatINR(creditedRevenue)}
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">
                  {collectionRate}% Cleared
                </span>
                <span>realized payments</span>
              </p>
            </div>
          </div>

          {/* Card 4: Pending Balance */}
          <div className="bg-[#0D1322] border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700/80 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Pending Balance
              </span>
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono tracking-tight">
                {loading ? "..." : formatINR(pendingRevenue)}
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                Awaiting clearance or installments
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PIPELINE BREAKDOWN & DIRECT NAVIGATION PORTALS */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Pipeline Distribution (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0D1322] border border-slate-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-indigo-400" />
                    Enrollment Status Distribution
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Breakdown of student accounts by payment milestone
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {totalEnrollments} Total
                </span>
              </div>

              {/* Visual Progress Bar */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>Collection Progress</span>
                  <span className="font-mono text-emerald-400 font-bold">{collectionRate}% Realized</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800 flex">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 transition-all duration-500"
                    style={{ width: `${Math.min(collectionRate, 100)}%` }}
                    title={`Collected: ${collectionRate}%`}
                  ></div>
                  <div
                    className="bg-rose-500/50 h-2.5 transition-all duration-500"
                    style={{ width: `${Math.max(0, 100 - collectionRate)}%` }}
                    title={`Pending: ${100 - collectionRate}%`}
                  ></div>
                </div>
              </div>

              {/* 3 Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Booked Card */}
                <Link
                  to="/advteam/booked"
                  className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/10 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                      Booked
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">{totalBooked}</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    ₹{bookedRevenue.toLocaleString()} booked
                  </div>
                </Link>

                {/* Full Paid Card */}
                <Link
                  to="/advteam/fullpaid"
                  className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                      Full Paid
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">{totalFullPaid}</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    100% fees completed
                  </div>
                </Link>

                {/* Default Card */}
                <Link
                  to="/advteam/default"
                  className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 hover:border-rose-500/40 hover:bg-rose-500/10 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400">
                      Defaulted
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-rose-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">{totalDefault}</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Overdue / missed
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Portal Shortcuts (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0D1322] border border-slate-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Sales Workspace Portals
                </h3>
                <span className="text-[11px] text-slate-500 font-bold uppercase">Quick Access</span>
              </div>

              <div className="space-y-2.5">
                <Link
                  to="/advteam/leaderboard"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white group-hover:text-amber-300 transition-colors">
                        Sales Champions Leaderboard
                      </div>
                      <div className="text-[10px] text-slate-400">
                        View monthly Top 5 rankings & podium positions
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>

                <Link
                  to="/advteam/revenue"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white group-hover:text-emerald-300 transition-colors">
                        Revenue Sheet & Ledger
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Check your daily and monthly collection statements
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>

                <Link
                  to="/advteam/booked"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white group-hover:text-indigo-300 transition-colors">
                        Booked Accounts & Follow-ups
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Track students with pending remaining dues
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* RECENT ENROLLMENTS ROSTER TABLE */}
        {/* ========================================================= */}
        <div className="bg-[#0D1322] rounded-3xl border border-slate-800/80 shadow-xl overflow-hidden">
          {/* Header Controls */}
          <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2.5">
                <Users className="w-5 h-5 text-blue-400" />
                Recent Student Enrollments
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Latest student accounts assigned to your counseling portfolio
              </p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Status Tabs */}
              <div className="inline-flex p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
                {[
                  { key: "all", label: `All (${totalEnrollments})` },
                  { key: "booked", label: `Booked (${totalBooked})` },
                  { key: "fullPaid", label: `Full Paid (${totalFullPaid})` },
                  { key: "default", label: `Default (${totalDefault})` }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setStatusFilter(tab.key)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      statusFilter === tab.key
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[220px]">
                <input
                  type="text"
                  placeholder="Search student, phone, program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#131B2E] text-xs pl-9 pr-3.5 py-2 rounded-xl border border-slate-700/80 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Table Element */}
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap text-xs">
              <thead className="bg-[#0B0F19] border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold select-none">
                <tr>
                  <th className="px-6 py-4 w-12 text-center">#</th>
                  <th className="px-6 py-4">Student Details</th>
                  <th className="px-6 py-4">Program & Domain</th>
                  <th className="px-6 py-4 text-right">Program Fee</th>
                  <th className="px-6 py-4 text-right">Paid Amount</th>
                  <th className="px-6 py-4 text-right">Remaining</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Month Opted</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
                        <span className="text-xs font-semibold">Loading student enrollments...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredEnrollments.length > 0 ? (
                  filteredEnrollments.slice(0, 15).map((item, idx) => {
                    const isFullPaid = item.status === "fullPaid";
                    const isBooked = item.status === "booked";
                    const isDefault = item.status === "default";

                    return (
                      <tr key={item._id || idx} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 text-center font-mono text-slate-500">
                          {idx + 1}
                        </td>

                        {/* Student Name, Phone, Email */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#18233C] text-blue-300 flex items-center justify-center font-bold text-xs border border-slate-700">
                              {item.fullname ? item.fullname.charAt(0).toUpperCase() : "S"}
                            </div>
                            <div>
                              <div className="font-bold text-white capitalize text-sm">
                                {item.fullname || "N/A"}
                              </div>
                              <div className="text-[11px] text-slate-400 font-mono">
                                {item.phone || "No phone"} {item.email ? `• ${item.email}` : ""}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Program & Domain */}
                        <td className="px-6 py-4">
                          <div className="space-y-0.5">
                            <div className="font-semibold text-slate-200 truncate max-w-[220px]">
                              {item.program || "General Advance"}
                            </div>
                            {item.domain && (
                              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                                {item.domain}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Program Fee */}
                        <td className="px-6 py-4 text-right font-mono font-bold text-slate-200">
                          {formatINR(item.programPrice)}
                        </td>

                        {/* Paid Amount */}
                        <td className="px-6 py-4 text-right font-mono font-bold text-emerald-400">
                          {formatINR(item.paidAmount)}
                        </td>

                        {/* Remaining Amount */}
                        <td className="px-6 py-4 text-right font-mono font-bold text-amber-400">
                          {formatINR(item.remainingAmount)}
                        </td>

                        {/* Status Badge */}
                        <td className="px-6 py-4 text-center">
                          {isFullPaid ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <CheckCircle2 className="w-3 h-3" />
                              Full Paid
                            </span>
                          ) : isBooked ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              <Clock className="w-3 h-3" />
                              Booked
                            </span>
                          ) : isDefault ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
                              <AlertCircle className="w-3 h-3" />
                              Default
                            </span>
                          ) : (
                            <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                              {item.status || "Unknown"}
                            </span>
                          )}
                        </td>

                        {/* Month Opted */}
                        <td className="px-6 py-4 text-center">
                          <span className="text-[11px] font-semibold text-slate-400 bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-800">
                            {item.monthOpted || "N/A"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-slate-500">
                      No matching student enrollments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer info */}
          {filteredEnrollments.length > 15 && (
            <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 text-center text-xs text-slate-400">
              Showing latest 15 of {filteredEnrollments.length} enrolled students. Use search or status filters to narrow down.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdvTeamHome;
