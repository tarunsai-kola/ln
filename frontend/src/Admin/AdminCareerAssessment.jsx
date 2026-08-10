import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const AdminCareerAssessment = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchAssessments(page);
  }, [page]);

  const fetchAssessments = async (currentPage) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/careerassessment?page=${currentPage}&limit=30`);
      // Since response data is now paginated object: { data, currentPage, totalPages, totalItems }
      const data = response.data.data ? response.data.data : response.data;
      setAssessments(data);
      setTotalPages(response.data.totalPages || 1);
      setTotalItems(response.data.totalItems || data.length);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      toast.error("Failed to load assessments");
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div id="AdminAddCourse">
      <div className="bg-[#1e1e2d] min-h-screen p-8 text-white">
        <Helmet>
          <title>Career Assessments | Admin Dashboard</title>
        </Helmet>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Career Assessments</h2>
        <div className="text-gray-400">Total Submissions: <span className="font-bold text-white">{totalItems}</span></div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : assessments.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-lg bg-[#2a2a3c] rounded-xl border border-white/5">
          No assessments have been submitted yet.
        </div>
      ) : (
        <div className="bg-[#2a2a3c] rounded-xl shadow-lg border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/30 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Name & Contact</th>
                  <th className="p-4 font-semibold">Profile</th>
                  <th className="p-4 font-semibold">Goal & Timeline</th>
                  <th className="p-4 font-semibold">Biggest Challenge</th>
                  <th className="p-4 font-semibold">Self Rating</th>
                  <th className="p-4 font-semibold">Consultation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {assessments.map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-white/5 transition-colors text-sm">
                    <td className="p-4 align-top whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}<br/>
                      <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleTimeString()}</span>
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-bold text-white mb-1">{item.fullName}</div>
                      <div className="text-indigo-400 text-xs mb-1">{item.email}</div>
                      <div className="text-gray-400 text-xs">{item.mobileNumber}</div>
                      <div className="text-gray-500 text-xs mt-1">{item.city}, {item.ageGroup}</div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-semibold text-gray-200">{item.currentStatus}</div>
                      <div className="text-gray-400 text-xs mt-1">{item.fieldOfStudy}</div>
                      {item.currentJobRole && <div className="text-gray-400 text-xs mt-1">Role: {item.currentJobRole}</div>}
                      <div className="text-gray-400 text-xs mt-1">Exp: {item.yearsOfExperience}</div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-semibold text-emerald-400">{item.primaryCareerGoal}</div>
                      <div className="text-gray-400 text-xs mt-1">Timeline: {item.goalTimeline}</div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-semibold text-rose-400">{item.biggestChallenge}</div>
                      <div className="text-gray-400 text-[11px] mt-2 italic max-w-xs break-words">
                        "If I could solve ONE challenge: {item.topCareerChallenge12Months}"
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex flex-col gap-1 text-xs text-gray-400">
                        <div>Comm: <span className="text-white font-bold">{item.communicationSkills}/10</span></div>
                        <div>Problem Solv: <span className="text-white font-bold">{item.problemSolvingSkills}/10</span></div>
                        <div>Confidence: <span className="text-white font-bold">{item.confidenceScore}/10</span></div>
                        <div>Tech: <span className="text-white">{item.techComfort}</span></div>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className={`inline-block px-2 py-1 rounded text-xs font-bold ${item.wantConsultation === 'Yes' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {item.wantConsultation === 'Yes' ? 'Requested' : 'Opted Out'}
                      </div>
                      {item.wantConsultation === 'Yes' && (
                        <div className="text-xs text-indigo-300 mt-2 font-medium">
                          Help with: {item.helpArea}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 bg-black/20">
              <div className="text-sm text-gray-400">
                Showing page <span className="font-bold text-white">{page}</span> of <span className="font-bold text-white">{totalPages}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="px-4 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminCareerAssessment;
