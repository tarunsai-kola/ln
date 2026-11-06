import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle2, BadgeCheck, GraduationCap, Trophy } from "lucide-react";

const AdvTeamFullPaid = () => {
  const [fullPaidEnrollments, setFullPaidEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const advTeamName = localStorage.getItem("advTeamName");

  const fetchFullPaidEnrollments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/getadvenrolls`);
      const enrollments = response.data.data || response.data;

      const filtered = enrollments.filter(
        (item) =>
          item.status === "fullPaid" &&
          item.counselor === advTeamName
      );

      setFullPaidEnrollments(filtered);
    } catch (error) {
      console.error("Error fetching full paid enrollments:", error);
      toast.error("Failed to load full paid enrollments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFullPaidEnrollments();
  }, []);

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans ml-[280px] mt-[70px] p-8 md:p-10">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl shadow-inner">
              <CheckCircle2 size={28} />
            </div>
            Full Paid Enrollments
          </h1>
          <p className="text-sm font-semibold text-slate-500 flex items-center gap-2">
            <Trophy size={16} /> Successfully completed payment cycles
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-6 py-3 bg-white border border-emerald-200 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <BadgeCheck size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Full Paid</p>
              <p className="text-2xl font-black text-emerald-600 leading-none">{fullPaidEnrollments.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-[fadeIn_0.3s_ease-out]">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-bold tracking-wide">Loading full paid records...</p>
          </div>
        ) : fullPaidEnrollments.length === 0 ? (
          <div className="p-20 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="text-slate-300 w-12 h-12" />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">No Full Paid Enrollments</h3>
            <p className="text-slate-500 font-medium">You don't have any fully paid enrollments yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Student Details</th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Program Details</th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Financials</th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fullPaidEnrollments.map((enrollment, index) => (
                  <tr key={enrollment._id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-400 w-4">{index + 1}</span>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">{enrollment.fullname}</span>
                          <span className="text-xs font-semibold text-slate-500">{enrollment.phone}</span>
                          <span className="text-[10px] text-slate-400">{enrollment.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 items-start">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold truncate max-w-[200px]">
                          {enrollment.program}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {enrollment.domain}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-black text-slate-800">
                          ₹{enrollment.programPrice?.toLocaleString()} <span className="text-[10px] font-bold text-slate-400 uppercase">Total</span>
                        </span>
                        <span className="text-sm font-bold text-emerald-600">
                          ₹{enrollment.paidAmount?.toLocaleString()} <span className="text-[10px] font-bold text-emerald-400 uppercase">Paid</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center gap-2">
                        <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full text-xs font-black uppercase tracking-wider">
                          Full Paid
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md">
                          {enrollment.monthOpted}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvTeamFullPaid;
