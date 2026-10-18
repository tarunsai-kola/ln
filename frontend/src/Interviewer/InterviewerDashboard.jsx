import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../API";

const InterviewerDashboard = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    // Mentor Auth
    const mentorName = localStorage.getItem("interviewerName");
    const mentorId = localStorage.getItem("interviewerId");

    // Video Upload State
    const [videoForm, setVideoForm] = useState({
        sessionTitle: "",
        driveLink: ""
    });
    const [mentorDetails, setMentorDetails] = useState(null);
    
    useEffect(() => {
        if (!localStorage.getItem("interviewerToken")) {
            navigate("/mentor-login");
        } else {
            fetchDashboardData();
        }
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API}/api/interviewer/interviewer-dashboard/${mentorId}`);
            if (res.data) {
                if (res.data.interviews) {
                    setInterviews(res.data.interviews);
                } else if (Array.isArray(res.data)) {
                    setInterviews(res.data);
                }

                if (res.data.mentor) {
                    setMentorDetails(res.data.mentor);
                } else {
                    fetchMentorDetails();
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load dashboard data");
            fetchMentorDetails();
        } finally {
            setLoading(false);
        }
    };

    const fetchMentorDetails = async () => {
        try {
            // First try direct single mentor route
            const res = await axios.get(`${API}/api/interviewer/${mentorId}`);
            if (res.data && res.data._id) {
                setMentorDetails(res.data);
                return;
            }
        } catch (e) {
            // Fallback to /all
            try {
                const resAll = await axios.get(`${API}/api/interviewer/all`);
                const me = resAll.data.find(m => m._id === mentorId);
                setMentorDetails(me);
            } catch (error) {
                console.error("Failed to load mentor details", error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("interviewerToken");
        localStorage.removeItem("interviewerId");
        localStorage.removeItem("interviewerName");
        navigate("/mentor-login");
    };

    const handleMeetLinkChange = async (interviewId, meetLink) => {
        if (!meetLink) {
            toast.error("Please enter a valid link");
            return;
        }
        try {
            await axios.post(`${API}/api/interview/mentor-add-meet-link`, {
                interviewId,
                meetLink
            });
            toast.success("Meeting link updated successfully!");
            fetchDashboardData();
        } catch (error) {
            toast.error("Failed to update link");
        }
    };

    const extractDriveId = (url) => {
        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
    };

    const handleVideoSubmit = async (e) => {
        e.preventDefault();
        
        if (!mentorDetails?.assignedCourseId?._id && !mentorDetails?.assignedCourseId) {
            toast.error("You are not assigned to any course. Cannot upload video.");
            return;
        }
        
        const courseId = mentorDetails.assignedCourseId._id || mentorDetails.assignedCourseId;

        try {
            await axios.post(`${API}/api/interview/mentor-upload-video`, {
                courseId,
                sessionTitle: videoForm.sessionTitle,
                driveLink: videoForm.driveLink
            });
            toast.success("Video successfully sent to LMS!");
            setVideoForm({ sessionTitle: "", driveLink: "" });
            fetchDashboardData(); // Refresh to see newly added video
        } catch (error) {
            toast.error("Failed to upload video");
        }
    };

    const driveId = extractDriveId(videoForm.driveLink);
    
    const uploadedSessions = mentorDetails?.assignedCourseId?.session || {};
    const sessionList = Object.keys(uploadedSessions).map(key => ({
        id: key,
        ...uploadedSessions[key]
    })).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Sort by order added

    return (
        <div className="min-h-screen bg-slate-50 font-sans relative pb-10">
            <Toaster position="top-center" />
            {/* Header */}
            <header className="bg-indigo-900 shadow-lg p-5 flex justify-between items-center text-white sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-900 font-bold text-xl shadow">
                        {mentorName ? mentorName.charAt(0).toUpperCase() : 'M'}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Mentor Portal</h1>
                        <p className="text-indigo-200 text-sm">Manage your meetings and course content</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <span className="font-medium">Welcome, {mentorName}</span>
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-md transform hover:scale-105">Logout</button>
                </div>
            </header>

            <main className="p-6 max-w-7xl mx-auto space-y-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* SECTION 1: Scheduled Meetings */}
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-extrabold mb-4 text-slate-800 flex items-center gap-2">
                            <span className="text-indigo-600">📅</span> Assigned Meetings
                        </h2>
                        {loading ? (
                            <div className="flex-1 flex items-center justify-center py-10 bg-white rounded-xl shadow-sm border border-slate-200">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                            </div>
                        ) : interviews.length === 0 ? (
                            <div className="flex-1 py-12 text-slate-500 bg-white rounded-xl shadow-sm border border-slate-200 text-center flex flex-col items-center justify-center">
                                <span className="text-4xl mb-3">😴</span>
                                <p className="text-lg font-medium">No meetings assigned yet.</p>
                                <p className="text-sm">Enjoy your free time!</p>
                            </div>
                        ) : (
                            <div className="space-y-5 overflow-y-auto pr-2 max-h-[600px] custom-scrollbar">
                                {interviews.map((interview) => (
                                    <div key={interview._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-slate-200 group">
                                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex justify-between items-center">
                                            <h3 className="text-white font-bold text-lg tracking-wide">{interview.interviewName}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm border border-white/30`}>{interview.mode}</span>
                                        </div>
                                        <div className="p-5 space-y-4">
                                            <div className="flex items-center gap-4 text-slate-600 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-indigo-500">🗓️</span>
                                                    <strong>{new Date(interview.date).toDateString()}</strong>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-indigo-500">⏰</span>
                                                    <strong>{interview.startTime} - {interview.endTime}</strong>
                                                </div>
                                            </div>
                                            
                                            <div className="pt-2">
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Meeting Link (Google Meet/Zoom)</label>
                                                <div className="flex gap-2">
                                                    <input 
                                                        type="text" 
                                                        className="flex-1 border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                                                        placeholder="Paste meeting link here..."
                                                        defaultValue={interview.meetLink || ""}
                                                        onBlur={(e) => {
                                                            if (e.target.value !== interview.meetLink) {
                                                                handleMeetLinkChange(interview._id, e.target.value);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                {interview.meetLink && (
                                                    <a href={interview.meetLink} target="_blank" rel="noreferrer" className="text-indigo-600 font-medium text-sm hover:text-indigo-800 hover:underline mt-2 inline-flex items-center gap-1">
                                                        <span>🔗</span> Join Meeting / Test Link
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* SECTION 2: Video Upload */}
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-extrabold mb-4 text-slate-800 flex items-center gap-2">
                            <span className="text-indigo-600">📤</span> Upload to LMS
                        </h2>
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                        
                            {!mentorDetails?.assignedCourseId ? (
                                <div className="text-amber-700 bg-amber-50 p-5 rounded-lg border border-amber-200 flex items-start gap-3">
                                    <span className="text-2xl">⚠️</span>
                                    <div>
                                        <h4 className="font-bold">No Course Assigned</h4>
                                        <p className="text-sm mt-1">You are not assigned to any course yet. Please contact the administrator to assign you a course before uploading content.</p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleVideoSubmit} className="space-y-5">
                                    <div className="text-sm text-slate-700 mb-4 bg-indigo-50 p-4 rounded-lg border border-indigo-100 flex items-center gap-2">
                                        <span className="text-indigo-600 text-xl">📚</span>
                                        <div>
                                            <span className="text-slate-500">Assigned Course: </span> 
                                            <strong className="text-indigo-900 text-base">{mentorDetails?.assignedCourseId?.title || "Loading..."}</strong>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Session Title</label>
                                        <input 
                                            type="text"
                                            required
                                            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                                            placeholder="e.g. System Design Basics"
                                            value={videoForm.sessionTitle}
                                            onChange={(e) => setVideoForm({...videoForm, sessionTitle: e.target.value})}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Google Drive Video Link</label>
                                        <input 
                                            type="text"
                                            required
                                            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                                            placeholder="https://drive.google.com/file/d/..../view?usp=sharing"
                                            value={videoForm.driveLink}
                                            onChange={(e) => setVideoForm({...videoForm, driveLink: e.target.value})}
                                        />
                                    </div>

                                    {driveId && (
                                        <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-3 shadow-sm">
                                            <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                                                <span>👁️</span> Video Preview
                                            </p>
                                            <div className="relative w-full rounded-lg overflow-hidden shadow" style={{ paddingBottom: '56.25%' }}>
                                                <iframe
                                                    src={`https://drive.google.com/file/d/${driveId}/preview`}
                                                    className="absolute top-0 left-0 w-full h-full"
                                                    allow="autoplay"
                                                    title="Preview"
                                                ></iframe>
                                            </div>
                                        </div>
                                    )}

                                    <button 
                                        type="submit" 
                                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3.5 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md transform hover:-translate-y-0.5"
                                    >
                                        Publish to LMS
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* SECTION 3: Uploaded Sessions History */}
                {mentorDetails?.assignedCourseId && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-extrabold mb-4 text-slate-800 flex items-center gap-2">
                            <span className="text-indigo-600">📺</span> Your Uploaded Sessions
                        </h2>
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            {sessionList.length === 0 ? (
                                <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                                    <p className="font-medium text-lg mb-1">No sessions uploaded yet.</p>
                                    <p className="text-sm">When you upload a video above, it will appear here.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {sessionList.map((session, idx) => (
                                        <div key={session.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group bg-white flex flex-col">
                                            <div className="bg-slate-100 p-3 flex justify-between items-center border-b border-slate-200">
                                                <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-1 rounded-full">
                                                    Session {idx + 1}
                                                </span>
                                                <span className="text-xs text-slate-500 font-medium">
                                                    {new Date(session.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="p-4 flex-1 flex flex-col">
                                                <h4 className="font-bold text-slate-800 mb-2 line-clamp-2">{session.title}</h4>
                                                
                                                {session.description ? (
                                                    <div className="relative w-full rounded-md overflow-hidden bg-slate-200 mb-3 mt-auto" style={{ paddingBottom: '56.25%' }}>
                                                        <iframe
                                                            src={`https://drive.google.com/file/d/${session.description}/preview`}
                                                            className="absolute top-0 left-0 w-full h-full"
                                                            allow="autoplay"
                                                            title={session.title}
                                                        ></iframe>
                                                    </div>
                                                ) : (
                                                    <div className="flex-1 flex items-center justify-center bg-slate-50 rounded-md border border-slate-100 mb-3 mt-auto min-h-[120px]">
                                                        <span className="text-slate-400 text-sm">No preview available</span>
                                                    </div>
                                                )}
                                                
                                                <a 
                                                    href={session.driveLink} 
                                                    target="_blank" 
                                                    rel="noreferrer" 
                                                    className="w-full block text-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-sm py-2 rounded-lg transition-colors border border-indigo-100"
                                                >
                                                    Open in Google Drive
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default InterviewerDashboard;
