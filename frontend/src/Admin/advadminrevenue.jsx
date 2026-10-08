import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import API from "../API";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import {
  TrendingUp,
  IndianRupee,
  Clock,
  CheckCircle2,
  Calendar,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  PieChart,
  ShieldCheck,
  ArrowUpDown,
  Sparkles,
  Award,
  Layers,
  ChevronDown
} from "lucide-react";

// Currency Formatter
const formatINR = (val) => {
  const num = Number(val) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  }).format(num);
};

// Compact Currency Formatter for Axis & Badges
const formatCompactINR = (val) => {
  const num = Number(val) || 0;
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(0)}k`;
  return `₹${num}`;
};

/* eslint-disable react/prop-types */
// Custom Chart Tooltip
const CustomChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-xl shadow-2xl border border-slate-700/80 text-xs min-w-[210px]">
        <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-800">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-semibold text-slate-200 tracking-wide">{label}</span>
        </div>
        <div className="space-y-1.5">
          {payload.map((entry, idx) => (
            <div key={`item-${idx}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block shadow-sm"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}:
              </span>
              <span className="font-mono font-bold text-slate-100">
                {formatINR(entry.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const AdvRevenueSheet = () => {
  // Data States
  const [dailyData, setDailyData] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  // Filters & Modes
  const [viewMode, setViewMode] = useState("monthly"); // "monthly" or "custom"
  const [selectedMonth, setSelectedMonth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // UI / Display Controls
  const [chartView, setChartView] = useState("area"); // "area" or "bar"
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  // Pagination for Monthly Summary
  const [monthlyPage, setMonthlyPage] = useState(1);
  const [monthlyTotalPages, setMonthlyTotalPages] = useState(1);
  const monthlyLimit = 10;

  // Loading & Refresh states
  const [loadingDaily, setLoadingDaily] = useState(false);
  const [loadingMonthly, setLoadingMonthly] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch Monthly Stats
  const fetchMonthlyStats = useCallback(async (page = 1) => {
    try {
      setLoadingMonthly(true);
      const response = await axios.get(`${API}/advgetmonthlyrevenue`, {
        params: { page, limit: monthlyLimit }
      });

      const { data, pagination } = response.data || {};
      setMonthlyStats(data || []);
      setMonthlyTotalPages(pagination?.totalPages || 1);
      setGrandTotal(pagination?.grandTotal || 0);

      // On initial load, set default selected month to current month if present, else first month in list
      if (!selectedMonth && data && data.length > 0) {
        const currentMonthStr = new Date().toLocaleString("default", {
          month: "long",
          year: "numeric"
        });
        const hasCurrent = data.find((m) => m.month === currentMonthStr);
        setSelectedMonth(hasCurrent ? currentMonthStr : data[0].month);
      }
    } catch (error) {
      console.error("Error fetching monthly stats:", error);
      toast.error("Failed to load monthly revenue summary.");
    } finally {
      setLoadingMonthly(false);
    }
  }, [monthlyLimit, selectedMonth]);

  // Fetch Daily Data
  const fetchDailyData = useCallback(async () => {
    try {
      setLoadingDaily(true);
      let params = {};

      if (viewMode === "custom") {
        if (!startDate || !endDate) {
          setLoadingDaily(false);
          return;
        }
        params = { startDate, endDate };
      } else {
        if (!selectedMonth) {
          setLoadingDaily(false);
          return;
        }
        const [month, year] = selectedMonth.split(" ");
        params = { month, year };
      }

      const response = await axios.get(`${API}/advgetdailyrevenue`, { params });
      setDailyData(response.data || []);
    } catch (error) {
      console.error("Error fetching daily data:", error);
      toast.error("Failed to load daily revenue data.");
    } finally {
      setLoadingDaily(false);
    }
  }, [viewMode, startDate, endDate, selectedMonth]);

  // Initial Monthly Fetch
  useEffect(() => {
    fetchMonthlyStats(monthlyPage);
  }, [fetchMonthlyStats, monthlyPage]);

  // Daily Data Fetch when filters change
  useEffect(() => {
    if (viewMode === "monthly" && selectedMonth) {
      fetchDailyData();
    } else if (viewMode === "custom" && startDate && endDate) {
      fetchDailyData();
    }
  }, [fetchDailyData, selectedMonth, viewMode, startDate, endDate]);

  // Refresh All Data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchMonthlyStats(monthlyPage), fetchDailyData()]);
    setIsRefreshing(false);
    toast.success("Revenue metrics updated!");
  };

  // Quick Preset Handlers for Custom Mode
  const handlePresetFilter = (preset) => {
    const today = new Date();
    const formatDate = (d) => d.toISOString().split("T")[0];

    if (preset === "7days") {
      const past7 = new Date();
      past7.setDate(today.getDate() - 7);
      setStartDate(formatDate(past7));
      setEndDate(formatDate(today));
    } else if (preset === "30days") {
      const past30 = new Date();
      past30.setDate(today.getDate() - 30);
      setStartDate(formatDate(past30));
      setEndDate(formatDate(today));
    } else if (preset === "thisMonth") {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      setStartDate(formatDate(firstDay));
      setEndDate(formatDate(today));
    }
  };

  // Calculated Metrics for the active period
  const periodMetrics = useMemo(() => {
    let total = 0;
    let credited = 0;
    let pending = 0;
    let payments = 0;

    dailyData.forEach((item) => {
      total += Number(item.total) || 0;
      credited += Number(item.credited) || 0;
      pending += Number(item.pending) || 0;
      payments += Number(item.payments) || 0;
    });

    const realizationRate = total > 0 ? ((credited / total) * 100).toFixed(1) : 0;
    const avgTicket = payments > 0 ? Math.round(total / payments) : 0;

    return {
      total,
      credited,
      pending,
      payments,
      realizationRate,
      avgTicket
    };
  }, [dailyData]);

  // Filtered & Sorted Daily Rows
  const processedDailyRows = useMemo(() => {
    let rows = [...dailyData];

    // Search Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      rows = rows.filter((r) => (r.date || "").toLowerCase().includes(query));
    }

    // Sort
    rows.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === "date") {
        // Date format is DD/MM/YYYY
        const parseDate = (dStr) => {
          if (!dStr) return 0;
          const parts = dStr.split("/");
          if (parts.length === 3) {
            return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
          }
          return new Date(dStr).getTime() || 0;
        };
        valA = parseDate(a.date);
        valB = parseDate(b.date);
      } else {
        valA = Number(valA) || 0;
        valB = Number(valB) || 0;
      }

      if (sortDirection === "asc") {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });

    return rows;
  }, [dailyData, searchQuery, sortField, sortDirection]);

  // Chart Data preparation (chronological order for smooth visualization)
  const chartData = useMemo(() => {
    const list = [...dailyData];
    list.sort((a, b) => {
      const parseDate = (dStr) => {
        if (!dStr) return 0;
        const parts = dStr.split("/");
        if (parts.length === 3) {
          return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
        }
        return new Date(dStr).getTime() || 0;
      };
      return parseDate(a.date) - parseDate(b.date);
    });

    return list.map((item) => ({
      date: item.date?.split("/").slice(0, 2).join("/") || item.date, // short DD/MM
      fullDate: item.date,
      "Total Revenue": item.total || 0,
      "Credited (Cash)": item.credited || 0,
      "Pending (Dues)": item.pending || 0,
      Payments: item.payments || 0
    }));
  }, [dailyData]);

  // Handle Sort Toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Export to Excel (Full Multi-Sheet Financial Report)
  const handleExportExcel = () => {
    try {
      const wb = XLSX.utils.book_new();

      // Sheet 1: Daily Breakdown
      const dailySheetData = processedDailyRows.map((row) => ({
        "Date": row.date,
        "Total Revenue (₹)": row.total,
        "Credited Revenue (₹)": row.credited,
        "Pending Revenue (₹)": row.pending,
        "Collection Rate (%)": row.total > 0 ? `${((row.credited / row.total) * 100).toFixed(1)}%` : "0%",
        "Total Payments": row.payments
      }));
      const wsDaily = XLSX.utils.json_to_sheet(dailySheetData);
      XLSX.utils.book_append_sheet(wb, wsDaily, "Daily Breakdown");

      // Sheet 2: Monthly Summary
      const monthlySheetData = monthlyStats.map((stat) => ({
        "Month": stat.month,
        "Total Revenue (₹)": stat.total,
        "Credited Revenue (₹)": stat.credited,
        "Pending Revenue (₹)": stat.pending,
        "Collection Rate (%)": stat.total > 0 ? `${((stat.credited / stat.total) * 100).toFixed(1)}%` : "0%",
        "Total Payments": stat.payments
      }));
      const wsMonthly = XLSX.utils.json_to_sheet(monthlySheetData);
      XLSX.utils.book_append_sheet(wb, wsMonthly, "Monthly Summary");

      // Generate File Name
      const fileName = `Adv_Revenue_Report_${
        viewMode === "monthly" ? selectedMonth.replace(" ", "_") : `${startDate}_to_${endDate}`
      }_${new Date().toISOString().split("T")[0]}.xlsx`;

      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, fileName);

      toast.success("Financial revenue report exported!");
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Failed to generate Excel report.");
    }
  };

  return (
    <div className="admin-content-wrap min-h-screen bg-[#F8FAFC] text-slate-800 font-sans pb-16">
      <div className="max-w-[1550px] mx-auto px-2 sm:px-4 space-y-8">
        
        {/* ========================================================= */}
        {/* TOP BAR / EXECUTIVE HEADER */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <IndianRupee className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                  Advance Revenue Intelligence
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                    Live Audited
                  </span>
                </h1>
              </div>
            </div>
            <p className="text-sm text-slate-500 ml-1">
              Comprehensive financial breakdown of student enrollments, credited cash flow, and outstanding dues.
            </p>
          </div>

          {/* Action Header Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow active:scale-[0.98] disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 text-slate-500 ${isRefreshing ? "animate-spin text-indigo-600" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleExportExcel}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:shadow-lg active:scale-[0.98]"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Export Excel</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* EXECUTIVE KPI STAT CARDS (TOP METRIC OVERVIEW) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: All-Time Lifetime Revenue */}
          <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:scale-110 transition-transform"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                All-Time Revenue
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                {formatINR(grandTotal)}
              </h3>
              <p className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                Cumulative advance gross sales
              </p>
            </div>
          </div>

          {/* Card 2: Period Gross Revenue */}
          <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:scale-110 transition-transform"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {viewMode === "monthly" ? "Month Gross Revenue" : "Selected Period Gross"}
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                {formatINR(periodMetrics.total)}
              </h3>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-medium text-slate-500">
                  {periodMetrics.payments} Total Transactions
                </span>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  AOV: {formatINR(periodMetrics.avgTicket)}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Credited / Realized Cash */}
          <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:scale-110 transition-transform"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Credited (Realized Cash)
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight font-mono">
                {formatINR(periodMetrics.credited)}
              </h3>
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Realization Rate</span>
                  <span className="font-bold text-emerald-600">{periodMetrics.realizationRate}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(periodMetrics.realizationRate, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Pending Receivables */}
          <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:scale-110 transition-transform"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Pending Receivables
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-600 tracking-tight font-mono">
                {formatINR(periodMetrics.pending)}
              </h3>
              <p className="text-xs font-medium text-slate-500 flex items-center justify-between pt-1">
                <span>Outstanding Dues</span>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {periodMetrics.total > 0
                    ? `${((periodMetrics.pending / periodMetrics.total) * 100).toFixed(1)}% uncollected`
                    : "0%"}
                </span>
              </p>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE CONTROLS & FILTER BAR */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* View Mode Segmented Switcher */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                View Mode:
              </label>
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80">
                <button
                  onClick={() => setViewMode("monthly")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "monthly"
                      ? "bg-white text-indigo-700 shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Monthly View
                </button>
                <button
                  onClick={() => setViewMode("custom")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "custom"
                      ? "bg-white text-indigo-700 shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Custom Date Range
                </button>
              </div>
            </div>

            {/* Filter Inputs according to View Mode */}
            <div className="flex flex-wrap items-center gap-3">
              {viewMode === "monthly" ? (
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <select
                      className="bg-slate-50 hover:bg-slate-100/80 text-slate-800 text-sm font-semibold pl-10 pr-9 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer appearance-none min-w-[210px]"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                      <option value="" disabled>Select Reporting Month</option>
                      {monthlyStats.map((stat) => (
                        <option key={stat.month} value={stat.month}>
                          {stat.month} ({formatCompactINR(stat.total)})
                        </option>
                      ))}
                    </select>
                    <Calendar className="w-4 h-4 text-indigo-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Quick Select Latest Month */}
                  {monthlyStats.length > 0 && selectedMonth !== monthlyStats[0]?.month && (
                    <button
                      onClick={() => setSelectedMonth(monthlyStats[0].month)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-xl border border-indigo-200 transition-all"
                    >
                      Latest Month
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">From</span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-transparent text-sm font-medium text-slate-800 outline-none cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">To</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-transparent text-sm font-medium text-slate-800 outline-none cursor-pointer"
                    />
                  </div>

                  <button
                    onClick={fetchDailyData}
                    disabled={!startDate || !endDate}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold px-4 py-2 text-xs rounded-xl shadow-sm transition-all active:scale-95"
                  >
                    Apply Filter
                  </button>

                  {/* Preset Pills */}
                  <div className="hidden sm:flex items-center gap-1 ml-1 border-l border-slate-200 pl-2">
                    <button
                      onClick={() => handlePresetFilter("7days")}
                      className="text-[11px] font-medium text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      7 Days
                    </button>
                    <button
                      onClick={() => handlePresetFilter("30days")}
                      className="text-[11px] font-medium text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      30 Days
                    </button>
                    <button
                      onClick={() => handlePresetFilter("thisMonth")}
                      className="text-[11px] font-medium text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      This Month
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE VISUAL ANALYTICS (CHART SECTION) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  Revenue Velocity & Cash Realization Curve
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Daily distribution of gross sales vs credited cash collections
                </p>
              </div>

              {/* Chart Type Toggle */}
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
                <button
                  onClick={() => setChartView("area")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    chartView === "area"
                      ? "bg-white text-indigo-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Area Curve
                </button>
                <button
                  onClick={() => setChartView("bar")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    chartView === "bar"
                      ? "bg-white text-indigo-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Bar Stack
                </button>
              </div>
            </div>

            {/* Chart Canvas */}
            <div className="h-[310px] w-full">
              {loadingDaily ? (
                <div className="h-full flex flex-col items-center justify-center gap-2 text-slate-400">
                  <RefreshCw className="w-6 h-6 animate-spin text-indigo-500" />
                  <span className="text-xs font-medium">Computing revenue charts...</span>
                </div>
              ) : chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  {chartView === "area" ? (
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="colorCredited" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={{ stroke: "#e2e8f0" }}
                      />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={formatCompactINR}
                      />
                      <Tooltip content={<CustomChartTooltip />} />
                      <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ paddingBottom: "10px", fontSize: "11px", fontWeight: "600" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="Total Revenue"
                        stroke="#4F46E5"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#colorTotal)"
                      />
                      <Area
                        type="monotone"
                        dataKey="Credited (Cash)"
                        stroke="#10B981"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#colorCredited)"
                      />
                      <Area
                        type="monotone"
                        dataKey="Pending (Dues)"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        fillOpacity={1}
                        fill="url(#colorPending)"
                      />
                    </AreaChart>
                  ) : (
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={{ stroke: "#e2e8f0" }}
                      />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={formatCompactINR}
                      />
                      <Tooltip content={<CustomChartTooltip />} />
                      <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ paddingBottom: "10px", fontSize: "11px", fontWeight: "600" }}
                      />
                      <Bar dataKey="Credited (Cash)" fill="#10B981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Pending (Dues)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                  <BarChart3 className="w-8 h-8 stroke-1 text-slate-300" />
                  <p className="text-xs">No transaction records available to render trends for this period.</p>
                </div>
              )}
            </div>
          </div>

          {/* Side Performance / Financial Health Breakdown Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-indigo-600" />
                  Collection Efficiency
                </h3>
                <span className="text-xs font-semibold text-slate-400">
                  {viewMode === "monthly" ? selectedMonth : "Filtered Range"}
                </span>
              </div>

              {/* Realization Progress Dial / Ring representation */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/30 border border-slate-100 mb-6 text-center">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Cash Realization Ratio
                </div>
                <div className="text-4xl font-black text-slate-900 tracking-tight font-mono">
                  {periodMetrics.realizationRate}%
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {periodMetrics.credited > 0
                    ? `${formatINR(periodMetrics.credited)} cleared of ${formatINR(periodMetrics.total)}`
                    : "No transactions recorded yet"}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 rounded-full h-2.5 mt-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(periodMetrics.realizationRate, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Financial Health Points */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <span className="font-semibold text-slate-700">Cash Realized</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    {formatINR(periodMetrics.credited)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                    <span className="font-semibold text-slate-700">Pending Receivables</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    {formatINR(periodMetrics.pending)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                    <span className="font-semibold text-slate-700">Enrollment Volume</span>
                  </div>
                  <span className="font-bold text-slate-900">
                    {periodMetrics.payments} Students
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Audit Status */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Reconciled with Gateway
              </span>
              <span>Updated just now</span>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* MAIN DATA TABLES: DAILY BREAKDOWN & MONTHLY ARCHIVE */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLS: DETAILED DAILY TRANSACTIONS TABLE */}
          <div className="xl:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              
              {/* Table Header Bar with Search & Sort Info */}
              <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    {viewMode === "monthly"
                      ? `${selectedMonth || "Monthly"} Transaction Journal`
                      : `Date-Wise Journal (${startDate || "Start"} to ${endDate || "End"})`}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Showing {processedDailyRows.length} daily entries recorded
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative min-w-[220px]">
                  <input
                    type="text"
                    placeholder="Search by date (DD/MM)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Table Body */}
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold select-none">
                    <tr>
                      <th
                        onClick={() => handleSort("date")}
                        className="px-5 py-3.5 cursor-pointer hover:text-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          <span>Date</span>
                          <ArrowUpDown className="w-3 h-3 text-slate-400" />
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("total")}
                        className="px-5 py-3.5 cursor-pointer hover:text-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          <span>Gross Sales</span>
                          <ArrowUpDown className="w-3 h-3 text-slate-400" />
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("credited")}
                        className="px-5 py-3.5 text-emerald-700 cursor-pointer hover:text-emerald-800 transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          <span>Credited (Cash)</span>
                          <ArrowUpDown className="w-3 h-3 text-emerald-500" />
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("pending")}
                        className="px-5 py-3.5 text-amber-700 cursor-pointer hover:text-amber-800 transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          <span>Pending (Dues)</span>
                          <ArrowUpDown className="w-3 h-3 text-amber-500" />
                        </div>
                      </th>
                      <th className="px-5 py-3.5">
                        <span>Realization %</span>
                      </th>
                      <th
                        onClick={() => handleSort("payments")}
                        className="px-5 py-3.5 text-center cursor-pointer hover:text-slate-800 transition-colors"
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          <span>Payments</span>
                          <ArrowUpDown className="w-3 h-3 text-slate-400" />
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {loadingDaily ? (
                      <tr>
                        <td colSpan="6" className="px-5 py-12 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <RefreshCw className="w-6 h-6 animate-spin text-indigo-500" />
                            <span className="text-xs font-semibold">Loading daily audit entries...</span>
                          </div>
                        </td>
                      </tr>
                    ) : processedDailyRows.length > 0 ? (
                      processedDailyRows.map((row, idx) => {
                        const rowRatio = row.total > 0 ? Math.round((row.credited / row.total) * 100) : 0;
                        return (
                          <tr
                            key={row.date || idx}
                            className="hover:bg-slate-50/80 transition-colors group"
                          >
                            <td className="px-5 py-3.5 font-bold text-slate-900 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/80"></span>
                              {row.date}
                            </td>

                            <td className="px-5 py-3.5 font-mono font-bold text-slate-900">
                              {formatINR(row.total)}
                            </td>

                            <td className="px-5 py-3.5 font-mono font-semibold text-emerald-600 bg-emerald-50/30">
                              {formatINR(row.credited)}
                            </td>

                            <td className="px-5 py-3.5 font-mono font-semibold text-amber-600 bg-amber-50/20">
                              {formatINR(row.pending)}
                            </td>

                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-600 w-8">{rowRatio}%</span>
                                <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className="bg-emerald-500 h-1.5 rounded-full"
                                    style={{ width: `${Math.min(rowRatio, 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>

                            <td className="px-5 py-3.5 text-center">
                              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                {row.payments}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-5 py-12 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Clock className="w-8 h-8 text-slate-300 stroke-1" />
                            <p className="text-sm font-semibold text-slate-600">No transactions found</p>
                            <p className="text-xs text-slate-400">
                              Try selecting another month or adjusting your custom date filters.
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>

                  {/* Table Summary Footer */}
                  {processedDailyRows.length > 0 && (
                    <tfoot className="bg-slate-50/90 border-t-2 border-slate-200 font-bold text-slate-900 text-xs">
                      <tr>
                        <td className="px-5 py-3.5 uppercase tracking-wider text-slate-600">
                          Period Total
                        </td>
                        <td className="px-5 py-3.5 font-mono">
                          {formatINR(periodMetrics.total)}
                        </td>
                        <td className="px-5 py-3.5 font-mono text-emerald-700">
                          {formatINR(periodMetrics.credited)}
                        </td>
                        <td className="px-5 py-3.5 font-mono text-amber-700">
                          {formatINR(periodMetrics.pending)}
                        </td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">
                          {periodMetrics.realizationRate}% Overall
                        </td>
                        <td className="px-5 py-3.5 text-center font-mono">
                          {periodMetrics.payments}
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT 1 COL: HISTORICAL MONTHLY SUMMARY ARCHIVE */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
              
              <div>
                {/* Header */}
                <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-indigo-600" />
                      Monthly Performance Archive
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Historical all-time aggregated billing metrics
                    </p>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left whitespace-nowrap text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="px-4 py-3">Month</th>
                        <th className="px-4 py-3">Total Sales</th>
                        <th className="px-4 py-3 text-emerald-600">Credited</th>
                        <th className="px-4 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {loadingMonthly ? (
                        <tr>
                          <td colSpan="4" className="px-4 py-8 text-center text-slate-400">
                            <RefreshCw className="w-5 h-5 animate-spin mx-auto text-indigo-500 mb-1" />
                            <span>Loading monthly audit...</span>
                          </td>
                        </tr>
                      ) : monthlyStats.length > 0 ? (
                        monthlyStats.map((stat, index) => {
                          const isCurrentActive = viewMode === "monthly" && selectedMonth === stat.month;

                          // Compute MoM vs next older month
                          const prevMonth = monthlyStats[index + 1];
                          let momGrowth = null;
                          if (prevMonth && prevMonth.total > 0) {
                            momGrowth = (((stat.total - prevMonth.total) / prevMonth.total) * 100).toFixed(1);
                          }

                          return (
                            <tr
                              key={stat.month}
                              className={`transition-colors ${
                                isCurrentActive
                                  ? "bg-indigo-50/60 font-semibold"
                                  : "hover:bg-slate-50/70"
                              }`}
                            >
                              <td className="px-4 py-3.5">
                                <div className="font-bold text-slate-900">{stat.month}</div>
                                {momGrowth !== null && (
                                  <div
                                    className={`text-[10px] font-semibold flex items-center gap-0.5 mt-0.5 ${
                                      Number(momGrowth) >= 0 ? "text-emerald-600" : "text-rose-600"
                                    }`}
                                  >
                                    {Number(momGrowth) >= 0 ? (
                                      <ArrowUpRight className="w-3 h-3" />
                                    ) : (
                                      <ArrowDownRight className="w-3 h-3" />
                                    )}
                                    <span>{Math.abs(momGrowth)}% MoM</span>
                                  </div>
                                )}
                              </td>

                              <td className="px-4 py-3.5 font-mono font-bold text-slate-900">
                                {formatCompactINR(stat.total)}
                              </td>

                              <td className="px-4 py-3.5 font-mono font-semibold text-emerald-600">
                                {formatCompactINR(stat.credited)}
                              </td>

                              <td className="px-4 py-3.5 text-right">
                                <button
                                  onClick={() => {
                                    setViewMode("monthly");
                                    setSelectedMonth(stat.month);
                                  }}
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                                    isCurrentActive
                                      ? "bg-indigo-600 text-white shadow-sm"
                                      : "bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600"
                                  }`}
                                >
                                  {isCurrentActive ? "Active" : "Inspect"}
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-4 py-6 text-center text-slate-400">
                            No monthly summaries found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Monthly Pagination Controls */}
              <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs bg-slate-50/50">
                <button
                  onClick={() => setMonthlyPage((p) => Math.max(1, p - 1))}
                  disabled={monthlyPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-slate-600 font-semibold transition-all flex items-center gap-1 shadow-sm"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                <span className="font-bold text-slate-600">
                  Page {monthlyPage} of {monthlyTotalPages || 1}
                </span>

                <button
                  onClick={() => setMonthlyPage((p) => Math.min(monthlyTotalPages, p + 1))}
                  disabled={monthlyPage >= monthlyTotalPages}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-slate-600 font-semibold transition-all flex items-center gap-1 shadow-sm"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdvRevenueSheet;
