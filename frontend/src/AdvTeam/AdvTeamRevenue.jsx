import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";
import { 
  TrendingUp, Wallet, CheckCircle2, Clock, 
  CalendarDays, BarChart3, Receipt, IndianRupee, Users 
} from "lucide-react";

const AdvTeamRevenue = () => {
  const [advEnrollments, setAdvEnrollments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const advTeamName = localStorage.getItem("advTeamName");

  const fetchAdvEnrollments = async () => {
    try {
      const response = await axios.get(`${API}/getadvenrolls`);
      const enrollments = response.data.data || response.data;
      const filteredData = enrollments.filter(
        (item) => item.counselor && item.counselor === advTeamName
      );
      setAdvEnrollments(filteredData);
    } catch (err) {
      setError("There was an error fetching advance enrollments.");
      console.error("Error fetching advance enrollments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvEnrollments();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#f8fafc] min-h-screen font-sans ml-[280px] mt-[70px] p-8 flex items-center justify-center">
        <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-bold tracking-wide">Calculating Revenue Data...</p>
        </div>
      </div>
    );
  }

  if (error) return (
      <div className="bg-[#f8fafc] min-h-screen font-sans ml-[280px] mt-[70px] p-8 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-rose-100 text-rose-600 font-bold">
              {error}
          </div>
      </div>
  );

  const revenueByDay = {};
  const revenueByMonth = {};
  let totalRevenue = 0;

  const today = new Date();
  const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, 1);

  advEnrollments.forEach((student) => {
    const createdDate = new Date(student.createdAt);

    if (createdDate < threeMonthsAgo) return;

    const date = createdDate.toLocaleDateString("en-GB");
    const month = createdDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const revenue = student.programPrice || 0;
    const bookedAmount = student.paidAmount || 0;
    const isHalfCleared = Array.isArray(student.remark) && student.remark[student.remark.length - 1] === "Half_Cleared";
    const credited = student.status === "fullPaid" || isHalfCleared ? bookedAmount : 0;
    const pending = revenue - credited;

    if (!revenueByDay[date]) {
      revenueByDay[date] = { total: 0, booked: 0, credited: 0, pending: 0, month };
    }
    if (!revenueByMonth[month]) {
      revenueByMonth[month] = { total: 0, booked: 0, credited: 0, pending: 0 };
    }

    revenueByDay[date].total += revenue;
    revenueByDay[date].booked += bookedAmount;
    revenueByDay[date].credited += credited;
    revenueByDay[date].pending += pending;

    const [monthName, yearStr] = month.split(" ");
    const monthIndex = new Date(`${monthName} 1, ${yearStr}`).getMonth();
    const year = parseInt(yearStr);
    const cutoffDate = new Date(year, monthIndex + 1, 8); 

    if (createdDate <= cutoffDate) {
      revenueByMonth[month].credited += credited;
    }

    revenueByMonth[month].total += revenue;
    revenueByMonth[month].booked += bookedAmount;
    revenueByMonth[month].pending += pending;

    totalRevenue += revenue;
  });

  function getLastNMonths(n) {
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
  }

  const monthsToShow = getLastNMonths(3);
  const months = monthsToShow.filter((m) => revenueByMonth[m]);

  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });
  const filteredDailyRevenue = Object.entries(revenueByDay)
      .filter(([, data]) => data.month === (selectedMonth || currentMonth))
      .sort((a, b) => {
          // Sort by date descending (parsing DD/MM/YYYY)
          const [dayA, monthA, yearA] = a[0].split('/');
          const [dayB, monthB, yearB] = b[0].split('/');
          return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
      });

  const totalBooked = advEnrollments.reduce((acc, student) => acc + (student.paidAmount || 0), 0);
  const totalCredited = advEnrollments.reduce((acc, student) => {
    const lastRemark = Array.isArray(student.remark) && student.remark.length > 0
      ? student.remark[student.remark.length - 1]
      : null;
    if (student.status === "fullPaid" || lastRemark === "Half_Cleared") {
      return acc + (student.paidAmount || 0);
    }
    return acc;
  }, 0);
  const totalPending = totalRevenue - totalCredited;

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans ml-[280px] mt-[70px] p-8 md:p-10">
      
      {/* Header Banner */}
      <div className="bg-emerald-600 rounded-3xl p-8 mb-8 shadow-lg shadow-emerald-200/50 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10">
          <IndianRupee size={250} />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
            Revenue Analytics Board
          </h1>
          <p className="text-emerald-100 font-medium max-w-xl">
            Track your team's financial performance, cleared payments, and pending pipeline.
          </p>
        </div>
        
        <div className="relative z-10 mt-6 md:mt-0 flex flex-col items-end gap-1">
          <div className="text-xs font-bold text-emerald-200 uppercase tracking-widest mb-1">Total Pipeline Value</div>
          <div className="text-4xl font-black tracking-tight">
              ₹{totalRevenue.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-[fadeIn_0.2s_ease-out]">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <TrendingUp size={20} />
                </div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Pipeline</h3>
            </div>
            <p className="text-3xl font-black text-slate-800">₹{totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Wallet size={20} />
                </div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Booked Value</h3>
            </div>
            <p className="text-3xl font-black text-slate-800">₹{totalBooked.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-emerald-50/50 pointer-events-none"></div>
            <div className="relative z-10 flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                    <CheckCircle2 size={20} />
                </div>
                <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Credited Cleared</h3>
            </div>
            <p className="relative z-10 text-3xl font-black text-emerald-600">₹{totalCredited.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-rose-50/50 pointer-events-none"></div>
            <div className="relative z-10 flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-inner">
                    <Clock size={20} />
                </div>
                <h3 className="text-xs font-bold text-rose-700 uppercase tracking-widest">Pending Due</h3>
            </div>
            <p className="relative z-10 text-3xl font-black text-rose-600">₹{totalPending.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
        {/* Left Column: Monthly Summary (Last 3 Months) */}
        <div className="xl:col-span-1 animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-full">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                    <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                        <BarChart3 className="text-indigo-500" size={20} /> Month Over Month
                    </h2>
                </div>
                <div className="p-6 space-y-6">
                    {months.length > 0 ? (
                        months.map((month) => (
                            <div key={month} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 transition-all hover:shadow-md hover:border-slate-200">
                                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/60">
                                    <span className="font-black text-slate-800 text-lg flex items-center gap-2">
                                        <CalendarDays size={18} className="text-slate-400" /> {month}
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-semibold text-slate-500">Pipeline Generated</span>
                                        <span className="font-bold text-slate-800">₹{revenueByMonth[month].total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-semibold text-slate-500">Credited</span>
                                        <span className="font-black text-emerald-600">₹{revenueByMonth[month].credited.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-semibold text-slate-500">Pending</span>
                                        <span className="font-bold text-rose-500">₹{revenueByMonth[month].pending.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-slate-500 font-medium">
                            <BarChart3 className="mx-auto text-slate-300 w-12 h-12 mb-3" />
                            No historical monthly data.
                        </div>
                    )}

                    {/* Mini Aggregated Summary at the bottom of the column */}
                    <div className="mt-8 bg-slate-900 rounded-2xl p-5 text-white shadow-lg">
                        <div className="flex items-center gap-3 mb-4 opacity-80">
                            <Users size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">Total Volume (90 Days)</span>
                        </div>
                        <div className="text-3xl font-black mb-1">{advEnrollments.length}</div>
                        <div className="text-xs font-medium text-slate-400">Total Enrollment Contracts</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column: Daily Breakdown Table */}
        <div className="xl:col-span-2 animate-[fadeIn_0.4s_ease-out]">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                        <Receipt className="text-indigo-500" size={20} /> Daily Settlement Log
                    </h2>
                    
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                        <CalendarDays size={16} className="text-slate-400" />
                        <select
                            className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
                            value={selectedMonth || currentMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            <option value={currentMonth}>Current Month ({currentMonth})</option>
                            {months
                                .filter((month) => month !== currentMonth)
                                .map((month) => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto custom-scrollbar p-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Date</th>
                                <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Gross Revenue</th>
                                <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Net Credited</th>
                                <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right pr-2">Outstanding Pending</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredDailyRevenue.length > 0 ? (
                                filteredDailyRevenue.map(([date, data]) => (
                                    <tr key={date} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 pl-2 font-bold text-slate-700 text-sm">
                                            {date}
                                        </td>
                                        <td className="py-4 font-bold text-slate-800">
                                            ₹{data.total.toLocaleString()}
                                        </td>
                                        <td className="py-4">
                                            <span className="inline-block bg-emerald-50 text-emerald-700 font-black px-3 py-1 rounded-lg text-sm border border-emerald-100">
                                                ₹{data.credited.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right pr-2 font-black text-rose-500">
                                            ₹{data.pending.toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-16 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                                <Receipt className="text-slate-300 w-8 h-8" />
                                            </div>
                                            <span className="text-slate-500 font-bold">No revenue activity logged for this month.</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AdvTeamRevenue;
