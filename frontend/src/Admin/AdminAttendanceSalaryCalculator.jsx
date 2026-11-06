import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import {
  Calculator,
  Calendar,
  Clock,
  UserCheck,
  DollarSign,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Download,
  RefreshCw,
  Sliders,
  Settings,
  HelpCircle,
  Eye,
  X,
  FileSpreadsheet,
  Save,
  Users,
  CalendarX
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

const AdminAttendanceSalaryCalculator = () => {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  );

  // Formula settings state (Admin configures deductions)
  const [formulaConfig, setFormulaConfig] = useState({
    workingDays: 26,
    leaveDeductionType: "fixed", // "fixed" | "pro_rata"
    leaveDeductionAmount: 500,
    halfDayDeductionType: "fixed", // "fixed" | "half_of_leave"
    halfDayDeductionAmount: 250,
    lateDeductionAmount: 100,
    graceLateDays: 2
  });

  const [loading, setLoading] = useState(false);
  const [savingConfig, setSavingConfig] = useState(false);
  const [salaryResults, setSalaryResults] = useState([]);
  const [calendarMeta, setCalendarMeta] = useState(null);
  const [evaluationMode, setEvaluationMode] = useState("elapsed"); // "elapsed" | "full_month"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDetailUser, setSelectedDetailUser] = useState(null);

  const isCurrentMonth = useMemo(() => {
    const curYear = now.getFullYear();
    const curMonth = String(now.getMonth() + 1).padStart(2, "0");
    return selectedMonth === `${curYear}-${curMonth}`;
  }, [selectedMonth]);

  // Fetch saved attendance formula configuration
  const fetchFormulaConfig = async () => {
    try {
      const res = await axios.get(`${API}/api/salary-calculator/attendance-config`);
      if (res.data.success && res.data.data) {
        setFormulaConfig((prev) => ({ ...prev, ...res.data.data }));
      }
    } catch (err) {
      console.error("Error fetching formula config:", err);
    }
  };

  // Run Attendance Salary Calculation
  const handleCalculateSalaries = async (showToast = true, modeOverride = null) => {
    setLoading(true);
    try {
      const mode = modeOverride !== null ? modeOverride : evaluationMode;
      const res = await axios.post(`${API}/api/salary-calculator/calculate-attendance-salaries`, {
        month: selectedMonth,
        evaluationMode: mode,
        ...formulaConfig
      });

      if (res.data.success) {
        setSalaryResults(res.data.data || []);
        if (res.data.calendar) {
          setCalendarMeta(res.data.calendar);
        }
        if (showToast) {
          toast.success(`Calculated attendance salaries for ${res.data.data?.length || 0} employees!`);
        }
      }
    } catch (err) {
      console.error("Error calculating attendance salaries:", err);
      toast.error(err.response?.data?.message || "Failed to calculate attendance salaries");
    } finally {
      setLoading(false);
    }
  };

  // Save current deduction formula settings
  const handleSaveConfig = async () => {
    setSavingConfig(true);
    try {
      const res = await axios.post(`${API}/api/salary-calculator/attendance-config`, formulaConfig);
      if (res.data.success) {
        toast.success("Deduction formula settings saved successfully!");
      }
    } catch (err) {
      console.error("Error saving config:", err);
      toast.error("Failed to save settings");
    } finally {
      setSavingConfig(false);
    }
  };

  useEffect(() => {
    fetchFormulaConfig();
  }, []);

  useEffect(() => {
    const curYear = now.getFullYear();
    const curMonth = String(now.getMonth() + 1).padStart(2, "0");
    const isCurrent = selectedMonth === `${curYear}-${curMonth}`;
    const targetMode = isCurrent ? "elapsed" : "full_month";
    setEvaluationMode(targetMode);
    handleCalculateSalaries(false, targetMode);
  }, [selectedMonth]);

  // Filtered results
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return salaryResults;
    const q = searchQuery.toLowerCase().trim();
    return salaryResults.filter(
      (item) =>
        (item.name || "").toLowerCase().includes(q) ||
        (item.email || "").toLowerCase().includes(q) ||
        (item.role || "").toLowerCase().includes(q) ||
        (item.team || "").toLowerCase().includes(q)
    );
  }, [salaryResults, searchQuery]);

  // Overall Totals
  const totals = useMemo(() => {
    let totalGross = 0;
    let totalLeaveDeductions = 0;
    let totalHalfDayDeductions = 0;
    let totalLateDeductions = 0;
    let totalDeductions = 0;
    let totalNet = 0;

    salaryResults.forEach((item) => {
      const base = Number(item.baseSalary) || 0;
      totalGross += base;

      const rawLeave = Number(item.deductions?.leaveDeduction) || 0;
      const rawHalf = Number(item.deductions?.halfDayDeduction) || 0;
      const rawLate = Number(item.deductions?.lateDeduction) || 0;
      const otherDeds = rawHalf + rawLate;

      // Ensure leave deduction cannot exceed what's payable
      const actualLeaveDeduction = Math.min(Math.max(0, base - otherDeds), rawLeave);
      const actualTotalDeduction = Math.min(base, rawLeave + otherDeds);

      totalLeaveDeductions += actualLeaveDeduction;
      totalHalfDayDeductions += rawHalf;
      totalLateDeductions += rawLate;
      totalDeductions += actualTotalDeduction;
      totalNet += Number(item.netSalary) || 0;
    });

    return {
      totalGross,
      totalLeaveDeductions,
      totalHalfDayDeductions,
      totalLateDeductions,
      totalDeductions,
      totalNet,
      employeeCount: salaryResults.length
    };
  }, [salaryResults]);

  // Export to CSV
  const handleExportCSV = () => {
    if (salaryResults.length === 0) {
      toast.error("No salary data to export");
      return;
    }

    const headers = [
      "Employee Name",
      "Email",
      "Role",
      "Team",
      "Base Salary",
      "Target (For Reference)",
      "Target Achieved",
      "Working Days",
      "Days Present",
      "Approved Paid Leaves (Quota)",
      "Unpaid Leaves (Deducted)",
      "Leave Deduction",
      "Half Days",
      "Half Day Deduction",
      "Late Days",
      "Late Deduction",
      "Total Deductions",
      "Net Payable Salary"
    ];

    const rows = salaryResults.map((u) => [
      `"${u.name}"`,
      `"${u.email}"`,
      `"${u.role}"`,
      `"${u.team}"`,
      u.baseSalary,
      u.target,
      u.achievedSales,
      u.attendance?.workingDays,
      u.attendance?.daysPresent,
      u.attendance?.approvedPaidLeaves || 0,
      u.attendance?.totalUnpaidLeaves !== undefined ? u.attendance.totalUnpaidLeaves : (u.attendance?.leavesCount || 0),
      u.deductions?.leaveDeduction,
      u.attendance?.halfDayCount,
      u.deductions?.halfDayDeduction,
      u.attendance?.lateCount,
      u.deductions?.lateDeduction,
      u.deductions?.totalDeductions,
      u.netSalary
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Attendance_Salaries_${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Attendance payroll CSV downloaded!");
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans ml-[280px] mt-[70px] p-6 sm:p-8 text-slate-800">
      <Toaster position="top-center" reverseOrder={false} />

      {/* ========================================================= */}
      {/* HEADER SECTION */}
      {/* ========================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Calculator className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Attendance Salary Calculator (/attendcal)
              </h1>
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                Attendance Driven
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1">
              Admin formula deductions for Leaves, Half Days, and Late Logins. Salary is calculated strictly from attendance — independent of sales credit targets.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/SalaryCalculator"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
          >
            <Calculator className="w-3.5 h-3.5 text-slate-500" />
            <span>Target Salary Plans</span>
          </Link>

          <Link
            to="/admin/absent-requests"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl border border-amber-200 transition"
          >
            <CalendarX className="w-3.5 h-3.5 text-amber-600" />
            <span>Absent Requests</span>
          </Link>

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
            onClick={() => handleCalculateSalaries(true)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-black rounded-xl shadow-md transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Calculate</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: ADMIN FORMULA CONTROLS PANEL */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 mb-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-base font-black text-slate-900">Attendance Deduction Formula Settings</h2>
              <p className="text-xs text-slate-500">
                Set how much to deduct per Leave, Half Day, and Late Login. Press "Calculate" to apply to all attendance logs.
              </p>
            </div>
          </div>

          <button
            onClick={handleSaveConfig}
            disabled={savingConfig}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-sm transition disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savingConfig ? "Saving..." : "Save Formula"}</span>
          </button>
        </div>

        {/* Evaluation Mode Switcher & Explanation */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50/70 via-blue-50/50 to-slate-50 border border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-xs">
                  {isCurrentMonth ? "Ongoing Current Month" : "Selected Month"}: {selectedMonth}
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  evaluationMode === "elapsed"
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-indigo-100 text-indigo-800 border border-indigo-200"
                }`}>
                  {evaluationMode === "elapsed" ? "Month-to-Date Active" : "Full Month Active"}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {evaluationMode === "elapsed" ? (
                  <>
                    Evaluating <strong>{calendarMeta?.elapsedWorkingDays || 3} elapsed working days</strong> up to today. Employees are NOT penalized for upcoming unelapsed days in {selectedMonth}.
                  </>
                ) : (
                  <>
                    Evaluating <strong>{formulaConfig.workingDays || 26} full-month working days</strong>. Unrecorded upcoming days will be calculated as absences.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-xs flex-shrink-0">
            <button
              type="button"
              onClick={() => {
                setEvaluationMode("elapsed");
                handleCalculateSalaries(false, "elapsed");
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                evaluationMode === "elapsed"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Month-to-Date ({calendarMeta?.elapsedWorkingDays || 3} Working Days)
            </button>
            <button
              type="button"
              onClick={() => {
                setEvaluationMode("full_month");
                handleCalculateSalaries(false, "full_month");
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                evaluationMode === "full_month"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Full Month ({formulaConfig.workingDays || 26} Days)
            </button>
          </div>
        </div>

        {/* Formula Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 1. Working Days */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Working Days in Month
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={formulaConfig.workingDays}
              onChange={(e) =>
                setFormulaConfig({ ...formulaConfig, workingDays: Number(e.target.value) })
              }
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-black text-slate-800 focus:outline-none"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              {evaluationMode === "elapsed"
                ? `Evaluating: ${calendarMeta?.elapsedWorkingDays || 3} elapsed days so far`
                : `Full month: ${formulaConfig.workingDays} standard days`}
            </span>
          </div>

          {/* 2. Full Day Leave Deduction */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Full Day Leave Deduction
              </label>
              <select
                value={formulaConfig.leaveDeductionType}
                onChange={(e) =>
                  setFormulaConfig({ ...formulaConfig, leaveDeductionType: e.target.value })
                }
                className="text-[10px] bg-white border border-slate-200 rounded-md font-bold px-1.5 py-0.5"
              >
                <option value="fixed">Fixed ₹</option>
                <option value="pro_rata">Pro-Rata (Base/Days)</option>
              </select>
            </div>

            {formulaConfig.leaveDeductionType === "fixed" ? (
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">₹</span>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={formulaConfig.leaveDeductionAmount}
                  onChange={(e) =>
                    setFormulaConfig({
                      ...formulaConfig,
                      leaveDeductionAmount: Number(e.target.value)
                    })
                  }
                  className="w-full pl-7 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-black text-rose-600 focus:outline-none"
                />
              </div>
            ) : (
              <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-xl text-[11px] font-semibold text-indigo-700">
                Auto: Base Salary / Working Days
              </div>
            )}
            <span className="text-[10px] text-slate-400 block">Subtracted for each leave day</span>
          </div>

          {/* 3. Half Day Deduction */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Half Day Deduction
              </label>
              <select
                value={formulaConfig.halfDayDeductionType}
                onChange={(e) =>
                  setFormulaConfig({ ...formulaConfig, halfDayDeductionType: e.target.value })
                }
                className="text-[10px] bg-white border border-slate-200 rounded-md font-bold px-1.5 py-0.5"
              >
                <option value="fixed">Fixed ₹</option>
                <option value="half_of_leave">50% of Leave</option>
              </select>
            </div>

            {formulaConfig.halfDayDeductionType === "fixed" ? (
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">₹</span>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={formulaConfig.halfDayDeductionAmount}
                  onChange={(e) =>
                    setFormulaConfig({
                      ...formulaConfig,
                      halfDayDeductionAmount: Number(e.target.value)
                    })
                  }
                  className="w-full pl-7 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-black text-amber-600 focus:outline-none"
                />
              </div>
            ) : (
              <div className="p-2 bg-amber-50 border border-amber-100 rounded-xl text-[11px] font-semibold text-amber-800">
                Auto: 50% of 1 Day Leave
              </div>
            )}
            <span className="text-[10px] text-slate-400 block">Subtracted for each half day</span>
          </div>

          {/* 4. Late Login Deduction */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Late Login Deduction
              </label>
              <span className="text-[10px] text-slate-500 font-bold">
                Grace: {formulaConfig.graceLateDays} Free
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-[10px] font-bold text-slate-400">₹</span>
                <input
                  type="number"
                  min="0"
                  value={formulaConfig.lateDeductionAmount}
                  onChange={(e) =>
                    setFormulaConfig({
                      ...formulaConfig,
                      lateDeductionAmount: Number(e.target.value)
                    })
                  }
                  className="w-full pl-5 pr-2 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-800 focus:outline-none"
                  placeholder="₹/late"
                />
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formulaConfig.graceLateDays}
                  onChange={(e) =>
                    setFormulaConfig({
                      ...formulaConfig,
                      graceLateDays: Number(e.target.value)
                    })
                  }
                  className="w-full px-2 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-800 focus:outline-none text-center"
                  placeholder="Grace days"
                />
              </div>
            </div>
            <span className="text-[10px] text-slate-400 block">
              Deducted per late login after {formulaConfig.graceLateDays} free grace days
            </span>
          </div>
        </div>

        {/* Business Logic Rule Card */}
        <div className="flex items-center gap-3 p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-xs text-indigo-900">
          <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
          <div>
            <strong>Attendance Salary Rule:</strong> For example, if Base Salary is <strong>₹10,000</strong> and Target is <strong>₹80,000</strong>: even if the person closed only <strong>₹10,000</strong> (or ₹0) towards target, they receive the full Base Salary minus their attendance deductions:
            <span className="font-mono font-bold block mt-0.5 text-indigo-700">
              Net Payable = Base Salary (₹10,000) - Leaves (Leaves × ₹{formulaConfig.leaveDeductionAmount}) - Half Days (HalfDays × ₹{formulaConfig.halfDayDeductionAmount}) - Late Logins
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 2: EXECUTIVE KPI METRIC CARDS */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Base Salaries</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{formatINR(totals.totalGross)}</h3>
          <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
            {totals.employeeCount} Evaluated Staff Members
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Leave Deductions</p>
          <h3 className="text-2xl font-black text-rose-600 mt-1">-{formatINR(totals.totalLeaveDeductions)}</h3>
          <span className="text-[11px] text-rose-600 font-semibold mt-1 block">
            Full-day absent deductions
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Half-Day & Late Deductions</p>
          <h3 className="text-2xl font-black text-amber-600 mt-1">
            -{formatINR(totals.totalHalfDayDeductions + totals.totalLateDeductions)}
          </h3>
          <span className="text-[11px] text-amber-600 font-semibold mt-1 block">
            Half days + late login penalties
          </span>
        </div>

        <div className="bg-indigo-900 text-white p-5 rounded-2xl shadow-lg shadow-indigo-900/20">
          <p className="text-xs font-bold text-indigo-200 uppercase tracking-wider">Net Payable Payroll</p>
          <h3 className="text-2xl font-black text-emerald-400 mt-1">{formatINR(totals.totalNet)}</h3>
          <span className="text-[11px] text-indigo-200 font-medium mt-1 block">
            Total Net Salary After Deductions
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 3: SALARY BREAKDOWN TABLE */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              Staff Attendance & Salary Calculation Sheet ({selectedMonth})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review individual present days, leave deductions, and net salary. Click on any employee to view daily check-in logs.
            </p>
          </div>

          <div className="w-72">
            <input
              type="text"
              placeholder="Search employee name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-slate-500 font-bold text-xs">Computing attendance reports and deductions...</p>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No employee records found for {selectedMonth}.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3">Employee</th>
                  <th className="py-3 px-3">Base Salary</th>
                  <th className="py-3 px-3">Target & Sales (Ref)</th>
                  <th className="py-3 px-3 text-center">Present / Working</th>
                  <th className="py-3 px-3 text-center">Leaves (Deduction)</th>
                  <th className="py-3 px-3 text-center">Half Days (Deduction)</th>
                  <th className="py-3 px-3 text-center">Late Logins (Deduction)</th>
                  <th className="py-3 px-3 text-right">Total Deductions</th>
                  <th className="py-3 px-3 text-right font-black text-slate-900">Net Payable Salary</th>
                  <th className="py-3 px-3 text-center">Log</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredResults.map((u, idx) => {
                  const att = u.attendance || {};
                  const ded = u.deductions || {};

                  return (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      {/* Name & Role */}
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{u.name}</div>
                        <div className="text-[11px] text-slate-400">
                          {u.email} • {u.team}
                        </div>
                      </td>

                      {/* Base Salary */}
                      <td className="py-3 px-3 font-bold text-slate-800 text-sm">
                        {formatINR(u.baseSalary)}
                      </td>

                      {/* Target & Sales (Ref) */}
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-700">Target: {formatINR(u.target)}</div>
                        <div className="text-[11px] text-slate-500">
                          Sales: {formatINR(u.achievedSales)} <span className="text-[10px] text-indigo-600">(Target Not Dep.)</span>
                        </div>
                      </td>

                      {/* Present / Working */}
                      <td className="py-3 px-3 text-center">
                        <span className="font-bold text-slate-800">
                          {att.daysPresent} / {att.workingDays}
                        </span>
                        <span className="block text-[10px] text-emerald-600 font-semibold">
                          {att.onTimeCount} on time
                        </span>
                      </td>

                      {/* Leaves & Deduction */}
                      <td className="py-3 px-3 text-center">
                        <span className="font-bold text-slate-800">
                          {att.totalUnpaidLeaves !== undefined ? att.totalUnpaidLeaves : att.leavesCount} unpaid
                        </span>
                        {att.approvedPaidLeaves > 0 && (
                          <span className="block text-[10px] text-emerald-600 font-black">
                            {att.approvedPaidLeaves} Paid Leave (₹0 Ded)
                          </span>
                        )}
                        {ded.leaveDeduction > 0 && (
                          <span className="block text-[10px] text-rose-600 font-black">
                            -{formatINR(ded.leaveDeduction)}
                          </span>
                        )}
                      </td>

                      {/* Half Days & Deduction */}
                      <td className="py-3 px-3 text-center">
                        <span className="font-bold text-slate-800">{att.halfDayCount} days</span>
                        {ded.halfDayDeduction > 0 && (
                          <span className="block text-[10px] text-amber-600 font-black">
                            -{formatINR(ded.halfDayDeduction)}
                          </span>
                        )}
                      </td>

                      {/* Late Days & Deduction */}
                      <td className="py-3 px-3 text-center">
                        <span className="font-bold text-slate-800">
                          {att.lateCount} late
                        </span>
                        {ded.lateDeduction > 0 ? (
                          <span className="block text-[10px] text-rose-600 font-black">
                            -{formatINR(ded.lateDeduction)} ({att.billableLate} over grace)
                          </span>
                        ) : (
                          <span className="block text-[10px] text-slate-400">Within grace</span>
                        )}
                      </td>

                      {/* Total Deductions */}
                      <td className="py-3 px-3 text-right font-black text-rose-600">
                        {ded.totalDeductions > 0 ? `-${formatINR(ded.totalDeductions)}` : "₹0"}
                      </td>

                      {/* Net Payable Salary */}
                      <td className="py-3 px-3 text-right">
                        <span className="font-black text-slate-900 text-base">
                          {formatINR(u.netSalary)}
                        </span>
                      </td>

                      {/* View Daily Log Modal */}
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => setSelectedDetailUser(u)}
                          className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="View Attendance Log"
                        >
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL: INDIVIDUAL ATTENDANCE LOG */}
      {/* ========================================================= */}
      {selectedDetailUser && (
        <div className="fixed inset-0 z-[1200] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-base font-black text-slate-900">{selectedDetailUser.name}</h3>
                <p className="text-xs text-slate-500">
                  {selectedDetailUser.email} • Base Salary: {formatINR(selectedDetailUser.baseSalary)} • Net:{" "}
                  <strong className="text-indigo-600">{formatINR(selectedDetailUser.netSalary)}</strong>
                </p>
              </div>
              <button
                onClick={() => setSelectedDetailUser(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {/* Attendance Stats Strip */}
            <div className="p-4 grid grid-cols-4 gap-2 bg-slate-100/70 border-b border-slate-200 text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Present</span>
                <span className="font-black text-slate-800">{selectedDetailUser.attendance?.daysPresent}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Leaves</span>
                <span className="font-black text-rose-600">
                  {selectedDetailUser.attendance?.leavesCount} (-{formatINR(selectedDetailUser.deductions?.leaveDeduction)})
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Half Days</span>
                <span className="font-black text-amber-600">
                  {selectedDetailUser.attendance?.halfDayCount} (-{formatINR(selectedDetailUser.deductions?.halfDayDeduction)})
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Late</span>
                <span className="font-black text-slate-800">
                  {selectedDetailUser.attendance?.lateCount} (-{formatINR(selectedDetailUser.deductions?.lateDeduction)})
                </span>
              </div>
            </div>

            {/* Daily Records List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {(selectedDetailUser.detailedRecords || []).length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No attendance records logged for this employee in {selectedMonth}.
                </div>
              ) : (
                selectedDetailUser.detailedRecords.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar size={13} className="text-slate-400" />
                      <span className="font-bold text-slate-800">{r.date}</span>
                      <span className="text-[11px] text-slate-400">({r.time} IST)</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        r.status === "Present"
                          ? "bg-emerald-100 text-emerald-800"
                          : r.status === "Late"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedDetailUser(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAttendanceSalaryCalculator;
