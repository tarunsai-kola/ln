import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";

// --- Premium SVG Icons ---
const Icons = {
  Enrollments: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>,
  Calendar: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Alert: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
  Money: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12"></path><path d="M6 8h12"></path><path d="M6 13h8.5a4.5 4.5 0 1 0 0-9H6"></path><path d="M13 14.5L6 21"></path></svg>,
  Won: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
  Wave: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
};

const AdvTeamHome = () => {
  const [advEnrollments, setAdvEnrollments] = useState([]);
  const advTeamName = localStorage.getItem("advTeamName");

  const fetchAdvEnrollments = async () => {
    try {
      const response = await axios.get(`${API}/getadvenrolls`);
      const enrollments = response.data.data || response.data;
      setAdvEnrollments(
        enrollments.filter(
          (item) => item.counselor && item.counselor === advTeamName
        )
      );
    } catch (error) {
      console.error("There was an error fetching advance enrollments:", error);
    }
  };

  useEffect(() => {
    fetchAdvEnrollments();
  }, []);

  // --- Calculations ---
  const totalRevenue = advEnrollments.reduce((acc, student) => acc + (student.programPrice || 0), 0);
  const bookedRevenue = advEnrollments.reduce((acc, student) => acc + (student.paidAmount || 0), 0);
  
  const creditedRevenue = advEnrollments.reduce((acc, student) => {
    const lastRemark = Array.isArray(student.remark) && student.remark.length > 0
      ? student.remark[student.remark.length - 1]
      : null;
    if (student.status === "fullPaid" || lastRemark === "Half_Cleared") {
      return acc + (student.paidAmount || 0);
    }
    return acc;
  }, 0);

  const pendingRevenue = totalRevenue - creditedRevenue;
  
  const totalBooked = advEnrollments.filter((s) => s.status === "booked").length;
  const totalFullPaid = advEnrollments.filter((s) => s.status === "fullPaid").length;
  const totalDefault = advEnrollments.filter((s) => s.status === "default").length;
  const totalEnrollments = advEnrollments.length;

  return (
    <div className="bg-[#05050A] min-h-screen font-sans ml-[280px] mt-[70px] p-8 md:p-10 lg:p-12 overflow-x-hidden text-gray-300 relative">
      
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none transform -translate-y-1/2 -translate-x-1/4"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none transform translate-y-1/3 translate-x-1/4"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="flex items-center gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-[0_0_30px_rgba(79,70,229,0.3)] flex items-center justify-center text-white shrink-0 border border-white/10">
            {Icons.Wave}
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight mb-1">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{advTeamName}</span>
            </h2>
            <p className="text-gray-400 font-medium text-sm md:text-base">Here is your real-time Advance Enrollment and Revenue overview.</p>
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          
          <div className="relative overflow-hidden bg-[#13151A] rounded-[32px] p-8 md:p-10 flex flex-col justify-between border border-white/10 shadow-2xl group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700"></div>
            <div className="flex justify-between items-center relative z-10">
               <h3 className="text-sm font-bold tracking-wider uppercase text-blue-400">Total Enrollments</h3>
               <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                 {Icons.Enrollments}
               </div>
            </div>
            <div className="relative z-10 mt-12">
              <p className="text-6xl font-black tracking-tighter text-white mb-2">{totalEnrollments}</p>
              <p className="text-sm font-medium text-gray-400">Total registered advance students</p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#13151A] rounded-[32px] p-8 md:p-10 flex flex-col justify-between border border-white/10 shadow-2xl group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700"></div>
            <div className="flex justify-between items-center relative z-10">
               <h3 className="text-sm font-bold tracking-wider uppercase text-emerald-400">Total Revenue Generated</h3>
               <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                 {Icons.Money}
               </div>
            </div>
            <div className="relative z-10 mt-12">
              <p className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-2">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-sm font-medium text-gray-400">Overall combined program pricing</p>
            </div>
          </div>

        </div>

        <div className="mb-6 flex items-center gap-3">
          <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
          <h3 className="text-xl font-bold text-white tracking-tight">Detailed Revenue Breakdown</h3>
        </div>

        {/* Detailed Revenue Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Booked Revenue", amount: bookedRevenue, iconText: "text-blue-400", iconBg: "bg-blue-500/10", border: "border-blue-500/20" },
            { label: "Credited Revenue", amount: creditedRevenue, iconText: "text-emerald-400", iconBg: "bg-emerald-500/10", border: "border-emerald-500/20" },
            { label: "Pending Revenue", amount: pendingRevenue, iconText: "text-rose-400", iconBg: "bg-rose-500/10", border: "border-rose-500/20" },
          ].map(rev => (
            <div key={rev.label} className="bg-[#11111a] rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                 <div className={`p-3 rounded-xl ${rev.iconBg} ${rev.iconText} ${rev.border} border`}>
                   {Icons.Money}
                 </div>
                 <h3 className="text-xs font-bold tracking-wider uppercase text-gray-400">{rev.label}</h3>
              </div>
              <p className="text-3xl font-black tracking-tight text-white">₹{rev.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 flex items-center gap-3 mt-12">
          <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
          <h3 className="text-xl font-bold text-white tracking-tight">Enrollment Status Overview</h3>
        </div>

        {/* Enrollment Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Booked Payments", count: totalBooked, info: "Initial booking payments", iconText: "text-amber-400", iconBg: "bg-amber-500/10", iconObj: Icons.Calendar, border: "border-amber-500/20" },
            { label: "Full Paid", count: totalFullPaid, info: "Completed 100% fees", iconText: "text-emerald-400", iconBg: "bg-emerald-500/10", iconObj: Icons.Won, border: "border-emerald-500/20" },
            { label: "Default Status", count: totalDefault, info: "Missed payment deadlines", iconText: "text-rose-400", iconBg: "bg-rose-500/10", iconObj: Icons.Alert, border: "border-rose-500/20" },
          ].map(stat => (
            <div key={stat.label} className="bg-[#11111a] rounded-3xl p-6 border border-white/10 shadow-xl flex items-start gap-5 hover:border-white/20 transition-colors">
              <div className={`p-4 rounded-2xl ${stat.iconBg} ${stat.iconText} border ${stat.border} shrink-0`}>
                {stat.iconObj}
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">{stat.label}</p>
                <p className="text-4xl font-black text-white tracking-tight mb-2">{stat.count}</p>
                <p className="text-xs font-medium text-gray-500">{stat.info}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdvTeamHome;
