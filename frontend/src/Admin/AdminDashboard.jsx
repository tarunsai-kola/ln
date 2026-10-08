/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../API";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import toast, { Toaster } from "react-hot-toast";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPie,
  Pie,
  Cell
} from "recharts";
import {
  BookOpen,
  Users,
  GraduationCap,
  Bookmark,
  CheckSquare,
  XCircle,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  Shield,
  Sparkles,
  RefreshCw,
  Search,
  ArrowUpDown,
  BarChart3,
  PieChart,
  IndianRupee,
  CheckCircle2,
  PlusCircle,
  FileSpreadsheet
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

// Compact Currency Formatter for Axis
const formatCompactINR = (val) => {
  const num = Number(val) || 0;
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(0)}k`;
  return `₹${num}`;
};

// Custom Chart Tooltip
const CustomChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-xl shadow-xl border border-slate-700/80 text-xs min-w-[190px]">
        <div className="font-bold text-slate-200 pb-1.5 mb-1.5 border-b border-slate-800 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span className="truncate max-w-[200px]">{label}</span>
        </div>
        <div className="space-y-1.5">
          {payload.map((entry, idx) => (
            <div key={`tip-${idx}`} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}:
              </span>
              <span className="font-bold font-mono text-slate-100">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const AdminDashboard = () => {
  // Raw Data States
  const [courses, setCourses] = useState([]);
  const [advCourses, setAdvCourses] = useState([]);
  const [operations, setOperations] = useState([]);
  const [advOperations, setAdvOperations] = useState([]);
  const [bdas, setBdas] = useState([]);
  const [payments, setPayments] = useState([]);
  const [advPayments, setAdvPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter States
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [courseTab, setCourseTab] = useState("all"); // "all", "standard", "advanced"
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");

  // Reporting Month Names
  const currentMonth = useMemo(
    () => new Date().toLocaleString("default", { month: "long", year: "numeric" }),
    []
  );
  const nextMonth = useMemo(
    () =>
      new Date(new Date().getFullYear(), new Date().getMonth() + 1).toLocaleString("default", {
        month: "long",
        year: "numeric"
      }),
    []
  );

  // API Fetchers
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API}/getcourses`);
      setCourses(res.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchAdvCourses = async () => {
    try {
      const res = await axios.get(`${API}/getadvcourses`);
      setAdvCourses(res.data || []);
    } catch (error) {
      console.error("Error fetching adv courses:", error);
    }
  };

  const fetchOperations = async () => {
    try {
      const res = await axios.get(`${API}/getoperation`);
      setOperations(res.data || []);
    } catch (error) {
      console.error("Error fetching operation:", error);
    }
  };

  const fetchAdvOperations = async () => {
    try {
      const res = await axios.get(`${API}/getadvoperation`);
      setAdvOperations(res.data || []);
    } catch (error) {
      console.error("Error fetching ADV operation:", error);
    }
  };

  const fetchBdas = async () => {
    try {
      const res = await axios.get(`${API}/getbda`);
      setBdas(res.data || []);
    } catch (error) {
      console.error("Error fetching bda:", error);
    }
  };

  const fetchNewStudents = async () => {
    try {
      const res = await axios.get(`${API}/getnewstudentenroll?all=true`);
      setPayments(res.data || []);
    } catch (error) {
      console.error("Error fetching new student:", error);
    }
  };

  const fetchAdvEnrollments = async () => {
    try {
      const res = await axios.get(`${API}/getadvenrolls?all=true`);
      setAdvPayments(res.data || []);
    } catch (error) {
      console.error("Error fetching adv enrollments:", error);
    }
  };

  const loadAllData = useCallback(async () => {
    try {
      await Promise.all([
        fetchCourses(),
        fetchAdvCourses(),
        fetchOperations(),
        fetchAdvOperations(),
        fetchBdas(),
        fetchNewStudents(),
        fetchAdvEnrollments()
      ]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast.error("Failed to load some dashboard metrics");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadAllData();
    toast.success("Dashboard metrics updated!");
  };

  // Filtered Payments by Date Range
  const filteredAllPayments = useMemo(() => {
    let combined = [...payments, ...advPayments];

    if (startDate) {
      const start = new Date(startDate);
      combined = combined.filter((item) => new Date(item.createdAt) >= start);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      combined = combined.filter((item) => new Date(item.createdAt) <= end);
    }

    return combined;
  }, [payments, advPayments, startDate, endDate]);

  // Quick Preset Date Filters
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

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    toast.success("Date filters cleared.");
  };

  // Platform Aggregate KPIs
  const platformMetrics = useMemo(() => {
    const totalStdStudents = payments.length;
    const totalAdvStudents = advPayments.length;
    const totalStudents = totalStdStudents + totalAdvStudents;

    // Status Counts across all enrollments
    const allEnrollments = [...payments, ...advPayments];

    const bookedCount = allEnrollments.filter((i) => i.status === "booked").length;
    const fullPaidCount = allEnrollments.filter((i) => i.status === "fullPaid").length;
    const defaultCount = allEnrollments.filter((i) => i.status === "default").length;

    // Gross Enrolled Value & Realized Value
    let grossValue = 0;
    let realizedValue = 0;

    allEnrollments.forEach((item) => {
      grossValue += Number(item.programPrice) || 0;
      realizedValue += Number(item.paidAmount) || 0;
    });

    const clearedRate = totalStudents > 0 ? Math.round((fullPaidCount / totalStudents) * 100) : 0;
    const totalWorkforce = operations.length + advOperations.length + bdas.length;

    return {
      totalStudents,
      totalStdStudents,
      totalAdvStudents,
      bookedCount,
      fullPaidCount,
      defaultCount,
      grossValue,
      realizedValue,
      clearedRate,
      totalWorkforce
    };
  }, [payments, advPayments, operations, advOperations, bdas]);

  // Unified Course Catalog List
  const unifiedCoursesList = useMemo(() => {
    const stdList = courses.map((c) => {
      const currentMonthEnrollments = payments.filter(
        (p) =>
          p.domainId === c._id &&
          (p.monthOpted || "").trim().toLowerCase() === currentMonth.toLowerCase()
      ).length;

      const nextMonthEnrollments = payments.filter(
        (p) =>
          p.domainId === c._id &&
          (p.monthOpted || "").trim().toLowerCase() === nextMonth.toLowerCase()
      ).length;

      const totalEnrollments = payments.filter((p) => p.domainId === c._id).length;
      const sessionsCount = c.session ? Object.keys(c.session).length : 0;

      return {
        id: c._id,
        title: c.title || "Untitled Course",
        category: "Standard",
        sessionsCount,
        currentMonthEnrollments,
        nextMonthEnrollments,
        totalEnrollments
      };
    });

    const advList = advCourses.map((c) => {
      const currentMonthEnrollments = advPayments.filter(
        (p) =>
          p.domainId === c._id &&
          (p.monthOpted || "").trim().toLowerCase() === currentMonth.toLowerCase()
      ).length;

      const nextMonthEnrollments = advPayments.filter(
        (p) =>
          p.domainId === c._id &&
          (p.monthOpted || "").trim().toLowerCase() === nextMonth.toLowerCase()
      ).length;

      const totalEnrollments = advPayments.filter((p) => p.domainId === c._id).length;
      const sessionsCount = c.sessions?.length || 0;

      return {
        id: c._id,
        title: c.title || "Untitled Advanced Course",
        category: "Advanced",
        sessionsCount,
        currentMonthEnrollments,
        nextMonthEnrollments,
        totalEnrollments
      };
    });

    let combined = [];
    if (courseTab === "standard") {
      combined = stdList;
    } else if (courseTab === "advanced") {
      combined = advList;
    } else {
      combined = [...stdList, ...advList];
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      combined = combined.filter((c) => c.title.toLowerCase().includes(q));
    }

    // Sort
    combined.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === "string") {
        return sortDirection === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        valA = Number(valA) || 0;
        valB = Number(valB) || 0;
        return sortDirection === "asc" ? valA - valB : valB - valA;
      }
    });

    return combined;
  }, [courses, advCourses, payments, advPayments, courseTab, searchQuery, sortField, sortDirection, currentMonth, nextMonth]);

  // Chart Data: Top Courses by Current Month Enrollments
  const courseChartData = useMemo(() => {
    const list = [...unifiedCoursesList];
    list.sort((a, b) => (b.currentMonthEnrollments + b.nextMonthEnrollments) - (a.currentMonthEnrollments + a.nextMonthEnrollments));
    return list.slice(0, 7).map((c) => ({
      name: c.title.length > 18 ? `${c.title.substring(0, 16)}...` : c.title,
      fullName: c.title,
      [currentMonth]: c.currentMonthEnrollments,
      [nextMonth]: c.nextMonthEnrollments
    }));
  }, [unifiedCoursesList, currentMonth, nextMonth]);

  // Chart Data: Enrollment Status Distribution
  const statusPieData = useMemo(() => {
    return [
      { name: "Fully Paid", value: platformMetrics.fullPaidCount, color: "#10B981" },
      { name: "Booked / Partial", value: platformMetrics.bookedCount, color: "#3B82F6" },
      { name: "Defaulted", value: platformMetrics.defaultCount, color: "#F43F5E" }
    ];
  }, [platformMetrics]);

  // Handle Sort Toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection(field === "title" ? "asc" : "desc");
    }
  };

  // Export Comprehensive Multi-Sheet Excel Workbook
  const exportToExcel = () => {
    try {
      const wb = XLSX.utils.book_new();

      // Sheet 1: Courses Analytics
      const coursesSheetData = unifiedCoursesList.map((item, idx) => ({
        "No.": idx + 1,
        "Course Name": item.title,
        "Category": item.category,
        "Total Sessions": item.sessionsCount,
        [`Enrollments (${currentMonth})`]: item.currentMonthEnrollments,
        [`Enrollments (${nextMonth})`]: item.nextMonthEnrollments,
        "Total All-Time Enrollments": item.totalEnrollments
      }));
      const wsCourses = XLSX.utils.json_to_sheet(coursesSheetData);
      XLSX.utils.book_append_sheet(wb, wsCourses, "Course Performance");

      // Sheet 2: Filtered Student Enrollments
      const studentsSheetData = filteredAllPayments.map((item, idx) => ({
        "No.": idx + 1,
        "Student Name": item.studentName || "N/A",
        "Email": item.email || "N/A",
        "Phone": item.contactNumber || "N/A",
        "Counselor": item.counselor || "N/A",
        "Status": item.status || "N/A",
        "Program Price (₹)": item.programPrice || 0,
        "Paid Amount (₹)": item.paidAmount || 0,
        "Month Opted": item.monthOpted || "N/A",
        "Enrolled Date": item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-GB") : "N/A"
      }));
      const wsStudents = XLSX.utils.json_to_sheet(studentsSheetData);
      XLSX.utils.book_append_sheet(wb, wsStudents, "Student Enrollments");

      // Sheet 3: Executive Platform Summary
      const summarySheetData = [
        { "Metric": "Total Enrolled Students", "Value": platformMetrics.totalStudents },
        { "Metric": "Standard Course Students", "Value": platformMetrics.totalStdStudents },
        { "Metric": "Advanced Course Students", "Value": platformMetrics.totalAdvStudents },
        { "Metric": "Fully Paid Students", "Value": platformMetrics.fullPaidCount },
        { "Metric": "Booked In-Pipeline Students", "Value": platformMetrics.bookedCount },
        { "Metric": "Defaulted Students", "Value": platformMetrics.defaultCount },
        { "Metric": "Standard Courses Count", "Value": courses.length },
        { "Metric": "Advanced Courses Count", "Value": advCourses.length },
        { "Metric": "Operations Team Members", "Value": operations.length + advOperations.length },
        { "Metric": "Active BDAs", "Value": bdas.length },
        { "Metric": "Export Timestamp", "Value": new Date().toLocaleString() }
      ];
      const wsSummary = XLSX.utils.json_to_sheet(summarySheetData);
      XLSX.utils.book_append_sheet(wb, wsSummary, "Executive Summary");

      // Save Workbook
      const fileName = `Admin_Dashboard_Intelligence_${new Date().toISOString().split("T")[0]}.xlsx`;
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, fileName);

      toast.success("Complete dashboard report exported to Excel!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to generate Excel report.");
    }
  };

  return (
    <div className="admin-content-wrap min-h-screen bg-[#F8FAFC] text-slate-800 font-sans pb-16">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-[1550px] mx-auto px-2 sm:px-4 space-y-8">
        
        {/* ========================================================= */}
        {/* TOP COMMAND HEADER */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <Shield className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                  Central Administration Hub
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Ecosystem
                  </span>
                </h1>
              </div>
            </div>
            <p className="text-sm text-slate-500 ml-1">
              Consolidated governance over academic courses, student enrollments, operational field forces, and admissions pipeline.
            </p>
          </div>

          {/* Action Header Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow active:scale-[0.98] disabled:opacity-50"
              title="Refresh Metrics"
            >
              <RefreshCw className={`w-4 h-4 text-slate-500 ${isRefreshing ? "animate-spin text-indigo-600" : ""}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-all shadow-sm active:scale-[0.98] ${
                showFilters || startDate || endDate
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow"
                  : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              <Filter className={`w-4 h-4 ${showFilters ? "text-indigo-600" : "text-slate-500"}`} />
              <span>Filter Date</span>
              {(startDate || endDate) && (
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              )}
            </button>

            <button
              onClick={exportToExcel}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:shadow-lg active:scale-[0.98]"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Export Intelligence</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLLAPSIBLE FILTER CONSOLE */}
        {/* ========================================================= */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-lg shadow-indigo-500/5 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Date Range Filter Console
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Filters student admission exports and enrollment date records
                </p>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePresetFilter("7days")}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  Last 7 Days
                </button>
                <button
                  onClick={() => handlePresetFilter("30days")}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  Last 30 Days
                </button>
                <button
                  onClick={() => handlePresetFilter("thisMonth")}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  This Month
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-100 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="text-xs text-slate-500 pb-2">
                <span className="font-bold text-indigo-600">{filteredAllPayments.length}</span>{" "}
                matching student admissions found in selected window.
              </div>

              <div className="flex items-center gap-2">
                {(startDate || endDate) && (
                  <button
                    onClick={clearFilters}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                  >
                    Clear Filter
                  </button>
                )}
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  Close Console
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* EXECUTIVE KPI STAT CARDS (TOP OVERVIEW) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Total Enrolled Students */}
          <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:scale-110 transition-transform"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Student Admissions
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <GraduationCap className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                {loading ? "..." : platformMetrics.totalStudents.toLocaleString()}
              </h3>
              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className="text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                  Std: {platformMetrics.totalStdStudents}
                </span>
                <span className="text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                  Adv: {platformMetrics.totalAdvStudents}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Cash Realized / Gross Volume */}
          <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:scale-110 transition-transform"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Cash Flow Realized
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <IndianRupee className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold text-emerald-600 tracking-tight font-mono">
                {loading ? "..." : formatINR(platformMetrics.realizedValue)}
              </h3>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Gross: {formatCompactINR(platformMetrics.grossValue)}</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {platformMetrics.grossValue > 0
                    ? `${Math.round((platformMetrics.realizedValue / platformMetrics.grossValue) * 100)}% Cleared`
                    : "0%"}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Academic Catalog Volume */}
          <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:scale-110 transition-transform"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Academic Programs
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <BookOpen className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                {courses.length + advCourses.length}
              </h3>
              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className="text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  {courses.length} Standard
                </span>
                <span className="text-violet-600 font-semibold bg-violet-50 px-2 py-0.5 rounded-md border border-violet-100">
                  {advCourses.length} Advanced
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Operational Field Force */}
          <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:scale-110 transition-transform"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Operational Workforce
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <Users className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                {platformMetrics.totalWorkforce}
              </h3>
              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className="text-cyan-600 font-semibold bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-100">
                  {bdas.length} BDAs
                </span>
                <span className="text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                  {operations.length + advOperations.length} Operations
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* PIPELINE STATUS CHIPS (SECONDARY BREAKDOWN) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <CheckSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Fully Paid Clearances</p>
                <h4 className="text-xl font-black text-emerald-600 font-mono">
                  {platformMetrics.fullPaidCount}
                </h4>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {platformMetrics.clearedRate}% of Total
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">In-Pipeline Bookings</p>
                <h4 className="text-xl font-black text-blue-600 font-mono">
                  {platformMetrics.bookedCount}
                </h4>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Active Booked
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Defaulted Balances</p>
                <h4 className="text-xl font-black text-rose-600 font-mono">
                  {platformMetrics.defaultCount}
                </h4>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              Attention Required
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* QUICK ACCESS ACTION DOCK */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Admin Quick Navigation:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/AdvRevenueSheet"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 text-xs font-semibold transition-all"
            >
              <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
              <span>Revenue Intelligence</span>
            </Link>
            <Link
              to="/AddAdvCourse"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 text-xs font-semibold transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>Create Course</span>
            </Link>
            <Link
              to="/AdvTeamDetail"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 text-xs font-semibold transition-all"
            >
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>Team Roster</span>
            </Link>
            <Link
              to="/AdvOnBoardingDetails"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 text-xs font-semibold transition-all"
            >
              <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
              <span>Student Onboarding</span>
            </Link>
            <Link
              to="/AdvFormLeads"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 text-xs font-semibold transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-600" />
              <span>Form Leads</span>
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE DATA VISUALIZATIONS (RECHARTS) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart: Enrollment Velocity by Course */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  Top Courses Enrollment Velocity
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Admissions comparison between {currentMonth} and {nextMonth}
                </p>
              </div>
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 self-start sm:self-auto">
                Live Cohort Run-rate
              </span>
            </div>

            <div className="h-[290px] w-full">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-2 text-slate-400">
                  <RefreshCw className="w-6 h-6 animate-spin text-indigo-500" />
                  <span className="text-xs font-medium">Computing course enrollment analytics...</span>
                </div>
              ) : courseChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={courseChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="name"
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
                      allowDecimals={false}
                    />
                    <Tooltip content={<CustomChartTooltip />} />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{ paddingBottom: "10px", fontSize: "11px", fontWeight: "600" }}
                    />
                    <Bar
                      dataKey={currentMonth}
                      fill="#4F46E5"
                      radius={[4, 4, 0, 0]}
                      name={`${currentMonth} (Current)`}
                    />
                    <Bar
                      dataKey={nextMonth}
                      fill="#06B6D4"
                      radius={[4, 4, 0, 0]}
                      name={`${nextMonth} (Upcoming)`}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                  <BarChart3 className="w-8 h-8 stroke-1 text-slate-300" />
                  <p className="text-xs">No course enrollments available for visualization.</p>
                </div>
              )}
            </div>
          </div>

          {/* Side Chart: Enrollment Status Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-indigo-600" />
                  Admissions Status Distribution
                </h3>
                <span className="text-xs font-semibold text-slate-400">All-Time</span>
              </div>

              {/* Pie Chart Canvas */}
              <div className="h-[180px] w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={statusPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {statusPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPie>
                </ResponsiveContainer>
                <div className="absolute text-center pointer-events-none">
                  <span className="text-xs font-bold uppercase text-slate-400 block">Total</span>
                  <span className="text-lg font-black text-slate-900 font-mono">
                    {platformMetrics.totalStudents}
                  </span>
                </div>
              </div>

              {/* Status List */}
              <div className="space-y-2.5 pt-2 text-xs">
                {statusPieData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <span className="font-semibold text-slate-700">{item.name}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Cleared ratio: {platformMetrics.clearedRate}%</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Audit Verified
              </span>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* COMPREHENSIVE COURSE CATALOG & PERFORMANCE TABLE */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Table Header Controls */}
          <div className="p-5 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/50">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Academic Course Portfolio & Enrollment Matrix
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Breakdown of training curriculum, sessions count, and active monthly admissions
              </p>
            </div>

            {/* Tabs & Search */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Tabs */}
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 text-xs font-bold">
                <button
                  onClick={() => setCourseTab("all")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    courseTab === "all"
                      ? "bg-white text-indigo-700 shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  All ({courses.length + advCourses.length})
                </button>
                <button
                  onClick={() => setCourseTab("standard")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    courseTab === "standard"
                      ? "bg-white text-indigo-700 shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Standard ({courses.length})
                </button>
                <button
                  onClick={() => setCourseTab("advanced")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    courseTab === "advanced"
                      ? "bg-white text-indigo-700 shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Advanced ({advCourses.length})
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[220px]">
                <input
                  type="text"
                  placeholder="Search course title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Table Element */}
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold select-none">
                <tr>
                  <th className="px-6 py-4 w-14">No.</th>
                  <th
                    onClick={() => handleSort("title")}
                    className="px-6 py-4 cursor-pointer hover:text-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Course Title</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="px-6 py-4">Category</th>
                  <th
                    onClick={() => handleSort("sessionsCount")}
                    className="px-6 py-4 text-center cursor-pointer hover:text-slate-800 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span>Sessions</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("currentMonthEnrollments")}
                    className="px-6 py-4 text-center cursor-pointer hover:text-slate-800 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span>{currentMonth}</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("nextMonthEnrollments")}
                    className="px-6 py-4 text-center cursor-pointer hover:text-slate-800 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span>{nextMonth}</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("totalEnrollments")}
                    className="px-6 py-4 text-center cursor-pointer hover:text-slate-800 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span>All-Time</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <RefreshCw className="w-6 h-6 animate-spin text-indigo-500" />
                        <span className="text-xs font-semibold">Loading courses and enrollment counts...</span>
                      </div>
                    </td>
                  </tr>
                ) : unifiedCoursesList.length > 0 ? (
                  unifiedCoursesList.map((course, idx) => (
                    <tr
                      key={course.id || idx}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-400">{idx + 1}</td>
                      <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-2.5">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            course.category === "Advanced" ? "bg-purple-500" : "bg-blue-500"
                          }`}
                        ></div>
                        <span>{course.title}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                            course.category === "Advanced"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {course.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center min-w-[32px] h-7 px-2 rounded-lg font-bold bg-slate-100 text-slate-700 font-mono">
                          {course.sessionsCount}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center min-w-[32px] h-7 px-2 rounded-lg font-bold bg-indigo-50 text-indigo-700 font-mono">
                          {course.currentMonthEnrollments}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center min-w-[32px] h-7 px-2 rounded-lg font-bold bg-cyan-50 text-cyan-700 font-mono">
                          {course.nextMonthEnrollments}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center min-w-[32px] h-7 px-2.5 rounded-lg font-black bg-slate-100 text-slate-800 font-mono">
                          {course.totalEnrollments}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <BookOpen className="w-8 h-8 text-slate-300 stroke-1" />
                        <p className="text-sm font-semibold text-slate-600">No courses match your criteria</p>
                        <p className="text-xs text-slate-400">
                          Try adjusting your search query or selecting a different tab.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>

              {/* Table Footer Totals */}
              {unifiedCoursesList.length > 0 && (
                <tfoot className="bg-slate-50/90 border-t-2 border-slate-200 font-bold text-slate-900 text-xs">
                  <tr>
                    <td className="px-6 py-4 text-slate-400">-</td>
                    <td className="px-6 py-4 uppercase tracking-wider text-slate-600">
                      Portfolio Aggregate ({unifiedCoursesList.length} Courses)
                    </td>
                    <td className="px-6 py-4 text-slate-400">-</td>
                    <td className="px-6 py-4 text-center font-mono">
                      {unifiedCoursesList.reduce((acc, c) => acc + c.sessionsCount, 0)}
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-indigo-700">
                      {unifiedCoursesList.reduce((acc, c) => acc + c.currentMonthEnrollments, 0)}
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-cyan-700">
                      {unifiedCoursesList.reduce((acc, c) => acc + c.nextMonthEnrollments, 0)}
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-slate-900">
                      {unifiedCoursesList.reduce((acc, c) => acc + c.totalEnrollments, 0)}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
