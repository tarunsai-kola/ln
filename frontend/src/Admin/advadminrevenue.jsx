import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";
import { toast } from "react-hot-toast";

const RevenueSheet = () => {
  const [dailyData, setDailyData] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  const [viewMode, setViewMode] = useState("monthly"); // "monthly" or "custom"
  const [selectedMonth, setSelectedMonth] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [monthlyPage, setMonthlyPage] = useState(1);
  const [monthlyTotalPages, setMonthlyTotalPages] = useState(1);
  const monthlyLimit = 10;

  const [loadingDaily, setLoadingDaily] = useState(false);
  const [loadingMonthly, setLoadingMonthly] = useState(true);

  const fetchMonthlyStats = async (page = 1) => {
    try {
      setLoadingMonthly(true);
      const response = await axios.get(`${API}/advgetmonthlyrevenue`, {
        params: { page, limit: monthlyLimit }
      });

      const { data, pagination } = response.data;

      setMonthlyStats(data);
      setMonthlyTotalPages(pagination.totalPages);
      setGrandTotal(pagination.grandTotal);

      if (!selectedMonth && data.length > 0) {
        const currentMonthStr = new Date().toLocaleString("default", { month: "long", year: "numeric" });
        const hasCurrent = data.find(m => m.month === currentMonthStr);
        setSelectedMonth(hasCurrent ? currentMonthStr : data[0].month);
      }
    } catch (error) {
      console.error("Error fetching monthly stats:", error);
      toast.error("Failed to load monthly revenue summary.", {
        style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
      });
    } finally {
      setLoadingMonthly(false);
    }
  };

  const fetchDailyData = async () => {
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
        if (!selectedMonth) return;
        const [month, year] = selectedMonth.split(" ");
        params = { month, year };
      }

      const response = await axios.get(`${API}/advgetdailyrevenue`, { params });
      setDailyData(response.data);
    } catch (error) {
      console.error("Error fetching daily data:", error);
      toast.error("Failed to load daily transactions.", {
        style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
      });
    } finally {
      setLoadingDaily(false);
    }
  };

  useEffect(() => {
    fetchMonthlyStats(monthlyPage);
  }, [monthlyPage]);

  useEffect(() => {
    if (viewMode === "monthly" && selectedMonth) {
      fetchDailyData();
    } else if (viewMode === "custom" && startDate && endDate) {
      fetchDailyData();
    }
  }, [selectedMonth, viewMode, startDate, endDate]);

  const dailyRows = dailyData;

  return (
    <div className="admin-content-wrap min-h-screen bg-slate-50 text-slate-700 font-sans p-6 ml-[270px]">
      
      <div className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <i className="fa fa-line-chart text-indigo-500"></i>
              Revenue Analytics
          </h1>
          <p className="text-slate-600 mt-1">Detailed breakdown of sales and revenue metrics</p>
      </div>

      <section className="mb-8 bg-slate-50 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-200">
        <div className="flex flex-wrap gap-8 items-end">
          
          <div>
            <label className="block text-slate-600 text-xs font-bold uppercase tracking-wider mb-2">View Mode</label>
            <div className="flex rounded-xl bg-white border border-slate-200 overflow-hidden p-1">
              <button
                onClick={() => setViewMode("monthly")}
                className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${viewMode === "monthly" ? "bg-indigo-600 text-slate-900 shadow-lg" : "text-slate-600 hover:text-slate-900"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setViewMode("custom")}
                className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${viewMode === "custom" ? "bg-indigo-600 text-slate-900 shadow-lg" : "text-slate-600 hover:text-slate-900"}`}
              >
                Custom Range
              </button>
            </div>
          </div>

          {viewMode === "monthly" && (
            <div>
              <label className="block text-slate-600 text-xs font-bold uppercase tracking-wider mb-2">Select Month</label>
              <select
                className="w-full bg-white border border-slate-200 text-slate-900 p-3 rounded-xl min-w-[200px] outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="" disabled className="bg-white text-slate-600">Select Month</option>
                {monthlyStats.map(stat => (
                  <option key={stat.month} value={stat.month} className="bg-white">{stat.month}</option>
                ))}
              </select>
            </div>
          )}

          {viewMode === "custom" && (
            <>
              <div>
                <label className="block text-slate-600 text-xs font-bold uppercase tracking-wider mb-2">Start Date</label>
                <input
                  type="date"
                  className="w-full bg-white border border-slate-200 text-slate-900 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:dark]"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-slate-600 text-xs font-bold uppercase tracking-wider mb-2">End Date</label>
                <input
                  type="date"
                  className="w-full bg-white border border-slate-200 text-slate-900 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:dark]"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <button
                onClick={fetchDailyData}
                className="bg-indigo-600 text-slate-900 font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-indigo-500 hover:shadow-indigo-500/20 transition-all"
              >
                Apply Filter
              </button>
            </>
          )}

        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 space-y-8">
            <section className="bg-slate-50 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-200">
                <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <i className="fa fa-calendar-o text-indigo-600"></i>
                    {viewMode === "monthly" ? `${selectedMonth || "Monthly"} Breakdown` : "Custom Range Breakdown"}
                </h2>
                {loadingDaily && <span className="text-indigo-600 text-sm font-bold animate-pulse"><i className="fa fa-circle-o-notch fa-spin mr-1"></i> Loading...</span>}
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-slate-50">
                <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-white border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-widest">Date</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-widest">Total Revenue</th>
                        <th className="px-6 py-4 text-xs font-semibold text-emerald-600 uppercase tracking-widest">Credited</th>
                        <th className="px-6 py-4 text-xs font-semibold text-amber-600 uppercase tracking-widest">Pending</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-widest text-center">Payments</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm">
                    {dailyRows.length > 0 ? (
                        dailyRows.map((data, index) => (
                        <tr key={data.date} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900">{data.date}</td>
                            <td className="px-6 py-4 font-mono text-indigo-300">₹{data.total.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                            <td className="px-6 py-4 font-mono text-emerald-600">₹{data.credited.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                            <td className="px-6 py-4 font-mono text-amber-600">₹{data.pending.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                            <td className="px-6 py-4 text-center font-bold text-slate-700">
                                <span className="bg-slate-100 px-3 py-1 rounded-full">{data.payments}</span>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-slate-500 italic">
                            {loadingDaily ? "Fetching data..." : "No records found for this period."}
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            </section>
        </div>

        <div className="space-y-8">
            <section className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className="absolute -right-6 -top-6 text-emerald-500/10">
                    <i className="fa fa-money text-9xl"></i>
                </div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-2 z-10">Total Revenue (All Time)</h2>
                <p className="text-4xl lg:text-5xl font-extrabold text-slate-900 z-10 font-mono tracking-tighter">
                ₹{grandTotal ? grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : "0.00"}
                </p>
            </section>

            <section className="bg-slate-50 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <i className="fa fa-history text-indigo-600"></i> Monthly History
                </h2>
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-slate-50">
                <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-white border-b border-slate-200">
                    <tr>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-widest">Month</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-widest">Revenue</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm">
                    {loadingMonthly ? (
                        <tr><td colSpan="2" className="px-4 py-8 text-center text-slate-500"><i className="fa fa-circle-o-notch fa-spin mr-2"></i>Loading...</td></tr>
                    ) : (
                        monthlyStats.map((stat, index) => (
                        <tr key={stat.month} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-4 font-bold text-slate-700">{stat.month}</td>
                            <td className="px-4 py-4 font-mono text-emerald-600">₹{stat.total.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                        </tr>
                        ))
                    )}
                    </tbody>
                </table>
                </div>

                <div className="flex justify-between items-center mt-6">
                <button
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-colors ${monthlyPage === 1 ? 'border-slate-200 text-slate-600 cursor-not-allowed' : 'border-indigo-500/30 text-indigo-600 hover:bg-indigo-500/10'}`}
                    onClick={() => setMonthlyPage(p => Math.max(1, p - 1))}
                    disabled={monthlyPage === 1}
                >
                    <i className="fa fa-chevron-left mr-1"></i> Prev
                </button>
                <span className="text-xs font-bold text-slate-500">
                    {monthlyPage} / {monthlyTotalPages}
                </span>
                <button
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-colors ${monthlyPage >= monthlyTotalPages ? 'border-slate-200 text-slate-600 cursor-not-allowed' : 'border-indigo-500/30 text-indigo-600 hover:bg-indigo-500/10'}`}
                    onClick={() => setMonthlyPage(p => Math.min(monthlyTotalPages, p + 1))}
                    disabled={monthlyPage >= monthlyTotalPages}
                >
                    Next <i className="fa fa-chevron-right ml-1"></i>
                </button>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};

export default RevenueSheet;
