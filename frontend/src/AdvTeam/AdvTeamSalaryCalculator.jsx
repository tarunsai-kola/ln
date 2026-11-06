import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import {
  Calculator,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
  Target,
  Sliders,
  DollarSign,
  Users,
  Calendar,
  CheckSquare,
  TrendingUp,
  Receipt
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

const AdvTeamSalaryCalculator = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [assignedFormula, setAssignedFormula] = useState(null);
  const [memberAssignment, setMemberAssignment] = useState(null);

  // Month selector
  const now = new Date();
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const [selectedMonth, setSelectedMonth] = useState(currentMonthStr);

  // Actual live performance metrics for selected month (strictly fullPaid)
  const [liveMetrics, setLiveMetrics] = useState({
    fullPaidRevenue: 0,
    fullPaidDeals: 0,
    bookedRevenue: 0,
    totalAllDeals: 0
  });

  // FullPaid students list for transparency so sales person understands their revenue
  const [fullPaidStudents, setFullPaidStudents] = useState([]);

  // Simulator achievement state (ranges strictly from 0 to target)
  const [simulatedAchievement, setSimulatedAchievement] = useState(0);

  const advTeamName = localStorage.getItem("advTeamName") || "Sales Specialist";
  const advTeamEmail = localStorage.getItem("advTeamEmail") || "";
  const advTeamId = localStorage.getItem("advTeamId") || "";

  // Fetch assigned formula and current month live performance
  const fetchSalaryData = async (showToast = false) => {
    try {
      if (showToast) setRefreshing(true);
      else setLoading(true);

      // 1. Fetch assigned formula
      const formulaRes = await axios.get(`${API}/api/salary-calculator/my-formula`, {
        params: { email: advTeamEmail, memberId: advTeamId, fullname: advTeamName }
      });

      if (formulaRes.data.success) {
        setAssignedFormula(formulaRes.data.data);
        setMemberAssignment(formulaRes.data.memberAssignment);
      }

      // 2. Fetch live month summary (strictly fullPaid status)
      const summaryRes = await axios.get(`${API}/api/salary-calculator/salesperson-summary`, {
        params: {
          counselorName: advTeamName,
          email: advTeamEmail,
          month: selectedMonth
        }
      });

      if (summaryRes.data.success) {
        setLiveMetrics(summaryRes.data.metrics);
        setFullPaidStudents(summaryRes.data.fullPaidStudents || []);

        const formulaObj = summaryRes.data.formula || formulaRes.data.data;
        const targetVal = Number(memberAssignment?.customBaseTarget || formulaObj?.baseTarget || 200000);
        const actualVal = formulaObj?.metricType === "deals"
          ? summaryRes.data.metrics.fullPaidDeals
          : summaryRes.data.metrics.fullPaidRevenue;

        // Initialize simulator with actual achievement, capped strictly at target (not more than target)
        setSimulatedAchievement(Math.min(actualVal || 0, targetVal));
      }

      if (showToast) toast.success("Salary & target data synchronized!");
    } catch (err) {
      console.error("Error fetching salary calculator data:", err);
      toast.error("Failed to load salary details");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSalaryData();
  }, [selectedMonth]);

  // Determine effective base salary and target
  const effectiveBaseSalary = useMemo(() => {
    if (memberAssignment?.customBaseSalary != null) {
      return Number(memberAssignment.customBaseSalary);
    }
    return assignedFormula?.baseSalary || 25000;
  }, [memberAssignment, assignedFormula]);

  const effectiveBaseTarget = useMemo(() => {
    if (memberAssignment?.customBaseTarget != null) {
      return Number(memberAssignment.customBaseTarget);
    }
    return assignedFormula?.baseTarget || 200000;
  }, [memberAssignment, assignedFormula]);

  const metricType = assignedFormula?.metricType || "revenue";

  // Calculate actual earned salary for current month (strictly fullPaid)
  const actualAchievement = metricType === "deals"
    ? liveMetrics.fullPaidDeals
    : liveMetrics.fullPaidRevenue;

  const actualCalculation = useMemo(() => {
    if (!assignedFormula) return null;
    return computeSalary(actualAchievement, effectiveBaseSalary, effectiveBaseTarget, assignedFormula.payoutModel);
  }, [assignedFormula, actualAchievement, effectiveBaseSalary, effectiveBaseTarget]);

  // Calculate simulated payout (capped strictly at target)
  const simulatedCalculation = useMemo(() => {
    if (!assignedFormula) return null;
    const cappedSimulated = Math.min(simulatedAchievement, effectiveBaseTarget);
    return computeSalary(cappedSimulated, effectiveBaseSalary, effectiveBaseTarget, assignedFormula.payoutModel);
  }, [assignedFormula, simulatedAchievement, effectiveBaseSalary, effectiveBaseTarget]);

  // Pure salary calculation function (strictly target-based, NO INCENTIVES)
  function computeSalary(achievementVal, baseSalary, target, payoutModel) {
    const achievement = Number(achievementVal) || 0;
    const targetAchieved = target > 0 ? achievement >= target : true;
    const achievementPercent = target > 0 ? Math.round((achievement / target) * 1000) / 10 : 100;
    const remainingToTarget = Math.max(0, target - achievement);

    let earnedSalary = baseSalary;
    if (payoutModel === "guaranteed_base") {
      earnedSalary = baseSalary;
    } else {
      // Default: Target pro-rata (100% full salary if target reached, pro-rated if below)
      if (targetAchieved) {
        earnedSalary = baseSalary;
      } else {
        earnedSalary = target > 0 ? Math.round((achievement / target) * baseSalary) : baseSalary;
      }
    }

    return {
      baseSalary,
      target,
      achievement,
      achievementPercent,
      targetAchieved,
      remainingToTarget,
      earnedSalary,
      totalPayout: earnedSalary
    };
  }

  return (
    <div className="bg-[#070A12] min-h-screen font-sans ml-[280px] mt-[70px] p-4 sm:p-8 text-slate-100 relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Atmospheric ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-emerald-600/5 blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-indigo-600/10 blur-[160px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto space-y-8 relative z-10">

        {/* ========================================================= */}
        {/* EXECUTIVE HEADER */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 bg-[#0D1322] border border-slate-800/80 rounded-3xl shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-[2px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full rounded-[14px] bg-[#0F172A] flex items-center justify-center text-white font-black text-2xl">
                <Calculator className="w-7 h-7 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-black text-white tracking-tight">
                  Salary & Target Calculator
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-wider hidden sm:inline-block">
                  {assignedFormula?.name || "Official Target Plan"}
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-1">
                Your monthly base salary is calculated strictly based on candidates in <strong>FullPaid</strong> status
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400 text-[11px] font-bold">Billing Month:</span>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer"
              />
            </div>

            <button
              onClick={() => fetchSalaryData(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-slate-800 shadow-sm transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${refreshing ? "animate-spin text-blue-400" : ""}`} />
              <span>Sync</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 font-bold text-sm">Loading your salary & target data...</p>
          </div>
        ) : (
          <>
            {/* ========================================================= */}
            {/* SECTION 1: ASSIGNED SALARY & TARGET PLAN BANNER */}
            {/* ========================================================= */}
            <div className="bg-[#0D1322] border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-400">
                      Assigned Salary & Target Plan
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-white mt-1">
                    {assignedFormula?.name || "Standard Target & Salary Structure"}
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Revenue is recognized and counted towards your target only when candidates are in <strong>FullPaid</strong> status.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold">
                    Specialist: <strong className="text-white">{advTeamName}</strong>
                  </span>
                </div>
              </div>

              {/* Base Numbers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Monthly Base Salary
                  </span>
                  <span className="text-2xl font-black text-white mt-1 block">
                    {formatINR(effectiveBaseSalary)}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Full compensation upon reaching 100% of target
                  </span>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    FullPaid Monthly Target
                  </span>
                  <span className="text-2xl font-black text-indigo-400 mt-1 block">
                    {metricType === "deals" ? `${effectiveBaseTarget} Closed Deals` : formatINR(effectiveBaseTarget)}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Target is calculated strictly from candidates in FullPaid status
                  </span>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Target Completion Status
                  </span>
                  <span
                    className={`text-2xl font-black mt-1 block ${
                      actualCalculation?.targetAchieved ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    {actualCalculation?.achievementPercent}%
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    {actualCalculation?.targetAchieved
                      ? "Target Achieved! Full Salary Unlocked"
                      : `${formatINR(actualCalculation?.remainingToTarget)} more FullPaid revenue needed`}
                  </span>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* SECTION 2: LIVE FULLPAID PERFORMANCE BREAKDOWN */}
            {/* ========================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Target Progress & Detailed FullPaid Students */}
              <div className="lg:col-span-2 bg-[#0D1322] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-white">
                      Actual FullPaid Performance ({selectedMonth})
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Only students in fullPaid status are counted towards your revenue and target
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 self-start sm:self-center ${
                      actualCalculation?.targetAchieved
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {actualCalculation?.targetAchieved ? (
                      <>
                        <CheckCircle2 size={14} /> 100% Target Met
                      </>
                    ) : (
                      <>
                        <AlertCircle size={14} /> In Progress
                      </>
                    )}
                  </span>
                </div>

                {/* Progress Bar towards Target */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">
                      FullPaid Revenue Achieved:{" "}
                      <strong className="text-white">{formatINR(actualAchievement)}</strong>
                    </span>
                    <span className="text-indigo-400 font-black">
                      Target: {formatINR(effectiveBaseTarget)} ({actualCalculation?.achievementPercent}%)
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        actualCalculation?.targetAchieved
                          ? "bg-gradient-to-r from-indigo-500 to-emerald-400"
                          : "bg-gradient-to-r from-blue-600 to-indigo-500"
                      }`}
                      style={{ width: `${Math.min(100, actualCalculation?.achievementPercent || 0)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Performance Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">FullPaid Revenue</span>
                    <span className="text-base font-black text-emerald-400 mt-1 block">
                      {formatINR(liveMetrics.fullPaidRevenue)}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">Recognized Revenue</span>
                  </div>

                  <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">FullPaid Candidates</span>
                    <span className="text-base font-black text-white mt-1 block">
                      {liveMetrics.fullPaidDeals} Students
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">100% Cleared Fees</span>
                  </div>

                  <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Remaining Target</span>
                    <span className="text-base font-black text-amber-400 mt-1 block">
                      {actualCalculation?.targetAchieved ? "₹0" : formatINR(actualCalculation?.remainingToTarget)}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">Needed for 100% Target</span>
                  </div>
                </div>

                {/* FullPaid Candidates List (Transparency for Sales Person) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Receipt size={14} className="text-indigo-400" />
                      Your FullPaid Candidates This Month ({fullPaidStudents.length})
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">
                      Counted towards your target
                    </span>
                  </div>

                  {fullPaidStudents.length === 0 ? (
                    <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800 text-center">
                      <p className="text-xs text-slate-400">
                        No candidate enrollments with status <strong>fullPaid</strong> yet for {selectedMonth}.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
                          <tr>
                            <th className="py-2.5 px-3">Student Name</th>
                            <th className="py-2.5 px-3">Program</th>
                            <th className="py-2.5 px-3">Status</th>
                            <th className="py-2.5 px-3 text-right">Amount Credited</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/80">
                          {fullPaidStudents.map((st) => (
                            <tr key={st.id} className="hover:bg-slate-800/40">
                              <td className="py-2.5 px-3 font-semibold text-white">
                                {st.fullname}
                                {st.phone && <span className="block text-[10px] text-slate-400">{st.phone}</span>}
                              </td>
                              <td className="py-2.5 px-3 text-slate-300">{st.program || "Advanced Course"}</td>
                              <td className="py-2.5 px-3">
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black">
                                  fullPaid
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-right font-black text-emerald-400">
                                {formatINR(st.paidAmount)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Right 1 Col: Current Month Calculated Salary Summary */}
              <div className="bg-gradient-to-b from-[#141C33] to-[#0D1322] border border-indigo-500/30 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-300">
                      Monthly Calculated Salary
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400 block">Current Earned Salary</span>
                  <h3 className="text-3xl font-black text-white mt-1">
                    {formatINR(actualCalculation?.earnedSalary || effectiveBaseSalary)}
                  </h3>

                  <div className="space-y-3 mt-6 pt-6 border-t border-slate-800">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Base Salary:</span>
                      <span className="font-bold text-slate-200">{formatINR(effectiveBaseSalary)}</span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">FullPaid Target:</span>
                      <span className="font-bold text-slate-200">{formatINR(effectiveBaseTarget)}</span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Target Achieved:</span>
                      <span
                        className={`font-black ${
                          actualCalculation?.targetAchieved ? "text-emerald-400" : "text-amber-400"
                        }`}
                      >
                        {actualCalculation?.achievementPercent}%
                      </span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Target Status:</span>
                      <span className="font-bold text-slate-200">
                        {actualCalculation?.targetAchieved ? "100% Target Met ✓" : "In Progress"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <span className="text-[11px] text-slate-400 block text-center">
                    Salary is paid at the end of the monthly billing cycle.
                  </span>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* SECTION 3: SIMULATOR (SHOWS TILL TARGET, NOT MORE THAN THAT) */}
            {/* ========================================================= */}
            <div className="bg-[#0D1322] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20">
                    <Sliders className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">Target Achievement Simulator</h3>
                    <p className="text-xs text-slate-400">
                      Move the slider to simulate FullPaid revenue up to your target ({formatINR(effectiveBaseTarget)})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSimulatedAchievement(Math.min(actualAchievement, effectiveBaseTarget))}
                  className="text-xs text-slate-400 hover:text-white font-bold px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800"
                >
                  Reset to Actuals
                </button>
              </div>

              {/* Interactive Slider Capped Strictly at Target */}
              <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <label className="text-xs font-bold text-slate-300">
                    Simulate Achievement (Up to Target: {formatINR(effectiveBaseTarget)}):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step={metricType === "deals" ? 1 : 5000}
                      min="0"
                      max={effectiveBaseTarget}
                      value={simulatedAchievement}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        // Capped strictly at target, not more than that
                        setSimulatedAchievement(Math.min(Math.max(0, val), effectiveBaseTarget));
                      }}
                      className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-base font-black text-indigo-400 text-right w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                {/* Slider strictly up to effectiveBaseTarget, NOT more than that */}
                <input
                  type="range"
                  min="0"
                  max={effectiveBaseTarget}
                  step={metricType === "deals" ? 1 : 2500}
                  value={simulatedAchievement}
                  onChange={(e) => setSimulatedAchievement(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-bold">
                  <span>₹0 (0%)</span>
                  <span>50% Target: {formatINR(effectiveBaseTarget / 2)}</span>
                  <span className="text-emerald-400 font-black">100% Target: {formatINR(effectiveBaseTarget)}</span>
                </div>
              </div>

              {/* Simulation Output Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Base Salary</span>
                  <span className="text-xl font-black text-white mt-1 block">
                    {formatINR(effectiveBaseSalary)}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Full Monthly Pay</span>
                </div>

                <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Target Completion</span>
                  <span
                    className={`text-xl font-black mt-1 block ${
                      simulatedCalculation?.targetAchieved ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    {simulatedCalculation?.achievementPercent}%
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    {simulatedCalculation?.targetAchieved ? "100% Target Met" : "Below Target"}
                  </span>
                </div>

                <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Remaining to Target</span>
                  <span className="text-xl font-black text-amber-400 mt-1 block">
                    {simulatedCalculation?.targetAchieved ? "₹0" : formatINR(simulatedCalculation?.remainingToTarget)}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">FullPaid Revenue Needed</span>
                </div>

                <div className="bg-gradient-to-r from-indigo-950/80 to-blue-950/80 p-4 rounded-2xl border border-indigo-500/30 text-center">
                  <span className="text-[10px] text-indigo-300 uppercase font-black block">Projected Salary</span>
                  <span className="text-xl font-black text-indigo-200 mt-1 block">
                    {formatINR(simulatedCalculation?.earnedSalary)}
                  </span>
                  <span className="text-[10px] text-indigo-400 mt-0.5 block">
                    {simulatedCalculation?.targetAchieved ? "Full Salary Unlocked ✓" : "Pro-Rated to Target"}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdvTeamSalaryCalculator;
