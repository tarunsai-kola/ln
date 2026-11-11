import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import API from "../API";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
} from "chart.js";
import {
  BookOpen,
  BadgeCheck,
  AlertOctagon,
  IndianRupee,
  Target,
  LineChart,
  TrendingUp,
  Users,
  Calendar,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  Wallet,
  ShieldCheck,
  Clock,
  ChevronRight,
  CheckCircle2,
  PieChart,
  GraduationCap
} from "lucide-react";

ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

const formatINR = (val) => {
  const num = Number(val) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(num);
};

const OperationDashboard = () => {
  const [operationData, setOperationData] = useState([]);
  const [operation, setOperation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState("6m"); // '6m' | 'all'

  const today = new Date();
  const currentMonthWithDate = today.toISOString().slice(0, 7);
  const operationName = localStorage.getItem("advOperationName") || "Operations Lead";

  const fetchOperationData = async (showToast = false) => {
    const operationId = localStorage.getItem("advOperationId");
    const opName = localStorage.getItem("advOperationName");
    if (showToast) setIsRefreshing(true);
    try {
      const response = await axios.get(`${API}/getadvenrolls?all=true`, {
        params: { operationId },
      });
      if (Array.isArray(response.data)) {
        setOperationData(
          response.data.filter((data) => data.operationName === opName)
        );
      }
    } catch (err) {
      console.error("Failed to fetch advance enrollments data", err);
    } finally {
      setLoading(false);
      if (showToast) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  };

  const fetchOperation = async () => {
    try {
      const response = await axios.get(`${API}/getadvoperation`);
      if (Array.isArray(response.data)) {
        setOperation(response.data.filter((item) => item.fullname === operationName));
      }
    } catch (error) {
      console.error("Error fetching adv operation:", error);
    }
  };

  useEffect(() => {
    fetchOperationData();
    fetchOperation();
  }, []);

  // Metrics Calculations
  const bookedCount = useMemo(() => operationData.filter((item) => item.status === "booked").length, [operationData]);
  const fullPaidCount = useMemo(() => operationData.filter((item) => item.status === "fullPaid").length, [operationData]);
  const defaultCount = useMemo(() => operationData.filter((item) => item.status === "default").length, [operationData]);
  const totalStudents = operationData.length;

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const currentMonthData = useMemo(() => {
    return operationData.filter((student) => {
      const createdAt = new Date(student.createdAt);
      return createdAt.getMonth() === currentMonth && createdAt.getFullYear() === currentYear;
    });
  }, [operationData, currentMonth, currentYear]);

  const totalRevenue = useMemo(() => {
    return currentMonthData.reduce((acc, student) => acc + (student.programPrice || 0), 0);
  }, [currentMonthData]);

  const creditedRevenue = useMemo(() => {
    return currentMonthData.reduce((acc, student) => {
      const lastRemark = Array.isArray(student.remark) && student.remark.length > 0
        ? student.remark[student.remark.length - 1]
        : null;

      if (student.status === "fullPaid" || lastRemark === "Half_Cleared") {
        return acc + (student.paidAmount || 0);
      }
      return acc;
    }, 0);
  }, [currentMonthData]);

  const pendingRevenue = Math.max(0, totalRevenue - creditedRevenue);
  const collectionRate = totalRevenue > 0 ? Math.round((creditedRevenue / totalRevenue) * 100) : 0;
  const fullPaidRatio = totalStudents > 0 ? Math.round((fullPaidCount / totalStudents) * 100) : 0;

  // Chart Data Processing
  const revenueByMonth = useMemo(() => {
    return operationData.reduce((acc, student) => {
      const month = new Date(student.createdAt).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      if (!acc[month]) {
        acc[month] = { totalRevenue: 0 };
      }
      if (student.status === "booked" || student.status === "default") {
        acc[month].totalRevenue += student.paidAmount || 0;
      } else if (student.status === "fullPaid") {
        acc[month].totalRevenue += student.programPrice || 0;
      }
      return acc;
    }, {});
  }, [operationData]);

  const sortedMonths = useMemo(() => {
    return Object.keys(revenueByMonth).sort((a, b) => new Date(`1 ${a}`) - new Date(`1 ${b}`));
  }, [revenueByMonth]);

  const filteredMonths = timeRange === "6m" ? sortedMonths.slice(-6) : sortedMonths;

  const revenueData = filteredMonths.map((month) => ({
    month,
    revenue: revenueByMonth[month]?.totalRevenue || 0,
  }));

  const lineChartData = {
    labels: revenueData.map((data) => data.month),
    datasets: [
      {
        label: "Revenue Realized",
        data: revenueData.map((data) => data.revenue),
        borderColor: "#10B981", // Emerald 500
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(16, 185, 129, 0.28)");
          gradient.addColorStop(0.8, "rgba(16, 185, 129, 0.02)");
          gradient.addColorStop(1, "rgba(16, 185, 129, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.42,
        borderWidth: 3,
        pointBackgroundColor: "#059669",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: "#059669",
        pointHoverBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        titleColor: "#94A3B8",
        bodyColor: "#F8FAFC",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        titleFont: { size: 12, weight: 600, family: "'Inter', sans-serif" },
        bodyFont: { size: 14, weight: 700, family: "'Inter', sans-serif" },
        displayColors: false,
        callbacks: {
          label: (context) => `Revenue: ${formatINR(context.parsed.y)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#64748B",
          font: { family: "'Inter', sans-serif", size: 12, weight: 500 },
        },
      },
      y: {
        grid: {
          color: "rgba(226, 232, 240, 0.7)",
          drawBorder: false,
        },
        border: { display: false, dash: [4, 4] },
        ticks: {
          color: "#64748B",
          font: { family: "'Inter', sans-serif", size: 12 },
          callback: (value) => (value >= 1000 ? `₹${(value / 1000).toFixed(0)}k` : `₹${value}`),
        },
      },
    },
  };

  // Recent Enrollments (latest 6)
  const recentEnrollments = useMemo(() => {
    return [...operationData]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);
  }, [operationData]);

  // Target Information
  const currentTargetObj = useMemo(() => {
    if (!operation || operation.length === 0) return null;
    const op = operation[0];
    if (!op?.target || !Array.isArray(op.target) || op.target.length === 0) return null;
    return op.target.find((t) => t.currentMonth === currentMonthWithDate) || op.target[op.target.length - 1];
  }, [operation, currentMonthWithDate]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans ml-[260px] mt-[70px] p-6 lg:p-8">
      {/* ── Executive Header Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D] text-white p-7 md:p-9 shadow-xl shadow-slate-900/10 mb-8 border border-slate-800">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            {/* Pill Header */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                ADV Operations Hub
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1.5 font-medium">
                <Calendar size={13} className="text-slate-500" />
                {today.toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Title & Greeting */}
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
                Executive Operations Console
                <Sparkles size={22} className="text-emerald-400 hidden sm:inline" />
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl font-normal leading-relaxed">
                Welcome back, <span className="text-white font-semibold">{operationName}</span>. Real-time overview of advance student enrollments, collection pipelines, and monthly targets.
              </p>
            </div>
          </div>

          {/* Quick Actions & Refresh */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
            <button
              onClick={() => fetchOperationData(true)}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Refresh dashboard data"
            >
              <RefreshCw size={14} className={isRefreshing ? "animate-spin text-emerald-400" : "text-slate-400"} />
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </button>

            <Link
              to="/AdvBookedPayment"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:-translate-y-0.5 active:scale-95"
            >
              <span>Manage Pipeline</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Quick Nav Badges inside hero */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7 pt-6 border-t border-slate-800/80 text-xs">
          <Link
            to="/AdvBookedPayment"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-slate-300 group"
          >
            <span className="flex items-center gap-2">
              <BookOpen size={14} className="text-amber-400" /> Booked Records
            </span>
            <ChevronRight size={13} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            to="/AdvFullPayment"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-slate-300 group"
          >
            <span className="flex items-center gap-2">
              <BadgeCheck size={14} className="text-emerald-400" /> Full Paid Roster
            </span>
            <ChevronRight size={13} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            to="/AdvOperationRevenueSheet"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-slate-300 group"
          >
            <span className="flex items-center gap-2">
              <TrendingUp size={14} className="text-teal-400" /> Revenue Sheets
            </span>
            <ChevronRight size={13} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            to="/AdvMentorCheckIn"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-slate-300 group"
          >
            <span className="flex items-center gap-2">
              <Users size={14} className="text-indigo-400" /> Mentor Sessions
            </span>
            <ChevronRight size={13} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── 4 KPI Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Total Portfolio Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Portfolio</span>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-slate-800">{totalStudents}</h3>
            <span className="text-xs font-semibold text-slate-400">Total Enrolled</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Portfolio Volume</span>
            <span className="font-bold text-slate-700">{totalStudents} Students</span>
          </div>
        </div>

        {/* Full Paid Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-0"></div>
          <div className="flex items-center justify-between mb-3 relative z-10">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Fully Paid</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BadgeCheck size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 relative z-10">
            <h3 className="text-3xl font-black text-slate-800">{fullPaidCount}</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {fullPaidRatio}% of total
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 relative z-10">
            <span>Cleared Enrollments</span>
            <span className="font-bold text-emerald-600">100% Collected</span>
          </div>
        </div>

        {/* Booked Pipeline Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-0"></div>
          <div className="flex items-center justify-between mb-3 relative z-10">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Booked Pipeline</span>
            <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 relative z-10">
            <h3 className="text-3xl font-black text-slate-800">{bookedCount}</h3>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              Partially Paid
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 relative z-10">
            <span>Pending Clearance</span>
            <span className="font-bold text-amber-600">Active Follow-up</span>
          </div>
        </div>

        {/* Defaulted / At Risk Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -z-0"></div>
          <div className="flex items-center justify-between mb-3 relative z-10">
            <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Defaulted</span>
            <div className="w-10 h-10 rounded-xl bg-rose-100/70 text-rose-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertOctagon size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 relative z-10">
            <h3 className="text-3xl font-black text-slate-800">{defaultCount}</h3>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              Attention
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 relative z-10">
            <span>Dropped / Default</span>
            <span className="font-bold text-slate-600">Recovery Roster</span>
          </div>
        </div>
      </div>

      {/* ── Middle Section: Financial Intelligence & Revenue Analytics ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 mb-8">
        {/* Left Column (5 Cols) - Financial Summary & Target Tracker */}
        <div className="lg:col-span-5 space-y-6">
          {/* Revenue Performance Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <IndianRupee size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">Financial Performance</h2>
                  <p className="text-xs text-slate-400 font-medium">This Month ({today.toLocaleString("default", { month: "short", year: "numeric" })})</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-black">
                {collectionRate}% Realized
              </span>
            </div>

            {/* Visual Realization Progress Bar */}
            <div className="mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="text-slate-600">Collection Efficiency</span>
                <span className="text-emerald-600">{collectionRate}% of Total</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500"
                  style={{ width: `${Math.min(100, collectionRate)}%` }}
                ></div>
                <div
                  className="bg-amber-400 h-full transition-all duration-500"
                  style={{ width: `${Math.max(0, 100 - collectionRate)}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2">
                <span className="flex items-center gap-1 font-semibold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Credited: {formatINR(creditedRevenue)}
                </span>
                <span className="flex items-center gap-1 font-semibold text-amber-500">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span> Pending: {formatINR(pendingRevenue)}
                </span>
              </div>
            </div>

            {/* Revenue Rows */}
            <div className="space-y-3.5 text-sm">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                <span className="font-semibold text-slate-600 flex items-center gap-2">
                  <Wallet size={16} className="text-slate-400" /> Total Booked Value
                </span>
                <span className="font-black text-slate-800 text-base">{formatINR(totalRevenue)}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/60">
                <span className="font-semibold text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" /> Realized Revenue
                </span>
                <span className="font-black text-emerald-600 text-base">{formatINR(creditedRevenue)}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 border border-amber-100/60">
                <span className="font-semibold text-amber-800 flex items-center gap-2">
                  <Clock size={16} className="text-amber-500" /> Pending Receivables
                </span>
                <span className="font-black text-amber-500 text-base">{formatINR(pendingRevenue)}</span>
              </div>
            </div>
          </div>

          {/* Target Card with Visual Meter */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white border border-slate-700 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 opacity-5 pointer-events-none">
              <Target size={160} />
            </div>

            <div className="relative z-10 flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <Target size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Monthly Target Tracker</h3>
                  <p className="text-xs text-slate-400 font-normal">Assigned Goal for {currentMonthWithDate}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck size={12} /> Active
              </span>
            </div>

            <div className="relative z-10 bg-slate-950/60 rounded-2xl p-5 border border-slate-800/80">
              {currentTargetObj ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Target Objective</p>
                      <h4 className="text-2xl font-black text-white mt-0.5">
                        {currentTargetObj.percentage || "N/A"}
                      </h4>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <TrendingUp size={24} />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Current Realized:</span>
                    <span className="font-bold text-emerald-400">{formatINR(creditedRevenue)}</span>
                  </div>
                </div>
              ) : (
                <div className="py-4 text-center">
                  <Target size={28} className="mx-auto text-slate-600 mb-2" />
                  <p className="text-xs text-slate-400 font-medium">No target allocated for this month yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols) - Revenue Growth Chart */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex-1 flex flex-col justify-between">
            {/* Chart Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <LineChart size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">Revenue Growth Trend</h2>
                  <p className="text-xs text-slate-400 font-medium">Historical revenue trajectory across months</p>
                </div>
              </div>

              {/* Time Range Pills */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600 self-start sm:self-auto">
                <button
                  onClick={() => setTimeRange("6m")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    timeRange === "6m" ? "bg-white text-emerald-600 shadow-sm font-extrabold" : "hover:text-slate-900"
                  }`}
                >
                  Last 6 Months
                </button>
                <button
                  onClick={() => setTimeRange("all")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    timeRange === "all" ? "bg-white text-emerald-600 shadow-sm font-extrabold" : "hover:text-slate-900"
                  }`}
                >
                  All History
                </button>
              </div>
            </div>

            {/* Line Chart Container */}
            <div className="w-full h-[320px] relative">
              {revenueData.length > 0 ? (
                <Line data={lineChartData} options={chartOptions} />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-sm">
                  <LineChart size={40} className="text-slate-300 mb-2 animate-bounce" />
                  <p className="font-semibold">No historical revenue data recorded yet.</p>
                </div>
              )}
            </div>

            {/* Footer Summary Bar */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Realized Revenue Trendline
              </span>
              <span className="font-semibold text-slate-700">
                Latest Month Volume: <span className="text-emerald-600 font-bold">{formatINR(revenueData[revenueData.length - 1]?.revenue || 0)}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Section: Recent ADV Enrollments Feed ── */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <GraduationCap size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Recent Advance Enrollments</h2>
              <p className="text-xs text-slate-400 font-medium">Latest students assigned to this operations desk</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/AdvBookedPayment"
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              View Booked
            </Link>
            <Link
              to="/AdvFullPayment"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition-colors"
            >
              View Full Paid
            </Link>
          </div>
        </div>

        {recentEnrollments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50/80 text-slate-400 font-bold uppercase tracking-wider border-y border-slate-100">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Program / Domain</th>
                  <th className="py-3 px-4">Counselor</th>
                  <th className="py-3 px-4 text-right">Paid / Total</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Enrolled Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentEnrollments.map((student) => {
                  const isFull = student.status === "fullPaid";
                  const isDefault = student.status === "default";

                  return (
                    <tr key={student._id || Math.random()} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
                            {student.fullname ? student.fullname.charAt(0).toUpperCase() : "S"}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 capitalize leading-tight">{student.fullname}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">{student.email || student.phone}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/60">
                          {student.program || student.domain || "Advance Track"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-slate-600">
                        {student.counselor || "Direct"}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-bold text-emerald-600">{formatINR(student.paidAmount)}</span>
                          <span className="text-[10px] text-slate-400">of {formatINR(student.programPrice)}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isFull
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              : isDefault
                              ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                              : "bg-amber-50 text-amber-700 border border-amber-200/60"
                          }`}
                        >
                          {isFull ? "Full Paid" : isDefault ? "Defaulted" : "Booked"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right text-slate-400 font-medium">
                        {new Date(student.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400">
            <Users size={36} className="mx-auto text-slate-300 mb-2" />
            <p className="font-medium text-sm">No enrollments recorded for this operation desk yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OperationDashboard;
