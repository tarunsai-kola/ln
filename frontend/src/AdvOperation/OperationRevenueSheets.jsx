import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import {
  TrendingUp,
  Wallet,
  CheckCircle2,
  Clock,
  CalendarDays,
  BarChart3,
  Receipt,
  IndianRupee,
  RefreshCw,
  Sparkles,
  PieChart,
  Calendar,
  AlertTriangle,
  ArrowUpRight
} from "lucide-react";

const formatINR = (val) => {
  const num = Number(val) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(num);
};

const OperationRevenueSheets = () => {
  const [newStudent, setNewStudent] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("daily"); // 'daily' | 'monthly'

  const operationName = localStorage.getItem("advOperationName") || "Operations";

  const fetchNewStudent = async (showToast = false) => {
    if (showToast) setIsRefreshing(true);
    const opName = localStorage.getItem("advOperationName");
    try {
      const response = await axios.get(`${API}/getadvenrolls?all=true`);
      const dataArray = response.data.data || response.data || [];
      const filteredData = Array.isArray(dataArray)
        ? dataArray.filter(
            (item) => item.operationName && item.operationName === opName
          )
        : [];
      setNewStudent(filteredData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch revenue records.");
      console.error("Error fetching revenue enrollments:", err);
    } finally {
      setLoading(false);
      if (showToast) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  };

  useEffect(() => {
    fetchNewStudent();
  }, []);

  // Compute Revenue Aggregations
  const { revenueByDay, revenueByMonth, totalRevenue, totalCredited, totalPending } = useMemo(() => {
    const revDay = {};
    const revMonth = {};
    let totRev = 0;
    let totCred = 0;
    let totPend = 0;

    newStudent.forEach((student) => {
      const createdDate = new Date(student.createdAt);
      const date = createdDate.toLocaleDateString("en-GB");
      const month = createdDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      const revenue = student.programPrice || 0;
      const bookedAmount = student.paidAmount || 0;
      const credited =
        student.status === "fullPaid" ||
        (Array.isArray(student.remark) &&
          student.remark[student.remark.length - 1] === "Half_Cleared")
          ? student.paidAmount || 0
          : 0;
      const pending = Math.max(0, revenue - credited);

      if (!revDay[date]) {
        revDay[date] = {
          total: 0,
          booked: 0,
          credited: 0,
          pending: 0,
          month,
          defaultPercentage: 0,
          count: 0
        };
      }
      if (!revMonth[month]) {
        revMonth[month] = {
          total: 0,
          booked: 0,
          credited: 0,
          pending: 0,
          month,
          defaultPercentage: 0,
          count: 0
        };
      }

      revDay[date].total += revenue;
      revDay[date].booked += bookedAmount;
      revDay[date].credited += credited;
      revDay[date].pending += pending;
      revDay[date].count += 1;

      // Cutoff calculation: 8th of next month
      const [monthName, yearStr] = month.split(" ");
      const monthIndex = new Date(`${monthName} 1, ${yearStr}`).getMonth();
      const year = parseInt(yearStr);
      const cutoffDate = new Date(year, monthIndex + 1, 8);

      if (createdDate <= cutoffDate) {
        revMonth[month].credited += credited;
      }

      revMonth[month].total += revenue;
      revMonth[month].booked += bookedAmount;
      revMonth[month].pending += pending;
      revMonth[month].count += 1;

      revDay[date].defaultPercentage =
        revDay[date].total > 0
          ? ((revDay[date].pending / revDay[date].total) * 100).toFixed(1)
          : "0.0";

      revMonth[month].defaultPercentage =
        revMonth[month].total > 0
          ? ((revMonth[month].pending / revMonth[month].total) * 100).toFixed(1)
          : "0.0";

      totRev += revenue;
      totCred += credited;
      totPend += pending;
    });

    return {
      revenueByDay: revDay,
      revenueByMonth: revMonth,
      totalRevenue: totRev,
      totalCredited: totCred,
      totalPending: totPend
    };
  }, [newStudent]);

  const getLastNMonths = (n) => {
    const result = [];
    const today = new Date();
    for (let i = 0; i < n; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthString = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      result.push(monthString);
    }
    return result;
  };

  const monthsToShow = getLastNMonths(6);
  const months = monthsToShow.filter((m) => revenueByMonth[m]);
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const activeSelectedMonth = selectedMonth || currentMonth;

  const filteredDailyRevenue = useMemo(() => {
    return Object.entries(revenueByDay).filter(
      ([, data]) => data.month === activeSelectedMonth
    );
  }, [revenueByDay, activeSelectedMonth]);

  const currentMonthStats = revenueByMonth[activeSelectedMonth] || {
    total: 0,
    credited: 0,
    pending: 0,
    defaultPercentage: "0.0"
  };

  const overallCollectionRate =
    totalRevenue > 0 ? Math.round((totalCredited / totalRevenue) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans ml-[260px] mt-[70px] p-8 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-bold tracking-wide text-sm">Calculating operations revenue ledgers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans ml-[260px] mt-[70px] p-6 lg:p-8">
      <Toaster position="top-center" reverseOrder={false} />

      {/* ── Executive Header Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D] text-white p-7 md:p-8 shadow-xl shadow-slate-900/10 mb-8 border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                Operations Financial Ledger
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
                <Calendar size={13} className="text-slate-500" />
                Audit Period: {activeSelectedMonth}
              </span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
                Advance Operations Revenue Sheet
                <Sparkles size={20} className="text-teal-400 hidden sm:inline" />
              </h1>
              <p className="text-slate-400 text-xs md:text-sm font-normal max-w-xl">
                Daily and monthly revenue accruals, credited collections, outstanding balances, and default loss percentages.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
            <button
              onClick={() => fetchNewStudent(true)}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Refresh ledger"
            >
              <RefreshCw size={14} className={isRefreshing ? "animate-spin text-teal-400" : "text-slate-400"} />
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </button>
          </div>
        </div>

        {/* 4 Executive Metric Cards */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-slate-400 font-semibold block text-[11px]">Cumulative Booked</span>
            <span className="text-xl font-black text-white mt-0.5 block">{formatINR(totalRevenue)}</span>
            <span className="text-[10px] text-slate-400 mt-1 block">All-time Portfolio</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-emerald-400 font-semibold block text-[11px]">Credited Realized</span>
            <span className="text-xl font-black text-emerald-400 mt-0.5 block">{formatINR(totalCredited)}</span>
            <span className="text-[10px] text-emerald-500/80 mt-1 block">{overallCollectionRate}% collection rate</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-amber-400 font-semibold block text-[11px]">Pending Receivables</span>
            <span className="text-xl font-black text-amber-400 mt-0.5 block">{formatINR(totalPending)}</span>
            <span className="text-[10px] text-amber-500/80 mt-1 block">Uncollected balance</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-teal-400 font-semibold block text-[11px]">{activeSelectedMonth}</span>
            <span className="text-xl font-black text-teal-400 mt-0.5 block">{formatINR(currentMonthStats.credited)}</span>
            <span className="text-[10px] text-slate-400 mt-1 block">of {formatINR(currentMonthStats.total)} booked</span>
          </div>
        </div>
      </div>

      {/* ── Tab Selector & Toolbar ── */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tab Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("daily")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "daily"
                ? "bg-white text-emerald-600 shadow-sm font-extrabold"
                : "hover:text-slate-900"
            }`}
          >
            <CalendarDays size={14} />
            Daily Breakdown
          </button>
          <button
            onClick={() => setActiveTab("monthly")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "monthly"
                ? "bg-white text-emerald-600 shadow-sm font-extrabold"
                : "hover:text-slate-900"
            }`}
          >
            <BarChart3 size={14} />
            Monthly Historical Ledger
          </button>
        </div>

        {/* Month Selector for Daily View */}
        {activeTab === "daily" && (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Filter Month:</span>
            <div className="relative flex-1 sm:flex-initial">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <select
                className="w-full sm:w-56 bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer appearance-none"
                value={activeSelectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value={currentMonth}>{currentMonth} (Current)</option>
                {months
                  .filter((m) => m !== currentMonth)
                  .map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* ── Content: Daily Breakdown Table ── */}
      {activeTab === "daily" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden mb-8">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800">Daily Revenue Performance</h2>
              <p className="text-xs text-slate-400 mt-0.5">Records for {activeSelectedMonth}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
              {filteredDailyRevenue.length} Days Recorded
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-5">Date</th>
                  <th className="py-4 px-5">Total Booked</th>
                  <th className="py-4 px-5">Credited Collections</th>
                  <th className="py-4 px-5">Pending Receivables</th>
                  <th className="py-4 px-5">Realization Rate</th>
                  <th className="py-4 px-5 text-right">Default Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDailyRevenue.length > 0 ? (
                  filteredDailyRevenue.map(([date, data]) => {
                    const realizationRate =
                      data.total > 0
                        ? Math.round((data.credited / data.total) * 100)
                        : 0;

                    return (
                      <tr key={date} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-5 font-bold text-slate-800 flex items-center gap-2">
                          <CalendarDays size={14} className="text-slate-400" />
                          <span>{date}</span>
                        </td>

                        <td className="py-4 px-5 font-extrabold text-slate-800">
                          {formatINR(data.total)}
                        </td>

                        <td className="py-4 px-5 font-extrabold text-emerald-600">
                          {formatINR(data.credited)}
                        </td>

                        <td className="py-4 px-5 font-extrabold text-amber-500">
                          {formatINR(data.pending)}
                        </td>

                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2 max-w-[140px]">
                            <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-emerald-500 h-full rounded-full transition-all"
                                style={{ width: `${Math.min(100, realizationRate)}%` }}
                              ></div>
                            </div>
                            <span className="font-bold text-slate-600 text-[11px] w-8">
                              {realizationRate}%
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-5 text-right">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              parseFloat(data.defaultPercentage) > 50
                                ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                                : parseFloat(data.defaultPercentage) > 20
                                ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                            }`}
                          >
                            {data.defaultPercentage}%
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-slate-400">
                      <Receipt size={36} className="mx-auto text-slate-300 mb-2" />
                      <p className="font-semibold text-sm">No daily revenue entries found for {activeSelectedMonth}.</p>
                      <p className="text-xs text-slate-400 mt-1">Select another month or check newly cleared enrollments.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Content: Monthly Historical Ledger Table ── */}
      {activeTab === "monthly" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden mb-8">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800">Monthly Historical Revenue Ledger</h2>
              <p className="text-xs text-slate-400 mt-0.5">Month-by-month financial summary and cutoff reconciliation</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
              {months.length} Months Tracked
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-5">Month Period</th>
                  <th className="py-4 px-5">Total Accrued</th>
                  <th className="py-4 px-5">Credited Collections</th>
                  <th className="py-4 px-5">Outstanding Balance</th>
                  <th className="py-4 px-5">Collection Progress</th>
                  <th className="py-4 px-5 text-right">Default Loss %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {months.length > 0 ? (
                  months.map((month) => {
                    const data = revenueByMonth[month];
                    const realizationRate =
                      data.total > 0
                        ? Math.round((data.credited / data.total) * 100)
                        : 0;

                    return (
                      <tr key={month} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-5 font-bold text-slate-800 flex items-center gap-2">
                          <BarChart3 size={15} className="text-emerald-600" />
                          <span className="text-sm font-extrabold">{month}</span>
                          {month === currentMonth && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                              Current
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-5 font-black text-slate-800 text-sm">
                          {formatINR(data.total)}
                        </td>

                        <td className="py-4 px-5 font-black text-emerald-600 text-sm">
                          {formatINR(data.credited)}
                        </td>

                        <td className="py-4 px-5 font-black text-amber-500 text-sm">
                          {formatINR(data.pending)}
                        </td>

                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2 max-w-[150px]">
                            <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all"
                                style={{ width: `${Math.min(100, realizationRate)}%` }}
                              ></div>
                            </div>
                            <span className="font-extrabold text-slate-700 text-xs w-9">
                              {realizationRate}%
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-5 text-right">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-black ${
                              parseFloat(data.defaultPercentage) > 50
                                ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                                : parseFloat(data.defaultPercentage) > 20
                                ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                            }`}
                          >
                            {data.defaultPercentage}%
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-slate-400">
                      <BarChart3 size={36} className="mx-auto text-slate-300 mb-2" />
                      <p className="font-semibold text-sm">No monthly historical ledger data available.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationRevenueSheets;
