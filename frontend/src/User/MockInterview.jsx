import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import API from "../API";

const MockInterview = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/interview/available-interviews`);
      setInterviews(res.data);
    } catch (error) {
      console.error("Failed to fetch interviews", error);
      toast.error("Could not load available interviews");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-5xl">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Available Mentorship Meetings</h2>

          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : interviews.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
              No upcoming meetings available. Please check back later.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {interviews.map((interview) => (
                <div key={interview._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-start flex-wrap gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{interview.interviewName}</h3>
                      {interview.description && (
                        <p className="text-gray-600 mt-2">{interview.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1"><i className="fa fa-user"></i> {interview.interviewer?.fullname || "Mentor"}</span>
                        <span className="flex items-center gap-1"><i className="fa fa-calendar"></i> {new Date(interview.date).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><i className="fa fa-clock-o"></i> {interview.startTime} - {interview.endTime}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${interview.mode === 'Online' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {interview.mode}
                      </span>
                      {interview.meetLink ? (
                        <a
                          href={interview.meetLink}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-blue-700 transition"
                        >
                          Join Meeting <i className="fa fa-external-link ml-1"></i>
                        </a>
                      ) : (
                        <span className="text-xs text-gray-500 italic mt-2">Link will be provided by Mentor</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockInterview;
