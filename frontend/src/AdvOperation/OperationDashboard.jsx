import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
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
import { BookOpen, BadgeCheck, AlertOctagon, IndianRupee, Target, LineChart, TrendingUp } from "lucide-react";

ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

const OperationDashboard = () => {
  const [operationData, setOperationData] = useState([]);
  const [operation, setOperation] = useState([]);
  const today = new Date();
  const currentMonthWithDate = today.toISOString().slice(0, 7);
  const operationName = localStorage.getItem("advOperationName");

  const fetchOperationData = async () => {
    const operationId = localStorage.getItem("advOperationId");
    const operationName = localStorage.getItem("advOperationName");
    try {
      const response = await axios.get(`${API}/getadvenrolls?all=true`, {
        params: { operationId },
      });
      setOperationData(
        response.data.filter((data) => data.operationName === operationName)
      );
    } catch (err) {
      console.log("Failed to fetch user data");
    }
  };

  const fetchOperation = async () => {
    try {
      const response = await axios.get(`${API}/getadvoperation`);
      setOperation(response.data.filter((item) => item.fullname === operationName));
    } catch (error) {
      console.error("There was an error fetching bda:", error);
    }
  };

  useEffect(() => {
    fetchOperationData();
    fetchOperation();
  }, []);

  const bookedCount = operationData.filter((item) => item.status === "booked").length;
  const fullPaidCount = operationData.filter((item) => item.status === "fullPaid").length;
  const defaultCount = operationData.filter((item) => item.status === "default").length;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const currentMonthData = operationData.filter((student) => {
    const createdAt = new Date(student.createdAt);
    return createdAt.getMonth() === currentMonth && createdAt.getFullYear() === currentYear;
  });

  const totalRevenue = currentMonthData.reduce(
    (acc, student) => acc + (student.programPrice || 0),
    0
  );

  const bookedRevenue = currentMonthData.reduce(
    (acc, student) => acc + (student.paidAmount || 0),
    0
  );

  const creditedRevenue = currentMonthData.reduce((acc, student) => {
    const lastRemark = Array.isArray(student.remark) && student.remark.length > 0
      ? student.remark[student.remark.length - 1]
      : null;

    if (
      student.status === "fullPaid" ||
      lastRemark === "Half_Cleared"
    ) {
      return acc + (student.paidAmount || 0);
    }

    return acc;
  }, 0);

  const pendingRevenue = totalRevenue - creditedRevenue;

  const revenueByMonth = operationData.reduce((acc, student) => {
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

  const sortedMonths = Object.keys(revenueByMonth).sort(
    (a, b) => new Date(`1 ${a}`) - new Date(`1 ${b}`)
  );
  
  // Show more months for a better looking chart (last 6 months)
  const lastMonths = sortedMonths.slice(-6);
  const revenueData = lastMonths.map((month) => ({
    month,
    revenue: revenueByMonth[month]?.totalRevenue || 0,
  }));

  const lineChartData = {
    labels: revenueData.map((data) => data.month),
    datasets: [
      {
        label: "Revenue Growth (₹)",
        data: revenueData.map((data) => data.revenue),
        borderColor: "#4F46E5", // Indigo-600
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: "#4F46E5",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#4F46E5",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleColor: '#F8FAFC',
        bodyColor: '#F8FAFC',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `₹ ${context.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748B', font: { family: "'Inter', sans-serif", size: 12 } }
      },
      y: {
        grid: { color: '#F1F5F9', drawBorder: false },
        border: { display: false },
        ticks: {
          color: '#64748B',
          font: { family: "'Inter', sans-serif", size: 12 },
          callback: (value) => `₹${value >= 1000 ? (value / 1000) + 'k' : value}`
        }
      }
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans ml-[280px] mt-[70px] p-8 md:p-10">
      
      {/* Header Banner */}
      <div className="bg-indigo-600 rounded-3xl p-8 mb-8 shadow-lg shadow-indigo-200/50 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10">
          <LineChart size={250} />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
            Operations Dashboard
          </h1>
          <p className="text-indigo-100 font-medium max-w-xl">
            Welcome back, <span className="font-bold text-white">{operationName}</span>. Overview of your enrollment targets and revenue performance.
          </p>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 animate-[fadeIn_0.2s_ease-out]">
        {/* Booked Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300 hover:shadow-md">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-inner">
                <BookOpen size={28} />
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Booked</p>
                <h3 className="text-3xl font-black text-slate-800 leading-none">{bookedCount}</h3>
            </div>
        </div>

        {/* Full Paid Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300 hover:shadow-md">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner">
                <BadgeCheck size={30} />
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Full Paid</p>
                <h3 className="text-3xl font-black text-slate-800 leading-none">{fullPaidCount}</h3>
            </div>
        </div>

        {/* Default Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300 hover:shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -z-0"></div>
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shadow-inner relative z-10">
                <AlertOctagon size={28} />
            </div>
            <div className="relative z-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Defaulted</p>
                <h3 className="text-3xl font-black text-slate-800 leading-none">{defaultCount}</h3>
            </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column (Revenue & Target) */}
        <div className="lg:col-span-1 space-y-8 animate-[fadeIn_0.3s_ease-out]">
          
          {/* Revenue Details */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <IndianRupee size={20} />
              </div>
              <div>
                  <h2 className="text-lg font-black text-slate-800 leading-tight">Revenue Details</h2>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">This Month</span>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-sm font-semibold text-slate-500">Total Revenue</span>
                    <span className="text-base font-black text-slate-800">₹{totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-sm font-semibold text-slate-500">Credited Revenue</span>
                    <span className="text-base font-black text-emerald-600">₹{creditedRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-500">Pending Revenue</span>
                    <span className="text-base font-black text-amber-500">₹{pendingRevenue.toLocaleString()}</span>
                </div>
            </div>
          </div>

          {/* Target Card */}
          <div className="bg-indigo-900 rounded-3xl border border-indigo-800 shadow-md p-6 text-white relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
                <Target size={120} />
            </div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-indigo-800/50 text-indigo-300 flex items-center justify-center">
                <Target size={20} />
              </div>
              <h2 className="text-lg font-black text-white">Monthly Target</h2>
            </div>

            <div className="bg-indigo-950/50 rounded-2xl p-5 border border-indigo-800/50 relative z-10">
              {operation.length > 0 ? operation.map((item, index) => {
                if (item.target && item.target.length > 0) {
                  const lastTarget = item.target[item.target.length - 1];
                  if (lastTarget.currentMonth === currentMonthWithDate && lastTarget.percentage) {
                    return (
                      <div key={index} className="flex items-center gap-4">
                        <div className="text-indigo-400">
                            <TrendingUp size={28} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-1">Current Goal</p>
                          <h3 className="text-3xl font-black text-white">{lastTarget.percentage}</h3>
                        </div>
                      </div>
                    );
                  } else {
                    return <p key={index} className="text-sm text-indigo-300 font-medium">No target assigned for this month.</p>;
                  }
                } else {
                  return <p key={index} className="text-sm text-indigo-300 font-medium">No target assigned yet.</p>;
                }
              }) : (
                <p className="text-sm text-indigo-300 font-medium animate-pulse">Loading targets...</p>
              )}
            </div>
          </div>

        </div>

        {/* Right Column (Chart) */}
        <div className="lg:col-span-2 animate-[fadeIn_0.4s_ease-out] flex flex-col">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center">
                        <LineChart size={20} />
                    </div>
                    <h2 className="text-lg font-black text-slate-800">Revenue Growth Timeline</h2>
                </div>
                <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold">
                    Last 6 Months
                </div>
            </div>
            
            <div className="flex-1 min-h-[300px] w-full relative">
                {revenueData.length > 0 ? (
                    <Line data={lineChartData} options={chartOptions} />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium text-sm">
                        Not enough data to plot revenue growth.
                    </div>
                )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OperationDashboard;
