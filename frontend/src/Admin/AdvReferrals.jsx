import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { Users, Search, ChevronLeft, ChevronRight, Mail, Phone, Calendar } from "lucide-react";

const AdvReferrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchReferrals = async (currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/advreferrals?page=${currentPage}&limit=50`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setReferrals(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalRecords(response.data.total);
      } else {
        toast.error("Failed to load referrals");
      }
    } catch (error) {
      console.error("Error fetching referrals:", error);
      toast.error("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals(page);
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 pl-[265px] pt-[70px]">
      <Toaster position="top-right" />
      <div className="p-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
              <Users className="w-8 h-8 text-indigo-500" />
              Student Referrals
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              View referrals submitted by students via the Dashboard Access form.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-sm font-semibold text-slate-600">Total Referrals:</span>
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md text-sm font-bold">{totalRecords}</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
          
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Referrer (Student)</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Referred Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Program</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {referrals.length === 0 && !loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                      <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-lg font-medium">No referrals found.</p>
                    </td>
                  </tr>
                ) : (
                  referrals.map((enroll) => (
                    <tr key={enroll._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          {new Date(enroll.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">{enroll.fullname}</div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            <Phone className="w-3 h-3" /> {enroll.phone}
                          </span>
                          {enroll.email && (
                            <span className="flex items-center gap-1 text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              <Mail className="w-3 h-3" /> {enroll.email}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-indigo-700 bg-indigo-50 px-3 py-2 rounded-lg font-medium border border-indigo-100 break-words whitespace-pre-wrap max-w-sm">
                          {enroll.referFriend}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {enroll.program || "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-sm text-slate-500 font-medium">
              Page <span className="text-slate-800 font-bold">{page}</span> of <span className="text-slate-800 font-bold">{totalPages || 1}</span>
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrevPage} 
                disabled={page <= 1}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <button 
                onClick={handleNextPage} 
                disabled={page >= totalPages}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdvReferrals;
